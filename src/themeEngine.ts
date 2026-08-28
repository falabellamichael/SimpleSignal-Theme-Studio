import * as vscode from 'vscode';
import { ThemePreset, TokenRule } from './types';

export class ThemeEngine {
  public static getTargetScope(): vscode.ConfigurationTarget {
    const config = vscode.workspace.getConfiguration('simpletheme');
    const scope = config.get<string>('targetScope', 'global');
    return scope === 'workspace' ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
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

  public static async applyTheme(
    colors: Record<string, string>,
    tokenColors?: TokenRule[],
    profileName?: string
  ): Promise<void> {
    const target = this.getTargetScope();
    const workbench = vscode.workspace.getConfiguration('workbench');
    const editor = vscode.workspace.getConfiguration('editor');
    const simpletheme = vscode.workspace.getConfiguration('simpletheme');

    // 1. Update workbench.colorCustomizations
    await workbench.update('colorCustomizations', colors, target);

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

      await editor.update('tokenColorCustomizations', tokenConfig, target);
      await editor.update('semanticTokenColorCustomizations', { rules: semanticRules, enabled: true }, target);
    }

    // 3. Save active profile name if provided
    if (profileName) {
      await simpletheme.update('activeProfile', profileName, target);
    }
  }

  public static async applySingleColor(key: string, value: string): Promise<void> {
    const target = this.getTargetScope();
    const workbench = vscode.workspace.getConfiguration('workbench');
    const current = workbench.get<Record<string, string>>('colorCustomizations') || {};
    const updated = { ...current, [key]: value };
    await workbench.update('colorCustomizations', updated, target);
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
