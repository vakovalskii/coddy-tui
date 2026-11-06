/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * coddy: переезд с Claude Code и Codex — где агент ищет проектные файлы.
 *
 * Включается переменной `CODDY_TUI_PROJECT_DIR` (её ставит `coddy/bin/coddy-tui.js`, значение `.coddy`).
 * Без неё всё как в апстриме Qwen Code: `.qwen`, и тесты апстрима не замечают форка.
 *
 * С ней: пишем в `.coddy/`, читаем `.coddy/`, затем старый `.qwen/`; навыки и команды
 * берём ещё из `.claude/`, `.agents/`, `~/.codex/`. Подробно — coddy/guides/migrate-from-claude-codex.md.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const UPSTREAM_DIR = '.qwen';

/** Включён ли режим форка (каталог `.coddy` и чтение файлов Claude Code / Codex). */
export const CODDY_TUI_NATIVE = !!process.env['CODDY_TUI_PROJECT_DIR'];

/** Каталог проекта, куда агент пишет: `.coddy` в форке, `.qwen` в апстриме. */
export const CODDY_TUI_PROJECT_DIR =
  process.env['CODDY_TUI_PROJECT_DIR'] || UPSTREAM_DIR;

/** Старый каталог проекта Qwen Code — только читаем. */
export const CODDY_TUI_LEGACY_PROJECT_DIR = UPSTREAM_DIR;

/** Каталоги проекта для чтения, по убыванию приоритета: `.coddy`, затем `.qwen`. */
export const CODDY_TUI_PROJECT_READ_DIRS: readonly string[] = CODDY_TUI_NATIVE
  ? [CODDY_TUI_PROJECT_DIR, UPSTREAM_DIR]
  : [UPSTREAM_DIR];

/** Проектные навыки: `<dir>/skills` по убыванию приоритета. */
export const CODDY_TUI_PROJECT_SKILL_DIRS: readonly string[] = CODDY_TUI_NATIVE
  ? [CODDY_TUI_PROJECT_DIR, '.agents', '.claude', UPSTREAM_DIR]
  : [UPSTREAM_DIR, '.agents'];

/**
 * Пользовательские навыки: первый элемент — домашний каталог агента (QWEN_HOME),
 * остальные — `~/<dir>/skills`.
 */
export const CODDY_TUI_USER_SKILL_DIRS: readonly string[] = CODDY_TUI_NATIVE
  ? [CODDY_TUI_PROJECT_DIR, '.agents', '.claude', '.codex']
  : [UPSTREAM_DIR, '.agents'];

/** Свой ignore-файл, читается вместе с `.qwenignore`. */
export const CODDY_TUI_IGNORE_FILE_NAMES: readonly string[] = CODDY_TUI_NATIVE
  ? ['.coddyignore']
  : [];

/** Личный файл контекста проекта: пишем сюда (`.coddy/AGENTS.local.md`). */
export const CODDY_TUI_LOCAL_CONTEXT_FILE = path.join(
  CODDY_TUI_PROJECT_DIR,
  'AGENTS.local.md',
);

/**
 * Все слоты личного контекста проекта, относительно корня: свой, старый Qwen Code
 * (`.qwen/QWEN.local.md`) и Claude Code (`CLAUDE.local.md` в корне).
 */
export const CODDY_TUI_LOCAL_CONTEXT_SLOTS: readonly string[] = CODDY_TUI_NATIVE
  ? [
      CODDY_TUI_LOCAL_CONTEXT_FILE,
      path.join(UPSTREAM_DIR, 'QWEN.local.md'),
      'CLAUDE.local.md',
    ]
  : [path.join(UPSTREAM_DIR, 'QWEN.local.md')];

/** Пути `<root>/<dir>/<rest>` для всех каталогов чтения, по убыванию приоритета. */
export function coddyProjectReadPaths(
  root: string,
  ...rest: string[]
): string[] {
  return CODDY_TUI_PROJECT_READ_DIRS.map((dir) =>
    path.join(root, dir, ...rest),
  );
}

/**
 * Один файл/каталог проекта, который и читают, и пишут: `.coddy/<rest>`, а если его нет,
 * но есть старый `.qwen/<rest>` — старый (чтобы не потерять настройки и общую память команды).
 */
export function coddyProjectSlot(root: string, ...rest: string[]): string {
  const paths = coddyProjectReadPaths(root, ...rest);
  return paths.find((p) => fs.existsSync(p)) ?? paths[0];
}

/**
 * Файлы из нескольких каталогов (полные пути). Одинаковое имя файла — берётся из
 * каталога раньше в списке. Если не прочитался ни один каталог — ошибка первого,
 * как у `fs.readdir` для одного каталога.
 */
export async function coddyReadDirs(
  dirs: readonly string[],
  readdir: (dir: string) => Promise<string[]> = (dir) =>
    fs.promises.readdir(dir),
): Promise<string[]> {
  const seen = new Set<string>();
  const out: string[] = [];
  let firstError: unknown;
  let anyRead = false;
  for (const dir of dirs) {
    let names: string[];
    try {
      names = await readdir(dir);
    } catch (error) {
      firstError ??= error;
      continue;
    }
    anyRead = true;
    for (const name of names) {
      if (seen.has(name)) continue;
      seen.add(name);
      out.push(path.join(dir, name));
    }
  }
  if (!anyRead && firstError) throw firstError;
  return out;
}
