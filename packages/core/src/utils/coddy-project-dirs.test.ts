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

vi.mock('os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('os')>();
  return {
    ...actual,
    default: actual,
    homedir: () => fake.home || actual.homedir(),
  };
});
vi.mock('node:os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:os')>();
  return {
    ...actual,
    default: actual,
    homedir: () => fake.home || actual.homedir(),
  };
});

const os = await import('node:os');
const {
  CODDY_TUI_PROJECT_READ_DIRS,
  CODDY_TUI_LOCAL_CONTEXT_SLOTS,
  coddyProjectSlot,
  coddyReadDirs,
} = await import('./coddy-project-dirs.js');
const { QWEN_DIR } = await import('./paths.js');
const { Storage, SKILL_PROVIDER_CONFIG_DIRS } = await import(
  '../config/storage.js'
);
const { SkillManager } = await import('../skills/skill-manager.js');
const { getProjectSkillsRoot } = await import('../skills/skill-paths.js');
const { getQwenIgnoreFileNames } = await import('./qwenIgnoreParser.js');
const { getCurrentMemoryFilename } = await import('./memory-constants.js');
const { loadServerHierarchicalMemory } = await import(
  '../memory/memoryDiscovery.js'
);
const { FileDiscoveryService } = await import(
  '../services/fileDiscoveryService.js'
);
const { getTeamAutoMemoryRoot, clearAutoMemoryRootCache } = await import(
  '../memory/paths.js'
);
const { checkWorkspaceTeamMemorySecrets } = await import(
  '../memory/team-memory-secret-guard.js'
);
const { isAutoModeProtectedWritePath } = await import(
  '../permissions/autoMode.js'
);

function write(file: string, content = ''): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function skill(dir: string, name: string, description: string, extra = '') {
  write(
    path.join(dir, name, 'SKILL.md'),
    `---\nname: ${name}\ndescription: ${description}\n${extra}---\n\nBody of ${name}\n`,
  );
}

describe('coddy: каталоги проекта .coddy / .qwen / .claude / .codex', () => {
  let root: string;
  let project: string;
  let qwenHome: string;

  beforeEach(() => {
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'coddy-dirs-')),
    );
    project = path.join(root, 'project');
    fake.home = path.join(root, 'home');
    qwenHome = path.join(fake.home, '.coddy/tui');
    fs.mkdirSync(path.join(project, '.git'), { recursive: true });
    fs.mkdirSync(qwenHome, { recursive: true });
    vi.stubEnv('QWEN_HOME', qwenHome);
    clearAutoMemoryRootCache();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fake.home = '';
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('пишет в .coddy, читает .coddy, затем старый .qwen', () => {
    expect(QWEN_DIR).toBe('.coddy');
    expect(CODDY_TUI_PROJECT_READ_DIRS).toEqual(['.coddy', '.qwen']);
    expect(new Storage(project).getQwenDir()).toBe(
      path.join(project, '.coddy'),
    );
    expect(new Storage(project).getProjectCommandsDir()).toBe(
      path.join(project, '.coddy', 'commands'),
    );
    expect(getProjectSkillsRoot(project)).toBe(
      path.join(project, '.coddy', 'skills'),
    );
    // домашний каталог агента — QWEN_HOME, не ~/.qwen
    expect(Storage.getGlobalQwenDir()).toBe(qwenHome);
  });

  it('settings.json: .coddy, а при одном старом .qwen — старый', () => {
    const storage = new Storage(project);
    expect(storage.getWorkspaceSettingsPath()).toBe(
      path.join(project, '.coddy', 'settings.json'),
    );
    write(path.join(project, '.qwen', 'settings.json'), '{}');
    expect(storage.getWorkspaceSettingsPath()).toBe(
      path.join(project, '.qwen', 'settings.json'),
    );
    write(path.join(project, '.coddy', 'settings.json'), '{}');
    expect(storage.getWorkspaceSettingsPath()).toBe(
      path.join(project, '.coddy', 'settings.json'),
    );
  });

  it('coddyProjectSlot и coddyReadDirs', async () => {
    expect(coddyProjectSlot(project, 'x')).toBe(
      path.join(project, '.coddy', 'x'),
    );
    write(path.join(project, '.qwen', 'agents', 'a.md'), 'old');
    write(path.join(project, '.qwen', 'agents', 'b.md'), 'old');
    write(path.join(project, '.coddy', 'agents', 'a.md'), 'new');
    const files = await coddyReadDirs([
      path.join(project, '.coddy', 'agents'),
      path.join(project, '.qwen', 'agents'),
    ]);
    expect(files).toEqual([
      path.join(project, '.coddy', 'agents', 'a.md'),
      path.join(project, '.qwen', 'agents', 'b.md'),
    ]);
    await expect(coddyReadDirs([path.join(project, 'nope')])).rejects.toThrow();
  });

  it('навыки: проект .coddy > .agents > .claude > .qwen, пользователь QWEN_HOME > ~/.agents > ~/.claude > ~/.codex', async () => {
    expect(SKILL_PROVIDER_CONFIG_DIRS).toEqual([
      '.coddy',
      '.agents',
      '.claude',
      '.qwen',
    ]);
    expect(new Storage(project).getUserSkillsDirs()).toEqual([
      path.join(qwenHome, 'skills'),
      path.join(fake.home, '.agents', 'skills'),
      path.join(fake.home, '.claude', 'skills'),
      path.join(fake.home, '.codex', 'skills'),
    ]);

    // навык Claude Code: allowed-tools строкой, без name — имя из папки
    write(
      path.join(project, '.claude', 'skills', 'deploy-check', 'SKILL.md'),
      '---\ndescription: Check deploy\nallowed-tools: Bash(git:*), Read\nmodel: inherit\n---\n\nRun checks\n',
    );
    skill(path.join(project, '.claude', 'skills'), 'dup', 'from claude');
    skill(path.join(project, '.coddy', 'skills'), 'dup', 'from coddy');
    skill(path.join(project, '.agents', 'skills'), 'agents-skill', 'agents');
    skill(path.join(project, '.qwen', 'skills'), 'legacy', 'legacy qwen');
    skill(
      path.join(fake.home, '.codex', 'skills'),
      'codex-skill',
      'codex',
      'metadata:\n  short-description: x\n',
    );
    skill(path.join(fake.home, '.claude', 'skills'), 'dup', 'from user');

    const manager = new SkillManager({
      isSafeMode: () => false,
      getBareMode: () => false,
      getProjectRoot: () => project,
      getActiveExtensions: () => [],
    } as never);
    const skills = await manager.listSkills();
    const byName = new Map(skills.map((s) => [s.name, s]));
    expect(byName.get('deploy-check')?.level).toBe('project');
    expect(byName.get('dup')?.description).toBe('from coddy');
    expect(byName.get('agents-skill')?.level).toBe('project');
    expect(byName.get('legacy')?.level).toBe('project');
    expect(byName.get('codex-skill')?.level).toBe('user');
    expect(skills.filter((s) => s.name === 'dup')).toHaveLength(1);
  });

  it('ignore: .coddyignore вместе с .qwenignore', () => {
    expect(getQwenIgnoreFileNames()).toEqual([
      '.coddyignore',
      '.qwenignore',
      '.agentignore',
      '.aiignore',
    ]);
    expect(getQwenIgnoreFileNames(['.coddyignore', 'x'])).toEqual([
      '.coddyignore',
      '.qwenignore',
      'x',
    ]);
  });

  it('контекст: /init и память пишут AGENTS.md; личные слоты .coddy/AGENTS.local.md, .qwen/QWEN.local.md, CLAUDE.local.md', async () => {
    expect(getCurrentMemoryFilename()).toBe('AGENTS.md');
    expect(CODDY_TUI_LOCAL_CONTEXT_SLOTS).toEqual([
      path.join('.coddy', 'AGENTS.local.md'),
      path.join('.qwen', 'QWEN.local.md'),
      'CLAUDE.local.md',
    ]);
    write(path.join(project, 'CLAUDE.md'), 'claude shared rule');
    write(path.join(project, 'CLAUDE.local.md'), 'claude local rule');
    write(path.join(project, '.qwen', 'QWEN.local.md'), 'old local rule');
    write(path.join(project, '.coddy', 'AGENTS.local.md'), 'coddy local rule');
    const result = await loadServerHierarchicalMemory(
      project,
      [],
      new FileDiscoveryService(project),
      [],
      true,
    );
    for (const text of [
      'claude shared rule',
      'claude local rule',
      'old local rule',
      'coddy local rule',
    ]) {
      expect(result.memoryContent).toContain(text);
    }
  });

  it('командная память: .coddy/team-memory, при одной старой .qwen/team-memory — старая', () => {
    expect(getTeamAutoMemoryRoot(project)).toBe(
      path.join(project, '.coddy', 'team-memory'),
    );
    clearAutoMemoryRootCache();
    fs.mkdirSync(path.join(project, '.qwen', 'team-memory'), {
      recursive: true,
    });
    expect(getTeamAutoMemoryRoot(project)).toBe(
      path.join(project, '.qwen', 'team-memory'),
    );
    const secret = `key: ghp_${'a1B2c3D4e5'.repeat(3)}abcdef`;
    // секреты проверяются в обоих каталогах
    for (const dir of ['.coddy', '.qwen']) {
      const file = path.join(project, dir, 'team-memory', 'note.md');
      expect(
        checkWorkspaceTeamMemorySecrets(file, secret, project),
      ).not.toBeNull();
    }
  });

  it('auto-режим не правит молча файлы, которые теперь читает агент', () => {
    for (const p of [
      '.coddy/settings.json',
      '.coddy/skills/x/SKILL.md',
      '.claude/commands/y.md',
      'CLAUDE.local.md',
    ]) {
      expect(isAutoModeProtectedWritePath(p)).toBe(true);
    }
  });
});
