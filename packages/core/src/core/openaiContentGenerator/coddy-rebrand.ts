/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import type OpenAI from 'openai';

// coddy: апстрим называет агента «Qwen Code» в системном промпте и описаниях инструментов (~100 мест в core).
// Чтобы не править их по одному и не ломать перенос апстрима, имя меняется в готовом запросе — только в
// system-сообщениях, служебных вставках харнеса (<system-reminder> в сообщениях пользователя) и описаниях
// инструментов; текст пользователя и код не трогаются. Заодно «developed by Alibaba Group» → NeuralDeep.

const NAME = /\bQwen Code\b/g;
const PRODUCT = 'Coddy';
const VENDOR = /\bdeveloped by Alibaba Group\b/g;

const rebrand = (s: string) =>
  s.replace(VENDOR, 'developed by NeuralDeep').replace(NAME, PRODUCT);
const isHarnessText = (s: string) =>
  s.trimStart().startsWith('<system-reminder>');
// во вставках харнеса меняем только его собственные фразы и только в начале строки:
// дальше в той же вставке пути и данные пользователя (папка может называться как угодно)
const HARNESS_PHRASES: Array<[RegExp, string]> = [
  [/^This is the Qwen Code\./gm, `This is the ${PRODUCT}.`],
];
const rebrandHarness = (s: string) =>
  HARNESS_PHRASES.reduce((acc, [re, to]) => acc.replace(re, to), s);

export function coddyRebrandRequest(
  request: OpenAI.Chat.ChatCompletionCreateParams,
): void {
  for (const message of request.messages ?? []) {
    // system — целиком; у пользователя — только фразы харнеса во вставках <system-reminder>
    const fix =
      message.role === 'system'
        ? rebrand
        : message.role === 'user'
          ? (t: string) => (isHarnessText(t) ? rebrandHarness(t) : t)
          : null;
    if (!fix) continue;
    if (typeof message.content === 'string') {
      message.content = fix(message.content);
    } else if (Array.isArray(message.content)) {
      for (const part of message.content) {
        if (part.type === 'text') part.text = fix(part.text);
      }
    }
  }
  for (const tool of request.tools ?? []) {
    if (tool.type === 'function' && tool.function.description) {
      tool.function.description = rebrand(tool.function.description);
    }
  }
}
