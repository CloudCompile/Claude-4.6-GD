class LevelSelect {
    constructor(uiManager) {
        this.ui = uiManager;
        this.element = document.getElementById('level-select');
        this.levelList = document.getElementById('level-list');
        
        document.getElementById('btn-back-levels').addEventListener('click', () => {
            this.ui.showScreen('title-screen');
        });
    }
    
    populate(levels, progressionManager) {
        if (!this.levelList) return;
        this.levelList.innerHTML = '';
        
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            const diff = GD.DIFFICULTIES[level.difficulty] || GD.DIFFICULTIES.NORMAL;
            const progress = progressionManager ? progressionManager.getLevelProgress(i) : 0;
            
            const card = document.createElement('div');
            card.className = 'level-card';
            card.innerHTML = `
                <div class="difficulty-icon">${diff.icon}</div>
                <div class="level-name">${level.name}</div>
                <div class="level-difficulty" style="color:${diff.color}">${diff.name}</div>
                <div class="level-progress">${Math.floor(progress)}%</div>
            `;
            card.addEventListener('click', () => {
                this.ui.onLevelSelect(i);
            });
            this.levelList.appendChild(card);
        }
    }
}
