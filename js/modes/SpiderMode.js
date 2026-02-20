class SpiderMode extends GameMode {
    constructor() {
        super(GD.MODES.SPIDER);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed && player.onGround) {
            // Instant teleport to opposite surface
            return 'teleport';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        physics.applyGravity(player, dt);
        physics.applyVelocity(player, dt);
        
        // Ground collision
        if (player.gravityDirection > 0) {
            if (player.y + player.height >= groundY) {
                player.y = groundY - player.height;
                player.velocityY = 0;
                player.onGround = true;
            }
        } else {
            if (player.y <= ceilingY) {
                player.y = ceilingY;
                player.velocityY = 0;
                player.onGround = true;
            }
        }
    }
    
    performTeleport(player, physics, groundY, ceilingY) {
        // Flip gravity and teleport to opposite surface
        player.gravityDirection *= -1;
        
        if (player.gravityDirection > 0) {
            // Now falling down - snap to ground
            player.y = groundY - player.height;
        } else {
            // Now falling up - snap to ceiling
            player.y = ceilingY;
        }
        
        player.velocityY = 0;
        player.onGround = true;
    }
    
    onEnter(player) {
        player.rotation = 0;
    }
}
