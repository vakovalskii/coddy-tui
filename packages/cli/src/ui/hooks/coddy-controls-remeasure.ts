/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// coddy: перемерять высоту нижней панели (ввод, спиннер, статус) после каждого commit, а не только по списку
// зависимостей. Апстрим не перемеряет её на смену фразы спиннера и счётчика токенов («они не меняют строк»),
// но по-русски и в узком окне строка спиннера переносится на вторую строку. Тогда список истории остаётся
// на строку выше, кадр не влезает в экран, и Ink в полноэкранном режиме очищает терминал (ESC[2J) на каждом
// тике спиннера — экран трясётся. measureElement только читает готовую раскладку yoga, setState — лишь при
// изменении высоты.

import { useLayoutEffect } from 'react';
import { measureElement, type DOMElement } from 'ink';

export function useCoddyControlsRemeasure(
  controlsRef: React.RefObject<DOMElement | null>,
  setControlsHeight: (update: (previous: number) => number) => void,
): void {
  useLayoutEffect(() => {
    if (!controlsRef.current) return;
    const height = measureElement(controlsRef.current).height;
    setControlsHeight((previous) => (previous === height ? previous : height));
  });
}
