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
        // 2. Update editor.tokenColorCustomizations & semanticTokenColorCustomizations if provided
        if (tokenColors && tokenColors.length > 0) {
            const tokenConfig = {
                textMateRules: tokenColors,
            };
            const semanticRules = {};
            tokenColors.forEach((r) => {
                const fg = r.settings?.foreground;
                if (!fg)
                    return;
                const scopes = Array.isArray(r.scope) ? r.scope : [r.scope];
                if (scopes.some((s) => s.includes('string'))) {
                    tokenConfig.strings = fg;
                    semanticRules['string'] = fg;
                }
                else if (scopes.some((s) => s.includes('keyword'))) {
                    tokenConfig.keywords = fg;
                    semanticRules['keyword'] = fg;
                }
                else if (scopes.some((s) => s.includes('function'))) {
                    tokenConfig.functions = fg;
                    semanticRules['function'] = fg;
                }
                else if (scopes.some((s) => s.includes('property') || s.includes('key'))) {
                    semanticRules['property'] = fg;
                }
                else if (scopes.some((s) => s.includes('variable'))) {
                    tokenConfig.variables = fg;
                    semanticRules['variable'] = fg;
                }
                else if (scopes.some((s) => s.includes('type') || s.includes('class'))) {
                    tokenConfig.types = fg;
                    semanticRules['type'] = fg;
                }
                else if (scopes.some((s) => s.includes('comment'))) {
                    tokenConfig.comments = fg;
                    semanticRules['comment'] = fg;
                }
                else if (scopes.some((s) => s.includes('numeric') || s.includes('number'))) {
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
        const tokenConfig = { ...(editor.get('tokenColorCustomizations') || {}) };
        const semanticConfig = { ...(editor.get('semanticTokenColorCustomizations') || {}) };
        const semanticRules = { ...(semanticConfig.rules || {}) };
        // Map syntaxId to scopes
        const scopeMap = {
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
        }
        else {
            updated.push({
                scope: targetScopes,
                settings: { foreground: color },
            });
        }
        tokenConfig.textMateRules = updated;
        if (['strings', 'keywords', 'functions', 'variables', 'types', 'comments', 'numbers'].includes(syntaxId)) {
            tokenConfig[syntaxId] = color;
        }
        const semKeyMap = {
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
        await editor.update('semanticTokenColorCustomizations', undefined, target);
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