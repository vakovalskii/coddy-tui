/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: фон полосы под сообщением пользователя — чуть светлее (тёмные темы) или темнее (светлые) фона терминала.
// ANSI- и свои темы: фон терминала неизвестен, полосу не рисуем.

import { themeManager } from './theme-manager.js';

export function coddyUserMessageBackground(): string | undefined {
  const active = themeManager.getActiveTheme();
  // ANSI и ANSI Light помечены как dark/light, но рисуются палитрой терминала
  if (active.name.startsWith('ANSI')) return undefined;
  if (active.type === 'light') return '#E8E9EF';
  return active.type === 'dark' ? '#2E3040' : undefined;
}
