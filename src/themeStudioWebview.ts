import * as vscode from 'vscode';
import {
  UI_COLOR_DEFINITIONS,
  SYNTAX_SCOPE_DEFINITIONS,
  THEME_PRESETS,
  SIMPLE_UI_DEFINITIONS,
  SIMPLE_SYNTAX_DEFINITIONS,
} from './presets';
import { ThemeEngine } from './themeEngine';
import { ProfileManager } from './profileManager';
import { ThemePreset, TokenRule } from './types';

export class ThemeStudioWebview {
  public static currentPanel: ThemeStudioWebview | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  private _isApplyingInternalChange: boolean = false;
  private _internalChangeDepth: number = 0;
  private _internalChangeTimer: NodeJS.Timeout | undefined;
  private _syncRequestedDuringInternalChange: boolean = false;
  private _mutationQueue: Promise<void> = Promise.resolve();

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (ThemeStudioWebview.currentPanel) {
      ThemeStudioWebview.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'simpleThemeStudio',
      '🎨 SimpleTheme',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
      }
    );

    ThemeStudioWebview.currentPanel = new ThemeStudioWebview(panel, extensionUri);
  }

  private async _runInternalChange<T>(operation: () => Promise<T>): Promise<T> {
    this._internalChangeDepth += 1;
    this._isApplyingInternalChange = true;
    if (this._internalChangeTimer) {
      clearTimeout(this._internalChangeTimer);
      this._internalChangeTimer = undefined;
    }

    try {
      return await operation();
    } finally {
      this._internalChangeDepth = Math.max(0, this._internalChangeDepth - 1);
      if (this._internalChangeDepth === 0) {
        this._internalChangeTimer = setTimeout(() => {
          this._isApplyingInternalChange = false;
          this._internalChangeTimer = undefined;
          if (this._syncRequestedDuringInternalChange) {
            this._syncRequestedDuringInternalChange = false;
            this._syncActiveThemeToWebview();
          }
        }, 400);
      }
    }
  }

  private _enqueueMutation<T>(operation: () => Promise<T>): Promise<T> {
    const task = this._mutationQueue.then(operation);
    this._mutationQueue = task.then(() => undefined, () => undefined);
    return task;
  }

  private _requestThemeSync() {
    if (this._isApplyingInternalChange) {
      this._syncRequestedDuringInternalChange = true;
      return;
    }
    this._syncActiveThemeToWebview();
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Live VS Code Active Theme Listener: When user changes theme in VS Code (File > Preferences > Theme > Color Theme)
    vscode.window.onDidChangeActiveColorTheme(
      () => {
        this._requestThemeSync();
      },
      null,
      this._disposables
    );

    // Live Setting Listener: Only sync when change was made externally (not by the Studio's active sliders)
    vscode.workspace.onDidChangeConfiguration(
      (e) => {
        if (
          e.affectsConfiguration('workbench.colorTheme') ||
          e.affectsConfiguration('workbench.colorCustomizations') ||
          e.affectsConfiguration('editor.tokenColorCustomizations') ||
          e.affectsConfiguration('editor.semanticTokenColorCustomizations') ||
          e.affectsConfiguration('simpletheme')
        ) {
          this._requestThemeSync();
        }
      },
      null,
      this._disposables
    );

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        try {
          switch (message.command) {
          case 'applyAll':
            const appliedState = await this._enqueueMutation(async () => {
              await this._runInternalChange(() => ThemeEngine.applyTheme(message.colors, message.tokenColors, message.profileName));
              return ThemeEngine.getEffectiveThemeState();
            });
            vscode.window.showInformationMessage(`✨ Applied "${message.profileName || 'Custom'}" theme to VS Code!`);
            this._panel.webview.postMessage({
              command: 'themeApplied',
              profileName: message.profileName || 'Custom Theme',
              themeKind: appliedState.themeKind,
              colors: appliedState.colors,
              tokenColors: appliedState.tokenColors,
              requestRevision: message.requestRevision,
            });
            break;

          case 'applyLiveColors': {
            const colors = message.colors && typeof message.colors === 'object' ? message.colors : {};
            const applyTask = this._enqueueMutation(async () => {
              await this._runInternalChange(() => ThemeEngine.applyColors(colors));
            });
            let errorMessage: string | undefined;
            try {
              await applyTask;
            } catch (error) {
              errorMessage = error instanceof Error ? error.message : 'Unable to apply the color change.';
            } finally {
              this._panel.webview.postMessage({
                command: 'liveColorsApplied',
                batchId: message.batchId,
                ok: !errorMessage,
                message: errorMessage,
              });
            }
            break;
          }

          case 'applyLiveTokenColors': {
            const colors = message.colors && typeof message.colors === 'object' ? message.colors : {};
            const applyTask = this._enqueueMutation(async () => {
              await this._runInternalChange(() => ThemeEngine.applyTokenColors(colors));
            });
            let errorMessage: string | undefined;
            try {
              await applyTask;
            } catch (error) {
              errorMessage = error instanceof Error ? error.message : 'Unable to apply the syntax color change.';
            } finally {
              this._panel.webview.postMessage({
                command: 'liveTokenColorsApplied',
                batchId: message.batchId,
                ok: !errorMessage,
                message: errorMessage,
              });
            }
            break;
          }

          case 'applyPreset':
            const preset = THEME_PRESETS.find((p) => p.id === message.presetId);
            if (preset) {
              const presetState = await this._enqueueMutation(async () => {
                await this._runInternalChange(() => ThemeEngine.applyPreset(preset));
                return ThemeEngine.getEffectiveThemeState();
              });
              vscode.window.showInformationMessage(`✨ Applied preset "${preset.name}"!`);
              this._panel.webview.postMessage({
                command: 'presetApplied',
                presetId: preset.id,
                presetName: preset.name,
                themeKind: presetState.themeKind,
                colors: presetState.colors,
                tokenColors: presetState.tokenColors,
                requestRevision: message.requestRevision,
              });
            } else {
              this._panel.webview.postMessage({
                command: 'authoritativeActionError',
                requestCommand: message.command,
                requestRevision: message.requestRevision,
                message: 'That theme preset is no longer available.',
              });
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
              await ProfileManager.saveProfile(name.trim(), message.colors, message.tokenColors, message.type === 'light' ? 'light' : 'dark');
              vscode.window.showInformationMessage(`💾 Saved profile "${name.trim()}"!`);
              const updatedProfiles = ProfileManager.getProfiles();
              this._panel.webview.postMessage({
                command: 'profileSaved',
                profileName: name.trim(),
                savedProfiles: updatedProfiles,
              });
            }
            break;

          case 'loadProfile':
            const profile = ProfileManager.getProfile(message.profileId);
            if (profile) {
              const profileState = await this._enqueueMutation(async () => {
                await this._runInternalChange(() => ThemeEngine.applyTheme(profile.colors, profile.tokenColors, profile.name));
                return ThemeEngine.getEffectiveThemeState();
              });
              vscode.window.showInformationMessage(`✨ Loaded profile "${profile.name}"!`);
              this._panel.webview.postMessage({
                command: 'profileLoaded',
                profileName: profile.name,
                themeKind: profileState.themeKind,
                colors: profileState.colors,
                tokenColors: profileState.tokenColors,
                requestRevision: message.requestRevision,
              });
            } else {
              this._panel.webview.postMessage({
                command: 'authoritativeActionError',
                requestCommand: message.command,
                requestRevision: message.requestRevision,
                message: 'That saved theme profile is no longer available.',
              });
            }
            break;

          case 'deleteProfile':
            const ok = await vscode.window.showWarningMessage(
              `Delete custom profile "${message.profileName}"?`,
              { modal: true },
              'Delete'
            );
            if (ok === 'Delete') {
              await ProfileManager.deleteProfile(message.profileId);
              vscode.window.showInformationMessage(`Deleted profile.`);
              const updatedProfiles = ProfileManager.getProfiles();
              this._panel.webview.postMessage({
                command: 'profileDeleted',
                savedProfiles: updatedProfiles,
              });
            }
            break;

          case 'exportJson':
            const json = ThemeEngine.exportAsSettingsJson(message.colors, message.tokenColors);
            await vscode.env.clipboard.writeText(json);
            vscode.window.showInformationMessage('📋 Copied theme settings JSON to clipboard!');
            break;

          case 'refreshThemeFromVsCode': {
            const activeStateObj = await this._enqueueMutation(async () => ThemeEngine.getEffectiveThemeState());
            this._syncActiveThemeToWebview(message.requestRevision, activeStateObj);
            if (!message.silent) {
              vscode.window.showInformationMessage(`🔄 Synced live colors from "${activeStateObj.themeName}"!`);
            }
            break;
          }

          case 'resetTheme': {
            // Reserve reset's place in the shared FIFO before opening the modal. Any
            // edits made while it is open are then applied after a confirmed reset.
            const resetResult = await this._enqueueMutation(async () => {
              const confirmReset = await vscode.window.showWarningMessage(
                'Reset all theme customizations and restore default colors?',
                { modal: true },
                'Reset Theme'
              );
              const confirmed = confirmReset === 'Reset Theme';
              if (confirmed) {
                await this._runInternalChange(() => ThemeEngine.resetTheme());
              }
              return {
                confirmed,
                state: ThemeEngine.getEffectiveThemeState(),
              };
            });
            if (resetResult.confirmed) {
              vscode.window.showInformationMessage('🔄 Reset theme customizations to default.');
            }
            this._panel.webview.postMessage({
              command: 'themeResetResolved',
              confirmed: resetResult.confirmed,
              themeName: resetResult.state.themeName,
              themeKind: resetResult.state.themeKind,
              colors: resetResult.state.colors,
              tokenColors: resetResult.state.tokenColors,
              liveApply: vscode.workspace.getConfiguration('simpletheme').get<boolean>('liveApply', true),
              requestRevision: message.requestRevision,
            });
            break;
          }
          }
        } catch (error) {
          this._panel.webview.postMessage({
            command: 'authoritativeActionError',
            requestCommand: message.command,
            requestRevision: message.requestRevision,
            message: error instanceof Error ? error.message : 'Unable to complete that theme action.',
          });
        }
      },
      null,
      this._disposables
    );
  }

  private _syncActiveThemeToWebview(requestRevision?: number, effective = ThemeEngine.getEffectiveThemeState()) {
    if (!this._panel || !this._panel.webview) return;
    this._panel.webview.postMessage({
      command: 'syncActiveTheme',
      themeName: effective.themeName,
      themeKind: effective.themeKind,
      colors: effective.colors,
      tokenColors: effective.tokenColors,
      liveApply: vscode.workspace.getConfiguration('simpletheme').get<boolean>('liveApply', true),
      requestRevision,
    });
  }

  private _update() {
    this._panel.webview.html = this._getHtmlForWebview();
  }

  private _getHtmlForWebview(): string {
    const effectiveState = ThemeEngine.getEffectiveThemeState();
    const currentColors = effectiveState.colors;
    const currentTokens = effectiveState.tokenColors;
    const savedProfiles = ProfileManager.getProfiles();
    const activeProfileName = effectiveState.themeName;
    const liveApplyEnabled = vscode.workspace.getConfiguration('simpletheme').get<boolean>('liveApply', true);
    const toColorPickerValue = (value: string | undefined, fallback: string): string => {
      if (!value) return fallback;
      const normalized = value.trim();
      if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized;
      if (/^#[0-9a-f]{8}$/i.test(normalized)) return normalized.slice(0, 7);
      if (/^#[0-9a-f]{3}$/i.test(normalized)) {
        return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
      }
      return fallback;
    };
    const uiDefaults = Object.fromEntries(UI_COLOR_DEFINITIONS.map((definition) => [definition.id, definition.defaultValue]));
    const normalizeComparableColor = (value: string): string => value.trim().toLowerCase();
    const getSimpleUiGroupState = (definition: typeof SIMPLE_UI_DEFINITIONS[number]) => {
      const values = definition.targets.map((target) => currentColors[target] || uiDefaults[target] || definition.defaultColor);
      return {
        displayValue: values[0] || definition.defaultColor,
        mixed: new Set(values.map(normalizeComparableColor)).size > 1,
      };
    };
    const getSyntaxColor = (syntaxId: string): string | undefined => {
      const syntax = SYNTAX_SCOPE_DEFINITIONS.find((definition) => definition.id === syntaxId);
      if (!syntax) return undefined;
      const rule = currentTokens.find((candidate) => {
        const scopes = Array.isArray(candidate.scope) ? candidate.scope : [candidate.scope];
        return scopes.some((scope) => syntax.scopes.includes(scope));
      });
      return rule?.settings?.foreground;
    };
    const getSimpleSyntaxGroupState = (definition: typeof SIMPLE_SYNTAX_DEFINITIONS[number]) => {
      const values = definition.targets.map((target) => getSyntaxColor(target) || SYNTAX_SCOPE_DEFINITIONS.find((syntax) => syntax.id === target)?.defaultColor || definition.defaultColor);
      return {
        displayValue: values[0] || definition.defaultColor,
        mixed: new Set(values.map(normalizeComparableColor)).size > 1,
      };
    };
    const renderSimpleUiCard = (definition: typeof SIMPLE_UI_DEFINITIONS[number]): string => {
      const state = getSimpleUiGroupState(definition);
      const stateLabel = state.mixed ? `Mixed · ${definition.targets.length}` : `Linked ${definition.targets.length}`;
      const linkedTargets = definition.targets.join(', ');
      return `
        <div class="simple-card${state.mixed ? ' is-mixed' : ''}" data-simple-ui-id="${definition.id}" title="Linked roles: ${linkedTargets}">
          <div class="color-card-header">
            <span class="color-name">${definition.icon} ${definition.name}</span>
            <span class="color-category-badge simple-group-state${state.mixed ? ' is-mixed' : ''}" data-simple-ui-state="${definition.id}">${stateLabel}</span>
          </div>
          <div class="color-desc">${definition.description}</div>
          <div class="color-input-row">
            <input type="color" class="color-picker simple-ui-picker" data-simple-id="${definition.id}" value="${toColorPickerValue(state.displayValue, definition.defaultColor)}" aria-label="${definition.name} color picker" />
            <input type="text" class="hex-input simple-ui-hex" data-simple-id="${definition.id}" value="${state.displayValue}" aria-label="${definition.name} hex value" title="${state.mixed ? 'Linked roles currently differ. Choose a color to unify them.' : 'All linked roles currently share this color.'}" />
          </div>
        </div>`;
    };
    const renderSimpleSyntaxCard = (definition: typeof SIMPLE_SYNTAX_DEFINITIONS[number]): string => {
      const state = getSimpleSyntaxGroupState(definition);
      const stateLabel = state.mixed ? `Mixed · ${definition.targets.length}` : `Linked ${definition.targets.length}`;
      return `
        <div class="simple-card${state.mixed ? ' is-mixed' : ''}" data-simple-syntax-id="${definition.id}" title="Linked syntax roles: ${definition.targets.join(', ')}">
          <div class="color-card-header">
            <span class="color-name">${definition.icon} ${definition.name}</span>
            <span class="contrast-badge contrast-aa" data-simple-syntax-contrast="${definition.id}">AA 4.5:1</span>
            <span class="color-category-badge simple-group-state${state.mixed ? ' is-mixed' : ''}" data-simple-syntax-state="${definition.id}">${stateLabel}</span>
          </div>
          <div class="color-desc">${definition.description}</div>
          <div class="color-input-row">
            <input type="color" class="color-picker simple-syntax-picker" data-simple-syntax-id="${definition.id}" data-target-syntax="${definition.targets[0]}" value="${toColorPickerValue(state.displayValue, definition.defaultColor)}" aria-label="${definition.name} color picker" />
            <input type="text" class="hex-input simple-syntax-hex" data-simple-syntax-id="${definition.id}" data-target-syntax="${definition.targets[0]}" value="${state.displayValue}" aria-label="${definition.name} hex value" title="${state.mixed ? 'Linked syntax roles currently differ. Choose a color to unify them.' : 'All linked syntax roles currently share this color.'}" />
          </div>
        </div>`;
    };
    const renderSimpleSections = <T extends { section: string }>(definitions: T[], renderCard: (definition: T) => string): string =>
      Array.from(new Set(definitions.map((definition) => definition.section))).map((section) => {
        const sectionDefinitions = definitions.filter((definition) => definition.section === section);
        return `
          <section class="simple-section" aria-label="${section}">
            <div class="simple-section-heading">
              <span>${section}</span>
              <span class="simple-section-count">${sectionDefinitions.length} controls</span>
            </div>
            <div class="color-grid">${sectionDefinitions.map(renderCard).join('')}</div>
          </section>`;
      }).join('');
    const escapeHtml = (value: string): string => value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const simpleUiOwnerByTarget = new Map(
      SIMPLE_UI_DEFINITIONS.flatMap((definition) => definition.targets.map((target) => [target, definition.id] as const))
    );
    const simpleSyntaxOwnerByTarget = new Map(
      SIMPLE_SYNTAX_DEFINITIONS.flatMap((definition) => definition.targets.map((target) => [target, definition.id] as const))
    );
    const requireSimpleOwner = (owners: Map<string, string>, target: string, label: string): string => {
      const owner = owners.get(target);
      if (!owner) throw new Error(`${label} preview target ${target} has no Simple owner`);
      return owner;
    };
    const previewRoleKind = (id: string): 'background' | 'border' | 'cursor' | 'foreground' => {
      const normalized = id.toLowerCase();
      if (normalized.includes('background')) return 'background';
      if (normalized.includes('border')) return 'border';
      if (normalized.includes('cursor')) return 'cursor';
      return 'foreground';
    };
    const previewRoleSample = (kind: ReturnType<typeof previewRoleKind>): string => {
      if (kind === 'background') return 'Surface';
      if (kind === 'border') return 'Outline';
      if (kind === 'cursor') return '┃ Cursor';
      return 'Aa Text';
    };
    const renderPreviewUiOption = (definition: typeof UI_COLOR_DEFINITIONS[number]): string => {
      const owner = requireSimpleOwner(simpleUiOwnerByTarget, definition.id, 'UI');
      const kind = previewRoleKind(definition.id);
      const label = `Edit ${definition.name} color (${definition.id})`;
      return `
        <button type="button" class="preview-option preview-option-${kind} mock-clickable" data-preview-target="preview-ui-${escapeHtml(definition.id)}" data-preview-ui-role="${escapeHtml(definition.id)}" data-inspect-ui="${escapeHtml(definition.id)}" data-inspect-simple-ui="${escapeHtml(owner)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
          <span class="preview-option-sample" aria-hidden="true">${previewRoleSample(kind)}</span>
          <span class="preview-option-copy">
            <strong>${escapeHtml(definition.name)}</strong>
            <small>${escapeHtml(definition.id)}</small>
          </span>
        </button>`;
    };
    const renderPreviewUiGallery = (): string =>
      Array.from(new Set(UI_COLOR_DEFINITIONS.map((definition) => definition.category))).map((category) => {
        const categoryDefinitions = UI_COLOR_DEFINITIONS.filter((definition) => definition.category === category);
        const categoryLabel = category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase());
        return `
          <section class="preview-option-section" aria-label="${escapeHtml(categoryLabel)} UI colors">
            <div class="preview-option-heading">
              <span>${escapeHtml(categoryLabel)}</span>
              <span>${categoryDefinitions.length}</span>
            </div>
            <div class="preview-option-grid">${categoryDefinitions.map(renderPreviewUiOption).join('')}</div>
          </section>`;
      }).join('');
    const renderPreviewSyntaxOption = (definition: typeof SYNTAX_SCOPE_DEFINITIONS[number]): string => {
      const owner = requireSimpleOwner(simpleSyntaxOwnerByTarget, definition.id, 'Syntax');
      const label = `Edit ${definition.name} syntax color`;
      return `
        <button type="button" class="preview-option preview-option-foreground mock-clickable" data-preview-target="preview-syntax-${escapeHtml(definition.id)}" data-preview-syntax-role="${escapeHtml(definition.id)}" data-inspect-syntax="${escapeHtml(definition.id)}" data-inspect-simple-syntax="${escapeHtml(owner)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
          <span class="preview-option-sample" aria-hidden="true">Aa Code</span>
          <span class="preview-option-copy">
            <strong>${escapeHtml(definition.name)}</strong>
            <small>${escapeHtml(definition.id)}</small>
          </span>
        </button>`;
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SimpleTheme</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background, #07070a);
      --card-bg: var(--vscode-editorWidget-background, var(--vscode-sideBar-background, #0e0e14));
      --card-text: var(--vscode-editorWidget-foreground, var(--vscode-sideBar-foreground, var(--vscode-foreground, #f0f0f8)));
      --card-text-muted: color-mix(in srgb, var(--card-text) 72%, var(--card-bg));
      --card-border: var(--vscode-panel-border, color-mix(in srgb, var(--text) 16%, transparent));
      --accent: var(--vscode-focusBorder, #ffe600);
      --accent-blue: var(--vscode-textLink-foreground, var(--accent));
      --text: var(--vscode-editor-foreground, var(--vscode-foreground, #f0f0f8));
      --text-muted: var(--vscode-editorLineNumber-foreground, var(--vscode-descriptionForeground, #858599));
      --on-accent: var(--vscode-activityBarBadge-foreground, #000000);
      --control-bg: var(--vscode-input-background, color-mix(in srgb, var(--card-bg) 88%, var(--text) 12%));
      --surface-subtle: color-mix(in srgb, var(--text) 6%, transparent);
      --surface-hover: color-mix(in srgb, var(--text) 12%, transparent);
      --surface-strong: color-mix(in srgb, var(--text) 18%, transparent);
      --accent-soft: color-mix(in srgb, var(--accent) 12%, transparent);
      --accent-medium: color-mix(in srgb, var(--accent) 28%, transparent);
      --accent-border: color-mix(in srgb, var(--accent) 44%, transparent);
      --accent-glow: color-mix(in srgb, var(--accent) 40%, transparent);
      --secondary-soft: color-mix(in srgb, var(--accent-blue) 12%, transparent);
      --secondary-medium: color-mix(in srgb, var(--accent-blue) 32%, transparent);
      --danger: var(--vscode-errorForeground, #f14c4c);
      --danger-soft: color-mix(in srgb, var(--danger) 12%, transparent);
      --danger-medium: color-mix(in srgb, var(--danger) 32%, transparent);
      --shadow: color-mix(in srgb, #000000 52%, transparent);
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
      color-scheme: light dark;
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
      background: linear-gradient(135deg, var(--accent-soft) 0%, var(--secondary-soft) 100%);
      border: 1px solid var(--accent-medium);
      border-radius: 12px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px var(--shadow);
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
      color: var(--on-accent);
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
      background: var(--surface-subtle);
      color: var(--text);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .btn-primary {
      background: var(--accent);
      color: var(--on-accent);
      border-color: var(--accent);
      font-weight: 800;
      box-shadow: 0 0 12px var(--accent-glow);
    }

    .btn-primary:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--on-accent);
      filter: brightness(1.08);
      box-shadow: 0 0 16px var(--accent-glow);
    }

    .btn-dock {
      background: var(--secondary-soft);
      border-color: var(--secondary-medium);
      color: var(--accent-blue);
      font-weight: 700;
    }

    .btn-dock:hover {
      background: var(--secondary-medium);
      border-color: var(--accent-blue);
      color: var(--text);
      box-shadow: 0 0 10px var(--secondary-medium);
    }

    .btn-sync {
      background: linear-gradient(135deg, var(--secondary-soft), var(--accent-soft));
      border: 1px solid var(--secondary-medium);
      color: var(--accent-blue);
      font-weight: 700;
      box-shadow: 0 0 12px var(--secondary-soft);
    }

    .btn-sync:hover {
      background: linear-gradient(135deg, var(--secondary-medium), var(--accent-medium));
      border-color: var(--accent-blue);
      color: var(--text);
      transform: translateY(-1px);
      box-shadow: 0 0 16px var(--secondary-medium);
    }

    .spin-anim {
      animation: spin 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .preview-refreshed {
      animation: pulseGlow 0.8s ease-out;
    }

    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0px var(--accent); }
      50% { box-shadow: 0 0 25px var(--accent-blue), 0 0 12px var(--accent); }
      100% { box-shadow: 0 8px 30px var(--shadow); }
    }

    .toast-popup {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: color-mix(in srgb, var(--card-bg) 95%, transparent);
      border: 1px solid var(--accent);
      color: var(--text);
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      box-shadow: 0 8px 24px var(--shadow);
      display: none;
      align-items: center;
      gap: 8px;
      z-index: 9999;
      animation: slideInToast 0.25s ease;
    }

    @keyframes slideInToast {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .btn-danger {
      background: var(--danger-soft);
      border-color: var(--danger-medium);
      color: var(--danger);
    }

    .btn-danger:hover {
      background: var(--danger-medium);
      border-color: var(--danger);
      color: var(--text);
    }

    /* Main Responsive Layout */
    .studio-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(300px, 1fr);
      gap: 16px;
      align-items: start;
      transition: grid-template-columns 0.2s ease;
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
      transition: transform 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
    }

    .nav-tab:hover {
      color: var(--text);
      background: var(--surface-subtle);
    }

    .nav-tab.active {
      color: var(--accent);
      background: var(--accent-soft);
      border-color: var(--accent-medium);
    }

    /* Mode Switch Bar (Simple vs Advanced) */
    .mode-switch-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--surface-subtle);
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
      background: var(--control-bg);
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
      transition: transform 0.12s ease, box-shadow 0.12s ease;
    }

    .mode-btn.active {
      background: var(--accent);
      color: var(--on-accent);
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

    .search-input::placeholder {
      color: var(--text-muted);
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
      background: var(--surface-subtle);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      cursor: pointer;
      transition: transform 0.12s ease, border-color 0.12s ease;
    }

    .pill:hover {
      color: var(--text);
      border-color: var(--surface-strong);
    }

    .pill.active {
      background: var(--accent);
      color: var(--on-accent);
      font-weight: 800;
      border-color: var(--accent);
    }

    /* Color Pickers Grid */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }

    .simple-section + .simple-section {
      margin-top: 18px;
    }

    .simple-section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
      color: var(--text);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .simple-section-count {
      color: var(--text-muted);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0;
      text-transform: none;
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
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .color-card,
    .preset-card,
    .preview-sticky,
    .search-input,
    .toast-popup {
      --text: var(--card-text);
      --text-muted: var(--card-text-muted);
      color: var(--card-text);
    }

    .color-card:hover {
      border-color: var(--accent-medium);
      transform: translateY(-1px);
    }

    .simple-card {
      background: linear-gradient(135deg, var(--surface-hover) 0%, var(--surface-subtle) 100%);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .simple-card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 4px 16px var(--shadow);
    }

    .simple-card.is-mixed {
      border-style: dashed;
    }

    .simple-group-state.is-mixed {
      background: var(--accent-soft);
      color: var(--accent);
      border: 1px solid var(--accent-border);
    }

    /* Highlight Animation When Element in Preview is Clicked */
    @keyframes tileGlowPulse {
      0% {
        box-shadow: 0 0 0 2px var(--accent), 0 0 20px var(--accent-glow);
        border-color: var(--accent);
        transform: scale(1.02);
      }
      50% {
        box-shadow: 0 0 0 4px var(--accent-blue), 0 0 32px var(--secondary-medium);
        border-color: var(--accent-blue);
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
      background: var(--surface-hover);
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
      background: var(--control-bg);
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
      border: 1px solid var(--card-border);
      border-radius: 3px;
    }

    .hex-input {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      background: var(--bg);
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

    .hex-input[aria-invalid="true"] {
      border-color: var(--danger);
      box-shadow: 0 0 0 1px var(--danger-soft);
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
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    .preset-card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px var(--shadow);
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
      border: 1px solid var(--card-border);
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
      box-shadow: 0 8px 30px var(--shadow);
      width: 100%;
    }

    .preview-header-bar {
      padding: 6px 10px;
      background: var(--surface-subtle);
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
      background: var(--control-bg);
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
      transition: transform 0.1s ease;
    }

    .size-btn:hover {
      color: var(--text);
      background: var(--surface-hover);
    }

    .size-btn.active {
      background: var(--accent);
      color: var(--on-accent);
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

    .mock-clickable:focus-visible {
      outline: 2px solid var(--accent) !important;
      outline-offset: 1px;
      filter: brightness(1.12);
    }

    .preview-mode-btn[aria-pressed="true"] {
      background: var(--accent);
      color: var(--on-accent);
    }

    .preview-panel[hidden] {
      display: none !important;
    }

    .preview-role-gallery {
      height: var(--preview-height);
      min-height: 200px;
      overflow: auto;
      padding: 10px;
      background: var(--bg);
      color: var(--text);
      font-family: var(--vscode-font-family, sans-serif);
      scrollbar-color: var(--accent) transparent;
    }

    .preview-gallery-intro {
      margin: 0 0 10px;
      color: var(--text-muted);
      font-size: calc(10px * var(--preview-scale));
      line-height: 1.4;
    }

    .preview-option-section + .preview-option-section {
      margin-top: 10px;
    }

    .preview-option-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      color: var(--text-muted);
      font-size: calc(9px * var(--preview-scale));
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .preview-option-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 5px;
    }

    .preview-option {
      --preview-role-color: var(--text);
      appearance: none;
      width: 100%;
      min-width: 0;
      display: grid;
      grid-template-columns: 52px minmax(0, 1fr);
      align-items: center;
      gap: 7px;
      padding: 5px;
      border: 1px solid var(--card-border);
      border-radius: 5px;
      background: var(--card-bg);
      color: var(--text);
      text-align: left;
      font: inherit;
    }

    .preview-option:hover {
      background: var(--surface-hover);
    }

    .preview-option-sample {
      min-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: var(--control-bg);
      color: var(--preview-role-color);
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: calc(9px * var(--preview-scale));
      font-weight: 800;
      white-space: nowrap;
    }

    .preview-option-background .preview-option-sample {
      background: var(--preview-role-color);
      color: var(--text);
    }

    .preview-option-border .preview-option-sample {
      border: 3px solid var(--preview-role-color);
      background: var(--control-bg);
      color: var(--text);
    }

    .preview-option-cursor .preview-option-sample {
      color: var(--preview-role-color);
      background: var(--control-bg);
    }

    .preview-option-copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .preview-option-copy strong,
    .preview-option-copy small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .preview-option-copy strong {
      color: var(--text);
      font-size: calc(9.5px * var(--preview-scale));
    }

    .preview-option-copy small {
      color: var(--text-muted);
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: calc(7.5px * var(--preview-scale));
    }

    .mock-line-number {
      display: inline-block;
      min-width: 1.2em;
      text-align: right;
    }

    .mock-chat-surface {
      padding: 2px 5px;
      border-radius: 3px;
    }

    @media (max-width: 620px) {
      .preview-option-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .mock-window {
      --mock-accent: #007acc;
      --mock-border: #000000;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: calc(10.5px * var(--preview-scale));
      display: flex;
      flex-direction: column;
      height: var(--preview-height);
      min-height: 200px;
      background: #1e1e1e;
      overflow: hidden;
      border: 1px solid var(--mock-border);
    }

    .mock-titlebar {
      height: 24px;
      background: #3c3c3c;
      color: #cccccc;
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: calc(10px * var(--preview-scale));
      border-bottom: 1px solid var(--mock-border);
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
      border-right: 1px solid var(--mock-border);
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
      border-right: 1px solid var(--mock-border);
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
      border-bottom: 1px solid var(--mock-border);
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
      border: 1px solid var(--mock-border);
      border-bottom: none;
    }

    .mock-tab.active {
      background: #1e1e1e;
      color: #ffffff;
      border-top: 2px solid #007acc;
      border-left: 1px solid var(--mock-border);
      border-right: 1px solid var(--mock-border);
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

    .contrast-badge {
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      transition: all 0.2s ease;
    }
    .contrast-aaa {
      background: rgba(46, 160, 67, 0.18);
      color: #3fb950;
      border: 1px solid rgba(46, 160, 67, 0.4);
    }
    .contrast-aa {
      background: rgba(56, 139, 253, 0.18);
      color: #58a6ff;
      border: 1px solid rgba(56, 139, 253, 0.4);
    }
    .contrast-low {
      background: rgba(218, 54, 51, 0.18);
      color: #f85149;
      border: 1px solid rgba(218, 54, 51, 0.4);
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
      border-top: 1px solid var(--mock-border);
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
      <button class="btn btn-sync" id="btnUniversalRefresh" onclick="refreshFromVsCode()" title="Universal Live Sync: pull active theme & colors directly from VS Code to update Live Preview and all tiles">
        <span id="syncIcon" style="display:inline-block; font-size: 13px;">🔄</span>
        <span>Sync from VS Code</span>
      </button>

      <button class="btn btn-dock" id="btnToggleDock" onclick="toggleDockPosition()">
        <span id="dockBtnIcon">⬇️</span>
        <span id="dockBtnLabel">Lock to Bottom</span>
      </button>

      <button class="btn" id="btnUndo" onclick="undoThemeChange()" title="Undo theme edit (Ctrl+Z)" disabled>
        <span>↩️</span>
        <span>Undo</span>
      </button>
      <button class="btn" id="btnRedo" onclick="redoThemeChange()" title="Redo theme edit (Ctrl+Y)" disabled>
        <span>↪️</span>
        <span>Redo</span>
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
            <button class="mode-btn active" id="btnUiModeSimple" onclick="setUiMode('simple')">⚡ Simple Mode (${SIMPLE_UI_DEFINITIONS.length} Colors)</button>
            <button class="mode-btn" id="btnUiModeAdvanced" onclick="setUiMode('advanced')">⚙️ Advanced Mode (Granular)</button>
          </div>
        </div>

        <!-- Tab 1A: Simple Mode UI (${SIMPLE_UI_DEFINITIONS.length} Master Colors) -->
        <div id="uiSimpleContainer">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
            ${SIMPLE_UI_DEFINITIONS.length} linked controls cover all ${UI_COLOR_DEFINITIONS.length} color roles used by every bundled preset. A <strong>Mixed</strong> badge means those linked roles currently differ; choosing a color intentionally unifies them. <em>Tip: click a preview element to jump to its control.</em>
          </div>
          ${renderSimpleSections(SIMPLE_UI_DEFINITIONS, renderSimpleUiCard)}
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
                  <input type="color" class="color-picker adv-color-picker" data-target="${def.id}" value="${toColorPickerValue(val, def.defaultValue)}" />
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
            <button class="mode-btn active" id="btnSyntaxModeSimple" onclick="setSyntaxMode('simple')">⚡ Simple Mode (${SIMPLE_SYNTAX_DEFINITIONS.length} Colors)</button>
            <button class="mode-btn" id="btnSyntaxModeAdvanced" onclick="setSyntaxMode('advanced')">⚙️ Advanced Mode (Full Scopes)</button>
          </div>
        </div>

        <!-- Tab 2A: Simple Mode Syntax (${SIMPLE_SYNTAX_DEFINITIONS.length} Master Colors) -->
        <div id="syntaxSimpleContainer">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
            ${SIMPLE_SYNTAX_DEFINITIONS.length} linked controls cover all ${SYNTAX_SCOPE_DEFINITIONS.length} supported syntax roles. A <strong>Mixed</strong> badge preserves intentional differences until you choose one shared color. <em>Tip: click any code token in the preview to jump to its control.</em>
          </div>
          ${renderSimpleSections(SIMPLE_SYNTAX_DEFINITIONS, renderSimpleSyntaxCard)}
        </div>

        <!-- Tab 2B: Advanced Mode Syntax (Full Scopes) -->
        <div id="syntaxAdvancedContainer" style="display: none;">
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 14px;">
            Customize code syntax highlighting across all programming languages.
          </div>
          <div class="color-grid" id="syntaxGrid">
            ${SYNTAX_SCOPE_DEFINITIONS.map((item) => {
              const rule = currentTokens.find((r) => Array.isArray(r.scope) ? r.scope.includes(item.scopes[0]) : r.scope === item.scopes[0]);
              const val = rule?.settings?.foreground || item.defaultColor;
              return `
              <div class="color-card" data-syntax-id="${item.id}">
                <div class="color-card-header">
                  <span class="color-name">${item.name}</span>
                  <span class="contrast-badge contrast-aa" data-adv-syntax-contrast="${item.id}">AA 4.5:1</span>
                  <span class="color-category-badge">Syntax</span>
                </div>
                <div class="color-desc">${item.description}</div>
                <div class="color-input-row">
                  <input type="color" class="color-picker adv-syntax-picker" data-syntax-id="${item.id}" value="${toColorPickerValue(val, item.defaultColor)}" />
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
          <input type="text" class="search-input" id="presetSearchInput" placeholder="🔍 Search ${THEME_PRESETS.length} presets (e.g. tiger, jellyfish, fox, frog, peacock, lemonade, gameboy)..." />
          <div class="pill-filters" style="flex-wrap: wrap; gap: 4px;">
            <span class="pill preset-pill active" data-preset-filter="all">⚡ All (${THEME_PRESETS.length})</span>
            <span class="pill preset-pill" data-preset-filter="dark">🌙 Dark (${THEME_PRESETS.filter((p) => p.type === 'dark').length})</span>
            <span class="pill preset-pill" data-preset-filter="light">☀️ Light (${THEME_PRESETS.filter((p) => p.type === 'light').length})</span>
            <span class="pill preset-pill" data-preset-filter="colorblind">👁️ Accessible & Safe</span>
            <span class="pill preset-pill" data-preset-filter="checkered">🏁 Checkered & B&W</span>
            <span class="pill preset-pill" data-preset-filter="warm">☕ Coffee & Warm</span>
            <span class="pill preset-pill" data-preset-filter="cyber">⚡ Cyber & Neon</span>
            <span class="pill preset-pill" data-preset-filter="pastel">🌸 Pastel & Soft</span>
            <span class="pill preset-pill" data-preset-filter="creative">🎨 Creative & Retro</span>
            <span class="pill preset-pill" data-preset-filter="animals">🐾 Animals & Wildlife</span>
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
            <span style="color: var(--accent); font-size: 9px;">● Every displayed role is clickable</span>
          </div>

          <!-- Compact Size & Scale Controls -->
          <div class="preview-controls-row">

            <!-- Preview Content -->
            <div class="size-btn-group" role="group" aria-label="Preview content">
              <button type="button" class="size-btn preview-mode-btn active" data-preview-mode="workbench" aria-pressed="true">Workbench</button>
              <button type="button" class="size-btn preview-mode-btn" data-preview-mode="ui" aria-pressed="false">All UI (${UI_COLOR_DEFINITIONS.length})</button>
              <button type="button" class="size-btn preview-mode-btn" data-preview-mode="syntax" aria-pressed="false">Syntax (${SYNTAX_SCOPE_DEFINITIONS.length})</button>
            </div>

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

        <div class="preview-panel" id="previewWorkbenchPanel" data-preview-panel="workbench">
          <div class="mock-window" id="mockWindow">

          <!-- Mock Top Title Bar -->
          <div class="mock-titlebar mock-clickable" id="mockTitlebar" data-inspect-ui="titleBar.activeBackground" data-inspect-simple-ui="simple.chromeBg" title="Click to highlight Title Bar Background">
            <span class="mock-clickable" data-inspect-ui="titleBar.activeForeground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Title Bar Text">SimpleTheme — VS Code</span>
          </div>

          <!-- Mock Middle (Activity Bar + Sidebar + Editor) -->
          <div class="mock-body">

            <!-- Activity Bar -->
            <div class="mock-activitybar mock-clickable" id="mockActivityBar" data-inspect-ui="activityBar.background" data-inspect-simple-ui="simple.chromeBg" title="Click to highlight Activity Bar Background">
              <span class="mock-clickable" data-inspect-ui="activityBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Navigation Icons">📄</span>
              <span class="mock-clickable" data-inspect-ui="activityBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Navigation Icons">🔍</span>
              <span class="mock-clickable" data-inspect-ui="activityBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Navigation Icons">⚡</span>
              <span class="mock-clickable" data-inspect-ui="activityBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Navigation Icons">🎨</span>
            </div>

            <!-- Sidebar -->
            <div class="mock-sidebar mock-clickable" id="mockSidebar" data-inspect-ui="sideBar.background" data-inspect-simple-ui="simple.chromeBg" title="Click to highlight Sidebar Background">
              <div class="mock-sidebar-title mock-clickable" id="mockSidebarTitle" data-inspect-ui="sideBarTitle.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Sidebar Title (EXPLORER)" style="font-weight: 700; margin-bottom: 2px;">EXPLORER</div>
              <div class="mock-tree-item mock-clickable" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Explorer Text">📁 src</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Explorer Text">📄 themeEngine.ts</div>
              <div class="mock-tree-item mock-clickable" id="mockTreeSelected" style="padding-left: 6px; color: var(--mock-accent);" data-inspect-ui="focusBorder" data-inspect-simple-ui="simple.accent" title="Click to highlight Selected File Accent">📄 presets.ts</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Explorer Text">📄 studio.tsx</div>
              <div class="mock-tree-item mock-clickable" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Explorer Text">📁 media</div>
              <div class="mock-tree-item mock-clickable" style="padding-left: 6px;" data-inspect-ui="sideBar.foreground" data-inspect-simple-ui="simple.navigationText" title="Click to highlight Explorer Text">🖼️ logo.svg</div>
            </div>

            <!-- Editor Area -->
            <div class="mock-editor-area">

              <!-- Tabs Bar -->
              <div class="mock-tabs-bar mock-clickable" id="mockTabsBar" data-inspect-ui="editorGroupHeader.tabsBackground" data-inspect-simple-ui="simple.chromeBg" title="Click to highlight Tabs Bar color">
                <div class="mock-tab active mock-clickable" id="mockActiveTab" data-inspect-ui="tab.activeBackground" data-inspect-simple-ui="simple.canvasBg" title="Click to highlight Active Tab Background">
                  <span class="mock-clickable" data-inspect-ui="tab.activeForeground" data-inspect-simple-ui="simple.primaryText" title="Click to highlight Active Tab Text">📄 studio.tsx</span>
                </div>
                <div class="mock-tab mock-clickable" id="mockInactiveTab" data-inspect-ui="tab.inactiveBackground" data-inspect-simple-ui="simple.secondaryBg" title="Click to highlight Inactive Tab Background">
                  <span class="mock-clickable" data-inspect-ui="tab.inactiveForeground" data-inspect-simple-ui="simple.mutedText" title="Click to highlight Inactive Tab Text">📄 themeEngine.ts</span>
                </div>
              </div>

              <!-- Editor Code Canvas -->
              <div class="mock-editor-canvas mock-clickable" id="mockCanvas" data-inspect-ui="editor.background" data-inspect-simple-ui="simple.canvasBg" title="Click to highlight Editor Canvas Background">
                <div style="margin-bottom: 3px;"><span class="mock-line-number mock-clickable" id="mockLineNumber" data-preview-target="editor-line-number-1" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 1 — edit line-number text" title="Click to highlight Line Numbers">1</span>  <span class="syn-comment mock-clickable" id="synComment" data-inspect-syntax="comments" data-inspect-simple-syntax="simple.comments" title="Click to highlight Comments">// SimpleTheme Realtime Studio</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-2" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 2 — edit line-number text" title="Click to highlight Line Numbers">2</span>  <span class="syn-keyword mock-clickable" id="synKw1" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">import</span> <span class="syn-op mock-clickable" data-preview-target="code-brace-import-open" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">{</span> <span class="syn-var mock-clickable" id="synVar1" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">SimpleTheme</span> <span class="syn-op mock-clickable" data-preview-target="code-brace-import-close" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">}</span> <span class="syn-keyword mock-clickable" id="synKw2" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">from</span> <span class="syn-string mock-clickable" id="synStr1" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings">'simpletheme'</span><span class="syn-op mock-clickable" data-preview-target="code-semicolon-import" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">;</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-3" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 3 — edit line-number text" title="Click to highlight Line Numbers">3</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-4" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 4 — edit line-number text" title="Click to highlight Line Numbers">4</span>  <span class="syn-keyword mock-clickable" id="synKw3" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">export</span> <span class="syn-keyword mock-clickable" id="synKw4" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">interface</span> <span class="syn-type mock-clickable" id="synType1" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types & Classes">ThemeProfile</span> <span class="syn-op mock-clickable" data-preview-target="code-brace-interface-open" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">{</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-5" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 5 — edit line-number text" title="Click to highlight Line Numbers">5</span>    <span class="syn-prop mock-clickable" id="synProp1" data-inspect-syntax="properties" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Object & JSON Keys">id</span><span class="syn-op mock-clickable" data-preview-target="code-colon-id" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-type mock-clickable" id="synType2" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">string</span><span class="syn-op mock-clickable" data-preview-target="code-semicolon-id" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">;</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-6" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 6 — edit line-number text" title="Click to highlight Line Numbers">6</span>    <span class="syn-prop mock-clickable" id="synProp2" data-inspect-syntax="properties" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Object & JSON Keys">name</span><span class="syn-op mock-clickable" data-preview-target="code-colon-name" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-type mock-clickable" id="synType3" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">string</span><span class="syn-op mock-clickable" data-preview-target="code-semicolon-name" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">;</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-7" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 7 — edit line-number text" title="Click to highlight Line Numbers">7</span>  <span class="syn-op mock-clickable" data-preview-target="code-brace-interface-close" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">}</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-8" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 8 — edit line-number text" title="Click to highlight Line Numbers">8</span></div>
                <div><span class="mock-line-number mock-line-number-active mock-clickable" data-preview-target="editor-line-number-9" data-inspect-ui="editorLineNumber.activeForeground" data-inspect-simple-ui="simple.accent" aria-label="Active line number 9 — edit active line-number text" title="Click to highlight Active Line Number">9</span>  <span class="syn-keyword mock-clickable" id="synKw5" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">export</span> <span class="syn-keyword mock-clickable" id="synKw6" data-inspect-syntax="keywords" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Keywords">function</span> <span class="syn-func mock-clickable" id="synFunc1" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">activateTheme</span><span class="syn-op mock-clickable" data-preview-target="code-paren-function-open" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">(</span><span class="syn-var mock-clickable" id="synVar2" data-inspect-syntax="variables" data-inspect-simple-syntax="simple.variables" title="Click to highlight Variables">palette</span><span class="syn-op mock-clickable" data-preview-target="code-colon-parameter" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-type mock-clickable" id="synType4" data-inspect-syntax="types" data-inspect-simple-syntax="simple.types" title="Click to highlight Types">ThemeProfile</span><span class="syn-op mock-clickable" data-preview-target="code-paren-function-close" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">)</span> <span class="syn-op mock-clickable" data-preview-target="code-brace-function-open" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">{</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-10" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 10 — edit line-number text" title="Click to highlight Line Numbers">10</span>   <span class="syn-func mock-clickable" id="synFunc2" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">console</span><span class="syn-op mock-clickable" data-preview-target="code-dot-console-log" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">.</span><span class="syn-func mock-clickable" id="synFunc3" data-inspect-syntax="functions" data-inspect-simple-syntax="simple.functions" title="Click to highlight Functions">log</span><span class="syn-op mock-clickable" data-preview-target="code-paren-log-open" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">(</span><span class="syn-string mock-clickable" id="synStr2" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings">\`✨ Applied \${palette.name}!\`</span><span class="syn-op mock-clickable" data-preview-target="code-paren-log-close" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">)</span><span class="syn-op mock-clickable" data-preview-target="code-semicolon-log" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">;</span></div>
                <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-11" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 11 — edit line-number text" title="Click to highlight Line Numbers">11</span> <span class="syn-op mock-clickable" data-preview-target="code-brace-function-close" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">}</span></div>
                <div style="position: relative; margin-top: 3px;">
                  <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-12" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 12 — edit line-number text" title="Click to highlight Line Numbers">12</span>  <span class="syn-prop mock-clickable" id="synProp3" data-inspect-syntax="properties" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Object & JSON Keys">"model"</span><span class="syn-op mock-clickable" data-preview-target="code-colon-model" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-string mock-clickable" id="synStr3" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings & Text Literals">"qwen3.8-27b"</span><span class="syn-op mock-clickable" data-preview-target="code-comma-model" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">,</span></div>
                  <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-13" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 13 — edit line-number text" title="Click to highlight Line Numbers">13</span>  <span class="syn-prop mock-clickable" id="synProp4" data-inspect-syntax="properties" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Object & JSON Keys">"maxTokens"</span><span class="syn-op mock-clickable" data-preview-target="code-colon-max-tokens" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-num mock-clickable" id="synNum1" data-inspect-syntax="numbers" data-inspect-simple-syntax="simple.numbers" title="Click to highlight Numbers & Booleans">1000000</span><span class="syn-op mock-clickable" data-preview-target="code-comma-max-tokens" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">,</span></div>
                  <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-14" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 14 — edit line-number text" title="Click to highlight Line Numbers">14</span>  <span class="syn-prop mock-clickable" id="synProp5" data-inspect-syntax="properties" data-inspect-simple-syntax="simple.keywords" title="Click to highlight Object & JSON Keys">"agentMode"</span><span class="syn-op mock-clickable" data-preview-target="code-colon-agent-mode" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">:</span> <span class="syn-num mock-clickable" id="synNum2" data-inspect-syntax="numbers" data-inspect-simple-syntax="simple.numbers" title="Click to highlight Numbers & Booleans">true</span></div>
                  <div><span class="mock-line-number mock-clickable" data-preview-target="editor-line-number-15" data-inspect-ui="editorLineNumber.foreground" data-inspect-simple-ui="simple.mutedText" aria-label="Line number 15 — edit line-number text" title="Click to highlight Line Numbers">15</span>  <span class="syn-tag mock-clickable" data-inspect-syntax="tags" data-inspect-simple-syntax="simple.functions" title="Click to highlight HTML / JSX Tags">&lt;ThemePreview</span> <span class="syn-tag mock-clickable" data-inspect-syntax="tags" data-inspect-simple-syntax="simple.functions" title="Click to highlight HTML / JSX Attributes">accent</span><span class="syn-op mock-clickable" data-preview-target="code-equals-jsx" data-inspect-syntax="operators" data-inspect-simple-syntax="simple.variables" title="Click to highlight Operators">=</span><span class="syn-string mock-clickable" data-inspect-syntax="strings" data-inspect-simple-syntax="simple.strings" title="Click to highlight Strings & Text Literals">"lemon"</span> <span class="syn-tag mock-clickable" data-inspect-syntax="tags" data-inspect-simple-syntax="simple.functions" title="Click to highlight HTML / JSX Tags">/&gt;</span></div>
                  <div style="display:flex; gap:7px; margin-top:2px;">
                    <span class="mock-clickable" id="mockTerminalSuccess" data-inspect-ui="terminal.ansiGreen" data-inspect-simple-ui="simple.success" title="Click to highlight Terminal Success">✓ success</span>
                    <span class="mock-clickable" id="mockTerminalInfo" data-inspect-ui="terminal.ansiCyan" data-inspect-simple-ui="simple.info" title="Click to highlight Terminal Info">i info</span>
                    <span class="mock-clickable" id="mockTerminalWarning" data-inspect-ui="terminal.ansiYellow" data-inspect-simple-ui="simple.warning" title="Click to highlight Terminal Warning">! warning</span>
                    <span class="mock-clickable" id="mockSelection" data-preview-target="editor-selection-background" data-inspect-ui="editor.selectionBackground" data-inspect-simple-ui="simple.selectionBg" title="Click the selection padding to highlight Selection Background" style="padding:0 2px;"><span class="mock-clickable" id="mockSelectionText" data-preview-target="editor-selection-text" data-inspect-ui="editor.foreground" data-inspect-simple-ui="simple.primaryText" title="Click the selected text to highlight Editor Text">selected</span></span>
                  </div>
                  <!-- Floating Mock Hover Tooltip -->
                  <div class="mock-hover-widget mock-clickable" id="mockHoverWidget" data-inspect-ui="editorHoverWidget.background" data-inspect-simple-ui="simple.popupBg" style="position: absolute; right: 12px; top: -14px; background: rgba(0,0,0,0.85); border: 1px solid var(--mock-border); border-radius: 4px; padding: 2px 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.4); font-size: calc(8.5px * var(--preview-scale)); z-index: 10; display: flex; align-items: center; gap: 4px;" title="Click to highlight Hover Popup Background">
                    <span class="mock-clickable" id="mockHoverText" data-inspect-ui="editorHoverWidget.foreground" data-inspect-simple-ui="simple.primaryText" style="font-weight: 600;" title="Click to highlight Popup Text">⚠️ Unknown Configuration Setting</span>
                  </div>
                </div>
              </div>

              <!-- Mock Chat / Prompt Box Panel -->
              <div class="mock-chat-panel mock-clickable" id="mockChatPanel" data-inspect-ui="panel.background" data-inspect-simple-ui="simple.canvasBg" style="border-top: 1px solid var(--mock-border); background: var(--card-bg); padding: 5px 8px; display: flex; flex-direction: column; gap: 4px; font-size: calc(9.5px * var(--preview-scale)); flex-shrink: 0;" title="Click to highlight Panel Container Background">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <span class="mock-clickable" id="mockPanelTitleActive" data-inspect-ui="panelTitle.activeForeground" data-inspect-simple-ui="simple.primaryText" style="font-weight: 700; color: var(--mock-accent); cursor: pointer;" title="Click to highlight Active Panel Tab (Chat)">Chat</span>
                    <span class="mock-clickable" id="mockPanelTitleInactive" data-inspect-ui="panelTitle.inactiveForeground" data-inspect-simple-ui="simple.mutedText" style="color: var(--text-muted); cursor: pointer;" title="Click to highlight Inactive Panel Tabs (Codex, CodeGPT)">Codex</span>
                  </div>
                  <span class="mock-clickable" id="mockIcon" data-inspect-ui="icon.foreground" data-inspect-simple-ui="simple.primaryText" style="color: var(--text-muted); cursor: pointer; font-size: 10px;" title="Click to highlight UI Icons (+, ⚙️, X)">+ ⚙️ ⛶ ✕</span>
                </div>
                <div class="mock-chat-bubble mock-clickable" id="mockChatBubble" data-preview-target="chat-request-border" data-inspect-ui="chat.requestBorder" data-inspect-simple-ui="simple.border" style="border: 1px solid var(--mock-border); border-radius: 4px; padding: 1px; font-weight: 600;" title="Click the outline to highlight Chat Borders">
                  <div class="mock-chat-surface mock-clickable" id="mockChatBubbleSurface" data-preview-target="chat-request-background" data-inspect-ui="chat.requestBackground" data-inspect-simple-ui="simple.inputBg" title="Click the bubble padding to highlight Chat User Request Background"><span class="mock-clickable" id="mockChatText" data-preview-target="chat-request-text" data-inspect-ui="foreground" data-inspect-simple-ui="simple.primaryText" title="Click the request text to highlight Primary Text">← heyy</span></div>
                </div>
                <div class="mock-input-box mock-clickable" id="mockInputBox" data-inspect-ui="input.background" data-inspect-simple-ui="simple.inputBg" style="background: rgba(0,0,0,0.3); border: 1px solid var(--mock-border); border-radius: 4px; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;" title="Click to highlight Input / Chat Box Background">
                  <span id="mockInputPlaceholder" class="mock-clickable" data-inspect-ui="input.placeholderForeground" data-inspect-simple-ui="simple.mutedText" style="color: var(--text-muted);" title="Click to highlight Input Placeholder Text">just checking in, what you're capable of</span>
                  <span id="mockCounter" class="mock-clickable" data-inspect-ui="descriptionForeground" data-inspect-simple-ui="simple.mutedText" style="color: var(--text-muted); font-size: 8px; margin-left: 4px;" title="Click to highlight Muted / Counter Text (3/3)">3/3</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Mock Bottom Status Bar -->
          <div class="mock-statusbar mock-clickable" id="mockStatusBar" data-inspect-ui="statusBar.background" data-inspect-simple-ui="simple.statusBarBg" title="Click to highlight Status Bar Background">
            <span class="mock-clickable" data-inspect-ui="statusBar.foreground" data-inspect-simple-ui="simple.onAccentText" title="Click to highlight Text on Accent">⚡ SimpleTheme: Active</span>
            <span class="mock-clickable" data-inspect-ui="statusBar.foreground" data-inspect-simple-ui="simple.onAccentText" title="Click to highlight Text on Accent">TypeScript • UTF-8</span>
          </div>

          </div>
        </div>

        <div class="preview-panel preview-role-gallery" id="previewUiPanel" data-preview-panel="ui" hidden>
          <p class="preview-gallery-intro">All ${UI_COLOR_DEFINITIONS.length} granular UI options are shown here. Click any sample or label to open its exact Advanced control, or its owning Simple control when Simple Mode is active.</p>
          ${renderPreviewUiGallery()}
        </div>

        <div class="preview-panel preview-role-gallery" id="previewSyntaxPanel" data-preview-panel="syntax" hidden>
          <p class="preview-gallery-intro">All ${SYNTAX_SCOPE_DEFINITIONS.length} syntax options are independently clickable. Grouped Simple controls still keep every repeated token reachable from the preview.</p>
          <section class="preview-option-section" aria-label="Syntax colors">
            <div class="preview-option-grid">${SYNTAX_SCOPE_DEFINITIONS.map(renderPreviewSyntaxOption).join('')}</div>
          </section>
        </div>

      </div>
    </div>

  </div>

  <script>
    const vscode = acquireVsCodeApi();

    (function() {
      const activeState = {
        profileName: ${JSON.stringify(activeProfileName)},
        themeKind: ${JSON.stringify(effectiveState.themeKind)},
        colors: ${JSON.stringify(currentColors)},
        tokenColors: ${JSON.stringify(currentTokens)},
        liveApply: ${JSON.stringify(liveApplyEnabled)},
        dockPosition: 'right', // 'right' | 'bottom'
        previewMode: 'workbench', // 'workbench' | 'ui' | 'syntax'
        previewHeight: 420,
        previewScale: 1.0,
      };

      const PRESETS = ${JSON.stringify(THEME_PRESETS)};
      const SAVED_PROFILES = ${JSON.stringify(savedProfiles)};
      const SIMPLE_UI_MAP = ${JSON.stringify(SIMPLE_UI_DEFINITIONS)};
      const SIMPLE_SYNTAX_MAP = ${JSON.stringify(SIMPLE_SYNTAX_DEFINITIONS)};
      const SYNTAX_DEFS = ${JSON.stringify(SYNTAX_SCOPE_DEFINITIONS)};
      const UI_DEFS = ${JSON.stringify(UI_COLOR_DEFINITIONS)};
      const UI_DEFAULTS = Object.fromEntries(UI_DEFS.map(definition => [definition.id, definition.defaultValue]));
      const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
      let clientRevision = 0;
      let latestAuthoritativeRevision = 0;
      let pendingAuthoritativeRevision = null;
      let pendingApplyRevision = null;
      let applyButtonResetTimer = null;
      let resetBarrierRevision = null;
      let deferredExternalSync = false;
      let deferredSyncOverlayFloor = null;
      let discardLiveEditsThroughRevision = 0;
      const localColorEdits = new Map();
      const localSyntaxEdits = new Map();
      const authoritativeOverlayFloors = new Map();
      const applyRequestSnapshots = new Map();

      function readThemeColor(colors, keys, fallback) {
        for (const key of keys) {
          const value = colors[key];
          if (typeof value === 'string' && value.trim() && CSS.supports('color', value.trim())) {
            return value.trim();
          }
        }
        return fallback;
      }

      function colorPickerValue(value, fallback = '#1e1e1e') {
        if (typeof value !== 'string') return fallback;
        const color = value.trim();
        if (/^#[0-9a-f]{6}$/i.test(color)) return color;
        if (/^#[0-9a-f]{8}$/i.test(color)) return color.slice(0, 7);
        if (/^#[0-9a-f]{3}$/i.test(color)) {
          return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
        }
        return fallback;
      }

      function contrastColor(color) {
        const normalized = colorPickerValue(color, '#1e1e1e').slice(1);
        const r = parseInt(normalized.slice(0, 2), 16) / 255;
        const g = parseInt(normalized.slice(2, 4), 16) / 255;
        const b = parseInt(normalized.slice(4, 6), 16) / 255;
        return (0.299 * r + 0.587 * g + 0.114 * b) > 0.58 ? '#111111' : '#ffffff';
      }

      function applyStudioTheme() {
        const colors = activeState.colors || {};
        const isLight = (activeState.themeKind || '').includes('light');
        const bg = readThemeColor(colors, ['editor.background', 'panel.background'], isLight ? '#ffffff' : '#07070a');
        const card = readThemeColor(colors, ['editorWidget.background', 'sideBar.background', 'panel.background'], bg);
        const text = readThemeColor(colors, ['editor.foreground', 'foreground', 'sideBar.foreground'], isLight ? '#1f2328' : '#f0f0f8');
        const cardText = readThemeColor(colors, ['editorWidget.foreground', 'sideBar.foreground', 'foreground'], text);
        const muted = readThemeColor(colors, ['editorLineNumber.foreground', 'descriptionForeground', 'input.placeholderForeground'], text);
        const accent = readThemeColor(colors, ['focusBorder', 'tab.activeBorderTop', 'textLink.foreground', 'activityBarBadge.background'], isLight ? '#0969da' : '#ffe600');
        const secondary = readThemeColor(colors, ['textLink.foreground', 'terminal.ansiCyan', 'editorCursor.foreground'], accent);
        const control = readThemeColor(colors, ['input.background', 'editorWidget.background', 'sideBarSectionHeader.background'], card);
        const border = readThemeColor(colors, ['panel.border', 'editorWidget.border', 'editorHoverWidget.border'], 'color-mix(in srgb, ' + text + ' 16%, transparent)');
        const onAccent = readThemeColor(colors, ['activityBarBadge.foreground', 'badge.foreground'], contrastColor(accent));
        const danger = readThemeColor(colors, ['errorForeground', 'statusBar.debuggingBackground'], '#f14c4c');
        const root = document.documentElement;

        root.style.colorScheme = isLight ? 'light' : 'dark';
        root.style.setProperty('--bg', bg);
        root.style.setProperty('--card-bg', card);
        root.style.setProperty('--card-text', cardText);
        root.style.setProperty('--text', text);
        root.style.setProperty('--text-muted', muted);
        root.style.setProperty('--accent', accent);
        root.style.setProperty('--accent-blue', secondary);
        root.style.setProperty('--control-bg', control);
        root.style.setProperty('--card-border', border);
        root.style.setProperty('--on-accent', onAccent);
        root.style.setProperty('--danger', danger);
      }

      function setProfileName(name) {
        activeState.profileName = name;
        const label = document.getElementById('activeProfileLabel');
        if (label) label.innerText = name;
      }

      function markThemeModified(colorKeys = [], syntaxIds = []) {
        pushHistorySnapshot();
        clientRevision += 1;
        colorKeys.forEach(key => {
          localColorEdits.set(key, {
            revision: clientRevision,
            value: activeState.colors[key],
          });
        });
        syntaxIds.forEach(syntaxId => {
          localSyntaxEdits.set(syntaxId, {
            revision: clientRevision,
            value: getActiveSyntaxColor(syntaxId),
          });
        });
        if (activeState.profileName !== 'Custom') {
          setProfileName('Custom');
        }
        return clientRevision;
      }

      function getHexLuminance(hexColor) {
        const normalized = colorPickerValue(hexColor, '#1e1e1e').slice(1);
        const r = parseInt(normalized.slice(0, 2), 16) / 255;
        const g = parseInt(normalized.slice(2, 4), 16) / 255;
        const b = parseInt(normalized.slice(4, 6), 16) / 255;
        const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
      }

      function getWcagContrast(fgHex, bgHex) {
        const l1 = getHexLuminance(fgHex);
        const l2 = getHexLuminance(bgHex);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (ratio >= 7.0) return { text: 'AAA ' + ratio.toFixed(1) + ':1', cls: 'contrast-aaa' };
        if (ratio >= 4.5) return { text: 'AA ' + ratio.toFixed(1) + ':1', cls: 'contrast-aa' };
        return { text: '⚠️ ' + ratio.toFixed(1) + ':1', cls: 'contrast-low' };
      }

      function updateContrastBadges() {
        const editorBg = activeState.colors['editor.background'] || '#1e1e1e';
        
        SIMPLE_SYNTAX_MAP.forEach(def => {
          const badge = document.querySelector('[data-simple-syntax-contrast="' + def.id + '"]');
          if (badge) {
            const syntaxVal = getActiveSyntaxColor(def.targets[0]) || def.defaultColor;
            const res = getWcagContrast(syntaxVal, editorBg);
            badge.innerText = res.text;
            badge.className = 'contrast-badge ' + res.cls;
          }
        });

        SYNTAX_DEFS.forEach(def => {
          const badge = document.querySelector('[data-adv-syntax-contrast="' + def.id + '"]');
          if (badge) {
            const syntaxVal = getActiveSyntaxColor(def.id) || def.defaultColor;
            const res = getWcagContrast(syntaxVal, editorBg);
            badge.innerText = res.text;
            badge.className = 'contrast-badge ' + res.cls;
          }
        });
      }

      // History Stack for Undo/Redo
      const historyStack = [];
      let historyIndex = -1;
      const MAX_HISTORY = 40;
      let isRestoringHistory = false;

      function pushHistorySnapshot() {
        if (isRestoringHistory) return;
        const snapshot = {
          colors: { ...activeState.colors },
          tokenColors: activeState.tokenColors.map(r => ({
            ...r,
            settings: { ...r.settings }
          })),
          themeKind: activeState.themeKind,
          profileName: activeState.profileName
        };

        if (historyIndex < historyStack.length - 1) {
          historyStack.splice(historyIndex + 1);
        }
        historyStack.push(snapshot);
        if (historyStack.length > MAX_HISTORY) {
          historyStack.shift();
        }
        historyIndex = historyStack.length - 1;
        updateHistoryButtonsState();
      }

      function updateHistoryButtonsState() {
        const btnUndo = document.getElementById('btnUndo');
        const btnRedo = document.getElementById('btnRedo');
        if (btnUndo) btnUndo.disabled = historyIndex <= 0;
        if (btnRedo) btnRedo.disabled = historyIndex >= historyStack.length - 1;
      }

      window.undoThemeChange = function() {
        if (historyIndex > 0) {
          historyIndex--;
          restoreHistorySnapshot(historyStack[historyIndex]);
        }
      };

      window.redoThemeChange = function() {
        if (historyIndex < historyStack.length - 1) {
          historyIndex++;
          restoreHistorySnapshot(historyStack[historyIndex]);
        }
      };

      function restoreHistorySnapshot(snapshot) {
        if (!snapshot) return;
        isRestoringHistory = true;
        try {
          activeState.colors = { ...snapshot.colors };
          activeState.tokenColors = snapshot.tokenColors.map(r => ({
            ...r,
            settings: { ...r.settings }
          }));
          activeState.themeKind = snapshot.themeKind;
          activeState.profileName = snapshot.profileName;
          setProfileName(snapshot.profileName);
          renderActiveTheme();
          
          const editRevision = markThemeModified(Object.keys(snapshot.colors), SYNTAX_DEFS.map(s => s.id));
          Object.entries(snapshot.colors).forEach(([k, v]) => queueLiveColor(k, v, editRevision));
          SYNTAX_DEFS.forEach(s => queueLiveToken(s.id, getActiveSyntaxColor(s.id), editRevision));
          flushLiveColors();
          flushLiveTokens();
          updateHistoryButtonsState();
        } finally {
          isRestoringHistory = false;
        }
      }

      window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z') && !e.shiftKey) {
          e.preventDefault();
          window.undoThemeChange();
        } else if (((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z'))) {
          e.preventDefault();
          window.redoThemeChange();
        }
      });

      applyStudioTheme();

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

      function setPreviewMode(mode) {
        activeState.previewMode = mode;
        document.querySelectorAll('[data-preview-panel]').forEach(panel => {
          panel.hidden = panel.getAttribute('data-preview-panel') !== mode;
        });
        document.querySelectorAll('[data-preview-mode]').forEach(button => {
          const isActive = button.getAttribute('data-preview-mode') === mode;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });
      }

      document.querySelectorAll('[data-preview-mode]').forEach(button => {
        button.addEventListener('click', () => setPreviewMode(button.getAttribute('data-preview-mode')));
      });

      function activatePreviewTarget(element, event) {
          event.stopPropagation(); // The leaf text/token wins over its background container.

          const inspectUi = element.getAttribute('data-inspect-ui');
          const inspectSimpleUi = element.getAttribute('data-inspect-simple-ui');
          const inspectSyntax = element.getAttribute('data-inspect-syntax');
          const inspectSimpleSyntax = element.getAttribute('data-inspect-simple-syntax');

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
      }

      document.querySelectorAll('.mock-clickable').forEach(el => {
        const isNativeButton = el.tagName === 'BUTTON';
        if (!isNativeButton) {
          el.setAttribute('role', 'button');
          el.setAttribute('tabindex', '0');
        }
        if (!el.getAttribute('aria-label')) {
          el.setAttribute('aria-label', el.getAttribute('title') || 'Edit this preview color');
        }

        el.addEventListener('click', function(e) {
          activatePreviewTarget(this, e);
        });

        if (!isNativeButton) {
          el.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            if (e.preventDefault) e.preventDefault();
            activatePreviewTarget(this, e);
          });
        }
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
        const filter = activePill ? (activePill.getAttribute('data-preset-filter') || 'all') : 'all';

        document.querySelectorAll('.preset-card[data-preset-type]').forEach(card => {
          const pType = card.getAttribute('data-preset-type') || '';
          const pName = card.getAttribute('data-preset-name') || '';

          let matchesFilter = true;
          if (filter === 'all') {
            matchesFilter = true;
          } else if (filter === 'dark' || filter === 'light') {
            matchesFilter = pType === filter;
          } else if (filter === 'colorblind') {
            matchesFilter = pName.includes('colorblind') || pName.includes('accessible') || pName.includes('contrast');
          } else if (filter === 'checkered') {
            matchesFilter = pName.includes('checker') || pName.includes('b&w') || pName.includes('binary') || pName.includes('carbon');
          } else if (filter === 'warm') {
            matchesFilter = pName.includes('latte') || pName.includes('sepia') || pName.includes('amber') || pName.includes('pastry') || pName.includes('cabin') || pName.includes('sunflower') || pName.includes('sunset') || pName.includes('solarized') || pName.includes('matcha') || pName.includes('espresso') || pName.includes('walnut');
          } else if (filter === 'cyber') {
            matchesFilter = pName.includes('cyber') || pName.includes('matrix') || pName.includes('synthwave') || pName.includes('alien') || pName.includes('void') || pName.includes('hyperion') || pName.includes('abyssal') || pName.includes('neon') || pName.includes('tokyo') || pName.includes('dracula') || pName.includes('oled') || pName.includes('lemonade');
          } else if (filter === 'pastel') {
            matchesFilter = pName.includes('sakura') || pName.includes('cotton') || pName.includes('peach') || pName.includes('lavender') || pName.includes('mint') || pName.includes('vanilla') || pName.includes('catppuccin') || pName.includes('ghost') || pName.includes('clean');
          } else if (filter === 'creative') {
            matchesFilter = pName.includes('gameboy') || pName.includes('lego') || pName.includes('wave') || pName.includes('halloween') || pName.includes('bauhaus') || pName.includes('python') || pName.includes('rust') || pName.includes('arcade');
          } else if (filter === 'animals') {
            matchesFilter = pName.includes('panther') || pName.includes('chameleon') || pName.includes('tiger') || pName.includes('fox') || pName.includes('orca') || pName.includes('catppuccin') || pName.includes('jellyfish') || pName.includes('poison dart') || pName.includes('peacock') || pName.includes('firefly') || pName.includes('animal') || pName.includes('wildlife');
          }

          const matchesQuery = !query || pName.includes(query);

          if (matchesFilter && matchesQuery) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      // Keep one acknowledged batch in flight per stream. While VS Code is writing
      // settings, newer drag values collapse by key instead of building a stale queue.
      let liveColorFlushTimer = null;
      let pendingLiveColors = {};
      let liveColorInFlight = null;
      let nextLiveColorBatchId = 1;

      function queueLiveColor(key, value, revision) {
        if (!activeState.liveApply) return;
        pendingLiveColors[key] = { value, revision, retryCount: 0 };
        if (!liveColorFlushTimer && resetBarrierRevision === null) {
          liveColorFlushTimer = setTimeout(flushLiveColors, 80);
        }
      }

      function flushLiveColors() {
        if (liveColorFlushTimer) clearTimeout(liveColorFlushTimer);
        liveColorFlushTimer = null;
        if (
          !activeState.liveApply ||
          resetBarrierRevision !== null ||
          liveColorInFlight ||
          Object.keys(pendingLiveColors).length === 0
        ) return;
        const entries = pendingLiveColors;
        pendingLiveColors = {};
        const batchId = nextLiveColorBatchId++;
        liveColorInFlight = { batchId, entries };
        const colors = Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.value]));
        vscode.postMessage({ command: 'applyLiveColors', colors, batchId });
      }

      function settleLiveColors(message) {
        if (!liveColorInFlight || message.batchId !== liveColorInFlight.batchId) return;
        const failedEntries = liveColorInFlight.entries;
        liveColorInFlight = null;
        let retryNeeded = false;
        if (message.ok === false) {
          Object.entries(failedEntries).forEach(([key, entry]) => {
            const newer = pendingLiveColors[key];
            if (!newer && entry.revision > discardLiveEditsThroughRevision && entry.retryCount < 1) {
              pendingLiveColors[key] = { ...entry, retryCount: entry.retryCount + 1 };
              retryNeeded = true;
            }
          });
        }
        if (Object.keys(pendingLiveColors).length > 0 && resetBarrierRevision === null) {
          if (retryNeeded) liveColorFlushTimer = setTimeout(flushLiveColors, 240);
          else flushLiveColors();
        }
        maybeRefreshDeferredExternalSync();
      }

      let liveTokenFlushTimer = null;
      let pendingLiveTokens = {};
      let liveTokenInFlight = null;
      let nextLiveTokenBatchId = 1;

      function queueLiveToken(syntaxId, color, revision) {
        if (!activeState.liveApply) return;
        pendingLiveTokens[syntaxId] = { value: color, revision, retryCount: 0 };
        if (!liveTokenFlushTimer && resetBarrierRevision === null) {
          liveTokenFlushTimer = setTimeout(flushLiveTokens, 80);
        }
      }

      function flushLiveTokens() {
        if (liveTokenFlushTimer) clearTimeout(liveTokenFlushTimer);
        liveTokenFlushTimer = null;
        if (
          !activeState.liveApply ||
          resetBarrierRevision !== null ||
          liveTokenInFlight ||
          Object.keys(pendingLiveTokens).length === 0
        ) return;
        const entries = pendingLiveTokens;
        pendingLiveTokens = {};
        const batchId = nextLiveTokenBatchId++;
        liveTokenInFlight = { batchId, entries };
        const colors = Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.value]));
        vscode.postMessage({ command: 'applyLiveTokenColors', colors, batchId });
      }

      function settleLiveTokens(message) {
        if (!liveTokenInFlight || message.batchId !== liveTokenInFlight.batchId) return;
        const failedEntries = liveTokenInFlight.entries;
        liveTokenInFlight = null;
        let retryNeeded = false;
        if (message.ok === false) {
          Object.entries(failedEntries).forEach(([key, entry]) => {
            const newer = pendingLiveTokens[key];
            if (!newer && entry.revision > discardLiveEditsThroughRevision && entry.retryCount < 1) {
              pendingLiveTokens[key] = { ...entry, retryCount: entry.retryCount + 1 };
              retryNeeded = true;
            }
          });
        }
        if (Object.keys(pendingLiveTokens).length > 0 && resetBarrierRevision === null) {
          if (retryNeeded) liveTokenFlushTimer = setTimeout(flushLiveTokens, 240);
          else flushLiveTokens();
        }
        maybeRefreshDeferredExternalSync();
      }

      function cancelPendingLiveChanges() {
        if (liveColorFlushTimer) clearTimeout(liveColorFlushTimer);
        if (liveTokenFlushTimer) clearTimeout(liveTokenFlushTimer);
        liveColorFlushTimer = null;
        liveTokenFlushTimer = null;
        pendingLiveColors = {};
        pendingLiveTokens = {};
      }

      function beginAuthoritativeRequest() {
        cancelPendingLiveChanges();
        clientRevision += 1;
        latestAuthoritativeRevision = clientRevision;
        pendingAuthoritativeRevision = clientRevision;
        discardLiveEditsThroughRevision = clientRevision;
        localColorEdits.clear();
        localSyntaxEdits.clear();
        authoritativeOverlayFloors.clear();
        authoritativeOverlayFloors.set(clientRevision, clientRevision);
        return clientRevision;
      }

      function beginReconciliationRequest(overlayFloor) {
        clientRevision += 1;
        latestAuthoritativeRevision = clientRevision;
        pendingAuthoritativeRevision = clientRevision;
        discardLiveEditsThroughRevision = clientRevision;
        authoritativeOverlayFloors.clear();
        authoritativeOverlayFloors.set(clientRevision, overlayFloor);
        return clientRevision;
      }

      function beginResetRequest() {
        if (liveColorFlushTimer) clearTimeout(liveColorFlushTimer);
        if (liveTokenFlushTimer) clearTimeout(liveTokenFlushTimer);
        liveColorFlushTimer = null;
        liveTokenFlushTimer = null;
        clientRevision += 1;
        latestAuthoritativeRevision = clientRevision;
        pendingAuthoritativeRevision = clientRevision;
        resetBarrierRevision = clientRevision;
        authoritativeOverlayFloors.clear();
        authoritativeOverlayFloors.set(clientRevision, clientRevision);
        return clientRevision;
      }

      function shouldAcceptAuthoritativeMessage(message) {
        return typeof message.requestRevision !== 'number' || message.requestRevision === latestAuthoritativeRevision;
      }

      function hasOutstandingTransportWork() {
        return (
          pendingAuthoritativeRevision !== null ||
          resetBarrierRevision !== null ||
          !!liveColorInFlight ||
          !!liveTokenInFlight ||
          Object.keys(pendingLiveColors).length > 0 ||
          Object.keys(pendingLiveTokens).length > 0
        );
      }

      function hasUnappliedDraft() {
        return !activeState.liveApply && (localColorEdits.size > 0 || localSyntaxEdits.size > 0);
      }

      function hasOutstandingLocalWork() {
        return hasOutstandingTransportWork() || hasUnappliedDraft();
      }

      function maybeRefreshDeferredExternalSync() {
        if (!deferredExternalSync) return;
        const overlayFloor = deferredSyncOverlayFloor;
        const blocksReconciliation = typeof overlayFloor === 'number'
          ? hasOutstandingTransportWork()
          : hasOutstandingLocalWork();
        if (blocksReconciliation) return;
        deferredExternalSync = false;
        deferredSyncOverlayFloor = null;
        const requestRevision = typeof overlayFloor === 'number'
          ? beginReconciliationRequest(overlayFloor)
          : beginAuthoritativeRequest();
        vscode.postMessage({ command: 'refreshThemeFromVsCode', requestRevision, silent: true });
      }

      // 9. Update Live Mock Workbench & Post Live Changes (0ms Synchronous DOM update)
      function paintLivePreview(key, val) {
        document.querySelectorAll('[data-preview-ui-role]').forEach(element => {
          if (element.getAttribute('data-preview-ui-role') === key) {
            element.style.setProperty('--preview-role-color', val);
          }
        });

        if (key === 'editor.background') {
          const canvas = document.getElementById('mockCanvas');
          if (canvas) canvas.style.background = val;
        } else if (key === 'editor.foreground') {
          const canvas = document.getElementById('mockCanvas');
          if (canvas) canvas.style.color = val;
        } else if (key === 'editorLineNumber.foreground') {
          document.querySelectorAll('.mock-line-number:not(.mock-line-number-active)').forEach(lineNumber => {
            lineNumber.style.color = val;
          });
        } else if (key === 'editorLineNumber.activeForeground') {
          document.querySelectorAll('.mock-line-number-active').forEach(lineNumber => {
            lineNumber.style.color = val;
          });
        } else if (key === 'editor.selectionBackground') {
          const selection = document.getElementById('mockSelection');
          if (selection) selection.style.background = val;
        } else if (key === 'foreground') {
          const panel = document.getElementById('mockChatPanel');
          if (panel) panel.style.color = val;
        } else if (key === 'sideBar.background') {
          const sb = document.getElementById('mockSidebar');
          if (sb) sb.style.background = val;
        } else if (key === 'sideBar.foreground') {
          const sb = document.getElementById('mockSidebar');
          if (sb) sb.style.color = val;
          document.querySelectorAll('.mock-tree-item:not(#mockTreeSelected)').forEach(el => el.style.color = val);
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
        } else if (key === 'focusBorder') {
          const sel = document.getElementById('mockTreeSelected');
          if (sel) sel.style.color = val;
          const mw = document.getElementById('mockWindow');
          if (mw) mw.style.setProperty('--mock-accent', val);
        } else if (key === 'tab.inactiveBackground') {
          const tab = document.getElementById('mockInactiveTab');
          if (tab) tab.style.background = val;
        } else if (key === 'tab.inactiveForeground') {
          const tab = document.getElementById('mockInactiveTab');
          if (tab) tab.style.color = val;
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
        } else if (key === 'panelTitle.activeBorder') {
          const pta = document.getElementById('mockPanelTitleActive');
          if (pta) pta.style.borderBottom = '1px solid ' + val;
        } else if (key === 'panelTitle.inactiveForeground') {
          const pti = document.getElementById('mockPanelTitleInactive');
          if (pti) pti.style.color = val;
        } else if (key === 'icon.foreground') {
          const ico = document.getElementById('mockIcon');
          if (ico) ico.style.color = val;
        } else if (key === 'chat.requestBackground') {
          const cb = document.getElementById('mockChatBubbleSurface');
          if (cb) cb.style.background = val;
        } else if (key === 'chat.requestBorder') {
          const cb = document.getElementById('mockChatBubble');
          if (cb) cb.style.borderColor = val;
        } else if (key === 'interactive.requestBackground') {
          const ib = document.getElementById('mockInputBox');
          if (ib) ib.style.background = val;
        } else if (key === 'panel.background') {
          const cp = document.getElementById('mockChatPanel');
          if (cp) cp.style.background = val;
        } else if (key === 'panel.border') {
          const cp = document.getElementById('mockChatPanel');
          if (cp) cp.style.borderTopColor = val;
          const mw = document.getElementById('mockWindow');
          if (mw) mw.style.setProperty('--mock-border', val);
        } else if (key === 'editorHoverWidget.background') {
          const hw = document.getElementById('mockHoverWidget');
          if (hw) hw.style.background = val;
        } else if (key === 'editorHoverWidget.foreground') {
          const ht = document.getElementById('mockHoverText');
          if (ht) ht.style.color = val;
        } else if (key === 'editorHoverWidget.border') {
          const hw = document.getElementById('mockHoverWidget');
          if (hw) hw.style.borderColor = val;
        } else if (key === 'terminal.ansiGreen') {
          const success = document.getElementById('mockTerminalSuccess');
          if (success) success.style.color = val;
        } else if (key === 'terminal.ansiCyan') {
          const info = document.getElementById('mockTerminalInfo');
          if (info) info.style.color = val;
        } else if (key === 'terminal.ansiYellow') {
          const warning = document.getElementById('mockTerminalWarning');
          if (warning) warning.style.color = val;
        }
      }

      function updateLivePreview(key, val, shouldQueue = true, shouldRefreshStudio = true) {
        activeState.colors[key] = val;
        paintLivePreview(key, val);
        if (shouldRefreshStudio) applyStudioTheme();
        if (shouldQueue) {
          const editRevision = markThemeModified([key]);
          queueLiveColor(key, val, editRevision);
        }
      }

      function paintSyntaxPreview(syntaxId, color) {
        document.querySelectorAll('[data-preview-syntax-role]').forEach(element => {
          if (element.getAttribute('data-preview-syntax-role') === syntaxId) {
            element.style.setProperty('--preview-role-color', color);
          }
        });

        if (syntaxId === 'keywords') {
          document.querySelectorAll('.syn-keyword').forEach(el => el.style.color = color);
        } else if (syntaxId === 'functions') {
          document.querySelectorAll('.syn-func').forEach(el => el.style.color = color);
        } else if (syntaxId === 'properties') {
          document.querySelectorAll('.syn-prop').forEach(el => el.style.color = color);
        } else if (syntaxId === 'strings') {
          document.querySelectorAll('.syn-string').forEach(el => el.style.color = color);
        } else if (syntaxId === 'variables') {
          document.querySelectorAll('.syn-var').forEach(el => el.style.color = color);
        } else if (syntaxId === 'types') {
          document.querySelectorAll('.syn-type').forEach(el => el.style.color = color);
        } else if (syntaxId === 'comments') {
          document.querySelectorAll('.syn-comment').forEach(el => el.style.color = color);
        } else if (syntaxId === 'numbers') {
          document.querySelectorAll('.syn-num').forEach(el => el.style.color = color);
        } else if (syntaxId === 'operators') {
          document.querySelectorAll('.syn-op').forEach(el => el.style.color = color);
        } else if (syntaxId === 'tags') {
          document.querySelectorAll('.syn-tag').forEach(el => el.style.color = color);
        }
      }

      function tokenRuleMatchesSyntax(rule, item) {
        const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
        return scopes.some(scope => item.scopes.includes(scope));
      }

      function getActiveSyntaxColors(syntaxId) {
        const item = SYNTAX_DEFS.find(definition => definition.id === syntaxId);
        if (!item) return [];
        return activeState.tokenColors
          .filter(candidate => tokenRuleMatchesSyntax(candidate, item))
          .map(rule => rule?.settings?.foreground)
          .filter(color => typeof color === 'string');
      }

      function getActiveSyntaxColor(syntaxId) {
        return getActiveSyntaxColors(syntaxId)[0] || null;
      }

      function updateLiveSyntax(syntaxId, color, shouldQueue = true) {
        paintSyntaxPreview(syntaxId, color);

        const item = SYNTAX_DEFS.find(s => s.id === syntaxId);
        if (item) {
          const scope = item.scopes;
          const matchingIndices = activeState.tokenColors.reduce((indices, rule, index) => {
            if (tokenRuleMatchesSyntax(rule, item)) indices.push(index);
            return indices;
          }, []);
          if (matchingIndices.length > 0) {
            matchingIndices.forEach(index => {
              activeState.tokenColors[index] = {
                ...activeState.tokenColors[index],
                settings: { ...activeState.tokenColors[index].settings, foreground: color },
              };
            });
          } else {
            activeState.tokenColors.push({ scope, settings: { foreground: color } });
          }
        }

        if (shouldQueue) {
          const editRevision = markThemeModified([], [syntaxId]);
          queueLiveToken(syntaxId, color, editRevision);
        }
      }

      // 10. Simple Mode UI Handlers
      function preserveExistingAlpha(rgb, hexInput) {
        const existing = hexInput && typeof hexInput.value === 'string' ? hexInput.value.trim() : '';
        return /^#[0-9a-f]{8}$/i.test(existing) ? rgb + existing.slice(7) : rgb;
      }

      function setPickerValue(picker, value, fallback) {
        if (picker) picker.value = colorPickerValue(value, fallback);
      }

      function validateHexInput(input) {
        const value = input.value.trim();
        const isValid = HEX_COLOR_PATTERN.test(value);
        input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
        return isValid ? value : null;
      }

      function getSimpleUiState(definition) {
        const values = definition.targets.map(target => activeState.colors[target] || UI_DEFAULTS[target] || definition.defaultColor);
        return {
          displayValue: values[0] || definition.defaultColor,
          mixed: new Set(values.map(value => String(value).trim().toLowerCase())).size > 1,
        };
      }

      function syncSimpleUiGroup(definition) {
        const state = getSimpleUiState(definition);
        const picker = document.querySelector('.simple-ui-picker[data-simple-id="' + definition.id + '"]');
        const hex = document.querySelector('.simple-ui-hex[data-simple-id="' + definition.id + '"]');
        const badge = document.querySelector('[data-simple-ui-state="' + definition.id + '"]');
        const card = document.querySelector('[data-simple-ui-id="' + definition.id + '"]');
        const activeElement = document.activeElement;
        if (picker !== activeElement) setPickerValue(picker, state.displayValue, definition.defaultColor);
        if (hex) {
          if (hex !== activeElement) {
            hex.value = state.displayValue;
            hex.setAttribute('aria-invalid', 'false');
          }
          hex.title = state.mixed
            ? 'Linked roles currently differ. Choose a color to unify them.'
            : 'All linked roles currently share this color.';
        }
        if (badge) {
          badge.textContent = state.mixed ? 'Mixed · ' + definition.targets.length : 'Linked ' + definition.targets.length;
          badge.classList.toggle('is-mixed', state.mixed);
        }
        if (card) card.classList.toggle('is-mixed', state.mixed);
      }

      function getSimpleSyntaxState(definition) {
        const values = definition.targets.flatMap(target => {
          const syntax = SYNTAX_DEFS.find(item => item.id === target);
          const activeColors = getActiveSyntaxColors(target);
          return activeColors.length > 0 ? activeColors : [syntax?.defaultColor || definition.defaultColor];
        });
        return {
          displayValue: values[0] || definition.defaultColor,
          mixed: new Set(values.map(value => String(value).trim().toLowerCase())).size > 1,
        };
      }

      function syncSimpleSyntaxGroup(definition) {
        const state = getSimpleSyntaxState(definition);
        const picker = document.querySelector('.simple-syntax-picker[data-simple-syntax-id="' + definition.id + '"]');
        const hex = document.querySelector('.simple-syntax-hex[data-simple-syntax-id="' + definition.id + '"]');
        const badge = document.querySelector('[data-simple-syntax-state="' + definition.id + '"]');
        const card = document.querySelector('[data-simple-syntax-id="' + definition.id + '"]');
        const activeElement = document.activeElement;
        if (picker !== activeElement) setPickerValue(picker, state.displayValue, definition.defaultColor);
        if (hex) {
          if (hex !== activeElement) {
            hex.value = state.displayValue;
            hex.setAttribute('aria-invalid', 'false');
          }
          hex.title = state.mixed
            ? 'Linked syntax roles currently differ. Choose a color to unify them.'
            : 'All linked syntax roles currently share this color.';
        }
        if (badge) {
          badge.textContent = state.mixed ? 'Mixed · ' + definition.targets.length : 'Linked ' + definition.targets.length;
          badge.classList.toggle('is-mixed', state.mixed);
        }
        if (card) card.classList.toggle('is-mixed', state.mixed);
      }

      document.querySelectorAll('.simple-ui-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const simpleId = this.getAttribute('data-simple-id');
          const hexInput = document.querySelector('.simple-ui-hex[data-simple-id="' + simpleId + '"]');
          const val = preserveExistingAlpha(this.value, hexInput);
          if (hexInput) hexInput.value = val;
          applySimpleUi(simpleId, val);
        });
        picker.addEventListener('change', flushLiveColors);
      });

      document.querySelectorAll('.simple-ui-hex').forEach(input => {
        input.addEventListener('change', function() {
          const simpleId = this.getAttribute('data-simple-id');
          const val = validateHexInput(this);
          if (val) {
            const picker = document.querySelector('.simple-ui-picker[data-simple-id="' + simpleId + '"]');
            setPickerValue(picker, val, '#1e1e1e');
            applySimpleUi(simpleId, val);
            flushLiveColors();
          }
        });
      });

      function applySimpleUi(simpleId, val) {
        const def = SIMPLE_UI_MAP.find(d => d.id === simpleId);
        if (!def) return;

        def.targets.forEach(target => {
          activeState.colors[target] = val;
          paintLivePreview(target, val);

          const advPicker = document.querySelector('.adv-color-picker[data-target="' + target + '"]');
          setPickerValue(advPicker, val, def.defaultColor);
          const advHex = document.querySelector('.adv-hex-input[data-target="' + target + '"]');
          if (advHex) advHex.value = val;
        });
        const editRevision = markThemeModified(def.targets);
        def.targets.forEach(target => queueLiveColor(target, val, editRevision));
        applyStudioTheme();
        syncSimpleUiGroup(def);
      }

      // 11. Advanced UI Handlers
      document.querySelectorAll('.adv-color-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const target = this.getAttribute('data-target');
          const hexInput = document.querySelector('.adv-hex-input[data-target="' + target + '"]');
          const val = preserveExistingAlpha(this.value, hexInput);
          if (hexInput) hexInput.value = val;
          updateLivePreview(target, val);

          const parentSimple = SIMPLE_UI_MAP.find(s => s.targets.includes(target));
          if (parentSimple) syncSimpleUiGroup(parentSimple);
        });
        picker.addEventListener('change', flushLiveColors);
      });

      document.querySelectorAll('.adv-hex-input').forEach(input => {
        input.addEventListener('change', function() {
          const target = this.getAttribute('data-target');
          const val = validateHexInput(this);
          if (val) {
            const picker = document.querySelector('.adv-color-picker[data-target="' + target + '"]');
            setPickerValue(picker, val, '#1e1e1e');
            updateLivePreview(target, val);

            const parentSimple = SIMPLE_UI_MAP.find(s => s.targets.includes(target));
            if (parentSimple) syncSimpleUiGroup(parentSimple);
            flushLiveColors();
          }
        });
      });

      // 12. Simple Mode Syntax Handlers
      document.querySelectorAll('.simple-syntax-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const simpleSyntaxId = this.getAttribute('data-simple-syntax-id');
          const hexInput = document.querySelector('.simple-syntax-hex[data-simple-syntax-id="' + simpleSyntaxId + '"]');
          const val = preserveExistingAlpha(this.value, hexInput);
          if (hexInput) hexInput.value = val;
          applySimpleSyntax(simpleSyntaxId, val);
        });
        picker.addEventListener('change', flushLiveTokens);
      });

      document.querySelectorAll('.simple-syntax-hex').forEach(input => {
        input.addEventListener('change', function() {
          const simpleSyntaxId = this.getAttribute('data-simple-syntax-id');
          const val = validateHexInput(this);
          if (val) {
            const picker = document.querySelector('.simple-syntax-picker[data-simple-syntax-id="' + simpleSyntaxId + '"]');
            setPickerValue(picker, val, '#1e1e1e');
            applySimpleSyntax(simpleSyntaxId, val);
            flushLiveTokens();
          }
        });
      });

      function applySimpleSyntax(simpleSyntaxId, val) {
        const def = SIMPLE_SYNTAX_MAP.find(item => item.id === simpleSyntaxId);
        if (!def) return;

        def.targets.forEach(targetSyntax => {
          updateLiveSyntax(targetSyntax, val, false);
          const advPicker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + targetSyntax + '"]');
          setPickerValue(advPicker, val, def.defaultColor);
          const advHex = document.querySelector('.adv-syntax-hex[data-syntax-id="' + targetSyntax + '"]');
          if (advHex) advHex.value = val;
        });
        const editRevision = markThemeModified([], def.targets);
        def.targets.forEach(targetSyntax => queueLiveToken(targetSyntax, val, editRevision));
        syncSimpleSyntaxGroup(def);
      }

      // 13. Advanced Syntax Handlers
      document.querySelectorAll('.adv-syntax-picker').forEach(picker => {
        picker.addEventListener('input', function() {
          const syntaxId = this.getAttribute('data-syntax-id');
          const hexInput = document.querySelector('.adv-syntax-hex[data-syntax-id="' + syntaxId + '"]');
          const val = preserveExistingAlpha(this.value, hexInput);
          if (hexInput) hexInput.value = val;
          updateLiveSyntax(syntaxId, val);

          const parentSimple = SIMPLE_SYNTAX_MAP.find(item => item.targets.includes(syntaxId));
          if (parentSimple) syncSimpleSyntaxGroup(parentSimple);
        });
        picker.addEventListener('change', flushLiveTokens);
      });

      document.querySelectorAll('.adv-syntax-hex').forEach(input => {
        input.addEventListener('change', function() {
          const syntaxId = this.getAttribute('data-syntax-id');
          const val = validateHexInput(this);
          if (val) {
            const picker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + syntaxId + '"]');
            setPickerValue(picker, val, '#1e1e1e');
            updateLiveSyntax(syntaxId, val);

            const parentSimple = SIMPLE_SYNTAX_MAP.find(item => item.targets.includes(syntaxId));
            if (parentSimple) syncSimpleSyntaxGroup(parentSimple);
            flushLiveTokens();
          }
        });
      });

      document.querySelectorAll('.hex-input').forEach(input => {
        input.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') this.blur();
        });
      });

      // 14. Instant Preset Loader
      const ALL_PRESETS = ${JSON.stringify(THEME_PRESETS)};
      window.loadPreset = function(presetId) {
        const p = ALL_PRESETS.find(x => x.id === presetId);
        if (p) {
          const requestRevision = beginAuthoritativeRequest();
          activeState.colors = { ...p.colors };
          activeState.tokenColors = p.tokenColors.map(rule => ({
            ...rule,
            settings: { ...rule.settings },
          }));
          activeState.themeKind = p.type;
          setProfileName(p.name);
          renderActiveTheme();

          // Atomic apply to VS Code; the host replies with the effective snapshot.
          vscode.postMessage({ command: 'applyPreset', presetId, requestRevision });
          showToast('✨ Applied preset "' + p.name + '" to VS Code!', '⚡');
        }
      };

      // 15. Profile Actions
      window.loadSavedProfile = function(profileId) {
        const requestRevision = beginAuthoritativeRequest();
        vscode.postMessage({ command: 'loadProfile', profileId, requestRevision });
      };

      window.deleteSavedProfile = function(profileId, profileName) {
        vscode.postMessage({ command: 'deleteProfile', profileId, profileName });
      };

      // 16. Top Toolbar Handlers
      document.getElementById('btnApplyAll').addEventListener('click', () => {
        const submittedColors = { ...activeState.colors };
        const submittedTokenColors = activeState.tokenColors.map(rule => ({
          ...rule,
          settings: { ...rule.settings },
        }));
        const submittedColorEdits = [...localColorEdits.entries()].map(([key, edit]) => [key, { ...edit }]);
        const submittedSyntaxEdits = [...localSyntaxEdits.entries()].map(([syntaxId, edit]) => [syntaxId, { ...edit }]);
        const requestRevision = beginAuthoritativeRequest();
        pendingApplyRevision = requestRevision;
        applyRequestSnapshots.clear();
        applyRequestSnapshots.set(requestRevision, {
          colorEdits: submittedColorEdits,
          syntaxEdits: submittedSyntaxEdits,
        });
        if (applyButtonResetTimer) clearTimeout(applyButtonResetTimer);
        applyButtonResetTimer = null;
        const btn = document.getElementById('btnApplyAll');
        if (btn) {
          btn.innerText = '⚡ Applying...';
          btn.style.opacity = '0.75';
        }
        vscode.postMessage({
          command: 'applyAll',
          colors: submittedColors,
          tokenColors: submittedTokenColors,
          profileName: activeState.profileName,
          requestRevision,
        });
      });

      document.getElementById('btnSaveProfile').addEventListener('click', () => {
        vscode.postMessage({
          command: 'saveProfile',
          colors: activeState.colors,
          tokenColors: activeState.tokenColors,
          profileName: activeState.profileName,
          type: (activeState.themeKind || '').includes('light') ? 'light' : 'dark',
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
        if (resetBarrierRevision !== null) return;
        // Hold unsent values until the queued host confirmation resolves. A cancel
        // releases all held edits; a confirmed reset drops only pre-click edits.
        const requestRevision = beginResetRequest();
        vscode.postMessage({ command: 'resetTheme', requestRevision });
      });

      function renderSyntaxPreview() {
        SYNTAX_DEFS.forEach(definition => {
          paintSyntaxPreview(definition.id, getActiveSyntaxColor(definition.id) || definition.defaultColor);
        });
      }

      function syncControlValues() {
        const activeEl = document.activeElement;

        SIMPLE_UI_MAP.forEach(syncSimpleUiGroup);

        UI_DEFS.forEach(def => {
          const val = activeState.colors[def.id] || def.defaultValue;
          const picker = document.querySelector('.adv-color-picker[data-target="' + def.id + '"]');
          if (picker !== activeEl) setPickerValue(picker, val, def.defaultValue);
          const hex = document.querySelector('.adv-hex-input[data-target="' + def.id + '"]');
          if (hex && hex !== activeEl) {
            hex.value = val;
            hex.setAttribute('aria-invalid', 'false');
          }
        });

        SIMPLE_SYNTAX_MAP.forEach(syncSimpleSyntaxGroup);

        SYNTAX_DEFS.forEach(def => {
          const val = getActiveSyntaxColor(def.id) || def.defaultColor;
          const picker = document.querySelector('.adv-syntax-picker[data-syntax-id="' + def.id + '"]');
          if (picker !== activeEl) setPickerValue(picker, val, def.defaultColor);
          const hex = document.querySelector('.adv-syntax-hex[data-syntax-id="' + def.id + '"]');
          if (hex && hex !== activeEl) {
            hex.value = val;
            hex.setAttribute('aria-invalid', 'false');
          }
        });
      }

      function renderActiveTheme() {
        UI_DEFS.forEach(definition => {
          paintLivePreview(definition.id, activeState.colors[definition.id] || definition.defaultValue);
        });
        renderSyntaxPreview();
        applyStudioTheme();
        syncControlValues();
        updateContrastBadges();
      }

      function replaceThemeSnapshot(message, includeAllLocalEdits = false) {
        const requestScoped = typeof message.requestRevision === 'number';
        if (!requestScoped) {
          cancelPendingLiveChanges();
          localColorEdits.clear();
          localSyntaxEdits.clear();
        }
        if (message.colors && typeof message.colors === 'object') {
          activeState.colors = { ...message.colors };
        }
        if (Array.isArray(message.tokenColors)) {
          activeState.tokenColors = message.tokenColors.map(rule => ({
            ...rule,
            settings: { ...rule.settings },
          }));
        }
        if (message.themeKind) activeState.themeKind = message.themeKind;
        if (typeof message.liveApply === 'boolean') activeState.liveApply = message.liveApply;
        if (message.themeName) setProfileName(message.themeName);

        let reappliedLocalEdit = false;
        if (requestScoped) {
          const editFloor = includeAllLocalEdits
            ? -Infinity
            : (authoritativeOverlayFloors.get(message.requestRevision) ?? message.requestRevision);
          localColorEdits.forEach((edit, key) => {
            if (edit.revision > editFloor) {
              activeState.colors[key] = edit.value;
              reappliedLocalEdit = true;
            }
          });
          localSyntaxEdits.forEach((edit, syntaxId) => {
            if (edit.revision > editFloor && typeof edit.value === 'string') {
              updateLiveSyntax(syntaxId, edit.value, false);
              reappliedLocalEdit = true;
            }
          });
        }
        if (reappliedLocalEdit) setProfileName('Custom');
        renderActiveTheme();
      }

      function finishApplyButton(applied) {
        const btn = document.getElementById('btnApplyAll');
        if (!btn) return;
        if (applyButtonResetTimer) clearTimeout(applyButtonResetTimer);
        applyButtonResetTimer = null;
        btn.innerText = applied ? '✨ Applied!' : '✨ Apply to VS Code';
        btn.style.opacity = '1';
        if (applied) {
          applyButtonResetTimer = setTimeout(() => {
            btn.innerText = '✨ Apply to VS Code';
            applyButtonResetTimer = null;
          }, 1800);
        }
      }

      function hasLocalEditsAfter(revision) {
        return (
          [...localColorEdits.values()].some((edit) => edit.revision > revision) ||
          [...localSyntaxEdits.values()].some((edit) => edit.revision > revision)
        );
      }

      function releaseResetBarrier(message) {
        const revision = message.requestRevision;
        if (message.confirmed) {
          discardLiveEditsThroughRevision = Math.max(discardLiveEditsThroughRevision, revision);
          pendingLiveColors = Object.fromEntries(
            Object.entries(pendingLiveColors).filter(([, entry]) => entry.revision > revision)
          );
          pendingLiveTokens = Object.fromEntries(
            Object.entries(pendingLiveTokens).filter(([, entry]) => entry.revision > revision)
          );
          localColorEdits.forEach((edit, key) => {
            if (edit.revision <= revision) localColorEdits.delete(key);
          });
          localSyntaxEdits.forEach((edit, key) => {
            if (edit.revision <= revision) localSyntaxEdits.delete(key);
          });
        }
        if (resetBarrierRevision === revision) resetBarrierRevision = null;
        if (Object.keys(pendingLiveColors).length > 0) flushLiveColors();
        if (Object.keys(pendingLiveTokens).length > 0) flushLiveTokens();
      }

      renderActiveTheme();

      // 17. Live Theme Sync & Event Receiver from VS Code
      window.addEventListener('message', event => {
        const msg = event.data;
        if (!msg) return;

        if (msg.command === 'liveColorsApplied') {
          settleLiveColors(msg);
          if (msg.ok === false) showToast(msg.message || 'Unable to apply that color.', '⚠️');
          return;
        }

        if (msg.command === 'liveTokenColorsApplied') {
          settleLiveTokens(msg);
          if (msg.ok === false) showToast(msg.message || 'Unable to apply that syntax color.', '⚠️');
          return;
        }

        if (msg.command === 'authoritativeActionError') {
          const isCurrentAuthoritativeError = msg.requestRevision === pendingAuthoritativeRevision;
          if (msg.requestRevision === pendingApplyRevision) {
            finishApplyButton(false);
            pendingApplyRevision = null;
          }
          if (msg.requestRevision === resetBarrierRevision) {
            releaseResetBarrier({ requestRevision: msg.requestRevision, confirmed: false });
          }
          if (isCurrentAuthoritativeError) {
            pendingAuthoritativeRevision = null;
          }
          authoritativeOverlayFloors.delete(msg.requestRevision);
          if (isCurrentAuthoritativeError && msg.requestCommand === 'applyAll') {
            const submitted = applyRequestSnapshots.get(msg.requestRevision);
            if (submitted) {
              submitted.colorEdits.forEach(([key, edit]) => {
                const newer = localColorEdits.get(key);
                if (!newer || newer.revision <= msg.requestRevision) {
                  localColorEdits.set(key, edit);
                }
              });
              submitted.syntaxEdits.forEach(([syntaxId, edit]) => {
                const newer = localSyntaxEdits.get(syntaxId);
                if (!newer || newer.revision <= msg.requestRevision) {
                  localSyntaxEdits.set(syntaxId, edit);
                }
              });
            }
          }
          applyRequestSnapshots.delete(msg.requestRevision);
          if (isCurrentAuthoritativeError && msg.requestCommand !== 'refreshThemeFromVsCode') {
            deferredExternalSync = true;
            deferredSyncOverlayFloor = ['resetTheme', 'applyAll'].includes(msg.requestCommand)
              ? -Infinity
              : msg.requestRevision;
          }
          showToast(msg.message || 'Unable to complete that theme action.', '⚠️');
          maybeRefreshDeferredExternalSync();
          return;
        }

        if (msg.command === 'syncActiveTheme' && typeof msg.requestRevision !== 'number' && hasOutstandingLocalWork()) {
          deferredExternalSync = true;
          return;
        }

        const authoritativeCommands = ['themeApplied', 'presetApplied', 'profileLoaded', 'themeResetResolved', 'syncActiveTheme'];
        const isAuthoritative = authoritativeCommands.includes(msg.command);
        const acceptsSnapshot = !isAuthoritative || shouldAcceptAuthoritativeMessage(msg);

        if (msg.command === 'themeApplied') {
          if (msg.requestRevision === pendingApplyRevision) {
            finishApplyButton(acceptsSnapshot && !hasLocalEditsAfter(msg.requestRevision));
            pendingApplyRevision = null;
          }
          applyRequestSnapshots.delete(msg.requestRevision);
          if (!acceptsSnapshot) return;
          const hasNewerEdits = hasLocalEditsAfter(msg.requestRevision);
          if (msg.colors) replaceThemeSnapshot({ ...msg, themeName: msg.profileName });
          else if (msg.profileName) setProfileName(msg.profileName);
          showToast(
            hasNewerEdits ? 'Applied the submitted snapshot; newer edits remain Custom.' : '✨ Applied to VS Code!',
            '✨'
          );
        }

        if (msg.command === 'presetApplied') {
          if (!acceptsSnapshot) return;
          if (msg.colors) replaceThemeSnapshot({ ...msg, themeName: msg.presetName });
          else if (msg.presetName) setProfileName(msg.presetName);
          showToast('✨ Applied preset "' + (msg.presetName || 'Preset') + '"!', '⚡');
        }

        if (msg.command === 'profileSaved') {
          if (msg.profileName) {
            setProfileName(msg.profileName);
          }
          showToast('💾 Saved profile "' + msg.profileName + '"!', '💾');
        }

        if (msg.command === 'profileLoaded') {
          if (!acceptsSnapshot) return;
          replaceThemeSnapshot({ ...msg, themeName: msg.profileName });
          showToast('✨ Loaded profile "' + msg.profileName + '"!', '✨');
        }

        if (msg.command === 'themeResetResolved') {
          const isMatchingBarrier = msg.requestRevision === resetBarrierRevision;
          if (acceptsSnapshot) {
            replaceThemeSnapshot(msg, !msg.confirmed);
            if (msg.confirmed) showToast('🔄 Theme reset to defaults.', '🔄');
          }
          if (isMatchingBarrier) releaseResetBarrier(msg);
          if (!acceptsSnapshot) return;
        }

        if (msg.command === 'syncActiveTheme') {
          if (!acceptsSnapshot) return;
          replaceThemeSnapshot(msg);
        }

        if (isAuthoritative && typeof msg.requestRevision === 'number' && msg.requestRevision === pendingAuthoritativeRevision) {
          pendingAuthoritativeRevision = null;
          authoritativeOverlayFloors.delete(msg.requestRevision);
          maybeRefreshDeferredExternalSync();
        }
      });

      // 18. Toast Notification Helper
      function showToast(msg, icon = '✨') {
        const toast = document.getElementById('toastPopup');
        const text = document.getElementById('toastMessage');
        const iconEl = document.getElementById('toastIcon');
        if (!toast || !text) return;
        text.innerText = msg;
        if (iconEl) iconEl.innerText = icon;
        toast.style.display = 'flex';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 2400);
      }

      // 19. Universal Live Refresh Function (Syncs everything: preview, tiles, pickers)
      window.refreshFromVsCode = function() {
        const requestRevision = beginAuthoritativeRequest();
        const icon = document.getElementById('syncIcon');
        if (icon) {
          icon.classList.remove('spin-anim');
          void icon.offsetWidth;
          icon.classList.add('spin-anim');
        }

        const preview = document.querySelector('.preview-sticky');
        if (preview) {
          preview.classList.remove('preview-refreshed');
          void preview.offsetWidth;
          preview.classList.add('preview-refreshed');
        }

        vscode.postMessage({ command: 'refreshThemeFromVsCode', requestRevision });
        showToast('Live Preview & Tiles Synced from VS Code!', '🔄');
      };

    })();
  </script>

  <!-- Floating Toast Notification -->
  <div id="toastPopup" class="toast-popup">
    <span id="toastIcon">✨</span>
    <span id="toastMessage">Live Preview & Tiles Synced!</span>
  </div>
</body>
</html>`;
  }

  public dispose() {
    ThemeStudioWebview.currentPanel = undefined;
    if (this._internalChangeTimer) {
      clearTimeout(this._internalChangeTimer);
      this._internalChangeTimer = undefined;
    }
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }
}
