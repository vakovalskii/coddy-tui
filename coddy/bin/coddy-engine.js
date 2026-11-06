/* global process, console */

/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Выбор движка для TUI: агент Coddy по ACP (по умолчанию) или встроенный движок Qwen Code.
 *
 * - Выбор по умолчанию хранится в ~/.coddy/tui/engine.json, на один запуск — флаг `--engine coddy|qwen`
 *   или переменная CODDY_TUI_ENGINE.
 * - Coddy запускается как `coddy acp` (бинарь из CODDY_BIN, иначе `coddy` из PATH, доп. аргументы —
 *   CODDY_ACP_ARGS). Без экрана (-p, pipe, --acp) ход всегда ведёт встроенный движок.
 */

import fs from 'node:fs';
import path from 'node:path';

export const ENGINES = ['coddy', 'qwen'];
export const DEFAULT_ENGINE = 'coddy';

export function engineFile(home) {
  return path.join(home, 'engine.json');
}

export function readEngine(home) {
  try {
    const e = JSON.parse(fs.readFileSync(engineFile(home), 'utf8')).engine;
    return ENGINES.includes(e) ? e : null;
  } catch {
    return null;
  }
}

export function writeEngine(home, engine) {
  fs.mkdirSync(home, { recursive: true });
  fs.writeFileSync(
    engineFile(home),
    JSON.stringify({ engine }, null, 2) + '\n',
  );
}

function checkEngine(engine) {
  if (!ENGINES.includes(engine)) {
    throw new Error(
      `неизвестный движок «${engine}», есть: ${ENGINES.join(', ')}`,
    );
  }
  return engine;
}

/** Вынимает `--engine X` / `--engine=X` из аргументов, остальное отдаёт CLI как было. */
export function takeEngineFlag(args) {
  const rest = [];
  let engine = null;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--engine') {
      engine = args[++i] ?? '';
    } else if (a.startsWith('--engine=')) {
      engine = a.slice('--engine='.length);
    } else {
      rest.push(a);
    }
  }
  if (engine !== null) checkEngine(engine);
  return { engine, rest };
}

/** Флаг важнее переменной, переменная важнее сохранённого выбора. */
export function pickEngine(home, flag, env = process.env) {
  if (flag) return flag;
  const fromEnv = env['CODDY_TUI_ENGINE']?.trim();
  if (fromEnv) return checkEngine(fromEnv);
  return readEngine(home) ?? DEFAULT_ENGINE;
}

/** Путь к бинарю Coddy: CODDY_BIN или `coddy` из PATH; null — не нашли. */
export function resolveCoddyBin(env = process.env) {
  const own = env['CODDY_BIN']?.trim();
  if (own) return fs.existsSync(own) ? path.resolve(own) : null;
  const exts =
    process.platform === 'win32'
      ? (env['PATHEXT'] || '.EXE;.CMD;.BAT').split(';')
      : [''];
  for (const dir of (env['PATH'] || '').split(path.delimiter)) {
    if (!dir) continue;
    for (const ext of exts) {
      const file = path.join(dir, `coddy${ext.toLowerCase()}`);
      try {
        if (fs.statSync(file).isFile()) return file;
      } catch {
        // нет в этой папке
      }
    }
  }
  return null;
}

/** `coddy-tui engine [coddy|qwen]` */
export function engineCommand(home, sub) {
  if (!sub) {
    const bin = resolveCoddyBin();
    console.log(
      `Движок по умолчанию: ${readEngine(home) ?? `${DEFAULT_ENGINE} (не менялся)`}; Coddy: ${bin ?? 'не найден (CODDY_BIN или coddy в PATH)'}`,
    );
    return;
  }
  writeEngine(home, checkEngine(sub));
  console.log(`Движок по умолчанию: ${sub}`);
}
