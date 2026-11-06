/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import type OpenAI from 'openai';

// Хосты NeuralDeep (providers/presets/neuraldeep.ts и зеркало .tech, как в Coddy). Пресет здесь
// не импортируем: он тянет core/contentGenerator, а этот модуль грузится из пайплайна — цикл импортов.
const NEURALDEEP_HOSTS = new Set(['api.neuraldeep.ru', 'api.neuraldeep.tech']);

/** Запрос идёт в NeuralDeep. */
export function isNeuraldeepBaseUrl(baseUrl: string | undefined): boolean {
  if (!baseUrl) return false;
  try {
    return NEURALDEEP_HOSTS.has(new URL(baseUrl).hostname);
  } catch {
    return false;
  }
}

// coddy: апстрим ставит tool_choice: "required" во все структурные side query (generateJson:
// классификатор авторежима, заголовки сессий). Не каждый сервер за шлюзом NeuralDeep его
// понимает, а именованный выбор функции {type:'function', function:{name}} — часть базового
// OpenAI API и значит то же самое, если инструмент один. Если их несколько, именовать нечего —
// ставим 'auto', это лучше гарантированного 400.
export function coddyAdaptRequestForNeuraldeep(
  request: OpenAI.Chat.ChatCompletionCreateParams,
  baseUrl: string | undefined,
): void {
  if (request.tool_choice !== 'required' || !isNeuraldeepBaseUrl(baseUrl))
    return;
  const functions = (request.tools ?? []).filter(
    (tool) => tool.type === 'function',
  );
  request.tool_choice =
    functions.length === 1
      ? { type: 'function', function: { name: functions[0].function.name } }
      : 'auto';
}
