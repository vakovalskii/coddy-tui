/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

// Русский перевод для Qwen Code CLI
// Ключ служит одновременно ключом перевода и текстом по умолчанию

export default {
  'Generated UI': 'Generated UI',
  'Enable bundled Generated UI in supported local sessions. Restart the owning session to apply changes.':
    'Включает встроенный Generated UI в поддерживаемых локальных сеансах. Перезапустите соответствующий сеанс, чтобы применить изменения.',

  // ============================================================================
  // Справка / Компоненты интерфейса
  // ============================================================================
  // Attachment hints
  '↑ to manage attachments': '↑ управление вложениями',
  '← → select, Delete to remove, ↓ to exit':
    '← → выбрать, Delete удалить, ↓ выйти',
  'Attachments: ': 'Вложения: ',
  'Basics:': 'Основы:',
  'Add context': 'Добавить контекст',
  'Use {{symbol}} to specify files for context (e.g., {{example}}) to target specific files or folders.':
    'Используйте {{symbol}} для добавления файлов в контекст (например, {{example}}) для выбора конкретных файлов или папок).',
  '@': '@',
  '@src/myFile.ts': '@src/myFile.ts',
  'Shell mode': 'Режим терминала',
  'YOLO mode': 'Режим YOLO',
  'Auto mode': 'Автоматический режим',
  'auto_mode.entry_notice':
    'Автоматический режим включен.\n   LLM-классификатор оценивает каждый вызов инструмента — безопасные действия утверждаются автоматически,\n   рискованные блокируются. Выход: Shift+Tab или /approval-mode default.',
  'plan mode': 'Режим планирования',
  'auto-accept edits': 'Режим принятия правок',
  'Accepting edits': 'Принятие правок',
  '(shift + tab to cycle)': '(Shift + Tab для переключения)',
  '(tab to cycle)': '(Tab для переключения)',
  'Execute shell commands via {{symbol}} (e.g., {{example1}}) or use natural language (e.g., {{example2}}).':
    'Выполняйте команды терминала через {{symbol}} (например, {{example1}}) или используйте естественный язык (например, {{example2}}).',
  '!': '!',
  '!npm run start': '!npm run start',
  'Commands:': 'Команды:',
  'shell command': 'команда терминала',
  'Model Context Protocol command (from external servers)':
    'Команда Model Context Protocol (из внешних серверов)',
  'Keyboard Shortcuts:': 'Горячие клавиши:',
  'Toggle this help display': 'Показать/скрыть эту справку',
  'Toggle shell mode': 'Переключить режим оболочки',
  'Open command menu': 'Открыть меню команд',
  'Add file context': 'Добавить файл в контекст',
  'Accept suggestion / Autocomplete': 'Принять подсказку / Автодополнение',
  'Reverse search history': 'Обратный поиск по истории',
  'Press ? again to close': 'Нажмите ? ещё раз, чтобы закрыть',
  'Jump through words in the input': 'Переход по словам во вводе',
  'Close dialogs, cancel requests, or quit application':
    'Закрыть диалоги, отменить запросы или выйти из приложения',
  'New line': 'Новая строка',
  'New line (Alt+Enter works for certain linux distros)':
    'Новая строка (Alt+Enter работает только в некоторых дистрибутивах Linux)',
  'Clear the screen': 'Очистить экран',
  'Open input in external editor': 'Открыть ввод во внешнем редакторе',
  'Send message': 'Отправить сообщение',
  'Initializing...': 'Инициализация...',
  'Connecting to MCP servers... ({{connected}}/{{total}})':
    'Подключение к MCP servers... ({{connected}}/{{total}})',
  'Type your message or @path/to/file': 'Введите сообщение или @путь/к/файлу',
  '? for shortcuts': '? — горячие клавиши',
  'Pasting…': 'Вставка…',
  "Press 'i' for INSERT mode and 'Esc' for NORMAL mode.":
    "Нажмите 'i' для режима ВСТАВКА и 'Esc' для ОБЫЧНОГО режима.",
  'Cancel operation / Clear input (double press)':
    'Отменить операцию / Очистить ввод (двойное нажатие)',
  'Cycle approval modes': 'Переключение режимов подтверждения',
  'Cycle through your prompt history': 'Пролистать историю запросов',
  'For a full list of shortcuts, see {{docPath}}':
    'Полный список горячих клавиш см. в {{docPath}}',
  'docs/keyboard-shortcuts.md': 'docs/keyboard-shortcuts.md',
  'for help on Qwen Code': 'Справка по Coddy',
  'show version info': 'Просмотр информации о версии',
  'submit a bug report': 'Отправка отчёта об ошибке',
  Status: 'Статус',

  // Keyboard shortcuts panel descriptions
  'for shell mode': 'режим оболочки',
  'for commands': 'меню команд',
  'for file paths': 'пути к файлам',
  'to clear input': 'очистить ввод',
  'to cycle approvals': 'переключить режим',
  'to quit': 'выход',
  'for newline': 'новая строка',
  'to clear screen': 'очистить экран',
  'to search history': 'поиск в истории',
  'to paste images': 'вставить изображения',
  'for external editor': 'внешний редактор',
  'to expand details': 'развернуть детали',

  // ============================================================================
  // Поля системной информации
  // ============================================================================
  'Qwen Code': 'Coddy',
  Runtime: 'Среда выполнения',
  OS: 'ОС',
  Auth: 'Аутентификация',
  Model: 'Модель',
  'Fast Model': 'Быстрая модель',
  Sandbox: 'Песочница',
  'Session ID': 'ID сессии',
  'Base URL': 'Адрес API',
  Proxy: 'Прокси',
  'Memory Usage': 'Использование памяти',
  'IDE Client': 'Клиент IDE',

  // ============================================================================
  // Команды - Общие
  // ============================================================================
  'Analyzes the project and creates a tailored QWEN.md file.':
    'Анализ проекта и создание адаптированного файла AGENTS.md',
  'List available Qwen Code tools. Usage: /tools [desc]':
    'Просмотр доступных инструментов Coddy. Использование: /tools [desc]',
  'Open the skills panel (browse, search, toggle, pick).':
    'Открыть панель навыков (обзор, поиск, вкл/выкл, выбор).',
  'Manage Skills': 'Управление навыками',
  'Skills configuration saved.': 'Конфигурация навыков сохранена.',
  'Skills configuration saved, but refresh failed: {{error}}. Restart to ensure the new state is applied.':
    'Конфигурация навыков сохранена, но обновление не удалось: {{error}}. Перезапустите, чтобы применить новое состояние.',
  'Workspace is untrusted; workspace settings are ignored by the merged config. Run /trust first to persist skills changes here, or edit ~/.qwen/settings.json directly to manage skills at user scope.':
    'Рабочая область не является доверенной; настройки рабочей области игнорируются объединённой конфигурацией. Сначала выполните /trust или отредактируйте ~/.coddy/tui/settings.json напрямую, чтобы управлять навыками на уровне пользователя.',
  'SkillManager not available.': 'SkillManager недоступен.',
  'Loading skills…': 'Загрузка навыков…',
  'Failed to load skills: {{error}}': 'Не удалось загрузить навыки: {{error}}',
  'Failed to save skills configuration: {{error}}':
    'Не удалось сохранить конфигурацию навыков: {{error}}',
  'All available skills are disabled. Edit ~/.qwen/settings.json or .qwen/settings.json (skills.disabled) to re-enable.':
    'Все доступные навыки отключены. Отредактируйте ~/.coddy/tui/settings.json или .coddy/settings.json (skills.disabled), чтобы снова их включить.',
  'Press esc to close.': 'Нажмите Esc, чтобы закрыть.',
  '{{count}} skills · ': '{{count}} навыков · ',
  '{{matched}} / {{total}} skills · ': '{{matched}} / {{total}} навыков · ',
  'Space toggle · Enter pick (fill input) · Esc save & exit · workspace scope':
    'Пробел переключить · Enter выбрать (вставить в ввод) · Esc сохранить и выйти · область рабочей области',
  'Search:': 'Поиск: ',
  'type to filter…': 'введите для фильтрации…',
  'No skills are currently available.': 'Сейчас навыков нет.',
  'No skills match the search.': 'Нет навыков, соответствующих поиску.',
  'Locked by settings entries you cannot toggle here:':
    'Заблокированы записями настроек (здесь переключить нельзя):',
  '{{count}} locked not shown':
    'Не показано заблокированных навыков: {{count}}',
  'higher scope': 'более высокий уровень',
  '  {{name}} {{description}}  [locked: {{scope}}]':
    '  {{name}} {{description}}  [заблокировано: {{scope}}]',
  '↑/↓ navigate · backspace edits search':
    '↑/↓ навигация · Backspace редактирует поиск',
  Bundled: 'Встроенный',
  'Available Qwen Code CLI tools:': 'Доступные инструменты Coddy CLI:',
  'No tools available': 'Нет доступных инструментов',
  'View or change the approval mode for tool usage':
    'Просмотр или изменение режима подтверждения для использования инструментов',
  'Invalid approval mode "{{arg}}". Valid modes: {{modes}}':
    'Недопустимый режим подтверждения "{{arg}}". Допустимые режимы: {{modes}}',
  'Approval mode set to "{{mode}}"':
    'Режим подтверждения установлен на "{{mode}}"',
  'View or change the language setting':
    'Просмотр или изменение настроек языка',
  'List background tasks (text dump — interactive dialog opens via the footer pill)':
    'Показать фоновые задачи (текстовый вывод; интерактивный диалог открывается через плашку внизу экрана)',
  'Delete a previous session': 'Удалить предыдущую сессию',
  'Run installation and environment diagnostics':
    'Запустить диагностику установки и окружения',
  'Browse dynamic model catalogs and choose which models stay enabled locally':
    'Просмотреть динамические каталоги моделей и выбрать, какие модели оставить включёнными локально',
  'Generate a one-line session recap now':
    'Сейчас создать однострочное резюме сессии',
  'Rename the current conversation. --auto lets the fast model pick a title.':
    'Переименовать текущий разговор. --auto позволит быстрой модели выбрать заголовок.',
  'Rewind conversation to a previous turn':
    'Откатить разговор к предыдущему ходу',
  'Rewind Conversation': 'Перемотка разговора',
  'No user turns to rewind to.': 'Нет пользовательских ходов для перемотки.',
  'Rewind to: ': 'Перемотать к: ',
  'Restore code and conversation': 'Восстановить код и беседу',
  'Restore conversation only': 'Восстановить только беседу',
  'Restore code only': 'Восстановить только код',
  'Never mind': 'Неважно',
  'Computing file changes...': 'Вычисление изменений файлов...',
  'Restoring...': 'Восстановление...',
  'Restored {{count}} file(s).': 'Восстановлено файлов: {{count}}.',
  'Failed to restore files: {{error}}':
    'Не удалось восстановить файлы: {{error}}',
  'Rewind failed: {{error}}': 'Сбой отката: {{error}}',
  'Cannot rewind conversation: no active model client.':
    'Невозможно откатить разговор: нет активного клиента модели.',
  'Code restored, but conversation could not be rewound (no active client).':
    'Код восстановлен, но разговор не удалось откатить (нет активного клиента).',
  'Conversation rewound. Edit your prompt and press Enter to continue.':
    'Разговор откатили. Отредактируйте подсказку и нажмите Enter, чтобы продолжить.',
  'Rewinding does not affect files edited manually or via shell commands.':
    'Откат не затрагивает файлы, отредактированные вручную или с помощью shell-команд.',
  'Cannot rewind to a turn that was compressed. Try a more recent turn.':
    'Не удаётся откатиться к сжатому ходу. Попробуйте более недавний ход.',
  'Cannot rewind the conversation to this turn: it no longer matches the model history (for example, after a retry). Try a more recent turn.':
    'Не удаётся откатить диалог к этому ходу: он больше не соответствует истории модели (например, после повторной попытки). Попробуйте более недавний ход.',
  'File restore is unavailable for this turn (no captured file changes, or this turn predates the current session).':
    'Восстановление файлов недоступно для этого хода (нет записанных изменений или ход был до текущей сессии).',
  '(+{{insertions}} -{{deletions}} in {{count}} file)':
    '(+{{insertions}} -{{deletions}} в {{count}} файле)',
  '(+{{insertions}} -{{deletions}} in {{count}} files)':
    '(+{{insertions}} -{{deletions}} в {{count}} файлах)',
  'Failed to restore {{count}} file(s): {{files}}':
    'Не удалось восстановить {{count}} файл(ов): {{files}}',
  'Cannot restore files: this turn was created before file checkpointing was enabled.':
    'Невозможно восстановить файлы: этот ход был создан до включения контрольных точек файлов.',
  'No files needed to be restored.': 'Файлы не нуждались в восстановлении.',
  '↑↓ to navigate · Enter to select · Esc to go back':
    '↑↓ навигация · Enter выбор · Esc назад',
  '↑↓ to navigate · Enter to select · Esc to cancel':
    '↑↓ навигация · Enter выбор · Esc отмена',
  'Enter/Y to confirm · Esc/N to go back': 'Enter/Y подтвердить · Esc/N назад',
  'change the theme': 'Изменение темы',
  'Select Theme': 'Выбор темы',
  Preview: 'Предпросмотр',
  '(Use Enter to select, Tab to configure scope)':
    '(Enter для выбора, Tab для настройки области)',
  '(Use Enter to apply scope, Tab to go back)':
    '(Enter для применения области, Tab для возврата)',
  'Theme configuration unavailable due to NO_COLOR env variable.':
    'Настройка темы недоступна из-за переменной окружения NO_COLOR.',
  'Theme "{{themeName}}" not found.': 'Тема "{{themeName}}" не найдена.',
  'Theme "{{themeName}}" not found in selected scope.':
    'Тема "{{themeName}}" не найдена в выбранной области.',
  'Clear conversation history and free up context':
    'Очистить историю диалога и освободить контекст',
  'Compresses the context by replacing it with a summary.':
    'Сжатие контекста заменой на краткую сводку',
  'open full Qwen Code documentation in your browser':
    'Открытие полной документации Coddy в браузере',
  'Configuration not available.': 'Конфигурация недоступна.',
  'Connect an LLM provider': 'Подключить провайдера LLM',
  'Copy the last AI response to clipboard (/copy N for Nth-latest)':
    'Копировать последний ответ ИИ в буфер обмена (/copy N для N-го с конца)',

  // ============================================================================
  // Команды - Агенты
  // ============================================================================
  'Manage subagents for specialized task delegation.':
    'Управление подагентами для делегирования специализированных задач',
  'Manage existing subagents (view, edit, delete).':
    'Управление существующими подагентами (просмотр, правка, удаление)',
  'Create a new subagent with guided setup.':
    'Создание нового подагента с пошаговой настройкой',

  // ============================================================================
  // Агенты - Диалог управления
  // ============================================================================
  Agents: 'Агенты',
  'Choose Action': 'Выберите действие',
  'Edit {{name}}': 'Редактировать {{name}}',
  'Edit Tools: {{name}}': 'Редактировать инструменты: {{name}}',
  'Edit Color: {{name}}': 'Редактировать цвет: {{name}}',
  'Delete {{name}}': 'Удалить {{name}}',
  'Unknown Step': 'Неизвестный шаг',
  'Esc to close': 'Esc для закрытия',
  Transcript: 'Транскрипт',
  'Read {{count}} file': 'Прочитано файлов: {{count}}',
  'Read {{count}} files': 'Прочитано файлов: {{count}}',
  'Reading {{count}} file': 'Чтение файлов: {{count}}',
  'Reading {{count}} files': 'Чтение файлов: {{count}}',
  'Edited {{count}} file': 'Изменено файлов: {{count}}',
  'Edited {{count}} files': 'Изменено файлов: {{count}}',
  'Editing {{count}} file': 'Изменение файлов: {{count}}',
  'Editing {{count}} files': 'Изменение файлов: {{count}}',
  'Wrote {{count}} file': 'Записано файлов: {{count}}',
  'Wrote {{count}} files': 'Записано файлов: {{count}}',
  'Writing {{count}} file': 'Запись файлов: {{count}}',
  'Writing {{count}} files': 'Запись файлов: {{count}}',
  'Searched {{count}} pattern': 'Найдено шаблонов: {{count}}',
  'Searched {{count}} patterns': 'Найдено шаблонов: {{count}}',
  'Searching {{count}} pattern': 'Поиск шаблонов: {{count}}',
  'Searching {{count}} patterns': 'Поиск шаблонов: {{count}}',
  'Listed {{count}} directory': 'Показано каталогов: {{count}}',
  'Listed {{count}} directories': 'Показано каталогов: {{count}}',
  'Listing {{count}} directory': 'Просмотр каталогов: {{count}}',
  'Listing {{count}} directories': 'Просмотр каталогов: {{count}}',
  'Ran {{count}} command': 'Выполнено команд: {{count}}',
  // coddy: несколько команд за шаг — «Запуск команд (N)» (#18)
  'Ran {{count}} commands': 'Запуск команд ({{count}})',
  'Running {{count}} command': 'Выполнение команд: {{count}}',
  'Running {{count}} commands': 'Запуск команд ({{count}})',
  'Ran {{count}} agent': 'Запущено агентов: {{count}}',
  'Ran {{count}} agents': 'Запущено агентов: {{count}}',
  'Running {{count}} agent': 'Запуск агентов: {{count}}',
  'Running {{count}} agents': 'Запуск агентов: {{count}}',
  'Used {{count}} tool': 'Использовано инструментов: {{count}}',
  'Used {{count}} tools': 'Использовано инструментов: {{count}}',
  'Using {{count}} tool': 'Использование инструментов: {{count}}',
  'Using {{count}} tools': 'Использование инструментов: {{count}}',
  'Enter to select, ↑↓ to navigate, Esc to close':
    'Enter для выбора, ↑↓ для навигации, Esc для закрытия',
  'Esc to go back': 'Esc для возврата',
  'Enter to confirm, Esc to cancel': 'Enter для подтверждения, Esc для отмены',
  'Enter to select, ↑↓ to navigate, Esc to go back':
    'Enter для выбора, ↑↓ для навигации, Esc для возврата',
  'Enter to submit, Esc to go back': 'Enter для отправки, Esc для возврата',
  'Invalid step: {{step}}': 'Неверный шаг: {{step}}',
  'No subagents found.': 'Подагенты не найдены.',
  "Use '/agents create' to create your first subagent.":
    "Используйте '/agents create' для создания первого подагента.",
  '(built-in)': '(встроенный)',
  '(overridden by project level agent)':
    '(переопределен агентом уровня проекта)',
  'Project Level ({{path}})': 'Уровень проекта ({{path}})',
  'User Level ({{path}})': 'Уровень пользователя ({{path}})',
  'Built-in Agents': 'Встроенные агенты',
  'Extension Agents': 'Агенты расширений',
  'Using: {{count}} agents': 'Используется: {{count}} агент(ов)',
  'View Agent': 'Просмотреть агента',
  'Edit Agent': 'Редактировать агента',
  'Delete Agent': 'Удалить агента',
  Back: 'Назад',
  'No agent selected': 'Агент не выбран',
  'File Path: ': 'Путь к файлу: ',
  'Tools: ': 'Инструменты: ',
  'Color: ': 'Цвет: ',
  'Description:': 'Описание:',
  'System Prompt:': 'Системный промпт:',
  'Open in editor': 'Открыть в редакторе',
  'Edit tools': 'Редактировать инструменты',
  'Edit color': 'Редактировать цвет',
  '✗ Error:': '✗ Ошибка:',
  'Are you sure you want to delete agent "{{name}}"?':
    'Вы уверены, что хотите удалить агента "{{name}}"?',
  // ============================================================================
  // Агенты - Мастер создания
  // ============================================================================
  'Project Level (.qwen/agents/)': 'Уровень проекта (.coddy/agents/)',
  'User Level (~/.qwen/agents/)': 'Уровень пользователя (~/.coddy/tui/agents/)',
  '✓ Subagent Created Successfully!': '✓ Подагент успешно создан!',
  'Subagent "{{name}}" has been saved to {{level}} level.':
    'Подагент "{{name}}" сохранен на уровне {{level}}.',
  'Name: ': 'Имя: ',
  'Location: ': 'Расположение: ',
  '✗ Error saving subagent:': '✗ Ошибка сохранения подагента:',
  'Warnings:': 'Предупреждения:',
  'Name "{{name}}" already exists at {{level}} level - will overwrite existing subagent':
    'Имя "{{name}}" уже существует на уровне {{level}} - существующий подагент будет перезаписан',
  'Name "{{name}}" exists at user level - project level will take precedence':
    'Имя "{{name}}" существует на уровне пользователя - уровень проекта будет иметь приоритет',
  'Name "{{name}}" exists at project level - existing subagent will take precedence':
    'Имя "{{name}}" существует на уровне проекта - существующий подагент будет иметь приоритет',
  'Description is over {{length}} characters':
    'Описание превышает {{length}} символов',
  'System prompt is over {{length}} characters':
    'Системный промпт превышает {{length}} символов',
  // Агенты - Шаги мастера создания
  'Step {{n}}: Choose Location': 'Шаг {{n}}: Выберите расположение',
  'Step {{n}}: Choose Generation Method': 'Шаг {{n}}: Выберите метод генерации',
  'Generate with Qwen Code (Recommended)':
    'Сгенерировать с помощью Coddy (Рекомендуется)',
  'Manual Creation': 'Ручное создание',
  'Describe what this subagent should do and when it should be used. (Be comprehensive for best results)':
    'Опишите, что должен делать этот подагент и когда его следует использовать. (Будьте подробны для лучших результатов)',
  'e.g., Expert code reviewer that reviews code based on best practices...':
    'например, Экспертный ревьювер кода, проверяющий код на соответствие лучшим практикам...',
  'Generating subagent configuration...': 'Генерация конфигурации подагента...',
  'Failed to generate subagent: {{error}}':
    'Не удалось сгенерировать подагента: {{error}}',
  'Step {{n}}: Describe Your Subagent': 'Шаг {{n}}: Опишите подагента',
  'Step {{n}}: Enter Subagent Name': 'Шаг {{n}}: Введите имя подагента',
  'Step {{n}}: Enter System Prompt': 'Шаг {{n}}: Введите системный промпт',
  'Step {{n}}: Enter Description': 'Шаг {{n}}: Введите описание',
  // Агенты - Выбор инструментов
  'Step {{n}}: Select Tools': 'Шаг {{n}}: Выберите инструменты',
  'All Tools (Default)': 'Все инструменты (по умолчанию)',
  'All Tools': 'Все инструменты',
  'Read-only Tools': 'Инструменты только для чтения',
  'Read & Edit Tools': 'Инструменты для чтения и редактирования',
  'Read & Edit & Execution Tools':
    'Инструменты для чтения, редактирования и выполнения',
  'All tools selected, including MCP tools':
    'Все инструменты выбраны, включая MCP tools',
  'Selected tools:': 'Выбранные инструменты:',
  'Read-only tools:': 'Инструменты только для чтения:',
  'Edit tools:': 'Инструменты редактирования:',
  'Execution tools:': 'Инструменты выполнения:',
  'Step {{n}}: Choose Background Color': 'Шаг {{n}}: Выберите цвет фона',
  'Step {{n}}: Confirm and Save': 'Шаг {{n}}: Подтвердите и сохраните',
  // Агенты - Навигация и инструкции
  'Esc to cancel': 'Esc для отмены',
  'Press Enter to save, e to save and edit, Esc to go back':
    'Enter для сохранения, e для сохранения и редактирования, Esc для возврата',
  'Press Enter to continue, {{navigation}}Esc to {{action}}':
    'Enter для продолжения, {{navigation}}Esc для {{action}}',
  cancel: 'отмены',
  'go back': 'возврата',
  '↑↓ to navigate, ': '↑↓ для навигации, ',
  'Enter a clear, unique name for this subagent.':
    'Введите четкое, уникальное имя для этого подагента.',
  'e.g., Code Reviewer': 'например, Ревьювер кода',
  'Name cannot be empty.': 'Имя не может быть пустым.',
  "Write the system prompt that defines this subagent's behavior. Be comprehensive for best results.":
    'Напишите системный промпт, определяющий поведение подагента. Будьте подробны для лучших результатов.',
  'e.g., You are an expert code reviewer...':
    'например, Вы экспертный ревьювер кода...',
  'System prompt cannot be empty.': 'Системный промпт не может быть пустым.',
  'Describe when and how this subagent should be used.':
    'Опишите, когда и как следует использовать этого подагента.',
  'e.g., Reviews code for best practices and potential bugs.':
    'например, Проверяет код на соответствие лучшим практикам и потенциальные ошибки.',
  'Description cannot be empty.': 'Описание не может быть пустым.',
  'Failed to launch editor: {{error}}':
    'Не удалось запустить редактор: {{error}}',
  'Failed to save and edit subagent: {{error}}':
    'Не удалось сохранить и отредактировать подагента: {{error}}',

  // ============================================================================
  // Команды - Общие (продолжение)
  // ============================================================================
  'View and edit Qwen Code settings': 'Просмотр и изменение настроек Coddy',
  Settings: 'Настройки',
  'To see changes, Qwen Code must be restarted. Press r to exit and apply changes now.':
    'Для применения изменений необходимо перезапустить Coddy. Нажмите r для выхода и применения изменений.',
  // ============================================================================
  // Метки настроек
  // ============================================================================
  'Vim Mode': 'Режим Vim',
  'Attribution: commit': 'Атрибуция: коммит',
  'Terminal Bell Notification': 'Звуковое уведомление терминала',
  'Enable Usage Statistics': 'Включить сбор статистики использования',
  Theme: 'Тема',
  'Preferred Editor': 'Предпочтительный редактор',
  'Auto-connect to IDE': 'Автоподключение к IDE',
  'Debug Keystroke Logging': 'Логирование нажатий клавиш для отладки',
  'Language: UI': 'Язык: интерфейс',
  'Language: Model': 'Язык: модель',
  'Output Format': 'Формат вывода',
  'Hide Window Title': 'Скрыть заголовок окна',
  'Show Status in Title': 'Показывать статус в заголовке',
  'Hide Tips': 'Скрыть подсказки',
  'Show Tool Call Arguments': 'Показывать аргументы вызовов инструментов',
  'Show Line Numbers in Code': 'Показывать номера строк в коде',
  'Show Citations': 'Показывать цитаты',
  'Custom Witty Phrases': 'Пользовательские остроумные фразы',
  'Show Welcome Back Dialog': 'Показывать диалог приветствия',
  'Enable User Feedback': 'Включить отзывы пользователей',
  'How is Qwen doing this session? (optional)':
    'Как дела у агента в этой сессии? (необязательно)',
  Bad: 'Плохо',
  Fine: 'Нормально',
  Good: 'Хорошо',
  Dismiss: 'Отклонить',
  'Screen Reader Mode': 'Режим программы чтения с экрана',
  'Max Session Turns': 'Макс. количество ходов сессии',
  'Skip Next Speaker Check': 'Пропустить проверку следующего говорящего',
  'Skip Loop Detection': 'Пропустить обнаружение циклов',
  'Skip Startup Context': 'Пропустить начальный контекст',
  'Enable OpenAI Logging': 'Включить логирование OpenAI',
  'OpenAI Logging Directory': 'Директория логов OpenAI',
  Timeout: 'Таймаут',
  'Max Retries': 'Макс. количество попыток',
  'Load Memory From Include Directories':
    'Загружать память из включенных директорий',
  'Respect .gitignore': 'Учитывать .gitignore',
  'Respect .qwenignore': 'Учитывать .coddyignore',
  'Enable Recursive File Search': 'Включить рекурсивный поиск файлов',
  'Interactive Shell (PTY)': 'Интерактивный терминал (PTY)',
  'Show Color': 'Показывать цвета',
  'Auto Accept': 'Автоподтверждение',
  'Use Ripgrep': 'Использовать Ripgrep',
  'Use Builtin Ripgrep': 'Использовать встроенный Ripgrep',
  'Tool Output Truncation Threshold': 'Порог обрезки вывода инструментов',
  'Tool Output Truncation Lines': 'Лимит строк вывода инструментов',
  'Folder Trust': 'Доверие к папке',
  'Tool Schema Compliance': 'Соответствие Tool Schema',
  Unset: 'Не задано',
  // Варианты перечислений настроек
  'Auto (detect from system)': 'Авто (определить из системы)',
  'Auto (follow user input)': 'Авто (следовать вводу пользователя)',
  'Auto (detect terminal theme)': 'Авто (определить тему терминала)',
  Auto: 'Авто',
  Text: 'Текст',
  JSON: 'JSON',
  Plan: 'План',
  'Ask permissions': 'Запрашивать разрешения',
  'Auto Edit': 'Авторедактирование',
  YOLO: 'YOLO',
  'toggle vim mode on/off': 'Включение/выключение режима vim',
  'Show model-specific usage statistics.':
    'Показать статистику использования модели.',
  'Show tool-specific usage statistics.':
    'Показать статистику использования инструментов.',
  'Show daily token usage statistics.':
    'Показать дневную статистику использования токенов.',
  'Show monthly token usage statistics.':
    'Показать месячную статистику использования токенов.',
  'Export token usage statistics to CSV or JSON.':
    'Экспортировать статистику использования токенов в CSV или JSON.',
  'No usage data.': 'Нет данных об использовании.',
  '{{label}}: {{tokens}} tokens ({{requests}} requests)':
    '{{label}}: {{tokens}} токенов ({{requests}} запросов)',
  'Daily token usage for {{value}}':
    'Дневное использование токенов за {{value}}',
  'Monthly token usage for {{value}}':
    'Месячное использование токенов за {{value}}',
  'Total: {{tokens}} tokens': 'Всего: {{tokens}} токенов',
  'Requests: {{requests}}': 'Запросы: {{requests}}',
  'Breakdown:': 'Разбивка:',
  'Input: {{tokens}}': 'Ввод: {{tokens}}',
  'Output: {{tokens}}': 'Вывод: {{tokens}}',
  'Cached (included in Input): {{tokens}}': 'Кэш (включён во ввод): {{tokens}}',
  'Thoughts: {{tokens}}': 'Рассуждения: {{tokens}}',
  'By model:': 'По модели:',
  'By auth type:': 'По типу аутентификации:',
  'By model/auth type:': 'По модели/типу аутентификации:',
  'By source:': 'По источнику:',
  'Failed to load token usage stats: {{error}}':
    'Не удалось загрузить статистику использования токенов: {{error}}',
  'Expected --format csv or --format json.':
    'Ожидается --format csv или --format json.',
  'Expected a file path after --output.':
    'После --output ожидается путь к файлу.',
  'Unexpected argument: {{argument}}': 'Неожиданный аргумент: {{argument}}',
  'Usage: /stats export <daily|monthly> [YYYY-MM-DD|YYYY-MM] [--format csv|json] [--output path]':
    'Использование: /stats export <daily|monthly> [YYYY-MM-DD|YYYY-MM] [--format csv|json] [--output path]',
  'Token usage export path must be within the project working directory.':
    'Путь экспорта использования токенов должен находиться внутри рабочего каталога проекта.',
  'Export target does not exist: {{path}}':
    'Цель экспорта не существует: {{path}}',
  'Cannot resolve export path within the working directory.':
    'Не удалось определить путь экспорта внутри рабочего каталога.',
  'Could not create a temporary export file.':
    'Не удалось создать временный файл экспорта.',
  'Token usage exported to {{format}}: {{path}}':
    'Использование токенов экспортировано в {{format}}: {{path}}',
  'Failed to export token usage stats: {{error}}':
    'Не удалось экспортировать статистику использования токенов: {{error}}',
  'Unclosed quote in arguments.': 'Незакрытая кавычка в аргументах.',
  'Note: generation timing (TTFT/TPS) belongs to generation metrics.':
    'Примечание: время генерации (TTFT/TPS) относится к метрикам генерации.',
  'exit the cli': 'Выход из CLI',
  'Manage workspace directories':
    'Управление директориями рабочего пространства',
  'Add directories to the workspace. Use comma to separate multiple paths':
    'Добавить директории в рабочее пространство. Используйте запятую для разделения путей',
  'Show all directories in the workspace':
    'Показать все директории в рабочем пространстве',
  'set external editor preference':
    'Установка предпочитаемого внешнего редактора',
  'Select Editor': 'Выбрать редактор',
  'Editor Preference': 'Настройка редактора',
  'These editors are currently supported. Please note that some editors cannot be used in sandbox mode.':
    'В настоящее время поддерживаются следующие редакторы. Обратите внимание, что некоторые редакторы нельзя использовать в режиме песочницы.',
  'Your preferred editor is:': 'Ваш предпочитаемый редактор:',
  'Manage extensions': 'Управление расширениями',
  'Manage installed extensions': 'Управлять установленными расширениями',
  'Disable an extension': 'Отключить расширение',
  'Enable an extension': 'Включить расширение',
  'Install an extension from a git repo or local path':
    'Установить расширение из Git-репозитория или локального пути',
  'Uninstall an extension': 'Удалить расширение',
  'No extensions installed.': 'Расширения не установлены.',
  'Extension "{{name}}" not found.': 'Расширение "{{name}}" не найдено.',
  'No extensions to update.': 'Нет расширений для обновления.',
  'Usage: /extensions install <source>':
    'Использование: /extensions install <источник>',
  'Installing extension from "{{source}}"...':
    'Установка расширения из "{{source}}"...',
  'Extension "{{name}}" installed successfully.':
    'Расширение "{{name}}" успешно установлено.',
  'Failed to install extension from "{{source}}": {{error}}':
    'Не удалось установить расширение из "{{source}}": {{error}}',
  'Do you want to continue? [Y/n]: ': 'Хотите продолжить? [Y/n]: ',
  'Do you want to continue?': 'Хотите продолжить?',
  'Installing extension "{{name}}".': 'Установка расширения "{{name}}".',
  '**Extensions may introduce unexpected behavior. Ensure you have investigated the extension source and trust the author.**':
    '**Расширения могут вызывать неожиданное поведение. Убедитесь, что вы изучили источник расширения и доверяете автору.**',
  'This extension will run the following MCP servers:':
    'Это расширение запустит следующие MCP servers:',
  local: 'локальный',
  remote: 'удалённый',
  'This extension will add the following commands: {{commands}}.':
    'Это расширение добавит следующие команды: {{commands}}.',
  'This extension will append info to your QWEN.md context using {{fileName}}':
    'Это расширение добавит информацию в контекст проекта с помощью {{fileName}}',
  'This extension will install the following skills:':
    'Это расширение установит следующие навыки:',
  'This extension will install the following subagents:':
    'Это расширение установит следующие подагенты:',
  'This extension will install the following workflows (JavaScript scripts that can start subagents):':
    'Это расширение установит следующие рабочие процессы (скрипты JavaScript, которые могут запускать подагентов):',
  'These workflow scripts changed since the installed version: {{names}}.':
    'Эти скрипты рабочих процессов изменились по сравнению с установленной версией: {{names}}.',
  'Installation cancelled for "{{name}}".': 'Установка "{{name}}" отменена.',
  'You are installing an extension from {{originSource}}. Some features may not work perfectly with Qwen Code.':
    'Вы устанавливаете расширение от {{originSource}}. Некоторые функции могут работать не идеально с Coddy.',
  '--ref and --auto-update are not applicable for marketplace extensions.':
    '--ref и --auto-update неприменимы для расширений из маркетплейса.',
  'Extension "{{name}}" installed successfully and enabled.':
    'Расширение "{{name}}" успешно установлено и включено.',
  'The github URL, local path, or marketplace source (marketplace-url:plugin-name) of the extension to install.':
    'URL GitHub, локальный путь или источник в маркетплейсе (marketplace-url:plugin-name) устанавливаемого расширения.',
  'The git ref to install from.': 'Git-ссылка для установки.',
  'Enable auto-update for this extension.':
    'Включить автообновление для этого расширения.',
  'Enable pre-release versions for this extension.':
    'Включить пре-релизные версии для этого расширения.',
  'Acknowledge the security risks of installing an extension and skip the confirmation prompt.':
    'Подтвердить риски безопасности установки расширения и пропустить запрос подтверждения.',
  'The source argument must be provided.':
    'Необходимо указать аргумент источника.',
  'Extension "{{name}}" successfully uninstalled.':
    'Расширение "{{name}}" успешно удалено.',
  'Uninstalls an extension.': 'Удаляет расширение.',
  'The name or source path of the extension to uninstall.':
    'Имя или путь к источнику удаляемого расширения.',
  'Please include the name of the extension to uninstall as a positional argument.':
    'Пожалуйста, укажите имя удаляемого расширения как позиционный аргумент.',
  'Enables an extension.': 'Включает расширение.',
  'The name of the extension to enable.': 'Имя включаемого расширения.',
  'The scope to enable the extension in. If not set, will be enabled in all scopes.':
    'Область для включения расширения. Если не задана, будет включено во всех областях.',
  'Extension "{{name}}" successfully enabled for scope "{{scope}}".':
    'Расширение "{{name}}" успешно включено для области "{{scope}}".',
  'Extension "{{name}}" successfully enabled in all scopes.':
    'Расширение "{{name}}" успешно включено во всех областях.',
  'Invalid scope: {{scope}}. Please use one of {{scopes}}.':
    'Недопустимая область: {{scope}}. Пожалуйста, используйте одну из {{scopes}}.',
  'Disables an extension.': 'Отключает расширение.',
  'The name of the extension to disable.': 'Имя отключаемого расширения.',
  'The scope to disable the extension in.':
    'Область для отключения расширения.',
  'Extension "{{name}}" successfully disabled for scope "{{scope}}".':
    'Расширение "{{name}}" успешно отключено для области "{{scope}}".',
  'Extension "{{name}}" successfully updated: {{oldVersion}} → {{newVersion}}.':
    'Расширение "{{name}}" успешно обновлено: {{oldVersion}} → {{newVersion}}.',
  'Unable to install extension "{{name}}" due to missing install metadata':
    'Невозможно установить расширение "{{name}}" из-за отсутствия метаданных установки',
  'Extension "{{name}}" is already up to date.':
    'Расширение "{{name}}" уже актуально.',
  'Updates all extensions or a named extension to the latest version.':
    'Обновляет все расширения или указанное расширение до последней версии.',
  'The name of the extension to update.': 'Имя обновляемого расширения.',
  'Update all extensions.': 'Обновить все расширения.',
  'Either an extension name or --all must be provided':
    'Необходимо указать имя расширения или --all',
  'Lists installed extensions.': 'Показывает установленные расширения.',
  'Path:': 'Путь:',
  'Source:': 'Источник:',
  'Type:': 'Тип:',
  'Ref:': 'Ссылка:',
  'Release tag:': 'Тег релиза:',
  'Enabled (User):': 'Включено (Пользователь):',
  'Enabled (Workspace):': 'Включено (Рабочее пространство):',
  'Context files:': 'Контекстные файлы:',
  'Skills:': 'Навыки:',
  'Agents:': 'Агенты:',
  'Workflows:': 'Рабочие процессы:',
  'MCP servers:': 'MCP-серверы:',
  'Link extension failed to install.':
    'Не удалось установить связанное расширение.',
  'Extension "{{name}}" linked successfully and enabled.':
    'Расширение "{{name}}" успешно связано и включено.',
  'Links an extension from a local path. Updates made to the local path will always be reflected.':
    'Связывает расширение из локального пути. Изменения в локальном пути будут всегда отражаться.',
  'The name of the extension to link.': 'Имя связываемого расширения.',
  'Set a specific setting for an extension.':
    'Установить конкретную настройку для расширения.',
  'Name of the extension to configure.': 'Имя настраиваемого расширения.',
  'The setting to configure (name or env var).':
    'Настройка для конфигурирования (имя или переменная окружения).',
  'The scope to set the setting in.': 'Область для установки настройки.',
  'List all settings for an extension.': 'Показать все настройки расширения.',
  'Name of the extension.': 'Имя расширения.',
  'Extension "{{name}}" has no settings to configure.':
    'Расширение "{{name}}" не имеет настроек для конфигурирования.',
  'Settings for "{{name}}":': 'Настройки для "{{name}}":',
  '(workspace)': '(рабочее пространство)',
  '(user)': '(пользователь)',
  '[not set]': '[не задано]',
  '[value stored in keychain]': '[значение хранится в связке ключей]',
  'Manage extension settings.': 'Управление настройками расширений.',
  'You need to specify a command (set or list).':
    'Необходимо указать команду (set или list).',
  // ============================================================================
  // Plugin Choice / Marketplace
  // ============================================================================
  'No plugins available in this marketplace.':
    'В этом маркетплейсе нет доступных плагинов.',
  'Select a plugin to install from marketplace "{{name}}":':
    'Выберите плагин для установки из маркетплейса "{{name}}":',
  'Plugin selection cancelled.': 'Выбор плагина отменён.',
  'Select a plugin from "{{name}}"': 'Выберите плагин из "{{name}}"',
  'Use ↑↓ or j/k to navigate, Enter to select, Escape to cancel':
    'Используйте ↑↓ или j/k для навигации, Enter для выбора, Escape для отмены',
  '{{count}} more above': 'ещё {{count}} выше',
  '{{count}} more below': 'ещё {{count}} ниже',
  'manage IDE integration': 'Управление интеграцией с IDE',
  'check status of IDE integration': 'Проверить статус интеграции с IDE',
  'install required IDE companion for {{ideName}}':
    'Установить необходимый компаньон IDE для {{ideName}}',
  'enable IDE integration': 'Включение интеграции с IDE',
  'disable IDE integration': 'Отключение интеграции с IDE',
  'IDE integration is not supported in your current environment. To use this feature, run Qwen Code in one of these supported IDEs: VS Code or VS Code forks.':
    'Интеграция с IDE не поддерживается в вашем окружении. Для использования этой функции запустите Coddy в одной из поддерживаемых IDE: VS Code или форках VS Code.',
  'Set up GitHub Actions': 'Настройка GitHub Actions',
  'Configure terminal keybindings for multiline input (VS Code, Cursor, Windsurf, Trae)':
    'Настройка привязки клавиш терминала для многострочного ввода (VS Code, Cursor, Windsurf, Trae)',
  'Please restart your terminal for the changes to take effect.':
    'Пожалуйста, перезапустите терминал для применения изменений.',
  'Failed to configure terminal: {{error}}':
    'Не удалось настроить терминал: {{error}}',
  'Could not determine {{terminalName}} config path on Windows: APPDATA environment variable is not set.':
    'Не удалось определить путь конфигурации {{terminalName}} в Windows: переменная окружения APPDATA не установлена.',
  '{{terminalName}} keybindings.json exists but is not a valid JSON array. Please fix the file manually or delete it to allow automatic configuration.':
    '{{terminalName}} keybindings.json существует, но не является корректным массивом JSON. Пожалуйста, исправьте файл вручную или удалите его для автоматической настройки.',
  'File: {{file}}': 'Файл: {{file}}',
  'Failed to parse {{terminalName}} keybindings.json. The file contains invalid JSON. Please fix the file manually or delete it to allow automatic configuration.':
    'Не удалось разобрать {{terminalName}} keybindings.json. Файл содержит некорректный JSON. Пожалуйста, исправьте файл вручную или удалите его для автоматической настройки.',
  'Error: {{error}}': 'Ошибка: {{error}}',
  'Shift+Enter binding already exists': 'Привязка Shift+Enter уже существует',
  'Ctrl+Enter binding already exists': 'Привязка Ctrl+Enter уже существует',
  'Existing keybindings detected. Will not modify to avoid conflicts.':
    'Обнаружены существующие привязки клавиш. Не будут изменены во избежание конфликтов.',
  'Please check and modify manually if needed: {{file}}':
    'Пожалуйста, проверьте и измените вручную при необходимости: {{file}}',
  'Added Shift+Enter and Ctrl+Enter keybindings to {{terminalName}}.':
    'Добавлены привязки Shift+Enter и Ctrl+Enter для {{terminalName}}.',
  'Modified: {{file}}': 'Изменено: {{file}}',
  '{{terminalName}} keybindings already configured.':
    'Привязки клавиш {{terminalName}} уже настроены.',
  'Failed to configure {{terminalName}}.':
    'Не удалось настроить {{terminalName}}.',
  'Your terminal is already configured for an optimal experience with multiline input (Shift+Enter and Ctrl+Enter).':
    'Ваш терминал уже настроен для оптимальной работы с многострочным вводом (Shift+Enter и Ctrl+Enter).',
  // ============================================================================
  // Commands - Hooks
  // ============================================================================
  'Manage Qwen Code hooks': 'Управлять хуками Coddy',
  'List all configured hooks': 'Показать все настроенные хуки',
  // Hooks - Dialog
  Hooks: 'Хуки',
  'Loading hooks...': 'Загрузка хуков...',
  'Error loading hooks:': 'Ошибка загрузки хуков:',
  'Press Escape to close': 'Нажмите Escape для закрытия',
  'Press Escape, Ctrl+C, or Ctrl+D to cancel':
    'Нажмите Escape, Ctrl+C или Ctrl+D для отмены',
  'Press Space, Enter, or Escape to dismiss':
    'Нажмите Space, Enter или Escape для закрытия',
  'No hook selected': 'Хук не выбран',
  // Hooks - List Step
  'No hook events found.': 'События хуков не найдены.',
  '{{count}} hook configured': '{{count}} хук настроен',
  '{{count}} hooks configured': '{{count}} хуков настроено',
  'This menu is read-only. To add or modify hooks, edit settings.json directly or ask Qwen Code.':
    'Это меню только для чтения. Чтобы добавить или изменить хуки, отредактируйте settings.json напрямую или спросите Coddy.',
  'Reopen this menu to reload hook definitions.':
    'Откройте это меню повторно, чтобы перезагрузить определения хуков.',
  'Hook controls and HTTP security settings require a restart.':
    'Изменения параметров управления хуками и настроек безопасности HTTP требуют перезапуска.',
  'Failed to reload hook definitions: {{error}}':
    'Не удалось перезагрузить определения хуков: {{error}}',
  'Enter to select · Esc to cancel': 'Enter для выбора · Esc для отмены',
  // Hooks - Detail Step
  'Exit codes:': 'Коды выхода:',
  'Configured hooks:': 'Настроенные хуки:',
  'No hooks configured for this event.':
    'Для этого события нет настроенных хуков.',
  'To add hooks, edit settings.json directly or ask Qwen.':
    'Чтобы добавить хуки, отредактируйте settings.json напрямую или спросите агента.',
  'Enter to select · Esc to go back': 'Enter для выбора · Esc для возврата',
  // Hooks - Config Detail Step
  'Hook details': 'Детали хука',
  'Event:': 'Событие:',
  'Extension:': 'Расширение:',
  'Desc:': 'Описание:',
  'No hook config selected': 'Конфигурация хука не выбрана',
  'To modify or remove this hook, edit settings.json directly or ask Qwen to help.':
    'Чтобы изменить или удалить этот хук, отредактируйте settings.json напрямую или спросите агента.',
  // Hooks - Disabled Step
  'Hook Configuration - Disabled': 'Конфигурация хуков - Отключено',
  'All hooks are currently disabled. You have {{count}} that are not running.':
    'Все хуки в данный момент отключены. У вас {{count}} не выполняются.',
  '{{count}} configured hook': '{{count}} настроенный хук',
  '{{count}} configured hooks': '{{count}} настроенных хуков',
  'When hooks are disabled:': 'Когда хуки отключены:',
  'No hook commands will execute': 'Никакие команды хуков не будут выполняться',
  'StatusLine will not be displayed': 'StatusLine не будет отображаться',
  'Tool operations will proceed without hook validation':
    'Операции инструментов будут выполняться без проверки хуков',
  'To re-enable hooks, remove "disableAllHooks" from settings.json or ask Qwen Code.':
    'Чтобы снова включить хуки, удалите "disableAllHooks" из settings.json или спросите Coddy.',
  // Hooks - Source
  Project: 'Проект',
  User: 'Пользователь',
  Skill: 'Навык',
  System: 'Система',
  Extension: 'Расширение',
  'Local Settings': 'Локальные настройки',
  'User Settings': 'Пользовательские настройки',
  'System Settings': 'Системные настройки',
  Extensions: 'Расширения',
  'Session (temporary)': 'Сессия (временно)',
  // Hooks - Event Descriptions (short)
  'Before tool execution': 'Перед выполнением инструмента',
  'After tool execution': 'После выполнения инструмента',
  'After tool execution fails': 'При неудачном выполнении инструмента',
  'When notifications are sent': 'При отправке уведомлений',
  'When the user submits a prompt': 'Когда пользователь отправляет промпт',
  'When a slash command expands into a prompt':
    'Когда slash-команда разворачивается в промпт',
  'When a new session is started': 'При запуске новой сессии',
  'Right before Qwen Code concludes its response':
    'Непосредственно перед завершением ответа Coddy',
  'When a subagent (Agent tool call) is started':
    'При запуске субагента (вызов инструмента Agent)',
  'Right before a subagent concludes its response':
    'Непосредственно перед завершением ответа субагента',
  'Before conversation compaction': 'Перед сжатием разговора',
  'When a session is ending': 'При завершении сессии',
  'When a permission dialog is displayed': 'При отображении диалога разрешений',
  'When a new todo item is created': 'При создании новой задачи',
  'When a todo item is marked as completed':
    'При отметке задачи как выполненной',
  // Hooks - Event Descriptions (detailed)
  'Input to command is JSON of tool call arguments.':
    'Ввод в команду — это JSON аргументов вызова инструмента.',
  'Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).':
    'Ввод в команду — это JSON с полями "inputs" (аргументы вызова инструмента) и "response" (ответ вызова инструмента).',
  'Input to command is JSON with tool_name, tool_input, tool_use_id, error, error_type, is_interrupt, and is_timeout.':
    'Ввод в команду — это JSON с tool_name, tool_input, tool_use_id, error, error_type, is_interrupt и is_timeout.',
  'Input to command is JSON with notification message and type.':
    'Ввод в команду — это JSON с сообщением уведомления и типом.',
  'Input to command is JSON with "prompt" (the current model-bound prompt) and optional "submitted_prompt" (the text projection captured at a supported submission boundary).':
    'Ввод команды — JSON с полем "prompt" (текущий промпт, отправляемый модели) и необязательным "submitted_prompt" (текстовая проекция, захваченная на поддерживаемой границе отправки).',
  'Input to command is JSON with command_name, command_args, and expanded prompt text.':
    'Ввод в команду — это JSON с command_name, command_args и развернутым текстом промпта.',
  'Input to command is JSON with session start source.':
    'Ввод в команду — это JSON с источником запуска сессии.',
  'Input to command is JSON with session end reason.':
    'Ввод в команду — это JSON с причиной завершения сессии.',
  'Input to command is JSON with agent_id and agent_type.':
    'Ввод в команду — это JSON с agent_id и agent_type.',
  'Input to command is JSON with agent_id, agent_type, and agent_transcript_path.':
    'Ввод в команду — это JSON с agent_id, agent_type и agent_transcript_path.',
  'Input to command is JSON with compaction details.':
    'Ввод в команду — это JSON с деталями сжатия.',
  'Input to command is JSON with tool_name, tool_input, and tool_use_id. Output JSON with hookSpecificOutput containing decision to allow or deny.':
    'Ввод в команду — это JSON с tool_name, tool_input и tool_use_id. Вывод — JSON с hookSpecificOutput, содержащим решение о разрешении или отказе.',
  'Input to command is JSON with todo_id, todo_content, todo_status, all_todos, and phase. In validation, output JSON with decision (allow/block/deny) and reason. In postWrite, block/deny is ignored.':
    'Ввод в команду — это JSON с todo_id, todo_content, todo_status, all_todos и phase. В validation вывод — JSON с decision (allow/block/deny) и reason. В postWrite block/deny игнорируется.',
  'Input to command is JSON with todo_id, todo_content, previous_status, all_todos, and phase. In validation, output JSON with decision (allow/block/deny) and reason. In postWrite, block/deny is ignored.':
    'Ввод в команду — это JSON с todo_id, todo_content, previous_status, all_todos и phase. В validation вывод — JSON с decision (allow/block/deny) и reason. В postWrite block/deny игнорируется.',
  // Hooks - Exit Code Descriptions
  'stdout/stderr not shown': 'stdout/stderr не отображаются',
  'show stderr to model and continue conversation':
    'показать stderr модели и продолжить разговор',
  'show stderr to user only': 'показать stderr только пользователю',
  'stdout shown in transcript mode (ctrl+o)':
    'stdout отображается в режиме транскрипции (ctrl+o)',
  'show stderr to model immediately': 'показать stderr модели немедленно',
  'show stderr to user only but continue with tool call':
    'показать stderr только пользователю, но продолжить вызов инструмента',
  'block processing, erase original prompt, and show stderr to user only':
    'заблокировать обработку, стереть исходный промпт и показать stderr только пользователю',
  'block expanded prompt submission and show stderr to user only':
    'заблокировать отправку развернутого промпта и показать stderr только пользователю',
  'stdout shown to Qwen': 'stdout показан агенту',
  'show stderr to user only (blocking errors ignored)':
    'показать stderr только пользователю (блокирующие ошибки игнорируются)',
  'command completes successfully': 'команда успешно завершена',
  'stdout shown to subagent': 'stdout показан субагенту',
  'show stderr to subagent and continue having it run':
    'показать stderr субагенту и продолжить его выполнение',
  'stdout appended as custom compact instructions':
    'stdout добавлен как пользовательские инструкции сжатия',
  'block compaction': 'заблокировать сжатие',
  'show stderr to user only but continue with compaction':
    'показать stderr только пользователю, но продолжить сжатие',
  'use hook decision if provided':
    'использовать решение хука, если предоставлено',
  'allow todo creation': 'разрешить создание задачи',
  'block todo creation and show reason to model':
    'заблокировать создание задачи и показать причину модели',
  'allow todo completion': 'разрешить выполнение задачи',
  'block todo completion and show reason to model':
    'заблокировать выполнение задачи и показать причину модели',
  // Hooks - Messages
  'Config not loaded.': 'Конфигурация не загружена.',
  'Hooks are not enabled. Enable hooks in settings to use this feature.':
    'Хуки не включены. Включите хуки в настройках, чтобы использовать эту функцию.',
  // ============================================================================
  // Commands - Session Export
  // ============================================================================
  'Export current session message history to a file':
    'Экспортировать историю сообщений текущей сессии в файл',
  'Export session to HTML format': 'Экспортировать сессию в формат HTML',
  'Export session to JSON format': 'Экспортировать сессию в формат JSON',
  'Export session to JSONL format (one message per line)':
    'Экспортировать сессию в формат JSONL (одно сообщение на строку)',
  'Export session to markdown format':
    'Экспортировать сессию в формат Markdown',

  // ============================================================================
  // Commands - Insights
  // ============================================================================
  'generate personalized programming insights from your chat history':
    'Создать персонализированные инсайты по программированию на основе истории чата',

  // ============================================================================
  // Commands - Session History
  // ============================================================================
  'Resume a previous session': 'Продолжить предыдущую сессию',
  'Fork the current conversation into a new session':
    'Создать ветку текущего разговора в новой сессии',
  'Spawn a background agent that inherits the full conversation':
    'Запустить фонового агента, который наследует весь разговор',
  'Please provide a directive. Usage: /fork <directive>':
    'Укажите инструкцию. Использование: /fork <инструкция>',
  'Cannot fork while a response or tool call is in progress. Wait for it to finish or resolve the pending tool call.':
    'Нельзя создать fork, пока выполняется ответ или вызов инструмента. Дождитесь завершения или обработайте ожидающий вызов инструмента.',
  'Cannot fork before the first conversation turn.':
    'Нельзя создать fork до первого сообщения в разговоре.',
  'The agent tool is unavailable; cannot fork.':
    'Инструмент агента недоступен; fork создать нельзя.',
  'Failed to launch fork: {{error}}': 'Не удалось запустить fork: {{error}}',
  'User launched a background fork via /fork: {{directive}}':
    'Пользователь запустил фоновый fork через /fork: {{directive}}',
  'Forked into a background agent. It inherits this conversation and runs without blocking — track it in the background tasks panel; it reports back when done.':
    'Создан fork в фоновом агенте. Он наследует этот разговор и работает без блокировки — отслеживайте его на панели фоновых задач; он сообщит результат после завершения.',
  'Cannot branch while a response or tool call is in progress. Wait for it to finish or resolve the pending tool call.':
    'Нельзя создать ветку, пока выполняется ответ или вызов инструмента. Дождитесь завершения или обработайте ожидающий вызов инструмента.',
  'No conversation to branch.': 'Нет разговора для создания ветки.',
  'Restore a tool call. This will reset the conversation and file history to the state it was in when the tool call was suggested':
    'Восстановить вызов инструмента. Это вернет историю разговора и файлов к состоянию на момент, когда был предложен этот вызов инструмента',
  'Could not detect terminal type. Supported terminals: VS Code, Cursor, Windsurf, and Trae.':
    'Не удалось определить тип терминала. Поддерживаемые терминалы: VS Code, Cursor, Windsurf и Trae.',
  'Terminal "{{terminal}}" is not supported yet.':
    'Терминал "{{terminal}}" еще не поддерживается.',

  // ============================================================================
  // Команды - Язык
  // ============================================================================
  'Invalid language. Available: {{options}}':
    'Недопустимый язык. Доступны: {{options}}',
  'Language subcommands do not accept additional arguments.':
    'Подкоманды языка не принимают дополнительных аргументов.',
  'Current UI language: {{lang}}': 'Текущий язык интерфейса: {{lang}}',
  'Current LLM output language: {{lang}}': 'Текущий язык вывода LLM: {{lang}}',
  'Set UI language': 'Установка языка интерфейса',
  'Set LLM output language': 'Установка языка вывода LLM',
  'Usage: /language ui [{{options}}]':
    'Использование: /language ui [{{options}}]',
  'Usage: /language output <language>':
    'Использование: /language output <language>',
  'Example: /language output 中文': 'Пример: /language output 中文',
  'Example: /language output English': 'Пример: /language output English',
  'Example: /language output 日本語': 'Пример: /language output 日本語',
  'UI language changed to {{lang}}': 'Язык интерфейса изменен на {{lang}}',
  'LLM output language set to {{lang}}':
    'Язык вывода LLM установлен на {{lang}}',
  'Please restart the application for the changes to take effect.':
    'Пожалуйста, перезапустите приложение для применения изменений.',
  'Failed to generate LLM output language rule file: {{error}}':
    'Не удалось создать файл правил языка вывода LLM: {{error}}',
  'Invalid command. Available subcommands:':
    'Неверная команда. Доступные подкоманды:',
  'Available subcommands:': 'Доступные подкоманды:',
  'To request additional UI language packs, please open an issue on GitHub.':
    'Для запроса дополнительных языковых пакетов интерфейса, пожалуйста, создайте обращение на GitHub.',
  'Available options:': 'Доступные варианты:',
  'Set UI language to {{name}}': 'Установить язык интерфейса на {{name}}',

  // ============================================================================
  // Команды - Режим подтверждения
  // ============================================================================
  'Tool Approval Mode': 'Режим подтверждения инструментов',
  'Analyze only, do not modify files or execute commands':
    'Только анализ, без изменения файлов или выполнения команд',
  'Require approval for file edits or shell commands':
    'Требуется подтверждение для редактирования файлов или команд терминала',
  'Automatically approve file edits':
    'Автоматически подтверждать изменения файлов',
  'Use classifier to automatically approve safe tool calls':
    'Использовать классификатор для автоматического подтверждения безопасных вызовов инструментов',
  'Automatically approve all tools':
    'Автоматически подтверждать все инструменты',
  'Workspace approval mode exists and takes priority. User-level change will have no effect.':
    'Режим подтверждения рабочего пространства существует и имеет приоритет. Изменение на уровне пользователя не будет иметь эффекта.',
  'Apply To': 'Применить к',
  'Workspace Settings': 'Настройки рабочего пространства',
  'Open auto-memory folder': 'Открыть папку автопамяти',
  'Auto-memory: {{status}}': 'Автопамять: {{status}}',
  'Auto-dream: {{status}} · {{lastDream}} · /dream to run':
    'Автоконсолидация: {{status}} · {{lastDream}} · /dream для запуска',
  'Auto-skill: {{status}}': 'Автонавык: {{status}}',
  never: 'никогда',
  on: 'вкл',
  off: 'выкл',
  'Remove matching entries from managed auto-memory.':
    'Удалить совпадающие записи из управляемой автопамяти.',
  'Usage: /forget <memory text to remove>':
    'Использование: /forget <текст воспоминания для удаления>',
  'No managed auto-memory entries matched: {{query}}':
    'Не найдено совпадающих записей автопамяти: {{query}}',
  'Consolidate managed auto-memory topic files.':
    'Консолидировать файлы тем управляемой автопамяти.',
  'Could not retrieve tool registry.':
    'Не удалось получить реестр инструментов.',
  "Successfully authenticated and refreshed tools for '{{name}}'.":
    "Успешно авторизовано и обновлены инструменты для '{{name}}'.",
  "Re-discovering tools from '{{name}}'...":
    "Повторное обнаружение инструментов от '{{name}}'...",
  "Discovered {{count}} tool(s) from '{{name}}'.":
    "Обнаружено {{count}} инструмент(ов) от '{{name}}'.",
  'Authentication complete. Returning to server details...':
    'Аутентификация завершена. Возврат к деталям сервера...',
  'Authentication successful.': 'Аутентификация успешна.',
  // =========================================================
  // Команды - Резюме
  // ============================================================================
  'Generate a project summary and save it to .qwen/PROJECT_SUMMARY.md':
    'Сгенерировать сводку проекта и сохранить её в .coddy/PROJECT_SUMMARY.md',
  'No chat client available to generate summary.':
    'Нет доступного чат-клиента для генерации сводки.',
  'Already generating summary, wait for previous request to complete':
    'Генерация сводки уже выполняется, дождитесь завершения предыдущего запроса',
  'No conversation found to summarize.':
    'Не найдено диалогов для создания сводки.',
  'Summary path already exists and is not a generated summary: {{path}}':
    'Путь сводки уже существует и не является сгенерированной сводкой: {{path}}',
  'Summary path must be within the project root.':
    'Путь сводки должен находиться в корне проекта.',
  'Summary path resolves to an existing directory: {{path}}':
    'Путь сводки указывает на существующий каталог: {{path}}',
  'Summary path ends with a separator but is an existing file: {{path}}':
    'Путь сводки заканчивается разделителем, но является существующим файлом: {{path}}',
  'Failed to generate project context summary: {{error}}':
    'Не удалось сгенерировать сводку контекста проекта: {{error}}',
  'Saved project summary to {{filePathForDisplay}}.':
    'Сводка проекта сохранена в {{filePathForDisplay}}',
  'Saving project summary...': 'Сохранение сводки проекта...',
  'Generating project summary...': 'Генерация сводки проекта...',
  'Processing summary...': 'Обработка сводки...',
  'Project summary generated and saved successfully!':
    'Сводка проекта успешно создана и сохранена!',
  'Saved to: {{filePath}}': 'Сохранено в: {{filePath}}',
  'Stopped because': 'Остановлено, потому что',
  'Failed to generate summary - no text content received from LLM response':
    'Не удалось сгенерировать сводку - не получен текстовый контент из ответа LLM',

  // ============================================================================
  // Команды - Модель
  // ============================================================================
  'Switch the model for this session (--fast for suggestion model, [model-id] to switch immediately).':
    'Переключение модели для этой сессии (--fast для модели подсказок)',
  'Set a lighter model for prompt suggestions and speculative execution':
    'Установить облегчённую модель для подсказок и спекулятивного выполнения',
  'Content generator configuration not available.':
    'Конфигурация генератора содержимого недоступна.',
  'Authentication type not available.': 'Тип авторизации недоступен.',
  'No models available for the current authentication type ({{authType}}).':
    'Нет доступных моделей для текущего типа авторизации ({{authType}}).',
  // Needs translation

  // ============================================================================
  // Команды - Очистка
  // ============================================================================
  'Starting a new session, resetting chat, and clearing terminal.':
    'Начало новой сессии, сброс чата и очистка терминала.',
  'Starting a new session and clearing.': 'Начало новой сессии и очистка.',

  // ============================================================================
  // Команды - Сжатие
  // ============================================================================
  'Already compressing, wait for previous request to complete':
    'Уже выполняется сжатие, дождитесь завершения предыдущего запроса',
  'Failed to compress chat history.': 'Не удалось сжать историю чата.',
  'Failed to compress chat history: {{error}}':
    'Не удалось сжать историю чата: {{error}}',
  'Compressing chat history': 'Сжатие истории чата',
  'Chat history compressed from {{originalTokens}} to {{newTokens}} tokens.':
    'История чата сжата с {{originalTokens}} до {{newTokens}} токенов.',
  'Compression was not beneficial for this history size.':
    'Сжатие не было полезным для этого размера истории.',
  'Chat history compression did not reduce size. This may indicate issues with the compression prompt.':
    'Сжатие истории чата не уменьшило размер. Это может указывать на проблемы с промптом сжатия.',
  'Could not compress chat history due to a token counting error.':
    'Не удалось сжать историю чата из-за ошибки подсчета токенов.',
  'Could not compress chat history because the compression summary was empty.':
    'Не удалось сжать историю чата, потому что сводка сжатия была пустой.',
  'Could not compress chat history because the compression summary was truncated.':
    'Не удалось сжать историю чата, потому что сводка сжатия была усечена.',
  'Could not compress chat history due to an API error.':
    'Не удалось сжать историю чата из-за ошибки API.',
  // ============================================================================
  // Команды - Директория
  // ============================================================================
  'Configuration is not available.': 'Конфигурация недоступна.',
  'Please provide at least one path to add.':
    'Пожалуйста, укажите хотя бы один путь для добавления.',
  'The /directory add command is not supported in restrictive sandbox profiles. Please use --include-directories when starting the session instead.':
    'Команда /directory add не поддерживается в ограничительных профилях песочницы. Пожалуйста, используйте --include-directories при запуске сессии.',
  "Error adding '{{path}}': {{error}}":
    "Ошибка при добавлении '{{path}}': {{error}}",
  'Successfully added QWEN.md files from the following directories if there are:\n- {{directories}}':
    'Успешно добавлены файлы контекста (AGENTS.md и др.) из следующих директорий (если они есть):\n- {{directories}}',
  'Error refreshing memory: {{error}}':
    'Ошибка при обновлении памяти: {{error}}',
  'Successfully added directories:\n- {{directories}}':
    'Успешно добавлены директории:\n- {{directories}}',
  'Current workspace directories:\n{{directories}}':
    'Текущие директории рабочего пространства:\n{{directories}}',

  // ============================================================================
  // Команды - Документация
  // ============================================================================
  'Please open the following URL in your browser to view the documentation:\n{{url}}':
    'Пожалуйста, откройте следующий URL в браузере для просмотра документации:\n{{url}}',
  'Opening documentation in your browser: {{url}}':
    'Открытие документации в браузере: {{url}}',

  // ============================================================================
  // Диалоги - Подтверждение инструментов
  // ============================================================================
  'Do you want to proceed?': 'Вы хотите продолжить?',
  'Yes, allow once': 'Да, разрешить один раз',
  'Allow always': 'Всегда разрешать',
  Yes: 'Да',
  No: 'Нет',
  'No (esc)': 'Нет (esc)',
  // MCP Management - Core translations
  Disable: 'Отключить',
  Enable: 'Включить',
  Authenticate: 'Аутентификация',
  'Re-authenticate': 'Повторная аутентификация',
  'Clear Authentication': 'Очистить аутентификацию',
  disabled: 'отключен',
  enabled: 'включен',
  'disabled (bare mode)': 'отключен (минимальный режим)',
  'disabled (safe mode)': 'отключен (безопасный режим)',
  'disabled (disableAllHooks)': 'отключен (disableAllHooks)',
  'disabled (folder not trusted)': 'отключен (папка не доверенная)',
  'disabled (turned off for this session)': 'отключен (выключен в этой сессии)',
  'Server:': 'Сервер:',
  Reconnect: 'Переподключить',
  'View tools': 'Просмотреть инструменты',
  'Error:': 'Ошибка:',
  tool: 'инструмент',
  connected: 'подключен',
  connecting: 'подключение',
  disconnected: 'отключен',
  error: 'ошибка',
  // Invalid tool related translations
  '{{count}} invalid tools': '{{count}} недействительных инструментов',
  invalid: 'недействительный',
  'invalid: {{reason}}': 'недействительно: {{reason}}',
  'missing name': 'отсутствует имя',
  'missing description': 'отсутствует описание',
  '(unnamed)': '(без имени)',
  'Warning: This tool cannot be called by the LLM':
    'Предупреждение: Этот инструмент не может быть вызван LLM',
  Reason: 'Причина',
  'Tools must have both name and description to be used by the LLM.':
    'Инструменты должны иметь как имя, так и описание, чтобы использоваться LLM.',
  'Modify in progress:': 'Идет изменение:',
  'Save and close external editor to continue':
    'Сохраните и закройте внешний редактор для продолжения',
  'Apply this change?': 'Применить это изменение?',
  'Yes, allow always': 'Да, всегда разрешать',
  'Modify with external editor': 'Изменить во внешнем редакторе',
  'No, suggest changes (esc)': 'Нет, предложить изменения (esc)',
  "Allow execution of: '{{command}}'?": "Разрешить выполнение: '{{command}}'?",
  'Always allow in this project': 'Всегда разрешать в этом проекте',
  'Always allow {{action}} in this project':
    'Всегда разрешать {{action}} в этом проекте',
  'Always allow for this user': 'Всегда разрешать для этого пользователя',
  'Always allow {{action}} for this user':
    'Всегда разрешать {{action}} для этого пользователя',
  'Yes, restore previous mode ({{mode}})':
    'Да, восстановить предыдущий режим ({{mode}})',
  'Yes, and auto-accept edits': 'Да, и автоматически принимать правки',
  'Yes, and manually approve edits': 'Да, и вручную подтверждать правки',
  'No, keep planning (esc)': 'Нет, продолжить планирование (esc)',
  'URLs to fetch:': 'URL для загрузки:',
  'MCP Server: {{server}}': 'MCP-сервер: {{server}}',
  'Tool: {{tool}}': 'Инструмент: {{tool}}',
  'Allow execution of MCP tool "{{tool}}" from server "{{server}}"?':
    'Разрешить выполнение MCP tool "{{tool}}" с MCP server "{{server}}"?',
  // ============================================================================
  // Диалоги - Подтверждение оболочки
  // ============================================================================
  'Shell Command Execution': 'Выполнение команды терминала',
  'A custom command wants to run the following shell commands:':
    'Пользовательская команда хочет выполнить следующие команды терминала:',
  // ============================================================================
  // Диалоги - Приветствие при возвращении
  // ============================================================================
  'Current Plan:': 'Текущий план:',
  'Progress: {{done}}/{{total}} tasks completed':
    'Прогресс: {{done}}/{{total}} задач выполнено',
  ', {{inProgress}} in progress': ', {{inProgress}} в процессе',
  'Pending Tasks:': 'Ожидающие задачи:',
  'What would you like to do?': 'Что вы хотите сделать?',
  'Choose how to proceed with your session:':
    'Выберите, как продолжить сессию:',
  'Start new chat session': 'Начать новую сессию чата',
  'Continue previous conversation': 'Продолжить предыдущий диалог',
  'Welcome back! (Last updated: {{timeAgo}})':
    'С возвращением! (Последнее обновление: {{timeAgo}})',
  'Overall Goal:': 'Общая цель:',
  'Connect a Provider': 'Подключить провайдера',
  'You must connect a provider to proceed. Press Ctrl+C again to exit.':
    'Необходимо подключить провайдера для продолжения. Нажмите Ctrl+C снова для выхода.',
  'Terms of Services and Privacy Notice': 'Документация Coddy',
  'Qwen OAuth': 'OAuth (не поддерживается)',
  'Discontinued — switch to Coding Plan or API Key':
    'Прекращено — переключитесь на Coding Plan или API Key',
  'Qwen OAuth free tier was discontinued on 2026-04-15. Please select Coding Plan or API Key instead.':
    'Этот способ входа больше не поддерживается. Выберите NeuralDeep или свой адрес.',
  'Qwen OAuth free tier was discontinued on 2026-04-15. Please select a model from another provider or run /auth to switch.':
    'Этот способ входа больше не поддерживается. Выберите модель другого провайдера или выполните /auth.',
  '\n⚠ Qwen OAuth free tier was discontinued on 2026-04-15. Please select another option.\n':
    '\n⚠ Этот способ входа больше не поддерживается. Выберите другой.\n',
  'Paid \u00B7 Up to 6,000 requests/5 hrs \u00B7 All Alibaba Cloud Coding Plan Models':
    'Платно \u00B7 До 6 000 запросов/5 часов \u00B7 Все модели Alibaba Cloud Coding Plan',
  'Alibaba Cloud Coding Plan': 'Alibaba Cloud Coding Plan',
  'Bring your own API key': 'Используйте свой API Key',
  'Browser-based authentication with third-party providers (e.g. OpenRouter, ModelScope)':
    'Браузерная аутентификация с использованием сторонних провайдеров (например, OpenRouter, ModelScope)',
  'Authentication is enforced to be {{enforcedType}}, but you are currently using {{currentType}}.':
    'Авторизация должна быть {{enforcedType}}, но вы сейчас используете {{currentType}}.',
  'Qwen OAuth Authentication': 'Авторизация OAuth',
  'Please visit this URL to authorize:':
    'Пожалуйста, посетите этот URL для авторизации:',
  'Waiting for authorization': 'Ожидание авторизации',
  'Time remaining:': 'Осталось времени:',
  'Qwen OAuth Authentication Timeout': 'Таймаут авторизации OAuth',
  'OAuth token expired (over {{seconds}} seconds). Please select authentication method again.':
    'Токен OAuth истек (более {{seconds}} секунд). Пожалуйста, выберите метод авторизации снова.',
  'Press any key to return to authentication type selection.':
    'Нажмите любую клавишу для возврата к выбору типа авторизации.',
  'Waiting for Qwen OAuth authentication...': 'Ожидание авторизации OAuth...',
  'Authentication timed out. Please try again.':
    'Время ожидания авторизации истекло. Пожалуйста, попробуйте снова.',
  'Waiting for auth... (Press ESC or CTRL+C to cancel)':
    'Ожидание авторизации... (Нажмите ESC или CTRL+C для отмены)',
  'Missing API key for OpenAI-compatible auth. Set settings.security.auth.apiKey, or set the {{envKeyHint}} environment variable.':
    'Отсутствует API Key для аутентификации, совместимой с OpenAI. Укажите settings.security.auth.apiKey или переменную окружения {{envKeyHint}}.',
  '{{envKeyHint}} environment variable not found. Please set it in your .env file or environment variables.':
    'Переменная окружения {{envKeyHint}} не найдена. Укажите её в файле .env или среди системных переменных.',
  '{{envKeyHint}} environment variable not found (or set settings.security.auth.apiKey). Please set it in your .env file or environment variables.':
    'Переменная окружения {{envKeyHint}} не найдена (или установите settings.security.auth.apiKey). Укажите её в файле .env или среди системных переменных.',
  'Missing API key for OpenAI-compatible auth. Set the {{envKeyHint}} environment variable.':
    'Отсутствует API Key для аутентификации, совместимой с OpenAI. Установите переменную окружения {{envKeyHint}}.',
  'Anthropic provider missing required baseUrl in modelProviders[].baseUrl.':
    'У провайдера Anthropic отсутствует обязательный baseUrl в modelProviders[].baseUrl.',
  'ANTHROPIC_BASE_URL environment variable not found.':
    'Переменная окружения ANTHROPIC_BASE_URL не найдена.',
  'Invalid auth method selected.': 'Выбран недопустимый метод авторизации.',
  'Failed to authenticate. Message: {{message}}':
    'Не удалось авторизоваться. Сообщение: {{message}}',
  'Authenticated successfully with {{authType}} credentials.':
    'Успешно авторизовано с учетными данными {{authType}}.',
  'Invalid QWEN_DEFAULT_AUTH_TYPE value: "{{value}}". Valid values are: {{validValues}}':
    'Неверное значение QWEN_DEFAULT_AUTH_TYPE: "{{value}}". Допустимые значения: {{validValues}}',
  // ============================================================================
  // Диалоги - Модель
  // ============================================================================
  'Select Model': 'Выбрать модель',
  'API Key': 'API-ключ',
  '(default)': '(по умолчанию)',
  '(not set)': '(не задано)',
  Modality: 'Модальность',
  'Context Window': 'Контекстное окно',
  text: 'текст',
  'text-only': 'только текст',
  image: 'изображение',
  pdf: 'PDF',
  audio: 'аудио',
  video: 'видео',
  'not set': 'не задано',
  none: 'нет',
  unknown: 'неизвестно',
  // ============================================================================
  // Диалоги - Разрешения
  // ============================================================================
  'Manage folder trust settings': 'Управление настройками доверия к папкам',
  'Manage permission rules': 'Управление permission rules',
  Allow: 'Разрешить',
  Ask: 'Спросить',
  Deny: 'Запретить',
  Workspace: 'Рабочая область',
  "Qwen Code won't ask before using allowed tools.":
    'Coddy не будет спрашивать перед использованием разрешённых инструментов.',
  'Qwen Code will ask before using these tools.':
    'Coddy спросит перед использованием этих инструментов.',
  'Qwen Code is not allowed to use denied tools.':
    'Coddy не может использовать запрещённые инструменты.',
  'Manage trusted directories for this workspace.':
    'Управление доверенными каталогами для этой рабочей области.',
  'Any use of the {{tool}} tool': 'Любое использование инструмента {{tool}}',
  "{{tool}} commands matching '{{pattern}}'":
    "Команды {{tool}}, соответствующие '{{pattern}}'",
  'From user settings': 'Из пользовательских настроек',
  'From project settings': 'Из настроек проекта',
  'From session': 'Из сессии',
  'Project settings': 'Настройки проекта',
  'Checked in at .qwen/settings.json': 'Зафиксировано в .coddy/settings.json',
  'User settings': 'Пользовательские настройки',
  'Saved in at ~/.qwen/settings.json': 'Сохранено в ~/.coddy/tui/settings.json',
  'Add a new rule…': 'Добавить новое правило…',
  'Add {{type}} permission rule': 'Добавить {{type}} permission rule',
  'Permission rules are a tool name, optionally followed by a specifier in parentheses.':
    'permission rules — это имя инструмента, за которым может следовать спецификатор в скобках.',
  'e.g.,': 'напр.',
  or: 'или',
  'Enter permission rule…': 'Введите permission rule…',
  'Enter to submit · Esc to cancel': 'Enter для отправки · Esc для отмены',
  'Where should this rule be saved?': 'Где сохранить это правило?',
  'Enter to confirm · Esc to cancel':
    'Enter для подтверждения · Esc для отмены',
  'Delete {{type}} rule?': 'Удалить правило {{type}}?',
  'Are you sure you want to delete this permission rule?':
    'Вы уверены, что хотите удалить это permission rule?',
  'Permissions:': 'Разрешения:',
  '(←/→ or tab to cycle)': '(←/→ или Tab для переключения)',
  'Press ↑↓ to navigate · Enter to select · Type to search · Esc to cancel':
    '↑↓ навигация · Enter выбор · Ввод для поиска · Esc отмена',
  'Search…': 'Поиск…',
  // Workspace directory management
  'Add directory…': 'Добавить каталог…',
  'Add directory to workspace': 'Добавить каталог в рабочую область',
  'Qwen Code can read files in the workspace, and make edits when auto-accept edits is on.':
    'Coddy может читать файлы в рабочей области и вносить правки, когда автоприём правок включён.',
  'Qwen Code will be able to read files in this directory and make edits when auto-accept edits is on.':
    'Coddy сможет читать файлы в этом каталоге и вносить правки, когда автоприём правок включён.',
  'Enter the path to the directory:': 'Введите путь к каталогу:',
  'Enter directory path…': 'Введите путь к каталогу…',
  'Tab to complete · Enter to add · Esc to cancel':
    'Tab для завершения · Enter для добавления · Esc для отмены',
  'Remove directory?': 'Удалить каталог?',
  'Are you sure you want to remove this directory from the workspace?':
    'Вы уверены, что хотите удалить этот каталог из рабочей области?',
  '  (Original working directory)': '  (Исходный рабочий каталог)',
  '  (from settings)': '  (из настроек)',
  'Directory does not exist.': 'Каталог не существует.',
  'Path is not a directory.': 'Путь не является каталогом.',
  'This directory is already in the workspace.':
    'Этот каталог уже есть в рабочей области.',
  'Already covered by existing directory: {{dir}}':
    'Уже охвачен существующим каталогом: {{dir}}',

  // ============================================================================
  // Строка состояния
  // ============================================================================
  'Using:': 'Используется:',
  '{{count}} open file': '{{count}} открытый файл',
  '{{count}} open files': '{{count}} открытых файла(ов)',
  '(ctrl+g to view)': '(ctrl+g для просмотра)',
  '{{count}} {{name}} file': '{{count}} файл {{name}}',
  '{{count}} {{name}} files': '{{count}} файла(ов) {{name}}',
  '{{count}} MCP server': 'MCP-серверов: {{count}}',
  '{{count}} MCP servers': 'MCP-серверов: {{count}}',
  '{{count}} Blocked': '{{count}} заблокирован(о)',
  '(ctrl+t to view)': '(ctrl+t для просмотра)',
  '(ctrl+t to toggle)': '(ctrl+t для переключения)',
  'Press Ctrl+C again to exit.': 'Нажмите Ctrl+C снова для выхода.',
  'Press Ctrl+D again to exit.': 'Нажмите Ctrl+D снова для выхода.',
  'Press Esc again to clear.': 'Нажмите Esc снова для очистки.',
  'Press ↑ to edit queued messages':
    'Нажмите ↑ для редактирования сообщений в очереди',

  // ============================================================================
  // Статус MCP
  // ============================================================================
  'No MCP servers configured.': 'MCP servers не настроены.',
  '◌ MCP servers are starting up ({{count}} initializing)...':
    '◌ MCP servers запускаются ({{count}} инициализируется)...',
  'Note: First startup may take longer. Tool availability will update automatically.':
    'Примечание: Первый запуск может занять больше времени. Доступность инструментов обновится автоматически.',
  'Configured MCP servers:': 'Настроенные MCP servers:',
  Ready: 'Готов',
  'Starting... (first startup may take longer)':
    'Запуск... (первый запуск может занять больше времени)',
  Disconnected: 'Отключен',
  '{{count}} tool': '{{count}} инструмент',
  '{{count}} tools': '{{count}} инструмента(ов)',
  '{{count}} prompt': '{{count}} промпт',
  '{{count}} prompts': '{{count}} промпта(ов)',
  '(from {{extensionName}})': '(от {{extensionName}})',
  OAuth: 'OAuth',
  'OAuth expired': 'OAuth истек',
  'OAuth not authenticated': 'OAuth не авторизован',
  'tools and prompts will appear when ready':
    'инструменты и промпты появятся, когда будут готовы',
  '{{count}} tools cached': '{{count}} инструмента(ов) в кэше',
  'Tools:': 'Инструменты:',
  'Parameters:': 'Параметры:',
  'Prompts:': 'Промпты:',
  'Resources:': 'Ресурсы:',
  Blocked: 'Заблокировано',
  '★ Tips:': '★ Подсказки:',
  Use: 'Используйте',
  'to show server and tool descriptions':
    'для показа описаний сервера и инструментов',
  'to show tool parameter schemas': 'для показа tool parameter schemas',
  'to hide descriptions': 'для скрытия описаний',
  'to authenticate with OAuth-enabled servers':
    'для авторизации на серверах с поддержкой OAuth',
  Press: 'Нажмите',
  'to toggle tool descriptions on/off':
    'для переключения описаний инструментов',
  "Starting OAuth authentication for MCP server '{{name}}'...":
    "Начало авторизации OAuth для MCP server '{{name}}'...",
  // ============================================================================
  // Подсказки при запуске
  // ============================================================================

  // ============================================================================
  // Экран выхода / Статистика
  // ============================================================================
  'Agent powering down. Goodbye!': 'Агент завершает работу. До свидания!',
  'To continue this session, run': 'Для продолжения этой сессии, выполните',
  'Interaction Summary': 'Сводка взаимодействия',
  'Session ID:': 'ID сессии:',
  'Tool Calls:': 'Вызовы инструментов:',
  'Success Rate:': 'Процент успеха:',
  'User Agreement:': 'Согласие пользователя:',
  reviewed: 'проверено',
  'Code Changes:': 'Изменения кода:',
  Performance: 'Производительность',
  'Generation Metrics': 'Метрики генерации',
  'Latest Request': 'Последний запрос',
  'Generation Time': 'Время генерации',
  'Average TTFT': 'Среднее TTFT',
  'Session TPS': 'TPS сеанса',
  'Wall Time:': 'Общее время:',
  'Agent Active:': 'Активность агента:',
  'API Time:': 'Время API:',
  'Tool Time:': 'Время инструментов:',
  'Session Stats': 'Статистика сессии',
  'Model Usage': 'Использование модели',
  Reqs: 'Запросов',
  'Input Tokens': 'Входных токенов',
  'Output Tokens': 'Выходных токенов',
  'Savings Highlight:': 'Экономия:',
  'of input tokens were served from the cache, reducing costs.':
    'входных токенов обслужено из кэша, снижая затраты.',
  'Tip: For a full token breakdown, run `/stats model`.':
    'Подсказка: Для полной разбивки токенов выполните `/stats model`.',
  'Model Stats For Nerds': 'Статистика модели для гиков',
  'Tool Stats For Nerds': 'Статистика инструментов для гиков',
  Metric: 'Метрика',
  API: 'API',
  Requests: 'Запросы',
  Errors: 'Ошибки',
  'Avg Latency': 'Средняя задержка',
  Tokens: 'Токены',
  Total: 'Всего',
  Prompt: 'Промпт',
  Cached: 'Кэшировано',
  Thoughts: 'Размышления',
  Output: 'Вывод',
  'No API calls have been made in this session.':
    'В этой сессии не было вызовов API.',
  'Tool Name': 'Имя инструмента',
  Calls: 'Вызовы',
  'Success Rate': 'Процент успеха',
  'Avg Duration': 'Средняя длительность',
  'User Decision Summary': 'Сводка решений пользователя',
  'Total Reviewed Suggestions:': 'Всего проверено предложений:',
  ' » Accepted:': ' » Принято:',
  ' » Rejected:': ' » Отклонено:',
  ' » Modified:': ' » Изменено:',
  ' Overall Agreement Rate:': ' Общий процент согласия:',
  'No tool calls have been made in this session.':
    'В этой сессии не было вызовов инструментов.',
  'Session start time is unavailable, cannot calculate stats.':
    'Время начала сессии недоступно, невозможно рассчитать статистику.',
  Activity: 'Активность',
  Efficiency: 'Эффективность',
  Today: 'Сегодня',
  'Token Trend': 'Тренд токенов',
  'Cache Hit Rate': 'Попадание в кэш',
  'Tool Success': 'Успех инструментов',
  'Tool Leaderboard': 'Рейтинг инструментов',
  Time: 'Время',
  Success: 'Успех',
  Cache: 'Кэш',
  Latency: 'Задержка',
  'Code Impact': 'Изменения кода',
  net: 'нетто',
  streak: 'серия',
  best: 'рекорд',

  // ============================================================================
  // Command Format Migration
  // ============================================================================
  'Command Format Migration': 'Миграция формата команд',
  'Found {{count}} TOML command file:': 'Найден {{count}} файл команд TOML:',
  'Found {{count}} TOML command files:':
    'Найдено {{count}} файлов команд TOML:',
  'Current tasks': 'Текущие задачи',
  'Background tasks': 'Фоновые задачи',
  'No tasks currently running': 'Нет запущенных задач',
  'No entry to show.': 'Нет записи для отображения.',
  'needs approval': 'требует подтверждения',
  'Large workflow': 'Большой workflow',
  'Large workflow: {{agents}} agents scheduled (warning threshold {{cap}}).':
    'Большой workflow: запланировано агентов: {{agents}} (порог предупреждения {{cap}}).',
  'Large workflow: ~{{tokens}} output tokens projected (warning threshold {{cap}}).':
    'Большой workflow: ожидается ~{{tokens}} выходных токенов (порог предупреждения {{cap}}).',
  'rejected — edit config to re-approve':
    'отклонено — измените конфигурацию для повторного подтверждения',
  'Background agent needs approval': 'Фоновый агент требует подтверждения',
  'Approve or deny the request above': 'Подтвердите или отклоните запрос выше',
  'from nested agent': 'от вложенного агента',
  Running: 'Выполняется',
  Pausing: 'Приостанавливается',
  Paused: 'Приостановлено',
  'Pause is cooperative; in-flight work may finish before the workflow is paused. An agent call waiting on a tool approval keeps the run in this state and still counts against the active-time limit until the approval is answered.':
    'Приостановка кооперативная; выполняемая работа может завершиться до того, как рабочий процесс будет приостановлен. Вызов агента, ожидающий одобрения инструмента, удерживает запуск в этом состоянии и продолжает учитываться в лимите активного времени, пока одобрение не будет обработано.',
  'Paused: no new agents will start; script code between agent calls keeps running. Press p to resume. /clear, /branch, and switching sessions cancel paused runs.':
    'Приостановлено: новые агенты не будут запускаться; код скрипта между вызовами агентов продолжает выполняться. Нажмите p, чтобы возобновить. /clear, /branch и переключение сессий отменяют приостановленные запуски.',
  'Pause/resume was rejected; the workflow state changed. Try again.':
    'Приостановка/возобновление отклонены; состояние рабочего процесса изменилось. Повторите попытку.',
  'Tip: use `/workflows p <runId>` or Background tasks + p to cooperatively pause/resume; use `/workflows <runId>` for details.':
    'Подсказка: используйте `/workflows p <runId>` или «Фоновые задачи» + p для кооперативной приостановки/возобновления; используйте `/workflows <runId>` для подробностей.',
  Completed: 'Завершено',
  Failed: 'Ошибка',
  Stopped: 'Остановлено',
  Shell: 'Оболочка',
  Monitor: 'Монитор',
  Command: 'Команда',
  Dream: 'Dream',
  '[dream] memory consolidation': '[dream] консолидация памяти',
  '[dream] memory consolidation (reviewing {{count}} session)':
    '[dream] консолидация памяти (проверка {{count}} сессии)',
  '[dream] memory consolidation (reviewing {{count}} sessions)':
    '[dream] консолидация памяти (проверка {{count}} сессий)',
  '... and {{count}} more': '... и ещё {{count}}',
  'The TOML format is deprecated. Would you like to migrate them to Markdown format?':
    'Формат TOML устарел. Хотите перенести их в формат Markdown?',
  '(Backups will be created and original files will be preserved)':
    '(Будут созданы резервные копии, исходные файлы будут сохранены)',

  // ============================================================================
  // Loading Phrases
  // ============================================================================
  'Waiting for user confirmation...':
    'Ожидание подтверждения от пользователя...',
  // ============================================================================

  // ============================================================================
  // Loading Phrases
  // ============================================================================
  WITTY_LOADING_PHRASES: [
    'Мне повезёт!',
    'Доставляем крутизну... ',
    'Рисуем засечки на буквах...',
    'Пробираемся через слизевиков..',
    'Советуемся с цифровыми духами...',
    'Сглаживание сплайнов...',
    'Разогреваем ИИ-хомячков...',
    'Спрашиваем волшебную ракушку...',
    'Генерируем остроумный ответ...',
    'Полируем алгоритмы...',
    'Не торопите совершенство (или мой код)...',
    'Завариваем свежие байты...',
    'Пересчитываем электроны...',
    'Задействуем когнитивные процессоры...',
    'Ищем синтаксические ошибки во вселенной...',
    'Секундочку, оптимизируем юмор...',
    'Перетасовываем панчлайны...',
    'Распутаваем нейросети...',
    'Компилируем гениальность...',
    'Загружаем yumor.exe...',
    'Призываем облако мудрости...',
    'Готовим остроумный ответ...',
    'Секунду, идёт отладка реальности...',
    'Запутываем варианты...',
    'Настраиваем космические частоты...',
    'Создаем ответ, достойный вашего терпения...',
    'Компилируем единички и нолики...',
    'Разрешаем зависимости... и экзистенциальные кризисы...',
    'Дефрагментация памяти... и оперативной, и личной...',
    'Перезагрузка модуля юмора...',
    'Кэшируем самое важное (в основном мемы с котиками)...',
    'Оптимизация для безумной скорости',
    'Меняем биты... только байтам не говорите...',
    'Сборка мусора... скоро вернусь...',
    'Сборка интернетов...',
    'Превращаем кофе в код...',
    'Обновляем синтаксис реальности...',
    'Переподключаем синапсы...',
    'Ищем лишнюю точку с запятой...',
    'Смазываем шестерёнки машины...',
    'Разогреваем серверы...',
    'Калибруем потоковый накопитель...',
    'Включаем двигатель невероятности...',
    'Направляем Силу...',
    'Выравниваем звёзды для оптимального ответа...',
    'Так скажем мы все...',
    'Загрузка следующей великой идеи...',
    'Минутку, я в потоке...',
    'Готовлюсь ослепить вас гениальностью...',
    'Секунду, полирую остроумие...',
    'Держитесь, создаю шедевр...',
    'Мигом, отлаживаю вселенную...',
    'Момент, выравниваю пиксели...',
    'Секунду, оптимизирую юмор...',
    'Момент, настраиваю алгоритмы...',
    'Варп-прыжок активирован...',
    'Добываем кристаллы дилития...',
    'Без паники...',
    'Следуем за белым кроликом...',
    'Истина где-то здесь... внутри...',
    'Продуваем картридж...',
    'Загрузка... Сделай бочку!',
    'Ждем респауна...',
    'Делаем Дугу Кесселя менее чем за 12 парсеков...',
    'Тортик — не ложь, он просто ещё грузится...',
    'Возимся с экраном создания персонажа...',
    'Минутку, ищу подходящий мем...',
    "Нажимаем 'A' для продолжения...",
    'Пасём цифровых котов...',
    'Полируем пиксели...',
    'Ищем подходящий каламбур для экрана загрузки...',
    'Отвлекаем вас этой остроумной фразой...',
    'Почти готово... вроде...',
    'Наши хомячки работают изо всех сил...',
    'Гладим Облачко по голове...',
    'Гладим кота...',
    'Рикроллим начальника...',
    'Never gonna give you up, never gonna let you down...',
    'Лабаем бас-гитару...',
    'Пробуем снузберри на вкус...',
    'Иду до конца, иду на скорость...',
    'Is this the real life? Is this just fantasy?...',
    'У меня хорошее предчувствие...',
    'Дразним медведя... (Не лезь...)',
    'Изучаем свежие мемы...',
    'Думаем, как сделать это остроумнее...',
    'Хмм... дайте подумать...',
    'Как называется бумеранг, который не возвращается? Палка...',
    'Почему компьютер простудился? Потому что оставил окна открытыми...',
    'Почему программисты не любят гулять на улице? Там среда не настроена...',
    'Почему программисты предпочитают тёмную тему? Потому что в темноте не видно багов...',
    'Почему разработчик разорился? Потому что потратил весь свой кэш...',
    'Что можно делать со сломанным карандашом? Ничего — он тупой...',
    'Провожу настройку методом тыка...',
    'Ищем, какой стороной вставлять флешку...',
    'Следим, чтобы волшебный дым не вышел из проводов...',
    'Пытаемся выйти из Vim...',
    'Раскручиваем колесо для хомяка...',
    'Это не баг, а фича...',
    'Поехали!',
    'Я вернусь... с ответом.',
    'Мой другой процесс — это ТАРДИС...',
    'Общаемся с духом машины...',
    'Даем мыслям замариноваться...',
    'Только что вспомнил, куда положил ключи...',
    'Размышляю над сферой...',
    'Я видел такое, что вам, людям, и не снилось... пользователя, читающего эти сообщения.',
    'Инициируем задумчивый взгляд...',
    'Что сервер заказывает в баре? Пинг-коладу.',
    'Почему Java-разработчики не убираются дома? Они ждут сборщик мусора...',
    'Заряжаем лазер... пиу-пиу!',
    'Делим на ноль... шучу!',
    'Ищу взрослых для присмот... в смысле, обрабатываю.',
    'Делаем бип-буп.',
    'Буферизация... даже ИИ нужно время подумать.',
    'Запутываем квантовые частицы для быстрого ответа...',
    'Полируем хром... на алгоритмах.',
    'Вы ещё не развлеклись?! Разве вы не за этим сюда пришли?!',
    'Призываем гремлинов кода... для помощи, конечно же.',
    'Ждем, пока закончится звук dial-up модема...',
    'Перекалибровка юморометра.',
    'Мой другой экран загрузки ещё смешнее.',
    'Кажется, где-то по клавиатуре гуляет кот...',
    'Улучшаем... Ещё улучшаем... Всё ещё грузится.',
    'Это не баг, это фича... экрана загрузки.',
    'Пробовали выключить и включить снова? (Экран загрузки, не меня!)',
    'Нужно построить больше пилонов...',
  ],

  // ============================================================================
  // Extension Settings Input
  // ============================================================================
  'Enter value...': 'Введите значение...',
  'Enter sensitive value...': 'Введите секретное значение...',
  'Press Enter to submit, Escape to cancel':
    'Нажмите Enter для отправки, Escape для отмены',

  // ============================================================================
  // Command Migration Tool
  // ============================================================================
  'Markdown file already exists: {{filename}}':
    'Markdown-файл уже существует: {{filename}}',
  'TOML Command Format Deprecation Notice':
    'Уведомление об устаревании формата TOML',
  'Found {{count}} command file(s) in TOML format:':
    'Найдено {{count}} файл(ов) команд в формате TOML:',
  'The TOML format for commands is being deprecated in favor of Markdown format.':
    'Формат TOML для команд устаревает в пользу формата Markdown.',
  'Markdown format is more readable and easier to edit.':
    'Формат Markdown более читаемый и простой для редактирования.',
  'You can migrate these files automatically using:':
    'Вы можете автоматически мигрировать эти файлы с помощью:',
  'Or manually convert each file:': 'Или вручную конвертировать каждый файл:',
  'TOML: prompt = "..." / description = "..."':
    'TOML: prompt = "..." / description = "..."',
  'Markdown: YAML frontmatter + content':
    'Markdown: YAML frontmatter + содержимое',
  'The migration tool will:': 'Инструмент миграции:',
  'Convert TOML files to Markdown': 'Конвертирует TOML-файлы в Markdown',
  'Create backups of original files': 'Создаёт резервные копии исходных файлов',
  'Preserve all command functionality': 'Сохраняет всю функциональность команд',
  'TOML format will continue to work for now, but migration is recommended.':
    'Формат TOML пока продолжит работать, но миграция рекомендуется.',

  // ============================================================================
  // Extensions - Explore Command
  // ============================================================================
  'Open extensions page in your browser':
    'Открыть страницу расширений в браузере',
  'Unknown extensions source: {{source}}.':
    'Неизвестный источник расширений: {{source}}.',
  'Would open extensions page in your browser: {{url}} (skipped in test environment)':
    'Страница расширений была бы открыта в браузере: {{url}} (пропущено в тестовой среде)',
  'View available extensions at {{url}}':
    'Посмотреть доступные расширения на {{url}}',
  'Opening extensions page in your browser: {{url}}':
    'Открываем страницу расширений в браузере: {{url}}',
  'Failed to open browser. Check out the extensions gallery at {{url}}':
    'Не удалось открыть браузер. Посетите галерею расширений по адресу {{url}}',
  'Use /compress when the conversation gets long to summarize history and free up context.':
    'Используйте /compress, когда разговор становится длинным, чтобы подвести итог и освободить контекст.',
  'Start a fresh idea with /clear or /new; the previous session stays available in history.':
    'Начните новую идею с /clear или /new; предыдущая сессия останется в истории.',
  'Use /bug to submit issues to the maintainers when something goes off.':
    'Используйте /bug, чтобы сообщить о проблемах разработчикам.',
  'Switch auth type quickly with /auth.':
    'Быстро переключите тип аутентификации с помощью /auth.',
  'You can run any shell commands from Qwen Code using ! (e.g. !ls).':
    'Вы можете выполнять любые shell-команды в Coddy с помощью ! (например, !ls).',
  'Type / to open the command popup; Tab autocompletes slash commands and saved prompts.':
    'Введите /, чтобы открыть меню команд; Tab автодополняет слэш-команды и сохранённые промпты.',
  'You can resume a previous conversation by running qwen --continue or qwen --resume.':
    'Вы можете продолжить предыдущий разговор, запустив coddy-tui --continue или coddy-tui --resume.',
  'You can switch permission mode quickly with Shift+Tab or /approval-mode.':
    'Вы можете быстро переключать режим разрешений с помощью Shift+Tab или /approval-mode.',
  'You can switch permission mode quickly with Tab or /approval-mode.':
    'Вы можете быстро переключать режим разрешений с помощью Tab или /approval-mode.',
  'Try /insight to generate personalized insights from your chat history.':
    'Попробуйте /insight, чтобы получить персонализированные выводы из истории чатов.',
  'Add a QWEN.md file to give Qwen Code persistent project context.':
    'Добавьте файл AGENTS.md, чтобы предоставить Coddy постоянный контекст проекта.',
  'Use /btw to ask a quick side question without disrupting the conversation.':
    'Используйте /btw, чтобы задать короткий побочный вопрос, не прерывая основной разговор.',
  'Context is almost full! Run /compress now or start /new to continue.':
    'Контекст почти заполнен! Выполните /compress сейчас или начните /new, чтобы продолжить.',
  'Context is getting full. Use /compress to free up space.':
    'Контекст заполняется. Используйте /compress, чтобы освободить место.',
  'Long conversation? /compress summarizes history to free context.':
    'Долгий разговор? /compress подведёт итог истории, чтобы освободить контекст.',

  // ============================================================================
  // Custom API Key Configuration
  // ============================================================================
  'You can configure your API key and models in settings.json':
    'Вы можете настроить API Key и модели в settings.json',
  'Refer to the documentation for setup instructions':
    'Инструкции по настройке см. в документации',

  // ============================================================================
  // Coding Plan Authentication
  // ============================================================================
  'API key cannot be empty.': 'API Key не может быть пустым.',
  'You can get your Coding Plan API key here':
    'Вы можете получить API Key Coding Plan здесь',
  'Failed to update Coding Plan configuration: {{message}}':
    'Не удалось обновить конфигурацию Coding Plan: {{message}}',

  // ============================================================================
  // Auth Dialog - View Titles and Labels
  // ============================================================================
  'Coding Plan': 'Coding Plan',
  // coddy: облачные способы входа апстрима в нашем меню входа не показываются, тексты нейтральные
  QwenCloud: 'Облачный провайдер',
  'QwenCloud · Access Method': 'Облачный провайдер · способ доступа',
  'Official recommended setup: Token Plan or Standard API Key':
    'Рекомендуемая настройка: Token Plan или стандартный API Key',
  'Pay-as-you-go · Connect with an existing platform API key':
    'Оплата по использованию · подключение по существующему API Key платформы',
  'Subscription with a monthly Credit quota · Dedicated endpoint (Personal and Team editions)':
    'Подписка с месячной квотой кредитов · выделенный endpoint (редакции Personal и Team)',
  'China — 千问AI平台': 'Китай — облачная платформа',
  'International — QwenCloud': 'Международный — облачная платформа',
  Custom: 'Пользовательский',
  'Select Region for Coding Plan': 'Выберите регион Coding Plan',
  'Choose based on where your account is registered':
    'Выберите в зависимости от места регистрации вашего аккаунта',
  'Enter Coding Plan API Key': 'Введите API Key Coding Plan',

  // ============================================================================
  // Coding Plan International Updates
  // ============================================================================
  'New model configurations are available for {{region}}. Update now?':
    'Доступны новые конфигурации моделей для {{region}}. Обновить сейчас?',
  '{{region}} configuration updated successfully. Model switched to "{{model}}".':
    'Конфигурация {{region}} успешно обновлена. Модель переключена на "{{model}}".',
  // ============================================================================
  // Context Usage Component
  // ============================================================================
  'Context Usage': 'Использование контекста',
  '% used': '% использовано',
  '% context used': '% контекста использовано',
  'Context exceeds limit! Use /compress or /clear to reduce.':
    'Контекст превышает лимит! Используйте /compress или /clear для уменьшения.',
  'No API response yet. Send a message to see actual usage.':
    'Пока нет ответа от API. Отправьте сообщение, чтобы увидеть фактическое использование.',
  'Estimated usage, including the conversation':
    'Оценка использования с учётом беседы',
  'No provider usage yet. These are local estimates, including the conversation.':
    'Данных об использовании от провайдера пока нет. Это локальные оценки с учётом беседы.',
  'Estimated pre-conversation overhead':
    'Оценочные накладные расходы перед беседой',
  'Context window': 'Контекстное окно',
  tokens: 'токенов',
  Used: 'Использовано',
  Free: 'Свободно',
  'Autocompact buffer': 'Буфер автоупаковки',
  'Usage by category': 'Использование по категориям',
  'System prompt': 'Системная подсказка',
  'Built-in tools': 'Встроенные инструменты',
  'MCP tools': 'Инструменты MCP',
  'Instruction files': 'Файлы инструкций',
  'Auto memory': 'Автопамять',
  'Memory files': 'Файлы памяти',
  Skills: 'Навыки',
  Messages: 'Сообщения',
  'Startup context': 'Стартовый контекст',
  Unattributed: 'Не распределено',
  'Cached prefix': 'Кэшированный префикс',
  'Run /context detail for per-item breakdown.':
    'Выполните /context detail для детализации по элементам.',
  active: 'активно',
  'body loaded': 'содержимое загружено',
  memory: 'память',
  'Server Detail': 'Детали сервера',
  'Tool Detail': 'Детали инструмента',
  'Loading...': 'Загрузка...',
  'Unknown step': 'Неизвестный шаг',
  'Esc to back': 'Esc для возврата',
  '↑↓ to navigate · Enter to select · Esc to close':
    '↑↓ навигация · Enter выбрать · Esc закрыть',
  '↑↓ to navigate · Enter to select · Esc to back':
    '↑↓ навигация · Enter выбрать · Esc назад',
  '↑↓ to navigate · Enter to confirm · Esc to back':
    '↑↓ навигация · Enter подтвердить · Esc назад',
  'User Settings (global)': 'Настройки пользователя (глобальные)',
  'Workspace Settings (project-specific)':
    'Настройки рабочего пространства (проектные)',
  'Disable server:': 'Отключить сервер:',
  'Select where to add the server to the exclude list:':
    'Выберите, где добавить сервер в список исключений:',
  'Press Enter to confirm, Esc to cancel':
    'Enter для подтверждения, Esc для отмены',
  'Status:': 'Статус:',
  'Command:': 'Команда:',
  'Working Directory:': 'Рабочий каталог:',
  'No server selected': 'Сервер не выбран',

  // MCP Server List
  'User MCPs': 'MCP пользователя',
  'Project MCPs': 'MCP проекта',
  'Extension MCPs': 'MCP расширений',
  server: 'сервер',
  servers: 'серверов',
  'Add MCP servers to your settings to get started.':
    'Добавьте MCP servers в настройки, чтобы начать.',
  'Run qwen --debug to see error logs':
    'Запустите coddy-tui --debug для просмотра журналов ошибок',

  // MCP OAuth Authentication
  'OAuth Authentication': 'OAuth-аутентификация',
  'Authenticating... Please complete the login in your browser.':
    'Аутентификация... Пожалуйста, завершите вход в браузере.',
  // MCP Tool List
  'No tools available for this server.':
    'Для этого сервера нет доступных инструментов.',
  destructive: 'деструктивный',
  'read-only': 'только чтение',
  'open-world': 'открытый мир',
  idempotent: 'идемпотентный',
  'Tools for {{serverName}}': 'Инструменты для {{serverName}}',
  '{{current}}/{{total}}': '{{current}}/{{total}}',

  // MCP Tool Detail
  required: 'обязательный',
  Parameters: 'Параметры',
  'No tool selected': 'Инструмент не выбран',
  Server: 'Сервер',
  '{{region}} configuration updated successfully.':
    'Конфигурация {{region}} успешно обновлена.',
  'Authenticated successfully with {{region}}. API key and model configs saved to settings.json.':
    'Успешная аутентификация с {{region}}. API Key и конфигурации моделей сохранены в settings.json.',
  'Tip: Use /model to switch between available Coding Plan models.':
    'Совет: Используйте /model для переключения между доступными моделями Coding Plan.',
  'Type something...': 'Введите что-то...',
  Submit: 'Отправить',
  'Submit answers': 'Отправить ответы',
  Cancel: 'Отмена',
  'Your answers:': 'Ваши ответы:',
  '(not answered)': '(не отвечено)',
  'Ready to submit your answers?': 'Готовы отправить свои ответы?',
  '↑/↓: Navigate | ←/→: Switch tabs | Enter: Select':
    '↑/↓: Навигация | ←/→: Переключение вкладок | Enter: Выбор',
  '↑/↓: Navigate | Enter: Select | Esc: Cancel':
    '↑/↓: Навигация | Enter: Выбор | Esc: Отмена',
  'Authenticate using Qwen OAuth':
    'Аутентификация через OAuth (не поддерживается)',
  'Authenticate using Alibaba Cloud Coding Plan':
    'Аутентификация через Alibaba Cloud Coding Plan',
  'Region for Coding Plan (china/global)':
    'Регион для Coding Plan (china/global)',
  'API key for Coding Plan': 'API Key для Coding Plan',
  'Show current authentication status':
    'Показать текущий статус аутентификации',
  'Authentication completed successfully.': 'Аутентификация успешно завершена.',
  'Starting Qwen OAuth authentication...': 'Запуск аутентификации OAuth...',
  'Successfully authenticated with Qwen OAuth.':
    'Успешная аутентификация через OAuth.',
  'Failed to authenticate with Qwen OAuth: {{error}}':
    'Ошибка аутентификации через OAuth: {{error}}',
  'Processing Alibaba Cloud Coding Plan authentication...':
    'Обработка аутентификации Alibaba Cloud Coding Plan...',
  'Successfully authenticated with Alibaba Cloud Coding Plan.':
    'Успешная аутентификация через Alibaba Cloud Coding Plan.',
  'Failed to authenticate with Coding Plan: {{error}}':
    'Ошибка аутентификации через Coding Plan: {{error}}',
  '阿里云百炼 (aliyun.com)': '阿里云百炼 (aliyun.com)',
  Global: 'Глобальный',
  'Alibaba Cloud (alibabacloud.com)': 'Alibaba Cloud (alibabacloud.com)',
  'Select region for Coding Plan:': 'Выберите регион для Coding Plan:',
  'Enter your Coding Plan API key: ': 'Введите ваш API Key Coding Plan: ',
  'Select authentication method:': 'Выберите метод аутентификации:',
  '\n=== Authentication Status ===\n': '\n=== Статус аутентификации ===\n',
  '⚠  No authentication method configured.\n':
    '⚠  Метод аутентификации не настроен.\n',
  'Run one of the following commands to get started:\n':
    'Выполните одну из следующих команд для начала:\n',
  '  qwen auth qwen-oauth     - Authenticate with Qwen OAuth (discontinued)':
    '  NEURALDEEP_API_KEY=… + /auth → NeuralDeep  - модели NeuralDeep',
  'Or simply run:': 'Или просто выполните:',
  '  qwen auth                - Interactive authentication setup\n':
    '  coddy-tui auth                - Интерактивная настройка аутентификации\n',
  '✓ Authentication Method: Qwen OAuth': '✓ Метод аутентификации: OAuth',
  '  Type: Free tier (discontinued 2026-04-15)':
    '  Тип: Бесплатный уровень (прекращено 2026-04-15)',
  '  Limit: No longer available': '  Лимит: Больше не доступен',
  'Qwen OAuth free tier was discontinued on 2026-04-15. Run /auth to switch to Coding Plan, OpenRouter, Fireworks AI, or another provider.':
    'Этот способ входа больше не поддерживается. Выполните /auth и выберите NeuralDeep или свой адрес.',
  '✓ Authentication Method: Alibaba Cloud Coding Plan':
    '✓ Метод аутентификации: Alibaba Cloud Coding Plan',
  'Global - Alibaba Cloud': 'Глобальный - Alibaba Cloud',
  '  Region: {{region}}': '  Регион: {{region}}',
  '  Current Model: {{model}}': '  Текущая модель: {{model}}',
  '  Config Version: {{version}}': '  Версия конфигурации: {{version}}',
  '  Status: API key configured\n': '  Статус: API Key настроен\n',
  '⚠  Authentication Method: Alibaba Cloud Coding Plan (Incomplete)':
    '⚠  Метод аутентификации: Alibaba Cloud Coding Plan (Не завершён)',
  '  Issue: API key not found in environment or settings\n':
    '  Проблема: API Key не найден в окружении или настройках\n',
  '  Run `qwen auth coding-plan` to re-configure.\n':
    '  Выполните `coddy-tui auth coding-plan` для повторной настройки.\n',
  '✓ Authentication Method: {{type}}': '✓ Метод аутентификации: {{type}}',
  '  Status: Configured\n': '  Статус: Настроено\n',
  'Failed to check authentication status: {{error}}':
    'Не удалось проверить статус аутентификации: {{error}}',
  'Select an option:': 'Выберите вариант:',
  'Raw mode not available. Please run in an interactive terminal.':
    'Raw-режим недоступен. Пожалуйста, запустите в интерактивном терминале.',
  '(Use ↑ ↓ arrows to navigate, Enter to select, Ctrl+C to exit)\n':
    '(↑ ↓ стрелки для навигации, Enter для выбора, Ctrl+C для выхода)\n',
  'Switch to plan mode or exit plan mode':
    'Переключиться в режим плана или выйти из режима плана',
  'Set how hard reasoning-capable models think ({{tiers}}); mapped and clamped per provider.':
    'Задаёт интенсивность рассуждений у моделей с поддержкой рассуждений ({{tiers}}); сопоставляется и ограничивается для каждого провайдера.',
  'Exited plan mode. Previous approval mode restored.':
    'Режим плана завершён. Предыдущий режим утверждения восстановлен.',
  'Enabled plan mode. The agent will analyze and plan without executing tools.':
    'Режим плана включён. Агент будет анализировать и планировать без выполнения инструментов.',
  'Already in plan mode. Use "/plan exit" to exit plan mode.':
    'Уже в режиме плана. Используйте "/plan exit" для выхода из режима плана.',
  'Not in plan mode. Use "/plan" to enter plan mode first.':
    'Не в режиме плана. Сначала используйте "/plan" для входа в режим плана.',
  "Set up Qwen Code's status line UI":
    'Настроить интерфейс строки состояния Coddy',

  // === Core: added from PR #3328 ===
  'Open the memory manager.': 'Открыть менеджер памяти.',
  'Save a durable memory to the memory system.':
    'Сохранить долгосрочную память в системе памяти.',
  Tools: 'Инструменты',
  prompts: 'Подсказки',
  tools: 'инструменты',
  'Open MCP management dialog': 'Открыть диалог управления MCP',
  'Manage MCP servers': 'Управление MCP servers',
  'Manage extension settings': 'Управление настройками расширения',
  'Manage Extensions': 'Управление расширениями',
  'Extension Details': 'Сведения о расширении',
  'View Extension': 'Просмотреть расширение',
  'Update Extension': 'Обновить расширение',
  'Disable Extension': 'Отключить расширение',
  'Enable Extension': 'Включить расширение',
  'Uninstall Extension': 'Удалить расширение',
  'Select Scope': 'Выбрать область',
  'User Scope': 'Область пользователя',
  'Workspace Scope': 'Область рабочего пространства',
  'No extensions found.': 'Расширения не найдены.',
  'Are you sure you want to uninstall extension "{{name}}"?':
    'Вы уверены, что хотите удалить расширение "{{name}}"?',
  'This action cannot be undone.': 'Это действие нельзя отменить.',
  'Extension "{{name}}" updated successfully.':
    'Расширение "{{name}}" успешно обновлено.',
  'Name:': 'Имя:',
  'MCP Servers:': 'MCP-серверы:',
  'Settings:': 'Настройки:',
  'View Details': 'Просмотреть сведения',
  'Update failed:': 'Ошибка обновления:',
  'Updating {{name}}...': 'Обновление {{name}}...',
  'Update complete!': 'Обновление завершено!',
  'User (global)': 'Пользователь (глобально)',
  'Workspace (project-specific)': 'Рабочее пространство (для проекта)',
  'Disable "{{name}}" - Select Scope': 'Отключить "{{name}}" - выбрать область',
  'Enable "{{name}}" - Select Scope': 'Включить "{{name}}" - выбрать область',
  'No extension selected': 'Расширение не выбрано',
  '{{count}} extensions installed': 'Установлено расширений: {{count}}',
  'up to date': 'актуально',
  'update available': 'доступно обновление',
  'checking...': 'проверка...',
  'not updatable': 'обновление недоступно',
  'Ask a quick side question without affecting the main conversation':
    'Задать быстрый побочный вопрос, не затрагивая основной разговор',
  'Get a second opinion on the current conversation from a reviewer model':
    'Получить второе мнение о текущем разговоре от модели-рецензента',
  'Consulting advisor...': 'Консультация с советником...',
  'Advisor review failed: {{error}}': 'Ошибка обзора советника: {{error}}',
  'No conversation context available for /advisor':
    'Нет контекста разговора, доступного для /advisor',
  'Focus too long (max {{max}} chars)':
    'Фокус слишком длинный (макс. {{max}} символов)',
  'Another operation is in progress, wait for it to complete before running /advisor':
    'Выполняется другая операция, дождитесь её завершения перед запуском /advisor',
  'No response received.': 'Ответ не получен.',
  'No model configured.': 'Модель не настроена.',
  'Manage Arena sessions': 'Управлять сессиями Arena',
  'Start an Arena session with multiple models competing on the same task':
    'Запустить сессию Arena, где несколько моделей соревнуются на одной и той же задаче',
  'Stop the current Arena session': 'Остановить текущую сессию Arena',
  'Show the current Arena session status':
    'Показать статус текущей сессии Arena',
  'Select a model result and merge its diff into the current workspace':
    'Выбрать результат модели и объединить его diff с текущим рабочим пространством',
  'No running Arena session found.': 'Запущенная сессия Arena не найдена.',
  'No Arena session found. Start one with /arena start.':
    'Сессия Arena не найдена. Запустите её с помощью /arena start.',
  'Arena session is still running. Wait for it to complete or use /arena stop first.':
    'Сессия Arena всё ещё выполняется. Дождитесь её завершения или сначала используйте /arena stop.',
  'No successful agent results to select from. All agents failed or were cancelled.':
    'Нет успешных результатов агентов для выбора. Все агенты завершились с ошибкой или были отменены.',
  'Use /arena stop to end the session.':
    'Используйте /arena stop для завершения сессии.',
  'No idle agent found matching "{{name}}".':
    'Не найден свободный агент, соответствующий "{{name}}".',
  'Failed to apply changes from {{label}}: {{error}}':
    'Не удалось применить изменения от {{label}}: {{error}}',
  'Applied changes from {{label}} to workspace. Arena session complete.':
    'Изменения от {{label}} применены к рабочему пространству. Сессия Arena завершена.',
  'Discard all Arena results and clean up worktrees?':
    'Отменить все результаты Arena и очистить рабочие деревья?',
  'Arena results discarded. All worktrees cleaned up.':
    'Результаты Arena отменены. Все рабочие деревья очищены.',
  'Arena is not supported in non-interactive mode. Use interactive mode to start an Arena session.':
    'Arena не поддерживается в неинтерактивном режиме. Используйте интерактивный режим для запуска сессии Arena.',
  'Arena is not supported in non-interactive mode. Use interactive mode to stop an Arena session.':
    'Arena не поддерживается в неинтерактивном режиме. Используйте интерактивный режим для остановки сессии Arena.',
  'Arena is not supported in non-interactive mode.':
    'Arena не поддерживается в неинтерактивном режиме.',
  'An Arena session exists. Use /arena stop or /arena select to end it before starting a new one.':
    'Сессия Arena уже существует. Используйте /arena stop или /arena select для её завершения перед запуском новой.',
  'Usage: /arena start --models model1,model2 <task>':
    'Использование: /arena start --models model1,model2 <задача>',
  'Models to compete (required, at least 2)':
    'Модели для соревнования (обязательно, минимум 2)',
  'Format: authType:modelId or just modelId':
    'Формат: authType:modelId или просто modelId',
  'Arena requires at least 2 models. Use --models model1,model2 to specify.':
    'Arena требует минимум 2 модели. Используйте --models model1,model2 для указания.',
  'Arena started with {{count}} agents on task: "{{task}}"\nModels:\n{{modelList}}':
    'Arena запущена с {{count}} агентами на задаче: "{{task}}"\nМодели:\n{{modelList}}',
  'Arena panes are running in tmux. Attach with: `{{command}}`':
    'Панели Arena запущены в tmux. Подключитесь с помощью: `{{command}}`',
  '[{{label}}] failed: {{error}}': '[{{label}}] ошибка: {{error}}',
  'Loading suggestions...': 'Загрузка предложений...',
  'Show context window usage breakdown. Use "/context detail" for per-item breakdown.':
    'Показать разбивку использования окна контекста. Используйте "/context detail" для детализации по элементам.',
  'Show per-item context usage breakdown.':
    'Показать разбивку использования контекста по элементам.',

  // === Missing key backfill ===
  'Updating...': 'Обновление...',
  Unknown: 'Неизвестно',
  Error: 'Ошибка',
  'Version:': 'Версия:',
  "Use '/extensions install' to install your first extension.":
    "Используйте '/extensions install', чтобы установить первое расширение.",
  'Value:': 'Значение:',
  'Press c to copy the authorization URL to your clipboard.':
    'Нажмите c, чтобы скопировать URL авторизации в буфер обмена.',
  'Copy request sent to your terminal. If paste is empty, copy the URL above manually.':
    'Запрос копирования отправлен в терминал. Если вставка пуста, скопируйте URL выше вручную.',
  'Cannot write to terminal — copy the URL above manually.':
    'Не удалось записать в терминал — скопируйте URL выше вручную.',
  'Tips:': 'Советы:',
  'Retrying in {{seconds}} seconds… (attempt {{attempt}}/{{maxRetries}})':
    'Повтор через {{seconds}} секунд… (попытка {{attempt}}/{{maxRetries}})',
  'Press Ctrl+Y to retry': 'Нажмите Ctrl+Y, чтобы повторить',
  'No failed request to retry.': 'Нет неудачного запроса для повтора.',
  'to retry last request': 'чтобы повторить последний запрос',
  'Invalid API key. Coding Plan API keys start with "sk-sp-". Please check.':
    'Недействительный API Key. Coding Plan API Keys начинаются с "sk-sp-". Проверьте.',
  'Invalid API key. Pay-as-you-go keys start with "sk-" or "sk-ws-". Token Plan keys ("sk-sp-") need the Token Plan entry instead.':
    'Недействительный API Key. Ключи с оплатой по использованию начинаются с "sk-" или "sk-ws-". Для ключей Token Plan ("sk-sp-") используйте запись Token Plan.',
  'Invalid API key. Token Plan API keys start with "sk-sp-". Generate one from the Token Plan console, or use the Standard API Key entry for a pay-as-you-go key.':
    'Недействительный API Key. Token Plan API Keys начинаются с "sk-sp-". Создайте ключ в консоли Token Plan или используйте запись Standard API Key для ключа с оплатой по использованию.',
  'Lock release warning': 'Предупреждение о снятии блокировки',
  'Metadata write warning': 'Предупреждение о записи метаданных',
  "Subsequent dreams may be skipped as locked until the next session's staleness sweep cleans the file.":
    'Последующие dream-запуски могут пропускаться как заблокированные, пока следующая очистка устаревших сессий не удалит файл.',
  "The scheduler gate did not see this dream's timestamp; the next dream cycle may re-fire sooner than usual.":
    'Планировщик не увидел временную метку этого dream-запуска; следующий цикл dream может запуститься раньше обычного.',
  // === History collapse/expand commands ===
  'Set history to collapse by default when resuming a session':
    'Сворачивать историю по умолчанию при возобновлении сессии',
  'Set history to expand by default when resuming a session':
    'Разворачивать историю по умолчанию при возобновлении сессии',
  'Expand the currently collapsed history transcript':
    'Развернуть свёрнутую историю',
  'Control history display preferences and visibility':
    'Настроить показ истории',
  'History will be collapsed by default for future resumed sessions.':
    'В возобновлённых сессиях история будет свёрнута по умолчанию.',
  'History will be expanded by default for future resumed sessions.':
    'В возобновлённых сессиях история будет развёрнута по умолчанию.',
  'History is already expanded in this session.':
    'История в этой сессии уже развёрнута.',
  'Usage: /history collapse-on-resume|expand-on-resume|expand-now':
    'Использование: /history collapse-on-resume|expand-on-resume|expand-now',
  'History collapsed: {{n}} messages hidden. Use /history expand-now to show.':
    'История свёрнута: {{n}} сообщений скрыто. Используйте /history expand-now для отображения.',

  // === Same-as-English optimization ===
  ' (not in model registry)': ' (не в реестре моделей)',
  'start server': 'запустить сервер',
  '中国 (China)': 'Китай',
  '中国 (China) - 阿里云百炼': 'Китай - 阿里云百炼',

  // Stats Dashboard — Category 2
  'Activity Heatmap': 'Карта активности',
  Less: 'Меньше',
  More: 'Больше',
  Sessions: 'Сессии',
  Duration: 'Длительность',
  Projects: 'Проекты',
  'Loading stats...': 'Загрузка статистики...',
  '(no data)': '(нет данных)',
  d: 'д',
  h: 'ч',
  m: 'м',
  Input: 'Ввод',
  Models: 'Модели',
  'All time': 'За всё время',
  'Last 7 days': 'Последние 7 дней',
  'Last 30 days': 'Последние 30 дней',
  'Show usage statistics dashboard.':
    'Показать панель статистики использования.',

  // Stats Dashboard — keyboard hints (not translated)
  'tab \xB7 esc': 'tab \xB7 esc',
  'tab \xB7 r dates \xB7 \u2190\u2192 month \xB7 esc':
    'tab \xB7 r даты \xB7 \u2190\u2192 месяц \xB7 esc',
  'tab \xB7 r dates \xB7 esc': 'tab \xB7 r даты \xB7 esc',

  // Stats Dashboard — missing labels
  'API Requests': 'API-запросы',
  'Tool Calls': 'Вызовы инструментов',
  'Success rate': 'Успешность',
  'Code Changes': 'Изменения кода',
  Tool: 'Инструмент',
  reqs: 'запр.',
  in: 'вх.',
  out: 'вых.',
  'In/Out': 'Вх/Вых',
  // Update command
  'Exact-version updates require a standalone installation. Install version {{version}} manually using your installation method.':
    'Обновление до указанной версии требует автономной установки. Установите версию {{version}} вручную, используя текущий способ установки.',
  'Check for Qwen Code updates and install if available':
    'Проверить обновления Coddy и установить при наличии',
  'Qwen Code update available! {{current}} → {{latest}}':
    'Доступно обновление Coddy! {{current}} → {{latest}}',
  'A new version of Qwen Code is available! {{current}} → {{latest}}':
    'Доступна новая версия Coddy! {{current}} → {{latest}}',
  'Qwen Code {{version}} is up to date!': 'Coddy {{version}} актуален!',
  'Failed to check for updates ({{reason}}). Please check your network or registry configuration.':
    'Не удалось проверить обновления ({{reason}}). Проверьте сеть или настройки registry.',
  'Update check skipped ({{reason}}) — run /update to retry.':
    'Проверка обновлений пропущена ({{reason}}) — выполните /update для повторной попытки.',
  'registry did not respond within {{seconds}}s':
    'registry не ответил за {{seconds}} с',
  'registry unreachable': 'registry недоступен',
  'registry error': 'ошибка registry',
  'Unable to check for updates: {{reason}}':
    'Невозможно проверить обновления: {{reason}}',
  'Update successful! The new version will be used on your next run.':
    'Обновление успешно! Новая версия будет использована при следующем запуске.',
  'Update downloaded. It will be applied after you exit this session.':
    'Обновление загружено. Оно будет применено после выхода из этого сеанса.',
  'Update failed: {{error}}': 'Ошибка обновления: {{error}}',
  'Downloading update...': 'Загрузка обновления...',
  'Update successful! Please restart Qwen Code to use the new version. Switching model providers before restarting may not work correctly.':
    'Обновление успешно! Перезапустите Coddy, чтобы использовать новую версию. Переключение поставщиков моделей до перезапуска может работать некорректно.',
  'Automatic update failed. Please try updating manually.':
    'Автоматическое обновление не удалось. Попробуйте обновить вручную.',
  'Automatic update failed: {{error}}. Re-run the installer to update manually.':
    'Автоматическое обновление не удалось: {{error}}. Повторно запустите установщик, чтобы обновить вручную.',
  'Running from a local git clone. Please update with "git pull".':
    'Запущено из локального клона Git. Обновите с помощью "git pull".',
  'Running via npx, update not applicable.':
    'Запущено через npx, обновление неприменимо.',
  'Running via pnpx, update not applicable.':
    'Запущено через pnpx, обновление неприменимо.',
  'Running via bunx, update not applicable.':
    'Запущено через bunx, обновление неприменимо.',
  'Installed via Homebrew. Please update with "brew upgrade".':
    'Установлено через Homebrew. Обновите с помощью "brew upgrade".',
  "Locally installed. Please update via your project's package.json.":
    'Установлено локально. Обновите через package.json вашего проекта.',
  'Update requires sudo. Please run:':
    'Для обновления требуется sudo. Выполните:',
  'Standalone install detected. Attempting to automatically update now...':
    'Обнаружена автономная установка. Выполняется попытка автоматического обновления...',
  'Standalone install detected. Please rerun the standalone installer to update:':
    'Обнаружена автономная установка. Повторно запустите автономный установщик для обновления:',
  'Run the following to update:': 'Выполните следующую команду для обновления:',
  'Unable to auto-update this standalone installation. Please reinstall from:':
    'Невозможно автоматически обновить эту автономную установку. Переустановите с:',
  'Manual update required. Please reinstall Qwen Code.':
    'Требуется ручное обновление. Переустановите Coddy.',
  'This session uses the custom sandbox image {{image}}. Update that image and restart Qwen Code.':
    'В этом сеансе используется пользовательский образ песочницы {{image}}. Обновите образ и перезапустите Coddy.',
  'Update Qwen Code on the host, then restart the sandbox.':
    'Обновите Coddy на хосте, затем перезапустите песочницу.',
  'The update will be installed after you exit this session.':
    'Обновление будет установлено после выхода из этого сеанса.',
  'Run /update to install the update on the host.':
    'Запустите /update, чтобы установить обновление на хосте.',
  'Run /update to install the update.':
    'Запустите /update, чтобы установить обновление.',

  // ============================================================================
  // reload-plugins command
  // ============================================================================
  '{{count}} extension': 'расширений: {{count}}',
  '{{count}} extensions': 'расширений: {{count}}',
  '{{count}} command': 'команд: {{count}}',
  '{{count}} commands': 'команд: {{count}}',
  '{{count}} skill': 'навыков: {{count}}',
  '{{count}} skills': 'навыков: {{count}}',
  '{{count}} agent': 'агентов: {{count}}',
  '{{count}} agents': 'агентов: {{count}}',
  '{{count}} workflow': 'рабочих процессов: {{count}}',
  '{{count}} workflows': 'рабочих процессов: {{count}}',
  '{{count}} hook': 'хуков: {{count}}',
  '{{count}} hooks': 'хуков: {{count}}',
  '{{count}} extension MCP server': 'MCP-серверов из расширений: {{count}}',
  '{{count}} extension MCP servers': 'MCP-серверов из расширений: {{count}}',
  '{{count}} extension LSP server': 'LSP-серверов из расширений: {{count}}',
  '{{count}} extension LSP servers': 'LSP-серверов из расширений: {{count}}',
  'Reload extension changes from disk':
    'Перечитать изменения расширений с диска',
  'Reloaded extensions: {{summary}}': 'Расширения перезагружены: {{summary}}',
  'Reload failed: {{message}}': 'Перезагрузка не удалась: {{message}}',
  'Reload failed.': 'Перезагрузка не удалась.',
  'Extensions changed on disk. Run /reload-plugins to apply updates.':
    'Расширения изменились на диске. Выполните /reload-plugins, чтобы применить изменения.',
  'Failed to refresh extension content: {{message}}. Run /reload-plugins to apply updates.':
    'Не удалось обновить содержимое расширений: {{message}}. Выполните /reload-plugins, чтобы применить изменения.',
  'Failed to refresh extension content. Run /reload-plugins to apply updates.':
    'Не удалось обновить содержимое расширений. Выполните /reload-plugins, чтобы применить изменения.',
  'Extension reload did not complete. Run /reload-plugins to try again.':
    'Перезагрузка расширений не завершилась. Выполните /reload-plugins, чтобы повторить.',
  'Session recording stopped after a write failure. New messages for the affected session will not be saved. Check disk space and permissions, then start a new session to resume recording. See the debug log for details.':
    'Запись сеанса остановлена после ошибки записи. Новые сообщения затронутого сеанса не будут сохранены. Проверьте свободное место и разрешения, затем начните новый сеанс, чтобы возобновить запись. Подробности см. в журнале отладки.',
  'Session recording stopped after a write failure. New messages for the affected session will not be saved. Check disk space and permissions, then run `/clear` to start a new recorded session. See the debug log for details.':
    'Запись сеанса остановлена после ошибки записи. Новые сообщения затронутого сеанса не будут сохранены. Проверьте свободное место и разрешения, затем выполните `/clear`, чтобы начать новый записываемый сеанс. Подробности см. в журнале отладки.',

  // ==========================================================================
  // Auto-skill curator (/curator command)
  // ==========================================================================
  'Maintain project auto-skills based on recent use.':
    'Управление автоматическими навыками проекта с учетом недавнего использования.',
  'Show project auto-skill lifecycle status.':
    'Показать состояние жизненного цикла автоматических навыков проекта.',
  'Run project auto-skill lifecycle maintenance.':
    'Запустить обслуживание жизненного цикла автоматических навыков проекта.',
  'Restore an archived project auto-skill.':
    'Восстановить архивированный автоматический навык проекта.',
  'Auto-skill curator': 'Куратор автоматических навыков',
  'Last run: {{time}}': 'Последний запуск: {{time}}',
  'Active: {{count}}': 'Активные: {{count}}',
  'Stale: {{count}}': 'Устаревшие: {{count}}',
  'Archived: {{count}}': 'Архивированные: {{count}}',
  'Stale skills:': 'Устаревшие навыки:',
  'Pinned skills:': 'Закрепленные навыки:',
  'Archived skills:': 'Архивированные навыки:',
  'Dry run complete.': 'Пробный запуск завершен.',
  'Curator run complete.': 'Запуск куратора завершен.',
  'Checked: {{count}}': 'Проверено: {{count}}',
  'First observed: {{count}}': 'Обнаружено впервые: {{count}}',
  'Marked stale: {{count}}': 'Отмечено как устаревшие: {{count}}',
  'Reactivated: {{count}}': 'Повторно активировано: {{count}}',
  'Skipped archive collisions: {{count}}':
    'Пропущено конфликтов архивирования: {{count}}',
  'Archive candidates:': 'Кандидаты на архивирование:',
  'Skipped archive collisions:': 'Пропущенные конфликты архивирования:',
  'Skipped rename errors: {{count}}':
    'Пропущено ошибок переименования: {{count}}',
  'Skipped rename errors:': 'Пропущенные ошибки переименования:',
  '{{verb}}: {{count}}': '{{verb}}: {{count}}',
  'Would archive': 'Будет архивировано',
  Archived: 'Архивировано',
  'Failed to read auto-skill curator status: {{message}}':
    'Не удалось прочитать состояние куратора автоматических навыков: {{message}}',
  'Usage: /curator run [--dry-run]': 'Использование: /curator run [--dry-run]',
  'Failed to run auto-skill curator: {{message}}':
    'Не удалось запустить куратор автоматических навыков: {{message}}',
  'Usage: /curator restore <directory>':
    'Использование: /curator restore <каталог>',
  'Restored auto-skill: {{name}}':
    'Автоматический навык восстановлен: {{name}}',
  'Failed to restore auto-skill: {{message}}':
    'Не удалось восстановить автоматический навык: {{message}}',
  'Exclude an auto-skill from automatic maintenance.':
    'Исключить автоматический навык из автоматического обслуживания.',
  'Return a pinned auto-skill to automatic maintenance.':
    'Вернуть закрепленный автоматический навык в автоматическое обслуживание.',
  'Usage: /curator pin <directory>': 'Использование: /curator pin <каталог>',
  'Usage: /curator unpin <directory>':
    'Использование: /curator unpin <каталог>',
  'Pinned auto-skill: {{name}}': 'Автоматический навык закреплен: {{name}}',
  'Unpinned auto-skill: {{name}}': 'Автоматический навык откреплен: {{name}}',
  'Failed to update auto-skill pin: {{message}}':
    'Не удалось изменить закрепление автоматического навыка: {{message}}',
  'Auto-skill curator changes are disabled in safe mode.':
    'Изменения куратора автоматических навыков отключены в безопасном режиме.',
  'Auto-skill curator changes are only available in trusted workspaces. Trust this folder via `/trust` and try again.':
    'Изменения куратора автоматических навыков доступны только в доверенных рабочих пространствах. Сделайте эту папку доверенной с помощью `/trust` и повторите попытку.',
  'Kept model as {{model}}': 'Оставлена модель {{model}}',
  // coddy: подсказки очереди
  'Ctrl+Q to queue · ↑ to edit queued messages':
    'Ctrl+Enter в очередь · ↑ править очередь',
  'Enter to steer · Ctrl+Q to queue':
    'Enter поправить ход · Ctrl+Enter в очередь',
  // coddy: подсказки opentui — Enter во время ответа прерывает ход
  'Enter to interrupt and send': 'Enter прервать и отправить',
  'Sent after the running tool · ↑ to edit queued messages':
    'уйдёт после инструмента · ↑ править очередь',
  // coddy: окно подтверждения shell-команды
  'Shell command': 'Shell-команда',
  "Yes, and don't ask again for: {{rule}}":
    'Да, и больше не спрашивать для: {{rule}}',
  'Yes, and switch to auto mode':
    'Да, и включить auto: дальше агент решает сам',
  '← → select, Enter edit, Space preview, Delete remove, ↓ exit':
    '← → выбрать, Enter править, пробел посмотреть, Delete убрать, ↓ выйти',
  // coddy: недостающие переводы (дополнено 2026-10-30)
  'click to expand': 'нажмите, чтобы раскрыть',
  '{{n}} new messages (click) ↓': 'новых сообщений: {{n}} (нажмите) ↓',
  'to the latest (click or Ctrl+End) ↓':
    'к последнему (нажмите или Ctrl+End) ↓',
  'less than a minute': 'меньше минуты',
  '{{n}} min': '{{n}} мин',
  '{{h}} h {{m}} min': '{{h}} ч {{m}} мин',
  'requests: {{n}}': 'запросов: {{n}}',
  'tokens: {{in}} in / {{out}} out': 'токенов: {{in}} вход / {{out}} выход',
  'cache {{pct}}%': 'кеш {{pct}}%',
  NeuralDeep: 'NeuralDeep',
  'Read context files:': 'Прочитаны файлы контекста:',
  general: 'общее',
  commands: 'команды',
  'custom-commands': 'свои команды',
  'No background tasks.': 'Фоновых задач нет.',
  'Entered Vim mode. Run /vim again to exit.':
    'Включён режим Vim. Чтобы выйти, снова /vim.',
  '(empty prompt)': '(пустой запрос)',
  'just now': 'только что',
  'Exited Vim mode.': 'Режим Vim выключен.',
  'Unknown command: {{cmd}}': 'Неизвестная команда: {{cmd}}',
  '1 month ago': 'месяц назад',
  '{{n}} months ago': '{{n}} мес. назад',
  '1 week ago': 'неделю назад',
  '{{n}} weeks ago': '{{n}} нед. назад',
  '1 day ago': 'вчера',
  '{{n}} days ago': '{{n}} дн. назад',
  '1 hour ago': 'час назад',
  '{{n}} hours ago': '{{n}} ч назад',
  '1 minute ago': 'минуту назад',
  '{{n}} minutes ago': '{{n}} мин назад',
  'ctrl+o to expand': 'Ctrl+O — раскрыть',
  '/model to change': '/model — сменить',
  'Image #{{n}}': 'Картинка {{n}}',
  'Cannot disable an extension-provided MCP server here.':
    'MCP-сервер из расширения здесь отключить нельзя.',
  'Cleared authentication for "{{name}}".':
    'Аутентификация для "{{name}}" сброшена.',
  'MCP "{{name}}" disabled for all projects.':
    'MCP "{{name}}" отключён для всех проектов.',
  'Enable extension "{{name}}" to manage this MCP server.':
    'Включите расширение "{{name}}", чтобы управлять этим MCP-сервером.',
  'Extension-provided MCP servers cannot be favorited.':
    'MCP-серверы из расширений нельзя добавить в избранное.',
  'User level': 'Уровень пользователя',
  'Project level': 'Уровень проекта',
  'Clipboard image paste is unavailable because the native clipboard module could not be loaded. Reinstall Qwen Code or use the npm installation method.':
    'Вставка изображений из буфера недоступна: не удалось загрузить нативный модуль буфера обмена. Переустановите Coddy или установите через npm.',
  'Clipboard image paste is unavailable: no supported clipboard tool was reached. On Linux, install `wl-clipboard` (Wayland) or `xclip` (X11), or set DISPLAY/WAYLAND_DISPLAY if running headless.':
    'Вставка изображений из буфера недоступна: не найден поддерживаемый инструмент буфера обмена. В Linux установите `wl-clipboard` (Wayland) или `xclip` (X11) либо задайте DISPLAY/WAYLAND_DISPLAY при работе без дисплея.',
  ' · {{marketplace}} (Tab to clear)': ' · {{marketplace}} (Tab — очистить)',
  '"{{name}}" {{state}}.': '"{{name}}": {{state}}.',
  '(Tab / ←→ to switch)': '(Tab / ←→ для переключения)',
  '+ Add new marketplace': '+ Добавить маркетплейс',
  '+ Install a new extension': '+ Установить новое расширение',
  Actions: 'Действия',
  'Add Marketplace': 'Добавить маркетплейс',
  'Add a marketplace in the Sources tab to discover extensions.':
    'Добавьте маркетплейс во вкладке «Источники», чтобы искать расширения.',
  'Add new': 'Добавить',
  'Add to Favorites': 'Добавить в избранное',
  'Added "{{name}}" to favorites.': '"{{name}}" добавлено в избранное.',
  'Added marketplace "{{name}}".': 'Маркетплейс "{{name}}" добавлен.',
  'Adding...': 'Добавление...',
  'Back to extension list': 'Назад к списку расширений',
  'Browse extensions ({{count}})': 'Обзор расширений ({{count}})',
  'By: {{a}}': 'Автор: {{a}}',
  'Change scope': 'Изменить область',
  'Change scope for "{{name}}":': 'Изменить область для "{{name}}":',
  'Changing scope...': 'Смена области...',
  'Uninstalling "{{name}}"...': 'Удаление "{{name}}"...',
  'Update available for "{{name}}".': 'Доступно обновление для "{{name}}".',
  '"{{name}}" is already up to date.': '"{{name}}" уже последней версии.',
  'Checking "{{name}}" for updates...': 'Проверка обновлений для "{{name}}"...',
  '"{{name}}" does not support update checks.':
    '"{{name}}" не поддерживает проверку обновлений.',
  '"{{name}}" cannot be update-checked (Claude marketplace plugins update by reinstalling).':
    'Для "{{name}}" нельзя проверить обновления (плагины маркетплейса Claude обновляются переустановкой).',
  'Failed to check "{{name}}" for updates.':
    'Не удалось проверить обновления для "{{name}}".',
  'Claude plugin marketplace': 'Маркетплейс плагинов Claude',
  Commands: 'Команды',
  'Components:': 'Компоненты:',
  'Could not load this marketplace.': 'Не удалось загрузить этот маркетплейс.',
  'Current: {{scope}}': 'Текущая: {{scope}}',
  Disabled: 'Отключено',
  Discover: 'Обзор',
  'Disabling "{{name}}"...': 'Отключение "{{name}}"...',
  'Disabling MCP "{{name}}"...': 'Отключение MCP "{{name}}"...',
  'Discover extensions': 'Обзор расширений',
  'Discovering extensions...': 'Поиск расширений...',
  'Enabling "{{name}}"...': 'Включение "{{name}}"...',
  'Enabling MCP "{{name}}"...': 'Включение MCP "{{name}}"...',
  'Enter extension source:': 'Введите источник расширения:',
  'Enter marketplace source (Claude format):':
    'Введите источник маркетплейса (формат Claude):',
  'Examples:': 'Примеры:',
  'Extension details': 'Сведения о расширении',
  'Extension v{{version}}': 'Расширение v{{version}}',
  'Extensions are not available in this environment.':
    'Расширения недоступны в этой среде.',
  'Failed to open {{url}}': 'Не удалось открыть {{url}}',
  Favorites: 'Избранное',
  'Global (User Scope)': 'Глобально (пользователь)',
  'Install Extension': 'Установить расширение',
  'Install for the current workspace (project scope)':
    'Установить для текущей рабочей области (проект)',
  'Install for you (user scope)': 'Установить для себя (пользователь)',
  'Install {{count}} extension(s) to which scope?':
    'В какую область установить расширения ({{count}})?',
  Installed: 'Установлено',
  'Installed extension "{{name}}".': 'Расширение "{{name}}" установлено.',
  'Installed extensions ({{count}}):': 'Установленные расширения ({{count}}):',
  'Installed {{count}} extension(s).': 'Установлено расширений: {{count}}.',
  '{{name}}: installed, but the scope rollback failed — it may be disabled at all scopes; re-enable it from the Installed tab.':
    '{{name}}: установлено, но откат области не удался — расширение может быть отключено во всех областях; включите его во вкладке «Установленные».',
  'Could not change scope, and the rollback also failed — "{{name}}" may be disabled at all scopes. Re-enable it from the Installed tab. ({{error}})':
    'Не удалось сменить область, и откат тоже не удался — "{{name}}" может быть отключено во всех областях. Включите его во вкладке «Установленные». ({{error}})',
  'Installed {{ok}}, failed {{fail}}: {{detail}}':
    'Установлено: {{ok}}, ошибок: {{fail}}: {{detail}}',
  'Installing...': 'Установка...',
  'Last updated: {{date}}': 'Обновлено: {{date}}',
  MCP: 'MCP',
  'MCP "{{name}}" {{state}}.': 'MCP "{{name}}": {{state}}.',
  'MCP servers': 'MCP-серверы',
  'Mark for Update': 'Отметить для обновления',
  Marketplaces: 'Маркетплейсы',
  'No extensions discovered.': 'Расширения не найдены.',
  'No extensions match your search.': 'Нет расширений по вашему запросу.',
  'No extensions or marketplaces added yet.':
    'Расширений и маркетплейсов пока нет.',
  'No homepage available.': 'Домашняя страница не указана.',
  'No installable extensions selected.': 'Не выбрано расширений для установки.',
  'No plugins or MCP servers installed.':
    'Плагины и MCP-серверы не установлены.',
  None: 'Нет',
  'Note: Uninstall permanently removes this extension.':
    'Внимание: удаление безвозвратно убирает это расширение.',
  'Open homepage': 'Открыть домашнюю страницу',
  'Project (Workspace)': 'Проект (рабочая область)',
  'Refreshed {{count}} extension(s).': 'Обновлено расширений: {{count}}.',
  'Remove from Favorites': 'Убрать из избранного',
  'Remove marketplace': 'Удалить маркетплейс',
  'Remove marketplace "{{name}}"?': 'Удалить маркетплейс "{{name}}"?',
  'Removed "{{name}}" from favorites.': '"{{name}}" убрано из избранного.',
  'Removed marketplace "{{name}}".': 'Маркетплейс "{{name}}" удалён.',
  'Scope:': 'Область:',
  'Set "{{name}}" scope to {{scope}}.':
    'Для "{{name}}" задана область {{scope}}.',
  Sources: 'Источники',
  'Type to search · Space to toggle · Enter to view · Ctrl+R refresh · Esc to go back':
    'Ввод для поиска · Пробел переключить · Enter открыть · Ctrl+R обновить · Esc назад',
  Uninstall: 'Удалить',
  'Uninstalled "{{name}}".': '"{{name}}" удалено.',
  'Update Now': 'Обновить сейчас',
  'Update marketplace': 'Обновить маркетплейс',
  'Update marketplace (last updated {{date}})':
    'Обновить маркетплейс (обновлён {{date}})',
  'Could not update marketplace "{{name}}".':
    'Не удалось обновить маркетплейс "{{name}}".',
  'Updated "{{name}}".': '"{{name}}" обновлено.',
  'Updated marketplace "{{name}}".': 'Маркетплейс "{{name}}" обновлён.',
  'Use the Discover tab to find and install plugins.':
    'Ищите и устанавливайте плагины во вкладке «Обзор».',
  'Version: {{v}}': 'Версия: {{v}}',
  'Will install:': 'Будет установлено:',
  'Would open: {{url}}': 'Будет открыто: {{url}}',
  'Y/Enter to confirm · N/Esc to cancel': 'Y/Enter подтвердить · N/Esc отмена',
  'Press R to retry · Esc to go back': 'R повторить · Esc назад',
  'Enter to select · R refresh · Esc to go back':
    'Enter выбрать · R обновить · Esc назад',
  'from {{marketplace}}': 'из {{marketplace}}',
  installed: 'установлено',
  '{{count}} Agents': 'Агенты: {{count}}',
  '{{count}} Workflows': 'Рабочие процессы: {{count}}',
  '{{count}} Commands': 'Команды: {{count}}',
  '{{count}} MCP': 'MCP: {{count}}',
  '{{count}} Skills': 'Навыки: {{count}}',
  '{{count}} available extensions': 'Доступно расширений: {{count}}',
  '↑ more above': '↑ ещё выше',
  '↑↓ navigate · Enter open · d remove marketplace · Esc close':
    '↑↓ навигация · Enter открыть · d удалить маркетплейс · Esc закрыть',
  '↑↓ navigate · Enter select · Esc close':
    '↑↓ навигация · Enter выбрать · Esc закрыть',
  '↑↓ navigate · Enter select · d remove marketplace · Esc close':
    '↑↓ навигация · Enter выбрать · d удалить маркетплейс · Esc закрыть',
  '↑↓ navigate · Space enable/disable · f favorite · Enter details · Esc close':
    '↑↓ навигация · Пробел вкл/выкл · f избранное · Enter подробнее · Esc закрыть',
  '↓ more below': '↓ ещё ниже',
  '⚠ Make sure you trust an extension before installing, updating, or using it. We cannot verify what MCP servers, files, or other software an extension includes, or that it works as intended. See the extension homepage for more information.':
    '⚠ Устанавливайте, обновляйте и используйте только расширения, которым доверяете. Мы не можем проверить, какие MCP-серверы, файлы или другие программы входят в расширение и работает ли оно как задумано. Подробнее — на домашней странице расширения.',
  'toolDisplayName.Exec': 'Выполнение',
  'toolDisplayName.Edit': 'Правка',
  'toolDisplayName.WriteFile': 'Запись файла',
  'toolDisplayName.ReadFile': 'Чтение файла',
  'toolDisplayName.ZoomImage': 'Увеличение изображения',
  'toolDisplayName.Grep': 'Grep',
  'toolDisplayName.Glob': 'Glob',
  'toolDisplayName.Shell': 'Команда',
  'toolDisplayName.Shell Command': 'Команда оболочки',
  'toolDisplayName.TodoList': 'Список задач',
  'toolDisplayName.Goal': 'Цель',
  'toolDisplayName.UpdateGoal': 'Обновление цели',
  'toolDisplayName.ProposeGoal': 'Предложение цели',
  'toolDisplayName.SaveMemory': 'Запись в память',
  'toolDisplayName.ManageMemory': 'Управление памятью',
  'toolDisplayName.SearchMemory': 'Поиск в памяти',
  'toolDisplayName.Agent': 'Агент',
  'toolDisplayName.Advisor': 'Советник',
  'toolDisplayName.Artifact': 'Артефакт',
  'toolDisplayName.RecordArtifact': 'Запись артефакта',
  'toolDisplayName.RecordSource': 'Запись источника',
  'toolDisplayName.ReportFindings': 'Отчёт о находках',
  'toolDisplayName.DisplayImage': 'Показ изображения',
  'toolDisplayName.Skill': 'Навык',
  'toolDisplayName.EnterPlanMode': 'Вход в режим плана',
  'toolDisplayName.ExitPlanMode': 'Выход из режима плана',
  'toolDisplayName.WebFetch': 'Загрузка веб-страницы',
  'toolDisplayName.WebSearch': 'Веб-поиск',
  'toolDisplayName.ListFiles': 'Список файлов',
  'toolDisplayName.Lsp': 'LSP',
  'toolDisplayName.AskUserQuestion': 'Вопрос пользователю',
  'toolDisplayName.CronCreate': 'Создание задания по расписанию',
  'toolDisplayName.CronList': 'Задания по расписанию',
  'toolDisplayName.CronDelete': 'Удаление задания по расписанию',
  'toolDisplayName.LoopWakeup': 'Пробуждение цикла',
  'toolDisplayName.AutofixPr': 'Автоисправление PR',
  'toolDisplayName.CreateSubSession': 'Создание подсессии',
  'toolDisplayName.ListAgents': 'Список агентов',
  'toolDisplayName.TaskCreate': 'Создание задачи',
  'toolDisplayName.TaskUpdate': 'Обновление задачи',
  'toolDisplayName.TaskList': 'Список задач',
  'toolDisplayName.TaskStop': 'Остановка задачи',
  'toolDisplayName.TeamCreate': 'Создание команды',
  'toolDisplayName.TeamDelete': 'Удаление команды',
  'toolDisplayName.TeamPlanApproval': 'Утверждение плана команды',
  'toolDisplayName.SendMessage': 'Отправка сообщения',
  'toolDisplayName.RequestShutdown': 'Запрос на завершение',
  'toolDisplayName.StructuredOutput': 'Структурированный вывод',
  'toolDisplayName.Monitor': 'Монитор',
  'toolDisplayName.NotebookEdit': 'Правка ноутбука',
  'toolDisplayName.ToolSearch': 'Поиск инструментов',
  'toolDisplayName.ToolCall': 'Вызов инструмента',
  'toolDisplayName.EnterWorktree': 'Вход в worktree',
  'toolDisplayName.ExitWorktree': 'Выход из worktree',
  'toolDisplayName.Workflow': 'Рабочий процесс',
  'toolDisplayName.ReadMcpResource': 'Чтение ресурса MCP',
  'toolDisplayName.ImageGen': 'Генерация изображения',
  'toolDisplayName.DownsampleImage': 'Уменьшение изображения',
  'toolDisplayName.DownscaleVideo': 'Сжатие видео',
  'toolDisplayName.DownsampleAudio': 'Понижение частоты аудио',
  'toolDisplayName.ExtractKeyframes': 'Извлечение ключевых кадров',
  'toolDisplayName.ExtractAudio': 'Извлечение аудио',
  'toolDisplayName.ClipVideo': 'Фрагмент видео',
  'toolDisplayName.ClipImage': 'Фрагмент изображения',
  'toolDisplayName.ClipAudio': 'Фрагмент аудио',
  'toolDisplayName.CaptionImage': 'Описание изображения',
  'toolDisplayName.CaptionAudio': 'Описание аудио',
  'toolDisplayName.OcrImage': 'Распознавание текста',
  'toolDisplayName.UnderstandVideoSegments': 'Разбор фрагментов видео',
  'toolDisplayName.ConvertImage': 'Конвертация изображения',
  'toolDisplayName.TranscribeAudio': 'Расшифровка аудио',
  'toolDisplayName.RecallMediaMemory': 'Поиск в медиапамяти',
  '[fixed-only: runs via media policies, not the model]':
    '[только фиксированный: запускается медиаполитиками, а не моделью]',
  'show paths for current session files and logs':
    'показать пути к файлам и логам текущей сессии',
  'Move this session to a new working directory':
    'Перенести сессию в новую рабочую папку',
  'Fast context compression without AI. Strips old tool outputs and thinking parts.':
    'Быстрое сжатие контекста без ИИ: убирает старые выводы инструментов и блоки рассуждений.',
  'Copy to clipboard: reply, code (by lang), LaTeX, or Mermaid. N = Nth-latest message, index = block number':
    'Копировать в буфер: ответ, код (по языку), LaTeX или Mermaid. N — N-е сообщение с конца, index — номер блока',
  'Show working-tree change stats versus HEAD':
    'Показать статистику изменений рабочего дерева относительно HEAD',
  'Could not determine current working directory.':
    'Не удалось определить текущую рабочую папку.',
  'Failed to compute git diff stats':
    'Не удалось посчитать статистику git diff',
  'No diff available. Either this is not a git repository, HEAD is missing, or a merge/rebase/cherry-pick/revert is in progress.':
    'Diff недоступен: это не git-репозиторий, нет HEAD или идёт merge/rebase/cherry-pick/revert.',
  'Clean working tree — no changes against HEAD.':
    'Рабочее дерево чистое — изменений относительно HEAD нет.',
  '{{count}} file changed, +{{added}} / -{{removed}}':
    'Изменено файлов: {{count}}, +{{added}} / -{{removed}}',
  '{{count}} files changed, +{{added}} / -{{removed}}':
    'Изменено файлов: {{count}}, +{{added}} / -{{removed}}',
  '{{count}} file changed': 'Изменено файлов: {{count}}',
  '{{count}} files changed': 'Изменено файлов: {{count}}',
  '…and {{hidden}} more (showing first {{shown}})':
    '…и ещё {{hidden}} (показаны первые {{shown}})',
  '(binary)': '(бинарный)',
  '(binary, new)': '(бинарный, новый)',
  '(new)': '(новый)',
  '(new, partial)': '(новый, частично)',
  '(deleted)': '(удалён)',
  '(binary, deleted)': '(бинарный, удалён)',
  'Create a reusable skill from a knowledge source (file, URL, conversation, or text).':
    'Создать переиспользуемый навык из источника знаний (файл, URL, диалог или текст).',
  'The current model or provider does not support native video input for /learn. Switch to a video-capable model on an OpenAI-compatible provider and try again.':
    'Текущая модель или провайдер не поддерживает видео на входе для /learn. Переключитесь на модель с поддержкой видео у OpenAI-совместимого провайдера и повторите.',
  'YouTube page URLs cannot be sent as native video input. Download the video into your workspace and pass the local video file path to /learn.':
    'Ссылки на страницы YouTube нельзя передать как видео. Скачайте видео в рабочую папку и передайте /learn путь к локальному файлу.',
  'The local video could not be attached for /learn.':
    'Не удалось прикрепить локальное видео для /learn.',
  'Code Mode Only (Experimental)': 'Только Code Mode (экспериментально)',
  'Mods (Experimental)': 'Моды (экспериментально)',
  'Enable experimental Mods from enabled extensions in trusted local terminal and headless sessions. Restart required.':
    'Включает экспериментальные моды из включённых расширений в доверенных локальных сессиях терминала и без интерфейса. Нужен перезапуск.',
  'Show skill-specific usage statistics.':
    'Показать статистику использования по навыкам.',
  'The scope to install the extension in: "user" (global, default) or "project" (current workspace only).':
    'Область установки расширения: "user" (глобально, по умолчанию) или "project" (только текущая рабочая область).',
  'Extension "{{name}}" installed successfully and enabled for the current workspace.':
    'Расширение "{{name}}" установлено и включено для текущей рабочей области.',
  'Marketplace "{{name}}" not found.': 'Маркетплейс "{{name}}" не найден.',
  'No marketplace sources added yet.':
    'Источники маркетплейсов пока не добавлены.',
  'No marketplaces added yet.': 'Маркетплейсы пока не добавлены.',
  'Adds a marketplace source (Claude format).':
    'Добавляет источник маркетплейса (формат Claude).',
  'The marketplace source to add: owner/repo (GitHub), a git or https URL, or a local path.':
    'Источник маркетплейса: owner/repo (GitHub), git- или https-URL либо локальный путь.',
  'Removes a marketplace source.': 'Удаляет источник маркетплейса.',
  'The name of the marketplace to remove.': 'Имя удаляемого маркетплейса.',
  'Lists configured marketplace sources.':
    'Показывает настроенные источники маркетплейсов.',
  'Re-fetches a marketplace source and its plugin listing.':
    'Заново загружает источник маркетплейса и список его плагинов.',
  'The name of the marketplace to update.': 'Имя обновляемого маркетплейса.',
  'Manage marketplace sources for discovering extensions.':
    'Управление источниками маркетплейсов для поиска расширений.',
  'You need at least one command before continuing.':
    'Чтобы продолжить, нужна хотя бы одна команда.',
  '--registry is only applicable for npm extensions.':
    '--registry применим только к npm-расширениям.',
  'Custom npm registry URL (only for npm extensions).':
    'URL своего npm-реестра (только для npm-расширений).',
  '--ref is not applicable for npm extensions. Use @version suffix instead (e.g. @scope/package@1.2.0).':
    '--ref не применим к npm-расширениям. Используйте суффикс @version (например, @scope/package@1.2.0).',
  'Installs an extension from a git repository URL, local path, scoped npm package (@scope/name), or claude marketplace (marketplace-url:plugin-name).':
    'Устанавливает расширение из URL git-репозитория, локального пути, scoped npm-пакета (@scope/name) или маркетплейса Claude (marketplace-url:plugin-name).',
  Description: 'Описание',
  'Delete Session': 'Удалить сессию',
  'List installed extensions': 'Показать установленные расширения',
  'Safe mode is on, so no hooks run in this session.':
    'Включён безопасный режим, поэтому хуки в этой сессии не запускаются.',
  'Bare mode is on, so no hooks run in this session.':
    'Включён режим bare, поэтому хуки в этой сессии не запускаются.',
  'All hooks are disabled by the disableAllHooks setting.':
    'Все хуки отключены настройкой disableAllHooks.',
  'Timeout:': 'Таймаут:',
  'Status message:': 'Сообщение статуса:',
  'Condition:': 'Условие:',
  'Options:': 'Параметры:',
  'Skill:': 'Навык:',
  'runs in background': 'в фоне',
  'runs once': 'однократно',
  sequential: 'последовательно',
  'the background agent could not be started.':
    'не удалось запустить фонового агента.',
  'Import MCP servers from Claude configs':
    'Импортировать MCP-серверы из конфигов Claude',
  'View resources': 'Посмотреть ресурсы',
  resource: 'ресурс',
  resources: 'ресурсы',
  'needs authentication': 'нужна аутентификация',
  'No resources available for this server.':
    'У этого сервера нет доступных ресурсов.',
  'Resources for {{serverName}}': 'Ресурсы {{serverName}}',
  'No resource selected': 'Ресурс не выбран',
  'Resource Detail': 'Сведения о ресурсе',
  'URI:': 'URI:',
  'MIME Type:': 'MIME-тип:',
  'Size:': 'Размер:',
  '{{count}} bytes': '{{count}} байт',
  'Reference in chat': 'Упомянуть в чате',
  'MCP server': 'MCP-сервер',
  'MCP resource server': 'MCP-сервер ресурсов',
  'Switch the model for this session (--fast for suggestion model, --voice for voice transcription model, [model-id] to switch immediately).':
    'Сменить модель для этой сессии (--fast — модель подсказок, --voice — модель распознавания речи, [model-id] — переключиться сразу).',
  'Switch the model for this session (--fast for suggestion model, --voice for voice transcription model, --vision for the vision bridge model, --project to persist to project settings, --global to persist to user settings, [model-id] to switch immediately, or [model-id] [prompt] to run a one-off prompt on another model; the inline prompt is sent verbatim without @file expansion).':
    'Сменить модель для этой сессии (--fast — модель подсказок, --voice — модель распознавания речи, --vision — модель-мост для изображений, --project — сохранить в настройки проекта, --global — сохранить в настройки пользователя, [model-id] — переключиться сразу, [model-id] [prompt] — выполнить разовый запрос на другой модели; такой запрос отправляется как есть, без раскрытия @file).',
  'Switch the model for this session (--fast for suggestion model, --voice for voice transcription model, --vision for the vision bridge model, --compaction for chat compression model, --image for the image generation model, --project to persist to project settings, --global to persist to user settings, [model-id] to switch immediately, or [model-id] [prompt] to run a one-off prompt on another model; the inline prompt is sent verbatim without @file expansion).':
    'Сменить модель для этой сессии (--fast — модель подсказок, --voice — модель распознавания речи, --vision — модель-мост для изображений, --compaction — модель сжатия чата, --image — модель генерации изображений, --project — сохранить в настройки проекта, --global — сохранить в настройки пользователя, [model-id] — переключиться сразу, [model-id] [prompt] — выполнить разовый запрос на другой модели; такой запрос отправляется как есть, без раскрытия @file).',
  "Inline one-shot override isn't supported in this mode — run '/model {{model}}' first, then send your prompt.":
    "Разовая подмена модели в этом режиме не поддерживается — сначала выполните '/model {{model}}', затем отправьте запрос.",
  "Inline one-shot override can't switch providers. '{{model}}' belongs to a different provider — run '/model {{model}}' first, then send your prompt.":
    "Разовая подмена не может сменить провайдера: '{{model}}' относится к другому провайдеру — сначала выполните '/model {{model}}', затем отправьте запрос.",
  "⚠ '{{model}}' is not a known image-capable model; the vision bridge may fail on images.":
    "⚠ '{{model}}' не известна как модель с поддержкой изображений; мост для изображений может не сработать.",
  'Toggle voice dictation input': 'Включить/выключить голосовой ввод',
  'Set the model for voice transcription': 'Задать модель распознавания речи',
  'Set the image-capable model used to transcribe images for a text-only main model':
    'Задать модель с поддержкой изображений, которая описывает их для текстовой основной модели',
  'Set the model used to generate images':
    'Задать модель генерации изображений',
  'Set the model used for chat compression (auto-compaction)':
    'Задать модель сжатия чата (автосжатие)',
  'Persist the model selection to the project settings (workspace scope)':
    'Сохранить выбор модели в настройки проекта (рабочая область)',
  'Persist the model selection to the user settings (global scope)':
    'Сохранить выбор модели в настройки пользователя (глобально)',
  'Select Fast Model': 'Выбор быстрой модели',
  'Select Vision Model': 'Выбор модели для изображений',
  'Select Image Model': 'Выбор модели генерации изображений',
  'Select Compaction Model': 'Выбор модели сжатия',
  'Select Voice Model': 'Выбор голосовой модели',
  'Vision Model': 'Модель для изображений',
  'Image Model': 'Модель генерации изображений',
  'Compaction Model': 'Модель сжатия',
  'Compaction model override cleared': 'Модель сжатия сброшена',
  'Current compaction model: {{compactionModel}}\nUse "/model --compaction <model-id>" to set compaction model, or "/model --compaction clear" to clear the override.':
    'Текущая модель сжатия: {{compactionModel}}\nЗадать: "/model --compaction <model-id>", сбросить: "/model --compaction clear".',
  'not set (falls back to the main model)':
    'не задана (используется основная модель)',
  'Configure models in settings.modelProviders and ensure the required environment variables are set. In interactive mode, run /auth to configure or switch providers, or run /model --compaction without a model to choose from configured models.':
    'Настройте модели в settings.modelProviders и задайте нужные переменные окружения. В интерактивном режиме выполните /auth, чтобы настроить или сменить провайдера, или /model --compaction без модели, чтобы выбрать из настроенных.',
  'Voice Model': 'Голосовая модель',
  'Selected compaction model is unavailable.':
    'Выбранная модель сжатия недоступна.',
  'Selected voice model is unavailable.':
    'Выбранная голосовая модель недоступна.',
  'Selected image model is unavailable.':
    'Выбранная модель генерации изображений недоступна.',
  "Voice model '{{model}}' is configured more than once. Remove duplicate model ids before selecting it for voice transcription.":
    "Голосовая модель '{{model}}' настроена несколько раз. Уберите дубли id модели, прежде чем выбирать её для распознавания речи.",
  'Voice dictation: {{status}} (mode: {{mode}}, {{modelText}}).':
    'Голосовой ввод: {{status}} (режим: {{mode}}, {{modelText}}).',
  'model: {{voiceModel}}': 'модель: {{voiceModel}}',
  'no voice model selected': 'голосовая модель не выбрана',
  'Voice dictation disabled.': 'Голосовой ввод выключен.',
  'Usage: /voice [hold|tap|off|status]':
    'Использование: /voice [hold|tap|off|status]',
  'No voice model selected. Run /model --voice to choose one before enabling voice dictation.':
    'Голосовая модель не выбрана. Выберите её через /model --voice, прежде чем включать голосовой ввод.',
  'Voice dictation enabled (tap mode). Tap Space at an empty prompt to start, tap again or pause to stop and submit, using {{voiceModel}}.':
    'Голосовой ввод включён (режим tap). Нажмите Пробел в пустой строке, чтобы начать; нажмите ещё раз или сделайте паузу, чтобы закончить и отправить. Модель: {{voiceModel}}.',
  'Voice dictation enabled (hold mode). Hold Space at an empty prompt to dictate with {{voiceModel}}.':
    'Голосовой ввод включён (режим hold). Удерживайте Пробел в пустой строке, чтобы диктовать. Модель: {{voiceModel}}.',
  'No models are configured.': 'Модели не настроены.',
  'Configured models: {{models}}.': 'Настроенные модели: {{models}}.',
  'Configure a unique model id in settings.modelProviders or run /model --voice to select an available model.':
    'Задайте уникальный id модели в settings.modelProviders или выберите доступную модель через /model --voice.',
  "Voice model '{{modelName}}' is not configured.":
    "Голосовая модель '{{modelName}}' не настроена.",
  "Voice model '{{modelName}}' cannot be used for transcription.":
    "Голосовую модель '{{modelName}}' нельзя использовать для распознавания речи.",
  "Voice model '{{modelName}}' cannot be used for transcription. Configure an OpenAI-compatible model with baseUrl in settings.modelProviders.":
    "Голосовую модель '{{modelName}}' нельзя использовать для распознавания речи. Настройте OpenAI-совместимую модель с baseUrl в settings.modelProviders.",
  'Configure an OpenAI-compatible model with baseUrl in settings.modelProviders.':
    'Настройте OpenAI-совместимую модель с baseUrl в settings.modelProviders.',
  'Microphone access is denied. Enable it for your terminal in System Settings → Privacy & Security → Microphone, then restart voice dictation.':
    'Нет доступа к микрофону. Разрешите его для терминала в «Системные настройки → Конфиденциальность и безопасность → Микрофон» и перезапустите голосовой ввод.',
  'Voice dictation is not supported on {{platform}}.':
    'Голосовой ввод не поддерживается на {{platform}}.',
  'Voice dictation needs microphone access, which is unavailable in this WSL session. Use WSLg/PulseAudio, or run Qwen Code on a host with a microphone.':
    'Голосовому вводу нужен микрофон, а в этой сессии WSL он недоступен. Используйте WSLg/PulseAudio или запустите Coddy на машине с микрофоном.',
  'Voice dictation needs microphone access. macOS will ask the first time you record — approve it, then start again. Your first recording may be empty while the dialog is open.':
    'Голосовому вводу нужен доступ к микрофону. При первой записи macOS спросит разрешение — подтвердите и начните снова. Пока открыт диалог, первая запись может оказаться пустой.',
  'Voice: recording': 'Голос: запись',
  'Voice: transcribing': 'Голос: расшифровка',
  'Voice: refining': 'Голос: доработка',
  'listening…': 'слушаю…',
  'transcribing…': 'расшифровка…',
  'refining…': 'доработка…',
  'For teams · Paid · Up to 6,000 requests/5 hrs · All Alibaba Cloud Coding Plan Models':
    'Для команд · Платно · До 6000 запросов за 5 ч · Все модели Coding Plan',
  'For individual developers · Pay per model call · 5-hour/weekly quotas':
    'Для разработчиков · Оплата за вызов модели · Квоты на 5 часов и на неделю',
  Subscribe: 'Оформить',
  'Paid subscription plans from Alibaba Cloud ModelStudio':
    'Платные подписки ModelStudio',
  'Select Subscription Plan': 'Выбор подписки',
  'Alibaba Cloud Token Plan': 'Token Plan (ModelStudio)',
  'Pay-as-you-go tokens · Configure ModelStudio standard API key':
    'Оплата за токены · Стандартный API-ключ ModelStudio',
  'For individuals · Pay-as-you-go tokens · Dedicated Token Plan endpoint':
    'Для частных лиц · Оплата за токены · Отдельный endpoint Token Plan',
  'For teams/companies · Credits deducted by token usage · Dedicated API key and base URL':
    'Для команд и компаний · Списание кредитов по токенам · Отдельные API-ключ и base URL',
  'Token Plan documentation': 'Документация Token Plan',
  ' (this project)': ' (этот проект)',
  ' (global)': ' (глобально)',
  'Current voice model: {{voiceModel}}\nUse "/model --voice <model-id>" to set voice model.':
    'Текущая голосовая модель: {{voiceModel}}\nЗадать: "/model --voice <model-id>".',
  'Current vision model: {{visionModel}}\nUse "/model --vision <model-id>" to set the vision bridge model.':
    'Текущая модель для изображений: {{visionModel}}\nЗадать модель-мост: "/model --vision <model-id>".',
  'Current image model: {{imageModel}}\nUse "/model --image <model-id>" to set the image generation model.':
    'Текущая модель генерации изображений: {{imageModel}}\nЗадать: "/model --image <model-id>".',
  "Voice model '{{modelName}}' is ambiguous. Configure a unique model id before using /model --voice.":
    "Голосовая модель '{{modelName}}' неоднозначна. Задайте уникальный id модели, прежде чем использовать /model --voice.",
  "Image model '{{modelName}}' matches multiple configured endpoints. Run /model --image without an argument and choose the exact endpoint.":
    "Модель изображений '{{modelName}}' совпадает с несколькими настроенными endpoint'ами. Выполните /model --image без аргумента и выберите нужный.",
  "Image model '{{modelName}}' must declare a valid HTTPS baseUrl and credential environment variable.":
    "Для модели изображений '{{modelName}}' нужно указать корректный HTTPS baseUrl и переменную окружения с ключом.",
  "'{{model}}' must declare a valid HTTPS baseUrl and credential environment variable.":
    "Для '{{model}}' нужно указать корректный HTTPS baseUrl и переменную окружения с ключом.",
  '{{count}} queued': 'в очереди: {{count}}',
  'Queue message for the next turn':
    'Поставить сообщение в очередь на следующий ход',
  '{{count}} session': 'сессий: {{count}}',
  '{{count}} sessions': 'сессий: {{count}}',
  '{{count}} topic': 'тем: {{count}}',
  '{{count}} topics': 'тем: {{count}}',
  '{{count}} tokens': 'токенов: {{count}}',
  '{{count}} tool call': 'вызовов инструментов: {{count}}',
  '{{count}} tool calls': 'вызовов инструментов: {{count}}',
  '{{count}} event': 'событий: {{count}}',
  '{{count}} events': 'событий: {{count}}',
  '{{count}} dropped': 'отброшено: {{count}}',
  'pid {{pid}}': 'pid {{pid}}',
  'exit {{exitCode}}': 'код выхода {{exitCode}}',
  'Sessions reviewing': 'Просмотр сессий',
  Progress: 'Прогресс',
  'Resume blocked': 'Возобновление заблокировано',
  'Working dir': 'Рабочая папка',
  'Output file': 'Файл вывода',
  'Topics touched ({{count}})': 'Затронутые темы ({{count}})',
  '{{count}} more': 'ещё {{count}}',
  'to queue for the next turn': 'в очередь на следующий ход',
  'You can get your Token Plan API key here':
    'API-ключ Token Plan можно получить здесь',
  'API key is stored in settings.env. You can migrate it to a .env file for better security.':
    'API-ключ хранится в settings.env. Для безопасности его можно перенести в файл .env.',
  'New model configurations are available for Alibaba Cloud Coding Plan. Update now?':
    'Для Coding Plan доступны новые конфигурации моделей. Обновить сейчас?',
  'Coding Plan configuration updated successfully. New models are now available.':
    'Конфигурация Coding Plan обновлена. Новые модели доступны.',
  'Coding Plan API key not found. Please re-authenticate with Coding Plan.':
    'API-ключ Coding Plan не найден. Пройдите аутентификацию Coding Plan заново.',
  'Enter Token Plan API Key': 'Введите API-ключ Token Plan',
  'Get or set any setting by dot-path key':
    'Получить или задать любую настройку по ключу через точку',
  'Invalid boolean value: "{{value}}". Use "true" or "false".':
    'Неверное логическое значение: "{{value}}". Используйте "true" или "false".',
  'Cannot toggle a number setting. Provide a value: key=<number>.':
    'Числовую настройку нельзя переключить. Укажите значение: key=<number>.',
  'Invalid number value: "{{value}}".': 'Неверное число: "{{value}}".',
  'Cannot toggle a string setting. Provide a value: key=<value>.':
    'Строковую настройку нельзя переключить. Укажите значение: key=<value>.',
  'Cannot toggle an enum setting. Provide one of: {{options}}.':
    'Настройку-перечисление нельзя переключить. Укажите одно из: {{options}}.',
  'Invalid enum value: "{{value}}". Valid values: {{options}}.':
    'Неверное значение: "{{value}}". Допустимые: {{options}}.',
  'Setting "{{type}}" type cannot be set via /config. Edit settings.json directly.':
    'Настройку типа "{{type}}" нельзя задать через /config. Правьте settings.json напрямую.',
  'Unsupported setting type: "{{type}}".':
    'Неподдерживаемый тип настройки: "{{type}}".',
  'Available settings:': 'Доступные настройки:',
  'Unknown setting key: "{{key}}". Did you mean "{{suggestion}}"?':
    'Неизвестный ключ настройки: "{{key}}". Может, "{{suggestion}}"?',
  'Unknown setting key: "{{key}}".': 'Неизвестный ключ настройки: "{{key}}".',
  'Failed to set "{{key}}": {{error}}':
    'Не удалось задать "{{key}}": {{error}}',
  'Set {{key}} = {{value}}': 'Задано: {{key}} = {{value}}',
  '(This setting requires a restart to take effect.)':
    '(Чтобы настройка вступила в силу, нужен перезапуск.)',
  '(Security-sensitive setting — verify you are not exposing credentials.)':
    '(Настройка влияет на безопасность — убедитесь, что не раскрываете учётные данные.)',
  'Setting tools.approvalMode to "yolo" is blocked via /config for security reasons. Edit settings.json directly if you understand the risks.':
    'Задать tools.approvalMode = "yolo" через /config нельзя из соображений безопасности. Если понимаете риски, правьте settings.json напрямую.',
  '(empty)': '(пусто)',
  'Choose the output style that shapes how responses are written ({{styles}}, or a custom style name).':
    'Выбрать стиль вывода, который задаёт манеру ответов ({{styles}} или имя своего стиля).',
  'It is saved but does not apply while this workspace is untrusted.':
    'Сохранено, но не действует, пока рабочая область не доверенная.',
  'Set or control a session goal': 'Задать цель сессии или управлять ею',
  'Show current process memory diagnostics':
    'Показать диагностику памяти текущего процесса',
  'Record a CPU profile for Chrome DevTools analysis':
    'Записать CPU-профиль для анализа в Chrome DevTools',
  'Roll back a standalone update to the previous version':
    'Откатить автономную установку к предыдущей версии',
  'Rollback is not available in ACP mode.': 'Откат недоступен в режиме ACP.',
  'Rollback is only available for standalone installations.':
    'Откат доступен только для автономной установки.',
  'Rollback successful. Restart your terminal to use the previous version.':
    'Откат выполнен. Перезапустите терминал, чтобы использовать предыдущую версию.',
  'Rollback failed:': 'Откат не удался:',
  'Rollback on Windows requires manual intervention. Rename qwen-code.old to qwen-code in your installation directory.':
    'В Windows откат выполняется вручную: в папке установки переименуйте резервную копию с суффиксом .old обратно в исходное имя.',
  'Configure the Advisor model': 'Настроить модель-советника',
  'Disable Advisor': 'Отключить советника',
  'Select Advisor Model': 'Выбор модели-советника',
  'Advisor disabled': 'Советник отключён',
  'Advisor set to {{model}}': 'Советник: {{model}}',
  'Selected Advisor model is unavailable.':
    'Выбранная модель-советник недоступна.',
  'Advisor configuration is unavailable.': 'Настройка советника недоступна.',
  'No compression needed.': 'Сжатие не требуется.',
  'Session duration: {{duration}}': 'Длительность сессии: {{duration}}',
  'Prompts: {{count}}': 'Запросы: {{count}}',
  'API requests: {{count}}': 'Запросы к API: {{count}}',
  'Tokens — prompt: {{prompt}}, output: {{output}}':
    'Токены — запрос: {{prompt}}, ответ: {{output}}',
  'Tool calls: {{total}} ({{success}} ok, {{fail}} fail)':
    'Вызовы инструментов: {{total}} (успешно {{success}}, ошибок {{fail}})',
  'Files: +{{added}} / -{{removed}} lines':
    'Файлы: +{{added}} / -{{removed}} строк',
  prompt: 'запрос',
  output: 'ответ',
  cached: 'из кэша',
  'Estimated cost: ${{cost}}': 'Оценка стоимости: ${{cost}}',
  'No model usage data yet.': 'Данных об использовании моделей пока нет.',
  'No tool usage data yet.': 'Данных об использовании инструментов пока нет.',
  'N/A': 'Н/Д',
  days: 'дн.',
  'Tool calls': 'Вызовы инструментов',
  'Code changes': 'Изменения кода',
  Name: 'Название',
  '↑ tabs · r to cycle dates · esc to close':
    '↑ вкладки · r смена дат · esc закрыть',
  Cost: 'Стоимость',
  Session: 'Сессия',
  'Failed to load stats. Press r to retry.':
    'Не удалось загрузить статистику. Нажмите r, чтобы повторить.',
  '⚠️ History gap: earlier conversation was lost before this point (storage interruption) and could not be recovered.':
    '⚠️ Пробел в истории: более ранняя часть диалога потеряна до этого места (сбой хранилища) и не восстановлена.',
  'Precondition check': 'Проверка предусловия',
  'Precondition not met — this scheduled run was skipped.':
    'Предусловие не выполнено — запуск по расписанию пропущен.',
  'The precondition check was cancelled — this scheduled run was skipped.':
    'Проверка предусловия отменена — запуск по расписанию пропущен.',
  'The precondition check was interrupted — this scheduled run was skipped.':
    'Проверка предусловия прервана — запуск по расписанию пропущен.',
  'The precondition check failed — this scheduled run was skipped.':
    'Проверка предусловия не удалась — запуск по расписанию пропущен.',
  'Running this scheduled task in a new session: {{link}}':
    'Запуск задачи по расписанию в новой сессии: {{link}}',
  'This scheduled run could not be started: {{error}}':
    'Не удалось начать запуск по расписанию: {{error}}',
  'Review messages held from other Qwen Code sessions (accept | deny), and manage trusted controllers (controllers | revoke)':
    'Просмотр сообщений, задержанных из других сессий Coddy (accept | deny), и управление доверенными контроллерами (controllers | revoke)',
  'Create a git commit with an AI-drafted message':
    'Создать git-коммит с сообщением от ИИ',
  '⚠  qwen auth has been removed.': '⚠  Команда coddy-tui auth удалена.',
  Interactive: 'Интерактивно',
  'run qwen and use /auth to configure providers':
    'запустите coddy-tui и настройте провайдеров через /auth',
  'CI / Headless': 'CI / без интерфейса',
  'set provider environment variables, for example OPENAI_API_KEY + OPENAI_BASE_URL + OPENAI_MODEL':
    'задайте переменные окружения провайдера, например OPENAI_API_KEY + OPENAI_BASE_URL + OPENAI_MODEL',
  'or pass --openai-api-key, --openai-base-url, --model':
    'или передайте --openai-api-key, --openai-base-url, --model',
  'set BAILIAN_CODING_PLAN_API_KEY and use the Coding Plan base URL for your region':
    'задайте BAILIAN_CODING_PLAN_API_KEY и base URL Coding Plan для своего региона',
  'China: https://coding.dashscope.aliyuncs.com/v1':
    'Китай: https://coding.dashscope.aliyuncs.com/v1',
  'International: https://coding-intl.dashscope.aliyuncs.com/v1':
    'Международный: https://coding-intl.dashscope.aliyuncs.com/v1',
  'Token Plan': 'Token Plan',
  'set BAILIAN_TOKEN_PLAN_API_KEY and use the Token Plan base URL for your region':
    'задайте BAILIAN_TOKEN_PLAN_API_KEY и base URL Token Plan для своего региона',
  'China: https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1':
    'Китай: https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1',
  'International: https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1':
    'Международный: https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
  OpenRouter: 'OpenRouter',
  'set OPENROUTER_API_KEY and OPENAI_BASE_URL=https://openrouter.ai/api/v1':
    'задайте OPENROUTER_API_KEY и OPENAI_BASE_URL=https://openrouter.ai/api/v1',
  Requesty: 'Requesty',
  'set REQUESTY_API_KEY and OPENAI_BASE_URL=https://router.requesty.ai/v1':
    'задайте REQUESTY_API_KEY и OPENAI_BASE_URL=https://router.requesty.ai/v1',
  'run qwen interactively and use /auth; OAuth cannot be configured with env vars alone':
    'запустите coddy-tui интерактивно и используйте /auth; OAuth нельзя настроить только переменными окружения',
  Scripted: 'Скриптом',
  'edit ~/.qwen/settings.json, or run qwen interactively once':
    'отредактируйте ~/.coddy/tui/settings.json или один раз запустите coddy-tui интерактивно',
  'Check auth status': 'Проверить статус аутентификации',
  // coddy: подсказка вместо удалённой команды auth (commands/coddy-auth-notice.ts)
  'set NEURALDEEP_API_KEY and choose NeuralDeep in /auth':
    'задайте NEURALDEEP_API_KEY и выберите NeuralDeep в /auth',
  'Configure authentication (removed)': 'Настроить аутентификацию (удалено)',
  'Installs an extension from a git repository URL, local path or archive, archive URL, scoped npm package (@scope/name), or claude marketplace (marketplace-url:plugin-name).':
    'Устанавливает расширение из URL git-репозитория, локального пути или архива, URL архива, scoped npm-пакета (@scope/name) или маркетплейса Claude (marketplace-url:plugin-name).',
  'The github URL, local path or archive, archive URL, or marketplace source (marketplace-url:plugin-name) of the extension to install.':
    'URL GitHub, локальный путь или архив, URL архива либо источник в маркетплейсе (marketplace-url:plugin-name) устанавливаемого расширения.',
  'Extension "{{name}}" updated with warning {{code}}: {{error}}':
    'Расширение "{{name}}" обновлено с предупреждением {{code}}: {{error}}',
  'Origin:': 'Источник:',
  'The command "/{{command}}" is disabled by the current configuration.':
    'Команда "/{{command}}" отключена текущей конфигурацией.',
  'The command "/{{command}}" is not available here.':
    'Команда "/{{command}}" здесь недоступна.',
  'The command "/{{command}}" is not supported in this mode.':
    'Команда "/{{command}}" не поддерживается в этом режиме.',
  'Models from NeuralDeep, API key NEURALDEEP_API_KEY':
    'Модели NeuralDeep по ключу API NEURALDEEP_API_KEY',
  'Custom Provider': 'Свой провайдер',
  'Manually connect a local server, proxy, or unsupported provider':
    'Подключить вручную локальный сервер, прокси или неподдерживаемого провайдера',
  Protocol: 'Протокол',
  Endpoint: 'Endpoint',
  'Model IDs': 'ID моделей',
  'Advanced Config': 'Дополнительные настройки',
  Review: 'Проверка',
  'Alibaba ModelStudio · Access Method': 'ModelStudio · Способ доступа',
  'Third-party Providers · Provider': 'Сторонние провайдеры · Провайдер',
  'Provider Setup': 'Настройка провайдера',
  '{{flowTitle}} · Step {{step}}/{{total}} · {{stepLabel}}':
    '{{flowTitle}} · Шаг {{step}}/{{total}} · {{stepLabel}}',
  'Enter the API endpoint for this protocol.':
    'Введите endpoint API для этого протокола.',
  Documentation: 'Документация',
  'Enter model IDs directly. Use commas to configure multiple models.':
    'Введите ID моделей. Несколько моделей — через запятую.',
  'Models · from the provider · {{count}} checked':
    'Модели · от провайдера · отмечено: {{count}}',
  'Recommended models': 'Рекомендуемые модели',
  ' · provider list unavailable, showing built-ins':
    ' · список провайдера недоступен, показаны встроенные',
  Search: 'Поиск',
  'Enter model IDs separated by commas. Examples: {{modelIds}}':
    'Введите ID моделей через запятую. Примеры: {{modelIds}}',
  'Enter model IDs separated by commas.': 'Введите ID моделей через запятую.',
  'Loading models from provider…': 'Загрузка моделей от провайдера…',
  'Optional: configure advanced generation settings.':
    'Необязательно: дополнительные настройки генерации.',
  'Enable thinking': 'Включить рассуждения',
  'Allows the model to perform extended reasoning before responding.':
    'Модель сможет подробно рассуждать перед ответом.',
  'Enable modality': 'Включить модальности',
  'Enables multimodal input capabilities (image, video, etc.).':
    'Включает мультимодальный ввод (изображения, видео и т. д.).',
  'Max input tokens (leave empty to auto-detect from model name).':
    'Макс. входных токенов (оставьте пустым, чтобы определить по имени модели).',
  '↑↓ to navigate, Space to toggle, Enter to continue, Esc to go back':
    '↑↓ навигация, Пробел переключить, Enter продолжить, Esc назад',
  'The following JSON will be saved to settings.json:':
    'В settings.json будет сохранён такой JSON:',
  'Enter to save, Esc to go back': 'Enter сохранить, Esc назад',
  'OpenAI-compatible': 'OpenAI-совместимый',
  'Standard OpenAI API format (most common)':
    'Стандартный формат OpenAI API (самый распространённый)',
  'Anthropic-compatible': 'Anthropic-совместимый',
  'Anthropic Messages API format': 'Формат Anthropic Messages API',
  'Gemini-compatible': 'Gemini-совместимый',
  'Google Gemini API format': 'Формат Google Gemini API',
  'Chat Completions': 'Chat Completions',
  Responses: 'Responses',
  'OpenAI Responses API — streaming reasoning + tool use':
    'OpenAI Responses API — потоковые рассуждения + вызов инструментов',
  'Service models saved. Configure a conversation model to start chatting.':
    'Служебные модели сохранены. Настройте модель для диалога, чтобы начать общение.',
  'Service models saved.': 'Служебные модели сохранены.',
  'Successfully configured {{provider}}. Use /model to switch models.':
    '{{provider}} настроен. Сменить модель — /model.',
  'Base URL cannot be empty.': 'Base URL не может быть пустым.',
  'Base URL must start with http:// or https://.':
    'Base URL должен начинаться с http:// или https://.',
  'Model IDs cannot be empty.': 'ID моделей не могут быть пустыми.',
  'This model selection is not available in this session.':
    'Этот выбор модели недоступен в этой сессии.',
  'Format: [authType:]modelId (e.g., openai:gpt-4o or just gpt-4o)':
    'Формат: [authType:]modelId (например, openai:gpt-4o или просто gpt-4o)',
  "Image-only model '{{model}}' cannot be used in an Arena session.":
    "Модель только для изображений '{{model}}' нельзя использовать в сессии Arena.",
  'Authentication configuration is only available in interactive mode. To configure authentication, run Qwen Code interactively and use /auth, or set environment variables: OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL.':
    'Настройка аутентификации доступна только в интерактивном режиме. Запустите Coddy интерактивно и используйте /auth или задайте переменные окружения: OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL.',
  'Config is not available.': 'Конфигурация недоступна.',
  'Failed to answer btw question: {{error}}':
    'Не удалось ответить на вопрос btw: {{error}}',
  'No conversation context available for /btw':
    'Нет контекста диалога для /btw',
  'Please provide a question. Usage: /btw <your question>':
    'Укажите вопрос. Использование: /btw <ваш вопрос>',
  'Question too long (max {{max}} chars)':
    'Вопрос слишком длинный (макс. {{max}} символов)',
  'Compression instructions were truncated to {{max}} characters.':
    'Инструкции для сжатия обрезаны до {{max}} символов.',
  'The /compress-fast command does not accept arguments.':
    'Команда /compress-fast не принимает аргументов.',
  'Invalid {{type}} value: "{{value}}".':
    'Неверное значение {{type}}: "{{value}}".',
  'auto memory': 'автопамять',
  'Usage: /directory add <path>[,<path>,...] or /directory show':
    'Использование: /directory add <path>[,<path>,...] или /directory show',
  'Error saving directories to workspace settings: {{error}}':
    'Не удалось сохранить папки в настройки рабочей области: {{error}}',
  'Safe mode active — skipping memory reload from include directories.':
    'Безопасный режим — перезагрузка памяти из подключённых папок пропущена.',
  'Error notifying model of new directories: {{error}}':
    'Не удалось сообщить модели о новых папках: {{error}}',
  'Directories already in workspace:\n- {{directories}}':
    'Папки уже в рабочей области:\n- {{directories}}',
  'No directories added.': 'Папки не добавлены.',
  'Failed to process /directory add: {{message}}':
    'Не удалось выполнить /directory add: {{message}}',
  'Failed to open browser. View documentation at {{url}}':
    'Не удалось открыть браузер. Документация: {{url}}',
  'Node.js version': 'Версия Node.js',
  'Node.js v{{min}}+ is required. Current: {{version}}':
    'Нужен Node.js v{{min}}+. Сейчас: {{version}}',
  'npm version': 'Версия npm',
  'not found': 'не найден',
  'npm is not available. Some features may not work.':
    'npm недоступен. Некоторые функции могут не работать.',
  Platform: 'Платформа',
  Authentication: 'Аутентификация',
  'API key': 'API-ключ',
  'not configured': 'не настроено',
  'Run /auth to configure authentication.':
    'Выполните /auth, чтобы настроить аутентификацию.',
  'invalid ({{authType}})': 'неверно ({{authType}})',
  'Provider: {{provider}}': 'Провайдер: {{provider}}',
  'Base URL: {{baseUrl}}': 'Base URL: {{baseUrl}}',
  'Model: {{model}}': 'Модель: {{model}}',
  'API key: configured ({{envKey}})': 'API-ключ: настроен ({{envKey}})',
  'API key: {{envKey}} not set': 'API-ключ: {{envKey}} не задан',
  'configured ({{authType}})': 'настроено ({{authType}})',
  'API client': 'API-клиент',
  'config not loaded': 'конфигурация не загружена',
  'client initialized': 'клиент инициализирован',
  'client not initialized': 'клиент не инициализирован',
  'The API client has not been initialized yet.':
    'API-клиент ещё не инициализирован.',
  Configuration: 'Конфигурация',
  'not loaded': 'не загружено',
  'Settings could not be loaded. Check your settings files for syntax errors.':
    'Не удалось загрузить настройки. Проверьте файлы настроек на синтаксические ошибки.',
  loaded: 'загружено',
  'Run /model to select a model.': 'Выполните /model, чтобы выбрать модель.',
  'MCP Servers': 'MCP-серверы',
  'none configured': 'не настроены',
  'configured (not checked in non-interactive mode)':
    'настроено (в неинтерактивном режиме не проверяется)',
  'Server is still starting up.': 'Сервер ещё запускается.',
  'Check that the server process is running and configuration is correct.':
    'Проверьте, что процесс сервера запущен и конфигурация верна.',
  'Tool registry': 'Реестр инструментов',
  '{{count}} tools registered': 'зарегистрировано инструментов: {{count}}',
  Ripgrep: 'Ripgrep',
  available: 'доступен',
  'not available': 'недоступен',
  'Install ripgrep for faster file search: https://github.com/BurntSushi/ripgrep':
    'Установите ripgrep для более быстрого поиска по файлам: https://github.com/BurntSushi/ripgrep',
  'check failed': 'проверка не удалась',
  Git: 'Git',
  'Git features will be limited.': 'Функции Git будут ограничены.',
  'Heap snapshot may contain prompts, file contents, tool results, and other sensitive data. Do not share it publicly without reviewing it first.':
    'Снимок кучи может содержать запросы, содержимое файлов, результаты инструментов и другие чувствительные данные. Не публикуйте его, не просмотрев.',
  'Heap snapshot failed:': 'Не удалось снять снимок кучи:',
  'Writing heap snapshot, this may take a moment...':
    'Запись снимка кучи, это может занять время...',
  'Heap snapshot skipped: V8 heap pressure is already high, and writing a synchronous heap snapshot could make the process unresponsive or trigger OOM. Restart Qwen Code first if it is unstable, or retry before memory pressure reaches the warning threshold.':
    'Снимок кучи пропущен: куча V8 уже сильно заполнена, а синхронная запись снимка может подвесить процесс или вызвать OOM. Если Coddy работает нестабильно, сначала перезапустите его или повторите, пока память не дошла до порога предупреждения.',
  'Heap snapshot written:': 'Снимок кучи записан:',
  'Running diagnostics...': 'Диагностика...',
  'Unknown argument(s)': 'Неизвестные аргументы',
  Usage: 'Использование',
  'Failed to collect memory diagnostics':
    'Не удалось собрать диагностику памяти',
  unavailable: 'недоступно',
  'parse error': 'ошибка разбора',
  'Memory Diagnostics': 'Диагностика памяти',
  'Duration must be between 1 and {max} seconds':
    'Длительность должна быть от 1 до {max} секунд',
  'CPU profiling is already in progress. Wait for it to complete.':
    'CPU-профилирование уже идёт. Дождитесь завершения.',
  'CPU profiling is already in progress. Send SIGUSR1 or wait for it to complete.':
    'CPU-профилирование уже идёт. Отправьте SIGUSR1 или дождитесь завершения.',
  'CPU profile aborted early. Profile saved: {path}':
    'CPU-профиль прерван досрочно. Профиль сохранён: {path}',
  'CPU profile aborted but failed to stop cleanly':
    'CPU-профиль прерван, но остановить его чисто не удалось',
  'Recording CPU profile for {duration}s...':
    'Запись CPU-профиля на {duration} с...',
  'CPU profile was stopped externally. Check ~/.qwen/cpu-profiles/ for the output.':
    'CPU-профиль остановлен извне. Результат ищите в ~/.coddy/tui/cpu-profiles/.',
  'CPU profile was stopped externally (e.g., via SIGUSR1). Check ~/.qwen/cpu-profiles/ for the output.':
    'CPU-профиль остановлен извне (например, через SIGUSR1). Результат ищите в ~/.coddy/tui/cpu-profiles/.',
  'CPU profile written:': 'CPU-профиль записан:',
  'Open in Chrome DevTools → Performance tab → Load profile':
    'Откройте в Chrome DevTools → вкладка Performance → Load profile',
  'Dream completed.': 'Dream завершён.',
  'Failed to process /dream: {{message}}':
    'Не удалось выполнить /dream: {{message}}',
  'The current model does not expose reasoning effort tiers.':
    'Текущая модель не поддерживает уровни усилия рассуждений.',
  'Current reasoning effort: {{current}}\nAvailable: {{tiers}}\nUse "/effort <tier>" to change it.':
    'Текущее усилие рассуждений: {{current}}\nДоступно: {{tiers}}\nСменить: "/effort <tier>".',
  'Reasoning effort: not set (using the model/provider default).\nAvailable: {{tiers}}\nUse "/effort <tier>" to set it.':
    'Усилие рассуждений не задано (используется значение модели/провайдера).\nДоступно: {{tiers}}\nЗадать: "/effort <tier>".',
  'Unknown reasoning effort "{{value}}". Choose one of: {{tiers}}.':
    'Неизвестное усилие рассуждений "{{value}}". Выберите одно из: {{tiers}}.',
  'Settings service not available.': 'Сервис настроек недоступен.',
  'Reasoning effort set to {{tier}}, but thinking is currently disabled; after thinking is re-enabled, {{source}}.{{field}} will still have higher priority.':
    'Усилие рассуждений: {{tier}}, но рассуждения сейчас выключены; после их включения приоритет всё равно останется у {{source}}.{{field}}.',
  'Reasoning effort set to {{tier}}, but thinking is currently disabled — it will take effect when thinking is re-enabled.':
    'Усилие рассуждений: {{tier}}, но рассуждения сейчас выключены — значение заработает, когда их включат снова.',
  'Reasoning effort: {{tier}} requested, but {{source}}.{{field}} has higher priority for the active DashScope Qwen model; that configured value will remain effective.':
    'Усилие рассуждений: запрошено {{tier}}, но для активной модели DashScope приоритет у {{source}}.{{field}}; действовать будет настроенное значение.',
  'Reasoning effort: {{tier}} (requested; the effective tier depends on the active provider/model).':
    'Усилие рассуждений: {{tier}} (запрошено; фактический уровень зависит от активного провайдера/модели).',
  '/extensions explore is only available in interactive mode.':
    '/extensions explore доступна только в интерактивном режиме.',
  'Failed to read extensions: {{error}}':
    'Не удалось прочитать расширения: {{error}}',
  '**Installed Extensions ({{total}} total, {{active}} active)**':
    '**Установленные расширения (всего {{total}}, активных {{active}})**',
  '/extensions install is only available in interactive mode.':
    '/extensions install доступна только в интерактивном режиме.',
  'Extension was installed but could not be reloaded: {{error}}':
    'Расширение установлено, но перезагрузить его не удалось: {{error}}',
  'Failed to process /forget: {{message}}':
    'Не удалось выполнить /forget: {{message}}',
  'No hooks configured. Add hooks in your settings.json file or invoke a skill with hooks.':
    'Хуки не настроены. Добавьте хуки в settings.json или вызовите навык с хуками.',
  'Matcher:': 'Matcher:',
  'Missing value for --from.': 'Не указано значение для --from.',
  'Unknown import source: {{source}}':
    'Неизвестный источник импорта: {{source}}',
  'Expected --scope to be "user" or "project".':
    '--scope должен быть "user" или "project".',
  'Unknown argument: {{arg}}': 'Неизвестный аргумент: {{arg}}',
  'Import MCP servers from Claude configs.':
    'Импортировать MCP-серверы из конфигов Claude.',
  'Usage: /import-config [all|claude-code|claude-desktop] [--scope user|project]':
    'Использование: /import-config [all|claude-code|claude-desktop] [--scope user|project]',
  'Imported {{count}} MCP server(s) to {{scope}} settings: {{names}}':
    'Импортировано MCP-серверов в настройки {{scope}}: {{count}} ({{names}})',
  'No new Claude MCP servers imported into {{scope}} settings.':
    'Новых MCP-серверов Claude в настройки {{scope}} не импортировано.',
  'Skipped existing server(s): {{names}}':
    'Пропущены существующие серверы: {{names}}',
  'Skipped unsupported server name(s): {{names}}':
    'Пропущены неподдерживаемые имена серверов: {{names}}',
  'Checked:': 'Проверено:',
  'Project configuration imports are not available in this session.':
    'Импорт конфигурации проекта недоступен в этой сессии.',
  'Import failed: {{error}}': 'Импорт не удался: {{error}}',
  'Generating insights...': 'Формирование инсайтов...',
  'Insight report generated at: {{path}}': 'Отчёт с инсайтами: {{path}}',
  'Failed to generate insights: {{error}}':
    'Не удалось сформировать инсайты: {{error}}',
  'This may take a couple minutes. Sit tight!':
    'Это может занять пару минут. Подождите!',
  'Starting insight generation...': 'Запуск формирования инсайтов...',
  'Insight report generated successfully!': 'Отчёт с инсайтами сформирован!',
  'Insights generated at: {{path}}. If the browser does not open automatically, open this file manually.':
    'Инсайты сохранены: {{path}}. Если браузер не откроется сам, откройте файл вручную.',
  'Insights ready.': 'Инсайты готовы.',
  'Cannot use both --project and --global. Choose one scope flag.':
    'Нельзя указать одновременно --project и --global. Выберите один флаг области.',
  'Project language settings are not available in this session.':
    'Языковые настройки проекта недоступны в этой сессии.',
  'Workspace is untrusted; run /trust first or use --global.':
    'Рабочая область не доверенная; сначала выполните /trust или используйте --global.',
  'Usage: /learn <path|URL|text> [focus]\nExamples:\n  /learn https://docs.example.com/api\n  /learn ~/projects/acme-sdk\n  /learn Our deploy process: ssh to prod, run migrate, restart':
    'Использование: /learn <path|URL|text> [focus]\nПримеры:\n  /learn https://docs.example.com/api\n  /learn ~/projects/acme-sdk\n  /learn Наш деплой: ssh на прод, migrate, перезапуск',
  'Show LSP server status. Usage: /lsp [status]':
    'Показать статус LSP-серверов. Использование: /lsp [status]',
  'Config not available.': 'Конфигурация недоступна.',
  'LSP is not enabled. Start Qwen Code with `--experimental-lsp` to enable LSP support.':
    'LSP не включён. Запустите Coddy с `--experimental-lsp`, чтобы включить поддержку LSP.',
  'LSP is enabled but no client is connected. Check debug logs under `${QWEN_RUNTIME_DIR:-~/.qwen}/debug/` or see the LSP troubleshooting docs.':
    'LSP включён, но клиент не подключён. Проверьте debug-логи в `${QWEN_RUNTIME_DIR:-~/.coddy/tui}/debug/` или документацию по LSP.',
  'LSP is enabled, but server status is unavailable.':
    'LSP включён, но статус сервера недоступен.',
  'No LSP servers configured. Add a `.lsp.json` file to your project root. See `/help` for details.':
    'LSP-серверы не настроены. Добавьте файл `.lsp.json` в корень проекта. Подробнее — `/help`.',
  "MCP OAuth is now managed in the /mcp dialog. Open /mcp, select '{{serverName}}', then use the Auth actions there.":
    "MCP OAuth теперь управляется в диалоге /mcp. Откройте /mcp, выберите '{{serverName}}' и используйте действия Auth.",
  'MCP OAuth is now managed in the /mcp dialog. Open /mcp, select a server, then use the Auth actions there.':
    'MCP OAuth теперь управляется в диалоге /mcp. Откройте /mcp, выберите сервер и используйте действия Auth.',
  'Usage: /memory migrate-team': 'Использование: /memory migrate-team',
  'Team memory migration requires enabled team memory in a trusted project.':
    'Для миграции командной памяти нужна включённая командная память в доверенном проекте.',
  'Team memory metadata is already complete.':
    'Метаданные командной памяти уже полные.',
  'Team memory migration was not started: {{reason}}':
    'Миграция командной памяти не запущена: {{reason}}',
  'Team memory migration started (task {{taskId}}).':
    'Миграция командной памяти запущена (задача {{taskId}}).',
  'For scripts, pass an auth-qualified selector such as {{selector}}.':
    'Для скриптов передайте селектор с типом аутентификации, например {{selector}}.',
  "Vision model '{{modelName}}' matches multiple configured endpoints.":
    "Модель для изображений '{{modelName}}' совпадает с несколькими настроенными endpoint'ами.",
  'Matching endpoints: {{endpoints}}.': "Подходящие endpoint'ы: {{endpoints}}.",
  'Run /model --vision without an argument and choose the exact endpoint.':
    'Выполните /model --vision без аргумента и выберите нужный endpoint.',
  "'{{model}}' is the current primary model and cannot be used as the vision bridge. Choose a different image-capable model.":
    "'{{model}}' — текущая основная модель, её нельзя использовать как мост для изображений. Выберите другую модель с поддержкой изображений.",
  "Cannot combine {{flag}} with an inline prompt. Run '/model {{flag}} {{model}}' first, then send your prompt.":
    "{{flag}} нельзя совмещать с разовым запросом. Сначала выполните '/model {{flag}} {{model}}', затем отправьте запрос.",
  'Current model: {{model}}\nUse "/model <model-id>" to switch models, "/model --fast <model-id>" to set the fast model, "/model --project <model-id>" to persist to project settings, or "/model --global <model-id>" to persist to user settings.':
    'Текущая модель: {{model}}\nСменить: "/model <model-id>", быстрая модель: "/model --fast <model-id>", сохранить в проект: "/model --project <model-id>", сохранить для пользователя: "/model --global <model-id>".',
  'Output styles are unavailable in --bare and --safe-mode.':
    'Стили вывода недоступны в --bare и --safe-mode.',
  'Current output style: {{current}}\nAvailable: {{styles}}, default\nUse "/output-style <name>" to change it.':
    'Текущий стиль вывода: {{current}}\nДоступно: {{styles}}, default\nСменить: "/output-style <name>".',
  'Output style: default.\nAvailable: {{styles}}\nUse "/output-style <name>" to set one.':
    'Стиль вывода: default.\nДоступно: {{styles}}\nЗадать: "/output-style <name>".',
  'Unknown output style "{{value}}". Choose one of: {{styles}}, or "default" for no style.':
    'Неизвестный стиль вывода "{{value}}". Выберите одно из: {{styles}} или "default" без стиля.',
  'Project output style settings are not available in this session.':
    'Настройки стиля вывода проекта недоступны в этой сессии.',
  'Output style cleared; responses use the default style.':
    'Стиль вывода сброшен; ответы в стиле по умолчанию.',
  'Output style set to {{name}}.': 'Стиль вывода: {{name}}.',
  'It is saved but has no effect in this session because the system prompt is replaced (--system-prompt or QWEN_SYSTEM_MD).':
    'Сохранено, но в этой сессии не действует: системный промпт заменён (--system-prompt или QWEN_SYSTEM_MD).',
  'It is saved but Learning is skipped in headless runs.':
    'Сохранено, но в headless-запусках Learning пропускается.',
  '{{name}} is a personal style, so it will not resolve for anyone else who reads the project settings file it was written to.':
    '{{name}} — личный стиль, у других читателей файла настроек проекта, куда он записан, он не найдётся.',
  '{{name}} is a project style, so it will not resolve in other projects that read your user settings.':
    '{{name}} — стиль проекта, в других проектах, читающих ваши пользовательские настройки, он не найдётся.',
  'Cannot run /recap while another operation is in progress.':
    'Нельзя запустить /recap, пока идёт другая операция.',
  'Not enough conversation context for a recap yet.':
    'Пока мало контекста диалога для пересказа.',
  'Usage: /remember <text to remember>':
    'Использование: /remember <что запомнить>',
  'Auto-generating a title requires a fast model. Configure one with `/model --fast <model>`, or pass a name: `/rename <name>`.':
    'Для автогенерации названия нужна быстрая модель. Настройте её через `/model --fast <model>` или укажите имя: `/rename <name>`.',
  'No conversation to title yet — send at least one message first.':
    'Пока нечего называть — сначала отправьте хотя бы одно сообщение.',
  'The fast model returned no usable title. Try `/rename <name>` to set one yourself.':
    'Быстрая модель не вернула подходящего названия. Задайте его сами: `/rename <name>`.',
  'Title generation was cancelled.': 'Генерация названия отменена.',
  'The fast model could not generate a title (rate limit, auth, network error, or unexpected response format). Check debug log or try again.':
    'Быстрая модель не смогла сгенерировать название (лимит запросов, аутентификация, сеть или неожиданный формат ответа). Проверьте debug-лог или повторите.',
  'Session is still initializing — try again in a moment.':
    'Сессия ещё инициализируется — повторите через мгновение.',
  'Could not generate a title.': 'Не удалось сгенерировать название.',
  'Let the fast model generate a sentence-case title from the conversation so far.':
    'Быстрая модель сгенерирует название по диалогу.',
  'Unknown flag "{{flag}}". Supported: --auto. To use this as a literal name, run `/rename -- {{flag}}`.':
    'Неизвестный флаг "{{flag}}". Поддерживается: --auto. Чтобы использовать это как имя, выполните `/rename -- {{flag}}`.',
  '/rename --auto does not take a name. Use `/rename <name>` to set a name yourself.':
    '/rename --auto не принимает имя. Чтобы задать имя самому, используйте `/rename <name>`.',
  'Generating session title': 'Генерация названия сессии',
  'Name is too long. Maximum {{max}} characters.':
    'Имя слишком длинное. Максимум {{max}} символов.',
  'Failed to rename session.': 'Не удалось переименовать сессию.',
  'Session renamed to "{{name}}"': 'Сессия переименована в "{{name}}"',
  'No session found with ID "{{id}}".': 'Сессия с ID "{{id}}" не найдена.',
  'No session found with title "{{title}}".':
    'Сессия с названием "{{title}}" не найдена.',
  'Could not retrieve skill manager.': 'Не удалось получить менеджер навыков.',
  'All skills are marked as non-user-invocable.':
    'Все навыки помечены как недоступные для вызова пользователем.',
  'Available skills:': 'Доступные навыки:',
  'No skill usage data yet.': 'Данных об использовании навыков пока нет.',
  'Skill calls: {{total}} ({{success}} ok, {{fail}} fail)':
    'Вызовы навыков: {{total}} (успешно {{success}}, ошибок {{fail}})',
  '  {{name}}: {{count}} ({{success}} ok, {{fail}} fail)':
    '  {{name}}: {{count}} (успешно {{success}}, ошибок {{fail}})',
  'Tip: focus the Background tasks pill in the footer (use ↓ from an empty composer) and press Enter for the interactive dialog with detail view + live updates.':
    'Совет: выберите плашку «Фоновые задачи» в нижней строке (↓ из пустой строки ввода) и нажмите Enter — откроется диалог с подробностями и живыми обновлениями.',
  'List workflow runs or cooperatively pause/resume a live run':
    'Показать запуски рабочих процессов или поставить живой запуск на паузу / продолжить',
  '[runId | p <runId>]': '[runId | p <runId>]',
  'Approval Mode': 'Режим подтверждения',
  'Content truncated - resize terminal to review':
    'Содержимое обрезано — увеличьте окно терминала, чтобы посмотреть',
  Current: 'Текущее',
  'Binary file — no diff to view.': 'Бинарный файл — diff не показать.',
  'Oversized file — diff omitted. Use `git diff` to inspect.':
    'Файл слишком большой — diff пропущен. Посмотрите через `git diff`.',
  'No diff content available for this file.':
    'Для этого файла нет содержимого diff.',
  'Turn {{n}}': 'Ход {{n}}',
  'Working tree vs HEAD': 'Рабочее дерево относительно HEAD',
  '(git diff HEAD)': '(git diff HEAD)',
  file: 'файл',
  files: 'файлы',
  'Loading diff…': 'Загрузка diff…',
  '…and up to {{n}} more (showing first {{shown}})':
    '…и ещё до {{n}} (показаны первые {{shown}})',
  '…and {{n}} more (showing first {{shown}})':
    '…и ещё {{n}} (показаны первые {{shown}})',
  '←/→ source · ↑/↓ file · Enter view · Esc close':
    '←/→ источник · ↑/↓ файл · Enter открыть · Esc закрыть',
  '↑/↓ file · Enter view · Esc close': '↑/↓ файл · Enter открыть · Esc закрыть',
  '← back · Esc close': '← назад · Esc закрыть',
  'more file': 'файл ещё',
  'more files': 'файлов ещё',
  ' (deleted)': ' (удалён)',
  ' (untracked)': ' (не отслеживается)',
  ' (oversized — diff omitted)': ' (слишком большой — diff пропущен)',
  ' (new)': ' (новый)',
  ' (truncated)': ' (обрезан)',
  binary: 'бинарный',
  'Binary file — no diff.': 'Бинарный файл — без diff.',
  'No hunks available for {{path}}.': 'Нет фрагментов для {{path}}.',
  'No diff data yet.': 'Данных diff пока нет.',
  'Per-turn diffs are unavailable because file checkpointing is disabled.':
    'Diff по ходам недоступен: чекпоинты файлов отключены.',
  '{{count}} files changed but the diff is too large to list per-file (+{{added}} / -{{removed}}). Use `git diff` for details.':
    'Изменено файлов: {{count}}, но diff слишком большой для списка по файлам (+{{added}} / -{{removed}}). Подробности — `git diff`.',
  'Working tree is clean.': 'Рабочее дерево чистое.',
  'No file changes were captured in this turn.':
    'В этом ходе изменений файлов не зафиксировано.',
  'Reasoning Effort': 'Усилие рассуждений',
  '(applied across all providers; clamped per model)':
    '(применяется ко всем провайдерам; ограничивается под каждую модель)',
  '{{effort}} is not available for this model — using the model/provider default.':
    '{{effort}} недоступно для этой модели — используется значение модели/провайдера.',
  'No effort configured — using the model/provider default.':
    'Усилие не задано — используется значение модели/провайдера.',
  '(Use Enter to select, Esc to cancel)': '(Enter выбрать, Esc отмена)',
  'Please wait while authentication completes...':
    'Дождитесь завершения аутентификации...',
  'Press Esc again to rewind conversation.':
    'Нажмите Esc ещё раз, чтобы откатить диалог.',
  'IDE connecting... context may be unavailable':
    'Подключение к IDE... контекст может быть недоступен',
  'IDE connection unavailable: {{message}}':
    'Подключение к IDE недоступно: {{message}}',
  'workflow active': 'рабочий процесс активен',
  '{{count}} skill(s) pending review': 'навыков ждут проверки: {{count}}',
  'For more help:': 'Ещё помощь:',
  'Tab/Shift+Tab to switch tabs  ·  Esc to cancel':
    'Tab/Shift+Tab переключить вкладки  ·  Esc для отмены',
  'Add files or folders as context': 'Добавить файлы или папки в контекст',
  'Run shell commands': 'Выполнить команды оболочки',
  'Accept ghost text or completion': 'Принять подсказку или автодополнение',
  'Clear input or cancel operation': 'Очистить ввод или отменить операцию',
  'Insert a newline': 'Вставить новую строку',
  'Jump through words': 'Переход по словам',
  'Cycle prompt history': 'Пролистать историю запросов',
  'Qwen Code understands your codebase, makes edits with your permission, and executes commands right from your terminal.':
    'Coddy понимает вашу кодовую базу, вносит правки с вашего разрешения и выполняет команды прямо из терминала.',
  Shortcuts: 'Горячие клавиши',
  'No custom commands are currently available.':
    'Пользовательских команд пока нет.',
  'No commands are currently available.': 'Команд пока нет.',
  'Browse custom, skill, plugin, and MCP commands:':
    'Пользовательские команды, команды навыков, плагинов и MCP:',
  'Browse built-in commands:': 'Встроенные команды:',
  'Use ↑/↓ to scroll': '↑/↓ для прокрутки',
  'subcommands:': 'подкоманды:',
  'Prompt stashed. It will be restored next time.':
    'Запрос отложен. Он вернётся в следующий раз.',
  'Failed to stash prompt.': 'Не удалось отложить запрос.',
  '({{time}}{{tokens}} · esc to cancel)':
    '({{time}}{{tokens}} · esc для отмены)',
  'User memory': 'Память пользователя',
  'Saved in {{path}}': 'Сохранено в {{path}}',
  'Project memory': 'Память проекта',
  Memory: 'Память',
  'Confirm auto-skills before saving: {{status}}':
    'Подтверждать автонавыки перед сохранением: {{status}}',
  ' (endpoint not saved: project settings are shared)':
    ' (endpoint не сохранён: настройки проекта общие)',
  Discontinued: 'Снята с поддержки',
  Off: 'Выкл.',
  "'{{model}}' is the current primary model and cannot be used as the vision bridge.":
    "'{{model}}' — текущая основная модель, её нельзя использовать как мост для изображений.",
  'Model switched, but the selection could not be saved.':
    'Модель переключена, но выбор не удалось сохранить.',
  '(none)': '(нет)',
  'Please configure models in settings.modelProviders or use environment variables.':
    'Настройте модели в settings.modelProviders или через переменные окружения.',
  Estimated: 'Оценка',
  'The standard prompt, with no extra style':
    'Стандартный промпт без дополнительного стиля',
  'Output Style': 'Стиль вывода',
  '(applies now and persists to settings)':
    '(применяется сразу и сохраняется в настройках)',
  'Loading output styles…': 'Загрузка стилей вывода…',
  'Malformed rule: unbalanced parentheses. Use the format ToolName(specifier).':
    'Неверное правило: несбалансированные скобки. Формат: ToolName(specifier).',
  'Model parameters updated (context window, capabilities, etc.)':
    'Параметры моделей обновлены (окно контекста, возможности и т. д.)',
  'Built-in Provider Update · {{provider}}':
    'Обновление встроенного провайдера · {{provider}}',
  'Built-in Provider Updates': 'Обновления встроенных провайдеров',
  'Note: Your selected model is being removed. Please choose a new one with /model.':
    'Внимание: выбранная модель удаляется. Выберите новую через /model.',
  'Tips: Your credentials will not be modified.':
    'Совет: ваши учётные данные не изменятся.',
  'Update all': 'Обновить всё',
  'Skip this version': 'Пропустить эту версию',
  'Remind me later (esc)': 'Напомнить позже (esc)',
  'Qwen OAuth Authentication Error': 'Ошибка аутентификации OAuth',
  'An error occurred during authentication. Please try again.':
    'Во время аутентификации произошла ошибка. Попробуйте ещё раз.',
  'This will remove all conversation after this turn. The prompt will be pre-populated in the input for editing.':
    'Весь диалог после этого хода будет удалён. Запрос подставится в поле ввода для правки.',
  '({{count}} turns)': '(ходов: {{count}})',
  'Resume Session': 'Возобновить сессию',
  '(branch: {{branch}})': '(ветка: {{branch}})',
  '({{count}} matches)': '(совпадений: {{count}})',
  'Search: ': 'Поиск: ',
  'Filter: ': 'Фильтр: ',
  'Press / to search': '/ для поиска',
  'Loading sessions...': 'Загрузка сессий...',
  'No sessions match "{{query}}"': 'Нет сессий по запросу "{{query}}"',
  'No sessions found for branch "{{branch}}"':
    'Нет сессий для ветки "{{branch}}"',
  'No sessions found': 'Сессии не найдены',
  'current — cannot delete': 'текущая — удалить нельзя',
  'Type to search · Enter to commit · Esc to clear':
    'Ввод для поиска · Enter применить · Esc очистить',
  ' to toggle branch · ': ' переключить ветку · ',
  'Space to preview · ': 'Пробел предпросмотр · ',
  'Space to toggle · {{count}} selected · ':
    'Пробел переключить · выбрано: {{count}} · ',
  'Space to select multiple · ': 'Пробел выбрать несколько · ',
  '↑↓ to navigate · Type to search · Esc to cancel':
    '↑↓ навигация · Ввод для поиска · Esc отмена',
  'Session Preview': 'Предпросмотр сессии',
  'Enter to resume · Esc to back': 'Enter возобновить · Esc назад',
  'Loading session preview...': 'Загрузка предпросмотра сессии...',
  'Continue with recovered settings (esc)':
    'Продолжить с восстановленными настройками (esc)',
  'Continue with empty settings (esc)':
    'Продолжить с пустыми настройками (esc)',
  'Settings file corrupted': 'Файл настроек повреждён',
  'Your settings file had invalid JSON. A copy of the corrupted file has been saved for reference.':
    'В файле настроек был некорректный JSON. Копия повреждённого файла сохранена для справки.',
  'Exit and restore corrupted file': 'Выйти и восстановить повреждённый файл',
  Stats: 'Статистика',
  '(←/→ to switch, ↓ to return)': '(←/→ переключить, ↓ вернуться)',
  '(↑ to switch tabs)': '(↑ переключить вкладки)',
  'Failed to load status. Press r to retry.':
    'Не удалось загрузить статус. Нажмите r, чтобы повторить.',
  'Loading status…': 'Загрузка статуса…',
  'Search settings…': 'Поиск настроек…',
  'No settings match your search.': 'Нет настроек по запросу.',
  'shell commands hidden - resize terminal to review':
    'команды оболочки скрыты — увеличьте окно терминала, чтобы посмотреть',
  'Keep this skill': 'Оставить навык',
  'Discard this skill': 'Отбросить навык',
  'Keep all remaining': 'Оставить все остальные',
  'Discard all remaining': 'Отбросить все остальные',
  'Turn off auto-generated skills': 'Выключить автогенерацию навыков',
  'Auto-generated skill — keep it?': 'Автосгенерированный навык — оставить?',
  'Loading preview…': 'Загрузка предпросмотра…',
  'Preview unavailable': 'Предпросмотр недоступен',
  '… preview truncated (file too large) …':
    '… предпросмотр обрезан (файл слишком большой) …',
  'o open in editor · Esc decide later':
    'o открыть в редакторе · Esc решить позже',
  'No skill calls have been made in this session.':
    'В этой сессии навыки не вызывались.',
  'Skill Stats For Nerds': 'Статистика навыков для гиков',
  'Skill Name': 'Навык',
  OK: 'OK',
  Fail: 'Ошибки',
  '(Tab to switch)': '(Tab для переключения)',
  '+{{count}} more (run /stats for the full list)':
    '+ещё {{count}} (полный список — /stats)',
  All: 'Все',
  Files: 'Файлы',
  '(←/→ to switch)': '(←/→ для переключения)',
  'Failed: {{error}}': 'Ошибка: {{error}}',
  Cancelled: 'Отменено',
  'Thinking…': 'Размышление…',
  'Send a message to this agent': 'Отправить сообщение этому агенту',
  'Please select at least 2 models to start an Arena session.':
    'Выберите хотя бы 2 модели, чтобы начать сессию Arena.',
  'Select Models': 'Выбор моделей',
  'No models available. Please configure models first.':
    'Нет доступных моделей. Сначала настройте модели.',
  'Note: qwen-oauth models are not supported in Arena.':
    'Внимание: модели со входом через OAuth в Arena не поддерживаются.',
  'Arena requires at least 2 models. To add more:':
    'Для Arena нужно минимум 2 модели. Чтобы добавить:',
  '  - Run /auth to set up a Coding Plan (includes multiple models)':
    '  - Выполните /auth и настройте Coding Plan (в нём несколько моделей)',
  '  - Or configure modelProviders in settings.json':
    '  - Или настройте modelProviders в settings.json',
  'Configure more models with the modelProviders guide:':
    'Подробнее о настройке моделей — в руководстве по modelProviders:',
  'Space to toggle, Enter to confirm, Esc to cancel':
    'Пробел переключить, Enter подтвердить, Esc отмена',
  'unknown agent': 'неизвестный агент',
  'no longer running': 'больше не работает',
  'nested · level {{level}} of {{max}}':
    'вложенный · уровень {{level}} из {{max}}',
  Parent: 'Родитель',
  'Sub-agents': 'Субагенты',
  Workflow: 'Рабочий процесс',
  agents: 'агенты',
  phase: 'фаза',
  phases: 'фазы',
  Phases: 'Фазы',
  '(no phase recorded yet)': '(фазы пока не записаны)',
  'more above': 'ещё выше',
  '(no phase)': '(без фазы)',
  Logs: 'Логи',
  'Save workflow': 'Сохранить рабочий процесс',
  '{{name}}.js already exists in {{scope}} scope.':
    '{{name}}.js уже есть в области {{scope}}.',
  'Overwrite? Enter / y to confirm · any other key cancels':
    'Перезаписать? Enter / y — да · любая другая клавиша — отмена',
  'Saved to {{path}}': 'Сохранено в {{path}}',
  'Available as /{{name}} on the next session · press any key':
    'Будет доступен как /{{name}} в следующей сессии · нажмите любую клавишу',
  'Press any key to edit the name': 'Нажмите любую клавишу, чтобы изменить имя',
  name: 'имя',
  '(type a name)': '(введите имя)',
  scope: 'область',
  project: 'проект',
  user: 'пользователь',
  'Enter save · Tab scope · Esc cancel':
    'Enter сохранить · Tab область · Esc отмена',
  'Installed {{count}} extension(s) with warnings: {{detail}}':
    'Установлено расширений: {{count}}, с предупреждениями: {{detail}}',
  '"{{name}}" changed with warnings: {{detail}}':
    '"{{name}}" изменено с предупреждениями: {{detail}}',
  'Updated "{{name}}" with warnings: {{warnings}}.':
    '"{{name}}" обновлено с предупреждениями: {{warnings}}.',
  'Set "{{name}}" scope with warnings: {{detail}}':
    'Область "{{name}}" задана с предупреждениями: {{detail}}',
  'Uninstalled "{{name}}" with warnings: {{detail}}':
    '"{{name}}" удалено с предупреждениями: {{detail}}',
  'Prompt:': 'Промпт:',
  'URL:': 'URL:',
  'Exit code': 'Код выхода',
  'Other exit codes': 'Другие коды выхода',
  Matchers: "Matcher'ы",
  'No hooks configured for this matcher.':
    "Для этого matcher'а хуки не настроены.",
  'No matcher selected': 'Matcher не выбран',
  'show stderr to model and block tool call':
    'показать stderr модели и заблокировать вызов инструмента',
  'fire-and-forget; exit status is ignored':
    'без ожидания; код выхода игнорируется',
  'After all tool calls in a batch resolve':
    'После того как все вызовы инструментов в пакете завершены',
  'When instruction files are loaded': 'При загрузке файлов инструкций',
  'Repeatedly, as the assistant reply streams':
    'Многократно, пока идёт поток ответа ассистента',
  'After conversation compaction': 'После сжатия диалога',
  'When the turn ends due to an API error (fires instead of Stop)':
    'Когда ход завершился ошибкой API (срабатывает вместо Stop)',
  'After an explicitly selected session is deleted':
    'После удаления явно выбранной сессии',
  'When AUTO-mode classification denies a tool call':
    'Когда классификация режима AUTO отклоняет вызов инструмента',
  'Input to command is JSON with tool_calls, an array of resolved tool calls containing tool_name, tool_input, tool_use_id, and tool_response.':
    'На вход команде подаётся JSON с tool_calls — массивом завершённых вызовов инструментов с полями tool_name, tool_input, tool_use_id и tool_response.',
  'Input to command is JSON with file_path, memory_type, load_reason, and optional trigger_file_path and parent_file_path.':
    'На вход команде подаётся JSON с file_path, memory_type, load_reason и необязательными trigger_file_path и parent_file_path.',
  'Input to command is JSON with message_id, displayed_text (cumulative text streamed so far), and is_final. Fire-and-forget: output and exit status are ignored.':
    'На вход команде подаётся JSON с message_id, displayed_text (накопленный на данный момент текст) и is_final. Без ожидания: вывод и код выхода игнорируются.',
  'Input to command is JSON with deleted_session_id. It runs after an explicitly selected session is deleted; output and failures are ignored.':
    'На вход команде подаётся JSON с deleted_session_id. Запускается после удаления явно выбранной сессии; вывод и ошибки игнорируются.',
  'Input to command is JSON with trigger (manual/auto) and compact_summary. Output is ignored for control purposes.':
    'На вход команде подаётся JSON с trigger (manual/auto) и compact_summary. Вывод для управления не используется.',
  'Input to command is JSON with error (rate_limit, authentication_failed, billing_error, invalid_request, server_error, max_output_tokens, unknown) and optional error_details. Fire-and-forget: output and exit status are ignored.':
    'На вход команде подаётся JSON с error (rate_limit, authentication_failed, billing_error, invalid_request, server_error, max_output_tokens, unknown) и необязательным error_details. Без ожидания: вывод и код выхода игнорируются.',
  'Input to command is JSON with tool_name, tool_input, tool_use_id, and reason.':
    'На вход команде подаётся JSON с tool_name, tool_input, tool_use_id и reason.',
  Approve: 'Одобрить',
  '↑/↓: Navigate | ←/→: Switch tabs | Space: Toggle | Enter: Confirm | Esc: Cancel':
    '↑/↓: навигация | ←/→: вкладки | Пробел: переключить | Enter: подтвердить | Esc: отмена',
  '↑/↓: Navigate | ←/→: Switch tabs | Enter: Select | Esc: Cancel':
    '↑/↓: навигация | ←/→: вкладки | Enter: выбрать | Esc: отмена',
  '↑/↓: Navigate | Space: Toggle | Enter: Confirm | Esc: Cancel':
    '↑/↓: навигация | Пробел: переключить | Enter: подтвердить | Esc: отмена',
  'Answering...': 'Отвечаю...',
  'Thought briefly': 'Недолго подумал',
  'Thought for': 'Думал',
  Thinking: 'Размышление',
  '(click or {{keyHint}} to expand)':
    '(нажмите или {{keyHint}}, чтобы раскрыть)',
  '({{keyHint}} to expand)': '({{keyHint}} — раскрыть)',
  '({{keyHint}} to collapse)': '({{keyHint}} — свернуть)',
  'o open full plan in editor': 'o открыть весь план в редакторе',
  'Switch to Default Mode and allow once (recommended)':
    'Переключиться в режим Default и разрешить один раз (рекомендуется)',
  'Model: ': 'Модель: ',
  'Compaction thresholds': 'Пороги сжатия',
  'Effective window': 'Эффективное окно',
  'Warn threshold': 'Порог предупреждения',
  'Auto threshold': 'Порог автосжатия',
  'Hard threshold': 'Жёсткий порог',
  'Current tier': 'Текущий уровень',
  'Token usage is estimated until provider usage is received.':
    'Использование токенов оценивается, пока не придут данные от провайдера.',
  'Doctor Report': 'Отчёт диагностики',
  passed: 'пройдено',
  warnings: 'предупреждения',
  failures: 'ошибки',
  'No skills available': 'Нет доступных навыков',
  '(on demand)': '(по запросу)',
  'Tools marked "(on demand)" are not offered to the model upfront; tool_search can load them when enabled. Use tools.eager for eager-by-default tools or tools.visible for on-demand tools to send a schema upfront.':
    'Инструменты с пометкой "(по запросу)" не передаются модели заранее; их может подгрузить tool_search, если он включён. Используйте tools.eager для инструментов, загружаемых сразу, или tools.visible, чтобы заранее отправить схему инструментов по запросу.',
  'Rate limit exceeded. Please wait and try again.':
    'Превышен лимит запросов. Подождите и повторите.',
  'Failed to load output styles: {{error}}':
    'Не удалось загрузить стили вывода: {{error}}',
  'Unknown output style "{{value}}".': 'Неизвестный стиль вывода "{{value}}".',
  'Branched conversation{{titleInfo}}. You are now in the branch.':
    'Диалог разветвлён{{titleInfo}}. Вы теперь в ветке.',
  'To resume the original: /resume {{sessionId}}':
    'Вернуться к исходному: /resume {{sessionId}}',
  'Failed to branch conversation: {{message}}':
    'Не удалось разветвить диалог: {{message}}',
  'A batch delete is already in progress. Please wait.':
    'Пакетное удаление уже идёт. Подождите.',
  'Cannot delete the current active session.':
    'Нельзя удалить текущую активную сессию.',
  'Session deleted successfully.': 'Сессия удалена.',
  'Failed to delete session. Session not found.':
    'Не удалось удалить сессию: сессия не найдена.',
  'Failed to delete session.': 'Не удалось удалить сессию.',
  'Current active session skipped.': 'Текущая активная сессия пропущена.',
  'Deleting {{count}} session(s)...': 'Удаление сессий: {{count}}...',
  'Deleted {{count}} session(s).': 'Удалено сессий: {{count}}.',
  'Deleted {{removed}} session(s); {{failed}} could not be deleted ({{ids}}{{overflow}}){{reason}}.':
    'Удалено сессий: {{removed}}; не удалось удалить {{failed}} ({{ids}}{{overflow}}){{reason}}.',
  'Failed to delete {{failed}} session(s) ({{ids}}{{overflow}}){{reason}}.':
    'Не удалось удалить сессий: {{failed}} ({{ids}}{{overflow}}){{reason}}.',
  'Failed to delete sessions: {{error}}':
    'Не удалось удалить сессии: {{error}}',
  '{{plan}} configuration updated successfully.':
    'Конфигурация {{plan}} обновлена.',
  'Tip: Use /model to switch between available {{plan}} models.':
    'Совет: переключайтесь между моделями {{plan}} через /model.',
  'Failed to update provider configuration: {{message}}':
    'Не удалось обновить конфигурацию провайдера: {{message}}',
  'Failed to save update postponement: {{message}}':
    'Не удалось сохранить отсрочку обновления: {{message}}',
  'Configured via OPENAI_MODEL environment variable':
    'Задано через переменную окружения OPENAI_MODEL',
  'Configured via ANTHROPIC_MODEL environment variable':
    'Задано через переменную окружения ANTHROPIC_MODEL',
  'The preferred editor to open files in.':
    'Редактор, в котором открывать файлы.',
  'Enable Vim keybindings': 'Включить сочетания клавиш Vim',
  'Enable Auto Update': 'Автообновление',
  'Enable automatic update checks and installations on startup.':
    'Проверять и устанавливать обновления автоматически при запуске.',
  'Show Session Recap': 'Показывать сводку сессии',
  'Auto-show a one-line "where you left off" recap when returning to the terminal after being away. Off by default. Use /recap to trigger manually regardless of this setting.':
    'Автоматически показывать однострочную сводку «на чём остановились», когда вы возвращаетесь в терминал после отлучки. По умолчанию выключено. Вручную сводку вызывает /recap независимо от этой настройки.',
  'Session Recap Away Threshold (minutes)': 'Порог отлучки для сводки (мин)',
  "How many minutes the terminal must be blurred before an auto-recap fires on the next focus-in. Matches Claude Code's default of 5 minutes; raise if you briefly alt-tab and do not want recaps to pile up.":
    'Сколько минут терминал должен быть не в фокусе, чтобы при возвращении сработала автосводка. По умолчанию 5 минут, как в Claude Code; увеличьте, если часто ненадолго переключаетесь и не хотите копить сводки.',
  'Cleanup Period (days)': 'Срок хранения (дни)',
  'Number of days to retain ~/.qwen/file-history/ session backups used by /rewind, background subagent transcripts under <projectDir>/subagents/, and session debug logs under the runtime debug/ directory. Data older than this is removed by a background housekeeping pass that runs at most once per day. Set to 0 for minimum retention (~1 hour) — protects sessions touched in the last hour, plus the currently active session.':
    'Сколько дней хранить резервные копии сессий в ~/.coddy/tui/file-history/ для /rewind, транскрипты фоновых субагентов в <projectDir>/subagents/ и debug-логи сессий в папке debug/ среды выполнения. Более старые данные удаляет фоновая очистка не чаще раза в сутки. 0 — минимальный срок (~1 час): сохраняются сессии, затронутые за последний час, и текущая активная сессия.',
  'Add a Co-authored-by trailer to git commit messages AND attach a per-file AI-attribution git note (`refs/notes/ai-attribution`) for commits made through Qwen Code. Disabling skips both.':
    'Добавлять трейлер Co-authored-by в сообщения git-коммитов И прикреплять пофайловую git-заметку об авторстве ИИ (`refs/notes/ai-attribution`) к коммитам через Coddy. Если выключить, не будет ни того, ни другого.',
  'Attribution: PR': 'Авторство: PR',
  'Append a Qwen Code attribution line to PR descriptions when running `gh pr create`.':
    'Добавлять строку об авторстве Coddy в описание PR при `gh pr create`.',
  'The language for the user interface. Use "auto" to detect from system settings. You can also use custom language codes (e.g., "es", "fr") by placing JS language files in ~/.qwen/locales/ (e.g., ~/.qwen/locales/es.js).':
    'Язык интерфейса. "auto" — по системным настройкам. Можно указать и свой код языка (например, "es", "fr"), положив JS-файл языка в ~/.coddy/tui/locales/ (например, ~/.coddy/tui/locales/es.js).',
  'English (English)': 'English (английский)',
  '繁體中文 (Traditional Chinese)': '繁體中文 (традиционный китайский)',
  '中文 (Chinese)': '中文 (китайский)',
  'Русский (Russian)': 'Русский',
  'Deutsch (German)': 'Deutsch (немецкий)',
  '日本語 (Japanese)': '日本語 (японский)',
  'Português (Portuguese)': 'Português (португальский)',
  'Français (French)': 'Français (французский)',
  'Català (Catalan)': 'Català (каталанский)',
  'The language for LLM output. Use "auto" to follow the user input language, or set a specific language.':
    'Язык ответов модели. "auto" — на языке запроса пользователя, либо задайте конкретный язык.',
  'Play terminal bell sound when response completes or needs approval.':
    'Подавать звуковой сигнал терминала, когда ответ готов или нужно подтверждение.',
  'Notification Mode': 'Режим уведомлений',
  'Which unfocused-terminal events fire a bell/OS notification. "all" fires on every tool approval prompt AND on task completion (current behavior). "task-complete" suppresses the per-approval notification and only fires when a long task returns to idle. Requires `terminalBell` to be enabled; otherwise no notifications fire regardless of mode.':
    'Какие события в терминале без фокуса дают сигнал/системное уведомление. "all" — при каждом запросе подтверждения И при завершении задачи (текущее поведение). "task-complete" — без уведомлений о подтверждениях, только когда долгая задача завершилась. Нужен включённый `terminalBell`, иначе уведомлений не будет ни в каком режиме.',
  'All (approvals + task completion)': 'Все (подтверждения + завершение задач)',
  'Task completion only': 'Только завершение задач',
  'Prevent System Sleep While Running':
    'Не давать системе уснуть во время работы',
  'Prevent the system from sleeping while Qwen Code is streaming a model response or executing tools. Idle prompt time and permission prompts do not inhibit sleep.':
    'Не давать системе уснуть, пока Coddy получает ответ модели или выполняет инструменты. Простой в ожидании ввода и запросы разрешений сон не блокируют.',
  'Attribution: review': 'Авторство: review',
  'Append the attribution footer naming the model and CLI version (e.g. "_— qwen3-coder via Qwen Code /review (v0.21.2)_") to review bodies and inline comments posted to GitHub. Disable to post reviews without VISIBLE AI attribution: no footer, and no "**[Critical]**"/"**[Suggestion]**" severity markers on posted comments and body lists. Unattributed posts stay identifiable in the raw source: each posted comment carries an invisible severity marker ("<!-- qwen-review critical -->") and the review body carries a ledger marker ("<!-- qwen-review-ledger ... -->") — anything reading comment bodies (GitHub API automation, the workflows this setting couples to) still recognizes a /review artifact, and presubmit duplicate detection recognizes the reviewing account\'s earlier posts by the severity marker, though unattributed posts from other accounts escape it. Another consequence: qwen-autofix\'s Critical-only mode (engaged after round 5, or earlier when a counting window\'s diff-growth budget trips) no longer recognizes the posted findings as Critical and defers them. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Добавлять подпись с моделью и версией CLI (например, "_— <модель> via … /review (v0.21.2)_") к телу ревью и встроенным комментариям в GitHub. Если выключить, ревью публикуется без ВИДИМОЙ пометки ИИ: без подписи и без меток серьёзности "**[Critical]**"/"**[Suggestion]**" в комментариях и списках. В исходном тексте такие публикации всё равно опознаются: в каждом комментарии есть невидимая метка серьёзности ("<!-- qwen-review critical -->"), а в теле ревью — метка журнала ("<!-- qwen-review-ledger ... -->"). Всё, что читает тела комментариев (автоматизация через GitHub API, связанные с этой настройкой workflow), по-прежнему распознаёт артефакт /review, а проверка дублей перед публикацией узнаёт прежние публикации того же аккаунта по метке серьёзности; публикации без пометки от других аккаунтов она не видит. Ещё следствие: режим qwen-autofix «только Critical» (включается после 5-го раунда или раньше, если в окне подсчёта превышен бюджет роста diff) перестаёт считать опубликованные находки критичными и откладывает их. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Sandbox the reviewed code: review':
    'Песочница для проверяемого кода: review',
  'Run the REVIEWED repository\'s own commands — `npm ci` with its install scripts, the build, the test suite, and every mutation probe — inside a container instead of directly as you. A review executes the code it is reviewing, and today those commands inherit the review process\'s whole environment (on CI that includes the model and GitHub credentials). "auto" uses a container when docker or podman answers and runs directly when neither does; "required" refuses to run them unsandboxed, which makes the evidence that depends on execution (build/test findings, mutation verdicts, `Source: [probe]`) unavailable for that run rather than ending the review; "off" is today\'s behaviour and stays the default, because containerising a build by surprise changes what native modules compile against. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot switch off the containment that exists to contain it.':
    'Запускать команды ПРОВЕРЯЕМОГО репозитория — `npm ci` с его install-скриптами, сборку, тесты и все мутационные пробы — в контейнере, а не напрямую от вашего имени. Ревью выполняет проверяемый код, и сейчас эти команды наследуют всё окружение процесса ревью (в CI это включает ключи модели и GitHub). "auto" — контейнер, если отвечает docker или podman, иначе напрямую; "required" — без песочницы не запускать: тогда в этом прогоне недоступны данные, зависящие от выполнения (находки сборки/тестов, вердикты мутаций, `Source: [probe]`), но ревью не прерывается; "off" — текущее поведение и значение по умолчанию, потому что внезапная контейнеризация сборки меняет то, с чем компилируются нативные модули. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог отключить изоляцию, которая существует для его же изоляции.',
  'Off (run the reviewed code directly)':
    'Выкл. (запускать проверяемый код напрямую)',
  'Auto (container when one is available)': 'Авто (контейнер, если доступен)',
  'Required (never run it unsandboxed)': 'Обязательно (никогда без песочницы)',
  'Default effort: review': 'Усилие по умолчанию: review',
  'Default effort for /review when neither --effort nor a project-remembered explicitly typed level applies. "auto" keeps the built-in rule (high for PRs, medium for local changes). An explicit or remembered level wins; an effective --comment still forces high and --fix still floors at medium. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Усилие по умолчанию для /review, когда не задан ни --effort, ни явно введённый и запомненный для проекта уровень. "auto" сохраняет встроенное правило (high для PR, medium для локальных изменений). Явный или запомненный уровень важнее; действующий --comment всё равно включает high, а --fix — не ниже medium. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Auto (high for PRs, medium for local)':
    'Авто (high для PR, medium для локальных)',
  Low: 'Низкое',
  Medium: 'Среднее',
  High: 'Высокое',
  'Comment by default: review': 'Комментировать по умолчанию: review',
  'Treat every PR /review as if --comment was passed: findings are posted to the pull request without the flag. The post still binds to the PR named in the invocation. Enable only if you always want reviews published. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Считать, что каждому /review для PR передан --comment: находки публикуются в pull request без флага. Публикация всё равно привязана к PR, указанному при вызове. Включайте, только если всегда хотите публиковать ревью. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Posting floor: review': 'Порог публикации: review',
  'The lowest severity a PR /review posts when --severity-floor is not given. "auto" keeps the round-adaptive default: Suggestions post through round 5, and from round 6 only Criticals post while otherwise-postable high-confidence Suggestions are recorded and deferred (low-confidence and Nice-to-have findings stay terminal-only as ever); under "auto", rounds 2-5 additionally defer new Suggestions on code unchanged since the previous round — the same discipline that stops review rounds from ballooning a PR. "critical" applies that posture from round 1; "suggestion" keeps Suggestions posting at every round. Non-PR targets have no rounds and ignore this. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Минимальная серьёзность, которую публикует /review для PR без --severity-floor. "auto" — адаптивно по раундам: Suggestion публикуются до 5-го раунда, с 6-го — только Critical, а публикуемые Suggestion с высокой уверенностью записываются и откладываются (находки с низкой уверенностью и Nice-to-have, как и раньше, только в терминале); при "auto" в раундах 2–5 также откладываются новые Suggestion по коду, не менявшемуся с прошлого раунда, — чтобы раунды ревью не раздували PR. "critical" — такой режим с 1-го раунда; "suggestion" — Suggestion публикуются в каждом раунде. У целей не-PR раундов нет, для них настройка не действует. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Auto (Critical-only from round 6)': 'Авто (только Critical с 6-го раунда)',
  'Critical-only (every round)': 'Только Critical (каждый раунд)',
  'Suggestions and Criticals': 'Suggestion и Critical',
  'Reverse-audit round ceiling: review':
    'Предел раундов обратного аудита: review',
  'Lower the reverse-audit loop\'s round cap for every high-effort review. The cap is normally chosen from the diff topology (10 small / 5 chunked; a huge diff is 3 when the run has a review deadline and 5 when it does not, because that reduction answers a CI ceiling and applies only where one exists) because a round costs one agent on a small diff and ~90 minutes on a huge one; this setting can only LOWER whichever tier applies, never raise it — a value that is not a whole number above zero, or that is out of range (below 3, or above the plan\'s own tier), is ignored and leaves the tier alone — JSON Schema has no integer type here, so a fraction validates in an editor and is then discarded at runtime. Understand what it buys before enabling: the loop ends on two consecutive dry rounds, so cutting the cap does not make reviews converge sooner, it makes them stop before converging more often — and every such stop is disclosed as unreviewed scope and caps the verdict at Comment, so a cheaper review is also one that can no longer Approve. To spend LESS on reviews generally, prefer "effort". Nothing here makes a loop run LONGER: a review deadline bounds a run rather than extending it, and on a huge diff setting one lowers the cap from 5 to 3 rather than raising it. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Понизить предел раундов цикла обратного аудита для всех ревью с высоким усилием. Обычно предел выбирается по топологии diff (10 — малый / 5 — по частям; для огромного diff 3, если у прогона есть дедлайн, и 5, если нет, потому что это снижение отвечает на ограничение CI и действует только там, где оно есть), ведь раунд стоит одного агента на малом diff и ~90 минут на огромном. Настройка может только ПОНИЗИТЬ действующий уровень, но не повысить: значение, которое не является целым числом больше нуля или выходит за диапазон (меньше 3 или больше уровня плана), игнорируется — в JSON Schema здесь нет целого типа, поэтому дробь проходит проверку в редакторе и отбрасывается при выполнении. Прежде чем включать, поймите, что это даёт: цикл завершается после двух пустых раундов подряд, поэтому снижение предела не ускоряет сходимость, а чаще обрывает ревью до неё — и каждый такой обрыв раскрывается как непроверенная часть и ограничивает вердикт уровнем Comment, так что более дешёвое ревью уже не может дать Approve. Чтобы в целом тратить на ревью МЕНЬШЕ, используйте "effort". Ничто здесь не делает цикл ДЛИННЕЕ: дедлайн ревью ограничивает прогон, а не продлевает, а на огромном diff он понижает предел с 5 до 3. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Approach-signal round threshold: review':
    'Порог раундов для сигнала о подходе: review',
  'How many rounds a pull request must reach before the review may add one advisory paragraph saying the shape of the change, rather than the current patch, looks like the open question. It appears only when the diff has also grown several times over since the review first measured it, and never on an Approve. It is disclosure only: it adds no finding, changes no verdict, and blocks nothing — it exists because every finding is anchored to a line in the current diff, so the review can report where an approach leaks but never that a different approach would retire all of the leaks at once. Leave at 0 to keep the built-in threshold of 5 rounds; raise it to make the paragraph appear later, and set it very high to silence it. A value that is not a whole number above zero is ignored. Only honored from User, System, and SystemDefaults settings scopes; values set in Workspace settings are ignored, so a repository cannot set review policy for its reviewers.':
    'Сколько раундов должен пройти pull request, прежде чем ревью может добавить один рекомендательный абзац о том, что открытый вопрос — скорее форма изменения, чем текущий патч. Он появляется, только если diff к тому же вырос в несколько раз с первого замера, и никогда — при Approve. Это только пояснение: оно не добавляет находок, не меняет вердикт и ничего не блокирует. Оно нужно потому, что каждая находка привязана к строке текущего diff, и ревью может показать, где подход протекает, но не может сказать, что другой подход закрыл бы все протечки сразу. 0 — встроенный порог в 5 раундов; увеличьте, чтобы абзац появлялся позже, или задайте очень большое значение, чтобы отключить его. Значение, не являющееся целым числом больше нуля, игнорируется. Учитывается только в областях настроек User, System и SystemDefaults; значения из Workspace игнорируются, чтобы репозиторий не мог задавать политику ревью своим ревьюерам.',
  'Show Timestamps': 'Показывать время',
  'Show [HH:MM:SS] timestamp before each assistant response.':
    'Показывать время [HH:MM:SS] перед каждым ответом ассистента.',
  'The color theme for the UI.': 'Цветовая тема интерфейса.',
  'Disable Workflow Keyword Trigger': 'Не реагировать на слово «workflow»',
  'When true, mentioning the word `workflow` in a prompt no longer softly steers the turn toward the Workflow tool (and the Footer `workflow active` indicator is suppressed). Only applies when workflows are enabled.':
    'Если включено, слово `workflow` в запросе больше не подталкивает ход к инструменту Workflow (и индикатор `workflow active` в нижней строке не показывается). Действует, только когда рабочие процессы включены.',
  'Show Qwen Code session name and status in the terminal window title':
    'Показывать имя сессии Coddy и статус в заголовке окна терминала',
  'Hide helpful tips in the UI': 'Скрывать подсказки в интерфейсе',
  'Show line numbers in the code output.':
    'Показывать номера строк в выводе кода.',
  'Markdown Render Mode': 'Режим отображения Markdown',
  'Default Markdown display mode. Use "render" for rich visual previews, or "raw" to show source-oriented Markdown by default. Toggle during a session with Alt/Option+M; on macOS the terminal must send Option as Meta.':
    'Режим отображения Markdown по умолчанию. "render" — наглядный предпросмотр, "raw" — исходный Markdown. В сессии переключается Alt/Option+M; на macOS терминал должен передавать Option как Meta.',
  'Render visual previews': 'Наглядный предпросмотр',
  'Show raw source': 'Исходный текст',
  'Show Response Tokens Per Second': 'Показывать токены в секунду',
  'Show a live tokens/sec estimate next to the response token counter while the model is streaming. Takes effect in the next session.':
    'Показывать оценку токенов/с рядом со счётчиком токенов, пока модель стримит ответ. Вступает в силу со следующей сессии.',
  'Show welcome back dialog when returning to a project with conversation history. Choosing "Start new chat session" suppresses the dialog for that project until the project summary changes.':
    'Показывать окно «С возвращением» при возврате в проект с историей диалога. Выбор "Start new chat session" скрывает это окно для проекта, пока не изменится сводка проекта.',
  'Show optional feedback dialog after conversations to help improve Qwen performance.':
    'Показывать необязательный запрос отзыва после диалогов, чтобы улучшать качество работы модели.',
  'Enable Follow-up Suggestions': 'Подсказки следующего шага',
  'Show context-aware follow-up suggestions after task completion. Press Tab, Right Arrow, or Enter to accept into the input buffer.':
    'Показывать контекстные подсказки следующего шага после завершения задачи. Tab, стрелка вправо или Enter — принять в поле ввода.',
  'Enable Loading Phrases': 'Фразы во время загрузки',
  'Enable loading phrases (disable for accessibility)':
    'Показывать фразы во время загрузки (отключите для доступности)',
  'Virtualized History (reduces flicker on long sessions)':
    'Виртуальная история (меньше мерцания в длинных сессиях)',
  'Render conversation history in an in-app scrollable viewport instead of the terminal scrollback buffer. Enabled by default in compatible interactive terminals to avoid flicker, scroll-storm, and interface freeze on long sessions, after Ctrl+O, after Ctrl+E / Ctrl+F (expand), after window resize, or when alt-tabbing back. Screen reader mode and non-interactive output such as piped stdout or CI use append-only terminal output instead. Scroll with Shift+↑/↓ (line), PgUp/PgDn (page), Ctrl+Home/End (top/bottom), or the mouse wheel. Also enables mouse interactions: click an option in a menu/dialog to select it, hover to highlight it, and click in the prompt to position the cursor. Does NOT use the host terminal scrollback while enabled. Drag to select text in the viewport (double/triple click selects a word/line), copied on release. To use the terminal’s own selection instead, hold Shift (or Option on macOS) while dragging. A single click opens an http(s) hyperlink under the pointer (other link schemes are copied to the clipboard), and right-click over a link or a text selection opens an in-app context menu. These mouse interactions are controlled by ui.mouseTracking; disable that setting to hand the mouse fully back to the terminal.':
    'Показывать историю диалога во встроенной прокручиваемой области, а не в буфере прокрутки терминала. По умолчанию включено в совместимых интерактивных терминалах, чтобы избежать мерцания, «шторма» прокрутки и зависаний в длинных сессиях — после Ctrl+O, Ctrl+E / Ctrl+F (раскрытие), изменения размера окна или возврата через Alt-Tab. Режим скринридера и неинтерактивный вывод (stdout в pipe, CI) используют обычный вывод в терминал. Прокрутка: Shift+↑/↓ (строка), PgUp/PgDn (страница), Ctrl+Home/End (начало/конец) или колесо мыши. Также включает работу с мышью: клик по пункту меню/диалога выбирает его, наведение подсвечивает, клик в строке ввода ставит курсор. Пока включено, буфер прокрутки терминала НЕ используется. Перетаскиванием выделяется текст в области (двойной/тройной клик — слово/строка), копируется при отпускании. Чтобы использовать выделение самого терминала, держите Shift (или Option на macOS) при перетаскивании. Одиночный клик открывает http(s)-ссылку под указателем (ссылки других схем копируются в буфер), а правый клик по ссылке или выделению открывает встроенное контекстное меню. Работой с мышью управляет ui.mouseTracking; отключите его, чтобы полностью вернуть мышь терминалу.',
  'Show Scrollbar (Virtualized History)':
    'Полоса прокрутки (виртуальная история)',
  'Show the auto-hiding scrollbar in the in-app scrollable viewport (Virtualized History). The bar appears while scrolling and fades out when idle. Disable to hide it entirely.':
    'Показывать автоскрываемую полосу прокрутки во встроенной области (виртуальная история). Полоса появляется при прокрутке и исчезает в простое. Отключите, чтобы не показывать её совсем.',
  'Mouse Tracking': 'Отслеживание мыши',
  'Enable in-app SGR mouse tracking. While enabled, Qwen Code captures mouse events for text selection, click-to-position in text inputs, row hover, history-item toggling, and viewport scrolling. Because the terminal forwards all mouse events to the app, Qwen Code supplies its own equivalents for what the terminal can no longer do natively: a single click opens an http(s) hyperlink under the pointer (other link schemes are copied to the clipboard), and right-click over a link or a text selection opens an in-app context menu with Open Link / Copy Link Address / Copy Selection. Disable to hand the mouse fully back to the terminal (native right-click menu and link clicks); this turns off all in-app mouse interaction, and in Virtualized History the wheel no longer scrolls the transcript — use Shift+↑/↓, PgUp/PgDn, or Ctrl+Home/End instead (pair with ui.useTerminalBuffer: false to restore native terminal scrollback).':
    'Включить встроенное SGR-отслеживание мыши. Пока включено, Coddy перехватывает события мыши для выделения текста, установки курсора кликом в полях ввода, подсветки строк, раскрытия элементов истории и прокрутки. Поскольку терминал передаёт приложению все события мыши, Coddy сам заменяет то, что терминал больше не делает: одиночный клик открывает http(s)-ссылку под указателем (ссылки других схем копируются в буфер), а правый клик по ссылке или выделению открывает встроенное меню с Open Link / Copy Link Address / Copy Selection. Отключите, чтобы полностью вернуть мышь терминалу (родное контекстное меню и клики по ссылкам); это выключает всю встроенную работу с мышью, а в виртуальной истории колесо перестаёт прокручивать транскрипт — используйте Shift+↑/↓, PgUp/PgDn или Ctrl+Home/End (вместе с ui.useTerminalBuffer: false вернётся родная прокрутка терминала).',
  'Arrow Keys Scroll Transcript (Virtualized History)':
    'Стрелки прокручивают транскрипт (виртуальная история)',
  'Let a bare ↑/↓ scroll the transcript while the composer is empty in Virtualized History, instead of recalling input history. Off by default: ↑/↓ walk your previous prompts, and the transcript scrolls with Shift+↑/↓ (line), PgUp/PgDn (page), Ctrl+Home/End (top/bottom), or the mouse wheel. Turn it on only for a terminal or multiplexer that does not pass mouse reporting through and turns wheel/trackpad scrolling into ↑/↓ key presses, where that burst of ↑/↓ would otherwise silently replace the composer with an older prompt. While it is on, use Ctrl+P / Ctrl+N for input history from an empty composer.':
    'В виртуальной истории при пустой строке ввода голые ↑/↓ прокручивают транскрипт, а не листают историю ввода. По умолчанию выключено: ↑/↓ листают прежние запросы, а транскрипт прокручивается Shift+↑/↓ (строка), PgUp/PgDn (страница), Ctrl+Home/End (начало/конец) или колесом мыши. Включайте только для терминала или мультиплексора, который не пропускает события мыши и превращает прокрутку колесом/трекпадом в нажатия ↑/↓, — иначе такая серия ↑/↓ незаметно подменит строку ввода старым запросом. Пока включено, история ввода из пустой строки — через Ctrl+P / Ctrl+N.',
  'Show Tool Call Details': 'Показывать детали вызовов инструментов',
  'Show tool arguments and results inline. Disable to render ordinary tool calls as a one-line summary; click a summary in Virtualized History or press Ctrl+O to expand its details. Approval prompts, user-initiated shell commands, and focused interactive shells remain expanded.':
    'Показывать аргументы и результаты инструментов прямо в ленте. Если выключить, обычные вызовы показываются однострочной сводкой; клик по сводке в виртуальной истории или Ctrl+O раскрывает детали. Запросы подтверждения, shell-команды пользователя и активные интерактивные оболочки остаются развёрнутыми.',
  'Render tool calls on their own line with their raw arguments inline, instead of the type-based compact summary that folds read/search/list batches into "Read 3 files". Useful when debugging MCP integrations or tool schemas. Applies wherever the arguments are available: live, resumed, agent-view and speculated turns. The row is capped at 2 wrapped lines (and never more than 1000 characters) and truncated with a `+N chars` marker; press Ctrl+O for the complete payload. Groups of running parallel subagents keep their compact roster, and daemon-attached sessions carry no arguments, so both keep the compact view — press Ctrl+O there. Does not change result-output truncation.':
    'Показывать вызовы инструментов отдельной строкой с исходными аргументами, а не компактной сводкой по типу, которая сворачивает пакеты чтения/поиска/списков в «Прочитано файлов: 3». Полезно при отладке MCP-интеграций или схем инструментов. Работает везде, где аргументы доступны: в живых, возобновлённых, agent-view и спекулятивных ходах. Строка ограничена 2 строками переноса (и не более 1000 символов) и обрезается с меткой `+N chars`; полный payload — Ctrl+O. Группы параллельных субагентов сохраняют компактный список, а сессии, подключённые к демону, не содержат аргументов, поэтому в обоих случаях остаётся компактный вид — нажмите там Ctrl+O. Обрезку вывода результатов не меняет.',
  'Shell Output Max Lines': 'Макс. строк вывода оболочки',
  'Max number of shell output lines shown inline. Set to 0 to disable the cap and show full output. The hidden line count is still surfaced via the `+N lines` indicator.':
    'Сколько строк вывода оболочки показывать в ленте. 0 — без ограничения, показывать весь вывод. Число скрытых строк всё равно видно в индикаторе `+N lines`.',
  'Hide Banner': 'Скрыть баннер',
  'Hide the startup ASCII banner and info panel.':
    'Скрывать ASCII-баннер и информационную панель при запуске.',
  'Enable IDE integration mode': 'Включить режим интеграции с IDE',
  'Enable collection of usage statistics':
    'Включить сбор статистики использования',
  'Model used for generating prompt suggestions and speculative execution. Leave empty to use the main model. A smaller/faster model (e.g., qwen3-coder-flash) reduces latency and cost.':
    'Модель для подсказок запросов и спекулятивного выполнения. Оставьте пустым, чтобы использовать основную модель. Меньшая/быстрая модель снижает задержку и стоимость.',
  'Advisor Session Call Limit': 'Лимит вызовов советника за сессию',
  'Maximum native Advisor requests per session, shared by the executor and its subagents. Failed requests count. 0 means unlimited. Each request sends the conversation to the selected provider and consumes additional tokens. Only user and system settings apply.':
    'Максимум запросов к встроенному советнику за сессию, общий для исполнителя и его субагентов. Неудачные запросы тоже считаются. 0 — без ограничения. Каждый запрос отправляет диалог выбранному провайдеру и расходует дополнительные токены. Действуют только настройки пользователя и системы.',
  'Image-capable model used as the vision bridge: when a text-only main model receives an image, it is transcribed by this model first. Set with /model --vision. Leave empty to auto-pick a same-provider vision model.':
    'Модель с поддержкой изображений, используемая как мост: когда текстовая основная модель получает изображение, сначала его описывает эта модель. Задаётся через /model --vision. Оставьте пустым, чтобы автоматически выбрать модель для изображений того же провайдера.',
  'Model Fallbacks': 'Резервные модели',
  'Ordered list of fallback model IDs (comma-separated, max 3) to try when the primary model hits capacity errors (429/503/529). Example: "qwen-plus,qwen-turbo". Set via CLI with --fallback-model.':
    'Упорядоченный список ID резервных моделей (через запятую, максимум 3), которые пробуются, когда основная модель упирается в ошибки нагрузки (429/503/529). Пример: "model-a,model-b". В CLI задаётся через --fallback-model.',
  'How hard reasoning-capable models think, applied across all providers. Set with /effort. Each provider maps and clamps this to what the active model supports (e.g. Gemini caps at "high"; Anthropic clamps tiers a model lacks). Leave unset to use the model/provider default.':
    'Насколько усердно рассуждают модели с поддержкой рассуждений, для всех провайдеров. Задаётся через /effort. Каждый провайдер приводит значение к тому, что поддерживает активная модель (например, у Gemini максимум "high"; Anthropic ограничивает уровни, которых нет у модели). Не задавайте, чтобы использовать значение модели/провайдера.',
  'Extra High': 'Очень высокое',
  Max: 'Максимальное',
  'Respect .gitignore files when searching': 'Учитывать .gitignore при поиске',
  'Respect .qwenignore and configured custom ignore files when searching':
    'Учитывать .coddyignore и настроенные свои ignore-файлы при поиске',
  'Enable Fuzzy Search': 'Нечёткий поиск',
  'Enable fuzzy search when searching for files.':
    'Использовать нечёткий поиск при поиске файлов.',
  'Expose ordinary tools through the isolated exec JavaScript tool. Load deferred descriptions and schemas on demand with tool_search; if search is unavailable, include all allowed signatures in exec. Direct control tools remain available. Ignored in safe and bare modes.':
    'Открывать обычные инструменты через изолированный JavaScript-инструмент exec. Отложенные описания и схемы подгружаются по запросу через tool_search; если поиск недоступен, все разрешённые сигнатуры включаются в exec. Инструменты прямого управления остаются доступны. В безопасном режиме и режиме bare игнорируется.',
  'Enable WebSearch': 'Веб-поиск',
  'Set false to disable the built-in web_search tool. Automatic startup activation requires leaving enabled, model, and the env-only backend unset. Setting true permits automatic derivation only when the env-only backend is also unset; otherwise a model is required. Env override: ENABLE_WEB_SEARCH.':
    'false отключает встроенный инструмент web_search. Для автоматической активации при запуске оставьте незаданными enabled, model и задаваемый только через окружение backend. true разрешает автоматический вывод, только если backend из окружения тоже не задан; иначе нужна модель. Переопределение через окружение: ENABLE_WEB_SEARCH.',
  'Search Model': 'Модель поиска',
  'Model selector for the explicit search path ("modelId" or "authType:modelId"). With WEB_SEARCH_BASE_URL it is the plain model id for that endpoint; otherwise it must match a DashScope-compatible modelProviders entry with an envKey. The automatic path uses qwen3.8-flash. Env override: WEB_SEARCH_MODEL.':
    'Селектор модели для явного пути поиска ("modelId" или "authType:modelId"). С WEB_SEARCH_BASE_URL это просто id модели для этого endpoint; иначе он должен совпадать с DashScope-совместимой записью modelProviders с envKey. Автоматический путь использует быструю модель DashScope. Переопределение через окружение: WEB_SEARCH_MODEL.',
  'Open Result Pages': 'Открывать страницы результатов',
  'Let the search agent open and read result pages (DashScope web_extractor) for better-grounded answers. Billed separately by DashScope. Env override: WEB_SEARCH_EXTRACTOR.':
    'Разрешить поисковому агенту открывать и читать страницы результатов (DashScope web_extractor) для более обоснованных ответов. DashScope тарифицирует это отдельно. Переопределение через окружение: WEB_SEARCH_EXTRACTOR.',
  'Search Timeout (ms)': 'Таймаут поиска (мс)',
  'Total time budget for one web_search call, in milliseconds (default 120000, max 600000; other values fall back to the default). The search agent runs several queries and may open result pages; a search that exceeds the budget returns whatever arrived as a partial result once at least one search call has completed — if the budget expires before the first search call finishes, the tool reports a timeout error instead, because narration with no executed search is not auditable evidence. A per-tool execution cap (QWEN_CODE_TOOL_EXECUTION_TIMEOUT_MS) below this budget fires first and discards the partial result; keep it above timeoutMs. Env override: WEB_SEARCH_TIMEOUT_MS.':
    'Общий бюджет времени на один вызов web_search в миллисекундах (по умолчанию 120000, максимум 600000; другие значения заменяются значением по умолчанию). Поисковый агент выполняет несколько запросов и может открывать страницы результатов; если бюджет превышен, поиск возвращает частичный результат из того, что успело прийти, при условии, что хотя бы один поисковый вызов завершился. Если бюджет истёк до завершения первого вызова, инструмент сообщает об ошибке таймаута, потому что рассказ без выполненного поиска не является проверяемым свидетельством. Ограничение времени выполнения инструмента (QWEN_CODE_TOOL_EXECUTION_TIMEOUT_MS) ниже этого бюджета срабатывает раньше и отбрасывает частичный результат; держите его выше timeoutMs. Переопределение через окружение: WEB_SEARCH_TIMEOUT_MS.',
  'Max Searches per Session': 'Макс. поисков за сессию',
  'Maximum web_search calls in one session (default 200, max 10000; other values fall back to the default). The count is shared with subagents and resets when the session changes (/clear, /resume, branching). Once it is reached, further searches are skipped and the model is told to continue with what it has gathered. Env override: WEB_SEARCH_MAX_PER_SESSION.':
    'Максимум вызовов web_search за сессию (по умолчанию 200, максимум 10000; другие значения заменяются значением по умолчанию). Счётчик общий с субагентами и сбрасывается при смене сессии (/clear, /resume, ветвление). Когда лимит достигнут, дальнейшие поиски пропускаются, а модели сообщается, что нужно продолжать с уже собранным. Переопределение через окружение: WEB_SEARCH_MAX_PER_SESSION.',
  'Enable ToolSearch': 'Включить ToolSearch',
  "When enabled, deferred tools are reviewed via ToolSearch and invoked through the stable ToolCall bridge. Bridge review and invocation keep the tool list stable — the bridge never re-declares what it reveals — reducing prompt size without touching the prompt-cache prefix. The declaration list is not immutable, though: a session still re-declares on resume, whenever a tool-set refresh (MCP discovery, the first plan-mode entry in a session, a subagent definition change) finds a direct call to a still-hidden deferred tool in the live history, when a subagent definition change rewrites the agent tool's own description, and when an MCP server registers mid-session with alwaysLoadTools: true.":
    'Если включено, отложенные инструменты просматриваются через ToolSearch и вызываются через стабильный мост ToolCall. Просмотр и вызов через мост сохраняют список инструментов стабильным — мост никогда не переобъявляет то, что раскрывает, — и уменьшают размер промпта, не трогая префикс кэша промпта. Но список объявлений не неизменен: сессия всё равно переобъявляет его при возобновлении; когда обновление набора инструментов (обнаружение MCP, первый вход в режим плана в сессии, изменение определения субагента) находит в живой истории прямой вызов ещё скрытого отложенного инструмента; когда изменение определения субагента переписывает описание самого инструмента агента; и когда MCP-сервер регистрируется посреди сессии с alwaysLoadTools: true.',
  'Deferred Tool Preload Threshold (%)':
    'Порог предзагрузки отложенных инструментов (%)',
  'Context-window percentage used as the session-start budget for preloading ordinary deferred tools (bundled built-ins and MCP alike). Defaults to 0, which performs no threshold-based preload; ordinary deferred tools normally stay behind the stable ToolSearch + ToolCall bridge, at the cost of one tool_search round trip before first use. Raise it to N so that, when every eligible deferred schema fits within N% of the context window, all are declared upfront for direct calls with no bridge round trip; otherwise they stay behind the bridge while both bridge tools are registered. Tools demoted by tools.eager are excluded from this preload and stay reachable on demand through that bridge while it is registered; when either bridge tool is unregistered (tools.toolSearch.enabled false denies both; a tool_search or tool_call deny rule removes one) the demoted tools that remain hidden are not offered to the model and cannot be reached through the bridge for that session, and a warning is logged; these bridge and warning rules apply to direct tool mode. CodeModeOnly discovers deferred schemas through top-level tool_search and invokes them through exec. It skips deferred preload and startup catalogs; tools.eager also reduces the initial exec description. When search is unavailable in the current scope, exec includes all allowed tool signatures. In direct mode they stay registered, so a direct call by their own name is still evaluated and approved normally. Separate paths can still declare deferred tools at 0: tools.visible; the live-history compatibility scan on every tool-set refresh (including resume, MCP discovery, first plan-mode entry, and subagent definition changes); the incomplete-bridge eager fallback; and daemon ACP late registration, which explicitly reveals and pins create_sub_session.':
    'Процент окна контекста, используемый как бюджет на старте сессии для предзагрузки обычных отложенных инструментов (встроенных и MCP). По умолчанию 0 — предзагрузки по порогу нет; обычные отложенные инструменты остаются за стабильным мостом ToolSearch + ToolCall ценой одного обращения к tool_search перед первым использованием. Если задать N, то когда все подходящие отложенные схемы помещаются в N% окна контекста, они объявляются сразу для прямых вызовов без обращения к мосту; иначе остаются за мостом, пока оба инструмента моста зарегистрированы. Инструменты, пониженные через tools.eager, исключаются из предзагрузки и остаются доступны по запросу через мост, пока он зарегистрирован; если какой-то инструмент моста не зарегистрирован (tools.toolSearch.enabled false отключает оба; правило запрета tool_search или tool_call убирает один), оставшиеся скрытыми пониженные инструменты не предлагаются модели и недоступны через мост в этой сессии, а в лог пишется предупреждение; эти правила моста и предупреждений относятся к режиму прямых инструментов. CodeModeOnly находит отложенные схемы через верхнеуровневый tool_search и вызывает их через exec. Он пропускает предзагрузку отложенных и стартовые каталоги; tools.eager также сокращает начальное описание exec. Если поиск недоступен в текущей области, exec включает все разрешённые сигнатуры инструментов. В прямом режиме они остаются зарегистрированными, поэтому прямой вызов по их имени всё равно проверяется и подтверждается как обычно. При 0 отложенные инструменты всё же могут объявляться другими путями: tools.visible; проверка совместимости живой истории при каждом обновлении набора инструментов (в том числе при возобновлении, обнаружении MCP, первом входе в режим плана и изменении определений субагентов); запасной eager-режим при неполном мосте; поздняя регистрация ACP у демона, которая явно раскрывает и закрепляет create_sub_session.',
  'Enable ListDirectory': 'Включить ListDirectory',
  'Enable the built-in list_directory tool. Disabled by default; it is also re-enabled automatically when explicitly listed in the coreTools allowlist (--core-tools / tools.core).':
    'Включить встроенный инструмент list_directory. По умолчанию выключен; также включается автоматически, если явно указан в allowlist coreTools (--core-tools / tools.core).',
  'Enable Todo Write': 'Включить Todo Write',
  'Enable the built-in todo_write tool and its system-prompt guidance.':
    'Включить встроенный инструмент todo_write и его инструкции в системном промпте.',
  'Use node-pty for an interactive shell experience. Explicit one-shot prompts default to child_process when this setting is unset; interactive and input-driven modes default to PTY.':
    'Использовать node-pty для интерактивной оболочки. Явные одноразовые запросы по умолчанию используют child_process, если настройка не задана; интерактивные режимы и режимы с вводом по умолчанию используют PTY.',
  'Approval mode for tool usage. Controls how tools are approved before execution.':
    'Режим подтверждения для инструментов. Определяет, как инструменты подтверждаются перед выполнением.',
  'Dynamic Workflows': 'Динамические рабочие процессы',
  'Enable the Workflow tool, which lets the model author and run a script that orchestrates subagents in parallel. Off by default; a run can dispatch many subagents and spend tokens accordingly. The QWEN_CODE_ENABLE_WORKFLOWS=1 and QWEN_CODE_DISABLE_WORKFLOWS=1 environment variables override this setting (disable wins). Unrelated to the Session Workflow plan-and-review view; to stop the "workflow" keyword from steering a turn, see Disable Workflow Keyword Trigger.':
    'Включить инструмент Workflow: модель пишет и запускает скрипт, который параллельно управляет субагентами. По умолчанию выключено; один запуск может породить много субагентов и потратить соответствующее число токенов. Переменные окружения QWEN_CODE_ENABLE_WORKFLOWS=1 и QWEN_CODE_DISABLE_WORKFLOWS=1 переопределяют настройку (отключение важнее). Не связано с видом Session Workflow (план и ревью); чтобы слово «workflow» не направляло ход, см. «Не реагировать на слово «workflow»».',
  'Dynamic Workflow Size': 'Размер динамических рабочих процессов',
  'Advisory size guideline for the dynamic workflows the model writes: "small" aims for fewer than 5 agents, "medium" (the default) fewer than 15, "large" fewer than 50, and "unrestricted" sends no guideline. It is a guideline, not an enforced limit. It also sets the agent count at which a running workflow is flagged as large (QWEN_CODE_WORKFLOW_SIZE_WARNING_AGENTS overrides that threshold). A change takes effect from your next message.':
    'Рекомендуемый размер динамических рабочих процессов, которые пишет модель: "small" — меньше 5 агентов, "medium" (по умолчанию) — меньше 15, "large" — меньше 50, "unrestricted" — без рекомендации. Это рекомендация, а не жёсткий лимит. Также задаёт число агентов, при котором запущенный процесс помечается как большой (QWEN_CODE_WORKFLOW_SIZE_WARNING_AGENTS переопределяет этот порог). Изменение действует со следующего сообщения.',
  'Small (under 5 agents)': 'Малый (до 5 агентов)',
  'Medium (under 15 agents)': 'Средний (до 15 агентов)',
  'Large (under 50 agents)': 'Большой (до 50 агентов)',
  'Unrestricted (no guideline)': 'Без ограничений (без рекомендации)',
  'Named Workflows Only': 'Только именованные рабочие процессы',
  'Restrict the model to running named workflows: saved workflows and the workflows extensions ship, called by name. The model cannot run an inline script or a script path, and a running script cannot nest one by path, so every run the model starts can be matched by a Workflow(name:...) permission rule. It does not replace an approval policy: the model can still save a new workflow file and run it by name, which an approval rule scoped to specific names or script digests will ask about. Runs a host starts over ACP (run-saved, run-script, retry, rerun) are not restricted. QWEN_CODE_WORKFLOW_NAME_ONLY=1 turns it on too. A workspace may set this to true only.':
    'Разрешить модели запускать только именованные рабочие процессы: сохранённые и поставляемые расширениями, по имени. Модель не может запустить встроенный скрипт или скрипт по пути, а запущенный скрипт не может вложить другой по пути, поэтому каждый запуск модели сопоставим с правилом разрешения Workflow(name:...). Это не заменяет политику подтверждения: модель всё ещё может сохранить новый файл процесса и запустить его по имени, и правило подтверждения для конкретных имён или дайджестов скриптов об этом спросит. Запуски, которые хост начинает через ACP (run-saved, run-script, retry, rerun), не ограничиваются. QWEN_CODE_WORKFLOW_NAME_ONLY=1 тоже включает режим. Рабочая область может задать только true.',
  'Permission Mediation Policy': 'Политика разрешений при нескольких клиентах',
  'How permission requests resolve when multiple clients are attached. `first-responder` (default) = any client decides, first wins. `designated` = only the prompt originator decides; falls back to first-responder if originator is anonymous. NOTE: client identity comes from self-declared X-Qwen-Client-Id with no proof-of-possession (pair-token identity is not implemented yet), so any client observing originatorClientId on SSE frames can register with the same id and impersonate the originator. `consensus` = N-of-M voters must agree. Default N=floor(M/2)+1, which means UNANIMITY for M=2 (quorum=2, both must agree) and supermajority for larger even M (M=4 → quorum=3; M=6 → quorum=4). For M=2 specifically, split votes resolve only via the configured permission timeout, voter cancellation, or session cancellation. `local-only` = only loopback clients can RESOLVE; remote clients can still ABORT a pending permission via the cancel sentinel ({outcome:"cancelled"}) — cancel stays cross-policy for consistency. Strict-cancel-too deployments need a dedicated loopback-bound daemon. Requires daemon restart — read once at boot.':
    'Как решаются запросы разрешений, когда подключено несколько клиентов. `first-responder` (по умолчанию) — решает любой клиент, побеждает первый. `designated` — решает только автор запроса; если он анонимен, действует first-responder. ВНИМАНИЕ: личность клиента берётся из самозаявленного X-Qwen-Client-Id без доказательства владения (идентичность по pair-token пока не реализована), поэтому любой клиент, видящий originatorClientId в SSE-кадрах, может зарегистрироваться с тем же id и выдать себя за автора. `consensus` — должны согласиться N из M голосующих. По умолчанию N=floor(M/2)+1, то есть ЕДИНОГЛАСИЕ при M=2 (кворум 2, согласны оба) и квалифицированное большинство при больших чётных M (M=4 → кворум 3; M=6 → кворум 4). При M=2 разделившиеся голоса разрешаются только по настроенному таймауту разрешения, отмене голосующим или отмене сессии. `local-only` — РЕШАТЬ могут только loopback-клиенты; удалённые всё ещё могут ПРЕРВАТЬ ожидающее разрешение через sentinel отмены ({outcome:"cancelled"}) — отмена работает во всех политиках для единообразия. Для строгого запрета и отмены нужен отдельный демон, привязанный к loopback. Требует перезапуска демона — читается один раз при старте.',
  'First Responder': 'Первый ответивший',
  'Designated Originator': 'Автор запроса',
  'Consensus Quorum': 'Кворум',
  'Local Only': 'Только локальные',
  'Model-Proposed Goals': 'Цели, предложенные моделью',
  'Controls the propose_goal tool, which lets the model propose a session Goal for you to approve. "alwaysAsk" (default) shows every proposal in an approval dialog and nothing is set until you accept it; "disabled" removes the tool. A typed /goal is unaffected. Consent-affecting, so this setting is only honored from User, System, or SystemDefaults scope; workspace values are ignored.':
    'Управляет инструментом propose_goal, через который модель предлагает цель сессии на ваше одобрение. "alwaysAsk" (по умолчанию) показывает каждое предложение в диалоге подтверждения, и ничего не задаётся, пока вы не примете; "disabled" убирает инструмент. Введённый вручную /goal не затрагивается. Влияет на согласие, поэтому учитывается только в областях User, System или SystemDefaults; значения рабочей области игнорируются.',
  'Always ask': 'Всегда спрашивать',
  'Preserve Arena Artifacts': 'Сохранять артефакты Arena',
  'When enabled, Arena worktrees and session state files are preserved after the session ends or the main agent exits.':
    'Если включено, worktree Arena и файлы состояния сессии сохраняются после завершения сессии или выхода основного агента.',
  'Session Workflow Plan & Review': 'Session Workflow: план и ревью',
  'Enable the daemon Web Shell Session Workflow DAG and present Plan mode as Plan & Review. Disabled by default; Workflow markers, approval gates, and visualization stay off until enabled. Todo updates preserve omitted active dependencies in every mode.':
    'Включить DAG Session Workflow в Web Shell демона и показывать режим плана как «План и ревью». По умолчанию выключено; метки Workflow, шлюзы подтверждения и визуализация не работают, пока не включено. Обновления todo сохраняют пропущенные активные зависимости в любом режиме.',
  'Enable Cron/Loop Tools': 'Инструменты Cron/Loop',
  'Enable in-session cron/loop tools. When enabled, the model can create recurring prompts using cron_create, cron_list, and cron_delete tools. Can be disabled via QWEN_CODE_DISABLE_CRON=1 environment variable.':
    'Включить инструменты cron/loop внутри сессии. Если включено, модель может создавать повторяющиеся запросы через cron_create, cron_list и cron_delete. Отключается переменной окружения QWEN_CODE_DISABLE_CRON=1.',
  'Enable ACP Session Writer Lease': 'Аренда записи сессий ACP',
  'Enable cross-process write fencing for persisted ACP and daemon sessions. The effective value is frozen when the ACP or daemon process starts. Every concurrent ACP or daemon writer must enable the setting; interactive and headless writers remain outside the protocol.':
    'Включить межпроцессную защиту записи для сохраняемых сессий ACP и демона. Действующее значение фиксируется при старте процесса ACP или демона. Настройку должны включить все одновременные писатели ACP и демона; интерактивные и headless-писатели остаются вне протокола.',
  'Enable Agent Team': 'Команда агентов',
  'Enable agent team collaboration tools (experimental). When enabled, the model can create agent teams and coordinate work using team_create, team_delete, send_message, task_create, task_update, and task_list tools. Can also be enabled via QWEN_CODE_ENABLE_AGENT_TEAM=1 environment variable.':
    'Включить инструменты совместной работы команды агентов (экспериментально). Если включено, модель может создавать команды агентов и координировать работу через team_create, team_delete, send_message, task_create, task_update и task_list. Также включается переменной окружения QWEN_CODE_ENABLE_AGENT_TEAM=1.',
  'Enable Agent Collaboration': 'Совместная работа агентов',
  'Enable persistent workspace Agents that you can @-mention in a chat session (experimental). Each mentioned Agent answers in the same session from its own native session. Independent of Agent Team: neither flag implies the other. Enabling permits collaboration; opening an Agent to outside callers, trusting a connection and registering a host each still require their own explicit configuration. Can also be enabled via QWEN_CODE_ENABLE_AGENT_COLLABORATION=1.':
    'Включить постоянных агентов рабочей области, которых можно @-упомянуть в сессии чата (экспериментально). Каждый упомянутый агент отвечает в той же сессии из своей собственной сессии. Не зависит от команды агентов: ни один флаг не подразумевает другой. Включение разрешает совместную работу; открытие агента внешним вызывающим, доверие подключению и регистрация хоста по-прежнему требуют отдельной явной настройки. Также включается через QWEN_CODE_ENABLE_AGENT_COLLABORATION=1.',
  'Enable Artifacts': 'Артефакты',
  'Enable artifact tools. Enabled by default. In interactive, non-SDK sessions, the model can publish a self-contained HTML page as an interactive Artifact and open it in the browser. Non-SDK daemon sessions can use the metadata-only record_artifact tool. Set this to false or use QWEN_CODE_DISABLE_ARTIFACT=1 to disable both.':
    'Включить инструменты артефактов. По умолчанию включено. В интерактивных сессиях вне SDK модель может публиковать самодостаточную HTML-страницу как интерактивный артефакт и открывать её в браузере. Сессии демона вне SDK могут использовать инструмент record_artifact (только метаданные). Задайте false или QWEN_CODE_DISABLE_ARTIFACT=1, чтобы отключить оба.',
  'Tool Use Summaries': 'Сводки вызовов инструментов',
  'Generate a short LLM-based label after each tool batch completes. For a completed tool group the label replaces the generic `Tool × N` header; when the group is force-expanded it appears as a dim `● <label>` line below the tool group. Requires a fast model to be configured; runs in parallel with the next API call so latency is hidden. Currently affects interactive CLI rendering only — SDK / non-interactive emission of the `tool_use_summary` message is not yet wired (the message factory is exported for a follow-up PR). Can be overridden with QWEN_CODE_EMIT_TOOL_USE_SUMMARIES=0 or =1.':
    'Генерировать короткую подпись от LLM после каждого пакета инструментов. Для завершённой группы подпись заменяет общий заголовок `Tool × N`; если группа принудительно раскрыта, подпись показывается тусклой строкой `● <label>` под группой. Нужна настроенная быстрая модель; работает параллельно со следующим вызовом API, поэтому задержки не видно. Пока влияет только на отображение в интерактивном CLI — выдача сообщения `tool_use_summary` в SDK / неинтерактивном режиме ещё не подключена (фабрика сообщений экспортирована для следующего PR). Переопределяется через QWEN_CODE_EMIT_TOOL_USE_SUMMARIES=0 или =1.',
  'Enable Omni Media Delivery': 'Доставка медиа Omni',
  'Enable the omni media pipeline. Media files (video, image, audio) referenced with @ — and media served from @https:// URLs — are recognized (ffprobe), stored content-addressed under .qwen/omni/objects/, uploaded through the DashScope temporary upload channel, and delivered as oss:// URLs instead of inline base64. Only active for DashScope-compatible endpoints. Can also be enabled via QWEN_CODE_ENABLE_OMNI=1.':
    "Включить медиаконвейер omni. Медиафайлы (видео, изображения, аудио), указанные через @, — и медиа по ссылкам @https:// — распознаются (ffprobe), хранятся по хэшу содержимого в .coddy/omni/objects/, загружаются через временный канал загрузки DashScope и передаются как ссылки oss:// вместо встроенного base64. Работает только для DashScope-совместимых endpoint'ов. Также включается через QWEN_CODE_ENABLE_OMNI=1.",
  'Configure Status Line': 'Настройка строки статуса',
  'Select which items to display in the status line.':
    'Выберите, что показывать в строке статуса.',
  'Type to search': 'Ввод для поиска',
  'Use theme colors': 'Цвета темы',
  'Apply colors from the active /theme': 'Применить цвета активной /theme',
  'No preset items match.': 'Нет подходящих пунктов.',
  'Select at least one item to show a status line.':
    'Выберите хотя бы один пункт, чтобы показывать строку статуса.',
  'Use up/down to navigate, space to select, enter to confirm, esc to cancel':
    '↑/↓ навигация, Пробел выбрать, Enter подтвердить, Esc отмена',
  'Status line preset saved to {{scope}} settings.':
    'Пресет строки статуса сохранён в настройки ({{scope}}).',
  'Project name when available': 'Имя проекта, если есть',
  'Current Git branch when available': 'Текущая ветка Git, если есть',
  'Current model name with reasoning level when available':
    'Текущая модель с уровнем рассуждений, если есть',
  'Current model name without reasoning level':
    'Текущая модель без уровня рассуждений',
  'Percentage of context window remaining':
    'Сколько процентов окна контекста осталось',
  'Total input tokens used in session': 'Всего входных токенов за сессию',
  'Total output tokens used in session': 'Всего выходных токенов за сессию',
  'Current working directory': 'Текущая рабочая папка',
  'Open pull request number for the current branch':
    'Номер открытого pull request для текущей ветки',
  'Session file changes added and removed':
    'Добавленные и удалённые строки в файлах за сессию',
  'Percentage of context window used':
    'Сколько процентов окна контекста занято',
  'Compact session run-state text': 'Краткий статус выполнения сессии',
  'Qwen Code application version': 'Версия Coddy',
  'Total context window size in tokens': 'Размер окна контекста в токенах',
  'Current prompt tokens used': 'Токены текущего запроса',
  'Current session identifier': 'ID текущей сессии',
  'Worktree removal is unavailable in tool sandbox.':
    'Удаление worktree недоступно в песочнице инструментов.',
  'Safe mode active — skipping context file refresh.':
    'Включён безопасный режим — обновление контекстных файлов пропущено.',
  'Refreshing hierarchical memory (QWEN.md or other context files)...':
    'Обновление иерархической памяти (AGENTS.md и другие контекстные файлы)...',
  'Error refreshing memory: {{errorMessage}}':
    'Ошибка обновления памяти: {{errorMessage}}',
  'Message to {{address}}: {{detail}}': 'Сообщение для {{address}}: {{detail}}',
  'Cross-session messaging is OFF for this session — the inbox could not bind: {{describePeerInboxFailure}}':
    'Обмен сообщениями между сессиями в этой сессии ВЫКЛЮЧЕН — не удалось подключить входящие: {{describePeerInboxFailure}}',
  'Rewind is disabled in IDE mode.': 'Откат недоступен в режиме IDE.',
  'File restore is unavailable in tool sandbox.':
    'Восстановление файлов недоступно в песочнице инструментов.',
  'No TOML files found to migrate.': 'TOML-файлов для миграции не найдено.',
  '✗ Migration failed: {{error}}': '✗ Миграция не удалась: {{error}}',
  "No, don't ask again": 'Нет, больше не спрашивать',
  'Do you want to connect {{value}} to Qwen Code?':
    'Подключить {{value}} к Coddy?',
  'Image  ': 'Изображения  ',
  'Video  ': 'Видео  ',
  'Audio  ': 'Аудио  ',
  'Arena is unavailable in tool sandbox.':
    'Arena недоступна в песочнице инструментов.',
  'To submit your bug report, please open the following URL in your browser:':
    'Чтобы отправить отчёт об ошибке, откройте этот URL в браузере:',
  'Could not open URL in browser: {{errorMessage}}':
    'Не удалось открыть URL в браузере: {{errorMessage}}',
  'Usage: /cd <path>': 'Использование: /cd <path>',
  'Cannot change directory while a response or tool call is in progress.':
    'Нельзя сменить папку, пока идёт ответ или вызов инструмента.',
  'The /cd command is not supported in restrictive sandbox profiles. Start a new session in the target directory instead.':
    'Команда /cd не поддерживается в строгих профилях песочницы. Начните новую сессию в нужной папке.',
  "Couldn't find a directory at {{targetPath}}.":
    'Папка {{targetPath}} не найдена.',
  '{{targetPath}} is not a directory.': '{{targetPath}} — не папка.',
  'Already in {{realTargetPath}}.': 'Вы уже в {{realTargetPath}}.',
  'Move this session to {{realTargetPath}}? Qwen Code will be able to read, edit, and execute files there. This folder will be trusted for future sessions.':
    'Перенести сессию в {{realTargetPath}}? Coddy сможет читать, править и выполнять файлы там. Папка станет доверенной для будущих сессий.',
  "Couldn't move to {{realTargetPath}}: {{error}}":
    'Не удалось перейти в {{realTargetPath}}: {{error}}',
  'Context cleared. Previous messages are no longer in context.':
    'Контекст очищен. Прежние сообщения больше не в контексте.',
  'Compressing context...': 'Сжатие контекста...',
  'Compressing context (fast)...': 'Быстрое сжатие контекста...',
  'Context compressed ({{tokenCount}} -> {{tokenCount2}}).':
    'Контекст сжат ({{tokenCount}} -> {{tokenCount2}}).',
  'Inline LaTeX expression {{index}}': 'Встроенное выражение LaTeX {{index}}',
  'LaTeX block {{index}}': 'Блок LaTeX {{index}}',
  'No output in history': 'В истории нет вывода',
  'Message index must be a positive integer (1 = last AI message).':
    'Номер сообщения должен быть положительным целым (1 — последнее сообщение ИИ).',
  'Failed to copy to the clipboard. {{message}}':
    'Не удалось скопировать в буфер обмена. {{message}}',
  'Diff preview unavailable in tool sandbox. Run git diff through the Shell tool.':
    'Предпросмотр diff недоступен в песочнице инструментов. Выполните git diff через инструмент Shell.',
  'Coddy documentation: {{docsUrl}}': 'Документация Coddy: {{docsUrl}}',
  'No active session found to export.': 'Нет активной сессии для экспорта.',
  'Failed to create export directory "{{outputDir}}": {{error}}':
    'Не удалось создать папку экспорта "{{outputDir}}": {{error}}',
  'Export path validation failed: {{error}} ({{displayName}} target: "{{targetFilepath}}")':
    'Проверка пути экспорта не удалась: {{error}} (цель {{displayName}}: "{{targetFilepath}}")',
  'Failed to export session: {{error}} ({{displayName}} target: "{{targetFilepath}}")':
    'Не удалось экспортировать сессию: {{error}} (цель {{displayName}}: "{{targetFilepath}}")',
  'Session exported to {{displayName}}: {{displayPath}}':
    'Сессия экспортирована в {{displayName}}: {{displayPath}}',
  'Failed to export session: {{error}} ({{displayName}})':
    'Не удалось экспортировать сессию: {{error}} ({{displayName}})',
  '`/goal set` requires an objective.': 'Для `/goal set` нужна цель.',
  '`/goal edit` requires an objective.': 'Для `/goal edit` нужна цель.',
  '✓ Connected to {{value}}': '✓ Подключено к {{value}}',
  '◐ Connecting...': '◐ Подключение...',
  'IDE integration needs to be installed on the host. If you have already installed it, you can directly connect the ide':
    'Интеграцию с IDE нужно установить на хосте. Если она уже установлена, можно сразу подключиться к IDE',
  "Automatic installation is not supported for {{ideName}}. Please install the '{{QWEN_CODE_COMPANION_EXTENSION_NAME}}' extension manually from the marketplace.":
    "Автоматическая установка для {{ideName}} не поддерживается. Установите расширение '{{QWEN_CODE_COMPANION_EXTENSION_NAME}}' вручную из маркетплейса.",
  'Installing IDE companion...': 'Установка компаньона IDE...',
  'Failed to automatically enable IDE integration. To fix this, run the CLI in a new terminal window.':
    'Не удалось автоматически включить интеграцию с IDE. Чтобы исправить, запустите CLI в новом окне терминала.',
  'Empty {{contextFileName}} created. Now analyzing the project to populate it.':
    'Создан пустой {{contextFileName}}. Анализирую проект, чтобы заполнить его.',
  'Failed to create {{contextFileName}}: {{error}}':
    'Не удалось создать {{contextFileName}}: {{error}}',
  'Unexpected error preparing {{contextFileName}}: {{error}}':
    'Неожиданная ошибка при подготовке {{contextFileName}}: {{error}}',
  'Config service is not available.': 'Сервис конфигурации недоступен.',
  'Failed to generate insights: {{message}}':
    'Не удалось сформировать инсайты: {{message}}',
  'Current fast model: {{fastModel}}\nUse "/model --fast <model-id>" to set fast model.':
    'Текущая быстрая модель: {{fastModel}}\nЗадать: "/model --fast <model-id>".',
  'Which controller? Use /peers revoke <id> — /peers controllers lists the ids.':
    'Какой контроллер? Используйте /peers revoke <id> — id показывает /peers controllers.',
  'Could not revoke that controller: {{error}}':
    'Не удалось отозвать контроллер: {{error}}',
  'No controller has the id "{{flattenPeerLabel}}". Run /peers controllers to see them.':
    'Нет контроллера с id "{{flattenPeerLabel}}". Список — /peers controllers.',
  'Cross-session messaging is not available on this platform, so this session has no inbox and other sessions cannot reach it.':
    'Обмен сообщениями между сессиями на этой платформе недоступен, поэтому у сессии нет входящих и другие сессии не могут до неё достучаться.',
  'Unknown subcommand "{{verb}}". Use /peers, /peers accept <id|all>, /peers deny <id|all>, /peers controllers, or /peers revoke <id>.':
    'Неизвестная подкоманда "{{verb}}". Используйте /peers, /peers accept <id|all>, /peers deny <id|all>, /peers controllers или /peers revoke <id>.',
  'Which message? Use /peers {{verb}} <id|all> — /peers lists the ids.':
    'Какое сообщение? Используйте /peers {{verb}} <id|all> — id показывает /peers.',
  'The waiting list changed since you listed it — run /peers again to review what is waiting now.':
    'Список ожидающих изменился с момента просмотра — выполните /peers ещё раз, чтобы увидеть актуальный.',
  'No messages from other sessions are waiting.':
    'Ожидающих сообщений от других сессий нет.',
  'No held message matches "{{target}}". Run /peers to see what is waiting.':
    'Нет задержанного сообщения, совпадающего с "{{target}}". Выполните /peers, чтобы посмотреть ожидающие.',
  '"{{target}}" matches more than one held message. Use more characters of the id.':
    '"{{target}}" совпадает с несколькими задержанными сообщениями. Укажите больше символов id.',
  'That message is no longer waiting — it may have expired or already been decided.':
    'Это сообщение больше не ожидает — возможно, истекло или уже решено.',
  'The session could not take the message just now — its input queue is full, or it could not confirm it still holds the session. It is still waiting; try again in a moment.':
    'Сессия сейчас не смогла принять сообщение — её очередь ввода заполнена или она не подтвердила, что всё ещё владеет сессией. Сообщение ждёт; повторите через мгновение.',
  'Could not determine the .qwen directory path.':
    'Не удалось определить путь к папке .coddy.',
  'No restorable tool calls found.':
    'Вызовов инструментов для восстановления не найдено.',
  'Available tool calls to restore:\n\n{{fileList}}':
    'Вызовы инструментов, доступные для восстановления:\n\n{{fileList}}',
  'File not found: {{selectedFile}}': 'Файл не найден: {{selectedFile}}',
  'This checkpoint uses a legacy format that is no longer supported. Please create a new checkpoint.':
    'Этот чекпоинт в устаревшем формате, который больше не поддерживается. Создайте новый чекпоинт.',
  'Partially restored: {{length}} file(s) reverted, {{length2}} file(s) failed. Aborting tool replay.':
    'Частично восстановлено: файлов откачено: {{length}}, с ошибкой: {{length2}}. Повтор инструмента прерван.',
  'Restored project to the state at the start of this turn.':
    'Проект восстановлен до состояния на начало этого хода.',
  'Could not restore files: {{error}}':
    'Не удалось восстановить файлы: {{error}}',
  'loadHistory function is not available.': 'Функция loadHistory недоступна.',
  'Could not read restorable tool calls. This is the error: {{error}}':
    'Не удалось прочитать вызовы инструментов для восстановления. Ошибка: {{error}}',
  'Setting up GitHub Actions to triage issues and review PRs with Qwen.':
    'Настройка GitHub Actions для разбора issues и ревью PR с помощью Coddy.',
  'Workflow pause controls are available only in the interactive TUI.':
    'Управление паузой рабочих процессов доступно только в интерактивном TUI.',
  'Usage: /workflows p <runId>': 'Использование: /workflows p <runId>',
  'Unknown live workflow runId: {{runId}}':
    'Неизвестный runId живого рабочего процесса: {{runId}}',
  'Workflow {{runId}} is {{status}} and cannot be paused or resumed.':
    'Рабочий процесс {{runId}} в состоянии {{status}}, его нельзя поставить на паузу или продолжить.',
  'Foreground workflow runs cannot be paused or resumed; only background runs support cooperative pause.':
    'Запуски рабочих процессов на переднем плане нельзя ставить на паузу или продолжать; совместную паузу поддерживают только фоновые.',
  'Workflow {{runId}} is still pausing; wait until it reaches paused before resuming.':
    'Рабочий процесс {{runId}} ещё ставится на паузу; дождитесь состояния paused, прежде чем продолжать.',
  'Cooperative pause requested for workflow {{runId}}.':
    'Запрошена совместная пауза для рабочего процесса {{runId}}.',
  'Workflow {{runId}} could not be paused because its state changed.':
    'Рабочий процесс {{runId}} не удалось поставить на паузу: его состояние изменилось.',
  'Resume requested for workflow {{runId}}.':
    'Запрошено продолжение рабочего процесса {{runId}}.',
  'Workflow {{runId}} could not be resumed because its state changed.':
    'Рабочий процесс {{runId}} не удалось продолжить: его состояние изменилось.',
  'Unknown workflow runId: {{trimmedArgs}}':
    'Неизвестный runId рабочего процесса: {{trimmedArgs}}',
  'No workflow runs recorded yet.': 'Запусков рабочих процессов пока нет.',
  'Debug mode enabled': 'Режим отладки включён',
  'Logging to:': 'Лог пишется в:',
  'Debug log file disabled by QWEN_DEBUG_LOG_FILE':
    'Файл debug-лога отключён через QWEN_DEBUG_LOG_FILE',
  'Warning: Debug logging is degraded (write failures occurred)':
    'Внимание: debug-логирование работает с перебоями (были ошибки записи)',
  '(low-effort pass — findings are unverified)':
    '(быстрый проход — находки не проверены)',
  'No findings.': 'Находок нет.',
  '(low confidence)': '(низкая уверенность)',
  'Trust folder ({{dirName}})': 'Доверять папке ({{dirName}})',
  'Trust parent folder ({{parentFolder}})':
    'Доверять родительской папке ({{parentFolder}})',
  "Don't trust (esc)": 'Не доверять (esc)',
  'Do you trust this folder?': 'Доверяете этой папке?',
  'Trusting a folder allows Qwen Code to execute commands it suggests. This is a security feature to prevent accidental execution in untrusted directories.':
    'Доверие к папке позволяет Coddy выполнять предложенные им команды. Это защита от случайного выполнения в недоверенных папках.',
  'Qwen Code is restarting to apply the trust changes...':
    'Coddy перезапускается, чтобы применить изменения доверия...',
  '⚠ Safe Mode': '⚠ Безопасный режим',
  'Debug Mode': 'Режим отладки',
  checking: 'проверка',
  paused: 'пауза',
  blocked: 'заблокировано',
  'usage limited': 'лимит исчерпан',
  "Press 'r' to restart Qwen Code and apply the changes.":
    "Нажмите 'r', чтобы перезапустить Coddy и применить изменения.",
  'Keep loop detection enabled (esc)':
    'Оставить обнаружение зацикливания (esc)',
  'Disable loop detection for this session':
    'Отключить обнаружение зацикливания для этой сессии',
  'A potential loop was detected': 'Обнаружено возможное зацикливание',
  'This can happen due to repetitive tool calls or other model behavior. Do you want to keep loop detection enabled or disable it for this session?':
    'Так бывает из-за повторяющихся вызовов инструментов или другого поведения модели. Оставить обнаружение зацикливания или отключить его для этой сессии?',
  'Note: Setting "model.skipLoopDetection" to true in your settings.json disables only the heuristic loop checks for future sessions; the always-on guards (consecutive identical tool calls, repeated shell inspection commands, and the per-turn tool-call cap) are not affected by it. The cap is tunable via "model.maxToolCallsPerTurn" (0 disables it). Disabling for this session above suppresses everything.':
    'Примечание: "model.skipLoopDetection": true в settings.json отключает для будущих сессий только эвристические проверки зацикливания; постоянные защиты (одинаковые вызовы инструментов подряд, повторные команды осмотра в shell и лимит вызовов инструментов за ход) это не затрагивает. Лимит настраивается через "model.maxToolCallsPerTurn" (0 — отключить). Отключение для этой сессии выше подавляет всё.',
  'Initialization Error:': 'Ошибка инициализации:',
  'Please check API key and configuration.':
    'Проверьте API-ключ и конфигурацию.',
  'shell mode enabled': 'режим оболочки включён',
  '(esc to disable)': '(esc — выключить)',
  'Press ctrl-s to show more lines':
    'Нажмите ctrl-s, чтобы показать больше строк',
  'Refusing to display an image outside the current workspace.':
    'Изображение вне текущей рабочей области не показывается.',
  'Image preview unavailable in tool sandbox.':
    'Предпросмотр изображения недоступен в песочнице инструментов.',
  'Modify Trust Level': 'Изменить уровень доверия',
  'Current Level:': 'Текущий уровень:',
  'Not Set': 'Не задан',
  'Note: This folder currently inherits trust from a parent folder. A more-specific trust rule here can override that decision.':
    'Примечание: эта папка сейчас наследует доверие от родительской. Более точное правило доверия здесь может его переопределить.',
  'Note: This folder behaves as a trusted folder because the connected IDE workspace is trusted. It will remain trusted even if you set a different trust level here.':
    'Примечание: эта папка считается доверенной, потому что доверена рабочая область подключённой IDE. Она останется доверенной, даже если задать здесь другой уровень.',
  '(Use Enter to select)': '(Enter для выбора)',
  "To apply the trust changes, Qwen Code must be restarted. Press 'r' to restart CLI now.":
    "Чтобы применить изменения доверия, нужно перезапустить Coddy. Нажмите 'r', чтобы перезапустить CLI сейчас.",
  'Checking worktree status…': 'Проверка состояния worktree…',
  'Keep worktree (exit without deleting)':
    'Оставить worktree (выйти без удаления)',
  'Cancel (stay in session)': 'Отмена (остаться в сессии)',
  '⎇ Active worktree: "{{slug}}" ({{branch}})':
    '⎇ Активный worktree: "{{slug}}" ({{branch}})',
  '⚠ Could not measure worktree state ({{probeError}}).':
    '⚠ Не удалось измерить состояние worktree ({{probeError}}).',
  'Dirty-state counts below may be unreliable.':
    'Счётчики незакоммиченных изменений ниже могут быть неточными.',
  '• {{newCommitCount}} new commit(s) on {{branch}}':
    '• новых коммитов в {{branch}}: {{newCommitCount}}',
  '• {{changedFilesCount}} uncommitted file(s)':
    '• незакоммиченных файлов: {{changedFilesCount}}',
  'Removing the worktree will discard everything above.':
    'Удаление worktree уничтожит всё перечисленное выше.',
  'Agent "{{agentId}}" not found.': 'Агент "{{agentId}}" не найден.',
  'Something went wrong while rendering this agent tab.':
    'Что-то пошло не так при отрисовке вкладки агента.',
  'The session is still running; other tabs are unaffected.':
    'Сессия продолжает работать; другие вкладки не затронуты.',
  'Switch to another tab and back to retry rendering this tab.':
    'Переключитесь на другую вкладку и обратно, чтобы перерисовать эту.',
  'Set QWEN_DEBUG_LOG_FILE=1 and reproduce for a full log.':
    'Задайте QWEN_DEBUG_LOG_FILE=1 и повторите, чтобы получить полный лог.',
  'Model:  ': 'Модель: ',
  'Path:   ': 'Путь:   ',
  'Branch: ': 'Ветка:  ',
  ' Main ': ' Основной ',
  'Status Summary:': 'Сводка статусов:',
  'Files Modified:': 'Изменённые файлы:',
  'Approach Summary:': 'Сводка подходов:',
  'Token Efficiency:': 'Расход токенов:',
  'tokens · runtime': 'токенов · время',
  Run: 'Выполните',
  'to view detailed diff or pick a winner.':
    'для просмотра подробного diff или выбора победителя.',
  'to pick a winner.': 'для выбора победителя.',
  'No arena session found. Start one with /arena start.':
    'Сессия Arena не найдена. Начните её через /arena start.',
  'Applying changes from {{label}}…': 'Применение изменений от {{label}}…',
  'Warning: failed to clean up arena resources: {{error}}':
    'Внимание: не удалось очистить ресурсы Arena: {{error}}',
  'Discarding Arena results and cleaning up…':
    'Отбрасываю результаты Arena и очищаю…',
  'Failed to clean up arena worktrees: {{error}}':
    'Не удалось очистить worktree Arena: {{error}}',
  'Arena Results': 'Результаты Arena',
  'Select a winner to apply changes:':
    'Выберите победителя, чьи изменения применить:',
  'p preview, d detailed diff, Enter select winner, x discard all, Esc cancel':
    'p предпросмотр, d подробный diff, Enter выбрать победителя, x отбросить всё, Esc отмена',
  'Quick Preview ·': 'Быстрый предпросмотр ·',
  'No approach summary available.': 'Сводки подхода нет.',
  'Major files:': 'Основные файлы:',
  'tokens ·': 'токенов ·',
  'Detailed Diff ·': 'Подробный diff ·',
  'No diff available.': 'Diff недоступен.',
  Initializing: 'Инициализация',
  Idle: 'Простаивает',
  'Arena Status': 'Статус Arena',
  Agent: 'Агент',
  Rounds: 'Раунды',
  'No agents registered yet.': 'Агенты пока не зарегистрированы.',
  'Stopping Arena agents…': 'Остановка агентов Arena…',
  'Cleaning up Arena resources…': 'Очистка ресурсов Arena…',
  'Arena session stopped. All Arena resources (including Git worktrees) were cleaned up.':
    'Сессия Arena остановлена. Все ресурсы Arena (включая Git worktree) очищены.',
  'Failed to stop Arena session: {{message}}':
    'Не удалось остановить сессию Arena: {{message}}',
  'Stop and clean up': 'Остановить и очистить',
  'Remove all worktrees and session files':
    'Удалить все worktree и файлы сессии',
  'Stop and preserve artifacts': 'Остановить и сохранить артефакты',
  'Keep worktrees and session files for later inspection':
    'Оставить worktree и файлы сессии для разбора',
  'Stop Arena Session': 'Остановить сессию Arena',
  'Choose what to do with Arena artifacts:': 'Что сделать с артефактами Arena:',
  'Default: preserve (agents.arena.preserveArtifacts is enabled)':
    'По умолчанию: сохранить (включено agents.arena.preserveArtifacts)',
  '    ^ {{overflow}} more above (↓ to view all)':
    '    ^ ещё выше: {{overflow}} (↓ — показать все)',
  '  ↑↓ navigate · Enter detail · Esc back':
    '  ↑↓ навигация · Enter подробнее · Esc назад',
  'Approve this server': 'Одобрить этот сервер',
  'Approve all pending servers in this workspace':
    'Одобрить все ожидающие серверы в этой рабочей области',
  'Reject (esc)': 'Отклонить (esc)',
  'Untrusted MCP server in {{source}}': 'Недоверенный MCP-сервер в {{source}}',
  'This workspace declares an MCP server. Approving lets Qwen Code start it and run its tools. Approval is bound to this exact configuration — if {{source}} changes, you will be asked again.':
    'Эта рабочая область объявляет MCP-сервер. Одобрение позволит Coddy запустить его и выполнять его инструменты. Одобрение привязано к этой конфигурации — если {{source}} изменится, вас спросят снова.',
  'Approve all will trust these servers:':
    '«Одобрить все» доверит этим серверам:',
  'No diff content.': 'Нет содержимого diff.',
  'No changes detected.': 'Изменений не обнаружено.',
  'Goal cleared': 'Цель сброшена',
  'Last check:': 'Последняя проверка:',
  agent: 'агент',
  'Approval requested by': 'Подтверждение запросил',
  '◌ Queued approval:': '◌ Подтверждение в очереди:',
  'Saved session preview only; full diff omitted from JSONL':
    'Сохранён только предпросмотр сессии; полный diff в JSONL не записан',
  'Saved session preview only; full file contents truncated in JSONL':
    'Сохранён только предпросмотр сессии; полное содержимое файла в JSONL обрезано',
  ' ({{fileDiffLength}} chars).': ' ({{fileDiffLength}} символов).',
  '(Focused)': '(в фокусе)',
  '(ctrl+f to focus)': '(ctrl+f — фокус)',
  'Something went wrong while rendering.': 'Что-то пошло не так при отрисовке.',
  'more below': 'ещё ниже',
  '[render error]': '[ошибка отрисовки]',
  'Installed extensions:': 'Установленные расширения:',
  'Open Link': 'Открыть ссылку',
  'Copy Link Address': 'Копировать адрес ссылки',
  'Copy Selection': 'Копировать выделение',
  'Daemon session disconnected: {{sanitizedReason}}':
    'Сессия демона отключена: {{sanitizedReason}}',
  'Model switched to {{modelId}}': 'Модель переключена на {{modelId}}',
  'Model {{fromModel}} unavailable, falling back to {{toModel}}':
    'Модель {{fromModel}} недоступна, переключаюсь на {{toModel}}',
  'Unsupported daemon protocol version: {{sanitizeDisplayText}}':
    'Неподдерживаемая версия протокола демона: {{sanitizeDisplayText}}',
  'Daemon event stream ended': 'Поток событий демона завершён',
  'Daemon RPC failed: {{message}}': 'Ошибка RPC демона: {{message}}',
  'Download {{url}}': 'Загрузка {{url}}',
  'Downloaded {{url}}': 'Загружено {{url}}',
  'Read resource {{label}}': 'Чтение ресурса {{label}}',
  'Activated extension {{displayName}}':
    'Активировано расширение {{displayName}}',
  'Activated MCP server {{serverName}}':
    'Активирован MCP-сервер {{serverName}}',
  'Reference session "{{value}}"': 'Ссылка на сессию "{{value}}"',
  'Reference session "{{title}}"': 'Ссылка на сессию "{{title}}"',
  'Reference session {{sessionId}}': 'Ссылка на сессию {{sessionId}}',
  'Referenced session "{{title}}"{{value}}':
    'Сессия "{{title}}" подключена{{value}}',
  'Error attempting to read files': 'Ошибка при чтении файлов',
  'An unexpected error occurred: {{errorMessage}}':
    'Произошла непредвиденная ошибка: {{errorMessage}}',
  'Command cancelled.': 'Команда отменена.',
  'Skill "/{{name}}" error: {{content}}':
    'Ошибка навыка "/{{name}}": {{content}}',
  'Only the first {{MAX_STACKED_SKILLS}} skills were loaded. Additional /skill tokens were treated as prompt text.':
    'Загружены только первые {{MAX_STACKED_SKILLS}} навыков. Остальные токены /skill обработаны как текст запроса.',
  'No Goal set.': 'Цель не задана.',
  'Operation cancelled.': 'Операция отменена.',
  'Request cancelled.': 'Запрос отменён.',
  'Stopped the self-paced loop: cancelled {{loopWakeupsCancelled}} pending wakeup{{value}}.':
    'Самостоятельный цикл остановлен: отменено ожидающих пробуждений: {{loopWakeupsCancelled}}.',
  'User cancelled the request.': 'Пользователь отменил запрос.',
  'Loop detection has been disabled for this session. Please try your request again.':
    'Обнаружение зацикливания для этой сессии отключено. Повторите запрос.',
  'A potential loop was detected. This can happen due to repetitive tool calls or other model behavior. The request has been halted.':
    'Обнаружено возможное зацикливание. Так бывает из-за повторяющихся вызовов инструментов или другого поведения модели. Запрос остановлен.',
  'Could not attach file: {{errorMessage}}':
    'Не удалось прикрепить файл: {{errorMessage}}',
  'Inline model override cleared on retry — retrying on the session model ({{value}}).':
    'Разовая подмена модели сброшена при повторе — повтор на модели сессии ({{value}}).',
  'Voice transcription failed: {{error}}':
    'Распознавание речи не удалось: {{error}}',
  'Qwen Code is waiting for your input': 'Coddy ждёт вашего ввода',
  'Coddy is waiting for your input': 'Coddy ждёт вашего ввода',
  'Coddy needs your permission to use {{tool}}':
    'Coddy просит разрешения на {{tool}}',
  'Extension "{{extensionDisplayName}}" successfully updated: {{originalVersion}} → {{updatedVersion}}.':
    'Расширение "{{extensionDisplayName}}" обновлено: {{originalVersion}} → {{updatedVersion}}.',
  'Encountered an unknown tool call state.':
    'Неизвестное состояние вызова инструмента.',
  'A session switch is already in progress. Try again in a moment.':
    'Переключение сессии уже идёт. Повторите через мгновение.',
  'Failed to resume session: {{error}}':
    'Не удалось возобновить сессию: {{error}}',
  'Configuration not available. Cannot show memory.':
    'Конфигурация недоступна. Невозможно показать память.',
  'Current combined memory content:\n```markdown\n{{currentMemory}}\n```':
    'Текущее объединённое содержимое памяти:\n```markdown\n{{currentMemory}}\n```',
  'Could not update workspace trust: {{error}}':
    'Не удалось обновить доверие к рабочей области: {{error}}',
  '... code is being written ...': '... код пишется ...',
  'Mermaid diagram is being written...': 'Mermaid-диаграмма пишется...',
  'LaTeX block · source:': 'Блок LaTeX · исходник:',
  'Image rendering unavailable:': 'Отрисовка изображения недоступна:',
  Done: 'Готово',
  'Goal checking': 'Проверка цели',
  'Goal paused': 'Цель на паузе',
  'Goal blocked': 'Цель заблокирована',
  'Goal usage limited': 'Лимит для цели исчерпан',
  'Goal complete': 'Цель выполнена',
  'Goal set': 'Цель задана',
  'Goal achieved': 'Цель достигнута',
  'Goal could not be achieved': 'Цель не удалось достичь',
  'Goal aborted': 'Цель прервана',
  'Mermaid diagram image ({{protocol}})':
    'Изображение Mermaid-диаграммы ({{protocol}})',
  'Mermaid diagram image (ANSI)': 'Изображение Mermaid-диаграммы (ANSI)',
  'Mermaid source ({{type}})': 'Исходник Mermaid ({{type}})',
  'Mermaid flowchart ({{direction}})': 'Mermaid: блок-схема ({{direction}})',
  'Mermaid sequence diagram': 'Mermaid: диаграмма последовательности',
  'Mermaid class diagram': 'Mermaid: диаграмма классов',
  'Mermaid state diagram': 'Mermaid: диаграмма состояний',
  'Mermaid ER diagram': 'Mermaid: ER-диаграмма',
  'Mermaid pie chart': 'Mermaid: круговая диаграмма',
  'Mermaid gantt chart': 'Mermaid: диаграмма Ганта',
  'Mermaid journey diagram': 'Mermaid: карта пути пользователя',
  'Conversation rewound.': 'Диалог откачен.',
  // coddy: темы и описания встроенных скиллов в /skills
  'Qwen Dark': 'Классическая тёмная',
  'Qwen Light': 'Классическая светлая',
  Dark: 'Тёмная',
  Light: 'Светлая',
  Ansi: 'ANSI',
  'skillDescription.autofix-pr':
    'Следить за pull request и чинить его в отдельном worktree: падения CI, замечания ревью и конфликты',
  'skillDescription.agent-delegation':
    'Как поручать работу субагенту или форку: что писать в задании и чего не делегировать',
  'skillDescription.batch-api':
    'Массовая однотипная правка многих файлов (перевод, переписывание, извлечение) планом и пакетом',
  'skillDescription.batch':
    'Пакетные операции над многими файлами параллельно: сам находит файлы и делит работу',
  'skillDescription.browser-use':
    'Управление вашим Chrome через постоянный Node REPL: открыть, кликнуть, прочитать страницу',
  'skillDescription.computer-use':
    'Управление приложениями на компьютере, когда нужно читать экран или нажимать в интерфейсе',
  'skillDescription.coordinate':
    'Координация небольшой команды агентов: рабочие только читают, правки — под контролем',
  'skillDescription.dataviz':
    'Как оформлять графики, дашборды, карты и визуализации данных',
  'skillDescription.extension-creator':
    'Создать, настроить, проверить и локально протестировать расширение Coddy',
  'skillDescription.goal-draft':
    'Превратить размытое намерение в цель для /goal, которую можно проверить',
  'skillDescription.loop':
    'Цикл: выполнить запрос сейчас и повторять по расписанию или по событию',
  'skillDescription.new-app':
    'Новое приложение с нуля: требования, выбор стека, каркас, первые шаги',
  'skillDescription.qc-helper':
    'Ответы на вопросы об устройстве и настройке агента (по документации апстрима)',
  'skillDescription.review':
    'Ревью изменений: корректность, безопасность, качество кода и производительность',
  'skillDescription.simplify':
    'Пересмотреть свежие правки на повторное использование, качество и эффективность и сразу поправить',
  'skillDescription.stuck':
    'Диагностика зависших и медленных сессий агента на этой машине',
  'skillDescription.workflow-authoring':
    'Справка по написанию сценариев Workflow: API, опции agent(), подводные камни',
  'skillDescription.workflow-creator':
    'Создать или обновить переиспользуемый сценарий Workflow в .coddy/workflows',
  'skillDescription.zvec-grep-install':
    'Установить zvec-grep (zg) и подключить к агенту',
  // coddy: подсказка после копирования выделения мышью
  'Copied {{count}} chars to clipboard': 'Скопировано в буфер: {{count}} симв.',
  'Could not copy selection to clipboard':
    'Не удалось скопировать выделение в буфер',
};
