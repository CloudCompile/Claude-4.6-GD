// Geometry Dash Clone - Main Entry Point
// Initialize game when DOM is ready

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    
    // Init audio on first user interaction (browser requirement)
    const initAudio = async () => {
        await game.audio.init();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('keydown', initAudio);
        document.removeEventListener('touchstart', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
    document.addEventListener('touchstart', initAudio);
    
    // Start game
    game.init().catch(err => {
        console.error('Game initialization failed:', err);
    });
    
    // Expose game for debugging
    window.game = game;
});
