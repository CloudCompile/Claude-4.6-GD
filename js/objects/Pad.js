class Pad extends GameObject {
    constructor(config = {}) {
        super(config);
        this.padType = config.padType || 'YELLOW';
        this.type = 'pad';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE * 0.4;
        this.activated = false;
        this.activationCooldown = 0;
        this.dashAngle = config.dashAngle || -90;
        this.dashDuration = config.dashDuration || 0.5;
        
        this.color = this._getColor();
        this.behavior = GD.PADS[this.padType] || GD.PADS.YELLOW;
    }
    
    _getColor() {
        const colors = {
            YELLOW: GD.COLORS.PAD_YELLOW,
            PINK: GD.COLORS.PAD_PINK,
            RED: GD.COLORS.PAD_RED,
            BLUE: GD.COLORS.PAD_BLUE,
            SPIDER: GD.COLORS.ORB_SPIDER,
            DASH: GD.COLORS.ORB_DASH
        };
        return colors[this.padType] || GD.COLORS.PAD_YELLOW;
    }
    
    checkAutoActivate(player) {
        if (this.activationCooldown > 0) return false;
        if (this.activated) return false;
        
        const playerRect = player.getHitbox();
        const padRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, padRect);
    }
    
    activate(player, physics) {
        this.activated = true;
        this.activationCooldown = 0.15;
        
        const result = {
            type: this.padType,
            sound: 'pad'
        };
        
        if (this.behavior.spider) {
            player.gravityDirection *= -1;
            player.velocityY = 0;
            result.sound = 'gravityFlip';
            return result;
        }
        
        if (this.behavior.dash) {
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
        
        if (this.behavior.gravityFlip) {
            player.gravityDirection *= -1;
            result.sound = 'gravityFlip';
        }
        
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
