import { ThemePreset, UISectionColor, SyntaxScopeItem } from './types';

export const UI_COLOR_DEFINITIONS: UISectionColor[] = [
  // 1. Core Window & Global Text
  { id: 'foreground', name: 'Global Base Text', description: 'Main default text across all views, lists and dialogs', category: 'core', defaultValue: '#cccccc' },
  { id: 'descriptionForeground', name: 'Muted & Counter Text (3/3)', description: 'Secondary helper text, counters and descriptions', category: 'core', defaultValue: '#858585' },
  { id: 'disabledForeground', name: 'Disabled Text', description: 'Faded text for disabled buttons and menu items', category: 'core', defaultValue: '#666666' },
  { id: 'icon.foreground', name: 'Global UI Icons (+, ⚙️, X)', description: 'Toolbar icons, action buttons and window controls', category: 'core', defaultValue: '#cccccc' },
  { id: 'focusBorder', name: 'Focus Border', description: 'Global focus outline on interactive elements', category: 'core', defaultValue: '#007fd4' },

  // 2. Editor Canvas & Hover Widgets
  { id: 'editor.background', name: 'Editor Background', description: 'Main coding canvas background color', category: 'core', defaultValue: '#1e1e1e' },
  { id: 'editor.foreground', name: 'Editor Code Text', description: 'Default code text / punctuation color', category: 'core', defaultValue: '#d4d4d4' },
  { id: 'editorLineNumber.foreground', name: 'Line Numbers', description: 'Gutter line number color', category: 'core', defaultValue: '#858585' },
  { id: 'editorLineNumber.activeForeground', name: 'Active Line Number', description: 'Line number of current cursor line', category: 'core', defaultValue: '#c6c6c6' },
  { id: 'editorCursor.foreground', name: 'Editor Cursor', description: 'Blinking text cursor color', category: 'core', defaultValue: '#aeafad' },
  { id: 'editor.selectionBackground', name: 'Selection Background', description: 'Highlighted text selection area', category: 'core', defaultValue: '#264f78' },
  { id: 'editor.lineHighlightBackground', name: 'Line Highlight', description: 'Background of line cursor is currently on', category: 'core', defaultValue: '#2a2d2e' },
  { id: 'editorHoverWidget.background', name: 'Hover Popup / Tooltip BG', description: 'Background of hover info boxes & tooltips (e.g. Unknown Setting)', category: 'core', defaultValue: '#252526' },
  { id: 'editorHoverWidget.foreground', name: 'Hover Popup Text', description: 'Text color inside hover tooltips & popups', category: 'core', defaultValue: '#cccccc' },
  { id: 'editorHoverWidget.border', name: 'Hover Popup Border', description: 'Border outline of hover info boxes & tooltips', category: 'core', defaultValue: '#454545' },
  { id: 'editorSuggestWidget.background', name: 'Autocomplete Dropdown BG', description: 'Background of code intellisense suggestions box', category: 'core', defaultValue: '#252526' },
  { id: 'editorSuggestWidget.foreground', name: 'Autocomplete Text', description: 'Text inside code suggestions list', category: 'core', defaultValue: '#cccccc' },
  { id: 'editorWidget.background', name: 'Find / Replace Widget BG', description: 'Background of search/replace and dialog widgets', category: 'core', defaultValue: '#252526' },
  { id: 'editorWidget.border', name: 'Find / Replace Widget Border', description: 'Border of search/replace and dialog widgets', category: 'core', defaultValue: '#454545' },

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
  { id: 'statusBar.background', name: 'Status Bar Background', description: 'Bottom status bar normal background', category: 'bars', defaultValue: '#007acc' },
  { id: 'statusBar.foreground', name: 'Status Bar Foreground', description: 'Bottom status bar text & icon color', category: 'bars', defaultValue: '#ffffff' },
  { id: 'statusBar.debuggingBackground', name: 'Status Bar Debugging BG', description: 'Status bar background during debugging session', category: 'bars', defaultValue: '#cc6633' },

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
  { id: 'interactive.requestBackground', name: 'Chat Prompt Box BG', description: 'Background for chat user input box', category: 'chat', defaultValue: '#252526' },
  { id: 'textCodeBlock.background', name: 'Chat Code Block BG', description: 'Background of formatted code blocks in chat', category: 'chat', defaultValue: '#1a1a1a' },
  { id: 'textLink.foreground', name: 'Chat Hyperlinks', description: 'Color of clickable markdown links', category: 'chat', defaultValue: '#3794ff' },
  { id: 'badge.background', name: 'General Badge BG', description: 'Pills and tag badges in chat and lists', category: 'chat', defaultValue: '#4d4d4d' },
  { id: 'badge.foreground', name: 'General Badge Text', description: 'Text inside pills and tag badges', category: 'chat', defaultValue: '#ffffff' },
];

export const SYNTAX_SCOPE_DEFINITIONS: SyntaxScopeItem[] = [
  { id: 'keywords', name: 'Keywords & Control Flow', description: 'if, else, return, const, let, class, import, async, export', scopes: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'], defaultColor: '#569cd6' },
  { id: 'functions', name: 'Functions & Methods', description: 'function names, method calls, constructors', scopes: ['entity.name.function', 'support.function', 'meta.function-call'], defaultColor: '#dcdcaa' },
  { id: 'strings', name: 'Strings & Templates', description: 'quoted text, template literals, character literals', scopes: ['string', 'string.quoted', 'string.template'], defaultColor: '#ce9178' },
  { id: 'variables', name: 'Variables & Identifiers', description: 'variable names, parameters, object properties', scopes: ['variable', 'variable.other', 'variable.parameter'], defaultColor: '#9cdcfe' },
  { id: 'properties', name: 'Object & JSON Keys', description: 'JSON keys, object literal keys, dictionary keys', scopes: ['support.type.property-name', 'meta.object-literal.key', 'support.type.property-name.json'], defaultColor: '#dcdcaa' },
  { id: 'types', name: 'Types & Classes', description: 'interfaces, type aliases, classes, struct names', scopes: ['entity.name.type', 'support.type', 'entity.name.class'], defaultColor: '#4ec9b0' },
  { id: 'comments', name: 'Comments', description: 'single-line // and multi-line /* */ comments', scopes: ['comment', 'comment.line', 'comment.block'], defaultColor: '#6a9955' },
  { id: 'numbers', name: 'Numbers & Booleans', description: 'integers, floats, true, false, null, undefined', scopes: ['constant.numeric', 'constant.language.boolean', 'constant.language'], defaultColor: '#b5cea8' },
  { id: 'operators', name: 'Operators & Punctuation', description: '+, -, *, =, =>, ==, &&, ||, ;, :, ,', scopes: ['keyword.operator', 'punctuation.separator', 'punctuation.terminator'], defaultColor: '#d4d4d4' },
  { id: 'tags', name: 'HTML / JSX Tags & Attributes', description: 'div, span, Button, onClick, className', scopes: ['entity.name.tag', 'entity.other.attribute-name'], defaultColor: '#4fc1ff' },
];

export interface SimpleColorDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  targets: string[];
  defaultColor: string;
}

export const SIMPLE_UI_DEFINITIONS: SimpleColorDefinition[] = [
  {
    id: 'simple.accent',
    name: 'Primary Accent',
    description: 'Borders, cursor, badges, buttons, links & active line highlights',
    icon: '✨',
    targets: ['focusBorder', 'activityBarBadge.background', 'tab.activeBorderTop', 'editorCursor.foreground', 'textLink.foreground', 'badge.background', 'editorLineNumber.activeForeground', 'terminalCursor.foreground', 'panelTitle.activeBorder', 'editorSuggestWidget.highlightForeground'],
    defaultColor: '#ffe600',
  },
  {
    id: 'simple.editorBg',
    name: 'Editor Canvas Background',
    description: 'Main coding canvas, active open tab & terminal background',
    icon: '🖥️',
    targets: ['editor.background', 'tab.activeBackground', 'terminal.background'],
    defaultColor: '#07070a',
  },
  {
    id: 'simple.text',
    name: 'Editor Code Text',
    description: 'Default editor code text, punctuation & terminal text color',
    icon: '📝',
    targets: ['editor.foreground', 'terminal.foreground'],
    defaultColor: '#f0f0f8',
  },
  {
    id: 'simple.sidebarBg',
    name: 'Sidebar & Activity Bars BG',
    description: 'Explorer file tree, Activity bar, Title bar, Panel & header backgrounds',
    icon: '📂',
    targets: ['sideBar.background', 'activityBar.background', 'titleBar.activeBackground', 'sideBarSectionHeader.background', 'panel.background'],
    defaultColor: '#09090e',
  },
  {
    id: 'simple.sidebarText',
    name: 'Sidebar & Explorer Text',
    description: 'Explorer file names, folders, EXPLORER title & sidebar text',
    icon: '🗂️',
    targets: ['sideBar.foreground', 'sideBarTitle.foreground', 'sideBarSectionHeader.foreground', 'titleBar.activeForeground', 'activityBar.foreground'],
    defaultColor: '#d8e2cb',
  },
  {
    id: 'simple.chatText',
    name: 'Chat, Inputs & App Text',
    description: 'Chat inputs, placeholder text (3/3), prompt bubbles, panel titles & UI icons',
    icon: '💬',
    targets: [
      'foreground',
      'input.foreground',
      'input.placeholderForeground',
      'descriptionForeground',
      'icon.foreground',
      'panelTitle.activeForeground',
      'panelTitle.inactiveForeground',
      'input.background',
      'chat.requestBackground',
      'interactive.requestBackground',
    ],
    defaultColor: '#f0f0f8',
  },
  {
    id: 'simple.popups',
    name: 'Hover Tooltips & Popups',
    description: 'Hover info popups (Unknown Setting), Autocomplete dropdown & Find/Replace dialogs',
    icon: '🪟',
    targets: [
      'editorHoverWidget.background',
      'editorHoverWidget.foreground',
      'editorHoverWidget.border',
      'editorSuggestWidget.background',
      'editorSuggestWidget.foreground',
      'editorSuggestWidget.border',
      'editorWidget.background',
      'editorWidget.foreground',
      'editorWidget.border',
    ],
    defaultColor: '#181825',
  },
  {
    id: 'simple.tabsBg',
    name: 'Tabs & Sub-Panels BG',
    description: 'Tab bar background, inactive tabs, chat code blocks & popups',
    icon: '📑',
    targets: ['editorGroupHeader.tabsBackground', 'tab.inactiveBackground', 'tab.hoverBackground', 'interactive.requestBackground', 'textCodeBlock.background'],
    defaultColor: '#0d0d14',
  },
  {
    id: 'simple.statusBarBg',
    name: 'Status Bar Background',
    description: 'Bottom status bar color and debug indicators',
    icon: '📊',
    targets: ['statusBar.background', 'statusBar.foreground'],
    defaultColor: '#050508',
  },
];

export const SIMPLE_SYNTAX_DEFINITIONS: SimpleColorDefinition[] = [
  {
    id: 'simple.keywords',
    name: 'Keywords & Control Flow',
    description: 'if, else, return, const, let, function, class, import, export',
    icon: '⚡',
    targets: ['keywords'],
    defaultColor: '#ff0055',
  },
  {
    id: 'simple.functions',
    name: 'Functions & Methods',
    description: 'Function declarations, method calls, constructors',
    icon: '⚙️',
    targets: ['functions'],
    defaultColor: '#00f0ff',
  },
  {
    id: 'simple.properties',
    name: 'Object & JSON Keys',
    description: 'JSON keys ("model":), object property keys, dictionary keys',
    icon: '🔑',
    targets: ['properties'],
    defaultColor: '#ffd43b',
  },
  {
    id: 'simple.strings',
    name: 'Strings & Text Literals',
    description: 'Single/double quoted strings, URL values, text literals',
    icon: '📜',
    targets: ['strings'],
    defaultColor: '#ffe600',
  },
  {
    id: 'simple.variables',
    name: 'Variables & Identifiers',
    description: 'Variable names, parameters, object properties',
    icon: '📦',
    targets: ['variables'],
    defaultColor: '#f0f0f8',
  },
  {
    id: 'simple.types',
    name: 'Types & Interfaces',
    description: 'Classes, types, interfaces, structs, enums',
    icon: '🏷️',
    targets: ['types'],
    defaultColor: '#b829ff',
  },
  {
    id: 'simple.comments',
    name: 'Comments',
    description: 'Single-line // and multi-line /* */ code comments',
    icon: '💭',
    targets: ['comments'],
    defaultColor: '#555566',
  },
];


export const THEME_PRESETS: ThemePreset[] = [
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
      "editor.foreground": "#f7fbe8",
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
      "terminal.foreground": "#f7fbe8",
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
      "interactive.requestBackground": "#182013",
      "textCodeBlock.background": "#131a10",
      "textLink.foreground": "#fff017",
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
],
  },

  // 🍹 Lemonade Light
  {
    id: "lemonade-light",
    name: "\ud83c\udf79 Lemonade Light",
    description: "Refreshing summer citrus light theme with iced lemonade cream, lemon yellow, and chilled lime.",
    type: "light",
    accentColor: "#ca8a04",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#78716c",
      "icon.foreground": "#ca8a04",
      "editor.background": "#fefce8",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#78716c",
      "editorLineNumber.activeForeground": "#ca8a04",
      "editorCursor.foreground": "#ca8a04",
      "editor.selectionBackground": "#fef08a88",
      "editor.lineHighlightBackground": "#fef08a88",
      "editorHoverWidget.background": "#fffbeb",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fef08a88",
      "editorHoverWidget.statusBarBackground": "#fef08a88",
      "editorSuggestWidget.background": "#fffbeb",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fef08a88",
      "editorSuggestWidget.selectedBackground": "#fef08a88",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#ca8a04",
      "editorWidget.background": "#fffbeb",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fef08a88",
      "focusBorder": "#ca8a04",
      "activityBar.background": "#fef08a",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#ca8a04",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#fffbeb",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fef08a88",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fef08a",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fef08a",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#eab308",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fffbeb",
      "tab.activeBackground": "#fefce8",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#ca8a04",
      "tab.inactiveBackground": "#fef08a88",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fef08a88",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fefce8",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#ca8a04",
      "terminal.ansiGreen": "#15803d",
      "terminal.ansiCyan": "#1d4ed8",
      "terminal.ansiYellow": "#047857",
      "input.background": "#fef9c3",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fefce8",
      "panel.border": "#fffbeb",
      "panelTitle.activeForeground": "#ca8a04",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#ca8a04",
      "chat.requestBackground": "#fef9c3",
      "chat.requestBorder": "#fef08a88",
      "interactive.requestBackground": "#fef9c3",
      "textCodeBlock.background": "#fef08a88",
      "textLink.foreground": "#ca8a04",
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
],
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
      "interactive.requestBackground": "#141414",
      "textCodeBlock.background": "#121212",
      "textLink.foreground": "#00f0ff",
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
],
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
      "descriptionForeground": "#666666",
      "disabledForeground": "#555555",
      "icon.foreground": "#005ab5",
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
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#005ab5",
      "editorWidget.background": "#f4f4f4",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#ebebeb",
      "focusBorder": "#005ab5",
      "activityBar.background": "#e0e0e0",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#005ab5",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f4f4f4",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
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
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#005ab5",
      "tab.inactiveBackground": "#ebebeb",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#ebebeb",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#ffffff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#005ab5",
      "terminal.ansiGreen": "#005ab5",
      "terminal.ansiCyan": "#785ef0",
      "terminal.ansiYellow": "#15803d",
      "input.background": "#f0f0f0",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#ffffff",
      "panel.border": "#f4f4f4",
      "panelTitle.activeForeground": "#005ab5",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#005ab5",
      "chat.requestBackground": "#f0f0f0",
      "chat.requestBorder": "#ebebeb",
      "interactive.requestBackground": "#f0f0f0",
      "textCodeBlock.background": "#ebebeb",
      "textLink.foreground": "#005ab5",
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
],
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
      "editor.foreground": "#f5f5f5",
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
      "terminal.foreground": "#f5f5f5",
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
      "interactive.requestBackground": "#1f1f1f",
      "textCodeBlock.background": "#212121",
      "textLink.foreground": "#ffffff",
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
],
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
      "descriptionForeground": "#666666",
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
      "activityBar.inactiveForeground": "#666666",
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
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#f9f9f9",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#000000",
      "terminal.ansiGreen": "#1a1a1a",
      "terminal.ansiCyan": "#1a1a1a",
      "terminal.ansiYellow": "#2d2d2d",
      "input.background": "#ebebeb",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#f9f9f9",
      "panel.border": "#efefef",
      "panelTitle.activeForeground": "#000000",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#000000",
      "chat.requestBackground": "#ebebeb",
      "chat.requestBorder": "#e5e5e5",
      "interactive.requestBackground": "#ebebeb",
      "textCodeBlock.background": "#e5e5e5",
      "textLink.foreground": "#000000",
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
],
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
      "interactive.requestBackground": "#1a1a1a",
      "textCodeBlock.background": "#1a1a1a",
      "textLink.foreground": "#ffffff",
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
],
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
      "editor.foreground": "#f4f4f5",
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
      "terminal.foreground": "#f4f4f5",
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
      "interactive.requestBackground": "#27272a",
      "textCodeBlock.background": "#27272a",
      "textLink.foreground": "#eab308",
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
],
  },

  // ♟️ Grandmaster Chessboard (Split B&W)
  {
    id: "chessboard-grandmaster-split",
    name: "\u265f\ufe0f Grandmaster Chessboard (Split B&W)",
    description: "Alternating pitch-black editor canvas with stark snow-white sidebar, black-and-white interleaved tabs, crisp high-contrast pawn ivory tokens, and bold solid black borderstrokes.",
    type: "dark",
    accentColor: "#ffffff",
    colors: {
      "foreground": "#ffffff",
      "descriptionForeground": "#888888",
      "disabledForeground": "#71717a",
      "icon.foreground": "#ffffff",
      "editor.background": "#000000",
      "editor.foreground": "#ffffff",
      "editorLineNumber.foreground": "#71717a",
      "editorLineNumber.activeForeground": "#ffffff",
      "editorCursor.foreground": "#ffffff",
      "editor.selectionBackground": "#222222",
      "editor.lineHighlightBackground": "#111111",
      "editorHoverWidget.background": "#ffffff",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#000000",
      "editorHoverWidget.statusBarBackground": "#f0f0f0",
      "editorSuggestWidget.background": "#ffffff",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#000000",
      "editorSuggestWidget.selectedBackground": "#000000",
      "editorSuggestWidget.selectedForeground": "#ffffff",
      "editorSuggestWidget.highlightForeground": "#000000",
      "editorWidget.background": "#ffffff",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#000000",
      "focusBorder": "#000000",
      "activityBar.background": "#ffffff",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#000000",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#ffffff",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#000000",
      "sideBarSectionHeader.foreground": "#ffffff",
      "titleBar.activeBackground": "#ffffff",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#ffffff",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#000000",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#ffffff",
      "tab.activeBackground": "#000000",
      "tab.activeForeground": "#ffffff",
      "tab.activeBorderTop": "#000000",
      "tab.inactiveBackground": "#ffffff",
      "tab.inactiveForeground": "#000000",
      "tab.hoverBackground": "#eaeaea",
      "breadcrumb.foreground": "#888888",
      "terminal.background": "#000000",
      "terminal.foreground": "#ffffff",
      "terminalCursor.foreground": "#ffffff",
      "terminal.ansiGreen": "#ffffff",
      "terminal.ansiCyan": "#d4d4d8",
      "terminal.ansiYellow": "#ffffff",
      "input.background": "#141414",
      "input.foreground": "#ffffff",
      "input.placeholderForeground": "#888888",
      "panel.background": "#000000",
      "panel.border": "#000000",
      "panelTitle.activeForeground": "#ffffff",
      "panelTitle.inactiveForeground": "#888888",
      "panelTitle.activeBorder": "#ffffff",
      "chat.requestBackground": "#141414",
      "chat.requestBorder": "#000000",
      "interactive.requestBackground": "#141414",
      "textCodeBlock.background": "#141414",
      "textLink.foreground": "#ffffff",
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
                  "foreground": "#ffffff",
                  "fontStyle": "bold"
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
                  "foreground": "#d4d4d8"
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
                  "foreground": "#ffffff",
                  "fontStyle": "bold"
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
],
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
      "editor.foreground": "#f1f5f9",
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
      "editorSuggestWidget.selectedForeground": "#ffffff",
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
      "tab.activeForeground": "#ffffff",
      "tab.activeBorderTop": "#e2e8f0",
      "tab.inactiveBackground": "#1e1e24",
      "tab.inactiveForeground": "#71717a",
      "tab.hoverBackground": "#1e1e24",
      "breadcrumb.foreground": "#71717a",
      "terminal.background": "#000000",
      "terminal.foreground": "#f1f5f9",
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
      "interactive.requestBackground": "#18181b",
      "textCodeBlock.background": "#1e1e24",
      "textLink.foreground": "#e2e8f0",
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
],
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
      "editorSuggestWidget.selectedForeground": "#ffffff",
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
      "tab.activeForeground": "#ffffff",
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
      "interactive.requestBackground": "#191920",
      "textCodeBlock.background": "#1e1e24",
      "textLink.foreground": "#f8fafc",
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
],
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
      "activityBar.inactiveForeground": "#666666",
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
      "interactive.requestBackground": "#222222",
      "textCodeBlock.background": "#262626",
      "textLink.foreground": "#ffffff",
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
],
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
      "editor.foreground": "#fafaf9",
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
      "terminal.foreground": "#fafaf9",
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
      "interactive.requestBackground": "#24242c",
      "textCodeBlock.background": "#2a2a32",
      "textLink.foreground": "#fafaf9",
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
],
  },

  // ☀️ Solarized Light
  {
    id: "solarized-light",
    name: "\u2600\ufe0f Solarized Light",
    description: "Authentic Ethan Schoonover precision light palette with cream parchment, cyan, blue, magenta, and amber.",
    type: "light",
    accentColor: "#268bd2",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#78716c",
      "icon.foreground": "#268bd2",
      "editor.background": "#fdf6e3",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#78716c",
      "editorLineNumber.activeForeground": "#268bd2",
      "editorCursor.foreground": "#268bd2",
      "editor.selectionBackground": "#eee8d5",
      "editor.lineHighlightBackground": "#eee8d5",
      "editorHoverWidget.background": "#eee8d5",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#eee8d5",
      "editorHoverWidget.statusBarBackground": "#eee8d5",
      "editorSuggestWidget.background": "#eee8d5",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#eee8d5",
      "editorSuggestWidget.selectedBackground": "#eee8d5",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#268bd2",
      "editorWidget.background": "#eee8d5",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#eee8d5",
      "focusBorder": "#268bd2",
      "activityBar.background": "#eee8d5",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#268bd2",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#eee8d5",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#eee8d5",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#eee8d5",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#eee8d5",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#eee8d5",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#eee8d5",
      "tab.activeBackground": "#fdf6e3",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#268bd2",
      "tab.inactiveBackground": "#eee8d5",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#eee8d5",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fdf6e3",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#268bd2",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#b45309",
      "terminal.ansiYellow": "#047857",
      "input.background": "#eee8d5",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fdf6e3",
      "panel.border": "#eee8d5",
      "panelTitle.activeForeground": "#268bd2",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#268bd2",
      "chat.requestBackground": "#eee8d5",
      "chat.requestBorder": "#eee8d5",
      "interactive.requestBackground": "#eee8d5",
      "textCodeBlock.background": "#eee8d5",
      "textLink.foreground": "#268bd2",
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
],
  },

  // 🏖️ Solarized Warm Sand
  {
    id: "solarized-warm-sand",
    name: "\ud83c\udfd6\ufe0f Solarized Warm Sand",
    description: "Golden desert sand and terracotta tones blended with solarized precision optics.",
    type: "light",
    accentColor: "#b58900",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#78716c",
      "icon.foreground": "#b58900",
      "editor.background": "#faf2da",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#78716c",
      "editorLineNumber.activeForeground": "#b58900",
      "editorCursor.foreground": "#b58900",
      "editor.selectionBackground": "#ecdab0",
      "editor.lineHighlightBackground": "#ecdab0",
      "editorHoverWidget.background": "#f3e4c0",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#ecdab0",
      "editorHoverWidget.statusBarBackground": "#ecdab0",
      "editorSuggestWidget.background": "#f3e4c0",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#ecdab0",
      "editorSuggestWidget.selectedBackground": "#ecdab0",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#b58900",
      "editorWidget.background": "#f3e4c0",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#ecdab0",
      "focusBorder": "#b58900",
      "activityBar.background": "#ecdab0",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#b58900",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f3e4c0",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#ecdab0",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#ecdab0",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#ecdab0",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#b58900",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f3e4c0",
      "tab.activeBackground": "#faf2da",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#b58900",
      "tab.inactiveBackground": "#ecdab0",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#ecdab0",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#faf2da",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#b58900",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#b45309",
      "terminal.ansiYellow": "#047857",
      "input.background": "#ecdab0",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#faf2da",
      "panel.border": "#f3e4c0",
      "panelTitle.activeForeground": "#b58900",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#b58900",
      "chat.requestBackground": "#ecdab0",
      "chat.requestBorder": "#ecdab0",
      "interactive.requestBackground": "#ecdab0",
      "textCodeBlock.background": "#ecdab0",
      "textLink.foreground": "#b58900",
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
],
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
      "editor.foreground": "#839496",
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
      "terminal.foreground": "#839496",
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
      "interactive.requestBackground": "#073642",
      "textCodeBlock.background": "#073642",
      "textLink.foreground": "#2aa198",
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
],
  },

  // ☕ Warm Latte & Paper
  {
    id: "warm-latte",
    name: "\u2615 Warm Latte & Paper",
    description: "Cozy, warm cream cafe aesthetic with soft coffee brown, terracotta, honey gold, and pine.",
    type: "light",
    accentColor: "#d7827e",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#716a82",
      "icon.foreground": "#d7827e",
      "editor.background": "#faf4ed",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#716a82",
      "editorLineNumber.activeForeground": "#d7827e",
      "editorCursor.foreground": "#d7827e",
      "editor.selectionBackground": "#f2e9e1",
      "editor.lineHighlightBackground": "#f2e9e1",
      "editorHoverWidget.background": "#f4ebe2",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#f2e9e1",
      "editorHoverWidget.statusBarBackground": "#f2e9e1",
      "editorSuggestWidget.background": "#f4ebe2",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#f2e9e1",
      "editorSuggestWidget.selectedBackground": "#f2e9e1",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#d7827e",
      "editorWidget.background": "#f4ebe2",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#f2e9e1",
      "focusBorder": "#d7827e",
      "activityBar.background": "#f2e9e1",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#d7827e",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#f4ebe2",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#f2e9e1",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#f2e9e1",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#f2e9e1",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#f2e9e1",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f4ebe2",
      "tab.activeBackground": "#faf4ed",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#d7827e",
      "tab.inactiveBackground": "#f2e9e1",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#f2e9e1",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#faf4ed",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#d7827e",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#047857",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#f2e9e1",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#faf4ed",
      "panel.border": "#f4ebe2",
      "panelTitle.activeForeground": "#d7827e",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#d7827e",
      "chat.requestBackground": "#f2e9e1",
      "chat.requestBorder": "#f2e9e1",
      "interactive.requestBackground": "#f2e9e1",
      "textCodeBlock.background": "#f2e9e1",
      "textLink.foreground": "#d7827e",
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
],
  },

  // 🍂 Autumn Amber Light
  {
    id: "autumn-amber",
    name: "\ud83c\udf42 Autumn Amber Light",
    description: "Warm golden sunlight, burnt sienna, rich chestnut brown, and forest olive tones.",
    type: "light",
    accentColor: "#b45309",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#785e49",
      "icon.foreground": "#b45309",
      "editor.background": "#fffaf0",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#785e49",
      "editorLineNumber.activeForeground": "#b45309",
      "editorCursor.foreground": "#b45309",
      "editor.selectionBackground": "#ffedd5",
      "editor.lineHighlightBackground": "#ffedd5",
      "editorHoverWidget.background": "#fff7ed",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#ffedd5",
      "editorHoverWidget.statusBarBackground": "#ffedd5",
      "editorSuggestWidget.background": "#fff7ed",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#ffedd5",
      "editorSuggestWidget.selectedBackground": "#ffedd5",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#b45309",
      "editorWidget.background": "#fff7ed",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#ffedd5",
      "focusBorder": "#b45309",
      "activityBar.background": "#ffedd5",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#b45309",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#fff7ed",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#ffedd5",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#ffedd5",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#ffedd5",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#c2410c",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fff7ed",
      "tab.activeBackground": "#fffaf0",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#b45309",
      "tab.inactiveBackground": "#ffedd5",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#ffedd5",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fffaf0",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#b45309",
      "terminal.ansiGreen": "#b45309",
      "terminal.ansiCyan": "#0f766e",
      "terminal.ansiYellow": "#15803d",
      "input.background": "#ffedd5",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fffaf0",
      "panel.border": "#fff7ed",
      "panelTitle.activeForeground": "#b45309",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#b45309",
      "chat.requestBackground": "#ffedd5",
      "chat.requestBorder": "#ffedd5",
      "interactive.requestBackground": "#ffedd5",
      "textCodeBlock.background": "#ffedd5",
      "textLink.foreground": "#b45309",
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
],
  },

  // 📜 Cozy Sepia & Parchment
  {
    id: "cozy-sepia",
    name: "\ud83d\udcdc Cozy Sepia & Parchment",
    description: "Warm antique manuscript and sepia tones designed for soothing, zero-eyestrain daytime reading.",
    type: "light",
    accentColor: "#8b4513",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#6e5744",
      "icon.foreground": "#8b4513",
      "editor.background": "#f5eedb",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#6e5744",
      "editorLineNumber.activeForeground": "#8b4513",
      "editorCursor.foreground": "#8b4513",
      "editor.selectionBackground": "#e8dcbe",
      "editor.lineHighlightBackground": "#e8dcbe",
      "editorHoverWidget.background": "#eee3c8",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#e8dcbe",
      "editorHoverWidget.statusBarBackground": "#e8dcbe",
      "editorSuggestWidget.background": "#eee3c8",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#e8dcbe",
      "editorSuggestWidget.selectedBackground": "#e8dcbe",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#8b4513",
      "editorWidget.background": "#eee3c8",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#e8dcbe",
      "focusBorder": "#8b4513",
      "activityBar.background": "#e8dcbe",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#8b4513",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#eee3c8",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#e8dcbe",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#e8dcbe",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#e8dcbe",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#8b4513",
      "statusBar.foreground": "#f5eedb",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#eee3c8",
      "tab.activeBackground": "#f5eedb",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#8b4513",
      "tab.inactiveBackground": "#e8dcbe",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#e8dcbe",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#f5eedb",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#8b4513",
      "terminal.ansiGreen": "#1b4d3e",
      "terminal.ansiCyan": "#1d4ed8",
      "terminal.ansiYellow": "#92400e",
      "input.background": "#e8dcbe",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#f5eedb",
      "panel.border": "#eee3c8",
      "panelTitle.activeForeground": "#8b4513",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#8b4513",
      "chat.requestBackground": "#e8dcbe",
      "chat.requestBorder": "#e8dcbe",
      "interactive.requestBackground": "#e8dcbe",
      "textCodeBlock.background": "#e8dcbe",
      "textLink.foreground": "#8b4513",
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
],
  },

  // 🍵 Matcha Latte Cream
  {
    id: "matcha-cream",
    name: "\ud83c\udf75 Matcha Latte Cream",
    description: "Japanese ceremonial green tea latte with soft cream, pistachio moss, and toasted bamboo accents.",
    type: "light",
    accentColor: "#4d7c0f",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#4d7c0f",
      "icon.foreground": "#4d7c0f",
      "editor.background": "#f7fee7",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#4d7c0f",
      "editorLineNumber.activeForeground": "#4d7c0f",
      "editorCursor.foreground": "#4d7c0f",
      "editor.selectionBackground": "#d9f99d",
      "editor.lineHighlightBackground": "#d9f99d",
      "editorHoverWidget.background": "#ecfccb",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#d9f99d",
      "editorHoverWidget.statusBarBackground": "#d9f99d",
      "editorSuggestWidget.background": "#ecfccb",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#d9f99d",
      "editorSuggestWidget.selectedBackground": "#d9f99d",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#4d7c0f",
      "editorWidget.background": "#ecfccb",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#d9f99d",
      "focusBorder": "#4d7c0f",
      "activityBar.background": "#d9f99d",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#4d7c0f",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#ecfccb",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#d9f99d",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#d9f99d",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#d9f99d",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#4d7c0f",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#ecfccb",
      "tab.activeBackground": "#f7fee7",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#4d7c0f",
      "tab.inactiveBackground": "#d9f99d",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#d9f99d",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#f7fee7",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#4d7c0f",
      "terminal.ansiGreen": "#15803d",
      "terminal.ansiCyan": "#047857",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#ecfccb",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#f7fee7",
      "panel.border": "#ecfccb",
      "panelTitle.activeForeground": "#4d7c0f",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#4d7c0f",
      "chat.requestBackground": "#ecfccb",
      "chat.requestBorder": "#d9f99d",
      "interactive.requestBackground": "#ecfccb",
      "textCodeBlock.background": "#d9f99d",
      "textLink.foreground": "#4d7c0f",
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
],
  },

  // 🥐 French Bakery Pastry
  {
    id: "french-pastry",
    name: "\ud83e\udd50 French Bakery Pastry",
    description: "Warm golden flake pastry, toasted almond cream, and rich melted caramel brown.",
    type: "light",
    accentColor: "#d97706",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#92400e",
      "icon.foreground": "#d97706",
      "editor.background": "#fffbeb",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#92400e",
      "editorLineNumber.activeForeground": "#d97706",
      "editorCursor.foreground": "#d97706",
      "editor.selectionBackground": "#fde68a",
      "editor.lineHighlightBackground": "#fde68a",
      "editorHoverWidget.background": "#fef3c7",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fde68a",
      "editorHoverWidget.statusBarBackground": "#fde68a",
      "editorSuggestWidget.background": "#fef3c7",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fde68a",
      "editorSuggestWidget.selectedBackground": "#fde68a",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#d97706",
      "editorWidget.background": "#fef3c7",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fde68a",
      "focusBorder": "#d97706",
      "activityBar.background": "#fde68a",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#d97706",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#fef3c7",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fde68a",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fde68a",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fde68a",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#b45309",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fef3c7",
      "tab.activeBackground": "#fffbeb",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#d97706",
      "tab.inactiveBackground": "#fde68a",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fde68a",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fffbeb",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#d97706",
      "terminal.ansiGreen": "#78350f",
      "terminal.ansiCyan": "#b91c1c",
      "terminal.ansiYellow": "#047857",
      "input.background": "#fef3c7",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fffbeb",
      "panel.border": "#fef3c7",
      "panelTitle.activeForeground": "#d97706",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#d97706",
      "chat.requestBackground": "#fef3c7",
      "chat.requestBorder": "#fde68a",
      "interactive.requestBackground": "#fef3c7",
      "textCodeBlock.background": "#fde68a",
      "textLink.foreground": "#d97706",
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
],
  },

  // 🪵 Cedarwood Cabin
  {
    id: "cedar-cabin",
    name: "\ud83e\udeb5 Cedarwood Cabin",
    description: "Warm timber logs, fragrant cedar shavings, toasted hearth warmth and pine needles.",
    type: "light",
    accentColor: "#9a3412",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#785b42",
      "icon.foreground": "#9a3412",
      "editor.background": "#faf5ee",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#785b42",
      "editorLineNumber.activeForeground": "#9a3412",
      "editorCursor.foreground": "#9a3412",
      "editor.selectionBackground": "#ebd8c3",
      "editor.lineHighlightBackground": "#ebd8c3",
      "editorHoverWidget.background": "#f3e8da",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#ebd8c3",
      "editorHoverWidget.statusBarBackground": "#ebd8c3",
      "editorSuggestWidget.background": "#f3e8da",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#ebd8c3",
      "editorSuggestWidget.selectedBackground": "#ebd8c3",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#9a3412",
      "editorWidget.background": "#f3e8da",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#ebd8c3",
      "focusBorder": "#9a3412",
      "activityBar.background": "#ebd8c3",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#9a3412",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f3e8da",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#ebd8c3",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#ebd8c3",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#ebd8c3",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#7c2d12",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f3e8da",
      "tab.activeBackground": "#faf5ee",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#9a3412",
      "tab.inactiveBackground": "#ebd8c3",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#ebd8c3",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#faf5ee",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#9a3412",
      "terminal.ansiGreen": "#1e4d30",
      "terminal.ansiCyan": "#6d28d9",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#f3e8da",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#faf5ee",
      "panel.border": "#f3e8da",
      "panelTitle.activeForeground": "#9a3412",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#9a3412",
      "chat.requestBackground": "#f3e8da",
      "chat.requestBorder": "#ebd8c3",
      "interactive.requestBackground": "#f3e8da",
      "textCodeBlock.background": "#ebd8c3",
      "textLink.foreground": "#9a3412",
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
],
  },

  // 🌻 Tuscan Sunflower
  {
    id: "tuscan-sunflower",
    name: "\ud83c\udf3b Tuscan Sunflower",
    description: "Sun-drenched Italian countryside with vibrant sunflower petals, terracotta brick, and cypress green.",
    type: "light",
    accentColor: "#eab308",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#854d0e",
      "icon.foreground": "#eab308",
      "editor.background": "#fefce8",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#854d0e",
      "editorLineNumber.activeForeground": "#eab308",
      "editorCursor.foreground": "#eab308",
      "editor.selectionBackground": "#fde047",
      "editor.lineHighlightBackground": "#fde047",
      "editorHoverWidget.background": "#fef08a",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fde047",
      "editorHoverWidget.statusBarBackground": "#fde047",
      "editorSuggestWidget.background": "#fef08a",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fde047",
      "editorSuggestWidget.selectedBackground": "#fde047",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#eab308",
      "editorWidget.background": "#fef08a",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fde047",
      "focusBorder": "#eab308",
      "activityBar.background": "#fde047",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#eab308",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#fef08a",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fde047",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fde047",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fde047",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#ca8a04",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fef08a",
      "tab.activeBackground": "#fefce8",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#eab308",
      "tab.inactiveBackground": "#fde047",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fde047",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fefce8",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#eab308",
      "terminal.ansiGreen": "#15803d",
      "terminal.ansiCyan": "#1d4ed8",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#fef9c3",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fefce8",
      "panel.border": "#fef08a",
      "panelTitle.activeForeground": "#eab308",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#eab308",
      "chat.requestBackground": "#fef9c3",
      "chat.requestBorder": "#fde047",
      "interactive.requestBackground": "#fef9c3",
      "textCodeBlock.background": "#fde047",
      "textLink.foreground": "#eab308",
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
                  "foreground": "#241804"
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
                  "foreground": "#854d0e",
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
                  "foreground": "#dc2626"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#241804"
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
],
  },

  // 🏜️ Mojave Canyon Sunset
  {
    id: "mojave-sunset",
    name: "\ud83c\udfdc\ufe0f Mojave Canyon Sunset",
    description: "Rose quartz canyon walls reflecting a glowing desert sunset with dusky twilight plum.",
    type: "light",
    accentColor: "#e11d48",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#9f1239",
      "icon.foreground": "#e11d48",
      "editor.background": "#fff1f2",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#9f1239",
      "editorLineNumber.activeForeground": "#e11d48",
      "editorCursor.foreground": "#e11d48",
      "editor.selectionBackground": "#fecdd3",
      "editor.lineHighlightBackground": "#fecdd3",
      "editorHoverWidget.background": "#ffe4e6",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fecdd3",
      "editorHoverWidget.statusBarBackground": "#fecdd3",
      "editorSuggestWidget.background": "#ffe4e6",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fecdd3",
      "editorSuggestWidget.selectedBackground": "#fecdd3",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#e11d48",
      "editorWidget.background": "#ffe4e6",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fecdd3",
      "focusBorder": "#e11d48",
      "activityBar.background": "#fecdd3",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#e11d48",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#ffe4e6",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fecdd3",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fecdd3",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fecdd3",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#be123c",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#ffe4e6",
      "tab.activeBackground": "#fff1f2",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#e11d48",
      "tab.inactiveBackground": "#fecdd3",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fecdd3",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fff1f2",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#e11d48",
      "terminal.ansiGreen": "#a21caf",
      "terminal.ansiCyan": "#1d4ed8",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#ffe4e6",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fff1f2",
      "panel.border": "#ffe4e6",
      "panelTitle.activeForeground": "#e11d48",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#e11d48",
      "chat.requestBackground": "#ffe4e6",
      "chat.requestBorder": "#fecdd3",
      "interactive.requestBackground": "#ffe4e6",
      "textCodeBlock.background": "#fecdd3",
      "textLink.foreground": "#e11d48",
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
                  "foreground": "#be123c",
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
                  "foreground": "#a21caf"
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
                  "foreground": "#be123c"
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
                  "foreground": "#30010c"
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
                  "foreground": "#9f1239",
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
                  "foreground": "#e11d48"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#30010c"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#a21caf"
            }
      }
],
  },

  // ⚡ Cyberpunk Neon
  {
    id: "cyberpunk-neon",
    name: "\u26a1 Cyberpunk Neon",
    description: "High-contrast OLED deep black with electric neon yellow, cyan, and hot pink accents.",
    type: "dark",
    accentColor: "#ffe600",
    colors: {
      "foreground": "#f0f0f8",
      "descriptionForeground": "#858599",
      "disabledForeground": "#4c4c66",
      "icon.foreground": "#ffe600",
      "editor.background": "#07070a",
      "editor.foreground": "#f0f0f8",
      "editorLineNumber.foreground": "#4c4c66",
      "editorLineNumber.activeForeground": "#ffe600",
      "editorCursor.foreground": "#ffe600",
      "editor.selectionBackground": "#0d0d14",
      "editor.lineHighlightBackground": "#0d0d14",
      "editorHoverWidget.background": "#09090e",
      "editorHoverWidget.foreground": "#d0d0e0",
      "editorHoverWidget.border": "#0d0d14",
      "editorHoverWidget.statusBarBackground": "#0d0d14",
      "editorSuggestWidget.background": "#09090e",
      "editorSuggestWidget.foreground": "#d0d0e0",
      "editorSuggestWidget.border": "#0d0d14",
      "editorSuggestWidget.selectedBackground": "#0d0d14",
      "editorSuggestWidget.selectedForeground": "#ffe600",
      "editorSuggestWidget.highlightForeground": "#ffe600",
      "editorWidget.background": "#09090e",
      "editorWidget.foreground": "#d0d0e0",
      "editorWidget.border": "#0d0d14",
      "focusBorder": "#ffe600",
      "activityBar.background": "#050508",
      "activityBar.foreground": "#ffe600",
      "activityBar.inactiveForeground": "#4c4c66",
      "activityBarBadge.background": "#ffe600",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#09090e",
      "sideBar.foreground": "#d0d0e0",
      "sideBarTitle.foreground": "#ffe600",
      "sideBarSectionHeader.background": "#0d0d14",
      "sideBarSectionHeader.foreground": "#d0d0e0",
      "titleBar.activeBackground": "#050508",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#050508",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#050508",
      "statusBar.foreground": "#ffe600",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#09090e",
      "tab.activeBackground": "#07070a",
      "tab.activeForeground": "#ffe600",
      "tab.activeBorderTop": "#ffe600",
      "tab.inactiveBackground": "#0d0d14",
      "tab.inactiveForeground": "#858599",
      "tab.hoverBackground": "#0d0d14",
      "breadcrumb.foreground": "#858599",
      "terminal.background": "#07070a",
      "terminal.foreground": "#f0f0f8",
      "terminalCursor.foreground": "#ffe600",
      "terminal.ansiGreen": "#00f0ff",
      "terminal.ansiCyan": "#b829ff",
      "terminal.ansiYellow": "#ffe600",
      "input.background": "#0e0e16",
      "input.foreground": "#f0f0f8",
      "input.placeholderForeground": "#858599",
      "panel.background": "#07070a",
      "panel.border": "#09090e",
      "panelTitle.activeForeground": "#ffe600",
      "panelTitle.inactiveForeground": "#858599",
      "panelTitle.activeBorder": "#ffe600",
      "chat.requestBackground": "#0e0e16",
      "chat.requestBorder": "#0d0d14",
      "interactive.requestBackground": "#0e0e16",
      "textCodeBlock.background": "#0d0d14",
      "textLink.foreground": "#ffe600",
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
                  "foreground": "#ff0055",
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
                  "foreground": "#ff0055"
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
                  "foreground": "#4c4c66",
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
                  "foreground": "#ff9900"
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
],
  },

  // 🌃 Tokyo Night
  {
    id: "tokyo-night",
    name: "\ud83c\udf03 Tokyo Night",
    description: "A clean visual theme celebrating the lights of downtown Tokyo at night with soft blues and indigos.",
    type: "dark",
    accentColor: "#7aa2f7",
    colors: {
      "foreground": "#a9b1d6",
      "descriptionForeground": "#565f89",
      "disabledForeground": "#565f89",
      "icon.foreground": "#7aa2f7",
      "editor.background": "#1a1b26",
      "editor.foreground": "#a9b1d6",
      "editorLineNumber.foreground": "#565f89",
      "editorLineNumber.activeForeground": "#7aa2f7",
      "editorCursor.foreground": "#7aa2f7",
      "editor.selectionBackground": "#16161e",
      "editor.lineHighlightBackground": "#16161e",
      "editorHoverWidget.background": "#16161e",
      "editorHoverWidget.foreground": "#a9b1d6",
      "editorHoverWidget.border": "#16161e",
      "editorHoverWidget.statusBarBackground": "#16161e",
      "editorSuggestWidget.background": "#16161e",
      "editorSuggestWidget.foreground": "#a9b1d6",
      "editorSuggestWidget.border": "#16161e",
      "editorSuggestWidget.selectedBackground": "#16161e",
      "editorSuggestWidget.selectedForeground": "#7aa2f7",
      "editorSuggestWidget.highlightForeground": "#7aa2f7",
      "editorWidget.background": "#16161e",
      "editorWidget.foreground": "#a9b1d6",
      "editorWidget.border": "#16161e",
      "focusBorder": "#7aa2f7",
      "activityBar.background": "#16161e",
      "activityBar.foreground": "#7aa2f7",
      "activityBar.inactiveForeground": "#565f89",
      "activityBarBadge.background": "#7aa2f7",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#16161e",
      "sideBar.foreground": "#a9b1d6",
      "sideBarTitle.foreground": "#7aa2f7",
      "sideBarSectionHeader.background": "#16161e",
      "sideBarSectionHeader.foreground": "#a9b1d6",
      "titleBar.activeBackground": "#16161e",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#16161e",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#16161e",
      "statusBar.foreground": "#7aa2f7",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#16161e",
      "tab.activeBackground": "#1a1b26",
      "tab.activeForeground": "#7aa2f7",
      "tab.activeBorderTop": "#7aa2f7",
      "tab.inactiveBackground": "#16161e",
      "tab.inactiveForeground": "#565f89",
      "tab.hoverBackground": "#16161e",
      "breadcrumb.foreground": "#565f89",
      "terminal.background": "#1a1b26",
      "terminal.foreground": "#a9b1d6",
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
      "chat.requestBorder": "#16161e",
      "interactive.requestBackground": "#1f2335",
      "textCodeBlock.background": "#16161e",
      "textLink.foreground": "#7aa2f7",
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
                  "foreground": "#a9b1d6"
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
],
  },

  // 🧛 Dracula Pro
  {
    id: "dracula-pro",
    name: "\ud83e\udddb Dracula Pro",
    description: "Famous dark theme designed for screen comfort with vibrant pink, purple, and pastel green accents.",
    type: "dark",
    accentColor: "#bd93f9",
    colors: {
      "foreground": "#f8f8f2",
      "descriptionForeground": "#6272a4",
      "disabledForeground": "#6272a4",
      "icon.foreground": "#bd93f9",
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
      "editorLineNumber.foreground": "#6272a4",
      "editorLineNumber.activeForeground": "#bd93f9",
      "editorCursor.foreground": "#bd93f9",
      "editor.selectionBackground": "#21222c",
      "editor.lineHighlightBackground": "#21222c",
      "editorHoverWidget.background": "#21222c",
      "editorHoverWidget.foreground": "#f8f8f2",
      "editorHoverWidget.border": "#21222c",
      "editorHoverWidget.statusBarBackground": "#21222c",
      "editorSuggestWidget.background": "#21222c",
      "editorSuggestWidget.foreground": "#f8f8f2",
      "editorSuggestWidget.border": "#21222c",
      "editorSuggestWidget.selectedBackground": "#21222c",
      "editorSuggestWidget.selectedForeground": "#bd93f9",
      "editorSuggestWidget.highlightForeground": "#bd93f9",
      "editorWidget.background": "#21222c",
      "editorWidget.foreground": "#f8f8f2",
      "editorWidget.border": "#21222c",
      "focusBorder": "#bd93f9",
      "activityBar.background": "#1e1f29",
      "activityBar.foreground": "#bd93f9",
      "activityBar.inactiveForeground": "#6272a4",
      "activityBarBadge.background": "#bd93f9",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#21222c",
      "sideBar.foreground": "#f8f8f2",
      "sideBarTitle.foreground": "#bd93f9",
      "sideBarSectionHeader.background": "#21222c",
      "sideBarSectionHeader.foreground": "#f8f8f2",
      "titleBar.activeBackground": "#1e1f29",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#1e1f29",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#191a21",
      "statusBar.foreground": "#bd93f9",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#21222c",
      "tab.activeBackground": "#282a36",
      "tab.activeForeground": "#bd93f9",
      "tab.activeBorderTop": "#bd93f9",
      "tab.inactiveBackground": "#21222c",
      "tab.inactiveForeground": "#6272a4",
      "tab.hoverBackground": "#21222c",
      "breadcrumb.foreground": "#6272a4",
      "terminal.background": "#282a36",
      "terminal.foreground": "#f8f8f2",
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
      "chat.requestBorder": "#21222c",
      "interactive.requestBackground": "#343746",
      "textCodeBlock.background": "#21222c",
      "textLink.foreground": "#bd93f9",
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
                  "foreground": "#bd93f9"
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
],
  },

  // 🐱 Catppuccin Mocha
  {
    id: "catppuccin-mocha",
    name: "\ud83d\udc31 Catppuccin Mocha",
    description: "Soothing warm pastel dark theme with harmonious lavender, sapphire, and peach tones.",
    type: "dark",
    accentColor: "#cba6f7",
    colors: {
      "foreground": "#cdd6f4",
      "descriptionForeground": "#6c7086",
      "disabledForeground": "#6c7086",
      "icon.foreground": "#cba6f7",
      "editor.background": "#1e1e2e",
      "editor.foreground": "#cdd6f4",
      "editorLineNumber.foreground": "#6c7086",
      "editorLineNumber.activeForeground": "#cba6f7",
      "editorCursor.foreground": "#cba6f7",
      "editor.selectionBackground": "#181825",
      "editor.lineHighlightBackground": "#181825",
      "editorHoverWidget.background": "#181825",
      "editorHoverWidget.foreground": "#cdd6f4",
      "editorHoverWidget.border": "#181825",
      "editorHoverWidget.statusBarBackground": "#181825",
      "editorSuggestWidget.background": "#181825",
      "editorSuggestWidget.foreground": "#cdd6f4",
      "editorSuggestWidget.border": "#181825",
      "editorSuggestWidget.selectedBackground": "#181825",
      "editorSuggestWidget.selectedForeground": "#cba6f7",
      "editorSuggestWidget.highlightForeground": "#cba6f7",
      "editorWidget.background": "#181825",
      "editorWidget.foreground": "#cdd6f4",
      "editorWidget.border": "#181825",
      "focusBorder": "#cba6f7",
      "activityBar.background": "#11111b",
      "activityBar.foreground": "#cba6f7",
      "activityBar.inactiveForeground": "#6c7086",
      "activityBarBadge.background": "#cba6f7",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#181825",
      "sideBar.foreground": "#cdd6f4",
      "sideBarTitle.foreground": "#cba6f7",
      "sideBarSectionHeader.background": "#181825",
      "sideBarSectionHeader.foreground": "#cdd6f4",
      "titleBar.activeBackground": "#11111b",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#11111b",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#11111b",
      "statusBar.foreground": "#cba6f7",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#181825",
      "tab.activeBackground": "#1e1e2e",
      "tab.activeForeground": "#cba6f7",
      "tab.activeBorderTop": "#cba6f7",
      "tab.inactiveBackground": "#181825",
      "tab.inactiveForeground": "#6c7086",
      "tab.hoverBackground": "#181825",
      "breadcrumb.foreground": "#6c7086",
      "terminal.background": "#1e1e2e",
      "terminal.foreground": "#cdd6f4",
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
      "chat.requestBorder": "#181825",
      "interactive.requestBackground": "#313244",
      "textCodeBlock.background": "#181825",
      "textLink.foreground": "#cba6f7",
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
                  "foreground": "#6c7086",
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
],
  },

  // 🐱 Catppuccin Latte
  {
    id: "catppuccin-latte",
    name: "\ud83d\udc31 Catppuccin Latte",
    description: "Warm, soothing pastel light palette crafted for daylight comfort and aesthetic elegance.",
    type: "light",
    accentColor: "#8839ef",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#6c6f85",
      "icon.foreground": "#8839ef",
      "editor.background": "#eff1f5",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#6c6f85",
      "editorLineNumber.activeForeground": "#8839ef",
      "editorCursor.foreground": "#8839ef",
      "editor.selectionBackground": "#dce0e8",
      "editor.lineHighlightBackground": "#dce0e8",
      "editorHoverWidget.background": "#e6e9ef",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#dce0e8",
      "editorHoverWidget.statusBarBackground": "#dce0e8",
      "editorSuggestWidget.background": "#e6e9ef",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#dce0e8",
      "editorSuggestWidget.selectedBackground": "#dce0e8",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#8839ef",
      "editorWidget.background": "#e6e9ef",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#dce0e8",
      "focusBorder": "#8839ef",
      "activityBar.background": "#dce0e8",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#8839ef",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#e6e9ef",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#dce0e8",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#dce0e8",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#dce0e8",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#8839ef",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#e6e9ef",
      "tab.activeBackground": "#eff1f5",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#8839ef",
      "tab.inactiveBackground": "#dce0e8",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#dce0e8",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#eff1f5",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#8839ef",
      "terminal.ansiGreen": "#1e66f5",
      "terminal.ansiCyan": "#a66004",
      "terminal.ansiYellow": "#1e5f12",
      "input.background": "#e6e9ef",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#eff1f5",
      "panel.border": "#e6e9ef",
      "panelTitle.activeForeground": "#8839ef",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#8839ef",
      "chat.requestBackground": "#e6e9ef",
      "chat.requestBorder": "#dce0e8",
      "interactive.requestBackground": "#e6e9ef",
      "textCodeBlock.background": "#dce0e8",
      "textLink.foreground": "#8839ef",
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
                  "foreground": "#1e5f12"
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
                  "foreground": "#2c2e3d"
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
                  "foreground": "#a66004"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#6c6f85",
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
                  "foreground": "#b83e02"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#2c2e3d"
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
],
  },

  // ❄️ Nord Frost
  {
    id: "nord-frost",
    name: "\u2744\ufe0f Nord Frost",
    description: "An arctic, north-bluish clean color palette crafted for elegant visual coherence.",
    type: "dark",
    accentColor: "#88c0d0",
    colors: {
      "foreground": "#d8dee9",
      "descriptionForeground": "#4c566a",
      "disabledForeground": "#4c566a",
      "icon.foreground": "#88c0d0",
      "editor.background": "#2e3440",
      "editor.foreground": "#d8dee9",
      "editorLineNumber.foreground": "#4c566a",
      "editorLineNumber.activeForeground": "#88c0d0",
      "editorCursor.foreground": "#88c0d0",
      "editor.selectionBackground": "#272c36",
      "editor.lineHighlightBackground": "#272c36",
      "editorHoverWidget.background": "#272c36",
      "editorHoverWidget.foreground": "#d8dee9",
      "editorHoverWidget.border": "#272c36",
      "editorHoverWidget.statusBarBackground": "#272c36",
      "editorSuggestWidget.background": "#272c36",
      "editorSuggestWidget.foreground": "#d8dee9",
      "editorSuggestWidget.border": "#272c36",
      "editorSuggestWidget.selectedBackground": "#272c36",
      "editorSuggestWidget.selectedForeground": "#88c0d0",
      "editorSuggestWidget.highlightForeground": "#88c0d0",
      "editorWidget.background": "#272c36",
      "editorWidget.foreground": "#d8dee9",
      "editorWidget.border": "#272c36",
      "focusBorder": "#88c0d0",
      "activityBar.background": "#242933",
      "activityBar.foreground": "#88c0d0",
      "activityBar.inactiveForeground": "#4c566a",
      "activityBarBadge.background": "#88c0d0",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#272c36",
      "sideBar.foreground": "#d8dee9",
      "sideBarTitle.foreground": "#88c0d0",
      "sideBarSectionHeader.background": "#272c36",
      "sideBarSectionHeader.foreground": "#d8dee9",
      "titleBar.activeBackground": "#242933",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#242933",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#242933",
      "statusBar.foreground": "#88c0d0",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#272c36",
      "tab.activeBackground": "#2e3440",
      "tab.activeForeground": "#88c0d0",
      "tab.activeBorderTop": "#88c0d0",
      "tab.inactiveBackground": "#272c36",
      "tab.inactiveForeground": "#4c566a",
      "tab.hoverBackground": "#272c36",
      "breadcrumb.foreground": "#4c566a",
      "terminal.background": "#2e3440",
      "terminal.foreground": "#d8dee9",
      "terminalCursor.foreground": "#88c0d0",
      "terminal.ansiGreen": "#88c0d0",
      "terminal.ansiCyan": "#8fbcbb",
      "terminal.ansiYellow": "#a3be8c",
      "input.background": "#3b4252",
      "input.foreground": "#d8dee9",
      "input.placeholderForeground": "#4c566a",
      "panel.background": "#2e3440",
      "panel.border": "#272c36",
      "panelTitle.activeForeground": "#88c0d0",
      "panelTitle.inactiveForeground": "#4c566a",
      "panelTitle.activeBorder": "#88c0d0",
      "chat.requestBackground": "#3b4252",
      "chat.requestBorder": "#272c36",
      "interactive.requestBackground": "#3b4252",
      "textCodeBlock.background": "#272c36",
      "textLink.foreground": "#88c0d0",
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
                  "foreground": "#d8dee9"
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
                  "foreground": "#d8dee9"
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
],
  },

  // ❄️ Nord Snow Light
  {
    id: "nord-snow",
    name: "\u2744\ufe0f Nord Snow Light",
    description: "Pristine Scandinavian winter snow landscape with aurora borealis blues and frosted slate.",
    type: "light",
    accentColor: "#5e81ac",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#4c566a",
      "icon.foreground": "#5e81ac",
      "editor.background": "#eceff4",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#4c566a",
      "editorLineNumber.activeForeground": "#5e81ac",
      "editorCursor.foreground": "#5e81ac",
      "editor.selectionBackground": "#d8dee9",
      "editor.lineHighlightBackground": "#d8dee9",
      "editorHoverWidget.background": "#e5e9f0",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#d8dee9",
      "editorHoverWidget.statusBarBackground": "#d8dee9",
      "editorSuggestWidget.background": "#e5e9f0",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#d8dee9",
      "editorSuggestWidget.selectedBackground": "#d8dee9",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#5e81ac",
      "editorWidget.background": "#e5e9f0",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#d8dee9",
      "focusBorder": "#5e81ac",
      "activityBar.background": "#d8dee9",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#5e81ac",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#e5e9f0",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#d8dee9",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#d8dee9",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#d8dee9",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#5e81ac",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#e5e9f0",
      "tab.activeBackground": "#eceff4",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#5e81ac",
      "tab.inactiveBackground": "#d8dee9",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#d8dee9",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#eceff4",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#5e81ac",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#0f766e",
      "terminal.ansiYellow": "#1b5e20",
      "input.background": "#e5e9f0",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#eceff4",
      "panel.border": "#e5e9f0",
      "panelTitle.activeForeground": "#5e81ac",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#5e81ac",
      "chat.requestBackground": "#e5e9f0",
      "chat.requestBorder": "#d8dee9",
      "interactive.requestBackground": "#e5e9f0",
      "textCodeBlock.background": "#d8dee9",
      "textLink.foreground": "#5e81ac",
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
                  "foreground": "#1b5e20"
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
                  "foreground": "#1c2128"
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
                  "foreground": "#b84e32"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#1c2128"
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
],
  },

  // 🌑 OLED Pure Black
  {
    id: "oled-pure-black",
    name: "\ud83c\udf11 OLED Pure Black",
    description: "True #000000 deep black backgrounds for maximum contrast, battery savings and crisp readability.",
    type: "dark",
    accentColor: "#00ff88",
    colors: {
      "foreground": "#ffffff",
      "descriptionForeground": "#777777",
      "disabledForeground": "#555555",
      "icon.foreground": "#00ff88",
      "editor.background": "#000000",
      "editor.foreground": "#ffffff",
      "editorLineNumber.foreground": "#555555",
      "editorLineNumber.activeForeground": "#00ff88",
      "editorCursor.foreground": "#00ff88",
      "editor.selectionBackground": "#080808",
      "editor.lineHighlightBackground": "#080808",
      "editorHoverWidget.background": "#050505",
      "editorHoverWidget.foreground": "#dddddd",
      "editorHoverWidget.border": "#080808",
      "editorHoverWidget.statusBarBackground": "#080808",
      "editorSuggestWidget.background": "#050505",
      "editorSuggestWidget.foreground": "#dddddd",
      "editorSuggestWidget.border": "#080808",
      "editorSuggestWidget.selectedBackground": "#080808",
      "editorSuggestWidget.selectedForeground": "#00ff88",
      "editorSuggestWidget.highlightForeground": "#00ff88",
      "editorWidget.background": "#050505",
      "editorWidget.foreground": "#dddddd",
      "editorWidget.border": "#080808",
      "focusBorder": "#00ff88",
      "activityBar.background": "#000000",
      "activityBar.foreground": "#00ff88",
      "activityBar.inactiveForeground": "#555555",
      "activityBarBadge.background": "#00ff88",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#050505",
      "sideBar.foreground": "#dddddd",
      "sideBarTitle.foreground": "#00ff88",
      "sideBarSectionHeader.background": "#080808",
      "sideBarSectionHeader.foreground": "#dddddd",
      "titleBar.activeBackground": "#000000",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#000000",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#000000",
      "statusBar.foreground": "#00ff88",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#050505",
      "tab.activeBackground": "#000000",
      "tab.activeForeground": "#00ff88",
      "tab.activeBorderTop": "#00ff88",
      "tab.inactiveBackground": "#080808",
      "tab.inactiveForeground": "#777777",
      "tab.hoverBackground": "#080808",
      "breadcrumb.foreground": "#777777",
      "terminal.background": "#000000",
      "terminal.foreground": "#ffffff",
      "terminalCursor.foreground": "#00ff88",
      "terminal.ansiGreen": "#00ff88",
      "terminal.ansiCyan": "#00f0ff",
      "terminal.ansiYellow": "#ffe600",
      "input.background": "#111111",
      "input.foreground": "#ffffff",
      "input.placeholderForeground": "#777777",
      "panel.background": "#000000",
      "panel.border": "#050505",
      "panelTitle.activeForeground": "#00ff88",
      "panelTitle.inactiveForeground": "#777777",
      "panelTitle.activeBorder": "#00ff88",
      "chat.requestBackground": "#111111",
      "chat.requestBorder": "#080808",
      "interactive.requestBackground": "#111111",
      "textCodeBlock.background": "#080808",
      "textLink.foreground": "#00ff88",
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
                  "foreground": "#ff3366",
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
                  "foreground": "#00ff88"
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
                  "foreground": "#ff3366"
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
                  "foreground": "#00f0ff"
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
                  "foreground": "#ff9900"
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
                  "foreground": "#00ff88"
            }
      }
],
  },

  // 🌌 Synthwave 84 Outrun
  {
    id: "synthwave-84",
    name: "\ud83c\udf0c Synthwave 84 Outrun",
    description: "Radical 80s retro grid aesthetic with neon magenta glows, electric cyan lasers, and sunset orange.",
    type: "dark",
    accentColor: "#ff7edb",
    colors: {
      "foreground": "#f92aad",
      "descriptionForeground": "#848bbd",
      "disabledForeground": "#614d85",
      "icon.foreground": "#ff7edb",
      "editor.background": "#262335",
      "editor.foreground": "#f92aad",
      "editorLineNumber.foreground": "#614d85",
      "editorLineNumber.activeForeground": "#ff7edb",
      "editorCursor.foreground": "#ff7edb",
      "editor.selectionBackground": "#20172b",
      "editor.lineHighlightBackground": "#20172b",
      "editorHoverWidget.background": "#241b2f",
      "editorHoverWidget.foreground": "#ffffff",
      "editorHoverWidget.border": "#20172b",
      "editorHoverWidget.statusBarBackground": "#20172b",
      "editorSuggestWidget.background": "#241b2f",
      "editorSuggestWidget.foreground": "#ffffff",
      "editorSuggestWidget.border": "#20172b",
      "editorSuggestWidget.selectedBackground": "#20172b",
      "editorSuggestWidget.selectedForeground": "#ff7edb",
      "editorSuggestWidget.highlightForeground": "#ff7edb",
      "editorWidget.background": "#241b2f",
      "editorWidget.foreground": "#ffffff",
      "editorWidget.border": "#20172b",
      "focusBorder": "#ff7edb",
      "activityBar.background": "#1a1025",
      "activityBar.foreground": "#ff7edb",
      "activityBar.inactiveForeground": "#614d85",
      "activityBarBadge.background": "#ff7edb",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#241b2f",
      "sideBar.foreground": "#ffffff",
      "sideBarTitle.foreground": "#ff7edb",
      "sideBarSectionHeader.background": "#20172b",
      "sideBarSectionHeader.foreground": "#ffffff",
      "titleBar.activeBackground": "#1a1025",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#1a1025",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#1a1025",
      "statusBar.foreground": "#36f9f6",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#241b2f",
      "tab.activeBackground": "#262335",
      "tab.activeForeground": "#ff7edb",
      "tab.activeBorderTop": "#ff7edb",
      "tab.inactiveBackground": "#20172b",
      "tab.inactiveForeground": "#848bbd",
      "tab.hoverBackground": "#20172b",
      "breadcrumb.foreground": "#848bbd",
      "terminal.background": "#262335",
      "terminal.foreground": "#f92aad",
      "terminalCursor.foreground": "#ff7edb",
      "terminal.ansiGreen": "#36f9f6",
      "terminal.ansiCyan": "#fe4450",
      "terminal.ansiYellow": "#ff7edb",
      "input.background": "#34294f",
      "input.foreground": "#ffffff",
      "input.placeholderForeground": "#848bbd",
      "panel.background": "#262335",
      "panel.border": "#241b2f",
      "panelTitle.activeForeground": "#ff7edb",
      "panelTitle.inactiveForeground": "#848bbd",
      "panelTitle.activeBorder": "#ff7edb",
      "chat.requestBackground": "#34294f",
      "chat.requestBorder": "#20172b",
      "interactive.requestBackground": "#34294f",
      "textCodeBlock.background": "#20172b",
      "textLink.foreground": "#ff7edb",
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
                  "foreground": "#fed049",
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
                  "foreground": "#fed049"
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
],
  },

  // 🌆 Matrix Hacker Terminal
  {
    id: "matrix-hacker",
    name: "\ud83c\udf06 Matrix Hacker Terminal",
    description: "Phosphorescent green CRT digital rain glowing against deep cybernetic obsidian.",
    type: "dark",
    accentColor: "#00ff41",
    colors: {
      "foreground": "#00ff41",
      "descriptionForeground": "#008f11",
      "disabledForeground": "#005f00",
      "icon.foreground": "#00ff41",
      "editor.background": "#0d110d",
      "editor.foreground": "#00ff41",
      "editorLineNumber.foreground": "#005f00",
      "editorLineNumber.activeForeground": "#00ff41",
      "editorCursor.foreground": "#00ff41",
      "editor.selectionBackground": "#091009",
      "editor.lineHighlightBackground": "#091009",
      "editorHoverWidget.background": "#070b07",
      "editorHoverWidget.foreground": "#00dd38",
      "editorHoverWidget.border": "#091009",
      "editorHoverWidget.statusBarBackground": "#091009",
      "editorSuggestWidget.background": "#070b07",
      "editorSuggestWidget.foreground": "#00dd38",
      "editorSuggestWidget.border": "#091009",
      "editorSuggestWidget.selectedBackground": "#091009",
      "editorSuggestWidget.selectedForeground": "#00ff41",
      "editorSuggestWidget.highlightForeground": "#00ff41",
      "editorWidget.background": "#070b07",
      "editorWidget.foreground": "#00dd38",
      "editorWidget.border": "#091009",
      "focusBorder": "#00ff41",
      "activityBar.background": "#040704",
      "activityBar.foreground": "#00ff41",
      "activityBar.inactiveForeground": "#005f00",
      "activityBarBadge.background": "#00ff41",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#070b07",
      "sideBar.foreground": "#00dd38",
      "sideBarTitle.foreground": "#00ff41",
      "sideBarSectionHeader.background": "#091009",
      "sideBarSectionHeader.foreground": "#00dd38",
      "titleBar.activeBackground": "#040704",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#040704",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#00ff41",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#070b07",
      "tab.activeBackground": "#0d110d",
      "tab.activeForeground": "#00ff41",
      "tab.activeBorderTop": "#00ff41",
      "tab.inactiveBackground": "#091009",
      "tab.inactiveForeground": "#008f11",
      "tab.hoverBackground": "#091009",
      "breadcrumb.foreground": "#008f11",
      "terminal.background": "#0d110d",
      "terminal.foreground": "#00ff41",
      "terminalCursor.foreground": "#00ff41",
      "terminal.ansiGreen": "#00ff41",
      "terminal.ansiCyan": "#00ffff",
      "terminal.ansiYellow": "#a6e22e",
      "input.background": "#121a12",
      "input.foreground": "#00ff41",
      "input.placeholderForeground": "#008f11",
      "panel.background": "#0d110d",
      "panel.border": "#070b07",
      "panelTitle.activeForeground": "#00ff41",
      "panelTitle.inactiveForeground": "#008f11",
      "panelTitle.activeBorder": "#00ff41",
      "chat.requestBackground": "#121a12",
      "chat.requestBorder": "#091009",
      "interactive.requestBackground": "#121a12",
      "textCodeBlock.background": "#091009",
      "textLink.foreground": "#00ff41",
      "badge.background": "#00ff41",
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
                  "foreground": "#50fa7b",
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
                  "foreground": "#00ff41"
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
                  "foreground": "#a6e22e"
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
                  "foreground": "#50fa7b"
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
                  "foreground": "#00ffff"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#005f00",
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
                  "foreground": "#a3e635"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#00ff41"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#00ff41"
            }
      }
],
  },

  // 🩸 Crimson Blood Moon
  {
    id: "crimson-blood-moon",
    name: "\ud83e\ude78 Crimson Blood Moon",
    description: "Gothic dark obsidian with glowing ruby scarlet, blood orange, and silver moonlight.",
    type: "dark",
    accentColor: "#ff2a5f",
    colors: {
      "foreground": "#fce7f3",
      "descriptionForeground": "#9d174d",
      "disabledForeground": "#831843",
      "icon.foreground": "#ff2a5f",
      "editor.background": "#12070b",
      "editor.foreground": "#fce7f3",
      "editorLineNumber.foreground": "#831843",
      "editorLineNumber.activeForeground": "#ff2a5f",
      "editorCursor.foreground": "#ff2a5f",
      "editor.selectionBackground": "#200d15",
      "editor.lineHighlightBackground": "#200d15",
      "editorHoverWidget.background": "#1a0b10",
      "editorHoverWidget.foreground": "#fbcfe8",
      "editorHoverWidget.border": "#200d15",
      "editorHoverWidget.statusBarBackground": "#200d15",
      "editorSuggestWidget.background": "#1a0b10",
      "editorSuggestWidget.foreground": "#fbcfe8",
      "editorSuggestWidget.border": "#200d15",
      "editorSuggestWidget.selectedBackground": "#200d15",
      "editorSuggestWidget.selectedForeground": "#ff2a5f",
      "editorSuggestWidget.highlightForeground": "#ff2a5f",
      "editorWidget.background": "#1a0b10",
      "editorWidget.foreground": "#fbcfe8",
      "editorWidget.border": "#200d15",
      "focusBorder": "#ff2a5f",
      "activityBar.background": "#0e0508",
      "activityBar.foreground": "#ff2a5f",
      "activityBar.inactiveForeground": "#831843",
      "activityBarBadge.background": "#ff2a5f",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#1a0b10",
      "sideBar.foreground": "#fbcfe8",
      "sideBarTitle.foreground": "#ff2a5f",
      "sideBarSectionHeader.background": "#200d15",
      "sideBarSectionHeader.foreground": "#fbcfe8",
      "titleBar.activeBackground": "#0e0508",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#0e0508",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#0e0508",
      "statusBar.foreground": "#ff2a5f",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#1a0b10",
      "tab.activeBackground": "#12070b",
      "tab.activeForeground": "#ff2a5f",
      "tab.activeBorderTop": "#ff2a5f",
      "tab.inactiveBackground": "#200d15",
      "tab.inactiveForeground": "#9d174d",
      "tab.hoverBackground": "#200d15",
      "breadcrumb.foreground": "#9d174d",
      "terminal.background": "#12070b",
      "terminal.foreground": "#fce7f3",
      "terminalCursor.foreground": "#ff2a5f",
      "terminal.ansiGreen": "#f43f5e",
      "terminal.ansiCyan": "#fda4af",
      "terminal.ansiYellow": "#fb7185",
      "input.background": "#25101a",
      "input.foreground": "#fce7f3",
      "input.placeholderForeground": "#9d174d",
      "panel.background": "#12070b",
      "panel.border": "#1a0b10",
      "panelTitle.activeForeground": "#ff2a5f",
      "panelTitle.inactiveForeground": "#9d174d",
      "panelTitle.activeBorder": "#ff2a5f",
      "chat.requestBackground": "#25101a",
      "chat.requestBorder": "#200d15",
      "interactive.requestBackground": "#25101a",
      "textCodeBlock.background": "#200d15",
      "textLink.foreground": "#ff2a5f",
      "badge.background": "#ff2a5f",
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
                  "foreground": "#ff2a5f",
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
                  "foreground": "#f43f5e"
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
                  "foreground": "#fb7185"
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
                  "foreground": "#ff2a5f"
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
                  "foreground": "#fce7f3"
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
                  "foreground": "#fda4af"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#831843",
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
                  "foreground": "#fce7f3"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#f43f5e"
            }
      }
],
  },

  // 👾 Arcade 1989 Vaporwave
  {
    id: "arcade-vaporwave",
    name: "\ud83d\udc7e Arcade 1989 Vaporwave",
    description: "Nostalgic retro arcade cabinet purple, mint teal, hot bubblegum, and golden coin glow.",
    type: "dark",
    accentColor: "#f472b6",
    colors: {
      "foreground": "#e0def4",
      "descriptionForeground": "#6e6a86",
      "disabledForeground": "#6e6a86",
      "icon.foreground": "#f472b6",
      "editor.background": "#1f1d36",
      "editor.foreground": "#e0def4",
      "editorLineNumber.foreground": "#6e6a86",
      "editorLineNumber.activeForeground": "#f472b6",
      "editorCursor.foreground": "#f472b6",
      "editor.selectionBackground": "#26233a",
      "editor.lineHighlightBackground": "#26233a",
      "editorHoverWidget.background": "#191724",
      "editorHoverWidget.foreground": "#e0def4",
      "editorHoverWidget.border": "#26233a",
      "editorHoverWidget.statusBarBackground": "#26233a",
      "editorSuggestWidget.background": "#191724",
      "editorSuggestWidget.foreground": "#e0def4",
      "editorSuggestWidget.border": "#26233a",
      "editorSuggestWidget.selectedBackground": "#26233a",
      "editorSuggestWidget.selectedForeground": "#f472b6",
      "editorSuggestWidget.highlightForeground": "#f472b6",
      "editorWidget.background": "#191724",
      "editorWidget.foreground": "#e0def4",
      "editorWidget.border": "#26233a",
      "focusBorder": "#f472b6",
      "activityBar.background": "#151322",
      "activityBar.foreground": "#f472b6",
      "activityBar.inactiveForeground": "#6e6a86",
      "activityBarBadge.background": "#f472b6",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#191724",
      "sideBar.foreground": "#e0def4",
      "sideBarTitle.foreground": "#f472b6",
      "sideBarSectionHeader.background": "#26233a",
      "sideBarSectionHeader.foreground": "#e0def4",
      "titleBar.activeBackground": "#151322",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#151322",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#151322",
      "statusBar.foreground": "#9ccfd8",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#191724",
      "tab.activeBackground": "#1f1d36",
      "tab.activeForeground": "#f472b6",
      "tab.activeBorderTop": "#f472b6",
      "tab.inactiveBackground": "#26233a",
      "tab.inactiveForeground": "#6e6a86",
      "tab.hoverBackground": "#26233a",
      "breadcrumb.foreground": "#6e6a86",
      "terminal.background": "#1f1d36",
      "terminal.foreground": "#e0def4",
      "terminalCursor.foreground": "#f472b6",
      "terminal.ansiGreen": "#9ccfd8",
      "terminal.ansiCyan": "#c4a7e7",
      "terminal.ansiYellow": "#f6c177",
      "input.background": "#2a273f",
      "input.foreground": "#e0def4",
      "input.placeholderForeground": "#6e6a86",
      "panel.background": "#1f1d36",
      "panel.border": "#191724",
      "panelTitle.activeForeground": "#f472b6",
      "panelTitle.inactiveForeground": "#6e6a86",
      "panelTitle.activeBorder": "#f472b6",
      "chat.requestBackground": "#2a273f",
      "chat.requestBorder": "#26233a",
      "interactive.requestBackground": "#2a273f",
      "textCodeBlock.background": "#26233a",
      "textLink.foreground": "#f472b6",
      "badge.background": "#f472b6",
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
                  "foreground": "#eb6f92",
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
                  "foreground": "#9ccfd8"
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
                  "foreground": "#f6c177"
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
                  "foreground": "#eb6f92"
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
                  "foreground": "#e0def4"
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
                  "foreground": "#c4a7e7"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#6e6a86",
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
                  "foreground": "#ebbcba"
            }
      },
      {
            "scope": [
                  "keyword.operator",
                  "punctuation.separator",
                  "punctuation.terminator"
            ],
            "settings": {
                  "foreground": "#e0def4"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#9ccfd8"
            }
      }
],
  },

  // 🔮 Amethyst Void
  {
    id: "amethyst-void",
    name: "\ud83d\udd2e Amethyst Void",
    description: "Deep astral void with glowing amethyst crystal, lilac stardust, and ultraviolet.",
    type: "dark",
    accentColor: "#c084fc",
    colors: {
      "foreground": "#f3e8ff",
      "descriptionForeground": "#7e22ce",
      "disabledForeground": "#581c87",
      "icon.foreground": "#c084fc",
      "editor.background": "#10091d",
      "editor.foreground": "#f3e8ff",
      "editorLineNumber.foreground": "#581c87",
      "editorLineNumber.activeForeground": "#c084fc",
      "editorCursor.foreground": "#c084fc",
      "editor.selectionBackground": "#1e1233",
      "editor.lineHighlightBackground": "#1e1233",
      "editorHoverWidget.background": "#170e28",
      "editorHoverWidget.foreground": "#f3e8ff",
      "editorHoverWidget.border": "#1e1233",
      "editorHoverWidget.statusBarBackground": "#1e1233",
      "editorSuggestWidget.background": "#170e28",
      "editorSuggestWidget.foreground": "#f3e8ff",
      "editorSuggestWidget.border": "#1e1233",
      "editorSuggestWidget.selectedBackground": "#1e1233",
      "editorSuggestWidget.selectedForeground": "#c084fc",
      "editorSuggestWidget.highlightForeground": "#c084fc",
      "editorWidget.background": "#170e28",
      "editorWidget.foreground": "#f3e8ff",
      "editorWidget.border": "#1e1233",
      "focusBorder": "#c084fc",
      "activityBar.background": "#0c0617",
      "activityBar.foreground": "#c084fc",
      "activityBar.inactiveForeground": "#581c87",
      "activityBarBadge.background": "#c084fc",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#170e28",
      "sideBar.foreground": "#f3e8ff",
      "sideBarTitle.foreground": "#c084fc",
      "sideBarSectionHeader.background": "#1e1233",
      "sideBarSectionHeader.foreground": "#f3e8ff",
      "titleBar.activeBackground": "#0c0617",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#0c0617",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#0c0617",
      "statusBar.foreground": "#c084fc",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#170e28",
      "tab.activeBackground": "#10091d",
      "tab.activeForeground": "#c084fc",
      "tab.activeBorderTop": "#c084fc",
      "tab.inactiveBackground": "#1e1233",
      "tab.inactiveForeground": "#7e22ce",
      "tab.hoverBackground": "#1e1233",
      "breadcrumb.foreground": "#7e22ce",
      "terminal.background": "#10091d",
      "terminal.foreground": "#f3e8ff",
      "terminalCursor.foreground": "#c084fc",
      "terminal.ansiGreen": "#a855f7",
      "terminal.ansiCyan": "#818cf8",
      "terminal.ansiYellow": "#e879f9",
      "input.background": "#24163d",
      "input.foreground": "#f3e8ff",
      "input.placeholderForeground": "#7e22ce",
      "panel.background": "#10091d",
      "panel.border": "#170e28",
      "panelTitle.activeForeground": "#c084fc",
      "panelTitle.inactiveForeground": "#7e22ce",
      "panelTitle.activeBorder": "#c084fc",
      "chat.requestBackground": "#24163d",
      "chat.requestBorder": "#1e1233",
      "interactive.requestBackground": "#24163d",
      "textCodeBlock.background": "#1e1233",
      "textLink.foreground": "#c084fc",
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
                  "foreground": "#a855f7"
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
                  "foreground": "#e879f9"
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
                  "foreground": "#818cf8"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#581c87",
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
                  "foreground": "#fb7185"
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
                  "foreground": "#a855f7"
            }
      }
],
  },

  // ⚡ Hyperion Solar Flare
  {
    id: "hyperion-solar",
    name: "\u26a1 Hyperion Solar Flare",
    description: "Volcanic black basalt with erupting solar plasma orange, molten gold, and fiery ember sparks.",
    type: "dark",
    accentColor: "#f97316",
    colors: {
      "foreground": "#fff7ed",
      "descriptionForeground": "#9a3412",
      "disabledForeground": "#7c2d12",
      "icon.foreground": "#f97316",
      "editor.background": "#0f0d0a",
      "editor.foreground": "#fff7ed",
      "editorLineNumber.foreground": "#7c2d12",
      "editorLineNumber.activeForeground": "#f97316",
      "editorCursor.foreground": "#f97316",
      "editor.selectionBackground": "#241d16",
      "editor.lineHighlightBackground": "#241d16",
      "editorHoverWidget.background": "#19140f",
      "editorHoverWidget.foreground": "#ffedd5",
      "editorHoverWidget.border": "#241d16",
      "editorHoverWidget.statusBarBackground": "#241d16",
      "editorSuggestWidget.background": "#19140f",
      "editorSuggestWidget.foreground": "#ffedd5",
      "editorSuggestWidget.border": "#241d16",
      "editorSuggestWidget.selectedBackground": "#241d16",
      "editorSuggestWidget.selectedForeground": "#f97316",
      "editorSuggestWidget.highlightForeground": "#f97316",
      "editorWidget.background": "#19140f",
      "editorWidget.foreground": "#ffedd5",
      "editorWidget.border": "#241d16",
      "focusBorder": "#f97316",
      "activityBar.background": "#0a0806",
      "activityBar.foreground": "#f97316",
      "activityBar.inactiveForeground": "#7c2d12",
      "activityBarBadge.background": "#f97316",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#19140f",
      "sideBar.foreground": "#ffedd5",
      "sideBarTitle.foreground": "#f97316",
      "sideBarSectionHeader.background": "#241d16",
      "sideBarSectionHeader.foreground": "#ffedd5",
      "titleBar.activeBackground": "#0a0806",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#0a0806",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#f97316",
      "statusBar.foreground": "#000000",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#19140f",
      "tab.activeBackground": "#0f0d0a",
      "tab.activeForeground": "#f97316",
      "tab.activeBorderTop": "#f97316",
      "tab.inactiveBackground": "#241d16",
      "tab.inactiveForeground": "#9a3412",
      "tab.hoverBackground": "#241d16",
      "breadcrumb.foreground": "#9a3412",
      "terminal.background": "#0f0d0a",
      "terminal.foreground": "#fff7ed",
      "terminalCursor.foreground": "#f97316",
      "terminal.ansiGreen": "#f59e0b",
      "terminal.ansiCyan": "#fb923c",
      "terminal.ansiYellow": "#fde047",
      "input.background": "#2a221a",
      "input.foreground": "#fff7ed",
      "input.placeholderForeground": "#9a3412",
      "panel.background": "#0f0d0a",
      "panel.border": "#19140f",
      "panelTitle.activeForeground": "#f97316",
      "panelTitle.inactiveForeground": "#9a3412",
      "panelTitle.activeBorder": "#f97316",
      "chat.requestBackground": "#2a221a",
      "chat.requestBorder": "#241d16",
      "interactive.requestBackground": "#2a221a",
      "textCodeBlock.background": "#241d16",
      "textLink.foreground": "#f97316",
      "badge.background": "#f97316",
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
                  "foreground": "#f59e0b"
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
                  "foreground": "#7c2d12",
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
                  "foreground": "#fff7ed"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#f59e0b"
            }
      }
],
  },

  // 🛸 Alien Abduction Green
  {
    id: "alien-abduction",
    name: "\ud83d\udef8 Alien Abduction Green",
    description: "Bioluminescent UFO tractor beam lime, extraterrestrial teal, and interstellar dark matter.",
    type: "dark",
    accentColor: "#22c55e",
    colors: {
      "foreground": "#f0fdf4",
      "descriptionForeground": "#166534",
      "disabledForeground": "#14532d",
      "icon.foreground": "#22c55e",
      "editor.background": "#051108",
      "editor.foreground": "#f0fdf4",
      "editorLineNumber.foreground": "#14532d",
      "editorLineNumber.activeForeground": "#22c55e",
      "editorCursor.foreground": "#22c55e",
      "editor.selectionBackground": "#0f2917",
      "editor.lineHighlightBackground": "#0f2917",
      "editorHoverWidget.background": "#0a1c0f",
      "editorHoverWidget.foreground": "#dcfce7",
      "editorHoverWidget.border": "#0f2917",
      "editorHoverWidget.statusBarBackground": "#0f2917",
      "editorSuggestWidget.background": "#0a1c0f",
      "editorSuggestWidget.foreground": "#dcfce7",
      "editorSuggestWidget.border": "#0f2917",
      "editorSuggestWidget.selectedBackground": "#0f2917",
      "editorSuggestWidget.selectedForeground": "#22c55e",
      "editorSuggestWidget.highlightForeground": "#22c55e",
      "editorWidget.background": "#0a1c0f",
      "editorWidget.foreground": "#dcfce7",
      "editorWidget.border": "#0f2917",
      "focusBorder": "#22c55e",
      "activityBar.background": "#030c06",
      "activityBar.foreground": "#22c55e",
      "activityBar.inactiveForeground": "#14532d",
      "activityBarBadge.background": "#22c55e",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#0a1c0f",
      "sideBar.foreground": "#dcfce7",
      "sideBarTitle.foreground": "#22c55e",
      "sideBarSectionHeader.background": "#0f2917",
      "sideBarSectionHeader.foreground": "#dcfce7",
      "titleBar.activeBackground": "#030c06",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#030c06",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#030c06",
      "statusBar.foreground": "#22c55e",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#0a1c0f",
      "tab.activeBackground": "#051108",
      "tab.activeForeground": "#22c55e",
      "tab.activeBorderTop": "#22c55e",
      "tab.inactiveBackground": "#0f2917",
      "tab.inactiveForeground": "#166534",
      "tab.hoverBackground": "#0f2917",
      "breadcrumb.foreground": "#166534",
      "terminal.background": "#051108",
      "terminal.foreground": "#f0fdf4",
      "terminalCursor.foreground": "#22c55e",
      "terminal.ansiGreen": "#2dd4bf",
      "terminal.ansiCyan": "#38bdf8",
      "terminal.ansiYellow": "#a3e635",
      "input.background": "#14361e",
      "input.foreground": "#f0fdf4",
      "input.placeholderForeground": "#166534",
      "panel.background": "#051108",
      "panel.border": "#0a1c0f",
      "panelTitle.activeForeground": "#22c55e",
      "panelTitle.inactiveForeground": "#166534",
      "panelTitle.activeBorder": "#22c55e",
      "chat.requestBackground": "#14361e",
      "chat.requestBorder": "#0f2917",
      "interactive.requestBackground": "#14361e",
      "textCodeBlock.background": "#0f2917",
      "textLink.foreground": "#22c55e",
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
                  "foreground": "#2dd4bf"
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
                  "foreground": "#a3e635"
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
                  "foreground": "#f0fdf4"
            }
      },
      {
            "scope": [
                  "entity.name.tag",
                  "entity.other.attribute-name"
            ],
            "settings": {
                  "foreground": "#2dd4bf"
            }
      }
],
  },

  // 🪸 Abyssal Trench
  {
    id: "abyssal-trench",
    name: "\ud83e\udeb8 Abyssal Trench",
    description: "Deep ocean midnight trench with glowing jellyfish bioluminescence and aqua phosphors.",
    type: "dark",
    accentColor: "#06b6d4",
    colors: {
      "foreground": "#ecfeff",
      "descriptionForeground": "#155e75",
      "disabledForeground": "#1e3a8a",
      "icon.foreground": "#06b6d4",
      "editor.background": "#030712",
      "editor.foreground": "#ecfeff",
      "editorLineNumber.foreground": "#1e3a8a",
      "editorLineNumber.activeForeground": "#06b6d4",
      "editorCursor.foreground": "#06b6d4",
      "editor.selectionBackground": "#0d1f3b",
      "editor.lineHighlightBackground": "#0d1f3b",
      "editorHoverWidget.background": "#081325",
      "editorHoverWidget.foreground": "#cffafe",
      "editorHoverWidget.border": "#0d1f3b",
      "editorHoverWidget.statusBarBackground": "#0d1f3b",
      "editorSuggestWidget.background": "#081325",
      "editorSuggestWidget.foreground": "#cffafe",
      "editorSuggestWidget.border": "#0d1f3b",
      "editorSuggestWidget.selectedBackground": "#0d1f3b",
      "editorSuggestWidget.selectedForeground": "#06b6d4",
      "editorSuggestWidget.highlightForeground": "#06b6d4",
      "editorWidget.background": "#081325",
      "editorWidget.foreground": "#cffafe",
      "editorWidget.border": "#0d1f3b",
      "focusBorder": "#06b6d4",
      "activityBar.background": "#02040a",
      "activityBar.foreground": "#06b6d4",
      "activityBar.inactiveForeground": "#1e3a8a",
      "activityBarBadge.background": "#06b6d4",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#081325",
      "sideBar.foreground": "#cffafe",
      "sideBarTitle.foreground": "#06b6d4",
      "sideBarSectionHeader.background": "#0d1f3b",
      "sideBarSectionHeader.foreground": "#cffafe",
      "titleBar.activeBackground": "#02040a",
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": "#02040a",
      "titleBar.inactiveForeground": "#999999",
      "statusBar.background": "#02040a",
      "statusBar.foreground": "#06b6d4",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#081325",
      "tab.activeBackground": "#030712",
      "tab.activeForeground": "#06b6d4",
      "tab.activeBorderTop": "#06b6d4",
      "tab.inactiveBackground": "#0d1f3b",
      "tab.inactiveForeground": "#155e75",
      "tab.hoverBackground": "#0d1f3b",
      "breadcrumb.foreground": "#155e75",
      "terminal.background": "#030712",
      "terminal.foreground": "#ecfeff",
      "terminalCursor.foreground": "#06b6d4",
      "terminal.ansiGreen": "#38bdf8",
      "terminal.ansiCyan": "#818cf8",
      "terminal.ansiYellow": "#34d399",
      "input.background": "#112a50",
      "input.foreground": "#ecfeff",
      "input.placeholderForeground": "#155e75",
      "panel.background": "#030712",
      "panel.border": "#081325",
      "panelTitle.activeForeground": "#06b6d4",
      "panelTitle.inactiveForeground": "#155e75",
      "panelTitle.activeBorder": "#06b6d4",
      "chat.requestBackground": "#112a50",
      "chat.requestBorder": "#0d1f3b",
      "interactive.requestBackground": "#112a50",
      "textCodeBlock.background": "#0d1f3b",
      "textLink.foreground": "#06b6d4",
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
                  "foreground": "#ecfeff"
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
                  "foreground": "#818cf8"
            }
      },
      {
            "scope": [
                  "comment",
                  "comment.line",
                  "comment.block"
            ],
            "settings": {
                  "foreground": "#1e3a8a",
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
                  "foreground": "#f472b6"
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
],
  },

  // ☀️ Clean Minimalist Light
  {
    id: "clean-light",
    name: "\u2600\ufe0f Clean Minimalist Light",
    description: "Crisp, modern, high-clarity daytime light theme with soft slate backgrounds and indigo accents.",
    type: "light",
    accentColor: "#4f46e5",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#64748b",
      "icon.foreground": "#4f46e5",
      "editor.background": "#ffffff",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#64748b",
      "editorLineNumber.activeForeground": "#4f46e5",
      "editorCursor.foreground": "#4f46e5",
      "editor.selectionBackground": "#f8fafc",
      "editor.lineHighlightBackground": "#f8fafc",
      "editorHoverWidget.background": "#f8fafc",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#f8fafc",
      "editorHoverWidget.statusBarBackground": "#f8fafc",
      "editorSuggestWidget.background": "#f8fafc",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#f8fafc",
      "editorSuggestWidget.selectedBackground": "#f8fafc",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#4f46e5",
      "editorWidget.background": "#f8fafc",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#f8fafc",
      "focusBorder": "#4f46e5",
      "activityBar.background": "#f1f5f9",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#4f46e5",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f8fafc",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#f8fafc",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#f1f5f9",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#f1f5f9",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#4f46e5",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f8fafc",
      "tab.activeBackground": "#ffffff",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#4f46e5",
      "tab.inactiveBackground": "#f8fafc",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#f8fafc",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#ffffff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#4f46e5",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#0284c7",
      "terminal.ansiYellow": "#047857",
      "input.background": "#f1f5f9",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#ffffff",
      "panel.border": "#f8fafc",
      "panelTitle.activeForeground": "#4f46e5",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#4f46e5",
      "chat.requestBackground": "#f1f5f9",
      "chat.requestBorder": "#f8fafc",
      "interactive.requestBackground": "#f1f5f9",
      "textCodeBlock.background": "#f8fafc",
      "textLink.foreground": "#4f46e5",
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
],
  },

  // 🌸 Cherry Blossom Sakura Light
  {
    id: "sakura-blossom",
    name: "\ud83c\udf38 Cherry Blossom Sakura Light",
    description: "Japanese springtime sakura petals, soft blush rose, polished jade, and delicate ivory.",
    type: "light",
    accentColor: "#db2777",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#9d174d",
      "icon.foreground": "#db2777",
      "editor.background": "#fff5f7",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#9d174d",
      "editorLineNumber.activeForeground": "#db2777",
      "editorCursor.foreground": "#db2777",
      "editor.selectionBackground": "#fce7f3",
      "editor.lineHighlightBackground": "#fce7f3",
      "editorHoverWidget.background": "#fdf2f8",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fce7f3",
      "editorHoverWidget.statusBarBackground": "#fce7f3",
      "editorSuggestWidget.background": "#fdf2f8",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fce7f3",
      "editorSuggestWidget.selectedBackground": "#fce7f3",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#db2777",
      "editorWidget.background": "#fdf2f8",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fce7f3",
      "focusBorder": "#db2777",
      "activityBar.background": "#fce7f3",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#db2777",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#fdf2f8",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fce7f3",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fce7f3",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fce7f3",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#db2777",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fdf2f8",
      "tab.activeBackground": "#fff5f7",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#db2777",
      "tab.inactiveBackground": "#fce7f3",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fce7f3",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fff5f7",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#db2777",
      "terminal.ansiGreen": "#047857",
      "terminal.ansiCyan": "#7e22ce",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#fdf2f8",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fff5f7",
      "panel.border": "#fdf2f8",
      "panelTitle.activeForeground": "#db2777",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#db2777",
      "chat.requestBackground": "#fdf2f8",
      "chat.requestBorder": "#fce7f3",
      "interactive.requestBackground": "#fdf2f8",
      "textCodeBlock.background": "#fce7f3",
      "textLink.foreground": "#db2777",
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
],
  },

  // 🍧 Cotton Candy Pastel Light
  {
    id: "cotton-candy",
    name: "\ud83c\udf67 Cotton Candy Pastel Light",
    description: "Playful, joyful pastel carnival tones of spun pink sugar, baby blue sky, and lavender.",
    type: "light",
    accentColor: "#ec4899",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#7e22ce",
      "icon.foreground": "#ec4899",
      "editor.background": "#faf5ff",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#7e22ce",
      "editorLineNumber.activeForeground": "#ec4899",
      "editorCursor.foreground": "#ec4899",
      "editor.selectionBackground": "#e9d5ff",
      "editor.lineHighlightBackground": "#e9d5ff",
      "editorHoverWidget.background": "#f3e8ff",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#e9d5ff",
      "editorHoverWidget.statusBarBackground": "#e9d5ff",
      "editorSuggestWidget.background": "#f3e8ff",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#e9d5ff",
      "editorSuggestWidget.selectedBackground": "#e9d5ff",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#ec4899",
      "editorWidget.background": "#f3e8ff",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#e9d5ff",
      "focusBorder": "#ec4899",
      "activityBar.background": "#e9d5ff",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#ec4899",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f3e8ff",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#e9d5ff",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#e9d5ff",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#e9d5ff",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#9333ea",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f3e8ff",
      "tab.activeBackground": "#faf5ff",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#ec4899",
      "tab.inactiveBackground": "#e9d5ff",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#e9d5ff",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#faf5ff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#ec4899",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#6d28d9",
      "terminal.ansiYellow": "#047857",
      "input.background": "#f3e8ff",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#faf5ff",
      "panel.border": "#f3e8ff",
      "panelTitle.activeForeground": "#ec4899",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#ec4899",
      "chat.requestBackground": "#f3e8ff",
      "chat.requestBorder": "#e9d5ff",
      "interactive.requestBackground": "#f3e8ff",
      "textCodeBlock.background": "#e9d5ff",
      "textLink.foreground": "#ec4899",
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
],
  },

  // 🕊️ Ghost White Minimal
  {
    id: "ghost-white",
    name: "\ud83d\udd4a\ufe0f Ghost White Minimal",
    description: "Ultra clean pure white canvas #ffffff with crisp graphite typography and slate accents.",
    type: "light",
    accentColor: "#0f172a",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#64748b",
      "icon.foreground": "#0f172a",
      "editor.background": "#ffffff",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#64748b",
      "editorLineNumber.activeForeground": "#0f172a",
      "editorCursor.foreground": "#0f172a",
      "editor.selectionBackground": "#f1f5f9",
      "editor.lineHighlightBackground": "#f1f5f9",
      "editorHoverWidget.background": "#f8fafc",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#f1f5f9",
      "editorHoverWidget.statusBarBackground": "#f1f5f9",
      "editorSuggestWidget.background": "#f8fafc",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#f1f5f9",
      "editorSuggestWidget.selectedBackground": "#f1f5f9",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#0f172a",
      "editorWidget.background": "#f8fafc",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#f1f5f9",
      "focusBorder": "#0f172a",
      "activityBar.background": "#f1f5f9",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#0f172a",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f8fafc",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#f1f5f9",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#f1f5f9",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#f1f5f9",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#0f172a",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f8fafc",
      "tab.activeBackground": "#ffffff",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#0f172a",
      "tab.inactiveBackground": "#f1f5f9",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#f1f5f9",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#ffffff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#0f172a",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#334155",
      "terminal.ansiYellow": "#047857",
      "input.background": "#f8fafc",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#ffffff",
      "panel.border": "#f8fafc",
      "panelTitle.activeForeground": "#0f172a",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#0f172a",
      "chat.requestBackground": "#f8fafc",
      "chat.requestBorder": "#f1f5f9",
      "interactive.requestBackground": "#f8fafc",
      "textCodeBlock.background": "#f1f5f9",
      "textLink.foreground": "#0f172a",
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
],
  },

  // 🍦 Vanilla Bean Soft Light
  {
    id: "vanilla-bean",
    name: "\ud83c\udf66 Vanilla Bean Soft Light",
    description: "Gentle soothing custard cream and warm vanilla bean with deep charcoal ink.",
    type: "light",
    accentColor: "#ca8a04",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#78716c",
      "icon.foreground": "#ca8a04",
      "editor.background": "#fefdf8",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#78716c",
      "editorLineNumber.activeForeground": "#ca8a04",
      "editorCursor.foreground": "#ca8a04",
      "editor.selectionBackground": "#f5f0db",
      "editor.lineHighlightBackground": "#f5f0db",
      "editorHoverWidget.background": "#fbf8ee",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#f5f0db",
      "editorHoverWidget.statusBarBackground": "#f5f0db",
      "editorSuggestWidget.background": "#fbf8ee",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#f5f0db",
      "editorSuggestWidget.selectedBackground": "#f5f0db",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#ca8a04",
      "editorWidget.background": "#fbf8ee",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#f5f0db",
      "focusBorder": "#ca8a04",
      "activityBar.background": "#f5f0db",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#ca8a04",
      "activityBarBadge.foreground": "#000000",
      "sideBar.background": "#fbf8ee",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#f5f0db",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#f5f0db",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#f5f0db",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#78350f",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fbf8ee",
      "tab.activeBackground": "#fefdf8",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#ca8a04",
      "tab.inactiveBackground": "#f5f0db",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#f5f0db",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fefdf8",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#ca8a04",
      "terminal.ansiGreen": "#047857",
      "terminal.ansiCyan": "#3730a3",
      "terminal.ansiYellow": "#7c2d12",
      "input.background": "#fbf8ee",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fefdf8",
      "panel.border": "#fbf8ee",
      "panelTitle.activeForeground": "#ca8a04",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#ca8a04",
      "chat.requestBackground": "#fbf8ee",
      "chat.requestBorder": "#f5f0db",
      "interactive.requestBackground": "#fbf8ee",
      "textCodeBlock.background": "#f5f0db",
      "textLink.foreground": "#ca8a04",
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
],
  },

  // 🍑 Peach Bellini Light
  {
    id: "peach-bellini",
    name: "\ud83c\udf51 Peach Bellini Light",
    description: "Sun-ripened orchard peaches, prosecco bubbles, coral nectar, and sparkling apricot.",
    type: "light",
    accentColor: "#ea580c",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#9a3412",
      "icon.foreground": "#ea580c",
      "editor.background": "#fff7ed",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#9a3412",
      "editorLineNumber.activeForeground": "#ea580c",
      "editorCursor.foreground": "#ea580c",
      "editor.selectionBackground": "#fed7aa",
      "editor.lineHighlightBackground": "#fed7aa",
      "editorHoverWidget.background": "#ffedd5",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fed7aa",
      "editorHoverWidget.statusBarBackground": "#fed7aa",
      "editorSuggestWidget.background": "#ffedd5",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fed7aa",
      "editorSuggestWidget.selectedBackground": "#fed7aa",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#ea580c",
      "editorWidget.background": "#ffedd5",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fed7aa",
      "focusBorder": "#ea580c",
      "activityBar.background": "#fed7aa",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#ea580c",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#ffedd5",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fed7aa",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fed7aa",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fed7aa",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#ea580c",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#ffedd5",
      "tab.activeBackground": "#fff7ed",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#ea580c",
      "tab.inactiveBackground": "#fed7aa",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fed7aa",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#fff7ed",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#ea580c",
      "terminal.ansiGreen": "#be185d",
      "terminal.ansiCyan": "#6d28d9",
      "terminal.ansiYellow": "#15803d",
      "input.background": "#ffedd5",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#fff7ed",
      "panel.border": "#ffedd5",
      "panelTitle.activeForeground": "#ea580c",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#ea580c",
      "chat.requestBackground": "#ffedd5",
      "chat.requestBorder": "#fed7aa",
      "interactive.requestBackground": "#ffedd5",
      "textCodeBlock.background": "#fed7aa",
      "textLink.foreground": "#ea580c",
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
],
  },

  // 🪻 Lavender Mist Light
  {
    id: "lavender-mist",
    name: "\ud83e\udebb Lavender Mist Light",
    description: "Proven\u00e7al lavender fields at dawn, morning dew, soft purple blossoms and slate.",
    type: "light",
    accentColor: "#7c3aed",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#6b21a8",
      "icon.foreground": "#7c3aed",
      "editor.background": "#faf5ff",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#6b21a8",
      "editorLineNumber.activeForeground": "#7c3aed",
      "editorCursor.foreground": "#7c3aed",
      "editor.selectionBackground": "#e9d5ff",
      "editor.lineHighlightBackground": "#e9d5ff",
      "editorHoverWidget.background": "#f3e8ff",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#e9d5ff",
      "editorHoverWidget.statusBarBackground": "#e9d5ff",
      "editorSuggestWidget.background": "#f3e8ff",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#e9d5ff",
      "editorSuggestWidget.selectedBackground": "#e9d5ff",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#7c3aed",
      "editorWidget.background": "#f3e8ff",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#e9d5ff",
      "focusBorder": "#7c3aed",
      "activityBar.background": "#e9d5ff",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#7c3aed",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#f3e8ff",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#e9d5ff",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#e9d5ff",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#e9d5ff",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#7c3aed",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#f3e8ff",
      "tab.activeBackground": "#faf5ff",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#7c3aed",
      "tab.inactiveBackground": "#e9d5ff",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#e9d5ff",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#faf5ff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#7c3aed",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#be185d",
      "terminal.ansiYellow": "#047857",
      "input.background": "#f3e8ff",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#faf5ff",
      "panel.border": "#f3e8ff",
      "panelTitle.activeForeground": "#7c3aed",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#7c3aed",
      "chat.requestBackground": "#f3e8ff",
      "chat.requestBorder": "#e9d5ff",
      "interactive.requestBackground": "#f3e8ff",
      "textCodeBlock.background": "#e9d5ff",
      "textLink.foreground": "#7c3aed",
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
],
  },

  // 🫧 Mint Sorbet Light
  {
    id: "mint-sorbet",
    name: "\ud83e\udee7 Mint Sorbet Light",
    description: "Chilled spearmint sorbet, eucalyptus mist, crisp seafoam and clean jade contrast.",
    type: "light",
    accentColor: "#059669",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#15803d",
      "icon.foreground": "#059669",
      "editor.background": "#f0fdf4",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#15803d",
      "editorLineNumber.activeForeground": "#059669",
      "editorCursor.foreground": "#059669",
      "editor.selectionBackground": "#bbf7d0",
      "editor.lineHighlightBackground": "#bbf7d0",
      "editorHoverWidget.background": "#dcfce7",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#bbf7d0",
      "editorHoverWidget.statusBarBackground": "#bbf7d0",
      "editorSuggestWidget.background": "#dcfce7",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#bbf7d0",
      "editorSuggestWidget.selectedBackground": "#bbf7d0",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#059669",
      "editorWidget.background": "#dcfce7",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#bbf7d0",
      "focusBorder": "#059669",
      "activityBar.background": "#bbf7d0",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#059669",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#dcfce7",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#bbf7d0",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#bbf7d0",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#bbf7d0",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#059669",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#dcfce7",
      "tab.activeBackground": "#f0fdf4",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#059669",
      "tab.inactiveBackground": "#bbf7d0",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#bbf7d0",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#f0fdf4",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#059669",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#6d28d9",
      "terminal.ansiYellow": "#b45309",
      "input.background": "#dcfce7",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#f0fdf4",
      "panel.border": "#dcfce7",
      "panelTitle.activeForeground": "#059669",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#059669",
      "chat.requestBackground": "#dcfce7",
      "chat.requestBorder": "#bbf7d0",
      "interactive.requestBackground": "#dcfce7",
      "textCodeBlock.background": "#bbf7d0",
      "textLink.foreground": "#059669",
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
],
  },

  // 🎮 1989 Dot Matrix Handheld
  {
    id: "gameboy-classic",
    name: "\ud83c\udfae 1989 Dot Matrix Handheld",
    description: "Nostalgic retro 4-shade olive green monochrome LCD matrix from the golden era of 8-bit portable gaming.",
    type: "light",
    accentColor: "#306230",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#306230",
      "icon.foreground": "#306230",
      "editor.background": "#9bbc0f",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#306230",
      "editorLineNumber.activeForeground": "#306230",
      "editorCursor.foreground": "#306230",
      "editor.selectionBackground": "#8bac0f",
      "editor.lineHighlightBackground": "#8bac0f",
      "editorHoverWidget.background": "#8bac0f",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#8bac0f",
      "editorHoverWidget.statusBarBackground": "#8bac0f",
      "editorSuggestWidget.background": "#8bac0f",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#8bac0f",
      "editorSuggestWidget.selectedBackground": "#8bac0f",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#306230",
      "editorWidget.background": "#8bac0f",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#8bac0f",
      "focusBorder": "#306230",
      "activityBar.background": "#8bac0f",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#306230",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#8bac0f",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#8bac0f",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#8bac0f",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#8bac0f",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#306230",
      "statusBar.foreground": "#9bbc0f",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#8bac0f",
      "tab.activeBackground": "#9bbc0f",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#306230",
      "tab.inactiveBackground": "#8bac0f",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#8bac0f",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#9bbc0f",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#306230",
      "terminal.ansiGreen": "#306230",
      "terminal.ansiCyan": "#306230",
      "terminal.ansiYellow": "#0f380f",
      "input.background": "#8bac0f",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#9bbc0f",
      "panel.border": "#8bac0f",
      "panelTitle.activeForeground": "#306230",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#306230",
      "chat.requestBackground": "#8bac0f",
      "chat.requestBorder": "#8bac0f",
      "interactive.requestBackground": "#8bac0f",
      "textCodeBlock.background": "#8bac0f",
      "textLink.foreground": "#306230",
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
],
  },

  // 🧱 Lego Master Builder
  {
    id: "lego-bricks",
    name: "\ud83e\uddf1 Lego Master Builder",
    description: "Iconic toy brick primary colors with bright plastic yellow, vibrant fire red, and royal blue studs.",
    type: "light",
    accentColor: "#dc2626",
    colors: {
      "foreground": "#000000",
      "descriptionForeground": "#666666",
      "disabledForeground": "#64748b",
      "icon.foreground": "#dc2626",
      "editor.background": "#ffffff",
      "editor.foreground": "#000000",
      "editorLineNumber.foreground": "#64748b",
      "editorLineNumber.activeForeground": "#dc2626",
      "editorCursor.foreground": "#dc2626",
      "editor.selectionBackground": "#fee2e2",
      "editor.lineHighlightBackground": "#fee2e2",
      "editorHoverWidget.background": "#fef08a",
      "editorHoverWidget.foreground": "#000000",
      "editorHoverWidget.border": "#fee2e2",
      "editorHoverWidget.statusBarBackground": "#fee2e2",
      "editorSuggestWidget.background": "#fef08a",
      "editorSuggestWidget.foreground": "#000000",
      "editorSuggestWidget.border": "#fee2e2",
      "editorSuggestWidget.selectedBackground": "#fee2e2",
      "editorSuggestWidget.selectedForeground": "#000000",
      "editorSuggestWidget.highlightForeground": "#dc2626",
      "editorWidget.background": "#fef08a",
      "editorWidget.foreground": "#000000",
      "editorWidget.border": "#fee2e2",
      "focusBorder": "#dc2626",
      "activityBar.background": "#fde047",
      "activityBar.foreground": "#000000",
      "activityBar.inactiveForeground": "#666666",
      "activityBarBadge.background": "#dc2626",
      "activityBarBadge.foreground": "#ffffff",
      "sideBar.background": "#fef08a",
      "sideBar.foreground": "#000000",
      "sideBarTitle.foreground": "#000000",
      "sideBarSectionHeader.background": "#fee2e2",
      "sideBarSectionHeader.foreground": "#000000",
      "titleBar.activeBackground": "#fde047",
      "titleBar.activeForeground": "#000000",
      "titleBar.inactiveBackground": "#fde047",
      "titleBar.inactiveForeground": "#555555",
      "statusBar.background": "#2563eb",
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingBackground": "#e11d48",
      "editorGroupHeader.tabsBackground": "#fef08a",
      "tab.activeBackground": "#ffffff",
      "tab.activeForeground": "#000000",
      "tab.activeBorderTop": "#dc2626",
      "tab.inactiveBackground": "#fee2e2",
      "tab.inactiveForeground": "#444444",
      "tab.hoverBackground": "#fee2e2",
      "breadcrumb.foreground": "#666666",
      "terminal.background": "#ffffff",
      "terminal.foreground": "#000000",
      "terminalCursor.foreground": "#dc2626",
      "terminal.ansiGreen": "#1d4ed8",
      "terminal.ansiCyan": "#b45309",
      "terminal.ansiYellow": "#15803d",
      "input.background": "#fef9c3",
      "input.foreground": "#000000",
      "input.placeholderForeground": "#666666",
      "panel.background": "#ffffff",
      "panel.border": "#fef08a",
      "panelTitle.activeForeground": "#dc2626",
      "panelTitle.inactiveForeground": "#666666",
      "panelTitle.activeBorder": "#dc2626",
      "chat.requestBackground": "#fef9c3",
      "chat.requestBorder": "#fee2e2",
      "interactive.requestBackground": "#fef9c3",
      "textCodeBlock.background": "#fee2e2",
      "textLink.foreground": "#dc2626",
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
],
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
      "editor.foreground": "#e2e8f0",
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
      "terminal.foreground": "#e2e8f0",
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
      "interactive.requestBackground": "#1e2f4f",
      "textCodeBlock.background": "#1e2f4f",
      "textLink.foreground": "#38bdf8",
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
],
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
      "editor.foreground": "#fff1e6",
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
      "terminal.foreground": "#fff1e6",
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
      "interactive.requestBackground": "#2a1c0e",
      "textCodeBlock.background": "#26190c",
      "textLink.foreground": "#ff7700",
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
],
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
      "editor.foreground": "#e8f5e9",
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
      "terminal.foreground": "#e8f5e9",
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
      "interactive.requestBackground": "#153027",
      "textCodeBlock.background": "#132b23",
      "textLink.foreground": "#ffd43b",
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
],
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
      "editor.foreground": "#f5ece7",
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
      "terminal.foreground": "#f5ece7",
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
      "interactive.requestBackground": "#2a221e",
      "textCodeBlock.background": "#261e1a",
      "textLink.foreground": "#f74c00",
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
],
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
      "interactive.requestBackground": "#2a2a32",
      "textCodeBlock.background": "#24242a",
      "textLink.foreground": "#facc15",
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
],
  },
];
