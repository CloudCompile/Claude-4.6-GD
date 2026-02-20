class BallMode extends GameMode {
    constructor() {
        super(GD.MODES.BALL);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed && player.onGround) {
            physics.flipGravity(player);
            player.onGround = false;
            return 'flip';
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
    
    onEnter(player) {
        // Ball rolls, preserves momentum
    }
}
