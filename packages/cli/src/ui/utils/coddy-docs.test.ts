/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { coddyDocsFile, coddyDocsPath, coddyDocsUrl } from './coddy-docs.js';

const saved = process.env['CODDY_TUI_ASSETS_DIR'];
afterEach(() => {
  if (saved === undefined) delete process.env['CODDY_TUI_ASSETS_DIR'];
  else process.env['CODDY_TUI_ASSETS_DIR'] = saved;
});

describe('coddy-docs', () => {
  it('CODDY-TUI.md программы рядом с coddy/', () => {
    const app = mkdtempSync(path.join(os.tmpdir(), 'coddy-docs-'));
    mkdirSync(path.join(app, 'coddy'));
    writeFileSync(path.join(app, 'CODDY-TUI.md'), '# Coddy');
    process.env['CODDY_TUI_ASSETS_DIR'] = path.join(app, 'coddy');
    expect(coddyDocsFile()).toBe(path.join(app, 'CODDY-TUI.md'));
    expect(coddyDocsUrl()).toMatch(/^file:\/\/.*CODDY-TUI\.md$/);
  });

  it('без переменной — подсказка, не README текущего проекта', () => {
    delete process.env['CODDY_TUI_ASSETS_DIR'];
    expect(coddyDocsFile()).toBeUndefined();
    expect(coddyDocsUrl()).toBeUndefined();
    expect(coddyDocsPath()).toContain('папке программы');
  });

  it('README нет — тоже подсказка', () => {
    process.env['CODDY_TUI_ASSETS_DIR'] = path.join(
      os.tmpdir(),
      'нет-такой-папки',
      'coddy',
    );
    expect(coddyDocsFile()).toBeUndefined();
  });
});
