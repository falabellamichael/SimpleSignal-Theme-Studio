"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileManager = void 0;
const STORAGE_KEY_PROFILES = 'simpletheme.savedProfiles';
class ProfileManager {
    static context;
    static initialize(ctx) {
        this.context = ctx;
    }
    static getProfiles() {
        if (!this.context)
            return [];
        return this.context.globalState.get(STORAGE_KEY_PROFILES, []);
    }
    static async saveProfile(name, colors, tokenColors = [], type = 'dark') {
        const profiles = this.getProfiles();
        const existingIdx = profiles.findIndex((p) => p.name.toLowerCase() === name.toLowerCase());
        const profile = {
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
        }
        else {
            profiles.push(profile);
        }
        await this.context.globalState.update(STORAGE_KEY_PROFILES, profiles);
        return profile;
    }
    static async deleteProfile(id) {
        const profiles = this.getProfiles();
        const filtered = profiles.filter((p) => p.id !== id && p.name !== id);
        if (filtered.length !== profiles.length) {
            await this.context.globalState.update(STORAGE_KEY_PROFILES, filtered);
            return true;
        }
        return false;
    }
    static getProfile(idOrName) {
        return this.getProfileById(idOrName);
    }
    static getProfileById(idOrName) {
        const profiles = this.getProfiles();
        return profiles.find((p) => p.id === idOrName || p.name.toLowerCase() === idOrName.toLowerCase());
    }
    static async importProfile(jsonStr) {
        const parsed = JSON.parse(jsonStr);
        let colors = {};
        let tokenColors = [];
        let name = parsed.name || `Imported Theme (${new Date().toLocaleDateString()})`;
        let type = parsed.type === 'light' ? 'light' : 'dark';
        if (parsed['workbench.colorCustomizations']) {
            colors = parsed['workbench.colorCustomizations'];
        }
        else if (parsed.colors) {
            colors = parsed.colors;
        }
        if (parsed['editor.tokenColorCustomizations']?.textMateRules) {
            tokenColors = parsed['editor.tokenColorCustomizations'].textMateRules;
        }
        else if (parsed.tokenColors) {
            tokenColors = parsed.tokenColors;
        }
        return await this.saveProfile(name, colors, tokenColors, type);
    }
}
exports.ProfileManager = ProfileManager;
//# sourceMappingURL=profileManager.js.map