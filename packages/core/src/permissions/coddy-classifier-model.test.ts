/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import type { Config } from '../config/config.js';
import {
  CODDY_NEURALDEEP_CLASSIFIER_MODEL,
  coddyClassifierModel,
} from './coddy-classifier-model.js';

const ND = 'https://api.neuraldeep.ru/v1';

function fakeConfig(opts: {
  fastModel?: string;
  baseUrl?: string;
  models?: string[];
  /** Записи моделей других провайдеров: id и адрес */
  foreign?: Array<{ id: string; baseUrl: string }>;
}): Config {
  return {
    getFastModel: () => opts.fastModel,
    getContentGeneratorConfig: () => ({ baseUrl: opts.baseUrl }),
    getAllConfiguredModels: () => [
      ...(opts.foreign ?? []),
      ...(opts.models ?? []).map((id) => ({ id, baseUrl: ND })),
    ],
  } as unknown as Config;
}

describe('coddyClassifierModel', () => {
  const all = ['qwen3.8-27b', CODDY_NEURALDEEP_CLASSIFIER_MODEL, 'glm-5.1'];

  it('на NeuralDeep без fast model берёт быструю модель', () => {
    expect(coddyClassifierModel(fakeConfig({ baseUrl: ND, models: all }))).toBe(
      CODDY_NEURALDEEP_CLASSIFIER_MODEL,
    );
  });

  it('явно заданная fast model важнее', () => {
    expect(
      coddyClassifierModel(
        fakeConfig({ baseUrl: ND, models: all, fastModel: 'x' }),
      ),
    ).toBeUndefined();
  });

  it('не NeuralDeep — выбор апстрима', () => {
    expect(
      coddyClassifierModel(
        fakeConfig({ baseUrl: 'https://api.openai.com/v1', models: all }),
      ),
    ).toBeUndefined();
  });

  it('модели нет среди настроенных — не подставляем (иначе ушло бы в модель сессии)', () => {
    expect(
      coddyClassifierModel(
        fakeConfig({ baseUrl: ND, models: ['qwen3.8-27b'] }),
      ),
    ).toBeUndefined();
  });

  it('та же модель есть у другого провайдера — не подставляем, данные ушли бы туда', () => {
    expect(
      coddyClassifierModel(
        fakeConfig({
          baseUrl: ND,
          models: all,
          foreign: [
            {
              id: CODDY_NEURALDEEP_CLASSIFIER_MODEL,
              baseUrl: 'https://proxy.example.com/v1',
            },
          ],
        }),
      ),
    ).toBeUndefined();
  });
});
