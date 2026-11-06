/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { deflateSync } from 'node:zlib';
import {
  imageThumbnail,
  imageThumbnailKitty,
  thumbMode,
} from './coddy-image-thumb.js';

// PNG w×h: верхняя половина красная, нижняя синяя
function png(w: number, h: number): Buffer {
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (b: Buffer) => {
    let c = 0xffffffff;
    for (const x of b) c = crcTable[(c ^ x) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type: string, data: Buffer) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const rows = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 3);
    for (let x = 0; x < w; x++) {
      row[1 + x * 3] = y < h / 2 ? 255 : 0;
      row[3 + x * 3] = y < h / 2 ? 0 : 255;
    }
    rows.push(row);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(rows))),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

describe.skipIf(process.platform !== 'darwin')('imageThumbnail', () => {
  it('рисует полублоками, не шире и не выше заданного', async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'coddy-thumb-test-'));
    const file = path.join(dir, 'a.png');
    writeFileSync(file, png(40, 40));
    const lines = await imageThumbnail(file, 10, 5);
    expect(lines).not.toBeNull();
    expect(lines!.length).toBeLessThanOrEqual(5);
    // eslint-disable-next-line no-control-regex
    const visible = lines![0].replace(/\x1b\[[0-9;]*m/g, '');
    expect([...visible].length).toBeLessThanOrEqual(10);
    expect(visible).toMatch(/^▀+$/);
    // верх красный: цвет символа 255;0;0
    expect(lines![0]).toContain('38;2;255;0;0');
    // низ синий
    expect(lines![lines!.length - 1]).toContain('0;0;255');
  });

  it('нет файла — null', async () => {
    expect(await imageThumbnail('/nonexistent/x.png', 10, 5)).toBeNull();
  });
});

describe('thumbMode', () => {
  it('kitty, Ghostty и iTerm2 3.7+ — настоящие картинки', () => {
    expect(thumbMode({ TERM: 'xterm-kitty' }, true)).toBe('kitty');
    expect(thumbMode({ TERM_PROGRAM: 'ghostty' }, true)).toBe('kitty');
    expect(
      thumbMode(
        { TERM_PROGRAM: 'iTerm.app', TERM_PROGRAM_VERSION: '3.7.6' },
        true,
      ),
    ).toBe('kitty');
  });

  it('старый iTerm2, tmux, ssh, не терминал и прочие — полублоки', () => {
    expect(
      thumbMode(
        { TERM_PROGRAM: 'iTerm.app', TERM_PROGRAM_VERSION: '3.5.4' },
        true,
      ),
    ).toBe('blocks');
    expect(
      thumbMode(
        { TERM_PROGRAM: 'tmux', TMUX: '/tmp/tmux-1/default,1,0' },
        true,
      ),
    ).toBe('blocks');
    expect(
      thumbMode({ TERM: 'xterm-kitty', SSH_TTY: '/dev/ttys001' }, true),
    ).toBe('blocks');
    expect(thumbMode({ TERM: 'xterm-kitty' }, false)).toBe('blocks');
    expect(thumbMode({ TERM_PROGRAM: 'Apple_Terminal' }, true)).toBe('blocks');
  });

  it('CODDY_TUI_IMAGE_THUMBS переопределяет', () => {
    expect(
      thumbMode(
        { TERM: 'xterm-kitty', CODDY_TUI_IMAGE_THUMBS: 'blocks' },
        true,
      ),
    ).toBe('blocks');
    expect(thumbMode({ CODDY_TUI_IMAGE_THUMBS: 'kitty' }, true)).toBe('kitty');
  });
});

describe.skipIf(process.platform !== 'darwin')('imageThumbnailKitty', () => {
  it('плейсхолдеры по пропорциям картинки и одна передача U=1', async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'coddy-thumb-test-'));
    const file = path.join(dir, 'wide.png');
    writeFileSync(file, png(160, 50));
    const thumb = await imageThumbnailKitty(file, 40, 10);
    expect(thumb).not.toBeNull();
    // 160×50 в клетках 1:2 — 40 столбцов и 6 строк
    expect(thumb!.lines).toHaveLength(6);
    const cells = [...thumb!.lines[0].matchAll(/\u{10EEEE}/gu)];
    expect(cells).toHaveLength(40);
    // eslint-disable-next-line no-control-regex
    expect(thumb!.sequence).toMatch(/^\x1b_Ga=T,f=100,i=\d+,q=2,U=1,c=40,r=6/);
    // id в цвете 38;2;r;g;b — 24 бита
    const id = Number(/i=(\d+)/.exec(thumb!.sequence)![1]);
    const rgb = `${id >> 16};${(id >> 8) & 0xff};${id & 0xff}`;
    expect(thumb!.lines[0].startsWith(`\x1b[38;2;${rgb}m`)).toBe(true);
  });

  it('параллельные миниатюры не мешают друг другу, id не повторяются', async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'coddy-thumb-test-'));
    const wide = path.join(dir, 'wide.png');
    const tall = path.join(dir, 'tall.png');
    writeFileSync(wide, png(160, 50));
    writeFileSync(tall, png(50, 160));
    const thumbs = await Promise.all(
      Array.from({ length: 6 }, (_, i) =>
        imageThumbnailKitty(i % 2 ? tall : wide, 40, 10),
      ),
    );
    thumbs.forEach((thumb, i) =>
      // широкая — 6 строк, высокая — 10: чужой файл дал бы не те размеры
      expect(thumb!.lines).toHaveLength(i % 2 ? 10 : 6),
    );
    const ids = thumbs.map((thumb) => /i=(\d+)/.exec(thumb!.sequence)![1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
