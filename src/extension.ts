import * as vscode from 'vscode';
import { ThemeEngine } from './themeEngine';
import { ProfileManager } from './profileManager';
import { ThemeStudioWebview } from './themeStudioWebview';
import { SimpleSignalThemeTreeProvider } from './treeProvider';
import { ThemeExporter } from './themeExporter';
import { THEME_PRESETS } from './presets';
import { ThemePreset, ThemeProfile } from './types';

export function activate(context: vscode.ExtensionContext) {
  ProfileManager.initialize(context);

  const treeProvider = new SimpleSignalThemeTreeProvider();
  vscode.window.registerTreeDataProvider('simpleThemeView', treeProvider);

  // Status Bar Item
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
  statusBarItem.command = 'simpletheme.openStudio';
  context.subscriptions.push(statusBarItem);
  updateStatusBar(statusBarItem);

  // 1. Open Visual Theme Studio
  const openStudioCmd = vscode.commands.registerCommand('simpletheme.openStudio', () => {
    ThemeStudioWebview.createOrShow(context.extensionUri);
  });
  context.subscriptions.push(openStudioCmd);

  // 2. Load Preset via QuickPick
  const applyPresetCmd = vscode.commands.registerCommand('simpletheme.applyPreset', async () => {
    const items = THEME_PRESETS.map((p) => ({
      label: p.name,
      description: `${p.type.toUpperCase()} • Accent: ${p.accentColor}`,
      detail: p.description,
      preset: p,
    }));

    const picked = await vscode.window.showQuickPick(items, {
      title: 'Select Theme Preset to Apply',
      placeHolder: 'Choose a designer theme preset...',
    });

    if (picked) {
      await ThemeEngine.applyPreset(picked.preset);
      vscode.window.showInformationMessage(`✨ Applied "${picked.preset.name}" to VS Code!`);
      treeProvider.refresh();
      updateStatusBar(statusBarItem);
    }
  });
  context.subscriptions.push(applyPresetCmd);

  // 3. Direct Preset Application (from TreeView)
  const applyPresetDirectCmd = vscode.commands.registerCommand('simpletheme.applyPresetDirect', async (preset: ThemePreset) => {
    if (preset) {
      await ThemeEngine.applyPreset(preset);
      vscode.window.showInformationMessage(`✨ Applied "${preset.name}" to VS Code!`);
      treeProvider.refresh();
      updateStatusBar(statusBarItem);
    }
  });
  context.subscriptions.push(applyPresetDirectCmd);

  // 4. Direct Profile Application (from TreeView)
  const applyProfileDirectCmd = vscode.commands.registerCommand('simpletheme.applyProfileDirect', async (profile: ThemeProfile) => {
    if (profile) {
      await ThemeEngine.applyTheme(profile.colors, profile.tokenColors, profile.name);
      vscode.window.showInformationMessage(`✨ Applied profile "${profile.name}"!`);
      treeProvider.refresh();
      updateStatusBar(statusBarItem);
    }
  });
  context.subscriptions.push(applyProfileDirectCmd);

  // 5. Save Current Theme as Profile
  const saveCurrentProfileCmd = vscode.commands.registerCommand('simpletheme.saveCurrentProfile', async () => {
    const name = await vscode.window.showInputBox({
      title: 'Save Current Theme as Profile',
      prompt: 'Enter a name for this custom theme profile',
      value: 'My Custom Theme',
      ignoreFocusOut: true,
    });

    if (!name || !name.trim()) return;

    const colors = ThemeEngine.getCurrentColors();
    const tokenColors = ThemeEngine.getCurrentTokenColors();

    if (Object.keys(colors).length === 0) {
      vscode.window.showWarningMessage('No custom colors are active. Apply a preset or tweak colors first.');
      return;
    }

    await ProfileManager.saveProfile(name.trim(), colors, tokenColors);
    vscode.window.showInformationMessage(`💾 Saved profile "${name.trim()}"!`);
    treeProvider.refresh();
  });
  context.subscriptions.push(saveCurrentProfileCmd);

  // 6. Quick Tweak Accent Color
  const quickTweakAccentCmd = vscode.commands.registerCommand('simpletheme.quickTweakAccent', async () => {
    const hex = await vscode.window.showInputBox({
      title: 'Quick Tweak: Accent Color',
      prompt: 'Enter Hex color (e.g. #ffe600, #00f0ff, #ff0055, #00ff88)',
      value: '#ffe600',
      ignoreFocusOut: true,
    });

    if (!hex || !hex.trim().startsWith('#')) return;

    const val = hex.trim();
    await ThemeEngine.applySingleColor('focusBorder', val);
    await ThemeEngine.applySingleColor('activityBarBadge.background', val);
    await ThemeEngine.applySingleColor('tab.activeBorderTop', val);
    await ThemeEngine.applySingleColor('editorCursor.foreground', val);
    vscode.window.showInformationMessage(`✨ Updated accent color to ${val}!`);
    treeProvider.refresh();
  });
  context.subscriptions.push(quickTweakAccentCmd);

  // 7. Quick Tweak Editor Background
  const quickTweakEditorBgCmd = vscode.commands.registerCommand('simpletheme.quickTweakEditorBg', async () => {
    const hex = await vscode.window.showInputBox({
      title: 'Quick Tweak: Editor Background',
      prompt: 'Enter Hex color (e.g. #000000 for OLED Black, #1a1b26, #282a36, #ffffff)',
      value: '#000000',
      ignoreFocusOut: true,
    });

    if (!hex || !hex.trim().startsWith('#')) return;

    const val = hex.trim();
    await ThemeEngine.applySingleColor('editor.background', val);
    await ThemeEngine.applySingleColor('tab.activeBackground', val);
    await ThemeEngine.applySingleColor('terminal.background', val);
    vscode.window.showInformationMessage(`✨ Updated editor background to ${val}!`);
    treeProvider.refresh();
  });
  context.subscriptions.push(quickTweakEditorBgCmd);

  // 8. Quick Tweak Sidebar Background
  const quickTweakSidebarBgCmd = vscode.commands.registerCommand('simpletheme.quickTweakSidebarBg', async () => {
    const hex = await vscode.window.showInputBox({
      title: 'Quick Tweak: Sidebar Background',
      prompt: 'Enter Hex color (e.g. #080808, #16161e, #21222c, #f8fafc)',
      value: '#080808',
      ignoreFocusOut: true,
    });

    if (!hex || !hex.trim().startsWith('#')) return;

    const val = hex.trim();
    await ThemeEngine.applySingleColor('sideBar.background', val);
    await ThemeEngine.applySingleColor('activityBar.background', val);
    await ThemeEngine.applySingleColor('editorGroupHeader.tabsBackground', val);
    vscode.window.showInformationMessage(`✨ Updated sidebar & activity bar to ${val}!`);
    treeProvider.refresh();
  });
  context.subscriptions.push(quickTweakSidebarBgCmd);

  // 9. Export Settings JSON to Clipboard
  const exportJsonCmd = vscode.commands.registerCommand('simpletheme.exportJson', async () => {
    const colors = ThemeEngine.getCurrentColors();
    const tokenColors = ThemeEngine.getCurrentTokenColors();
    const jsonStr = ThemeEngine.exportAsSettingsJson(colors, tokenColors);
    await vscode.env.clipboard.writeText(jsonStr);
    vscode.window.showInformationMessage('📋 Copied theme settings JSON to clipboard!');
  });
  context.subscriptions.push(exportJsonCmd);

  // 10. Import JSON
  const importJsonCmd = vscode.commands.registerCommand('simpletheme.importJson', async () => {
    const jsonStr = await vscode.window.showInputBox({
      title: 'Import Theme JSON',
      prompt: 'Paste your VS Code settings JSON snippet or theme configuration',
      ignoreFocusOut: true,
    });

    if (!jsonStr || !jsonStr.trim()) return;

    try {
      const profile = await ProfileManager.importProfile(jsonStr.trim());
      await ThemeEngine.applyTheme(profile.colors, profile.tokenColors, profile.name);
      vscode.window.showInformationMessage(`✨ Imported and applied "${profile.name}"!`);
      treeProvider.refresh();
      updateStatusBar(statusBarItem);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to import JSON: ${err.message || err}`);
    }
  });
  context.subscriptions.push(importJsonCmd);

  // 11. Export Standalone Theme Extension
  const exportVsixCmd = vscode.commands.registerCommand('simpletheme.exportVsix', async () => {
    const config = vscode.workspace.getConfiguration('simpletheme');
    const defaultName = config.get<string>('activeProfile', 'My Custom Theme');

    const themeName = await vscode.window.showInputBox({
      title: 'Generate Standalone Theme Extension',
      prompt: 'Enter theme display name',
      value: defaultName,
      ignoreFocusOut: true,
    });

    if (!themeName || !themeName.trim()) return;

    const targetUri = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      title: 'Select Destination Folder for Theme Extension',
      openLabel: 'Export Extension Here',
    });

    if (!targetUri || targetUri.length === 0) return;

    const colors = ThemeEngine.getCurrentColors();
    const tokenColors = ThemeEngine.getCurrentTokenColors();
    const outDir = await ThemeExporter.exportToFolder(
      targetUri[0].fsPath,
      themeName.trim(),
      'dark',
      colors,
      tokenColors
    );

    vscode.window.showInformationMessage(`📦 Generated standalone theme extension project in: ${outDir}`, 'Open Folder').then((choice) => {
      if (choice === 'Open Folder') {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(outDir), true);
      }
    });
  });
  context.subscriptions.push(exportVsixCmd);

  // 12. Reset Theme to Default
  const resetThemeCmd = vscode.commands.registerCommand('simpletheme.resetTheme', async () => {
    const confirm = await vscode.window.showWarningMessage(
      'Are you sure you want to reset all theme customizations and restore default VS Code colors?',
      { modal: true },
      'Yes, Reset Theme'
    );

    if (confirm === 'Yes, Reset Theme') {
      await ThemeEngine.resetTheme();
      vscode.window.showInformationMessage('🔄 Reset theme customizations back to default.');
      treeProvider.refresh();
      updateStatusBar(statusBarItem);
    }
  });
  context.subscriptions.push(resetThemeCmd);

  // Watch configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('workbench.colorCustomizations') || e.affectsConfiguration('simpletheme.activeProfile')) {
        treeProvider.refresh();
        updateStatusBar(statusBarItem);
      }
    })
  );
}

function updateStatusBar(statusBarItem: vscode.StatusBarItem) {
  const config = vscode.workspace.getConfiguration('simpletheme');
  const activeProfile = config.get<string>('activeProfile', 'Custom');
  statusBarItem.text = `$(paintcan) SimpleTheme: ${activeProfile}`;
  statusBarItem.tooltip = `Active Theme Customization: ${activeProfile}\nClick to open SimpleSignal Theme Studio`;
  statusBarItem.show();
}

export function deactivate() {}
