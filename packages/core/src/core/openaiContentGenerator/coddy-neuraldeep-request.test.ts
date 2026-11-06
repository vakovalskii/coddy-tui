/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import type OpenAI from 'openai';
import {
  coddyAdaptRequestForNeuraldeep,
  isNeuraldeepBaseUrl,
} from './coddy-neuraldeep-request.js';

const ND = 'https://api.neuraldeep.ru/v1';
const fn = (name: string): OpenAI.Chat.ChatCompletionTool => ({
  type: 'function',
  function: { name, parameters: { type: 'object' } },
});
const req = (
  tools: OpenAI.Chat.ChatCompletionTool[],
  tool_choice?: OpenAI.Chat.ChatCompletionToolChoiceOption,
) =>
  ({
    model: 'qwen3.8-27b',
    messages: [{ role: 'user', content: 'x' }],
    tools,
    ...(tool_choice !== undefined && { tool_choice }),
  }) as OpenAI.Chat.ChatCompletionCreateParams;

describe('isNeuraldeepBaseUrl', () => {
  it('узнаёт NeuralDeep по хосту', () => {
    expect(isNeuraldeepBaseUrl(ND)).toBe(true);
    expect(isNeuraldeepBaseUrl('https://api.neuraldeep.tech/v1')).toBe(true);
    expect(isNeuraldeepBaseUrl('https://api.openai.com/v1')).toBe(false);
    expect(isNeuraldeepBaseUrl('https://api.neuraldeep.ru.evil.io/v1')).toBe(
      false,
    );
    expect(isNeuraldeepBaseUrl(undefined)).toBe(false);
    expect(isNeuraldeepBaseUrl('не адрес')).toBe(false);
  });
});

describe('coddyAdaptRequestForNeuraldeep', () => {
  it('required с одним инструментом → именованный выбор', () => {
    const r = req([fn('respond_in_schema')], 'required');
    coddyAdaptRequestForNeuraldeep(r, ND);
    expect(r.tool_choice).toEqual({
      type: 'function',
      function: { name: 'respond_in_schema' },
    });
  });

  it('required с несколькими инструментами → auto', () => {
    const r = req([fn('a'), fn('b')], 'required');
    coddyAdaptRequestForNeuraldeep(r, ND);
    expect(r.tool_choice).toBe('auto');
  });

  it('другие провайдеры и другие значения tool_choice не трогает', () => {
    const other = req([fn('respond_in_schema')], 'required');
    coddyAdaptRequestForNeuraldeep(other, 'https://api.openai.com/v1');
    expect(other.tool_choice).toBe('required');

    const none = req([fn('a')], 'none');
    coddyAdaptRequestForNeuraldeep(none, ND);
    expect(none.tool_choice).toBe('none');

    const unset = req([fn('a')]);
    coddyAdaptRequestForNeuraldeep(unset, ND);
    expect(unset.tool_choice).toBeUndefined();
  });
});
