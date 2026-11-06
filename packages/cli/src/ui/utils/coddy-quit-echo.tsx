/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: рамка «Agent powering down» со статистикой рисуется на альтернативном экране (ui.useTerminalBuffer)
// и при выходе из него пропадает вместе с ним. Запоминаем, с чем она была нарисована, и после выхода
// повторяем её обычным текстом в основном буфере — так она остаётся в истории терминала.

import { renderToString } from 'ink';
import { StatsDisplay } from '../components/StatsDisplay.js';
import {
  SessionStatsContext,
  type useSessionStats,
} from '../contexts/SessionContext.js';
import { t } from '../../i18n/index.js';

interface QuitSnapshot {
  stats: ReturnType<typeof useSessionStats>;
  duration: string;
  width: number;
}

let snapshot: QuitSnapshot | undefined;

/** Вызывается из SessionSummaryDisplay при отрисовке итога: данные ещё живые. */
export function coddyRememberQuitSummary(s: QuitSnapshot): void {
  snapshot = s;
}

/** Рамка итога для печати после выхода из альтернативного экрана; пусто, если итог не рисовался. */
export function coddyQuitSummaryText(columns?: number): string {
  if (!snapshot) return '';
  const { stats, duration } = snapshot;
  // терминал могли сузить после отрисовки: рамка не шире текущего окна, иначе строки переносятся
  const width = columns ? Math.min(snapshot.width, columns) : snapshot.width;
  return renderToString(
    <SessionStatsContext.Provider value={stats}>
      <StatsDisplay
        title={t('Agent powering down. Goodbye!')}
        duration={duration}
        width={width}
      />
    </SessionStatsContext.Provider>,
    { columns: columns ?? width },
  );
}

/** Только для тестов. */
export function _resetCoddyQuitSummaryForTest(): void {
  snapshot = undefined;
}
