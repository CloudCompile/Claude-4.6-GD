class ProgressBar {
    constructor() {
        this.container = document.getElementById('progress-bar-container');
        this.fill = document.getElementById('progress-bar-fill');
        this.text = document.getElementById('progress-text');
    }
    
    update(progress) {
        const pct = Math.floor(progress * 100);
        if (this.fill) this.fill.style.width = pct + '%';
        if (this.text) this.text.textContent = pct + '%';
    }
    
    reset() {
        this.update(0);
    }
}
