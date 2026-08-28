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
exports.ThemeEngine = void 0;
const vscode = __importStar(require("vscode"));
class ThemeEngine {
    static getTargetScope() {
        const config = vscode.workspace.getConfiguration('simpletheme');
        const scope = config.get('targetScope', 'global');
        return scope === 'workspace' ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
    }
    static getCurrentColors() {
        const workbench = vscode.workspace.getConfiguration('workbench');
        const colors = workbench.get('colorCustomizations') || {};
        return { ...colors };
    }
    static getCurrentTokenColors() {
        const editor = vscode.workspace.getConfiguration('editor');
        const tokenCustomizations = editor.get('tokenColorCustomizations') || {};
        const textMateRules = tokenCustomizations.textMateRules || [];
        return Array.isArray(textMateRules) ? textMateRules : [];
    }
    static async applyTheme(colors, tokenColors, profileName) {
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
    static async applySingleColor(key, value) {
        const target = this.getTargetScope();
        const workbench = vscode.workspace.getConfiguration('workbench');
        const current = workbench.get('colorCustomizations') || {};
        const updated = { ...current, [key]: value };
        await workbench.update('colorCustomizations', updated, target);
    }
    static async applySingleTokenColor(syntaxId, color) {
        const target = this.getTargetScope();
        const editor = vscode.workspace.getConfiguration('editor');
        const currentTokens = this.getCurrentTokenColors();
        // Map syntaxId to scopes
        const scopeMap = {
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
        }
        else {
            updated.push({
                scope: targetScopes,
                settings: { foreground: color },
            });
        }
        await editor.update('tokenColorCustomizations', { textMateRules: updated }, target);
    }
    static async applyPreset(preset) {
        await this.applyTheme(preset.colors, preset.tokenColors, preset.name);
    }
    static async resetTheme() {
        const target = this.getTargetScope();
        const workbench = vscode.workspace.getConfiguration('workbench');
        const editor = vscode.workspace.getConfiguration('editor');
        const simpletheme = vscode.workspace.getConfiguration('simpletheme');
        await workbench.update('colorCustomizations', undefined, target);
        await editor.update('tokenColorCustomizations', undefined, target);
        await simpletheme.update('activeProfile', 'Default', target);
    }
    static exportAsSettingsJson(colors, tokenColors) {
        const payload = {
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
exports.ThemeEngine = ThemeEngine;
//# sourceMappingURL=themeEngine.js.map