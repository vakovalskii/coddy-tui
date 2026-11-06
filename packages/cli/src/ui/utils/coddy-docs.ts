/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: документация — CODDY-TUI.md установленной программы, а не сайт апстрима. CODDY_TUI_ASSETS_DIR ставит
// coddy/bin/coddy-tui.js (это <программа>/coddy), CODDY-TUI.md лежит уровнем выше.
// Без переменной или без файла (запуск мимо coddy-tui.js) — подсказка словами, а не чужой README из проекта.

import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

const FALLBACK = 'CODDY-TUI.md в папке программы';

/** Путь к CODDY-TUI.md программы или undefined, если его нет. */
export function coddyDocsFile(): string | undefined {
  const assets = process.env['CODDY_TUI_ASSETS_DIR'];
  if (!assets) return undefined;
  const file = path.resolve(assets, '..', 'CODDY-TUI.md');
  return existsSync(file) ? file : undefined;
}

/** Что показать человеку: путь к README или подсказку. */
export function coddyDocsPath(): string {
  return coddyDocsFile() ?? FALLBACK;
}

/** file:// для README или undefined. */
export function coddyDocsUrl(): string | undefined {
  const file = coddyDocsFile();
  return file ? pathToFileURL(file).href : undefined;
}
