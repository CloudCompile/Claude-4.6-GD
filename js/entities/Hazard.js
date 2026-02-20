class Hazard extends GameObject {
    constructor(config = {}) {
        super(config);
        this.hazard = true;
        this.type = config.type || 'spike';
        this.color = config.color || GD.COLORS.HAZARD;
        this.solid = false; // Hazards kill, not collide solidly
        this.direction = config.direction || 'up';
        this.sawBlade = config.sawBlade || false;
        this.rotationSpeed = config.rotationSpeed || 0;
    }
    
    update(dt) {
        super.update(dt);
        if (this.sawBlade && this.rotationSpeed) {
            this.rotation += this.rotationSpeed * dt;
        }
    }
    
    getHitbox() {
        const rect = this.getRect();
        // Spikes have forgiving hitboxes (inner 70%)
        const shrink = this.width * 0.15;
        return {
            x: rect.x + shrink,
            y: rect.y + shrink,
            width: rect.width - shrink * 2,
            height: rect.height - shrink * 2
        };
    }
}
