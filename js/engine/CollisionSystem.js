class CollisionSystem {
    constructor() {
        this.spatialGrid = new Map();
        this.cellSize = GD.BLOCK_SIZE * 4;
    }
    
    clear() {
        this.spatialGrid.clear();
    }
    
    _getCellKey(x, y) {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        return `${cx},${cy}`;
    }
    
    insertObject(obj) {
        const startCX = Math.floor(obj.x / this.cellSize);
        const endCX = Math.floor((obj.x + obj.width) / this.cellSize);
        const startCY = Math.floor(obj.y / this.cellSize);
        const endCY = Math.floor((obj.y + obj.height) / this.cellSize);
        
        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                const key = `${cx},${cy}`;
                if (!this.spatialGrid.has(key)) {
                    this.spatialGrid.set(key, []);
                }
                this.spatialGrid.get(key).push(obj);
            }
        }
    }
    
    buildGrid(objects) {
        this.clear();
        for (const obj of objects) {
            if (obj.active !== false) {
                this.insertObject(obj);
            }
        }
    }
    
    query(rect) {
        const results = new Set();
        const startCX = Math.floor(rect.x / this.cellSize);
        const endCX = Math.floor((rect.x + rect.width) / this.cellSize);
        const startCY = Math.floor(rect.y / this.cellSize);
        const endCY = Math.floor((rect.y + rect.height) / this.cellSize);
        
        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                const key = `${cx},${cy}`;
                const cell = this.spatialGrid.get(key);
                if (cell) {
                    for (const obj of cell) {
                        results.add(obj);
                    }
                }
            }
        }
        return Array.from(results);
    }
    
    // AABB collision test
    testAABB(a, b) {
        return MathUtils.aabbOverlap(a, b);
    }
    
    // Get collision response (push-out vector)
    resolveAABB(moving, stationary) {
        const overlapX = Math.min(
            moving.x + moving.width - stationary.x,
            stationary.x + stationary.width - moving.x
        );
        const overlapY = Math.min(
            moving.y + moving.height - stationary.y,
            stationary.y + stationary.height - moving.y
        );
        
        if (overlapX < overlapY) {
            // Push horizontally
            const pushX = (moving.x + moving.width / 2) < (stationary.x + stationary.width / 2)
                ? -overlapX : overlapX;
            return { x: pushX, y: 0, axis: 'x' };
        } else {
            // Push vertically
            const pushY = (moving.y + moving.height / 2) < (stationary.y + stationary.height / 2)
                ? -overlapY : overlapY;
            return { x: 0, y: pushY, axis: 'y' };
        }
    }
    
    // SAT collision for rotated objects
    testSAT(polyA, polyB) {
        const axes = [...this._getAxes(polyA), ...this._getAxes(polyB)];
        
        for (const axis of axes) {
            const projA = this._project(polyA, axis);
            const projB = this._project(polyB, axis);
            
            if (projA.max < projB.min || projB.max < projA.min) {
                return false; // Separating axis found
            }
        }
        return true; // No separating axis = collision
    }
    
    _getAxes(polygon) {
        const axes = [];
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
            // Normal (perpendicular)
            const len = Math.sqrt(edge.x * edge.x + edge.y * edge.y);
            axes.push({ x: -edge.y / len, y: edge.x / len });
        }
        return axes;
    }
    
    _project(polygon, axis) {
        let min = Infinity, max = -Infinity;
        for (const point of polygon) {
            const dot = point.x * axis.x + point.y * axis.y;
            min = Math.min(min, dot);
            max = Math.max(max, dot);
        }
        return { min, max };
    }
    
    // Get rotated polygon from rect
    getRotatedRect(x, y, w, h, angle) {
        const cx = x + w / 2;
        const cy = y + h / 2;
        const corners = [
            { x: x, y: y },
            { x: x + w, y: y },
            { x: x + w, y: y + h },
            { x: x, y: y + h }
        ];
        return corners.map(c => MathUtils.rotatePoint(c.x, c.y, cx, cy, angle));
    }
    
    // Triangle hitbox for spikes
    getTriangleHitbox(x, y, size, direction = 'up') {
        switch (direction) {
            case 'up':
                return [
                    { x: x + size / 2, y: y },
                    { x: x + size, y: y + size },
                    { x: x, y: y + size }
                ];
            case 'down':
                return [
                    { x: x, y: y },
                    { x: x + size, y: y },
                    { x: x + size / 2, y: y + size }
                ];
            case 'left':
                return [
                    { x: x, y: y + size / 2 },
                    { x: x + size, y: y },
                    { x: x + size, y: y + size }
                ];
            case 'right':
                return [
                    { x: x, y: y },
                    { x: x, y: y + size },
                    { x: x + size, y: y + size / 2 }
                ];
        }
    }
    
    // Point in triangle test
    pointInTriangle(px, py, triangle) {
        const [a, b, c] = triangle;
        const d1 = this._sign(px, py, a.x, a.y, b.x, b.y);
        const d2 = this._sign(px, py, b.x, b.y, c.x, c.y);
        const d3 = this._sign(px, py, c.x, c.y, a.x, a.y);
        const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(hasNeg && hasPos);
    }
    
    _sign(x1, y1, x2, y2, x3, y3) {
        return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
    }
    
    // AABB vs Triangle
    testAABBTriangle(rect, triangle) {
        // Quick AABB check first
        const triMinX = Math.min(triangle[0].x, triangle[1].x, triangle[2].x);
        const triMaxX = Math.max(triangle[0].x, triangle[1].x, triangle[2].x);
        const triMinY = Math.min(triangle[0].y, triangle[1].y, triangle[2].y);
        const triMaxY = Math.max(triangle[0].y, triangle[1].y, triangle[2].y);
        
        if (rect.x + rect.width <= triMinX || rect.x >= triMaxX ||
            rect.y + rect.height <= triMinY || rect.y >= triMaxY) {
            return false;
        }
        
        // Check if any corner of rect is in triangle
        const corners = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height }
        ];
        
        for (const c of corners) {
            if (this.pointInTriangle(c.x, c.y, triangle)) return true;
        }
        
        // Use SAT for precise detection
        const rectPoly = [corners[0], corners[1], corners[2], corners[3]];
        return this.testSAT(rectPoly, triangle);
    }
}
```

---

## js/engine/Physics.js

```javascript
class Physics {
    constructor() {
        this.gravity = GD.GRAVITY;
        this.terminalVelocity = GD.TERMINAL_VELOCITY;
    }
    
    applyGravity(entity, dt, gravityMultiplier = 1) {
        const grav = this.gravity * entity.gravityDirection * gravityMultiplier;
        entity.velocityY += grav * dt;
        
        // Clamp to terminal velocity
        entity.velocityY = MathUtils.clamp(
            entity.velocityY,
            -this.terminalVelocity,
            this.terminalVelocity
        );
    }
    
    applyVelocity(entity, dt) {
        entity.x += entity.velocityX * dt;
        entity.y += entity.velocityY * dt;
    }
    
    applyJumpImpulse(entity, impulse) {
        entity.velocityY = impulse * entity.gravityDirection;
        entity.onGround = false;
    }
    
    flipGravity(entity) {
        entity.gravityDirection *= -1;
    }
    
    // Ship physics
    applyShipPhysics(entity, dt, isThrusting) {
        const grav = GD.SHIP_GRAVITY * entity.gravityDirection;
        
        if (isThrusting) {
            entity.velocityY += GD.SHIP_THRUST * entity.gravityDirection * dt;
        }
        
        entity.velocityY += grav * dt;
        entity.velocityY = MathUtils.clamp(entity.velocityY, -GD.SHIP_TERMINAL, GD.SHIP_TERMINAL);
    }
    
    // UFO physics
    applyUFOBoost(entity) {
        entity.velocityY = GD.UFO_BOOST * entity.gravityDirection;
    }
    
    // Wave physics
    applyWavePhysics(entity, dt, isHolding) {
        const speed = entity.velocityX || GD.SPEEDS.NORMAL;
        if (isHolding) {
            entity.velocityY = -speed * GD.WAVE_SLOPE * entity.gravityDirection;
        } else {
            entity.velocityY = speed * GD.WAVE_SLOPE * entity.gravityDirection;
        }
    }
    
    // Robot physics
    applyRobotJump(entity, holdTime) {
        const t = MathUtils.clamp(holdTime / GD.ROBOT_CHARGE_TIME, 0, 1);
        const impulse = MathUtils.lerp(GD.ROBOT_MIN_JUMP, GD.ROBOT_MAX_JUMP, t);
        entity.velocityY = impulse * entity.gravityDirection;
        entity.onGround = false;
    }
    
    // Spider teleport
    spiderTeleport(entity, groundY, ceilingY) {
        entity.gravityDirection *= -1;
        
        if (entity.gravityDirection > 0) {
            // Now falling down - teleport to ceiling then fall
            entity.y = ceilingY;
        } else {
            // Now falling up - teleport to ground then rise
            entity.y = groundY - entity.height;
        }
        entity.velocityY = 0;
    }
    
    // Swing physics
    applySwingPhysics(entity, dt) {
        const grav = GD.SWING_GRAVITY * entity.gravityDirection;
        entity.velocityY += grav * dt;
        entity.velocityY = MathUtils.clamp(entity.velocityY, -this.terminalVelocity, this.terminalVelocity);
    }
    
    swingFlip(entity) {
        entity.gravityDirection *= -1;
        entity.velocityY = GD.SWING_IMPULSE * entity.gravityDirection;
    }
    
    // Ground collision resolution
    resolveGroundCollision(entity, groundY) {
        if (entity.gravityDirection > 0) {
            // Normal gravity - land on top
            if (entity.y + entity.height > groundY) {
                entity.y = groundY - entity.height;
                entity.velocityY = 0;
                entity.onGround = true;
                return true;
            }
        } else {
            // Flipped gravity - land on bottom (ceiling)
            if (entity.y < groundY) {
                entity.y = groundY;
                entity.velocityY = 0;
                entity.onGround = true;
                return true;
            }
        }
        return false;
    }
    
    // Check if entity is within bounds
    checkBounds(entity, minY, maxY) {
        if (entity.y + entity.height > maxY || entity.y < minY) {
            return false; // Out of bounds = death
        }
        return true;
    }
}
```

---

## js/engine/Camera.js

```javascript
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
