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
