class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = GD.PLAYER_SIZE;
        this.height = GD.PLAYER_SIZE;
        this.velocityX = GD.SPEEDS.NORMAL;
        this.velocityY = 0;
        this.gravityDirection = 1; // 1 = down, -1 = up
        this.onGround = false;
        this.isDead = false;
        this.rotation = 0;
        this.rotationSpeed = 0;
        
        this.mode = GD.MODES.CUBE;
        this.mini = false;
        this.dual = false;
        this.speedIndex = 1; // Index into SPEED_VALUES
        
        this.primaryColor = GD.COLORS.PLAYER_PRIMARY;
        this.secondaryColor = GD.COLORS.PLAYER_SECONDARY;
        this.iconId = 0;
        
        // Trail
        this.trail = [];
        this.trailMaxLength = 20;
        this.trailTimer = 0;
        
        // Orb interaction
        this.canActivateOrb = false;
        this.currentOrb = null;
        this.orbActivated = false;
        
        // Robot hold tracking
        this.robotHoldTime = 0;
        this.robotJumping = false;
        
        // Dash orb state
        this.dashing = false;
        this.dashDirection = { x: 0, y: 0 };
        this.dashTimer = 0;
        
        // Death effect
        this.deathEffectTimer = 0;
        this.deathX = 0;
        this.deathY = 0;
        
        // Practice mode
        this.checkpointX = 0;
        this.checkpointY = 0;
        this.checkpointVelY = 0;
        this.checkpointGravDir = 1;
        this.checkpointMode = GD.MODES.CUBE;
        this.checkpointMini = false;
        this.checkpointSpeedIndex = 1;
    }
    
    reset(startX, startY) {
        this.x = startX || 0;
        this.y = startY || GD.GROUND_Y - GD.PLAYER_SIZE;
        this.velocityY = 0;
        this.gravityDirection = 1;
        this.onGround = false;
        this.isDead = false;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.mode = GD.MODES.CUBE;
        this.mini = false;
        this.dual = false;
        this.speedIndex = 1;
        this.velocityX = GD.SPEED_VALUES[this.speedIndex];
        this.width = GD.PLAYER_SIZE;
        this.height = GD.PLAYER_SIZE;
        this.trail = [];
        this.canActivateOrb = false;
        this.currentOrb = null;
        this.orbActivated = false;
        this.robotHoldTime = 0;
        this.robotJumping = false;
        this.dashing = false;
        this.deathEffectTimer = 0;
    }
    
    setSpeed(speedIndex) {
        this.speedIndex = MathUtils.clamp(speedIndex, 0, GD.SPEED_VALUES.length - 1);
        this.velocityX = GD.SPEED_VALUES[this.speedIndex];
    }
    
    setMini(isMini) {
        this.mini = isMini;
        if (isMini) {
            this.width = GD.PLAYER_MINI_SIZE;
            this.height = GD.PLAYER_MINI_SIZE;
        } else {
            this.width = GD.PLAYER_SIZE;
            this.height = GD.PLAYER_SIZE;
        }
    }
    
    setMode(mode) {
        this.mode = mode;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.robotHoldTime = 0;
        this.robotJumping = false;
    }
    
    getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    getHitbox() {
        // Slightly forgiving hitbox for player
        const shrink = this.width * 0.1;
        return {
            x: this.x + shrink,
            y: this.y + shrink,
            width: this.width - shrink * 2,
            height: this.height - shrink * 2
        };
    }
    
    getCenterX() { return this.x + this.width / 2; }
    getCenterY() { return this.y + this.height / 2; }
    
    updateTrail(dt) {
        this.trailTimer += dt;
        if (this.trailTimer >= 0.02) {
            this.trailTimer = 0;
            this.trail.push({
                x: this.getCenterX(),
                y: this.getCenterY()
            });
            if (this.trail.length > this.trailMaxLength) {
                this.trail.shift();
            }
        }
    }
    
    updateRotation(dt) {
        switch (this.mode) {
            case GD.MODES.CUBE:
                if (!this.onGround) {
                    // Rotate while in air
                    const targetRotSpeed = this.gravityDirection * Math.PI * 2 * (this.velocityX / GD.SPEEDS.NORMAL);
                    this.rotation += targetRotSpeed * dt;
                } else {
                    // Snap to nearest 90°
                    const target = Math.round(this.rotation / (Math.PI / 2)) * (Math.PI / 2);
                    this.rotation = MathUtils.lerp(this.rotation, target, 0.3);
                }
                break;
            case GD.MODES.SHIP:
            case GD.MODES.UFO:
            case GD.MODES.SWING:
                // Tilt based on vertical velocity
                const maxTilt = MathUtils.degToRad(30);
                const tilt = MathUtils.clamp(this.velocityY / 500, -1, 1) * maxTilt;
                this.rotation = MathUtils.lerp(this.rotation, tilt, 0.1);
                break;
            case GD.MODES.BALL:
                this.rotation += this.gravityDirection * Math.PI * 3 * dt;
                break;
            case GD.MODES.WAVE:
                // Diamond doesn't rotate
                this.rotation = 0;
                break;
            case GD.MODES.ROBOT:
                if (!this.onGround) {
                    this.rotation = MathUtils.lerp(this.rotation, 0, 0.1);
                } else {
                    this.rotation = 0;
                }
                break;
            case GD.MODES.SPIDER:
                this.rotation = 0;
                break;
        }
    }
    
    die() {
        this.isDead = true;
        this.deathX = this.getCenterX();
        this.deathY = this.getCenterY();
        this.deathEffectTimer = 0;
    }
    
    saveCheckpoint() {
        this.checkpointX = this.x;
        this.checkpointY = this.y;
        this.checkpointVelY = 0;
        this.checkpointGravDir = this.gravityDirection;
        this.checkpointMode = this.mode;
        this.checkpointMini = this.mini;
        this.checkpointSpeedIndex = this.speedIndex;
    }
    
    loadCheckpoint() {
        this.x = this.checkpointX;
        this.y = this.checkpointY;
        this.velocityY = this.checkpointVelY;
        this.gravityDirection = this.checkpointGravDir;
        this.mode = this.checkpointMode;
        this.setMini(this.checkpointMini);
        this.setSpeed(this.checkpointSpeedIndex);
        this.isDead = false;
        this.rotation = 0;
        this.onGround = false;
        this.trail = [];
        this.dashing = false;
    }
}
