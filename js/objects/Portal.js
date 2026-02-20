class Portal extends GameObject {
    constructor(config = {}) {
        super(config);
        this.portalType = config.portalType || GD.PORTAL_TYPES.CUBE;
        this.type = 'portal';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE * 0.8;
        this.height = config.height || GD.BLOCK_SIZE * 3;
        this.activated = false;
        this.linkedPortalId = config.linkedPortalId || null; // For teleport portals
        this.linkedPortal = null;
        
        this.color = this._getColor();
    }
    
    _getColor() {
        const typeToColor = {
            [GD.PORTAL_TYPES.CUBE]: GD.COLORS.PORTAL_CUBE,
            [GD.PORTAL_TYPES.SHIP]: GD.COLORS.PORTAL_SHIP,
            [GD.PORTAL_TYPES.BALL]: GD.COLORS.PORTAL_BALL,
            [GD.PORTAL_TYPES.UFO]: GD.COLORS.PORTAL_UFO,
            [GD.PORTAL_TYPES.WAVE]: GD.COLORS.PORTAL_WAVE,
            [GD.PORTAL_TYPES.ROBOT]: GD.COLORS.PORTAL_ROBOT,
            [GD.PORTAL_TYPES.SPIDER]: GD.COLORS.PORTAL_SPIDER,
            [GD.PORTAL_TYPES.SWING]: GD.COLORS.PORTAL_SWING,
            [GD.PORTAL_TYPES.GRAVITY_FLIP]: GD.COLORS.PORTAL_GRAVITY,
            [GD.PORTAL_TYPES.GRAVITY_NORMAL]: GD.COLORS.PORTAL_GRAVITY,
            [GD.PORTAL_TYPES.SPEED_HALF]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_NORMAL]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_DOUBLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_TRIPLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_QUADRUPLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SIZE_MINI]: GD.COLORS.PORTAL_SIZE,
            [GD.PORTAL_TYPES.SIZE_NORMAL]: GD.COLORS.PORTAL_SIZE,
            [GD.PORTAL_TYPES.MIRROR]: GD.COLORS.PORTAL_MIRROR,
            [GD.PORTAL_TYPES.DUAL]: GD.COLORS.PORTAL_DUAL,
            [GD.PORTAL_TYPES.DUAL_OFF]: GD.COLORS.PORTAL_DUAL,
            [GD.PORTAL_TYPES.TELEPORT]: GD.COLORS.PORTAL_TELEPORT
        };
        return typeToColor[this.portalType] || '#ffffff';
    }
    
    checkActivation(player) {
        if (this.activated) return false;
        const playerRect = player.getHitbox();
        const portalRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, portalRect);
    }
    
    activate(player, game) {
        this.activated = true;
        
        const result = {
            type: this.portalType,
            sound: 'portal'
        };
        
        // Mode portals
        const modeMap = {
            [GD.PORTAL_TYPES.CUBE]: GD.MODES.CUBE,
            [GD.PORTAL_TYPES.SHIP]: GD.MODES.SHIP,
            [GD.PORTAL_TYPES.BALL]: GD.MODES.BALL,
            [GD.PORTAL_TYPES.UFO]: GD.MODES.UFO,
            [GD.PORTAL_TYPES.WAVE]: GD.MODES.WAVE,
            [GD.PORTAL_TYPES.ROBOT]: GD.MODES.ROBOT,
            [GD.PORTAL_TYPES.SPIDER]: GD.MODES.SPIDER,
            [GD.PORTAL_TYPES.SWING]: GD.MODES.SWING
        };
        
        if (modeMap[this.portalType]) {
            result.newMode = modeMap[this.portalType];
            return result;
        }
        
        // Gravity portals
        if (this.portalType === GD.PORTAL_TYPES.GRAVITY_FLIP) {
            result.gravityFlip = true;
            result.newGravity = -1;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.GRAVITY_NORMAL) {
            result.gravityNormal = true;
            result.newGravity = 1;
            return result;
        }
        
        // Speed portals
        const speedMap = {
            [GD.PORTAL_TYPES.SPEED_HALF]: 0,
            [GD.PORTAL_TYPES.SPEED_NORMAL]: 1,
            [GD.PORTAL_TYPES.SPEED_DOUBLE]: 2,
            [GD.PORTAL_TYPES.SPEED_TRIPLE]: 3,
            [GD.PORTAL_TYPES.SPEED_QUADRUPLE]: 4
        };
        
        if (speedMap[this.portalType] !== undefined) {
            result.newSpeed = speedMap[this.portalType];
            return result;
        }
        
        // Size portals
        if (this.portalType === GD.PORTAL_TYPES.SIZE_MINI) {
            result.mini = true;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.SIZE_NORMAL) {
            result.mini = false;
            return result;
        }
        
        // Mirror portal
        if (this.portalType === GD.PORTAL_TYPES.MIRROR) {
            result.mirror = true;
            return result;
        }
        
        // Dual portal
        if (this.portalType === GD.PORTAL_TYPES.DUAL) {
            result.dual = true;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.DUAL_OFF) {
            result.dual = false;
            return result;
        }
        
        // Teleport portal
        if (this.portalType === GD.PORTAL_TYPES.TELEPORT) {
            if (this.linkedPortal) {
                result.teleportTo = {
                    x: this.linkedPortal.x,
                    y: this.linkedPortal.y + (this.linkedPortal.height - player.height) / 2
                };
            }
            return result;
        }
        
        return result;
    }
    
    resetState() {
        this.activated = false;
    }
}
