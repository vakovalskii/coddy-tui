/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeI18n, resolveLanguageSetting, t } from '../i18n/index.js';

const shouldUseColor = () =>
  Boolean(process.stdout.isTTY && !process.env['NO_COLOR']);

const color = (value: string, code: string) =>
  shouldUseColor() ? `\x1b[${code}m${value}\x1b[0m` : value;

const cyan = (value: string) => color(value, '36');
const yellow = (value: string) => color(value, '33');

/**
 * coddy: подсказка вместо удалённой команды `auth`. У апстрима в ней облачные способы входа
 * (Coding Plan, Token Plan, Qwen OAuth) — у нас в меню входа только NeuralDeep и свой адрес.
 */
export const buildCoddyAuthNotice = (): string =>
  [
    '',
    yellow(t('⚠  qwen auth has been removed.')),
    '',
    `  ${cyan(t('NeuralDeep'))}    →  ${t('set NEURALDEEP_API_KEY and choose NeuralDeep in /auth')}`,
    `  ${cyan(t('Interactive'))}   →  ${t('run qwen and use /auth to configure providers')}`,
    `  ${cyan(t('CI / Headless'))} →  ${t('set provider environment variables, for example OPENAI_API_KEY + OPENAI_BASE_URL + OPENAI_MODEL')}`,
    `                     ${t('or pass --openai-api-key, --openai-base-url, --model')}`,
    `  ${cyan(t('Scripted'))}      →  ${t('edit ~/.qwen/settings.json, or run qwen interactively once')}`,
    '',
    `  ${t('Check auth status')} → ${cyan('/doctor')}`,
    '',
  ].join('\n');

/**
 * Команда `auth` срабатывает до инициализации перевода, поэтому без неё подсказка выходила
 * английскими ключами апстрима. Язык берём из настроек, как `update`.
 */
export const printCoddyAuthNotice = async (): Promise<void> => {
  try {
    const { loadSettings } = await import('../config/settings.js');
    const settings = loadSettings(process.cwd(), false);
    await initializeI18n(
      resolveLanguageSetting(settings.merged.general?.language as string),
    );
  } catch {
    // без перевода подсказка всё равно полезна
  }
  process.stdout.write(buildCoddyAuthNotice(), () => process.exit(0));
};
