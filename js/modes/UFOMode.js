class UFOMode extends GameMode {
    constructor() {
        super(GD.MODES.UFO);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed) {
            physics.applyUFOBoost(player);
            player.onGround = false;
            return 'boost';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        physics.applyGravity(player, dt, GD.UFO_GRAVITY / GD.GRAVITY);
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
        
        // Ceiling clamp
        if (player.gravityDirection > 0 && player.y <= ceilingY) {
            player.y = ceilingY;
            player.velocityY = 0;
        } else if (player.gravityDirection < 0 && player.y + player.height >= groundY) {
            player.y = groundY - player.height;
            player.velocityY = 0;
        }
    }
    
    onEnter(player) {
        player.onGround = false;
    }
}
