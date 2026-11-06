/* global process, console */

/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Пакет npm coddy-tui из dist/: как апстримный prepare:package (dist/package.json, бандл,
 * нативные ассеты), плюс наша точка входа и ресурсы в dist/coddy. Запуск после
 * `npm run bundle && npm run prepare:package`, дальше `npm pack ./dist`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = path.join(ROOT, 'dist');
const pkgFile = path.join(DIST, 'package.json');
if (!fs.existsSync(pkgFile)) {
  console.error('нет dist/package.json: сначала npm run bundle && npm run prepare:package');
  process.exit(1);
}

for (const dir of ['bin', 'context', 'image-editor']) {
  fs.cpSync(path.join(ROOT, 'coddy', dir), path.join(DIST, 'coddy', dir), {
    recursive: true,
    filter: (src) => !/(\.test\.[cm]?js|test\.sh|pack\.js)$/.test(src),
  });
}
fs.copyFileSync(path.join(ROOT, 'CODDY-TUI.md'), path.join(DIST, 'CODDY-TUI.md'));

const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
pkg.name = 'coddy-tui';
pkg.description = 'Qwen Code terminal interface driving the Coddy agent over ACP';
pkg.bin = { 'coddy-tui': 'coddy/bin/coddy-tui.js' };
pkg.repository = { type: 'git', url: 'git+https://github.com/vakovalskii/coddy-tui.git' };
pkg.files = [...new Set([...(pkg.files || []), 'coddy/', 'CODDY-TUI.md'])];
fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n');
console.log(`dist/ готов: ${pkg.name}@${pkg.version}, bin coddy-tui`);
