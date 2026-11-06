/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { waitTaken } from './coddy-image-editor.js';

describe('waitTaken', () => {
  const request = () => {
    const file = path.join(
      mkdtempSync(path.join(os.tmpdir(), 'coddy-editor-test-')),
      'r.json',
    );
    writeFileSync(file, '{}');
    return file;
  };

  it('панель ответила TAKEN — ждём её ответа', async () => {
    const file = request();
    const taken = new Promise<boolean>((resolve) =>
      setTimeout(() => {
        rmSync(file);
        resolve(true);
      }, 30),
    );
    expect(await waitTaken(taken, file, 1000)).toBe(true);
  });

  it('не взяла вовремя — заказ удалён, откат на свою панель', async () => {
    const file = request();
    expect(await waitTaken(new Promise(() => {}), file, 60)).toBe(false);
    expect(existsSync(file)).toBe(false);
  });

  it('файл исчез без TAKEN (выброшен как просроченный) — не ждём ответа вечно', async () => {
    const file = request();
    rmSync(file);
    expect(await waitTaken(new Promise(() => {}), file, 30, 30)).toBe(false);
  });
});
