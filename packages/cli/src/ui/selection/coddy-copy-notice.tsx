/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: короткая подсказка после копирования выделения мышью. Выделение
// копируется в буфер на отпускание кнопки (TextSelectionController), а
// пользователь об этом не узнавал. Состояние — маленький общий стор вне React:
// контроллеров выделения несколько (история, вкладки агентов), а показывает
// подсказку один Footer. Подсказка занимает уже существующую строку
// (подсказок или статус-лайна), высоту кадра не меняет.

import type React from 'react';
import { useSyncExternalStore } from 'react';
import { Text } from 'ink';
import { theme } from '../semantic-colors.js';
import { t } from '../../i18n/index.js';

export const CODDY_TUI_COPY_NOTICE_MS = 2000;

export type CoddyCopyNotice =
  | { kind: 'copied'; chars: number }
  | { kind: 'failed' };

let current: CoddyCopyNotice | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

const show = (notice: CoddyCopyNotice) => {
  current = notice;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = undefined;
    current = null;
    emit();
  }, CODDY_TUI_COPY_NOTICE_MS);
  timer.unref?.();
  emit();
};

/** Выделение скопировано: показать «Скопировано: N симв.» на ~2 с. */
export function notifyCoddySelectionCopied(text: string): void {
  show({ kind: 'copied', chars: [...text].length });
}

/** Копирование не удалось: не врём «скопировано», говорим как есть. */
export function notifyCoddySelectionCopyFailed(): void {
  show({ kind: 'failed' });
}

export function getCoddyCopyNotice(): CoddyCopyNotice | null {
  return current;
}

/** Для тестов: сбросить подсказку и таймер. */
export function resetCoddyCopyNotice(): void {
  if (timer) clearTimeout(timer);
  timer = undefined;
  current = null;
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function useCoddyCopyNotice(): CoddyCopyNotice | null {
  return useSyncExternalStore(
    subscribe,
    getCoddyCopyNotice,
    getCoddyCopyNotice,
  );
}

export function CoddyCopyNoticeText({
  notice,
}: {
  notice: CoddyCopyNotice;
}): React.JSX.Element {
  return notice.kind === 'copied' ? (
    <Text color={theme.status.success} wrap="truncate">
      {t('Copied {{count}} chars to clipboard', {
        count: String(notice.chars),
      })}
    </Text>
  ) : (
    <Text color={theme.status.warning} wrap="truncate">
      {t('Could not copy selection to clipboard')}
    </Text>
  );
}
