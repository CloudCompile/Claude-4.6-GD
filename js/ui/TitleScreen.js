class TitleScreen {
    constructor(uiManager) {
        this.ui = uiManager;
        this.element = document.getElementById('title-screen');
        this.starCount = document.getElementById('star-count');
        this.coinCount = document.getElementById('coin-count');
        this.manaCount = document.getElementById('mana-count');
        
        document.getElementById('btn-play').addEventListener('click', () => {
            this.ui.showScreen('level-select');
        });
        
        document.getElementById('btn-icons').addEventListener('click', () => {
            this.ui.showScreen('icon-select');
            this.ui.populateIcons();
        });
        
        document.getElementById('btn-settings').addEventListener('click', () => {
            this.ui.showScreen('settings-screen');
        });
    }
    
    updateStats(stars, coins, mana) {
        if (this.starCount) this.starCount.textContent = '⭐ ' + stars;
        if (this.coinCount) this.coinCount.textContent = '🪙 ' + coins;
        if (this.manaCount) this.manaCount.textContent = '💎 ' + mana;
    }
}
