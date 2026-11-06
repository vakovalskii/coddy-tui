/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: когда история прокручена вверх, как в Claude Code — сверху бледной строкой висит сообщение пользователя,
// к которому относится видимый ответ, а внизу линия «── N новых сообщений (нажмите) ↓ ──» (или «к последнему»),
// клик по ней возвращает вниз. Список не сообщает о прокрутке, поэтому положение опрашивается раз в 120 мс;
// перерисовка — только когда что-то поменялось. Рисуется сразу после списка: координаты отрицательные, поверх него.

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../semantic-colors.js';
import { t } from '../../i18n/index.js';
import { useMouseEvents } from '../hooks/useMouseEvents.js';
import type { MouseEvent } from '../utils/mouse.js';
import { coddyMonitorHistory } from '../utils/coddy-tui-monitor.js';

interface ListSource {
  getScrollIndex: () => number;
  getScrollState: () => {
    scrollTop: number;
    scrollHeight: number;
    innerHeight: number;
  };
  scrollToEnd: () => void;
  getViewportRect: () => { x: number; y: number; height: number } | null;
}

interface Props {
  items: ReadonlyArray<{ type: string; text?: string }>;
  listRef: React.RefObject<ListSource | null>;
  width: number;
  height: number;
}

const POLL_MS = 120;
// что считаем «новым сообщением»: начало ответа модели, вызовы инструментов, ошибки
const MESSAGE_TYPES = new Set(['gemini', 'tool_group', 'error']);

function oneLine(text: string, width: number): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > width
    ? flat.slice(0, Math.max(0, width - 1)) + '…'
    : flat;
}

function centered(label: string, width: number): string {
  const side = Math.max(0, width - label.length - 2);
  const left = Math.floor(side / 2);
  return `${'─'.repeat(left)} ${label} ${'─'.repeat(side - left)}`;
}

// клик по нижней линии — вниз; мышь слушаем, только пока линия на экране
const ClickToBottom: React.FC<{
  listRef: React.RefObject<ListSource | null>;
}> = ({ listRef }) => {
  const onMouse = useCallback(
    (event: MouseEvent) => {
      if (event.name !== 'left-press') return;
      const list = listRef.current;
      const rect = list?.getViewportRect();
      if (!list || !rect) return;
      if (event.row - 1 === rect.y + rect.height - 1) list.scrollToEnd();
    },
    [listRef],
  );
  useMouseEvents(onMouse, { isActive: true, bypassVpGate: true });
  return null;
};

export const CoddyStickyPrompt: React.FC<Props> = ({
  items,
  listRef,
  width,
  height,
}) => {
  const [state, setState] = useState({ prompt: '', away: false, fresh: 0 });
  // сколько элементов было, когда пользователь последний раз стоял внизу
  const seenCount = useRef(items.length);

  // размер истории — в монитор интерфейса (CODDY_TUI_MONITOR=1), без него вызов ничего не делает
  useEffect(() => coddyMonitorHistory(items.length), [items.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      const list = listRef.current;
      if (!list) return;
      const s = list.getScrollState();
      const away =
        s.innerHeight > 0 && s.scrollTop < s.scrollHeight - s.innerHeight - 1;
      let prompt = '';
      let fresh = 0;
      if (!away) {
        seenCount.current = items.length;
      } else {
        const top = list.getScrollIndex();
        // сообщение пользователя выше первой видимой строки; если оно само наверху — оно и так видно
        for (let i = Math.min(top, items.length - 1); i >= 0; i--) {
          if (items[i]?.type === 'user') {
            if (i !== top) prompt = items[i].text ?? '';
            break;
          }
        }
        for (let i = seenCount.current; i < items.length; i++) {
          if (MESSAGE_TYPES.has(items[i]?.type)) fresh++;
        }
      }
      setState((prev) =>
        prev.prompt === prompt && prev.away === away && prev.fresh === fresh
          ? prev
          : { prompt, away, fresh },
      );
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [items, listRef]);

  const label =
    state.fresh > 0
      ? t('{{n}} new messages (click) ↓', { n: String(state.fresh) })
      : t('to the latest (click or Ctrl+End) ↓');

  return (
    <>
      {state.prompt && (
        <Box position="absolute" top={-height} left={0} width={width}>
          <Text selectable={false} color={theme.text.secondary} dimColor>
            {`❯ ${oneLine(state.prompt, width - 3)}`.padEnd(width)}
          </Text>
        </Box>
      )}
      {state.away && height > 2 && (
        <Box position="absolute" top={-1} left={0} width={width}>
          <ClickToBottom listRef={listRef} />
          <Text
            selectable={false}
            color={state.fresh > 0 ? theme.text.accent : theme.text.secondary}
          >
            {centered(label, width)}
          </Text>
        </Box>
      )}
    </>
  );
};
