class GameMode {
    constructor(name) {
        this.name = name;
    }
    
    handleInput(player, input, physics, dt) {
        // Override in subclasses
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        // Override in subclasses
    }
    
    onEnter(player) {
        // Called when switching to this mode
    }
    
    onExit(player) {
        // Called when leaving this mode
    }
}
