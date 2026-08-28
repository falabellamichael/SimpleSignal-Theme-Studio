import * as vscode from 'vscode';
import { ThemeProfile, TokenRule } from './types';

const STORAGE_KEY_PROFILES = 'simpletheme.savedProfiles';

export class ProfileManager {
  private static context: vscode.ExtensionContext;

  public static initialize(ctx: vscode.ExtensionContext) {
    this.context = ctx;
  }

  public static getProfiles(): ThemeProfile[] {
    if (!this.context) return [];
    return this.context.globalState.get<ThemeProfile[]>(STORAGE_KEY_PROFILES, []);
  }

  public static async saveProfile(
    name: string,
    colors: Record<string, string>,
    tokenColors: TokenRule[] = [],
    type: 'dark' | 'light' = 'dark'
  ): Promise<ThemeProfile> {
    const profiles = this.getProfiles();
    const existingIdx = profiles.findIndex((p) => p.name.toLowerCase() === name.toLowerCase());

    const profile: ThemeProfile = {
      id: existingIdx >= 0 ? profiles[existingIdx].id : `profile_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      createdAt: existingIdx >= 0 ? profiles[existingIdx].createdAt : Date.now(),
      updatedAt: Date.now(),
      type,
      colors,
      tokenColors,
    };

    if (existingIdx >= 0) {
      profiles[existingIdx] = profile;
    } else {
      profiles.push(profile);
    }

    await this.context.globalState.update(STORAGE_KEY_PROFILES, profiles);
    return profile;
  }

  public static async deleteProfile(id: string): Promise<boolean> {
    const profiles = this.getProfiles();
    const filtered = profiles.filter((p) => p.id !== id && p.name !== id);
    if (filtered.length !== profiles.length) {
      await this.context.globalState.update(STORAGE_KEY_PROFILES, filtered);
      return true;
    }
    return false;
  }

  public static getProfileById(idOrName: string): ThemeProfile | undefined {
    const profiles = this.getProfiles();
    return profiles.find((p) => p.id === idOrName || p.name.toLowerCase() === idOrName.toLowerCase());
  }

  public static async importProfile(jsonStr: string): Promise<ThemeProfile> {
    const parsed = JSON.parse(jsonStr);
    let colors: Record<string, string> = {};
    let tokenColors: TokenRule[] = [];
    let name = parsed.name || `Imported Theme (${new Date().toLocaleDateString()})`;
    let type: 'dark' | 'light' = parsed.type === 'light' ? 'light' : 'dark';

    if (parsed['workbench.colorCustomizations']) {
      colors = parsed['workbench.colorCustomizations'];
    } else if (parsed.colors) {
      colors = parsed.colors;
    }

    if (parsed['editor.tokenColorCustomizations']?.textMateRules) {
      tokenColors = parsed['editor.tokenColorCustomizations'].textMateRules;
    } else if (parsed.tokenColors) {
      tokenColors = parsed.tokenColors;
    }

    return await this.saveProfile(name, colors, tokenColors, type);
  }
}
