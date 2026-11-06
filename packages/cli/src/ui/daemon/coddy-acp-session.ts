/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: ход ведёт агент Coddy (`coddy acp`, ndjson JSON-RPC через stdio). Здесь он оборачивается
// в DaemonTuiSessionClient, а дальше всё рисует апстримный DaemonTuiAdapter, как для демона.
//
// Свой маленький клиент JSON-RPC вместо ClientSideConnection из @agentclientprotocol/sdk: SDK проверяет
// каждое входящее сообщение zod-схемой ACP и не дожидается ответа без `result`, а Coddy шлёт свои виды
// инструментов (`write`, `run_command`), свои session/update (token_usage, provider_usage, memory_run…),
// session/request_question и ответ без `result` на session/set_mode (docs/reference/acp-protocol.md Coddy).

import { spawn, type ChildProcess } from 'node:child_process';
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import type {
  ContentBlock,
  RequestPermissionRequest,
  RequestPermissionResponse,
} from '@agentclientprotocol/sdk';
import { sanitizeChildEnv } from '@qwen-code/qwen-code-core/utils/sanitize-child-env.js';
import type {
  DaemonTuiEvent,
  DaemonTuiPromptResult,
  DaemonTuiSessionClient,
} from './daemon-tui-adapter.js';

export interface CoddyLaunch {
  /** Бинарь Coddy: CODDY_BIN или `coddy` из PATH (проверяет coddy/bin/coddy-tui.js). */
  bin: string;
  /** Аргументы после `acp`, из CODDY_ACP_ARGS. */
  args?: string[];
  cwd: string;
  env?: NodeJS.ProcessEnv;
}

/** Вариант выбора из session/new: режим, модель, уровень рассуждений, режим одобрения. */
export interface CoddyConfigOption {
  id: string;
  name?: string;
  category?: string;
  currentValue?: string;
  options?: Array<{ value: string; name?: string; description?: string }>;
}

export interface CoddyQuestion {
  header?: string;
  question: string;
  options: Array<{ label: string; description?: string }>;
  multiple?: boolean;
  custom?: boolean;
}

/** Ответы на session/request_question: по списку выбранных меток на вопрос; null — отказ. */
export type CoddyQuestionHandler = (
  questions: CoddyQuestion[],
) => Promise<string[][] | null>;

const INIT_TIMEOUT_MS = 30_000;
const STDERR_TAIL = 4_000;
const CLIENT_VERSION = process.env['CLI_VERSION'] || '0.0.0';

// Виды инструментов ACP. Coddy шлёт ещё `write` и `run_command` — приводим к ближайшим стандартным
const ACP_TOOL_KINDS = new Set([
  'read',
  'edit',
  'delete',
  'move',
  'search',
  'execute',
  'think',
  'fetch',
  'switch_mode',
  'other',
]);
const CODDY_TOOL_KINDS: Record<string, string> = {
  write: 'edit',
  run_command: 'execute',
};

/** CODDY_ACP_ARGS как в оболочке: пробелы делят, кавычки склеивают. */
export function coddySplitArgs(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  const out: string[] = [];
  let cur = '';
  let quote: string | null = null;
  let has = false;
  for (const ch of value) {
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      has = true;
    } else if (/\s/.test(ch)) {
      if (has || cur) out.push(cur);
      cur = '';
      has = false;
    } else {
      cur += ch;
    }
  }
  if (has || cur) out.push(cur);
  return out;
}

export function coddyAcpArgs(launch: Pick<CoddyLaunch, 'args'>): string[] {
  return ['acp', ...(launch.args ?? [])];
}

export function coddyAcpEnv(launch: CoddyLaunch): NodeJS.ProcessEnv {
  const base = launch.env ?? process.env;
  return {
    // служебные секреты TUI агенту не нужны; ключ NeuralDeep и прочее окружение пользователя — нужны
    ...sanitizeChildEnv(base),
    PWD: launch.cwd,
  };
}

export function coddyToolKind(kind: unknown): string | undefined {
  if (typeof kind !== 'string') return undefined;
  if (ACP_TOOL_KINDS.has(kind)) return kind;
  return CODDY_TOOL_KINDS[kind] ?? 'other';
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Очередь событий: ACP приходит колбэками, адаптер читает async-генератором. */
class EventQueue {
  private items: DaemonTuiEvent[] = [];
  private waiters: Array<() => void> = [];
  // кто ждёт, пока читатель разберёт очередь до конца
  private idleWaiters: Array<() => void> = [];
  private readerIdle = false;
  private nextId = 1;
  closed = false;

  push(type: string, data: unknown): void {
    if (this.closed) return;
    this.items.push({ id: this.nextId++, v: 1, type, data });
    this.waiters.splice(0).forEach((w) => w());
  }

  close(): void {
    this.closed = true;
    this.waiters.splice(0).forEach((w) => w());
    this.idleWaiters.splice(0).forEach((w) => w());
  }

  /** Читатель обработал всё, что уже пришло (или ждать дольше timeoutMs нечего). */
  drained(timeoutMs: number): Promise<void> {
    if (this.closed || (this.readerIdle && !this.items.length)) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, timeoutMs);
      timer.unref?.();
      this.idleWaiters.push(() => {
        clearTimeout(timer);
        resolve();
      });
    });
  }

  async *read(signal?: AbortSignal): AsyncGenerator<DaemonTuiEvent> {
    const wake = () => this.waiters.splice(0).forEach((w) => w());
    signal?.addEventListener('abort', wake, { once: true });
    try {
      while (!signal?.aborted) {
        const item = this.items.shift();
        if (item) {
          yield item;
          continue;
        }
        if (this.closed) return;
        // очередь пуста, а читатель вернулся за следующим событием — всё прежнее он уже разобрал
        this.idleWaiters.splice(0).forEach((w) => w());
        this.readerIdle = true;
        await new Promise<void>((resolve) => this.waiters.push(resolve));
        this.readerIdle = false;
      }
    } finally {
      signal?.removeEventListener('abort', wake);
    }
  }
}

type JsonRpcId = number | string;

export class CoddyAcpSession implements DaemonTuiSessionClient {
  readonly lastEventId = undefined;
  private readonly queue = new EventQueue();
  private readonly calls = new Map<
    JsonRpcId,
    { resolve: (v: unknown) => void; reject: (e: Error) => void }
  >();
  private nextCallId = 1;
  private readonly pending = new Map<
    string,
    (r: RequestPermissionResponse) => void
  >();
  private nextRequest = 1;
  // последний вид каждого вызова: в запросе разрешения его может не быть
  private readonly toolCalls = new Map<string, Record<string, unknown>>();
  // запросы разрешения как пришли, без обрезки адаптера: их показываем перед одобрением
  private readonly permissionCalls = new Map<
    string,
    RequestPermissionRequest['toolCall']
  >();
  private stderrTail = '';
  private exited!: Promise<never>;
  private closed = false;
  sessionId = '';
  agentName = 'Coddy';
  configOptions: CoddyConfigOption[] = [];
  /** Слэш-команды агента из available_commands_update. */
  commands: Array<{ name: string; description?: string }> = [];
  /** Занятость окна контекста из usage_update. */
  usage: { used: number; size: number } | null = null;
  onQuestion?: CoddyQuestionHandler;
  /** Изменились режим, модель или команды — интерфейсу перерисовать подписи. */
  onInfo?: () => void;

  private constructor(
    private readonly child: ChildProcess,
    readonly workspaceCwd: string,
  ) {}

  static async start(launch: CoddyLaunch): Promise<CoddyAcpSession> {
    const child = spawn(launch.bin, coddyAcpArgs(launch), {
      cwd: launch.cwd,
      env: coddyAcpEnv(launch),
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    });
    return CoddyAcpSession.attach(child, launch.cwd);
  }

  /** Для тестов: готовый процесс агента. */
  static async attach(
    child: ChildProcess,
    cwd: string,
    timeoutMs = INIT_TIMEOUT_MS,
  ): Promise<CoddyAcpSession> {
    const session = new CoddyAcpSession(child, cwd);
    try {
      await session.connect(timeoutMs);
    } catch (e) {
      // не оставляем процесс висеть: повторная попытка запустит новый
      session.dispose();
      throw e;
    }
    return session;
  }

  private async connect(timeoutMs: number): Promise<void> {
    const { child } = this;
    child.stderr?.setEncoding('utf8');
    child.stderr?.on('data', (d: string) => {
      this.stderrTail = (this.stderrTail + d).slice(-STDERR_TAIL);
    });
    // запись в закрытый stdin (агент уже вышел) не должна ронять TUI
    child.stdin?.on('error', () => {});
    const exited = (this.exited = new Promise<never>((_, reject) => {
      const fail = (reason: string) => {
        this.closed = true;
        const err = new Error(
          `Coddy завершился (${reason})${this.stderrTail.trim() ? `: ${this.stderrTail.trim().slice(-500)}` : ''}`,
        );
        this.queue.push('session_died', {
          reason: `Coddy завершился (${reason})`,
        });
        this.queue.close();
        this.pending.forEach((resolve) =>
          resolve({ outcome: { outcome: 'cancelled' } }),
        );
        this.pending.clear();
        this.calls.forEach((c) => c.reject(err));
        this.calls.clear();
        reject(err);
      };
      child.once('error', (e) => fail(e.message));
      child.once('exit', (code, sig) => fail(String(sig ?? code)));
    }));
    exited.catch(() => {});
    const rl = readline.createInterface({ input: child.stdout! });
    rl.on('line', (line) => this.onLine(line));

    // таймаут на весь запуск: и initialize, и session/new
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () =>
          reject(
            new Error(
              `Coddy не запустился за ${Math.round(timeoutMs / 1000)} с`,
            ),
          ),
        timeoutMs,
      );
      timer.unref();
    });
    const s = await Promise.race([
      (async () => {
        const init = (await this.call('initialize', {
          protocolVersion: 1,
          // файлы Coddy читает и пишет сам, терминал у него свой
          clientCapabilities: {
            fs: { readTextFile: false, writeTextFile: false },
            terminal: false,
          },
          clientInfo: {
            name: 'coddy-tui',
            title: 'Coddy TUI',
            version: CLIENT_VERSION,
          },
        })) as { agentInfo?: { title?: string } } | null;
        if (init?.agentInfo?.title) this.agentName = init.agentInfo.title;
        return (await this.call('session/new', {
          cwd: this.workspaceCwd,
          mcpServers: [],
        })) as { sessionId?: string; configOptions?: unknown };
      })(),
      exited,
      timeout,
    ]).finally(() => clearTimeout(timer));
    if (!s?.sessionId) throw new Error('Coddy не вернул sessionId');
    this.sessionId = s.sessionId;
    this.setConfigOptions(s.configOptions);
  }

  private write(msg: Record<string, unknown>): void {
    if (this.closed || !this.child.stdin?.writable) return;
    this.child.stdin.write(JSON.stringify({ jsonrpc: '2.0', ...msg }) + '\n');
  }

  private call(method: string, params: unknown): Promise<unknown> {
    if (this.closed) return Promise.reject(new Error('Coddy уже завершился'));
    const id = this.nextCallId++;
    return new Promise((resolve, reject) => {
      this.calls.set(id, { resolve, reject });
      this.write({ id, method, params });
    });
  }

  private onLine(line: string): void {
    const text = line.trim();
    if (!text) return;
    let msg: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(text);
      if (!isRecord(parsed)) return;
      msg = parsed;
    } catch {
      return; // не JSON-RPC (лог в stdout) — пропускаем
    }
    const method = typeof msg['method'] === 'string' ? msg['method'] : null;
    const id = msg['id'] as JsonRpcId | undefined;
    if (!method) {
      // ответ; у Coddy успешный ответ может прийти без result (nil в Go и omitempty)
      if (id === undefined) return;
      const c = this.calls.get(id);
      if (!c) return;
      this.calls.delete(id);
      const err = msg['error'];
      if (isRecord(err)) {
        c.reject(new Error(String(err['message'] ?? 'ошибка Coddy')));
      } else {
        c.resolve(msg['result'] ?? null);
      }
      return;
    }
    const params = isRecord(msg['params']) ? msg['params'] : {};
    if (id === undefined) {
      if (method === 'session/update') this.onSessionUpdate(params);
      return;
    }
    void this.onRequest(method, params).then(
      (result) => this.write({ id, result: result ?? null }),
      (e: unknown) =>
        this.write({
          id,
          error: {
            code: (e as { code?: number }).code ?? -32603,
            message: e instanceof Error ? e.message : String(e),
          },
        }),
    );
  }

  private onSessionUpdate(params: Record<string, unknown>): void {
    const update = isRecord(params['update']) ? { ...params['update'] } : null;
    if (!update) return;
    const kind = update['sessionUpdate'];
    switch (kind) {
      case 'tool_call':
      case 'tool_call_update': {
        if ('kind' in update) update['kind'] = coddyToolKind(update['kind']);
        if (update['status'] === 'cancelled') update['status'] = 'failed';
        this.rememberToolCall(update);
        break;
      }
      case 'config_option_update':
        this.setConfigOptions(update['configOptions']);
        this.onInfo?.();
        return;
      case 'current_mode_update': {
        const mode = this.configOptions.find((o) => o.id === 'mode');
        if (mode && typeof update['currentModeId'] === 'string') {
          mode.currentValue = update['currentModeId'];
          this.onInfo?.();
        }
        return;
      }
      case 'available_commands_update': {
        const list = update['availableCommands'];
        if (Array.isArray(list)) {
          this.commands = list.filter(isRecord).flatMap((c) =>
            typeof c['name'] === 'string'
              ? [
                  {
                    name: c['name'],
                    description:
                      typeof c['description'] === 'string'
                        ? c['description']
                        : undefined,
                  },
                ]
              : [],
          );
          this.onInfo?.();
        }
        return;
      }
      case 'usage_update': {
        const used = Number(update['used']);
        const size = Number(update['size']);
        if (Number.isFinite(used) && Number.isFinite(size)) {
          this.usage = { used, size };
          this.onInfo?.();
        }
        return;
      }
      case 'agent_message_chunk':
      case 'agent_thought_chunk':
      case 'user_message_chunk':
      case 'plan':
        break;
      default:
        // token_usage, provider_usage, memory_run, background_wake и прочее своё у Coddy — не рисуем
        return;
    }
    this.queue.push('session_update', {
      sessionId: params['sessionId'],
      update,
    });
  }

  private async onRequest(
    method: string,
    params: Record<string, unknown>,
  ): Promise<unknown> {
    switch (method) {
      case 'session/request_permission':
        return this.onPermission(params);
      case 'session/request_question':
        return this.onQuestionRequest(params);
      case 'fs/read_text_file':
        return this.readTextFile(params);
      case 'fs/write_text_file':
        return this.writeTextFile(params);
      default:
        throw Object.assign(new Error(`Метод не поддерживается: ${method}`), {
          code: -32601,
        });
    }
  }

  private onPermission(
    params: Record<string, unknown>,
  ): Promise<RequestPermissionResponse> {
    const raw = isRecord(params['toolCall']) ? params['toolCall'] : {};
    const options = Array.isArray(params['options'])
      ? (params['options'] as RequestPermissionRequest['options'])
      : [];
    return new Promise((resolve) => {
      const requestId = `coddy-${this.nextRequest++}`;
      const toolCall = this.completeToolCall(
        raw as RequestPermissionRequest['toolCall'],
      );
      this.pending.set(requestId, resolve);
      this.permissionCalls.set(requestId, toolCall);
      this.queue.push('permission_request', {
        sessionId:
          typeof params['sessionId'] === 'string'
            ? params['sessionId']
            : this.sessionId,
        toolCall,
        options,
        requestId,
      });
    });
  }

  private async onQuestionRequest(
    params: Record<string, unknown>,
  ): Promise<{ answers: string[][] }> {
    const questions = (
      Array.isArray(params['questions']) ? params['questions'] : []
    )
      .filter(isRecord)
      .map(
        (q): CoddyQuestion => ({
          header: typeof q['header'] === 'string' ? q['header'] : undefined,
          question: String(q['question'] ?? ''),
          options: (Array.isArray(q['options']) ? q['options'] : [])
            .filter(isRecord)
            .map((o) => ({
              label: String(o['label'] ?? ''),
              description:
                typeof o['description'] === 'string'
                  ? o['description']
                  : undefined,
            })),
          multiple: q['multiple'] === true,
          custom: q['custom'] === true,
        }),
      );
    const answers = this.onQuestion ? await this.onQuestion(questions) : null;
    if (!answers) throw new Error('Пользователь не ответил на вопрос');
    return { answers };
  }

  // Coddy зовёт fs/* только если клиент объявил их в initialize (мы не объявляем), но ответить
  // всё равно лучше, чем оставить агента ждать
  private async readTextFile(
    params: Record<string, unknown>,
  ): Promise<{ content: string }> {
    const file = this.resolvePath(params['path']);
    let content = await fsp.readFile(file, 'utf8');
    const line = Number(params['line']);
    const limit = Number(params['limit']);
    if (Number.isFinite(line) && line > 0) {
      const lines = content.split('\n');
      content = lines
        .slice(line - 1, Number.isFinite(limit) ? line - 1 + limit : undefined)
        .join('\n');
    }
    return { content };
  }

  private async writeTextFile(params: Record<string, unknown>): Promise<null> {
    const file = this.resolvePath(params['path']);
    await fsp.mkdir(path.dirname(file), { recursive: true });
    await fsp.writeFile(file, String(params['content'] ?? ''), 'utf8');
    return null;
  }

  private resolvePath(p: unknown): string {
    if (typeof p !== 'string' || !p) throw new Error('нет пути');
    return path.resolve(this.workspaceCwd, p);
  }

  private setConfigOptions(value: unknown): void {
    if (!Array.isArray(value)) return;
    this.configOptions = value.filter(isRecord).flatMap((o) =>
      typeof o['id'] === 'string'
        ? [
            {
              id: o['id'],
              name: typeof o['name'] === 'string' ? o['name'] : undefined,
              category:
                typeof o['category'] === 'string' ? o['category'] : undefined,
              currentValue:
                typeof o['currentValue'] === 'string'
                  ? o['currentValue']
                  : undefined,
              options: (Array.isArray(o['options']) ? o['options'] : [])
                .filter(isRecord)
                .map((v) => ({
                  value: String(v['value'] ?? ''),
                  name: typeof v['name'] === 'string' ? v['name'] : undefined,
                  description:
                    typeof v['description'] === 'string'
                      ? v['description']
                      : undefined,
                })),
            },
          ]
        : [],
    );
  }

  /** Текущее значение варианта (mode, model, permission_mode…) и его подпись. */
  option(id: string): { value: string; name: string } | undefined {
    const o = this.configOptions.find((c) => c.id === id);
    if (!o?.currentValue) return undefined;
    const v = o.options?.find((x) => x.value === o.currentValue);
    return { value: o.currentValue, name: v?.name ?? o.currentValue };
  }

  /** Есть ли у варианта такое значение — иначе Coddy ответит ошибкой. */
  hasOptionValue(id: string, value: string): boolean {
    const o = this.configOptions.find((c) => c.id === id);
    return !!o?.options?.some((x) => x.value === value);
  }

  async setConfigOption(configId: string, value: string): Promise<void> {
    const r = (await Promise.race([
      this.call('session/set_config_option', {
        sessionId: this.sessionId,
        configId,
        value,
      }),
      this.exited,
    ])) as { configOptions?: unknown } | null;
    if (r?.configOptions) this.setConfigOptions(r.configOptions);
    this.onInfo?.();
  }

  private rememberToolCall(u: Record<string, unknown>): void {
    const id = u['toolCallId'];
    if (typeof id !== 'string') return;
    this.toolCalls.set(id, { ...this.toolCalls.get(id), ...u });
  }

  /** Апстримный адаптер отбрасывает запрос без kind: берём вид и заголовок из прошлых tool_call. */
  completeToolCall(
    toolCall: RequestPermissionRequest['toolCall'],
  ): RequestPermissionRequest['toolCall'] {
    const seen = this.toolCalls.get(toolCall.toolCallId) ?? {};
    const pick = (k: string) =>
      typeof seen[k] === 'string' ? (seen[k] as string) : undefined;
    return {
      ...toolCall,
      kind: (coddyToolKind(toolCall.kind) ??
        pick('kind') ??
        'other') as typeof toolCall.kind,
      title: toolCall.title ?? pick('title') ?? toolCall.toolCallId,
      rawInput: toolCall.rawInput ?? seen['rawInput'],
    };
  }

  permissionToolCall(
    requestId: string,
  ): RequestPermissionRequest['toolCall'] | undefined {
    return this.permissionCalls.get(requestId);
  }

  async prompt(req: {
    prompt: ContentBlock[];
  }): Promise<DaemonTuiPromptResult> {
    const r = (await Promise.race([
      this.call('session/prompt', {
        sessionId: this.sessionId,
        prompt: req.prompt,
      }),
      this.exited,
    ])) as { stopReason?: string } | null;
    // ответ на session/prompt приходит сразу за последними session/update: адаптер должен разобрать их
    // до конца хода, иначе последний кусок текста останется висеть до следующего запроса
    await this.queue.drained(2_000);
    return { stopReason: r?.stopReason };
  }

  events(opts?: { signal?: AbortSignal }): AsyncGenerator<DaemonTuiEvent> {
    return this.queue.read(opts?.signal);
  }

  async cancel(): Promise<void> {
    this.write({
      method: 'session/cancel',
      params: { sessionId: this.sessionId },
    });
  }

  async setModel(modelId: string): Promise<Record<string, unknown>> {
    await this.setConfigOption('model', modelId);
    return {};
  }

  async respondToPermission(
    requestId: string,
    response: RequestPermissionResponse,
  ): Promise<boolean> {
    const resolve = this.pending.get(requestId);
    if (!resolve) return false;
    this.pending.delete(requestId);
    this.permissionCalls.delete(requestId);
    resolve(response);
    this.queue.push('permission_resolved', {
      requestId,
      outcome: response.outcome,
    });
    return true;
  }

  dispose(): void {
    this.queue.close();
    if (this.child.exitCode === null && this.child.signalCode === null) {
      this.child.kill();
    }
  }
}
