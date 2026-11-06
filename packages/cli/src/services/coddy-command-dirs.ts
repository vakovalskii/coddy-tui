/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * coddy: свои команды из Claude Code и Codex без переделки.
 *
 * Claude Code — `.claude/commands/*.md` и `~/.claude/commands`, Codex — `~/.codex/prompts/*.md`:
 * markdown с frontmatter `description`, аргументы — `$ARGUMENTS`. У нас тот же markdown,
 * аргументы — `{{args}}`, поэтому меняем только плейсхолдер.
 *
 * Порядок — по возрастанию приоритета (в CommandService выигрывает последняя команда с тем же
 * именем): пользовательские Codex → Claude → наши, затем проектные старый `.qwen` → `.claude` → `.coddy`.
 */

import * as os from 'node:os';
import path from 'node:path';
import {
  CODDY_TUI_LEGACY_PROJECT_DIR,
  CODDY_TUI_NATIVE,
} from '@qwen-code/qwen-code-core/utils/coddy-project-dirs.js';

export interface CoddyCommandDirectory {
  path: string;
  /** Файлы в формате Claude Code / Codex: `$ARGUMENTS` → `{{args}}`. */
  coddyCompat?: boolean;
}

/** Каталоги пользовательских команд перед нашим (`<QWEN_HOME>/commands`). */
export function coddyUserCommandDirsBefore(): CoddyCommandDirectory[] {
  if (!CODDY_TUI_NATIVE) return [];
  const home = os.homedir();
  return [
    { path: path.join(home, '.codex', 'prompts'), coddyCompat: true },
    { path: path.join(home, '.claude', 'commands'), coddyCompat: true },
  ];
}

/** Каталоги проектных команд перед нашим (`.coddy/commands`). */
export function coddyProjectCommandDirsBefore(
  projectRoot: string,
): CoddyCommandDirectory[] {
  if (!CODDY_TUI_NATIVE) return [];
  return [
    { path: path.join(projectRoot, CODDY_TUI_LEGACY_PROJECT_DIR, 'commands') },
    { path: path.join(projectRoot, '.claude', 'commands'), coddyCompat: true },
  ];
}

/** `$ARGUMENTS` Claude Code / Codex → наш `{{args}}`. */
export function coddyAdaptCompatPrompt(prompt: string): string {
  return prompt.replaceAll('$ARGUMENTS', '{{args}}');
}
