/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * coddy: /init в проекте, где уже есть CLAUDE.md (Claude Code), а AGENTS.md ещё нет.
 *
 * Правила не дублируем: переносим их в AGENTS.md, а CLAUDE.md сводим к одной строке
 * `@AGENTS.md` — Claude Code подхватит импорт, мы читаем AGENTS.md (CLAUDE.md рядом с ним
 * пропускается, см. memoryDiscovery.ts). Вызывать до того, как /init создаст пустой файл.
 */
export function coddyInitClaudeHint(
  targetDir: string,
  contextFileName: string,
): string {
  if (contextFileName !== 'AGENTS.md') return '';
  if (fs.existsSync(path.join(targetDir, 'AGENTS.md'))) return '';
  let claude = '';
  try {
    claude = fs.readFileSync(path.join(targetDir, 'CLAUDE.md'), 'utf8').trim();
  } catch {
    return '';
  }
  if (!claude || claude === '@AGENTS.md') return '';
  return `

**Existing CLAUDE.md:**

This directory already has a \`CLAUDE.md\` (instructions for Claude Code). Do not duplicate it:
1. Read \`CLAUDE.md\` first and use it as the primary source — keep every rule, command and restriction from it in \`AGENTS.md\`, then add what you learn from the analysis.
2. After \`AGENTS.md\` is written, replace the whole content of \`CLAUDE.md\` with the single line \`@AGENTS.md\`, so Claude Code keeps reading the same instructions from one file.
`;
}
