/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { docsCommand } from './docsCommand.js';
import { type CommandContext } from './types.js';
import { createMockCommandContext } from '../../test-utils/mockCommandContext.js';
import { MessageType } from '../types.js';
import { coddyDocsPath, coddyDocsUrl } from '../utils/coddy-docs.js';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const mockOpenBrowserSecurely = vi.hoisted(() => vi.fn());

vi.mock('@qwen-code/qwen-code-core', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@qwen-code/qwen-code-core')>();
  return {
    ...actual,
    openBrowserSecurely: mockOpenBrowserSecurely,
  };
});

describe('docsCommand', () => {
  let mockContext: CommandContext;
  beforeEach(() => {
    // Create a fresh mock context before each test
    mockContext = createMockCommandContext();
    mockOpenBrowserSecurely.mockClear();
    mockOpenBrowserSecurely.mockResolvedValue(undefined);
  });

  afterEach(() => {
    // Restore any stubbed environment variables
    vi.unstubAllEnvs();
  });

  it('opts in to running during streaming', () => {
    expect(docsCommand.canRunDuringStreaming).toBe(true);
  });

  it("should add an info message and call 'open' in a non-sandbox environment", async () => {
    if (!docsCommand.action) {
      throw new Error('docsCommand must have an action.');
    }

    const docsUrl = coddyDocsPath(); // coddy: локальный README

    await docsCommand.action(mockContext, '');

    expect(mockContext.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: `Opening documentation in your browser: ${docsUrl}`,
      },
      expect.any(Number),
    );

    // coddy: без CODDY_TUI_ASSETS_DIR README программы нет — браузер не открываем, показываем подсказку
    expect(coddyDocsUrl()).toBeUndefined();
  });

  // coddy: README программы есть — открываем его, file:// разрешён только для этого файла
  it('opens the program README with allowedFilePaths', async () => {
    const app = mkdtempSync(path.join(os.tmpdir(), 'coddy-docs-cmd-'));
    mkdirSync(path.join(app, 'coddy'));
    writeFileSync(path.join(app, 'CODDY-TUI.md'), '# Coddy');
    const saved = process.env['CODDY_TUI_ASSETS_DIR'];
    process.env['CODDY_TUI_ASSETS_DIR'] = path.join(app, 'coddy');
    try {
      await docsCommand.action!(mockContext, '');
      expect(mockOpenBrowserSecurely).toHaveBeenCalledWith(coddyDocsUrl(), {
        allowFile: true,
        allowedFilePaths: [path.join(app, 'CODDY-TUI.md')],
      });
    } finally {
      if (saved === undefined) delete process.env['CODDY_TUI_ASSETS_DIR'];
      else process.env['CODDY_TUI_ASSETS_DIR'] = saved;
    }
  });

  it('should only add an info message in a sandbox environment', async () => {
    if (!docsCommand.action) {
      throw new Error('docsCommand must have an action.');
    }

    // Simulate a sandbox environment
    vi.stubEnv('SANDBOX', 'gemini-sandbox');
    const docsUrl = coddyDocsPath(); // coddy: локальный README

    await docsCommand.action(mockContext, '');

    expect(mockContext.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: `Please open the following URL in your browser to view the documentation:\n${docsUrl}`,
      },
      expect.any(Number),
    );

    // Ensure 'open' was not called in the sandbox
    expect(mockOpenBrowserSecurely).not.toHaveBeenCalled();
  });

  it("should not open browser for 'sandbox-exec'", async () => {
    if (!docsCommand.action) {
      throw new Error('docsCommand must have an action.');
    }

    // Simulate the specific 'sandbox-exec' environment
    vi.stubEnv('SANDBOX', 'sandbox-exec');
    const docsUrl = coddyDocsPath(); // coddy: локальный README

    await docsCommand.action(mockContext, '');

    // The logic should fall through to the 'else' block
    expect(mockContext.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: `Opening documentation in your browser: ${docsUrl}`,
      },
      expect.any(Number),
    );

    // Browser launch should be called in this specific sandbox case.
    // coddy: без CODDY_TUI_ASSETS_DIR README программы нет — браузер не открываем, показываем подсказку
    expect(coddyDocsUrl()).toBeUndefined();
  });

  it('should show the docs URL when browser opening throws unexpectedly', async () => {
    if (!docsCommand.action) {
      throw new Error('docsCommand must have an action.');
    }

    const docsUrl = coddyDocsPath(); // coddy: локальный README
    mockOpenBrowserSecurely.mockRejectedValueOnce(new Error('bad url'));

    await docsCommand.action(mockContext, '');

    expect(mockContext.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.ERROR,
        text: `Failed to open browser. View documentation at ${docsUrl}`,
      },
      expect.any(Number),
    );
  });

  describe('non-interactive mode', () => {
    it('should return docs URL without opening browser', async () => {
      if (!docsCommand.action) throw new Error('Command has no action');

      const nonInteractiveContext = createMockCommandContext({
        executionMode: 'non_interactive',
      });

      const result = await docsCommand.action(nonInteractiveContext, '');

      expect(result).toEqual({
        type: 'message',
        messageType: 'info',
        content: expect.stringContaining('CODDY-TUI.md'),
      });
      expect(mockOpenBrowserSecurely).not.toHaveBeenCalled();
      expect(nonInteractiveContext.ui.addItem).not.toHaveBeenCalled();
    });
  });
});
