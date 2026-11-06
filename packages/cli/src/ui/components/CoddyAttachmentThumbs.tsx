/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: миниатюры вложенных картинок над вводом, как в Claude Code; выбранная подписана цветом. Где терминал
// понимает kitty graphics — настоящая картинка (плейсхолдеры), иначе полублоки.

import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../semantic-colors.js';
import {
  imageThumbnail,
  imageThumbnailKitty,
  thumbMode,
} from '../utils/coddy-image-thumb.js';
import { onImageEdited } from '../utils/coddy-image-editor.js';
import { useTerminalOutput } from '../contexts/TerminalOutputContext.js';
import { t } from '../../i18n/index.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';

const IMAGE_RE = /\.(png|jpe?g|gif|webp|bmp|tiff?|heic)$/i;
// coddy: до 40×10 клеток (40×20 точек полублоками): меньше — превью превращается в пару цветных пятен. Несколько
// картинок делят ширину терминала, чтобы ряд не переносился и не ломал пиксели
const MAX_COLS = 40;
const MIN_COLS = 12;
const MAX_SHOWN = 4;
const GAP = 2;
const MARGIN = 2;

interface Props {
  attachments: ReadonlyArray<{ id: string; path: string }>;
  selectedIndex: number;
  isAttachmentMode: boolean;
}

export const CoddyAttachmentThumbs: React.FC<Props> = ({
  attachments,
  selectedIndex,
  isAttachmentMode,
}) => {
  const [thumbs, setThumbs] = useState<Record<string, string[] | null>>({});
  // правка в редакторе перезаписывает файл — миниатюру строим заново
  const [edits, setEdits] = useState<Record<string, number>>({});
  const mode = useMemo(() => thumbMode(), []);
  const writeRaw = useTerminalOutput();
  const images = attachments
    .map((att, idx) => ({ att, idx }))
    .filter(({ att }) => IMAGE_RE.test(att.path))
    .slice(-MAX_SHOWN);
  const { columns } = useTerminalSize();
  const n = Math.max(1, images.length);
  const cols = Math.max(
    MIN_COLS,
    Math.min(MAX_COLS, Math.floor((columns - MARGIN - GAP * (n - 1)) / n)),
  );
  const rows = Math.max(4, Math.round(cols / 4));
  const key = (att: { id: string; path: string }) =>
    `${att.id}:${cols}:${edits[att.path] ?? 0}`;
  const ids = images.map(({ att }) => key(att)).join(',');

  useEffect(
    () =>
      onImageEdited((file) =>
        setEdits((prev) => ({ ...prev, [file]: (prev[file] ?? 0) + 1 })),
      ),
    [],
  );

  useEffect(() => {
    let alive = true;
    for (const { att } of images) {
      const k = key(att);
      if (k in thumbs) continue;
      // генерация асинхронная (sips в отдельном процессе), ввод не ждёт
      const ready =
        mode === 'kitty'
          ? imageThumbnailKitty(att.path, cols, rows).then((thumb) => {
              if (thumb && alive) writeRaw(thumb.sequence);
              return thumb?.lines ?? null;
            })
          : imageThumbnail(att.path, cols, rows);
      void ready.then((lines) => {
        if (alive) setThumbs((prev) => ({ ...prev, [k]: lines }));
      });
    }
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const shown = images.filter(({ att }) => thumbs[key(att)]);
  if (shown.length === 0) return null;
  return (
    <Box marginLeft={MARGIN} flexDirection="row" gap={GAP}>
      {shown.map(({ att, idx }) => (
        <Box key={att.id} flexDirection="column">
          {thumbs[key(att)]!.map((line, i) => (
            <Text key={i} wrap="truncate-end">
              {line}
            </Text>
          ))}
          <Text
            color={
              isAttachmentMode && idx === selectedIndex
                ? theme.status.success
                : theme.text.secondary
            }
          >
            {t('Image #{{n}}', { n: String(idx + 1) })}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
