class UnlockSystem {
    constructor() {
        this.unlockedIcons = new Set([0, 1, 2, 3]); // First 4 icons unlocked by default
        this.iconUnlockCosts = {
            4: 50,
            5: 100,
            6: 150,
            7: 200,
            8: 300,
            9: 400,
            10: 500,
            11: 750,
            12: 1000,
            13: 1500,
            14: 2000,
            15: 3000
        };
    }
    
    isIconUnlocked(iconId) {
        return this.unlockedIcons.has(iconId);
    }
    
    canUnlockIcon(iconId, mana) {
        if (this.unlockedIcons.has(iconId)) return false;
        const cost = this.iconUnlockCosts[iconId] || 0;
        return mana >= cost;
    }
    
    unlockIcon(iconId) {
        const cost = this.iconUnlockCosts[iconId] || 0;
        this.unlockedIcons.add(iconId);
        return cost;
    }
    
    getUnlockedIcons() {
        return Array.from(this.unlockedIcons);
    }
    
    loadState(data) {
        if (data && data.unlockedIcons) {
            this.unlockedIcons = new Set(data.unlockedIcons);
        }
    }
    
    saveState() {
        return {
            unlockedIcons: Array.from(this.unlockedIcons)
        };
    }
}
