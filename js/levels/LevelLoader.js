class LevelLoader {
    constructor() {
        this.levels = [];
        this.currentLevel = null;
        this.currentLevelIndex = -1;
    }
    
    init() {
        this.levels = LevelLoader.getBuiltInLevels();
    }
    
    getLevelCount() {
        return this.levels.length;
    }
    
    getLevelList() {
        return this.levels.map((level, index) => ({
            index,
            name: level.name,
            difficulty: level.difficulty || 'NORMAL',
            stars: (GD.DIFFICULTIES[level.difficulty] || GD.DIFFICULTIES.NORMAL).stars
        }));
    }
    
    loadLevel(index) {
        if (index < 0 || index >= this.levels.length) return null;
        
        const levelData = this.levels[index];
        const validation = LevelValidator.validate(levelData);
        
        if (!validation.valid) {
            console.warn('Level validation warnings:', validation.errors);
            // Still allow loading, just sanitize
        }
        
        const sanitized = LevelValidator.sanitize(levelData);
        this.currentLevel = LevelParser.parse(sanitized);
        this.currentLevelIndex = index;
        
        return this.currentLevel;
    }
    
    static getBuiltInLevels() {
        return [
            LevelLoader._createStereoMadness(),
            LevelLoader._createBackOnTrack(),
            LevelLoader._createElectrodynamix()
        ];
    }
    
    static _createStereoMadness() {
        const B = GD.BLOCK_SIZE;
        const objects = [];
        const groundY = 0; // Will be set relative to GROUND_Y at runtime
        
        // Ground blocks
        for (let i = 0; i < 200; i++) {
            objects.push({
                type: 'block', x: i * B, y: 0,
                width: B, height: B, color: '#1a1a5e',
                solid: true, groupId: 'ground'
            });
        }
        
        // Platforms and obstacles
        // Section 1: Simple jumps
        objects.push({ type: 'spike', x: 10 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 15 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 18 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 19 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 22 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 23 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Section 2: Platforming
        objects.push({ type: 'block', x: 28 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 29 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 30 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 32 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Section 3: Triple spikes
        objects.push({ type: 'spike', x: 38 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 39 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 40 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Yellow orb
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 45 * B, y: -3 * B, width: B, height: B });
        
        // Section 4: Ship portal
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SHIP, x: 55 * B, y: -2 * B });
        
        // Ship section obstacles
        objects.push({ type: 'spike', x: 60 * B, y: -4 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 65 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 70 * B, y: -3 * B, width: B, height: B, direction: 'down' });
        
        // Back to cube
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 80 * B, y: -2 * B });
        
        // Section 5: More cube
        objects.push({ type: 'spike', x: 85 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 86 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 90 * B, y: -2 * B, width: 3 * B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 95 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Speed portal
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, x: 100 * B, y: -2 * B });
        
        // Fast section
        objects.push({ type: 'spike', x: 105 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 108 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 111 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 114 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Coin
        objects.push({ type: 'coin', x: 120 * B, y: -3 * B, width: B, height: B });
        
        // Final section
        objects.push({ type: 'spike', x: 130 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 131 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 132 * B, y: -B, width: B, height: B, direction: 'up' });
        
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_NORMAL, x: 140 * B, y: -2 * B });
        
        // End
        objects.push({ type: 'block', x: 150 * B, y: -B, width: 3 * B, height: B, color: '#00ff00', solid: true });
        
        return {
            name: 'Stereo Madness',
            difficulty: 'EASY',
            bpm: 126,
            bgColor: '#0a0a2e',
            groundColor: '#1a1a5e',
            speed: 1,
            objects: objects
        };
    }
    
    static _createBackOnTrack() {
        const B = GD.BLOCK_SIZE;
        const objects = [];
        
        // Ground blocks
        for (let i = 0; i < 180; i++) {
            objects.push({
                type: 'block', x: i * B, y: 0,
                width: B, height: B, color: '#1a3a1a',
                solid: true, groupId: 'ground'
            });
        }
        
        // Simple jumps section
        objects.push({ type: 'spike', x: 8 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 12 * B, y: -2 * B, width: 2 * B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 16 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 17 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Pad
        objects.push({ type: 'pad', padType: 'YELLOW', x: 22 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        
        // Platform jumps
        objects.push({ type: 'block', x: 30 * B, y: -3 * B, width: 2 * B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 34 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 35 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 36 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Ship section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SHIP, x: 45 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 50 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 55 * B, y: -4 * B, width: B, height: B, direction: 'down' });
        
        // Back to cube
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 65 * B, y: -2 * B });
        
        // Orbs section
        objects.push({ type: 'spike', x: 70 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 73 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 76 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'orb', orbType: 'PINK', x: 79 * B, y: -2 * B, width: B, height: B });
        
        // UFO section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.UFO, x: 90 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 95 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 100 * B, y: -5 * B, width: B, height: B, direction: 'down' });
        
        // Back to cube
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 110 * B, y: -2 * B });
        
        // Coin
        objects.push({ type: 'coin', x: 115 * B, y: -3 * B, width: B, height: B });
        
        // Final section
        objects.push({ type: 'spike', x: 120 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 121 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 125 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 126 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 127 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // End
        objects.push({ type: 'block', x: 135 * B, y: -B, width: 3 * B, height: B, color: '#00ff00', solid: true });
        
        return {
            name: 'Back On Track',
            difficulty: 'EASY',
            bpm: 130,
            bgColor: '#0a2e0a',
            groundColor: '#1a5a1a',
            speed: 1,
            objects: objects
        };
    }
    
    static _createElectrodynamix() {
        const B = GD.BLOCK_SIZE;
        const objects = [];
        
        // Ground blocks
        for (let i = 0; i < 250; i++) {
            objects.push({
                type: 'block', x: i * B, y: 0,
                width: B, height: B, color: '#2e0a2e',
                solid: true, groupId: 'ground'
            });
        }
        
        // Speed portal - starts faster
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, x: 3 * B, y: -2 * B });
        
        // Aggressive spike patterns
        objects.push({ type: 'spike', x: 8 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 9 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 12 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 13 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 14 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Platforms with spikes on top
        objects.push({ type: 'block', x: 20 * B, y: -2 * B, width: 3 * B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 21 * B, y: -3 * B, width: B, height: B, direction: 'up' });
        
        // Gravity portal
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_FLIP, x: 30 * B, y: -2 * B });
        
        // Upside down section
        objects.push({ type: 'spike', x: 35 * B, y: -B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 36 * B, y: -B, width: B, height: B, direction: 'down' });
        
        // Return gravity
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_NORMAL, x: 42 * B, y: -2 * B });
        
        // Wave section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.WAVE, x: 50 * B, y: -2 * B });
        
        // Wave obstacles (blocks to navigate around)
        objects.push({ type: 'block', x: 55 * B, y: -3 * B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 60 * B, y: -B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 65 * B, y: -4 * B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        
        // Back to cube
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 75 * B, y: -2 * B });
        
        // Triple speed section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_TRIPLE, x: 80 * B, y: -2 * B });
        
        objects.push({ type: 'spike', x: 85 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'orb', orbType: 'RED', x: 88 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 92 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 93 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'orb', orbType: 'BLUE', x: 96 * B, y: -2 * B, width: B, height: B });
        
        // Ball section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.BALL, x: 105 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_NORMAL, x: 106 * B, y: -2 * B });
        
        objects.push({ type: 'spike', x: 110 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 115 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 120 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Robot section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.ROBOT, x: 130 * B, y: -2 * B });
        
        objects.push({ type: 'block', x: 135 * B, y: -3 * B, width: 2 * B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 140 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 141 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Final cube section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 150 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_QUADRUPLE, x: 151 * B, y: -2 * B });
        
        objects.push({ type: 'spike', x: 155 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 158 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 161 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 164 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 167 * B, y: -B, width: B, height: B, direction: 'up' });
        
        // Coin
        objects.push({ type: 'coin', x: 170 * B, y: -4 * B, width: B, height: B });
        
        // End
        objects.push({ type: 'block', x: 180 * B, y: -B, width: 3 * B, height: B, color: '#ff00ff', solid: true });
        
        return {
            name: 'Electrodynamix',
            difficulty: 'INSANE',
            bpm: 128,
            bgColor: '#2e0a2e',
            groundColor: '#5a1a5a',
            speed: 2,
            objects: objects
        };
    }
}
