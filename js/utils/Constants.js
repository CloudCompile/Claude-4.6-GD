const GD = {
    // Physics constants - calibrated to match GD behavior
    BLOCK_SIZE: 30,           // Base unit size in pixels
    GRAVITY: 2600,            // Pixels/s² downward gravity
    JUMP_IMPULSE: -780,       // Pixels/s upward impulse for cube jump
    TERMINAL_VELOCITY: 1200,  // Max vertical speed
    
    // Speed multipliers (horizontal pixels/second at each speed portal level)
    SPEEDS: {
        HALF: 311.58,     // 0.5x
        NORMAL: 623.16,   // 1x
        DOUBLE: 829.38,   // 2x
        TRIPLE: 1035.60,  // 3x
        QUADRUPLE: 1243.28 // 4x
    },
    
    SPEED_LABELS: ['0.5x', '1x', '2x', '3x', '4x'],
    SPEED_VALUES: [311.58, 623.16, 829.38, 1035.60, 1243.28],
    SPEED_KEYS: ['HALF', 'NORMAL', 'DOUBLE', 'TRIPLE', 'QUADRUPLE'],
    
    // Player dimensions
    PLAYER_SIZE: 30,
    PLAYER_MINI_SIZE: 18,
    
    // Ship mode
    SHIP_GRAVITY: 1800,
    SHIP_THRUST: -3200,
    SHIP_TERMINAL: 800,
    
    // Ball mode
    BALL_GRAVITY: 2600,
    
    // UFO mode
    UFO_GRAVITY: 2400,
    UFO_BOOST: -500,
    
    // Wave mode
    WAVE_SLOPE: 1.0, // tan(45°) = 1
    
    // Robot mode
    ROBOT_MIN_JUMP: -600,
    ROBOT_MAX_JUMP: -1000,
    ROBOT_CHARGE_TIME: 0.25, // seconds to reach max jump
    
    // Spider mode
    SPIDER_SNAP_SPEED: 3000, // Speed for instant teleport
    
    // Swing mode
    SWING_GRAVITY: 2200,
    SWING_IMPULSE: -650,
    
    // Orb impulses
    ORBS: {
        YELLOW: { impulse: -780, gravityFlip: false },
        PINK: { impulse: -560, gravityFlip: false },
        RED: { impulse: -1000, gravityFlip: false },
        BLUE: { impulse: -780, gravityFlip: true },
        GREEN: { impulse: -780, gravityFlip: true },
        BLACK: { impulse: 780, gravityFlip: false },   // Force downward
        SPIDER: { impulse: 0, gravityFlip: true, spider: true },
        DASH: { impulse: -780, gravityFlip: false, dash: true },
        TRIGGER: { impulse: 0, gravityFlip: false, trigger: true }
    },
    
    // Pad impulses
    PADS: {
        YELLOW: { impulse: -900, gravityFlip: false },
        PINK: { impulse: -650, gravityFlip: false },
        RED: { impulse: -1100, gravityFlip: false },
        BLUE: { impulse: 0, gravityFlip: true },
        SPIDER: { impulse: 0, gravityFlip: true, spider: true },
        DASH: { impulse: -900, gravityFlip: false, dash: true }
    },
    
    // Game modes enum
    MODES: {
        CUBE: 'cube',
        SHIP: 'ship',
        BALL: 'ball',
        UFO: 'ufo',
        WAVE: 'wave',
        ROBOT: 'robot',
        SPIDER: 'spider',
        SWING: 'swing'
    },
    
    // Portal types
    PORTAL_TYPES: {
        CUBE: 'mode_cube',
        SHIP: 'mode_ship',
        BALL: 'mode_ball',
        UFO: 'mode_ufo',
        WAVE: 'mode_wave',
        ROBOT: 'mode_robot',
        SPIDER: 'mode_spider',
        SWING: 'mode_swing',
        GRAVITY_FLIP: 'gravity_flip',
        GRAVITY_NORMAL: 'gravity_normal',
        SPEED_HALF: 'speed_half',
        SPEED_NORMAL: 'speed_normal',
        SPEED_DOUBLE: 'speed_double',
        SPEED_TRIPLE: 'speed_triple',
        SPEED_QUADRUPLE: 'speed_quadruple',
        SIZE_MINI: 'size_mini',
        SIZE_NORMAL: 'size_normal',
        MIRROR: 'mirror',
        DUAL: 'dual',
        DUAL_OFF: 'dual_off',
        TELEPORT: 'teleport'
    },
    
    // Trigger types
    TRIGGER_TYPES: {
        MOVE: 'move',
        ROTATE: 'rotate',
        ALPHA: 'alpha',
        COLOR: 'color',
        PULSE: 'pulse',
        TOGGLE: 'toggle',
        SPAWN: 'spawn',
        CAMERA: 'camera',
        SONG: 'song',
        RANDOM: 'random'
    },
    
    // Difficulty ratings
    DIFFICULTIES: {
        AUTO: { name: 'Auto', stars: 1, color: '#aaa', icon: '⚙️' },
        EASY: { name: 'Easy', stars: 2, color: '#00ccff', icon: '😊' },
        NORMAL: { name: 'Normal', stars: 3, color: '#00ff00', icon: '😐' },
        HARD: { name: 'Hard', stars: 4, color: '#ffaa00', icon: '😠' },
        HARDER: { name: 'Harder', stars: 5, color: '#ff6600', icon: '😡' },
        INSANE: { name: 'Insane', stars: 6, color: '#ff00ff', icon: '🤬' },
        EASY_DEMON: { name: 'Easy Demon', stars: 10, color: '#ff0000', icon: '👿' },
        MEDIUM_DEMON: { name: 'Medium Demon', stars: 10, color: '#ff0000', icon: '👿' },
        HARD_DEMON: { name: 'Hard Demon', stars: 10, color: '#ff0000', icon: '👿' },
        INSANE_DEMON: { name: 'Insane Demon', stars: 10, color: '#ff0000', icon: '👿' },
        EXTREME_DEMON: { name: 'Extreme Demon', stars: 10, color: '#ff0000', icon: '👿' }
    },
    
    // Colors
    COLORS: {
        BG_DEFAULT: '#0a0a2e',
        GROUND_DEFAULT: '#1a1a5e',
        PLAYER_PRIMARY: '#00ff00',
        PLAYER_SECONDARY: '#00cc00',
        HAZARD: '#ff0000',
        ORB_YELLOW: '#ffff00',
        ORB_PINK: '#ff66ff',
        ORB_RED: '#ff0000',
        ORB_BLUE: '#0088ff',
        ORB_GREEN: '#00ff00',
        ORB_BLACK: '#333333',
        ORB_SPIDER: '#cc00ff',
        ORB_DASH: '#00ffcc',
        PAD_YELLOW: '#ffff00',
        PAD_PINK: '#ff66ff',
        PAD_RED: '#ff0000',
        PAD_BLUE: '#0088ff',
        PORTAL_CUBE: '#00ff00',
        PORTAL_SHIP: '#ff8800',
        PORTAL_BALL: '#ff4400',
        PORTAL_UFO: '#ffff00',
        PORTAL_WAVE: '#00ffff',
        PORTAL_ROBOT: '#8888ff',
        PORTAL_SPIDER: '#cc00ff',
        PORTAL_SWING: '#ff00ff',
        PORTAL_GRAVITY: '#0088ff',
        PORTAL_SPEED: '#ffaa00',
        PORTAL_SIZE: '#ff66ff',
        PORTAL_MIRROR: '#ffffff',
        PORTAL_DUAL: '#ffff00',
        PORTAL_TELEPORT: '#00ffcc'
    },
    
    // Ground Y position
    GROUND_Y: 0,  // Set dynamically based on canvas
    CEILING_Y: 0, // Set dynamically based on canvas
    
    // Rendering
    CAMERA_OFFSET_X: 0.3, // Player at 30% from left
    
    // Audio
    DEFAULT_BPM: 120,
    
    // Level
    MAX_LEVEL_LENGTH: 100000 // blocks
};
