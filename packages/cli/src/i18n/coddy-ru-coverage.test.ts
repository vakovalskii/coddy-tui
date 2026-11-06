/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
// локали — JS без типов
const en: Record<string, unknown> = (await import('./locales/en.js' as string))
  .default;
const ru: Record<string, unknown> = (await import('./locales/ru.js' as string))
  .default;

// coddy: интерфейс по умолчанию русский — каждая английская строка должна иметь перевод, а в значениях не
// должно быть имени апстрима (кроме имён способов входа и путей).
describe('coddy: русская локаль', () => {
  it('в ru есть все ключи en', () => {
    const missing = Object.keys(en).filter((k) => !(k in ru));
    expect(missing).toEqual([]);
  });

  it('значения не называют продукт «Qwen Code»', () => {
    const bad = Object.entries(ru).filter(
      ([, v]) => typeof v === 'string' && /\bQwen Code\b/.test(v),
    );
    expect(bad).toEqual([]);
  });

  // Разрешены только настоящие технические имена, которые пользователь вводит или видит в сырых данных:
  // переменные окружения QWEN_* (QWEN_HOME, QWEN_CODE_*, QWEN_DEBUG_LOG_FILE…) и плейсхолдер
  // {{QWEN_CODE_COMPANION_EXTENSION_NAME}}, HTTP-заголовок X-Qwen-Client-Id, скрытые метки ревью
  // qwen-review / qwen-review-ledger и имя режима qwen-autofix.
  const allowedQwen = [
    /\bQWEN_[A-Z_]+\b/g,
    /X-Qwen-Client-Id/g,
    /qwen-review(-ledger)?/g,
    /qwen-autofix/g,
  ];
  const withQwen = (dict: Record<string, unknown>) =>
    Object.entries(dict)
      .filter(
        ([, v]) =>
          typeof v === 'string' &&
          /qwen|千问/i.test(
            allowedQwen.reduce((s, re) => s.replace(re, ''), v),
          ),
      )
      .map(([k]) => k);

  it('значения ru не упоминают Qwen (кроме технических имён)', () => {
    expect(withQwen(ru)).toEqual([]);
  });

  it('значения en не упоминают Qwen (кроме технических имён)', () => {
    expect(withQwen(en)).toEqual([]);
  });

  // ключ без значения в en показывается как есть: такие ключи с Qwen должны получить значение в en.js
  it('ключи с Qwen, которые есть в ru, имеют значение в en', () => {
    const shownRaw = Object.keys(ru).filter(
      (k) => !(k in en) && withQwen({ [k]: k }).length > 0,
    );
    expect(shownRaw).toEqual([]);
  });

  // перевод может опустить подстановку (окончание множественного числа {{value}}), но не выдумать новую
  it('в переводе нет плейсхолдеров {{…}}, которых нет в ключе', () => {
    const ph = (s: string) =>
      [...s.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
    const bad = Object.entries(ru).filter(
      ([k, v]) =>
        typeof v === 'string' && ph(v).some((p) => !ph(k).includes(p)),
    );
    expect(bad.map(([k]) => k)).toEqual([]);
  });
});
