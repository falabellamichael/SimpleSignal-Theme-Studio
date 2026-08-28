export interface UISectionColor {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'bars' | 'editor' | 'tabs' | 'terminal' | 'chat';
  defaultValue: string;
}

export interface TokenRule {
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export interface SyntaxScopeItem {
  id: string;
  name: string;
  description: string;
  scopes: string[];
  defaultColor: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  author?: string;
  type: 'dark' | 'light';
  accentColor: string;
  colors: Record<string, string>;
  tokenColors: TokenRule[];
}

export interface ThemeProfile {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  type: 'dark' | 'light';
  colors: Record<string, string>;
  tokenColors: TokenRule[];
}

export interface StudioState {
  currentProfileName: string;
  isModified: boolean;
  colors: Record<string, string>;
  syntaxColors: Record<string, string>;
  activeTab: 'ui' | 'syntax' | 'presets' | 'profiles' | 'export';
  searchFilter: string;
  categoryFilter: string;
  liveApply: boolean;
}
