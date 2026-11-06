---
node_type: reference
title: Редактор картинок (из paste-preview)
description: 'Нативная панель macOS для разметки вставленной картинки: перо, овал, рамка, стрелка, текст, обрезка, поворот; взята из плагина paste-preview (MIT) и встроена в Ctrl+V.'
service: cli
status: active
updated: 2026-10-31
generated: { by: claude-code/claude-opus-5-5, at: 2026-10-30T17:00:00Z }
links:
  implemented_by: [/packages/cli/src/ui/utils/coddy-image-editor.ts]
  relates_to: [../reference/patches.md]
---

# Редактор картинок

`panel.swift` и `editor.html` — из [paste-preview](https://github.com/alan890104/claude-code-paste-preview) 0.2.0
(MIT, © 2026 alan890104, лицензия — [LICENSE.paste-preview](LICENSE.paste-preview)). Наши правки: русский язык
в `editor.html` (`WORDS.ru`, `langOf`).

Панель компилируется в фоне при первом старте сессии (`swiftc`, нужны Xcode Command Line Tools) в
`~/.coddy/tui/bin/coddy-image-panel` и сразу запускается прогретой: `panel serve <editor.html> <папка заказов> ru`.
Вставка кладёт в папку заказов `<id>.json` (`picture`, `out`, `label`), панель показывает уже загруженную страницу и
отвечает строкой `SAVED <id>` или `CANCELLED <id>`. Без дела 20 минут панель выходит, следующее нажатие клавиши в
поле ввода запускает её снова; выходит и вместе с CLI. Если прогретая не поднялась — запасной путь, своя панель на
картинку: `panel <editor.html> <картинка> <выход.png> <подпись> ru`. Время от вставки до окна (tmux, путь картинки
по Cmd+V): холодный запуск 0,45–0,9 с, прогретая панель 0,17–0,38 с; Ctrl+V ещё экономит 0,4–0,5 с на чтении буфера.
Только macOS; на других системах вставка работает как в апстриме, без редактора.

Клавиши в редакторе: `P` `O` `B` `A` `T` — перо, овал, рамка, стрелка, текст; `C` обрезка; `R` поворот;
`1`–`7` цвет; `⌘Z` отмена шага; Enter — готово; Esc — оставить как было.
