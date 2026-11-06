/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: фон диффа для своих тем без DiffAdded/DiffRemoved. Раньше брался из темы по умолчанию (Coddy, тёмная),
// и светлая своя тема получала почти чёрные подложки. Светлая или тёмная — по яркости цвета текста.
// Вызывается до проверки темы, поэтому принимает что угодно и никогда не бросает.

import { toHex } from './color-utils.js';

function luminance(color: unknown): number | null {
  const hex = typeof color === 'string' ? toHex(color) : undefined;
  if (!hex) return null;
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function coddyDiffDefaults(foreground: unknown): {
  DiffAdded: string;
  DiffRemoved: string;
} {
  let l: number | null = null;
  try {
    l = luminance(foreground);
  } catch {
    // «constructor», «__proto__» и прочее, на чём спотыкается разбор цвета
  }
  // тёмный текст — светлая тема
  return l !== null && l < 0.5
    ? { DiffAdded: '#C6EAD8', DiffRemoved: '#FFCCCC' }
    : { DiffAdded: '#2B3A10', DiffRemoved: '#4A1C1F' };
}
