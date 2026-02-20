class DualPlayer {
    constructor(primaryPlayer) {
        this.primary = primaryPlayer;
        this.secondary = new Player();
        this.active = false;
        this.syncOffset = GD.BLOCK_SIZE * 4; // Vertical offset between dual players
    }
    
    activate() {
        this.active = true;
        this.secondary.x = this.primary.x;
        this.secondary.y = this.primary.y - this.syncOffset;
        this.secondary.velocityX = this.primary.velocityX;
        this.secondary.velocityY = this.primary.velocityY;
        this.secondary.mode = this.primary.mode;
        this.secondary.mini = this.primary.mini;
        this.secondary.speedIndex = this.primary.speedIndex;
        this.secondary.gravityDirection = -this.primary.gravityDirection; // Opposite gravity
        this.secondary.primaryColor = this.primary.secondaryColor;
        this.secondary.secondaryColor = this.primary.primaryColor;
    }
    
    deactivate() {
        this.active = false;
    }
    
    update(dt) {
        if (!this.active) return;
        
        // Secondary mirrors primary X position
        this.secondary.x = this.primary.x;
        this.secondary.velocityX = this.primary.velocityX;
    }
    
    isActive() {
        return this.active;
    }
}
