# Coddy TUI

Терминальный интерфейс для агента [Coddy](https://github.com/coddy-project/coddy-agent). Это форк
[Qwen Code](https://github.com/QwenLM/qwen-code) 0.26.7 (Apache-2.0, исходная лицензия в `LICENSE`):
интерфейс от Qwen Code, а ход по умолчанию ведёт Coddy по протоколу ACP (`coddy acp`, ndjson JSON-RPC
через stdio). Встроенный движок Qwen Code тоже остался, он ходит в модели NeuralDeep.

## Сборка

Нужны Node.js 22 или новее и pnpm 11 (версия закреплена в `package.json`, ставится через corepack).

```sh
pnpm install
npm run build    # пакеты workspace (tsc)
npm run bundle   # esbuild → dist/cli.js и ресурсы в dist/
npm run pack:coddy   # пакет npm coddy-tui-<версия>.tgz из dist/ (~42 МБ)
npm i -g coddy-tui-*.tgz
```

Команда — `coddy/bin/coddy-tui.js` (в `package.json` это `bin.coddy-tui`). Запуск из клона:
`node coddy/bin/coddy-tui.js`, установка в систему: `npm link` или `npm pack` и `npm i -g` архива.

Coddy собирается отдельно, из своего репозитория: `make build` (или `go build -tags cli,http ./cmd/coddy`).

## Запуск с Coddy

```sh
export CODDY_BIN=/path/to/coddy                                # иначе ищется coddy в PATH
export CODDY_ACP_ARGS="--config /etc/agent/coddy-config.yaml"  # необязательно
cd ~/project && coddy-tui
```

TUI поднимает `coddy acp` в рабочей папке сразу при старте: в шапке появляется «Coddy · <модель>», а
команды агента (`/model`, `/plan`, `/compact`, скиллы) становятся доступны. Ключи провайдеров Coddy берёт
из своего конфига и окружения (например, `NEURALDEEP_API_KEY` для провайдера `neuraldeep`), TUI их не
трогает и не спрашивает вход.

Что работает с движком Coddy:

- текст ответа, вызовы инструментов (виды `write` и `run_command` приводятся к `edit` и `execute`), план;
- запрос разрешения — обычным диалогом подтверждения, только «разрешить один раз» или отказ
  (постоянные разрешения — средствами Coddy, `/permissions`);
- вопросы агента (`session/request_question`) — диалогом вопросов, с несколькими вариантами и своим ответом;
- Shift+Tab меняет `mode` и `permission_mode` живой сессии: обычный режим → `ask`, авто-правки и авторежим →
  `accept_edits`, YOLO → `bypass`, план → режим `plan`;
- команды `!` выполняются локально, их вывод уходит Coddy вместе со следующим запросом;
- Esc отменяет ход (`session/cancel`), `/clear` начинает новую сессию Coddy.

Слэш-команды: `clear`, `help`, `quit`, `exit`, `theme`, `about`, `copy`, `docs`, `language`, `vim` выполняет
TUI; команды из `available_commands_update` уходят агенту текстом запроса; остальные команды встроенного
движка с Coddy недоступны (подсказка предлагает `--engine qwen`).

## Встроенный движок и NeuralDeep

```sh
export NEURALDEEP_API_KEY=…
coddy-tui --engine qwen       # на один запуск
coddy-tui engine qwen         # движок по умолчанию (coddy-tui engine coddy — вернуть)
```

Провайдер NeuralDeep — OpenAI-совместимый `https://api.neuraldeep.ru/v1`, модели из `/models` (название и
окно контекста из каталога хаба в форме models.dev). Если ключ задан, а моделей в настройках ещё нет,
точка входа запишет их при первом запуске; иначе — `/auth` → NeuralDeep. Без экрана (`-p`, pipe, `--acp`)
всегда работает встроенный движок.

## Переменные окружения

| переменная                         | что задаёт                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `CODDY_BIN`                        | путь к бинарю Coddy; по умолчанию `coddy` из PATH                               |
| `CODDY_ACP_ARGS`                   | аргументы после `coddy acp`, по правилам оболочки (`--config …`, `--home …`)    |
| `CODDY_TUI_ENGINE`                 | `coddy` или `qwen` на один запуск; флаг `--engine` важнее                       |
| `NEURALDEEP_API_KEY`               | ключ NeuralDeep для встроенного движка                                          |
| `NEURALDEEP_BASE_URL`              | другой адрес NeuralDeep для загрузки моделей при первом запуске                 |
| `CODDY_TUI_CLASSIFIER_MODEL`       | модель классификатора авторежима на NeuralDeep (по умолчанию `qwen3.6-35b-a3b`) |
| `CODDY_TUI_AUTOCOMPACT_MAX_TOKENS` | потолок автосжатия контекста, по умолчанию 450000                               |
| `CODDY_TUI_PROJECT_DIR`            | каталог проекта, по умолчанию `.coddy`                                          |
| `CODDY_TUI_IMAGE_THUMBS`           | миниатюры картинок: `kitty` или `blocks` (по умолчанию — по терминалу)          |
| `CODDY_TUI_MONITOR`                | `1` — метрики кадров и прокрутки (`coddy/bin/tui-monitor.js`)                   |
| `QWEN_HOME`                        | каталог программы, по умолчанию `~/.coddy/tui`                                  |

`.env` проекта не может задать `CODDY_*`, `NEURALDEEP_*`, телеметрию и OTel: бинарь агента и ключ задаёт
только пользователь.

## Каталоги

- `~/.coddy/tui` — настройки, сессии и память встроенного движка, `engine.json`, `AGENTS.md` с базовыми
  правилами (блок обновляется при запуске из `coddy/context/AGENTS.md`).
- `.coddy/` в проекте — общий с Coddy: скиллы `.coddy/skills/<name>/SKILL.md`, команды, агенты, правила.
  Старый `.qwen/` читается, навыки и команды Claude Code (`.claude/`) и Codex (`~/.codex/`) тоже.
- `.coddyignore` — игнор-файл (`.qwenignore` тоже читается).

## Отличия от Qwen Code 0.26.7

Правки в коде апстрима точечные и помечены комментарием `coddy:` — найти все: `git grep -n "coddy:" -- packages`.
Новое лежит новыми файлами `coddy-*` / `Coddy*`.

| что                                 | файлы                                                                                                                                                                                                                                                                                                  | зачем                                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| движок Coddy по ACP                 | новые `cli/.../daemon/coddy-acp-session.ts` (свой клиент JSON-RPC поверх апстримного `DaemonTuiAdapter`), `cli/.../hooks/coddy-use-engine.ts`; `AppContainer.tsx` (подмена `useLlmStream`, подпись модели); `core/initializer.ts`, `auth/useAuth.ts`, `Header.tsx` (без входа во встроенный провайдер) | ход ведёт Coddy, интерфейс тот же. SDK ACP не годится: его zod-схема отбрасывает виды инструментов и обновления Coddy, а ответ без `result` он не дожидается |
| точка входа и выбор движка          | новые `coddy/bin/coddy-tui.js`, `coddy/bin/coddy-engine.js`; `bin` и `files` в `package.json`                                                                                                                                                                                                          | `~/.coddy/tui`, движок `coddy`/`qwen`, модели NeuralDeep при первом запуске                                                                                  |
| провайдер NeuralDeep                | новый `core/.../presets/neuraldeep.ts`; `all-providers.ts`, `providers/index.ts`; `auth/AuthDialog.tsx` (в меню NeuralDeep и свой адрес)                                                                                                                                                               | облака Alibaba и сторонние пресеты убраны из выбора                                                                                                          |
| модели из каталога `/models`        | `core/.../model-discovery.ts` (название, `limit.context`/`context_length`/`max_model_len`, картинки), `provider-config.ts`, `types.ts` (`ModelSpec.displayName`)                                                                                                                                       | модель получает своё окно контекста и название, а не 200k по умолчанию                                                                                       |
| классификатор авторежима            | новые `core/.../permissions/coddy-classifier-model.ts`, `core/.../openaiContentGenerator/coddy-neuraldeep-request.ts`; `classifier.ts`, `pipeline.ts`                                                                                                                                                  | на NeuralDeep — быстрая модель вместо рассуждающей; `tool_choice: "required"` → именованная функция                                                          |
| имя для модели                      | новый `core/.../openaiContentGenerator/coddy-rebrand.ts`, вызов в `pipeline.ts`                                                                                                                                                                                                                        | «Qwen Code» → «Coddy» в system, вставках харнеса и описаниях инструментов                                                                                    |
| телеметрия и обновления выключены   | `qwen-logger.ts` (`CODDY_TUI_USAGE_STATS_DISABLED`), `settingsSchema.ts`, `updateCheck.ts`, `model-catalog-refresh.ts` (models.dev не качаем), `settingsUtils.ts`, `shared-env-keys.ts`                                                                                                                | статистика не уходит в облако Alibaba, npm и models.dev не опрашиваются, `.env` проекта не включает телеметрию                                               |
| название и логотип                  | `AsciiArt.ts`, `Header.tsx`, `windowTitle.ts`, `useAttentionNotifications.ts`, `notificationService.ts`, `AppContainer.tsx`, тема `themes/coddy-dark.ts`                                                                                                                                               | Coddy вместо Qwen Code                                                                                                                                       |
| перевод интерфейса                  | блок в конце `i18n/locales/ru.js`, обёртки `t()` в ~80 файлах `cli/src/ui`, `en.js`, тест `i18n/coddy-ru-coverage.test.ts`                                                                                                                                                                             | по умолчанию русский, `/language ui en` — английский                                                                                                         |
| очередь на Ctrl+Enter               | `cli/src/config/keyBindings.ts`                                                                                                                                                                                                                                                                        | Ctrl+Q перехватывают терминалы и IDE                                                                                                                         |
| автосжатие на 450k                  | `core/src/services/chatCompressionService.ts`                                                                                                                                                                                                                                                          | длинный контекст дорог и хуже по качеству                                                                                                                    |
| миниатюры и редактор картинок       | новые `CoddyAttachmentThumbs.tsx`, `utils/coddy-image-thumb.ts`, `utils/coddy-image-editor.ts`, `coddy/image-editor/`; `InputPrompt.tsx`, `clipboardUtils.ts`                                                                                                                                          | превью вставленной картинки над вводом и правка разметки, быстрая вставка на macOS                                                                           |
| несколько команд одной строкой      | `utils/tool-group-summary.ts`, `CompactToolGroupDisplay.tsx`, `ToolGroupMessage.tsx`, `HistoryItemDisplay.tsx`                                                                                                                                                                                         | «Запуск команд (N)», Ctrl+O или клик раскрывает, клик в вывод сворачивает                                                                                    |
| сообщение на серой полосе           | новый `themes/coddy-user-message.ts`, `ConversationMessages.tsx`                                                                                                                                                                                                                                       | ввод обычным цветом на полосе                                                                                                                                |
| плавный скролл                      | `components/shared/ScrollableList.tsx`                                                                                                                                                                                                                                                                 | без рывков на 10–20 строк от трекпада                                                                                                                        |
| итог сессии после выхода            | новые `utils/coddy-exit-summary.ts`, `utils/coddy-quit-echo.tsx`; `startInteractiveUI.tsx`, `SessionSummaryDisplay.tsx`, `SessionContext.tsx`                                                                                                                                                          | рамка итога не стирается вместе с альтернативным экраном                                                                                                     |
| патчи Ink                           | `patches/ink+7.0.3+001+coddy-width-cache.patch`, `…002+coddy-altscreen-trim.patch`, `hooks/coddy-controls-remeasure.ts`                                                                                                                                                                                | кеш ширин строк (кадр 45–67 → 11–15 мс), без тряски на альтернативном экране                                                                                 |
| подсказка о копировании             | новый `selection/coddy-copy-notice.tsx`; `use-text-selection.tsx`, `Footer.tsx`                                                                                                                                                                                                                        | «Скопировано в буфер: N симв.» после выделения мышью                                                                                                         |
| меню «/» над вводом                 | `InputPrompt.tsx`, `Composer.tsx`                                                                                                                                                                                                                                                                      | высота нижнего блока не меняется, история не прыгает                                                                                                         |
| монитор интерфейса                  | новые `utils/coddy-tui-monitor.ts`, `coddy/bin/tui-monitor.js`; `startInteractiveUI.tsx`                                                                                                                                                                                                               | метрики кадров при `CODDY_TUI_MONITOR=1`                                                                                                                     |
| документация программы              | новый `utils/coddy-docs.ts`; `AuthDialog.tsx`, `Help.tsx`, `docsCommand.ts`                                                                                                                                                                                                                            | `/docs` открывает этот файл, а не сайт апстрима                                                                                                              |
| каталог проекта `.coddy`            | новый `core/src/utils/coddy-project-dirs.ts`; `paths.ts`, `storage-paths-lite.ts`, `skill-paths.ts`, `projectSummary.ts`, `summaryCommand.ts`, `useWelcomeBack.ts`                                                                                                                                     | общий с Coddy каталог проекта; без переменной всё как в апстриме                                                                                             |
| чтение старого `.qwen`              | `storage.ts`, `subagent-manager.ts`, `rulesDiscovery.ts`, `memory/paths.ts`, `memory/indexer.ts`, `team-memory-secret-guard.ts`                                                                                                                                                                        | проекты из Qwen Code не теряют настройки, агентов и правила                                                                                                  |
| навыки и команды Claude Code, Codex | `storage.ts`, `skill-manager.ts`, `skill-load.ts`, новый `services/coddy-command-dirs.ts`, `FileCommandLoader.ts`                                                                                                                                                                                      | `.claude/skills`, `.agents/skills`, `~/.codex/skills`, `.claude/commands`, `~/.codex/prompts`                                                                |
| AGENTS.md и CLAUDE.md               | `memory-constants.ts`, `memoryDiscovery.ts`, новый `commands/coddy-init-claude.ts`, `initCommand.ts`                                                                                                                                                                                                   | `/init` пишет AGENTS.md, CLAUDE.md тоже в контексте                                                                                                          |
| `.coddyignore`, защита авторежима   | `qwenIgnoreParser.ts`, `permissions/autoMode.ts`                                                                                                                                                                                                                                                       | правки `.coddy/`, `.claude/`, `~/.codex` не проходят молча в авторежиме                                                                                      |
| подсказки следующего хода выключены | `settingsSchema.ts`, `coddy/bin/system-defaults.json`                                                                                                                                                                                                                                                  | отдельный запрос со всей историей на каждый ход                                                                                                              |
| ввод не удваивается                 | `contexts/KeypressContext.tsx`                                                                                                                                                                                                                                                                         | readline до TUI включал события keypress навсегда                                                                                                            |
| `qwen auth`                         | новый `commands/coddy-auth-notice.ts`, `commands/auth.ts`                                                                                                                                                                                                                                              | подсказка про NeuralDeep вместо облачных способов входа апстрима                                                                                             |
| тесты                               | `coddy/bin/test.sh`, `coddy/test-known-failures.txt`, ожидания брендинга в тестах апстрима                                                                                                                                                                                                             | красный только на новых падениях; известные — тесты на то, что убрано нарочно                                                                                |

Тесты форка: `coddy/bin/test.sh` (core и cli, сверка с `coddy/test-known-failures.txt`) и
`npx vitest run --config ./scripts/tests/vitest.config.ts scripts/tests/coddy-engine.test.js`.

## Что не поддержано с движком Coddy

- `session/load` и `session/list`: `/resume` и `--continue` относятся к встроенному движку, история
  Coddy в TUI не подгружается (сессии Coddy хранит сам, `coddy sessions list`).
- Рассуждения модели (`agent_thought_chunk`), расход токенов и квоты провайдера (`token_usage`,
  `usage_update`, `provider_usage`) не показываются; индикатор контекста в строке статуса — от встроенного движка.
- Команды Coddy не попадают в меню «/» (их видно в `/help` агента), набирать их нужно целиком.
- Картинки и `@файл` уходят Coddy текстом запроса; упоминания `@` Coddy разбирает сам.
- MCP-серверы TUI агенту не передаются: Coddy берёт их из своего конфига.
