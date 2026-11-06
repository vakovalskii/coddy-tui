/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Config } from '../config/config.js';
import { isNeuraldeepBaseUrl } from '../core/openaiContentGenerator/coddy-neuraldeep-request.js';

// coddy: классификатор авторежима на NeuralDeep. Без fast model апстрим гоняет его на модели
// сессии, а рассуждающая модель может потратить весь лимит stage 1 (256 токенов) на reasoning —
// ответ обрывается без вызова respond_in_schema, и действие уходит на ручное подтверждение.
// Поэтому на NeuralDeep берём быструю MoE-модель; другую можно задать CODDY_TUI_CLASSIFIER_MODEL.
export const CODDY_NEURALDEEP_CLASSIFIER_MODEL = 'qwen3.6-35b-a3b';

function classifierModelId(): string {
  return (
    process.env['CODDY_TUI_CLASSIFIER_MODEL']?.trim() ||
    CODDY_NEURALDEEP_CLASSIFIER_MODEL
  );
}

/**
 * Модель для классификатора: быстрая модель NeuralDeep, если сессия на NeuralDeep, fast model
 * не задана (явный выбор пользователя важнее) и модель есть среди настроенных — иначе side query
 * молча ушёл бы в модель сессии. undefined — оставить выбор апстрима.
 */
export function coddyClassifierModel(config: Config): string | undefined {
  if (config.getFastModel?.()) return undefined;
  if (!isNeuraldeepBaseUrl(config.getContentGeneratorConfig?.()?.baseUrl)) {
    return undefined;
  }
  const id = classifierModelId();
  const same = (config.getAllConfiguredModels?.() ?? []).filter(
    (m) => m.id === id,
  );
  // side query берёт первую запись с этим id: если она есть и у другого провайдера, команды
  // и контекст ушли бы туда — тогда оставляем выбор апстрима
  return same.length > 0 && same.every((m) => isNeuraldeepBaseUrl(m.baseUrl))
    ? id
    : undefined;
}
