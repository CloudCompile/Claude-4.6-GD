class ProgressionManager {
    constructor() {
        this.saveSystem = new SaveSystem();
        this.unlockSystem = new UnlockSystem();
        
        this.stars = 0;
        this.coins = 0;
        this.manaOrbs = 0;
        this.levelProgress = {}; // levelIndex -> best progress (0-100)
        this.levelStars = {}; // levelIndex -> earned stars
        this.levelCoins = {}; // levelIndex -> [bool, bool, bool]
        this.totalAttempts = 0;
        this.selectedIcon = 0;
        
        this.load();
    }
    
    load() {
        const data = this.saveSystem.load();
        if (data) {
            this.stars = data.stars || 0;
            this.coins = data.coins || 0;
            this.manaOrbs = data.manaOrbs || 0;
            this.levelProgress = data.levelProgress || {};
            this.levelStars = data.levelStars || {};
            this.levelCoins = data.levelCoins || {};
            this.totalAttempts = data.totalAttempts || 0;
            this.selectedIcon = data.selectedIcon || 0;
            this.unlockSystem.loadState(data.unlocks);
        }
    }
    
    save() {
        this.saveSystem.save({
            stars: this.stars,
            coins: this.coins,
            manaOrbs: this.manaOrbs,
            levelProgress: this.levelProgress,
            levelStars: this.levelStars,
            levelCoins: this.levelCoins,
            totalAttempts: this.totalAttempts,
            selectedIcon: this.selectedIcon,
            unlocks: this.unlockSystem.saveState()
        });
    }
    
    getLevelProgress(levelIndex) {
        return this.levelProgress[levelIndex] || 0;
    }
    
    updateLevelProgress(levelIndex, progress) {
        const current = this.levelProgress[levelIndex] || 0;
        if (progress > current) {
            this.levelProgress[levelIndex] = progress;
        }
    }
    
    completeLevel(levelIndex, coinsCollected, difficulty) {
        const diff = GD.DIFFICULTIES[difficulty] || GD.DIFFICULTIES.NORMAL;
        
        // Award stars if not already earned
        if (!this.levelStars[levelIndex]) {
            this.levelStars[levelIndex] = diff.stars;
            this.stars += diff.stars;
        }
        
        // Award coins
        if (!this.levelCoins[levelIndex]) {
            this.levelCoins[levelIndex] = [false, false, false];
        }
        if (coinsCollected) {
            for (let i = 0; i < coinsCollected.length && i < 3; i++) {
                if (coinsCollected[i] && !this.levelCoins[levelIndex][i]) {
                    this.levelCoins[levelIndex][i] = true;
                    this.coins++;
                }
            }
        }
        
        // Award mana orbs
        this.manaOrbs += diff.stars * 5;
        
        // Update progress to 100
        this.levelProgress[levelIndex] = 100;
        
        this.save();
    }
    
    recordAttempt() {
        this.totalAttempts++;
        this.manaOrbs += 1; // Small mana for each attempt
    }
    
    isIconUnlocked(iconId) {
        return this.unlockSystem.isIconUnlocked(iconId);
    }
    
    getStats() {
        return {
            stars: this.stars,
            coins: this.coins,
            mana: this.manaOrbs,
            attempts: this.totalAttempts
        };
    }
}
