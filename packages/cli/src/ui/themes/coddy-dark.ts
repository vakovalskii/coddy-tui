/**
 * @license
 * Copyright 2025 Google LLC
 * Copyright 2026 NeuralDeep (тема Coddy на основе qwen-dark.ts)
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ColorsTheme, Theme } from './theme.js';

// coddy: палитра Coddy — фиолетовый акцент веб-интерфейса агента (#7C3AED), голубой и зелёный в пару
const coddyDarkColors: ColorsTheme = {
  type: 'dark',
  Background: '#16182f',
  Foreground: '#d6d9f0',
  LightBlue: '#6BD4FF',
  AccentBlue: '#38BDF8',
  AccentPurple: '#8B5CF6',
  AccentCyan: '#55D0E0',
  AccentGreen: '#84CC16',
  AccentYellow: '#FFC34D',
  AccentRed: '#FF5752',
  AccentYellowDim: '#8A6D2B',
  AccentRedDim: '#8B3A3A',
  // coddy: подложки диффа тёмные в тон зелёного и красного — на ярких сливалась подсветка строк
  DiffAdded: '#2B3A10',
  DiffRemoved: '#4A1C1F',
  Comment: '#7A80A8',
  Gray: '#8A90B8',
  GradientColors: ['#38BDF8', '#7C3AED', '#9333EA'],
};

export const CoddyDark: Theme = new Theme(
  'Coddy',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: coddyDarkColors.Background,
      color: coddyDarkColors.Foreground,
    },
    'hljs-keyword': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-literal': {
      color: coddyDarkColors.AccentPurple,
    },
    'hljs-symbol': {
      color: coddyDarkColors.AccentCyan,
    },
    'hljs-name': {
      color: coddyDarkColors.LightBlue,
    },
    'hljs-link': {
      color: coddyDarkColors.AccentBlue,
    },
    'hljs-function .hljs-keyword': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-subst': {
      color: coddyDarkColors.Foreground,
    },
    'hljs-string': {
      color: coddyDarkColors.AccentGreen,
    },
    'hljs-title': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-type': {
      color: coddyDarkColors.AccentBlue,
    },
    'hljs-attribute': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-bullet': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-addition': {
      color: coddyDarkColors.AccentGreen,
    },
    'hljs-variable': {
      color: coddyDarkColors.Foreground,
    },
    'hljs-template-tag': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-template-variable': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-comment': {
      color: coddyDarkColors.Comment,
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: coddyDarkColors.AccentCyan,
      fontStyle: 'italic',
    },
    'hljs-deletion': {
      color: coddyDarkColors.AccentRed,
    },
    'hljs-meta': {
      color: coddyDarkColors.AccentYellow,
    },
    'hljs-doctag': {
      fontWeight: 'bold',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
  },
  coddyDarkColors,
);
