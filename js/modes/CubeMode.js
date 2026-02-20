class CubeMode extends GameMode {
    constructor() {
        super(GD.MODES.CUBE);}
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed && player.onGround && !player.dashing) {
            physics.applyJumpImpulse(player, GD.JUMP_IMPULSE);
            return 'jump';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        if (!player.dashing) {
            physics.applyGravity(player, dt);
        }
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
    
    onEnter(player) {
        player.rotation = 0;
    }
}
