/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { render } from 'ink-testing-library';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MAIN_SOURCE } from '@qwen-code/qwen-code-core';
import { SessionSummaryDisplay } from '../components/SessionSummaryDisplay.js';
import {
  SessionStatsContext,
  type SessionMetrics,
} from '../contexts/SessionContext.js';
import { ConfigContext } from '../contexts/ConfigContext.js';
import {
  _resetCoddyQuitSummaryForTest,
  coddyQuitSummaryText,
} from './coddy-quit-echo.js';

const core = {
  api: { totalRequests: 3, totalErrors: 0, totalLatencyMs: 1200 },
  tokens: {
    prompt: 17778,
    candidates: 5,
    total: 17783,
    cached: 6144,
    thoughts: 0,
  },
};
const metrics: SessionMetrics = {
  models: {
    'neuraldeep/test-model': { ...core, bySource: { [MAIN_SOURCE]: core } },
  },
  tools: {
    totalCalls: 0,
    totalSuccess: 0,
    totalFail: 0,
    totalDurationMs: 0,
    totalDecisions: { accept: 0, reject: 0, modify: 0, auto_accept: 0 },
    byName: {},
  },
  files: { totalLinesAdded: 0, totalLinesRemoved: 0 },
};

describe('coddy-quit-echo', () => {
  beforeEach(() => _resetCoddyQuitSummaryForTest());

  it('пусто, если итог не рисовался', () => {
    expect(coddyQuitSummaryText(100)).toBe('');
  });

  it('после отрисовки итога и размонтирования повторяет рамку со статистикой', () => {
    const stats = {
      stats: {
        sessionId: 's-1',
        sessionStartTime: new Date(),
        metrics,
        lastPromptTokenCount: 0,
        promptCount: 1,
      },
      startNewSession: vi.fn(),
      startNewPrompt: vi.fn(),
      getPromptCount: () => 1,
      seedPromptCount: vi.fn(),
    };
    const config = { getChatRecordingService: () => ({}) };
    const { unmount } = render(
      <ConfigContext.Provider value={config as never}>
        <SessionStatsContext.Provider value={stats}>
          <SessionSummaryDisplay duration="1m 5s" width={100} />
        </SessionStatsContext.Provider>
      </ConfigContext.Provider>,
    );
    unmount();

    const text = coddyQuitSummaryText(100);
    expect(text).toContain('Agent powering down. Goodbye!');
    expect(text).toContain('1m 5s');
    expect(text).toContain('neuraldeep/test-model');
  });
});
