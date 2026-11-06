/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: правка и просмотр вставленной картинки. Редактор — нативная панель macOS из paste-preview
// (coddy/image-editor, MIT), просмотр — Quick Look. На других системах — no-op.
//
// Панель держим прогретой, как в плагине: она стартует вместе с сессией (`panel serve`), прячется и ждёт заказы —
// файл <id>.json в папке заказов, «TAKEN <id>» при приёме, ответ строкой «SAVED <id>» или «CANCELLED <id>». Холодный запуск (процесс,
// AppKit, WebKit, страница) — 0,5–1 с между вставкой и окном, прогретой панели остаётся только показаться.
// Без дела 20 минут панель выходит сама, следующее нажатие клавиши запускает её снова. Не запустилась —
// каждая правка открывает свою панель, как раньше.

import { execFile, spawn } from 'node:child_process';
import { promises as fs, existsSync, rmSync, statSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { coddyTimed } from './coddy-tui-monitor.js';

export type ImageEditResult = 'saved' | 'cancelled' | 'unavailable';

function assetsDir(): string | null {
  const dir = process.env['CODDY_TUI_ASSETS_DIR'];
  return dir && existsSync(path.join(dir, 'image-editor', 'editor.html'))
    ? path.join(dir, 'image-editor')
    : null;
}

function homeDir(): string {
  return process.env['QWEN_HOME'] || path.join(os.homedir(), '.coddy/tui');
}

let panelPromise: Promise<string | null> | null = null;

// Скомпилировать панель, если её нет или исходник новее. В фоне, без spawnSync: первая сборка — секунды,
// ввод в это время не замирает. Собираем рядом и переносим, чтобы вторая сессия не взяла недописанный файл.
function ensurePanel(dir: string): Promise<string | null> {
  if (panelPromise) return panelPromise;
  panelPromise = (async () => {
    const src = path.join(dir, 'panel.swift');
    const bin = path.join(homeDir(), 'bin', 'coddy-image-panel');
    try {
      if (existsSync(bin) && statSync(bin).mtimeMs >= statSync(src).mtimeMs) {
        return bin;
      }
      await fs.mkdir(path.dirname(bin), { recursive: true });
      const part = `${bin}.${process.pid}`;
      const built = await new Promise<boolean>((resolve) =>
        execFile(
          'swiftc',
          ['-O', '-o', part, src],
          { timeout: 180_000 },
          (err) => resolve(!err),
        ),
      );
      if (!built) return null;
      await fs.rename(part, bin);
      return bin;
    } catch {
      return null;
    }
  })();
  return panelPromise;
}

export function isImageEditorAvailable(): boolean {
  return process.platform === 'darwin' && assetsDir() !== null;
}

interface Warm {
  requests: string;
  waiting: Map<string, (word: string) => void>;
  taken: Map<string, (yes: boolean) => void>;
  used: boolean;
}

let warm: Promise<Warm | null> | null = null;
let seq = 0;
let outSeq = 0;
let cleanupSet = false;

/** Запустить панель в режиме ожидания, если её нет. Дёшево, можно звать на каждое нажатие. */
export function warmImageEditor(): void {
  if (warm || !isImageEditorAvailable()) return;
  warm = startWarm().catch(() => null);
}

async function startWarm(): Promise<Warm | null> {
  const dir = assetsDir();
  const panel = dir ? await ensurePanel(dir) : null;
  if (!dir || !panel) return null;
  const requests = path.join(os.tmpdir(), `coddy-image-${process.pid}`);
  await fs.mkdir(requests, { recursive: true });
  const held: Warm = {
    requests,
    waiting: new Map(),
    taken: new Map(),
    used: false,
  };
  const mine = warm;
  const born = Date.now();
  const child = spawn(
    panel,
    ['serve', path.join(dir, 'editor.html'), requests, 'ru'],
    { stdio: ['ignore', 'pipe', 'ignore'] },
  );
  // панель не держит процесс: выходит сама, когда родителя нет
  child.unref();
  let said = '';
  child.stdout.on('data', (chunk) => {
    said += String(chunk);
    for (let end = said.indexOf('\n'); end >= 0; end = said.indexOf('\n')) {
      const [word = '', id = ''] = said.slice(0, end).trim().split(' ');
      said = said.slice(end + 1);
      if (word === 'TAKEN') {
        held.taken.get(id)?.(true);
        held.taken.delete(id);
        continue;
      }
      held.waiting.get(id)?.(word);
      held.waiting.delete(id);
    }
  });
  (child.stdout as unknown as { unref?: () => void }).unref?.();
  let ended = false;
  const gone = () => {
    if (ended) return;
    ended = true;
    // Вышла без дела после простоя — следующая клавиша запустит снова. Упала сразу — здесь она не стартует,
    // дальше каждая правка открывает свою панель.
    if (warm === mine) {
      warm =
        Date.now() - born < 10_000 && !held.used ? Promise.resolve(null) : null;
    }
    for (const done of held.waiting.values()) done('GONE');
    held.waiting.clear();
    for (const done of held.taken.values()) done(false);
    held.taken.clear();
  };
  child.on('error', gone);
  child.on('close', gone);
  if (!cleanupSet) {
    cleanupSet = true;
    process.once('exit', () => {
      try {
        rmSync(requests, { recursive: true, force: true });
      } catch {
        // не страшно
      }
    });
  }
  return held;
}

// Одна картинка через прогретую панель: SAVED, CANCELLED или null, если панели нет
async function editWarm(
  file: string,
  out: string,
  label: string,
): Promise<string | null> {
  warmImageEditor();
  const held = await warm;
  if (!held) return null;
  const id = `${Date.now().toString(36)}-${++seq}`;
  held.used = true;
  const answer = new Promise<string>((resolve) =>
    held.waiting.set(id, resolve),
  );
  const taken = new Promise<boolean>((resolve) => held.taken.set(id, resolve));
  const request = path.join(held.requests, `${id}.json`);
  await fs.writeFile(request, JSON.stringify({ picture: file, out, label }));
  // Панель выбрасывает заказ старше 5 с без ответа (страница ещё грузится) — тогда ждали бы до простоя.
  // Не взяла за 4,5 с — забираем заказ сами и открываем свою панель.
  if (!(await waitTaken(taken, request, TAKE_TIMEOUT_MS))) {
    held.waiting.delete(id);
    held.taken.delete(id);
    return null;
  }
  const word = await answer;
  return word === 'GONE' ? null : word;
}

const TAKE_TIMEOUT_MS = 4500;
// Файла нет, а TAKEN не пришёл: панель либо взяла в последний момент (строка уже в пути), либо выбросила просроченный
const TAKE_LATE_MS = 1000;

function after(ms: number): Promise<false> {
  return new Promise((resolve) => setTimeout(() => resolve(false), ms));
}

/**
 * Ждать «TAKEN» от панели. Не пришёл за ms — удалить заказ самим и вернуть false. Исчезновение файла
 * приёмом не считаем: после паузы процесса панель могла выбросить его как просроченный и не ответить никогда.
 */
export async function waitTaken(
  taken: Promise<boolean>,
  request: string,
  ms: number,
  lateMs = TAKE_LATE_MS,
): Promise<boolean> {
  if (await Promise.race([taken, after(ms)])) return true;
  try {
    await fs.unlink(request);
    return false;
  } catch {
    return Promise.race([taken, after(lateMs)]);
  }
}

// Своя панель на одну картинку — запасной путь
async function editCold(
  dir: string,
  file: string,
  out: string,
  label: string,
): Promise<string> {
  const panel = await coddyTimed('image.panel-ready', ensurePanel(dir));
  if (!panel) return '';
  return new Promise<string>((resolve) => {
    const child = spawn(
      panel,
      [path.join(dir, 'editor.html'), file, out, label, 'ru'],
      { stdio: ['ignore', 'pipe', 'ignore'] },
    );
    let stdout = '';
    child.stdout.on('data', (c) => (stdout += String(c)));
    child.on('error', () => resolve(''));
    child.on('close', () => resolve(stdout.trim()));
  });
}

async function editOne(file: string, label: string): Promise<ImageEditResult> {
  const dir = assetsDir();
  if (process.platform !== 'darwin' || !dir) return 'unavailable';
  const out = path.join(
    os.tmpdir(),
    `coddy-image-${process.pid}-${++outSeq}-${Date.now()}.png`,
  );
  // время от заказа до закрытия редактора (включает работу человека)
  const word = await coddyTimed(
    'image.editor-open',
    (async () =>
      (await editWarm(file, out, label).catch(() => null)) ??
      (await editCold(dir, file, out, label)))(),
  );
  if (word.startsWith('SAVED') && existsSync(out)) {
    await fs.copyFile(out, file);
    await fs.rm(out, { force: true });
    for (const listener of editedListeners) listener(file);
    return 'saved';
  }
  await fs.rm(out, { force: true }).catch(() => {});
  return word ? 'cancelled' : 'unavailable';
}

const editedListeners = new Set<(file: string) => void>();

/** Подписка на сохранённые правки (миниатюра перерисовывается); возвращает отписку. */
export function onImageEdited(listener: (file: string) => void): () => void {
  editedListeners.add(listener);
  return () => editedListeners.delete(listener);
}

// Одна правка за раз: три вставки подряд открываются по очереди (панель выбрасывает заказ старше 5 секунд)
let queue: Promise<unknown> = Promise.resolve();

/** Открыть редактор; при «Готово» (Enter) картинка перезаписывается на месте, Esc оставляет как было. */
export function editImageInPlace(
  file: string,
  label: string,
): Promise<ImageEditResult> {
  const run = queue.then(() => editOne(file, label));
  queue = run.catch(() => {});
  return run;
}

/** Быстрый просмотр (Quick Look) без ожидания. */
export function previewImage(file: string): void {
  if (process.platform !== 'darwin') return;
  try {
    const child = spawn('qlmanage', ['-p', file], {
      stdio: 'ignore',
      detached: true,
    });
    child.unref();
  } catch {
    // нет qlmanage — не страшно
  }
}
