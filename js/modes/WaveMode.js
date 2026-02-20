class WaveMode extends GameMode {
    constructor() {
        super(GD.MODES.WAVE);
    }
    
    handleInput(player, input, physics, dt) {
        physics.applyWavePhysics(player, dt, input.pressed);
        return input.pressed ? 'wave_up' : 'wave_down';
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        // Wave mode: constant diagonal movement
        // velocityY is set by handleInput
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
