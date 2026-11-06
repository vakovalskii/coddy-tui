/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { coddyDiffDefaults } from './coddy-diff-fallback.js';

const light = { DiffAdded: '#C6EAD8', DiffRemoved: '#FFCCCC' };
const dark = { DiffAdded: '#2B3A10', DiffRemoved: '#4A1C1F' };

describe('coddyDiffDefaults', () => {
  it('тёмный текст — светлые подложки (hex, короткий hex, имя цвета)', () => {
    expect(coddyDiffDefaults('#000000')).toEqual(light);
    expect(coddyDiffDefaults('#000')).toEqual(light);
    expect(coddyDiffDefaults('black')).toEqual(light);
  });

  it('светлый текст — тёмные подложки', () => {
    expect(coddyDiffDefaults('#d6d9f0')).toEqual(dark);
    expect(coddyDiffDefaults('white')).toEqual(dark);
  });

  it('мусор в теме не роняет загрузку', () => {
    expect(coddyDiffDefaults(123)).toEqual(dark);
    expect(coddyDiffDefaults(undefined)).toEqual(dark);
    expect(coddyDiffDefaults('не цвет')).toEqual(dark);
    expect(coddyDiffDefaults('constructor')).toEqual(dark);
    expect(coddyDiffDefaults('__proto__')).toEqual(dark);
  });
});
