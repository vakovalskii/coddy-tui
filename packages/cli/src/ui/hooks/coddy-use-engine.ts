/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: ход ведёт агент Coddy по ACP, интерфейс тот же.
// Хук отдаёт те же поля, что useLlmStream, AppContainer подменяет ими свои при CODDY_TUI_ENGINE=coddy.
// События приходят из DaemonTuiAdapter: текст копим в одно сообщение, инструменты — в группу,
// запрос разрешения показываем обычным диалогом подтверждения, вопрос агента — диалогом вопросов.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PartListUnion } from '@google/genai';
import { ApprovalMode } from '@qwen-code/qwen-code-core/config/approval-mode.js';
import { SendMessageType } from '@qwen-code/qwen-code-core/core/client.js';
import { ToolConfirmationOutcome } from '@qwen-code/qwen-code-core/tools/tools.js';
import type { RequestPermissionRequest } from '@agentclientprotocol/sdk';
import {
  MessageType,
  StreamingState,
  ToolCallStatus,
  type HistoryItemToolGroup,
  type HistoryItemWithoutId,
} from '../types.js';
import {
  DaemonTuiAdapter,
  type DaemonTuiUpdate,
} from '../daemon/daemon-tui-adapter.js';
import {
  CoddyAcpSession,
  coddySplitArgs,
  type CoddyLaunch,
  type CoddyQuestion,
} from '../daemon/coddy-acp-session.js';

/** Включён ли движок Coddy: выбор делает coddy/bin/coddy-tui.js и передаёт через окружение. */
export function coddyLaunchFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): Omit<CoddyLaunch, 'cwd'> | null {
  if (env['CODDY_TUI_ENGINE'] !== 'coddy') return null;
  const bin = env['CODDY_BIN'];
  return bin ? { bin, args: coddySplitArgs(env['CODDY_ACP_ARGS']) } : null;
}

/** Подпись движка в шапке и статусе вместо модели встроенного движка. */
export function coddyModelLabel(session?: CoddyAcpSession | null): string {
  const model = session?.option('model')?.name;
  const mode = session?.option('mode');
  const parts = ['Coddy'];
  if (model) parts.push(model);
  if (mode && mode.value !== 'agent') parts.push(mode.name);
  return parts.join(' · ');
}

/** Режим одобрения TUI (Shift+Tab) → режим и одобрение сессии Coddy. */
export function coddySessionSettings(mode: ApprovalMode | string | undefined): {
  mode: string;
  permission: string;
} {
  switch (mode) {
    case ApprovalMode.PLAN:
      return { mode: 'plan', permission: 'ask' };
    case ApprovalMode.AUTO_EDIT:
      return { mode: 'agent', permission: 'accept_edits' };
    case ApprovalMode.YOLO:
      return { mode: 'agent', permission: 'bypass' };
    // у Coddy нет классификатора авторежима: автоматически принимаем только правки файлов
    case ApprovalMode.AUTO:
      return { mode: 'agent', permission: 'accept_edits' };
    default:
      return { mode: 'agent', permission: 'ask' };
  }
}

/** Слэш-команды, которые не трогают встроенный движок и работают с Coddy. */
const TUI_SLASH_ALLOWED = new Set([
  'clear',
  'help',
  'quit',
  'exit',
  'theme',
  'about',
  'copy',
  'docs',
  'language',
  'vim',
]);

function slashName(text: string): string {
  return text.trim().slice(1).split(/\s+/)[0]?.toLowerCase() ?? '';
}

export function coddyTuiSlashAllowed(text: string): boolean {
  return TUI_SLASH_ALLOWED.has(slashName(text));
}

/** Команда агента (`/model`, `/plan`, `/compact`, навыки…) — уходит в Coddy текстом запроса. */
export function coddyAgentSlash(
  text: string,
  commands: ReadonlyArray<{ name: string }>,
): boolean {
  const name = slashName(text);
  return !!name && commands.some((c) => c.name.toLowerCase() === name);
}

/** Если у вызова нет понятного вида, имя инструмента — из title. */
export function coddyToolName<
  T extends { name: string; description: string; callId: string },
>(tool: T): T {
  return tool.name === 'other' && tool.description !== tool.callId
    ? { ...tool, name: tool.description }
    : tool;
}

function partsToText(query: PartListUnion): string {
  if (typeof query === 'string') return query;
  const parts = Array.isArray(query) ? query : [query];
  return parts
    .map((p) => (typeof p === 'string' ? p : 'text' in p ? (p.text ?? '') : ''))
    .join('');
}

// управляющие символы терминала из чужого процесса не рисуем; перевод строки и таб оставляем
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000b-\u001f\u007f-\u009f]/g;

function toolCallText(content: unknown): string {
  if (!Array.isArray(content)) return '';
  return content
    .map((item) => {
      if (typeof item !== 'object' || item === null) return '';
      const c = (item as { content?: { text?: unknown }; text?: unknown })
        .content;
      const text = c?.text ?? (item as { text?: unknown }).text;
      return typeof text === 'string' ? text : '';
    })
    .filter(Boolean)
    .join('\n');
}

export function describePermission(
  request: Pick<RequestPermissionRequest, 'toolCall'>,
): string {
  const tc = request.toolCall;
  const input =
    tc.rawInput === undefined ? '' : JSON.stringify(tc.rawInput, null, 2);
  // целиком: хвост длинной команды не должен уйти в одобрение вслепую
  return [tc.title ?? tc.kind ?? 'инструмент', toolCallText(tc.content), input]
    .filter(Boolean)
    .join('\n')
    .replace(CONTROL_CHARS, '');
}

/** Ответ диалога вопросов (`{0: 'Go', 1: 'a, b'}`) → ответы ACP по вопросам. */
export function coddyQuestionAnswers(
  questions: readonly CoddyQuestion[],
  answers: Record<string, string> | undefined,
): string[][] {
  return questions.map((q, i) => {
    const a = answers?.[i]?.trim();
    if (!a) return [];
    if (!q.multiple) return [a];
    // мультивыбор диалог склеивает через ", ": делим обратно по известным меткам, остальное — свой ответ
    const known = q.options.map((o) => o.label).filter((l) => a.includes(l));
    let rest = a;
    for (const l of known) rest = rest.replace(l, '');
    const own = rest
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');
    return own ? [...known, own] : known;
  });
}

const SHELL_CONTEXT_MAX = 20_000;

/**
 * Команды `!` исполняет TUI, и их вывод есть только в его истории. Чтобы Coddy понял
 * «объясни эту ошибку» после `! cat error.log`, кладём новые команды с выводом перед запросом.
 */
export function coddyShellContext(
  history: readonly HistoryItemWithoutId[],
  fromIndex: number,
): string {
  const parts: string[] = [];
  for (let i = fromIndex; i < history.length; i++) {
    const item = history[i];
    if (item?.type !== 'user_shell') continue;
    const next = history[i + 1];
    const output =
      next?.type === 'tool_group'
        ? next.tools
            .map((tool) =>
              typeof tool.resultDisplay === 'string' ? tool.resultDisplay : '',
            )
            .join('\n')
        : '';
    parts.push(`$ ${item.text}\n${output}`.trim());
  }
  if (!parts.length) return '';
  const body = parts.join('\n\n');
  const clipped =
    body.length > SHELL_CONTEXT_MAX
      ? '…' + body.slice(body.length - SHELL_CONTEXT_MAX)
      : body;
  return `Пользователь выполнил в терминале (вывод для контекста):\n${clipped}\n\n`;
}

export interface UseCoddyEngineOptions {
  enabled: boolean;
  cwd: string;
  getApprovalMode: () => ApprovalMode | string | undefined;
  addItem: (item: HistoryItemWithoutId, timestamp: number) => number;
  handleSlashCommand: (cmd: PartListUnion) => Promise<unknown>;
  /** Режим оболочки (`!`) исполняется локально, как со встроенным движком: туда и отдаём. */
  shellModeActive: boolean;
  history: readonly HistoryItemWithoutId[];
  submitShell: (
    query: PartListUnion,
    submitType?: never,
    promptId?: string,
    metadata?: never,
  ) => Promise<void>;
  launch?: Omit<CoddyLaunch, 'cwd'> | null;
}

export function useCoddyEngine(options: UseCoddyEngineOptions) {
  const {
    enabled,
    cwd,
    getApprovalMode,
    addItem,
    handleSlashCommand,
    shellModeActive,
    submitShell,
  } = options;
  const historyRef = useRef(options.history);
  historyRef.current = options.history;
  // до какого места истории команды `!` уже переданы Coddy
  // запоминаем сам элемент, а не индекс: /clear и Ctrl+L начинают историю заново
  const shellSeenRef = useRef<HistoryItemWithoutId | undefined>(
    options.history.at(-1),
  );
  const launch = useMemo(
    () =>
      options.launch === undefined ? coddyLaunchFromEnv() : options.launch,
    [options.launch],
  );
  const [streamingState, setStreamingState] = useState(StreamingState.Idle);
  const [pendingText, setPendingText] = useState<string | null>(null);
  const [pendingGroup, setPendingGroup] = useState<HistoryItemToolGroup | null>(
    null,
  );
  const [modelLabel, setModelLabel] = useState(() => coddyModelLabel());
  const adapterRef = useRef<DaemonTuiAdapter | null>(null);
  const sessionRef = useRef<CoddyAcpSession | null>(null);
  const textRef = useRef<string | null>(null);
  const groupRef = useRef<HistoryItemToolGroup | null>(null);
  // инструменты, уже ушедшие в историю: адаптер копит все вызовы хода в одной группе
  const committedRef = useRef(new Set<string>());
  const startingRef = useRef(false);
  const cancelledRef = useRef(false);

  const setText = (t: string | null) => {
    textRef.current = t;
    setPendingText(t);
  };
  const setGroup = (g: HistoryItemToolGroup | null) => {
    groupRef.current = g;
    setPendingGroup(g);
  };

  const commitText = useCallback(() => {
    if (textRef.current) {
      addItem({ type: 'gemini', text: textRef.current }, Date.now());
    }
    setText(null);
  }, [addItem]);

  const commitGroup = useCallback(() => {
    const g = groupRef.current;
    if (g && g.tools.length) {
      g.tools.forEach((t) => committedRef.current.add(t.callId));
      addItem(g, Date.now());
    }
    setGroup(null);
  }, [addItem]);

  const onUpdate = useCallback(
    (u: DaemonTuiUpdate) => {
      switch (u.type) {
        case 'history':
          if (u.item.type === 'gemini_content') {
            commitGroup();
            setText((textRef.current ?? '') + u.item.text);
          } else {
            commitText();
            commitGroup();
            addItem(u.item, Date.now());
          }
          return;
        case 'tool_group_update': {
          commitText();
          const prev = new Map(
            (groupRef.current?.tools ?? []).map((t) => [t.callId, t]),
          );
          const tools = u.item.tools
            .filter((t) => !committedRef.current.has(t.callId))
            .map((t) => coddyToolName(t))
            .map((t) => {
              // ответ на разрешение ещё не пришёл — не сбрасываем диалог
              const p = prev.get(t.callId);
              return p?.status === ToolCallStatus.Confirming &&
                t.status !== ToolCallStatus.Success &&
                t.status !== ToolCallStatus.Error
                ? p
                : t;
            });
          setGroup({ type: 'tool_group', tools });
          return;
        }
        case 'permission_request': {
          commitText();
          const adapter = adapterRef.current;
          const id = u.request.toolCall.toolCallId;
          const confirm = async (outcome: ToolConfirmationOutcome) => {
            // «разрешить один раз»: постоянных разрешений из TUI не выдаём, у Coddy они свои (/permissions)
            const allow = u.request.options.find(
              (o) => o.kind === 'allow_once',
            );
            if (outcome !== ToolConfirmationOutcome.Cancel && allow) {
              await adapter?.approvePermission(u.requestId, allow.optionId);
            } else {
              await adapter?.rejectPermission(u.requestId);
            }
          };
          const tools = (groupRef.current?.tools ?? []).filter(
            (t) => t.callId !== id,
          );
          tools.push({
            callId: id,
            name: u.request.toolCall.title ?? u.request.toolCall.kind ?? 'tool',
            description: u.request.toolCall.title ?? id,
            resultDisplay: undefined,
            status: ToolCallStatus.Confirming,
            confirmationDetails: {
              type: 'info',
              title: 'Coddy просит разрешение',
              // адаптер обрезает строки до 20 000 символов, берём запрос целиком из клиента
              prompt: describePermission({
                toolCall:
                  sessionRef.current?.permissionToolCall(u.requestId) ??
                  u.request.toolCall,
              }),
              renderPromptAsPlainText: true,
              hideAlwaysAllow: true,
              onConfirm: confirm,
            },
          });
          setGroup({ type: 'tool_group', tools });
          setStreamingState(StreamingState.WaitingForConfirmation);
          return;
        }
        case 'permission_resolved':
          setStreamingState(StreamingState.Responding);
          return;
        case 'disconnected':
          commitText();
          commitGroup();
          sessionRef.current?.dispose();
          sessionRef.current = null;
          adapterRef.current = null;
          return;
        default:
          return;
      }
    },
    [addItem, commitGroup, commitText],
  );

  // Вопрос агента (инструмент question) — апстримным диалогом вопросов
  const askQuestion = useCallback(
    (questions: CoddyQuestion[]): Promise<string[][] | null> =>
      new Promise((resolve) => {
        commitText();
        const callId = `coddy-question-${Date.now()}`;
        const done = (answers: string[][] | null) => {
          setGroup({
            type: 'tool_group',
            tools: (groupRef.current?.tools ?? []).filter(
              (t) => t.callId !== callId,
            ),
          });
          setStreamingState(StreamingState.Responding);
          resolve(answers);
        };
        const tools = [...(groupRef.current?.tools ?? [])];
        tools.push({
          callId,
          name: 'question',
          description: questions[0]?.question ?? '',
          resultDisplay: undefined,
          status: ToolCallStatus.Confirming,
          confirmationDetails: {
            type: 'ask_user_question',
            title: 'Coddy спрашивает',
            questions: questions.map((q, i) => ({
              question: q.question,
              header: q.header || `Вопрос ${i + 1}`,
              options: q.options.map((o) => ({
                label: o.label,
                description: o.description ?? '',
              })),
              multiSelect: q.multiple,
            })),
            onConfirm: async (outcome, payload) => {
              done(
                outcome === ToolConfirmationOutcome.Cancel
                  ? null
                  : coddyQuestionAnswers(questions, payload?.answers),
              );
            },
          },
        });
        setGroup({ type: 'tool_group', tools });
        setStreamingState(StreamingState.WaitingForConfirmation);
      }),
    [commitText],
  );

  const resetSession = useCallback(async () => {
    const adapter = adapterRef.current;
    adapterRef.current = null;
    await adapter?.stop().catch(() => {});
    sessionRef.current?.dispose();
    sessionRef.current = null;
    committedRef.current.clear();
  }, []);

  // Режим одобрения TUI → mode и permission_mode сессии; Coddy меняет их в живой сессии
  const applyApprovalMode = useCallback(
    async (
      session: CoddyAcpSession,
      mode: ApprovalMode | string | undefined,
    ) => {
      const want = coddySessionSettings(mode);
      for (const [id, value] of [
        ['mode', want.mode],
        ['permission_mode', want.permission],
      ] as const) {
        if (
          session.option(id)?.value !== value &&
          session.hasOptionValue(id, value)
        ) {
          await session.setConfigOption(id, value);
        }
      }
    },
    [],
  );

  // один запуск на всех: ранний старт при открытии TUI и первый запрос не должны поднять два процесса
  const startRef = useRef<Promise<DaemonTuiAdapter> | null>(null);
  const ensureAdapter = useCallback((): Promise<DaemonTuiAdapter> => {
    if (adapterRef.current && sessionRef.current) {
      return Promise.resolve(adapterRef.current);
    }
    if (!launch) {
      return Promise.reject(
        new Error(
          'Coddy не найден: поставьте coddy в PATH или укажите CODDY_BIN',
        ),
      );
    }
    startRef.current ??= (async () => {
      const session = await CoddyAcpSession.start({ ...launch, cwd });
      session.onQuestion = askQuestion;
      session.onInfo = () => setModelLabel(coddyModelLabel(session));
      await applyApprovalMode(session, getApprovalMode()).catch(() => {});
      setModelLabel(coddyModelLabel(session));
      const adapter = new DaemonTuiAdapter({ session, onUpdate });
      adapter.start();
      sessionRef.current = session;
      adapterRef.current = adapter;
      return adapter;
    })().finally(() => {
      startRef.current = null;
    });
    return startRef.current;
  }, [launch, cwd, getApprovalMode, onUpdate, askQuestion, applyApprovalMode]);

  // Coddy поднимаем сразу: модель и команды агента видны до первого запроса
  const eagerStartRef = useRef(false);
  useEffect(() => {
    if (!enabled || !launch || eagerStartRef.current) return;
    eagerStartRef.current = true;
    ensureAdapter().catch((e: unknown) =>
      addItem(
        {
          type: MessageType.ERROR,
          text: `Coddy: ${e instanceof Error ? e.message : String(e)}`,
        },
        Date.now(),
      ),
    );
  }, [enabled, launch, ensureAdapter, addItem]);

  useEffect(
    () => () => {
      void resetSession();
    },
    [resetSession],
  );

  const submitQuery = useCallback(
    async (
      query: PartListUnion,
      submitType?: SendMessageType,
      _promptId?: string,
      metadata?: {
        shellMode?: boolean;
        displayText?: string;
        onRequestStarted?: () => void;
        onDelivered?: () => void;
        onDeliveryFailed?: () => void;
      },
    ): Promise<void> => {
      const text = partsToText(query).trim();
      if (!text) return;
      // в оболочку — только набранное пользователем; слэш-команды и сообщения других сессий — сюда
      const userTyped =
        submitType === undefined || submitType === SendMessageType.UserQuery;
      if (
        userTyped &&
        !text.startsWith('/') &&
        (metadata?.shellMode ?? shellModeActive)
      ) {
        return submitShell(
          query,
          submitType as never,
          _promptId,
          metadata as never,
        );
      }
      cancelledRef.current = false;
      if (text.startsWith('/')) {
        if (coddyTuiSlashAllowed(text)) {
          if (/^\/clear\b/i.test(text)) await resetSession();
          await handleSlashCommand(text);
          return;
        }
        if (!coddyAgentSlash(text, sessionRef.current?.commands ?? [])) {
          addItem(
            {
              type: MessageType.INFO,
              text: sessionRef.current
                ? 'Такой команды нет ни у TUI, ни у Coddy. Команды встроенного движка: coddy-tui --engine qwen'
                : 'Команды Coddy станут доступны после первого запроса. Команды встроенного движка: coddy-tui --engine qwen',
            },
            Date.now(),
          );
          return;
        }
        // команда агента — дальше как обычный запрос, Coddy разберёт её сам
      }
      addItem(
        { type: MessageType.USER, text: metadata?.displayText ?? text },
        Date.now(),
      );
      setStreamingState(StreamingState.Responding);
      metadata?.onRequestStarted?.();
      try {
        startingRef.current = true;
        const adapter = await ensureAdapter().finally(() => {
          startingRef.current = false;
        });
        if (cancelledRef.current) {
          addItem(
            { type: MessageType.INFO, text: 'Запрос отменён' },
            Date.now(),
          );
          return;
        }
        metadata?.onDelivered?.();
        const seen = shellSeenRef.current
          ? historyRef.current.lastIndexOf(shellSeenRef.current)
          : -1;
        const shellContext = text.startsWith('/')
          ? ''
          : coddyShellContext(historyRef.current, seen + 1);
        shellSeenRef.current = historyRef.current.at(-1);
        const r = await adapter.sendPrompt(shellContext + text);
        commitText();
        commitGroup();
        if (r.stopReason && r.stopReason !== 'end_turn') {
          addItem(
            {
              type: MessageType.INFO,
              text: `Coddy остановился: ${r.stopReason}`,
            },
            Date.now(),
          );
        }
      } catch (e) {
        metadata?.onDeliveryFailed?.();
        commitText();
        commitGroup();
        addItem(
          {
            type: MessageType.ERROR,
            text: `Coddy: ${e instanceof Error ? e.message : String(e)}`,
          },
          Date.now(),
        );
      } finally {
        setStreamingState(StreamingState.Idle);
      }
    },
    [
      addItem,
      commitGroup,
      commitText,
      ensureAdapter,
      handleSlashCommand,
      resetSession,
      shellModeActive,
      submitShell,
    ],
  );

  const cancelOngoingRequest = useCallback(() => {
    // Esc, пока Coddy ещё запускается: запрос не отправляем
    if (startingRef.current) cancelledRef.current = true;
    void adapterRef.current?.cancel().catch(() => {});
  }, []);

  // Shift+Tab: режим и одобрение меняются в живой сессии Coddy
  const handleApprovalModeChange = useCallback(
    async (mode: ApprovalMode | string) => {
      const session = sessionRef.current;
      if (!session) return;
      await applyApprovalMode(session, mode).catch((e: unknown) =>
        addItem(
          {
            type: MessageType.ERROR,
            text: `Coddy: режим не сменился: ${e instanceof Error ? e.message : String(e)}`,
          },
          Date.now(),
        ),
      );
    },
    [applyApprovalMode, addItem],
  );

  const pendingHistoryItems: HistoryItemWithoutId[] = [];
  if (pendingText)
    pendingHistoryItems.push({ type: 'gemini', text: pendingText });
  if (pendingGroup) pendingHistoryItems.push(pendingGroup);

  return {
    enabled: enabled && launch !== null,
    streamingState,
    submitQuery,
    cancelOngoingRequest,
    handleApprovalModeChange,
    pendingHistoryItems,
    isReceivingContent: pendingText !== null,
    modelLabel,
  };
}
