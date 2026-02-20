class RobotMode extends GameMode {
    constructor() {
        super(GD.MODES.ROBOT);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.pressed && player.onGround && !player.robotJumping) {
            // Start charging jump
            player.robotHoldTime += dt;
            player.robotHoldTime = Math.min(player.robotHoldTime, GD.ROBOT_CHARGE_TIME);
        }
        
        if (input.justReleased && player.onGround && player.robotHoldTime > 0) {
            // Release jump with variable height
            physics.applyRobotJump(player, player.robotHoldTime);
            player.robotJumping = true;
            player.robotHoldTime = 0;
            return 'jump';
        }
        
        if (input.justPressed && player.onGround) {
            // Minimum jump on tap
            player.robotHoldTime = 0;
        }
        
        // Also allow tap jump (instant press+release)
        if (input.justPressed && player.onGround && !player.robotJumping) {
            player.robotHoldTime = 0.01; // Minimal charge
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
                player.robotJumping = false;
            }
        } else {
            if (player.y <= ceilingY) {
                player.y = ceilingY;
                player.velocityY = 0;
                player.onGround = true;
                player.robotJumping = false;
            }
        }
    }
    
    onEnter(player) {
        player.robotHoldTime = 0;
        player.robotJumping = false;
    }
}
