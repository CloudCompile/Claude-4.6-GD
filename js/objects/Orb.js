class Orb extends GameObject {
    constructor(config = {}) {
        super(config);
        this.orbType = config.orbType || 'YELLOW';
        this.type = 'orb';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.activated = false;
        this.activationCooldown = 0;
        this.triggerGroupId = config.triggerGroupId || null; // For trigger orbs
        this.dashAngle = config.dashAngle || -90; // Degrees, for dash orb
        this.dashDuration = config.dashDuration || 0.5;
        this.multiActivate = config.multiActivate || false;
        
        // Set color based on type
        this.color = this._getColor();
        
        // Get behavior from constants
        this.behavior = GD.ORBS[this.orbType] || GD.ORBS.YELLOW;
    }
    
    _getColor() {
        const colors = {
            YELLOW: GD.COLORS.ORB_YELLOW,
            PINK: GD.COLORS.ORB_PINK,
            RED: GD.COLORS.ORB_RED,
            BLUE: GD.COLORS.ORB_BLUE,
            GREEN: GD.COLORS.ORB_GREEN,
            BLACK: GD.COLORS.ORB_BLACK,
            SPIDER: GD.COLORS.ORB_SPIDER,
            DASH: GD.COLORS.ORB_DASH,
            TRIGGER: '#ff8800'
        };
        return colors[this.orbType] || GD.COLORS.ORB_YELLOW;
    }
    
    canActivate(player) {
        if (this.activationCooldown > 0) return false;
        if (this.activated && !this.multiActivate) return false;
        
        // Check overlap
        const playerRect = player.getHitbox();
        const orbRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, orbRect);
    }
    
    activate(player, physics) {
        this.activated = true;
        this.activationCooldown = 0.1;
        
        const result = {
            type: this.orbType,
            sound: 'orb',
            triggerGroupId: null
        };
        
        if (this.behavior.trigger) {
            result.triggerGroupId = this.triggerGroupId;
            return result;
        }
        
        if (this.behavior.spider) {
            // Spider orb: instant teleport flip
            player.gravityDirection *= -1;
            player.velocityY = 0;
            result.sound = 'gravityFlip';
            return result;
        }
        
        if (this.behavior.dash) {
            // Dash orb: launch in fixed direction
            const angleRad = MathUtils.degToRad(this.dashAngle);
            const speed = Math.abs(this.behavior.impulse);
            player.dashing = true;
            player.dashDirection = {
                x: Math.cos(angleRad) * speed,
                y: Math.sin(angleRad) * speed
            };
            player.dashTimer = this.dashDuration;
            player.velocityY = player.dashDirection.y;
            return result;
        }
        
        // Standard orb behavior
        if (this.behavior.gravityFlip) {
            player.gravityDirection *= -1;
            result.sound = 'gravityFlip';
        }
        
        // Apply impulse
        if (this.behavior.impulse !== 0) {
            player.velocityY = this.behavior.impulse * player.gravityDirection;
            player.onGround = false;
        }
        
        return result;
    }
    
    update(dt) {
        super.update(dt);
        if (this.activationCooldown > 0) {
            this.activationCooldown -= dt;
        }
    }
    
    resetState() {
        this.activated = false;
        this.activationCooldown = 0;
    }
}
