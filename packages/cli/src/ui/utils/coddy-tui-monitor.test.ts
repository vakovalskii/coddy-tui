/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it, vi } from 'vitest';
import { EventEmitter } from 'node:events';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { coddyClassifyInput } from './coddy-tui-monitor.js';

describe('coddyClassifyInput', () => {
  it('колесо мыши SGR: вверх и вниз', () => {
    expect(coddyClassifyInput('\x1b[<64;10;10M\x1b[<64;10;10M')).toEqual({
      kind: 'wheel-up',
      n: 2,
    });
    expect(coddyClassifyInput('\x1b[<65;10;10M')).toEqual({
      kind: 'wheel-down',
      n: 1,
    });
  });

  it('PageUp/PageDown и стрелки', () => {
    expect(coddyClassifyInput('\x1b[5~')).toEqual({ kind: 'pgup', n: 1 });
    expect(coddyClassifyInput('\x1b[6~\x1b[6~')).toEqual({
      kind: 'pgdn',
      n: 2,
    });
    expect(coddyClassifyInput('\x1b[A')).toEqual({ kind: 'up', n: 1 });
    expect(coddyClassifyInput('\x1bOB')).toEqual({ kind: 'down', n: 1 });
  });

  it('обычный текст не раскрывается, только вид', () => {
    expect(coddyClassifyInput('secret')).toEqual({ kind: 'key', n: 1 });
    expect(coddyClassifyInput('x'.repeat(100))).toEqual({
      kind: 'paste',
      n: 1,
    });
  });
});

describe('кадр монитора', () => {
  it('рендер после первой записи кадра (очистка при сужении) входит в render', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'coddy-monitor-test-'));
    const file = path.join(dir, 'm.jsonl');
    vi.stubEnv('CODDY_TUI_MONITOR', '1');
    vi.stubEnv('CODDY_TUI_MONITOR_FILE', file);
    vi.resetModules();
    const m = await import('./coddy-tui-monitor.js');
    const stdout = Object.assign(new EventEmitter(), {
      write: () => true,
      columns: 80,
      rows: 24,
    }) as unknown as NodeJS.WriteStream;
    const stdin = new EventEmitter() as unknown as NodeJS.ReadStream;
    const stop = m.installCoddyTuiMonitor(stdout, stdin);
    stdout.write('\x1b[2J');
    m.coddyMonitorInkRender({ renderTime: 3.5 });
    stdout.write('кадр');
    await new Promise((resolve) => setImmediate(resolve));
    stop();
    vi.unstubAllEnvs();
    const frames = fs
      .readFileSync(file, 'utf8')
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l))
      .filter((e) => e.e === 'frame');
    fs.rmSync(dir, { recursive: true, force: true });
    expect(frames).toHaveLength(1);
    expect(frames[0].render).toBe(3.5);
  });
});
