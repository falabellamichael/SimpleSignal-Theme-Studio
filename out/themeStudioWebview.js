"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeStudioWebview = void 0;
const vscode = __importStar(require("vscode"));
const presets_1 = require("./presets");
const themeEngine_1 = require("./themeEngine");
const profileManager_1 = require("./profileManager");
class ThemeStudioWebview {
    static currentPanel;
    _panel;
    _extensionUri;
    _disposables = [];
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (ThemeStudioWebview.currentPanel) {
            ThemeStudioWebview.currentPanel._panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel('simpleThemeStudio', '🎨 SimpleTheme', column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
        });
        ThemeStudioWebview.currentPanel = new ThemeStudioWebview(panel, extensionUri);
    }
    constructor(panel, extensionUri) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'applyAll':
                    await themeEngine_1.ThemeEngine.applyTheme(message.colors, message.tokenColors, message.profileName);
                    vscode.window.showInformationMessage(`✨ Applied "${message.profileName || 'Custom'}" theme to VS Code!`);
                    this._update();
                    break;
                case 'applyLiveColor':
                    await themeEngine_1.ThemeEngine.applySingleColor(message.key, message.value);
                    break;
                case 'applyLiveTokenColor':
                    await themeEngine_1.ThemeEngine.applySingleTokenColor(message.syntaxId, message.color);
                    break;
                case 'applyPreset':
                    const preset = presets_1.THEME_PRESETS.find((p) => p.id === message.presetId);
                    if (preset) {
                        await themeEngine_1.ThemeEngine.applyPreset(preset);
                        vscode.window.showInformationMessage(`✨ Applied preset "${preset.name}"!`);
                        this._update();
                    }
                    break;
                case 'saveProfile':
                    const name = await vscode.window.showInputBox({
                        title: 'Save Theme Profile',
                        prompt: 'Enter name for your custom theme profile',
                        value: message.profileName || 'My Custom Theme',
                        ignoreFocusOut: true,
                    });
                    if (name && name.trim()) {
                        await profileManager_1.ProfileManager.saveProfile(name.trim(), message.colors, message.tokenColors);
                        vscode.window.showInformationMessage(`💾 Saved profile "${name.trim()}"!`);
                        this._update();
                    }
                    break;
                case 'loadProfile':
                    const profile = profileManager_1.ProfileManager.getProfile(message.profileId);
                    if (profile) {
                        await themeEngine_1.ThemeEngine.applyTheme(profile.colors, profile.tokenColors, profile.name);
                        vscode.window.showInformationMessage(`✨ Loaded profile "${profile.name}"!`);
                        this._update();
                    }
                    break;
                case 'deleteProfile':
                    const ok = await vscode.window.showWarningMessage(`Delete custom profile "${message.profileName}"?`, { modal: true }, 'Delete');
                    if (ok === 'Delete') {
                        await profileManager_1.ProfileManager.deleteProfile(message.profileId);
                        vscode.window.showInformationMessage(`Deleted profile.`);
                        this._update();
                    }
                    break;
                case 'exportJson':
                    const json = themeEngine_1.ThemeEngine.exportAsSettingsJson(message.colors, message.tokenColors);
                    await vscode.env.clipboard.writeText(json);
                    vscode.window.showInformationMessage('📋 Copied theme settings JSON to clipboard!');
                    break;
                case 'resetTheme':
                    const confirmReset = await vscode.window.showWarningMessage('Reset all theme customizations and restore default colors?', { modal: true }, 'Reset Theme');
                    if (confirmReset === 'Reset Theme') {
                        await themeEngine_1.ThemeEngine.resetTheme();
                        vscode.window.showInformationMessage('🔄 Reset theme customizations to default.');
                        this._update();
                    }
                    break;
            }
        }, null, this._disposables);
    }
    _update() {
        this._panel.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        const currentColors = themeEngine_1.ThemeEngine.getCurrentColors();
        const currentTokens = themeEngine_1.ThemeEngine.getCurrentTokenColors();
        const savedProfiles = profileManager_1.ProfileManager.getProfiles();
        const config = vscode.workspace.getConfiguration('simpletheme');
        const activeProfileName = config.get('activeProfile', 'Custom');
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SimpleTheme</title>
  <style>
    :root {
      --bg: #07070a;
      --card-bg: #0e0e14;
      --card-border: rgba(255, 255, 255, 0.08);
      --accent: #ffe600;
      --accent-glow: rgba(255, 230, 0, 0.4);
      --accent-blue: #00f0ff;
      --text: #f0f0f8;
      --text-muted: #858599;
      --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --preview-height: 420px;
      --preview-scale: 1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      font-size: 13px;
      line-height: 1.4;
      padding: 16px;
      overflow-x: hidden;
    }

    /* Top Banner Header */
    .header-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      background: linear-gradient(135deg, rgba(255, 230, 0, 0.08) 0%, rgba(0, 240, 255, 0.04) 100%);
      border: 1px solid rgba(255, 230, 0, 0.2);
      border-radius: 12px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      flex-wrap: wrap;
      gap: 12px;
    }

    .brand-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo {
      width: 28px;
      height: 28px;
      color: var(--accent);
      filter: drop-shadow(0 0 8px var(--accent-glow));
      flex-shrink: 0;
    }

    .header-title {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.3px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .profile-pill {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      background: var(--accent);
      color: #000;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--card-border);
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .btn-primary {
      background: var(--accent);
      color: #000;
      border-color: var(--accent);
      font-weight: 800;
      box-shadow: 0 0 12px var(--accent-glow);
    }

    .btn-primary:hover {
      background: #fff;
      border-color: #fff;
      color: #000;
      box-shadow: 0 0 16px rgba(255, 255, 255, 0.6);
    }

    .btn-dock {
      background: rgba(0, 240, 255, 0.1);
      border-color: rgba(0, 240, 255, 0.3);
      color: #00f0ff;
      font-weight: 700;
    }

    .btn-dock:hover {
      background: rgba(0, 240, 255, 0.2);
      border-color: #00f0ff;
      color: #fff;
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
    }

    .btn-danger {
      background: rgba(255, 0, 85, 0.12);
      border-color: rgba(255, 0, 85, 0.3);
      color: #ff4d79;
    }

    .btn-danger:hover {
      background: rgba(255, 0, 85, 0.25);
      border-color: #ff0055;
      color: #fff;
    }

    /* Main Responsive Layout */
    .studio-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(300px, 1fr);
      gap: 16px;
      align-items: start;
      transition: all 0.2s ease;
    }

    .main-column {
      min-width: 0;
      width: 100%;
    }

    .preview-column {
      min-width: 0;
      width: 100%;
    }

    /* Bottom Docked Layout */
    .studio-layout.dock-bottom {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .studio-layout.dock-bottom .main-column {
      width: 100%;
    }

    .studio-layout.dock-bottom .preview-column {
      width: 100%;
      margin-top: 8px;
    }

    @media (max-width: 900px) {
      .studio-layout {
        display: flex;
        flex-direction: column;
      }
    }

    /* Navigation Tabs */
    .nav-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 6px;
      overflow-x: auto;
    }

    .nav-tab {
      padding: 7px 13px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      transition: all 0.15s;
      white-space: nowrap;
    }

    .nav-tab:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.04);
    }

    .nav-tab.active {
      color: var(--accent);
      background: rgba(255, 230, 0, 0.08);
      border-color: rgba(255, 230, 0, 0.25);
    }

    /* Mode Switch Bar (Simple vs Advanced) */
    .mode-switch-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 12px;
      margin-bottom: 14px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .mode-toggle-group {
      display: flex;
      gap: 3px;
      background: rgba(0, 0, 0, 0.4);
      padding: 3px;
      border-radius: 6px;
      border: 1px solid var(--card-border);
    }

    .mode-btn {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--text-muted);
      transition: all 0.12s;
    }

    .mode-btn.active {
      background: var(--accent);
      color: #000;
      box-shadow: 0 0 8px var(--accent-glow);
    }

    /* Filter Pill Bars */
    .filter-bar {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 160px;
      padding: 7px 10px;
      border-radius: 6px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text);
      font-size: 11px;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .pill-filters {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .pill {
      font-size: 10px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.12s;
    }

    .pill:hover {
      color: var(--text);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .pill.active {
      background: var(--accent);
      color: #000;
      font-weight: 800;
      border-color: var(--accent);
    }

    /* Color Pickers Grid */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }

    .color-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      transition: all 0.2s ease;
    }

    .color-card:hover {
      border-color: rgba(255, 230, 0, 0.3);
      transform: translateY(-1px);
    }

    .simple-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
      transition: all 0.2s ease;
    }

    .simple-card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    /* Highlight Animation When Element in Preview is Clicked */
    @keyframes tileGlowPulse {
      0% {
        box-shadow: 0 0 0 2px var(--accent), 0 0 20px var(--accent-glow);
        border-color: var(--accent);
        transform: scale(1.02);
      }
      50% {
        box-shadow: 0 0 0 4px #00f0ff, 0 0 32px rgba(0, 240, 255, 0.6);
        border-color: #00f0ff;
        transform: scale(1.04);
      }
      100% {
        box-shadow: 0 0 0 2px var(--accent), 0 0 20px var(--accent-glow);
        border-color: var(--accent);
        transform: scale(1.02);
      }
    }

    .tile-highlighted {
      animation: tileGlowPulse 1.6s ease-in-out 3;
      border-color: var(--accent) !important;
      z-index: 10;
      position: relative;
    }

    .color-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
    }

    .color-name {
      font-weight: 700;
      font-size: 12px;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .color-category-badge {
      font-size: 9px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .color-desc {
      font-size: 10px;
      color: var(--text-muted);
      line-height: 1.3;
      min-height: 24px;
    }

    .color-input-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 3px 6px;
      min-width: 0;
    }

    .color-picker {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 22px;
      height: 22px;
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .color-picker::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    .color-picker::-webkit-color-swatch {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .hex-input {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--card-border);
      color: var(--text);
      font-family: monospace;
      font-size: 10px;
      text-transform: uppercase;
    }

    .hex-input:focus {
      border-color: var(--accent);
      outline: none;
    }

    /* Preset Cards */
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }

    .preset-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    .preset-card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    }

    .preset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
    }

    .preset-title {
      font-weight: 800;
      font-size: 13px;
      color: var(--text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .palette-swatches {
      display: flex;
      height: 18px;
      border-radius: 4px;
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
      top: 16px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
      width: 100%;
    }

    .preview-header-bar {
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid var(--card-border);
      font-size: 10px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-muted);
      gap: 6px;
      flex-wrap: wrap;
    }

    .preview-controls-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .size-btn-group {
      display: flex;
      gap: 2px;
      background: rgba(0, 0, 0, 0.3);
      padding: 2px;
      border-radius: 4px;
      border: 1px solid var(--card-border);
    }

    .size-btn {
      padding: 2px 6px;
      font-size: 9px;
      font-weight: 700;
      border-radius: 3px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--text-muted);
      transition: all 0.1s;
    }

    .size-btn:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.08);
    }

    .size-btn.active {
      background: var(--accent);
      color: #000;
    }

    /* Interactive Clickable Preview Cues */
    .mock-clickable {
      cursor: pointer !important;
      position: relative;
      transition: outline 0.12s ease, filter 0.12s ease;
    }

    .mock-clickable:hover {
      outline: 1.5px dashed var(--accent) !important;
      outline-offset: -1px;
      filter: brightness(1.2);
    }

    .mock-window {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: calc(10.5px * var(--preview-scale));
      display: flex;
      flex-direction: column;
      height: var(--preview-height);
      min-height: 200px;
      background: #1e1e1e;
      overflow: hidden;
    }

    .mock-titlebar {
      height: 24px;
      background: #3c3c3c;
      color: #cccccc;
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: calc(10px * var(--preview-scale));
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      flex-shrink: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .mock-body {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .mock-activitybar {
      width: 36px;
      background: #333333;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0;
      gap: 10px;
      color: #ffffff;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
      font-size: 11px;
    }

    .mock-sidebar {
      width: 110px;
      background: #252526;
      color: #cccccc;
      padding: 8px;
      font-size: calc(9.5px * var(--preview-scale));
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
      overflow: hidden;
    }

    .mock-editor-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    .mock-tabs-bar {
      height: 24px;
      background: #252526;
      display: flex;
      align-items: flex-end;
      padding-left: 4px;
      gap: 2px;
      flex-shrink: 0;
      overflow: hidden;
    }

    .mock-tab {
      padding: 4px 8px;
      font-size: calc(9.5px * var(--preview-scale));
      background: #2d2d2d;
      color: #858585;
      border-radius: 3px 3px 0 0;
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }

    .mock-tab.active {
      background: #1e1e1e;
      color: #ffffff;
      border-top: 2px solid #007acc;
    }

    .mock-editor-canvas {
      flex: 1;
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 10px;
      line-height: 1.45;
      font-size: calc(10.5px * var(--preview-scale));
      overflow: auto;
      min-width: 0;
    }

    .mock-statusbar {
      height: 20px;
      background: #007acc;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      font-size: calc(9.5px * var(--preview-scale));
      flex-shrink: 0;
    }
  </style>
</head>
<body>

  <!-- Header Banner -->
  <div class="header-banner">
    <div class="brand-title">
      <svg class="brand-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      <div>
        <div class="header-title">
          SimpleTheme
          <span class="profile-pill" id="activeProfileLabel">${activeProfileName}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">Visual Live Theme Customizer & Syntax Designer</div>
      </div>
    </div>

    <div class="toolbar">
      <button class="btn btn-dock" id="btnToggleDock" onclick="toggleDockPosition()">
        <span id="dockBtnIcon">⬇️</span>
        <span id="dockBtnLabel">Lock to Bottom</span>
      </button>

      <button class="btn btn-primary" id="btnApplyAll">✨ Apply to VS Code</button>
      <button class="btn" id="btnSaveProfile">💾 Save Profile</button>
      <button class="btn" id="btnExportJson">📋 Export JSON</button>
      <button class="btn btn-danger" id="btnResetTheme">🔄 Reset Default</button>
    </div>
  </div>

  <!-- Studio Layout Container (Right or Bottom Docked) -->
  <div class="studio-layout" id="studioLayout">
    
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
        
        <!-- Mode Switch Bar -->
        <div class="mode-switch-bar">
          <div style="font-size: 12px; font-weight: 700; color: var(--text);">
            Editing Mode:
          </div>
          <div class="mode-toggle-group">
            <button class="mode-btn active" id="btnUiModeSimple" onclick="setUiMode('simple')">⚡ Simple Mode (${presets_1.SIMPLE_UI_DEFINITIONS.length} Colors)</button>
            <button class="mode-btn" id="btnUiModeAdvanced" onclick="setUiMode('advanced')">⚙️ Advanced Mode (Granular)</button>
          </div>
        </div>

        <!-- Tab 1A: Simple Mode UI (${presets_1.SIMPLE_UI_DEFINITIONS.length} Master Colors) -->
        <div id="uiSimpleContainer">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
            Set these ${presets_1.SIMPLE_UI_DEFINITIONS.length} master colors to style the entire VS Code workbench. *(Tip: Click any element in the Live Preview to jump right to its tile!)*
          </div>
          <div class="color-grid">
            ${presets_1.SIMPLE_UI_DEFINITIONS.map((def) => {
            const primaryTarget = def.targets[0];
            const val = currentColors[primaryTarget] || def.defaultColor;
            return `
              <div class="simple-card" data-simple-ui-id="${def.id}">
                <div class="color-card-header">
                  <span class="color-name">${def.icon} ${def.name}</span>
                  <span class="color-category-badge">Master</span>
                </div>
                <div class="color-desc">${def.description}</div>
                <div class="color-input-row">
                  <input type="color" class="color-picker simple-ui-picker" data-simple-id="${def.id}" value="${val.length === 7 ? val : def.defaultColor}" />
                  <input type="text" class="hex-input simple-ui-hex" data-simple-id="${def.id}" value="${val}" />
                </div>
              </div>`;
        }).join('')}
          </div>
        </div>

        <!-- Tab 1B: Advanced Mode UI (Full Granular List) -->
        <div id="uiAdvancedContainer" style="display: none;">
          <div class="filter-bar">
            <input type="text" class="search-input" id="uiSearchInput" placeholder="🔍 Filter UI colors (e.g. editor, sidebar, tab, cursor)..." />
            <div class="pill-filters">
              <span class="pill active" data-category="all">All</span>
              <span class="pill" data-category="core">Core Editor</span>
              <span class="pill" data-category="bars">Bars</span>
              <span class="pill" data-category="tabs">Tabs</span>
              <span class="pill" data-category="terminal">Terminal</span>
              <span class="pill" data-category="chat">Chat</span>
            </div>
          </div>

          <div class="color-grid" id="uiColorGrid">
            ${presets_1.UI_COLOR_DEFINITIONS.map((def) => {
            const val = currentColors[def.id] || def.defaultValue;
            return `
              <div class="color-card" data-id="${def.id}" data-category="${def.category}" data-name="${def.name.toLowerCase()} ${def.id.toLowerCase()}">
                <div class="color-card-header">
                  <span class="color-name">${def.name}</span>
                  <span class="color-category-badge">${def.category}</span>
                </div>
                <div class="color-desc">${def.description}</div>
                <div class="color-input-row">
                  <input type="color" class="color-picker adv-color-picker" data-target="${def.id}" value="${val.length === 7 ? val : '#1e1e1e'}" />
                  <input type="text" class="hex-input adv-hex-input" data-target="${def.id}" value="${val}" />
                </div>
              </div>`;
        }).join('')}
          </div>
        </div>

      </div>

      <!-- Tab 2: Syntax Highlight Tokens -->
      <div id="tab-syntax" class="tab-pane" style="display: none;">
        
        <!-- Mode Switch Bar -->
        <div class="mode-switch-bar">
          <div style="font-size: 12px; font-weight: 700; color: var(--text);">
            Syntax Mode:
          </div>
          <div class="mode-toggle-group">
            <button class="mode-btn active" id="btnSyntaxModeSimple" onclick="setSyntaxMode('simple')">⚡ Simple Mode (6 Tokens)</button>
            <button class="mode-btn" id="btnSyntaxModeAdvanced" onclick="setSyntaxMode('advanced')">⚙️ Advanced Mode (Full Scopes)</button>
          </div>
        </div>

        <!-- Tab 2A: Simple Mode Syntax (6 Master Tokens) -->
        <div id="syntaxSimpleContainer">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
            Set 6 core syntax colors to instantly colorize code across all programming languages. *(Tip: Click any code word in the Live Preview to highlight its tile!)*
          </div>
          <div class="color-grid">
            ${presets_1.SIMPLE_SYNTAX_DEFINITIONS.map((def) => {
            const item = presets_1.SYNTAX_SCOPE_DEFINITIONS.find((s) => s.id === def.targets[0]);
            const rule = currentTokens.find((r) => Array.isArray(r.scope) ? r.scope.includes(item?.scopes[0] || '') : r.scope === item?.scopes[0]);
            const val = rule?.settings?.foreground || def.defaultColor;
            return `
              <div class="simple-card" data-simple-syntax-id="${def.id}">
                <div class="color-card-header">
                  <span class="color-name">${def.icon} ${def.name}</span>
                  <span class="color-category-badge">Token</span>
                </div>
                <div class="color-desc">${def.description}</div>
                <div class="color-input-row">
                  <input type="color" class="color-picker simple-syntax-picker" data-simple-syntax-id="${def.id}" data-target-syntax="${def.targets[0]}" value="${val.length === 7 ? val : def.defaultColor}" />
                  <input type="text" class="hex-input simple-syntax-hex" data-simple-syntax-id="${def.id}" data-target-syntax="${def.targets[0]}" value="${val}" />
                </div>
              </div>`;
        }).join('')}
          </div>
        </div>

        <!-- Tab 2B: Advanced Mode Syntax (Full Scopes) -->
        <div id="syntaxAdvancedContainer" style="display: none;">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 14px;">
            Customize code syntax highlighting across all programming languages.
          </div>
          <div class="color-grid" id="syntaxGrid">
            ${presets_1.SYNTAX_SCOPE_DEFINITIONS.map((item) => {
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
                  <input type="color" class="color-picker adv-syntax-picker" data-syntax-id="${item.id}" value="${val.length === 7 ? val : item.defaultColor}" />
                  <input type="text" class="hex-input adv-syntax-hex" data-syntax-id="${item.id}" value="${val}" />
                </div>
              </div>`;
        }).join('')}
          </div>
        </div>

      </div>

      <!-- Tab 3: Presets Library -->
      <div id="tab-presets" class="tab-pane" style="display: none;">
        <div class="filter-bar" style="margin-bottom: 12px;">
          <input type="text" class="search-input" id="presetSearchInput" placeholder="🔍 Search presets (e.g. lemonade, solarized, warm, cyberpunk)..." />
          <div class="pill-filters">
            <span class="pill preset-pill active" data-preset-type="all">⚡ All (${presets_1.THEME_PRESETS.length})</span>
            <span class="pill preset-pill" data-preset-type="dark">🌙 Dark (${presets_1.THEME_PRESETS.filter((p) => p.type === 'dark').length})</span>
            <span class="pill preset-pill" data-preset-type="light">☀️ Light (${presets_1.THEME_PRESETS.filter((p) => p.type === 'light').length})</span>
          </div>
        </div>
        <div class="preset-grid" id="presetGrid">
          ${presets_1.THEME_PRESETS.map((preset) => {
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
              <button class="btn btn-primary" style="margin-top: 2px; justify-content: center; width: 100%;" onclick="loadPreset('${preset.id}')">⚡ Load & Apply</button>
            </div>`;
        }).join('')}
        </div>
      </div>

      <!-- Tab 4: Saved Profiles -->
      <div id="tab-profiles" class="tab-pane" style="display: none;">
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 14px;">
          Your personalized saved theme profiles.
        </div>
        <div class="preset-grid">
          ${savedProfiles.length === 0 ? `
            <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-muted); background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 8px;">
              No saved custom profiles yet. Tweak colors and click "💾 Save Profile" above!
            </div>` : ''}
          ${savedProfiles.map((p) => {
            const bg = p.colors['editor.background'] || '#1e1e1e';
            const fg = p.colors['editor.foreground'] || '#d4d4d4';
            const sb = p.colors['sideBar.background'] || '#252526';
            const tab = p.colors['tab.activeBackground'] || '#1e1e1e';
            const act = p.colors['focusBorder'] || p.colors['tab.activeBorderTop'] || '#ffe600';
            return `
            <div class="preset-card">
              <div class="preset-header">
                <span class="preset-title">${p.name}</span>
                <span class="color-category-badge">${new Date(p.updatedAt).toLocaleDateString()}</span>
              </div>
              <div class="palette-swatches">
                <div class="swatch" style="background: ${bg};"></div>
                <div class="swatch" style="background: ${sb};"></div>
                <div class="swatch" style="background: ${tab};"></div>
                <div class="swatch" style="background: ${act};"></div>
                <div class="swatch" style="background: ${fg};"></div>
              </div>
              <div style="display: flex; gap: 6px; margin-top: 4px;">
                <button class="btn btn-primary" style="flex: 1; justify-content: center;" onclick="loadSavedProfile('${p.id}')">Apply</button>
                <button class="btn btn-danger" onclick="deleteSavedProfile('${p.id}', '${p.name}')">🗑️</button>
              </div>
            </div>`;
        }).join('')}
        </div>
      </div>

    </div>

    <!-- Right / Bottom Preview Column -->
    <div class="preview-column" id="previewColumn">
      <div class="preview-sticky">
        
        <!-- Preview Top Controls Bar -->
        <div class="preview-header-bar">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>👁️ LIVE PREVIEW</span>
            <span style="color: var(--accent); font-size: 9px;">● Click element to edit tile</span>
          </div>

          <!-- Compact Size & Scale Controls -->
          <div class="preview-controls-row">
            
            <!-- Height Presets -->
            <div class="size-btn-group">
              <button class="size-btn" onclick="setHeightPreset(280)">Compact</button>
              <button class="size-btn active" id="btnH420" onclick="setHeightPreset(420)">Standard</button>
              <button class="size-btn" onclick="setHeightPreset(580)">Tall</button>
            </div>

            <!-- Zoom Presets -->
            <div class="size-btn-group">
              <button class="size-btn" onclick="setZoomDelta(-0.1)" title="Zoom Out">A-</button>
              <button class="size-btn" id="zoomDisplay" onclick="resetZoom()" title="Reset Zoom">100%</button>
              <button class="size-btn" onclick="setZoomDelta(0.1)" title="Zoom In">A+</button>
            </div>

          </div>
        </div>

        <div class="mock-window" id="mockWindow">
          
          <!-- Mock Top Title Bar -->
          <div class="mock-titlebar mock-clickable" id="mockTitlebar" data-inspect-ui="titleBar.activeBackground" data-inspect-simple-ui="simple.sidebarBg" title="Click to highlight Title Bar color">
            <span>SimpleTheme — VS Code</span>
          </div>

          <!-- Mock Middle (Activity Bar + Sidebar + Editor) -->
          <div class="mock-body">
            
            <!-- Activity Bar -->
            <div class="mock-activitybar mock-clickable" id="mockActivityBar" data-inspect-ui="activityBar.background" data-inspect-simple-ui="simple.sidebarBg" title="Click to highlight Activity Bar color">
              <span>📄</span>
              <span>🔍</span>
              <span>⚡</span>
              <span>🎨</span>
            </div>

            <!-- Sidebar -->
            <div class="mock-sidebar mock-clickable" id="mockSidebar" data-inspect-ui="sideBar.background" data-inspect-simple-ui="simple.sidebarBg" title="Click to highlight Sidebar Background">
              <div class="mock-sidebar-title mock-clickable" id="mockSidebarTitle" data-inspect-ui="sideBarTitle.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Sidebar Title (EXPLORER)" style="font-weight: 700; margin-bottom: 2px;">EXPLORER</div>
              <div class="mock-tree-item mock-clickable" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Explorer Text">📁 src</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Explorer Text">📄 themeEngine.ts</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px; color: var(--accent);" data-inspect-ui="focusBorder" data-inspect-simple-ui="simple.accent" title="Click to highlight Selected File Accent">📄 presets.ts</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Explorer Text">📄 studio.tsx</div>
              <div class="mock-tree-item mock-clickable" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Explorer Text">📁 media</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.sidebarText" title="Click to highlight Explorer Text">🖼️ logo.svg</div>
            </div>

            <!-- Editor Area -->
            <div class="mock-editor-area">
              
              <!-- Tabs Bar -->
              <div class="mock-tabs-bar mock-clickable" id="mockTabsBar" data-inspect-ui="editorGroupHeader.tabsBackground" data-inspect-simple-ui="simple.tabsBg" title="Click to highlight Tabs Bar color">
                <div class="mock-tab active mock-clickable" id="mockActiveTab" data-inspect-ui="tab.activeBackground" data-inspect-simple-ui="simple.editorBg" title="Click to highlight Active Tab color">
                  <span>📄 studio.tsx</span>
                </div>
                <div class="mock-tab mock-clickable" id="mockInactiveTab" data-inspect-ui="tab.inactiveBackground" data-inspect-simple-ui="simple.tabsBg" title="Click to highlight Inactive Tab color">
                  <span>📄 themeEngine.ts</span>
                </div>
              </div>

              <!-- Editor Code Canvas -->
              <div class="mock-editor-canvas mock-clickable" id="mockCanvas" data-inspect-ui="editor.background" data-inspect-simple-ui="simple.editorBg" title="Click to highlight Editor Canvas Background">
                <div style="color: #666; margin-bottom: 3px;">1  <span class="syn-comment mock-clickable" id="synComment" data-inspect-syntax="comments" data-inspect-simple-syntax="simple.comments" title="Click to highlight Comments">// SimpleTheme Live Preview</span></div>
                <div>2  <span class="syn-keyword mock-clickable" id="synKw1" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">import</span> { <span class="syn-var mock-clickable" id="synVar1" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">SimpleTheme</span> } <span class="syn-keyword mock-clickable" id="synKw2" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">from</span> <span class="syn-string mock-clickable" id="synStr1" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings">'simpletheme'</span>;</div>
                <div>3  </div>
                <div>4  <span class="syn-keyword mock-clickable" id="synKw3" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">export</span> <span class="syn-keyword mock-clickable" id="synKw4" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">interface</span> <span class="syn-type mock-clickable" id="synType1" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types & Classes">ThemeProfile</span> {</div>
                <div>5    <span class="syn-var mock-clickable" id="synVar2" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">id</span>: <span class="syn-type mock-clickable" id="synType2" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">string</span>;</div>
                <div>6    <span class="syn-var mock-clickable" id="synVar3" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">name</span>: <span class="syn-type mock-clickable" id="synType3" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">string</span>;</div>
                <div>7  }</div>
                <div>8  </div>
                <div>9  <span class="syn-keyword mock-clickable" id="synKw5" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">export</span> <span class="syn-keyword mock-clickable" id="synKw6" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">function</span> <span class="syn-func mock-clickable" id="synFunc1" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">activateTheme</span>(<span class="syn-var mock-clickable" id="synVar5" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">palette</span>: <span class="syn-type mock-clickable" id="synType5" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">ThemeProfile</span>) {</div>
                <div>10   <span class="syn-func mock-clickable" id="synFunc2" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">console</span>.<span class="syn-func mock-clickable" id="synFunc3" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">log</span>(<span class="syn-string mock-clickable" id="synStr2" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings">\`✨ Applied \${palette.name}!\`</span>);</div>
                <div>11 }</div>
              </div>

              <!-- Mock Chat / Prompt Box Panel -->
              <div class="mock-chat-panel mock-clickable" id="mockChatPanel" data-inspect-ui="panel.background" data-inspect-simple-ui="simple.sidebarBg" style="border-top: 1px solid var(--card-border); background: var(--card-bg); padding: 5px 8px; display: flex; flex-direction: column; gap: 4px; font-size: calc(9.5px * var(--preview-scale)); flex-shrink: 0;" title="Click to highlight Panel Container Background">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <span class="mock-clickable" id="mockPanelTitleActive" data-inspect-ui="panelTitle.activeForeground" data-inspect-simple-ui="simple.chatText" style="font-weight: 700; color: var(--accent); cursor: pointer;" title="Click to highlight Active Panel Tab (Chat)">Chat</span>
                    <span class="mock-clickable" id="mockPanelTitleInactive" data-inspect-ui="panelTitle.inactiveForeground" data-inspect-simple-ui="simple.chatText" style="color: var(--text-muted); cursor: pointer;" title="Click to highlight Inactive Panel Tabs (Codex, CodeGPT)">Codex</span>
                  </div>
                  <span class="mock-clickable" id="mockIcon" data-inspect-ui="icon.foreground" data-inspect-simple-ui="simple.chatText" style="color: var(--text-muted); cursor: pointer; font-size: 10px;" title="Click to highlight UI Icons (+, ⚙️, X)">+ ⚙️ ⛶ ✕</span>
                </div>
                <div class="mock-chat-bubble mock-clickable" id="mockChatBubble" data-inspect-ui="chat.requestBackground" data-inspect-simple-ui="simple.chatText" style="background: rgba(255,255,255,0.04); border: 1px solid var(--card-border); border-radius: 4px; padding: 2px 6px; font-weight: 600;" title="Click to highlight Chat User Request Bubble">
                  <span>← heyy</span>
                </div>
                <div class="mock-input-box mock-clickable" id="mockInputBox" data-inspect-ui="input.background" data-inspect-simple-ui="simple.chatText" style="background: rgba(0,0,0,0.3); border: 1px solid var(--card-border); border-radius: 4px; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;" title="Click to highlight Input / Chat Box">
                  <span id="mockInputPlaceholder" class="mock-clickable" data-inspect-ui="input.placeholderForeground" data-inspect-simple-ui="simple.chatText" style="color: var(--text-muted);" title="Click to highlight Input Placeholder Text">just checking in, what you're capable of</span>
                  <span id="mockCounter" class="mock-clickable" data-inspect-ui="descriptionForeground" data-inspect-simple-ui="simple.chatText" style="color: var(--text-muted); font-size: 8px; margin-left: 4px;" title="Click to highlight Muted / Counter Text (3/3)">3/3</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Mock Bottom Status Bar -->
          <div class="mock-statusbar mock-clickable" id="mockStatusBar" data-inspect-ui="statusBar.background" data-inspect-simple-ui="simple.statusBarBg" title="Click to highlight Status Bar color">
            <span>⚡ SimpleTheme: Active</span>
            <span>TypeScript • UTF-8</span>
          </div>

        </div>

      </div>
    </div>

  </div>

  <script>
    const vscode = acquireVsCodeApi();

    (function() {
      const activeState = {
        profileName: '${activeProfileName}',
        colors: ${JSON.stringify(currentColors)},
        tokenColors: ${JSON.stringify(currentTokens)},
        dockPosition: 'right', // 'right' | 'bottom'
        previewHeight: 420,
        previewScale: 1.0,
      };

      const PRESETS = ${JSON.stringify(presets_1.THEME_PRESETS)};
      const SAVED_PROFILES = ${JSON.stringify(savedProfiles)};
      const SIMPLE_UI_MAP = ${JSON.stringify(presets_1.SIMPLE_UI_DEFINITIONS)};
      const SIMPLE_SYNTAX_MAP = ${JSON.stringify(presets_1.SIMPLE_SYNTAX_DEFINITIONS)};
      const SYNTAX_DEFS = ${JSON.stringify(presets_1.SYNTAX_SCOPE_DEFINITIONS)};

      // 1. Tab Switching
      function switchTab(tabId) {
        document.querySelectorAll('.nav-tab').forEach(b => {
          if (b.getAttribute('data-tab') === tabId) b.classList.add('active');
          else b.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.style.display = 'block';
      }

      document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          switchTab(tabId);
        });
      });

      // 2. Click on Preview Element -> Highlight Corresponding Tile!
      function highlightTile(tileElement) {
        if (!tileElement) return;

        // Remove existing highlights
        document.querySelectorAll('.tile-highlighted').forEach(el => el.classList.remove('tile-highlighted'));

        // Apply pulse glow class
        tileElement.classList.add('tile-highlighted');

        // Smoothly scroll tile into center of view
        tileElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-focus the hex input
        const hexInput = tileElement.querySelector('.hex-input');
        if (hexInput) {
          setTimeout(() => {
            hexInput.focus();
            hexInput.select();
          }, 300);
        }

        // Clean up animation class after 4.5 seconds
        setTimeout(() => {
          tileElement.classList.remove('tile-highlighted');
        }, 4500);
      }

      document.querySelectorAll('.mock-clickable').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation(); // Avoid triggering parent canvas

          const inspectUi = this.getAttribute('data-inspect-ui');
          const inspectSimpleUi = this.getAttribute('data-inspect-simple-ui');
          const inspectSyntax = this.getAttribute('data-inspect-syntax');
          const inspectSimpleSyntax = this.getAttribute('data-inspect-simple-syntax');

          if (inspectSyntax || inspectSimpleSyntax) {
            // Switch to Syntax tab
            switchTab('tab-syntax');

            const isSimple = document.getElementById('syntaxSimpleContainer').style.display !== 'none';
            let targetCard = null;

            if (isSimple && inspectSimpleSyntax) {
              targetCard = document.querySelector('[data-simple-syntax-id="' + inspectSimpleSyntax + '"]');
            } else if (!isSimple && inspectSyntax) {
              targetCard = document.querySelector('[data-syntax-id="' + inspectSyntax + '"]');
            } else if (inspectSimpleSyntax) {
              targetCard = document.querySelector('[data-simple-syntax-id="' + inspectSimpleSyntax + '"]') || document.querySelector('[data-syntax-id="' + inspectSyntax + '"]');
            }

            if (targetCard) highlightTile(targetCard);

          } else if (inspectUi || inspectSimpleUi) {
            // Switch to UI tab
            switchTab('tab-ui');

            const isSimple = document.getElementById('uiSimpleContainer').style.display !== 'none';
            let targetCard = null;

            if (isSimple && inspectSimpleUi) {
              targetCard = document.querySelector('[data-simple-ui-id="' + inspectSimpleUi + '"]');
            } else if (!isSimple && inspectUi) {
              targetCard = document.querySelector('[data-id="' + inspectUi + '"]');
            } else if (inspectSimpleUi) {
              targetCard = document.querySelector('[data-simple-ui-id="' + inspectSimpleUi + '"]') || document.querySelector('[data-id="' + inspectUi + '"]');
            }

            if (targetCard) highlightTile(targetCard);
          }
        });
      });

      // 3. Dock Position Toggle (Right vs Bottom)
      window.toggleDockPosition = function() {
        const layout = document.getElementById('studioLayout');
        const btnIcon = document.getElementById('dockBtnIcon');
        const btnLabel = document.getElementById('dockBtnLabel');

        if (activeState.dockPosition === 'right') {
          activeState.dockPosition = 'bottom';
          layout.classList.add('dock-bottom');
          btnIcon.innerText = '📌';
          btnLabel.innerText = 'Dock to Right';
        } else {
          activeState.dockPosition = 'right';
          layout.classList.remove('dock-bottom');
          btnIcon.innerText = '⬇️';
          btnLabel.innerText = 'Lock to Bottom';
        }
      };

      // 4. Height Presets
      window.setHeightPreset = function(h) {
        activeState.previewHeight = h;
        document.documentElement.style.setProperty('--preview-height', h + 'px');
        document.querySelectorAll('.size-btn-group .size-btn').forEach(b => {
          if (b.innerText.toLowerCase().includes('compact') && h === 280) b.classList.add('active');
          else if (b.innerText.toLowerCase().includes('standard') && h === 420) b.classList.add('active');
          else if (b.innerText.toLowerCase().includes('tall') && h === 580) b.classList.add('active');
          else if (!b.id && !b.innerText.includes('A') && !b.innerText.includes('%')) b.classList.remove('active');
        });
      };

      // 5. Zoom Controls
      window.setZoomDelta = function(delta) {
        let nextScale = Math.round((activeState.previewScale + delta) * 10) / 10;
        nextScale = Math.max(0.7, Math.min(1.4, nextScale));
        activeState.previewScale = nextScale;
        document.documentElement.style.setProperty('--preview-scale', nextScale);
        const disp = document.getElementById('zoomDisplay');
        if (disp) disp.innerText = Math.round(nextScale * 100) + '%';
      };

      window.resetZoom = function() {
        activeState.previewScale = 1.0;
        document.documentElement.style.setProperty('--preview-scale', 1.0);
        const disp = document.getElementById('zoomDisplay');
        if (disp) disp.innerText = '100%';
      };

      // 6. Mode Switches (Simple vs Advanced)
      window.setUiMode = function(mode) {
        const btnSimple = document.getElementById('btnUiModeSimple');
        const btnAdv = document.getElementById('btnUiModeAdvanced');
        const containerSimple = document.getElementById('uiSimpleContainer');
        const containerAdv = document.getElementById('uiAdvancedContainer');

        if (mode === 'simple') {
          btnSimple.classList.add('active');
          btnAdv.classList.remove('active');
          containerSimple.style.display = 'block';
          containerAdv.style.display = 'none';
        } else {
          btnSimple.classList.remove('active');
          btnAdv.classList.add('active');
          containerSimple.style.display = 'none';
          containerAdv.style.display = 'block';
        }
      };

      window.setSyntaxMode = function(mode) {
        const btnSimple = document.getElementById('btnSyntaxModeSimple');
        const btnAdv = document.getElementById('btnSyntaxModeAdvanced');
        const containerSimple = document.getElementById('syntaxSimpleContainer');
        const containerAdv = document.getElementById('syntaxAdvancedContainer');

        if (mode === 'simple') {
          btnSimple.classList.add('active');
          btnAdv.classList.remove('active');
          containerSimple.style.display = 'block';
          containerAdv.style.display = 'none';
        } else {
          btnSimple.classList.remove('active');
          btnAdv.classList.add('active');
          containerSimple.style.display = 'none';
          containerAdv.style.display = 'block';
        }
      };

      // 7. Category Filter Pills (Advanced Mode)
      document.querySelectorAll('.pill:not(.preset-pill)').forEach(pill => {
        pill.addEventListener('click', function() {
          document.querySelectorAll('.pill:not(.preset-pill)').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          filterColors();
        });
      });

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

      // 8. Preset Search & Type Filter
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

      // 9. Update Live Mock Workbench & Post Live Changes
      function updateLivePreview(key, val) {
        activeState.colors[key] = val;

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
          document.querySelectorAll('.mock-tree-item:not([style*="var(--accent)"])').forEach(el => el.style.color = val);
        } else if (key === 'sideBarTitle.foreground') {
          const sbt = document.getElementById('mockSidebarTitle');
          if (sbt) sbt.style.color = val;
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
        } else if (key === 'tab.activeBorderTop') {
          const tab = document.getElementById('mockActiveTab');
          if (tab) tab.style.borderTopColor = val;
        } else if (key === 'tab.inactiveBackground') {
          const tab = document.getElementById('mockInactiveTab');
          if (tab) tab.style.background = val;
        } else if (key === 'editorGroupHeader.tabsBackground') {
          const tb = document.getElementById('mockTabsBar');
          if (tb) tb.style.background = val;
        } else if (key === 'input.background') {
          const ib = document.getElementById('mockInputBox');
          if (ib) ib.style.background = val;
        } else if (key === 'input.foreground') {
          const ib = document.getElementById('mockInputBox');
          if (ib) ib.style.color = val;
        } else if (key === 'input.placeholderForeground') {
          const ip = document.getElementById('mockInputPlaceholder');
          if (ip) ip.style.color = val;
        } else if (key === 'descriptionForeground') {
          const cnt = document.getElementById('mockCounter');
          if (cnt) cnt.style.color = val;
        } else if (key === 'panelTitle.activeForeground') {
          const pta = document.getElementById('mockPanelTitleActive');
          if (pta) pta.style.color = val;
        } else if (key === 'panelTitle.inactiveForeground') {
          const pti = document.getElementById('mockPanelTitleInactive');
          if (pti) pti.style.color = val;
        } else if (key === 'icon.foreground') {
          const ico = document.getElementById('mockIcon');
          if (ico) ico.style.color = val;
        } else if (key === 'chat.requestBackground') {
          const cb = document.getElementById('mockChatBubble');
          if (cb) cb.style.background = val;
        } else if (key === 'panel.background') {
          const cp = document.getElementById('mockChatPanel');
          if (cp) cp.style.background = val;
        }

        vscode.postMessage({ command: 'applyLiveColor', key, value: val });
      }

      function updateLiveSyntax(syntaxId, color) {
        if (syntaxId === 'keywords') {
          document.querySelectorAll('.syn-keyword').forEach(el => el.style.color = color);
        } else if (syntaxId === 'functions') {
          document.querySelectorAll('.syn-func').forEach(el => el.style.color = color);
        } else if (syntaxId === 'strings') {
          document.querySelectorAll('.syn-string').forEach(el => el.style.color = color);
        } else if (syntaxId === 'variables') {
          document.querySelectorAll('.syn-var').forEach(el => el.style.color = color);
        } else if (syntaxId === 'types') {
          document.querySelectorAll('.syn-type').forEach(el => el.style.color = color);
        } else if (syntaxId === 'comments') {
          document.querySelectorAll('.syn-comment').forEach(el => el.style.color = color);
        }

        const item = SYNTAX_DEFS.find(s => s.id === syntaxId);
        if (item) {
          const scope = item.scopes;
          const idx = activeState.tokenColors.findIndex(r => Array.isArray(r.scope) ? r.scope.includes(scope[0]) : r.scope === scope[0]);
          if (idx >= 0) {
            activeState.tokenColors[idx].settings.foreground = color;
          } else {
            activeState.tokenColors.push({ scope, settings: { foreground: color } });
          }
        }

        vscode.postMessage({ command: 'applyLiveTokenColor', syntaxId, color });
      }

      // 10. Simple Mode UI Handlers
      document.querySelectorAll('.simple-ui-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const simpleId = this.getAttribute('data-simple-id');
          const val = this.value;
          const hexInput = document.querySelector('.simple-ui-hex[data-simple-id="' + simpleId + '"]');
          if (hexInput) hexInput.value = val;
          applySimpleUi(simpleId, val);
        });
      });

      document.querySelectorAll('.simple-ui-hex').forEach(input => {
        input.addEventListener('input', function() {
          const simpleId = this.getAttribute('data-simple-id');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7 || val.length === 9)) {
            const picker = document.querySelector('.simple-ui-picker[data-simple-id="' + simpleId + '"]');
            if (picker && val.length === 7) picker.value = val;
            applySimpleUi(simpleId, val);
          }
        });
      });

      function applySimpleUi(simpleId, val) {
        const def = SIMPLE_UI_MAP.find(d => d.id === simpleId);
        if (!def) return;

        def.targets.forEach(target => {
          updateLivePreview(target, val);

          const advPicker = document.querySelector('.adv-color-picker[data-target="' + target + '"]');
          if (advPicker && val.length === 7) advPicker.value = val;
          const advHex = document.querySelector('.adv-hex-input[data-target="' + target + '"]');
          if (advHex) advHex.value = val;
        });
      }

      // 11. Advanced UI Handlers
      document.querySelectorAll('.adv-color-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const target = this.getAttribute('data-target');
          const val = this.value;
          const hexInput = document.querySelector('.adv-hex-input[data-target="' + target + '"]');
          if (hexInput) hexInput.value = val;
          updateLivePreview(target, val);
        });
      });

      document.querySelectorAll('.adv-hex-input').forEach(input => {
        input.addEventListener('input', function() {
          const target = this.getAttribute('data-target');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7 || val.length === 9)) {
            const picker = document.querySelector('.adv-color-picker[data-target="' + target + '"]');
            if (picker && val.length === 7) picker.value = val;
            updateLivePreview(target, val);
          }
        });
      });

      // 12. Simple Mode Syntax Handlers
      document.querySelectorAll('.simple-syntax-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const simpleId = this.getAttribute('data-simple-syntax-id');
          const targetSyntax = this.getAttribute('data-target-syntax');
          const val = this.value;
          const hexInput = document.querySelector('.simple-syntax-hex[data-simple-syntax-id="' + simpleId + '"]');
          if (hexInput) hexInput.value = val;
          updateLiveSyntax(targetSyntax, val);

          const advPicker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + targetSyntax + '"]');
          if (advPicker && val.length === 7) advPicker.value = val;
          const advHex = document.querySelector('.adv-syntax-hex[data-syntax-id="' + targetSyntax + '"]');
          if (advHex) advHex.value = val;
        });
      });

      document.querySelectorAll('.simple-syntax-hex').forEach(input => {
        input.addEventListener('input', function() {
          const simpleId = this.getAttribute('data-simple-syntax-id');
          const targetSyntax = this.getAttribute('data-target-syntax');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7 || val.length === 9)) {
            const picker = document.querySelector('.simple-syntax-picker[data-simple-syntax-id="' + simpleId + '"]');
            if (picker && val.length === 7) picker.value = val;
            updateLiveSyntax(targetSyntax, val);

            const advPicker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + targetSyntax + '"]');
            if (advPicker && val.length === 7) advPicker.value = val;
            const advHex = document.querySelector('.adv-syntax-hex[data-syntax-id="' + targetSyntax + '"]');
            if (advHex) advHex.value = val;
          }
        });
      });

      // 13. Advanced Syntax Handlers
      document.querySelectorAll('.adv-syntax-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const syntaxId = this.getAttribute('data-syntax-id');
          const val = this.value;
          const hexInput = document.querySelector('.adv-syntax-hex[data-syntax-id="' + syntaxId + '"]');
          if (hexInput) hexInput.value = val;
          updateLiveSyntax(syntaxId, val);
        });
      });

      document.querySelectorAll('.adv-syntax-hex').forEach(input => {
        input.addEventListener('input', function() {
          const syntaxId = this.getAttribute('data-syntax-id');
          const val = this.value.trim();
          if (val.startsWith('#') && (val.length === 4 || val.length === 7 || val.length === 9)) {
            const picker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + syntaxId + '"]');
            if (picker && val.length === 7) picker.value = val;
            updateLiveSyntax(syntaxId, val);
          }
        });
      });

      // 14. Preset Loader
      window.loadPreset = function(presetId) {
        vscode.postMessage({ command: 'applyPreset', presetId });
      };

      // 15. Profile Actions
      window.loadSavedProfile = function(profileId) {
        vscode.postMessage({ command: 'loadProfile', profileId });
      };

      window.deleteSavedProfile = function(profileId, profileName) {
        vscode.postMessage({ command: 'deleteProfile', profileId, profileName });
      };

      // 16. Top Toolbar Handlers
      document.getElementById('btnApplyAll').addEventListener('click', () => {
        vscode.postMessage({
          command: 'applyAll',
          colors: activeState.colors,
          tokenColors: activeState.tokenColors,
          profileName: activeState.profileName,
        });
      });

      document.getElementById('btnSaveProfile').addEventListener('click', () => {
        vscode.postMessage({
          command: 'saveProfile',
          colors: activeState.colors,
          tokenColors: activeState.tokenColors,
          profileName: activeState.profileName,
        });
      });

      document.getElementById('btnExportJson').addEventListener('click', () => {
        vscode.postMessage({
          command: 'exportJson',
          colors: activeState.colors,
          tokenColors: activeState.tokenColors,
        });
      });

      document.getElementById('btnResetTheme').addEventListener('click', () => {
        vscode.postMessage({ command: 'resetTheme' });
      });

      // Initial Live Preview Colors Init
      Object.keys(activeState.colors).forEach(k => {
        const val = activeState.colors[k];
        if (val) {
          if (k === 'editor.background') {
            const canvas = document.getElementById('mockCanvas');
            if (canvas) canvas.style.background = val;
          } else if (k === 'editor.foreground') {
            const canvas = document.getElementById('mockCanvas');
            if (canvas) canvas.style.color = val;
          } else if (k === 'sideBar.background') {
            const sb = document.getElementById('mockSidebar');
            if (sb) sb.style.background = val;
          } else if (k === 'sideBar.foreground') {
            const sb = document.getElementById('mockSidebar');
            if (sb) sb.style.color = val;
            document.querySelectorAll('.mock-tree-item:not([style*="var(--accent)"])').forEach(el => el.style.color = val);
          } else if (k === 'sideBarTitle.foreground') {
            const sbt = document.getElementById('mockSidebarTitle');
            if (sbt) sbt.style.color = val;
          } else if (k === 'activityBar.background') {
            const ab = document.getElementById('mockActivityBar');
            if (ab) ab.style.background = val;
          } else if (k === 'statusBar.background') {
            const st = document.getElementById('mockStatusBar');
            if (st) st.style.background = val;
          } else if (k === 'tab.activeBackground') {
            const tab = document.getElementById('mockActiveTab');
            if (tab) tab.style.background = val;
          } else if (k === 'tab.activeBorderTop') {
            const tab = document.getElementById('mockActiveTab');
            if (tab) tab.style.borderTopColor = val;
          } else if (k === 'editorGroupHeader.tabsBackground') {
            const tb = document.getElementById('mockTabsBar');
            if (tb) tb.style.background = val;
          } else if (k === 'input.background') {
            const ib = document.getElementById('mockInputBox');
            if (ib) ib.style.background = val;
          } else if (k === 'input.foreground') {
            const ib = document.getElementById('mockInputBox');
            if (ib) ib.style.color = val;
          } else if (k === 'input.placeholderForeground') {
            const ip = document.getElementById('mockInputPlaceholder');
            if (ip) ip.style.color = val;
          } else if (k === 'descriptionForeground') {
            const cnt = document.getElementById('mockCounter');
            if (cnt) cnt.style.color = val;
          } else if (k === 'panelTitle.activeForeground') {
            const pta = document.getElementById('mockPanelTitleActive');
            if (pta) pta.style.color = val;
          } else if (k === 'panelTitle.inactiveForeground') {
            const pti = document.getElementById('mockPanelTitleInactive');
            if (pti) pti.style.color = val;
          } else if (k === 'icon.foreground') {
            const ico = document.getElementById('mockIcon');
            if (ico) ico.style.color = val;
          } else if (k === 'chat.requestBackground') {
            const cb = document.getElementById('mockChatBubble');
            if (cb) cb.style.background = val;
          } else if (k === 'panel.background') {
            const cp = document.getElementById('mockChatPanel');
            if (cp) cp.style.background = val;
          }
        }
      });

      // Initial Syntax Colors Init
      activeState.tokenColors.forEach(rule => {
        const fg = rule.settings.foreground;
        if (!fg) return;
        const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
        if (scopes.some(s => s.includes('keyword'))) {
          document.querySelectorAll('.syn-keyword').forEach(el => el.style.color = fg);
        } else if (scopes.some(s => s.includes('function'))) {
          document.querySelectorAll('.syn-func').forEach(el => el.style.color = fg);
        } else if (scopes.some(s => s.includes('string'))) {
          document.querySelectorAll('.syn-string').forEach(el => el.style.color = fg);
        } else if (scopes.some(s => s.includes('variable'))) {
          document.querySelectorAll('.syn-var').forEach(el => el.style.color = fg);
        } else if (scopes.some(s => s.includes('type') || s.includes('class'))) {
          document.querySelectorAll('.syn-type').forEach(el => el.style.color = fg);
        } else if (scopes.some(s => s.includes('comment'))) {
          document.querySelectorAll('.syn-comment').forEach(el => el.style.color = fg);
        }
      });

    })();
  </script>
</body>
</html>`;
    }
    dispose() {
        ThemeStudioWebview.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x)
                x.dispose();
        }
    }
}
exports.ThemeStudioWebview = ThemeStudioWebview;
//# sourceMappingURL=themeStudioWebview.js.map