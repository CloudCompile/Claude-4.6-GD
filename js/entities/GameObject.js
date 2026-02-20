class GameObject {
    constructor(config = {}) {
        this.id = config.id || Math.random().toString(36).substr(2, 9);
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.type = config.type || 'block'; // block, spike, decoration, slope
        this.color = config.color || '#4444aa';
        this.rotation = config.rotation || 0;
        this.alpha = config.alpha !== undefined ? config.alpha : 1;
        this.active = config.active !== undefined ? config.active : true;
        this.visible = config.visible !== undefined ? config.visible : true;
        this.solid = config.solid !== undefined ? config.solid : true;
        this.hazard = config.hazard || false;
        this.direction = config.direction || 'up'; // for spikes
        this.groupId = config.groupId || null;
        this.groups = config.groups || [];
        this.colorChannel = config.colorChannel || null;
        this.zOrder = config.zOrder || 0;
        this.beatSnap = config.beatSnap || false;
        this.beatOffset = config.beatOffset || 0;
        
        // For movement/animation
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseRotation = this.rotation;
        this.baseAlpha = this.alpha;
        
        // Trigger offsets
        this.triggerOffsetX = 0;
        this.triggerOffsetY = 0;
        this.triggerRotation = 0;
        this.triggerAlpha = 0;
    }
    
    getRect() {
        return {
            x: this.x + this.triggerOffsetX,
            y: this.y + this.triggerOffsetY,
            width: this.width,
            height: this.height
        };
    }
    
    getHitbox() {
        if (this.type === 'spike') {
            // Slightly forgiving spike hitbox
            const shrink = this.width * 0.15;
            return MathUtils.shrinkRect(this.getRect(), shrink);
        }
        return this.getRect();
    }
    
    getTriangleHitbox() {
        if (this.type !== 'spike') return null;
        const r = this.getRect();
        return new CollisionSystem().getTriangleHitbox(r.x, r.y, r.width, this.direction);
    }
    
    update(dt) {
        // Apply trigger offsets to actual position
        this.x = this.baseX + this.triggerOffsetX;
        this.y = this.baseY + this.triggerOffsetY;
        this.rotation = this.baseRotation + this.triggerRotation;
        this.alpha = MathUtils.clamp(this.baseAlpha + this.triggerAlpha, 0, 1);
    }
    
    resetTriggerState() {
        this.triggerOffsetX = 0;
        this.triggerOffsetY = 0;
        this.triggerRotation = 0;
        this.triggerAlpha = 0;
        this.x = this.baseX;
        this.y = this.baseY;
        this.rotation = this.baseRotation;
        this.alpha = this.baseAlpha;
    }
    
    isInGroup(groupId) {
        return this.groupId === groupId || this.groups.includes(groupId);
    }
}
