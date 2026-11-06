#!/usr/bin/env node
/* global process, console, fetch, AbortSignal */

/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Точка входа coddy-tui поверх Qwen Code.
 *
 * - Свой каталог конфига (~/.coddy/tui), каталог проекта `.coddy` — общий с агентом Coddy.
 * - Движок хода: Coddy по ACP (по умолчанию) или встроенный Qwen Code (`--engine qwen`), см. coddy-engine.js.
 * - Встроенный движок ходит в NeuralDeep: если задан NEURALDEEP_API_KEY и моделей ещё нет,
 *   при первом запуске берём их из /models.
 * - `engine [coddy|qwen]` — движок по умолчанию.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NEURALDEEP_BASE_URL =
  process.env['NEURALDEEP_BASE_URL'] || 'https://api.neuraldeep.ru/v1';
const NEURALDEEP_ENV_KEY = 'NEURALDEEP_API_KEY';
const HOME =
  process.env['QWEN_HOME'] || path.join(os.homedir(), '.coddy', 'tui');
const SETTINGS_FILE = path.join(HOME, 'settings.json');

process.env['QWEN_HOME'] = HOME;
// каталог проекта .coddy (читаем и старый .qwen) + навыки и команды Claude Code и Codex
process.env['CODDY_TUI_PROJECT_DIR'] ||= '.coddy';
// автосжатие не позже 450k токенов: дальше длинный контекст дорог и хуже по качеству, даже при окне 1M
process.env['CODDY_TUI_AUTOCOMPACT_MAX_TOKENS'] ||= '450000';
// умолчания программы самым нижним слоем настроек (подсказки выключены — они тратят квоту), если админ не задал свой
if (
  !process.env['QWEN_CODE_SYSTEM_DEFAULTS_PATH'] &&
  !fs.existsSync(systemDefaultsPathOfPlatform())
) {
  process.env['QWEN_CODE_SYSTEM_DEFAULTS_PATH'] = path.join(
    HERE,
    'system-defaults.json',
  );
}
// редактор картинок и правила агента лежат рядом с точкой входа
process.env['CODDY_TUI_ASSETS_DIR'] = path.join(HERE, '..');

const args = process.argv.slice(2);
const cmd = args[0];
const engines = await import('./coddy-engine.js');

if (cmd === 'engine') {
  try {
    engines.engineCommand(HOME, args[1]);
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
  }
  process.exit(0);
}

const infoOnly = args.some((a) =>
  ['--version', '-v', '--help', '-h'].includes(a),
);
// Без экрана (-p, pipe, ACP) ход всегда ведёт встроенный движок: Coddy подключён только к TUI
const headless =
  !process.stdin.isTTY ||
  !process.stdout.isTTY ||
  args.some(
    (a) =>
      ['-p', '--prompt', '--acp', '--experimental-acp'].includes(a) ||
      a.startsWith('--prompt='),
  );

let engine;
try {
  const r = engines.takeEngineFlag(args);
  process.argv.splice(2, process.argv.length - 2, ...r.rest);
  engine = engines.pickEngine(HOME, r.engine);
} catch (err) {
  console.error(`Ошибка: ${err.message}`);
  process.exit(1);
}
if (headless || infoOnly) engine = 'qwen';
if (engine === 'coddy') {
  const bin = engines.resolveCoddyBin();
  if (!bin) {
    console.error(
      process.env['CODDY_BIN']
        ? `CODDY_BIN указывает на ${process.env['CODDY_BIN']}, а такого файла нет`
        : 'Не найден агент Coddy: поставьте coddy в PATH или укажите путь в CODDY_BIN.\n' +
            'Встроенный движок без Coddy: coddy-tui --engine qwen',
    );
    process.exit(1);
  }
  process.env['CODDY_BIN'] = bin;
}
process.env['CODDY_TUI_ENGINE'] = engine;

try {
  await ensureSettings();
} catch (e) {
  console.error(`Настройки ${SETTINGS_FILE} обновить не вышло: ${e.message}`);
}
syncContext();
// В пакете npm (dist/) cli-entry.js лежит рядом с cli.js, в клоне репо — в scripts/.
await import(
  fs.existsSync(path.join(HERE, '..', '..', 'cli-entry.js'))
    ? '../../cli-entry.js'
    : '../../scripts/cli-entry.js'
);

async function fetchModels(key) {
  const res = await fetch(`${NEURALDEEP_BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(20000),
  });
  const text = await res.text();
  if (!res.ok)
    throw new Error(`NeuralDeep ответил ${res.status}: ${text.slice(0, 200)}`);
  return (JSON.parse(text).data || []).filter((m) => m.id);
}

// Окно контекста и картинки из каталога хаба (форма models.dev: limit.context, modalities.input)
function toProvider(m) {
  const generationConfig = {};
  const ctx =
    Number(m.limit?.context) ||
    Number(m.context_length) ||
    Number(m.max_model_len) ||
    0;
  if (ctx > 0) generationConfig.contextWindowSize = ctx;
  const input = m.modalities?.input;
  if (
    m.capabilities?.vision === true ||
    (Array.isArray(input) && input.includes('image'))
  ) {
    generationConfig.modalities = { image: true };
  }
  return {
    id: m.id,
    name: m.name || m.display_name || m.id,
    baseUrl: NEURALDEEP_BASE_URL,
    envKey: NEURALDEEP_ENV_KEY,
    generationConfig,
  };
}

function readSettings() {
  try {
    return parseSettings(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  } catch {
    return null;
  }
}

// Умолчания нового пользователя: русский интерфейс, статус-лайн, тема, без телеметрии.
// Модели NeuralDeep — только если ключ задан, а моделей ещё нет; свои значения пользователя не трогаем.
async function ensureSettings() {
  const cur = readSettings();
  const fresh = !cur;
  const s = cur ?? {};
  let changed = fresh;
  if (fresh) {
    s.privacy = { usageStatisticsEnabled: false };
    // интерфейс по умолчанию по-русски, сменить: /language ui en
    s.general = { language: 'ru', enableAutoUpdate: false };
    s.ui = {
      statusLine: {
        type: 'command',
        command: `"${process.execPath}" "${path.join(HERE, 'statusline.js')}"`,
        refreshInterval: 60,
        respectUserColors: true,
        hideContextIndicator: true,
      },
      // свёрнутые вызовы инструментов (Ctrl+O раскрыть), история внутри программы без тряски терминала
      showToolCallDetails: false,
      theme: 'Coddy',
      useTerminalBuffer: true,
    };
  }
  const key = process.env[NEURALDEEP_ENV_KEY];
  if (key && !s.modelProviders?.openai?.length) {
    try {
      const models = (await fetchModels(key)).map(toProvider);
      if (models.length) {
        s.modelProviders = { ...(s.modelProviders || {}), openai: models };
        s.security = {
          ...(s.security || {}),
          auth: { ...(s.security?.auth || {}), selectedType: 'openai' },
        };
        s.model = {
          ...(s.model || {}),
          name: s.model?.name || models[0].id,
          baseUrl: NEURALDEEP_BASE_URL,
        };
        changed = true;
      }
    } catch (e) {
      console.error(`Модели NeuralDeep не загрузились: ${e.message}`);
    }
  }
  if (changed) writeSettingsFile(s);
}

// Базовые правила агента (coddy/context/AGENTS.md) — блоком в глобальном AGENTS.md встроенного движка,
// остальное в файле пользователя не трогаем
function syncContext() {
  const begin = '<!-- coddy-tui:begin, блок обновляется при запуске -->';
  const end = '<!-- coddy-tui:end -->';
  try {
    const src = fs.readFileSync(
      path.join(HERE, '..', 'context', 'AGENTS.md'),
      'utf8',
    );
    const block = `${begin}\n${src.trim()}\n${end}`;
    const file = path.join(HOME, 'AGENTS.md');
    let cur = '';
    try {
      cur = fs.readFileSync(file, 'utf8');
    } catch {
      // файла ещё нет
    }
    const i = cur.indexOf(begin);
    const j = cur.indexOf(end);
    const next =
      i >= 0 && j > i
        ? cur.slice(0, i) + block + cur.slice(j + end.length)
        : cur
          ? `${block}\n\n${cur}`
          : `${block}\n`;
    if (next !== cur) {
      fs.mkdirSync(HOME, { recursive: true, mode: 0o700 });
      fs.writeFileSync(file, next);
    }
  } catch {
    // без базовых правил агент всё равно работает
  }
}

// settings.json — JSONC, как у основного загрузчика: BOM и комментарии // и /* */ (строки не трогаем)
function parseSettings(text) {
  const src = text.replace(/^\uFEFF/, '');
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"') {
      let j = i + 1;
      while (j < src.length && src[j] !== '"') j += src[j] === '\\' ? 2 : 1;
      out += src.slice(i, j + 1);
      i = j;
    } else if (ch === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      out += '\n';
    } else if (ch === '/' && src[i + 1] === '*') {
      const e = src.indexOf('*/', i + 2);
      i = e < 0 ? src.length : e + 1;
    } else {
      out += ch;
    }
  }
  return JSON.parse(out);
}

// через временный файл и rename: оборванная запись (нет места) не портит настройки моделей и MCP
function writeSettingsFile(s) {
  fs.mkdirSync(HOME, { recursive: true, mode: 0o700 });
  const tmp = `${SETTINGS_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(s, null, 2) + '\n', { mode: 0o600 });
  fs.chmodSync(tmp, 0o600);
  fs.renameSync(tmp, SETTINGS_FILE);
}

// как getSystemDefaultsPath апстрима (cli/src/config/storage-paths-lite.ts) без QWEN_CODE_SYSTEM_DEFAULTS_PATH
function systemDefaultsPathOfPlatform() {
  const sys =
    process.env['QWEN_CODE_SYSTEM_SETTINGS_PATH'] ||
    (process.platform === 'darwin'
      ? '/Library/Application Support/QwenCode/settings.json'
      : process.platform === 'win32'
        ? 'C:\\ProgramData\\qwen-code\\settings.json'
        : '/etc/qwen-code/settings.json');
  return path.join(path.dirname(sys), 'system-defaults.json');
}
