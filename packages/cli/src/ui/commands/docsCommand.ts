/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import process from 'node:process';
import {
  type CommandContext,
  type SlashCommand,
  CommandKind,
} from './types.js';
import { openBrowserSecurely } from '@qwen-code/qwen-code-core';
import { MessageType } from '../types.js';

import {
  coddyDocsFile,
  coddyDocsPath,
  coddyDocsUrl,
} from '../utils/coddy-docs.js'; // coddy: локальный README
import { t } from '../../i18n/index.js';

export const docsCommand: SlashCommand = {
  name: 'docs',
  get description() {
    return t('open full Qwen Code documentation in your browser');
  },
  kind: CommandKind.BUILT_IN,
  supportedModes: ['interactive', 'non_interactive', 'acp'] as const,
  canRunDuringStreaming: true,
  action: async (context: CommandContext) => {
    // coddy: локальный README программы вместо сайта Qwen и адреса внутреннего git
    const docsUrl = coddyDocsPath();

    // Non-interactive/ACP: return URL directly, no browser, no addItem
    if (context.executionMode !== 'interactive') {
      return {
        type: 'message' as const,
        messageType: 'info' as const,
        content: t('Coddy documentation: {{docsUrl}}', {
          docsUrl: String(docsUrl),
        }),
      };
    }

    if (process.env['SANDBOX'] && process.env['SANDBOX'] !== 'sandbox-exec') {
      context.ui.addItem(
        {
          type: MessageType.INFO,
          text: t(
            'Please open the following URL in your browser to view the documentation:\n{{url}}',
            {
              url: docsUrl,
            },
          ),
        },
        Date.now(),
      );
    } else {
      context.ui.addItem(
        {
          type: MessageType.INFO,
          text: t('Opening documentation in your browser: {{url}}', {
            url: docsUrl,
          }),
        },
        Date.now(),
      );
      try {
        // coddy: открываем локальный README; file:// разрешён только для него
        const file = coddyDocsFile();
        const url = coddyDocsUrl();
        if (!file || !url) throw new Error('README программы не найден');
        await openBrowserSecurely(url, {
          allowFile: true,
          allowedFilePaths: [file],
        });
      } catch (_error) {
        context.ui.addItem(
          {
            type: MessageType.ERROR,
            text: t('Failed to open browser. View documentation at {{url}}', {
              url: docsUrl,
            }),
          },
          Date.now(),
        );
      }
    }
    return;
  },
};
