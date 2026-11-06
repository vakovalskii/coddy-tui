/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '../../core/contentGenerator.js';
import type { ProviderConfig } from '../types.js';

// Модели NeuralDeep: OpenAI-совместимый /v1, ключ в Bearer. Тот же адрес, что у провайдера
// neuraldeep в Coddy (internal/llm/provider.go), чтобы оба движка ходили в одно место.
export const NEURALDEEP_BASE_URL = 'https://api.neuraldeep.ru/v1';
export const NEURALDEEP_ENV_KEY = 'NEURALDEEP_API_KEY';

export const neuraldeepProvider: ProviderConfig = {
  id: 'neuraldeep',
  label: 'NeuralDeep',
  description: 'Модели NeuralDeep по ключу API (NEURALDEEP_API_KEY)',
  protocol: AuthType.USE_OPENAI,
  baseUrl: NEURALDEEP_BASE_URL,
  envKey: NEURALDEEP_ENV_KEY,
  models: [
    { id: 'qwen3.8-27b', contextWindowSize: 262144 },
    { id: 'qwen3.6-35b-a3b', contextWindowSize: 262144 },
  ],
  modelsEditable: true,
  supportsModelDiscovery: true,
  modelNamePrefix: 'NeuralDeep',
  // Свои — все модели с ключом NeuralDeep, не только с префиксом в названии: иначе повторная настройка
  // добавляла бы «[NeuralDeep] …» рядом со старыми записями, и первой оказывалась запись без окна.
  // Сервисные модели (речь, картинки, realtime) на том же ключе не трогаем: их настраивают отдельно
  ownsModel: (model) =>
    model.envKey === NEURALDEEP_ENV_KEY &&
    !model.voiceOnly &&
    !model.imageOnly &&
    !model.realtimeOnly,
  documentationUrl: 'https://hub.neuraldeep.ru',
  uiGroup: 'neuraldeep',
};
