/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

// coddy-tui.js ставит переменную до загрузки модулей — повторяем это до импортов
const fake = vi.hoisted(() => {
  process.env['CODDY_TUI_PROJECT_DIR'] = '.coddy';
  return { home: '' };
});

vi.mock('node:os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:os')>();
  const homedir = () => fake.home || actual.homedir();
  return { ...actual, default: { ...actual, homedir }, homedir };
});

const os = await import('node:os');
const { FileCommandLoader } = await import('./FileCommandLoader.js');
const { coddyAdaptCompatPrompt } = await import('./coddy-command-dirs.js');

function write(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

describe('coddy: команды Claude Code и Codex', () => {
  let root: string;
  let project: string;

  beforeEach(() => {
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'coddy-cmd-')),
    );
    project = path.join(root, 'project');
    fake.home = path.join(root, 'home');
    fs.mkdirSync(project, { recursive: true });
    vi.stubEnv('QWEN_HOME', path.join(fake.home, '.coddy/tui'));
    vi.spyOn(process, 'cwd').mockReturnValue(project);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    fake.home = '';
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('$ARGUMENTS → {{args}}', () => {
    expect(coddyAdaptCompatPrompt('Fix issue $ARGUMENTS now')).toBe(
      'Fix issue {{args}} now',
    );
  });

  it('читает .claude/commands, ~/.claude/commands, ~/.codex/prompts, старый .qwen/commands; .coddy главнее', async () => {
    write(
      path.join(project, '.claude', 'commands', 'review-pr.md'),
      '---\ndescription: Review a PR\nallowed-tools: Bash(gh:*)\nargument-hint: "[pr]"\n---\n\nReview PR $ARGUMENTS carefully\n',
    );
    write(
      path.join(project, '.claude', 'commands', 'frontend', 'lint.md'),
      'Lint the frontend\n',
    );
    write(
      path.join(fake.home, '.claude', 'commands', 'standup.md'),
      '---\ndescription: Standup notes\n---\nWrite standup\n',
    );
    write(
      path.join(fake.home, '.codex', 'prompts', 'explain.md'),
      '---\ndescription: Explain code\nargument-hint: FILE=<path>\n---\nExplain $ARGUMENTS\n',
    );
    write(
      path.join(project, '.qwen', 'commands', 'legacy.md'),
      '---\ndescription: Old qwen command\n---\nlegacy\n',
    );
    write(
      path.join(project, '.qwen', 'commands', 'dup.md'),
      '---\ndescription: from qwen\n---\nx\n',
    );
    write(
      path.join(project, '.coddy', 'commands', 'dup.md'),
      '---\ndescription: from coddy\n---\nx\n',
    );

    const commands = await new FileCommandLoader(null).loadCommands(
      new AbortController().signal,
    );
    const byName = new Map<string, (typeof commands)[number]>();
    for (const c of commands) byName.set(c.name, c); // как в CommandService: последняя побеждает

    expect(byName.get('review-pr')?.description).toBe('Review a PR');
    expect(byName.get('review-pr')?.argumentHint).toBe('[pr]');
    expect(byName.get('frontend:lint')).toBeDefined();
    expect(byName.get('standup')?.description).toBe('Standup notes');
    expect(byName.get('explain')?.description).toBe('Explain code');
    expect(byName.get('legacy')?.description).toBe('Old qwen command');
    expect(byName.get('dup')?.description).toBe('from coddy');

    const result = await byName.get('review-pr')!.action!(
      {
        invocation: { raw: '/review-pr 42', name: 'review-pr', args: '42' },
        services: { config: null },
        session: { sessionShellAllowlist: new Set() },
      } as never,
      '42',
    );
    expect(result).toMatchObject({
      type: 'submit_prompt',
      content: [{ text: 'Review PR 42 carefully' }],
    });
  });
});
