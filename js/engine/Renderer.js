class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        
        this._particlePool = [];
        this.particles = [];
        this.bgColor = GD.COLORS.BG_DEFAULT;
        this.groundColor = GD.COLORS.GROUND_DEFAULT;
        this.colorChannels = {};
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        GD.GROUND_Y = this.canvas.height * 0.75;
        GD.CEILING_Y = this.canvas.height * 0.1;
    }
    
    clear() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    beginFrame(camera) {
        this.clear();
        this.ctx.save();
        
        const shake = camera.getShakeOffset();
        
        if (camera.mirrored) {
            this.ctx.translate(this.canvas.width, 0);
            this.ctx.scale(-1, 1);
        }
        
        this.ctx.translate(shake.x, shake.y);
        this.ctx.scale(camera.zoom, camera.zoom);
        this.ctx.translate(-camera.x + camera.offsetX / camera.zoom, -camera.y + camera.offsetY / camera.zoom);
    }
    
    endFrame() {
        this.ctx.restore();
    }
    
    // Draw ground
    drawGround(camera, groundY, color) {
        const c = color || this.groundColor;
        this.ctx.fillStyle = c;
        this.ctx.fillRect(
            camera.x - 10,
            groundY,
            this.canvas.width / camera.zoom + 20,
            this.canvas.height
        );
        
        // Ground line
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.3);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(camera.x - 10, groundY);
        this.ctx.lineTo(camera.x + this.canvas.width / camera.zoom + 10, groundY);
        this.ctx.stroke();
        
        // Grid lines on ground
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.1);
        this.ctx.lineWidth = 0.5;
        const gridStart = Math.floor(camera.x / GD.BLOCK_SIZE) * GD.BLOCK_SIZE;
        for (let x = gridStart; x < camera.x + this.canvas.width / camera.zoom + GD.BLOCK_SIZE; x += GD.BLOCK_SIZE) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, groundY);
            this.ctx.lineTo(x, groundY + 200);
            this.ctx.stroke();
        }
    }
    
    // Draw ceiling
    drawCeiling(camera, ceilingY, color) {
        const c = color || this.groundColor;
        this.ctx.fillStyle = c;
        this.ctx.fillRect(
            camera.x - 10,
            ceilingY - this.canvas.height,
            this.canvas.width / camera.zoom + 20,
            this.canvas.height
        );
        
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.3);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(camera.x - 10, ceilingY);
        this.ctx.lineTo(camera.x + this.canvas.width / camera.zoom + 10, ceilingY);
        this.ctx.stroke();
    }
    
    // Draw background decorations
    drawBackground(camera, time) {
        // Floating squares in background
        this.ctx.globalAlpha = 0.05;
        const bgGridSize = GD.BLOCK_SIZE * 3;
        const startX = Math.floor(camera.x / bgGridSize) * bgGridSize;
        const startY = Math.floor(camera.y / bgGridSize) * bgGridSize;
        
        for (let x = startX; x < camera.x + this.canvas.width / camera.zoom; x += bgGridSize) {
            for (let y = startY; y < camera.y + this.canvas.height / camera.zoom; y += bgGridSize) {
                const offset = Math.sin(x * 0.01 + time) * 5;
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + offset, y + offset, bgGridSize * 0.3, bgGridSize * 0.3);
            }
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Draw player
    drawPlayer(player, mode, time) {
        const { x, y, width, height, gravityDirection, rotation } = player;
        const cx = x + width / 2;
        const cy = y + height / 2;
        
        this.ctx.save();
        this.ctx.translate(cx, cy);
        
        if (gravityDirection < 0) {
            this.ctx.scale(1, -1);
        }
        
        this.ctx.rotate(rotation || 0);
        
        const halfW = width / 2;
        const halfH = height / 2;
        const primaryColor = player.primaryColor || GD.COLORS.PLAYER_PRIMARY;
        const secondaryColor = player.secondaryColor || GD.COLORS.PLAYER_SECONDARY;
        
        switch (mode) {
            case GD.MODES.CUBE:
                this._drawCube(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SHIP:
                this._drawShip(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.BALL:
                this._drawBall(0, 0, width / 2, primaryColor, secondaryColor, time);
                break;
            case GD.MODES.UFO:
                this._drawUFO(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.WAVE:
                this._drawWave(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.ROBOT:
                this._drawRobot(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SPIDER:
                this._drawSpider(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SWING:
                this._drawSwing(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
        }
        
        this.ctx.restore();
        
        // Trail effect
        if (player.trail && player.trail.length > 0) {
            this._drawTrail(player.trail, primaryColor);
        }
    }
    
    _drawCube(x, y, w, h, primary, secondary) {
        // Main body
        this.ctx.fillStyle = primary;
        this.ctx.fillRect(x, y, w, h);
        
        // Inner detail
        this.ctx.fillStyle = secondary;
        const inset = w * 0.2;
        this.ctx.fillRect(x + inset, y + inset, w - inset * 2, h - inset * 2);
        
        // Eye
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x + w * 0.55, y + h * 0.25, w * 0.25, h * 0.25);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x + w * 0.62, y + h * 0.3, w * 0.12, h * 0.15);
        
        // Border
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, w, h);
    }
    
    _drawShip(x, y, w, h, primary, secondary) {
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w, y + h / 2);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + w * 0.2, y + h / 2);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w * 0.8, y + h / 2);
        this.ctx.lineTo(x + w * 0.2, y + h * 0.2);
        this.ctx.lineTo(x + w * 0.3, y + h / 2);
        this.ctx.lineTo(x + w * 0.2, y + h * 0.8);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cockpit
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.6, y + h / 2, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w, y + h / 2);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + w * 0.2, y + h / 2);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    _drawBall(cx, cy, r, primary, secondary, time) {
        // Outer circle
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner circle
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Cross pattern
        this.ctx.strokeStyle = primary;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx - r * 0.4, cy);
        this.ctx.lineTo(cx + r * 0.4, cy);
        this.ctx.moveTo(cx, cy - r * 0.4);
        this.ctx.lineTo(cx, cy + r * 0.4);
        this.ctx.stroke();
        
        // Border
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    _drawUFO(x, y, w, h, primary, secondary) {
        // Dome
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h * 0.45, w * 0.35, Math.PI, 0);
        this.ctx.fill();
        
        // Body
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.ellipse(x + w / 2, y + h * 0.5, w / 2, h * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bottom light
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w * 0.35, y + h * 0.6);
        this.ctx.lineTo(x + w * 0.65, y + h * 0.6);
        this.ctx.lineTo(x + w * 0.55, y + h);
        this.ctx.lineTo(x + w * 0.45, y + h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        
        // Eye
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.55, y + h * 0.35, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.57, y + h * 0.35, w * 0.05, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawWave(x, y, w, h, primary, secondary) {
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h);
        this.ctx.lineTo(x, y + h / 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = secondary;
        const inset = w * 0.2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y + inset);
        this.ctx.lineTo(x + w - inset, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h - inset);
        this.ctx.lineTo(x + inset, y + h / 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h);
        this.ctx.lineTo(x, y + h / 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    _drawRobot(x, y, w, h, primary, secondary) {
        // Legs
        this.ctx.fillStyle = secondary;
        this.ctx.fillRect(x + w * 0.15, y + h * 0.7, w * 0.25, h * 0.3);
        this.ctx.fillRect(x + w * 0.6, y + h * 0.7, w * 0.25, h * 0.3);
        
        // Body
        this.ctx.fillStyle = primary;
        this.ctx.fillRect(x + w * 0.1, y + h * 0.2, w * 0.8, h * 0.55);
        
        // Head
        this.ctx.fillStyle = secondary;
        this.ctx.fillRect(x + w * 0.2, y, w * 0.6, h * 0.3);
        
        // Eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x + w * 0.3, y + h * 0.08, w * 0.15, h * 0.12);
        this.ctx.fillRect(x + w * 0.55, y + h * 0.08, w * 0.15, h * 0.12);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x + w * 0.35, y + h * 0.1, w * 0.08, h * 0.08);
        this.ctx.fillRect(x + w * 0.6, y + h * 0.1, w * 0.08, h * 0.08);
        
        // Antenna
        this.ctx.strokeStyle = primary;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w / 2, y - h * 0.15);
        this.ctx.stroke();
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y - h * 0.15, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawSpider(x, y, w, h, primary, secondary) {
        // Body
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h / 2, w * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Legs
        this.ctx.strokeStyle = secondary;
        this.ctx.lineWidth = 2;
        const legAngles = [-0.8, -0.4, 0.4, 0.8];
        for (const angle of legAngles) {
            const lx = x + w / 2 + Math.cos(angle - 0.5) * w * 0.35;
            const ly = y + h / 2 + Math.sin(angle - 0.5) * h * 0.35;
            this.ctx.beginPath();
            this.ctx.moveTo(x + w / 2, y + h / 2);
            this.ctx.lineTo(lx + Math.cos(angle) * w * 0.3, ly - h * 0.1);
            this.ctx.lineTo(lx + Math.cos(angle) * w * 0.4, ly + h * 0.2);
            this.ctx.stroke();
            
            // Mirror
            const rlx = x + w / 2 + Math.cos(Math.PI - angle + 0.5) * w * 0.35;
            const rly = y + h / 2 + Math.sin(Math.PI - angle + 0.5) * h * 0.35;
            this.ctx.beginPath();
            this.ctx.moveTo(x + w / 2, y + h / 2);
            this.ctx.lineTo(rlx + Math.cos(Math.PI - angle) * w * 0.3, rly - h * 0.1);
            this.ctx.lineTo(rlx + Math.cos(Math.PI - angle) * w * 0.4, rly + h * 0.2);
            this.ctx.stroke();
        }
        
        // Eyes
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.4, y + h * 0.4, w * 0.08, 0, Math.PI * 2);
        this.ctx.arc(x + w * 0.6, y + h * 0.4, w * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawSwing(x, y, w, h, primary, secondary) {
        // Wing shape
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.quadraticCurveTo(x + w, y, x + w, y + h / 2);
        this.ctx.quadraticCurveTo(x + w, y + h, x + w / 2, y + h);
        this.ctx.quadraticCurveTo(x, y + h, x, y + h / 2);
        this.ctx.quadraticCurveTo(x, y, x + w / 2, y);
        this.ctx.fill();
        
        // Inner
        this.ctx.fillStyle = secondary;
        const inset = w * 0.15;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h / 2, w * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.55, y + h * 0.4, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.57, y + h * 0.4, w * 0.05, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawTrail(trail, color) {
        if (trail.length < 2) return;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
            this.ctx.lineTo(trail[i].x, trail[i].y);
        }
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }
    
    // Draw game objects
    drawBlock(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        const color = obj.color || '#4444aa';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        // Highlight
        this.ctx.fillStyle = ColorUtils.brighten(color, 0.2);
        this.ctx.fillRect(obj.x, obj.y, obj.width, 3);
        this.ctx.fillRect(obj.x, obj.y, 3, obj.height);
        
        // Shadow
        this.ctx.fillStyle = ColorUtils.darken(color, 0.3);
        this.ctx.fillRect(obj.x, obj.y + obj.height - 3, obj.width, 3);
        this.ctx.fillRect(obj.x + obj.width - 3, obj.y, 3, obj.height);
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawSpike(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const direction = obj.direction || 'up';
        const color = obj.color || '#ff4444';
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        
        switch (direction) {
            case 'up':
                this.ctx.moveTo(obj.x + obj.width / 2, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
                this.ctx.lineTo(obj.x, obj.y + obj.height);
                break;
            case 'down':
                this.ctx.moveTo(obj.x, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y);
                this.ctx.lineTo(obj.x + obj.width / 2, obj.y + obj.height);
                break;
            case 'left':
                this.ctx.moveTo(obj.x, obj.y + obj.height / 2);
                this.ctx.lineTo(obj.x + obj.width, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
                break;
            case 'right':
                this.ctx.moveTo(obj.x, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height / 2);
                this.ctx.lineTo(obj.x, obj.y + obj.height);
                break;
        }
        
        this.ctx.closePath();
        this.ctx.fill();
        
        // Border
        this.ctx.strokeStyle = ColorUtils.darken(color, 0.3);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawOrb(orb, time) {
        const alpha = orb.alpha !== undefined ? orb.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const cx = orb.x + orb.width / 2;
        const cy = orb.y + orb.height / 2;
        const r = orb.width / 2;
        const pulse = Math.sin(time * 5) * 0.15 + 0.85;
        
        // Glow
        this.ctx.globalAlpha = 0.3 * alpha;
        this.ctx.fillStyle = orb.color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.5 * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ring
        this.ctx.globalAlpha = 0.6 * alpha;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Core
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = orb.color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner highlight
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 0.5 * alpha;
        this.ctx.beginPath();
        this.ctx.arc(cx - r * 0.15, cy - r * 0.15, r * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.globalAlpha = 1;
    }
    
    drawPad(pad, time) {
        const alpha = pad.alpha !== undefined ? pad.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const pulse = Math.sin(time * 4) * 0.1 + 0.9;
        
        // Base
        this.ctx.fillStyle = ColorUtils.darken(pad.color, 0.4);
        this.ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
        
        // Top glow
        this.ctx.fillStyle = pad.color;
        this.ctx.fillRect(pad.x + 2, pad.y, pad.width - 4, pad.height * 0.4);
        
        // Pulse line
        this.ctx.globalAlpha = pulse * alpha;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(pad.x + 4, pad.y + 1, pad.width - 8, 2);
        
        this.ctx.globalAlpha = 1;
    }
    
    drawPortal(portal, time) {
        const alpha = portal.alpha !== undefined ? portal.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const cx = portal.x + portal.width / 2;
        const cy = portal.y + portal.height / 2;
        const rw = portal.width / 2;
        const rh = portal.height / 2;
        const pulse = Math.sin(time * 3) * 0.1 + 0.9;
        
        // Outer glow
        this.ctx.globalAlpha = 0.2 * alpha;
        this.ctx.fillStyle = portal.color;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw * 1.3 * pulse, rh * 1.3 * pulse, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Main shape
        this.ctx.globalAlpha = 0.7 * alpha;
        this.ctx.fillStyle = portal.color;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = ColorUtils.brighten(portal.color, 0.4);
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw * 0.5, rh * 0.5, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Spinning particles
        for (let i = 0; i < 4; i++) {
            const angle = time * 3 + (i * Math.PI / 2);
            const px = cx + Math.cos(angle) * rw * 0.7;
            const py = cy + Math.sin(angle) * rh * 0.7;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = 0.6 * alpha;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawTrigger(trigger) {
        // Triggers are invisible in gameplay, only show in editor
        if (!trigger.showInEditor) return;
        
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = '#ff8800';
        this.ctx.fillRect(trigger.x, trigger.y, trigger.width, trigger.height);
        this.ctx.strokeStyle = '#ffaa00';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(trigger.x, trigger.y, trigger.width, trigger.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '8px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(trigger.triggerType || 'T', trigger.x + trigger.width / 2, trigger.y + trigger.height / 2 + 3);
        
        this.ctx.globalAlpha = 1;
    }
    
    drawDecoration(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        this.ctx.fillStyle = obj.color || '#666666';
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawCoin(coin, time) {
        if (coin.collected) return;
        
        const cx = coin.x + coin.width / 2;
        const cy = coin.y + coin.height / 2;
        const r = coin.width / 2;
        const pulse = Math.sin(time * 4) * 0.1 + 0.9;
        
        // Glow
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = '#ffdd00';
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.4 * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Coin body
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffdd00';
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner circle
        this.ctx.strokeStyle = '#cc9900';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Star
        this.ctx.fillStyle = '#cc9900';
        this.ctx.font = `${r}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('★', cx, cy);
    }
    
    // Particle system
    spawnParticles(x, y, color, count = 10, speed = 200) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * speed * 2,
                vy: (Math.random() - 0.5) * speed * 2,
                life: 0.5 + Math.random() * 0.5,
                maxLife: 0.5 + Math.random() * 0.5,
                size: 2 + Math.random() * 4,
                color: color
            });
        }
    }
    
    updateParticles(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 400 * dt; // gravity on particles
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        for (const p of this.particles) {
            const alpha = p.life / p.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Draw attempt death effect
    drawDeathEffect(x, y, time, color) {
        const progress = Math.min(time * 3, 1);
        const count = 12;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const dist = progress * 100;
            const px = x + Math.cos(angle) * dist;
            const py = y + Math.sin(angle) * dist;
            const size = (1 - progress) * 8;
            
            this.ctx.globalAlpha = 1 - progress;
            this.ctx.fillStyle = color || GD.COLORS.PLAYER_PRIMARY;
            this.ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Set color channel
    setColorChannel(channelId, color) {
        this.colorChannels[channelId] = color;
    }
    
    getColorChannel(channelId) {
        return this.colorChannels[channelId] || '#ffffff';
    }
    
    setBGColor(color) {
        this.bgColor = color;
    }
    
    setGroundColor(color) {
        this.groundColor = color;
    }
}
