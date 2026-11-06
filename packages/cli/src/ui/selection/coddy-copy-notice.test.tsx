/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: выделение мышью → копирование → подсказка «Скопировано: N симв.»,
// через ~2 с исчезает; при ошибке копирования — честное «не удалось».

import { render } from 'ink-testing-library';
import type React from 'react';
import { act } from 'react';
import type { ReadonlyFrame } from 'ink';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMouseEvents } from '../hooks/useMouseEvents.js';
import type { MouseEvent } from '../utils/mouse.js';
import { copyToClipboard } from '../utils/commandUtils.js';
import { getScreenBuffer, type ScreenBuffer } from './screen-buffer.js';
import { TextSelectionController } from './use-text-selection.js';
import {
  CODDY_TUI_COPY_NOTICE_MS,
  CoddyCopyNoticeText,
  resetCoddyCopyNotice,
  useCoddyCopyNotice,
} from './coddy-copy-notice.js';

vi.mock('../hooks/useMouseEvents.js', () => ({ useMouseEvents: vi.fn() }));
vi.mock('../utils/commandUtils.js', () => ({ copyToClipboard: vi.fn() }));
vi.mock('./screen-buffer.js', () => ({ getScreenBuffer: vi.fn() }));

const makeFrame = (text: string): ReadonlyFrame => ({
  width: text.length,
  height: 1,
  cells: [
    [...text].map((value) => ({
      type: 'char' as const,
      value,
      fullWidth: false,
      styles: [],
      selectable: true,
      flowId: 1,
    })),
  ],
  boundaries: [Array.from({ length: text.length }, () => null)],
});

const makeEvent = (name: MouseEvent['name'], col: number): MouseEvent => ({
  name,
  col,
  row: 1,
  shift: false,
  meta: false,
  ctrl: false,
  button: 'left',
});

function NoticeProbe(): React.JSX.Element | null {
  const notice = useCoddyCopyNotice();
  return notice ? <CoddyCopyNoticeText notice={notice} /> : null;
}

describe('coddy copy notice after mouse selection', () => {
  const frame = makeFrame('hello world');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.mocked(getScreenBuffer).mockReturnValue({
      frame,
      dimensions: { width: frame.width, height: frame.height },
      setSelection: vi.fn(),
      subscribe: () => () => {},
    } as unknown as ScreenBuffer);
  });

  afterEach(() => {
    resetCoddyCopyNotice();
    vi.useRealTimers();
  });

  const mount = () => {
    const result = render(
      <>
        <TextSelectionController
          isActive
          getViewportRect={() => ({
            x: 0,
            y: 0,
            width: frame.width,
            height: 1,
          })}
          getScrollState={() => ({
            scrollTop: 0,
            scrollHeight: 1,
            innerHeight: 1,
          })}
          hitTestScrollbar={() => false}
        />
        <NoticeProbe />
      </>,
    );
    const handler = vi.mocked(useMouseEvents).mock.calls.at(-1)![0];
    return { ...result, handler };
  };

  const dragHello = async (handler: (event: MouseEvent) => void) => {
    await act(async () => {
      handler(makeEvent('left-press', 1));
      handler(makeEvent('move', 5));
      handler(makeEvent('left-release', 5));
      await Promise.resolve();
    });
  };

  it('shows the copied char count after release and hides it later', async () => {
    vi.mocked(copyToClipboard).mockResolvedValue(undefined);
    const { lastFrame, handler } = mount();
    expect(lastFrame()).toBe('');

    await dragHello(handler);
    expect(copyToClipboard).toHaveBeenCalledWith('hello');
    expect(lastFrame()).toContain('Copied 5 chars to clipboard');

    act(() => vi.advanceTimersByTime(CODDY_TUI_COPY_NOTICE_MS - 1));
    expect(lastFrame()).toContain('Copied 5 chars');
    act(() => vi.advanceTimersByTime(1));
    expect(lastFrame()).toBe('');
  });

  it('reports a failed copy instead of claiming success', async () => {
    vi.mocked(copyToClipboard).mockRejectedValue(new Error('no pbcopy'));
    const { lastFrame, handler } = mount();

    await dragHello(handler);
    expect(lastFrame()).toContain('Could not copy selection to clipboard');
    expect(lastFrame()).not.toContain('Copied');
  });

  it('shows nothing for a bare click', async () => {
    vi.mocked(copyToClipboard).mockResolvedValue(undefined);
    const { lastFrame, handler } = mount();
    await act(async () => {
      handler(makeEvent('left-press', 3));
      handler(makeEvent('left-release', 3));
      await Promise.resolve();
    });
    expect(copyToClipboard).not.toHaveBeenCalled();
    expect(lastFrame()).toBe('');
  });
});
