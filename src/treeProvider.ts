import * as vscode from 'vscode';
import { THEME_PRESETS } from './presets';
import { ProfileManager } from './profileManager';
import { ThemePreset, ThemeProfile } from './types';

export class TreeItemNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly contextValue?: string,
    public readonly iconPath?: vscode.ThemeIcon | vscode.Uri,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}

export class SimpleSignalThemeTreeProvider implements vscode.TreeDataProvider<TreeItemNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItemNode | undefined | void> = new vscode.EventEmitter<TreeItemNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<TreeItemNode | undefined | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TreeItemNode): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: TreeItemNode): Promise<TreeItemNode[]> {
    if (!element) {
      const items: TreeItemNode[] = [];
      const config = vscode.workspace.getConfiguration('simpletheme');
      const activeProfile = config.get<string>('activeProfile', 'Cyberpunk Neon');

      // 1. Current Active Profile Banner
      const activeNode = new TreeItemNode(
        `Active Theme: ${activeProfile}`,
        vscode.TreeItemCollapsibleState.None,
        'active_profile_node',
        new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor('charts.yellow')),
        { command: 'simpletheme.openStudio', title: 'Open Theme Studio' }
      );
      activeNode.tooltip = `Currently active theme: ${activeProfile}\nClick to open Theme Studio`;
      items.push(activeNode);

      // 2. Open Visual Studio Action
      const studioNode = new TreeItemNode(
        '🎨 Open Visual Theme Studio',
        vscode.TreeItemCollapsibleState.None,
        'action_node',
        new vscode.ThemeIcon('paintcan', new vscode.ThemeColor('charts.green')),
        { command: 'simpletheme.openStudio', title: 'Open Theme Studio' }
      );
      items.push(studioNode);

      // 3. Presets Library Subgroup
      const presetsGroup = new TreeItemNode(
        `Theme Presets (${THEME_PRESETS.length})`,
        vscode.TreeItemCollapsibleState.Collapsed,
        'category_presets',
        new vscode.ThemeIcon('color-mode', new vscode.ThemeColor('charts.purple'))
      );
      presetsGroup.description = 'Curated palettes';
      items.push(presetsGroup);

      // 4. Saved User Profiles Subgroup
      const savedProfiles = ProfileManager.getProfiles();
      const profilesGroup = new TreeItemNode(
        `My Saved Profiles (${savedProfiles.length})`,
        vscode.TreeItemCollapsibleState.Collapsed,
        'category_profiles',
        new vscode.ThemeIcon('folder', new vscode.ThemeColor('charts.blue'))
      );
      profilesGroup.description = 'Custom user profiles';
      items.push(profilesGroup);

      // 5. Quick Color Tweakers Subgroup
      const quickGroup = new TreeItemNode(
        'Quick Color Tweakers',
        vscode.TreeItemCollapsibleState.Collapsed,
        'category_quick',
        new vscode.ThemeIcon('symbol-property', new vscode.ThemeColor('charts.orange'))
      );
      quickGroup.description = 'Accent, Editor BG, Sidebar';
      items.push(quickGroup);

      // 6. Management Actions Subgroup
      const actionsGroup = new TreeItemNode(
        'Actions & Export',
        vscode.TreeItemCollapsibleState.Collapsed,
        'category_actions',
        new vscode.ThemeIcon('gear')
      );
      items.push(actionsGroup);

      return items;
    }

    if (element.contextValue === 'category_presets') {
      return THEME_PRESETS.map((preset) => {
        const node = new TreeItemNode(
          preset.name,
          vscode.TreeItemCollapsibleState.None,
          'preset_item',
          new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor('charts.blue')),
          { command: 'simpletheme.applyPresetDirect', title: 'Apply Preset', arguments: [preset] }
        );
        node.description = preset.type.toUpperCase();
        node.tooltip = `${preset.description}\nClick to apply to VS Code`;
        return node;
      });
    }

    if (element.contextValue === 'category_profiles') {
      const profiles = ProfileManager.getProfiles();
      if (profiles.length === 0) {
        return [
          new TreeItemNode('No saved profiles yet. Click "Save Current Profile" below.', vscode.TreeItemCollapsibleState.None, 'empty', new vscode.ThemeIcon('info')),
        ];
      }
      return profiles.map((p) => {
        const node = new TreeItemNode(
          p.name,
          vscode.TreeItemCollapsibleState.None,
          'saved_profile_item',
          new vscode.ThemeIcon('file-code', new vscode.ThemeColor('charts.green')),
          { command: 'simpletheme.applyProfileDirect', title: 'Apply Profile', arguments: [p] }
        );
        node.description = new Date(p.updatedAt).toLocaleDateString();
        node.tooltip = `Saved profile with ${Object.keys(p.colors).length} custom colors\nClick to apply`;
        return node;
      });
    }

    if (element.contextValue === 'category_quick') {
      return [
        new TreeItemNode(
          '✨ Tweak Accent Color...',
          vscode.TreeItemCollapsibleState.None,
          'quick_tweak',
          new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor('charts.yellow')),
          { command: 'simpletheme.quickTweakAccent', title: 'Tweak Accent' }
        ),
        new TreeItemNode(
          '🖥️ Tweak Editor Background...',
          vscode.TreeItemCollapsibleState.None,
          'quick_tweak',
          new vscode.ThemeIcon('window', new vscode.ThemeColor('charts.blue')),
          { command: 'simpletheme.quickTweakEditorBg', title: 'Tweak Editor BG' }
        ),
        new TreeItemNode(
          '📂 Tweak Sidebar Background...',
          vscode.TreeItemCollapsibleState.None,
          'quick_tweak',
          new vscode.ThemeIcon('layout-sidebar-left', new vscode.ThemeColor('charts.purple')),
          { command: 'simpletheme.quickTweakSidebarBg', title: 'Tweak Sidebar BG' }
        ),
      ];
    }

    if (element.contextValue === 'category_actions') {
      return [
        new TreeItemNode(
          '💾 Save Current Theme as Profile...',
          vscode.TreeItemCollapsibleState.None,
          'action_item',
          new vscode.ThemeIcon('save'),
          { command: 'simpletheme.saveCurrentProfile', title: 'Save Profile' }
        ),
        new TreeItemNode(
          '📋 Export Settings JSON to Clipboard',
          vscode.TreeItemCollapsibleState.None,
          'action_item',
          new vscode.ThemeIcon('copy'),
          { command: 'simpletheme.exportJson', title: 'Export JSON' }
        ),
        new TreeItemNode(
          '📥 Import Theme JSON...',
          vscode.TreeItemCollapsibleState.None,
          'action_item',
          new vscode.ThemeIcon('file-code'),
          { command: 'simpletheme.importJson', title: 'Import JSON' }
        ),
        new TreeItemNode(
          '📦 Package as Standalone Theme (.vsix)...',
          vscode.TreeItemCollapsibleState.None,
          'action_item',
          new vscode.ThemeIcon('package'),
          { command: 'simpletheme.exportVsix', title: 'Export VSIX' }
        ),
        new TreeItemNode(
          '🔄 Reset Theme Customizations to Default',
          vscode.TreeItemCollapsibleState.None,
          'action_item',
          new vscode.ThemeIcon('clear-all', new vscode.ThemeColor('charts.red')),
          { command: 'simpletheme.resetTheme', title: 'Reset Theme' }
        ),
      ];
    }

    return [];
  }
}
