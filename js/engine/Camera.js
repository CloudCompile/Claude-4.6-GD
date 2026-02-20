class Camera {
    constructor(canvasWidth, canvasHeight) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.zoom = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.shakeAmount = 0;
        this.shakeDecay = 5;
        this.followPlayer = true;
        this.followY = false;
        this.smoothY = 0.05;
        this.mirrored = false;
    }
    
    update(playerX, playerY, dt) {
        // Horizontal follow
        if (this.followPlayer) {
            this.x = playerX - this.width * GD.CAMERA_OFFSET_X / this.zoom;
        }
        
        // Vertical follow (smooth)
        if (this.followY) {
            const targetY = playerY - this.height / 2 / this.zoom;
            this.y = MathUtils.lerp(this.y, targetY, this.smoothY);
        }
        
        // Smooth zoom
        if (Math.abs(this.zoom - this.targetZoom) > 0.001) {
            this.zoom = MathUtils.lerp(this.zoom, this.targetZoom, 0.05);
        }
        
        // Smooth offset
        this.offsetX = MathUtils.lerp(this.offsetX, this.targetOffsetX, 0.05);
        this.offsetY = MathUtils.lerp(this.offsetY, this.targetOffsetY, 0.05);
        
        // Screen shake
        if (this.shakeAmount > 0) {
            this.shakeAmount -= this.shakeDecay * dt;
            if (this.shakeAmount < 0) this.shakeAmount = 0;
        }
    }
    
    getShakeOffset() {
        if (this.shakeAmount <= 0) return { x: 0, y: 0 };
        return {
            x: (Math.random() - 0.5) * this.shakeAmount * 2,
            y: (Math.random() - 0.5) * this.shakeAmount * 2
        };
    }
    
    shake(amount) {
        this.shakeAmount = amount;
    }
    
    setZoom(zoom, instant = false) {
        this.targetZoom = zoom;
        if (instant) this.zoom = zoom;
    }
    
    setOffset(x, y, instant = false) {
        this.targetOffsetX = x;
        this.targetOffsetY = y;
        if (instant) {
            this.offsetX = x;
            this.offsetY = y;
        }
    }
    
    worldToScreen(worldX, worldY) {
        const shake = this.getShakeOffset();
        return {
            x: (worldX - this.x) * this.zoom + this.offsetX + shake.x,
            y: (worldY - this.y) * this.zoom + this.offsetY + shake.y
        };
    }
    
    screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.offsetX) / this.zoom + this.x,
            y: (screenY - this.offsetY) / this.zoom + this.y
        };
    }
    
    isVisible(x, y, width, height) {
        const margin = GD.BLOCK_SIZE * 2;
        return (
            x + width > this.x - margin &&
            x < this.x + this.width / this.zoom + margin &&
            y + height > this.y - margin &&
            y < this.y + this.height / this.zoom + margin
        );
    }
    
    resize(width, height) {
        this.width = width;
        this.height = height;
    }
    
    reset() {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.shakeAmount = 0;
        this.followY = false;
        this.mirrored = false;
    }
}
