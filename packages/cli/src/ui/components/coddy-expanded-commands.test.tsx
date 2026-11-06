/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: раскрытая кликом команда — на сером фоне, клик в любую её строку сворачивает (#30)

import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Box } from 'ink';
import type { Config } from '@qwen-code/qwen-code-core';
import { LoadedSettings } from '../../config/settings.js';
import { renderWithProviders } from '../../test-utils/render.js';
import { VirtualViewportContext } from '../contexts/VirtualViewportContext.js';
import { ToolDetailsExpandedProvider } from '../contexts/ToolDetailsExpandedContext.js';
import { useMouseEvents } from '../hooks/useMouseEvents.js';
import type { MouseEvent } from '../utils/mouse.js';
import {
  layoutRowForEvent,
  measureElementPosition,
} from '../utils/measure-element-position.js';
import { ToolCallStatus, type IndividualToolCallDisplay } from '../types.js';
import { CollapsibleToolGroupMessage } from './HistoryItemDisplay.js';

// цвет в кадре нужен, чтобы увидеть фон: chalk внутри ink читает FORCE_COLOR при загрузке
vi.hoisted(() => {
  process.env['FORCE_COLOR'] = '3';
});

vi.mock('../hooks/useMouseEvents.js', () => ({
  useMouseEvents: vi.fn(),
}));

vi.mock('../utils/measure-element-position.js', () => ({
  layoutRowForEvent: vi.fn(),
  measureElementPosition: vi.fn(),
}));

vi.mock('../themes/coddy-user-message.js', () => ({
  coddyUserMessageBackground: () => '#2E3040',
}));

const empty = { path: '', settings: {}, originalSettings: {} };

function makeSettings(showToolCallDetails: boolean) {
  return new LoadedSettings(
    empty,
    empty,
    {
      path: '',
      settings: { ui: { showToolCallDetails, useTerminalBuffer: true } },
      originalSettings: {},
    },
    empty,
    true,
    new Set(),
  );
}

const command = (n: number): IndividualToolCallDisplay => ({
  callId: `cmd-${n}`,
  name: 'Shell',
  description: `echo step-${n}`,
  resultDisplay: `output-${n}`,
  status: ToolCallStatus.Success,
  confirmationDetails: undefined,
});

// 24-битный фон #2E3040 → ESC[48;2;46;48;64m
const GRAY_BG = '\u001b[48;2;46;48;64m';

const click = (row: number, col = 5): MouseEvent[] =>
  (['left-press', 'left-release'] as const).map((name) => ({
    name,
    col,
    row,
    shift: false,
    meta: false,
    ctrl: false,
    button: 'left',
  }));

function lastHandler() {
  return vi.mocked(useMouseEvents).mock.calls.at(-1)?.[0];
}
function lastOptions() {
  return vi.mocked(useMouseEvents).mock.calls.at(-1)?.[1];
}

function setup(height: number) {
  vi.mocked(useMouseEvents).mockClear();
  metrics(height);
}

function metrics(height: number) {
  // область клика — весь блок высотой height строк с начала
  vi.mocked(measureElementPosition).mockReturnValue({
    x: 0,
    y: 0,
    width: 80,
    height,
  });
  vi.mocked(layoutRowForEvent).mockImplementation((_node, row) => row - 1);
}

function renderGroup(
  tools: IndividualToolCallDisplay[],
  showToolCallDetails: boolean,
  batch?: {
    expandedBatchIds: Set<string>;
    expandBatch: (id: string) => void;
    collapseBatch: (id: string) => void;
  },
) {
  const group = (
    <VirtualViewportContext.Provider value={true}>
      <Box width={100}>
        <CollapsibleToolGroupMessage
          toolCalls={tools}
          groupId={1}
          contentWidth={96}
          isPending={false}
          expansionKey={batch ? 'batch-1' : undefined}
        />
      </Box>
    </VirtualViewportContext.Provider>
  );
  return renderWithProviders(
    batch ? (
      <ToolDetailsExpandedProvider value={batch}>
        {group}
      </ToolDetailsExpandedProvider>
    ) : (
      group
    ),
    { settings: makeSettings(showToolCallDetails), config: {} as Config },
  );
}

describe('coddy: раскрытая команда (#30)', () => {
  it('свёрнутая команда без серого фона, после клика — на сером фоне', () => {
    setup(1);
    const { lastFrame } = renderGroup([command(1)], false);
    expect(lastFrame()).not.toContain('output-1');
    expect(lastFrame()).not.toContain(GRAY_BG);

    act(() => click(1).forEach((e) => lastHandler()?.(e)));

    expect(lastFrame()).toContain('output-1');
    expect(lastFrame()).toContain(GRAY_BG);
    expect(lastOptions()).toMatchObject({ isActive: true });
  });

  it('клик в строку вывода (не заголовок) сворачивает обратно', () => {
    setup(1);
    const { lastFrame } = renderGroup([command(1)], false);
    act(() => click(1).forEach((e) => lastHandler()?.(e)));
    const expandedFrame = lastFrame() ?? '';
    const lines = expandedFrame.split('\n').length;
    expect(lines).toBeGreaterThan(1);

    metrics(lines);
    act(() => click(lines).forEach((e) => lastHandler()?.(e)));
    const frame = lastFrame() ?? '';
    expect(frame).not.toContain('output-1');
    expect(frame).not.toContain(GRAY_BG);
    expect(frame).toContain('Shell');
  });

  it('выделение мышью внутри раскрытого блока не сворачивает', () => {
    setup(1);
    const { lastFrame } = renderGroup([command(1)], false);
    act(() => click(1).forEach((e) => lastHandler()?.(e)));
    metrics(3);
    const handler = lastHandler();
    act(() => {
      handler?.({ ...click(2)[0] });
      handler?.({ ...click(2, 20)[0], name: 'move' });
      handler?.({ ...click(2, 20)[1] });
    });
    expect(lastFrame()).toContain('output-1');
  });

  it('группа: свернуть кликом через collapseBatch, свёрнутая выглядит как раньше', () => {
    setup(4);
    const expandBatch = vi.fn();
    const collapseBatch = vi.fn();
    const expanded = renderGroup([command(1), command(2)], false, {
      expandedBatchIds: new Set(['batch-1']),
      expandBatch,
      collapseBatch,
    });
    const frame = expanded.lastFrame() ?? '';
    expect(frame).toContain('echo step-1');
    expect(frame).toContain('echo step-2');
    expect(frame).toContain(GRAY_BG);

    act(() => click(3).forEach((e) => lastHandler()?.(e)));
    expect(collapseBatch).toHaveBeenCalledWith('batch-1');
    expanded.unmount();

    setup(1);
    const collapsed = renderGroup([command(1), command(2)], false, {
      expandedBatchIds: new Set(),
      expandBatch,
      collapseBatch,
    });
    const collapsedFrame = collapsed.lastFrame() ?? '';
    expect(collapsedFrame.split('\n')).toHaveLength(1);
    expect(collapsedFrame).not.toContain(GRAY_BG);
    expect(collapsedFrame).not.toContain('echo step-1');
  });

  it('«Запуск команд (N)» при обычном показе: клик раскрывает, ещё клик — сворачивает', () => {
    setup(1);
    const { lastFrame } = renderGroup([command(1), command(2)], true);
    const summary = lastFrame() ?? '';
    expect(summary).not.toContain('echo step-1');
    expect(summary).not.toContain(GRAY_BG);
    expect(lastOptions()).toMatchObject({ isActive: true });

    act(() => click(1).forEach((e) => lastHandler()?.(e)));
    const expandedFrame = lastFrame() ?? '';
    expect(expandedFrame).toContain('echo step-1');
    expect(expandedFrame).toContain('echo step-2');
    expect(expandedFrame).toContain(GRAY_BG);

    const lines = expandedFrame.split('\n').length;
    metrics(lines);
    act(() => click(lines).forEach((e) => lastHandler()?.(e)));
    expect(lastFrame()).toBe(summary);
  });

  it('одна команда при обычном показе — клики не слушаем', () => {
    setup(1);
    const { lastFrame } = renderGroup([command(1)], true);
    expect(lastFrame()).not.toContain(GRAY_BG);
    expect(lastOptions()).toMatchObject({ isActive: false });
  });
});
