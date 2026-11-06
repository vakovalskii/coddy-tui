#!/usr/bin/env node
/* global process, setTimeout, clearTimeout */

/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Статус-лайн Coddy TUI: модель │ папка (ветка) │ контекст │ кеш.
 * TUI передаёт на stdin JSON (StatusLineCommandInput в packages/cli/src/ui/hooks/useStatusLine.ts).
 */

import path from 'node:path';

const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const PINK = '\x1b[38;2;255;125;218m';
const YELLOW = '\x1b[33m';
const ORANGE = '\x1b[38;2;255;140;0m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';

const fmt = (n) => {
  if (n < 1000) return String(n);
  if (n < 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  if (n < 1000000) return Math.round(n / 1000) + 'k';
  return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
};

const pctColor = (pct) =>
  pct < 50 ? PINK : pct < 65 ? YELLOW : pct < 80 ? ORANGE : RED;

function readStdin() {
  return new Promise((resolve) => {
    let input = '';
    const t = setTimeout(() => resolve(input), 3000);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (input += c));
    process.stdin.on('end', () => {
      clearTimeout(t);
      resolve(input);
    });
  });
}

function contextSegment(cw) {
  const size = Number(cw?.context_window_size) || 0;
  const used = Number(cw?.current_usage) || 0;
  const pct = Number.isFinite(cw?.used_percentage)
    ? Math.round(cw.used_percentage)
    : size
      ? Math.round((used / size) * 100)
      : NaN;
  if (!Number.isFinite(pct)) return '';
  const steps = Math.max(0, Math.min(10, Math.floor(pct / 10)));
  let bar = '';
  for (let i = 0; i < 5; i++) {
    const cell = Math.max(0, Math.min(2, steps - i * 2));
    bar += cell === 2 ? '█' : cell === 1 ? '▌' : '░';
  }
  // 250k — порог, после которого длинный контекст дорог и хуже по качеству, даже если окно 1M
  let color = pctColor(pct);
  if (used >= 250000 && color === PINK) color = YELLOW;
  const abs = size ? ` ${fmt(used)}/${fmt(size)}` : '';
  return `${color}${bar}${abs}${RESET}`;
}

function cacheSegment(models) {
  let prompt = 0;
  let cached = 0;
  for (const m of Object.values(models || {})) {
    prompt += Number(m?.tokens?.prompt) || 0;
    cached += Number(m?.tokens?.cached) || 0;
  }
  if (!prompt) return '';
  const ratio = Math.round((cached / prompt) * 100);
  const color =
    ratio === 0
      ? '\x1b[1;31m'
      : ratio >= 90
        ? '\x1b[1;32m'
        : ratio >= 75
          ? '\x1b[32m'
          : ratio >= 50
            ? YELLOW
            : ORANGE;
  const parts = [`${DIM}cache${RESET}`, `${color}${ratio}%${RESET}`];
  if (cached) parts.push(`\x1b[1;32m↓${fmt(cached)}${RESET}`);
  return parts.join(' ');
}

const shortModel = (name) => name.replace(/^[^/]+\//, '');

const data = JSON.parse((await readStdin()) || '{}');
const dir = data.workspace?.current_dir || process.cwd();
const dirName = path.basename(dir);
const branch = data.worktree?.branch || data.git?.branch;
const segments = [
  `${DIM}${shortModel(data.model?.display_name || '')}${RESET}`,
  `${DIM}${dirName}${RESET}${branch ? ` ${CYAN}(${branch})${RESET}` : ''}`,
  contextSegment(data.context_window),
  cacheSegment(data.metrics?.models),
].filter(Boolean);
process.stdout.write(segments.join(' │ '));
