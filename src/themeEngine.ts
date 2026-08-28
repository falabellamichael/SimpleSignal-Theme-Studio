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

    // 2. Update editor.tokenColorCustomizations if provided
    if (tokenColors && tokenColors.length > 0) {
      await editor.update('tokenColorCustomizations', { textMateRules: tokenColors }, target);
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
    
    // Map syntaxId to scopes
    const scopeMap: Record<string, string[]> = {
      keywords: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'],
      functions: ['entity.name.function', 'support.function', 'meta.function-call'],
      strings: ['string', 'string.quoted', 'string.template'],
      variables: ['variable', 'variable.other', 'variable.parameter'],
      types: ['entity.name.type', 'support.type', 'entity.name.class'],
      comments: ['comment', 'comment.line', 'comment.block'],
      numbers: ['constant.numeric', 'constant.language.boolean', 'constant.language'],
      operators: ['keyword.operator', 'punctuation.separator'],
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

    await editor.update('tokenColorCustomizations', { textMateRules: updated }, target);
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
