/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: сборщик метрик живого интерфейса, чтобы искать лаги (прокрутка, перерисовки).
// Включается только переменной CODDY_TUI_MONITOR=1; без неё ничего не ставится и не считается.
// Пишет JSONL (CODDY_TUI_MONITOR_FILE или <глобальный tmp>/tui-monitor-<pid>.jsonl), живой просмотр —
// coddy/bin/tui-monitor.js, описание — coddy/runbooks/tui-monitor.md.
// Содержимое ввода и вывода не пишется: только виды событий, размеры и времена.
//
// React в сборке — production, React.Profiler там молчит. Вместо него меряем всю задачу цикла событий,
// в которой родился кадр (async_hooks before/after): обработчик ввода или таймера + рендер React + commit +
// раскладка и рендер Ink + запись. Из неё вычитаем рендер Ink и запись — остаток «react» и есть работа React
// и обработчиков.

/* eslint-disable no-control-regex -- разбираем управляющие последовательности терминала */

import fs from 'node:fs';
import path from 'node:path';
import { createHook } from 'node:async_hooks';
import { monitorEventLoopDelay, performance } from 'node:perf_hooks';
import { Storage } from '@qwen-code/qwen-code-core/config/storage.js';

export const coddyTuiMonitorEnabled = process.env['CODDY_TUI_MONITOR'] === '1';

const FLUSH_MS = 250;
const LOOP_MS = 1000;
// ввод, после которого кадр так и не пришёл (прокрутка упёрлась в край), пишем без paint
const PAINT_WAIT_MS = 1000;
const BUSY_GAP_MS = 1;

interface Frame {
  t: number;
  task: number | null; // начало отрезка занятости, в котором началась запись
  taskMs: number | null;
  writes: number;
  bytes: number;
  writeMs: number;
  renderMs: number;
  text: string[];
}

interface PendingInput {
  t: number;
  kind: string;
  n: number;
  b: number;
  sync?: number;
}

let lines: string[] = [];
let fd: number | null = null;
let frame: Frame | null = null;
let pending: PendingInput[] = [];
let lastHistory = -1;
let renderMs = 0; // рендеры Ink в текущем отрезке занятости
let renders = 0;
let frames = 0;
let depth = 0;
let taskStart: number | null = null; // начало текущего отрезка занятости потока
let lastAfter = 0;

const now = () => performance.now();
const ms = (value: number) => Math.round(value * 100) / 100;

function emit(event: Record<string, unknown>): void {
  if (fd === null) return;
  lines.push(JSON.stringify(event));
}

function flushFile(): void {
  if (fd === null || lines.length === 0) return;
  const chunk = lines.join('\n') + '\n';
  lines = [];
  try {
    fs.writeSync(fd, chunk);
  } catch {
    // мониторинг не должен ронять интерфейс
  }
}

function count(text: string, re: RegExp): number {
  let n = 0;
  re.lastIndex = 0;
  while (re.exec(text) !== null) n++;
  return n;
}

// управляющие последовательности, которыми терминал перерисовывается
const RE = {
  newline: /\n/g,
  clear: /\x1b\[2J/g, // очистка экрана
  clearScroll: /\x1b\[3J/g, // очистка прокрутки терминала
  home: /\x1b\[H|\x1b\[1;1H/g, // курсор в угол
  eraseLine: /\x1b\[[012]?K/g, // стереть строку
  cursorUp: /\x1b\[\d*A/g, // курсор вверх
  cursorTo: /\x1b\[\d+;\d+H/g, // курсор в позицию
  sync: /\x1b\[\?2026h/g, // начало синхронного кадра
};

function closeFrame(): void {
  const f = frame;
  frame = null;
  if (!f) return;
  const text = f.text.join('');
  const end = now();
  const rows = process.stdout.rows ?? 0;
  const eraseLine = count(text, RE.eraseLine);
  const clear = count(text, RE.clear);
  frames++;
  emit({
    e: 'frame',
    t: ms(f.t),
    w: f.writes,
    b: f.bytes,
    write: ms(f.writeMs),
    render: ms(f.renderMs),
    task: f.taskMs === null ? null : ms(f.taskMs),
    react:
      f.taskMs === null
        ? null
        : ms(Math.max(0, f.taskMs - f.renderMs - f.writeMs)),
    lines: count(text, RE.newline),
    clr: clear,
    clrs: count(text, RE.clearScroll),
    home: count(text, RE.home),
    el: eraseLine,
    up: count(text, RE.cursorUp),
    cup: count(text, RE.cursorTo),
    sync: count(text, RE.sync),
    // полная перерисовка: экран очищен или стёрто не меньше строк, чем в окне
    full: clear > 0 || (rows > 0 && eraseLine >= rows - 1),
  });
  // ввод, ждавший кадра, получает задержку «нажал → увидел»
  const waiting = pending;
  pending = [];
  for (const input of waiting) {
    if (input.sync === undefined || input.t > f.t) {
      pending.push(input);
      continue;
    }
    emit({ e: 'input', ...input, t: ms(input.t), paint: ms(end - input.t) });
  }
}

function onWrite(chunk: unknown, writeMs: number): void {
  const text =
    typeof chunk === 'string'
      ? chunk
      : chunk instanceof Uint8Array
        ? Buffer.from(chunk).toString('utf8')
        : '';
  if (!frame) {
    frame = {
      t: now(),
      task: taskStart,
      taskMs: null,
      writes: 0,
      bytes: 0,
      writeMs: 0,
      renderMs,
      text: [],
    };
    renderMs = 0;
    // всё, что записано в одной задаче цикла событий, — один кадр
    setImmediate(closeFrame);
  }
  frame.writes++;
  frame.bytes += Buffer.byteLength(text);
  frame.writeMs += writeMs;
  frame.text.push(text);
}

// что пришло с клавиатуры/мыши: только вид и число событий, сами символы не пишем
export function coddyClassifyInput(text: string): { kind: string; n: number } {
  const counts = new Map<string, number>();
  const add = (kind: string) => counts.set(kind, (counts.get(kind) ?? 0) + 1);
  let rest = text.replace(
    /\x1b\[<(\d+);\d+;\d+[Mm]/g,
    (_seq, button: string) => {
      const b = Number(button);
      if (b & 64) add((b & 1) === 0 ? 'wheel-up' : 'wheel-down');
      else if (b & 32) add('mouse-move');
      else add('mouse');
      return '';
    },
  );
  const keys: Array<[RegExp, string]> = [
    [/\x1b\[5(;\d+)?~/g, 'pgup'],
    [/\x1b\[6(;\d+)?~/g, 'pgdn'],
    [/\x1b(\[|O)(1;\d+)?A/g, 'up'],
    [/\x1b(\[|O)(1;\d+)?B/g, 'down'],
    [/\x1b(\[|O)(1;\d+)?H|\x1b\[1~/g, 'home'],
    [/\x1b(\[|O)(1;\d+)?F|\x1b\[4~/g, 'end'],
  ];
  for (const [re, kind] of keys) {
    rest = rest.replace(re, () => {
      add(kind);
      return '';
    });
  }
  if (rest.length > 0) add(rest.length > 32 ? 'paste' : 'key');
  let kind = 'key';
  let top = 0;
  let n = 0;
  for (const [k, c] of counts) {
    n += c;
    if (c > top) {
      top = c;
      kind = k;
    }
  }
  return { kind, n };
}

function onInput(chunk: unknown): void {
  const text = typeof chunk === 'string' ? chunk : String(chunk);
  const input: PendingInput = {
    t: now(),
    ...coddyClassifyInput(text),
    b: Buffer.byteLength(text),
  };
  pending.push(input);
  // синхронная обработка: обработчики ввода и рендер, если он случился в этой же задаче
  setImmediate(() => {
    input.sync = ms(now() - input.t);
  });
}

/** Ink onRender: сколько Ink собирал кадр (раскладка, вывод в строку). */
export function coddyMonitorInkRender(metrics: { renderTime: number }): void {
  renders++;
  // кадр уже открыт первой записью (например, очисткой при сужении окна) — рендер этой же задачи идёт в него
  if (frame) frame.renderMs += metrics.renderTime;
  else renderMs += metrics.renderTime;
}

/** Длительность шага (вставка картинки, миниатюра, редактор): событие step с именем и мс. */
export function coddyTimed<T>(name: string, work: Promise<T>): Promise<T> {
  if (fd === null) return work;
  const start = now();
  const done = (ok: boolean) =>
    emit({ e: 'step', t: ms(start), name, ms: ms(now() - start), ok });
  return work.then(
    (value) => {
      done(true);
      return value;
    },
    (error: unknown) => {
      done(false);
      throw error;
    },
  );
}

/** Размер истории (элементов в списке). Пишется только при изменении. */
export function coddyMonitorHistory(items: number): void {
  if (fd === null || items === lastHistory) return;
  lastHistory = items;
  emit({ e: 'history', t: ms(now()), items });
}

/**
 * Ставит сборщик на stdout/stdin. Вызывать первым, до остальных обёрток stdout.write: так он видит
 * ровно те байты, что уходят в терминал. Возвращает функцию снятия.
 */
export function installCoddyTuiMonitor(
  stdout: NodeJS.WriteStream,
  stdin: NodeJS.ReadStream,
): () => void {
  if (!coddyTuiMonitorEnabled) return () => {};
  const file =
    process.env['CODDY_TUI_MONITOR_FILE'] ||
    path.join(Storage.getGlobalTempDir(), `tui-monitor-${process.pid}.jsonl`);
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fd = fs.openSync(file, 'w');
  } catch {
    return () => {};
  }

  emit({
    e: 'start',
    t: ms(now()),
    ts: new Date().toISOString(),
    pid: process.pid,
    cols: stdout.columns,
    rows: stdout.rows,
    term: process.env['TERM_PROGRAM'] ?? process.env['TERM'] ?? '',
    tmux: Boolean(process.env['TMUX']),
  });

  const originalWrite = stdout.write;
  const wrappedWrite = function (
    this: NodeJS.WriteStream,
    ...args: Parameters<NodeJS.WriteStream['write']>
  ) {
    const start = now();
    const result = originalWrite.apply(this, args);
    onWrite(args[0], now() - start);
    return result;
  } as NodeJS.WriteStream['write'];
  stdout.write = wrappedWrite;

  // ввод перехватываем на emit, а не лишним слушателем 'data': тот перевёл бы stdin в поток раньше Ink
  const originalEmit = stdin.emit;
  const wrappedEmit = function (
    this: NodeJS.ReadStream,
    event: string | symbol,
    ...args: unknown[]
  ) {
    if (event === 'data') onInput(args[0]);
    return Reflect.apply(originalEmit, this, [event, ...args]) as boolean;
  } as NodeJS.ReadStream['emit'];
  stdin.emit = wrappedEmit;

  const onResize = () =>
    emit({
      e: 'resize',
      t: ms(now()),
      cols: stdout.columns,
      rows: stdout.rows,
    });
  stdout.on('resize', onResize);

  // границы задач цикла событий: длительность задачи, в которой родился кадр
  // задача React/Ink часто дробится на колбэк и цепочку микрозадач, поэтому склеиваем колбэки,
  // идущие вплотную (зазор < BUSY_GAP_MS), в один отрезок занятости потока
  const hook = createHook({
    before() {
      if (depth++ > 0) return;
      const t = now();
      if (taskStart === null || t - lastAfter > BUSY_GAP_MS) {
        taskStart = t;
        renderMs = 0; // рендер Ink без записи в прошлом отрезке к новому кадру не относится
      }
    },
    after() {
      if (--depth > 0) return;
      depth = 0;
      lastAfter = now();
      if (frame && frame.task !== null && frame.task === taskStart) {
        frame.taskMs = lastAfter - frame.task;
      }
    },
  });
  hook.enable();

  // задержки цикла событий: долгие синхронные куски видны здесь, даже без кадра
  const loop = monitorEventLoopDelay({ resolution: 10 });
  loop.enable();
  // простой: насколько позже срока сработал сам таймер — ловит долгие синхронные блокировки
  // (spawnSync и т.п.), которые гистограмма monitorEventLoopDelay пропускает
  let lastLoopTick = now();
  const loopTimer = setInterval(() => {
    const tick = now();
    const stall = Math.max(0, tick - lastLoopTick - LOOP_MS);
    lastLoopTick = tick;
    emit({
      e: 'loop',
      t: ms(tick),
      stall: ms(stall),
      p50: ms(loop.percentile(50) / 1e6),
      p99: ms(loop.percentile(99) / 1e6),
      max: ms(loop.max / 1e6),
      renders,
      frames,
      heap: Math.round(process.memoryUsage().heapUsed / 1048576),
    });
    loop.reset();
    renders = 0;
    frames = 0;
    // ввод без кадра (упёрлись в край истории) — пишем без paint, чтобы не висел
    const cutoff = now() - PAINT_WAIT_MS;
    pending = pending.filter((input) => {
      if (input.t > cutoff || input.sync === undefined) return true;
      emit({ e: 'input', ...input, t: ms(input.t), paint: null });
      return false;
    });
  }, LOOP_MS);
  loopTimer.unref();
  const flushTimer = setInterval(flushFile, FLUSH_MS);
  flushTimer.unref();
  const onExit = () => {
    closeFrame();
    emit({ e: 'stop', t: ms(now()) });
    flushFile();
  };
  process.on('exit', onExit);

  return () => {
    if (stdout.write === wrappedWrite) stdout.write = originalWrite;
    if (stdin.emit === wrappedEmit) stdin.emit = originalEmit;
    stdout.off('resize', onResize);
    hook.disable();
    clearInterval(loopTimer);
    clearInterval(flushTimer);
    loop.disable();
    process.off('exit', onExit);
    onExit();
    if (fd !== null) fs.closeSync(fd);
    fd = null;
  };
}
