/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import { buildCoddyAuthNotice } from './coddy-auth-notice.js';

describe('coddy: подсказка вместо команды auth', () => {
  it('ведёт к NeuralDeep и не предлагает облачные способы апстрима', () => {
    const notice = buildCoddyAuthNotice();
    expect(notice).toContain('NEURALDEEP_API_KEY');
    expect(notice).toContain('/auth');
    expect(notice).toContain('/doctor');
    expect(notice).not.toMatch(
      /Qwen OAuth|Coding Plan|Token Plan|BAILIAN|dashscope/i,
    );
  });
});
