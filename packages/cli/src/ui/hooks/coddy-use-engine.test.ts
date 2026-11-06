/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// @vitest-environment jsdom

// coddy: ход через агента Coddy в TUI, на поддельном `coddy acp` вместо настоящего.

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApprovalMode } from '@qwen-code/qwen-code-core/config/approval-mode.js';
import { ToolConfirmationOutcome } from '@qwen-code/qwen-code-core/tools/tools.js';
import { SendMessageType } from '@qwen-code/qwen-code-core/core/client.js';
import {
  coddyAgentSlash,
  coddyLaunchFromEnv,
  coddyModelLabel,
  coddyQuestionAnswers,
  coddySessionSettings,
  coddyShellContext,
  coddyToolName,
  coddyTuiSlashAllowed,
  describePermission,
  useCoddyEngine,
} from './coddy-use-engine.js';
import {
  StreamingState,
  ToolCallStatus,
  type HistoryItemToolGroup,
  type HistoryItemWithoutId,
} from '../types.js';

const FAKE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'daemon',
  '__fixtures__',
  'fake-coddy-acp.mjs',
);
const launch = { bin: FAKE, args: [] };

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'coddy-hook-'));
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

function setup(
  mode: { current: ApprovalMode } = { current: ApprovalMode.DEFAULT },
) {
  const history: HistoryItemWithoutId[] = [];
  const addItem = vi.fn((item: HistoryItemWithoutId) => {
    history.push(item);
    return history.length;
  });
  const handleSlashCommand = vi.fn(async () => false);
  const submitShell = vi.fn(async () => {});
  const hook = renderHook(() =>
    useCoddyEngine({
      enabled: true,
      cwd: dir,
      getApprovalMode: () => mode.current,
      addItem,
      handleSlashCommand,
      shellModeActive: false,
      history: [],
      submitShell,
      launch,
    }),
  );
  return { hook, history, handleSlashCommand, submitShell };
}

const waitConfirming = (hook: ReturnType<typeof setup>['hook']) =>
  waitFor(
    () =>
      expect(hook.result.current.streamingState).toBe(
        StreamingState.WaitingForConfirmation,
      ),
    { timeout: 15000 },
  );

const pendingTool = (hook: ReturnType<typeof setup>['hook']) =>
  hook.result.current.pendingHistoryItems
    .find((i): i is HistoryItemToolGroup => i.type === 'tool_group')
    ?.tools.find((t) => t.status === ToolCallStatus.Confirming);

describe('useCoddyEngine', () => {
  it('движок включается только переменными из coddy-tui', () => {
    expect(coddyLaunchFromEnv({})).toBeNull();
    expect(coddyLaunchFromEnv({ CODDY_TUI_ENGINE: 'qwen' })).toBeNull();
    expect(coddyLaunchFromEnv({ CODDY_TUI_ENGINE: 'coddy' })).toBeNull();
    expect(
      coddyLaunchFromEnv({
        CODDY_TUI_ENGINE: 'coddy',
        CODDY_BIN: '/usr/bin/coddy',
        CODDY_ACP_ARGS: '--config /etc/agent/coddy-config.yaml',
      }),
    ).toEqual({
      bin: '/usr/bin/coddy',
      args: ['--config', '/etc/agent/coddy-config.yaml'],
    });
  });

  it('подписи и режимы: модель Coddy, имя инструмента из title, Shift+Tab → одобрение', () => {
    expect(coddyModelLabel(null)).toBe('Coddy');
    expect(
      coddyToolName({ name: 'other', description: 'bash', callId: 'c' }).name,
    ).toBe('bash');
    expect(
      coddyToolName({ name: 'edit', description: 'write', callId: 'c' }).name,
    ).toBe('edit');
    expect(coddySessionSettings(ApprovalMode.YOLO)).toEqual({
      mode: 'agent',
      permission: 'bypass',
    });
    expect(coddySessionSettings(ApprovalMode.PLAN).mode).toBe('plan');
    expect(coddySessionSettings(ApprovalMode.AUTO_EDIT).permission).toBe(
      'accept_edits',
    );
    expect(coddySessionSettings(ApprovalMode.DEFAULT).permission).toBe('ask');
    expect(coddyTuiSlashAllowed('/clear')).toBe(true);
    expect(coddyTuiSlashAllowed('/compress')).toBe(false);
    expect(coddyAgentSlash('/model x', [{ name: 'model' }])).toBe(true);
    expect(coddyAgentSlash('/compress', [{ name: 'model' }])).toBe(false);
  });

  it('ответы диалога вопросов → ответы ACP, мультивыбор делится по меткам', () => {
    const qs = [
      { question: 'a', options: [{ label: 'Go' }, { label: 'Rust' }] },
      {
        question: 'b',
        options: [{ label: 'x, y' }, { label: 'z' }],
        multiple: true,
      },
      { question: 'c', options: [] },
    ];
    expect(coddyQuestionAnswers(qs, { 0: 'Rust', 1: 'x, y, z, своё' })).toEqual(
      [['Rust'], ['x, y', 'z', 'своё'], []],
    );
  });

  it('ход: текст, подтверждение инструмента, итог в истории, модель в подписи', async () => {
    const { hook, history } = setup();
    await waitFor(
      () => expect(hook.result.current.modelLabel).toBe('Coddy · qwen3.8-27b'),
      { timeout: 15000 },
    );
    let done!: Promise<void>;
    act(() => {
      done = hook.result.current.submitQuery('сделай');
    });
    await waitConfirming(hook);
    const tool = pendingTool(hook);
    expect(tool?.callId).toBe('t1');
    expect(tool?.confirmationDetails?.type).toBe('info');
    await act(async () => {
      await tool!.confirmationDetails!.onConfirm(
        ToolConfirmationOutcome.ProceedOnce,
      );
      await done;
    });

    expect(hook.result.current.streamingState).toBe(StreamingState.Idle);
    expect(history[0]).toMatchObject({ type: 'user', text: 'сделай' });
    expect(history).toContainEqual({ type: 'gemini', text: 'Пишу файл' });
    expect(history.at(-1)).toEqual({ type: 'gemini', text: 'готово' });
    const committed = history.find(
      (i): i is HistoryItemToolGroup => i.type === 'tool_group',
    );
    expect(committed?.tools[0]).toMatchObject({
      callId: 't1',
      status: ToolCallStatus.Success,
    });
    hook.unmount();
  }, 30000);

  it('вопрос агента показывается диалогом вопросов, ответ уходит в Coddy', async () => {
    const { hook, history } = setup();
    let done!: Promise<void>;
    act(() => {
      done = hook.result.current.submitQuery('спроси');
    });
    await waitConfirming(hook);
    const tool = pendingTool(hook);
    const details = tool?.confirmationDetails;
    expect(details?.type).toBe('ask_user_question');
    expect(
      details?.type === 'ask_user_question' && details.questions[0],
    ).toMatchObject({ header: 'Стек', question: 'На чём писать?' });
    await act(async () => {
      await details!.onConfirm(ToolConfirmationOutcome.ProceedOnce, {
        answers: { 0: 'Go' },
      });
      await done;
    });
    expect(history.at(-1)).toEqual({ type: 'gemini', text: 'выбрано: Go' });
    hook.unmount();
  }, 30000);

  it('слэш-команды: свои TUI — локально, команды Coddy — агенту, остальные — подсказка', async () => {
    const { hook, history, handleSlashCommand } = setup();
    await waitFor(
      () => expect(hook.result.current.modelLabel).not.toBe('Coddy'),
      { timeout: 15000 },
    );
    await act(async () => {
      await hook.result.current.submitQuery('/compress');
      await hook.result.current.submitQuery('/help');
      await hook.result.current.submitQuery('/model neuraldeep/glm-5.1');
    });
    expect(history[0]).toMatchObject({ type: 'info' });
    expect(handleSlashCommand).toHaveBeenCalledTimes(1);
    expect(handleSlashCommand).toHaveBeenCalledWith('/help');
    expect(history.at(-1)).toEqual({ type: 'gemini', text: 'модель сменена' });
    expect(hook.result.current.modelLabel).toBe('Coddy · glm-5.1');
    hook.unmount();
  }, 30000);

  it(
    'команда оболочки исполняется локально, а не уходит в Coddy',
    { timeout: 30000 },
    async () => {
      const { hook, history, submitShell } = setup();
      await act(async () => {
        await hook.result.current.submitQuery('echo test', undefined, 'p1', {
          shellMode: true,
        });
      });
      expect(submitShell).toHaveBeenCalledTimes(1);
      expect(history).toEqual([]);
      // сообщение другой сессии в режиме ! в оболочку не идёт
      await act(async () => {
        await hook.result.current.submitQuery(
          'просто ответь',
          SendMessageType.Teammate,
          'p3',
          { shellMode: true },
        );
      });
      expect(submitShell).toHaveBeenCalledTimes(1);
      expect(history.at(-1)).toMatchObject({ type: 'gemini' });
      hook.unmount();
    },
  );

  it('Shift+Tab меняет режим и одобрение живой сессии Coddy', async () => {
    const mode = { current: ApprovalMode.YOLO };
    const { hook, history } = setup(mode);
    await act(async () => {
      await hook.result.current.submitQuery('просто ответь');
    });
    expect(history.at(-1)).toEqual({
      type: 'gemini',
      text: 'ок [agent/bypass]',
    });
    mode.current = ApprovalMode.PLAN;
    await act(async () => {
      await hook.result.current.handleApprovalModeChange(ApprovalMode.PLAN);
      await hook.result.current.submitQuery('просто ещё раз');
    });
    expect(history.at(-1)).toEqual({ type: 'gemini', text: 'ок [plan/ask]' });
    expect(hook.result.current.modelLabel).toBe('Coddy · qwen3.8-27b · Plan');
    hook.unmount();
  }, 30000);

  it('Esc, пока Coddy запускается, не отправляет запрос', async () => {
    const history: HistoryItemWithoutId[] = [];
    const hook = renderHook(() =>
      useCoddyEngine({
        // без раннего запуска: запрос сам поднимает Coddy
        enabled: false,
        cwd: dir,
        getApprovalMode: () => ApprovalMode.DEFAULT,
        addItem: (item) => history.push(item),
        handleSlashCommand: vi.fn(async () => false),
        shellModeActive: false,
        history: [],
        submitShell: vi.fn(async () => {}),
        launch,
      }),
    );
    let done!: Promise<void>;
    act(() => {
      done = hook.result.current.submitQuery('просто ответь');
      hook.result.current.cancelOngoingRequest();
    });
    await act(async () => {
      await done;
    });
    expect(history.at(-1)).toMatchObject({
      type: 'info',
      text: 'Запрос отменён',
    });
    expect(history.some((i) => i.type === 'gemini')).toBe(false);
    hook.unmount();
  }, 30000);

  it('запрос разрешения целиком и без управляющих символов', () => {
    const tail = 'x'.repeat(30000) + '; rm -rf ~';
    const text = describePermission({
      toolCall: {
        toolCallId: 't',
        title: 'run_command',
        content: [
          { type: 'content', content: { type: 'text', text: 'Execute: ls' } },
        ],
        rawInput: { command: tail + '\u001b[2J' },
      },
    });
    expect(text).toContain('Execute: ls');
    expect(text).toContain('; rm -rf ~');
    expect(text).not.toContain('\u001b');
  });

  it('вывод команд ! уходит в Coddy вместе со следующим запросом', () => {
    const history = [
      { type: 'user', text: 'старое' },
      { type: 'user_shell', text: 'cat error.log' },
      {
        type: 'tool_group',
        tools: [
          {
            callId: 's',
            name: 'shell',
            description: 'cat',
            resultDisplay: 'TypeError: x is undefined',
            status: ToolCallStatus.Success,
            confirmationDetails: undefined,
          },
        ],
      },
    ] as HistoryItemWithoutId[];
    const ctx = coddyShellContext(history, 1);
    expect(ctx).toContain('$ cat error.log');
    expect(ctx).toContain('TypeError: x is undefined');
    expect(coddyShellContext(history, 3)).toBe('');
  });
});
