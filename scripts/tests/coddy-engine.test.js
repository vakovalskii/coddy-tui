/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: выбор движка в coddy/bin/coddy-engine.js и команда `engine` в coddy/bin/coddy-tui.js.

import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_ENGINE,
  engineFile,
  pickEngine,
  readEngine,
  resolveCoddyBin,
  takeEngineFlag,
  writeEngine,
} from '../../coddy/bin/coddy-engine.js';

const ENTRY = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../coddy/bin/coddy-tui.js',
);

let home;
beforeEach(() => {
  home = mkdtempSync(path.join(tmpdir(), 'coddy-engine-'));
});
afterEach(() => rmSync(home, { recursive: true, force: true }));

describe('coddy-engine', () => {
  it('флаг --engine вынимается из аргументов в обеих формах', () => {
    expect(takeEngineFlag(['--engine', 'qwen', '-y'])).toEqual({
      engine: 'qwen',
      rest: ['-y'],
    });
    expect(takeEngineFlag(['--engine=coddy'])).toEqual({
      engine: 'coddy',
      rest: [],
    });
    expect(takeEngineFlag(['-p', 'x'])).toEqual({
      engine: null,
      rest: ['-p', 'x'],
    });
    expect(() => takeEngineFlag(['--engine', 'gpt'])).toThrow(/неизвестный/);
  });

  it('выбор сохраняется, мусор в файле не считается выбором', () => {
    expect(readEngine(home)).toBeNull();
    writeEngine(home, 'qwen');
    expect(readEngine(home)).toBe('qwen');
    writeFileSync(engineFile(home), '{"engine":"other"}');
    expect(readEngine(home)).toBeNull();
  });

  it('по умолчанию Coddy; флаг важнее переменной, переменная важнее сохранённого', () => {
    expect(DEFAULT_ENGINE).toBe('coddy');
    expect(pickEngine(home, null, {})).toBe('coddy');
    writeEngine(home, 'qwen');
    expect(pickEngine(home, null, {})).toBe('qwen');
    expect(pickEngine(home, null, { CODDY_TUI_ENGINE: 'coddy' })).toBe('coddy');
    expect(pickEngine(home, 'qwen', { CODDY_TUI_ENGINE: 'coddy' })).toBe(
      'qwen',
    );
    expect(() => pickEngine(home, null, { CODDY_TUI_ENGINE: 'x' })).toThrow(
      /неизвестный/,
    );
  });

  it('бинарь Coddy: CODDY_BIN, иначе coddy из PATH', () => {
    const dir = path.join(home, 'bin');
    mkdirSync(dir);
    const bin = path.join(dir, 'coddy');
    writeFileSync(bin, '#!/bin/sh\n');
    chmodSync(bin, 0o755);
    expect(resolveCoddyBin({ PATH: dir })).toBe(bin);
    expect(resolveCoddyBin({ PATH: path.join(home, 'none') })).toBeNull();
    expect(resolveCoddyBin({ CODDY_BIN: bin, PATH: '' })).toBe(bin);
    expect(
      resolveCoddyBin({ CODDY_BIN: path.join(home, 'nope'), PATH: dir }),
    ).toBeNull();
  });

  const entry = (args, env = {}) =>
    spawnSync(process.execPath, [ENTRY, ...args], {
      encoding: 'utf8',
      env: { ...process.env, QWEN_HOME: home, ...env },
      timeout: 30000,
    });

  it('engine qwen сохраняет выбор, неизвестный движок — ошибка', () => {
    expect(entry(['engine', 'qwen']).stdout).toContain(
      'Движок по умолчанию: qwen',
    );
    expect(readEngine(home)).toBe('qwen');
    const bad = entry(['engine', 'gpt']);
    expect(bad.status).toBe(1);
    expect(bad.stderr).toContain('неизвестный движок');
  });

  it('правила агента ложатся блоком в AGENTS.md каталога программы', () => {
    entry(['--version']);
    expect(readFileSync(path.join(home, 'AGENTS.md'), 'utf8')).toContain(
      'coddy-tui:begin',
    );
  });
});
