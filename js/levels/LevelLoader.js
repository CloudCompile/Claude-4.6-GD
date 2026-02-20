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

        // === Section 1: Intro — gentle single spikes (x: 8-30) ===
        objects.push({ type: 'spike', x: 8 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 13 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 18 * B, y: -B, width: B, height: B, direction: 'up' });
        // Small platform to walk on
        objects.push({ type: 'block', x: 22 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 23 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 26 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 30 * B, y: -B, width: B, height: B, direction: 'up' });

        // === Section 2: Double spikes & first platform (x: 34-60) ===
        objects.push({ type: 'spike', x: 34 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 35 * B, y: -B, width: B, height: B, direction: 'up' });
        // Elevated platform
        objects.push({ type: 'block', x: 39 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 40 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 41 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        // Spike after platform landing
        objects.push({ type: 'spike', x: 44 * B, y: -B, width: B, height: B, direction: 'up' });
        // Double spike
        objects.push({ type: 'spike', x: 48 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 49 * B, y: -B, width: B, height: B, direction: 'up' });
        // Walkable step-up
        objects.push({ type: 'block', x: 53 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 54 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 54 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 57 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 1: above the elevated platform — requires precise jump
        objects.push({ type: 'coin', x: 40 * B, y: -4 * B, width: B, height: B });

        // === Section 3: Yellow pad & orb intro (x: 62-90) ===
        objects.push({ type: 'pad', padType: 'YELLOW', x: 62 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        // Landing platform after pad bounce
        objects.push({ type: 'block', x: 66 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'block', x: 67 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'spike', x: 70 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 71 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow orb over spike gap
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 75 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 76 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 77 * B, y: -B, width: B, height: B, direction: 'up' });
        // Platform staircase
        objects.push({ type: 'block', x: 81 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 82 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 82 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 83 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 83 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 83 * B, y: -3 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 86 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 87 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink orb for smaller jump over double spike
        objects.push({ type: 'orb', orbType: 'PINK', x: 86 * B, y: -2.5 * B, width: B, height: B });

        // === Section 4: Pillar jumps & triple spikes (x: 92-140) ===
        // Pillar 1
        objects.push({ type: 'block', x: 92 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 92 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 92 * B, y: -3 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 95 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pillar 2
        objects.push({ type: 'block', x: 99 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 99 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 101 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 102 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow pad for big jump
        objects.push({ type: 'pad', padType: 'YELLOW', x: 106 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        // Long elevated platform
        objects.push({ type: 'block', x: 109 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'block', x: 110 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'block', x: 111 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'block', x: 112 * B, y: -3 * B, width: B, height: B, color: '#3333aa', solid: true });
        // Triple spike on ground below platform
        objects.push({ type: 'spike', x: 109 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 110 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 111 * B, y: -B, width: B, height: B, direction: 'up' });
        // Gap then double spike
        objects.push({ type: 'spike', x: 116 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 117 * B, y: -B, width: B, height: B, direction: 'up' });
        // Orb chain
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 121 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 122 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 123 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 124 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 2: requires orb hit and precise timing
        objects.push({ type: 'coin', x: 123 * B, y: -4 * B, width: B, height: B });
        // Block gap crossing
        objects.push({ type: 'block', x: 128 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 130 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 129 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 133 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 134 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 135 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink pad
        objects.push({ type: 'pad', padType: 'PINK', x: 138 * B, y: -B * 0.4, width: B, height: B * 0.4 });

        // === Section 5: Intensifying patterns (x: 142-200) ===
        objects.push({ type: 'spike', x: 142 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 143 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 146 * B, y: -2 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'block', x: 147 * B, y: -2 * B, width: B, height: B, color: '#3333aa', solid: true });
        objects.push({ type: 'spike', x: 147 * B, y: -3 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 150 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 151 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 152 * B, y: -B, width: B, height: B, direction: 'up' });
        // Orb to pass over triple
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 150 * B, y: -2.5 * B, width: B, height: B });
        // Platform bridge with spike on it
        objects.push({ type: 'block', x: 157 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 158 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 159 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 158 * B, y: -2 * B, width: B, height: B, direction: 'up' });
        // Double spike gap
        objects.push({ type: 'spike', x: 163 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 164 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'pad', padType: 'YELLOW', x: 168 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 171 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 172 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 173 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink orb double jump
        objects.push({ type: 'orb', orbType: 'PINK', x: 176 * B, y: -2 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 177 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 178 * B, y: -B, width: B, height: B, direction: 'up' });
        // Elevated platform chain
        objects.push({ type: 'block', x: 182 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 183 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 185 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 188 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 189 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 191 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 192 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 196 * B, y: -B, width: B, height: B, direction: 'up' });

        // === Section 6: Final gauntlet (x: 200-290) ===
        // Triple spike
        objects.push({ type: 'spike', x: 202 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 203 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 204 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pad launch over obstacles
        objects.push({ type: 'pad', padType: 'YELLOW', x: 208 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 210 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 211 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 212 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 213 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pillar with spike
        objects.push({ type: 'block', x: 218 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 218 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 218 * B, y: -3 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 220 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 221 * B, y: -B, width: B, height: B, direction: 'up' });
        // Orb over gap
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 225 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 226 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 227 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 228 * B, y: -B, width: B, height: B, direction: 'up' });
        // Block walkway with spike obstacle
        objects.push({ type: 'block', x: 232 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 233 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 234 * B, y: -B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 233 * B, y: -2 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 238 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 239 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink orb
        objects.push({ type: 'orb', orbType: 'PINK', x: 242 * B, y: -2 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 243 * B, y: -B, width: B, height: B, direction: 'up' });
        // Last triple spike before end
        objects.push({ type: 'spike', x: 248 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 249 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 250 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 3: risky final coin above triple spike
        objects.push({ type: 'coin', x: 249 * B, y: -3 * B, width: B, height: B });
        // Final platforms
        objects.push({ type: 'block', x: 255 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'block', x: 256 * B, y: -2 * B, width: B, height: B, color: '#2a2a7e', solid: true });
        objects.push({ type: 'spike', x: 259 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 260 * B, y: -B, width: B, height: B, direction: 'up' });
        // End marker
        objects.push({ type: 'block', x: 290 * B, y: -B, width: B * 3, height: B, color: '#00ff00', solid: true });

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

        // ============================================================
        // CUBE SECTION 1: Warm-up (x: 8-70)
        // ============================================================
        objects.push({ type: 'spike', x: 8 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 13 * B, y: -B, width: B, height: B, direction: 'up' });
        // First platform
        objects.push({ type: 'block', x: 17 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 18 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 21 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 22 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow pad launch
        objects.push({ type: 'pad', padType: 'YELLOW', x: 26 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        // Landing platform after pad
        objects.push({ type: 'block', x: 29 * B, y: -3 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'block', x: 30 * B, y: -3 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'block', x: 31 * B, y: -3 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'spike', x: 34 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 35 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 36 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow orb over triple spike
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 34 * B, y: -3 * B, width: B, height: B });
        // Elevated platforms
        objects.push({ type: 'block', x: 40 * B, y: -2 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 41 * B, y: -2 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 43 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 44 * B, y: -B, width: B, height: B, direction: 'up' });
        // Staircase
        objects.push({ type: 'block', x: 48 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 49 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 49 * B, y: -2 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 52 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink pad
        objects.push({ type: 'pad', padType: 'PINK', x: 55 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 58 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 59 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 1: above pink pad jump path
        objects.push({ type: 'coin', x: 56 * B, y: -4 * B, width: B, height: B });
        // Platform bridge
        objects.push({ type: 'block', x: 63 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 64 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 65 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 64 * B, y: -2 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 68 * B, y: -B, width: B, height: B, direction: 'up' });

        // ============================================================
        // SHIP SECTION (x: 72-120)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SHIP, x: 72 * B, y: -2 * B });
        // Floor spikes
        objects.push({ type: 'spike', x: 78 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 79 * B, y: -B, width: B, height: B, direction: 'up' });
        // Ceiling spikes
        objects.push({ type: 'spike', x: 84 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 85 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Narrow corridor — floor and ceiling spikes
        objects.push({ type: 'spike', x: 90 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 90 * B, y: -5 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 95 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 95 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Block obstacle to fly around
        objects.push({ type: 'block', x: 100 * B, y: -3 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 100 * B, y: -4 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        // More ceiling spikes
        objects.push({ type: 'spike', x: 105 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 106 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Floor spikes
        objects.push({ type: 'spike', x: 110 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 111 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 112 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 2: in ship corridor between spikes
        objects.push({ type: 'coin', x: 102 * B, y: -3.5 * B, width: B, height: B });

        // ============================================================
        // CUBE SECTION 2 (x: 118-185)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 118 * B, y: -2 * B });
        // Speed up
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, x: 120 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 125 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 126 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink orb
        objects.push({ type: 'orb', orbType: 'PINK', x: 129 * B, y: -2 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 130 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 131 * B, y: -B, width: B, height: B, direction: 'up' });
        // Platform
        objects.push({ type: 'block', x: 135 * B, y: -2 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'block', x: 136 * B, y: -2 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'spike', x: 139 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 140 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 141 * B, y: -B, width: B, height: B, direction: 'up' });
        // Blue orb for gravity jump
        objects.push({ type: 'orb', orbType: 'BLUE', x: 145 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 148 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pad combo
        objects.push({ type: 'pad', padType: 'YELLOW', x: 152 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 155 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 156 * B, y: -B, width: B, height: B, direction: 'up' });
        // Block pillar
        objects.push({ type: 'block', x: 160 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 160 * B, y: -2 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 163 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 164 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow orb chain
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 167 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 168 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 169 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 170 * B, y: -B, width: B, height: B, direction: 'up' });
        // Speed back to normal
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_NORMAL, x: 175 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 178 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 179 * B, y: -B, width: B, height: B, direction: 'up' });

        // ============================================================
        // UFO SECTION (x: 185-240)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.UFO, x: 185 * B, y: -2 * B });
        // Low ceiling blocks to navigate
        objects.push({ type: 'block', x: 190 * B, y: -5 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 191 * B, y: -5 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 194 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 195 * B, y: -B, width: B, height: B, direction: 'up' });
        // Ceiling spikes
        objects.push({ type: 'spike', x: 199 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 200 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Block gap — fly through
        objects.push({ type: 'block', x: 205 * B, y: -B, width: B, height: 2 * B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 205 * B, y: -5 * B, width: B, height: 2 * B, color: '#2a5a2a', solid: true });
        // Spike ceiling and floor pattern
        objects.push({ type: 'spike', x: 210 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 212 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 215 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 215 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Block column with gap
        objects.push({ type: 'block', x: 220 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 220 * B, y: -5 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 220 * B, y: -6 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 225 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 226 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 230 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 231 * B, y: -6 * B, width: B, height: B, direction: 'down' });

        // ============================================================
        // CUBE SECTION 3: Finale (x: 238-340)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 238 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 243 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 244 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 245 * B, y: -B, width: B, height: B, direction: 'up' });
        // Orb over triple
        objects.push({ type: 'orb', orbType: 'YELLOW', x: 244 * B, y: -3 * B, width: B, height: B });
        // Pillars
        objects.push({ type: 'block', x: 250 * B, y: -B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'block', x: 250 * B, y: -2 * B, width: B, height: B, color: '#2a5a2a', solid: true });
        objects.push({ type: 'spike', x: 253 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 254 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 258 * B, y: -2 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'block', x: 259 * B, y: -2 * B, width: B, height: B, color: '#3a7a3a', solid: true });
        objects.push({ type: 'spike', x: 262 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink pad finale
        objects.push({ type: 'pad', padType: 'PINK', x: 265 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 268 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 269 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 270 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 3: between triple spike — requires timing
        objects.push({ type: 'coin', x: 269 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 275 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 276 * B, y: -B, width: B, height: B, direction: 'up' });
        // End marker
        objects.push({ type: 'block', x: 340 * B, y: -B, width: B * 3, height: B, color: '#00ff00', solid: true });

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

        // Start at double speed immediately
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, x: 3 * B, y: -2 * B });

        // ============================================================
        // CUBE SECTION 1: Aggressive opening (x: 7-60)
        // ============================================================
        objects.push({ type: 'spike', x: 7 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 8 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 11 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 12 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 13 * B, y: -B, width: B, height: B, direction: 'up' });
        // Platform with spike on top
        objects.push({ type: 'block', x: 17 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 18 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 18 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 18 * B, y: -3 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 21 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 22 * B, y: -B, width: B, height: B, direction: 'up' });
        // Red orb for strong jump
        objects.push({ type: 'orb', orbType: 'RED', x: 25 * B, y: -2.5 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 26 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 27 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 28 * B, y: -B, width: B, height: B, direction: 'up' });
        // Yellow pad chain
        objects.push({ type: 'pad', padType: 'YELLOW', x: 32 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 34 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 35 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 36 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 37 * B, y: -B, width: B, height: B, direction: 'up' });
        // Block pillars
        objects.push({ type: 'block', x: 41 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 41 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 41 * B, y: -3 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 44 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 45 * B, y: -B, width: B, height: B, direction: 'up' });
        // Blue orb — gravity flip jump
        objects.push({ type: 'orb', orbType: 'BLUE', x: 48 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 49 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 50 * B, y: -B, width: B, height: B, direction: 'up' });
        // Pink pad
        objects.push({ type: 'pad', padType: 'PINK', x: 53 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 55 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 56 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 57 * B, y: -B, width: B, height: B, direction: 'up' });

        // ============================================================
        // SHIP SECTION: Tight corridors (x: 62-110)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SHIP, x: 62 * B, y: -2 * B });
        // Floor/ceiling spike alternation
        objects.push({ type: 'spike', x: 68 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 69 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 73 * B, y: -7 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 74 * B, y: -7 * B, width: B, height: B, direction: 'down' });
        // Narrow gap blocks
        objects.push({ type: 'block', x: 78 * B, y: -B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 78 * B, y: -6 * B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        // Corridor squeeze
        objects.push({ type: 'spike', x: 82 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 82 * B, y: -7 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 86 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 86 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Block obstacle mid-air
        objects.push({ type: 'block', x: 90 * B, y: -3 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 90 * B, y: -4 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 94 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 94 * B, y: -7 * B, width: B, height: B, direction: 'down' });
        // Gravity flip in ship
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_FLIP, x: 97 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 100 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 101 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 104 * B, y: -B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_NORMAL, x: 107 * B, y: -2 * B });
        // Coin 1: in gravity-flipped ship section
        objects.push({ type: 'coin', x: 102 * B, y: -4 * B, width: B, height: B });

        // ============================================================
        // BALL SECTION: Gravity toggles (x: 112-155)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.BALL, x: 112 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_TRIPLE, x: 113 * B, y: -2 * B });
        // Spike patterns — ball toggles gravity on tap
        objects.push({ type: 'spike', x: 118 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 121 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 121 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 125 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 128 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 131 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 131 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        // Block obstacles
        objects.push({ type: 'block', x: 135 * B, y: -B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 138 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 139 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 142 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 143 * B, y: -6 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'spike', x: 146 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 147 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 148 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 151 * B, y: -5 * B, width: B, height: 2 * B, color: '#4e2a4e', solid: true });

        // ============================================================
        // WAVE SECTION: Tight diagonal navigation (x: 158-210)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.WAVE, x: 158 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, x: 159 * B, y: -2 * B });
        // Alternating blocks create wave corridors
        objects.push({ type: 'block', x: 164 * B, y: -B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 168 * B, y: -5 * B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 172 * B, y: -B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 176 * B, y: -5 * B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 180 * B, y: -B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        // Tighter corridor
        objects.push({ type: 'block', x: 184 * B, y: -B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 184 * B, y: -6 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'spike', x: 187 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 187 * B, y: -7 * B, width: B, height: B, direction: 'down' });
        objects.push({ type: 'block', x: 190 * B, y: -5 * B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 194 * B, y: -B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        // Gravity flip in wave
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_FLIP, x: 197 * B, y: -2 * B });
        objects.push({ type: 'block', x: 200 * B, y: -5 * B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 204 * B, y: -B, width: B, height: 2 * B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_NORMAL, x: 207 * B, y: -2 * B });
        // Coin 2: in the wave section gap
        objects.push({ type: 'coin', x: 192 * B, y: -4 * B, width: B, height: B });

        // ============================================================
        // ROBOT SECTION: Variable jump heights (x: 214-270)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.ROBOT, x: 214 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_TRIPLE, x: 215 * B, y: -2 * B });
        // Elevated platforms requiring precise jump heights
        objects.push({ type: 'spike', x: 220 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 221 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 224 * B, y: -3 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 225 * B, y: -3 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'spike', x: 225 * B, y: -4 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 228 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 229 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 230 * B, y: -B, width: B, height: B, direction: 'up' });
        // Red pad — strong bounce
        objects.push({ type: 'pad', padType: 'RED', x: 234 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        // High platform after red pad
        objects.push({ type: 'block', x: 237 * B, y: -4 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 238 * B, y: -4 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'spike', x: 241 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 242 * B, y: -B, width: B, height: B, direction: 'up' });
        // Green orb — combined effect
        objects.push({ type: 'orb', orbType: 'GREEN', x: 245 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 247 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 248 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 249 * B, y: -B, width: B, height: B, direction: 'up' });
        // Block staircase
        objects.push({ type: 'block', x: 253 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 254 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 254 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 255 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 255 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 255 * B, y: -3 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 258 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 259 * B, y: -B, width: B, height: B, direction: 'up' });
        // Blue pad — gravity flip pad
        objects.push({ type: 'pad', padType: 'BLUE', x: 262 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 265 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 266 * B, y: -B, width: B, height: B, direction: 'up' });

        // ============================================================
        // CUBE FINALE: Maximum intensity (x: 274-395)
        // ============================================================
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.CUBE, x: 274 * B, y: -2 * B });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_QUADRUPLE, x: 275 * B, y: -2 * B });
        // Dense spike patterns at max speed
        objects.push({ type: 'spike', x: 280 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 281 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 284 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 285 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 286 * B, y: -B, width: B, height: B, direction: 'up' });
        // Red orb
        objects.push({ type: 'orb', orbType: 'RED', x: 289 * B, y: -2.5 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 290 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 291 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 292 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 293 * B, y: -B, width: B, height: B, direction: 'up' });
        // Platform with spike on it
        objects.push({ type: 'block', x: 297 * B, y: -2 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'block', x: 298 * B, y: -2 * B, width: B, height: B, color: '#6a3a6a', solid: true });
        objects.push({ type: 'spike', x: 298 * B, y: -3 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 301 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 302 * B, y: -B, width: B, height: B, direction: 'up' });
        // Gravity flip section
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_FLIP, x: 305 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 308 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 309 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 312 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 313 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 314 * B, y: -7 * B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.GRAVITY_NORMAL, x: 317 * B, y: -2 * B });
        // Yellow pad bounce
        objects.push({ type: 'pad', padType: 'YELLOW', x: 320 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 322 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 323 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 324 * B, y: -B, width: B, height: B, direction: 'up' });
        // Spider pad
        objects.push({ type: 'pad', padType: 'SPIDER', x: 328 * B, y: -B * 0.4, width: B, height: B * 0.4 });
        objects.push({ type: 'spike', x: 330 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 331 * B, y: -B, width: B, height: B, direction: 'up' });
        // Dash orb
        objects.push({ type: 'orb', orbType: 'DASH', x: 334 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 336 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 337 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 338 * B, y: -B, width: B, height: B, direction: 'up' });
        // Block wall with gap
        objects.push({ type: 'block', x: 342 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 342 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 342 * B, y: -4 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 342 * B, y: -5 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        // Triple spike at max speed
        objects.push({ type: 'spike', x: 346 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 347 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 348 * B, y: -B, width: B, height: B, direction: 'up' });
        // Blue orb gravity flip
        objects.push({ type: 'orb', orbType: 'BLUE', x: 351 * B, y: -3 * B, width: B, height: B });
        objects.push({ type: 'spike', x: 353 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 354 * B, y: -B, width: B, height: B, direction: 'up' });
        // Final pillar gauntlet
        objects.push({ type: 'block', x: 358 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 358 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 360 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 361 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 362 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'block', x: 366 * B, y: -B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 366 * B, y: -2 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'block', x: 366 * B, y: -3 * B, width: B, height: B, color: '#4e2a4e', solid: true });
        objects.push({ type: 'spike', x: 369 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 370 * B, y: -B, width: B, height: B, direction: 'up' });
        // Coin 3: above the final triple spike — extremely risky
        objects.push({ type: 'coin', x: 361 * B, y: -4 * B, width: B, height: B });
        // Speed back to normal for ending
        objects.push({ type: 'portal', portalType: GD.PORTAL_TYPES.SPEED_NORMAL, x: 375 * B, y: -2 * B });
        objects.push({ type: 'spike', x: 380 * B, y: -B, width: B, height: B, direction: 'up' });
        objects.push({ type: 'spike', x: 381 * B, y: -B, width: B, height: B, direction: 'up' });
        // End marker
        objects.push({ type: 'block', x: 395 * B, y: -B, width: B * 3, height: B, color: '#ff00ff', solid: true });

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
