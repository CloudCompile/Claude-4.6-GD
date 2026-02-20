class Trigger extends GameObject {
    constructor(config = {}) {
        super(config);
        this.triggerType = config.triggerType || GD.TRIGGER_TYPES.MOVE;
        this.type = 'trigger';
        this.solid = false;
        this.hazard = false;
        this.visible = false;
        this.showInEditor = config.showInEditor || false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.activated = false;
        this.touchActivated = config.touchActivated !== undefined ? config.touchActivated : true;
        this.spawnActivated = config.spawnActivated || false;
        
        // Target
        this.targetGroupId = config.targetGroupId || null;
        this.targetGroups = config.targetGroups || [];
        
        // Timing
        this.duration = config.duration || 0;
        this.delay = config.delay || 0;
        this.easingType = config.easingType || 'linear';
        
        // Move trigger params
        this.moveX = config.moveX || 0;
        this.moveY = config.moveY || 0;
        
        // Rotate trigger params
        this.rotateDegrees = config.rotateDegrees || 0;
        this.rotateCenter = config.rotateCenter || null;
        
        // Alpha trigger params
        this.targetAlpha = config.targetAlpha !== undefined ? config.targetAlpha : 1;
        
        // Color trigger params
        this.targetColor = config.targetColor || '#ffffff';
        this.colorChannelId = config.colorChannelId || null;
        
        // Pulse trigger params
        this.pulseColor = config.pulseColor || '#ffffff';
        this.pulseHold = config.pulseHold || 0;
        this.pulseFadeIn = config.pulseFadeIn || 0;
        this.pulseFadeOut = config.pulseFadeOut || 0;
        this.pulseMode = config.pulseMode || 'color'; // 'color' or 'hsv'
        
        // Toggle trigger params
        this.toggleOn = config.toggleOn !== undefined ? config.toggleOn : true;
        
        // Spawn trigger params
        this.spawnGroupId = config.spawnGroupId || null;
        this.spawnDelay = config.spawnDelay || 0;
        
        // Camera trigger params
        this.cameraZoom = config.cameraZoom || 1;
        this.cameraOffsetX = config.cameraOffsetX || 0;
        this.cameraOffsetY = config.cameraOffsetY || 0;
        this.cameraFollowY = config.cameraFollowY || false;
        
        // Song trigger params
        this.songOffset = config.songOffset || 0;
        this.songId = config.songId || null;
        
        // Random trigger params
        this.randomGroups = config.randomGroups || [];
        this.randomChances = config.randomChances || [];
    }
    
    checkActivation(playerX) {
        if (this.activated) return false;
        if (!this.touchActivated) return false;
        return playerX >= this.x;
    }
    
    activate() {
        this.activated = true;
        return {
            triggerType: this.triggerType,
            targetGroupId: this.targetGroupId,
            targetGroups: this.targetGroups,
            duration: this.duration,
            delay: this.delay,
            easingType: this.easingType,
            trigger: this
        };
    }
    
    resetState() {
        this.activated = false;
    }
}
