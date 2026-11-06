/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { computeThresholds } from './chatCompressionService.js';

// coddy: потолок автосжатия CODDY_TUI_AUTOCOMPACT_MAX_TOKENS (ставит coddy/bin/coddy-tui.js)
describe('coddy auto-compact ceiling', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('без переменной — как в апстриме (85% окна)', () => {
    vi.stubEnv('CODDY_TUI_AUTOCOMPACT_MAX_TOKENS', '');
    expect(computeThresholds(1_000_000).auto).toBe(850_000);
  });

  it('окно 1M сжимается на 450k', () => {
    vi.stubEnv('CODDY_TUI_AUTOCOMPACT_MAX_TOKENS', '450000');
    const t = computeThresholds(1_000_000);
    expect(t.auto).toBe(450_000);
    expect(t.warn).toBe(430_000);
    expect(t.hard).toBeGreaterThan(t.auto);
  });

  it('окно 256K меньше потолка — порог по окну', () => {
    vi.stubEnv('CODDY_TUI_AUTOCOMPACT_MAX_TOKENS', '450000');
    expect(computeThresholds(262_144).auto).toBeCloseTo(0.85 * 262_144);
  });

  it('мусор в переменной игнорируется', () => {
    vi.stubEnv('CODDY_TUI_AUTOCOMPACT_MAX_TOKENS', 'abc');
    expect(computeThresholds(1_000_000).auto).toBe(850_000);
  });
});
