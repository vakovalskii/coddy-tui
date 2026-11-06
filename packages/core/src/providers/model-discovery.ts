/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchWithPolicy } from '../utils/fetch.js';
import type { ModelSpec } from './types.js';

const DISCOVERY_TIMEOUT_MS = 5000;
const DISCOVERY_MAX_BYTES = 1024 * 1024;
const MAX_MODEL_ID_LENGTH = 256;
// The wizard joins ids with commas and renders them raw, so a served id with
// a comma or a code point in the Unicode C (other) category would split into
// bogus models or poison the TUI.
const UNSAFE_MODEL_ID_CHARS = /[,\p{C}\p{Zl}\p{Zp}]/u;

interface DiscoverProviderModelsOptions {
  baseUrl: string;
  apiKey: string;
  staticModels: readonly ModelSpec[];
  signal?: AbortSignal;
}

interface DiscoveredModel {
  id: string;
  created?: number;
  // coddy: метаданные каталога (name, окно контекста, картинки)
  meta?: Omit<ModelSpec, 'id'>;
}

// coddy: каталог последнего обнаружения по адресу. Мастер дальше передаёт только id, а название и окно
// контекста нужны при записи моделей (provider-config.ts); без них модель получала окно по умолчанию.
const coddyDiscoveredSpecs = new Map<string, Map<string, ModelSpec>>();

function coddyBaseKey(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, '');
}

export function coddyDiscoveredSpec(
  baseUrl: string,
  id: string,
): ModelSpec | undefined {
  return coddyDiscoveredSpecs.get(coddyBaseKey(baseUrl))?.get(id);
}

function coddyTokenCount(value: unknown): number | undefined {
  const n = typeof value === 'string' ? Number(value.trim()) : value;
  return typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : undefined;
}

// Хаб NeuralDeep отдаёт форму models.dev (limit.context, modalities.input), другие серверы —
// context_length (OpenRouter), max_model_len (vLLM), context_window; берём первое положительное,
// как Coddy (internal/llm/model_list.go)
function coddyReadMeta(item: object): Omit<ModelSpec, 'id'> | undefined {
  const raw = item as {
    name?: unknown;
    display_name?: unknown;
    limit?: { context?: unknown };
    context_length?: unknown;
    max_model_len?: unknown;
    context_window?: unknown;
    capabilities?: { vision?: unknown };
    modalities?: { input?: unknown };
  };
  const meta: Omit<ModelSpec, 'id'> = {};
  const name = [raw.name, raw.display_name].find(
    (v): v is string =>
      typeof v === 'string' && !!v.trim() && !UNSAFE_MODEL_ID_CHARS.test(v),
  );
  if (name) meta.displayName = name.trim();
  const context = [
    raw.limit?.context,
    raw.context_length,
    raw.max_model_len,
    raw.context_window,
  ]
    .map(coddyTokenCount)
    .find((n) => n !== undefined);
  if (context) meta.contextWindowSize = context;
  const input = raw.modalities?.input;
  if (
    raw.capabilities?.vision === true ||
    (Array.isArray(input) && input.includes('image'))
  ) {
    meta.modalities = { image: true };
  }
  return Object.keys(meta).length ? meta : undefined;
}

function readModels(value: unknown): DiscoveredModel[] | null {
  if (!value || typeof value !== 'object' || !('data' in value)) {
    return null;
  }
  const data = (value as { data?: unknown }).data;
  if (!Array.isArray(data)) {
    return null;
  }

  const models: DiscoveredModel[] = [];
  const seen = new Set<string>();
  for (const item of data) {
    if (!item || typeof item !== 'object' || !('id' in item)) {
      return null;
    }
    const id = (item as { id?: unknown }).id;
    if (typeof id !== 'string') {
      return null;
    }
    const trimmedId = id.trim();
    if (
      trimmedId &&
      trimmedId.length <= MAX_MODEL_ID_LENGTH &&
      !UNSAFE_MODEL_ID_CHARS.test(trimmedId) &&
      !seen.has(trimmedId)
    ) {
      seen.add(trimmedId);
      const created = (item as { created?: unknown }).created;
      const creationTime =
        typeof created === 'number' && Number.isFinite(created) && created >= 0
          ? created
          : undefined;
      const meta = coddyReadMeta(item); // coddy
      models.push({
        id: trimmedId,
        ...(creationTime === undefined ? {} : { created: creationTime }),
        ...(meta ? { meta } : {}),
      });
    }
  }
  return models.length > 0 ? models : null;
}

function mergeModelSpecs(
  discoveredModels: DiscoveredModel[],
  staticModels: readonly ModelSpec[],
): ModelSpec[] {
  const staticModelsById = new Map(
    staticModels.map((model) => [model.id, model]),
  );
  const orderedModels = [...discoveredModels];
  if (orderedModels.every((model) => model.created !== undefined)) {
    orderedModels.sort(
      (left, right) => (right.created ?? 0) - (left.created ?? 0),
    );
  }
  // coddy: статическая спецификация главнее, каталог дополняет то, чего в ней нет
  return orderedModels.map(({ id, meta }) => ({
    ...meta,
    ...(staticModelsById.get(id) ?? { id }),
  }));
}

export async function discoverProviderModels({
  baseUrl,
  apiKey,
  staticModels,
  signal,
}: DiscoverProviderModelsOptions): Promise<ModelSpec[] | null> {
  const normalizedBaseUrl = baseUrl.trim();
  const normalizedApiKey = apiKey.trim();
  if (!normalizedBaseUrl || !normalizedApiKey) {
    return null;
  }

  try {
    const modelsUrl = `${normalizedBaseUrl.replace(/\/+$/, '')}/models`;
    const result = await fetchWithPolicy(modelsUrl, {
      timeoutMs: DISCOVERY_TIMEOUT_MS,
      maxBytes: DISCOVERY_MAX_BYTES,
      maxRedirects: 2,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${normalizedApiKey}`,
      },
      signal,
    });
    if (
      result.kind !== 'response' ||
      result.status < 200 ||
      result.status >= 300
    ) {
      return null;
    }

    const models = readModels(JSON.parse(result.body.toString('utf8')));
    const merged = models ? mergeModelSpecs(models, staticModels) : null;
    if (merged) {
      coddyDiscoveredSpecs.set(
        coddyBaseKey(normalizedBaseUrl),
        new Map(merged.map((spec) => [spec.id, spec])),
      ); // coddy
    }
    return merged;
  } catch {
    return null;
  }
}
