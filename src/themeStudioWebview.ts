import * as vscode from 'vscode';
import { UI_COLOR_DEFINITIONS, SYNTAX_SCOPE_DEFINITIONS, THEME_PRESETS } from './presets';
import { ThemeEngine } from './themeEngine';
import { ProfileManager } from './profileManager';
import { ThemePreset, TokenRule } from './types';

export class ThemeStudioWebview {
  public static currentPanel: ThemeStudioWebview | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (ThemeStudioWebview.currentPanel) {
      ThemeStudioWebview.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'simplesignalThemeStudio',
      '🎨 SimpleSignal Theme Studio',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
      }
    );

    ThemeStudioWebview.currentPanel = new ThemeStudioWebview(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        try {
          switch (message.command) {
            case 'applyLiveColor':
              if (message.key && message.value) {
                await ThemeEngine.applySingleColor(message.key, message.value);
              }
              break;

            case 'applyFullTheme':
              if (message.colors) {
                await ThemeEngine.applyTheme(message.colors, message.tokenColors, message.profileName);
                vscode.window.showInformationMessage(`✨ Applied "${message.profileName || 'Custom Theme'}" to VS Code!`);
              }
              break;

            case 'applyPreset':
              const preset = THEME_PRESETS.find((p) => p.id === message.presetId);
              if (preset) {
                await ThemeEngine.applyPreset(preset);
                vscode.window.showInformationMessage(`✨ Loaded and applied "${preset.name}"!`);
                this._update();
              }
              break;

            case 'saveProfile':
              if (message.name && message.colors) {
                await ProfileManager.saveProfile(message.name, message.colors, message.tokenColors || [], message.type || 'dark');
                vscode.window.showInformationMessage(`💾 Saved profile "${message.name}"!`);
                this._update();
              }
              break;

            case 'deleteProfile':
              if (message.id) {
                await ProfileManager.deleteProfile(message.id);
                vscode.window.showInformationMessage('🗑️ Deleted profile.');
                this._update();
              }
              break;

            case 'resetTheme':
              await ThemeEngine.resetTheme();
              vscode.window.showInformationMessage('🔄 Reset theme to default.');
              this._update();
              break;

            case 'copyJson':
              if (message.colors) {
                const jsonStr = ThemeEngine.exportAsSettingsJson(message.colors, message.tokenColors);
                await vscode.env.clipboard.writeText(jsonStr);
                vscode.window.showInformationMessage('📋 Copied theme settings JSON to clipboard!');
              }
              break;
          }
        } catch (err: any) {
          vscode.window.showErrorMessage(`Theme Studio Error: ${err.message || err}`);
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    ThemeStudioWebview.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }

  private _update() {
    const webview = this._panel.webview;
    this._panel.title = '🎨 Theme Studio';
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const currentColors = ThemeEngine.getCurrentColors();
    const currentTokens = ThemeEngine.getCurrentTokenColors();
    const savedProfiles = ProfileManager.getProfiles();
    const activeProfileName = vscode.workspace.getConfiguration('simpletheme').get<string>('activeProfile', 'Cyberpunk Neon');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SimpleSignal Theme Studio</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background, #0b0c10);
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --text: var(--vscode-editor-foreground, #f0f0f8);
      --text-muted: #8a8d9b;
      --accent: var(--vscode-focusBorder, #ffe600);
      --accent-glow: rgba(255, 230, 0, 0.25);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 20px 24px 60px;
      font-size: 13px;
      line-height: 1.5;
      overflow-x: hidden;
    }

    /* Header Bar */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 14px;
    }

    .header-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-icon {
      width: 32px;
      height: 32px;
      color: var(--accent);
    }

    .header-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .profile-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      background: rgba(255, 230, 0, 0.12);
      color: var(--accent);
      border: 1px solid rgba(255, 230, 0, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--card-border);
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-primary {
      background: var(--accent);
      color: #000000;
      border-color: var(--accent);
      font-weight: 700;
      box-shadow: 0 0 12px var(--accent-glow);
    }

    .btn-primary:hover {
      opacity: 0.9;
      box-shadow: 0 0 18px var(--accent-glow);
    }

    .btn-danger {
      color: #ff5252;
      border-color: rgba(255, 82, 82, 0.3);
    }

    .btn-danger:hover {
      background: rgba(255, 82, 82, 0.15);
      border-color: #ff5252;
    }

    /* Main 2-Column Studio Grid */
    .studio-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 24px;
      align-items: start;
    }

    @media (max-width: 1080px) {
      .studio-layout { grid-template-columns: 1fr; }
    }

    /* Navigation Tabs */
    .nav-tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 8px;
    }

    .nav-tab {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      color: var(--text-muted);
      border: 1px solid transparent;
      background: transparent;
      transition: all 0.15s ease;
    }

    .nav-tab:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.04);
    }

    .nav-tab.active {
      color: #000;
      background: var(--accent);
      border-color: var(--accent);
      font-weight: 700;
    }

    /* Search & Filter Bar */
    .filter-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 180px;
      padding: 7px 12px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      color: var(--text);
      font-size: 12px;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 8px var(--accent-glow);
    }

    .pill-filters {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .pill {
      padding: 4px 10px;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      transition: all 0.12s;
    }

    .pill:hover, .pill.active {
      background: rgba(255, 230, 0, 0.12);
      border-color: var(--accent);
      color: var(--accent);
    }

    /* Color Grid Cards */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
    }

    .color-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 10px 12px;
      transition: all 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .color-card:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .color-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .color-name {
      font-weight: 700;
      font-size: 12px;
      color: var(--text);
    }

    .color-category-badge {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-muted);
    }

    .color-desc {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.3;
    }

    .color-input-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
    }

    .color-picker {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: transparent;
      padding: 0;
    }

    .color-picker::-webkit-color-swatch-wrapper { padding: 0; }
    .color-picker::-webkit-color-swatch {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
    }

    .hex-input {
      flex: 1;
      padding: 5px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--card-border);
      color: var(--text);
      font-family: monospace;
      font-size: 11px;
      text-transform: uppercase;
    }

    .hex-input:focus {
      border-color: var(--accent);
      outline: none;
    }

    /* Preset Cards */
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 14px;
    }

    .preset-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .preset-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .preset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .preset-title {
      font-weight: 800;
      font-size: 14px;
      color: var(--text);
    }

    .palette-swatches {
      display: flex;
      height: 22px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .swatch {
      flex: 1;
      height: 100%;
    }

    /* Mock Editor Preview Panel */
    .preview-sticky {
      position: sticky;
      top: 20px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    }

    .preview-header-bar {
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid var(--card-border);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-muted);
    }

    .mock-window {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 11px;
      display: flex;
      flex-direction: column;
      min-height: 480px;
      background: #1e1e1e;
      transition: background 0.15s ease;
    }

    .mock-titlebar {
      height: 24px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      font-weight: 600;
      user-select: none;
    }

    .mock-window-dots {
      display: flex;
      gap: 5px;
    }

    .mock-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    .mock-body {
      display: flex;
      flex: 1;
    }

    .mock-activitybar {
      width: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      gap: 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    .mock-sidebar {
      width: 110px;
      padding: 8px;
      font-size: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    .mock-editor-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .mock-tabsbar {
      height: 26px;
      display: flex;
      align-items: center;
    }

    .mock-tab {
      height: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    .mock-code-canvas {
      flex: 1;
      padding: 10px;
      line-height: 1.6;
      white-space: pre;
      overflow: hidden;
    }

    .mock-statusbar {
      height: 20px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9px;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <!-- Top Header Bar -->
  <div class="header">
    <div class="header-title-group">
      <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.2 0 2.2-.98 2.2-2.2 0-.58-.23-1.1-.6-1.48-.36-.37-.58-.88-.58-1.42 0-1.12.9-2.02 2.02-2.02H16c3.31 0 6-2.69 6-6 0-4.97-4.48-8.88-10-8.88z" fill="currentColor" fill-opacity="0.15"/>
        <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
        <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
        <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
        <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
      </svg>
      <div>
        <div class="header-title">
          SimpleSignal Theme Studio
          <span class="profile-pill" id="activeProfileLabel">${activeProfileName}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">Visual Live Theme Customizer & Syntax Designer</div>
      </div>
    </div>

    <div class="toolbar">
      <button class="btn btn-primary" id="btnApplyAll">✨ Apply to VS Code</button>
      <button class="btn" id="btnSaveProfile">💾 Save Profile</button>
      <button class="btn" id="btnExportJson">📋 Export JSON</button>
      <button class="btn btn-danger" id="btnResetTheme">🔄 Reset Default</button>
    </div>
  </div>

  <!-- Studio 2-Column Layout -->
  <div class="studio-layout">
    
    <!-- Left Column: Tabs & Control Center -->
    <div class="main-column">
      
      <!-- Nav Tabs -->
      <div class="nav-tabs">
        <button class="nav-tab active" data-tab="tab-ui">🎨 UI Colors</button>
        <button class="nav-tab" data-tab="tab-syntax">⚡ Syntax Tokens</button>
        <button class="nav-tab" data-tab="tab-presets">🌟 Presets Library</button>
        <button class="nav-tab" data-tab="tab-profiles">📁 Saved Profiles (${savedProfiles.length})</button>
      </div>

      <!-- Tab 1: UI Colors -->
      <div id="tab-ui" class="tab-pane">
        <div class="filter-bar">
          <input type="text" class="search-input" id="uiSearchInput" placeholder="🔍 Filter UI colors (e.g. editor, sidebar, tab, cursor)..." />
          <div class="pill-filters">
            <span class="pill active" data-category="all">All</span>
            <span class="pill" data-category="core">Core Editor</span>
            <span class="pill" data-category="bars">Bars & Headers</span>
            <span class="pill" data-category="tabs">Tabs & Nav</span>
            <span class="pill" data-category="terminal">Terminal</span>
            <span class="pill" data-category="chat">Chat & AI</span>
          </div>
        </div>

        <div class="color-grid" id="uiColorGrid">
          ${UI_COLOR_DEFINITIONS.map((def) => {
            const val = currentColors[def.id] || def.defaultValue;
            return `
            <div class="color-card" data-id="${def.id}" data-category="${def.category}" data-name="${def.name.toLowerCase()} ${def.id.toLowerCase()}">
              <div class="color-card-header">
                <span class="color-name">${def.name}</span>
                <span class="color-category-badge">${def.category}</span>
              </div>
              <div class="color-desc">${def.description}</div>
              <div class="color-input-row">
                <input type="color" class="color-picker" data-target="${def.id}" value="${val.length === 7 ? val : '#1e1e1e'}" />
                <input type="text" class="hex-input" data-target="${def.id}" value="${val}" />
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Tab 2: Syntax Highlight Tokens -->
      <div id="tab-syntax" class="tab-pane" style="display: none;">
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          Customize code syntax highlighting across all programming languages (TypeScript, Python, Luau, JavaScript, Rust, C++, HTML).
        </div>
        <div class="color-grid" id="syntaxGrid">
          ${SYNTAX_SCOPE_DEFINITIONS.map((item) => {
            // Check if existing textMateRule matches
            const rule = currentTokens.find((r) => Array.isArray(r.scope) ? r.scope.includes(item.scopes[0]) : r.scope === item.scopes[0]);
            const val = rule?.settings?.foreground || item.defaultColor;
            return `
            <div class="color-card" data-syntax-id="${item.id}">
              <div class="color-card-header">
                <span class="color-name">${item.name}</span>
                <span class="color-category-badge">Syntax</span>
              </div>
              <div class="color-desc">${item.description}</div>
              <div class="color-input-row">
                <input type="color" class="color-picker syntax-color-picker" data-syntax-id="${item.id}" value="${val.length === 7 ? val : item.defaultColor}" />
                <input type="text" class="hex-input syntax-hex-input" data-syntax-id="${item.id}" value="${val}" />
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Tab 3: Presets Library -->
      <div id="tab-presets" class="tab-pane" style="display: none;">
        <div class="filter-bar" style="margin-bottom: 14px;">
          <input type="text" class="search-input" id="presetSearchInput" placeholder="🔍 Search presets (e.g. lemonade, solarized, warm, cyberpunk)..." />
          <div class="pill-filters">
            <span class="pill preset-pill active" data-preset-type="all">⚡ All (${THEME_PRESETS.length})</span>
            <span class="pill preset-pill" data-preset-type="dark">🌙 Dark (${THEME_PRESETS.filter((p) => p.type === 'dark').length})</span>
            <span class="pill preset-pill" data-preset-type="light">☀️ Light (${THEME_PRESETS.filter((p) => p.type === 'light').length})</span>
          </div>
        </div>
        <div class="preset-grid" id="presetGrid">
          ${THEME_PRESETS.map((preset) => {
            const bg = preset.colors['editor.background'] || '#1e1e1e';
            const fg = preset.colors['editor.foreground'] || '#d4d4d4';
            const sb = preset.colors['sideBar.background'] || '#252526';
            const tab = preset.colors['tab.activeBackground'] || '#1e1e1e';
            const act = preset.accentColor || '#ffe600';
            return `
            <div class="preset-card" data-preset-id="${preset.id}" data-preset-type="${preset.type}" data-preset-name="${preset.name.toLowerCase()} ${preset.description.toLowerCase()}">
              <div class="preset-header">
                <span class="preset-title">${preset.name}</span>
                <span class="color-category-badge">${preset.type.toUpperCase()}</span>
              </div>
              <div class="color-desc">${preset.description}</div>
              <div class="palette-swatches">
                <div class="swatch" style="background: ${bg};" title="Editor BG: ${bg}"></div>
                <div class="swatch" style="background: ${sb};" title="Sidebar BG: ${sb}"></div>
                <div class="swatch" style="background: ${tab};" title="Active Tab: ${tab}"></div>
                <div class="swatch" style="background: ${act};" title="Accent: ${act}"></div>
                <div class="swatch" style="background: ${fg};" title="Text: ${fg}"></div>
              </div>
              <button class="btn btn-primary" style="margin-top: 4px; justify-content: center;" onclick="loadPreset('${preset.id}')">⚡ Load & Apply</button>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Tab 4: Saved Profiles -->
      <div id="tab-profiles" class="tab-pane" style="display: none;">
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          Your personalized saved theme profiles.
        </div>
        <div class="preset-grid">
          ${savedProfiles.length === 0 ? `
            <div style="grid-column: 1 / -1; padding: 30px; text-align: center; color: var(--text-muted); background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 8px;">
              No saved custom profiles yet. Tweak colors and click "💾 Save Profile" above!
            </div>` : ''}
          ${savedProfiles.map((p) => `
            <div class="preset-card">
              <div class="preset-header">
                <span class="preset-title">${p.name}</span>
                <span class="color-category-badge">${new Date(p.updatedAt).toLocaleDateString()}</span>
              </div>
              <div class="color-desc">${Object.keys(p.colors).length} customized UI colors</div>
              <div style="display: flex; gap: 6px; margin-top: 8px;">
                <button class="btn btn-primary" style="flex: 1; justify-content: center;" onclick="loadProfile('${p.id}')">⚡ Load</button>
                <button class="btn btn-danger" onclick="deleteProfile('${p.id}')">🗑️</button>
              </div>
            </div>`).join('')}
        </div>
      </div>

    </div>

    <!-- Right Column: Live Mock VS Code Preview -->
    <div class="preview-sticky">
      <div class="preview-header-bar">
        <span>LIVE WORKBENCH PREVIEW</span>
        <span style="font-size: 10px; color: var(--accent);">REAL-TIME</span>
      </div>

      <div class="mock-window" id="mockWindow">
        <!-- Title bar -->
        <div class="mock-titlebar" id="mockTitlebar" style="background: ${currentColors['titleBar.activeBackground'] || '#3c3c3c'}; color: ${currentColors['titleBar.activeForeground'] || '#cccccc'};">
          <div class="mock-window-dots">
            <span class="mock-dot" style="background: #ff5f56;"></span>
            <span class="mock-dot" style="background: #ffbd2e;"></span>
            <span class="mock-dot" style="background: #27c93f;"></span>
          </div>
          <span>SimpleSignal Studio — VS Code</span>
          <span style="opacity: 0.5;">⚡</span>
        </div>

        <div class="mock-body">
          <!-- Activity bar -->
          <div class="mock-activitybar" id="mockActivityBar" style="background: ${currentColors['activityBar.background'] || '#333333'}; color: ${currentColors['activityBar.foreground'] || '#ffffff'};">
            <span style="color: ${currentColors['activityBar.foreground'] || '#ffffff'};">📁</span>
            <span style="opacity: 0.6;">🔍</span>
            <span style="opacity: 0.6;">🌿</span>
            <span style="opacity: 0.6;">⚡</span>
          </div>

          <!-- Sidebar -->
          <div class="mock-sidebar" id="mockSidebar" style="background: ${currentColors['sideBar.background'] || '#252526'}; color: ${currentColors['sideBar.foreground'] || '#cccccc'};">
            <div style="font-weight: 700; color: ${currentColors['sideBarTitle.foreground'] || '#bbbbbb'};">EXPLORER</div>
            <div style="margin-top: 4px;">📂 src</div>
            <div style="padding-left: 10px; color: ${currentColors['focusBorder'] || '#ffe600'};">📄 server.ts</div>
            <div style="padding-left: 10px; opacity: 0.7;">📄 app.css</div>
            <div style="padding-left: 10px; opacity: 0.7;">⚙️ settings.json</div>
          </div>

          <!-- Editor area -->
          <div class="mock-editor-area">
            <!-- Tab bar -->
            <div class="mock-tabsbar" id="mockTabsBar" style="background: ${currentColors['editorGroupHeader.tabsBackground'] || '#252526'};">
              <div class="mock-tab" id="mockActiveTab" style="background: ${currentColors['tab.activeBackground'] || '#1e1e1e'}; color: ${currentColors['tab.activeForeground'] || '#ffffff'}; border-top: 2px solid ${currentColors['tab.activeBorderTop'] || currentColors['focusBorder'] || '#ffe600'};">
                <span>📄 server.ts</span>
              </div>
              <div class="mock-tab" style="background: ${currentColors['tab.inactiveBackground'] || '#2d2d2d'}; color: ${currentColors['tab.inactiveForeground'] || '#858585'}; opacity: 0.75;">
                <span>app.css</span>
              </div>
            </div>

            <!-- Code canvas -->
            <div class="mock-code-canvas" id="mockCanvas" style="background: ${currentColors['editor.background'] || '#1e1e1e'}; color: ${currentColors['editor.foreground'] || '#d4d4d4'};">
<span id="syn-comment" style="color: #6a9955; font-style: italic;">// SimpleSignal Theme Engine</span>
<span id="syn-keyword" style="color: #569cd6; font-weight: bold;">import</span> { <span id="syn-type" style="color: #4ec9b0;">AIModel</span> } <span id="syn-keyword2" style="color: #569cd6; font-weight: bold;">from</span> <span id="syn-string" style="color: #ce9178;">'simplesignal'</span>;

<span id="syn-keyword3" style="color: #569cd6; font-weight: bold;">export async function</span> <span id="syn-func" style="color: #dcdcaa; font-weight: bold;">launchEngine</span>() {
  <span id="syn-keyword4" style="color: #569cd6;">const</span> <span id="syn-var" style="color: #9cdcfe;">speed</span> = <span id="syn-num" style="color: #b5cea8;">120.5</span>;
  <span id="syn-keyword5" style="color: #569cd6;">const</span> <span id="syn-var2" style="color: #9cdcfe;">active</span> = <span id="syn-num2" style="color: #b5cea8;">true</span>;
  <span id="syn-func2" style="color: #dcdcaa;">console</span>.<span id="syn-func3" style="color: #dcdcaa;">log</span>(<span id="syn-string2" style="color: #ce9178;">\`Online: \${speed} TPS\`</span>);
}
            </div>
          </div>
        </div>

        <!-- Status bar -->
        <div class="mock-statusbar" id="mockStatusBar" style="background: ${currentColors['statusBar.background'] || '#007acc'}; color: ${currentColors['statusBar.foreground'] || '#ffffff'};">
          <span>🌿 main* • ⚡ SimpleSignal: Active</span>
          <span>UTF-8 • TypeScript</span>
        </div>
      </div>
    </div>

  </div>

  <script>
    (function() {
      const vscode = acquireVsCodeApi();

      let activeState = {
        colors: ${JSON.stringify(currentColors)},
        syntax: {},
        profileName: ${JSON.stringify(activeProfileName)},
      };

      const PRESETS = ${JSON.stringify(THEME_PRESETS)};
      const SAVED_PROFILES = ${JSON.stringify(savedProfiles)};

      // 1. Tab Switching
      document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const pane = document.getElementById(tabId);
          if (pane) pane.style.display = 'block';
        });
      });

      // 2. Category Filter Pills
      document.querySelectorAll('.pill:not(.preset-pill)').forEach(pill => {
        pill.addEventListener('click', function() {
          document.querySelectorAll('.pill:not(.preset-pill)').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          filterColors();
        });
      });

      // 3. Search Filter
      const searchInput = document.getElementById('uiSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', filterColors);
      }

      function filterColors() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const activePill = document.querySelector('.pill:not(.preset-pill).active');
        const cat = activePill ? activePill.getAttribute('data-category') : 'all';

        document.querySelectorAll('.color-card[data-category]').forEach(card => {
          const cardCat = card.getAttribute('data-category');
          const cardName = card.getAttribute('data-name') || '';
          const matchesCat = cat === 'all' || cardCat === cat;
          const matchesQuery = !query || cardName.includes(query);

          if (matchesCat && matchesQuery) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      // 3b. Preset Type Filter Pills & Search
      document.querySelectorAll('.preset-pill').forEach(pill => {
        pill.addEventListener('click', function() {
          document.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          filterPresets();
        });
      });

      const presetSearchInput = document.getElementById('presetSearchInput');
      if (presetSearchInput) {
        presetSearchInput.addEventListener('input', filterPresets);
      }

      function filterPresets() {
        const query = (presetSearchInput ? presetSearchInput.value : '').toLowerCase().trim();
        const activePill = document.querySelector('.preset-pill.active');
        const type = activePill ? activePill.getAttribute('data-preset-type') : 'all';

        document.querySelectorAll('.preset-card[data-preset-type]').forEach(card => {
          const pType = card.getAttribute('data-preset-type');
          const pName = card.getAttribute('data-preset-name') || '';
          const matchesType = type === 'all' || pType === type;
          const matchesQuery = !query || pName.includes(query);

          if (matchesType && matchesQuery) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      // 4. Color Inputs & Live Sync
      function updateLivePreview(key, val) {
        activeState.colors[key] = val;

        // Update corresponding DOM element in mock window
        if (key === 'editor.background') {
          const canvas = document.getElementById('mockCanvas');
          if (canvas) canvas.style.background = val;
        } else if (key === 'editor.foreground') {
          const canvas = document.getElementById('mockCanvas');
          if (canvas) canvas.style.color = val;
        } else if (key === 'sideBar.background') {
          const sb = document.getElementById('mockSidebar');
          if (sb) sb.style.background = val;
        } else if (key === 'sideBar.foreground') {
          const sb = document.getElementById('mockSidebar');
          if (sb) sb.style.color = val;
        } else if (key === 'activityBar.background') {
          const ab = document.getElementById('mockActivityBar');
          if (ab) ab.style.background = val;
        } else if (key === 'activityBar.foreground') {
          const ab = document.getElementById('mockActivityBar');
          if (ab) ab.style.color = val;
        } else if (key === 'titleBar.activeBackground') {
          const tb = document.getElementById('mockTitlebar');
          if (tb) tb.style.background = val;
        } else if (key === 'titleBar.activeForeground') {
          const tb = document.getElementById('mockTitlebar');
          if (tb) tb.style.color = val;
        } else if (key === 'statusBar.background') {
          const st = document.getElementById('mockStatusBar');
          if (st) st.style.background = val;
        } else if (key === 'statusBar.foreground') {
          const st = document.getElementById('mockStatusBar');
          if (st) st.style.color = val;
        } else if (key === 'tab.activeBackground') {
          const tab = document.getElementById('mockActiveTab');
          if (tab) tab.style.background = val;
        } else if (key === 'tab.activeForeground') {
          const tab = document.getElementById('mockActiveTab');
          if (tab) tab.style.color = val;
        } else if (key === 'tab.activeBorderTop' || key === 'focusBorder') {
          const tab = document.getElementById('mockActiveTab');
          if (tab) tab.style.borderTop = '2px solid ' + val;
        } else if (key === 'editorGroupHeader.tabsBackground') {
          const tb = document.getElementById('mockTabsBar');
          if (tb) tb.style.background = val;
        }
      }

      document.querySelectorAll('.color-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const target = this.getAttribute('data-target');
          const val = this.value;
          const hexInput = document.querySelector('.hex-input[data-target="' + target + '"]');
          if (hexInput) hexInput.value = val;
          updateLivePreview(target, val);
          vscode.postMessage({ command: 'applyLiveColor', key: target, value: val });
        });
      });

      document.querySelectorAll('.hex-input').forEach(input => {
        input.addEventListener('input', function() {
          const target = this.getAttribute('data-target');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7 || val.length === 9)) {
            const picker = document.querySelector('.color-picker[data-target="' + target + '"]');
            if (picker && val.length === 7) picker.value = val;
            updateLivePreview(target, val);
            vscode.postMessage({ command: 'applyLiveColor', key: target, value: val });
          }
        });
      });

      // 5. Syntax Color Live Sync
      function updateSyntaxPreview(id, color) {
        activeState.syntax[id] = color;
        if (id === 'keywords') {
          document.querySelectorAll('#syn-keyword, #syn-keyword2, #syn-keyword3, #syn-keyword4, #syn-keyword5').forEach(el => el.style.color = color);
        } else if (id === 'functions') {
          document.querySelectorAll('#syn-func, #syn-func2, #syn-func3').forEach(el => el.style.color = color);
        } else if (id === 'strings') {
          document.querySelectorAll('#syn-string, #syn-string2').forEach(el => el.style.color = color);
        } else if (id === 'variables') {
          document.querySelectorAll('#syn-var, #syn-var2').forEach(el => el.style.color = color);
        } else if (id === 'types') {
          const el = document.getElementById('syn-type');
          if (el) el.style.color = color;
        } else if (id === 'comments') {
          const el = document.getElementById('syn-comment');
          if (el) el.style.color = color;
        } else if (id === 'numbers') {
          document.querySelectorAll('#syn-num, #syn-num2').forEach(el => el.style.color = color);
        }
      }

      document.querySelectorAll('.syntax-color-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const id = this.getAttribute('data-syntax-id');
          const val = this.value;
          const hexInput = document.querySelector('.syntax-hex-input[data-syntax-id="' + id + '"]');
          if (hexInput) hexInput.value = val;
          updateSyntaxPreview(id, val);
        });
      });

      document.querySelectorAll('.syntax-hex-input').forEach(input => {
        input.addEventListener('input', function() {
          const id = this.getAttribute('data-syntax-id');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7)) {
            const picker = document.querySelector('.syntax-color-picker[data-syntax-id="' + id + '"]');
            if (picker && val.length === 7) picker.value = val;
            updateSyntaxPreview(id, val);
          }
        });
      });

      // 6. Global Action Toolbar Buttons
      document.getElementById('btnApplyAll').addEventListener('click', function() {
        const tokenColors = buildTokenRules();
        vscode.postMessage({
          command: 'applyFullTheme',
          colors: activeState.colors,
          tokenColors: tokenColors,
          profileName: activeState.profileName
        });
      });

      document.getElementById('btnSaveProfile').addEventListener('click', function() {
        const name = prompt('Enter a name for this custom theme profile:', activeState.profileName || 'My Custom Theme');
        if (name && name.trim()) {
          const tokenColors = buildTokenRules();
          vscode.postMessage({
            command: 'saveProfile',
            name: name.trim(),
            colors: activeState.colors,
            tokenColors: tokenColors,
            type: 'dark'
          });
        }
      });

      document.getElementById('btnExportJson').addEventListener('click', function() {
        const tokenColors = buildTokenRules();
        vscode.postMessage({
          command: 'copyJson',
          colors: activeState.colors,
          tokenColors: tokenColors
        });
      });

      document.getElementById('btnResetTheme').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset your VS Code theme customizations back to default?')) {
          vscode.postMessage({ command: 'resetTheme' });
        }
      });

      function buildTokenRules() {
        const rules = [];
        const scopeDefs = ${JSON.stringify(SYNTAX_SCOPE_DEFINITIONS)};
        scopeDefs.forEach(def => {
          const col = activeState.syntax[def.id] || def.defaultColor;
          rules.push({
            scope: def.scopes,
            settings: { foreground: col }
          });
        });
        return rules;
      }

      window.loadPreset = function(presetId) {
        vscode.postMessage({ command: 'applyPreset', presetId: presetId });
      };

      window.loadProfile = function(profileId) {
        const p = SAVED_PROFILES.find(x => x.id === profileId);
        if (p) {
          vscode.postMessage({
            command: 'applyFullTheme',
            colors: p.colors,
            tokenColors: p.tokenColors,
            profileName: p.name
          });
        }
      };

      window.deleteProfile = function(profileId) {
        if (confirm('Delete this saved profile?')) {
          vscode.postMessage({ command: 'deleteProfile', id: profileId });
        }
      };

    })();
  </script>
</body>
</html>`;
  }
}
