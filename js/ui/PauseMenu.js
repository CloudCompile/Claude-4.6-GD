class PauseMenu {
    constructor(uiManager) {
        this.ui = uiManager;
        this.element = document.getElementById('pause-menu');
        
        document.getElementById('btn-resume').addEventListener('click', () => {
            this.ui.onResume();
        });
        
        document.getElementById('btn-practice').addEventListener('click', () => {
            this.ui.onPracticeToggle();
        });
        
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.ui.onRestart();
        });
        
        document.getElementById('btn-quit').addEventListener('click', () => {
            this.ui.onQuit();
        });
    }
}
