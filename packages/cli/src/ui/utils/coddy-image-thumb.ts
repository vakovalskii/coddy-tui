/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: миниатюра вложенной картинки прямо в терминале, как в Claude Code. Уменьшает sips (macOS), на других
// системах миниатюры нет. Два вида:
// - kitty graphics с unicode-плейсхолдерами: картинка передаётся терминалу один раз (виртуальное размещение U=1),
//   а в строках Ink — обычные символы U+10EEEE с диакритиками ряда и столбца и цветом = id картинки. Ink
//   перерисовывает их как текст, картинка не стирается и не дублируется. kitty, Ghostty, iTerm2 3.7+;
// - полублоки «▀» (верхний пиксель — цвет символа, нижний — фон, два ряда пикселей в строке) — везде ещё,
//   в tmux и по ssh (tmux не пропускает kitty graphics без passthrough).

import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { promises as fs, statSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  buildKittyPlaceholder,
  encodeKittyVirtualImage,
  readPngSize,
} from './mermaidImageRenderer.js';
import { supportsKittyImageProtocol } from './terminal-image-renderer.js';

export type ThumbMode = 'kitty' | 'blocks';

// iTerm2 понимает kitty graphics и плейсхолдеры (проверено на 3.7.6: ответ OK на запрос a=q, курсор стоит на
// месте после a=T,U=1). Старее — полублоки, чтобы не показать пустое место.
function isITerm2WithKitty(env: NodeJS.ProcessEnv): boolean {
  if (env['TERM_PROGRAM'] !== 'iTerm.app') return false;
  const [major = 0, minor = 0] = (env['TERM_PROGRAM_VERSION'] ?? '')
    .split('.')
    .map(Number);
  return major > 3 || (major === 3 && minor >= 7);
}

/** Чем рисовать миниатюры. CODDY_TUI_IMAGE_THUMBS=kitty|blocks — принудительно. */
export function thumbMode(
  env: NodeJS.ProcessEnv = process.env,
  stdoutIsTTY: boolean = process.stdout.isTTY,
): ThumbMode {
  const forced = env['CODDY_TUI_IMAGE_THUMBS'];
  if (forced === 'blocks' || !stdoutIsTTY) return 'blocks';
  if (forced === 'kitty') return 'kitty';
  if (env['TMUX'] || env['STY'] || env['SSH_TTY'] || env['SSH_CLIENT']) {
    return 'blocks';
  }
  return supportsKittyImageProtocol(env, stdoutIsTTY) || isITerm2WithKitty(env)
    ? 'kitty'
    : 'blocks';
}
import { coddyTimed } from './coddy-tui-monitor.js';

const cache = new Map<string, string[] | null>();

// Временный файл на каждую миниатюру: параллельные вызовы в одну миллисекунду не должны писать в один файл
let tmpSeq = 0;
function thumbTmpFile(ext: string): string {
  return path.join(
    os.tmpdir(),
    `coddy-thumb-${process.pid}-${++tmpSeq}-${randomBytes(4).toString('hex')}.${ext}`,
  );
}

function shift(mask: number): number {
  let s = 0;
  while (mask && !(mask & 1)) {
    mask >>>= 1;
    s++;
  }
  return s;
}

// BMP от sips: 32 бита, BI_BITFIELDS, строки сверху вниз (высота отрицательная)
function decodeBmp(d: Buffer) {
  if (d.toString('latin1', 0, 2) !== 'BM') return null;
  const offset = d.readUInt32LE(10);
  const header = d.readUInt32LE(14);
  const width = d.readInt32LE(18);
  const rawHeight = d.readInt32LE(22);
  const bpp = d.readUInt16LE(28);
  const compression = d.readUInt32LE(30);
  if (bpp !== 32 && bpp !== 24) return null;
  const height = Math.abs(rawHeight);
  const topDown = rawHeight < 0;
  let masks = [0x00ff0000, 0x0000ff00, 0x000000ff];
  if (compression === 3 && header >= 52) {
    masks = [d.readUInt32LE(54), d.readUInt32LE(58), d.readUInt32LE(62)];
  }
  const stride = Math.ceil((width * bpp) / 32) * 4;
  const pixel = (x: number, y: number): [number, number, number] => {
    const row = topDown ? y : height - 1 - y;
    const at = offset + row * stride + x * (bpp / 8);
    if (bpp === 24) return [d[at + 2], d[at + 1], d[at]];
    const v = d.readUInt32LE(at);
    return masks.map((m) => ((v & m) >>> shift(m)) & 0xff) as [
      number,
      number,
      number,
    ];
  };
  return { width, height, pixel };
}

function run(cmd: string, args: string[]): Promise<boolean> {
  return new Promise((resolve) =>
    execFile(cmd, args, { timeout: 5000 }, (err) => resolve(!err)),
  );
}

/** Строки миниатюры (с ANSI-цветами) не шире cols и не выше rows; null — нет миниатюры. */
export async function imageThumbnail(
  file: string,
  cols: number,
  rows: number,
): Promise<string[] | null> {
  if (process.platform !== 'darwin') return null;
  let key: string;
  try {
    key = `${file}:${statSync(file).mtimeMs}:${cols}x${rows}`;
  } catch {
    return null;
  }
  if (cache.has(key)) return cache.get(key) ?? null;
  const out = thumbTmpFile('bmp');
  let lines: string[] | null = null;
  try {
    // сначала узнаём пропорции, потом уменьшаем до cols × rows*2 пикселей
    if (
      await coddyTimed(
        'image.thumb-sips',
        run('sips', [
          '-s',
          'format',
          'bmp',
          '-Z',
          String(Math.max(cols, rows * 2)),
          file,
          '--out',
          out,
        ]),
      )
    ) {
      const img = decodeBmp(await fs.readFile(out));
      if (img) {
        const scale = Math.min(cols / img.width, (rows * 2) / img.height, 1);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(2, Math.round(img.height * scale));
        const sample = (x: number, y: number) =>
          img.pixel(
            Math.min(img.width - 1, Math.floor((x * img.width) / w)),
            Math.min(img.height - 1, Math.floor((y * img.height) / h)),
          );
        lines = [];
        for (let y = 0; y < h; y += 2) {
          let line = '';
          for (let x = 0; x < w; x++) {
            const [r1, g1, b1] = sample(x, y);
            const [r2, g2, b2] = y + 1 < h ? sample(x, y + 1) : [r1, g1, b1];
            line += `\x1b[38;2;${r1};${g1};${b1}m\x1b[48;2;${r2};${g2};${b2}m▀`;
          }
          lines.push(line + '\x1b[0m');
        }
      }
    }
  } catch {
    lines = null;
  } finally {
    await fs.rm(out, { force: true }).catch(() => {});
  }
  cache.set(key, lines);
  return lines;
}

export interface KittyThumb {
  /** передать терминалу один раз (APC, ответы выключены q=2) */
  sequence: string;
  /** строки плейсхолдеров с цветом id, ширина — в клетках */
  lines: string[];
}

// Точек на клетку: с запасом на Retina, терминал всё равно масштабирует картинку в свои клетки
const CELL_W = 16;
const CELL_H = 32;
// 24-битный id, цвет 38;2;r;g;b пишем прямо в строку (не зависит от того, сколько цветов насчитал chalk).
// Случайный: не повторяется за сессию, старая строка в кэше компонента не покажет чужую картинку

/** Миниатюра для kitty graphics не шире cols и не выше rows клеток; null — не вышло. */
export async function imageThumbnailKitty(
  file: string,
  cols: number,
  rows: number,
): Promise<KittyThumb | null> {
  if (process.platform !== 'darwin') return null;
  const out = thumbTmpFile('png');
  try {
    if (
      !(await run('sips', [
        '-s',
        'format',
        'png',
        '-Z',
        String(Math.max(cols * CELL_W, rows * CELL_H)),
        file,
        '--out',
        out,
      ]))
    ) {
      return null;
    }
    const png = await fs.readFile(out);
    const size = readPngSize(png);
    if (!size || size.width === 0 || size.height === 0) return null;
    // клетка вдвое выше своей ширины
    const ratio = size.width / size.height;
    let w = cols;
    let h = Math.round(cols / ratio / 2);
    if (h > rows) {
      h = rows;
      w = Math.round(rows * 2 * ratio);
    }
    w = Math.max(1, Math.min(cols, w));
    h = Math.max(1, Math.min(rows, h));
    const id = randomBytes(3).readUIntBE(0, 3) || 1;
    const rgb = [id >> 16, (id >> 8) & 0xff, id & 0xff].join(';');
    const { lines } = buildKittyPlaceholder(id, w, h);
    return {
      sequence: encodeKittyVirtualImage(png, id, w, h),
      lines: lines.map((line) => `\x1b[38;2;${rgb}m${line}\x1b[39m`),
    };
  } catch {
    return null;
  } finally {
    await fs.rm(out, { force: true }).catch(() => {});
  }
}
