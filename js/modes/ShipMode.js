class ShipMode extends GameMode {
    constructor() {
        super(GD.MODES.SHIP);
    }
    
    handleInput(player, input, physics, dt) {
        physics.applyShipPhysics(player, dt, input.pressed);
        return input.pressed ? 'thrust' : null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
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
        
        // Ship is never "on ground" in the traditional sense
        player.onGround = false;
    }
    
    onEnter(player) {
        player.onGround = false;
    }
}
