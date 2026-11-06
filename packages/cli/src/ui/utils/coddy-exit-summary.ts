/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: итог сессии в обычном экране терминала после выхода. Рамка «Agent powering down» рисуется на
// альтернативном экране (ui.useTerminalBuffer) и при выходе стирается, а это остаётся в истории терминала.

import { uiTelemetryService } from '@qwen-code/qwen-code-core/telemetry/uiTelemetry.js';
import { t } from '../../i18n/index.js';

const GRADIENT: Array<[number, number, number]> = [
  [0x2f, 0xc6, 0xf6],
  [0x3e, 0x6b, 0xff],
  [0x7b, 0x61, 0xff],
];
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[38;2;47;198;246m';

function gradient(text: string): string {
  const chars = [...text];
  return (
    chars
      .map((ch, i) => {
        const pos = chars.length > 1 ? i / (chars.length - 1) : 0;
        const seg = Math.min(
          GRADIENT.length - 2,
          Math.floor(pos * (GRADIENT.length - 1)),
        );
        const local = pos * (GRADIENT.length - 1) - seg;
        const [a, b] = [GRADIENT[seg], GRADIENT[seg + 1]];
        const c = a.map((v, k) => Math.round(v + (b[k] - v) * local));
        return `\x1b[1;38;2;${c[0]};${c[1]};${c[2]}m${ch}`;
      })
      .join('') + RESET
  );
}

const fmt = (n: number) =>
  n < 1000
    ? String(n)
    : n < 1_000_000
      ? `${Math.round(n / 1000)}k`
      : `${(n / 1_000_000).toFixed(1)}M`;

function duration(ms: number): string {
  const min = Math.round(ms / 60000);
  if (min < 1) return t('less than a minute');
  if (min < 60) return t('{{n}} min', { n: String(min) });
  return t('{{h}} h {{m}} min', {
    h: String(Math.floor(min / 60)),
    m: String(min % 60),
  });
}

/** Строки итога: название градиентом, длительность, запросы, токены и кеш; затем как продолжить. */
export function coddyExitSummary(sessionId: string, uptimeMs: number): string {
  let requests = 0;
  let prompt = 0;
  let cached = 0;
  let output = 0;
  try {
    for (const m of Object.values(uiTelemetryService.getMetrics().models)) {
      requests += m.api.totalRequests;
      prompt += m.tokens.prompt;
      cached += m.tokens.cached;
      output += m.tokens.candidates;
    }
  } catch {
    // без метрик — только название и команда
  }
  const parts = [duration(uptimeMs)];
  if (requests) {
    parts.push(t('requests: {{n}}', { n: String(requests) }));
    parts.push(
      t('tokens: {{in}} in / {{out}} out', {
        in: fmt(prompt),
        out: fmt(output),
      }),
    );
    if (prompt) {
      parts.push(
        t('cache {{pct}}%', {
          pct: String(Math.round((cached / prompt) * 100)),
        }),
      );
    }
  }
  return [
    '',
    `${gradient('▌ Coddy')}  ${DIM}${parts.join(' · ')}${RESET}`,
    `  ${t('To continue this session, run')} ${CYAN}coddy-tui --resume ${sessionId}${RESET}`,
  ].join('\n');
}
