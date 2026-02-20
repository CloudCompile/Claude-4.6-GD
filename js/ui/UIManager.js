class UIManager {
    constructor(game) {
        this.game = game;
        this.currentScreen = 'title-screen';
        this.screens = {};
        
        // Cache screen elements
        const screenIds = [
            'title-screen', 'level-select', 'icon-select',
            'pause-menu', 'death-screen', 'complete-screen',
            'settings-screen', 'hud'
        ];
        for (const id of screenIds) {
            this.screens[id] = document.getElementById(id);
        }
        
        // Sub-components
        this.progressBar = new ProgressBar();
        this.titleScreen = new TitleScreen(this);
        this.levelSelect = new LevelSelect(this);
        this.pauseMenu = new PauseMenu(this);
        this.practiceMode = new PracticeMode();
        
        this._setupSettings();
        this._setupDeathScreen();
        this._setupCompleteScreen();
        this._setupIconScreen();
    }
    
    _setupSettings() {
        const musicVol = document.getElementById('music-vol');
        const sfxVol = document.getElementById('sfx-vol');
        const showFps = document.getElementById('show-fps');
        
        if (musicVol) {
            musicVol.addEventListener('input', (e) => {
                if (this.game.audio) {
                    this.game.audio.setMusicVolume(e.target.value / 100);
                }
            });
        }
        
        if (sfxVol) {
            sfxVol.addEventListener('input', (e) => {
                if (this.game.audio) {
                    this.game.audio.setSFXVolume(e.target.value / 100);
                }
            });
        }
        
        if (showFps) {
            showFps.addEventListener('change', (e) => {
                const fpsEl = document.getElementById('fps-counter');
                if (fpsEl) {
                    fpsEl.style.display = e.target.checked ? 'block' : 'none';
                    this.game.showFPS = e.target.checked;
                }
            });
        }
        
        document.getElementById('btn-back-settings').addEventListener('click', () => {
            this.showScreen('title-screen');
        });
    }
    
    _setupDeathScreen() {
        document.getElementById('btn-retry').addEventListener('click', () => {
            this.game.restart();
        });
    }
    
    _setupCompleteScreen() {
        document.getElementById('btn-next').addEventListener('click', () => {
            this.showScreen('level-select');
            this.populateLevels();
            this.game.state = 'menu';
        });
    }
    
    _setupIconScreen() {
        document.getElementById('btn-back-icons').addEventListener('click', () => {
            this.showScreen('title-screen');
        });
    }
    
    showScreen(screenId) {
        // Hide all screens
        for (const id in this.screens) {
            const el = this.screens[id];
            if (el) {
                el.classList.remove('active');
            }
        }
        
        // Show requested screen
        const target = this.screens[screenId];
        if (target) {
            target.classList.add('active');
        }
        
        this.currentScreen = screenId;
    }
    
    showHUD() {
        this.showScreen('_none_');
        const hud = this.screens['hud'];
        if (hud) hud.classList.add('active');
    }
    
    hideAll() {
        for (const id in this.screens) {
            const el = this.screens[id];
            if (el) el.classList.remove('active');
        }
    }
    
    populateLevels() {
        if (!this.game.levelLoader) return;
        const levels = this.game.levelLoader.getLevelList();
        this.levelSelect.populate(levels, this.game.progressionManager);
    }
    
    populateIcons() {
        const grid = document.getElementById('icon-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        const icons = ['🟩', '🟦', '🟥', '🟧', '🟨', '🟪', '⬜', '⬛',
                        '🔷', '🔶', '💚', '💙', '❤️', '🧡', '💛', '💜'];
        
        for (let i = 0; i < icons.length; i++) {
            const item = document.createElement('div');
            item.className = 'icon-item';
            if (this.game.progressionManager && !this.game.progressionManager.isIconUnlocked(i)) {
                item.classList.add('locked');
            }
            if (this.game.player && this.game.player.iconId === i) {
                item.classList.add('selected');
            }
            item.textContent = icons[i];
            item.addEventListener('click', () => {
                if (this.game.progressionManager && !this.game.progressionManager.isIconUnlocked(i)) return;
                this.selectIcon(i);
            });
            grid.appendChild(item);
        }
    }
    
    selectIcon(iconId) {
        if (this.game.player) {
            this.game.player.iconId = iconId;
        }
        this.populateIcons();
        if (this.game.progressionManager) {
            this.game.progressionManager.save();
        }
    }
    
    showDeath(attempt) {
        this.showScreen('death-screen');
        const attemptEl = document.getElementById('attempt-count');
        if (attemptEl) attemptEl.textContent = 'Attempt ' + attempt;
    }
    
    showComplete(stats) {
        this.showScreen('complete-screen');
        const statsEl = document.getElementById('complete-stats');
        if (statsEl) {
            statsEl.innerHTML = `
                Attempts: ${stats.attempts}<br>
                Coins: ${stats.coins || 0}/3<br>
                Stars: ⭐ ${stats.stars || 0}
            `;
        }
    }
    
    updateProgress(progress) {
        this.progressBar.update(progress);
    }
    
    updateAttempts(attempts) {
        const el = document.getElementById('hud-attempts');
        if (el) el.textContent = 'Attempt ' + attempts;
    }
    
    updateStats(stars, coins, mana) {
        this.titleScreen.updateStats(stars, coins, mana);
    }
    
    // Callbacks from sub-components
    onLevelSelect(index) {
        this.game.loadLevel(index);
    }
    
    onResume() {
        this.game.resume();
    }
    
    onPracticeToggle() {
        const active = this.practiceMode.toggle();
        this.game.practiceMode = active;
        this.game.resume();
    }
    
    onRestart() {
        this.game.restart();
    }
    
    onQuit() {
        this.game.quit();
    }
}
