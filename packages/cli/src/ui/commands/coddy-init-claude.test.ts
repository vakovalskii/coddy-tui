/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { coddyInitClaudeHint } from './coddy-init-claude.js';

describe('coddy: /init рядом с CLAUDE.md', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'coddy-init-'));
  });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('без CLAUDE.md — ничего', () => {
    expect(coddyInitClaudeHint(dir, 'AGENTS.md')).toBe('');
  });

  it('CLAUDE.md без AGENTS.md — перенести правила и оставить в CLAUDE.md @AGENTS.md', () => {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# Rules\n- no secrets\n');
    const hint = coddyInitClaudeHint(dir, 'AGENTS.md');
    expect(hint).toContain('CLAUDE.md');
    expect(hint).toContain('`@AGENTS.md`');
  });

  it('AGENTS.md уже есть, CLAUDE.md уже ссылка или /init пишет не AGENTS.md — ничего', () => {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '@AGENTS.md\n');
    expect(coddyInitClaudeHint(dir, 'AGENTS.md')).toBe('');
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# Rules\n');
    expect(coddyInitClaudeHint(dir, 'QWEN.md')).toBe('');
    fs.writeFileSync(path.join(dir, 'AGENTS.md'), '# Agents\n');
    expect(coddyInitClaudeHint(dir, 'AGENTS.md')).toBe('');
  });
});
