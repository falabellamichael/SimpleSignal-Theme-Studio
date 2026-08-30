"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THEME_PRESETS = exports.SIMPLE_SYNTAX_DEFINITIONS = exports.SIMPLE_UI_DEFINITIONS = exports.SYNTAX_SCOPE_MAP = exports.SYNTAX_SCOPE_DEFINITIONS = exports.UI_COLOR_DEFINITIONS = void 0;
exports.normalizeStatusBarVariants = normalizeStatusBarVariants;
function normalizeStatusBarVariants(colors) {
    const normalized = { ...colors };
    const background = normalized['statusBar.background'];
    const foreground = normalized['statusBar.foreground'];
    if (background && !normalized['statusBar.noFolderBackground']) {
        normalized['statusBar.noFolderBackground'] = background;
    }
    if (foreground) {
        if (!normalized['statusBar.noFolderForeground']) {
            normalized['statusBar.noFolderForeground'] = foreground;
        }
        if (!normalized['statusBar.debuggingForeground']) {
            normalized['statusBar.debuggingForeground'] = foreground;
        }
    }
    return normalized;
}
exports.UI_COLOR_DEFINITIONS = [
    // 1. Core Window & Global Text
    { id: 'foreground', name: 'Global Base Text', description: 'Main default text across all views, lists and dialogs', category: 'core', defaultValue: '#cccccc' },
    { id: 'descriptionForeground', name: 'Muted & Counter Text (3/3)', description: 'Secondary helper text, counters and descriptions', category: 'core', defaultValue: '#858585' },
    { id: 'disabledForeground', name: 'Disabled Text', description: 'Faded text for disabled buttons and menu items', category: 'core', defaultValue: '#666666' },
    { id: 'icon.foreground', name: 'Global UI Icons (+, ⚙️, X)', description: 'Toolbar icons, action buttons and window controls', category: 'core', defaultValue: '#cccccc' },
    { id: 'focusBorder', name: 'Focus Border', description: 'Global focus outline on interactive elements', category: 'core', defaultValue: '#007fd4' },
    // 2. Editor Canvas & Hover Widgets
    { id: 'editor.background', name: 'Editor Background', description: 'Main coding canvas background color', category: 'core', defaultValue: '#1e1e1e' },
    { id: 'editorGutter.background', name: 'Editor Gutter Background', description: 'Background behind line numbers, glyphs and folding controls', category: 'core', defaultValue: '#1e1e1e' },
    { id: 'editor.foreground', name: 'Editor Code Text', description: 'Default code text / punctuation color', category: 'core', defaultValue: '#d4d4d4' },
    { id: 'editorLineNumber.foreground', name: 'Line Numbers', description: 'Gutter line number color', category: 'core', defaultValue: '#858585' },
    { id: 'editorLineNumber.activeForeground', name: 'Active Line Number', description: 'Line number of current cursor line', category: 'core', defaultValue: '#c6c6c6' },
    { id: 'editorCursor.foreground', name: 'Editor Cursor', description: 'Blinking text cursor color', category: 'core', defaultValue: '#aeafad' },
    { id: 'editor.selectionBackground', name: 'Selection Background', description: 'Highlighted text selection area', category: 'core', defaultValue: '#264f78' },
    { id: 'editor.lineHighlightBackground', name: 'Line Highlight', description: 'Background of line cursor is currently on', category: 'core', defaultValue: '#2a2d2e' },
    { id: 'editorHoverWidget.background', name: 'Hover Popup / Tooltip BG', description: 'Background of hover info boxes & tooltips (e.g. Unknown Setting)', category: 'core', defaultValue: '#252526' },
    { id: 'editorHoverWidget.foreground', name: 'Hover Popup Text', description: 'Text color inside hover tooltips & popups', category: 'core', defaultValue: '#cccccc' },
    { id: 'editorHoverWidget.border', name: 'Hover Popup Border', description: 'Border outline of hover info boxes & tooltips', category: 'core', defaultValue: '#454545' },
    { id: 'editorHoverWidget.statusBarBackground', name: 'Hover Popup Footer BG', description: 'Footer / status strip inside editor hover widgets', category: 'core', defaultValue: '#2c2c2d' },
    { id: 'editorSuggestWidget.background', name: 'Autocomplete Dropdown BG', description: 'Background of code intellisense suggestions box', category: 'core', defaultValue: '#252526' },
    { id: 'editorSuggestWidget.foreground', name: 'Autocomplete Text', description: 'Text inside code suggestions list', category: 'core', defaultValue: '#cccccc' },
    { id: 'editorSuggestWidget.border', name: 'Autocomplete Border', description: 'Border around the code suggestions list', category: 'core', defaultValue: '#454545' },
    { id: 'editorSuggestWidget.selectedBackground', name: 'Selected Suggestion BG', description: 'Background of the selected autocomplete item', category: 'core', defaultValue: '#04395e' },
    { id: 'editorSuggestWidget.selectedForeground', name: 'Selected Suggestion Text', description: 'Text of the selected autocomplete item', category: 'core', defaultValue: '#ffffff' },
    { id: 'editorSuggestWidget.highlightForeground', name: 'Suggestion Match Accent', description: 'Matching characters highlighted in autocomplete results', category: 'core', defaultValue: '#2aaaff' },
    { id: 'editorWidget.background', name: 'Find / Replace Widget BG', description: 'Background of search/replace and dialog widgets', category: 'core', defaultValue: '#252526' },
    { id: 'editorWidget.foreground', name: 'Find / Replace Widget Text', description: 'Text inside search/replace and editor dialogs', category: 'core', defaultValue: '#cccccc' },
    { id: 'editorWidget.border', name: 'Find / Replace Widget Border', description: 'Border of search/replace and dialog widgets', category: 'core', defaultValue: '#454545' },
    { id: 'textBlockQuote.background', name: 'Block Quote Background', description: 'Background behind quoted Markdown text', category: 'core', defaultValue: '#7f7f7f1a' },
    { id: 'textBlockQuote.border', name: 'Block Quote Border', description: 'Accent border beside quoted Markdown text', category: 'core', defaultValue: '#007acc80' },
    { id: 'textLink.activeForeground', name: 'Active Link Text', description: 'Clickable link color while active or pressed', category: 'core', defaultValue: '#3794ff' },
    { id: 'textPreformat.foreground', name: 'Inline Code Text', description: 'Foreground for inline code and preformatted text', category: 'core', defaultValue: '#d7ba7d' },
    // 3. Navigation & Activity Bars
    { id: 'activityBar.background', name: 'Activity Bar Background', description: 'Leftmost primary icon strip', category: 'bars', defaultValue: '#333333' },
    { id: 'activityBar.foreground', name: 'Activity Bar Icons', description: 'Active activity bar icon color', category: 'bars', defaultValue: '#ffffff' },
    { id: 'activityBar.inactiveForeground', name: 'Inactive Activity Icons', description: 'Inactive activity bar icon color', category: 'bars', defaultValue: '#858585' },
    { id: 'activityBarBadge.background', name: 'Activity Bar Badge BG', description: 'Notification badge background (e.g. Git count)', category: 'bars', defaultValue: '#007acc' },
    { id: 'activityBarBadge.foreground', name: 'Activity Bar Badge Text', description: 'Notification badge text color', category: 'bars', defaultValue: '#ffffff' },
    { id: 'sideBar.background', name: 'Sidebar Background', description: 'Explorer / Search / Extensions side panel background', category: 'bars', defaultValue: '#252526' },
    { id: 'sideBar.foreground', name: 'Sidebar & Explorer Text', description: 'File tree, folder names and items in the explorer sidebar', category: 'bars', defaultValue: '#cccccc' },
    { id: 'sideBarTitle.foreground', name: 'Sidebar Header & Title', description: 'EXPLORER section title and header text color', category: 'bars', defaultValue: '#bbbbbb' },
    { id: 'sideBarSectionHeader.background', name: 'Sidebar Section Header BG', description: 'Background of accordion section titles', category: 'bars', defaultValue: '#333333' },
    { id: 'sideBarSectionHeader.foreground', name: 'Sidebar Section Header Text', description: 'Text color of section header titles', category: 'bars', defaultValue: '#cccccc' },
    { id: 'titleBar.activeBackground', name: 'Title Bar Background', description: 'Top window title bar background', category: 'bars', defaultValue: '#3c3c3c' },
    { id: 'titleBar.activeForeground', name: 'Title Bar Foreground', description: 'Top window title bar text color', category: 'bars', defaultValue: '#cccccc' },
    { id: 'titleBar.inactiveBackground', name: 'Inactive Title Bar BG', description: 'Title bar background when the window is not focused', category: 'bars', defaultValue: '#3c3c3c99' },
    { id: 'titleBar.inactiveForeground', name: 'Inactive Title Bar Text', description: 'Title bar text when the window is not focused', category: 'bars', defaultValue: '#cccccc99' },
    { id: 'statusBar.background', name: 'Status Bar Background', description: 'Bottom status bar normal background', category: 'bars', defaultValue: '#007acc' },
    { id: 'statusBar.foreground', name: 'Status Bar Foreground', description: 'Bottom status bar text & icon color', category: 'bars', defaultValue: '#ffffff' },
    { id: 'statusBar.noFolderBackground', name: 'Empty Window Status Bar BG', description: 'Bottom status bar background when no folder or workspace is open', category: 'bars', defaultValue: '#007acc' },
    { id: 'statusBar.noFolderForeground', name: 'Empty Window Status Bar Text', description: 'Bottom status bar text and icons when no folder or workspace is open', category: 'bars', defaultValue: '#ffffff' },
    { id: 'statusBar.debuggingBackground', name: 'Status Bar Debugging BG', description: 'Status bar background during debugging session', category: 'bars', defaultValue: '#cc6633' },
    { id: 'statusBar.debuggingForeground', name: 'Status Bar Debugging Text', description: 'Bottom status bar text and icons during a debugging session', category: 'bars', defaultValue: '#ffffff' },
    // 4. Editor Tabs & Breadcrumbs
    { id: 'editorGroupHeader.tabsBackground', name: 'Tabs Bar Background', description: 'Background of the entire tab header bar', category: 'tabs', defaultValue: '#252526' },
    { id: 'tab.activeBackground', name: 'Active Tab Background', description: 'Background of currently open file tab', category: 'tabs', defaultValue: '#1e1e1e' },
    { id: 'tab.activeForeground', name: 'Active Tab Text', description: 'Text color of currently open file tab', category: 'tabs', defaultValue: '#ffffff' },
    { id: 'tab.activeBorderTop', name: 'Active Tab Top Border', description: 'Top accent indicator on active tab', category: 'tabs', defaultValue: '#007acc' },
    { id: 'tab.inactiveBackground', name: 'Inactive Tab Background', description: 'Background of inactive file tabs', category: 'tabs', defaultValue: '#2d2d2d' },
    { id: 'tab.inactiveForeground', name: 'Inactive Tab Text', description: 'Text color of inactive file tabs', category: 'tabs', defaultValue: '#858585' },
    { id: 'tab.hoverBackground', name: 'Tab Hover Background', description: 'Background when hovering over a tab', category: 'tabs', defaultValue: '#333333' },
    { id: 'breadcrumb.foreground', name: 'Breadcrumbs Text', description: 'File path breadcrumbs navigation text', category: 'tabs', defaultValue: '#a0a0a0' },
    // 5. Terminal & Panels
    { id: 'terminal.background', name: 'Terminal Background', description: 'Integrated terminal console background', category: 'terminal', defaultValue: '#1e1e1e' },
    { id: 'terminal.foreground', name: 'Terminal Foreground', description: 'Integrated terminal normal text color', category: 'terminal', defaultValue: '#cccccc' },
    { id: 'terminalCursor.foreground', name: 'Terminal Cursor', description: 'Integrated terminal cursor color', category: 'terminal', defaultValue: '#007acc' },
    { id: 'terminal.ansiGreen', name: 'Terminal ANSI Green', description: 'Terminal green color (success / output)', category: 'terminal', defaultValue: '#4ec9b0' },
    { id: 'terminal.ansiCyan', name: 'Terminal ANSI Cyan', description: 'Terminal cyan color (info / URLs)', category: 'terminal', defaultValue: '#9cdcfe' },
    { id: 'terminal.ansiYellow', name: 'Terminal ANSI Yellow', description: 'Terminal yellow color (warnings)', category: 'terminal', defaultValue: '#dcdcaa' },
    // 6. Chat, AI Widgets & Input Boxes
    { id: 'input.background', name: 'Input & Chat Box BG', description: 'Background of text inputs and chat prompt boxes', category: 'chat', defaultValue: '#252526' },
    { id: 'input.foreground', name: 'Input & Chat Box Text', description: 'Text typed inside search fields and chat inputs', category: 'chat', defaultValue: '#cccccc' },
    { id: 'input.placeholderForeground', name: 'Input Placeholder Text', description: 'Faint hint / placeholder text inside inputs & chat', category: 'chat', defaultValue: '#757575' },
    { id: 'panel.background', name: 'Panel & Chat Container BG', description: 'Background of bottom panel and chat drawer', category: 'chat', defaultValue: '#1e1e1e' },
    { id: 'panel.border', name: 'Panel Border', description: 'Border separating bottom / side panel from editor', category: 'chat', defaultValue: '#282828' },
    { id: 'panelTitle.activeForeground', name: 'Active Panel Tab Title', description: 'Text color of active tab (e.g. Chat, Output, Terminal)', category: 'chat', defaultValue: '#e7e7e7' },
    { id: 'panelTitle.inactiveForeground', name: 'Inactive Panel Tab Titles', description: 'Text color of inactive tabs (e.g. Codex, CodeGPT Chat)', category: 'chat', defaultValue: '#858585' },
    { id: 'panelTitle.activeBorder', name: 'Active Panel Tab Border', description: 'Underline indicator on active panel tab', category: 'chat', defaultValue: '#007acc' },
    { id: 'chat.requestBackground', name: 'Chat User Bubble BG', description: 'Background for user prompt bubble in chat', category: 'chat', defaultValue: '#252526' },
    { id: 'chat.requestBorder', name: 'Chat User Bubble Border', description: 'Border for user prompt bubble in chat', category: 'chat', defaultValue: '#333333' },
    { id: 'chat.avatarBackground', name: 'Chat Avatar BG', description: 'Background color behind chat participant avatars', category: 'chat', defaultValue: '#007acc' },
    { id: 'chat.avatarForeground', name: 'Chat Avatar Text', description: 'Icon or initials shown on chat avatars', category: 'chat', defaultValue: '#ffffff' },
    { id: 'chat.slashCommandBackground', name: 'Slash Command BG', description: 'Background of slash-command pills in chat inputs', category: 'chat', defaultValue: '#007acc' },
    { id: 'chat.slashCommandForeground', name: 'Slash Command Text', description: 'Text inside slash-command pills', category: 'chat', defaultValue: '#ffffff' },
    { id: 'interactive.requestBackground', name: 'Chat Prompt Box BG', description: 'Background for chat user input box', category: 'chat', defaultValue: '#252526' },
    { id: 'interactive.requestBorder', name: 'Chat Prompt Box Border', description: 'Border around interactive chat requests and prompts', category: 'chat', defaultValue: '#454545' },
    { id: 'textCodeBlock.background', name: 'Chat Code Block BG', description: 'Background of formatted code blocks in chat', category: 'chat', defaultValue: '#1a1a1a' },
    { id: 'textLink.foreground', name: 'Chat Hyperlinks', description: 'Color of clickable markdown links', category: 'chat', defaultValue: '#3794ff' },
    { id: 'badge.background', name: 'General Badge BG', description: 'Pills and tag badges in chat and lists', category: 'chat', defaultValue: '#4d4d4d' },
    { id: 'badge.foreground', name: 'General Badge Text', description: 'Text inside pills and tag badges', category: 'chat', defaultValue: '#ffffff' },
];
exports.SYNTAX_SCOPE_DEFINITIONS = [
    { id: 'keywords', name: 'Keywords & Control Flow', description: 'if, else, return, const, let, class, import, async, export', scopes: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'], defaultColor: '#569cd6' },
    { id: 'functions', name: 'Functions & Methods', description: 'function names, method calls, constructors', scopes: ['entity.name.function', 'support.function', 'meta.function-call'], defaultColor: '#dcdcaa' },
    { id: 'strings', name: 'Strings & Templates', description: 'quoted text, template literals, character literals', scopes: ['string', 'string.quoted', 'string.quoted.double', 'string.quoted.single', 'string.template', 'string.unquoted', 'string.json', 'source.json string', 'meta.structure.dictionary.value.json string.quoted.double.json'], defaultColor: '#ce9178' },
    { id: 'variables', name: 'Variables & Identifiers', description: 'variable names, parameters, object properties', scopes: ['variable', 'variable.other', 'variable.parameter', 'variable.language'], defaultColor: '#9cdcfe' },
    { id: 'properties', name: 'Object & JSON Keys', description: 'JSON keys, object literal keys, dictionary keys', scopes: ['support.type.property-name', 'meta.object-literal.key', 'support.type.property-name.json', 'meta.structure.dictionary.json string.quoted.double.json', 'entity.name.tag.json'], defaultColor: '#dcdcaa' },
    { id: 'types', name: 'Types & Classes', description: 'interfaces, type aliases, classes, struct names', scopes: ['entity.name.type', 'support.type', 'entity.name.class', 'entity.other.inherited-class'], defaultColor: '#4ec9b0' },
    { id: 'comments', name: 'Comments', description: 'single-line // and multi-line /* */ comments', scopes: ['comment', 'comment.line', 'comment.block'], defaultColor: '#6a9955' },
    { id: 'numbers', name: 'Numbers & Booleans', description: 'integers, floats, true, false, null, undefined', scopes: ['constant.numeric', 'constant.numeric.json', 'constant.language.boolean', 'constant.language.json', 'constant.language'], defaultColor: '#b5cea8' },
    { id: 'operators', name: 'Operators & Punctuation', description: '+, -, *, =, =>, ==, &&, ||, ;, :, ,', scopes: ['keyword.operator', 'punctuation.separator', 'punctuation.terminator'], defaultColor: '#d4d4d4' },
    { id: 'tags', name: 'HTML / JSX Tags & Attributes', description: 'div, span, Button, onClick, className', scopes: ['entity.name.tag', 'entity.other.attribute-name'], defaultColor: '#4fc1ff' },
];
exports.SYNTAX_SCOPE_MAP = Object.freeze(Object.fromEntries(exports.SYNTAX_SCOPE_DEFINITIONS.map((definition) => [definition.id, definition.scopes])));
exports.SIMPLE_UI_DEFINITIONS = [
    {
        id: 'simple.accent',
        name: 'Primary Accent',
        description: 'Focus outlines, cursors, links, active borders, badge fills and chat accents',
        icon: '✨',
        section: 'Foundations',
        targets: [
            'focusBorder',
            'editorLineNumber.activeForeground',
            'editorCursor.foreground',
            'activityBarBadge.background',
            'tab.activeBorderTop',
            'terminalCursor.foreground',
            'panelTitle.activeBorder',
            'textLink.foreground',
            'textLink.activeForeground',
            'badge.background',
            'editorSuggestWidget.highlightForeground',
            'chat.avatarBackground',
            'chat.slashCommandBackground',
        ],
        defaultColor: '#007acc',
    },
    {
        id: 'simple.canvasBg',
        name: 'Canvas & Main Panels',
        description: 'Editor, line-number gutter, terminal, active tab and main panel backgrounds',
        icon: '🖥️',
        section: 'Foundations',
        targets: ['editor.background', 'editorGutter.background', 'tab.activeBackground', 'terminal.background', 'panel.background'],
        defaultColor: '#1e1e1e',
    },
    {
        id: 'simple.chromeBg',
        name: 'Workbench Chrome',
        description: 'Sidebar, activity bar, title bars and the tabs strip',
        icon: '🧭',
        section: 'Foundations',
        targets: ['sideBar.background', 'activityBar.background', 'titleBar.activeBackground', 'titleBar.inactiveBackground', 'editorGroupHeader.tabsBackground'],
        defaultColor: '#252526',
    },
    {
        id: 'simple.secondaryBg',
        name: 'Secondary Surfaces',
        description: 'Section headers, inactive tabs, hover states, code blocks and quotes',
        icon: '🗃️',
        section: 'Foundations',
        targets: ['sideBarSectionHeader.background', 'tab.inactiveBackground', 'tab.hoverBackground', 'editor.lineHighlightBackground', 'textCodeBlock.background', 'textBlockQuote.background'],
        defaultColor: '#2d2d2d',
    },
    {
        id: 'simple.inputBg',
        name: 'Inputs & Chat Surfaces',
        description: 'Search fields, prompt boxes and user request bubbles',
        icon: '💬',
        section: 'Foundations',
        targets: ['input.background', 'chat.requestBackground', 'interactive.requestBackground'],
        defaultColor: '#252526',
    },
    {
        id: 'simple.popupBg',
        name: 'Popup & Widget Surfaces',
        description: 'Hover cards, autocomplete lists, selected suggestions and editor dialogs',
        icon: '🪟',
        section: 'Foundations',
        targets: ['editorHoverWidget.background', 'editorHoverWidget.statusBarBackground', 'editorSuggestWidget.background', 'editorSuggestWidget.selectedBackground', 'editorWidget.background'],
        defaultColor: '#252526',
    },
    {
        id: 'simple.primaryText',
        name: 'Primary Text & Icons',
        description: 'Main app, editor, terminal, input, popup and active-tab text',
        icon: '📝',
        section: 'Typography',
        targets: [
            'foreground',
            'icon.foreground',
            'editor.foreground',
            'terminal.foreground',
            'input.foreground',
            'editorHoverWidget.foreground',
            'editorSuggestWidget.foreground',
            'editorWidget.foreground',
            'textPreformat.foreground',
            'tab.activeForeground',
            'panelTitle.activeForeground',
        ],
        defaultColor: '#cccccc',
    },
    {
        id: 'simple.navigationText',
        name: 'Navigation & Bar Text',
        description: 'Activity icons, Explorer items, sidebar headings and title-bar text',
        icon: '🗂️',
        section: 'Typography',
        targets: ['activityBar.foreground', 'sideBar.foreground', 'sideBarTitle.foreground', 'sideBarSectionHeader.foreground', 'titleBar.activeForeground'],
        defaultColor: '#cccccc',
    },
    {
        id: 'simple.mutedText',
        name: 'Muted & Inactive Text',
        description: 'Descriptions, placeholders, line numbers and inactive navigation labels',
        icon: '🌫️',
        section: 'Typography',
        targets: ['descriptionForeground', 'disabledForeground', 'editorLineNumber.foreground', 'activityBar.inactiveForeground', 'titleBar.inactiveForeground', 'tab.inactiveForeground', 'breadcrumb.foreground', 'input.placeholderForeground', 'panelTitle.inactiveForeground'],
        defaultColor: '#858585',
    },
    {
        id: 'simple.onAccentText',
        name: 'Text on Accent',
        description: 'Text shown over badges, avatars, slash commands, selected items and status bars',
        icon: '🔤',
        section: 'Typography',
        targets: ['activityBarBadge.foreground', 'badge.foreground', 'chat.avatarForeground', 'chat.slashCommandForeground', 'editorSuggestWidget.selectedForeground', 'statusBar.foreground', 'statusBar.noFolderForeground', 'statusBar.debuggingForeground'],
        defaultColor: '#ffffff',
    },
    {
        id: 'simple.selectionBg',
        name: 'Selection Highlight',
        description: 'Background behind selected editor text',
        icon: '🖍️',
        section: 'States & Structure',
        targets: ['editor.selectionBackground'],
        defaultColor: '#264f78',
    },
    {
        id: 'simple.border',
        name: 'Borders & Dividers',
        description: 'Popup, panel, chat, quote and input outlines',
        icon: '▣',
        section: 'States & Structure',
        targets: ['editorHoverWidget.border', 'editorSuggestWidget.border', 'editorWidget.border', 'panel.border', 'chat.requestBorder', 'interactive.requestBorder', 'textBlockQuote.border'],
        defaultColor: '#454545',
    },
    {
        id: 'simple.statusBarBg',
        name: 'Status Bar Backgrounds',
        description: 'Normal, empty-window and debugging backgrounds for the bottom status bar',
        icon: '📊',
        section: 'States & Structure',
        targets: ['statusBar.background', 'statusBar.noFolderBackground', 'statusBar.debuggingBackground'],
        defaultColor: '#007acc',
    },
    {
        id: 'simple.success',
        name: 'Terminal Success',
        description: 'Green success and completed-output text in the terminal',
        icon: '✅',
        section: 'Terminal Signals',
        targets: ['terminal.ansiGreen'],
        defaultColor: '#4ec9b0',
    },
    {
        id: 'simple.info',
        name: 'Terminal Info',
        description: 'Cyan informational output and terminal links',
        icon: 'ℹ️',
        section: 'Terminal Signals',
        targets: ['terminal.ansiCyan'],
        defaultColor: '#9cdcfe',
    },
    {
        id: 'simple.warning',
        name: 'Terminal Warning',
        description: 'Yellow warning and attention text in the terminal',
        icon: '⚠️',
        section: 'Terminal Signals',
        targets: ['terminal.ansiYellow'],
        defaultColor: '#dcdcaa',
    },
];
exports.SIMPLE_SYNTAX_DEFINITIONS = [
    {
        id: 'simple.keywords',
        name: 'Keywords & Properties',
        description: 'Control flow, declarations, object keys and JSON properties',
        icon: '🔑',
        section: 'Code Structure',
        targets: ['keywords', 'properties'],
        defaultColor: '#ff007f',
    },
    {
        id: 'simple.functions',
        name: 'Functions & Markup',
        description: 'Function calls, methods, constructors, HTML/JSX tags and attributes',
        icon: '⚡',
        section: 'Code Structure',
        targets: ['functions', 'tags'],
        defaultColor: '#00f0ff',
    },
    {
        id: 'simple.variables',
        name: 'Variables & Operators',
        description: 'Identifiers, parameters, assignment, comparison and punctuation',
        icon: '📦',
        section: 'Code Structure',
        targets: ['variables', 'operators'],
        defaultColor: '#f0f0f8',
    },
    {
        id: 'simple.types',
        name: 'Types & Interfaces',
        description: 'Classes, types, interfaces, structs and enums',
        icon: '🏷️',
        section: 'Code Structure',
        targets: ['types'],
        defaultColor: '#b829ff',
    },
    {
        id: 'simple.strings',
        name: 'Strings & Content',
        description: 'Quoted text, template strings, character literals',
        icon: '📜',
        section: 'Values & Notes',
        targets: ['strings'],
        defaultColor: '#ffe600',
    },
    {
        id: 'simple.numbers',
        name: 'Numbers & Constants',
        description: 'Numbers, booleans, null and language constants',
        icon: '🔢',
        section: 'Values & Notes',
        targets: ['numbers'],
        defaultColor: '#b5cea8',
    },
    {
        id: 'simple.comments',
        name: 'Comments',
        description: 'Single-line // and multi-line /* */ code comments',
        icon: '💭',
        section: 'Values & Notes',
        targets: ['comments'],
        defaultColor: '#555566',
    },
];
const WHITE_TUXEDO_SYNTAX = {
    keywords: '#ffffff',
    functions: '#e6e6e6',
    strings: '#bfbfbf',
    variables: '#f5f5f5',
    properties: '#d9d9d9',
    types: '#cccccc',
    comments: '#8c8c8c',
    numbers: '#ffffff',
    operators: '#b3b3b3',
    tags: '#e6e6e6',
};
const WHITE_TUXEDO_PRESET = {
    id: 'white-tuxedo',
    name: '🤵 White Tuxedo',
    description: 'Pure light navigation and chrome alternate with a pure black editor, terminal, tabs and workspace. Every text surface is explicitly contrast-paired.',
    type: 'light',
    accentColor: '#007acc',
    colors: {
        'foreground': '#000000',
        'descriptionForeground': '#595959',
        'disabledForeground': '#767676',
        'icon.foreground': '#ffffff',
        'focusBorder': '#007acc',
        'editor.background': '#000000',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#8f8f8f',
        'editorLineNumber.activeForeground': '#ffffff',
        'editorCursor.foreground': '#ffffff',
        'editor.selectionBackground': '#3a3a3a',
        'editor.lineHighlightBackground': '#121212',
        'editorHoverWidget.background': '#ffffff',
        'editorHoverWidget.foreground': '#000000',
        'editorHoverWidget.border': '#000000',
        'editorHoverWidget.statusBarBackground': '#e6e6e6',
        'editorSuggestWidget.background': '#ffffff',
        'editorSuggestWidget.foreground': '#000000',
        'editorSuggestWidget.border': '#000000',
        'editorSuggestWidget.selectedBackground': '#000000',
        'editorSuggestWidget.selectedForeground': '#ffffff',
        'editorSuggestWidget.highlightForeground': '#007acc',
        'editorWidget.background': '#262626',
        'editorWidget.foreground': '#ffffff',
        'editorWidget.border': '#8f8f8f',
        'textBlockQuote.background': '#1a1a1a',
        'textBlockQuote.border': '#ffffff',
        'textLink.activeForeground': '#007acc',
        'textPreformat.foreground': '#ffffff',
        'activityBar.background': '#ffffff',
        'activityBar.foreground': '#000000',
        'activityBar.inactiveForeground': '#595959',
        'activityBarBadge.background': '#000000',
        'activityBarBadge.foreground': '#ffffff',
        'sideBar.background': '#ffffff',
        'sideBar.foreground': '#000000',
        'sideBarTitle.foreground': '#000000',
        'sideBarSectionHeader.background': '#000000',
        'sideBarSectionHeader.foreground': '#ffffff',
        'titleBar.activeBackground': '#ffffff',
        'titleBar.activeForeground': '#000000',
        'titleBar.inactiveBackground': '#e6e6e6',
        'titleBar.inactiveForeground': '#000000',
        'statusBar.background': '#ffffff',
        'statusBar.foreground': '#000000',
        'statusBar.noFolderBackground': '#ffffff',
        'statusBar.noFolderForeground': '#000000',
        'statusBar.debuggingBackground': '#000000',
        'statusBar.debuggingForeground': '#ffffff',
        'editorGroupHeader.tabsBackground': '#000000',
        'tab.activeBackground': '#000000',
        'tab.activeForeground': '#ffffff',
        'tab.activeBorderTop': '#ffffff',
        'tab.inactiveBackground': '#262626',
        'tab.inactiveForeground': '#d6d6d6',
        'tab.hoverBackground': '#3a3a3a',
        'breadcrumb.foreground': '#ffffff',
        'terminal.background': '#000000',
        'terminal.foreground': '#ffffff',
        'terminalCursor.foreground': '#ffffff',
        'terminal.ansiGreen': '#00d26a',
        'terminal.ansiCyan': '#00d9ff',
        'terminal.ansiYellow': '#ffd400',
        'input.background': '#ffffff',
        'input.foreground': '#000000',
        'input.placeholderForeground': '#595959',
        'panel.background': '#000000',
        'panel.border': '#8f8f8f',
        'panelTitle.activeForeground': '#ffffff',
        'panelTitle.inactiveForeground': '#a3a3a3',
        'panelTitle.activeBorder': '#ffffff',
        'chat.requestBackground': '#262626',
        'chat.requestBorder': '#ffffff',
        'chat.avatarBackground': '#000000',
        'chat.avatarForeground': '#ffffff',
        'chat.slashCommandBackground': '#000000',
        'chat.slashCommandForeground': '#ffffff',
        'interactive.requestBackground': '#262626',
        'interactive.requestBorder': '#ffffff',
        'textCodeBlock.background': '#262626',
        'textLink.foreground': '#007acc',
        'badge.background': '#000000',
        'badge.foreground': '#ffffff',
    },
    tokenColors: exports.SYNTAX_SCOPE_DEFINITIONS.map((definition) => ({
        scope: [...definition.scopes],
        settings: {
            foreground: WHITE_TUXEDO_SYNTAX[definition.id],
            ...(definition.id === 'comments' ? { fontStyle: 'italic' } : {}),
        },
    })),
};
const SKELETON_VALLEY_PRESET = {
    id: 'skeleton-valley',
    name: '💀 Skeleton Valley',
    description: 'A warm off-white variation of White Tuxedo: bone-colored navigation and chrome checkerboard against pure-black editor, terminal, tabs and workspace surfaces.',
    type: 'light',
    accentColor: '#7a4b00',
    colors: {
        ...WHITE_TUXEDO_PRESET.colors,
        'foreground': '#17130f',
        'descriptionForeground': '#5f584e',
        'disabledForeground': '#70685d',
        'icon.foreground': '#17130f',
        'focusBorder': '#7a4b00',
        'editor.background': '#171512',
        'editorGutter.background': '#f2eee3',
        'editorHoverWidget.background': '#f2eee3',
        'editorHoverWidget.foreground': '#17130f',
        'editorHoverWidget.statusBarBackground': '#ded6c8',
        'editorSuggestWidget.background': '#f2eee3',
        'editorSuggestWidget.foreground': '#17130f',
        'editorSuggestWidget.selectedBackground': '#171512',
        'editorSuggestWidget.highlightForeground': '#7a4b00',
        'textLink.activeForeground': '#a96800',
        'activityBar.background': '#f2eee3',
        'activityBar.foreground': '#17130f',
        'activityBar.inactiveForeground': '#5f584e',
        'activityBarBadge.background': '#171512',
        'sideBar.background': '#f2eee3',
        'sideBar.foreground': '#17130f',
        'sideBarTitle.foreground': '#17130f',
        'sideBarSectionHeader.background': '#171512',
        'titleBar.activeBackground': '#f2eee3',
        'titleBar.activeForeground': '#17130f',
        'titleBar.inactiveBackground': '#ded6c8',
        'titleBar.inactiveForeground': '#17130f',
        'statusBar.background': '#f2eee3',
        'statusBar.foreground': '#17130f',
        'statusBar.noFolderBackground': '#f2eee3',
        'statusBar.noFolderForeground': '#17130f',
        'statusBar.debuggingBackground': '#171512',
        'editorGroupHeader.tabsBackground': '#171512',
        'tab.activeBackground': '#171512',
        'tab.activeBorderTop': '#f2eee3',
        'terminal.background': '#171512',
        'input.background': '#faf7f0',
        'input.foreground': '#17130f',
        'input.placeholderForeground': '#5f584e',
        'panel.background': '#171512',
        'chat.requestBorder': '#f2eee3',
        'chat.avatarBackground': '#171512',
        'chat.slashCommandBackground': '#171512',
        'interactive.requestBorder': '#f2eee3',
        'textCodeBlock.background': '#f2eee3',
        'textLink.foreground': '#7a4b00',
        'badge.background': '#171512',
    },
    tokenColors: WHITE_TUXEDO_PRESET.tokenColors.map((rule) => ({
        ...rule,
        scope: Array.isArray(rule.scope) ? [...rule.scope] : rule.scope,
        settings: { ...rule.settings },
    })),
};
const RAW_THEME_PRESETS = [
    WHITE_TUXEDO_PRESET,
    SKELETON_VALLEY_PRESET,
    // 🍋 Lemonade Dark
    {
        id: "lemonade-dark",
        name: "\ud83c\udf4b Lemonade Dark",
        description: "Crisp citrus obsidian palette with electric lemon zest, lime glow, and mint highlights.",
        type: "dark",
        accentColor: "#fff017",
        colors: {
            "foreground": "#f7fbe8",
            "descriptionForeground": "#8d9c79",
            "disabledForeground": "#4b553e",
            "icon.foreground": "#fff017",
            "editor.background": "#0c0f0a",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4b553e",
            "editorLineNumber.activeForeground": "#fff017",
            "editorCursor.foreground": "#fff017",
            "editor.selectionBackground": "#131a10",
            "editor.lineHighlightBackground": "#131a10",
            "editorHoverWidget.background": "#0f140c",
            "editorHoverWidget.foreground": "#d8e2cb",
            "editorHoverWidget.border": "#131a10",
            "editorHoverWidget.statusBarBackground": "#131a10",
            "editorSuggestWidget.background": "#0f140c",
            "editorSuggestWidget.foreground": "#d8e2cb",
            "editorSuggestWidget.border": "#131a10",
            "editorSuggestWidget.selectedBackground": "#131a10",
            "editorSuggestWidget.selectedForeground": "#fff017",
            "editorSuggestWidget.highlightForeground": "#fff017",
            "editorWidget.background": "#0f140c",
            "editorWidget.foreground": "#d8e2cb",
            "editorWidget.border": "#131a10",
            "focusBorder": "#fff017",
            "activityBar.background": "#080a06",
            "activityBar.foreground": "#fff017",
            "activityBar.inactiveForeground": "#4b553e",
            "activityBarBadge.background": "#fff017",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0f140c",
            "sideBar.foreground": "#d8e2cb",
            "sideBarTitle.foreground": "#fff017",
            "sideBarSectionHeader.background": "#131a10",
            "sideBarSectionHeader.foreground": "#d8e2cb",
            "titleBar.activeBackground": "#080a06",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#080a06",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#080a06",
            "statusBar.foreground": "#fff017",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0f140c",
            "tab.activeBackground": "#0c0f0a",
            "tab.activeForeground": "#fff017",
            "tab.activeBorderTop": "#fff017",
            "tab.inactiveBackground": "#131a10",
            "tab.inactiveForeground": "#8d9c79",
            "tab.hoverBackground": "#131a10",
            "breadcrumb.foreground": "#8d9c79",
            "terminal.background": "#0c0f0a",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#fff017",
            "terminal.ansiGreen": "#a3e635",
            "terminal.ansiCyan": "#67e8f9",
            "terminal.ansiYellow": "#bef264",
            "input.background": "#182013",
            "input.foreground": "#f7fbe8",
            "input.placeholderForeground": "#8d9c79",
            "panel.background": "#0c0f0a",
            "panel.border": "#0f140c",
            "panelTitle.activeForeground": "#fff017",
            "panelTitle.inactiveForeground": "#8d9c79",
            "panelTitle.activeBorder": "#fff017",
            "chat.requestBackground": "#182013",
            "chat.requestBorder": "#131a10",
            "chat.slashCommandBackground": "#131a10",
            "chat.slashCommandForeground": "#fff017",
            "chat.avatarBackground": "#131a10",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#182013",
            "interactive.requestBorder": "#131a10",
            "textCodeBlock.background": "#131a10",
            "textLink.foreground": "#fff017",
            "textLink.activeForeground": "#fff017",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#131a10",
            "textBlockQuote.border": "#fff017",
            "badge.background": "#fff017",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#facc15",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#a3e635"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#bef264"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#facc15"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f7fbe8"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#67e8f9"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4b553e",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fb923c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f7fbe8"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#a3e635"
                }
            }
        ]
    },
    // 🍹 Lemonade Light
    {
        id: "lemonade-light",
        name: "\ud83c\udf79 Lemonade Light",
        description: "Refreshing summer citrus light theme with iced lemonade cream, lemon yellow, and chilled lime.",
        type: "light",
        accentColor: "#ca8a04",
        colors: {
            "foreground": "#181514",
            "descriptionForeground": "#713f12",
            "disabledForeground": "#78716c",
            "icon.foreground": "#000000",
            "editor.background": "#fefce8",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#ca8a04",
            "editorCursor.foreground": "#ca8a04",
            "editor.selectionBackground": "#fef08a88",
            "editor.lineHighlightBackground": "#fef08a88",
            "editorHoverWidget.background": "#fffbeb",
            "editorHoverWidget.foreground": "#181514",
            "editorHoverWidget.border": "#fef08a88",
            "editorHoverWidget.statusBarBackground": "#fef08a88",
            "editorSuggestWidget.background": "#fffbeb",
            "editorSuggestWidget.foreground": "#181514",
            "editorSuggestWidget.border": "#fef08a88",
            "editorSuggestWidget.selectedBackground": "#fef08a88",
            "editorSuggestWidget.selectedForeground": "#ca8a04",
            "editorSuggestWidget.highlightForeground": "#ca8a04",
            "editorWidget.background": "#fffbeb",
            "editorWidget.foreground": "#181514",
            "editorWidget.border": "#fef08a88",
            "focusBorder": "#ca8a04",
            "activityBar.background": "#fef08a",
            "activityBar.foreground": "#ca8a04",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#ca8a04",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#fffbeb",
            "sideBar.foreground": "#181514",
            "sideBarTitle.foreground": "#713f12",
            "sideBarSectionHeader.background": "#fef08a88",
            "sideBarSectionHeader.foreground": "#181514",
            "titleBar.activeBackground": "#fef08a",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fef08a",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#eab308",
            "statusBar.foreground": "#422006",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fffbeb",
            "tab.activeBackground": "#fefce8",
            "tab.activeForeground": "#ca8a04",
            "tab.activeBorderTop": "#ca8a04",
            "tab.inactiveBackground": "#fef08a88",
            "tab.inactiveForeground": "#713f12",
            "tab.hoverBackground": "#fef08a88",
            "breadcrumb.foreground": "#713f12",
            "terminal.background": "#fefce8",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#ca8a04",
            "terminal.ansiGreen": "#15803d",
            "terminal.ansiCyan": "#1d4ed8",
            "terminal.ansiYellow": "#047857",
            "input.background": "#fef9c3",
            "input.foreground": "#181514",
            "input.placeholderForeground": "#713f12",
            "panel.background": "#fefce8",
            "panel.border": "#fffbeb",
            "panelTitle.activeForeground": "#ca8a04",
            "panelTitle.inactiveForeground": "#713f12",
            "panelTitle.activeBorder": "#ca8a04",
            "chat.requestBackground": "#fef9c3",
            "chat.requestBorder": "#fef08a88",
            "chat.slashCommandBackground": "#fef08a88",
            "chat.slashCommandForeground": "#ca8a04",
            "chat.avatarBackground": "#fef08a88",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#fef9c3",
            "interactive.requestBorder": "#fef08a88",
            "textCodeBlock.background": "#fef08a88",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fef08a88",
            "textBlockQuote.border": "#ca8a04",
            "badge.background": "#ca8a04",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#181514"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#181514"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            }
        ]
    },
    // 👁️ High Contrast Dark (Colorblind Safe)
    {
        id: "high-contrast-colorblind-dark",
        name: "\ud83d\udc41\ufe0f High Contrast Dark (Colorblind Safe)",
        description: "Certified accessible palette (WCAG AAA 7:1+) engineered for deuteranopia, protanopia, and low-vision clarity with vibrant cyan, amber & white.",
        type: "dark",
        accentColor: "#00f0ff",
        colors: {
            "foreground": "#ffffff",
            "descriptionForeground": "#aaaaaa",
            "disabledForeground": "#888888",
            "icon.foreground": "#00f0ff",
            "editor.background": "#000000",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#888888",
            "editorLineNumber.activeForeground": "#00f0ff",
            "editorCursor.foreground": "#00f0ff",
            "editor.selectionBackground": "#121212",
            "editor.lineHighlightBackground": "#121212",
            "editorHoverWidget.background": "#0a0a0a",
            "editorHoverWidget.foreground": "#f0f0f0",
            "editorHoverWidget.border": "#121212",
            "editorHoverWidget.statusBarBackground": "#121212",
            "editorSuggestWidget.background": "#0a0a0a",
            "editorSuggestWidget.foreground": "#f0f0f0",
            "editorSuggestWidget.border": "#121212",
            "editorSuggestWidget.selectedBackground": "#121212",
            "editorSuggestWidget.selectedForeground": "#00f0ff",
            "editorSuggestWidget.highlightForeground": "#00f0ff",
            "editorWidget.background": "#0a0a0a",
            "editorWidget.foreground": "#f0f0f0",
            "editorWidget.border": "#121212",
            "focusBorder": "#00f0ff",
            "activityBar.background": "#050505",
            "activityBar.foreground": "#00f0ff",
            "activityBar.inactiveForeground": "#888888",
            "activityBarBadge.background": "#00f0ff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0a0a0a",
            "sideBar.foreground": "#f0f0f0",
            "sideBarTitle.foreground": "#00f0ff",
            "sideBarSectionHeader.background": "#121212",
            "sideBarSectionHeader.foreground": "#f0f0f0",
            "titleBar.activeBackground": "#050505",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#050505",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#000000",
            "statusBar.foreground": "#00f0ff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0a0a0a",
            "tab.activeBackground": "#000000",
            "tab.activeForeground": "#00f0ff",
            "tab.activeBorderTop": "#00f0ff",
            "tab.inactiveBackground": "#121212",
            "tab.inactiveForeground": "#aaaaaa",
            "tab.hoverBackground": "#121212",
            "breadcrumb.foreground": "#aaaaaa",
            "terminal.background": "#000000",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#00f0ff",
            "terminal.ansiGreen": "#00f0ff",
            "terminal.ansiCyan": "#dc267f",
            "terminal.ansiYellow": "#648fff",
            "input.background": "#141414",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#aaaaaa",
            "panel.background": "#000000",
            "panel.border": "#0a0a0a",
            "panelTitle.activeForeground": "#00f0ff",
            "panelTitle.inactiveForeground": "#aaaaaa",
            "panelTitle.activeBorder": "#00f0ff",
            "chat.requestBackground": "#141414",
            "chat.requestBorder": "#121212",
            "chat.slashCommandBackground": "#121212",
            "chat.slashCommandForeground": "#00f0ff",
            "chat.avatarBackground": "#121212",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#141414",
            "interactive.requestBorder": "#121212",
            "textCodeBlock.background": "#121212",
            "textLink.foreground": "#00f0ff",
            "textLink.activeForeground": "#00f0ff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#121212",
            "textBlockQuote.border": "#00f0ff",
            "badge.background": "#00f0ff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffb000",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#648fff"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffb000"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#dc267f"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#888888",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fe6100"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            }
        ]
    },
    // 👁️ High Contrast Light (Colorblind Safe)
    {
        id: "high-contrast-colorblind-light",
        name: "\ud83d\udc41\ufe0f High Contrast Light (Colorblind Safe)",
        description: "Pure paper white with deep indigo ink, cobalt blue, and vermilion designed for maximum contrast and zero confusion.",
        type: "light",
        accentColor: "#005ab5",
        colors: {
            "foreground": "#000000",
            "descriptionForeground": "#444444",
            "disabledForeground": "#555555",
            "icon.foreground": "#000000",
            "editor.background": "#ffffff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#555555",
            "editorLineNumber.activeForeground": "#005ab5",
            "editorCursor.foreground": "#005ab5",
            "editor.selectionBackground": "#ebebeb",
            "editor.lineHighlightBackground": "#ebebeb",
            "editorHoverWidget.background": "#f4f4f4",
            "editorHoverWidget.foreground": "#000000",
            "editorHoverWidget.border": "#ebebeb",
            "editorHoverWidget.statusBarBackground": "#ebebeb",
            "editorSuggestWidget.background": "#f4f4f4",
            "editorSuggestWidget.foreground": "#000000",
            "editorSuggestWidget.border": "#ebebeb",
            "editorSuggestWidget.selectedBackground": "#ebebeb",
            "editorSuggestWidget.selectedForeground": "#005ab5",
            "editorSuggestWidget.highlightForeground": "#005ab5",
            "editorWidget.background": "#f4f4f4",
            "editorWidget.foreground": "#000000",
            "editorWidget.border": "#ebebeb",
            "focusBorder": "#005ab5",
            "activityBar.background": "#e0e0e0",
            "activityBar.foreground": "#005ab5",
            "activityBar.inactiveForeground": "#555555",
            "activityBarBadge.background": "#005ab5",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f4f4f4",
            "sideBar.foreground": "#000000",
            "sideBarTitle.foreground": "#005ab5",
            "sideBarSectionHeader.background": "#ebebeb",
            "sideBarSectionHeader.foreground": "#000000",
            "titleBar.activeBackground": "#e0e0e0",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#e0e0e0",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#005ab5",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f4f4f4",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#005ab5",
            "tab.activeBorderTop": "#005ab5",
            "tab.inactiveBackground": "#ebebeb",
            "tab.inactiveForeground": "#444444",
            "tab.hoverBackground": "#ebebeb",
            "breadcrumb.foreground": "#444444",
            "terminal.background": "#ffffff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#005ab5",
            "terminal.ansiGreen": "#005ab5",
            "terminal.ansiCyan": "#785ef0",
            "terminal.ansiYellow": "#15803d",
            "input.background": "#f0f0f0",
            "input.foreground": "#000000",
            "input.placeholderForeground": "#444444",
            "panel.background": "#ffffff",
            "panel.border": "#f4f4f4",
            "panelTitle.activeForeground": "#005ab5",
            "panelTitle.inactiveForeground": "#444444",
            "panelTitle.activeBorder": "#005ab5",
            "chat.requestBackground": "#f0f0f0",
            "chat.requestBorder": "#ebebeb",
            "chat.slashCommandBackground": "#ebebeb",
            "chat.slashCommandForeground": "#005ab5",
            "chat.avatarBackground": "#ebebeb",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f0f0f0",
            "interactive.requestBorder": "#ebebeb",
            "textCodeBlock.background": "#ebebeb",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#ebebeb",
            "textBlockQuote.border": "#005ab5",
            "badge.background": "#005ab5",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#dc267f",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#005ab5"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#dc267f"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#785ef0"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#555555",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#d95f02"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#005ab5"
                }
            }
        ]
    },
    // 🏁 Checkered Onyx & Ivory
    {
        id: "checkered-onyx-ivory",
        name: "\ud83c\udfc1 Checkered Onyx & Ivory",
        description: "Geometric alternating black and white checkerboard aesthetic with crisp grid borders and razor-sharp monochrome contrast.",
        type: "dark",
        accentColor: "#ffffff",
        colors: {
            "foreground": "#f5f5f5",
            "descriptionForeground": "#999999",
            "disabledForeground": "#666666",
            "icon.foreground": "#ffffff",
            "editor.background": "#0d0d0d",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#666666",
            "editorLineNumber.activeForeground": "#ffffff",
            "editorCursor.foreground": "#ffffff",
            "editor.selectionBackground": "#212121",
            "editor.lineHighlightBackground": "#212121",
            "editorHoverWidget.background": "#171717",
            "editorHoverWidget.foreground": "#e5e5e5",
            "editorHoverWidget.border": "#212121",
            "editorHoverWidget.statusBarBackground": "#212121",
            "editorSuggestWidget.background": "#171717",
            "editorSuggestWidget.foreground": "#e5e5e5",
            "editorSuggestWidget.border": "#212121",
            "editorSuggestWidget.selectedBackground": "#212121",
            "editorSuggestWidget.selectedForeground": "#ffffff",
            "editorSuggestWidget.highlightForeground": "#ffffff",
            "editorWidget.background": "#171717",
            "editorWidget.foreground": "#e5e5e5",
            "editorWidget.border": "#212121",
            "focusBorder": "#ffffff",
            "activityBar.background": "#000000",
            "activityBar.foreground": "#ffffff",
            "activityBar.inactiveForeground": "#666666",
            "activityBarBadge.background": "#ffffff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#171717",
            "sideBar.foreground": "#e5e5e5",
            "sideBarTitle.foreground": "#ffffff",
            "sideBarSectionHeader.background": "#212121",
            "sideBarSectionHeader.foreground": "#e5e5e5",
            "titleBar.activeBackground": "#000000",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#000000",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#000000",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#171717",
            "tab.activeBackground": "#0d0d0d",
            "tab.activeForeground": "#ffffff",
            "tab.activeBorderTop": "#ffffff",
            "tab.inactiveBackground": "#212121",
            "tab.inactiveForeground": "#999999",
            "tab.hoverBackground": "#212121",
            "breadcrumb.foreground": "#999999",
            "terminal.background": "#0d0d0d",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffffff",
            "terminal.ansiGreen": "#e5e5e5",
            "terminal.ansiCyan": "#b3b3b3",
            "terminal.ansiYellow": "#cccccc",
            "input.background": "#1f1f1f",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#999999",
            "panel.background": "#0d0d0d",
            "panel.border": "#171717",
            "panelTitle.activeForeground": "#ffffff",
            "panelTitle.inactiveForeground": "#999999",
            "panelTitle.activeBorder": "#ffffff",
            "chat.requestBackground": "#1f1f1f",
            "chat.requestBorder": "#212121",
            "chat.slashCommandBackground": "#212121",
            "chat.slashCommandForeground": "#ffffff",
            "chat.avatarBackground": "#212121",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#1f1f1f",
            "interactive.requestBorder": "#212121",
            "textCodeBlock.background": "#212121",
            "textLink.foreground": "#ffffff",
            "textLink.activeForeground": "#ffffff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#212121",
            "textBlockQuote.border": "#ffffff",
            "badge.background": "#ffffff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffffff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#e5e5e5"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#cccccc"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f5f5f5"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b3b3b3"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#666666",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f5f5f5"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#e5e5e5"
                }
            }
        ]
    },
    // 🏁 Checkered Alabaster Grid
    {
        id: "checkered-alabaster-grid",
        name: "\ud83c\udfc1 Checkered Alabaster Grid",
        description: "Modern gallery architecture checkerboard with alternating alabaster panels and stark jet black typography.",
        type: "light",
        accentColor: "#000000",
        colors: {
            "foreground": "#000000",
            "descriptionForeground": "#444444",
            "disabledForeground": "#555555",
            "icon.foreground": "#000000",
            "editor.background": "#f9f9f9",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#555555",
            "editorLineNumber.activeForeground": "#000000",
            "editorCursor.foreground": "#000000",
            "editor.selectionBackground": "#e5e5e5",
            "editor.lineHighlightBackground": "#e5e5e5",
            "editorHoverWidget.background": "#efefef",
            "editorHoverWidget.foreground": "#000000",
            "editorHoverWidget.border": "#e5e5e5",
            "editorHoverWidget.statusBarBackground": "#e5e5e5",
            "editorSuggestWidget.background": "#efefef",
            "editorSuggestWidget.foreground": "#000000",
            "editorSuggestWidget.border": "#e5e5e5",
            "editorSuggestWidget.selectedBackground": "#e5e5e5",
            "editorSuggestWidget.selectedForeground": "#000000",
            "editorSuggestWidget.highlightForeground": "#000000",
            "editorWidget.background": "#efefef",
            "editorWidget.foreground": "#000000",
            "editorWidget.border": "#e5e5e5",
            "focusBorder": "#000000",
            "activityBar.background": "#dcdcdc",
            "activityBar.foreground": "#000000",
            "activityBar.inactiveForeground": "#555555",
            "activityBarBadge.background": "#000000",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#efefef",
            "sideBar.foreground": "#000000",
            "sideBarTitle.foreground": "#000000",
            "sideBarSectionHeader.background": "#e5e5e5",
            "sideBarSectionHeader.foreground": "#000000",
            "titleBar.activeBackground": "#dcdcdc",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#dcdcdc",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#000000",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#efefef",
            "tab.activeBackground": "#f9f9f9",
            "tab.activeForeground": "#000000",
            "tab.activeBorderTop": "#000000",
            "tab.inactiveBackground": "#e5e5e5",
            "tab.inactiveForeground": "#444444",
            "tab.hoverBackground": "#e5e5e5",
            "breadcrumb.foreground": "#444444",
            "terminal.background": "#f9f9f9",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#000000",
            "terminal.ansiGreen": "#1a1a1a",
            "terminal.ansiCyan": "#1a1a1a",
            "terminal.ansiYellow": "#2d2d2d",
            "input.background": "#ebebeb",
            "input.foreground": "#000000",
            "input.placeholderForeground": "#444444",
            "panel.background": "#f9f9f9",
            "panel.border": "#efefef",
            "panelTitle.activeForeground": "#000000",
            "panelTitle.inactiveForeground": "#444444",
            "panelTitle.activeBorder": "#000000",
            "chat.requestBackground": "#ebebeb",
            "chat.requestBorder": "#e5e5e5",
            "chat.slashCommandBackground": "#e5e5e5",
            "chat.slashCommandForeground": "#000000",
            "chat.avatarBackground": "#e5e5e5",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#ebebeb",
            "interactive.requestBorder": "#e5e5e5",
            "textCodeBlock.background": "#e5e5e5",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#e5e5e5",
            "textBlockQuote.border": "#000000",
            "badge.background": "#000000",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#000000",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1a1a1a"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#2d2d2d"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#1a1a1a"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#555555",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1a1a1a"
                }
            }
        ]
    },
    // 🏁 Binary Stark Checker (Pure B&W)
    {
        id: "binary-stark-checker",
        name: "\ud83c\udfc1 Binary Stark Checker (Pure B&W)",
        description: "Zero color distractions. 100% binary mathematical contrast between pure #000000 and #ffffff.",
        type: "dark",
        accentColor: "#ffffff",
        colors: {
            "foreground": "#ffffff",
            "descriptionForeground": "#888888",
            "disabledForeground": "#666666",
            "icon.foreground": "#ffffff",
            "editor.background": "#000000",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#666666",
            "editorLineNumber.activeForeground": "#ffffff",
            "editorCursor.foreground": "#ffffff",
            "editor.selectionBackground": "#1a1a1a",
            "editor.lineHighlightBackground": "#1a1a1a",
            "editorHoverWidget.background": "#111111",
            "editorHoverWidget.foreground": "#ffffff",
            "editorHoverWidget.border": "#1a1a1a",
            "editorHoverWidget.statusBarBackground": "#1a1a1a",
            "editorSuggestWidget.background": "#111111",
            "editorSuggestWidget.foreground": "#ffffff",
            "editorSuggestWidget.border": "#1a1a1a",
            "editorSuggestWidget.selectedBackground": "#1a1a1a",
            "editorSuggestWidget.selectedForeground": "#ffffff",
            "editorSuggestWidget.highlightForeground": "#ffffff",
            "editorWidget.background": "#111111",
            "editorWidget.foreground": "#ffffff",
            "editorWidget.border": "#1a1a1a",
            "focusBorder": "#ffffff",
            "activityBar.background": "#000000",
            "activityBar.foreground": "#ffffff",
            "activityBar.inactiveForeground": "#666666",
            "activityBarBadge.background": "#ffffff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#111111",
            "sideBar.foreground": "#ffffff",
            "sideBarTitle.foreground": "#ffffff",
            "sideBarSectionHeader.background": "#1a1a1a",
            "sideBarSectionHeader.foreground": "#ffffff",
            "titleBar.activeBackground": "#000000",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#000000",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#ffffff",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#111111",
            "tab.activeBackground": "#000000",
            "tab.activeForeground": "#ffffff",
            "tab.activeBorderTop": "#ffffff",
            "tab.inactiveBackground": "#1a1a1a",
            "tab.inactiveForeground": "#888888",
            "tab.hoverBackground": "#1a1a1a",
            "breadcrumb.foreground": "#888888",
            "terminal.background": "#000000",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffffff",
            "terminal.ansiGreen": "#ffffff",
            "terminal.ansiCyan": "#ffffff",
            "terminal.ansiYellow": "#dddddd",
            "input.background": "#1a1a1a",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#888888",
            "panel.background": "#000000",
            "panel.border": "#111111",
            "panelTitle.activeForeground": "#ffffff",
            "panelTitle.inactiveForeground": "#888888",
            "panelTitle.activeBorder": "#ffffff",
            "chat.requestBackground": "#1a1a1a",
            "chat.requestBorder": "#1a1a1a",
            "chat.slashCommandBackground": "#1a1a1a",
            "chat.slashCommandForeground": "#ffffff",
            "chat.avatarBackground": "#1a1a1a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#1a1a1a",
            "interactive.requestBorder": "#1a1a1a",
            "textCodeBlock.background": "#1a1a1a",
            "textLink.foreground": "#ffffff",
            "textLink.activeForeground": "#ffffff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1a1a1a",
            "textBlockQuote.border": "#ffffff",
            "badge.background": "#ffffff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffffff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#dddddd"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#666666",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            }
        ]
    },
    // 🏎️ Carbon Fiber Racing (Checkered Flag)
    {
        id: "carbon-fiber-racing",
        name: "\ud83c\udfce\ufe0f Carbon Fiber Racing (Checkered Flag)",
        description: "High-octane motorsport carbon composite slate with checkered flag ivory and podium gold accents.",
        type: "dark",
        accentColor: "#eab308",
        colors: {
            "foreground": "#f4f4f5",
            "descriptionForeground": "#a1a1aa",
            "disabledForeground": "#71717a",
            "icon.foreground": "#eab308",
            "editor.background": "#141416",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#71717a",
            "editorLineNumber.activeForeground": "#eab308",
            "editorCursor.foreground": "#eab308",
            "editor.selectionBackground": "#27272a",
            "editor.lineHighlightBackground": "#27272a",
            "editorHoverWidget.background": "#1c1c1f",
            "editorHoverWidget.foreground": "#f4f4f5",
            "editorHoverWidget.border": "#27272a",
            "editorHoverWidget.statusBarBackground": "#27272a",
            "editorSuggestWidget.background": "#1c1c1f",
            "editorSuggestWidget.foreground": "#f4f4f5",
            "editorSuggestWidget.border": "#27272a",
            "editorSuggestWidget.selectedBackground": "#27272a",
            "editorSuggestWidget.selectedForeground": "#eab308",
            "editorSuggestWidget.highlightForeground": "#eab308",
            "editorWidget.background": "#1c1c1f",
            "editorWidget.foreground": "#f4f4f5",
            "editorWidget.border": "#27272a",
            "focusBorder": "#eab308",
            "activityBar.background": "#0f0f11",
            "activityBar.foreground": "#eab308",
            "activityBar.inactiveForeground": "#71717a",
            "activityBarBadge.background": "#eab308",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#1c1c1f",
            "sideBar.foreground": "#f4f4f5",
            "sideBarTitle.foreground": "#eab308",
            "sideBarSectionHeader.background": "#27272a",
            "sideBarSectionHeader.foreground": "#f4f4f5",
            "titleBar.activeBackground": "#0f0f11",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0f0f11",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#eab308",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1c1c1f",
            "tab.activeBackground": "#141416",
            "tab.activeForeground": "#eab308",
            "tab.activeBorderTop": "#eab308",
            "tab.inactiveBackground": "#27272a",
            "tab.inactiveForeground": "#a1a1aa",
            "tab.hoverBackground": "#27272a",
            "breadcrumb.foreground": "#a1a1aa",
            "terminal.background": "#141416",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#eab308",
            "terminal.ansiGreen": "#eab308",
            "terminal.ansiCyan": "#38bdf8",
            "terminal.ansiYellow": "#ffffff",
            "input.background": "#27272a",
            "input.foreground": "#f4f4f5",
            "input.placeholderForeground": "#a1a1aa",
            "panel.background": "#141416",
            "panel.border": "#1c1c1f",
            "panelTitle.activeForeground": "#eab308",
            "panelTitle.inactiveForeground": "#a1a1aa",
            "panelTitle.activeBorder": "#eab308",
            "chat.requestBackground": "#27272a",
            "chat.requestBorder": "#27272a",
            "chat.slashCommandBackground": "#27272a",
            "chat.slashCommandForeground": "#eab308",
            "chat.avatarBackground": "#27272a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#27272a",
            "interactive.requestBorder": "#27272a",
            "textCodeBlock.background": "#27272a",
            "textLink.foreground": "#eab308",
            "textLink.activeForeground": "#eab308",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#27272a",
            "textBlockQuote.border": "#eab308",
            "badge.background": "#eab308",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ef4444",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#eab308"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ef4444"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f4f4f5"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#71717a",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#22c55e"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f4f4f5"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#eab308"
                }
            }
        ]
    },
    // ♟️ Vintage Grandmaster Chessboard
    {
        id: "chessboard-grandmaster-split",
        name: "\u265f\ufe0f Vintage Grandmaster Chessboard",
        description: "Old-school heritage tournament chessboard: worn walnut graphite dark squares, hand-carved antique boxwood ivory tokens, aged parchment activity accents, and warm charcoal slate.",
        type: "dark",
        accentColor: "#ebe1ce",
        colors: {
            "foreground": "#faf5ea",
            "descriptionForeground": "#a39889",
            "disabledForeground": "#7c7062",
            "icon.foreground": "#ebe1ce",
            "editor.background": "#181614",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#7c7062",
            "editorLineNumber.activeForeground": "#ebe1ce",
            "editorCursor.foreground": "#ebe1ce",
            "editor.selectionBackground": "#2b2621",
            "editor.lineHighlightBackground": "#2b2621",
            "editorHoverWidget.background": "#211d19",
            "editorHoverWidget.foreground": "#ede5d5",
            "editorHoverWidget.border": "#2b2621",
            "editorHoverWidget.statusBarBackground": "#2b2621",
            "editorSuggestWidget.background": "#211d19",
            "editorSuggestWidget.foreground": "#ede5d5",
            "editorSuggestWidget.border": "#2b2621",
            "editorSuggestWidget.selectedBackground": "#2b2621",
            "editorSuggestWidget.selectedForeground": "#ebe1ce",
            "editorSuggestWidget.highlightForeground": "#ebe1ce",
            "editorWidget.background": "#211d19",
            "editorWidget.foreground": "#ede5d5",
            "editorWidget.border": "#2b2621",
            "focusBorder": "#ebe1ce",
            "activityBar.background": "#ebe1ce",
            "activityBar.foreground": "#000000",
            "activityBar.inactiveForeground": "#7c7062",
            "activityBarBadge.background": "#ebe1ce",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#211d19",
            "sideBar.foreground": "#ede5d5",
            "sideBarTitle.foreground": "#f5eedc",
            "sideBarSectionHeader.background": "#2b2621",
            "sideBarSectionHeader.foreground": "#ede5d5",
            "titleBar.activeBackground": "#ebe1ce",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ebe1ce",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#ebe1ce",
            "statusBar.foreground": "#211d19",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#211d19",
            "tab.activeBackground": "#181614",
            "tab.activeForeground": "#ebe1ce",
            "tab.activeBorderTop": "#ebe1ce",
            "tab.inactiveBackground": "#2b2621",
            "tab.inactiveForeground": "#a39889",
            "tab.hoverBackground": "#2b2621",
            "breadcrumb.foreground": "#a39889",
            "terminal.background": "#181614",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ebe1ce",
            "terminal.ansiGreen": "#e8dec8",
            "terminal.ansiCyan": "#cbb898",
            "terminal.ansiYellow": "#d8ccb8",
            "input.background": "#26211c",
            "input.foreground": "#faf5ea",
            "input.placeholderForeground": "#a39889",
            "panel.background": "#181614",
            "panel.border": "#211d19",
            "panelTitle.activeForeground": "#ebe1ce",
            "panelTitle.inactiveForeground": "#a39889",
            "panelTitle.activeBorder": "#ebe1ce",
            "chat.requestBackground": "#26211c",
            "chat.requestBorder": "#2b2621",
            "chat.slashCommandBackground": "#2b2621",
            "chat.slashCommandForeground": "#ebe1ce",
            "chat.avatarBackground": "#2b2621",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#26211c",
            "interactive.requestBorder": "#2b2621",
            "textCodeBlock.background": "#2b2621",
            "textLink.foreground": "#ebe1ce",
            "textLink.activeForeground": "#ebe1ce",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#2b2621",
            "textBlockQuote.border": "#ebe1ce",
            "badge.background": "#ebe1ce",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#f5eedc",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#e8dec8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#d8ccb8"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#f5eedc"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#faf5ea"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#cbb898"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#7c7062",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f5eedc"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#faf5ea"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#e8dec8"
                }
            }
        ]
    },
    // 🏁 Op-Art Illusion (Geometric Checker)
    {
        id: "op-art-optical-checker",
        name: "\ud83c\udfc1 Op-Art Illusion (Geometric Checker)",
        description: "Inspired by 1960s Victor Vasarely Op-Art: jet obsidian canvas with optical zebra silver, chrome borders, and 5 distinct tonal steps of monochrome grayscale.",
        type: "dark",
        accentColor: "#e2e8f0",
        colors: {
            "foreground": "#f1f5f9",
            "descriptionForeground": "#71717a",
            "disabledForeground": "#64748b",
            "icon.foreground": "#e2e8f0",
            "editor.background": "#000000",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#e2e8f0",
            "editorCursor.foreground": "#e2e8f0",
            "editor.selectionBackground": "#1e1e24",
            "editor.lineHighlightBackground": "#1e1e24",
            "editorHoverWidget.background": "#111115",
            "editorHoverWidget.foreground": "#f8fafc",
            "editorHoverWidget.border": "#1e1e24",
            "editorHoverWidget.statusBarBackground": "#1e1e24",
            "editorSuggestWidget.background": "#111115",
            "editorSuggestWidget.foreground": "#f8fafc",
            "editorSuggestWidget.border": "#1e1e24",
            "editorSuggestWidget.selectedBackground": "#1e1e24",
            "editorSuggestWidget.selectedForeground": "#e2e8f0",
            "editorSuggestWidget.highlightForeground": "#e2e8f0",
            "editorWidget.background": "#111115",
            "editorWidget.foreground": "#f8fafc",
            "editorWidget.border": "#1e1e24",
            "focusBorder": "#e2e8f0",
            "activityBar.background": "#0a0a0d",
            "activityBar.foreground": "#e2e8f0",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#e2e8f0",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#111115",
            "sideBar.foreground": "#f8fafc",
            "sideBarTitle.foreground": "#ffffff",
            "sideBarSectionHeader.background": "#1e1e24",
            "sideBarSectionHeader.foreground": "#f8fafc",
            "titleBar.activeBackground": "#0a0a0d",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0a0a0d",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#ffffff",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#111115",
            "tab.activeBackground": "#000000",
            "tab.activeForeground": "#e2e8f0",
            "tab.activeBorderTop": "#e2e8f0",
            "tab.inactiveBackground": "#1e1e24",
            "tab.inactiveForeground": "#71717a",
            "tab.hoverBackground": "#1e1e24",
            "breadcrumb.foreground": "#71717a",
            "terminal.background": "#000000",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#e2e8f0",
            "terminal.ansiGreen": "#e2e8f0",
            "terminal.ansiCyan": "#94a3b8",
            "terminal.ansiYellow": "#cbd5e1",
            "input.background": "#18181b",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#71717a",
            "panel.background": "#000000",
            "panel.border": "#111115",
            "panelTitle.activeForeground": "#e2e8f0",
            "panelTitle.inactiveForeground": "#71717a",
            "panelTitle.activeBorder": "#e2e8f0",
            "chat.requestBackground": "#18181b",
            "chat.requestBorder": "#1e1e24",
            "chat.slashCommandBackground": "#1e1e24",
            "chat.slashCommandForeground": "#e2e8f0",
            "chat.avatarBackground": "#1e1e24",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#18181b",
            "interactive.requestBorder": "#1e1e24",
            "textCodeBlock.background": "#1e1e24",
            "textLink.foreground": "#e2e8f0",
            "textLink.activeForeground": "#e2e8f0",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1e1e24",
            "textBlockQuote.border": "#e2e8f0",
            "badge.background": "#e2e8f0",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffffff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#e2e8f0"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#cbd5e1"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f8fafc"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#94a3b8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f1f5f9"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f1f5f9"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#e2e8f0"
                }
            }
        ]
    },
    // 👔 Tuxedo Monochrome (Silk & Velvet)
    {
        id: "tuxedo-monochrome-checker",
        name: "\ud83d\udc54 Tuxedo Monochrome (Silk & Velvet)",
        description: "High-fashion evening tuxedo aesthetic: deep midnight obsidian velvet with crisp pressed shirt white, silk lapel charcoal, and platinum silver accents.",
        type: "dark",
        accentColor: "#f8fafc",
        colors: {
            "foreground": "#ffffff",
            "descriptionForeground": "#94a3b8",
            "disabledForeground": "#64748b",
            "icon.foreground": "#f8fafc",
            "editor.background": "#0a0a0c",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#f8fafc",
            "editorCursor.foreground": "#f8fafc",
            "editor.selectionBackground": "#1e1e24",
            "editor.lineHighlightBackground": "#1e1e24",
            "editorHoverWidget.background": "#141418",
            "editorHoverWidget.foreground": "#e2e8f0",
            "editorHoverWidget.border": "#1e1e24",
            "editorHoverWidget.statusBarBackground": "#1e1e24",
            "editorSuggestWidget.background": "#141418",
            "editorSuggestWidget.foreground": "#e2e8f0",
            "editorSuggestWidget.border": "#1e1e24",
            "editorSuggestWidget.selectedBackground": "#1e1e24",
            "editorSuggestWidget.selectedForeground": "#f8fafc",
            "editorSuggestWidget.highlightForeground": "#f8fafc",
            "editorWidget.background": "#141418",
            "editorWidget.foreground": "#e2e8f0",
            "editorWidget.border": "#1e1e24",
            "focusBorder": "#f8fafc",
            "activityBar.background": "#050507",
            "activityBar.foreground": "#f8fafc",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#f8fafc",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#141418",
            "sideBar.foreground": "#e2e8f0",
            "sideBarTitle.foreground": "#ffffff",
            "sideBarSectionHeader.background": "#1e1e24",
            "sideBarSectionHeader.foreground": "#e2e8f0",
            "titleBar.activeBackground": "#050507",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#050507",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#0a0a0c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#141418",
            "tab.activeBackground": "#0a0a0c",
            "tab.activeForeground": "#f8fafc",
            "tab.activeBorderTop": "#f8fafc",
            "tab.inactiveBackground": "#1e1e24",
            "tab.inactiveForeground": "#94a3b8",
            "tab.hoverBackground": "#1e1e24",
            "breadcrumb.foreground": "#94a3b8",
            "terminal.background": "#0a0a0c",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#f8fafc",
            "terminal.ansiGreen": "#f1f5f9",
            "terminal.ansiCyan": "#cbd5e1",
            "terminal.ansiYellow": "#e2e8f0",
            "input.background": "#191920",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#94a3b8",
            "panel.background": "#0a0a0c",
            "panel.border": "#141418",
            "panelTitle.activeForeground": "#f8fafc",
            "panelTitle.inactiveForeground": "#94a3b8",
            "panelTitle.activeBorder": "#f8fafc",
            "chat.requestBackground": "#191920",
            "chat.requestBorder": "#1e1e24",
            "chat.slashCommandBackground": "#1e1e24",
            "chat.slashCommandForeground": "#f8fafc",
            "chat.avatarBackground": "#1e1e24",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#191920",
            "interactive.requestBorder": "#1e1e24",
            "textCodeBlock.background": "#1e1e24",
            "textLink.foreground": "#f8fafc",
            "textLink.activeForeground": "#f8fafc",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1e1e24",
            "textBlockQuote.border": "#f8fafc",
            "badge.background": "#f8fafc",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffffff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#f1f5f9"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#e2e8f0"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#cbd5e1"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#f1f5f9"
                }
            }
        ]
    },
    // 🏁 Two-Tone Ska (Mod Checkerboard)
    {
        id: "two-tone-ska-checker",
        name: "\ud83c\udfc1 Two-Tone Ska (Mod Checkerboard)",
        description: "Iconic British 2-Tone & Mod subculture checkerboard: pitch-black background with bold stark white tab blocks, heavy white borders, and punchy graphic novel contrast.",
        type: "dark",
        accentColor: "#ffffff",
        colors: {
            "foreground": "#ffffff",
            "descriptionForeground": "#a3a3a3",
            "disabledForeground": "#737373",
            "icon.foreground": "#ffffff",
            "editor.background": "#121212",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#737373",
            "editorLineNumber.activeForeground": "#ffffff",
            "editorCursor.foreground": "#ffffff",
            "editor.selectionBackground": "#262626",
            "editor.lineHighlightBackground": "#262626",
            "editorHoverWidget.background": "#1c1c1c",
            "editorHoverWidget.foreground": "#ffffff",
            "editorHoverWidget.border": "#262626",
            "editorHoverWidget.statusBarBackground": "#262626",
            "editorSuggestWidget.background": "#1c1c1c",
            "editorSuggestWidget.foreground": "#ffffff",
            "editorSuggestWidget.border": "#262626",
            "editorSuggestWidget.selectedBackground": "#262626",
            "editorSuggestWidget.selectedForeground": "#ffffff",
            "editorSuggestWidget.highlightForeground": "#ffffff",
            "editorWidget.background": "#1c1c1c",
            "editorWidget.foreground": "#ffffff",
            "editorWidget.border": "#262626",
            "focusBorder": "#ffffff",
            "activityBar.background": "#ffffff",
            "activityBar.foreground": "#000000",
            "activityBar.inactiveForeground": "#737373",
            "activityBarBadge.background": "#ffffff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#1c1c1c",
            "sideBar.foreground": "#ffffff",
            "sideBarTitle.foreground": "#ffffff",
            "sideBarSectionHeader.background": "#262626",
            "sideBarSectionHeader.foreground": "#ffffff",
            "titleBar.activeBackground": "#ffffff",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ffffff",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#ffffff",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1c1c1c",
            "tab.activeBackground": "#121212",
            "tab.activeForeground": "#ffffff",
            "tab.activeBorderTop": "#ffffff",
            "tab.inactiveBackground": "#262626",
            "tab.inactiveForeground": "#a3a3a3",
            "tab.hoverBackground": "#262626",
            "breadcrumb.foreground": "#a3a3a3",
            "terminal.background": "#121212",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffffff",
            "terminal.ansiGreen": "#f5f5f5",
            "terminal.ansiCyan": "#d4d4d4",
            "terminal.ansiYellow": "#e5e5e5",
            "input.background": "#222222",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#a3a3a3",
            "panel.background": "#121212",
            "panel.border": "#1c1c1c",
            "panelTitle.activeForeground": "#ffffff",
            "panelTitle.inactiveForeground": "#a3a3a3",
            "panelTitle.activeBorder": "#ffffff",
            "chat.requestBackground": "#222222",
            "chat.requestBorder": "#262626",
            "chat.slashCommandBackground": "#262626",
            "chat.slashCommandForeground": "#ffffff",
            "chat.avatarBackground": "#262626",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#222222",
            "interactive.requestBorder": "#262626",
            "textCodeBlock.background": "#262626",
            "textLink.foreground": "#ffffff",
            "textLink.activeForeground": "#ffffff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#262626",
            "textBlockQuote.border": "#ffffff",
            "badge.background": "#ffffff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffffff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#f5f5f5"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#e5e5e5"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#d4d4d4"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#737373",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#f5f5f5"
                }
            }
        ]
    },
    // 📰 Film Noir (Newsprint Halftone)
    {
        id: "film-noir-newsprint-checker",
        name: "\ud83d\udcf0 Film Noir (Newsprint Halftone)",
        description: "Cinematic 1940s detective film noir & broadsheet newsprint: vintage zinc slate, halftone newsprint off-white, ink-roller charcoal, and stark typewriter ink code.",
        type: "dark",
        accentColor: "#fafaf9",
        colors: {
            "foreground": "#fafaf9",
            "descriptionForeground": "#a8a29e",
            "disabledForeground": "#78716c",
            "icon.foreground": "#fafaf9",
            "editor.background": "#16161a",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#fafaf9",
            "editorCursor.foreground": "#fafaf9",
            "editor.selectionBackground": "#2a2a32",
            "editor.lineHighlightBackground": "#2a2a32",
            "editorHoverWidget.background": "#202026",
            "editorHoverWidget.foreground": "#f5f5f4",
            "editorHoverWidget.border": "#2a2a32",
            "editorHoverWidget.statusBarBackground": "#2a2a32",
            "editorSuggestWidget.background": "#202026",
            "editorSuggestWidget.foreground": "#f5f5f4",
            "editorSuggestWidget.border": "#2a2a32",
            "editorSuggestWidget.selectedBackground": "#2a2a32",
            "editorSuggestWidget.selectedForeground": "#fafaf9",
            "editorSuggestWidget.highlightForeground": "#fafaf9",
            "editorWidget.background": "#202026",
            "editorWidget.foreground": "#f5f5f4",
            "editorWidget.border": "#2a2a32",
            "focusBorder": "#fafaf9",
            "activityBar.background": "#101014",
            "activityBar.foreground": "#fafaf9",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#fafaf9",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#202026",
            "sideBar.foreground": "#f5f5f4",
            "sideBarTitle.foreground": "#fafaf9",
            "sideBarSectionHeader.background": "#2a2a32",
            "sideBarSectionHeader.foreground": "#f5f5f4",
            "titleBar.activeBackground": "#101014",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#101014",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#101014",
            "statusBar.foreground": "#fafaf9",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#202026",
            "tab.activeBackground": "#16161a",
            "tab.activeForeground": "#fafaf9",
            "tab.activeBorderTop": "#fafaf9",
            "tab.inactiveBackground": "#2a2a32",
            "tab.inactiveForeground": "#a8a29e",
            "tab.hoverBackground": "#2a2a32",
            "breadcrumb.foreground": "#a8a29e",
            "terminal.background": "#16161a",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#fafaf9",
            "terminal.ansiGreen": "#f5f5f4",
            "terminal.ansiCyan": "#d6d3d1",
            "terminal.ansiYellow": "#e7e5e4",
            "input.background": "#24242c",
            "input.foreground": "#fafaf9",
            "input.placeholderForeground": "#a8a29e",
            "panel.background": "#16161a",
            "panel.border": "#202026",
            "panelTitle.activeForeground": "#fafaf9",
            "panelTitle.inactiveForeground": "#a8a29e",
            "panelTitle.activeBorder": "#fafaf9",
            "chat.requestBackground": "#24242c",
            "chat.requestBorder": "#2a2a32",
            "chat.slashCommandBackground": "#2a2a32",
            "chat.slashCommandForeground": "#fafaf9",
            "chat.avatarBackground": "#2a2a32",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#24242c",
            "interactive.requestBorder": "#2a2a32",
            "textCodeBlock.background": "#2a2a32",
            "textLink.foreground": "#fafaf9",
            "textLink.activeForeground": "#fafaf9",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#2a2a32",
            "textBlockQuote.border": "#fafaf9",
            "badge.background": "#fafaf9",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#fafaf9",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#f5f5f4"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#e7e5e4"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#fafaf9"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#fafaf9"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#d6d3d1"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fafaf9"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fafaf9"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#f5f5f4"
                }
            }
        ]
    },
    // ☀️ Solarized Light
    {
        id: "solarized-light",
        name: "\u2600\ufe0f Solarized Light",
        description: "Authentic Ethan Schoonover precision light palette with cream parchment, cyan, blue, magenta, and amber.",
        type: "light",
        accentColor: "#268bd2",
        colors: {
            "foreground": "#384c54",
            "descriptionForeground": "#586e75",
            "disabledForeground": "#78716c",
            "icon.foreground": "#000000",
            "editor.background": "#fdf6e3",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#268bd2",
            "editorCursor.foreground": "#268bd2",
            "editor.selectionBackground": "#eee8d5",
            "editor.lineHighlightBackground": "#eee8d5",
            "editorHoverWidget.background": "#eee8d5",
            "editorHoverWidget.foreground": "#384c54",
            "editorHoverWidget.border": "#eee8d5",
            "editorHoverWidget.statusBarBackground": "#eee8d5",
            "editorSuggestWidget.background": "#eee8d5",
            "editorSuggestWidget.foreground": "#384c54",
            "editorSuggestWidget.border": "#eee8d5",
            "editorSuggestWidget.selectedBackground": "#eee8d5",
            "editorSuggestWidget.selectedForeground": "#268bd2",
            "editorSuggestWidget.highlightForeground": "#268bd2",
            "editorWidget.background": "#eee8d5",
            "editorWidget.foreground": "#384c54",
            "editorWidget.border": "#eee8d5",
            "focusBorder": "#268bd2",
            "activityBar.background": "#eee8d5",
            "activityBar.foreground": "#268bd2",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#268bd2",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#eee8d5",
            "sideBar.foreground": "#384c54",
            "sideBarTitle.foreground": "#268bd2",
            "sideBarSectionHeader.background": "#eee8d5",
            "sideBarSectionHeader.foreground": "#384c54",
            "titleBar.activeBackground": "#eee8d5",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#eee8d5",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#eee8d5",
            "statusBar.foreground": "#384c54",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#eee8d5",
            "tab.activeBackground": "#fdf6e3",
            "tab.activeForeground": "#268bd2",
            "tab.activeBorderTop": "#268bd2",
            "tab.inactiveBackground": "#eee8d5",
            "tab.inactiveForeground": "#586e75",
            "tab.hoverBackground": "#eee8d5",
            "breadcrumb.foreground": "#586e75",
            "terminal.background": "#fdf6e3",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#268bd2",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#b45309",
            "terminal.ansiYellow": "#047857",
            "input.background": "#eee8d5",
            "input.foreground": "#384c54",
            "input.placeholderForeground": "#586e75",
            "panel.background": "#fdf6e3",
            "panel.border": "#eee8d5",
            "panelTitle.activeForeground": "#268bd2",
            "panelTitle.inactiveForeground": "#586e75",
            "panelTitle.activeBorder": "#268bd2",
            "chat.requestBackground": "#eee8d5",
            "chat.requestBorder": "#eee8d5",
            "chat.slashCommandBackground": "#eee8d5",
            "chat.slashCommandForeground": "#268bd2",
            "chat.avatarBackground": "#eee8d5",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#eee8d5",
            "interactive.requestBorder": "#eee8d5",
            "textCodeBlock.background": "#eee8d5",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#eee8d5",
            "textBlockQuote.border": "#268bd2",
            "badge.background": "#268bd2",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#859900",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#859900"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#384c54"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#384c54"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🏖️ Solarized Warm Sand
    {
        id: "solarized-warm-sand",
        name: "\ud83c\udfd6\ufe0f Solarized Warm Sand",
        description: "Golden desert sand and terracotta tones blended with solarized precision optics.",
        type: "light",
        accentColor: "#b58900",
        colors: {
            "foreground": "#332314",
            "descriptionForeground": "#6e5a44",
            "disabledForeground": "#78716c",
            "icon.foreground": "#000000",
            "editor.background": "#faf2da",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#b58900",
            "editorCursor.foreground": "#b58900",
            "editor.selectionBackground": "#ecdab0",
            "editor.lineHighlightBackground": "#ecdab0",
            "editorHoverWidget.background": "#f3e4c0",
            "editorHoverWidget.foreground": "#332314",
            "editorHoverWidget.border": "#ecdab0",
            "editorHoverWidget.statusBarBackground": "#ecdab0",
            "editorSuggestWidget.background": "#f3e4c0",
            "editorSuggestWidget.foreground": "#332314",
            "editorSuggestWidget.border": "#ecdab0",
            "editorSuggestWidget.selectedBackground": "#ecdab0",
            "editorSuggestWidget.selectedForeground": "#b58900",
            "editorSuggestWidget.highlightForeground": "#b58900",
            "editorWidget.background": "#f3e4c0",
            "editorWidget.foreground": "#332314",
            "editorWidget.border": "#ecdab0",
            "focusBorder": "#b58900",
            "activityBar.background": "#ecdab0",
            "activityBar.foreground": "#b58900",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#b58900",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f3e4c0",
            "sideBar.foreground": "#332314",
            "sideBarTitle.foreground": "#b58900",
            "sideBarSectionHeader.background": "#ecdab0",
            "sideBarSectionHeader.foreground": "#332314",
            "titleBar.activeBackground": "#ecdab0",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ecdab0",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#b58900",
            "statusBar.foreground": "#faf2da",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f3e4c0",
            "tab.activeBackground": "#faf2da",
            "tab.activeForeground": "#b58900",
            "tab.activeBorderTop": "#b58900",
            "tab.inactiveBackground": "#ecdab0",
            "tab.inactiveForeground": "#6e5a44",
            "tab.hoverBackground": "#ecdab0",
            "breadcrumb.foreground": "#6e5a44",
            "terminal.background": "#faf2da",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#b58900",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#b45309",
            "terminal.ansiYellow": "#047857",
            "input.background": "#ecdab0",
            "input.foreground": "#332314",
            "input.placeholderForeground": "#6e5a44",
            "panel.background": "#faf2da",
            "panel.border": "#f3e4c0",
            "panelTitle.activeForeground": "#b58900",
            "panelTitle.inactiveForeground": "#6e5a44",
            "panelTitle.activeBorder": "#b58900",
            "chat.requestBackground": "#ecdab0",
            "chat.requestBorder": "#ecdab0",
            "chat.slashCommandBackground": "#ecdab0",
            "chat.slashCommandForeground": "#b58900",
            "chat.avatarBackground": "#ecdab0",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#ecdab0",
            "interactive.requestBorder": "#ecdab0",
            "textCodeBlock.background": "#ecdab0",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#ecdab0",
            "textBlockQuote.border": "#b58900",
            "badge.background": "#b58900",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#332314"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#332314"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🌌 Solarized Dark
    {
        id: "solarized-dark",
        name: "\ud83c\udf0c Solarized Dark",
        description: "The quintessential developer dark palette with deep teal obsidian, cyan, blue and amber glow.",
        type: "dark",
        accentColor: "#2aa198",
        colors: {
            "foreground": "#839496",
            "descriptionForeground": "#586e75",
            "disabledForeground": "#586e75",
            "icon.foreground": "#2aa198",
            "editor.background": "#002b36",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#586e75",
            "editorLineNumber.activeForeground": "#2aa198",
            "editorCursor.foreground": "#2aa198",
            "editor.selectionBackground": "#073642",
            "editor.lineHighlightBackground": "#073642",
            "editorHoverWidget.background": "#073642",
            "editorHoverWidget.foreground": "#93a1a1",
            "editorHoverWidget.border": "#073642",
            "editorHoverWidget.statusBarBackground": "#073642",
            "editorSuggestWidget.background": "#073642",
            "editorSuggestWidget.foreground": "#93a1a1",
            "editorSuggestWidget.border": "#073642",
            "editorSuggestWidget.selectedBackground": "#073642",
            "editorSuggestWidget.selectedForeground": "#2aa198",
            "editorSuggestWidget.highlightForeground": "#2aa198",
            "editorWidget.background": "#073642",
            "editorWidget.foreground": "#93a1a1",
            "editorWidget.border": "#073642",
            "focusBorder": "#2aa198",
            "activityBar.background": "#00212b",
            "activityBar.foreground": "#2aa198",
            "activityBar.inactiveForeground": "#586e75",
            "activityBarBadge.background": "#2aa198",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#073642",
            "sideBar.foreground": "#93a1a1",
            "sideBarTitle.foreground": "#2aa198",
            "sideBarSectionHeader.background": "#073642",
            "sideBarSectionHeader.foreground": "#93a1a1",
            "titleBar.activeBackground": "#00212b",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#00212b",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#073642",
            "statusBar.foreground": "#93a1a1",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#073642",
            "tab.activeBackground": "#002b36",
            "tab.activeForeground": "#2aa198",
            "tab.activeBorderTop": "#2aa198",
            "tab.inactiveBackground": "#073642",
            "tab.inactiveForeground": "#586e75",
            "tab.hoverBackground": "#073642",
            "breadcrumb.foreground": "#586e75",
            "terminal.background": "#002b36",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#2aa198",
            "terminal.ansiGreen": "#268bd2",
            "terminal.ansiCyan": "#b58900",
            "terminal.ansiYellow": "#2aa198",
            "input.background": "#073642",
            "input.foreground": "#93a1a1",
            "input.placeholderForeground": "#586e75",
            "panel.background": "#002b36",
            "panel.border": "#073642",
            "panelTitle.activeForeground": "#2aa198",
            "panelTitle.inactiveForeground": "#586e75",
            "panelTitle.activeBorder": "#2aa198",
            "chat.requestBackground": "#073642",
            "chat.requestBorder": "#073642",
            "chat.slashCommandBackground": "#073642",
            "chat.slashCommandForeground": "#2aa198",
            "chat.avatarBackground": "#073642",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#073642",
            "interactive.requestBorder": "#073642",
            "textCodeBlock.background": "#073642",
            "textLink.foreground": "#2aa198",
            "textLink.activeForeground": "#2aa198",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#073642",
            "textBlockQuote.border": "#2aa198",
            "badge.background": "#2aa198",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#859900",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#268bd2"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#2aa198"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#859900"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#839496"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b58900"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#586e75",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#d33682"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#839496"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#268bd2"
                }
            }
        ]
    },
    // ☕ Warm Latte & Paper
    {
        id: "warm-latte",
        name: "\u2615 Warm Latte & Paper",
        description: "Cozy, warm cream cafe aesthetic with soft coffee brown, terracotta, honey gold, and pine.",
        type: "light",
        accentColor: "#d7827e",
        colors: {
            "foreground": "#3b3254",
            "descriptionForeground": "#6e6884",
            "disabledForeground": "#716a82",
            "icon.foreground": "#000000",
            "editor.background": "#faf4ed",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#716a82",
            "editorLineNumber.activeForeground": "#d7827e",
            "editorCursor.foreground": "#d7827e",
            "editor.selectionBackground": "#f2e9e1",
            "editor.lineHighlightBackground": "#f2e9e1",
            "editorHoverWidget.background": "#f4ebe2",
            "editorHoverWidget.foreground": "#3b3254",
            "editorHoverWidget.border": "#f2e9e1",
            "editorHoverWidget.statusBarBackground": "#f2e9e1",
            "editorSuggestWidget.background": "#f4ebe2",
            "editorSuggestWidget.foreground": "#3b3254",
            "editorSuggestWidget.border": "#f2e9e1",
            "editorSuggestWidget.selectedBackground": "#f2e9e1",
            "editorSuggestWidget.selectedForeground": "#d7827e",
            "editorSuggestWidget.highlightForeground": "#d7827e",
            "editorWidget.background": "#f4ebe2",
            "editorWidget.foreground": "#3b3254",
            "editorWidget.border": "#f2e9e1",
            "focusBorder": "#d7827e",
            "activityBar.background": "#f2e9e1",
            "activityBar.foreground": "#d7827e",
            "activityBar.inactiveForeground": "#716a82",
            "activityBarBadge.background": "#d7827e",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#f4ebe2",
            "sideBar.foreground": "#3b3254",
            "sideBarTitle.foreground": "#d7827e",
            "sideBarSectionHeader.background": "#f2e9e1",
            "sideBarSectionHeader.foreground": "#3b3254",
            "titleBar.activeBackground": "#f2e9e1",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#f2e9e1",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#f2e9e1",
            "statusBar.foreground": "#3b3254",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f4ebe2",
            "tab.activeBackground": "#faf4ed",
            "tab.activeForeground": "#d7827e",
            "tab.activeBorderTop": "#d7827e",
            "tab.inactiveBackground": "#f2e9e1",
            "tab.inactiveForeground": "#6e6884",
            "tab.hoverBackground": "#f2e9e1",
            "breadcrumb.foreground": "#6e6884",
            "terminal.background": "#faf4ed",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#d7827e",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#047857",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#f2e9e1",
            "input.foreground": "#3b3254",
            "input.placeholderForeground": "#6e6884",
            "panel.background": "#faf4ed",
            "panel.border": "#f4ebe2",
            "panelTitle.activeForeground": "#d7827e",
            "panelTitle.inactiveForeground": "#6e6884",
            "panelTitle.activeBorder": "#d7827e",
            "chat.requestBackground": "#f2e9e1",
            "chat.requestBorder": "#f2e9e1",
            "chat.slashCommandBackground": "#f2e9e1",
            "chat.slashCommandForeground": "#d7827e",
            "chat.avatarBackground": "#f2e9e1",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#f2e9e1",
            "interactive.requestBorder": "#f2e9e1",
            "textCodeBlock.background": "#f2e9e1",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#f2e9e1",
            "textBlockQuote.border": "#d7827e",
            "badge.background": "#d7827e",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#b91c1c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#3b3254"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#716a82",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#be123c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#3b3254"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🍂 Autumn Amber Light
    {
        id: "autumn-amber",
        name: "\ud83c\udf42 Autumn Amber Light",
        description: "Warm golden sunlight, burnt sienna, rich chestnut brown, and forest olive tones.",
        type: "light",
        accentColor: "#b45309",
        colors: {
            "foreground": "#2b1b10",
            "descriptionForeground": "#78350f",
            "disabledForeground": "#785e49",
            "icon.foreground": "#000000",
            "editor.background": "#fffaf0",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#785e49",
            "editorLineNumber.activeForeground": "#b45309",
            "editorCursor.foreground": "#b45309",
            "editor.selectionBackground": "#ffedd5",
            "editor.lineHighlightBackground": "#ffedd5",
            "editorHoverWidget.background": "#fff7ed",
            "editorHoverWidget.foreground": "#2b1b10",
            "editorHoverWidget.border": "#ffedd5",
            "editorHoverWidget.statusBarBackground": "#ffedd5",
            "editorSuggestWidget.background": "#fff7ed",
            "editorSuggestWidget.foreground": "#2b1b10",
            "editorSuggestWidget.border": "#ffedd5",
            "editorSuggestWidget.selectedBackground": "#ffedd5",
            "editorSuggestWidget.selectedForeground": "#b45309",
            "editorSuggestWidget.highlightForeground": "#b45309",
            "editorWidget.background": "#fff7ed",
            "editorWidget.foreground": "#2b1b10",
            "editorWidget.border": "#ffedd5",
            "focusBorder": "#b45309",
            "activityBar.background": "#ffedd5",
            "activityBar.foreground": "#b45309",
            "activityBar.inactiveForeground": "#785e49",
            "activityBarBadge.background": "#b45309",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#fff7ed",
            "sideBar.foreground": "#2b1b10",
            "sideBarTitle.foreground": "#7c2d12",
            "sideBarSectionHeader.background": "#ffedd5",
            "sideBarSectionHeader.foreground": "#2b1b10",
            "titleBar.activeBackground": "#ffedd5",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ffedd5",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#c2410c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fff7ed",
            "tab.activeBackground": "#fffaf0",
            "tab.activeForeground": "#b45309",
            "tab.activeBorderTop": "#b45309",
            "tab.inactiveBackground": "#ffedd5",
            "tab.inactiveForeground": "#78350f",
            "tab.hoverBackground": "#ffedd5",
            "breadcrumb.foreground": "#78350f",
            "terminal.background": "#fffaf0",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#b45309",
            "terminal.ansiGreen": "#b45309",
            "terminal.ansiCyan": "#0f766e",
            "terminal.ansiYellow": "#15803d",
            "input.background": "#ffedd5",
            "input.foreground": "#2b1b10",
            "input.placeholderForeground": "#78350f",
            "panel.background": "#fffaf0",
            "panel.border": "#fff7ed",
            "panelTitle.activeForeground": "#b45309",
            "panelTitle.inactiveForeground": "#78350f",
            "panelTitle.activeBorder": "#b45309",
            "chat.requestBackground": "#ffedd5",
            "chat.requestBorder": "#ffedd5",
            "chat.slashCommandBackground": "#ffedd5",
            "chat.slashCommandForeground": "#b45309",
            "chat.avatarBackground": "#ffedd5",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#ffedd5",
            "interactive.requestBorder": "#ffedd5",
            "textCodeBlock.background": "#ffedd5",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#ffedd5",
            "textBlockQuote.border": "#b45309",
            "badge.background": "#b45309",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#2b1b10"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#0f766e"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#785e49",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#991b1b"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#2b1b10"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            }
        ]
    },
    // 📜 Cozy Sepia & Parchment
    {
        id: "cozy-sepia",
        name: "\ud83d\udcdc Cozy Sepia & Parchment",
        description: "Warm antique manuscript and sepia tones designed for soothing, zero-eyestrain daytime reading.",
        type: "light",
        accentColor: "#8b4513",
        colors: {
            "foreground": "#2c1b0d",
            "descriptionForeground": "#6e553e",
            "disabledForeground": "#6e5744",
            "icon.foreground": "#000000",
            "editor.background": "#f5eedb",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#6e5744",
            "editorLineNumber.activeForeground": "#8b4513",
            "editorCursor.foreground": "#8b4513",
            "editor.selectionBackground": "#e8dcbe",
            "editor.lineHighlightBackground": "#e8dcbe",
            "editorHoverWidget.background": "#eee3c8",
            "editorHoverWidget.foreground": "#2c1b0d",
            "editorHoverWidget.border": "#e8dcbe",
            "editorHoverWidget.statusBarBackground": "#e8dcbe",
            "editorSuggestWidget.background": "#eee3c8",
            "editorSuggestWidget.foreground": "#2c1b0d",
            "editorSuggestWidget.border": "#e8dcbe",
            "editorSuggestWidget.selectedBackground": "#e8dcbe",
            "editorSuggestWidget.selectedForeground": "#8b4513",
            "editorSuggestWidget.highlightForeground": "#8b4513",
            "editorWidget.background": "#eee3c8",
            "editorWidget.foreground": "#2c1b0d",
            "editorWidget.border": "#e8dcbe",
            "focusBorder": "#8b4513",
            "activityBar.background": "#e8dcbe",
            "activityBar.foreground": "#8b4513",
            "activityBar.inactiveForeground": "#6e5744",
            "activityBarBadge.background": "#8b4513",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#eee3c8",
            "sideBar.foreground": "#2c1b0d",
            "sideBarTitle.foreground": "#8b4513",
            "sideBarSectionHeader.background": "#e8dcbe",
            "sideBarSectionHeader.foreground": "#2c1b0d",
            "titleBar.activeBackground": "#e8dcbe",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#e8dcbe",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#8b4513",
            "statusBar.foreground": "#f5eedb",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#eee3c8",
            "tab.activeBackground": "#f5eedb",
            "tab.activeForeground": "#8b4513",
            "tab.activeBorderTop": "#8b4513",
            "tab.inactiveBackground": "#e8dcbe",
            "tab.inactiveForeground": "#6e553e",
            "tab.hoverBackground": "#e8dcbe",
            "breadcrumb.foreground": "#6e553e",
            "terminal.background": "#f5eedb",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#8b4513",
            "terminal.ansiGreen": "#1b4d3e",
            "terminal.ansiCyan": "#1d4ed8",
            "terminal.ansiYellow": "#92400e",
            "input.background": "#e8dcbe",
            "input.foreground": "#2c1b0d",
            "input.placeholderForeground": "#6e553e",
            "panel.background": "#f5eedb",
            "panel.border": "#eee3c8",
            "panelTitle.activeForeground": "#8b4513",
            "panelTitle.inactiveForeground": "#6e553e",
            "panelTitle.activeBorder": "#8b4513",
            "chat.requestBackground": "#e8dcbe",
            "chat.requestBorder": "#e8dcbe",
            "chat.slashCommandBackground": "#e8dcbe",
            "chat.slashCommandForeground": "#8b4513",
            "chat.avatarBackground": "#e8dcbe",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#e8dcbe",
            "interactive.requestBorder": "#e8dcbe",
            "textCodeBlock.background": "#e8dcbe",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#e8dcbe",
            "textBlockQuote.border": "#8b4513",
            "badge.background": "#8b4513",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#8b4513",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1b4d3e"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#92400e"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#8b4513"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#2c1b0d"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#6e5744",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#991b1b"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#2c1b0d"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1b4d3e"
                }
            }
        ]
    },
    // 🍵 Matcha Latte Cream
    {
        id: "matcha-cream",
        name: "\ud83c\udf75 Matcha Latte Cream",
        description: "Japanese ceremonial green tea latte with soft cream, pistachio moss, and toasted bamboo accents.",
        type: "light",
        accentColor: "#4d7c0f",
        colors: {
            "foreground": "#1a260e",
            "descriptionForeground": "#3f6212",
            "disabledForeground": "#4d7c0f",
            "icon.foreground": "#000000",
            "editor.background": "#f7fee7",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#4d7c0f",
            "editorLineNumber.activeForeground": "#4d7c0f",
            "editorCursor.foreground": "#4d7c0f",
            "editor.selectionBackground": "#d9f99d",
            "editor.lineHighlightBackground": "#d9f99d",
            "editorHoverWidget.background": "#ecfccb",
            "editorHoverWidget.foreground": "#1a260e",
            "editorHoverWidget.border": "#d9f99d",
            "editorHoverWidget.statusBarBackground": "#d9f99d",
            "editorSuggestWidget.background": "#ecfccb",
            "editorSuggestWidget.foreground": "#1a260e",
            "editorSuggestWidget.border": "#d9f99d",
            "editorSuggestWidget.selectedBackground": "#d9f99d",
            "editorSuggestWidget.selectedForeground": "#4d7c0f",
            "editorSuggestWidget.highlightForeground": "#4d7c0f",
            "editorWidget.background": "#ecfccb",
            "editorWidget.foreground": "#1a260e",
            "editorWidget.border": "#d9f99d",
            "focusBorder": "#4d7c0f",
            "activityBar.background": "#d9f99d",
            "activityBar.foreground": "#4d7c0f",
            "activityBar.inactiveForeground": "#4d7c0f",
            "activityBarBadge.background": "#4d7c0f",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#ecfccb",
            "sideBar.foreground": "#1a260e",
            "sideBarTitle.foreground": "#3f6212",
            "sideBarSectionHeader.background": "#d9f99d",
            "sideBarSectionHeader.foreground": "#1a260e",
            "titleBar.activeBackground": "#d9f99d",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#d9f99d",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#4d7c0f",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#ecfccb",
            "tab.activeBackground": "#f7fee7",
            "tab.activeForeground": "#4d7c0f",
            "tab.activeBorderTop": "#4d7c0f",
            "tab.inactiveBackground": "#d9f99d",
            "tab.inactiveForeground": "#3f6212",
            "tab.hoverBackground": "#d9f99d",
            "breadcrumb.foreground": "#3f6212",
            "terminal.background": "#f7fee7",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#4d7c0f",
            "terminal.ansiGreen": "#15803d",
            "terminal.ansiCyan": "#047857",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#ecfccb",
            "input.foreground": "#1a260e",
            "input.placeholderForeground": "#3f6212",
            "panel.background": "#f7fee7",
            "panel.border": "#ecfccb",
            "panelTitle.activeForeground": "#4d7c0f",
            "panelTitle.inactiveForeground": "#3f6212",
            "panelTitle.activeBorder": "#4d7c0f",
            "chat.requestBackground": "#ecfccb",
            "chat.requestBorder": "#d9f99d",
            "chat.slashCommandBackground": "#d9f99d",
            "chat.slashCommandForeground": "#4d7c0f",
            "chat.avatarBackground": "#d9f99d",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#ecfccb",
            "interactive.requestBorder": "#d9f99d",
            "textCodeBlock.background": "#d9f99d",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#d9f99d",
            "textBlockQuote.border": "#4d7c0f",
            "badge.background": "#4d7c0f",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#3f6212",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#3f6212"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#1a260e"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4d7c0f",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#1a260e"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            }
        ]
    },
    // 🥐 French Bakery Pastry
    {
        id: "french-pastry",
        name: "\ud83e\udd50 French Bakery Pastry",
        description: "Warm golden flake pastry, toasted almond cream, and rich melted caramel brown.",
        type: "light",
        accentColor: "#d97706",
        colors: {
            "foreground": "#301201",
            "descriptionForeground": "#78350f",
            "disabledForeground": "#92400e",
            "icon.foreground": "#000000",
            "editor.background": "#fffbeb",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#92400e",
            "editorLineNumber.activeForeground": "#d97706",
            "editorCursor.foreground": "#d97706",
            "editor.selectionBackground": "#fde68a",
            "editor.lineHighlightBackground": "#fde68a",
            "editorHoverWidget.background": "#fef3c7",
            "editorHoverWidget.foreground": "#301201",
            "editorHoverWidget.border": "#fde68a",
            "editorHoverWidget.statusBarBackground": "#fde68a",
            "editorSuggestWidget.background": "#fef3c7",
            "editorSuggestWidget.foreground": "#301201",
            "editorSuggestWidget.border": "#fde68a",
            "editorSuggestWidget.selectedBackground": "#fde68a",
            "editorSuggestWidget.selectedForeground": "#d97706",
            "editorSuggestWidget.highlightForeground": "#d97706",
            "editorWidget.background": "#fef3c7",
            "editorWidget.foreground": "#301201",
            "editorWidget.border": "#fde68a",
            "focusBorder": "#d97706",
            "activityBar.background": "#fde68a",
            "activityBar.foreground": "#d97706",
            "activityBar.inactiveForeground": "#92400e",
            "activityBarBadge.background": "#d97706",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#fef3c7",
            "sideBar.foreground": "#301201",
            "sideBarTitle.foreground": "#92400e",
            "sideBarSectionHeader.background": "#fde68a",
            "sideBarSectionHeader.foreground": "#301201",
            "titleBar.activeBackground": "#fde68a",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fde68a",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#b45309",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fef3c7",
            "tab.activeBackground": "#fffbeb",
            "tab.activeForeground": "#d97706",
            "tab.activeBorderTop": "#d97706",
            "tab.inactiveBackground": "#fde68a",
            "tab.inactiveForeground": "#78350f",
            "tab.hoverBackground": "#fde68a",
            "breadcrumb.foreground": "#78350f",
            "terminal.background": "#fffbeb",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#d97706",
            "terminal.ansiGreen": "#78350f",
            "terminal.ansiCyan": "#b91c1c",
            "terminal.ansiYellow": "#047857",
            "input.background": "#fef3c7",
            "input.foreground": "#301201",
            "input.placeholderForeground": "#78350f",
            "panel.background": "#fffbeb",
            "panel.border": "#fef3c7",
            "panelTitle.activeForeground": "#d97706",
            "panelTitle.inactiveForeground": "#78350f",
            "panelTitle.activeBorder": "#d97706",
            "chat.requestBackground": "#fef3c7",
            "chat.requestBorder": "#fde68a",
            "chat.slashCommandBackground": "#fde68a",
            "chat.slashCommandForeground": "#d97706",
            "chat.avatarBackground": "#fde68a",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#fef3c7",
            "interactive.requestBorder": "#fde68a",
            "textCodeBlock.background": "#fde68a",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fde68a",
            "textBlockQuote.border": "#d97706",
            "badge.background": "#d97706",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#b45309",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#78350f"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#301201"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#92400e",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#301201"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#78350f"
                }
            }
        ]
    },
    // 🪵 Cedarwood Cabin
    {
        id: "cedar-cabin",
        name: "\ud83e\udeb5 Cedarwood Cabin",
        description: "Warm timber logs, fragrant cedar shavings, toasted hearth warmth and pine needles.",
        type: "light",
        accentColor: "#9a3412",
        colors: {
            "foreground": "#241407",
            "descriptionForeground": "#78350f",
            "disabledForeground": "#785b42",
            "icon.foreground": "#000000",
            "editor.background": "#faf5ee",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#785b42",
            "editorLineNumber.activeForeground": "#9a3412",
            "editorCursor.foreground": "#9a3412",
            "editor.selectionBackground": "#ebd8c3",
            "editor.lineHighlightBackground": "#ebd8c3",
            "editorHoverWidget.background": "#f3e8da",
            "editorHoverWidget.foreground": "#241407",
            "editorHoverWidget.border": "#ebd8c3",
            "editorHoverWidget.statusBarBackground": "#ebd8c3",
            "editorSuggestWidget.background": "#f3e8da",
            "editorSuggestWidget.foreground": "#241407",
            "editorSuggestWidget.border": "#ebd8c3",
            "editorSuggestWidget.selectedBackground": "#ebd8c3",
            "editorSuggestWidget.selectedForeground": "#9a3412",
            "editorSuggestWidget.highlightForeground": "#9a3412",
            "editorWidget.background": "#f3e8da",
            "editorWidget.foreground": "#241407",
            "editorWidget.border": "#ebd8c3",
            "focusBorder": "#9a3412",
            "activityBar.background": "#ebd8c3",
            "activityBar.foreground": "#9a3412",
            "activityBar.inactiveForeground": "#785b42",
            "activityBarBadge.background": "#9a3412",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f3e8da",
            "sideBar.foreground": "#241407",
            "sideBarTitle.foreground": "#7c2d12",
            "sideBarSectionHeader.background": "#ebd8c3",
            "sideBarSectionHeader.foreground": "#241407",
            "titleBar.activeBackground": "#ebd8c3",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ebd8c3",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#7c2d12",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f3e8da",
            "tab.activeBackground": "#faf5ee",
            "tab.activeForeground": "#9a3412",
            "tab.activeBorderTop": "#9a3412",
            "tab.inactiveBackground": "#ebd8c3",
            "tab.inactiveForeground": "#78350f",
            "tab.hoverBackground": "#ebd8c3",
            "breadcrumb.foreground": "#78350f",
            "terminal.background": "#faf5ee",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#9a3412",
            "terminal.ansiGreen": "#1e4d30",
            "terminal.ansiCyan": "#6d28d9",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#f3e8da",
            "input.foreground": "#241407",
            "input.placeholderForeground": "#78350f",
            "panel.background": "#faf5ee",
            "panel.border": "#f3e8da",
            "panelTitle.activeForeground": "#9a3412",
            "panelTitle.inactiveForeground": "#78350f",
            "panelTitle.activeBorder": "#9a3412",
            "chat.requestBackground": "#f3e8da",
            "chat.requestBorder": "#ebd8c3",
            "chat.slashCommandBackground": "#ebd8c3",
            "chat.slashCommandForeground": "#9a3412",
            "chat.avatarBackground": "#ebd8c3",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f3e8da",
            "interactive.requestBorder": "#ebd8c3",
            "textCodeBlock.background": "#ebd8c3",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#ebd8c3",
            "textBlockQuote.border": "#9a3412",
            "badge.background": "#9a3412",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#9a3412",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1e4d30"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#9a3412"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#241407"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#785b42",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#241407"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1e4d30"
                }
            }
        ]
    },
    // 🌻 Tuscan Sunflower
    {
        id: "tuscan-sunflower",
        name: "\ud83c\udf3b Tuscan Sunflower",
        description: "Italian summer sunflower fields with golden petals, terracotta roof clay, and olive groves.",
        type: "light",
        accentColor: "#eab308",
        colors: {
            "foreground": "#291804",
            "descriptionForeground": "#854d0e",
            "disabledForeground": "#713f12",
            "icon.foreground": "#000000",
            "editor.background": "#fefce8",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#713f12",
            "editorLineNumber.activeForeground": "#eab308",
            "editorCursor.foreground": "#eab308",
            "editor.selectionBackground": "#fef08a",
            "editor.lineHighlightBackground": "#fef08a",
            "editorHoverWidget.background": "#fef9c3",
            "editorHoverWidget.foreground": "#291804",
            "editorHoverWidget.border": "#fef08a",
            "editorHoverWidget.statusBarBackground": "#fef08a",
            "editorSuggestWidget.background": "#fef9c3",
            "editorSuggestWidget.foreground": "#291804",
            "editorSuggestWidget.border": "#fef08a",
            "editorSuggestWidget.selectedBackground": "#fef08a",
            "editorSuggestWidget.selectedForeground": "#eab308",
            "editorSuggestWidget.highlightForeground": "#eab308",
            "editorWidget.background": "#fef9c3",
            "editorWidget.foreground": "#291804",
            "editorWidget.border": "#fef08a",
            "focusBorder": "#eab308",
            "activityBar.background": "#fef08a",
            "activityBar.foreground": "#eab308",
            "activityBar.inactiveForeground": "#713f12",
            "activityBarBadge.background": "#eab308",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#fef9c3",
            "sideBar.foreground": "#291804",
            "sideBarTitle.foreground": "#a16207",
            "sideBarSectionHeader.background": "#fef08a",
            "sideBarSectionHeader.foreground": "#291804",
            "titleBar.activeBackground": "#fef08a",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fef08a",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#ca8a04",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fef9c3",
            "tab.activeBackground": "#fefce8",
            "tab.activeForeground": "#eab308",
            "tab.activeBorderTop": "#eab308",
            "tab.inactiveBackground": "#fef08a",
            "tab.inactiveForeground": "#854d0e",
            "tab.hoverBackground": "#fef08a",
            "breadcrumb.foreground": "#854d0e",
            "terminal.background": "#fefce8",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#eab308",
            "terminal.ansiGreen": "#15803d",
            "terminal.ansiCyan": "#1d4ed8",
            "terminal.ansiYellow": "#a16207",
            "input.background": "#fef9c3",
            "input.foreground": "#291804",
            "input.placeholderForeground": "#854d0e",
            "panel.background": "#fefce8",
            "panel.border": "#fef9c3",
            "panelTitle.activeForeground": "#eab308",
            "panelTitle.inactiveForeground": "#854d0e",
            "panelTitle.activeBorder": "#eab308",
            "chat.requestBackground": "#fef9c3",
            "chat.requestBorder": "#fef08a",
            "chat.slashCommandBackground": "#fef08a",
            "chat.slashCommandForeground": "#eab308",
            "chat.avatarBackground": "#fef08a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#fef9c3",
            "interactive.requestBorder": "#fef08a",
            "textCodeBlock.background": "#fef08a",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fef08a",
            "textBlockQuote.border": "#eab308",
            "badge.background": "#eab308",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#a16207"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#291804"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#713f12",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#291804"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            }
        ]
    },
    // 🏜️ Mojave Canyon Sunset
    {
        id: "mojave-sunset",
        name: "\ud83c\udfdc\ufe0f Mojave Canyon Sunset",
        description: "Southwestern desert canyon sandstone, glowing dusk orange, and violet twilight shadows.",
        type: "light",
        accentColor: "#c2410c",
        colors: {
            "foreground": "#2e1208",
            "descriptionForeground": "#7c2d12",
            "disabledForeground": "#78350f",
            "icon.foreground": "#000000",
            "editor.background": "#faf4ef",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78350f",
            "editorLineNumber.activeForeground": "#c2410c",
            "editorCursor.foreground": "#c2410c",
            "editor.selectionBackground": "#edd6c8",
            "editor.lineHighlightBackground": "#edd6c8",
            "editorHoverWidget.background": "#f5e8de",
            "editorHoverWidget.foreground": "#2e1208",
            "editorHoverWidget.border": "#edd6c8",
            "editorHoverWidget.statusBarBackground": "#edd6c8",
            "editorSuggestWidget.background": "#f5e8de",
            "editorSuggestWidget.foreground": "#2e1208",
            "editorSuggestWidget.border": "#edd6c8",
            "editorSuggestWidget.selectedBackground": "#edd6c8",
            "editorSuggestWidget.selectedForeground": "#c2410c",
            "editorSuggestWidget.highlightForeground": "#c2410c",
            "editorWidget.background": "#f5e8de",
            "editorWidget.foreground": "#2e1208",
            "editorWidget.border": "#edd6c8",
            "focusBorder": "#c2410c",
            "activityBar.background": "#edd6c8",
            "activityBar.foreground": "#c2410c",
            "activityBar.inactiveForeground": "#78350f",
            "activityBarBadge.background": "#c2410c",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f5e8de",
            "sideBar.foreground": "#2e1208",
            "sideBarTitle.foreground": "#9a3412",
            "sideBarSectionHeader.background": "#edd6c8",
            "sideBarSectionHeader.foreground": "#2e1208",
            "titleBar.activeBackground": "#edd6c8",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#edd6c8",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#c2410c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f5e8de",
            "tab.activeBackground": "#faf4ef",
            "tab.activeForeground": "#c2410c",
            "tab.activeBorderTop": "#c2410c",
            "tab.inactiveBackground": "#edd6c8",
            "tab.inactiveForeground": "#7c2d12",
            "tab.hoverBackground": "#edd6c8",
            "breadcrumb.foreground": "#7c2d12",
            "terminal.background": "#faf4ef",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#c2410c",
            "terminal.ansiGreen": "#6d28d9",
            "terminal.ansiCyan": "#b45309",
            "terminal.ansiYellow": "#047857",
            "input.background": "#f5e8de",
            "input.foreground": "#2e1208",
            "input.placeholderForeground": "#7c2d12",
            "panel.background": "#faf4ef",
            "panel.border": "#f5e8de",
            "panelTitle.activeForeground": "#c2410c",
            "panelTitle.inactiveForeground": "#7c2d12",
            "panelTitle.activeBorder": "#c2410c",
            "chat.requestBackground": "#f5e8de",
            "chat.requestBorder": "#edd6c8",
            "chat.slashCommandBackground": "#edd6c8",
            "chat.slashCommandForeground": "#c2410c",
            "chat.avatarBackground": "#edd6c8",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f5e8de",
            "interactive.requestBorder": "#edd6c8",
            "textCodeBlock.background": "#edd6c8",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#edd6c8",
            "textBlockQuote.border": "#c2410c",
            "badge.background": "#c2410c",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#2e1208"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78350f",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#991b1b"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#2e1208"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            }
        ]
    },
    // ⚡ Cyberpunk Neon
    {
        id: "cyberpunk-neon",
        name: "\u26a1 Cyberpunk Neon",
        description: "High-voltage synth city with electric neon yellow, hot magenta pink, and laser cyan against onyx black.",
        type: "dark",
        accentColor: "#ffe600",
        colors: {
            "foreground": "#f0f0f8",
            "descriptionForeground": "#707090",
            "disabledForeground": "#505070",
            "icon.foreground": "#ffe600",
            "editor.background": "#08080c",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#505070",
            "editorLineNumber.activeForeground": "#ffe600",
            "editorCursor.foreground": "#ffe600",
            "editor.selectionBackground": "#161622",
            "editor.lineHighlightBackground": "#161622",
            "editorHoverWidget.background": "#0e0e14",
            "editorHoverWidget.foreground": "#e0e0f0",
            "editorHoverWidget.border": "#161622",
            "editorHoverWidget.statusBarBackground": "#161622",
            "editorSuggestWidget.background": "#0e0e14",
            "editorSuggestWidget.foreground": "#e0e0f0",
            "editorSuggestWidget.border": "#161622",
            "editorSuggestWidget.selectedBackground": "#161622",
            "editorSuggestWidget.selectedForeground": "#ffe600",
            "editorSuggestWidget.highlightForeground": "#ffe600",
            "editorWidget.background": "#0e0e14",
            "editorWidget.foreground": "#e0e0f0",
            "editorWidget.border": "#161622",
            "focusBorder": "#ffe600",
            "activityBar.background": "#050508",
            "activityBar.foreground": "#ffe600",
            "activityBar.inactiveForeground": "#505070",
            "activityBarBadge.background": "#ffe600",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0e0e14",
            "sideBar.foreground": "#e0e0f0",
            "sideBarTitle.foreground": "#ffe600",
            "sideBarSectionHeader.background": "#161622",
            "sideBarSectionHeader.foreground": "#e0e0f0",
            "titleBar.activeBackground": "#050508",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#050508",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#00f0ff",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0e0e14",
            "tab.activeBackground": "#08080c",
            "tab.activeForeground": "#ffe600",
            "tab.activeBorderTop": "#ffe600",
            "tab.inactiveBackground": "#161622",
            "tab.inactiveForeground": "#707090",
            "tab.hoverBackground": "#161622",
            "breadcrumb.foreground": "#707090",
            "terminal.background": "#08080c",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffe600",
            "terminal.ansiGreen": "#00f0ff",
            "terminal.ansiCyan": "#b829ff",
            "terminal.ansiYellow": "#ffe600",
            "input.background": "#181826",
            "input.foreground": "#f0f0f8",
            "input.placeholderForeground": "#707090",
            "panel.background": "#08080c",
            "panel.border": "#0e0e14",
            "panelTitle.activeForeground": "#ffe600",
            "panelTitle.inactiveForeground": "#707090",
            "panelTitle.activeBorder": "#ffe600",
            "chat.requestBackground": "#181826",
            "chat.requestBorder": "#161622",
            "chat.slashCommandBackground": "#161622",
            "chat.slashCommandForeground": "#ffe600",
            "chat.avatarBackground": "#161622",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#181826",
            "interactive.requestBorder": "#161622",
            "textCodeBlock.background": "#161622",
            "textLink.foreground": "#ffe600",
            "textLink.activeForeground": "#ffe600",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#161622",
            "textBlockQuote.border": "#ffe600",
            "badge.background": "#ffe600",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff007f",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffe600"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff007f"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f0f0f8"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b829ff"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#505070",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#00ff88"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f0f0f8"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            }
        ]
    },
    // 🌃 Tokyo Night
    {
        id: "tokyo-night",
        name: "\ud83c\udf03 Tokyo Night",
        description: "Midnight Tokyo streetscape with deep navy slate, neon magenta, cyan glow, and warm amber.",
        type: "dark",
        accentColor: "#7aa2f7",
        colors: {
            "foreground": "#c0caf5",
            "descriptionForeground": "#565f89",
            "disabledForeground": "#565f89",
            "icon.foreground": "#7aa2f7",
            "editor.background": "#1a1b26",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#565f89",
            "editorLineNumber.activeForeground": "#7aa2f7",
            "editorCursor.foreground": "#7aa2f7",
            "editor.selectionBackground": "#1f2335",
            "editor.lineHighlightBackground": "#1f2335",
            "editorHoverWidget.background": "#16161e",
            "editorHoverWidget.foreground": "#a9b1d6",
            "editorHoverWidget.border": "#1f2335",
            "editorHoverWidget.statusBarBackground": "#1f2335",
            "editorSuggestWidget.background": "#16161e",
            "editorSuggestWidget.foreground": "#a9b1d6",
            "editorSuggestWidget.border": "#1f2335",
            "editorSuggestWidget.selectedBackground": "#1f2335",
            "editorSuggestWidget.selectedForeground": "#7aa2f7",
            "editorSuggestWidget.highlightForeground": "#7aa2f7",
            "editorWidget.background": "#16161e",
            "editorWidget.foreground": "#a9b1d6",
            "editorWidget.border": "#1f2335",
            "focusBorder": "#7aa2f7",
            "activityBar.background": "#13141c",
            "activityBar.foreground": "#7aa2f7",
            "activityBar.inactiveForeground": "#565f89",
            "activityBarBadge.background": "#7aa2f7",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#16161e",
            "sideBar.foreground": "#a9b1d6",
            "sideBarTitle.foreground": "#7aa2f7",
            "sideBarSectionHeader.background": "#1f2335",
            "sideBarSectionHeader.foreground": "#a9b1d6",
            "titleBar.activeBackground": "#13141c",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#13141c",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#1f2335",
            "statusBar.foreground": "#7aa2f7",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#16161e",
            "tab.activeBackground": "#1a1b26",
            "tab.activeForeground": "#7aa2f7",
            "tab.activeBorderTop": "#7aa2f7",
            "tab.inactiveBackground": "#1f2335",
            "tab.inactiveForeground": "#565f89",
            "tab.hoverBackground": "#1f2335",
            "breadcrumb.foreground": "#565f89",
            "terminal.background": "#1a1b26",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#7aa2f7",
            "terminal.ansiGreen": "#7aa2f7",
            "terminal.ansiCyan": "#2ac3de",
            "terminal.ansiYellow": "#9ece6a",
            "input.background": "#1f2335",
            "input.foreground": "#c0caf5",
            "input.placeholderForeground": "#565f89",
            "panel.background": "#1a1b26",
            "panel.border": "#16161e",
            "panelTitle.activeForeground": "#7aa2f7",
            "panelTitle.inactiveForeground": "#565f89",
            "panelTitle.activeBorder": "#7aa2f7",
            "chat.requestBackground": "#1f2335",
            "chat.requestBorder": "#1f2335",
            "chat.slashCommandBackground": "#1f2335",
            "chat.slashCommandForeground": "#7aa2f7",
            "chat.avatarBackground": "#1f2335",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#1f2335",
            "interactive.requestBorder": "#1f2335",
            "textCodeBlock.background": "#1f2335",
            "textLink.foreground": "#7aa2f7",
            "textLink.activeForeground": "#7aa2f7",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1f2335",
            "textBlockQuote.border": "#7aa2f7",
            "badge.background": "#7aa2f7",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#bb9af7",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#7aa2f7"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#9ece6a"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#bb9af7"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#c0caf5"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#2ac3de"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#565f89",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff9e64"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#c0caf5"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#7aa2f7"
                }
            }
        ]
    },
    // 🧛 Dracula Pro
    {
        id: "dracula-pro",
        name: "\ud83e\udddb Dracula Pro",
        description: "The legendary dark theme with vampire purple, toxic green, hot pink, and blade cyan.",
        type: "dark",
        accentColor: "#bd93f9",
        colors: {
            "foreground": "#f8f8f2",
            "descriptionForeground": "#6272a4",
            "disabledForeground": "#6272a4",
            "icon.foreground": "#bd93f9",
            "editor.background": "#282a36",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#6272a4",
            "editorLineNumber.activeForeground": "#bd93f9",
            "editorCursor.foreground": "#bd93f9",
            "editor.selectionBackground": "#343746",
            "editor.lineHighlightBackground": "#343746",
            "editorHoverWidget.background": "#21222c",
            "editorHoverWidget.foreground": "#f8f8f2",
            "editorHoverWidget.border": "#343746",
            "editorHoverWidget.statusBarBackground": "#343746",
            "editorSuggestWidget.background": "#21222c",
            "editorSuggestWidget.foreground": "#f8f8f2",
            "editorSuggestWidget.border": "#343746",
            "editorSuggestWidget.selectedBackground": "#343746",
            "editorSuggestWidget.selectedForeground": "#bd93f9",
            "editorSuggestWidget.highlightForeground": "#bd93f9",
            "editorWidget.background": "#21222c",
            "editorWidget.foreground": "#f8f8f2",
            "editorWidget.border": "#343746",
            "focusBorder": "#bd93f9",
            "activityBar.background": "#191a21",
            "activityBar.foreground": "#bd93f9",
            "activityBar.inactiveForeground": "#6272a4",
            "activityBarBadge.background": "#bd93f9",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#21222c",
            "sideBar.foreground": "#f8f8f2",
            "sideBarTitle.foreground": "#bd93f9",
            "sideBarSectionHeader.background": "#343746",
            "sideBarSectionHeader.foreground": "#f8f8f2",
            "titleBar.activeBackground": "#191a21",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#191a21",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#6272a4",
            "statusBar.foreground": "#f8f8f2",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#21222c",
            "tab.activeBackground": "#282a36",
            "tab.activeForeground": "#bd93f9",
            "tab.activeBorderTop": "#bd93f9",
            "tab.inactiveBackground": "#343746",
            "tab.inactiveForeground": "#6272a4",
            "tab.hoverBackground": "#343746",
            "breadcrumb.foreground": "#6272a4",
            "terminal.background": "#282a36",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#bd93f9",
            "terminal.ansiGreen": "#50fa7b",
            "terminal.ansiCyan": "#8be9fd",
            "terminal.ansiYellow": "#f1fa8c",
            "input.background": "#343746",
            "input.foreground": "#f8f8f2",
            "input.placeholderForeground": "#6272a4",
            "panel.background": "#282a36",
            "panel.border": "#21222c",
            "panelTitle.activeForeground": "#bd93f9",
            "panelTitle.inactiveForeground": "#6272a4",
            "panelTitle.activeBorder": "#bd93f9",
            "chat.requestBackground": "#343746",
            "chat.requestBorder": "#343746",
            "chat.slashCommandBackground": "#343746",
            "chat.slashCommandForeground": "#bd93f9",
            "chat.avatarBackground": "#343746",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#343746",
            "interactive.requestBorder": "#343746",
            "textCodeBlock.background": "#343746",
            "textLink.foreground": "#bd93f9",
            "textLink.activeForeground": "#bd93f9",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#343746",
            "textBlockQuote.border": "#bd93f9",
            "badge.background": "#bd93f9",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff79c6",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#50fa7b"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#f1fa8c"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff79c6"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f8f8f2"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#8be9fd"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#6272a4",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffb86c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f8f8f2"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#50fa7b"
                }
            }
        ]
    },
    // 🐱 Catppuccin Mocha
    {
        id: "catppuccin-mocha",
        name: "\ud83d\udc31 Catppuccin Mocha",
        description: "Soothing pastel dark aesthetic with warm cocoa slate, lavender, rosewater, and sapphire.",
        type: "dark",
        accentColor: "#cba6f7",
        colors: {
            "foreground": "#cdd6f4",
            "descriptionForeground": "#6c7086",
            "disabledForeground": "#585b70",
            "icon.foreground": "#cba6f7",
            "editor.background": "#1e1e2e",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#585b70",
            "editorLineNumber.activeForeground": "#cba6f7",
            "editorCursor.foreground": "#cba6f7",
            "editor.selectionBackground": "#313244",
            "editor.lineHighlightBackground": "#313244",
            "editorHoverWidget.background": "#181825",
            "editorHoverWidget.foreground": "#bac2de",
            "editorHoverWidget.border": "#313244",
            "editorHoverWidget.statusBarBackground": "#313244",
            "editorSuggestWidget.background": "#181825",
            "editorSuggestWidget.foreground": "#bac2de",
            "editorSuggestWidget.border": "#313244",
            "editorSuggestWidget.selectedBackground": "#313244",
            "editorSuggestWidget.selectedForeground": "#cba6f7",
            "editorSuggestWidget.highlightForeground": "#cba6f7",
            "editorWidget.background": "#181825",
            "editorWidget.foreground": "#bac2de",
            "editorWidget.border": "#313244",
            "focusBorder": "#cba6f7",
            "activityBar.background": "#11111b",
            "activityBar.foreground": "#cba6f7",
            "activityBar.inactiveForeground": "#585b70",
            "activityBarBadge.background": "#cba6f7",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#181825",
            "sideBar.foreground": "#bac2de",
            "sideBarTitle.foreground": "#cba6f7",
            "sideBarSectionHeader.background": "#313244",
            "sideBarSectionHeader.foreground": "#bac2de",
            "titleBar.activeBackground": "#11111b",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#11111b",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#181825",
            "statusBar.foreground": "#cba6f7",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#181825",
            "tab.activeBackground": "#1e1e2e",
            "tab.activeForeground": "#cba6f7",
            "tab.activeBorderTop": "#cba6f7",
            "tab.inactiveBackground": "#313244",
            "tab.inactiveForeground": "#6c7086",
            "tab.hoverBackground": "#313244",
            "breadcrumb.foreground": "#6c7086",
            "terminal.background": "#1e1e2e",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#cba6f7",
            "terminal.ansiGreen": "#89b4fa",
            "terminal.ansiCyan": "#f9e2af",
            "terminal.ansiYellow": "#a6e3a1",
            "input.background": "#313244",
            "input.foreground": "#cdd6f4",
            "input.placeholderForeground": "#6c7086",
            "panel.background": "#1e1e2e",
            "panel.border": "#181825",
            "panelTitle.activeForeground": "#cba6f7",
            "panelTitle.inactiveForeground": "#6c7086",
            "panelTitle.activeBorder": "#cba6f7",
            "chat.requestBackground": "#313244",
            "chat.requestBorder": "#313244",
            "chat.slashCommandBackground": "#313244",
            "chat.slashCommandForeground": "#cba6f7",
            "chat.avatarBackground": "#313244",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#313244",
            "interactive.requestBorder": "#313244",
            "textCodeBlock.background": "#313244",
            "textLink.foreground": "#cba6f7",
            "textLink.activeForeground": "#cba6f7",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#313244",
            "textBlockQuote.border": "#cba6f7",
            "badge.background": "#cba6f7",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#cba6f7",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#89b4fa"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#a6e3a1"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#cba6f7"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#cdd6f4"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#f9e2af"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#585b70",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fab387"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#cdd6f4"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#89b4fa"
                }
            }
        ]
    },
    // 🐱 Catppuccin Latte
    {
        id: "catppuccin-latte",
        name: "\ud83d\udc31 Catppuccin Latte",
        description: "Warm, creamy daytime pastel theme with soft latte foam, lavender, peach, and tea green.",
        type: "light",
        accentColor: "#8839ef",
        colors: {
            "foreground": "#4c4f69",
            "descriptionForeground": "#7c7f93",
            "disabledForeground": "#8c8fa1",
            "icon.foreground": "#000000",
            "editor.background": "#eff1f5",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#8c8fa1",
            "editorLineNumber.activeForeground": "#8839ef",
            "editorCursor.foreground": "#8839ef",
            "editor.selectionBackground": "#dce0e8",
            "editor.lineHighlightBackground": "#dce0e8",
            "editorHoverWidget.background": "#e6e9ef",
            "editorHoverWidget.foreground": "#4c4f69",
            "editorHoverWidget.border": "#dce0e8",
            "editorHoverWidget.statusBarBackground": "#dce0e8",
            "editorSuggestWidget.background": "#e6e9ef",
            "editorSuggestWidget.foreground": "#4c4f69",
            "editorSuggestWidget.border": "#dce0e8",
            "editorSuggestWidget.selectedBackground": "#dce0e8",
            "editorSuggestWidget.selectedForeground": "#8839ef",
            "editorSuggestWidget.highlightForeground": "#8839ef",
            "editorWidget.background": "#e6e9ef",
            "editorWidget.foreground": "#4c4f69",
            "editorWidget.border": "#dce0e8",
            "focusBorder": "#8839ef",
            "activityBar.background": "#dce0e8",
            "activityBar.foreground": "#8839ef",
            "activityBar.inactiveForeground": "#8c8fa1",
            "activityBarBadge.background": "#8839ef",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#e6e9ef",
            "sideBar.foreground": "#4c4f69",
            "sideBarTitle.foreground": "#8839ef",
            "sideBarSectionHeader.background": "#dce0e8",
            "sideBarSectionHeader.foreground": "#4c4f69",
            "titleBar.activeBackground": "#dce0e8",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#dce0e8",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#8839ef",
            "statusBar.foreground": "#eff1f5",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#e6e9ef",
            "tab.activeBackground": "#eff1f5",
            "tab.activeForeground": "#8839ef",
            "tab.activeBorderTop": "#8839ef",
            "tab.inactiveBackground": "#dce0e8",
            "tab.inactiveForeground": "#7c7f93",
            "tab.hoverBackground": "#dce0e8",
            "breadcrumb.foreground": "#7c7f93",
            "terminal.background": "#eff1f5",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#8839ef",
            "terminal.ansiGreen": "#1e66f5",
            "terminal.ansiCyan": "#df8e1d",
            "terminal.ansiYellow": "#40a02b",
            "input.background": "#dce0e8",
            "input.foreground": "#4c4f69",
            "input.placeholderForeground": "#7c7f93",
            "panel.background": "#eff1f5",
            "panel.border": "#e6e9ef",
            "panelTitle.activeForeground": "#8839ef",
            "panelTitle.inactiveForeground": "#7c7f93",
            "panelTitle.activeBorder": "#8839ef",
            "chat.requestBackground": "#dce0e8",
            "chat.requestBorder": "#dce0e8",
            "chat.slashCommandBackground": "#dce0e8",
            "chat.slashCommandForeground": "#8839ef",
            "chat.avatarBackground": "#dce0e8",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#dce0e8",
            "interactive.requestBorder": "#dce0e8",
            "textCodeBlock.background": "#dce0e8",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#dce0e8",
            "textBlockQuote.border": "#8839ef",
            "badge.background": "#8839ef",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#8839ef",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1e66f5"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#40a02b"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#8839ef"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#4c4f69"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#df8e1d"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#8c8fa1",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fe640b"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#4c4f69"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1e66f5"
                }
            }
        ]
    },
    // ❄️ Nord Frost
    {
        id: "nord-frost",
        name: "\u2744\ufe0f Nord Frost",
        description: "Arctic boreal twilight with polar night slate, glacier ice blue, frost cyan, and aurora green.",
        type: "dark",
        accentColor: "#88c0d0",
        colors: {
            "foreground": "#eceff4",
            "descriptionForeground": "#4c566a",
            "disabledForeground": "#4c566a",
            "icon.foreground": "#88c0d0",
            "editor.background": "#2e3440",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4c566a",
            "editorLineNumber.activeForeground": "#88c0d0",
            "editorCursor.foreground": "#88c0d0",
            "editor.selectionBackground": "#3b4252",
            "editor.lineHighlightBackground": "#3b4252",
            "editorHoverWidget.background": "#242933",
            "editorHoverWidget.foreground": "#d8dee9",
            "editorHoverWidget.border": "#3b4252",
            "editorHoverWidget.statusBarBackground": "#3b4252",
            "editorSuggestWidget.background": "#242933",
            "editorSuggestWidget.foreground": "#d8dee9",
            "editorSuggestWidget.border": "#3b4252",
            "editorSuggestWidget.selectedBackground": "#3b4252",
            "editorSuggestWidget.selectedForeground": "#88c0d0",
            "editorSuggestWidget.highlightForeground": "#88c0d0",
            "editorWidget.background": "#242933",
            "editorWidget.foreground": "#d8dee9",
            "editorWidget.border": "#3b4252",
            "focusBorder": "#88c0d0",
            "activityBar.background": "#1f232a",
            "activityBar.foreground": "#88c0d0",
            "activityBar.inactiveForeground": "#4c566a",
            "activityBarBadge.background": "#88c0d0",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#242933",
            "sideBar.foreground": "#d8dee9",
            "sideBarTitle.foreground": "#88c0d0",
            "sideBarSectionHeader.background": "#3b4252",
            "sideBarSectionHeader.foreground": "#d8dee9",
            "titleBar.activeBackground": "#1f232a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#1f232a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#3b4252",
            "statusBar.foreground": "#88c0d0",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#242933",
            "tab.activeBackground": "#2e3440",
            "tab.activeForeground": "#88c0d0",
            "tab.activeBorderTop": "#88c0d0",
            "tab.inactiveBackground": "#3b4252",
            "tab.inactiveForeground": "#4c566a",
            "tab.hoverBackground": "#3b4252",
            "breadcrumb.foreground": "#4c566a",
            "terminal.background": "#2e3440",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#88c0d0",
            "terminal.ansiGreen": "#88c0d0",
            "terminal.ansiCyan": "#8fbcbb",
            "terminal.ansiYellow": "#a3be8c",
            "input.background": "#3b4252",
            "input.foreground": "#eceff4",
            "input.placeholderForeground": "#4c566a",
            "panel.background": "#2e3440",
            "panel.border": "#242933",
            "panelTitle.activeForeground": "#88c0d0",
            "panelTitle.inactiveForeground": "#4c566a",
            "panelTitle.activeBorder": "#88c0d0",
            "chat.requestBackground": "#3b4252",
            "chat.requestBorder": "#3b4252",
            "chat.slashCommandBackground": "#3b4252",
            "chat.slashCommandForeground": "#88c0d0",
            "chat.avatarBackground": "#3b4252",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#3b4252",
            "interactive.requestBorder": "#3b4252",
            "textCodeBlock.background": "#3b4252",
            "textLink.foreground": "#88c0d0",
            "textLink.activeForeground": "#88c0d0",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#3b4252",
            "textBlockQuote.border": "#88c0d0",
            "badge.background": "#88c0d0",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#81a1c1",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#88c0d0"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#a3be8c"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#81a1c1"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#eceff4"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#8fbcbb"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4c566a",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b48ead"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#eceff4"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#88c0d0"
                }
            }
        ]
    },
    // ❄️ Nord Snow Light
    {
        id: "nord-snow",
        name: "\u2744\ufe0f Nord Snow Light",
        description: "Arctic fresh powder snow with clean polar slate, glacial blue accents, and deep ink text.",
        type: "light",
        accentColor: "#5e81ac",
        colors: {
            "foreground": "#2e3440",
            "descriptionForeground": "#4c566a",
            "disabledForeground": "#4c566a",
            "icon.foreground": "#000000",
            "editor.background": "#eceff4",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#4c566a",
            "editorLineNumber.activeForeground": "#5e81ac",
            "editorCursor.foreground": "#5e81ac",
            "editor.selectionBackground": "#d8dee9",
            "editor.lineHighlightBackground": "#d8dee9",
            "editorHoverWidget.background": "#e5e9f0",
            "editorHoverWidget.foreground": "#2e3440",
            "editorHoverWidget.border": "#d8dee9",
            "editorHoverWidget.statusBarBackground": "#d8dee9",
            "editorSuggestWidget.background": "#e5e9f0",
            "editorSuggestWidget.foreground": "#2e3440",
            "editorSuggestWidget.border": "#d8dee9",
            "editorSuggestWidget.selectedBackground": "#d8dee9",
            "editorSuggestWidget.selectedForeground": "#5e81ac",
            "editorSuggestWidget.highlightForeground": "#5e81ac",
            "editorWidget.background": "#e5e9f0",
            "editorWidget.foreground": "#2e3440",
            "editorWidget.border": "#d8dee9",
            "focusBorder": "#5e81ac",
            "activityBar.background": "#d8dee9",
            "activityBar.foreground": "#5e81ac",
            "activityBar.inactiveForeground": "#4c566a",
            "activityBarBadge.background": "#5e81ac",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#e5e9f0",
            "sideBar.foreground": "#2e3440",
            "sideBarTitle.foreground": "#5e81ac",
            "sideBarSectionHeader.background": "#d8dee9",
            "sideBarSectionHeader.foreground": "#2e3440",
            "titleBar.activeBackground": "#d8dee9",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#d8dee9",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#5e81ac",
            "statusBar.foreground": "#eceff4",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#e5e9f0",
            "tab.activeBackground": "#eceff4",
            "tab.activeForeground": "#5e81ac",
            "tab.activeBorderTop": "#5e81ac",
            "tab.inactiveBackground": "#d8dee9",
            "tab.inactiveForeground": "#4c566a",
            "tab.hoverBackground": "#d8dee9",
            "breadcrumb.foreground": "#4c566a",
            "terminal.background": "#eceff4",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#5e81ac",
            "terminal.ansiGreen": "#81a1c1",
            "terminal.ansiCyan": "#88c0d0",
            "terminal.ansiYellow": "#8fbcbb",
            "input.background": "#d8dee9",
            "input.foreground": "#2e3440",
            "input.placeholderForeground": "#4c566a",
            "panel.background": "#eceff4",
            "panel.border": "#e5e9f0",
            "panelTitle.activeForeground": "#5e81ac",
            "panelTitle.inactiveForeground": "#4c566a",
            "panelTitle.activeBorder": "#5e81ac",
            "chat.requestBackground": "#d8dee9",
            "chat.requestBorder": "#d8dee9",
            "chat.slashCommandBackground": "#d8dee9",
            "chat.slashCommandForeground": "#5e81ac",
            "chat.avatarBackground": "#d8dee9",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#d8dee9",
            "interactive.requestBorder": "#d8dee9",
            "textCodeBlock.background": "#d8dee9",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#d8dee9",
            "textBlockQuote.border": "#5e81ac",
            "badge.background": "#5e81ac",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#5e81ac",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#81a1c1"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#8fbcbb"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#5e81ac"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#2e3440"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#88c0d0"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4c566a",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b48ead"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#2e3440"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#81a1c1"
                }
            }
        ]
    },
    // 🌑 OLED Pure Black
    {
        id: "oled-pure-black",
        name: "\ud83c\udf11 OLED Pure Black",
        description: "True 100% pure black #000000 pixels for infinite contrast, maximum battery savings, and zero backlight bleed.",
        type: "dark",
        accentColor: "#38bdf8",
        colors: {
            "foreground": "#f8fafc",
            "descriptionForeground": "#64748b",
            "disabledForeground": "#475569",
            "icon.foreground": "#38bdf8",
            "editor.background": "#000000",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#475569",
            "editorLineNumber.activeForeground": "#38bdf8",
            "editorCursor.foreground": "#38bdf8",
            "editor.selectionBackground": "#0d0d0d",
            "editor.lineHighlightBackground": "#0d0d0d",
            "editorHoverWidget.background": "#050505",
            "editorHoverWidget.foreground": "#e2e8f0",
            "editorHoverWidget.border": "#0d0d0d",
            "editorHoverWidget.statusBarBackground": "#0d0d0d",
            "editorSuggestWidget.background": "#050505",
            "editorSuggestWidget.foreground": "#e2e8f0",
            "editorSuggestWidget.border": "#0d0d0d",
            "editorSuggestWidget.selectedBackground": "#0d0d0d",
            "editorSuggestWidget.selectedForeground": "#38bdf8",
            "editorSuggestWidget.highlightForeground": "#38bdf8",
            "editorWidget.background": "#050505",
            "editorWidget.foreground": "#e2e8f0",
            "editorWidget.border": "#0d0d0d",
            "focusBorder": "#38bdf8",
            "activityBar.background": "#000000",
            "activityBar.foreground": "#38bdf8",
            "activityBar.inactiveForeground": "#475569",
            "activityBarBadge.background": "#38bdf8",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#050505",
            "sideBar.foreground": "#e2e8f0",
            "sideBarTitle.foreground": "#38bdf8",
            "sideBarSectionHeader.background": "#0d0d0d",
            "sideBarSectionHeader.foreground": "#e2e8f0",
            "titleBar.activeBackground": "#000000",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#000000",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#000000",
            "statusBar.foreground": "#38bdf8",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#050505",
            "tab.activeBackground": "#000000",
            "tab.activeForeground": "#38bdf8",
            "tab.activeBorderTop": "#38bdf8",
            "tab.inactiveBackground": "#0d0d0d",
            "tab.inactiveForeground": "#64748b",
            "tab.hoverBackground": "#0d0d0d",
            "breadcrumb.foreground": "#64748b",
            "terminal.background": "#000000",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#38bdf8",
            "terminal.ansiGreen": "#38bdf8",
            "terminal.ansiCyan": "#facc15",
            "terminal.ansiYellow": "#4ade80",
            "input.background": "#111111",
            "input.foreground": "#f8fafc",
            "input.placeholderForeground": "#64748b",
            "panel.background": "#000000",
            "panel.border": "#050505",
            "panelTitle.activeForeground": "#38bdf8",
            "panelTitle.inactiveForeground": "#64748b",
            "panelTitle.activeBorder": "#38bdf8",
            "chat.requestBackground": "#111111",
            "chat.requestBorder": "#0d0d0d",
            "chat.slashCommandBackground": "#0d0d0d",
            "chat.slashCommandForeground": "#38bdf8",
            "chat.avatarBackground": "#0d0d0d",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#111111",
            "interactive.requestBorder": "#0d0d0d",
            "textCodeBlock.background": "#0d0d0d",
            "textLink.foreground": "#38bdf8",
            "textLink.activeForeground": "#38bdf8",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0d0d0d",
            "textBlockQuote.border": "#38bdf8",
            "badge.background": "#38bdf8",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#818cf8",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#4ade80"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#818cf8"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f8fafc"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#facc15"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#475569",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fb923c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f8fafc"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            }
        ]
    },
    // 🌌 Synthwave 84 Outrun
    {
        id: "synthwave-84",
        name: "\ud83c\udf0c Synthwave 84 Outrun",
        description: "Retrofuturistic 1980s neon grid sunset with hot pink, laser cyan, chrome yellow, and deep purple.",
        type: "dark",
        accentColor: "#ff7edb",
        colors: {
            "foreground": "#f92aad",
            "descriptionForeground": "#6e6582",
            "disabledForeground": "#614d85",
            "icon.foreground": "#ff7edb",
            "editor.background": "#262335",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#614d85",
            "editorLineNumber.activeForeground": "#ff7edb",
            "editorCursor.foreground": "#ff7edb",
            "editor.selectionBackground": "#2d2a3e",
            "editor.lineHighlightBackground": "#2d2a3e",
            "editorHoverWidget.background": "#1e1c2b",
            "editorHoverWidget.foreground": "#ff7edb",
            "editorHoverWidget.border": "#2d2a3e",
            "editorHoverWidget.statusBarBackground": "#2d2a3e",
            "editorSuggestWidget.background": "#1e1c2b",
            "editorSuggestWidget.foreground": "#ff7edb",
            "editorSuggestWidget.border": "#2d2a3e",
            "editorSuggestWidget.selectedBackground": "#2d2a3e",
            "editorSuggestWidget.selectedForeground": "#ff7edb",
            "editorSuggestWidget.highlightForeground": "#ff7edb",
            "editorWidget.background": "#1e1c2b",
            "editorWidget.foreground": "#ff7edb",
            "editorWidget.border": "#2d2a3e",
            "focusBorder": "#ff7edb",
            "activityBar.background": "#171520",
            "activityBar.foreground": "#ff7edb",
            "activityBar.inactiveForeground": "#614d85",
            "activityBarBadge.background": "#ff7edb",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#1e1c2b",
            "sideBar.foreground": "#ff7edb",
            "sideBarTitle.foreground": "#36f9f6",
            "sideBarSectionHeader.background": "#2d2a3e",
            "sideBarSectionHeader.foreground": "#ff7edb",
            "titleBar.activeBackground": "#171520",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#171520",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#36f9f6",
            "statusBar.foreground": "#262335",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1e1c2b",
            "tab.activeBackground": "#262335",
            "tab.activeForeground": "#ff7edb",
            "tab.activeBorderTop": "#ff7edb",
            "tab.inactiveBackground": "#2d2a3e",
            "tab.inactiveForeground": "#6e6582",
            "tab.hoverBackground": "#2d2a3e",
            "breadcrumb.foreground": "#6e6582",
            "terminal.background": "#262335",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ff7edb",
            "terminal.ansiGreen": "#36f9f6",
            "terminal.ansiCyan": "#fe4450",
            "terminal.ansiYellow": "#ff7edb",
            "input.background": "#342f48",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#6e6582",
            "panel.background": "#262335",
            "panel.border": "#1e1c2b",
            "panelTitle.activeForeground": "#ff7edb",
            "panelTitle.inactiveForeground": "#6e6582",
            "panelTitle.activeBorder": "#ff7edb",
            "chat.requestBackground": "#342f48",
            "chat.requestBorder": "#2d2a3e",
            "chat.slashCommandBackground": "#2d2a3e",
            "chat.slashCommandForeground": "#ff7edb",
            "chat.avatarBackground": "#2d2a3e",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#342f48",
            "interactive.requestBorder": "#2d2a3e",
            "textCodeBlock.background": "#2d2a3e",
            "textLink.foreground": "#ff7edb",
            "textLink.activeForeground": "#ff7edb",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#2d2a3e",
            "textBlockQuote.border": "#ff7edb",
            "badge.background": "#ff7edb",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#fede5d",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#36f9f6"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ff7edb"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#fede5d"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#fe4450"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#614d85",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f97e72"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f92aad"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#36f9f6"
                }
            }
        ]
    },
    // 📟 Matrix Hacker Terminal
    {
        id: "matrix-hacker",
        name: "\ud83d\udcdf Matrix Hacker Terminal",
        description: "Digital phosphor rain with deep obsidian terminal, glowing neon green glyphs, and emerald accents.",
        type: "dark",
        accentColor: "#00ff66",
        colors: {
            "foreground": "#00ff66",
            "descriptionForeground": "#006622",
            "disabledForeground": "#004d1a",
            "icon.foreground": "#00ff66",
            "editor.background": "#040804",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#004d1a",
            "editorLineNumber.activeForeground": "#00ff66",
            "editorCursor.foreground": "#00ff66",
            "editor.selectionBackground": "#0b1a0b",
            "editor.lineHighlightBackground": "#0b1a0b",
            "editorHoverWidget.background": "#071007",
            "editorHoverWidget.foreground": "#00dd55",
            "editorHoverWidget.border": "#0b1a0b",
            "editorHoverWidget.statusBarBackground": "#0b1a0b",
            "editorSuggestWidget.background": "#071007",
            "editorSuggestWidget.foreground": "#00dd55",
            "editorSuggestWidget.border": "#0b1a0b",
            "editorSuggestWidget.selectedBackground": "#0b1a0b",
            "editorSuggestWidget.selectedForeground": "#00ff66",
            "editorSuggestWidget.highlightForeground": "#00ff66",
            "editorWidget.background": "#071007",
            "editorWidget.foreground": "#00dd55",
            "editorWidget.border": "#0b1a0b",
            "focusBorder": "#00ff66",
            "activityBar.background": "#020402",
            "activityBar.foreground": "#00ff66",
            "activityBar.inactiveForeground": "#004d1a",
            "activityBarBadge.background": "#00ff66",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#071007",
            "sideBar.foreground": "#00dd55",
            "sideBarTitle.foreground": "#00ff66",
            "sideBarSectionHeader.background": "#0b1a0b",
            "sideBarSectionHeader.foreground": "#00dd55",
            "titleBar.activeBackground": "#020402",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#020402",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#00ff66",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#071007",
            "tab.activeBackground": "#040804",
            "tab.activeForeground": "#00ff66",
            "tab.activeBorderTop": "#00ff66",
            "tab.inactiveBackground": "#0b1a0b",
            "tab.inactiveForeground": "#006622",
            "tab.hoverBackground": "#0b1a0b",
            "breadcrumb.foreground": "#006622",
            "terminal.background": "#040804",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#00ff66",
            "terminal.ansiGreen": "#00ff66",
            "terminal.ansiCyan": "#00cc55",
            "terminal.ansiYellow": "#66ffaa",
            "input.background": "#0d200d",
            "input.foreground": "#00ff66",
            "input.placeholderForeground": "#006622",
            "panel.background": "#040804",
            "panel.border": "#071007",
            "panelTitle.activeForeground": "#00ff66",
            "panelTitle.inactiveForeground": "#006622",
            "panelTitle.activeBorder": "#00ff66",
            "chat.requestBackground": "#0d200d",
            "chat.requestBorder": "#0b1a0b",
            "chat.slashCommandBackground": "#0b1a0b",
            "chat.slashCommandForeground": "#00ff66",
            "chat.avatarBackground": "#0b1a0b",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#0d200d",
            "interactive.requestBorder": "#0b1a0b",
            "textCodeBlock.background": "#0b1a0b",
            "textLink.foreground": "#00ff66",
            "textLink.activeForeground": "#00ff66",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0b1a0b",
            "textBlockQuote.border": "#00ff66",
            "badge.background": "#00ff66",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#33ff88",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00ff66"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#66ffaa"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#33ff88"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#aaffcc"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#00cc55"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#004d1a",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#55ff99"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#00ff66"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00ff66"
                }
            }
        ]
    },
    // 🩸 Crimson Blood Moon
    {
        id: "crimson-blood-moon",
        name: "\ud83e\ude78 Crimson Blood Moon",
        description: "Gothic midnight atmosphere with deep crimson velvet, bloody rose accents, and bone white text.",
        type: "dark",
        accentColor: "#e11d48",
        colors: {
            "foreground": "#ffe4e6",
            "descriptionForeground": "#881337",
            "disabledForeground": "#501222",
            "icon.foreground": "#e11d48",
            "editor.background": "#0c0507",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#501222",
            "editorLineNumber.activeForeground": "#e11d48",
            "editorCursor.foreground": "#e11d48",
            "editor.selectionBackground": "#1f0c13",
            "editor.lineHighlightBackground": "#1f0c13",
            "editorHoverWidget.background": "#14080c",
            "editorHoverWidget.foreground": "#fecdd3",
            "editorHoverWidget.border": "#1f0c13",
            "editorHoverWidget.statusBarBackground": "#1f0c13",
            "editorSuggestWidget.background": "#14080c",
            "editorSuggestWidget.foreground": "#fecdd3",
            "editorSuggestWidget.border": "#1f0c13",
            "editorSuggestWidget.selectedBackground": "#1f0c13",
            "editorSuggestWidget.selectedForeground": "#e11d48",
            "editorSuggestWidget.highlightForeground": "#e11d48",
            "editorWidget.background": "#14080c",
            "editorWidget.foreground": "#fecdd3",
            "editorWidget.border": "#1f0c13",
            "focusBorder": "#e11d48",
            "activityBar.background": "#080204",
            "activityBar.foreground": "#e11d48",
            "activityBar.inactiveForeground": "#501222",
            "activityBarBadge.background": "#e11d48",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#14080c",
            "sideBar.foreground": "#fecdd3",
            "sideBarTitle.foreground": "#e11d48",
            "sideBarSectionHeader.background": "#1f0c13",
            "sideBarSectionHeader.foreground": "#fecdd3",
            "titleBar.activeBackground": "#080204",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#080204",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#be123c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#14080c",
            "tab.activeBackground": "#0c0507",
            "tab.activeForeground": "#e11d48",
            "tab.activeBorderTop": "#e11d48",
            "tab.inactiveBackground": "#1f0c13",
            "tab.inactiveForeground": "#881337",
            "tab.hoverBackground": "#1f0c13",
            "breadcrumb.foreground": "#881337",
            "terminal.background": "#0c0507",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#e11d48",
            "terminal.ansiGreen": "#fb7185",
            "terminal.ansiCyan": "#e11d48",
            "terminal.ansiYellow": "#fda4af",
            "input.background": "#240e16",
            "input.foreground": "#ffe4e6",
            "input.placeholderForeground": "#881337",
            "panel.background": "#0c0507",
            "panel.border": "#14080c",
            "panelTitle.activeForeground": "#e11d48",
            "panelTitle.inactiveForeground": "#881337",
            "panelTitle.activeBorder": "#e11d48",
            "chat.requestBackground": "#240e16",
            "chat.requestBorder": "#1f0c13",
            "chat.slashCommandBackground": "#1f0c13",
            "chat.slashCommandForeground": "#e11d48",
            "chat.avatarBackground": "#1f0c13",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#240e16",
            "interactive.requestBorder": "#1f0c13",
            "textCodeBlock.background": "#1f0c13",
            "textLink.foreground": "#e11d48",
            "textLink.activeForeground": "#e11d48",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1f0c13",
            "textBlockQuote.border": "#e11d48",
            "badge.background": "#e11d48",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#f43f5e",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#fb7185"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#fda4af"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#f43f5e"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffe4e6"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#e11d48"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#501222",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffe4e6"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#fb7185"
                }
            }
        ]
    },
    // 👾 Arcade 1989 Vaporwave
    {
        id: "arcade-vaporwave",
        name: "\ud83d\udc7e Arcade 1989 Vaporwave",
        description: "Nostalgic Japanese coin-op arcade with neon pastel cyan, spun magenta sugar, and mint peach.",
        type: "dark",
        accentColor: "#00f0ff",
        colors: {
            "foreground": "#f0e6ff",
            "descriptionForeground": "#705c9e",
            "disabledForeground": "#4d3d75",
            "icon.foreground": "#00f0ff",
            "editor.background": "#120e24",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4d3d75",
            "editorLineNumber.activeForeground": "#00f0ff",
            "editorCursor.foreground": "#00f0ff",
            "editor.selectionBackground": "#261d4a",
            "editor.lineHighlightBackground": "#261d4a",
            "editorHoverWidget.background": "#1a1433",
            "editorHoverWidget.foreground": "#e2d4fc",
            "editorHoverWidget.border": "#261d4a",
            "editorHoverWidget.statusBarBackground": "#261d4a",
            "editorSuggestWidget.background": "#1a1433",
            "editorSuggestWidget.foreground": "#e2d4fc",
            "editorSuggestWidget.border": "#261d4a",
            "editorSuggestWidget.selectedBackground": "#261d4a",
            "editorSuggestWidget.selectedForeground": "#00f0ff",
            "editorSuggestWidget.highlightForeground": "#00f0ff",
            "editorWidget.background": "#1a1433",
            "editorWidget.foreground": "#e2d4fc",
            "editorWidget.border": "#261d4a",
            "focusBorder": "#00f0ff",
            "activityBar.background": "#0d0a1a",
            "activityBar.foreground": "#00f0ff",
            "activityBar.inactiveForeground": "#4d3d75",
            "activityBarBadge.background": "#00f0ff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#1a1433",
            "sideBar.foreground": "#e2d4fc",
            "sideBarTitle.foreground": "#00f0ff",
            "sideBarSectionHeader.background": "#261d4a",
            "sideBarSectionHeader.foreground": "#e2d4fc",
            "titleBar.activeBackground": "#0d0a1a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0d0a1a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#ff007f",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1a1433",
            "tab.activeBackground": "#120e24",
            "tab.activeForeground": "#00f0ff",
            "tab.activeBorderTop": "#00f0ff",
            "tab.inactiveBackground": "#261d4a",
            "tab.inactiveForeground": "#705c9e",
            "tab.hoverBackground": "#261d4a",
            "breadcrumb.foreground": "#705c9e",
            "terminal.background": "#120e24",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#00f0ff",
            "terminal.ansiGreen": "#00f0ff",
            "terminal.ansiCyan": "#b829ff",
            "terminal.ansiYellow": "#ffe600",
            "input.background": "#2a2052",
            "input.foreground": "#f0e6ff",
            "input.placeholderForeground": "#705c9e",
            "panel.background": "#120e24",
            "panel.border": "#1a1433",
            "panelTitle.activeForeground": "#00f0ff",
            "panelTitle.inactiveForeground": "#705c9e",
            "panelTitle.activeBorder": "#00f0ff",
            "chat.requestBackground": "#2a2052",
            "chat.requestBorder": "#261d4a",
            "chat.slashCommandBackground": "#261d4a",
            "chat.slashCommandForeground": "#00f0ff",
            "chat.avatarBackground": "#261d4a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#2a2052",
            "interactive.requestBorder": "#261d4a",
            "textCodeBlock.background": "#261d4a",
            "textLink.foreground": "#00f0ff",
            "textLink.activeForeground": "#00f0ff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#261d4a",
            "textBlockQuote.border": "#00f0ff",
            "badge.background": "#00f0ff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff007f",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffe600"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff007f"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f0e6ff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b829ff"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4d3d75",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#00ffaa"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f0e6ff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            }
        ]
    },
    // 🔮 Amethyst Void
    {
        id: "amethyst-void",
        name: "\ud83d\udd2e Amethyst Void",
        description: "Deep crystal geode cavern with rich royal purple, glowing violet quartz, and shimmering lilac.",
        type: "dark",
        accentColor: "#c084fc",
        colors: {
            "foreground": "#f3e8ff",
            "descriptionForeground": "#6b21a8",
            "disabledForeground": "#4c1d95",
            "icon.foreground": "#c084fc",
            "editor.background": "#0f081c",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4c1d95",
            "editorLineNumber.activeForeground": "#c084fc",
            "editorCursor.foreground": "#c084fc",
            "editor.selectionBackground": "#221340",
            "editor.lineHighlightBackground": "#221340",
            "editorHoverWidget.background": "#170c2c",
            "editorHoverWidget.foreground": "#e9d5ff",
            "editorHoverWidget.border": "#221340",
            "editorHoverWidget.statusBarBackground": "#221340",
            "editorSuggestWidget.background": "#170c2c",
            "editorSuggestWidget.foreground": "#e9d5ff",
            "editorSuggestWidget.border": "#221340",
            "editorSuggestWidget.selectedBackground": "#221340",
            "editorSuggestWidget.selectedForeground": "#c084fc",
            "editorSuggestWidget.highlightForeground": "#c084fc",
            "editorWidget.background": "#170c2c",
            "editorWidget.foreground": "#e9d5ff",
            "editorWidget.border": "#221340",
            "focusBorder": "#c084fc",
            "activityBar.background": "#090412",
            "activityBar.foreground": "#c084fc",
            "activityBar.inactiveForeground": "#4c1d95",
            "activityBarBadge.background": "#c084fc",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#170c2c",
            "sideBar.foreground": "#e9d5ff",
            "sideBarTitle.foreground": "#c084fc",
            "sideBarSectionHeader.background": "#221340",
            "sideBarSectionHeader.foreground": "#e9d5ff",
            "titleBar.activeBackground": "#090412",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#090412",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#7e22ce",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#170c2c",
            "tab.activeBackground": "#0f081c",
            "tab.activeForeground": "#c084fc",
            "tab.activeBorderTop": "#c084fc",
            "tab.inactiveBackground": "#221340",
            "tab.inactiveForeground": "#6b21a8",
            "tab.hoverBackground": "#221340",
            "breadcrumb.foreground": "#6b21a8",
            "terminal.background": "#0f081c",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#c084fc",
            "terminal.ansiGreen": "#e879f9",
            "terminal.ansiCyan": "#a855f7",
            "terminal.ansiYellow": "#f0abfc",
            "input.background": "#28174a",
            "input.foreground": "#f3e8ff",
            "input.placeholderForeground": "#6b21a8",
            "panel.background": "#0f081c",
            "panel.border": "#170c2c",
            "panelTitle.activeForeground": "#c084fc",
            "panelTitle.inactiveForeground": "#6b21a8",
            "panelTitle.activeBorder": "#c084fc",
            "chat.requestBackground": "#28174a",
            "chat.requestBorder": "#221340",
            "chat.slashCommandBackground": "#221340",
            "chat.slashCommandForeground": "#c084fc",
            "chat.avatarBackground": "#221340",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#28174a",
            "interactive.requestBorder": "#221340",
            "textCodeBlock.background": "#221340",
            "textLink.foreground": "#c084fc",
            "textLink.activeForeground": "#c084fc",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#221340",
            "textBlockQuote.border": "#c084fc",
            "badge.background": "#c084fc",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c084fc",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#e879f9"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#f0abfc"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c084fc"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f3e8ff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#a855f7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4c1d95",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f3e8ff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#e879f9"
                }
            }
        ]
    },
    // ⚡ Hyperion Solar Flare
    {
        id: "hyperion-solar",
        name: "\u26a1 Hyperion Solar Flare",
        description: "Intense fusion energy with plasma yellow, radioactive orange, and scorching sunburst amber.",
        type: "dark",
        accentColor: "#fbbf24",
        colors: {
            "foreground": "#fef3c7",
            "descriptionForeground": "#78350f",
            "disabledForeground": "#543813",
            "icon.foreground": "#fbbf24",
            "editor.background": "#0f0c05",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#543813",
            "editorLineNumber.activeForeground": "#fbbf24",
            "editorCursor.foreground": "#fbbf24",
            "editor.selectionBackground": "#241d0c",
            "editor.lineHighlightBackground": "#241d0c",
            "editorHoverWidget.background": "#181308",
            "editorHoverWidget.foreground": "#fde68a",
            "editorHoverWidget.border": "#241d0c",
            "editorHoverWidget.statusBarBackground": "#241d0c",
            "editorSuggestWidget.background": "#181308",
            "editorSuggestWidget.foreground": "#fde68a",
            "editorSuggestWidget.border": "#241d0c",
            "editorSuggestWidget.selectedBackground": "#241d0c",
            "editorSuggestWidget.selectedForeground": "#fbbf24",
            "editorSuggestWidget.highlightForeground": "#fbbf24",
            "editorWidget.background": "#181308",
            "editorWidget.foreground": "#fde68a",
            "editorWidget.border": "#241d0c",
            "focusBorder": "#fbbf24",
            "activityBar.background": "#0a0703",
            "activityBar.foreground": "#fbbf24",
            "activityBar.inactiveForeground": "#543813",
            "activityBarBadge.background": "#fbbf24",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#181308",
            "sideBar.foreground": "#fde68a",
            "sideBarTitle.foreground": "#fbbf24",
            "sideBarSectionHeader.background": "#241d0c",
            "sideBarSectionHeader.foreground": "#fde68a",
            "titleBar.activeBackground": "#0a0703",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0a0703",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#d97706",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#181308",
            "tab.activeBackground": "#0f0c05",
            "tab.activeForeground": "#fbbf24",
            "tab.activeBorderTop": "#fbbf24",
            "tab.inactiveBackground": "#241d0c",
            "tab.inactiveForeground": "#78350f",
            "tab.hoverBackground": "#241d0c",
            "breadcrumb.foreground": "#78350f",
            "terminal.background": "#0f0c05",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#fbbf24",
            "terminal.ansiGreen": "#fbbf24",
            "terminal.ansiCyan": "#ea580c",
            "terminal.ansiYellow": "#fde047",
            "input.background": "#2a210d",
            "input.foreground": "#fef3c7",
            "input.placeholderForeground": "#78350f",
            "panel.background": "#0f0c05",
            "panel.border": "#181308",
            "panelTitle.activeForeground": "#fbbf24",
            "panelTitle.inactiveForeground": "#78350f",
            "panelTitle.activeBorder": "#fbbf24",
            "chat.requestBackground": "#2a210d",
            "chat.requestBorder": "#241d0c",
            "chat.slashCommandBackground": "#241d0c",
            "chat.slashCommandForeground": "#fbbf24",
            "chat.avatarBackground": "#241d0c",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#2a210d",
            "interactive.requestBorder": "#241d0c",
            "textCodeBlock.background": "#241d0c",
            "textLink.foreground": "#fbbf24",
            "textLink.activeForeground": "#fbbf24",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#241d0c",
            "textBlockQuote.border": "#fbbf24",
            "badge.background": "#fbbf24",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#f59e0b",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#fde047"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#f59e0b"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#fef3c7"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#ea580c"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#543813",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f97316"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fef3c7"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            }
        ]
    },
    // 🛸 Alien Abduction Green
    {
        id: "alien-abduction",
        name: "\ud83d\udef8 Alien Abduction Green",
        description: "Sci-fi extraterrestrial biomechanics with radioactive slime green, tractor beam cyan, and deep space obsidian.",
        type: "dark",
        accentColor: "#22c55e",
        colors: {
            "foreground": "#dcfce7",
            "descriptionForeground": "#15803d",
            "disabledForeground": "#14532d",
            "icon.foreground": "#22c55e",
            "editor.background": "#040d07",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#14532d",
            "editorLineNumber.activeForeground": "#22c55e",
            "editorCursor.foreground": "#22c55e",
            "editor.selectionBackground": "#0e2414",
            "editor.lineHighlightBackground": "#0e2414",
            "editorHoverWidget.background": "#08170c",
            "editorHoverWidget.foreground": "#bbf7d0",
            "editorHoverWidget.border": "#0e2414",
            "editorHoverWidget.statusBarBackground": "#0e2414",
            "editorSuggestWidget.background": "#08170c",
            "editorSuggestWidget.foreground": "#bbf7d0",
            "editorSuggestWidget.border": "#0e2414",
            "editorSuggestWidget.selectedBackground": "#0e2414",
            "editorSuggestWidget.selectedForeground": "#22c55e",
            "editorSuggestWidget.highlightForeground": "#22c55e",
            "editorWidget.background": "#08170c",
            "editorWidget.foreground": "#bbf7d0",
            "editorWidget.border": "#0e2414",
            "focusBorder": "#22c55e",
            "activityBar.background": "#020804",
            "activityBar.foreground": "#22c55e",
            "activityBar.inactiveForeground": "#14532d",
            "activityBarBadge.background": "#22c55e",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#08170c",
            "sideBar.foreground": "#bbf7d0",
            "sideBarTitle.foreground": "#22c55e",
            "sideBarSectionHeader.background": "#0e2414",
            "sideBarSectionHeader.foreground": "#bbf7d0",
            "titleBar.activeBackground": "#020804",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#020804",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#16a34a",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#08170c",
            "tab.activeBackground": "#040d07",
            "tab.activeForeground": "#22c55e",
            "tab.activeBorderTop": "#22c55e",
            "tab.inactiveBackground": "#0e2414",
            "tab.inactiveForeground": "#15803d",
            "tab.hoverBackground": "#0e2414",
            "breadcrumb.foreground": "#15803d",
            "terminal.background": "#040d07",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#22c55e",
            "terminal.ansiGreen": "#86efac",
            "terminal.ansiCyan": "#2dd4bf",
            "terminal.ansiYellow": "#22c55e",
            "input.background": "#102e1a",
            "input.foreground": "#dcfce7",
            "input.placeholderForeground": "#15803d",
            "panel.background": "#040d07",
            "panel.border": "#08170c",
            "panelTitle.activeForeground": "#22c55e",
            "panelTitle.inactiveForeground": "#15803d",
            "panelTitle.activeBorder": "#22c55e",
            "chat.requestBackground": "#102e1a",
            "chat.requestBorder": "#0e2414",
            "chat.slashCommandBackground": "#0e2414",
            "chat.slashCommandForeground": "#22c55e",
            "chat.avatarBackground": "#0e2414",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#102e1a",
            "interactive.requestBorder": "#0e2414",
            "textCodeBlock.background": "#0e2414",
            "textLink.foreground": "#22c55e",
            "textLink.activeForeground": "#22c55e",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0e2414",
            "textBlockQuote.border": "#22c55e",
            "badge.background": "#22c55e",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#4ade80",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#86efac"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#22c55e"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#4ade80"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#dcfce7"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#2dd4bf"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#14532d",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#facc15"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#dcfce7"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#86efac"
                }
            }
        ]
    },
    // 🫧 Abyssal Trench
    {
        id: "abyssal-trench",
        name: "\ud83e\udee7 Abyssal Trench",
        description: "Submarine oceanic depths with hydrothermal vents, bioluminescent aqua, and deep marine midnight.",
        type: "dark",
        accentColor: "#06b6d4",
        colors: {
            "foreground": "#e0f2fe",
            "descriptionForeground": "#0e7490",
            "disabledForeground": "#164e63",
            "icon.foreground": "#06b6d4",
            "editor.background": "#050e14",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#164e63",
            "editorLineNumber.activeForeground": "#06b6d4",
            "editorCursor.foreground": "#06b6d4",
            "editor.selectionBackground": "#0f2637",
            "editor.lineHighlightBackground": "#0f2637",
            "editorHoverWidget.background": "#091722",
            "editorHoverWidget.foreground": "#bae6fd",
            "editorHoverWidget.border": "#0f2637",
            "editorHoverWidget.statusBarBackground": "#0f2637",
            "editorSuggestWidget.background": "#091722",
            "editorSuggestWidget.foreground": "#bae6fd",
            "editorSuggestWidget.border": "#0f2637",
            "editorSuggestWidget.selectedBackground": "#0f2637",
            "editorSuggestWidget.selectedForeground": "#06b6d4",
            "editorSuggestWidget.highlightForeground": "#06b6d4",
            "editorWidget.background": "#091722",
            "editorWidget.foreground": "#bae6fd",
            "editorWidget.border": "#0f2637",
            "focusBorder": "#06b6d4",
            "activityBar.background": "#03080c",
            "activityBar.foreground": "#06b6d4",
            "activityBar.inactiveForeground": "#164e63",
            "activityBarBadge.background": "#06b6d4",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#091722",
            "sideBar.foreground": "#bae6fd",
            "sideBarTitle.foreground": "#06b6d4",
            "sideBarSectionHeader.background": "#0f2637",
            "sideBarSectionHeader.foreground": "#bae6fd",
            "titleBar.activeBackground": "#03080c",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#03080c",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#0891b2",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#091722",
            "tab.activeBackground": "#050e14",
            "tab.activeForeground": "#06b6d4",
            "tab.activeBorderTop": "#06b6d4",
            "tab.inactiveBackground": "#0f2637",
            "tab.inactiveForeground": "#0e7490",
            "tab.hoverBackground": "#0f2637",
            "breadcrumb.foreground": "#0e7490",
            "terminal.background": "#050e14",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#06b6d4",
            "terminal.ansiGreen": "#67e8f9",
            "terminal.ansiCyan": "#06b6d4",
            "terminal.ansiYellow": "#38bdf8",
            "input.background": "#123046",
            "input.foreground": "#e0f2fe",
            "input.placeholderForeground": "#0e7490",
            "panel.background": "#050e14",
            "panel.border": "#091722",
            "panelTitle.activeForeground": "#06b6d4",
            "panelTitle.inactiveForeground": "#0e7490",
            "panelTitle.activeBorder": "#06b6d4",
            "chat.requestBackground": "#123046",
            "chat.requestBorder": "#0f2637",
            "chat.slashCommandBackground": "#0f2637",
            "chat.slashCommandForeground": "#06b6d4",
            "chat.avatarBackground": "#0f2637",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#123046",
            "interactive.requestBorder": "#0f2637",
            "textCodeBlock.background": "#0f2637",
            "textLink.foreground": "#06b6d4",
            "textLink.activeForeground": "#06b6d4",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0f2637",
            "textBlockQuote.border": "#06b6d4",
            "badge.background": "#06b6d4",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#22d3ee",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#67e8f9"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#22d3ee"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#e0f2fe"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#06b6d4"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#164e63",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#a78bfa"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#e0f2fe"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#67e8f9"
                }
            }
        ]
    },
    // ☀️ Clean Minimalist Light
    {
        id: "clean-light",
        name: "\u2600\ufe0f Clean Minimalist Light",
        description: "Crisp, modern, high-clarity daytime light theme with soft slate backgrounds and indigo accents.",
        type: "light",
        accentColor: "#4f46e5",
        colors: {
            "foreground": "#0f172a",
            "descriptionForeground": "#475569",
            "disabledForeground": "#64748b",
            "icon.foreground": "#000000",
            "editor.background": "#ffffff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#4f46e5",
            "editorCursor.foreground": "#4f46e5",
            "editor.selectionBackground": "#f8fafc",
            "editor.lineHighlightBackground": "#f8fafc",
            "editorHoverWidget.background": "#f8fafc",
            "editorHoverWidget.foreground": "#0f172a",
            "editorHoverWidget.border": "#f8fafc",
            "editorHoverWidget.statusBarBackground": "#f8fafc",
            "editorSuggestWidget.background": "#f8fafc",
            "editorSuggestWidget.foreground": "#0f172a",
            "editorSuggestWidget.border": "#f8fafc",
            "editorSuggestWidget.selectedBackground": "#f8fafc",
            "editorSuggestWidget.selectedForeground": "#4f46e5",
            "editorSuggestWidget.highlightForeground": "#4f46e5",
            "editorWidget.background": "#f8fafc",
            "editorWidget.foreground": "#0f172a",
            "editorWidget.border": "#f8fafc",
            "focusBorder": "#4f46e5",
            "activityBar.background": "#f1f5f9",
            "activityBar.foreground": "#4f46e5",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#4f46e5",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f8fafc",
            "sideBar.foreground": "#0f172a",
            "sideBarTitle.foreground": "#4f46e5",
            "sideBarSectionHeader.background": "#f8fafc",
            "sideBarSectionHeader.foreground": "#0f172a",
            "titleBar.activeBackground": "#f1f5f9",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#f1f5f9",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#4f46e5",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f8fafc",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#4f46e5",
            "tab.activeBorderTop": "#4f46e5",
            "tab.inactiveBackground": "#f8fafc",
            "tab.inactiveForeground": "#475569",
            "tab.hoverBackground": "#f8fafc",
            "breadcrumb.foreground": "#475569",
            "terminal.background": "#ffffff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#4f46e5",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#0284c7",
            "terminal.ansiYellow": "#047857",
            "input.background": "#f1f5f9",
            "input.foreground": "#0f172a",
            "input.placeholderForeground": "#475569",
            "panel.background": "#ffffff",
            "panel.border": "#f8fafc",
            "panelTitle.activeForeground": "#4f46e5",
            "panelTitle.inactiveForeground": "#475569",
            "panelTitle.activeBorder": "#4f46e5",
            "chat.requestBackground": "#f1f5f9",
            "chat.requestBorder": "#f8fafc",
            "chat.slashCommandBackground": "#f8fafc",
            "chat.slashCommandForeground": "#4f46e5",
            "chat.avatarBackground": "#f8fafc",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f1f5f9",
            "interactive.requestBorder": "#f8fafc",
            "textCodeBlock.background": "#f8fafc",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#f8fafc",
            "textBlockQuote.border": "#4f46e5",
            "badge.background": "#4f46e5",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#6d28d9",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#0284c7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🌸 Cherry Blossom Sakura Light
    {
        id: "sakura-blossom",
        name: "\ud83c\udf38 Cherry Blossom Sakura Light",
        description: "Japanese springtime sakura petals, soft blush rose, polished jade, and delicate ivory.",
        type: "light",
        accentColor: "#db2777",
        colors: {
            "foreground": "#300326",
            "descriptionForeground": "#831843",
            "disabledForeground": "#9d174d",
            "icon.foreground": "#000000",
            "editor.background": "#fff5f7",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#9d174d",
            "editorLineNumber.activeForeground": "#db2777",
            "editorCursor.foreground": "#db2777",
            "editor.selectionBackground": "#fce7f3",
            "editor.lineHighlightBackground": "#fce7f3",
            "editorHoverWidget.background": "#fdf2f8",
            "editorHoverWidget.foreground": "#300326",
            "editorHoverWidget.border": "#fce7f3",
            "editorHoverWidget.statusBarBackground": "#fce7f3",
            "editorSuggestWidget.background": "#fdf2f8",
            "editorSuggestWidget.foreground": "#300326",
            "editorSuggestWidget.border": "#fce7f3",
            "editorSuggestWidget.selectedBackground": "#fce7f3",
            "editorSuggestWidget.selectedForeground": "#db2777",
            "editorSuggestWidget.highlightForeground": "#db2777",
            "editorWidget.background": "#fdf2f8",
            "editorWidget.foreground": "#300326",
            "editorWidget.border": "#fce7f3",
            "focusBorder": "#db2777",
            "activityBar.background": "#fce7f3",
            "activityBar.foreground": "#db2777",
            "activityBar.inactiveForeground": "#9d174d",
            "activityBarBadge.background": "#db2777",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#fdf2f8",
            "sideBar.foreground": "#300326",
            "sideBarTitle.foreground": "#db2777",
            "sideBarSectionHeader.background": "#fce7f3",
            "sideBarSectionHeader.foreground": "#300326",
            "titleBar.activeBackground": "#fce7f3",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fce7f3",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#db2777",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fdf2f8",
            "tab.activeBackground": "#fff5f7",
            "tab.activeForeground": "#db2777",
            "tab.activeBorderTop": "#db2777",
            "tab.inactiveBackground": "#fce7f3",
            "tab.inactiveForeground": "#831843",
            "tab.hoverBackground": "#fce7f3",
            "breadcrumb.foreground": "#831843",
            "terminal.background": "#fff5f7",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#db2777",
            "terminal.ansiGreen": "#047857",
            "terminal.ansiCyan": "#7e22ce",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#fdf2f8",
            "input.foreground": "#300326",
            "input.placeholderForeground": "#831843",
            "panel.background": "#fff5f7",
            "panel.border": "#fdf2f8",
            "panelTitle.activeForeground": "#db2777",
            "panelTitle.inactiveForeground": "#831843",
            "panelTitle.activeBorder": "#db2777",
            "chat.requestBackground": "#fdf2f8",
            "chat.requestBorder": "#fce7f3",
            "chat.slashCommandBackground": "#fce7f3",
            "chat.slashCommandForeground": "#db2777",
            "chat.avatarBackground": "#fce7f3",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#fdf2f8",
            "interactive.requestBorder": "#fce7f3",
            "textCodeBlock.background": "#fce7f3",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fce7f3",
            "textBlockQuote.border": "#db2777",
            "badge.background": "#db2777",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#be185d",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#be185d"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#300326"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#7e22ce"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#9d174d",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#be123c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#300326"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            }
        ]
    },
    // 🍧 Cotton Candy Pastel Light
    {
        id: "cotton-candy",
        name: "\ud83c\udf67 Cotton Candy Pastel Light",
        description: "Playful, joyful pastel carnival tones of spun pink sugar, baby blue sky, and lavender.",
        type: "light",
        accentColor: "#ec4899",
        colors: {
            "foreground": "#240444",
            "descriptionForeground": "#581c87",
            "disabledForeground": "#7e22ce",
            "icon.foreground": "#000000",
            "editor.background": "#faf5ff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#7e22ce",
            "editorLineNumber.activeForeground": "#ec4899",
            "editorCursor.foreground": "#ec4899",
            "editor.selectionBackground": "#e9d5ff",
            "editor.lineHighlightBackground": "#e9d5ff",
            "editorHoverWidget.background": "#f3e8ff",
            "editorHoverWidget.foreground": "#240444",
            "editorHoverWidget.border": "#e9d5ff",
            "editorHoverWidget.statusBarBackground": "#e9d5ff",
            "editorSuggestWidget.background": "#f3e8ff",
            "editorSuggestWidget.foreground": "#240444",
            "editorSuggestWidget.border": "#e9d5ff",
            "editorSuggestWidget.selectedBackground": "#e9d5ff",
            "editorSuggestWidget.selectedForeground": "#ec4899",
            "editorSuggestWidget.highlightForeground": "#ec4899",
            "editorWidget.background": "#f3e8ff",
            "editorWidget.foreground": "#240444",
            "editorWidget.border": "#e9d5ff",
            "focusBorder": "#ec4899",
            "activityBar.background": "#e9d5ff",
            "activityBar.foreground": "#ec4899",
            "activityBar.inactiveForeground": "#7e22ce",
            "activityBarBadge.background": "#ec4899",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f3e8ff",
            "sideBar.foreground": "#240444",
            "sideBarTitle.foreground": "#9333ea",
            "sideBarSectionHeader.background": "#e9d5ff",
            "sideBarSectionHeader.foreground": "#240444",
            "titleBar.activeBackground": "#e9d5ff",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#e9d5ff",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#9333ea",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f3e8ff",
            "tab.activeBackground": "#faf5ff",
            "tab.activeForeground": "#ec4899",
            "tab.activeBorderTop": "#ec4899",
            "tab.inactiveBackground": "#e9d5ff",
            "tab.inactiveForeground": "#581c87",
            "tab.hoverBackground": "#e9d5ff",
            "breadcrumb.foreground": "#581c87",
            "terminal.background": "#faf5ff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#ec4899",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#6d28d9",
            "terminal.ansiYellow": "#047857",
            "input.background": "#f3e8ff",
            "input.foreground": "#240444",
            "input.placeholderForeground": "#581c87",
            "panel.background": "#faf5ff",
            "panel.border": "#f3e8ff",
            "panelTitle.activeForeground": "#ec4899",
            "panelTitle.inactiveForeground": "#581c87",
            "panelTitle.activeBorder": "#ec4899",
            "chat.requestBackground": "#f3e8ff",
            "chat.requestBorder": "#e9d5ff",
            "chat.slashCommandBackground": "#e9d5ff",
            "chat.slashCommandForeground": "#ec4899",
            "chat.avatarBackground": "#e9d5ff",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f3e8ff",
            "interactive.requestBorder": "#e9d5ff",
            "textCodeBlock.background": "#e9d5ff",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#e9d5ff",
            "textBlockQuote.border": "#ec4899",
            "badge.background": "#ec4899",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#db2777",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#db2777"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#240444"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#7e22ce",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#240444"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🕊️ Ghost White Minimal
    {
        id: "ghost-white",
        name: "\ud83d\udd4a\ufe0f Ghost White Minimal",
        description: "Ultra clean pure white canvas #ffffff with crisp graphite typography and slate accents.",
        type: "light",
        accentColor: "#0f172a",
        colors: {
            "foreground": "#0f172a",
            "descriptionForeground": "#475569",
            "disabledForeground": "#64748b",
            "icon.foreground": "#000000",
            "editor.background": "#ffffff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#0f172a",
            "editorCursor.foreground": "#0f172a",
            "editor.selectionBackground": "#f1f5f9",
            "editor.lineHighlightBackground": "#f1f5f9",
            "editorHoverWidget.background": "#f8fafc",
            "editorHoverWidget.foreground": "#0f172a",
            "editorHoverWidget.border": "#f1f5f9",
            "editorHoverWidget.statusBarBackground": "#f1f5f9",
            "editorSuggestWidget.background": "#f8fafc",
            "editorSuggestWidget.foreground": "#0f172a",
            "editorSuggestWidget.border": "#f1f5f9",
            "editorSuggestWidget.selectedBackground": "#f1f5f9",
            "editorSuggestWidget.selectedForeground": "#0f172a",
            "editorSuggestWidget.highlightForeground": "#0f172a",
            "editorWidget.background": "#f8fafc",
            "editorWidget.foreground": "#0f172a",
            "editorWidget.border": "#f1f5f9",
            "focusBorder": "#0f172a",
            "activityBar.background": "#f1f5f9",
            "activityBar.foreground": "#0f172a",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#0f172a",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f8fafc",
            "sideBar.foreground": "#0f172a",
            "sideBarTitle.foreground": "#0f172a",
            "sideBarSectionHeader.background": "#f1f5f9",
            "sideBarSectionHeader.foreground": "#0f172a",
            "titleBar.activeBackground": "#f1f5f9",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#f1f5f9",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#0f172a",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f8fafc",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#0f172a",
            "tab.activeBorderTop": "#0f172a",
            "tab.inactiveBackground": "#f1f5f9",
            "tab.inactiveForeground": "#475569",
            "tab.hoverBackground": "#f1f5f9",
            "breadcrumb.foreground": "#475569",
            "terminal.background": "#ffffff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#0f172a",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#334155",
            "terminal.ansiYellow": "#047857",
            "input.background": "#f8fafc",
            "input.foreground": "#0f172a",
            "input.placeholderForeground": "#475569",
            "panel.background": "#ffffff",
            "panel.border": "#f8fafc",
            "panelTitle.activeForeground": "#0f172a",
            "panelTitle.inactiveForeground": "#475569",
            "panelTitle.activeBorder": "#0f172a",
            "chat.requestBackground": "#f8fafc",
            "chat.requestBorder": "#f1f5f9",
            "chat.slashCommandBackground": "#f1f5f9",
            "chat.slashCommandForeground": "#0f172a",
            "chat.avatarBackground": "#f1f5f9",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f8fafc",
            "interactive.requestBorder": "#f1f5f9",
            "textCodeBlock.background": "#f1f5f9",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#f1f5f9",
            "textBlockQuote.border": "#0f172a",
            "badge.background": "#0f172a",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#0f172a",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#334155"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🍦 Vanilla Bean Soft Light
    {
        id: "vanilla-bean",
        name: "\ud83c\udf66 Vanilla Bean Soft Light",
        description: "Gentle soothing custard cream and warm vanilla bean with deep charcoal ink.",
        type: "light",
        accentColor: "#ca8a04",
        colors: {
            "foreground": "#1c1816",
            "descriptionForeground": "#78350f",
            "disabledForeground": "#78716c",
            "icon.foreground": "#000000",
            "editor.background": "#fefdf8",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#ca8a04",
            "editorCursor.foreground": "#ca8a04",
            "editor.selectionBackground": "#f5f0db",
            "editor.lineHighlightBackground": "#f5f0db",
            "editorHoverWidget.background": "#fbf8ee",
            "editorHoverWidget.foreground": "#1c1816",
            "editorHoverWidget.border": "#f5f0db",
            "editorHoverWidget.statusBarBackground": "#f5f0db",
            "editorSuggestWidget.background": "#fbf8ee",
            "editorSuggestWidget.foreground": "#1c1816",
            "editorSuggestWidget.border": "#f5f0db",
            "editorSuggestWidget.selectedBackground": "#f5f0db",
            "editorSuggestWidget.selectedForeground": "#ca8a04",
            "editorSuggestWidget.highlightForeground": "#ca8a04",
            "editorWidget.background": "#fbf8ee",
            "editorWidget.foreground": "#1c1816",
            "editorWidget.border": "#f5f0db",
            "focusBorder": "#ca8a04",
            "activityBar.background": "#f5f0db",
            "activityBar.foreground": "#ca8a04",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#ca8a04",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#fbf8ee",
            "sideBar.foreground": "#1c1816",
            "sideBarTitle.foreground": "#78350f",
            "sideBarSectionHeader.background": "#f5f0db",
            "sideBarSectionHeader.foreground": "#1c1816",
            "titleBar.activeBackground": "#f5f0db",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#f5f0db",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#78350f",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fbf8ee",
            "tab.activeBackground": "#fefdf8",
            "tab.activeForeground": "#ca8a04",
            "tab.activeBorderTop": "#ca8a04",
            "tab.inactiveBackground": "#f5f0db",
            "tab.inactiveForeground": "#78350f",
            "tab.hoverBackground": "#f5f0db",
            "breadcrumb.foreground": "#78350f",
            "terminal.background": "#fefdf8",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#ca8a04",
            "terminal.ansiGreen": "#047857",
            "terminal.ansiCyan": "#3730a3",
            "terminal.ansiYellow": "#7c2d12",
            "input.background": "#fbf8ee",
            "input.foreground": "#1c1816",
            "input.placeholderForeground": "#78350f",
            "panel.background": "#fefdf8",
            "panel.border": "#fbf8ee",
            "panelTitle.activeForeground": "#ca8a04",
            "panelTitle.inactiveForeground": "#78350f",
            "panelTitle.activeBorder": "#ca8a04",
            "chat.requestBackground": "#fbf8ee",
            "chat.requestBorder": "#f5f0db",
            "chat.slashCommandBackground": "#f5f0db",
            "chat.slashCommandForeground": "#ca8a04",
            "chat.avatarBackground": "#f5f0db",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#fbf8ee",
            "interactive.requestBorder": "#f5f0db",
            "textCodeBlock.background": "#f5f0db",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#f5f0db",
            "textBlockQuote.border": "#ca8a04",
            "badge.background": "#ca8a04",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#b45309",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#7c2d12"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#1c1816"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#3730a3"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#991b1b"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#1c1816"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            }
        ]
    },
    // 🍑 Peach Bellini Light
    {
        id: "peach-bellini",
        name: "\ud83c\udf51 Peach Bellini Light",
        description: "Sun-ripened orchard peaches, prosecco bubbles, coral nectar, and sparkling apricot.",
        type: "light",
        accentColor: "#ea580c",
        colors: {
            "foreground": "#300b02",
            "descriptionForeground": "#7c2d12",
            "disabledForeground": "#9a3412",
            "icon.foreground": "#000000",
            "editor.background": "#fff7ed",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#9a3412",
            "editorLineNumber.activeForeground": "#ea580c",
            "editorCursor.foreground": "#ea580c",
            "editor.selectionBackground": "#fed7aa",
            "editor.lineHighlightBackground": "#fed7aa",
            "editorHoverWidget.background": "#ffedd5",
            "editorHoverWidget.foreground": "#300b02",
            "editorHoverWidget.border": "#fed7aa",
            "editorHoverWidget.statusBarBackground": "#fed7aa",
            "editorSuggestWidget.background": "#ffedd5",
            "editorSuggestWidget.foreground": "#300b02",
            "editorSuggestWidget.border": "#fed7aa",
            "editorSuggestWidget.selectedBackground": "#fed7aa",
            "editorSuggestWidget.selectedForeground": "#ea580c",
            "editorSuggestWidget.highlightForeground": "#ea580c",
            "editorWidget.background": "#ffedd5",
            "editorWidget.foreground": "#300b02",
            "editorWidget.border": "#fed7aa",
            "focusBorder": "#ea580c",
            "activityBar.background": "#fed7aa",
            "activityBar.foreground": "#ea580c",
            "activityBar.inactiveForeground": "#9a3412",
            "activityBarBadge.background": "#ea580c",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#ffedd5",
            "sideBar.foreground": "#300b02",
            "sideBarTitle.foreground": "#c2410c",
            "sideBarSectionHeader.background": "#fed7aa",
            "sideBarSectionHeader.foreground": "#300b02",
            "titleBar.activeBackground": "#fed7aa",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fed7aa",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#ea580c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#ffedd5",
            "tab.activeBackground": "#fff7ed",
            "tab.activeForeground": "#ea580c",
            "tab.activeBorderTop": "#ea580c",
            "tab.inactiveBackground": "#fed7aa",
            "tab.inactiveForeground": "#7c2d12",
            "tab.hoverBackground": "#fed7aa",
            "breadcrumb.foreground": "#7c2d12",
            "terminal.background": "#fff7ed",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#ea580c",
            "terminal.ansiGreen": "#be185d",
            "terminal.ansiCyan": "#6d28d9",
            "terminal.ansiYellow": "#15803d",
            "input.background": "#ffedd5",
            "input.foreground": "#300b02",
            "input.placeholderForeground": "#7c2d12",
            "panel.background": "#fff7ed",
            "panel.border": "#ffedd5",
            "panelTitle.activeForeground": "#ea580c",
            "panelTitle.inactiveForeground": "#7c2d12",
            "panelTitle.activeBorder": "#ea580c",
            "chat.requestBackground": "#ffedd5",
            "chat.requestBorder": "#fed7aa",
            "chat.slashCommandBackground": "#fed7aa",
            "chat.slashCommandForeground": "#ea580c",
            "chat.avatarBackground": "#fed7aa",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#ffedd5",
            "interactive.requestBorder": "#fed7aa",
            "textCodeBlock.background": "#fed7aa",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fed7aa",
            "textBlockQuote.border": "#ea580c",
            "badge.background": "#ea580c",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#c2410c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#be185d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#300b02"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#9a3412",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#300b02"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#be185d"
                }
            }
        ]
    },
    // 🪻 Lavender Mist Light
    {
        id: "lavender-mist",
        name: "\ud83e\udebb Lavender Mist Light",
        description: "Proven\u00e7al lavender fields at dawn, morning dew, soft purple blossoms and slate.",
        type: "light",
        accentColor: "#7c3aed",
        colors: {
            "foreground": "#1a0538",
            "descriptionForeground": "#581c87",
            "disabledForeground": "#6b21a8",
            "icon.foreground": "#000000",
            "editor.background": "#faf5ff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#6b21a8",
            "editorLineNumber.activeForeground": "#7c3aed",
            "editorCursor.foreground": "#7c3aed",
            "editor.selectionBackground": "#e9d5ff",
            "editor.lineHighlightBackground": "#e9d5ff",
            "editorHoverWidget.background": "#f3e8ff",
            "editorHoverWidget.foreground": "#1a0538",
            "editorHoverWidget.border": "#e9d5ff",
            "editorHoverWidget.statusBarBackground": "#e9d5ff",
            "editorSuggestWidget.background": "#f3e8ff",
            "editorSuggestWidget.foreground": "#1a0538",
            "editorSuggestWidget.border": "#e9d5ff",
            "editorSuggestWidget.selectedBackground": "#e9d5ff",
            "editorSuggestWidget.selectedForeground": "#7c3aed",
            "editorSuggestWidget.highlightForeground": "#7c3aed",
            "editorWidget.background": "#f3e8ff",
            "editorWidget.foreground": "#1a0538",
            "editorWidget.border": "#e9d5ff",
            "focusBorder": "#7c3aed",
            "activityBar.background": "#e9d5ff",
            "activityBar.foreground": "#7c3aed",
            "activityBar.inactiveForeground": "#6b21a8",
            "activityBarBadge.background": "#7c3aed",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f3e8ff",
            "sideBar.foreground": "#1a0538",
            "sideBarTitle.foreground": "#7c3aed",
            "sideBarSectionHeader.background": "#e9d5ff",
            "sideBarSectionHeader.foreground": "#1a0538",
            "titleBar.activeBackground": "#e9d5ff",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#e9d5ff",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#7c3aed",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f3e8ff",
            "tab.activeBackground": "#faf5ff",
            "tab.activeForeground": "#7c3aed",
            "tab.activeBorderTop": "#7c3aed",
            "tab.inactiveBackground": "#e9d5ff",
            "tab.inactiveForeground": "#581c87",
            "tab.hoverBackground": "#e9d5ff",
            "breadcrumb.foreground": "#581c87",
            "terminal.background": "#faf5ff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#7c3aed",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#be185d",
            "terminal.ansiYellow": "#047857",
            "input.background": "#f3e8ff",
            "input.foreground": "#1a0538",
            "input.placeholderForeground": "#581c87",
            "panel.background": "#faf5ff",
            "panel.border": "#f3e8ff",
            "panelTitle.activeForeground": "#7c3aed",
            "panelTitle.inactiveForeground": "#581c87",
            "panelTitle.activeBorder": "#7c3aed",
            "chat.requestBackground": "#f3e8ff",
            "chat.requestBorder": "#e9d5ff",
            "chat.slashCommandBackground": "#e9d5ff",
            "chat.slashCommandForeground": "#7c3aed",
            "chat.avatarBackground": "#e9d5ff",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f3e8ff",
            "interactive.requestBorder": "#e9d5ff",
            "textCodeBlock.background": "#e9d5ff",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#e9d5ff",
            "textBlockQuote.border": "#7c3aed",
            "badge.background": "#7c3aed",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#6d28d9",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#1a0538"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#be185d"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#6b21a8",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#1a0538"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🫧 Mint Sorbet Light
    {
        id: "mint-sorbet",
        name: "\ud83e\udee7 Mint Sorbet Light",
        description: "Chilled spearmint sorbet, eucalyptus mist, crisp seafoam and clean jade contrast.",
        type: "light",
        accentColor: "#059669",
        colors: {
            "foreground": "#021a0c",
            "descriptionForeground": "#14532d",
            "disabledForeground": "#15803d",
            "icon.foreground": "#000000",
            "editor.background": "#f0fdf4",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#15803d",
            "editorLineNumber.activeForeground": "#059669",
            "editorCursor.foreground": "#059669",
            "editor.selectionBackground": "#bbf7d0",
            "editor.lineHighlightBackground": "#bbf7d0",
            "editorHoverWidget.background": "#dcfce7",
            "editorHoverWidget.foreground": "#021a0c",
            "editorHoverWidget.border": "#bbf7d0",
            "editorHoverWidget.statusBarBackground": "#bbf7d0",
            "editorSuggestWidget.background": "#dcfce7",
            "editorSuggestWidget.foreground": "#021a0c",
            "editorSuggestWidget.border": "#bbf7d0",
            "editorSuggestWidget.selectedBackground": "#bbf7d0",
            "editorSuggestWidget.selectedForeground": "#059669",
            "editorSuggestWidget.highlightForeground": "#059669",
            "editorWidget.background": "#dcfce7",
            "editorWidget.foreground": "#021a0c",
            "editorWidget.border": "#bbf7d0",
            "focusBorder": "#059669",
            "activityBar.background": "#bbf7d0",
            "activityBar.foreground": "#059669",
            "activityBar.inactiveForeground": "#15803d",
            "activityBarBadge.background": "#059669",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#dcfce7",
            "sideBar.foreground": "#021a0c",
            "sideBarTitle.foreground": "#166534",
            "sideBarSectionHeader.background": "#bbf7d0",
            "sideBarSectionHeader.foreground": "#021a0c",
            "titleBar.activeBackground": "#bbf7d0",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#bbf7d0",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#059669",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#dcfce7",
            "tab.activeBackground": "#f0fdf4",
            "tab.activeForeground": "#059669",
            "tab.activeBorderTop": "#059669",
            "tab.inactiveBackground": "#bbf7d0",
            "tab.inactiveForeground": "#14532d",
            "tab.hoverBackground": "#bbf7d0",
            "breadcrumb.foreground": "#14532d",
            "terminal.background": "#f0fdf4",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#059669",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#6d28d9",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#dcfce7",
            "input.foreground": "#021a0c",
            "input.placeholderForeground": "#14532d",
            "panel.background": "#f0fdf4",
            "panel.border": "#dcfce7",
            "panelTitle.activeForeground": "#059669",
            "panelTitle.inactiveForeground": "#14532d",
            "panelTitle.activeBorder": "#059669",
            "chat.requestBackground": "#dcfce7",
            "chat.requestBorder": "#bbf7d0",
            "chat.slashCommandBackground": "#bbf7d0",
            "chat.slashCommandForeground": "#059669",
            "chat.avatarBackground": "#bbf7d0",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#dcfce7",
            "interactive.requestBorder": "#bbf7d0",
            "textCodeBlock.background": "#bbf7d0",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#bbf7d0",
            "textBlockQuote.border": "#059669",
            "badge.background": "#059669",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#047857",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#047857"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#021a0c"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#6d28d9"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#15803d",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#b91c1c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#021a0c"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🎮 1989 Dot Matrix Handheld
    {
        id: "gameboy-classic",
        name: "\ud83c\udfae 1989 Dot Matrix Handheld",
        description: "Nostalgic retro 4-shade olive green monochrome LCD matrix from the golden era of 8-bit portable gaming.",
        type: "light",
        accentColor: "#306230",
        colors: {
            "foreground": "#0f380f",
            "descriptionForeground": "#306230",
            "disabledForeground": "#306230",
            "icon.foreground": "#000000",
            "editor.background": "#9bbc0f",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#306230",
            "editorLineNumber.activeForeground": "#306230",
            "editorCursor.foreground": "#306230",
            "editor.selectionBackground": "#8bac0f",
            "editor.lineHighlightBackground": "#8bac0f",
            "editorHoverWidget.background": "#8bac0f",
            "editorHoverWidget.foreground": "#0f380f",
            "editorHoverWidget.border": "#8bac0f",
            "editorHoverWidget.statusBarBackground": "#8bac0f",
            "editorSuggestWidget.background": "#8bac0f",
            "editorSuggestWidget.foreground": "#0f380f",
            "editorSuggestWidget.border": "#8bac0f",
            "editorSuggestWidget.selectedBackground": "#8bac0f",
            "editorSuggestWidget.selectedForeground": "#306230",
            "editorSuggestWidget.highlightForeground": "#306230",
            "editorWidget.background": "#8bac0f",
            "editorWidget.foreground": "#0f380f",
            "editorWidget.border": "#8bac0f",
            "focusBorder": "#306230",
            "activityBar.background": "#8bac0f",
            "activityBar.foreground": "#306230",
            "activityBar.inactiveForeground": "#306230",
            "activityBarBadge.background": "#306230",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#8bac0f",
            "sideBar.foreground": "#0f380f",
            "sideBarTitle.foreground": "#306230",
            "sideBarSectionHeader.background": "#8bac0f",
            "sideBarSectionHeader.foreground": "#0f380f",
            "titleBar.activeBackground": "#8bac0f",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#8bac0f",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#306230",
            "statusBar.foreground": "#9bbc0f",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#8bac0f",
            "tab.activeBackground": "#9bbc0f",
            "tab.activeForeground": "#306230",
            "tab.activeBorderTop": "#306230",
            "tab.inactiveBackground": "#8bac0f",
            "tab.inactiveForeground": "#306230",
            "tab.hoverBackground": "#8bac0f",
            "breadcrumb.foreground": "#306230",
            "terminal.background": "#9bbc0f",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#306230",
            "terminal.ansiGreen": "#306230",
            "terminal.ansiCyan": "#306230",
            "terminal.ansiYellow": "#0f380f",
            "input.background": "#8bac0f",
            "input.foreground": "#0f380f",
            "input.placeholderForeground": "#306230",
            "panel.background": "#9bbc0f",
            "panel.border": "#8bac0f",
            "panelTitle.activeForeground": "#306230",
            "panelTitle.inactiveForeground": "#306230",
            "panelTitle.activeBorder": "#306230",
            "chat.requestBackground": "#8bac0f",
            "chat.requestBorder": "#8bac0f",
            "chat.slashCommandBackground": "#8bac0f",
            "chat.slashCommandForeground": "#306230",
            "chat.avatarBackground": "#8bac0f",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#8bac0f",
            "interactive.requestBorder": "#8bac0f",
            "textCodeBlock.background": "#8bac0f",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#8bac0f",
            "textBlockQuote.border": "#306230",
            "badge.background": "#306230",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#0f380f",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#306230"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#0f380f"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#0f380f"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#0f380f"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#306230"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#306230",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#0f380f"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#0f380f"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#306230"
                }
            }
        ]
    },
    // 🧱 Lego Master Builder
    {
        id: "lego-bricks",
        name: "\ud83e\uddf1 Lego Master Builder",
        description: "Iconic toy brick primary colors with bright plastic yellow, vibrant fire red, and royal blue studs.",
        type: "light",
        accentColor: "#dc2626",
        colors: {
            "foreground": "#0f172a",
            "descriptionForeground": "#713f12",
            "disabledForeground": "#64748b",
            "icon.foreground": "#000000",
            "editor.background": "#ffffff",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#dc2626",
            "editorCursor.foreground": "#dc2626",
            "editor.selectionBackground": "#fee2e2",
            "editor.lineHighlightBackground": "#fee2e2",
            "editorHoverWidget.background": "#fef08a",
            "editorHoverWidget.foreground": "#0f172a",
            "editorHoverWidget.border": "#fee2e2",
            "editorHoverWidget.statusBarBackground": "#fee2e2",
            "editorSuggestWidget.background": "#fef08a",
            "editorSuggestWidget.foreground": "#0f172a",
            "editorSuggestWidget.border": "#fee2e2",
            "editorSuggestWidget.selectedBackground": "#fee2e2",
            "editorSuggestWidget.selectedForeground": "#dc2626",
            "editorSuggestWidget.highlightForeground": "#dc2626",
            "editorWidget.background": "#fef08a",
            "editorWidget.foreground": "#0f172a",
            "editorWidget.border": "#fee2e2",
            "focusBorder": "#dc2626",
            "activityBar.background": "#fde047",
            "activityBar.foreground": "#dc2626",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#dc2626",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#fef08a",
            "sideBar.foreground": "#0f172a",
            "sideBarTitle.foreground": "#dc2626",
            "sideBarSectionHeader.background": "#fee2e2",
            "sideBarSectionHeader.foreground": "#0f172a",
            "titleBar.activeBackground": "#fde047",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#fde047",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#2563eb",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#fef08a",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#dc2626",
            "tab.activeBorderTop": "#dc2626",
            "tab.inactiveBackground": "#fee2e2",
            "tab.inactiveForeground": "#713f12",
            "tab.hoverBackground": "#fee2e2",
            "breadcrumb.foreground": "#713f12",
            "terminal.background": "#ffffff",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#dc2626",
            "terminal.ansiGreen": "#1d4ed8",
            "terminal.ansiCyan": "#b45309",
            "terminal.ansiYellow": "#15803d",
            "input.background": "#fef9c3",
            "input.foreground": "#0f172a",
            "input.placeholderForeground": "#713f12",
            "panel.background": "#ffffff",
            "panel.border": "#fef08a",
            "panelTitle.activeForeground": "#dc2626",
            "panelTitle.inactiveForeground": "#713f12",
            "panelTitle.activeBorder": "#dc2626",
            "chat.requestBackground": "#fef9c3",
            "chat.requestBorder": "#fee2e2",
            "chat.slashCommandBackground": "#fee2e2",
            "chat.slashCommandForeground": "#dc2626",
            "chat.avatarBackground": "#fee2e2",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#fef9c3",
            "interactive.requestBorder": "#fee2e2",
            "textCodeBlock.background": "#fee2e2",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#fee2e2",
            "textBlockQuote.border": "#dc2626",
            "badge.background": "#dc2626",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#dc2626",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#dc2626"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#c2410c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#1d4ed8"
                }
            }
        ]
    },
    // 🌊 Great Wave Ukiyo-e
    {
        id: "great-wave-hokusai",
        name: "\ud83c\udf0a Great Wave Ukiyo-e",
        description: "Traditional Japanese woodblock print with Prussian blue sea swells, ivory wave crests, and Mount Fuji clouds.",
        type: "dark",
        accentColor: "#38bdf8",
        colors: {
            "foreground": "#e2e8f0",
            "descriptionForeground": "#64748b",
            "disabledForeground": "#475569",
            "icon.foreground": "#38bdf8",
            "editor.background": "#0c1524",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#475569",
            "editorLineNumber.activeForeground": "#38bdf8",
            "editorCursor.foreground": "#38bdf8",
            "editor.selectionBackground": "#1e2f4f",
            "editor.lineHighlightBackground": "#1e2f4f",
            "editorHoverWidget.background": "#131f36",
            "editorHoverWidget.foreground": "#f8fafc",
            "editorHoverWidget.border": "#1e2f4f",
            "editorHoverWidget.statusBarBackground": "#1e2f4f",
            "editorSuggestWidget.background": "#131f36",
            "editorSuggestWidget.foreground": "#f8fafc",
            "editorSuggestWidget.border": "#1e2f4f",
            "editorSuggestWidget.selectedBackground": "#1e2f4f",
            "editorSuggestWidget.selectedForeground": "#38bdf8",
            "editorSuggestWidget.highlightForeground": "#38bdf8",
            "editorWidget.background": "#131f36",
            "editorWidget.foreground": "#f8fafc",
            "editorWidget.border": "#1e2f4f",
            "focusBorder": "#38bdf8",
            "activityBar.background": "#09101c",
            "activityBar.foreground": "#38bdf8",
            "activityBar.inactiveForeground": "#475569",
            "activityBarBadge.background": "#38bdf8",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#131f36",
            "sideBar.foreground": "#f8fafc",
            "sideBarTitle.foreground": "#38bdf8",
            "sideBarSectionHeader.background": "#1e2f4f",
            "sideBarSectionHeader.foreground": "#f8fafc",
            "titleBar.activeBackground": "#09101c",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#09101c",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#09101c",
            "statusBar.foreground": "#38bdf8",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#131f36",
            "tab.activeBackground": "#0c1524",
            "tab.activeForeground": "#38bdf8",
            "tab.activeBorderTop": "#38bdf8",
            "tab.inactiveBackground": "#1e2f4f",
            "tab.inactiveForeground": "#64748b",
            "tab.hoverBackground": "#1e2f4f",
            "breadcrumb.foreground": "#64748b",
            "terminal.background": "#0c1524",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#38bdf8",
            "terminal.ansiGreen": "#38bdf8",
            "terminal.ansiCyan": "#93c5fd",
            "terminal.ansiYellow": "#fed7aa",
            "input.background": "#1e2f4f",
            "input.foreground": "#f8fafc",
            "input.placeholderForeground": "#64748b",
            "panel.background": "#0c1524",
            "panel.border": "#131f36",
            "panelTitle.activeForeground": "#38bdf8",
            "panelTitle.inactiveForeground": "#64748b",
            "panelTitle.activeBorder": "#38bdf8",
            "chat.requestBackground": "#1e2f4f",
            "chat.requestBorder": "#1e2f4f",
            "chat.slashCommandBackground": "#1e2f4f",
            "chat.slashCommandForeground": "#38bdf8",
            "chat.avatarBackground": "#1e2f4f",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#1e2f4f",
            "interactive.requestBorder": "#1e2f4f",
            "textCodeBlock.background": "#1e2f4f",
            "textLink.foreground": "#38bdf8",
            "textLink.activeForeground": "#38bdf8",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1e2f4f",
            "textBlockQuote.border": "#38bdf8",
            "badge.background": "#38bdf8",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#67e8f9",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#fed7aa"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#67e8f9"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f8fafc"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#93c5fd"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#475569",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fb923c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#e2e8f0"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            }
        ]
    },
    // 🎃 Jack-O'-Lantern Halloween
    {
        id: "jack-o-lantern",
        name: "\ud83c\udf83 Jack-O'-Lantern Halloween",
        description: "Midnight haunted shadows with carved glowing pumpkin orange, toxic slime green, and witch purple.",
        type: "dark",
        accentColor: "#ff7700",
        colors: {
            "foreground": "#fff1e6",
            "descriptionForeground": "#a35200",
            "disabledForeground": "#6b4724",
            "icon.foreground": "#ff7700",
            "editor.background": "#0d0905",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#6b4724",
            "editorLineNumber.activeForeground": "#ff7700",
            "editorCursor.foreground": "#ff7700",
            "editor.selectionBackground": "#26190c",
            "editor.lineHighlightBackground": "#26190c",
            "editorHoverWidget.background": "#181008",
            "editorHoverWidget.foreground": "#fff1e6",
            "editorHoverWidget.border": "#26190c",
            "editorHoverWidget.statusBarBackground": "#26190c",
            "editorSuggestWidget.background": "#181008",
            "editorSuggestWidget.foreground": "#fff1e6",
            "editorSuggestWidget.border": "#26190c",
            "editorSuggestWidget.selectedBackground": "#26190c",
            "editorSuggestWidget.selectedForeground": "#ff7700",
            "editorSuggestWidget.highlightForeground": "#ff7700",
            "editorWidget.background": "#181008",
            "editorWidget.foreground": "#fff1e6",
            "editorWidget.border": "#26190c",
            "focusBorder": "#ff7700",
            "activityBar.background": "#080503",
            "activityBar.foreground": "#ff7700",
            "activityBar.inactiveForeground": "#6b4724",
            "activityBarBadge.background": "#ff7700",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#181008",
            "sideBar.foreground": "#fff1e6",
            "sideBarTitle.foreground": "#ff7700",
            "sideBarSectionHeader.background": "#26190c",
            "sideBarSectionHeader.foreground": "#fff1e6",
            "titleBar.activeBackground": "#080503",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#080503",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#ff7700",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#181008",
            "tab.activeBackground": "#0d0905",
            "tab.activeForeground": "#ff7700",
            "tab.activeBorderTop": "#ff7700",
            "tab.inactiveBackground": "#26190c",
            "tab.inactiveForeground": "#a35200",
            "tab.hoverBackground": "#26190c",
            "breadcrumb.foreground": "#a35200",
            "terminal.background": "#0d0905",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ff7700",
            "terminal.ansiGreen": "#39ff14",
            "terminal.ansiCyan": "#bf00ff",
            "terminal.ansiYellow": "#ffea00",
            "input.background": "#2a1c0e",
            "input.foreground": "#fff1e6",
            "input.placeholderForeground": "#a35200",
            "panel.background": "#0d0905",
            "panel.border": "#181008",
            "panelTitle.activeForeground": "#ff7700",
            "panelTitle.inactiveForeground": "#a35200",
            "panelTitle.activeBorder": "#ff7700",
            "chat.requestBackground": "#2a1c0e",
            "chat.requestBorder": "#26190c",
            "chat.slashCommandBackground": "#26190c",
            "chat.slashCommandForeground": "#ff7700",
            "chat.avatarBackground": "#26190c",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#2a1c0e",
            "interactive.requestBorder": "#26190c",
            "textCodeBlock.background": "#26190c",
            "textLink.foreground": "#ff7700",
            "textLink.activeForeground": "#ff7700",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#26190c",
            "textBlockQuote.border": "#ff7700",
            "badge.background": "#ff7700",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff7700",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#39ff14"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffea00"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff7700"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#fff1e6"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#bf00ff"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#6b4724",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff0055"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fff1e6"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#39ff14"
                }
            }
        ]
    },
    // 🐍 Python Emerald & Gold
    {
        id: "python-emerald",
        name: "\ud83d\udc0d Python Emerald & Gold",
        description: "Pythonic signature deep emerald jungle green with warm Python yellow and electric turquoise.",
        type: "dark",
        accentColor: "#ffd43b",
        colors: {
            "foreground": "#e8f5e9",
            "descriptionForeground": "#4e8271",
            "disabledForeground": "#426759",
            "icon.foreground": "#ffd43b",
            "editor.background": "#091410",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#426759",
            "editorLineNumber.activeForeground": "#ffd43b",
            "editorCursor.foreground": "#ffd43b",
            "editor.selectionBackground": "#132b23",
            "editor.lineHighlightBackground": "#132b23",
            "editorHoverWidget.background": "#0e1f19",
            "editorHoverWidget.foreground": "#e8f5e9",
            "editorHoverWidget.border": "#132b23",
            "editorHoverWidget.statusBarBackground": "#132b23",
            "editorSuggestWidget.background": "#0e1f19",
            "editorSuggestWidget.foreground": "#e8f5e9",
            "editorSuggestWidget.border": "#132b23",
            "editorSuggestWidget.selectedBackground": "#132b23",
            "editorSuggestWidget.selectedForeground": "#ffd43b",
            "editorSuggestWidget.highlightForeground": "#ffd43b",
            "editorWidget.background": "#0e1f19",
            "editorWidget.foreground": "#e8f5e9",
            "editorWidget.border": "#132b23",
            "focusBorder": "#ffd43b",
            "activityBar.background": "#060d0a",
            "activityBar.foreground": "#ffd43b",
            "activityBar.inactiveForeground": "#426759",
            "activityBarBadge.background": "#ffd43b",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0e1f19",
            "sideBar.foreground": "#e8f5e9",
            "sideBarTitle.foreground": "#ffd43b",
            "sideBarSectionHeader.background": "#132b23",
            "sideBarSectionHeader.foreground": "#e8f5e9",
            "titleBar.activeBackground": "#060d0a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#060d0a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#306998",
            "statusBar.foreground": "#ffd43b",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0e1f19",
            "tab.activeBackground": "#091410",
            "tab.activeForeground": "#ffd43b",
            "tab.activeBorderTop": "#ffd43b",
            "tab.inactiveBackground": "#132b23",
            "tab.inactiveForeground": "#4e8271",
            "tab.hoverBackground": "#132b23",
            "breadcrumb.foreground": "#4e8271",
            "terminal.background": "#091410",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffd43b",
            "terminal.ansiGreen": "#4b8bbe",
            "terminal.ansiCyan": "#40c4ff",
            "terminal.ansiYellow": "#69f0ae",
            "input.background": "#153027",
            "input.foreground": "#e8f5e9",
            "input.placeholderForeground": "#4e8271",
            "panel.background": "#091410",
            "panel.border": "#0e1f19",
            "panelTitle.activeForeground": "#ffd43b",
            "panelTitle.inactiveForeground": "#4e8271",
            "panelTitle.activeBorder": "#ffd43b",
            "chat.requestBackground": "#153027",
            "chat.requestBorder": "#132b23",
            "chat.slashCommandBackground": "#132b23",
            "chat.slashCommandForeground": "#ffd43b",
            "chat.avatarBackground": "#132b23",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#153027",
            "interactive.requestBorder": "#132b23",
            "textCodeBlock.background": "#132b23",
            "textLink.foreground": "#ffd43b",
            "textLink.activeForeground": "#ffd43b",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#132b23",
            "textBlockQuote.border": "#ffd43b",
            "badge.background": "#ffd43b",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffd43b",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#4b8bbe"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#69f0ae"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffd43b"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#e8f5e9"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#40c4ff"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#426759",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff9100"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#e8f5e9"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#4b8bbe"
                }
            }
        ]
    },
    // 🦀 Rust Crab Oxide
    {
        id: "rust-oxide",
        name: "\ud83e\udd80 Rust Crab Oxide",
        description: "Ferris crab rust orange, forged iron basalt, safety orange and molten steel.",
        type: "dark",
        accentColor: "#f74c00",
        colors: {
            "foreground": "#f5ece7",
            "descriptionForeground": "#8f6753",
            "disabledForeground": "#71584c",
            "icon.foreground": "#f74c00",
            "editor.background": "#14100e",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#71584c",
            "editorLineNumber.activeForeground": "#f74c00",
            "editorCursor.foreground": "#f74c00",
            "editor.selectionBackground": "#261e1a",
            "editor.lineHighlightBackground": "#261e1a",
            "editorHoverWidget.background": "#1c1613",
            "editorHoverWidget.foreground": "#f5ece7",
            "editorHoverWidget.border": "#261e1a",
            "editorHoverWidget.statusBarBackground": "#261e1a",
            "editorSuggestWidget.background": "#1c1613",
            "editorSuggestWidget.foreground": "#f5ece7",
            "editorSuggestWidget.border": "#261e1a",
            "editorSuggestWidget.selectedBackground": "#261e1a",
            "editorSuggestWidget.selectedForeground": "#f74c00",
            "editorSuggestWidget.highlightForeground": "#f74c00",
            "editorWidget.background": "#1c1613",
            "editorWidget.foreground": "#f5ece7",
            "editorWidget.border": "#261e1a",
            "focusBorder": "#f74c00",
            "activityBar.background": "#0e0a08",
            "activityBar.foreground": "#f74c00",
            "activityBar.inactiveForeground": "#71584c",
            "activityBarBadge.background": "#f74c00",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#1c1613",
            "sideBar.foreground": "#f5ece7",
            "sideBarTitle.foreground": "#f74c00",
            "sideBarSectionHeader.background": "#261e1a",
            "sideBarSectionHeader.foreground": "#f5ece7",
            "titleBar.activeBackground": "#0e0a08",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0e0a08",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#f74c00",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1c1613",
            "tab.activeBackground": "#14100e",
            "tab.activeForeground": "#f74c00",
            "tab.activeBorderTop": "#f74c00",
            "tab.inactiveBackground": "#261e1a",
            "tab.inactiveForeground": "#8f6753",
            "tab.hoverBackground": "#261e1a",
            "breadcrumb.foreground": "#8f6753",
            "terminal.background": "#14100e",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#f74c00",
            "terminal.ansiGreen": "#ff9e3b",
            "terminal.ansiCyan": "#e46876",
            "terminal.ansiYellow": "#7fb4ca",
            "input.background": "#2a221e",
            "input.foreground": "#f5ece7",
            "input.placeholderForeground": "#8f6753",
            "panel.background": "#14100e",
            "panel.border": "#1c1613",
            "panelTitle.activeForeground": "#f74c00",
            "panelTitle.inactiveForeground": "#8f6753",
            "panelTitle.activeBorder": "#f74c00",
            "chat.requestBackground": "#2a221e",
            "chat.requestBorder": "#261e1a",
            "chat.slashCommandBackground": "#261e1a",
            "chat.slashCommandForeground": "#f74c00",
            "chat.avatarBackground": "#261e1a",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#2a221e",
            "interactive.requestBorder": "#261e1a",
            "textCodeBlock.background": "#261e1a",
            "textLink.foreground": "#f74c00",
            "textLink.activeForeground": "#f74c00",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#261e1a",
            "textBlockQuote.border": "#f74c00",
            "badge.background": "#f74c00",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#f74c00",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#ff9e3b"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#7fb4ca"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#f74c00"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f5ece7"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#e46876"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#71584c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ffa066"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f5ece7"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#ff9e3b"
                }
            }
        ]
    },
    // 🎨 Bauhaus Modernist Grid
    {
        id: "bauhaus-grid",
        name: "\ud83c\udfa8 Bauhaus Modernist Grid",
        description: "Historic German Bauhaus design with geometric primary pure red, cobalt blue, yellow, and crisp white.",
        type: "dark",
        accentColor: "#facc15",
        colors: {
            "foreground": "#ffffff",
            "descriptionForeground": "#888899",
            "disabledForeground": "#666677",
            "icon.foreground": "#facc15",
            "editor.background": "#121214",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#666677",
            "editorLineNumber.activeForeground": "#facc15",
            "editorCursor.foreground": "#facc15",
            "editor.selectionBackground": "#24242a",
            "editor.lineHighlightBackground": "#24242a",
            "editorHoverWidget.background": "#1a1a1e",
            "editorHoverWidget.foreground": "#ffffff",
            "editorHoverWidget.border": "#24242a",
            "editorHoverWidget.statusBarBackground": "#24242a",
            "editorSuggestWidget.background": "#1a1a1e",
            "editorSuggestWidget.foreground": "#ffffff",
            "editorSuggestWidget.border": "#24242a",
            "editorSuggestWidget.selectedBackground": "#24242a",
            "editorSuggestWidget.selectedForeground": "#facc15",
            "editorSuggestWidget.highlightForeground": "#facc15",
            "editorWidget.background": "#1a1a1e",
            "editorWidget.foreground": "#ffffff",
            "editorWidget.border": "#24242a",
            "focusBorder": "#facc15",
            "activityBar.background": "#0b0b0c",
            "activityBar.foreground": "#facc15",
            "activityBar.inactiveForeground": "#666677",
            "activityBarBadge.background": "#facc15",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#1a1a1e",
            "sideBar.foreground": "#ffffff",
            "sideBarTitle.foreground": "#facc15",
            "sideBarSectionHeader.background": "#24242a",
            "sideBarSectionHeader.foreground": "#ffffff",
            "titleBar.activeBackground": "#0b0b0c",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0b0b0c",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#dc2626",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#1a1a1e",
            "tab.activeBackground": "#121214",
            "tab.activeForeground": "#facc15",
            "tab.activeBorderTop": "#facc15",
            "tab.inactiveBackground": "#24242a",
            "tab.inactiveForeground": "#888899",
            "tab.hoverBackground": "#24242a",
            "breadcrumb.foreground": "#888899",
            "terminal.background": "#121214",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#facc15",
            "terminal.ansiGreen": "#2563eb",
            "terminal.ansiCyan": "#06b6d4",
            "terminal.ansiYellow": "#facc15",
            "input.background": "#2a2a32",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#888899",
            "panel.background": "#121214",
            "panel.border": "#1a1a1e",
            "panelTitle.activeForeground": "#facc15",
            "panelTitle.inactiveForeground": "#888899",
            "panelTitle.activeBorder": "#facc15",
            "chat.requestBackground": "#2a2a32",
            "chat.requestBorder": "#24242a",
            "chat.slashCommandBackground": "#24242a",
            "chat.slashCommandForeground": "#facc15",
            "chat.avatarBackground": "#24242a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#2a2a32",
            "interactive.requestBorder": "#24242a",
            "textCodeBlock.background": "#24242a",
            "textLink.foreground": "#facc15",
            "textLink.activeForeground": "#facc15",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#24242a",
            "textBlockQuote.border": "#facc15",
            "badge.background": "#facc15",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#dc2626",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#2563eb"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#facc15"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#dc2626"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#06b6d4"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#666677",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f97316"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#2563eb"
                }
            }
        ]
    },
    // 🐸 Electric Poison Dart Frog
    {
        id: "poison-dart-frog",
        name: "\ud83d\udc38 Electric Poison Dart Frog",
        description: "Vibrant rainforest toxicity with bio-electric azure skin, toxic neon lime warning highlights, and venomous warning yellow against slick wet jungle obsidian.",
        type: "dark",
        accentColor: "#00f0ff",
        colors: {
            "foreground": "#e0f7fa",
            "descriptionForeground": "#4d7c8a",
            "disabledForeground": "#2b5a6f",
            "icon.foreground": "#00f0ff",
            "editor.background": "#040a10",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#2b5a6f",
            "editorLineNumber.activeForeground": "#00f0ff",
            "editorCursor.foreground": "#00f0ff",
            "editor.selectionBackground": "#0c1f2e",
            "editor.lineHighlightBackground": "#0c1f2e",
            "editorHoverWidget.background": "#07131d",
            "editorHoverWidget.foreground": "#80deea",
            "editorHoverWidget.border": "#0c1f2e",
            "editorHoverWidget.statusBarBackground": "#0c1f2e",
            "editorSuggestWidget.background": "#07131d",
            "editorSuggestWidget.foreground": "#80deea",
            "editorSuggestWidget.border": "#0c1f2e",
            "editorSuggestWidget.selectedBackground": "#0c1f2e",
            "editorSuggestWidget.selectedForeground": "#00f0ff",
            "editorSuggestWidget.highlightForeground": "#00f0ff",
            "editorWidget.background": "#07131d",
            "editorWidget.foreground": "#80deea",
            "editorWidget.border": "#0c1f2e",
            "focusBorder": "#00f0ff",
            "activityBar.background": "#02060a",
            "activityBar.foreground": "#00f0ff",
            "activityBar.inactiveForeground": "#2b5a6f",
            "activityBarBadge.background": "#00f0ff",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#07131d",
            "sideBar.foreground": "#80deea",
            "sideBarTitle.foreground": "#00f0ff",
            "sideBarSectionHeader.background": "#0c1f2e",
            "sideBarSectionHeader.foreground": "#80deea",
            "titleBar.activeBackground": "#02060a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#02060a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#00e5ff",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#07131d",
            "tab.activeBackground": "#040a10",
            "tab.activeForeground": "#00f0ff",
            "tab.activeBorderTop": "#00f0ff",
            "tab.inactiveBackground": "#0c1f2e",
            "tab.inactiveForeground": "#4d7c8a",
            "tab.hoverBackground": "#0c1f2e",
            "breadcrumb.foreground": "#4d7c8a",
            "terminal.background": "#040a10",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#00f0ff",
            "terminal.ansiGreen": "#39ff14",
            "terminal.ansiCyan": "#38bdf8",
            "terminal.ansiYellow": "#ffe600",
            "input.background": "#0a1c29",
            "input.foreground": "#e0f7fa",
            "input.placeholderForeground": "#4d7c8a",
            "panel.background": "#040a10",
            "panel.border": "#07131d",
            "panelTitle.activeForeground": "#00f0ff",
            "panelTitle.inactiveForeground": "#4d7c8a",
            "panelTitle.activeBorder": "#00f0ff",
            "chat.requestBackground": "#0a1c29",
            "chat.requestBorder": "#0c1f2e",
            "chat.slashCommandBackground": "#0c1f2e",
            "chat.slashCommandForeground": "#00f0ff",
            "chat.avatarBackground": "#0c1f2e",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#0a1c29",
            "interactive.requestBorder": "#0c1f2e",
            "textCodeBlock.background": "#0c1f2e",
            "textLink.foreground": "#00f0ff",
            "textLink.activeForeground": "#00f0ff",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0c1f2e",
            "textBlockQuote.border": "#00f0ff",
            "badge.background": "#00f0ff",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#00f0ff",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#39ff14"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffe600"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#00f0ff"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#e0f7fa"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#2b5a6f",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff3366"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#e0f7fa"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#39ff14"
                }
            }
        ]
    },
    // 🐅 Golden Bengal Tiger
    {
        id: "bengal-tiger",
        name: "\ud83d\udc05 Golden Bengal Tiger",
        description: "Predatory majesty featuring fiery striped amber orange, deep jungle shadow obsidian, predator amber gold, and crisp ivory underbelly highlights.",
        type: "dark",
        accentColor: "#ff8c00",
        colors: {
            "foreground": "#fef3c7",
            "descriptionForeground": "#8c6d4f",
            "disabledForeground": "#785b42",
            "icon.foreground": "#ff8c00",
            "editor.background": "#0d0905",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#785b42",
            "editorLineNumber.activeForeground": "#ff8c00",
            "editorCursor.foreground": "#ff8c00",
            "editor.selectionBackground": "#1a120a",
            "editor.lineHighlightBackground": "#1a120a",
            "editorHoverWidget.background": "#140e08",
            "editorHoverWidget.foreground": "#fde68a",
            "editorHoverWidget.border": "#1a120a",
            "editorHoverWidget.statusBarBackground": "#1a120a",
            "editorSuggestWidget.background": "#140e08",
            "editorSuggestWidget.foreground": "#fde68a",
            "editorSuggestWidget.border": "#1a120a",
            "editorSuggestWidget.selectedBackground": "#1a120a",
            "editorSuggestWidget.selectedForeground": "#ff8c00",
            "editorSuggestWidget.highlightForeground": "#ff8c00",
            "editorWidget.background": "#140e08",
            "editorWidget.foreground": "#fde68a",
            "editorWidget.border": "#1a120a",
            "focusBorder": "#ff8c00",
            "activityBar.background": "#080503",
            "activityBar.foreground": "#ff8c00",
            "activityBar.inactiveForeground": "#785b42",
            "activityBarBadge.background": "#ff8c00",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#140e08",
            "sideBar.foreground": "#fde68a",
            "sideBarTitle.foreground": "#ff8c00",
            "sideBarSectionHeader.background": "#1a120a",
            "sideBarSectionHeader.foreground": "#fde68a",
            "titleBar.activeBackground": "#080503",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#080503",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#ea580c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#140e08",
            "tab.activeBackground": "#0d0905",
            "tab.activeForeground": "#ff8c00",
            "tab.activeBorderTop": "#ff8c00",
            "tab.inactiveBackground": "#1a120a",
            "tab.inactiveForeground": "#8c6d4f",
            "tab.hoverBackground": "#1a120a",
            "breadcrumb.foreground": "#8c6d4f",
            "terminal.background": "#0d0905",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ff8c00",
            "terminal.ansiGreen": "#fbbf24",
            "terminal.ansiCyan": "#fb923c",
            "terminal.ansiYellow": "#fde047",
            "input.background": "#1e150d",
            "input.foreground": "#fffbeb",
            "input.placeholderForeground": "#8c6d4f",
            "panel.background": "#0d0905",
            "panel.border": "#140e08",
            "panelTitle.activeForeground": "#ff8c00",
            "panelTitle.inactiveForeground": "#8c6d4f",
            "panelTitle.activeBorder": "#ff8c00",
            "chat.requestBackground": "#1e150d",
            "chat.requestBorder": "#1a120a",
            "chat.slashCommandBackground": "#1a120a",
            "chat.slashCommandForeground": "#ff8c00",
            "chat.avatarBackground": "#1a120a",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#1e150d",
            "interactive.requestBorder": "#1a120a",
            "textCodeBlock.background": "#1a120a",
            "textLink.foreground": "#ff8c00",
            "textLink.activeForeground": "#ff8c00",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#1a120a",
            "textBlockQuote.border": "#ff8c00",
            "badge.background": "#ff8c00",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff7700",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#fde047"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff7700"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#fef3c7"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#fb923c"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#785b42",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ef4444"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fef3c7"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            }
        ]
    },
    // 🦚 Royal Peacock Majesty
    {
        id: "royal-peacock",
        name: "\ud83e\udd9a Royal Peacock Majesty",
        description: "Opulent plumage palette inspired by shimmering peacock feathers with iridescent royal sapphire cobalt, emerald tail fans, and ocelli eye gold.",
        type: "dark",
        accentColor: "#10b981",
        colors: {
            "foreground": "#ecfdf5",
            "descriptionForeground": "#4b7a87",
            "disabledForeground": "#2e5b66",
            "icon.foreground": "#10b981",
            "editor.background": "#040d12",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#2e5b66",
            "editorLineNumber.activeForeground": "#10b981",
            "editorCursor.foreground": "#10b981",
            "editor.selectionBackground": "#0d2432",
            "editor.lineHighlightBackground": "#0d2432",
            "editorHoverWidget.background": "#071720",
            "editorHoverWidget.foreground": "#a7f3d0",
            "editorHoverWidget.border": "#0d2432",
            "editorHoverWidget.statusBarBackground": "#0d2432",
            "editorSuggestWidget.background": "#071720",
            "editorSuggestWidget.foreground": "#a7f3d0",
            "editorSuggestWidget.border": "#0d2432",
            "editorSuggestWidget.selectedBackground": "#0d2432",
            "editorSuggestWidget.selectedForeground": "#10b981",
            "editorSuggestWidget.highlightForeground": "#10b981",
            "editorWidget.background": "#071720",
            "editorWidget.foreground": "#a7f3d0",
            "editorWidget.border": "#0d2432",
            "focusBorder": "#10b981",
            "activityBar.background": "#02070a",
            "activityBar.foreground": "#10b981",
            "activityBar.inactiveForeground": "#2e5b66",
            "activityBarBadge.background": "#10b981",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#071720",
            "sideBar.foreground": "#a7f3d0",
            "sideBarTitle.foreground": "#10b981",
            "sideBarSectionHeader.background": "#0d2432",
            "sideBarSectionHeader.foreground": "#a7f3d0",
            "titleBar.activeBackground": "#02070a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#02070a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#1d4ed8",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#071720",
            "tab.activeBackground": "#040d12",
            "tab.activeForeground": "#10b981",
            "tab.activeBorderTop": "#10b981",
            "tab.inactiveBackground": "#0d2432",
            "tab.inactiveForeground": "#4b7a87",
            "tab.hoverBackground": "#0d2432",
            "breadcrumb.foreground": "#4b7a87",
            "terminal.background": "#040d12",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#10b981",
            "terminal.ansiGreen": "#10b981",
            "terminal.ansiCyan": "#f59e0b",
            "terminal.ansiYellow": "#06b6d4",
            "input.background": "#0a222e",
            "input.foreground": "#ecfdf5",
            "input.placeholderForeground": "#4b7a87",
            "panel.background": "#040d12",
            "panel.border": "#071720",
            "panelTitle.activeForeground": "#10b981",
            "panelTitle.inactiveForeground": "#4b7a87",
            "panelTitle.activeBorder": "#10b981",
            "chat.requestBackground": "#0a222e",
            "chat.requestBorder": "#0d2432",
            "chat.slashCommandBackground": "#0d2432",
            "chat.slashCommandForeground": "#10b981",
            "chat.avatarBackground": "#0d2432",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#0a222e",
            "interactive.requestBorder": "#0d2432",
            "textCodeBlock.background": "#0d2432",
            "textLink.foreground": "#10b981",
            "textLink.activeForeground": "#10b981",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#0d2432",
            "textBlockQuote.border": "#10b981",
            "badge.background": "#10b981",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#60a5fa",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#10b981"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#06b6d4"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#60a5fa"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ecfdf5"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#f59e0b"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#2e5b66",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f43f5e"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ecfdf5"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#10b981"
                }
            }
        ]
    },
    // 🪼 Bioluminescent Deep-Sea Jellyfish
    {
        id: "bioluminescent-jellyfish",
        name: "\ud83e\udebc Bioluminescent Deep-Sea Jellyfish",
        description: "Abyssal marine spectacle with translucent ethereal hot magenta tentacles, ultraviolet neon glows, and oceanic depths of midnight indigo.",
        type: "dark",
        accentColor: "#ff007f",
        colors: {
            "foreground": "#f5f3ff",
            "descriptionForeground": "#6d5c94",
            "disabledForeground": "#4c3b70",
            "icon.foreground": "#ff007f",
            "editor.background": "#070512",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4c3b70",
            "editorLineNumber.activeForeground": "#ff007f",
            "editorCursor.foreground": "#ff007f",
            "editor.selectionBackground": "#161234",
            "editor.lineHighlightBackground": "#161234",
            "editorHoverWidget.background": "#0e0b22",
            "editorHoverWidget.foreground": "#ddd6fe",
            "editorHoverWidget.border": "#161234",
            "editorHoverWidget.statusBarBackground": "#161234",
            "editorSuggestWidget.background": "#0e0b22",
            "editorSuggestWidget.foreground": "#ddd6fe",
            "editorSuggestWidget.border": "#161234",
            "editorSuggestWidget.selectedBackground": "#161234",
            "editorSuggestWidget.selectedForeground": "#ff007f",
            "editorSuggestWidget.highlightForeground": "#ff007f",
            "editorWidget.background": "#0e0b22",
            "editorWidget.foreground": "#ddd6fe",
            "editorWidget.border": "#161234",
            "focusBorder": "#ff007f",
            "activityBar.background": "#04030a",
            "activityBar.foreground": "#ff007f",
            "activityBar.inactiveForeground": "#4c3b70",
            "activityBarBadge.background": "#ff007f",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#0e0b22",
            "sideBar.foreground": "#ddd6fe",
            "sideBarTitle.foreground": "#ff007f",
            "sideBarSectionHeader.background": "#161234",
            "sideBarSectionHeader.foreground": "#ddd6fe",
            "titleBar.activeBackground": "#04030a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#04030a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#7000ff",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0e0b22",
            "tab.activeBackground": "#070512",
            "tab.activeForeground": "#ff007f",
            "tab.activeBorderTop": "#ff007f",
            "tab.inactiveBackground": "#161234",
            "tab.inactiveForeground": "#6d5c94",
            "tab.hoverBackground": "#161234",
            "breadcrumb.foreground": "#6d5c94",
            "terminal.background": "#070512",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ff007f",
            "terminal.ansiGreen": "#00f5d4",
            "terminal.ansiCyan": "#7209b7",
            "terminal.ansiYellow": "#f72585",
            "input.background": "#18133b",
            "input.foreground": "#f5f3ff",
            "input.placeholderForeground": "#6d5c94",
            "panel.background": "#070512",
            "panel.border": "#0e0b22",
            "panelTitle.activeForeground": "#ff007f",
            "panelTitle.inactiveForeground": "#6d5c94",
            "panelTitle.activeBorder": "#ff007f",
            "chat.requestBackground": "#18133b",
            "chat.requestBorder": "#161234",
            "chat.slashCommandBackground": "#161234",
            "chat.slashCommandForeground": "#ff007f",
            "chat.avatarBackground": "#161234",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#18133b",
            "interactive.requestBorder": "#161234",
            "textCodeBlock.background": "#161234",
            "textLink.foreground": "#ff007f",
            "textLink.activeForeground": "#ff007f",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#161234",
            "textBlockQuote.border": "#ff007f",
            "badge.background": "#ff007f",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ff007f",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00f5d4"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#f72585"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ff007f"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f5f3ff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#7209b7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#4c3b70",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#4cc9f0"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f5f3ff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00f5d4"
                }
            }
        ]
    },
    // 🦊 Red Fox & Wildwood
    {
        id: "red-fox-wildwood",
        name: "\ud83e\udd8a Red Fox & Wildwood",
        description: "Rich woodland predator palette with warm auburn rust fur, crisp snow muzzle ivory, black stocking paws, and deep forest evergreen pine.",
        type: "dark",
        accentColor: "#ea580c",
        colors: {
            "foreground": "#fff7ed",
            "descriptionForeground": "#946852",
            "disabledForeground": "#785949",
            "icon.foreground": "#ea580c",
            "editor.background": "#0f0b09",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#785949",
            "editorLineNumber.activeForeground": "#ea580c",
            "editorCursor.foreground": "#ea580c",
            "editor.selectionBackground": "#231814",
            "editor.lineHighlightBackground": "#231814",
            "editorHoverWidget.background": "#17100d",
            "editorHoverWidget.foreground": "#fed7aa",
            "editorHoverWidget.border": "#231814",
            "editorHoverWidget.statusBarBackground": "#231814",
            "editorSuggestWidget.background": "#17100d",
            "editorSuggestWidget.foreground": "#fed7aa",
            "editorSuggestWidget.border": "#231814",
            "editorSuggestWidget.selectedBackground": "#231814",
            "editorSuggestWidget.selectedForeground": "#ea580c",
            "editorSuggestWidget.highlightForeground": "#ea580c",
            "editorWidget.background": "#17100d",
            "editorWidget.foreground": "#fed7aa",
            "editorWidget.border": "#231814",
            "focusBorder": "#ea580c",
            "activityBar.background": "#0a0705",
            "activityBar.foreground": "#ea580c",
            "activityBar.inactiveForeground": "#785949",
            "activityBarBadge.background": "#ea580c",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#17100d",
            "sideBar.foreground": "#fed7aa",
            "sideBarTitle.foreground": "#ea580c",
            "sideBarSectionHeader.background": "#231814",
            "sideBarSectionHeader.foreground": "#fed7aa",
            "titleBar.activeBackground": "#0a0705",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0a0705",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#c2410c",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#17100d",
            "tab.activeBackground": "#0f0b09",
            "tab.activeForeground": "#ea580c",
            "tab.activeBorderTop": "#ea580c",
            "tab.inactiveBackground": "#231814",
            "tab.inactiveForeground": "#946852",
            "tab.hoverBackground": "#231814",
            "breadcrumb.foreground": "#946852",
            "terminal.background": "#0f0b09",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ea580c",
            "terminal.ansiGreen": "#fbbf24",
            "terminal.ansiCyan": "#f97316",
            "terminal.ansiYellow": "#34d399",
            "input.background": "#241813",
            "input.foreground": "#fff7ed",
            "input.placeholderForeground": "#946852",
            "panel.background": "#0f0b09",
            "panel.border": "#17100d",
            "panelTitle.activeForeground": "#ea580c",
            "panelTitle.inactiveForeground": "#946852",
            "panelTitle.activeBorder": "#ea580c",
            "chat.requestBackground": "#241813",
            "chat.requestBorder": "#231814",
            "chat.slashCommandBackground": "#231814",
            "chat.slashCommandForeground": "#ea580c",
            "chat.avatarBackground": "#231814",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#241813",
            "interactive.requestBorder": "#231814",
            "textCodeBlock.background": "#231814",
            "textLink.foreground": "#ea580c",
            "textLink.activeForeground": "#ea580c",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#231814",
            "textBlockQuote.border": "#ea580c",
            "badge.background": "#ea580c",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ea580c",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#34d399"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ea580c"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#fff7ed"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#f97316"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#785949",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#f43f5e"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fff7ed"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#fbbf24"
                }
            }
        ]
    },
    // 🍩 The Simpsons (Springfield & Donut Pink)
    {
        id: "the-simpsons",
        name: "\ud83c\udf69 The Simpsons (Springfield & Donut Pink)",
        description: "Iconic Springfield animation palette featuring Homer yellow, Marge beehive cobalt blue, frosted pink donut, and Bart skateboard orange.",
        type: "dark",
        accentColor: "#ffd900",
        colors: {
            "foreground": "#fffbeb",
            "descriptionForeground": "#8c82a8",
            "disabledForeground": "#635b7e",
            "icon.foreground": "#ffd900",
            "editor.background": "#0e0d17",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#635b7e",
            "editorLineNumber.activeForeground": "#ffd900",
            "editorCursor.foreground": "#ffd900",
            "editor.selectionBackground": "#201d36",
            "editor.lineHighlightBackground": "#201d36",
            "editorHoverWidget.background": "#161426",
            "editorHoverWidget.foreground": "#fef08a",
            "editorHoverWidget.border": "#201d36",
            "editorHoverWidget.statusBarBackground": "#201d36",
            "editorSuggestWidget.background": "#161426",
            "editorSuggestWidget.foreground": "#fef08a",
            "editorSuggestWidget.border": "#201d36",
            "editorSuggestWidget.selectedBackground": "#201d36",
            "editorSuggestWidget.selectedForeground": "#ffd900",
            "editorSuggestWidget.highlightForeground": "#ffd900",
            "editorWidget.background": "#161426",
            "editorWidget.foreground": "#fef08a",
            "editorWidget.border": "#201d36",
            "focusBorder": "#ffd900",
            "activityBar.background": "#0a0912",
            "activityBar.foreground": "#ffd900",
            "activityBar.inactiveForeground": "#635b7e",
            "activityBarBadge.background": "#ffd900",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#161426",
            "sideBar.foreground": "#fef08a",
            "sideBarTitle.foreground": "#ffd900",
            "sideBarSectionHeader.background": "#201d36",
            "sideBarSectionHeader.foreground": "#fef08a",
            "titleBar.activeBackground": "#0a0912",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#0a0912",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#0066cc",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#161426",
            "tab.activeBackground": "#0e0d17",
            "tab.activeForeground": "#ffd900",
            "tab.activeBorderTop": "#ffd900",
            "tab.inactiveBackground": "#201d36",
            "tab.inactiveForeground": "#8c82a8",
            "tab.hoverBackground": "#201d36",
            "breadcrumb.foreground": "#8c82a8",
            "terminal.background": "#0e0d17",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#ffd900",
            "terminal.ansiGreen": "#ff69b4",
            "terminal.ansiCyan": "#38bdf8",
            "terminal.ansiYellow": "#00a2ff",
            "input.background": "#201d36",
            "input.foreground": "#ffffff",
            "input.placeholderForeground": "#8c82a8",
            "panel.background": "#0e0d17",
            "panel.border": "#161426",
            "panelTitle.activeForeground": "#ffd900",
            "panelTitle.inactiveForeground": "#8c82a8",
            "panelTitle.activeBorder": "#ffd900",
            "chat.requestBackground": "#201d36",
            "chat.requestBorder": "#201d36",
            "chat.slashCommandBackground": "#201d36",
            "chat.slashCommandForeground": "#ffd900",
            "chat.avatarBackground": "#201d36",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#201d36",
            "interactive.requestBorder": "#201d36",
            "textCodeBlock.background": "#201d36",
            "textLink.foreground": "#ffd900",
            "textLink.activeForeground": "#ffd900",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#201d36",
            "textBlockQuote.border": "#ffd900",
            "badge.background": "#ffd900",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#ffd900",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#ff69b4"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#00a2ff"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#ffd900"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#635b7e",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff6600"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#fffbeb"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#ff69b4"
                }
            }
        ]
    },
    // 🏔️ South Park (Colorado Snow Light)
    {
        id: "south-park",
        name: "\ud83c\udfd4\ufe0f South Park (Colorado Snow Light)",
        description: "Crisp Rocky Mountain daytime snow palette with Colorado powder white, Cartman red jacket, Kyle green ushanka, Stan blue pom-pom hat, and Kenny parka orange.",
        type: "light",
        accentColor: "#0284c7",
        colors: {
            "foreground": "#0f172a",
            "descriptionForeground": "#64748b",
            "disabledForeground": "#64748b",
            "icon.foreground": "#000000",
            "editor.background": "#f8fafc",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#64748b",
            "editorLineNumber.activeForeground": "#0284c7",
            "editorCursor.foreground": "#0284c7",
            "editor.selectionBackground": "#e2e8f0",
            "editor.lineHighlightBackground": "#e2e8f0",
            "editorHoverWidget.background": "#f1f5f9",
            "editorHoverWidget.foreground": "#1e293b",
            "editorHoverWidget.border": "#e2e8f0",
            "editorHoverWidget.statusBarBackground": "#e2e8f0",
            "editorSuggestWidget.background": "#f1f5f9",
            "editorSuggestWidget.foreground": "#1e293b",
            "editorSuggestWidget.border": "#e2e8f0",
            "editorSuggestWidget.selectedBackground": "#e2e8f0",
            "editorSuggestWidget.selectedForeground": "#0284c7",
            "editorSuggestWidget.highlightForeground": "#0284c7",
            "editorWidget.background": "#f1f5f9",
            "editorWidget.foreground": "#1e293b",
            "editorWidget.border": "#e2e8f0",
            "focusBorder": "#0284c7",
            "activityBar.background": "#e2e8f0",
            "activityBar.foreground": "#0284c7",
            "activityBar.inactiveForeground": "#64748b",
            "activityBarBadge.background": "#0284c7",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f1f5f9",
            "sideBar.foreground": "#1e293b",
            "sideBarTitle.foreground": "#0284c7",
            "sideBarSectionHeader.background": "#e2e8f0",
            "sideBarSectionHeader.foreground": "#1e293b",
            "titleBar.activeBackground": "#e2e8f0",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#e2e8f0",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#ff5500",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f1f5f9",
            "tab.activeBackground": "#f8fafc",
            "tab.activeForeground": "#0284c7",
            "tab.activeBorderTop": "#0284c7",
            "tab.inactiveBackground": "#e2e8f0",
            "tab.inactiveForeground": "#64748b",
            "tab.hoverBackground": "#e2e8f0",
            "breadcrumb.foreground": "#64748b",
            "terminal.background": "#f8fafc",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#0284c7",
            "terminal.ansiGreen": "#15803d",
            "terminal.ansiCyan": "#0284c7",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#f1f5f9",
            "input.foreground": "#0f172a",
            "input.placeholderForeground": "#64748b",
            "panel.background": "#f8fafc",
            "panel.border": "#f1f5f9",
            "panelTitle.activeForeground": "#0284c7",
            "panelTitle.inactiveForeground": "#64748b",
            "panelTitle.activeBorder": "#0284c7",
            "chat.requestBackground": "#f1f5f9",
            "chat.requestBorder": "#e2e8f0",
            "chat.slashCommandBackground": "#e2e8f0",
            "chat.slashCommandForeground": "#0284c7",
            "chat.avatarBackground": "#e2e8f0",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f1f5f9",
            "interactive.requestBorder": "#e2e8f0",
            "textCodeBlock.background": "#e2e8f0",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#e2e8f0",
            "textBlockQuote.border": "#0284c7",
            "badge.background": "#0284c7",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#dc2626",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#dc2626"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#0284c7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#64748b",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ea580c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#0f172a"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            }
        ]
    },
    // 🍺 Family Guy (Quahog Daylight)
    {
        id: "family-guy",
        name: "\ud83c\udf7a Family Guy (Quahog Daylight)",
        description: "Bright sunny suburban Quahog daytime palette featuring Peter Griffin green trousers, Stewie red overalls and yellow shirt, Lois teal, and Pawtucket Ale amber.",
        type: "light",
        accentColor: "#16a34a",
        colors: {
            "foreground": "#1c1917",
            "descriptionForeground": "#78716c",
            "disabledForeground": "#78716c",
            "icon.foreground": "#000000",
            "editor.background": "#fefdfa",
            "editor.foreground": "#000000",
            "editorLineNumber.foreground": "#78716c",
            "editorLineNumber.activeForeground": "#16a34a",
            "editorCursor.foreground": "#16a34a",
            "editor.selectionBackground": "#ebe7df",
            "editor.lineHighlightBackground": "#ebe7df",
            "editorHoverWidget.background": "#f5f3ef",
            "editorHoverWidget.foreground": "#1c1917",
            "editorHoverWidget.border": "#ebe7df",
            "editorHoverWidget.statusBarBackground": "#ebe7df",
            "editorSuggestWidget.background": "#f5f3ef",
            "editorSuggestWidget.foreground": "#1c1917",
            "editorSuggestWidget.border": "#ebe7df",
            "editorSuggestWidget.selectedBackground": "#ebe7df",
            "editorSuggestWidget.selectedForeground": "#16a34a",
            "editorSuggestWidget.highlightForeground": "#16a34a",
            "editorWidget.background": "#f5f3ef",
            "editorWidget.foreground": "#1c1917",
            "editorWidget.border": "#ebe7df",
            "focusBorder": "#16a34a",
            "activityBar.background": "#ebe7df",
            "activityBar.foreground": "#16a34a",
            "activityBar.inactiveForeground": "#78716c",
            "activityBarBadge.background": "#16a34a",
            "activityBarBadge.foreground": "#ffffff",
            "sideBar.background": "#f5f3ef",
            "sideBar.foreground": "#1c1917",
            "sideBarTitle.foreground": "#15803d",
            "sideBarSectionHeader.background": "#ebe7df",
            "sideBarSectionHeader.foreground": "#1c1917",
            "titleBar.activeBackground": "#ebe7df",
            "titleBar.activeForeground": "#000000",
            "titleBar.inactiveBackground": "#ebe7df",
            "titleBar.inactiveForeground": "#555555",
            "statusBar.background": "#d97706",
            "statusBar.foreground": "#ffffff",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#f5f3ef",
            "tab.activeBackground": "#fefdfa",
            "tab.activeForeground": "#16a34a",
            "tab.activeBorderTop": "#16a34a",
            "tab.inactiveBackground": "#ebe7df",
            "tab.inactiveForeground": "#78716c",
            "tab.hoverBackground": "#ebe7df",
            "breadcrumb.foreground": "#78716c",
            "terminal.background": "#fefdfa",
            "terminal.foreground": "#000000",
            "terminalCursor.foreground": "#16a34a",
            "terminal.ansiGreen": "#15803d",
            "terminal.ansiCyan": "#0284c7",
            "terminal.ansiYellow": "#b45309",
            "input.background": "#f5f3ef",
            "input.foreground": "#1c1917",
            "input.placeholderForeground": "#78716c",
            "panel.background": "#fefdfa",
            "panel.border": "#f5f3ef",
            "panelTitle.activeForeground": "#16a34a",
            "panelTitle.inactiveForeground": "#78716c",
            "panelTitle.activeBorder": "#16a34a",
            "chat.requestBackground": "#f5f3ef",
            "chat.requestBorder": "#ebe7df",
            "chat.slashCommandBackground": "#ebe7df",
            "chat.slashCommandForeground": "#16a34a",
            "chat.avatarBackground": "#ebe7df",
            "chat.avatarForeground": "#ffffff",
            "interactive.requestBackground": "#f5f3ef",
            "interactive.requestBorder": "#ebe7df",
            "textCodeBlock.background": "#ebe7df",
            "textLink.foreground": "#0284c7",
            "textLink.activeForeground": "#0284c7",
            "textPreformat.foreground": "#000000",
            "textBlockQuote.background": "#ebe7df",
            "textBlockQuote.border": "#16a34a",
            "badge.background": "#16a34a",
            "badge.foreground": "#ffffff"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#dc2626",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#b45309"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#dc2626"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#1c1917"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#0284c7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#78716c",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ea580c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#1c1917"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#15803d"
                }
            }
        ]
    },
    // 🧪 Rick and Morty (Interdimensional Portal)
    {
        id: "rick-and-morty",
        name: "\ud83e\uddea Rick and Morty (Interdimensional Portal)",
        description: "Swirling multiverse palette with radioactive toxic portal gun green, Rick's lab coat cyan and unkempt hair, Morty's yellow tee, and deep space cosmos.",
        type: "dark",
        accentColor: "#39ff14",
        colors: {
            "foreground": "#ecfeff",
            "descriptionForeground": "#486581",
            "disabledForeground": "#334e68",
            "icon.foreground": "#39ff14",
            "editor.background": "#06090e",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#334e68",
            "editorLineNumber.activeForeground": "#39ff14",
            "editorCursor.foreground": "#39ff14",
            "editor.selectionBackground": "#141d2c",
            "editor.lineHighlightBackground": "#141d2c",
            "editorHoverWidget.background": "#0c121c",
            "editorHoverWidget.foreground": "#a5f3fc",
            "editorHoverWidget.border": "#141d2c",
            "editorHoverWidget.statusBarBackground": "#141d2c",
            "editorSuggestWidget.background": "#0c121c",
            "editorSuggestWidget.foreground": "#a5f3fc",
            "editorSuggestWidget.border": "#141d2c",
            "editorSuggestWidget.selectedBackground": "#141d2c",
            "editorSuggestWidget.selectedForeground": "#39ff14",
            "editorSuggestWidget.highlightForeground": "#39ff14",
            "editorWidget.background": "#0c121c",
            "editorWidget.foreground": "#a5f3fc",
            "editorWidget.border": "#141d2c",
            "focusBorder": "#39ff14",
            "activityBar.background": "#030508",
            "activityBar.foreground": "#39ff14",
            "activityBar.inactiveForeground": "#334e68",
            "activityBarBadge.background": "#39ff14",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0c121c",
            "sideBar.foreground": "#a5f3fc",
            "sideBarTitle.foreground": "#39ff14",
            "sideBarSectionHeader.background": "#141d2c",
            "sideBarSectionHeader.foreground": "#a5f3fc",
            "titleBar.activeBackground": "#030508",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#030508",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#00e55b",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0c121c",
            "tab.activeBackground": "#06090e",
            "tab.activeForeground": "#39ff14",
            "tab.activeBorderTop": "#39ff14",
            "tab.inactiveBackground": "#141d2c",
            "tab.inactiveForeground": "#486581",
            "tab.hoverBackground": "#141d2c",
            "breadcrumb.foreground": "#486581",
            "terminal.background": "#06090e",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#39ff14",
            "terminal.ansiGreen": "#38bdf8",
            "terminal.ansiCyan": "#a855f7",
            "terminal.ansiYellow": "#fde047",
            "input.background": "#162234",
            "input.foreground": "#ecfeff",
            "input.placeholderForeground": "#486581",
            "panel.background": "#06090e",
            "panel.border": "#0c121c",
            "panelTitle.activeForeground": "#39ff14",
            "panelTitle.inactiveForeground": "#486581",
            "panelTitle.activeBorder": "#39ff14",
            "chat.requestBackground": "#162234",
            "chat.requestBorder": "#141d2c",
            "chat.slashCommandBackground": "#141d2c",
            "chat.slashCommandForeground": "#39ff14",
            "chat.avatarBackground": "#141d2c",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#162234",
            "interactive.requestBorder": "#141d2c",
            "textCodeBlock.background": "#141d2c",
            "textLink.foreground": "#39ff14",
            "textLink.activeForeground": "#39ff14",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#141d2c",
            "textBlockQuote.border": "#39ff14",
            "badge.background": "#39ff14",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#39ff14",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#fde047"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#39ff14"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#ffffff"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#a855f7"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#334e68",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#fb923c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#ecfeff"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#38bdf8"
                }
            }
        ]
    },
    // ⚗️ Breaking Bad (Periodic Table Elements)
    {
        id: "breaking-bad",
        name: "\u2697\ufe0f Breaking Bad (Periodic Table Elements)",
        description: "Multi-elemental chemistry palette inspired by the Periodic Table title sequence with [Br] Bromine neon green, [Ba] Barium cobalt, radioactive isotope yellow, noble gas purple, and Blue Sky cyan.",
        type: "dark",
        accentColor: "#00ff88",
        colors: {
            "foreground": "#f0fdf4",
            "descriptionForeground": "#4e738f",
            "disabledForeground": "#3b637d",
            "icon.foreground": "#00ff88",
            "editor.background": "#060a0f",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#3b637d",
            "editorLineNumber.activeForeground": "#00ff88",
            "editorCursor.foreground": "#00ff88",
            "editor.selectionBackground": "#142030",
            "editor.lineHighlightBackground": "#142030",
            "editorHoverWidget.background": "#0c131d",
            "editorHoverWidget.foreground": "#86efac",
            "editorHoverWidget.border": "#142030",
            "editorHoverWidget.statusBarBackground": "#142030",
            "editorSuggestWidget.background": "#0c131d",
            "editorSuggestWidget.foreground": "#86efac",
            "editorSuggestWidget.border": "#142030",
            "editorSuggestWidget.selectedBackground": "#142030",
            "editorSuggestWidget.selectedForeground": "#00ff88",
            "editorSuggestWidget.highlightForeground": "#00ff88",
            "editorWidget.background": "#0c131d",
            "editorWidget.foreground": "#86efac",
            "editorWidget.border": "#142030",
            "focusBorder": "#00ff88",
            "activityBar.background": "#03060a",
            "activityBar.foreground": "#00ff88",
            "activityBar.inactiveForeground": "#3b637d",
            "activityBarBadge.background": "#00ff88",
            "activityBarBadge.foreground": "#000000",
            "sideBar.background": "#0c131d",
            "sideBar.foreground": "#86efac",
            "sideBarTitle.foreground": "#00ff88",
            "sideBarSectionHeader.background": "#142030",
            "sideBarSectionHeader.foreground": "#86efac",
            "titleBar.activeBackground": "#03060a",
            "titleBar.activeForeground": "#ffffff",
            "titleBar.inactiveBackground": "#03060a",
            "titleBar.inactiveForeground": "#999999",
            "statusBar.background": "#10b981",
            "statusBar.foreground": "#000000",
            "statusBar.debuggingBackground": "#e11d48",
            "editorGroupHeader.tabsBackground": "#0c131d",
            "tab.activeBackground": "#060a0f",
            "tab.activeForeground": "#00ff88",
            "tab.activeBorderTop": "#00ff88",
            "tab.inactiveBackground": "#142030",
            "tab.inactiveForeground": "#4e738f",
            "tab.hoverBackground": "#142030",
            "breadcrumb.foreground": "#4e738f",
            "terminal.background": "#060a0f",
            "terminal.foreground": "#ffffff",
            "terminalCursor.foreground": "#00ff88",
            "terminal.ansiGreen": "#00d4ff",
            "terminal.ansiCyan": "#c084fc",
            "terminal.ansiYellow": "#ffd000",
            "input.background": "#121e2e",
            "input.foreground": "#f0fdf4",
            "input.placeholderForeground": "#4e738f",
            "panel.background": "#060a0f",
            "panel.border": "#0c131d",
            "panelTitle.activeForeground": "#00ff88",
            "panelTitle.inactiveForeground": "#4e738f",
            "panelTitle.activeBorder": "#00ff88",
            "chat.requestBackground": "#121e2e",
            "chat.requestBorder": "#142030",
            "chat.slashCommandBackground": "#142030",
            "chat.slashCommandForeground": "#00ff88",
            "chat.avatarBackground": "#142030",
            "chat.avatarForeground": "#000000",
            "interactive.requestBackground": "#121e2e",
            "interactive.requestBorder": "#142030",
            "textCodeBlock.background": "#142030",
            "textLink.foreground": "#00ff88",
            "textLink.activeForeground": "#00ff88",
            "textPreformat.foreground": "#ffffff",
            "textBlockQuote.background": "#142030",
            "textBlockQuote.border": "#00ff88",
            "badge.background": "#00ff88",
            "badge.foreground": "#000000"
        },
        tokenColors: [
            {
                "scope": [
                    "keyword",
                    "keyword.control",
                    "storage.type",
                    "storage.modifier"
                ],
                "settings": {
                    "foreground": "#00ff88",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": [
                    "entity.name.function",
                    "support.function",
                    "meta.function-call"
                ],
                "settings": {
                    "foreground": "#00d4ff"
                }
            },
            {
                "scope": [
                    "string",
                    "string.quoted",
                    "string.quoted.double",
                    "string.quoted.single",
                    "string.template",
                    "string.unquoted",
                    "string.json",
                    "source.json string",
                    "meta.structure.dictionary.value.json string.quoted.double.json"
                ],
                "settings": {
                    "foreground": "#ffd000"
                }
            },
            {
                "scope": [
                    "support.type.property-name",
                    "meta.object-literal.key",
                    "support.type.property-name.json",
                    "meta.structure.dictionary.json string.quoted.double.json",
                    "entity.name.tag.json"
                ],
                "settings": {
                    "foreground": "#00ff88"
                }
            },
            {
                "scope": [
                    "variable",
                    "variable.other",
                    "variable.parameter",
                    "variable.language"
                ],
                "settings": {
                    "foreground": "#f0fdf4"
                }
            },
            {
                "scope": [
                    "entity.name.type",
                    "support.type",
                    "entity.name.class",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "foreground": "#c084fc"
                }
            },
            {
                "scope": [
                    "comment",
                    "comment.line",
                    "comment.block"
                ],
                "settings": {
                    "foreground": "#3b637d",
                    "fontStyle": "italic"
                }
            },
            {
                "scope": [
                    "constant.numeric",
                    "constant.numeric.json",
                    "constant.language.boolean",
                    "constant.language.json",
                    "constant.language"
                ],
                "settings": {
                    "foreground": "#ff3b5c"
                }
            },
            {
                "scope": [
                    "keyword.operator",
                    "punctuation.separator",
                    "punctuation.terminator"
                ],
                "settings": {
                    "foreground": "#f0fdf4"
                }
            },
            {
                "scope": [
                    "entity.name.tag",
                    "entity.other.attribute-name"
                ],
                "settings": {
                    "foreground": "#00d4ff"
                }
            }
        ]
    }
];
exports.THEME_PRESETS = RAW_THEME_PRESETS.map((preset) => {
    const colors = normalizeStatusBarVariants(preset.colors);
    return {
        ...preset,
        colors: {
            'editorGutter.background': colors['editor.background'] || '#1e1e1e',
            ...colors,
        },
    };
});
//# sourceMappingURL=presets.js.map