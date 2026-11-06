/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: клиент ACP для агента Coddy на поддельном `coddy acp`, без сети и без Coddy.

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  CoddyAcpSession,
  coddyAcpArgs,
  coddyAcpEnv,
  coddySplitArgs,
  coddyToolKind,
} from './coddy-acp-session.js';
import {
  DaemonTuiAdapter,
  type DaemonTuiUpdate,
} from './daemon-tui-adapter.js';

const FAKE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__',
  'fake-coddy-acp.mjs',
);

let dir: string;
let session: CoddyAcpSession | undefined;
beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'coddy-acp-'));
});
afterEach(() => {
  session?.dispose();
  session = undefined;
  rmSync(dir, { recursive: true, force: true });
});

const spawnAgent = (env: NodeJS.ProcessEnv = {}, args = ['acp']) =>
  spawn(process.execPath, [FAKE, ...args], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, ...env },
  });
const start = () => CoddyAcpSession.attach(spawnAgent(), dir);

describe('CoddyAcpSession', () => {
  it('запуск: coddy acp с аргументами из CODDY_ACP_ARGS и в рабочей папке', () => {
    expect(
      coddySplitArgs(`--config "/etc/agent/coddy config.yaml"  --home x`),
    ).toEqual(['--config', '/etc/agent/coddy config.yaml', '--home', 'x']);
    expect(coddySplitArgs(undefined)).toEqual([]);
    expect(coddyAcpArgs({ args: ['--config', 'c.yaml'] })).toEqual([
      'acp',
      '--config',
      'c.yaml',
    ]);
    const env = coddyAcpEnv({
      bin: 'coddy',
      cwd: '/w',
      env: { NEURALDEEP_API_KEY: 'k', PATH: '/bin' },
    });
    expect(env).toMatchObject({ NEURALDEEP_API_KEY: 'k', PWD: '/w' });
  });

  it('виды инструментов Coddy приводятся к видам ACP', () => {
    expect(coddyToolKind('write')).toBe('edit');
    expect(coddyToolKind('run_command')).toBe('execute');
    expect(coddyToolKind('read')).toBe('read');
    expect(coddyToolKind('plan_write')).toBe('other');
    expect(coddyToolKind(undefined)).toBeUndefined();
  });

  it('session/new: id, модель, режим и команды агента', async () => {
    session = await start();
    expect(session.sessionId).toBe(`s-${dir.length}`);
    expect(session.agentName).toBe('Coddy Agent');
    expect(session.option('model')).toEqual({
      value: 'neuraldeep/qwen3.8-27b',
      name: 'qwen3.8-27b',
    });
    expect(session.hasOptionValue('permission_mode', 'bypass')).toBe(true);
    await new Promise((r) => setTimeout(r, 50));
    expect(session.commands.map((c) => c.name)).toEqual(['model', 'plan']);
    await session.setConfigOption('permission_mode', 'accept_edits');
    expect(session.option('permission_mode')?.value).toBe('accept_edits');
  });

  it('через DaemonTuiAdapter отдаёт текст, инструмент и разрешение', async () => {
    session = await start();
    const updates: DaemonTuiUpdate[] = [];
    const adapter: DaemonTuiAdapter = new DaemonTuiAdapter({
      session,
      onUpdate: (u) => {
        updates.push(u);
        if (u.type === 'permission_request') {
          void adapter.approvePermission(u.requestId, 'allow');
        }
      },
    });
    adapter.start();
    const result = await adapter.sendPrompt('сделай');
    await new Promise((r) => setTimeout(r, 50));
    await adapter.stop();

    expect(result.stopReason).toBe('end_turn');
    const texts = updates.flatMap((u) =>
      u.type === 'history' && u.item.type === 'gemini_content'
        ? [u.item.text]
        : [],
    );
    expect(texts).toEqual(['Пишу ', 'файл', 'готово']);
    const perm = updates.find((u) => u.type === 'permission_request');
    // вид write приведён к edit: иначе адаптер отбросил бы запрос
    expect(
      perm?.type === 'permission_request' && perm.request.toolCall,
    ).toMatchObject({ toolCallId: 't1', kind: 'edit', title: 'write a.txt' });
    expect(updates.some((u) => u.type === 'permission_resolved')).toBe(true);
    const lastGroup = updates
      .filter((u) => u.type === 'tool_group_update')
      .at(-1);
    expect(
      lastGroup?.type === 'tool_group_update' && lastGroup.item.tools[0],
    ).toMatchObject({ callId: 't1', status: 'Success' });
  });

  it('отказ в разрешении доходит до агента', async () => {
    session = await start();
    const texts: string[] = [];
    const adapter: DaemonTuiAdapter = new DaemonTuiAdapter({
      session,
      onUpdate: (u) => {
        if (u.type === 'permission_request')
          void adapter.rejectPermission(u.requestId);
        if (u.type === 'history' && u.item.type === 'gemini_content')
          texts.push(u.item.text);
      },
    });
    adapter.start();
    await adapter.sendPrompt('сделай');
    await new Promise((r) => setTimeout(r, 50));
    await adapter.stop();
    expect(texts.at(-1)).toBe('отказано');
  });

  it('вопрос агента: ответ уходит списком, без обработчика — ошибка, а не зависание', async () => {
    session = await start();
    const asked: string[] = [];
    session.onQuestion = async (qs) => {
      asked.push(`${qs[0].header}: ${qs[0].question}`);
      return [['Rust']];
    };
    const texts: string[] = [];
    const adapter = new DaemonTuiAdapter({
      session,
      onUpdate: (u) => {
        if (u.type === 'history' && u.item.type === 'gemini_content')
          texts.push(u.item.text);
      },
    });
    adapter.start();
    await adapter.sendPrompt('спроси');
    session.onQuestion = undefined;
    await adapter.sendPrompt('спроси ещё');
    await new Promise((r) => setTimeout(r, 50));
    await adapter.stop();
    expect(asked).toEqual(['Стек: На чём писать?']);
    expect(texts).toEqual(['выбрано: Rust', 'выбрано: нет ответа']);
  });

  it('смена модели командой агента обновляет вариант модели', async () => {
    session = await start();
    let infos = 0;
    session.onInfo = () => infos++;
    await session.prompt({
      prompt: [{ type: 'text', text: '/model neuraldeep/glm-5.1' }],
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(session.option('model')?.name).toBe('glm-5.1');
    expect(infos).toBeGreaterThan(0);
  });

  it('ответ без result (как у Coddy на set_mode) не вешает запрос', async () => {
    session = await start();
    const call = (
      session as unknown as {
        call: (m: string, p: unknown) => Promise<unknown>;
      }
    ).call.bind(session);
    await expect(
      call('session/set_mode', {
        sessionId: session.sessionId,
        modeId: 'plan',
      }),
    ).resolves.toBeNull();
  });

  it('падение процесса не вешает запуск', async () => {
    await expect(
      CoddyAcpSession.attach(spawnAgent({}, ['не-acp']), dir),
    ).rejects.toThrow(/завершился/);
  });

  it('падение Coddy посреди хода завершает запрос ошибкой', async () => {
    session = await start();
    await expect(
      session.prompt({ prompt: [{ type: 'text', text: 'умри' }] }),
    ).rejects.toThrow(/завершился/);
  });

  it('зависший session/new упирается в таймаут, процесс убит', async () => {
    const child = spawnAgent({ HANG_NEW_SESSION: '1' });
    await expect(CoddyAcpSession.attach(child, dir, 300)).rejects.toThrow(
      /не запустился/,
    );
    await new Promise((r) => setTimeout(r, 100));
    expect(child.killed || child.exitCode !== null).toBe(true);
  });
});
