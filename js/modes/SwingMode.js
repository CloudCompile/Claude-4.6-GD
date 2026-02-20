class SwingMode extends GameMode {
    constructor() {
        super(GD.MODES.SWING);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed) {
            // Toggle gravity direction mid-air
            physics.swingFlip(player);
            return 'swing_flip';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        physics.applySwingPhysics(player, dt);
        physics.applyVelocity(player, dt);
        
        // Clamp to bounds
        if (player.y + player.height >= groundY) {
            player.y = groundY - player.height;
            player.velocityY = 0;
        }
        if (player.y <= ceilingY) {
            player.y = ceilingY;
            player.velocityY = 0;
        }
        
        player.onGround = false;
    }
    
    onEnter(player) {
        player.onGround = false;
    }
}
