#!/usr/bin/env node
/* global process, console, Buffer, setInterval */

/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Живой монитор интерфейса Coddy. Читает JSONL, который пишет агент при CODDY_TUI_MONITOR=1
 * (packages/cli/src/ui/utils/coddy-tui-monitor.ts), и раз в 500 мс показывает кадры, время рендера и записи,
 * байты в терминал, полные перерисовки и последние прокрутки. Без зависимостей.
 *
 *   node coddy/bin/tui-monitor.js                 # самый свежий tui-monitor-*.jsonl в tmp приложения
 *   node coddy/bin/tui-monitor.js <файл.jsonl>
 *   node coddy/bin/tui-monitor.js --report [файл] # итоговая сводка по файлу
 *   --warn-kb N                                 # порог «большой записи» на кадр, КБ (по умолчанию 8)
 *
 * Подробно — coddy/runbooks/tui-monitor.md.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const report = args.includes('--report');
const warnIdx = args.indexOf('--warn-kb');
const WARN_KB = warnIdx >= 0 ? Number(args[warnIdx + 1]) : 8;
const fileArg = args.find(
  (a, i) => !a.startsWith('--') && (warnIdx < 0 || i !== warnIdx + 1),
);
const WINDOW_MS = 2000;
const SCROLL_KINDS = new Set([
  'wheel-up',
  'wheel-down',
  'pgup',
  'pgdn',
  'up',
  'down',
  'home',
  'end',
]);

function tmpDir() {
  const base =
    process.env['QWEN_RUNTIME_DIR'] ||
    process.env['QWEN_HOME'] ||
    path.join(os.homedir(), '.coddy/tui');
  return path.join(base, 'tmp');
}

function newestFile() {
  const dir = tmpDir();
  let best = null;
  try {
    for (const name of fs.readdirSync(dir)) {
      if (!/^tui-monitor-.*\.jsonl$/.test(name)) continue;
      const full = path.join(dir, name);
      const mtime = fs.statSync(full).mtimeMs;
      if (!best || mtime > best.mtime) best = { full, mtime };
    }
  } catch {
    // каталога ещё нет
  }
  return best?.full ?? null;
}

function stats(values) {
  if (values.length === 0) return { n: 0, avg: 0, p95: 0, max: 0, sum: 0 };
  const sorted = [...values].sort((a, b) => a - b);
  const sum = sorted.reduce((s, v) => s + v, 0);
  return {
    n: sorted.length,
    sum,
    avg: sum / sorted.length,
    p95: sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))],
    max: sorted[sorted.length - 1],
  };
}

const f1 = (v) => (v == null ? '—' : v.toFixed(1));
const kb = (b) => (b / 1024).toFixed(1);
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

/** Кадр, который показал этот ввод: первый кадр, начатый после него. */
function frameFor(input, frames) {
  for (const f of frames) if (f.t >= input.t) return f;
  return null;
}

function parseLines(text, sink) {
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try {
      sink(JSON.parse(line));
    } catch {
      // недописанная строка
    }
  }
}

// ---------- итоговая сводка ----------

function runReport(file) {
  const ev = [];
  parseLines(fs.readFileSync(file, 'utf8'), (e) => ev.push(e));
  const frames = ev.filter((e) => e.e === 'frame');
  const inputs = ev.filter((e) => e.e === 'input');
  const loops = ev.filter((e) => e.e === 'loop');
  const start = ev.find((e) => e.e === 'start');
  const history = ev.filter((e) => e.e === 'history');
  const t0 = ev[0]?.t ?? 0;
  const t1 = ev[ev.length - 1]?.t ?? 0;
  const sec = Math.max(0.001, (t1 - t0) / 1000);
  const out = [];
  const bytes = stats(frames.map((f) => f.b));
  const full = frames.filter((f) => f.full).length;
  out.push(`файл: ${file}`);
  if (start)
    out.push(
      `старт: ${start.ts}  окно ${start.cols}×${start.rows}  терминал ${start.term}${start.tmux ? ' (tmux)' : ''}`,
    );
  out.push(
    `длительность: ${sec.toFixed(1)} с, история: до ${Math.max(0, ...history.map((h) => h.items))} элементов`,
  );
  out.push('');
  out.push(
    `кадров: ${frames.length} (${(frames.length / sec).toFixed(1)}/с), полных перерисовок: ${full} (${frames.length ? Math.round((full * 100) / frames.length) : 0}%)`,
  );
  out.push(
    `байт в терминал: ${kb(bytes.sum)} КБ (${kb(bytes.sum / sec)} КБ/с), на кадр: ср ${kb(bytes.avg)} / p95 ${kb(bytes.p95)} / макс ${kb(bytes.max)} КБ`,
  );
  out.push(
    `кадров > ${WARN_KB} КБ: ${frames.filter((f) => f.b > WARN_KB * 1024).length}`,
  );
  out.push('');
  out.push('время на кадр, мс        ср     p95    макс');
  for (const [name, key] of [
    ['задача целиком', 'task'],
    ['  react+обработчики', 'react'],
    ['  рендер Ink', 'render'],
    ['  запись stdout', 'write'],
  ]) {
    const s = stats(frames.map((f) => f[key]).filter((v) => v != null));
    out.push(
      `${pad(name, 22)}${lpad(f1(s.avg), 7)}${lpad(f1(s.p95), 8)}${lpad(f1(s.max), 8)}`,
    );
  }
  const lp = stats(loops.map((l) => l.p99));
  out.push(
    `задержка цикла событий p99: ср ${f1(lp.avg)}, макс ${f1(Math.max(0, ...loops.map((l) => l.max)))} мс, самый долгий простой потока ${f1(Math.max(0, ...loops.map((l) => l.stall ?? 0)))} мс`,
  );
  out.push('');
  out.push(
    'ввод               событий  синхронно ср/p95   до кадра ср/p95   полн.перерис.  КБ/ввод ср',
  );
  const kinds = [...new Set(inputs.map((i) => i.kind))];
  for (const kind of kinds) {
    const list = inputs.filter((i) => i.kind === kind);
    const sy = stats(list.map((i) => i.sync ?? 0));
    const pa = stats(list.map((i) => i.paint).filter((v) => v != null));
    const shown = list.map((i) => frameFor(i, frames)).filter(Boolean);
    const fullN = shown.filter((f) => f.full).length;
    const b = stats(shown.map((f) => f.b));
    out.push(
      `${pad(kind, 18)}${lpad(
        list.reduce((s, i) => s + i.n, 0),
        7,
      )}  ${lpad(f1(sy.avg), 7)} / ${pad(f1(sy.p95), 7)}  ${lpad(f1(pa.avg), 7)} / ${pad(f1(pa.p95), 7)}  ${lpad(fullN, 6)}/${pad(shown.length, 6)}  ${lpad(kb(b.avg), 6)}`,
    );
  }
  const steps = ev.filter((e) => e.e === 'step');
  if (steps.length) {
    out.push('');
    out.push('шаги (вставка картинки и др.)   раз     ср мс    макс мс');
    for (const name of [...new Set(steps.map((s) => s.name))]) {
      const st = stats(steps.filter((s) => s.name === name).map((s) => s.ms));
      out.push(
        `${pad(name, 30)}${lpad(st.n, 5)}${lpad(f1(st.avg), 10)}${lpad(f1(st.max), 11)}`,
      );
    }
  }
  // кадры на одну прокрутку: сколько кадров рисуется в окне 300 мс после событий прокрутки
  const scrolls = inputs.filter((i) => SCROLL_KINDS.has(i.kind));
  if (scrolls.length) {
    const scrollEvents = scrolls.reduce((s, i) => s + i.n, 0);
    const near = new Set();
    for (const i of scrolls)
      for (const f of frames) if (f.t >= i.t && f.t <= i.t + 300) near.add(f);
    const nearB = [...near].reduce((s, f) => s + f.b, 0);
    out.push('');
    out.push(
      `прокрутка: ${scrollEvents} событий → ${near.size} кадров (${(near.size / scrollEvents).toFixed(2)} на событие), ${kb(nearB / scrollEvents)} КБ на событие`,
    );
  }
  console.log(out.join('\n'));
}

// ---------- живой просмотр ----------

function runLive(fixedFile) {
  let file = fixedFile ?? newestFile();
  let offset = 0;
  let rest = '';
  let head = null; // первые байты файла: перезапись того же или большего размера видна только по ним
  let start = null;
  let history = 0;
  let size = '';
  let lastLoop = null;
  const frames = [];
  const inputs = [];
  const warnings = [];
  const steps = [];
  const total = { frames: 0, full: 0, bytes: 0 };

  function onEvent(e) {
    if (e.e === 'start') {
      start = e;
      size = `${e.cols}×${e.rows}`;
    } else if (e.e === 'resize') size = `${e.cols}×${e.rows}`;
    else if (e.e === 'history') history = e.items;
    else if (e.e === 'loop') lastLoop = e;
    else if (e.e === 'step') {
      steps.push(e);
      if (steps.length > 6) steps.shift();
    } else if (e.e === 'frame') {
      frames.push(e);
      total.frames++;
      total.bytes += e.b;
      if (e.full) total.full++;
    } else if (e.e === 'input') {
      inputs.push(e);
      if (SCROLL_KINDS.has(e.kind)) {
        const f = frameFor(e, frames);
        e.frame = f;
        if (f && (f.full || f.b > WARN_KB * 1024)) {
          warnings.push(
            `${e.kind}×${e.n}: ${f.full ? 'полная перерисовка' : ''}${f.full && f.b > WARN_KB * 1024 ? ', ' : ''}${f.b > WARN_KB * 1024 ? `запись ${kb(f.b)} КБ` : ''} (кадр ${f1(f.task)} мс)`,
          );
          if (warnings.length > 5) warnings.shift();
        }
      }
    }
  }

  // новый или начатый заново файл — статистика с нуля, иначе кадры и счётчики задвоятся
  function reset() {
    offset = 0;
    rest = '';
    head = null;
    start = null;
    history = 0;
    size = '';
    lastLoop = null;
    frames.length = 0;
    inputs.length = 0;
    warnings.length = 0;
    steps.length = 0;
    total.frames = 0;
    total.full = 0;
    total.bytes = 0;
  }

  function readMore() {
    const newest = fixedFile ? null : newestFile();
    if (newest && newest !== file) {
      file = newest;
      reset();
    }
    if (!file) return;
    let st;
    try {
      st = fs.statSync(file);
    } catch {
      return;
    }
    let fdIn;
    try {
      fdIn = fs.openSync(file, 'r');
    } catch {
      return;
    }
    try {
      if (st.size < offset)
        reset(); // файл начат заново
      else if (head) {
        const now = Buffer.alloc(head.length);
        fs.readSync(fdIn, now, 0, now.length, 0);
        if (!now.equals(head)) reset(); // перезаписан, длина не меньше прежней
      }
      if (st.size === offset) return;
      readFrom(fdIn, st.size);
    } finally {
      fs.closeSync(fdIn);
    }
  }

  function readFrom(fdIn, end) {
    const buf = Buffer.alloc(end - offset);
    fs.readSync(fdIn, buf, 0, buf.length, offset);
    if (offset === 0) head = buf.subarray(0, 256);
    offset = end;
    const text = rest + buf.toString('utf8');
    const cut = text.lastIndexOf('\n');
    rest = text.slice(cut + 1);
    parseLines(text.slice(0, cut + 1), onEvent);
  }

  function draw() {
    readMore();
    const lastT = Math.max(
      frames.at(-1)?.t ?? 0,
      inputs.at(-1)?.t ?? 0,
      lastLoop?.t ?? 0,
    );
    const from = lastT - WINDOW_MS;
    while (frames.length && frames[0].t < from - 5000) frames.shift();
    while (inputs.length > 200) inputs.shift();
    const win = frames.filter((f) => f.t >= from);
    const sec = WINDOW_MS / 1000;
    const bytes = win.reduce((s, f) => s + f.b, 0);
    const row = (name, key) => {
      const s = stats(win.map((f) => f[key]).filter((v) => v != null));
      return `${pad(name, 22)}${lpad(f1(s.avg), 7)}${lpad(f1(s.p95), 8)}${lpad(f1(s.max), 8)}`;
    };
    const lines = [];
    lines.push(
      `\x1b[1mМонитор интерфейса Coddy\x1b[0m   ${file ?? `жду tui-monitor-*.jsonl в ${tmpDir()}`}`,
    );
    if (start)
      lines.push(
        `pid ${start.pid}  окно ${size}  история ${history} элементов  куча ${lastLoop?.heap ?? '—'} МБ`,
      );
    lines.push('');
    lines.push(
      `за ${sec} с:  кадров/с ${lpad((win.length / sec).toFixed(1), 5)}   КБ/с ${lpad(kb(bytes / sec), 7)}   полных перерисовок ${win.filter((f) => f.full).length}`,
    );
    lines.push(
      `всего:   кадров ${total.frames}, полных ${total.full}, ${kb(total.bytes)} КБ`,
    );
    lines.push(
      `цикл событий: задержка p99 ${f1(lastLoop?.p99)} мс, макс ${f1(lastLoop?.max)} мс, простой ${f1(lastLoop?.stall)} мс`,
    );
    lines.push('');
    lines.push('мс на кадр               ср     p95    макс');
    lines.push(row('задача целиком', 'task'));
    lines.push(row('  react+обработчики', 'react'));
    lines.push(row('  рендер Ink', 'render'));
    lines.push(row('  запись stdout', 'write'));
    lines.push(
      `${pad('КБ на кадр', 22)}${lpad(kb(stats(win.map((f) => f.b)).avg), 7)}${lpad(kb(stats(win.map((f) => f.b)).p95), 8)}${lpad(kb(stats(win.map((f) => f.b)).max), 8)}`,
    );
    lines.push('');
    lines.push('последние прокрутки       синхр.мс  до кадра мс   КБ   полная');
    const scrolls = inputs.filter((i) => SCROLL_KINDS.has(i.kind)).slice(-8);
    for (const i of scrolls) {
      const f = i.frame;
      lines.push(
        `${pad(`${i.kind}×${i.n}`, 24)}${lpad(f1(i.sync), 9)}${lpad(f1(i.paint), 13)}${lpad(f ? kb(f.b) : '—', 7)}   ${f?.full ? '\x1b[31mда\x1b[0m' : 'нет'}`,
      );
    }
    if (!scrolls.length) lines.push('  (пока не было)');
    if (steps.length) {
      lines.push('');
      lines.push('последние шаги (вставка картинки и др.)');
      for (const st of steps)
        lines.push(
          `  ${pad(st.name, 24)}${lpad(f1(st.ms), 9)} мс${st.ok ? '' : '  ошибка'}`,
        );
    }
    lines.push('');
    lines.push(
      `\x1b[33mпредупреждения\x1b[0m (прокрутка → полная перерисовка или запись > ${WARN_KB} КБ):`,
    );
    for (const w of warnings) lines.push(`  ${w}`);
    if (!warnings.length) lines.push('  нет');
    process.stdout.write(
      '\x1b[H' + lines.map((l) => l + '\x1b[K').join('\n') + '\n\x1b[J',
    );
  }

  process.stdout.write('\x1b[2J');
  draw();
  setInterval(draw, 500);
  process.on('SIGINT', () => {
    process.stdout.write('\n');
    process.exit(0);
  });
}

if (report) {
  const file = fileArg ?? newestFile();
  if (!file) {
    console.error(
      `нет файла: укажите путь или запустите агент с CODDY_TUI_MONITOR=1 (ищу в ${tmpDir()})`,
    );
    process.exit(1);
  }
  runReport(file);
} else {
  runLive(fileArg ?? null);
}
