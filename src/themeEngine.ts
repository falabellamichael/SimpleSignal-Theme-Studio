import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ThemePreset, TokenRule } from './types';
import { THEME_PRESETS } from './presets';

function stripJsonComments(str: string): string {
  let insideString = false;
  let insideBlockComment = false;
  let insideLineComment = false;
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const nextChar = str[i + 1];

    if (!insideString && !insideBlockComment && !insideLineComment) {
      if (char === '"' && (i === 0 || str[i - 1] !== '\\')) {
        insideString = true;
        result += char;
      } else if (char === '/' && nextChar === '*') {
        insideBlockComment = true;
        i++;
      } else if (char === '/' && nextChar === '/') {
        insideLineComment = true;
        i++;
      } else {
        result += char;
      }
    } else if (insideString) {
      if (char === '"' && str[i - 1] !== '\\') {
        insideString = false;
      }
      result += char;
    } else if (insideBlockComment) {
      if (char === '*' && nextChar === '/') {
        insideBlockComment = false;
        i++;
      }
    } else if (insideLineComment) {
      if (char === '\n' || char === '\r') {
        insideLineComment = false;
        result += char;
      }
    }
  }

  return result.replace(/,\s*([}\]])/g, '$1');
}

function tryReadInstalledThemeFile(themeName: string): { colors: Record<string, string>; tokenColors: TokenRule[] } | null {
  const lowerName = themeName.toLowerCase().trim();

  for (const ext of vscode.extensions.all) {
    const pkg = ext.packageJSON;
    if (pkg && pkg.contributes && Array.isArray(pkg.contributes.themes)) {
      for (const t of pkg.contributes.themes) {
        const label = (t.label || t.id || '').toLowerCase().trim();
        const id = (t.id || '').toLowerCase().trim();
        if (label === lowerName || id === lowerName || lowerName.includes(label) || label.includes(lowerName)) {
          const themePath = path.isAbsolute(t.path) ? t.path : path.join(ext.extensionPath, t.path);
          try {
            if (fs.existsSync(themePath)) {
              const content = fs.readFileSync(themePath, 'utf8');
              const parsed = JSON.parse(stripJsonComments(content));
              const colors: Record<string, string> = parsed.colors || {};
              let tokenColors: TokenRule[] = [];

              if (Array.isArray(parsed.tokenColors)) {
                tokenColors = parsed.tokenColors;
              } else if (typeof parsed.tokenColors === 'string') {
                const tokenPath = path.isAbsolute(parsed.tokenColors)
                  ? parsed.tokenColors
                  : path.join(path.dirname(themePath), parsed.tokenColors);
                if (fs.existsSync(tokenPath)) {
                  const tokenContent = fs.readFileSync(tokenPath, 'utf8');
                  const parsedTokens = JSON.parse(stripJsonComments(tokenContent));
                  if (Array.isArray(parsedTokens.tokenColors)) {
                    tokenColors = parsedTokens.tokenColors;
                  } else if (Array.isArray(parsedTokens)) {
                    tokenColors = parsedTokens;
                  }
                }
              }

              if (parsed.include) {
                const incPath = path.isAbsolute(parsed.include) ? parsed.include : path.join(path.dirname(themePath), parsed.include);
                if (fs.existsSync(incPath)) {
                  try {
                    const incParsed = JSON.parse(stripJsonComments(fs.readFileSync(incPath, 'utf8')));
                    if (incParsed.colors) {
                      for (const k of Object.keys(incParsed.colors)) {
                        if (!colors[k]) colors[k] = incParsed.colors[k];
                      }
                    }
                    if (Array.isArray(incParsed.tokenColors) && tokenColors.length === 0) {
                      tokenColors = incParsed.tokenColors;
                    }
                  } catch (e) {}
                }
              }

              return { colors, tokenColors };
            }
          } catch (err) {
            // Ignore parse errors on unsupported formats and continue
          }
        }
      }
    }
  }
  return null;
}

export class ThemeEngine {
  public static getTargetScope(): vscode.ConfigurationTarget {
    const config = vscode.workspace.getConfiguration('simpletheme');
    const scope = config.get<string>('targetScope', 'global');
    return scope === 'workspace' ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
  }

  public static getEffectiveThemeState(): {
    themeName: string;
    themeKind: string;
    colors: Record<string, string>;
    tokenColors: TokenRule[];
  } {
    const workbench = vscode.workspace.getConfiguration('workbench');
    const editor = vscode.workspace.getConfiguration('editor');
    const simpletheme = vscode.workspace.getConfiguration('simpletheme');

    const themeName = workbench.get<string>('colorTheme') || 'Default Dark+';
    const activeColorTheme = vscode.window.activeColorTheme;
    const kind = activeColorTheme ? activeColorTheme.kind : vscode.ColorThemeKind.Dark;

    let themeKind = 'dark';
    if (kind === vscode.ColorThemeKind.Light) themeKind = 'light';
    else if (kind === vscode.ColorThemeKind.HighContrast) themeKind = 'high-contrast-dark';
    else if (kind === vscode.ColorThemeKind.HighContrastLight) themeKind = 'high-contrast-light';

    let baseColors: Record<string, string> = {};
    let baseTokenColors: TokenRule[] = [];

    // 1. Try reading directly from installed/built-in theme extension JSON file!
    const fromExtension = tryReadInstalledThemeFile(themeName);
    if (fromExtension && (Object.keys(fromExtension.colors).length > 0 || fromExtension.tokenColors.length > 0)) {
      baseColors = { ...fromExtension.colors };
      baseTokenColors = JSON.parse(JSON.stringify(fromExtension.tokenColors));
    } else {
      // 2. Try matching against 50 built-in presets
      const lower = themeName.toLowerCase();
      const matched = THEME_PRESETS.find(
        (p) =>
          p.name.toLowerCase() === lower ||
          p.id.toLowerCase() === lower ||
          lower.includes(p.id.toLowerCase()) ||
          lower.includes(p.name.toLowerCase())
      );

      if (matched) {
        baseColors = { ...matched.colors };
        baseTokenColors = JSON.parse(JSON.stringify(matched.tokenColors));
      } else {
      // Build default base palette based on theme name or kind
      const isLight = themeKind === 'light' || lower.includes('light') || lower.includes('latte') || lower.includes('snow') || lower.includes('sun');
      const isHighContrast = themeKind.includes('high-contrast') || lower.includes('contrast');

      if (lower.includes('monokai')) {
        baseColors = {
          'editor.background': '#272822',
          'editor.foreground': '#f8f8f2',
          'sideBar.background': '#1e1f1c',
          'sideBar.foreground': '#cccccc',
          'activityBar.background': '#272822',
          'activityBar.foreground': '#f8f8f2',
          'titleBar.activeBackground': '#1e1f1c',
          'statusBar.background': '#75715e',
          'statusBar.foreground': '#ffffff',
          'tab.activeBackground': '#272822',
          'tab.inactiveBackground': '#1e1f1c',
          'tab.activeBorderTop': '#a6e22e',
          'editorGroupHeader.tabsBackground': '#1e1f1c',
          'input.background': '#3e3d32',
          'panel.background': '#1e1f1c',
          'editorHoverWidget.background': '#272822',
          'editorHoverWidget.foreground': '#f8f8f2',
          'editorHoverWidget.border': '#75715e',
        };
        baseTokenColors = [
          { scope: ['keyword', 'keyword.control', 'storage.type'], settings: { foreground: '#f92672' } },
          { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#a6e22e' } },
          { scope: ['support.type.property-name', 'meta.object-literal.key'], settings: { foreground: '#66d9ef' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#e6db74' } },
          { scope: ['variable', 'variable.other'], settings: { foreground: '#f8f8f2' } },
          { scope: ['entity.name.type', 'support.type'], settings: { foreground: '#66d9ef' } },
          { scope: ['comment', 'comment.line'], settings: { foreground: '#75715e' } },
          { scope: ['constant.numeric', 'constant.language.boolean'], settings: { foreground: '#ae81ff' } },
        ];
      } else if (lower.includes('solarized') && isLight) {
        baseColors = {
          'editor.background': '#fdf6e3',
          'editor.foreground': '#181514',
          'sideBar.background': '#eee8d5',
          'sideBar.foreground': '#181514',
          'activityBar.background': '#eee8d5',
          'activityBar.foreground': '#181514',
          'titleBar.activeBackground': '#eee8d5',
          'statusBar.background': '#073642',
          'statusBar.foreground': '#ffffff',
          'tab.activeBackground': '#fdf6e3',
          'tab.inactiveBackground': '#eee8d5',
          'tab.activeBorderTop': '#268bd2',
          'editorGroupHeader.tabsBackground': '#eee8d5',
          'input.background': '#e4decb',
          'panel.background': '#eee8d5',
          'editorHoverWidget.background': '#fdf6e3',
          'editorHoverWidget.foreground': '#181514',
          'editorHoverWidget.border': '#93a1a1',
        };
        baseTokenColors = [
          { scope: ['keyword', 'keyword.control'], settings: { foreground: '#859900' } },
          { scope: ['entity.name.function'], settings: { foreground: '#1d4ed8' } },
          { scope: ['support.type.property-name'], settings: { foreground: '#b45309' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#047857' } },
          { scope: ['variable'], settings: { foreground: '#181514' } },
          { scope: ['entity.name.type'], settings: { foreground: '#b58900' } },
          { scope: ['comment'], settings: { foreground: '#78716c' } },
          { scope: ['constant.numeric'], settings: { foreground: '#b91c1c' } },
        ];
      } else if (isLight) {
        baseColors = {
          'editor.background': '#ffffff',
          'editor.foreground': '#111827',
          'sideBar.background': '#f3f4f6',
          'sideBar.foreground': '#1f2937',
          'activityBar.background': '#e5e7eb',
          'activityBar.foreground': '#111827',
          'titleBar.activeBackground': '#f3f4f6',
          'statusBar.background': '#007acc',
          'statusBar.foreground': '#ffffff',
          'tab.activeBackground': '#ffffff',
          'tab.inactiveBackground': '#f3f4f6',
          'tab.activeBorderTop': '#007acc',
          'editorGroupHeader.tabsBackground': '#f3f4f6',
          'input.background': '#ffffff',
          'panel.background': '#f9fafb',
          'editorHoverWidget.background': '#ffffff',
          'editorHoverWidget.foreground': '#111827',
          'editorHoverWidget.border': '#d1d5db',
        };
        baseTokenColors = [
          { scope: ['keyword', 'keyword.control'], settings: { foreground: '#0000ff' } },
          { scope: ['entity.name.function'], settings: { foreground: '#795e26' } },
          { scope: ['support.type.property-name'], settings: { foreground: '#001080' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#a31515' } },
          { scope: ['variable'], settings: { foreground: '#001080' } },
          { scope: ['entity.name.type'], settings: { foreground: '#267f99' } },
          { scope: ['comment'], settings: { foreground: '#008000' } },
          { scope: ['constant.numeric'], settings: { foreground: '#098658' } },
        ];
      } else if (isHighContrast) {
        baseColors = {
          'editor.background': '#000000',
          'editor.foreground': '#ffffff',
          'sideBar.background': '#0a0a0a',
          'sideBar.foreground': '#ffffff',
          'activityBar.background': '#000000',
          'activityBar.foreground': '#00f0ff',
          'titleBar.activeBackground': '#000000',
          'statusBar.background': '#000000',
          'statusBar.foreground': '#00f0ff',
          'tab.activeBackground': '#000000',
          'tab.inactiveBackground': '#0a0a0a',
          'tab.activeBorderTop': '#00f0ff',
          'editorGroupHeader.tabsBackground': '#0a0a0a',
          'input.background': '#000000',
          'panel.background': '#000000',
          'editorHoverWidget.background': '#000000',
          'editorHoverWidget.foreground': '#ffffff',
          'editorHoverWidget.border': '#00f0ff',
        };
        baseTokenColors = [
          { scope: ['keyword', 'keyword.control'], settings: { foreground: '#ffb000' } },
          { scope: ['entity.name.function'], settings: { foreground: '#00f0ff' } },
          { scope: ['support.type.property-name'], settings: { foreground: '#648fff' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#fe6100' } },
          { scope: ['variable'], settings: { foreground: '#ffffff' } },
          { scope: ['entity.name.type'], settings: { foreground: '#785ef0' } },
          { scope: ['comment'], settings: { foreground: '#888888' } },
          { scope: ['constant.numeric'], settings: { foreground: '#dc267f' } },
        ];
      } else {
        // Default Dark+
        baseColors = {
          'editor.background': '#1e1e1e',
          'editor.foreground': '#d4d4d4',
          'sideBar.background': '#252526',
          'sideBar.foreground': '#cccccc',
          'activityBar.background': '#333333',
          'activityBar.foreground': '#ffffff',
          'titleBar.activeBackground': '#3c3c3c',
          'statusBar.background': '#007acc',
          'statusBar.foreground': '#ffffff',
          'tab.activeBackground': '#1e1e1e',
          'tab.inactiveBackground': '#2d2d2d',
          'tab.activeBorderTop': '#007acc',
          'editorGroupHeader.tabsBackground': '#252526',
          'input.background': '#3c3c3c',
          'panel.background': '#1e1e1e',
          'editorHoverWidget.background': '#252526',
          'editorHoverWidget.foreground': '#cccccc',
          'editorHoverWidget.border': '#454545',
        };
        baseTokenColors = [
          { scope: ['keyword', 'keyword.control'], settings: { foreground: '#569cd6' } },
          { scope: ['entity.name.function'], settings: { foreground: '#dcdcaa' } },
          { scope: ['support.type.property-name'], settings: { foreground: '#9cdcfe' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#ce9178' } },
          { scope: ['variable'], settings: { foreground: '#9cdcfe' } },
          { scope: ['entity.name.type'], settings: { foreground: '#4ec9b0' } },
          { scope: ['comment'], settings: { foreground: '#6a9955' } },
          { scope: ['constant.numeric'], settings: { foreground: '#b5cea8' } },
        ];
      }
    }
  }

    // 2. Layer active customizations on top
    const userColors = workbench.get<Record<string, string>>('colorCustomizations') || {};
    const finalColors = { ...baseColors, ...userColors };

    const userTokenConfig = editor.get<any>('tokenColorCustomizations') || {};
    const userTextMateRules = userTokenConfig.textMateRules || [];

    // Merge token rules
    const finalTokenColors = [...baseTokenColors];
    if (Array.isArray(userTextMateRules)) {
      userTextMateRules.forEach((ur: TokenRule) => {
        const uScopes = Array.isArray(ur.scope) ? ur.scope : [ur.scope];
        const idx = finalTokenColors.findIndex((fr) => {
          const fScopes = Array.isArray(fr.scope) ? fr.scope : [fr.scope];
          return fScopes.some((s) => uScopes.includes(s));
        });
        if (idx >= 0) {
          finalTokenColors[idx] = { ...finalTokenColors[idx], ...ur };
        } else {
          finalTokenColors.push(ur);
        }
      });
    }

    // Top-level token customizations
    const directKeys = ['strings', 'keywords', 'functions', 'variables', 'types', 'comments', 'numbers'];
    directKeys.forEach((dk) => {
      if (userTokenConfig[dk]) {
        const color = userTokenConfig[dk];
        const idx = finalTokenColors.findIndex((r) => {
          const sc = Array.isArray(r.scope) ? r.scope : [r.scope];
          return sc.some((s) => s.includes(dk.slice(0, -1)) || s.includes(dk));
        });
        if (idx >= 0) {
          finalTokenColors[idx].settings.foreground = color;
        }
      }
    });

    const activeProfileName = simpletheme.get<string>('activeProfile', themeName);

    return {
      themeName: activeProfileName,
      themeKind,
      colors: finalColors,
      tokenColors: finalTokenColors,
    };
  }

  public static getCurrentColors(): Record<string, string> {
    const workbench = vscode.workspace.getConfiguration('workbench');
    const colors = workbench.get<Record<string, string>>('colorCustomizations') || {};
    return { ...colors };
  }

  public static getCurrentTokenColors(): TokenRule[] {
    const editor = vscode.workspace.getConfiguration('editor');
    const tokenCustomizations = editor.get<any>('tokenColorCustomizations') || {};
    const textMateRules = tokenCustomizations.textMateRules || [];
    return Array.isArray(textMateRules) ? textMateRules : [];
  }

  private static async ensureSettingsFileSaved(): Promise<void> {
    try {
      for (const doc of vscode.workspace.textDocuments) {
        if (doc.isDirty && (doc.fileName.toLowerCase().endsWith('settings.json') || doc.uri.path.toLowerCase().endsWith('settings.json'))) {
          await doc.save();
        }
      }
    } catch (err) {
      // Ignore if document save fails
    }
  }

  public static async applyTheme(
    colors: Record<string, string>,
    tokenColors?: TokenRule[],
    profileName?: string
  ): Promise<void> {
    await this.ensureSettingsFileSaved();
    const target = this.getTargetScope();
    const workbench = vscode.workspace.getConfiguration('workbench');
    const editor = vscode.workspace.getConfiguration('editor');
    const simpletheme = vscode.workspace.getConfiguration('simpletheme');

    const cleanColors: Record<string, string> = {};
    for (const k of Object.keys(colors)) {
      if (colors[k] && typeof colors[k] === 'string' && colors[k].trim()) {
        cleanColors[k] = colors[k].trim();
      }
    }

    try {
      // 1. Update workbench.colorCustomizations
      await workbench.update('colorCustomizations', Object.keys(cleanColors).length > 0 ? cleanColors : undefined, target);
    } catch (err: any) {
      if (err && err.message && err.message.includes('unsaved changes')) {
        await this.ensureSettingsFileSaved();
        await workbench.update('colorCustomizations', Object.keys(cleanColors).length > 0 ? cleanColors : undefined, target);
      } else {
        throw err;
      }
    }

    // 2. Update editor.tokenColorCustomizations & semanticTokenColorCustomizations if provided
    if (tokenColors && tokenColors.length > 0) {
      const tokenConfig: Record<string, any> = {
        textMateRules: tokenColors,
      };

      const semanticRules: Record<string, string> = {};

      tokenColors.forEach((r) => {
        const fg = r.settings?.foreground;
        if (!fg) return;
        const scopes = Array.isArray(r.scope) ? r.scope : [r.scope];

        if (scopes.some((s) => s.includes('string'))) {
          tokenConfig.strings = fg;
          semanticRules['string'] = fg;
        } else if (scopes.some((s) => s.includes('keyword'))) {
          tokenConfig.keywords = fg;
          semanticRules['keyword'] = fg;
        } else if (scopes.some((s) => s.includes('function'))) {
          tokenConfig.functions = fg;
          semanticRules['function'] = fg;
        } else if (scopes.some((s) => s.includes('property') || s.includes('key'))) {
          semanticRules['property'] = fg;
        } else if (scopes.some((s) => s.includes('variable'))) {
          tokenConfig.variables = fg;
          semanticRules['variable'] = fg;
        } else if (scopes.some((s) => s.includes('type') || s.includes('class'))) {
          tokenConfig.types = fg;
          semanticRules['type'] = fg;
        } else if (scopes.some((s) => s.includes('comment'))) {
          tokenConfig.comments = fg;
          semanticRules['comment'] = fg;
        } else if (scopes.some((s) => s.includes('numeric') || s.includes('number'))) {
          tokenConfig.numbers = fg;
          semanticRules['number'] = fg;
        }
      });

      try {
        await editor.update('tokenColorCustomizations', tokenConfig, target);
        await editor.update('semanticTokenColorCustomizations', { rules: semanticRules, enabled: true }, target);
      } catch (err: any) {
        if (err && err.message && err.message.includes('unsaved changes')) {
          await this.ensureSettingsFileSaved();
          await editor.update('tokenColorCustomizations', tokenConfig, target);
          await editor.update('semanticTokenColorCustomizations', { rules: semanticRules, enabled: true }, target);
        } else {
          throw err;
        }
      }
    }

    // 3. Save active profile name if provided
    if (profileName) {
      await simpletheme.update('activeProfile', profileName, target);
    }
  }

  public static async applySingleColor(key: string, value: string): Promise<void> {
    await this.ensureSettingsFileSaved();
    const target = this.getTargetScope();
    const workbench = vscode.workspace.getConfiguration('workbench');
    const current = workbench.get<Record<string, string>>('colorCustomizations') || {};
    const updated = { ...current, [key]: value };
    try {
      await workbench.update('colorCustomizations', updated, target);
    } catch (err: any) {
      if (err && err.message && err.message.includes('unsaved changes')) {
        await this.ensureSettingsFileSaved();
        await workbench.update('colorCustomizations', updated, target);
      }
    }
  }

  public static async applySingleTokenColor(syntaxId: string, color: string): Promise<void> {
    const target = this.getTargetScope();
    const editor = vscode.workspace.getConfiguration('editor');
    const currentTokens = this.getCurrentTokenColors();
    const tokenConfig: Record<string, any> = { ...(editor.get<any>('tokenColorCustomizations') || {}) };
    const semanticConfig: Record<string, any> = { ...(editor.get<any>('semanticTokenColorCustomizations') || {}) };
    const semanticRules: Record<string, string> = { ...(semanticConfig.rules || {}) };
    
    // Map syntaxId to scopes
    const scopeMap: Record<string, string[]> = {
      keywords: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'],
      functions: ['entity.name.function', 'support.function', 'meta.function-call'],
      properties: ['support.type.property-name', 'meta.object-literal.key', 'support.type.property-name.json', 'meta.structure.dictionary.json string.quoted.double.json', 'entity.name.tag.json'],
      strings: ['string', 'string.quoted', 'string.quoted.double', 'string.quoted.single', 'string.template', 'string.unquoted', 'string.json', 'source.json string', 'meta.structure.dictionary.value.json string.quoted.double.json'],
      variables: ['variable', 'variable.other', 'variable.parameter', 'variable.language'],
      types: ['entity.name.type', 'support.type', 'entity.name.class', 'entity.other.inherited-class'],
      comments: ['comment', 'comment.line', 'comment.block'],
      numbers: ['constant.numeric', 'constant.numeric.json', 'constant.language.boolean', 'constant.language.json', 'constant.language'],
      operators: ['keyword.operator', 'punctuation.separator', 'punctuation.terminator'],
      tags: ['entity.name.tag', 'entity.other.attribute-name'],
    };

    const targetScopes = scopeMap[syntaxId] || [syntaxId];
    const updated = [...currentTokens];
    const idx = updated.findIndex((r) => {
      const scopes = Array.isArray(r.scope) ? r.scope : [r.scope];
      return scopes.some((s) => targetScopes.includes(s));
    });

    if (idx >= 0) {
      updated[idx] = {
        ...updated[idx],
        settings: { ...updated[idx].settings, foreground: color },
      };
    } else {
      updated.push({
        scope: targetScopes,
        settings: { foreground: color },
      });
    }

    tokenConfig.textMateRules = updated;
    if (['strings', 'keywords', 'functions', 'variables', 'types', 'comments', 'numbers'].includes(syntaxId)) {
      tokenConfig[syntaxId] = color;
    }

    const semKeyMap: Record<string, string> = {
      strings: 'string',
      keywords: 'keyword',
      properties: 'property',
      functions: 'function',
      variables: 'variable',
      types: 'type',
      comments: 'comment',
      numbers: 'number',
    };
    if (semKeyMap[syntaxId]) {
      semanticRules[semKeyMap[syntaxId]] = color;
    }

    await editor.update('tokenColorCustomizations', tokenConfig, target);
    await editor.update('semanticTokenColorCustomizations', { rules: semanticRules, enabled: true }, target);
  }

  public static async applyPreset(preset: ThemePreset): Promise<void> {
    await this.applyTheme(preset.colors, preset.tokenColors, preset.name);
  }

  public static async resetTheme(): Promise<void> {
    const target = this.getTargetScope();
    const workbench = vscode.workspace.getConfiguration('workbench');
    const editor = vscode.workspace.getConfiguration('editor');
    const simpletheme = vscode.workspace.getConfiguration('simpletheme');

    await workbench.update('colorCustomizations', undefined, target);
    await editor.update('tokenColorCustomizations', undefined, target);
    await editor.update('semanticTokenColorCustomizations', undefined, target);
    await simpletheme.update('activeProfile', 'Default', target);
  }

  public static exportAsSettingsJson(colors: Record<string, string>, tokenColors?: TokenRule[]): string {
    const payload: any = {
      'workbench.colorCustomizations': colors,
    };
    if (tokenColors && tokenColors.length > 0) {
      payload['editor.tokenColorCustomizations'] = {
        textMateRules: tokenColors,
      };
    }
    return JSON.stringify(payload, null, 2);
  }
}
