class PracticeMode {
    constructor() {
        this.active = false;
        this.checkpoints = [];
        this.indicator = null;
        
        this._createIndicator();
    }
    
    _createIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.className = 'practice-indicator';
        this.indicator.textContent = '🔰 PRACTICE MODE';
        this.indicator.style.display = 'none';
        document.body.appendChild(this.indicator);
    }
    
    enable() {
        this.active = true;
        if (this.indicator) this.indicator.style.display = 'block';
    }
    
    disable() {
        this.active = false;
        this.checkpoints = [];
        if (this.indicator) this.indicator.style.display = 'none';
    }
    
    toggle() {
        if (this.active) {
            this.disable();
        } else {
            this.enable();
        }
        return this.active;
    }
    
    addCheckpoint(player) {
        if (!this.active) return;
        this.checkpoints.push({
            x: player.x,
            y: player.y,
            velocityY: player.velocityY,
            gravityDirection: player.gravityDirection,
            mode: player.mode,
            mini: player.mini,
            speedIndex: player.speedIndex
        });
    }
    
    removeLastCheckpoint() {
        if (this.checkpoints.length > 0) {
            this.checkpoints.pop();
        }
    }
    
    getLastCheckpoint() {
        if (this.checkpoints.length === 0) return null;
        return this.checkpoints[this.checkpoints.length - 1];
    }
    
    reset() {
        this.checkpoints = [];
    }
}
