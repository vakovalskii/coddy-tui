/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import type OpenAI from 'openai';
import { coddyRebrandRequest } from './coddy-rebrand.js';

describe('coddyRebrandRequest', () => {
  it('меняет имя в system и описаниях инструментов, переписку не трогает', () => {
    const req = {
      model: 'm',
      messages: [
        { role: 'system', content: 'You are Qwen Code, an agent.' },
        {
          role: 'system',
          content: [{ type: 'text', text: 'Qwen Code rules' }],
        },
        { role: 'user', content: 'what is Qwen Code?' },
      ],
      tools: [
        {
          type: 'function',
          function: { name: 'x', description: 'another Qwen Code session' },
        },
      ],
    } as OpenAI.Chat.ChatCompletionCreateParams;
    coddyRebrandRequest(req);
    expect(req.messages[0].content).toBe('You are Coddy, an agent.');
    expect((req.messages[1].content as Array<{ text: string }>)[0].text).toBe(
      'Coddy rules',
    );
    expect(req.messages[2].content).toBe('what is Qwen Code?');
    const tool = req.tools![0] as OpenAI.Chat.ChatCompletionTool;
    expect(tool.function.description).toBe('another Coddy session');
  });

  it('убирает Alibaba из представления и правит вставки харнеса, но не текст пользователя', () => {
    const req = {
      model: 'm',
      messages: [
        {
          role: 'system',
          content:
            'You are Qwen Code, an agent developed by Alibaba Group, specializing in code.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '<system-reminder>\nThis is the Qwen Code. We are setting up. Folder: /repo/Qwen Code/developed by Alibaba Group',
            },
            {
              type: 'text',
              text: 'почему Qwen Code от Alibaba? developed by Alibaba Group',
            },
          ],
        },
      ],
    } as OpenAI.Chat.ChatCompletionCreateParams;
    coddyRebrandRequest(req);
    expect(req.messages[0].content).toBe(
      'You are Coddy, an agent developed by NeuralDeep, specializing in code.',
    );
    const parts = req.messages[1].content as Array<{ text: string }>;
    expect(parts[0].text).toBe(
      '<system-reminder>\nThis is the Coddy. We are setting up. Folder: /repo/Qwen Code/developed by Alibaba Group',
    );
    expect(parts[1].text).toBe(
      'почему Qwen Code от Alibaba? developed by Alibaba Group',
    );
  });

  it('без tools и system не падает', () => {
    const req = {
      model: 'm',
      messages: [{ role: 'user', content: 'hi' }],
    } as OpenAI.Chat.ChatCompletionCreateParams;
    expect(() => coddyRebrandRequest(req)).not.toThrow();
  });
});
