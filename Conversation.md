

Settings

Clear
You
TARGET:

Generate a complete playable Geometry Dash clone from scratch in HTML5/JavaScript (or a modern web engine like Phaser 3, PlayCanvas, or similar).

REQUIREMENT:

Use real verified Geometry Dash mechanics as documented by the official Geometry Dash Wiki and creator documentation. Do NOT invent new mechanics unless clearly marked optional.

SOURCES YOUR OUTPUT SHOULD INCORPORATE:

Controls, vehicles, portals, triggers
https://geometryjump.fandom.com/wiki/How_to_Play%3F

Official levels and mechanics
https://geometry-dash.fandom.com/wiki/Levels

Object and orb behavior
https://www.gdcreatorschool.com/basics/the-gd-editor/advanced-editor/gameplay-objects

Difficulty system
https://gdwik.fandom.com/wiki/Difficulty

OBJECTIVE:

Build:

• Runnable game code
• Physics engine
• All game modes
• All orb/pad types
• All portal types
• All major triggers
• Level loader
• Music beat sync system
• UI system
• Technical documentation

CORE MECHANICS DEFINITIONS (MUST IMPLEMENT EXACTLY)

The following mechanics must be coded exactly as described:

GAME MODES (Vehicles)

Each mode must include:

Input behavior

Physics parameters

Transition handling

Collision model

1. Cube

Tap = jump

Affected by gravity

Fixed jump impulse

Dies on hazard collision

2. Ship

Hold = ascend

Release = descend

Continuous thrust system

Gravity constantly applied downward

3. Ball

Tap = flip gravity

Rolls on surfaces

Momentum preserved when flipping

4. UFO

Tap = small upward boost

Each tap adds vertical impulse

No hold mechanic

5. Wave

Hold = move diagonally up

Release = move diagonally down

Constant 45° angle movement

Instant direction switching

6. Robot

Variable jump height based on hold duration

Similar to cube but scalable impulse

7. Spider

Tap = instant teleport to opposite surface

Immediate gravity inversion

No arc jump

8. Swing (2.2+)

Tap toggles gravity direction mid-air

Continuous arc motion

ORBS (Require Input While Touching)

Each orb must include:

Activation window

Velocity modification

Gravity behavior

Sound + visual effect

Yellow Orb

Standard jump boost

Pink Orb

Weaker jump boost

Red Orb

Stronger jump boost

Blue Orb

Flip gravity instantly

Green Orb

Jump boost + gravity flip

Black Orb

Force downward bounce

Spider Orb

Teleport flip like spider mode

Dash Orb

Launch player in fixed direction while held

Trigger Orb

Activates assigned trigger group

PADS (Auto Activate on Contact)

Same behavior as matching orb, but:

No input required

Activates immediately

Implement:

Yellow Pad

Pink Pad

Red Pad

Blue Pad

Spider Pad

Dash Pad

PORTALS

Portals automatically activate when passed through.

Mode Portals

Switch player to:
Cube, Ship, Ball, UFO, Wave, Robot, Spider, Swing

Gravity Portal

Flip gravity

Speed Portals

Implement speed multipliers:

0.5×

1×

2×

3×

4×

Modify horizontal velocity and physics timing accordingly.

Size Portals

Mini mode (smaller hitbox, lower jump)

Normal size

Mirror Portal

Reverse visual direction

Dual Portal

Spawn second synchronized player

Teleport Portal

Warp to linked portal location

TRIGGERS

Triggers operate via group IDs.

Each trigger must include:

Activation condition

Duration

Target group

Easing type (if applicable)

Implement:

Move Trigger

Moves objects over time

Rotate Trigger

Rotates objects

Alpha Trigger

Changes transparency

Color Trigger

Changes object color channel

Pulse Trigger

Temporary color/brightness pulse

Toggle Trigger

Enable/disable object group

Spawn Trigger

Delayed activation of group

Camera Trigger

Zoom, offset, follow mode

Song Trigger

Change song or song section

Random Trigger

Randomly activates target groups

PHYSICS SYSTEM

Define:

Gravity constant

Jump impulse

Terminal velocity

Collision detection (AABB or SAT)

Frame-rate independent motion (deltaTime based)

Horizontal speed must be controlled by speed portals.

LEVEL FORMAT

Define JSON schema:

{
"metadata": {},
"music": {},
"speed": {},
"objects": [],
"triggers": [],
"portals": [],
"orbs": [],
"pads": []
}

Include sample levels modeled after:

Stereo Madness

Back On Track

Electrodynamix

MUSIC & BEAT SYSTEM

Implement:

Audio loader

Beat timestamp array

Optional automatic BPM detection

Sync objects to nearest beat

Objects must support:

beatSnap: true/false

beatOffset value

UI SYSTEM

Implement:

Title Screen

Level Select

Practice Mode

Pause Menu

Death counter

Progress bar

PROGRESSION SYSTEM

Implement:

Difficulty rating

Star rewards

Coin collection

Unlockable icons

Mana orb tracking

Save system (local storage)

DOCUMENTATION OUTPUT

Generate:

Full project structure

Complete source code

Markdown technical specification

Physics equations

Orb behavior tables

Portal transition diagrams

Trigger flowcharts

Development checklist

OUTPUT REQUIREMENTS

Return:

• All JS source files
• Config files
• Level JSON files
• README with install instructions

Project must run with:
Just opening the file in a browser

No placeholder logic. All systems functional.
Assistant


# Geometry Dash Clone - Complete Implementation

## Project Structure

```
geometry-dash-clone/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── engine/
│   │   ├── Game.js
│   │   ├── Physics.js
│   │   ├── Renderer.js
│   │   ├── Input.js
│   │   ├── Audio.js
│   │   ├── Camera.js
│   │   └── CollisionSystem.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── GameObject.js
│   │   ├── Hazard.js
│   │   └── DualPlayer.js
│   ├── modes/
│   │   ├── GameMode.js
│   │   ├── CubeMode.js
│   │   ├── ShipMode.js
│   │   ├── BallMode.js
│   │   ├── UFOMode.js
│   │   ├── WaveMode.js
│   │   ├── RobotMode.js
│   │   ├── SpiderMode.js
│   │   └── SwingMode.js
│   ├── objects/
│   │   ├── Orb.js
│   │   ├── Pad.js
│   │   ├── Portal.js
│   │   └── Trigger.js
│   ├── triggers/
│   │   ├── TriggerSystem.js
│   │   ├── MoveTrigger.js
│   │   ├── RotateTrigger.js
│   │   ├── AlphaTrigger.js
│   │   ├── ColorTrigger.js
│   │   ├── PulseTrigger.js
│   │   ├── ToggleTrigger.js
│   │   ├── SpawnTrigger.js
│   │   ├── CameraTrigger.js
│   │   ├── SongTrigger.js
│   │   └── RandomTrigger.js
│   ├── ui/
│   │   ├── UIManager.js
│   │   ├── TitleScreen.js
│   │   ├── LevelSelect.js
│   │   ├── PauseMenu.js
│   │   ├── PracticeMode.js
│   │   └── ProgressBar.js
│   ├── levels/
│   │   ├── LevelLoader.js
│   │   ├── LevelParser.js
│   │   └── LevelValidator.js
│   ├── progression/
│   │   ├── SaveSystem.js
│   │   ├── ProgressionManager.js
│   │   └── UnlockSystem.js
│   └── utils/
│       ├── Constants.js
│       ├── Easing.js
│       ├── MathUtils.js
│       └── ColorUtils.js
├── levels/
│   ├── stereo_madness.json
│   ├── back_on_track.json
│   └── electrodynamix.json
├── assets/
│   └── (generated procedurally)
└── README.md
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geometry Dash Clone</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <div id="ui-overlay">
        <div id="title-screen" class="ui-screen active">
            <h1 class="game-title">GEOMETRY DASH</h1>
            <div class="menu-buttons">
                <button id="btn-play" class="menu-btn">PLAY</button>
                <button id="btn-icons" class="menu-btn">ICONS</button>
                <button id="btn-settings" class="menu-btn">SETTINGS</button>
            </div>
            <div class="stats-bar">
                <span id="star-count">⭐ 0</span>
                <span id="coin-count">🪙 0</span>
                <span id="mana-count">💎 0</span>
            </div>
        </div>
        <div id="level-select" class="ui-screen">
            <h2>SELECT LEVEL</h2>
            <div id="level-list" class="level-grid"></div>
            <button id="btn-back-levels" class="menu-btn back-btn">BACK</button>
        </div>
        <div id="icon-select" class="ui-screen">
            <h2>ICONS</h2>
            <div id="icon-grid" class="icon-grid"></div>
            <button id="btn-back-icons" class="menu-btn back-btn">BACK</button>
        </div>
        <div id="pause-menu" class="ui-screen">
            <h2>PAUSED</h2>
            <button id="btn-resume" class="menu-btn">RESUME</button>
            <button id="btn-practice" class="menu-btn">PRACTICE MODE</button>
            <button id="btn-restart" class="menu-btn">RESTART</button>
            <button id="btn-quit" class="menu-btn">QUIT</button>
        </div>
        <div id="death-screen" class="ui-screen">
            <h2 id="death-text">YOU CRASHED!</h2>
            <p id="attempt-count">Attempt 1</p>
            <button id="btn-retry" class="menu-btn">RETRY</button>
        </div>
        <div id="complete-screen" class="ui-screen">
            <h2>LEVEL COMPLETE!</h2>
            <div id="complete-stats"></div>
            <button id="btn-next" class="menu-btn">CONTINUE</button>
        </div>
        <div id="hud" class="ui-hud">
            <div id="progress-bar-container">
                <div id="progress-bar-fill"></div>
                <span id="progress-text">0%</span>
            </div>
            <span id="hud-attempts" class="hud-text"></span>
        </div>
        <div id="settings-screen" class="ui-screen">
            <h2>SETTINGS</h2>
            <div class="setting-row">
                <label>Music Volume</label>
                <input type="range" id="music-vol" min="0" max="100" value="80">
            </div>
            <div class="setting-row">
                <label>SFX Volume</label>
                <input type="range" id="sfx-vol" min="0" max="100" value="80">
            </div>
            <div class="setting-row">
                <label>Show FPS</label>
                <input type="checkbox" id="show-fps">
            </div>
            <button id="btn-back-settings" class="menu-btn back-btn">BACK</button>
        </div>
    </div>
    <div id="fps-counter" style="display:none;"></div>

    <!-- Utils -->
    <script src="js/utils/Constants.js"></script>
    <script src="js/utils/Easing.js"></script>
    <script src="js/utils/MathUtils.js"></script>
    <script src="js/utils/ColorUtils.js"></script>

    <!-- Engine -->
    <script src="js/engine/Input.js"></script>
    <script src="js/engine/Audio.js"></script>
    <script src="js/engine/CollisionSystem.js"></script>
    <script src="js/engine/Physics.js"></script>
    <script src="js/engine/Camera.js"></script>
    <script src="js/engine/Renderer.js"></script>

    <!-- Entities -->
    <script src="js/entities/GameObject.js"></script>
    <script src="js/entities/Hazard.js"></script>
    <script src="js/entities/Player.js"></script>
    <script src="js/entities/DualPlayer.js"></script>

    <!-- Game Modes -->
    <script src="js/modes/GameMode.js"></script>
    <script src="js/modes/CubeMode.js"></script>
    <script src="js/modes/ShipMode.js"></script>
    <script src="js/modes/BallMode.js"></script>
    <script src="js/modes/UFOMode.js"></script>
    <script src="js/modes/WaveMode.js"></script>
    <script src="js/modes/RobotMode.js"></script>
    <script src="js/modes/SpiderMode.js"></script>
    <script src="js/modes/SwingMode.js"></script>

    <!-- Objects -->
    <script src="js/objects/Orb.js"></script>
    <script src="js/objects/Pad.js"></script>
    <script src="js/objects/Portal.js"></script>
    <script src="js/objects/Trigger.js"></script>

    <!-- Triggers -->
    <script src="js/triggers/TriggerSystem.js"></script>
    <script src="js/triggers/MoveTrigger.js"></script>
    <script src="js/triggers/RotateTrigger.js"></script>
    <script src="js/triggers/AlphaTrigger.js"></script>
    <script src="js/triggers/ColorTrigger.js"></script>
    <script src="js/triggers/PulseTrigger.js"></script>
    <script src="js/triggers/ToggleTrigger.js"></script>
    <script src="js/triggers/SpawnTrigger.js"></script>
    <script src="js/triggers/CameraTrigger.js"></script>
    <script src="js/triggers/SongTrigger.js"></script>
    <script src="js/triggers/RandomTrigger.js"></script>

    <!-- Levels -->
    <script src="js/levels/LevelValidator.js"></script>
    <script src="js/levels/LevelParser.js"></script>
    <script src="js/levels/LevelLoader.js"></script>

    <!-- UI -->
    <script src="js/ui/ProgressBar.js"></script>
    <script src="js/ui/TitleScreen.js"></script>
    <script src="js/ui/LevelSelect.js"></script>
    <script src="js/ui/PauseMenu.js"></script>
    <script src="js/ui/PracticeMode.js"></script>
    <script src="js/ui/UIManager.js"></script>

    <!-- Progression -->
    <script src="js/progression/SaveSystem.js"></script>
    <script src="js/progression/UnlockSystem.js"></script>
    <script src="js/progression/ProgressionManager.js"></script>

    <!-- Game & Main -->
    <script src="js/engine/Game.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

---

## css/style.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #000;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    user-select: none;
    -webkit-user-select: none;
}

#gameCanvas {
    display: block;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

#ui-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    pointer-events: none;
}

.ui-screen {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    background: rgba(0, 0, 20, 0.92);
    color: #fff;
    animation: fadeIn 0.3s ease;
}

.ui-screen.active {
    display: flex;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.game-title {
    font-size: 72px;
    font-weight: 900;
    letter-spacing: 8px;
    background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00, #00ff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    margin-bottom: 50px;
    animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
}

.menu-btn {
    background: linear-gradient(135deg, #1a1a3e, #2d2d6e);
    border: 2px solid #4444aa;
    color: #fff;
    padding: 15px 60px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 3px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    min-width: 250px;
    text-align: center;
    pointer-events: auto;
}

.menu-btn:hover {
    background: linear-gradient(135deg, #2d2d6e, #4444aa);
    border-color: #6666dd;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(68, 68, 170, 0.5);
}

.menu-btn:active {
    transform: scale(0.98);
}

.back-btn {
    margin-top: 30px;
    padding: 10px 40px;
    font-size: 16px;
    min-width: 150px;
}

.stats-bar {
    position: absolute;
    bottom: 30px;
    display: flex;
    gap: 30px;
    font-size: 20px;
    font-weight: 600;
}

.level-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    max-height: 60vh;
    overflow-y: auto;
}

.level-card {
    background: linear-gradient(135deg, #1a1a3e, #2d2d6e);
    border: 2px solid #4444aa;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    pointer-events: auto;
    min-width: 200px;
}

.level-card:hover {
    border-color: #6666dd;
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(68, 68, 170, 0.5);
}

.level-card .level-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
}

.level-card .level-difficulty {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 5px;
}

.level-card .level-progress {
    font-size: 12px;
    color: #88ff88;
}

.level-card .difficulty-icon {
    font-size: 32px;
    margin-bottom: 10px;
}

.icon-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    padding: 20px;
    max-width: 600px;
}

.icon-item {
    width: 50px;
    height: 50px;
    border: 2px solid #444;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: all 0.2s;
    pointer-events: auto;
    background: #1a1a3e;
}

.icon-item:hover {
    border-color: #6666dd;
    transform: scale(1.1);
}

.icon-item.selected {
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.icon-item.locked {
    opacity: 0.3;
    cursor: not-allowed;
}

.ui-hud {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    pointer-events: none;
    z-index: 15;
}

.ui-hud.active {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#progress-bar-container {
    width: 300px;
    height: 8px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

#progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ff00, #00ffaa);
    border-radius: 4px;
    width: 0%;
    transition: width 0.1s linear;
}

#progress-text {
    position: absolute;
    right: -45px;
    top: -5px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
}

.hud-text {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 350px;
    margin: 15px 0;
    font-size: 18px;
}

.setting-row input[type="range"] {
    width: 180px;
    accent-color: #4444aa;
}

.setting-row input[type="checkbox"] {
    width: 22px;
    height: 22px;
    accent-color: #4444aa;
}

#fps-counter {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #0f0;
    font-size: 12px;
    font-family: monospace;
    z-index: 20;
    pointer-events: none;
}

#death-screen h2 {
    font-size: 48px;
    color: #ff4444;
    margin-bottom: 10px;
}

#complete-screen h2 {
    font-size: 48px;
    color: #44ff44;
    margin-bottom: 20px;
}

#complete-stats {
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 1.8;
}

/* Practice mode checkpoint indicator */
.practice-indicator {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffff00;
    font-size: 16px;
    font-weight: 600;
    pointer-events: none;
    z-index: 15;
}

/* Scrollbar styling */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #111;
}
::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
}
```

---

## js/utils/Constants.js

```javascript
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
```

---

## js/utils/Easing.js

```javascript
const Easing = {
    linear(t) { return t; },
    
    easeInSine(t) { return 1 - Math.cos((t * Math.PI) / 2); },
    easeOutSine(t) { return Math.sin((t * Math.PI) / 2); },
    easeInOutSine(t) { return -(Math.cos(Math.PI * t) - 1) / 2; },
    
    easeInQuad(t) { return t * t; },
    easeOutQuad(t) { return 1 - (1 - t) * (1 - t); },
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    
    easeInCubic(t) { return t * t * t; },
    easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    
    easeInQuart(t) { return t * t * t * t; },
    easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; },
    
    easeInExpo(t) { return t === 0 ? 0 : Math.pow(2, 10 * t - 10); },
    easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    easeInOutExpo(t) {
        if (t === 0) return 0;
        if (t === 1) return 1;
        return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
    
    easeInElastic(t) {
        if (t === 0 || t === 1) return t;
        return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
    },
    easeOutElastic(t) {
        if (t === 0 || t === 1) return t;
        return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    },
    easeInOutElastic(t) {
        if (t === 0 || t === 1) return t;
        return t < 0.5
            ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2
            : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 + 1;
    },
    
    easeInBounce(t) { return 1 - Easing.easeOutBounce(1 - t); },
    easeOutBounce(t) {
        const n1 = 7.5625, d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    easeInOutBounce(t) {
        return t < 0.5
            ? (1 - Easing.easeOutBounce(1 - 2 * t)) / 2
            : (1 + Easing.easeOutBounce(2 * t - 1)) / 2;
    },
    
    // Get easing function by name
    get(name) {
        return this[name] || this.linear;
    }
};
```

---

## js/utils/MathUtils.js

```javascript
const MathUtils = {
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    lerp(a, b, t) {
        return a + (b - a) * t;
    },
    
    inverseLerp(a, b, value) {
        if (a === b) return 0;
        return (value - a) / (b - a);
    },
    
    remap(inMin, inMax, outMin, outMax, value) {
        const t = MathUtils.inverseLerp(inMin, inMax, value);
        return MathUtils.lerp(outMin, outMax, t);
    },
    
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },
    
    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },
    
    randomRange(min, max) {
        return min + Math.random() * (max - min);
    },
    
    randomInt(min, max) {
        return Math.floor(MathUtils.randomRange(min, max + 1));
    },
    
    // AABB collision detection
    aabbOverlap(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    },
    
    // Point inside AABB
    pointInRect(px, py, rect) {
        return px >= rect.x && px <= rect.x + rect.width &&
               py >= rect.y && py <= rect.y + rect.height;
    },
    
    // Shrink hitbox for more forgiving collision
    shrinkRect(rect, amount) {
        return {
            x: rect.x + amount,
            y: rect.y + amount,
            width: rect.width - amount * 2,
            height: rect.height - amount * 2
        };
    },
    
    // Rotate point around center
    rotatePoint(x, y, cx, cy, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const dx = x - cx;
        const dy = y - cy;
        return {
            x: cx + dx * cos - dy * sin,
            y: cy + dx * sin + dy * cos
        };
    },
    
    // Snap to grid
    snapToGrid(value, gridSize) {
        return Math.round(value / gridSize) * gridSize;
    }
};
```

---

## js/utils/ColorUtils.js

```javascript
const ColorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    },
    
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = Math.round(MathUtils.clamp(x, 0, 255)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },
    
    rgbToString(r, g, b, a = 1) {
        if (a < 1) return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
        return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
    },
    
    lerpColor(color1, color2, t) {
        const c1 = typeof color1 === 'string' ? ColorUtils.hexToRgb(color1) : color1;
        const c2 = typeof color2 === 'string' ? ColorUtils.hexToRgb(color2) : color2;
        return {
            r: MathUtils.lerp(c1.r, c2.r, t),
            g: MathUtils.lerp(c1.g, c2.g, t),
            b: MathUtils.lerp(c1.b, c2.b, t)
        };
    },
    
    brighten(hex, factor) {
        const c = ColorUtils.hexToRgb(hex);
        return ColorUtils.rgbToHex(
            Math.min(255, c.r + (255 - c.r) * factor),
            Math.min(255, c.g + (255 - c.g) * factor),
            Math.min(255, c.b + (255 - c.b) * factor)
        );
    },
    
    darken(hex, factor) {
        const c = ColorUtils.hexToRgb(hex);
        return ColorUtils.rgbToHex(
            c.r * (1 - factor),
            c.g * (1 - factor),
            c.b * (1 - factor)
        );
    },
    
    hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) { r = g = b = l; }
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: r * 255, g: g * 255, b: b * 255 };
    },
    
    pulseColor(baseHex, intensity, time) {
        const base = ColorUtils.hexToRgb(baseHex);
        const pulse = (Math.sin(time * 6) + 1) / 2 * intensity;
        return ColorUtils.rgbToString(
            Math.min(255, base.r + pulse * 100),
            Math.min(255, base.g + pulse * 100),
            Math.min(255, base.b + pulse * 100)
        );
    }
};
```

---

## js/engine/Input.js

```javascript
class Input {
    constructor() {
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        this.holdTime = 0;
        this._wasPressed = false;
        this._rawPressed = false;
        
        this._bindEvents();
    }
    
    _bindEvents() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                this._rawPressed = true;
            }
            if (e.code === 'Escape') {
                if (this.onPause) this.onPause();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                this._rawPressed = false;
            }
        });
        
        // Mouse
        const canvas = document.getElementById('gameCanvas');
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this._rawPressed = true;
            }
        });
        
        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this._rawPressed = false;
            }
        });
        
        // Touch
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this._rawPressed = true;
        }, { passive: false });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this._rawPressed = false;
        }, { passive: false });
        
        canvas.addEventListener('touchcancel', () => {
            this._rawPressed = false;
        });
        
        // Prevent context menu
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Lose focus
        window.addEventListener('blur', () => {
            this._rawPressed = false;
        });
    }
    
    update(dt) {
        this.justPressed = this._rawPressed && !this._wasPressed;
        this.justReleased = !this._rawPressed && this._wasPressed;
        this.pressed = this._rawPressed;
        
        if (this.pressed) {
            this.holdTime += dt;
        } else {
            this.holdTime = 0;
        }
        
        this._wasPressed = this._rawPressed;
    }
    
    reset() {
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        this.holdTime = 0;
        this._wasPressed = false;
        this._rawPressed = false;
    }
}
```

---

## js/engine/Audio.js

```javascript
class AudioManager {
    constructor() {
        this.context = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.currentMusic = null;
        this.musicSource = null;
        this.musicVolume = 0.8;
        this.sfxVolume = 0.8;
        this.beats = [];
        this.bpm = GD.DEFAULT_BPM;
        this.musicStartTime = 0;
        this.musicOffset = 0;
        this.isPlaying = false;
        

You
Continue
Assistant


## js/engine/Audio.js (continued)

```javascript
        this._sfxBuffers = {};
        this._initialized = false;
    }
    
    async init() {
        if (this._initialized) return;
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.musicGain = this.context.createGain();
            this.musicGain.gain.value = this.musicVolume;
            this.musicGain.connect(this.context.destination);
            
            this.sfxGain = this.context.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.context.destination);
            
            this._generateSFX();
            this._initialized = true;
        } catch (e) {
            console.warn('Audio initialization failed:', e);
        }
    }
    
    _generateSFX() {
        // Generate all sound effects procedurally
        this._sfxBuffers.jump = this._createToneBuffer(440, 0.08, 'square', 0.3, 600);
        this._sfxBuffers.death = this._createNoiseBuffer(0.3, 0.5);
        this._sfxBuffers.orb = this._createToneBuffer(660, 0.06, 'sine', 0.3, 880);
        this._sfxBuffers.pad = this._createToneBuffer(550, 0.07, 'sine', 0.25, 770);
        this._sfxBuffers.portal = this._createToneBuffer(330, 0.15, 'triangle', 0.2, 660);
        this._sfxBuffers.coin = this._createToneBuffer(880, 0.12, 'sine', 0.3, 1320);
        this._sfxBuffers.complete = this._createToneBuffer(440, 0.5, 'sine', 0.3, 880);
        this._sfxBuffers.click = this._createToneBuffer(1000, 0.03, 'square', 0.15);
        this._sfxBuffers.gravityFlip = this._createToneBuffer(300, 0.1, 'triangle', 0.2, 500);
        this._sfxBuffers.checkpoint = this._createToneBuffer(600, 0.1, 'sine', 0.2, 800);
    }
    
    _createToneBuffer(freq, duration, type, volume, freqEnd) {
        const sampleRate = this.context.sampleRate;
        const length = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const progress = i / length;
            const currentFreq = freqEnd ? freq + (freqEnd - freq) * progress : freq;
            const envelope = (1 - progress) * volume;
            
            let sample;
            const phase = 2 * Math.PI * currentFreq * t;
            switch (type) {
                case 'square':
                    sample = Math.sin(phase) > 0 ? 1 : -1;
                    break;
                case 'triangle':
                    sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
                    break;
                case 'sawtooth':
                    sample = 2 * (t * currentFreq - Math.floor(0.5 + t * currentFreq));
                    break;
                default: // sine
                    sample = Math.sin(phase);
            }
            data[i] = sample * envelope;
        }
        return buffer;
    }
    
    _createNoiseBuffer(duration, volume) {
        const sampleRate = this.context.sampleRate;
        const length = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const progress = i / length;
            const envelope = (1 - progress) * volume;
            data[i] = (Math.random() * 2 - 1) * envelope;
        }
        return buffer;
    }
    
    playSFX(name) {
        if (!this._initialized || !this._sfxBuffers[name]) return;
        if (this.context.state === 'suspended') this.context.resume();
        
        const source = this.context.createBufferSource();
        source.buffer = this._sfxBuffers[name];
        source.connect(this.sfxGain);
        source.start(0);
    }
    
    generateMusic(bpm, duration, style = 'electronic') {
        if (!this._initialized) return null;
        
        this.bpm = bpm;
        const sampleRate = this.context.sampleRate;
        const totalSamples = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(2, totalSamples, sampleRate);
        const leftData = buffer.getChannelData(0);
        const rightData = buffer.getChannelData(1);
        
        const beatInterval = 60 / bpm;
        this.beats = [];
        
        for (let t = 0; t < duration; t += beatInterval) {
            this.beats.push(t);
        }
        
        // Generate procedural music based on style
        const baseFreq = style === 'electronic' ? 130.81 : 110; // C3 or A2
        
        // Chord progression (I-V-vi-IV in C)
        const chords = [
            [130.81, 164.81, 196.00], // C
            [196.00, 246.94, 293.66], // G
            [220.00, 261.63, 329.63], // Am
            [174.61, 220.00, 261.63]  // F
        ];
        
        for (let i = 0; i < totalSamples; i++) {
            const t = i / sampleRate;
            const beatPos = (t / beatInterval) % 4;
            const chordIndex = Math.floor((t / (beatInterval * 4)) % 4);
            const chord = chords[chordIndex];
            
            let sample = 0;
            
            // Bass line (sawtooth)
            const bassFreq = chord[0] / 2;
            const bassEnv = 1 - ((t % beatInterval) / beatInterval) * 0.7;
            sample += Math.sin(2 * Math.PI * bassFreq * t) * 0.15 * bassEnv;
            sample += (2 * (t * bassFreq - Math.floor(0.5 + t * bassFreq))) * 0.05 * bassEnv;
            
            // Kick drum on beats
            const kickPhase = (t % beatInterval);
            if (kickPhase < 0.1) {
                const kickFreq = 150 * Math.exp(-kickPhase * 40);
                const kickEnv = Math.exp(-kickPhase * 30);
                sample += Math.sin(2 * Math.PI * kickFreq * kickPhase) * 0.3 * kickEnv;
            }
            
            // Hi-hat on off-beats
            const halfBeat = beatInterval / 2;
            const hihatPhase = (t % halfBeat);
            if (hihatPhase < 0.02) {
                sample += (Math.random() * 2 - 1) * 0.08 * (1 - hihatPhase / 0.02);
            }
            
            // Snare on beats 2 and 4
            const measurePos = t % (beatInterval * 4);
            const snareBeats = [beatInterval, beatInterval * 3];
            for (const sb of snareBeats) {
                const snarePhase = measurePos - sb;
                if (snarePhase >= 0 && snarePhase < 0.08) {
                    const snareEnv = Math.exp(-snarePhase * 40);
                    sample += (Math.random() * 2 - 1) * 0.12 * snareEnv;
                    sample += Math.sin(2 * Math.PI * 200 * snarePhase) * 0.08 * snareEnv;
                }
            }
            
            // Chords (pad sound)
            for (const freq of chord) {
                sample += Math.sin(2 * Math.PI * freq * t) * 0.04;
                sample += Math.sin(2 * Math.PI * freq * 2 * t) * 0.02;
            }
            
            // Melody (simple arpeggio)
            const arpIndex = Math.floor((t / (beatInterval / 4)) % 3);
            const melodyFreq = chord[arpIndex] * 2;
            const arpPhase = (t % (beatInterval / 4)) / (beatInterval / 4);
            const arpEnv = Math.exp(-arpPhase * 5);
            sample += Math.sin(2 * Math.PI * melodyFreq * t) * 0.06 * arpEnv;
            
            // Soft clip
            sample = Math.tanh(sample * 1.5) * 0.8;
            
            leftData[i] = sample;
            rightData[i] = sample;
        }
        
        return buffer;
    }
    
    playMusic(buffer, offset = 0) {
        this.stopMusic();
        if (!this._initialized || !buffer) return;
        if (this.context.state === 'suspended') this.context.resume();
        
        this.musicSource = this.context.createBufferSource();
        this.musicSource.buffer = buffer;
        this.musicSource.loop = true;
        this.musicSource.connect(this.musicGain);
        this.musicSource.start(0, offset);
        this.musicStartTime = this.context.currentTime - offset;
        this.musicOffset = offset;
        this.currentMusic = buffer;
        this.isPlaying = true;
    }
    
    stopMusic() {
        if (this.musicSource) {
            try { this.musicSource.stop(); } catch (e) {}
            this.musicSource = null;
        }
        this.isPlaying = false;
    }
    
    pauseMusic() {
        if (this.isPlaying && this.context) {
            this.musicOffset = this.getMusicTime();
            this.stopMusic();
        }
    }
    
    resumeMusic() {
        if (!this.isPlaying && this.currentMusic) {
            this.playMusic(this.currentMusic, this.musicOffset);
        }
    }
    
    getMusicTime() {
        if (!this.isPlaying || !this.context) return 0;
        return this.context.currentTime - this.musicStartTime;
    }
    
    getCurrentBeat() {
        const time = this.getMusicTime();
        const beatInterval = 60 / this.bpm;
        return time / beatInterval;
    }
    
    getNearestBeatTime(time) {
        if (this.beats.length === 0) return 0;
        let nearest = this.beats[0];
        let minDist = Math.abs(time - nearest);
        for (const beat of this.beats) {
            const dist = Math.abs(time - beat);
            if (dist < minDist) {
                minDist = dist;
                nearest = beat;
            }
        }
        return nearest;
    }
    
    snapToNearestBeat(time) {
        const beatInterval = 60 / this.bpm;
        return Math.round(time / beatInterval) * beatInterval;
    }
    
    setMusicVolume(vol) {
        this.musicVolume = MathUtils.clamp(vol, 0, 1);
        if (this.musicGain) this.musicGain.gain.value = this.musicVolume;
    }
    
    setSFXVolume(vol) {
        this.sfxVolume = MathUtils.clamp(vol, 0, 1);
        if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume;
    }
    
    // Simple BPM detection from buffer
    detectBPM(buffer) {
        if (!buffer) return GD.DEFAULT_BPM;
        const data = buffer.getChannelData(0);
        const sampleRate = buffer.sampleRate;
        
        // Analyze energy peaks
        const windowSize = Math.floor(sampleRate * 0.01); // 10ms windows
        const energies = [];
        
        for (let i = 0; i < data.length - windowSize; i += windowSize) {
            let energy = 0;
            for (let j = 0; j < windowSize; j++) {
                energy += data[i + j] * data[i + j];
            }
            energies.push(energy / windowSize);
        }
        
        // Find peaks
        const threshold = energies.reduce((a, b) => a + b, 0) / energies.length * 1.5;
        const peaks = [];
        for (let i = 1; i < energies.length - 1; i++) {
            if (energies[i] > threshold && energies[i] > energies[i-1] && energies[i] > energies[i+1]) {
                peaks.push(i * 0.01);
            }
        }
        
        if (peaks.length < 2) return GD.DEFAULT_BPM;
        
        // Calculate average interval
        const intervals = [];
        for (let i = 1; i < peaks.length; i++) {
            intervals.push(peaks[i] - peaks[i-1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        
        let bpm = 60 / avgInterval;
        // Normalize to reasonable range
        while (bpm < 80) bpm *= 2;
        while (bpm > 200) bpm /= 2;
        
        return Math.round(bpm);
    }
}
```

---

## js/engine/CollisionSystem.js

```javascript
class CollisionSystem {
    constructor() {
        this.spatialGrid = new Map();
        this.cellSize = GD.BLOCK_SIZE * 4;
    }
    
    clear() {
        this.spatialGrid.clear();
    }
    
    _getCellKey(x, y) {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        return `${cx},${cy}`;
    }
    
    insertObject(obj) {
        const startCX = Math.floor(obj.x / this.cellSize);
        const endCX = Math.floor((obj.x + obj.width) / this.cellSize);
        const startCY = Math.floor(obj.y / this.cellSize);
        const endCY = Math.floor((obj.y + obj.height) / this.cellSize);
        
        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                const key = `${cx},${cy}`;
                if (!this.spatialGrid.has(key)) {
                    this.spatialGrid.set(key, []);
                }
                this.spatialGrid.get(key).push(obj);
            }
        }
    }
    
    buildGrid(objects) {
        this.clear();
        for (const obj of objects) {
            if (obj.active !== false) {
                this.insertObject(obj);
            }
        }
    }
    
    query(rect) {
        const results = new Set();
        const startCX = Math.floor(rect.x / this.cellSize);
        const endCX = Math.floor((rect.x + rect.width) / this.cellSize);
        const startCY = Math.floor(rect.y / this.cellSize);
        const endCY = Math.floor((rect.y + rect.height) / this.cellSize);
        
        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                const key = `${cx},${cy}`;
                const cell = this.spatialGrid.get(key);
                if (cell) {
                    for (const obj of cell) {
                        results.add(obj);
                    }
                }
            }
        }
        return Array.from(results);
    }
    
    // AABB collision test
    testAABB(a, b) {
        return MathUtils.aabbOverlap(a, b);
    }
    
    // Get collision response (push-out vector)
    resolveAABB(moving, stationary) {
        const overlapX = Math.min(
            moving.x + moving.width - stationary.x,
            stationary.x + stationary.width - moving.x
        );
        const overlapY = Math.min(
            moving.y + moving.height - stationary.y,
            stationary.y + stationary.height - moving.y
        );
        
        if (overlapX < overlapY) {
            // Push horizontally
            const pushX = (moving.x + moving.width / 2) < (stationary.x + stationary.width / 2)
                ? -overlapX : overlapX;
            return { x: pushX, y: 0, axis: 'x' };
        } else {
            // Push vertically
            const pushY = (moving.y + moving.height / 2) < (stationary.y + stationary.height / 2)
                ? -overlapY : overlapY;
            return { x: 0, y: pushY, axis: 'y' };
        }
    }
    
    // SAT collision for rotated objects
    testSAT(polyA, polyB) {
        const axes = [...this._getAxes(polyA), ...this._getAxes(polyB)];
        
        for (const axis of axes) {
            const projA = this._project(polyA, axis);
            const projB = this._project(polyB, axis);
            
            if (projA.max < projB.min || projB.max < projA.min) {
                return false; // Separating axis found
            }
        }
        return true; // No separating axis = collision
    }
    
    _getAxes(polygon) {
        const axes = [];
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
            // Normal (perpendicular)
            const len = Math.sqrt(edge.x * edge.x + edge.y * edge.y);
            axes.push({ x: -edge.y / len, y: edge.x / len });
        }
        return axes;
    }
    
    _project(polygon, axis) {
        let min = Infinity, max = -Infinity;
        for (const point of polygon) {
            const dot = point.x * axis.x + point.y * axis.y;
            min = Math.min(min, dot);
            max = Math.max(max, dot);
        }
        return { min, max };
    }
    
    // Get rotated polygon from rect
    getRotatedRect(x, y, w, h, angle) {
        const cx = x + w / 2;
        const cy = y + h / 2;
        const corners = [
            { x: x, y: y },
            { x: x + w, y: y },
            { x: x + w, y: y + h },
            { x: x, y: y + h }
        ];
        return corners.map(c => MathUtils.rotatePoint(c.x, c.y, cx, cy, angle));
    }
    
    // Triangle hitbox for spikes
    getTriangleHitbox(x, y, size, direction = 'up') {
        switch (direction) {
            case 'up':
                return [
                    { x: x + size / 2, y: y },
                    { x: x + size, y: y + size },
                    { x: x, y: y + size }
                ];
            case 'down':
                return [
                    { x: x, y: y },
                    { x: x + size, y: y },
                    { x: x + size / 2, y: y + size }
                ];
            case 'left':
                return [
                    { x: x, y: y + size / 2 },
                    { x: x + size, y: y },
                    { x: x + size, y: y + size }
                ];
            case 'right':
                return [
                    { x: x, y: y },
                    { x: x, y: y + size },
                    { x: x + size, y: y + size / 2 }
                ];
        }
    }
    
    // Point in triangle test
    pointInTriangle(px, py, triangle) {
        const [a, b, c] = triangle;
        const d1 = this._sign(px, py, a.x, a.y, b.x, b.y);
        const d2 = this._sign(px, py, b.x, b.y, c.x, c.y);
        const d3 = this._sign(px, py, c.x, c.y, a.x, a.y);
        const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(hasNeg && hasPos);
    }
    
    _sign(x1, y1, x2, y2, x3, y3) {
        return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
    }
    
    // AABB vs Triangle
    testAABBTriangle(rect, triangle) {
        // Quick AABB check first
        const triMinX = Math.min(triangle[0].x, triangle[1].x, triangle[2].x);
        const triMaxX = Math.max(triangle[0].x, triangle[1].x, triangle[2].x);
        const triMinY = Math.min(triangle[0].y, triangle[1].y, triangle[2].y);
        const triMaxY = Math.max(triangle[0].y, triangle[1].y, triangle[2].y);
        
        if (rect.x + rect.width <= triMinX || rect.x >= triMaxX ||
            rect.y + rect.height <= triMinY || rect.y >= triMaxY) {
            return false;
        }
        
        // Check if any corner of rect is in triangle
        const corners = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height }
        ];
        
        for (const c of corners) {
            if (this.pointInTriangle(c.x, c.y, triangle)) return true;
        }
        
        // Use SAT for precise detection
        const rectPoly = [corners[0], corners[1], corners[2], corners[3]];
        return this.testSAT(rectPoly, triangle);
    }
}
```

---

## js/engine/Physics.js

```javascript
class Physics {
    constructor() {
        this.gravity = GD.GRAVITY;
        this.terminalVelocity = GD.TERMINAL_VELOCITY;
    }
    
    applyGravity(entity, dt, gravityMultiplier = 1) {
        const grav = this.gravity * entity.gravityDirection * gravityMultiplier;
        entity.velocityY += grav * dt;
        
        // Clamp to terminal velocity
        entity.velocityY = MathUtils.clamp(
            entity.velocityY,
            -this.terminalVelocity,
            this.terminalVelocity
        );
    }
    
    applyVelocity(entity, dt) {
        entity.x += entity.velocityX * dt;
        entity.y += entity.velocityY * dt;
    }
    
    applyJumpImpulse(entity, impulse) {
        entity.velocityY = impulse * entity.gravityDirection;
        entity.onGround = false;
    }
    
    flipGravity(entity) {
        entity.gravityDirection *= -1;
    }
    
    // Ship physics
    applyShipPhysics(entity, dt, isThrusting) {
        const grav = GD.SHIP_GRAVITY * entity.gravityDirection;
        
        if (isThrusting) {
            entity.velocityY += GD.SHIP_THRUST * entity.gravityDirection * dt;
        }
        
        entity.velocityY += grav * dt;
        entity.velocityY = MathUtils.clamp(entity.velocityY, -GD.SHIP_TERMINAL, GD.SHIP_TERMINAL);
    }
    
    // UFO physics
    applyUFOBoost(entity) {
        entity.velocityY = GD.UFO_BOOST * entity.gravityDirection;
    }
    
    // Wave physics
    applyWavePhysics(entity, dt, isHolding) {
        const speed = entity.velocityX || GD.SPEEDS.NORMAL;
        if (isHolding) {
            entity.velocityY = -speed * GD.WAVE_SLOPE * entity.gravityDirection;
        } else {
            entity.velocityY = speed * GD.WAVE_SLOPE * entity.gravityDirection;
        }
    }
    
    // Robot physics
    applyRobotJump(entity, holdTime) {
        const t = MathUtils.clamp(holdTime / GD.ROBOT_CHARGE_TIME, 0, 1);
        const impulse = MathUtils.lerp(GD.ROBOT_MIN_JUMP, GD.ROBOT_MAX_JUMP, t);
        entity.velocityY = impulse * entity.gravityDirection;
        entity.onGround = false;
    }
    
    // Spider teleport
    spiderTeleport(entity, groundY, ceilingY) {
        entity.gravityDirection *= -1;
        
        if (entity.gravityDirection > 0) {
            // Now falling down - teleport to ceiling then fall
            entity.y = ceilingY;
        } else {
            // Now falling up - teleport to ground then rise
            entity.y = groundY - entity.height;
        }
        entity.velocityY = 0;
    }
    
    // Swing physics
    applySwingPhysics(entity, dt) {
        const grav = GD.SWING_GRAVITY * entity.gravityDirection;
        entity.velocityY += grav * dt;
        entity.velocityY = MathUtils.clamp(entity.velocityY, -this.terminalVelocity, this.terminalVelocity);
    }
    
    swingFlip(entity) {
        entity.gravityDirection *= -1;
        entity.velocityY = GD.SWING_IMPULSE * entity.gravityDirection;
    }
    
    // Ground collision resolution
    resolveGroundCollision(entity, groundY) {
        if (entity.gravityDirection > 0) {
            // Normal gravity - land on top
            if (entity.y + entity.height > groundY) {
                entity.y = groundY - entity.height;
                entity.velocityY = 0;
                entity.onGround = true;
                return true;
            }
        } else {
            // Flipped gravity - land on bottom (ceiling)
            if (entity.y < groundY) {
                entity.y = groundY;
                entity.velocityY = 0;
                entity.onGround = true;
                return true;
            }
        }
        return false;
    }
    
    // Check if entity is within bounds
    checkBounds(entity, minY, maxY) {
        if (entity.y + entity.height > maxY || entity.y < minY) {
            return false; // Out of bounds = death
        }
        return true;
    }
}
```

---

## js/engine/Camera.js

```javascript
class Camera {
    constructor(canvasWidth, canvasHeight) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.zoom = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.shakeAmount = 0;
        this.shakeDecay = 5;
        this.followPlayer = true;
        this.followY = false;
        this.smoothY = 0.05;
        this.mirrored = false;
    }
    
    update(playerX, playerY, dt) {
        // Horizontal follow
        if (this.followPlayer) {
            this.x = playerX - this.width * GD.CAMERA_OFFSET_X / this.zoom;
        }
        
        // Vertical follow (smooth)
        if (this.followY) {
            const targetY = playerY - this.height / 2 / this.zoom;
            this.y = MathUtils.lerp(this.y, targetY, this.smoothY);
        }
        
        // Smooth zoom
        if (Math.abs(this.zoom - this.targetZoom) > 0.001) {
            this.zoom = MathUtils.lerp(this.zoom, this.targetZoom, 0.05);
        }
        
        // Smooth offset
        this.offsetX = MathUtils.lerp(this.offsetX, this.targetOffsetX, 0.05);
        this.offsetY = MathUtils.lerp(this.offsetY, this.targetOffsetY, 0.05);
        
        // Screen shake
        if (this.shakeAmount > 0) {
            this.shakeAmount -= this.shakeDecay * dt;
            if (this.shakeAmount < 0) this.shakeAmount = 0;
        }
    }
    
    getShakeOffset() {
        if (this.shakeAmount <= 0) return { x: 0, y: 0 };
        return {
            x: (Math.random() - 0.5) * this.shakeAmount * 2,
            y: (Math.random() - 0.5) * this.shakeAmount * 2
        };
    }
    
    shake(amount) {
        this.shakeAmount = amount;
    }
    
    setZoom(zoom, instant = false) {
        this.targetZoom = zoom;
        if (instant) this.zoom = zoom;
    }
    
    setOffset(x, y, instant = false) {
        this.targetOffsetX = x;
        this.targetOffsetY = y;
        if (instant) {
            this.offsetX = x;
            this.offsetY = y;
        }
    }
    
    worldToScreen(worldX, worldY) {
        const shake = this.getShakeOffset();
        return {
            x: (worldX - this.x) * this.zoom + this.offsetX + shake.x,
            y: (worldY - this.y) * this.zoom + this.offsetY + shake.y
        };
    }
    
    screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.offsetX) / this.zoom + this.x,
            y: (screenY - this.offsetY) / this.zoom + this.y
        };
    }
    
    isVisible(x, y, width, height) {
        const margin = GD.BLOCK_SIZE * 2;
        return (
            x + width > this.x - margin &&
            x < this.x + this.width / this.zoom + margin &&
            y + height > this.y - margin &&
            y < this.y + this.height / this.zoom + margin
        );
    }
    
    resize(width, height) {
        this.width = width;
        this.height = height;
    }
    
    reset() {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.shakeAmount = 0;
        this.followY = false;
        this.mirrored = false;
    }
}
```

---

## js/engine/Renderer.js

```javascript
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        
        this._particlePool = [];
        this.particles = [];
        this.bgColor = GD.COLORS.BG_DEFAULT;
        this.groundColor = GD.COLORS.GROUND_DEFAULT;
        this.colorChannels = {};
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        GD.GROUND_Y = this.canvas.height * 0.75;
        GD.CEILING_Y = this.canvas.height * 0.1;
    }
    
    clear() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    beginFrame(camera) {
        this.clear();
        this.ctx.save();
        
        const shake = camera.getShakeOffset();
        
        if (camera.mirrored) {
            this.ctx.translate(this.canvas.width, 0);
            this.ctx.scale(-1, 1);
        }
        
        this.ctx.translate(shake.x, shake.y);
        this.ctx.scale(camera.zoom, camera.zoom);
        this.ctx.translate(-camera.x + camera.offsetX / camera.zoom, -camera.y + camera.offsetY / camera.zoom);
    }
    
    endFrame() {
        this.ctx.restore();
    }
    
    // Draw ground
    drawGround(camera, groundY, color) {
        const c = color || this.groundColor;
        this.ctx.fillStyle = c;
        this.ctx.fillRect(
            camera.x - 10,
            groundY,
            this.canvas.width / camera.zoom + 20,
            this.canvas.height
        );
        
        // Ground line
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.3);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(camera.x - 10, groundY);
        this.ctx.lineTo(camera.x + this.canvas.width / camera.zoom + 10, groundY);
        this.ctx.stroke();
        
        // Grid lines on ground
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.1);
        this.ctx.lineWidth = 0.5;
        const gridStart = Math.floor(camera.x / GD.BLOCK_SIZE) * GD.BLOCK_SIZE;
        for (let x = gridStart; x < camera.x + this.canvas.width / camera.zoom + GD.BLOCK_SIZE; x += GD.BLOCK_SIZE) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, groundY);
            this.ctx.lineTo(x, groundY + 200);
            this.ctx.stroke();
        }
    }
    
    // Draw ceiling
    drawCeiling(camera, ceilingY, color) {
        const c = color || this.groundColor;
        this.ctx.fillStyle = c;
        this.ctx.fillRect(
            camera.x - 10,
            ceilingY - this.canvas.height,
            this.canvas.width / camera.zoom + 20,
            this.canvas.height
        );
        
        this.ctx.strokeStyle = ColorUtils.brighten(c, 0.3);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(camera.x - 10, ceilingY);
        this.ctx.lineTo(camera.x + this.canvas.width / camera.zoom + 10, ceilingY);
        this.ctx.stroke();
    }
    
    // Draw background decorations
    drawBackground(camera, time) {
        // Floating squares in background
        this.ctx.globalAlpha = 0.05;
        const bgGridSize = GD.BLOCK_SIZE * 3;
        const startX = Math.floor(camera.x / bgGridSize) * bgGridSize;
        const startY = Math.floor(camera.y / bgGridSize) * bgGridSize;
        
        for (let x = startX; x < camera.x + this.canvas.width / camera.zoom; x += bgGridSize) {
            for (let y = startY; y < camera.y + this.canvas.height / camera.zoom; y += bgGridSize) {
                const offset = Math.sin(x * 0.01 + time) * 5;
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + offset, y + offset, bgGridSize * 0.3, bgGridSize * 0.3);
            }
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Draw player
    drawPlayer(player, mode, time) {
        const { x, y, width, height, gravityDirection, rotation } = player;
        const cx = x + width / 2;
        const cy = y + height / 2;
        
        this.ctx.save();
        this.ctx.translate(cx, cy);
        
        if (gravityDirection < 0) {
            this.ctx.scale(1, -1);
        }
        
        this.ctx.rotate(rotation || 0);
        
        const halfW = width / 2;
        const halfH = height / 2;
        const primaryColor = player.primaryColor || GD.COLORS.PLAYER_PRIMARY;
        const secondaryColor = player.secondaryColor || GD.COLORS.PLAYER_SECONDARY;
        
        switch (mode) {
            case GD.MODES.CUBE:
                this._drawCube(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SHIP:
                this._drawShip(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.BALL:
                this._drawBall(0, 0, width / 2, primaryColor, secondaryColor, time);
                break;
            case GD.MODES.UFO:
                this._drawUFO(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.WAVE:
                this._drawWave(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.ROBOT:
                this._drawRobot(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SPIDER:
                this._drawSpider(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
            case GD.MODES.SWING:
                this._drawSwing(-halfW, -halfH, width, height, primaryColor, secondaryColor);
                break;
        }
        
        this.ctx.restore();
        
        // Trail effect
        if (player.trail && player.trail.length > 0) {
            this._drawTrail(player.trail, primaryColor);
        }
    }
    
    _drawCube(x, y, w, h, primary, secondary) {
        // Main body
        this.ctx.fillStyle = primary;
        this.ctx.fillRect(x, y, w, h);
        
        // Inner detail
        this.ctx.fillStyle = secondary;
        const inset = w * 0.2;
        this.ctx.fillRect(x + inset, y + inset, w - inset * 2, h - inset * 2);
        
        // Eye

You
Continue
Assistant


## js/engine/Renderer.js (continued)

```javascript
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x + w * 0.55, y + h * 0.25, w * 0.25, h * 0.25);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x + w * 0.62, y + h * 0.3, w * 0.12, h * 0.15);
        
        // Border
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, w, h);
    }
    
    _drawShip(x, y, w, h, primary, secondary) {
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w, y + h / 2);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + w * 0.2, y + h / 2);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w * 0.8, y + h / 2);
        this.ctx.lineTo(x + w * 0.2, y + h * 0.2);
        this.ctx.lineTo(x + w * 0.3, y + h / 2);
        this.ctx.lineTo(x + w * 0.2, y + h * 0.8);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cockpit
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.6, y + h / 2, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w, y + h / 2);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + w * 0.2, y + h / 2);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    _drawBall(cx, cy, r, primary, secondary, time) {
        // Outer circle
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner circle
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Cross pattern
        this.ctx.strokeStyle = primary;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx - r * 0.4, cy);
        this.ctx.lineTo(cx + r * 0.4, cy);
        this.ctx.moveTo(cx, cy - r * 0.4);
        this.ctx.lineTo(cx, cy + r * 0.4);
        this.ctx.stroke();
        
        // Border
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    _drawUFO(x, y, w, h, primary, secondary) {
        // Dome
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h * 0.45, w * 0.35, Math.PI, 0);
        this.ctx.fill();
        
        // Body
        this.ctx.fillStyle = secondary;
        this.ctx.beginPath();
        this.ctx.ellipse(x + w / 2, y + h * 0.5, w / 2, h * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bottom light
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w * 0.35, y + h * 0.6);
        this.ctx.lineTo(x + w * 0.65, y + h * 0.6);
        this.ctx.lineTo(x + w * 0.55, y + h);
        this.ctx.lineTo(x + w * 0.45, y + h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        
        // Eye
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.55, y + h * 0.35, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.57, y + h * 0.35, w * 0.05, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawWave(x, y, w, h, primary, secondary) {
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h);
        this.ctx.lineTo(x, y + h / 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = secondary;
        const inset = w * 0.2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y + inset);
        this.ctx.lineTo(x + w - inset, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h - inset);
        this.ctx.lineTo(x + inset, y + h / 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w, y + h / 2);
        this.ctx.lineTo(x + w / 2, y + h);
        this.ctx.lineTo(x, y + h / 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    _drawRobot(x, y, w, h, primary, secondary) {
        // Legs
        this.ctx.fillStyle = secondary;
        this.ctx.fillRect(x + w * 0.15, y + h * 0.7, w * 0.25, h * 0.3);
        this.ctx.fillRect(x + w * 0.6, y + h * 0.7, w * 0.25, h * 0.3);
        
        // Body
        this.ctx.fillStyle = primary;
        this.ctx.fillRect(x + w * 0.1, y + h * 0.2, w * 0.8, h * 0.55);
        
        // Head
        this.ctx.fillStyle = secondary;
        this.ctx.fillRect(x + w * 0.2, y, w * 0.6, h * 0.3);
        
        // Eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x + w * 0.3, y + h * 0.08, w * 0.15, h * 0.12);
        this.ctx.fillRect(x + w * 0.55, y + h * 0.08, w * 0.15, h * 0.12);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x + w * 0.35, y + h * 0.1, w * 0.08, h * 0.08);
        this.ctx.fillRect(x + w * 0.6, y + h * 0.1, w * 0.08, h * 0.08);
        
        // Antenna
        this.ctx.strokeStyle = primary;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w / 2, y - h * 0.15);
        this.ctx.stroke();
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y - h * 0.15, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawSpider(x, y, w, h, primary, secondary) {
        // Body
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h / 2, w * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Legs
        this.ctx.strokeStyle = secondary;
        this.ctx.lineWidth = 2;
        const legAngles = [-0.8, -0.4, 0.4, 0.8];
        for (const angle of legAngles) {
            const lx = x + w / 2 + Math.cos(angle - 0.5) * w * 0.35;
            const ly = y + h / 2 + Math.sin(angle - 0.5) * h * 0.35;
            this.ctx.beginPath();
            this.ctx.moveTo(x + w / 2, y + h / 2);
            this.ctx.lineTo(lx + Math.cos(angle) * w * 0.3, ly - h * 0.1);
            this.ctx.lineTo(lx + Math.cos(angle) * w * 0.4, ly + h * 0.2);
            this.ctx.stroke();
            
            // Mirror
            const rlx = x + w / 2 + Math.cos(Math.PI - angle + 0.5) * w * 0.35;
            const rly = y + h / 2 + Math.sin(Math.PI - angle + 0.5) * h * 0.35;
            this.ctx.beginPath();
            this.ctx.moveTo(x + w / 2, y + h / 2);
            this.ctx.lineTo(rlx + Math.cos(Math.PI - angle) * w * 0.3, rly - h * 0.1);
            this.ctx.lineTo(rlx + Math.cos(Math.PI - angle) * w * 0.4, rly + h * 0.2);
            this.ctx.stroke();
        }
        
        // Eyes
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.4, y + h * 0.4, w * 0.08, 0, Math.PI * 2);
        this.ctx.arc(x + w * 0.6, y + h * 0.4, w * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawSwing(x, y, w, h, primary, secondary) {
        // Wing shape
        this.ctx.fillStyle = primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.quadraticCurveTo(x + w, y, x + w, y + h / 2);
        this.ctx.quadraticCurveTo(x + w, y + h, x + w / 2, y + h);
        this.ctx.quadraticCurveTo(x, y + h, x, y + h / 2);
        this.ctx.quadraticCurveTo(x, y, x + w / 2, y);
        this.ctx.fill();
        
        // Inner
        this.ctx.fillStyle = secondary;
        const inset = w * 0.15;
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h / 2, w * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.55, y + h * 0.4, w * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + w * 0.57, y + h * 0.4, w * 0.05, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    _drawTrail(trail, color) {
        if (trail.length < 2) return;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
            this.ctx.lineTo(trail[i].x, trail[i].y);
        }
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }
    
    // Draw game objects
    drawBlock(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        const color = obj.color || '#4444aa';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        // Highlight
        this.ctx.fillStyle = ColorUtils.brighten(color, 0.2);
        this.ctx.fillRect(obj.x, obj.y, obj.width, 3);
        this.ctx.fillRect(obj.x, obj.y, 3, obj.height);
        
        // Shadow
        this.ctx.fillStyle = ColorUtils.darken(color, 0.3);
        this.ctx.fillRect(obj.x, obj.y + obj.height - 3, obj.width, 3);
        this.ctx.fillRect(obj.x + obj.width - 3, obj.y, 3, obj.height);
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawSpike(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const direction = obj.direction || 'up';
        const color = obj.color || '#ff4444';
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        
        switch (direction) {
            case 'up':
                this.ctx.moveTo(obj.x + obj.width / 2, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
                this.ctx.lineTo(obj.x, obj.y + obj.height);
                break;
            case 'down':
                this.ctx.moveTo(obj.x, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y);
                this.ctx.lineTo(obj.x + obj.width / 2, obj.y + obj.height);
                break;
            case 'left':
                this.ctx.moveTo(obj.x, obj.y + obj.height / 2);
                this.ctx.lineTo(obj.x + obj.width, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
                break;
            case 'right':
                this.ctx.moveTo(obj.x, obj.y);
                this.ctx.lineTo(obj.x + obj.width, obj.y + obj.height / 2);
                this.ctx.lineTo(obj.x, obj.y + obj.height);
                break;
        }
        
        this.ctx.closePath();
        this.ctx.fill();
        
        // Border
        this.ctx.strokeStyle = ColorUtils.darken(color, 0.3);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawOrb(orb, time) {
        const alpha = orb.alpha !== undefined ? orb.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const cx = orb.x + orb.width / 2;
        const cy = orb.y + orb.height / 2;
        const r = orb.width / 2;
        const pulse = Math.sin(time * 5) * 0.15 + 0.85;
        
        // Glow
        this.ctx.globalAlpha = 0.3 * alpha;
        this.ctx.fillStyle = orb.color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.5 * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ring
        this.ctx.globalAlpha = 0.6 * alpha;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Core
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = orb.color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner highlight
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 0.5 * alpha;
        this.ctx.beginPath();
        this.ctx.arc(cx - r * 0.15, cy - r * 0.15, r * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.globalAlpha = 1;
    }
    
    drawPad(pad, time) {
        const alpha = pad.alpha !== undefined ? pad.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const pulse = Math.sin(time * 4) * 0.1 + 0.9;
        
        // Base
        this.ctx.fillStyle = ColorUtils.darken(pad.color, 0.4);
        this.ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
        
        // Top glow
        this.ctx.fillStyle = pad.color;
        this.ctx.fillRect(pad.x + 2, pad.y, pad.width - 4, pad.height * 0.4);
        
        // Pulse line
        this.ctx.globalAlpha = pulse * alpha;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(pad.x + 4, pad.y + 1, pad.width - 8, 2);
        
        this.ctx.globalAlpha = 1;
    }
    
    drawPortal(portal, time) {
        const alpha = portal.alpha !== undefined ? portal.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        const cx = portal.x + portal.width / 2;
        const cy = portal.y + portal.height / 2;
        const rw = portal.width / 2;
        const rh = portal.height / 2;
        const pulse = Math.sin(time * 3) * 0.1 + 0.9;
        
        // Outer glow
        this.ctx.globalAlpha = 0.2 * alpha;
        this.ctx.fillStyle = portal.color;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw * 1.3 * pulse, rh * 1.3 * pulse, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Main shape
        this.ctx.globalAlpha = 0.7 * alpha;
        this.ctx.fillStyle = portal.color;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = ColorUtils.brighten(portal.color, 0.4);
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rw * 0.5, rh * 0.5, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Spinning particles
        for (let i = 0; i < 4; i++) {
            const angle = time * 3 + (i * Math.PI / 2);
            const px = cx + Math.cos(angle) * rw * 0.7;
            const py = cy + Math.sin(angle) * rh * 0.7;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = 0.6 * alpha;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawTrigger(trigger) {
        // Triggers are invisible in gameplay, only show in editor
        if (!trigger.showInEditor) return;
        
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = '#ff8800';
        this.ctx.fillRect(trigger.x, trigger.y, trigger.width, trigger.height);
        this.ctx.strokeStyle = '#ffaa00';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(trigger.x, trigger.y, trigger.width, trigger.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '8px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(trigger.triggerType || 'T', trigger.x + trigger.width / 2, trigger.y + trigger.height / 2 + 3);
        
        this.ctx.globalAlpha = 1;
    }
    
    drawDecoration(obj) {
        const alpha = obj.alpha !== undefined ? obj.alpha : 1;
        this.ctx.globalAlpha = alpha;
        
        this.ctx.save();
        if (obj.rotation) {
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            this.ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
        }
        
        this.ctx.fillStyle = obj.color || '#666666';
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    
    drawCoin(coin, time) {
        if (coin.collected) return;
        
        const cx = coin.x + coin.width / 2;
        const cy = coin.y + coin.height / 2;
        const r = coin.width / 2;
        const pulse = Math.sin(time * 4) * 0.1 + 0.9;
        
        // Glow
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = '#ffdd00';
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 1.4 * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Coin body
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffdd00';
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner circle
        this.ctx.strokeStyle = '#cc9900';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Star
        this.ctx.fillStyle = '#cc9900';
        this.ctx.font = `${r}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('★', cx, cy);
    }
    
    // Particle system
    spawnParticles(x, y, color, count = 10, speed = 200) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * speed * 2,
                vy: (Math.random() - 0.5) * speed * 2,
                life: 0.5 + Math.random() * 0.5,
                maxLife: 0.5 + Math.random() * 0.5,
                size: 2 + Math.random() * 4,
                color: color
            });
        }
    }
    
    updateParticles(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 400 * dt; // gravity on particles
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        for (const p of this.particles) {
            const alpha = p.life / p.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Draw attempt death effect
    drawDeathEffect(x, y, time, color) {
        const progress = Math.min(time * 3, 1);
        const count = 12;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const dist = progress * 100;
            const px = x + Math.cos(angle) * dist;
            const py = y + Math.sin(angle) * dist;
            const size = (1 - progress) * 8;
            
            this.ctx.globalAlpha = 1 - progress;
            this.ctx.fillStyle = color || GD.COLORS.PLAYER_PRIMARY;
            this.ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Set color channel
    setColorChannel(channelId, color) {
        this.colorChannels[channelId] = color;
    }
    
    getColorChannel(channelId) {
        return this.colorChannels[channelId] || '#ffffff';
    }
    
    setBGColor(color) {
        this.bgColor = color;
    }
    
    setGroundColor(color) {
        this.groundColor = color;
    }
}
```

---

## js/entities/GameObject.js

```javascript
class GameObject {
    constructor(config = {}) {
        this.id = config.id || Math.random().toString(36).substr(2, 9);
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.type = config.type || 'block'; // block, spike, decoration, slope
        this.color = config.color || '#4444aa';
        this.rotation = config.rotation || 0;
        this.alpha = config.alpha !== undefined ? config.alpha : 1;
        this.active = config.active !== undefined ? config.active : true;
        this.visible = config.visible !== undefined ? config.visible : true;
        this.solid = config.solid !== undefined ? config.solid : true;
        this.hazard = config.hazard || false;
        this.direction = config.direction || 'up'; // for spikes
        this.groupId = config.groupId || null;
        this.groups = config.groups || [];
        this.colorChannel = config.colorChannel || null;
        this.zOrder = config.zOrder || 0;
        this.beatSnap = config.beatSnap || false;
        this.beatOffset = config.beatOffset || 0;
        
        // For movement/animation
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseRotation = this.rotation;
        this.baseAlpha = this.alpha;
        
        // Trigger offsets
        this.triggerOffsetX = 0;
        this.triggerOffsetY = 0;
        this.triggerRotation = 0;
        this.triggerAlpha = 0;
    }
    
    getRect() {
        return {
            x: this.x + this.triggerOffsetX,
            y: this.y + this.triggerOffsetY,
            width: this.width,
            height: this.height
        };
    }
    
    getHitbox() {
        if (this.type === 'spike') {
            // Slightly forgiving spike hitbox
            const shrink = this.width * 0.15;
            return MathUtils.shrinkRect(this.getRect(), shrink);
        }
        return this.getRect();
    }
    
    getTriangleHitbox() {
        if (this.type !== 'spike') return null;
        const r = this.getRect();
        return new CollisionSystem().getTriangleHitbox(r.x, r.y, r.width, this.direction);
    }
    
    update(dt) {
        // Apply trigger offsets to actual position
        this.x = this.baseX + this.triggerOffsetX;
        this.y = this.baseY + this.triggerOffsetY;
        this.rotation = this.baseRotation + this.triggerRotation;
        this.alpha = MathUtils.clamp(this.baseAlpha + this.triggerAlpha, 0, 1);
    }
    
    resetTriggerState() {
        this.triggerOffsetX = 0;
        this.triggerOffsetY = 0;
        this.triggerRotation = 0;
        this.triggerAlpha = 0;
        this.x = this.baseX;
        this.y = this.baseY;
        this.rotation = this.baseRotation;
        this.alpha = this.baseAlpha;
    }
    
    isInGroup(groupId) {
        return this.groupId === groupId || this.groups.includes(groupId);
    }
}
```

---

## js/entities/Hazard.js

```javascript
class Hazard extends GameObject {
    constructor(config = {}) {
        super(config);
        this.hazard = true;
        this.type = config.type || 'spike';
        this.color = config.color || GD.COLORS.HAZARD;
        this.solid = false; // Hazards kill, not collide solidly
        this.direction = config.direction || 'up';
        this.sawBlade = config.sawBlade || false;
        this.rotationSpeed = config.rotationSpeed || 0;
    }
    
    update(dt) {
        super.update(dt);
        if (this.sawBlade && this.rotationSpeed) {
            this.rotation += this.rotationSpeed * dt;
        }
    }
    
    getHitbox() {
        const rect = this.getRect();
        // Spikes have forgiving hitboxes (inner 70%)
        const shrink = this.width * 0.15;
        return {
            x: rect.x + shrink,
            y: rect.y + shrink,
            width: rect.width - shrink * 2,
            height: rect.height - shrink * 2
        };
    }
}
```

---

## js/entities/Player.js

```javascript
class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = GD.PLAYER_SIZE;
        this.height = GD.PLAYER_SIZE;
        this.velocityX = GD.SPEEDS.NORMAL;
        this.velocityY = 0;
        this.gravityDirection = 1; // 1 = down, -1 = up
        this.onGround = false;
        this.isDead = false;
        this.rotation = 0;
        this.rotationSpeed = 0;
        
        this.mode = GD.MODES.CUBE;
        this.mini = false;
        this.dual = false;
        this.speedIndex = 1; // Index into SPEED_VALUES
        
        this.primaryColor = GD.COLORS.PLAYER_PRIMARY;
        this.secondaryColor = GD.COLORS.PLAYER_SECONDARY;
        this.iconId = 0;
        
        // Trail
        this.trail = [];
        this.trailMaxLength = 20;
        this.trailTimer = 0;
        
        // Orb interaction
        this.canActivateOrb = false;
        this.currentOrb = null;
        this.orbActivated = false;
        
        // Robot hold tracking
        this.robotHoldTime = 0;
        this.robotJumping = false;
        
        // Dash orb state
        this.dashing = false;
        this.dashDirection = { x: 0, y: 0 };
        this.dashTimer = 0;
        
        // Death effect
        this.deathEffectTimer = 0;
        this.deathX = 0;
        this.deathY = 0;
        
        // Practice mode
        this.checkpointX = 0;
        this.checkpointY = 0;
        this.checkpointVelY = 0;
        this.checkpointGravDir = 1;
        this.checkpointMode = GD.MODES.CUBE;
        this.checkpointMini = false;
        this.checkpointSpeedIndex = 1;
    }
    
    reset(startX, startY) {
        this.x = startX || 0;
        this.y = startY || GD.GROUND_Y - GD.PLAYER_SIZE;
        this.velocityY = 0;
        this.gravityDirection = 1;
        this.onGround = false;
        this.isDead = false;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.mode = GD.MODES.CUBE;
        this.mini = false;
        this.dual = false;
        this.speedIndex = 1;
        this.velocityX = GD.SPEED_VALUES[this.speedIndex];
        this.width = GD.PLAYER_SIZE;
        this.height = GD.PLAYER_SIZE;
        this.trail = [];
        this.canActivateOrb = false;
        this.currentOrb = null;
        this.orbActivated = false;
        this.robotHoldTime = 0;
        this.robotJumping = false;
        this.dashing = false;
        this.deathEffectTimer = 0;
    }
    
    setSpeed(speedIndex) {
        this.speedIndex = MathUtils.clamp(speedIndex, 0, GD.SPEED_VALUES.length - 1);
        this.velocityX = GD.SPEED_VALUES[this.speedIndex];
    }
    
    setMini(isMini) {
        this.mini = isMini;
        if (isMini) {
            this.width = GD.PLAYER_MINI_SIZE;
            this.height = GD.PLAYER_MINI_SIZE;
        } else {
            this.width = GD.PLAYER_SIZE;
            this.height = GD.PLAYER_SIZE;
        }
    }
    
    setMode(mode) {
        this.mode = mode;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.robotHoldTime = 0;
        this.robotJumping = false;
    }
    
    getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    getHitbox() {
        // Slightly forgiving hitbox for player
        const shrink = this.width * 0.1;
        return {
            x: this.x + shrink,
            y: this.y + shrink,
            width: this.width - shrink * 2,
            height: this.height - shrink * 2
        };
    }
    
    getCenterX() { return this.x + this.width / 2; }
    getCenterY() { return this.y + this.height / 2; }
    
    updateTrail(dt) {
        this.trailTimer += dt;
        if (this.trailTimer >= 0.02) {
            this.trailTimer = 0;
            this.trail.push({
                x: this.getCenterX(),
                y: this.getCenterY()
            });
            if (this.trail.length > this.trailMaxLength) {
                this.trail.shift();
            }
        }
    }
    
    updateRotation(dt) {
        switch (this.mode) {
            case GD.MODES.CUBE:
                if (!this.onGround) {
                    // Rotate while in air
                    const targetRotSpeed = this.gravityDirection * Math.PI * 2 * (this.velocityX / GD.SPEEDS.NORMAL);
                    this.rotation += targetRotSpeed * dt;
                } else {
                    // Snap to nearest 90°
                    const target = Math.round(this.rotation / (Math.PI / 2)) * (Math.PI / 2);
                    this.rotation = MathUtils.lerp(this.rotation, target, 0.3);
                }
                break;
            case GD.MODES.SHIP:
            case GD.MODES.UFO:
            case GD.MODES.SWING:
                // Tilt based on vertical velocity
                const maxTilt = MathUtils.degToRad(30);
                const tilt = MathUtils.clamp(this.velocityY / 500, -1, 1) * maxTilt;
                this.rotation = MathUtils.lerp(this.rotation, tilt, 0.1);
                break;
            case GD.MODES.BALL:
                this.rotation += this.gravityDirection * Math.PI * 3 * dt;
                break;
            case GD.MODES.WAVE:
                // Diamond doesn't rotate
                this.rotation = 0;
                break;
            case GD.MODES.ROBOT:
                if (!this.onGround) {
                    this.rotation = MathUtils.lerp(this.rotation, 0, 0.1);
                } else {
                    this.rotation = 0;
                }
                break;
            case GD.MODES.SPIDER:
                this.rotation = 0;
                break;
        }
    }
    
    die() {
        this.isDead = true;
        this.deathX = this.getCenterX();
        this.deathY = this.getCenterY();
        this.deathEffectTimer = 0;
    }
    
    saveCheckpoint() {
        this.checkpointX = this.x;
        this.checkpointY = this.y;
        this.checkpointVelY = 0;
        this.checkpointGravDir = this.gravityDirection;
        this.checkpointMode = this.mode;
        this.checkpointMini = this.mini;
        this.checkpointSpeedIndex = this.speedIndex;
    }
    
    loadCheckpoint() {
        this.x = this.checkpointX;
        this.y = this.checkpointY;
        this.velocityY = this.checkpointVelY;
        this.gravityDirection = this.checkpointGravDir;
        this.mode = this.checkpointMode;
        this.setMini(this.checkpointMini);
        this.setSpeed(this.checkpointSpeedIndex);
        this.isDead = false;
        this.rotation = 0;
        this.onGround = false;
        this.trail = [];
        this.dashing = false;
    }
}
```

---

## js/entities/DualPlayer.js

```javascript
class DualPlayer {
    constructor(primaryPlayer) {
        this.primary = primaryPlayer;
        this.secondary = new Player();
        this.active = false;
        this.syncOffset = GD.BLOCK_SIZE * 4; // Vertical offset between dual players
    }
    
    activate() {
        this.active = true;
        this.secondary.x = this.primary.x;
        this.secondary.y = this.primary.y - this.syncOffset;
        this.secondary.velocityX = this.primary.velocityX;
        this.secondary.velocityY = this.primary.velocityY;
        this.secondary.mode = this.primary.mode;
        this.secondary.mini = this.primary.mini;
        this.secondary.speedIndex = this.primary.speedIndex;
        this.secondary.gravityDirection = -this.primary.gravityDirection; // Opposite gravity
        this.secondary.primaryColor = this.primary.secondaryColor;
        this.secondary.secondaryColor = this.primary.primaryColor;
    }
    
    deactivate() {
        this.active = false;
    }
    
    update(dt) {
        if (!this.active) return;
        
        // Secondary mirrors primary X position
        this.secondary.x = this.primary.x;
        this.secondary.velocityX = this.primary.velocityX;
    }
    
    isActive() {
        return this.active;
    }
}
```

---

## js/modes/GameMode.js

```javascript
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
```

---

## js/modes/CubeMode.js

```javascript
class CubeMode extends GameMode {
    constructor() {
        super(GD.MODES.CUBE);

You
Continue
Assistant


## js/modes/CubeMode.js (continued)

```javascript
    }
    
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
```

---

## js/modes/ShipMode.js

```javascript
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
```

---

## js/modes/BallMode.js

```javascript
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
```

---

## js/modes/UFOMode.js

```javascript
class UFOMode extends GameMode {
    constructor() {
        super(GD.MODES.UFO);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed) {
            physics.applyUFOBoost(player);
            player.onGround = false;
            return 'boost';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        physics.applyGravity(player, dt, GD.UFO_GRAVITY / GD.GRAVITY);
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
        
        // Ceiling clamp
        if (player.gravityDirection > 0 && player.y <= ceilingY) {
            player.y = ceilingY;
            player.velocityY = 0;
        } else if (player.gravityDirection < 0 && player.y + player.height >= groundY) {
            player.y = groundY - player.height;
            player.velocityY = 0;
        }
    }
    
    onEnter(player) {
        player.onGround = false;
    }
}
```

---

## js/modes/WaveMode.js

```javascript
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
```

---

## js/modes/RobotMode.js

```javascript
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
```

---

## js/modes/SpiderMode.js

```javascript
class SpiderMode extends GameMode {
    constructor() {
        super(GD.MODES.SPIDER);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed && player.onGround) {
            // Instant teleport to opposite surface
            return 'teleport';
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
    
    performTeleport(player, physics, groundY, ceilingY) {
        // Flip gravity and teleport to opposite surface
        player.gravityDirection *= -1;
        
        if (player.gravityDirection > 0) {
            // Now falling down - snap to ground
            player.y = groundY - player.height;
        } else {
            // Now falling up - snap to ceiling
            player.y = ceilingY;
        }
        
        player.velocityY = 0;
        player.onGround = true;
    }
    
    onEnter(player) {
        player.rotation = 0;
    }
}
```

---

## js/modes/SwingMode.js

```javascript
class SwingMode extends GameMode {
    constructor() {
        super(GD.MODES.SWING);
    }
    
    handleInput(player, input, physics, dt) {
        if (input.justPressed) {
            // Toggle gravity direction mid-air
            physics.swingFlip(player);
            return 'swing_flip';
        }
        return null;
    }
    
    update(player, physics, dt, groundY, ceilingY) {
        physics.applySwingPhysics(player, dt);
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
```

---

## js/objects/Orb.js

```javascript
class Orb extends GameObject {
    constructor(config = {}) {
        super(config);
        this.orbType = config.orbType || 'YELLOW';
        this.type = 'orb';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.activated = false;
        this.activationCooldown = 0;
        this.triggerGroupId = config.triggerGroupId || null; // For trigger orbs
        this.dashAngle = config.dashAngle || -90; // Degrees, for dash orb
        this.dashDuration = config.dashDuration || 0.5;
        this.multiActivate = config.multiActivate || false;
        
        // Set color based on type
        this.color = this._getColor();
        
        // Get behavior from constants
        this.behavior = GD.ORBS[this.orbType] || GD.ORBS.YELLOW;
    }
    
    _getColor() {
        const colors = {
            YELLOW: GD.COLORS.ORB_YELLOW,
            PINK: GD.COLORS.ORB_PINK,
            RED: GD.COLORS.ORB_RED,
            BLUE: GD.COLORS.ORB_BLUE,
            GREEN: GD.COLORS.ORB_GREEN,
            BLACK: GD.COLORS.ORB_BLACK,
            SPIDER: GD.COLORS.ORB_SPIDER,
            DASH: GD.COLORS.ORB_DASH,
            TRIGGER: '#ff8800'
        };
        return colors[this.orbType] || GD.COLORS.ORB_YELLOW;
    }
    
    canActivate(player) {
        if (this.activationCooldown > 0) return false;
        if (this.activated && !this.multiActivate) return false;
        
        // Check overlap
        const playerRect = player.getHitbox();
        const orbRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, orbRect);
    }
    
    activate(player, physics) {
        this.activated = true;
        this.activationCooldown = 0.1;
        
        const result = {
            type: this.orbType,
            sound: 'orb',
            triggerGroupId: null
        };
        
        if (this.behavior.trigger) {
            result.triggerGroupId = this.triggerGroupId;
            return result;
        }
        
        if (this.behavior.spider) {
            // Spider orb: instant teleport flip
            player.gravityDirection *= -1;
            player.velocityY = 0;
            result.sound = 'gravityFlip';
            return result;
        }
        
        if (this.behavior.dash) {
            // Dash orb: launch in fixed direction
            const angleRad = MathUtils.degToRad(this.dashAngle);
            const speed = Math.abs(this.behavior.impulse);
            player.dashing = true;
            player.dashDirection = {
                x: Math.cos(angleRad) * speed,
                y: Math.sin(angleRad) * speed
            };
            player.dashTimer = this.dashDuration;
            player.velocityY = player.dashDirection.y;
            return result;
        }
        
        // Standard orb behavior
        if (this.behavior.gravityFlip) {
            player.gravityDirection *= -1;
            result.sound = 'gravityFlip';
        }
        
        // Apply impulse
        if (this.behavior.impulse !== 0) {
            player.velocityY = this.behavior.impulse * player.gravityDirection;
            player.onGround = false;
        }
        
        return result;
    }
    
    update(dt) {
        super.update(dt);
        if (this.activationCooldown > 0) {
            this.activationCooldown -= dt;
        }
    }
    
    resetState() {
        this.activated = false;
        this.activationCooldown = 0;
    }
}
```

---

## js/objects/Pad.js

```javascript
class Pad extends GameObject {
    constructor(config = {}) {
        super(config);
        this.padType = config.padType || 'YELLOW';
        this.type = 'pad';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE * 0.4;
        this.activated = false;
        this.activationCooldown = 0;
        this.dashAngle = config.dashAngle || -90;
        this.dashDuration = config.dashDuration || 0.5;
        
        this.color = this._getColor();
        this.behavior = GD.PADS[this.padType] || GD.PADS.YELLOW;
    }
    
    _getColor() {
        const colors = {
            YELLOW: GD.COLORS.PAD_YELLOW,
            PINK: GD.COLORS.PAD_PINK,
            RED: GD.COLORS.PAD_RED,
            BLUE: GD.COLORS.PAD_BLUE,
            SPIDER: GD.COLORS.ORB_SPIDER,
            DASH: GD.COLORS.ORB_DASH
        };
        return colors[this.padType] || GD.COLORS.PAD_YELLOW;
    }
    
    checkAutoActivate(player) {
        if (this.activationCooldown > 0) return false;
        if (this.activated) return false;
        
        const playerRect = player.getHitbox();
        const padRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, padRect);
    }
    
    activate(player, physics) {
        this.activated = true;
        this.activationCooldown = 0.15;
        
        const result = {
            type: this.padType,
            sound: 'pad'
        };
        
        if (this.behavior.spider) {
            player.gravityDirection *= -1;
            player.velocityY = 0;
            result.sound = 'gravityFlip';
            return result;
        }
        
        if (this.behavior.dash) {
            const angleRad = MathUtils.degToRad(this.dashAngle);
            const speed = Math.abs(this.behavior.impulse);
            player.dashing = true;
            player.dashDirection = {
                x: Math.cos(angleRad) * speed,
                y: Math.sin(angleRad) * speed
            };
            player.dashTimer = this.dashDuration;
            player.velocityY = player.dashDirection.y;
            return result;
        }
        
        if (this.behavior.gravityFlip) {
            player.gravityDirection *= -1;
            result.sound = 'gravityFlip';
        }
        
        if (this.behavior.impulse !== 0) {
            player.velocityY = this.behavior.impulse * player.gravityDirection;
            player.onGround = false;
        }
        
        return result;
    }
    
    update(dt) {
        super.update(dt);
        if (this.activationCooldown > 0) {
            this.activationCooldown -= dt;
        }
    }
    
    resetState() {
        this.activated = false;
        this.activationCooldown = 0;
    }
}
```

---

## js/objects/Portal.js

```javascript
class Portal extends GameObject {
    constructor(config = {}) {
        super(config);
        this.portalType = config.portalType || GD.PORTAL_TYPES.CUBE;
        this.type = 'portal';
        this.solid = false;
        this.hazard = false;
        this.width = config.width || GD.BLOCK_SIZE * 0.8;
        this.height = config.height || GD.BLOCK_SIZE * 3;
        this.activated = false;
        this.linkedPortalId = config.linkedPortalId || null; // For teleport portals
        this.linkedPortal = null;
        
        this.color = this._getColor();
    }
    
    _getColor() {
        const typeToColor = {
            [GD.PORTAL_TYPES.CUBE]: GD.COLORS.PORTAL_CUBE,
            [GD.PORTAL_TYPES.SHIP]: GD.COLORS.PORTAL_SHIP,
            [GD.PORTAL_TYPES.BALL]: GD.COLORS.PORTAL_BALL,
            [GD.PORTAL_TYPES.UFO]: GD.COLORS.PORTAL_UFO,
            [GD.PORTAL_TYPES.WAVE]: GD.COLORS.PORTAL_WAVE,
            [GD.PORTAL_TYPES.ROBOT]: GD.COLORS.PORTAL_ROBOT,
            [GD.PORTAL_TYPES.SPIDER]: GD.COLORS.PORTAL_SPIDER,
            [GD.PORTAL_TYPES.SWING]: GD.COLORS.PORTAL_SWING,
            [GD.PORTAL_TYPES.GRAVITY_FLIP]: GD.COLORS.PORTAL_GRAVITY,
            [GD.PORTAL_TYPES.GRAVITY_NORMAL]: GD.COLORS.PORTAL_GRAVITY,
            [GD.PORTAL_TYPES.SPEED_HALF]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_NORMAL]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_DOUBLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_TRIPLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SPEED_QUADRUPLE]: GD.COLORS.PORTAL_SPEED,
            [GD.PORTAL_TYPES.SIZE_MINI]: GD.COLORS.PORTAL_SIZE,
            [GD.PORTAL_TYPES.SIZE_NORMAL]: GD.COLORS.PORTAL_SIZE,
            [GD.PORTAL_TYPES.MIRROR]: GD.COLORS.PORTAL_MIRROR,
            [GD.PORTAL_TYPES.DUAL]: GD.COLORS.PORTAL_DUAL,
            [GD.PORTAL_TYPES.DUAL_OFF]: GD.COLORS.PORTAL_DUAL,
            [GD.PORTAL_TYPES.TELEPORT]: GD.COLORS.PORTAL_TELEPORT
        };
        return typeToColor[this.portalType] || '#ffffff';
    }
    
    checkActivation(player) {
        if (this.activated) return false;
        const playerRect = player.getHitbox();
        const portalRect = this.getRect();
        return MathUtils.aabbOverlap(playerRect, portalRect);
    }
    
    activate(player, game) {
        this.activated = true;
        
        const result = {
            type: this.portalType,
            sound: 'portal'
        };
        
        // Mode portals
        const modeMap = {
            [GD.PORTAL_TYPES.CUBE]: GD.MODES.CUBE,
            [GD.PORTAL_TYPES.SHIP]: GD.MODES.SHIP,
            [GD.PORTAL_TYPES.BALL]: GD.MODES.BALL,
            [GD.PORTAL_TYPES.UFO]: GD.MODES.UFO,
            [GD.PORTAL_TYPES.WAVE]: GD.MODES.WAVE,
            [GD.PORTAL_TYPES.ROBOT]: GD.MODES.ROBOT,
            [GD.PORTAL_TYPES.SPIDER]: GD.MODES.SPIDER,
            [GD.PORTAL_TYPES.SWING]: GD.MODES.SWING
        };
        
        if (modeMap[this.portalType]) {
            result.newMode = modeMap[this.portalType];
            return result;
        }
        
        // Gravity portals
        if (this.portalType === GD.PORTAL_TYPES.GRAVITY_FLIP) {
            result.gravityFlip = true;
            result.newGravity = -1;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.GRAVITY_NORMAL) {
            result.gravityNormal = true;
            result.newGravity = 1;
            return result;
        }
        
        // Speed portals
        const speedMap = {
            [GD.PORTAL_TYPES.SPEED_HALF]: 0,
            [GD.PORTAL_TYPES.SPEED_NORMAL]: 1,
            [GD.PORTAL_TYPES.SPEED_DOUBLE]: 2,
            [GD.PORTAL_TYPES.SPEED_TRIPLE]: 3,
            [GD.PORTAL_TYPES.SPEED_QUADRUPLE]: 4
        };
        
        if (speedMap[this.portalType] !== undefined) {
            result.newSpeed = speedMap[this.portalType];
            return result;
        }
        
        // Size portals
        if (this.portalType === GD.PORTAL_TYPES.SIZE_MINI) {
            result.mini = true;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.SIZE_NORMAL) {
            result.mini = false;
            return result;
        }
        
        // Mirror portal
        if (this.portalType === GD.PORTAL_TYPES.MIRROR) {
            result.mirror = true;
            return result;
        }
        
        // Dual portal
        if (this.portalType === GD.PORTAL_TYPES.DUAL) {
            result.dual = true;
            return result;
        }
        if (this.portalType === GD.PORTAL_TYPES.DUAL_OFF) {
            result.dual = false;
            return result;
        }
        
        // Teleport portal
        if (this.portalType === GD.PORTAL_TYPES.TELEPORT) {
            if (this.linkedPortal) {
                result.teleportTo = {
                    x: this.linkedPortal.x,
                    y: this.linkedPortal.y + (this.linkedPortal.height - player.height) / 2
                };
            }
            return result;
        }
        
        return result;
    }
    
    resetState() {
        this.activated = false;
    }
}
```

---

## js/objects/Trigger.js

```javascript
class Trigger extends GameObject {
    constructor(config = {}) {
        super(config);
        this.triggerType = config.triggerType || GD.TRIGGER_TYPES.MOVE;
        this.type = 'trigger';
        this.solid = false;
        this.hazard = false;
        this.visible = false;
        this.showInEditor = config.showInEditor || false;
        this.width = config.width || GD.BLOCK_SIZE;
        this.height = config.height || GD.BLOCK_SIZE;
        this.activated = false;
        this.touchActivated = config.touchActivated !== undefined ? config.touchActivated : true;
        this.spawnActivated = config.spawnActivated || false;
        
        // Target
        this.targetGroupId = config.targetGroupId || null;
        this.targetGroups = config.targetGroups || [];
        
        // Timing
        this.duration = config.duration || 0;
        this.delay = config.delay || 0;
        this.easingType = config.easingType || 'linear';
        
        // Move trigger params
        this.moveX = config.moveX || 0;
        this.moveY = config.moveY || 0;
        
        // Rotate trigger params
        this.rotateDegrees = config.rotateDegrees || 0;
        this.rotateCenter = config.rotateCenter || null;
        
        // Alpha trigger params
        this.targetAlpha = config.targetAlpha !== undefined ? config.targetAlpha : 1;
        
        // Color trigger params
        this.targetColor = config.targetColor || '#ffffff';
        this.colorChannelId = config.colorChannelId || null;
        
        // Pulse trigger params
        this.pulseColor = config.pulseColor || '#ffffff';
        this.pulseHold = config.pulseHold || 0;
        this.pulseFadeIn = config.pulseFadeIn || 0;
        this.pulseFadeOut = config.pulseFadeOut || 0;
        this.pulseMode = config.pulseMode || 'color'; // 'color' or 'hsv'
        
        // Toggle trigger params
        this.toggleOn = config.toggleOn !== undefined ? config.toggleOn : true;
        
        // Spawn trigger params
        this.spawnGroupId = config.spawnGroupId || null;
        this.spawnDelay = config.spawnDelay || 0;
        
        // Camera trigger params
        this.cameraZoom = config.cameraZoom || 1;
        this.cameraOffsetX = config.cameraOffsetX || 0;
        this.cameraOffsetY = config.cameraOffsetY || 0;
        this.cameraFollowY = config.cameraFollowY || false;
        
        // Song trigger params
        this.songOffset = config.songOffset || 0;
        this.songId = config.songId || null;
        
        // Random trigger params
        this.randomGroups = config.randomGroups || [];
        this.randomChances = config.randomChances || [];
    }
    
    checkActivation(playerX) {
        if (this.activated) return false;
        if (!this.touchActivated) return false;
        return playerX >= this.x;
    }
    
    activate() {
        this.activated = true;
        return {
            triggerType: this.triggerType,
            targetGroupId: this.targetGroupId,
            targetGroups: this.targetGroups,
            duration: this.duration,
            delay: this.delay,
            easingType: this.easingType,
            trigger: this
        };
    }
    
    resetState() {
        this.activated = false;
    }
}
```

---

## js/triggers/TriggerSystem.js

```javascript
class TriggerSystem {
    constructor(game) {
        this.game = game;
        this.activeTriggers = [];
        this.groupStates = new Map(); // groupId -> { enabled, objects }
        this.colorAnimations = [];
    }
    
    reset() {
        this.activeTriggers = [];
        this.groupStates.clear();
        this.colorAnimations = [];
    }
    
    registerGroup(groupId, objects) {
        this.groupStates.set(groupId, {
            enabled: true,
            objects: objects
        });
    }
    
    getGroupObjects(groupId) {
        const group = this.groupStates.get(groupId);
        if (!group) return [];
        return group.objects || [];
    }
    
    isGroupEnabled(groupId) {
        const group = this.groupStates.get(groupId);
        return group ? group.enabled : true;
    }
    
    executeTrigger(triggerData) {
        const { triggerType, delay } = triggerData;
        
        if (delay > 0) {
            // Delayed trigger
            this.activeTriggers.push({
                ...triggerData,
                delayTimer: delay,
                started: false,
                elapsed: 0,
                complete: false
            });
            return;
        }
        
        this._startTrigger(triggerData);
    }
    
    _startTrigger(triggerData) {
        const activeTrigger = {
            ...triggerData,
            delayTimer: 0,
            started: true,
            elapsed: 0,
            complete: false,
            startValues: {}
        };
        
        // Capture start values
        switch (triggerData.triggerType) {
            case GD.TRIGGER_TYPES.MOVE:
                this._initMoveTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.ROTATE:
                this._initRotateTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.ALPHA:
                this._initAlphaTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.COLOR:
                this._initColorTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.PULSE:
                this._initPulseTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.TOGGLE:
                this._executeToggleTrigger(activeTrigger);
                activeTrigger.complete = true;
                break;
            case GD.TRIGGER_TYPES.SPAWN:
                this._executeSpawnTrigger(activeTrigger);
                activeTrigger.complete = true;
                break;
            case GD.TRIGGER_TYPES.CAMERA:
                this._initCameraTrigger(activeTrigger);
                break;
            case GD.TRIGGER_TYPES.SONG:
                this._executeSongTrigger(activeTrigger);
                activeTrigger.complete = true;
                break;
            case GD.TRIGGER_TYPES.RANDOM:
                this._executeRandomTrigger(activeTrigger);
                activeTrigger.complete = true;
                break;
        }
        
        if (!activeTrigger.complete) {
            this.activeTriggers.push(activeTrigger);
        }
    }
    
    update(dt) {
        for (let i = this.activeTriggers.length - 1; i >= 0; i--) {
            const trigger = this.activeTriggers[i];
            
            // Handle delay
            if (!trigger.started) {
                trigger.delayTimer -= dt;
                if (trigger.delayTimer <= 0) {
                    trigger.started = true;
                    this._startTrigger(trigger);
                    // Remove the delayed entry, the started one was added
                    this.activeTriggers.splice(i, 1);
                }
                continue;
            }
            
            // Update active trigger
            trigger.elapsed += dt;
            const duration = trigger.duration || 0;
            
            if (duration <= 0) {
                trigger.complete = true;
            } else {
                const t = MathUtils.clamp(trigger.elapsed / duration, 0, 1);
                const easedT = Easing.get(trigger.easingType)(t);
                
                this._updateTrigger(trigger, easedT);
                
                if (t >= 1) {
                    trigger.complete = true;
                }
            }
            
            if (trigger.complete) {
                this.activeTriggers.splice(i, 1);
            }
        }
    }
    
    _updateTrigger(trigger, t) {
        switch (trigger.triggerType) {
            case GD.TRIGGER_TYPES.MOVE:
                this._updateMoveTrigger(trigger, t);
                break;
            case GD.TRIGGER_TYPES.ROTATE:
                this._updateRotateTrigger(trigger, t);
                break;
            case GD.TRIGGER_TYPES.ALPHA:
                this._updateAlphaTrigger(trigger, t);
                break;
            case GD.TRIGGER_TYPES.COLOR:
                this._updateColorTrigger(trigger, t);
                break;
            case GD.TRIGGER_TYPES.PULSE:
                this._updatePulseTrigger(trigger, t);
                break;
            case GD.TRIGGER_TYPES.CAMERA:
                this._updateCameraTrigger(trigger, t);
                break;
        }
    }
    
    // Move Trigger
    _initMoveTrigger(trigger) {
        const objects = this.getGroupObjects(trigger.targetGroupId);
        trigger.startValues.positions = objects.map(obj => ({
            obj,
            startX: obj.triggerOffsetX,
            startY: obj.triggerOffsetY
        }));
    }
    
    _updateMoveTrigger(trigger, t) {
        const trig = trigger.trigger;
        if (!trigger.startValues.positions) return;
        
        for (const entry of trigger.startValues.positions) {
            entry.obj.triggerOffsetX = entry.startX + trig.moveX * t;
            entry.obj.triggerOffsetY = entry.startY + trig.moveY * t;
        }
    }
    
    // Rotate Trigger
    _initRotateTrigger(trigger) {
        const objects = this.getGroupObjects(trigger.targetGroupId);
        trigger.startValues.rotations = objects.map(obj => ({
            obj,
            startRot: obj.triggerRotation
        }));
    }
    
    _updateRotateTrigger(trigger, t) {
        const trig = trigger.trigger;
        if (!trigger.startValues.rotations) return;
        
        const targetRad = MathUtils.degToRad(trig.rotateDegrees);
        for (const entry of trigger.startValues.rotations) {
            entry.obj.triggerRotation = entry.startRot + targetRad * t;
        }
    }
    
    // Alpha Trigger
    _initAlphaTrigger(trigger) {
        const objects = this.getGroupObjects(trigger.targetGroupId);
        trigger.startValues.alphas = objects.map(obj => ({
            obj,
            startAlpha: obj.alpha
        }));
    }
    
    _updateAlphaTrigger(trigger, t) {
        const trig = trigger.trigger;
        if (!trigger.startValues.alphas) return;
        
        for (const entry of trigger.startValues.alphas) {
            entry.obj.alpha = MathUtils.lerp(entry.startAlpha, trig.targetAlpha, t);
        }
    }
    
    // Color Trigger
    _initColorTrigger(trigger) {
        const trig = trigger.trigger;
        trigger.startValues.startColor = this.game.renderer.getColorChannel(trig.colorChannelId) || '#ffffff';
    }
    
    _updateColorTrigger(trigger, t) {
        const trig = trigger.trigger;
        const startColor = trigger.startValues.startColor;
        const endColor = trig.targetColor;
        const lerpedColor = ColorUtils.lerpColor(startColor, endColor, t);
        const hex = ColorUtils.rgbToHex(lerpedColor.r, lerpedColor.g, lerpedColor.b);
        this.game.renderer.setColorChannel(trig.colorChannelId, hex);
        
        // Apply to objects using this color channel
        const objects = this.getGroupObjects(trigger.targetGroupId);
        for (const obj of objects) {
            if (obj.colorChannel === trig.colorChannelId) {
                obj.color = hex;
            }
        }
    }
    
    // Pulse Trigger
    _initPulseTrigger(trigger) {
        const objects = this.getGroupObjects(trigger.targetGroupId);
        trigger.startValues.colors = objects.map(obj => ({
            obj,
            originalColor: obj.color
        }));
    }
    
    _updatePulseTrigger(trigger, t) {
        const trig = trigger.trigger;
        if (!trigger.startValues.colors) return;
        
        const totalDuration = trig.pulseFadeIn + trig.pulseHold + trig.pulseFadeOut;
        const elapsed = trigger.elapsed;
        
        let intensity = 0;
        if (elapsed < trig.pulseFadeIn) {
            intensity = elapsed / trig.pulseFadeIn;
        } else if (elapsed < trig.pulseFadeIn + trig.pulseHold) {
            intensity = 1;
        } else {
            const fadeElapsed = elapsed - trig.pulseFadeIn - trig.pulseHold;
            intensity = 1 - MathUtils.clamp(fadeElapsed / trig.pulseFadeOut, 0, 1);
        }
        
        for (const entry of trigger.startValues.colors) {
            const lerpedColor = ColorUtils.lerpColor(entry.originalColor, trig.pulseColor, intensity);
            entry.obj.color = ColorUtils.rgbToHex(lerpedColor.r, lerpedColor.g, lerpedColor.b);
        }
    }
    
    // Toggle Trigger
    _executeToggleTrigger(trigger) {
        const trig = trigger.trigger;
        const group = this.groupStates.get(trig.targetGroupId);
        if (group) {
            group.enabled = trig.toggleOn;
            for (const obj of group.objects) {
                obj.active = trig.toggleOn;
                obj.visible = trig.toggleOn;
            }
        }
    }
    
    // Spawn Trigger
    _executeSpawnTrigger(trigger) {
        const trig = trigger.trigger;
        if (trig.spawnGroupId) {
            // Find triggers in the spawn group and activate them
            const objects = this.getGroupObjects(trig.spawnGroupId);
            for (const obj of objects) {
                if (obj instanceof Trigger && !obj.activated) {
                    const result = obj.activate();
                    this.executeTrigger(result);
                }
            }
        }
    }
    
    // Camera Trigger
    _initCameraTrigger(trigger) {
        const camera = this.game.camera;
        trigger.startValues.zoom = camera.zoom;
        trigger.startValues.offsetX = camera.targetOffsetX;
        trigger.startValues.offsetY = camera.targetOffsetY;
    }
    
    _updateCameraTrigger(trigger, t) {
        const trig = trigger.trigger;
        const camera = this.game.camera;
        
        if (trig.cameraZoom !== undefined) {
            camera.targetZoom = MathUtils.lerp(trigger.startValues.zoom, trig.cameraZoom, t);
        }
        if (trig.cameraOffsetX !== undefined) {
            camera.targetOffsetX = MathUtils.lerp(trigger.startValues.offsetX, trig.cameraOffsetX, t);
        }
        if (trig.cameraOffsetY !== undefined) {
            camera.targetOffsetY = MathUtils.lerp(trigger.startValues.offsetY, trig.cameraOffsetY, t);
        }
        if (trig.cameraFollowY !== undefined) {
            camera.followY = trig.cameraFollowY;
        }
    }
    
    // Song Trigger
    _executeSongTrigger(trigger) {
        const trig = trigger.trigger;
        if (this.game.audio) {
            if (trig.songOffset !== undefined) {
                this.game.audio.stopMusic();
                this.game.audio.playMusic(this.game.audio.currentMusic, trig.songOffset);
            }
        }
    }
    
    // Random Trigger
    _executeRandomTrigger(trigger) {
        const trig = trigger.trigger;
        if (trig.randomGroups && trig.randomGroups.length > 0) {
            let selectedGroup;
            
            if (trig.randomChances && trig.randomChances.length === trig.randomGroups.length) {
                // Weighted random
                const total = trig.randomChances.reduce((a, b) => a + b, 0);
                let r = Math.random() * total;
                for (let i = 0; i < trig.randomChances.length; i++) {
                    r -= trig.randomChances[i];
                    if (r <= 0) {
                        selectedGroup = trig.randomGroups[i];
                        break;
                    }
                }
                if (!selectedGroup) selectedGroup = trig.randomGroups[trig.randomGroups.length - 1];
            } else {
                // Equal chance
                selectedGroup = trig.randomGroups[MathUtils.randomInt(0, trig.randomGroups.length - 1)];
            }
            
            // Activate selected group's triggers
            const objects = this.getGroupObjects(selectedGroup);
            for (const obj of objects) {
                if (obj instanceof Trigger && !obj.activated) {
                    const result = obj.activate();
                    this.executeTrigger(result);
                }
            }
        }
    }
}
```

---

## js/triggers/MoveTrigger.js through RandomTrigger.js

These are thin wrappers already handled by TriggerSystem. We'll create stub files:

```javascript
// js/triggers/MoveTrigger.js
// Move trigger logic is implemented in TriggerSystem._initMoveTrigger and _updateMoveTrigger

// js/triggers/RotateTrigger.js
// Rotate trigger logic is implemented in TriggerSystem._initRotateTrigger and _updateRotateTrigger

// js/triggers/AlphaTrigger.js
// Alpha trigger logic is implemented in TriggerSystem._initAlphaTrigger and _updateAlphaTrigger

// js/triggers/ColorTrigger.js
// Color trigger logic is implemented in TriggerSystem._initColorTrigger and _updateColorTrigger

// js/triggers/PulseTrigger.js
// Pulse trigger logic is implemented in TriggerSystem._initPulseTrigger and _updatePulseTrigger

// js/triggers/ToggleTrigger.js
// Toggle trigger logic is implemented in TriggerSystem._executeToggleTrigger

// js/triggers/SpawnTrigger.js
// Spawn trigger logic is implemented in TriggerSystem._executeSpawnTrigger

// js/triggers/CameraTrigger.js
// Camera trigger logic is implemented in TriggerSystem._initCameraTrigger and _updateCameraTrigger

// js/triggers/SongTrigger.js
// Song trigger logic is implemented in TriggerSystem._executeSongTrigger

// js/triggers/RandomTrigger.js
// Random trigger logic is implemented in TriggerSystem._executeRandomTrigger
```

---

## js/levels/LevelValidator.js

```javascript
class LevelValidator {
    static validate(levelData) {
        const errors = [];
        
        if (!levelData) {
            errors.push('Level

You
Continue
Assistant


## js/levels/LevelValidator.js (continued)

```javascript
 data is null or undefined');
            return { valid: false, errors };
        }
        
        if (!levelData.name || levelData.name.trim() === '') {
            errors.push('Level must have a name');
        }
        
        if (!levelData.objects || !Array.isArray(levelData.objects)) {
            errors.push('Level must have an objects array');
            return { valid: false, errors };
        }
        
        if (levelData.objects.length === 0) {
            errors.push('Level must have at least one object');
        }
        
        // Check for valid BPM
        if (levelData.bpm !== undefined) {
            if (levelData.bpm < 30 || levelData.bpm > 400) {
                errors.push('BPM must be between 30 and 400');
            }
        }
        
        // Check for valid speed
        if (levelData.speed !== undefined) {
            if (levelData.speed < 0 || levelData.speed >= GD.SPEED_VALUES.length) {
                errors.push('Invalid speed index');
            }
        }
        
        // Validate objects
        let hasGround = false;
        let maxX = 0;
        
        for (let i = 0; i < levelData.objects.length; i++) {
            const obj = levelData.objects[i];
            
            if (obj.x === undefined || obj.y === undefined) {
                errors.push(`Object ${i}: missing position`);
            }
            
            if (!obj.type) {
                errors.push(`Object ${i}: missing type`);
            }
            
            if (obj.x > maxX) maxX = obj.x;
            
            if (obj.type === 'block' && obj.solid !== false) {
                hasGround = true;
            }
        }
        
        // Check level length
        if (maxX < GD.BLOCK_SIZE * 5) {
            errors.push('Level is too short (minimum 5 blocks)');
        }
        
        // Check for end marker or reasonable length
        if (maxX > GD.BLOCK_SIZE * 10000) {
            errors.push('Level is too long (maximum 10000 blocks)');
        }
        
        // Validate trigger references
        const groupIds = new Set();
        for (const obj of levelData.objects) {
            if (obj.groupId) groupIds.add(obj.groupId);
            if (obj.groups) obj.groups.forEach(g => groupIds.add(g));
        }
        
        for (const obj of levelData.objects) {
            if (obj.type === 'trigger') {
                if (obj.targetGroupId && !groupIds.has(obj.targetGroupId)) {
                    // Warning, not error - group might be empty intentionally
                }
                
                if (obj.triggerType === GD.TRIGGER_TYPES.SPAWN && obj.spawnGroupId && !groupIds.has(obj.spawnGroupId)) {
                    errors.push(`Trigger references non-existent spawn group: ${obj.spawnGroupId}`);
                }
            }
            
            // Validate portal links
            if (obj.type === 'portal' && obj.portalType === GD.PORTAL_TYPES.TELEPORT) {
                if (!obj.linkedPortalId) {
                    errors.push('Teleport portal must have a linked portal');
                }
            }
        }
        
        return {
            valid: errors.length === 0,
            errors,
            stats: {
                objectCount: levelData.objects.length,
                levelLength: maxX,
                hasGround,
                groupCount: groupIds.size
            }
        };
    }
    
    static sanitize(levelData) {
        // Clean up and fix common issues
        const sanitized = JSON.parse(JSON.stringify(levelData));
        
        if (!sanitized.name) sanitized.name = 'Untitled';
        if (!sanitized.objects) sanitized.objects = [];
        if (!sanitized.bpm) sanitized.bpm = GD.DEFAULT_BPM;
        if (sanitized.speed === undefined) sanitized.speed = 1;
        if (!sanitized.bgColor) sanitized.bgColor = GD.COLORS.BG_DEFAULT;
        if (!sanitized.groundColor) sanitized.groundColor = GD.COLORS.GROUND_DEFAULT;
        
        // Remove invalid objects
        sanitized.objects = sanitized.objects.filter(obj => {
            return obj && obj.x !== undefined && obj.y !== undefined && obj.type;
        });
        
        // Ensure all objects have required fields
        for (const obj of sanitized.objects) {
            if (!obj.width) obj.width = GD.BLOCK_SIZE;
            if (!obj.height) obj.height = GD.BLOCK_SIZE;
            if (obj.active === undefined) obj.active = true;
            if (obj.visible === undefined) obj.visible = true;
        }
        
        return sanitized;
    }
}
```

---

## js/levels/LevelSerializer.js

```javascript
class LevelSerializer {
    static serialize(level) {
        const data = {
            version: GD.VERSION,
            name: level.name || 'Untitled',
            author: level.author || 'Unknown',
            description: level.description || '',
            bpm: level.bpm || GD.DEFAULT_BPM,
            speed: level.speed !== undefined ? level.speed : 1,
            mode: level.startMode || GD.MODES.CUBE,
            bgColor: level.bgColor || GD.COLORS.BG_DEFAULT,
            groundColor: level.groundColor || GD.COLORS.GROUND_DEFAULT,
            groundY: level.groundY,
            ceilingY: level.ceilingY,
            musicStyle: level.musicStyle || 'electronic',
            musicDuration: level.musicDuration || 60,
            objects: [],
            colorChannels: level.colorChannels || {},
            guidelines: level.guidelines || []
        };
        
        for (const obj of level.objects) {
            data.objects.push(LevelSerializer._serializeObject(obj));
        }
        
        return JSON.stringify(data);
    }
    
    static _serializeObject(obj) {
        const serialized = {
            type: obj.type,
            x: Math.round(obj.baseX || obj.x),
            y: Math.round(obj.baseY || obj.y),
            w: obj.width,
            h: obj.height
        };
        
        // Only include non-default values to save space
        if (obj.color && obj.color !== '#4444aa') serialized.c = obj.color;
        if (obj.rotation) serialized.r = obj.rotation;
        if (obj.alpha !== undefined && obj.alpha !== 1) serialized.a = obj.alpha;
        if (!obj.active) serialized.act = false;
        if (!obj.visible) serialized.vis = false;
        if (!obj.solid && obj.type === 'block') serialized.sol = false;
        if (obj.hazard) serialized.haz = true;
        if (obj.direction && obj.direction !== 'up') serialized.dir = obj.direction;
        if (obj.groupId) serialized.gid = obj.groupId;
        if (obj.groups && obj.groups.length > 0) serialized.grps = obj.groups;
        if (obj.colorChannel) serialized.ch = obj.colorChannel;
        if (obj.zOrder) serialized.z = obj.zOrder;
        
        // Type-specific
        if (obj.orbType) serialized.ot = obj.orbType;
        if (obj.padType) serialized.pt = obj.padType;
        if (obj.portalType) serialized.prt = obj.portalType;
        if (obj.linkedPortalId) serialized.lpid = obj.linkedPortalId;
        
        // Trigger-specific
        if (obj.triggerType) serialized.tt = obj.triggerType;
        if (obj.targetGroupId) serialized.tgid = obj.targetGroupId;
        if (obj.duration) serialized.dur = obj.duration;
        if (obj.delay) serialized.del = obj.delay;
        if (obj.easingType && obj.easingType !== 'linear') serialized.ease = obj.easingType;
        if (obj.moveX) serialized.mx = obj.moveX;
        if (obj.moveY) serialized.my = obj.moveY;
        if (obj.rotateDegrees) serialized.rd = obj.rotateDegrees;
        if (obj.targetAlpha !== undefined && obj.targetAlpha !== 1) serialized.ta = obj.targetAlpha;
        if (obj.targetColor) serialized.tc = obj.targetColor;
        if (obj.colorChannelId) serialized.chid = obj.colorChannelId;
        if (obj.toggleOn !== undefined) serialized.ton = obj.toggleOn;
        if (obj.spawnGroupId) serialized.sgid = obj.spawnGroupId;
        if (obj.touchActivated === false) serialized.touch = false;
        if (obj.spawnActivated) serialized.spawn = true;
        if (obj.cameraZoom && obj.cameraZoom !== 1) serialized.cz = obj.cameraZoom;
        if (obj.cameraFollowY) serialized.cfy = true;
        if (obj.dashAngle) serialized.da = obj.dashAngle;
        if (obj.dashDuration) serialized.dd = obj.dashDuration;
        if (obj.multiActivate) serialized.ma = true;
        if (obj.sawBlade) serialized.saw = true;
        if (obj.rotationSpeed) serialized.rs = obj.rotationSpeed;
        
        return serialized;
    }
    
    static deserialize(jsonString) {
        let data;
        try {
            data = JSON.parse(jsonString);
        } catch (e) {
            console.error('Failed to parse level data:', e);
            return null;
        }
        
        const level = {
            version: data.version || '1.0',
            name: data.name || 'Untitled',
            author: data.author || 'Unknown',
            description: data.description || '',
            bpm: data.bpm || GD.DEFAULT_BPM,
            speed: data.speed !== undefined ? data.speed : 1,
            startMode: data.mode || GD.MODES.CUBE,
            bgColor: data.bgColor || GD.COLORS.BG_DEFAULT,
            groundColor: data.groundColor || GD.COLORS.GROUND_DEFAULT,
            groundY: data.groundY,
            ceilingY: data.ceilingY,
            musicStyle: data.musicStyle || 'electronic',
            musicDuration: data.musicDuration || 60,
            objects: [],
            colorChannels: data.colorChannels || {},
            guidelines: data.guidelines || []
        };
        
        for (const objData of (data.objects || [])) {
            level.objects.push(LevelSerializer._deserializeObject(objData));
        }
        
        return level;
    }
    
    static _deserializeObject(d) {
        const config = {
            type: d.type,
            x: d.x,
            y: d.y,
            width: d.w || GD.BLOCK_SIZE,
            height: d.h || GD.BLOCK_SIZE,
            color: d.c,
            rotation: d.r || 0,
            alpha: d.a !== undefined ? d.a : 1,
            active: d.act !== undefined ? d.act : true,
            visible: d.vis !== undefined ? d.vis : true,
            solid: d.sol !== undefined ? d.sol : true,
            hazard: d.haz || false,
            direction: d.dir || 'up',
            groupId: d.gid || null,
            groups: d.grps || [],
            colorChannel: d.ch || null,
            zOrder: d.z || 0
        };
        
        // Type-specific
        if (d.ot) config.orbType = d.ot;
        if (d.pt) config.padType = d.pt;
        if (d.prt) config.portalType = d.prt;
        if (d.lpid) config.linkedPortalId = d.lpid;
        
        // Trigger-specific
        if (d.tt) config.triggerType = d.tt;
        if (d.tgid) config.targetGroupId = d.tgid;
        if (d.dur) config.duration = d.dur;
        if (d.del) config.delay = d.del;
        if (d.ease) config.easingType = d.ease;
        if (d.mx) config.moveX = d.mx;
        if (d.my) config.moveY = d.my;
        if (d.rd) config.rotateDegrees = d.rd;
        if (d.ta !== undefined) config.targetAlpha = d.ta;
        if (d.tc) config.targetColor = d.tc;
        if (d.chid) config.colorChannelId = d.chid;
        if (d.ton !== undefined) config.toggleOn = d.ton;
        if (d.sgid) config.spawnGroupId = d.sgid;
        if (d.touch !== undefined) config.touchActivated = d.touch;
        if (d.spawn) config.spawnActivated = d.spawn;
        if (d.cz) config.cameraZoom = d.cz;
        if (d.cfy) config.cameraFollowY = d.cfy;
        if (d.da) config.dashAngle = d.da;
        if (d.dd) config.dashDuration = d.dd;
        if (d.ma) config.multiActivate = d.ma;
        if (d.saw) config.sawBlade = d.saw;
        if (d.rs) config.rotationSpeed = d.rs;
        
        // Create appropriate object type
        switch (config.type) {
            case 'spike':
                return new Hazard(config);
            case 'orb':
                return new Orb(config);
            case 'pad':
                return new Pad(config);
            case 'portal':
                return new Portal(config);
            case 'trigger':
                return new Trigger(config);
            default:
                return new GameObject(config);
        }
    }
    
    // Compress level data for sharing
    static compress(jsonString) {
        try {
            const bytes = new TextEncoder().encode(jsonString);
            // Simple RLE-like compression + base64
            const compressed = btoa(String.fromCharCode(...bytes));
            return compressed;
        } catch (e) {
            console.error('Compression failed:', e);
            return jsonString;
        }
    }
    
    static decompress(compressedString) {
        try {
            const decoded = atob(compressedString);
            const bytes = new Uint8Array(decoded.length);
            for (let i = 0; i < decoded.length; i++) {
                bytes[i] = decoded.charCodeAt(i);
            }
            return new TextDecoder().decode(bytes);
        } catch (e) {
            console.error('Decompression failed:', e);
            return compressedString;
        }
    }
}
```

---

## js/levels/LevelManager.js

```javascript
class LevelManager {
    constructor() {
        this.levels = new Map();
        this.currentLevel = null;
        this.builtInLevels = [];
        this.userLevels = [];
        this.storageKey = 'gd_user_levels';
    }
    
    init() {
        this._loadBuiltInLevels();
        this._loadUserLevels();
    }
    
    _loadBuiltInLevels() {
        // Built-in demonstration levels
        this.builtInLevels = [
            this._createTutorialLevel(),
            this._createShipLevel(),
            this._createMixedLevel()
        ];
        
        for (const level of this.builtInLevels) {
            this.levels.set(level.name, level);
        }
    }
    
    _loadUserLevels() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const levelList = JSON.parse(saved);
                for (const levelJson of levelList) {
                    const level = LevelSerializer.deserialize(levelJson);
                    if (level) {
                        this.userLevels.push(level);
                        this.levels.set(level.name, level);
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to load user levels:', e);
        }
    }
    
    saveUserLevels() {
        try {
            const serialized = this.userLevels.map(level => LevelSerializer.serialize(level));
            localStorage.setItem(this.storageKey, JSON.stringify(serialized));
        } catch (e) {
            console.warn('Failed to save user levels:', e);
        }
    }
    
    addUserLevel(level) {
        // Ensure unique name
        let name = level.name;
        let counter = 1;
        while (this.levels.has(name)) {
            name = `${level.name} (${counter++})`;
        }
        level.name = name;
        
        this.userLevels.push(level);
        this.levels.set(level.name, level);
        this.saveUserLevels();
        return level;
    }
    
    updateUserLevel(name, level) {
        const index = this.userLevels.findIndex(l => l.name === name);
        if (index >= 0) {
            this.userLevels[index] = level;
            this.levels.set(level.name, level);
            if (name !== level.name) {
                this.levels.delete(name);
            }
            this.saveUserLevels();
        }
    }
    
    deleteUserLevel(name) {
        const index = this.userLevels.findIndex(l => l.name === name);
        if (index >= 0) {
            this.userLevels.splice(index, 1);
            this.levels.delete(name);
            this.saveUserLevels();
        }
    }
    
    getLevel(name) {
        return this.levels.get(name);
    }
    
    getAllLevels() {
        return Array.from(this.levels.values());
    }
    
    getBuiltInLevels() {
        return this.builtInLevels;
    }
    
    getUserLevels() {
        return this.userLevels;
    }
    
    exportLevel(name) {
        const level = this.levels.get(name);
        if (!level) return null;
        const json = LevelSerializer.serialize(level);
        return LevelSerializer.compress(json);
    }
    
    importLevel(compressedData) {
        try {
            const json = LevelSerializer.decompress(compressedData);
            const level = LevelSerializer.deserialize(json);
            if (!level) throw new Error('Invalid level data');
            
            const validation = LevelValidator.validate(level);
            if (!validation.valid) {
                console.warn('Level validation warnings:', validation.errors);
            }
            
            level = LevelValidator.sanitize(level);
            return this.addUserLevel(level);
        } catch (e) {
            console.error('Failed to import level:', e);
            return null;
        }
    }
    
    // Built-in level generators
    _createTutorialLevel() {
        const BS = GD.BLOCK_SIZE;
        const groundY = 400;
        const objects = [];
        let x = 0;
        
        // Floor
        for (let i = 0; i < 200; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY,
                width: BS, height: BS, color: '#4a4a8a', solid: true
            });
        }
        
        // Simple jumps
        x = BS * 8;
        objects.push({ type: 'spike', x: x, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        
        x = BS * 14;
        objects.push({ type: 'spike', x: x, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        objects.push({ type: 'spike', x: x + BS, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        
        // Platform
        x = BS * 20;
        for (let i = 0; i < 3; i++) {
            objects.push({
                type: 'block', x: x + i * BS, y: groundY - BS * 3,
                width: BS, height: BS, color: '#4a4a8a', solid: true
            });
        }
        
        // Orb
        x = BS * 28;
        objects.push({ type: 'spike', x: x, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        objects.push({ type: 'orb', x: x - BS, y: groundY - BS * 3, width: BS, height: BS, orbType: 'YELLOW' });
        
        // Pad
        x = BS * 35;
        objects.push({ type: 'pad', x: x, y: groundY - BS * 0.4, width: BS, height: BS * 0.4, padType: 'YELLOW' });
        objects.push({ type: 'spike', x: x + BS * 4, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        objects.push({ type: 'spike', x: x + BS * 5, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        
        // Ship portal
        x = BS * 45;
        objects.push({ type: 'portal', x: x, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.SHIP });
        
        // Ship section ceiling
        for (let i = 47; i < 70; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY - BS * 8,
                width: BS, height: BS, color: '#4a4a8a', solid: true
            });
        }
        
        // Ship obstacles
        for (let i = 50; i < 65; i += 5) {
            objects.push({ type: 'spike', x: i * BS, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
            objects.push({ type: 'spike', x: i * BS, y: groundY - BS * 7, width: BS, height: BS, direction: 'down', hazard: true });
        }
        
        // Back to cube
        x = BS * 70;
        objects.push({ type: 'portal', x: x, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.CUBE });
        
        // More cube section
        x = BS * 75;
        for (let i = 0; i < 3; i++) {
            objects.push({ type: 'spike', x: x + i * BS * 5, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        }
        
        // End
        x = BS * 100;
        objects.push({
            type: 'block', x: x, y: groundY - BS * 5,
            width: BS * 2, height: BS * 5, color: '#44ff44', solid: true
        });
        
        return {
            name: 'Tutorial',
            author: 'System',
            description: 'Learn the basics!',
            bpm: 128,
            speed: 1,
            startMode: GD.MODES.CUBE,
            bgColor: '#1a0033',
            groundColor: '#2a2a5a',
            groundY: groundY,
            ceilingY: 0,
            objects: objects.map(o => LevelSerializer._deserializeObject({
                type: o.type, x: o.x, y: o.y,
                w: o.width, h: o.height,
                c: o.color, dir: o.direction,
                haz: o.hazard, sol: o.solid,
                ot: o.orbType, pt: o.padType, prt: o.portalType
            })),
            colorChannels: {},
            guidelines: [],
            musicStyle: 'electronic',
            musicDuration: 60
        };
    }
    
    _createShipLevel() {
        const BS = GD.BLOCK_SIZE;
        const groundY = 450;
        const ceilingY = 50;
        const objects = [];
        
        // Floor and ceiling
        for (let i = 0; i < 150; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY,
                width: BS, height: BS, color: '#3a3a6a', solid: true
            });
            objects.push({
                type: 'block', x: i * BS, y: ceilingY - BS,
                width: BS, height: BS, color: '#3a3a6a', solid: true
            });
        }
        
        // Start as ship immediately
        objects.push({ type: 'portal', x: BS * 2, y: groundY - BS * 4, width: BS * 0.8, height: BS * 4, portalType: GD.PORTAL_TYPES.SHIP });
        
        // Obstacles
        for (let i = 8; i < 80; i += 6) {
            const gapCenter = groundY - BS * 2 - Math.sin(i * 0.3) * BS * 2;
            const gapSize = BS * 3;
            
            // Top obstacle
            objects.push({
                type: 'spike', x: i * BS, y: ceilingY,
                width: BS, height: gapCenter - gapSize / 2 - ceilingY,
                direction: 'down', hazard: true
            });
            
            // Bottom obstacle
            objects.push({
                type: 'spike', x: i * BS, y: gapCenter + gapSize / 2,
                width: BS, height: groundY - gapCenter - gapSize / 2,
                direction: 'up', hazard: true
            });
        }
        
        return {
            name: 'Ship Challenge',
            author: 'System',
            description: 'Navigate through tight spaces!',
            bpm: 140,
            speed: 2,
            startMode: GD.MODES.CUBE,
            bgColor: '#001133',
            groundColor: '#2a2a5a',
            groundY: groundY,
            ceilingY: ceilingY,
            objects: objects.map(o => LevelSerializer._deserializeObject({
                type: o.type, x: o.x, y: o.y,
                w: o.width, h: o.height,
                c: o.color, dir: o.direction,
                haz: o.hazard, sol: o.solid,
                prt: o.portalType
            })),
            colorChannels: {},
            guidelines: [],
            musicStyle: 'electronic',
            musicDuration: 45
        };
    }
    
    _createMixedLevel() {
        const BS = GD.BLOCK_SIZE;
        const groundY = 400;
        const objects = [];
        
        // Floor
        for (let i = 0; i < 250; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY,
                width: BS, height: BS, color: '#5a2a2a', solid: true
            });
        }
        
        // Cube section
        for (let i = 6; i < 25; i += 4) {
            objects.push({ type: 'spike', x: i * BS, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        }
        
        // Ball portal
        objects.push({ type: 'portal', x: BS * 30, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.BALL });
        
        // Ball section ceiling
        for (let i = 32; i < 55; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY - BS * 6,
                width: BS, height: BS, color: '#5a2a2a', solid: true
            });
        }
        
        // Ball spikes
        for (let i = 35; i < 50; i += 3) {
            objects.push({ type: 'spike', x: i * BS, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
            objects.push({ type: 'spike', x: (i + 1) * BS, y: groundY - BS * 5, width: BS, height: BS, direction: 'down', hazard: true });
        }
        
        // Wave portal
        objects.push({ type: 'portal', x: BS * 55, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.WAVE });
        
        // Wave section ceiling
        for (let i = 57; i < 80; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY - BS * 7,
                width: BS, height: BS, color: '#5a2a2a', solid: true
            });
        }
        
        // Wave obstacles
        for (let i = 60; i < 75; i += 4) {
            objects.push({
                type: 'block', x: i * BS, y: groundY - BS * 4,
                width: BS, height: BS * 2, color: '#8a2a2a', solid: true, hazard: true
            });
        }
        
        // Back to cube
        objects.push({ type: 'portal', x: BS * 80, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.CUBE });
        
        // Speed change
        objects.push({ type: 'portal', x: BS * 85, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.SPEED_DOUBLE });
        
        // Fast section
        for (let i = 88; i < 110; i += 3) {
            objects.push({ type: 'spike', x: i * BS, y: groundY - BS, width: BS, height: BS, direction: 'up', hazard: true });
        }
        
        // UFO portal
        objects.push({ type: 'portal', x: BS * 115, y: groundY - BS * 3, width: BS * 0.8, height: BS * 3, portalType: GD.PORTAL_TYPES.UFO });
        
        // UFO ceiling
        for (let i = 117; i < 140; i++) {
            objects.push({
                type: 'block', x: i * BS, y: groundY - BS * 8,
                width: BS, height: BS, color: '#5a2a2a', solid: true
            });
        }
        
        // End
        objects.push({
            type: 'block', x: BS * 145, y: groundY - BS * 5,
            width: BS * 2, height: BS * 5, color: '#44ff44', solid: true
        });
        
        return {
            name: 'Mixed Modes',
            author: 'System',
            description: 'Experience all game modes!',
            bpm: 150,
            speed: 1,
            startMode: GD.MODES.CUBE,
            bgColor: '#330011',
            groundColor: '#5a2a2a',
            groundY: groundY,
            ceilingY: 0,
            objects: objects.map(o => LevelSerializer._deserializeObject({
                type: o.type, x: o.x, y: o.y,
                w: o.width, h: o.height,
                c: o.color, dir: o.direction,
                haz: o.hazard, sol: o.solid,
                prt: o.portalType
            })),
            colorChannels: {},
            guidelines: [],
            musicStyle: 'electronic',
            musicDuration: 60
        };
    }
}
```

---

## js/game/InputManager.js

```javascript
class InputManager {
    constructor() {
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        this._wasPressed = false;
        this._keys = {};
        this._touches = {};
        this._mouseDown = false;
        
        this._bindEvents();
    }
    
    _bindEvents() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this._keys[e.code] = true;
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                this._mouseDown = true;
                e.preventDefault();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this._keys[e.code] = false;
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                this._mouseDown = false;
            }
        });
        
        // Mouse
        document.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this._mouseDown = true;
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this._mouseDown = false;
            }
        });
        
        // Touch
        document.addEventListener('touchstart', (e) => {
            this._mouseDown = true;
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            this._mouseDown = false;
        });
        
        document.addEventListener('touchcancel', (e) => {
            this._mouseDown = false;
        });
        
        // Prevent context menu
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    update() {
        this.pressed = this._mouseDown;
        this.justPressed = this.pressed && !this._wasPressed;
        this.justReleased = !this.pressed && this._wasPressed;
        this._wasPressed = this.pressed;
    }
    
    isKeyDown(code) {
        return this._keys[code] || false;
    }
    
    isActionPressed() {
        return this._mouseDown ||
            this._keys['Space'] ||
            this._keys['ArrowUp'] ||
            this._keys['KeyW'];
    }
    
    reset() {
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        this._wasPressed = false;
        this._mouseDown = false;
    }
}
```

---

## js/game/Game.js

```javascript
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.renderer = new Renderer(this.canvas);
        this.audio = new Audio();
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.physics = new Physics();
        this.collision = new CollisionSystem();
        this.input = new InputManager();
        this.triggerSystem = new TriggerSystem(this);
        this.levelManager = new LevelManager();
        
        this.player = new Player();
        this.dualPlayer = new DualPlayer(this.player);
        
        // Game modes
        this.modes = {
            [GD.MODES.CUBE]: new CubeMode(),
            [GD.MODES.SHIP]: new ShipMode(),
            [GD.MODES.BALL]: new BallMode(),
            [GD.MODES.UFO]: new UFOMode(),
            [GD.MODES.WAVE]: new WaveMode(),
            [GD.MODES.ROBOT]: new RobotMode(),
            [GD.MODES.SPIDER]: new SpiderMode(),
            [GD.MODES.SWING]: new SwingMode()
        };
        
        // Level state
        this.currentLevel = null;
        this.levelObjects = [];
        this.solidObjects = [];
        this.hazardObjects = [];
        this.orbObjects = [];
        this.padObjects = [];
        this.portalObjects = [];
        this.triggerObjects = [];
        this.coinObjects = [];
        this.decorationObjects = [];
        
        this.groundY = GD.GROUND_Y;
        this.ceilingY = GD.CEILING_Y;
        this.levelLength = 0;
        
        // Game state
        this.state = 'menu'; // menu, playing, paused, dead, complete, editor
        this.practiceMode = false;
        this.attempts = 0;
        this.progress = 0;
        this.startTime = 0;
        this.gameTime = 0;
        this.deathTimer = 0;
        this.completeTimer = 0;
        this.coinsCollected = 0;
        this.totalCoins = 0;
        
        // Music
        this.musicBuffer = null;
        
        // Animation frame
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDt = 1 / 240; // Physics at 240fps
        this.running = false;
        
        // UI references
        this.ui = null;
    }
    
    async init() {
        await this.audio.init();
        this.levelManager.init();
        this.ui = new UIManager(this);
        this.ui.showMenu();
        
        this.running = true;
        requestAnimationFrame((t) => this.loop(t));
    }
    
    loop(timestamp) {
        if (!this.running) return;
        
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05); // Cap at 50ms
        this.lastTime = timestamp;
        
        this.input.update();
        
        switch (this.state) {
            case 'playing':
                this.accumulator += dt;
                while (this.accumulator >= this.fixedDt) {
                    this.fixedUpdate(this.fixedDt);
                    this.accumulator -= this.fixedDt;
                }
                this.gameTime += dt;
                break;
            case 'dead':
                this.deathTimer += dt;
                if (this.deathTimer > 1.0) {
                    this.respawn();
                }
                break;
            case 'complete':
                this.completeTimer += dt;
                break;
        }
        
        this.render(dt);
        
        requestAnimationFrame((t) => this.loop(t));
    }
    
    fixedUpdate(dt) {
        if (this.player.isDead) return;
        
        const mode = this.modes[this.player.mode];
        if (!mode) return;
        
        // Handle input
        const inputResult = mode.handleInput(this.player, this.input, this.physics, dt);
        
        if (inputResult === 'jump') {
            this.audio.playSFX('jump');
        } else if (inputResult === 'teleport') {
            // Spider teleport
            const spiderMode = this.modes[GD.MODES.SPIDER];
            spiderMode.performTeleport(this.player, this.physics, this._getCurrentGroundY(), this._getCurrentCeilingY());
            this.audio.playSFX('gravityFlip');
        }
        
        // Handle orb activation
        if (this.input.justPressed && this.player.canActivateOrb && this.player.currentOrb) {
            const result = this.player.currentOrb.activate(this.player, this.physics);
            if (result) {
                this.audio.playSFX(result.sound || 'orb');
                if (result.triggerGroupId) {
                    // Trigger orb activates a trigger group
                    const triggers = this.triggerObjects.filter(t => t.isInGroup(result.triggerGroupId));
                    for (const trig of triggers) {
                        const trigResult = trig.activate();
                        this.triggerSystem.executeTrigger(trigResult);
                    }
                }
            }
            this.player.orbActivated = true;
        }
        
        // Handle dash
        if (this.player.dashing) {
            this.player.dashTimer -= dt;
            if (this.player.dashTimer <= 0) {
                this.player.dashing = false;
                this.player.velocityY = 0;
            }
        }
        
        // Apply mode physics
        mode.update(this.player, this.physics, dt, this._getCurrentGroundY(), this._getCurrentCeilingY());
        
        // Move player forward
        this.player.x += this.player.velocityX * dt;
        
        // Update rotation
        this.player.updateRotation(dt);
        
        // Update trail
        this.player.updateTrail(dt);
        
        // Collision detection
        this._checkCollisions();
        
        // Check triggers
        this._checkTriggers();
        
        // Update trigger system
        this.triggerSystem.update(dt);
        
        // Update all objects
        for (const obj of this.levelObjects) {
            obj.update(dt);
        }
        
        // Update dual player
        if (this.dualPlayer.isActive()) {
            this.dualPlayer.update(dt);
            const dualMode = this.modes[this.dualPlayer.secondary.mode];
            if (dualMode) {
                // Dual player uses same input but opposite gravity
                dualMode.handleInput(this.dualPlayer.secondary, this.input, this.physics, dt);
                dualMode.update(this.dualPlayer.secondary, this.physics, dt, this._getCurrentGroundY(), this._getCurrentCeilingY());
            }
        }
        
        // Update progress
        this.progress = MathUtils.clamp(this.player.x / this.levelLength, 0, 1);
        
        // Check level complete
        if (this.player.x >= this.levelLength) {
            this.completeLevel();
        }
        
        // Check bounds death

You
Continue
Assistant


## js/game/Game.js (continued)

```javascript
        // Check bounds death
        if (this.player.y > this.groundY + GD.BLOCK_SIZE * 5 ||
            this.player.y < this.ceilingY - GD.BLOCK_SIZE * 5) {
            this.killPlayer();
        }
        
        // Camera update
        this.camera.follow(this.player, dt);
    }
    
    _getCurrentGroundY() {
        return this.groundY;
    }
    
    _getCurrentCeilingY() {
        return this.ceilingY;
    }
    
    _checkCollisions() {
        const playerHitbox = this.player.getHitbox();
        const playerCenterX = this.player.getCenterX();
        const checkRange = this.canvas.width;
        
        // Reset orb state
        this.player.canActivateOrb = false;
        this.player.currentOrb = null;
        
        // Check solid objects
        for (const obj of this.solidObjects) {
            if (!obj.active || !obj.visible) continue;
            if (Math.abs(obj.x - playerCenterX) > checkRange) continue;
            
            const objRect = obj.getRect();
            
            if (MathUtils.aabbOverlap(playerHitbox, objRect)) {
                if (obj.hazard) {
                    this.killPlayer();
                    return;
                }
                
                // Solid collision resolution
                this._resolveSolidCollision(this.player, objRect);
            }
        }
        
        // Check hazards
        for (const obj of this.hazardObjects) {
            if (!obj.active || !obj.visible) continue;
            if (Math.abs(obj.x - playerCenterX) > checkRange) continue;
            
            const hazardHitbox = obj.getHitbox();
            
            if (MathUtils.aabbOverlap(playerHitbox, hazardHitbox)) {
                // Additional triangle check for spikes
                if (obj.type === 'spike') {
                    if (this.collision.pointInTriangle(
                        this.player.getCenterX(), this.player.getCenterY(),
                        obj.x, obj.y, obj.width, obj.height, obj.direction
                    )) {
                        this.killPlayer();
                        return;
                    }
                } else {
                    this.killPlayer();
                    return;
                }
            }
        }
        
        // Check orbs
        for (const orb of this.orbObjects) {
            if (!orb.active) continue;
            if (Math.abs(orb.x - playerCenterX) > checkRange) continue;
            
            if (orb.canActivate(this.player)) {
                this.player.canActivateOrb = true;
                this.player.currentOrb = orb;
                this.player.orbActivated = false;
                break;
            }
        }
        
        // Check pads (auto-activate)
        for (const pad of this.padObjects) {
            if (!pad.active) continue;
            if (Math.abs(pad.x - playerCenterX) > checkRange) continue;
            
            if (pad.checkAutoActivate(this.player)) {
                const result = pad.activate(this.player, this.physics);
                if (result) {
                    this.audio.playSFX(result.sound || 'pad');
                }
            }
        }
        
        // Check portals
        for (const portal of this.portalObjects) {
            if (!portal.active) continue;
            if (Math.abs(portal.x - playerCenterX) > checkRange) continue;
            
            if (portal.checkActivation(this.player)) {
                const result = portal.activate(this.player, this);
                if (result) {
                    this._handlePortalResult(result);
                }
            }
        }
        
        // Check coins
        for (const coin of this.coinObjects) {
            if (coin.collected) continue;
            if (Math.abs(coin.x - playerCenterX) > checkRange) continue;
            
            if (MathUtils.aabbOverlap(playerHitbox, coin.getRect())) {
                coin.collected = true;
                this.coinsCollected++;
                this.audio.playSFX('coin');
                this.renderer.spawnParticles(
                    coin.x + coin.width / 2,
                    coin.y + coin.height / 2,
                    '#ffdd00', 15, 150
                );
            }
        }
    }
    
    _resolveSolidCollision(player, objRect) {
        const playerRect = player.getRect();
        
        // Calculate overlap on each axis
        const overlapLeft = (playerRect.x + playerRect.width) - objRect.x;
        const overlapRight = (objRect.x + objRect.width) - playerRect.x;
        const overlapTop = (playerRect.y + playerRect.height) - objRect.y;
        const overlapBottom = (objRect.y + objRect.height) - playerRect.y;
        
        // Find minimum overlap
        const minOverlapX = Math.min(overlapLeft, overlapRight);
        const minOverlapY = Math.min(overlapTop, overlapBottom);
        
        if (minOverlapX < minOverlapY) {
            // Horizontal collision
            if (overlapLeft < overlapRight) {
                // Hit right side of player -> wall on right
                // In GD, hitting a wall kills you (you're moving right)
                this.killPlayer();
            } else {
                // This shouldn't normally happen in GD (moving left into wall)
                player.x = objRect.x + objRect.width;
            }
        } else {
            // Vertical collision
            if (overlapTop < overlapBottom) {
                // Landing on top (gravity down) or hitting ceiling (gravity up)
                if (player.gravityDirection > 0) {
                    player.y = objRect.y - player.height;
                    player.velocityY = 0;
                    player.onGround = true;
                } else {
                    // Hit ceiling while gravity is normal
                    player.y = objRect.y - player.height;
                    player.velocityY = 0;
                }
            } else {
                // Hitting bottom (gravity down) or landing (gravity up)
                if (player.gravityDirection < 0) {
                    player.y = objRect.y + objRect.height;
                    player.velocityY = 0;
                    player.onGround = true;
                } else {
                    // Hit bottom of block
                    player.y = objRect.y + objRect.height;
                    player.velocityY = 0;
                }
            }
        }
    }
    
    _handlePortalResult(result) {
        if (result.newMode) {
            const oldMode = this.modes[this.player.mode];
            if (oldMode) oldMode.onExit(this.player);
            
            this.player.setMode(result.newMode);
            
            const newMode = this.modes[this.player.mode];
            if (newMode) newMode.onEnter(this.player);
            
            this.audio.playSFX('portal');
        }
        
        if (result.gravityFlip || result.gravityNormal) {
            this.player.gravityDirection = result.newGravity;
            this.player.onGround = false;
            this.audio.playSFX('gravityFlip');
        }
        
        if (result.newSpeed !== undefined) {
            this.player.setSpeed(result.newSpeed);
            this.audio.playSFX('speedChange');
        }
        
        if (result.mini !== undefined) {
            this.player.setMini(result.mini);
            this.audio.playSFX('portal');
        }
        
        if (result.mirror !== undefined) {
            // Mirror portal - flip visuals (simplified)
            this.camera.mirror = !this.camera.mirror;
            this.audio.playSFX('portal');
        }
        
        if (result.dual !== undefined) {
            if (result.dual) {
                this.dualPlayer.activate();
            } else {
                this.dualPlayer.deactivate();
            }
            this.audio.playSFX('portal');
        }
        
        if (result.teleportTo) {
            this.player.y = result.teleportTo.y;
            // Don't change X in GD - player keeps moving forward
            this.audio.playSFX('portal');
        }
    }
    
    _checkTriggers() {
        const playerX = this.player.x;
        
        for (const trigger of this.triggerObjects) {
            if (!trigger.active) continue;
            
            if (trigger.checkActivation(playerX)) {
                const result = trigger.activate();
                this.triggerSystem.executeTrigger(result);
            }
        }
    }
    
    killPlayer() {
        if (this.player.isDead) return;
        
        this.player.die();
        this.deathTimer = 0;
        this.state = 'dead';
        
        this.audio.playSFX('death');
        this.renderer.spawnParticles(
            this.player.deathX, this.player.deathY,
            this.player.primaryColor, 20, 300
        );
        
        if (this.practiceMode) {
            // In practice mode, respawn at last checkpoint
        }
    }
    
    respawn() {
        if (this.practiceMode && this.player.checkpointX > 0) {
            this.player.loadCheckpoint();
            this.state = 'playing';
        } else {
            this.restartLevel();
        }
    }
    
    completeLevel() {
        if (this.state === 'complete') return;
        
        this.state = 'complete';
        this.completeTimer = 0;
        this.audio.playSFX('complete');
        
        // Save best progress
        if (this.currentLevel) {
            const key = `gd_progress_${this.currentLevel.name}`;
            const existing = localStorage.getItem(key);
            const bestAttempts = existing ? Math.min(this.attempts, parseInt(existing)) : this.attempts;
            localStorage.setItem(key, bestAttempts.toString());
            localStorage.setItem(`gd_complete_${this.currentLevel.name}`, 'true');
        }
        
        this.ui.showCompleteScreen(this.attempts, this.coinsCollected, this.totalCoins);
    }
    
    loadLevel(levelData) {
        this.currentLevel = levelData;
        
        // Clear old objects
        this.levelObjects = [];
        this.solidObjects = [];
        this.hazardObjects = [];
        this.orbObjects = [];
        this.padObjects = [];
        this.portalObjects = [];
        this.triggerObjects = [];
        this.coinObjects = [];
        this.decorationObjects = [];
        
        // Set level properties
        this.groundY = levelData.groundY || GD.GROUND_Y;
        this.ceilingY = levelData.ceilingY || GD.CEILING_Y;
        this.renderer.setBGColor(levelData.bgColor || GD.COLORS.BG_DEFAULT);
        this.renderer.setGroundColor(levelData.groundColor || GD.COLORS.GROUND_DEFAULT);
        
        // Color channels
        if (levelData.colorChannels) {
            for (const [id, color] of Object.entries(levelData.colorChannels)) {
                this.renderer.setColorChannel(id, color);
            }
        }
        
        // Parse objects
        let maxX = 0;
        
        for (const obj of levelData.objects) {
            this.levelObjects.push(obj);
            
            if (obj.x + obj.width > maxX) {
                maxX = obj.x + obj.width;
            }
            
            // Categorize
            if (obj instanceof Hazard || obj.hazard) {
                this.hazardObjects.push(obj);
            } else if (obj instanceof Orb) {
                this.orbObjects.push(obj);
            } else if (obj instanceof Pad) {
                this.padObjects.push(obj);
            } else if (obj instanceof Portal) {
                this.portalObjects.push(obj);
            } else if (obj instanceof Trigger) {
                this.triggerObjects.push(obj);
            } else if (obj.type === 'coin') {
                this.coinObjects.push(obj);
            } else if (obj.type === 'decoration') {
                this.decorationObjects.push(obj);
            } else if (obj.solid) {
                this.solidObjects.push(obj);
            }
            
            // Register groups
            if (obj.groupId) {
                const group = this.triggerSystem.getGroupObjects(obj.groupId);
                if (group.length === 0) {
                    this.triggerSystem.registerGroup(obj.groupId, [obj]);
                } else {
                    group.push(obj);
                }
            }
            if (obj.groups) {
                for (const gid of obj.groups) {
                    const group = this.triggerSystem.getGroupObjects(gid);
                    if (group.length === 0) {
                        this.triggerSystem.registerGroup(gid, [obj]);
                    } else {
                        group.push(obj);
                    }
                }
            }
        }
        
        // Link teleport portals
        const teleportPortals = this.portalObjects.filter(p => p.portalType === GD.PORTAL_TYPES.TELEPORT);
        for (const portal of teleportPortals) {
            if (portal.linkedPortalId) {
                portal.linkedPortal = this.portalObjects.find(p => p.id === portal.linkedPortalId);
            }
        }
        
        this.levelLength = maxX + GD.BLOCK_SIZE * 5;
        this.totalCoins = this.coinObjects.length;
        
        // Sort objects by z-order for rendering
        this.levelObjects.sort((a, b) => (a.zOrder || 0) - (b.zOrder || 0));
    }
    
    startLevel(levelData) {
        this.loadLevel(levelData);
        
        // Reset player
        this.player.reset(GD.BLOCK_SIZE * 2, this.groundY - GD.PLAYER_SIZE);
        this.player.setSpeed(levelData.speed !== undefined ? levelData.speed : 1);
        
        if (levelData.startMode && levelData.startMode !== GD.MODES.CUBE) {
            this.player.setMode(levelData.startMode);
            const mode = this.modes[this.player.mode];
            if (mode) mode.onEnter(this.player);
        }
        
        // Reset game state
        this.state = 'playing';
        this.attempts = 1;
        this.progress = 0;
        this.gameTime = 0;
        this.coinsCollected = 0;
        this.deathTimer = 0;
        this.completeTimer = 0;
        
        // Reset trigger system
        this.triggerSystem.reset();
        
        // Re-register groups after reset
        for (const obj of this.levelObjects) {
            if (obj.groupId) {
                const group = this.triggerSystem.getGroupObjects(obj.groupId);
                if (group.length === 0) {
                    this.triggerSystem.registerGroup(obj.groupId, [obj]);
                } else if (!group.includes(obj)) {
                    group.push(obj);
                }
            }
        }
        
        // Reset camera
        this.camera.reset();
        this.camera.setTarget(this.player.getCenterX(), this.player.getCenterY());
        
        // Generate and play music
        this._startMusic(levelData);
        
        // Reset renderer particles
        this.renderer.particles = [];
        
        this.ui.showPlayingUI();
    }
    
    restartLevel() {
        if (!this.currentLevel) return;
        
        this.attempts++;
        
        // Reset player
        this.player.reset(GD.BLOCK_SIZE * 2, this.groundY - GD.PLAYER_SIZE);
        this.player.setSpeed(this.currentLevel.speed !== undefined ? this.currentLevel.speed : 1);
        
        if (this.currentLevel.startMode && this.currentLevel.startMode !== GD.MODES.CUBE) {
            this.player.setMode(this.currentLevel.startMode);
            const mode = this.modes[this.player.mode];
            if (mode) mode.onEnter(this.player);
        }
        
        // Reset all objects
        for (const obj of this.levelObjects) {
            if (obj.resetState) obj.resetState();
            if (obj.resetTriggerState) obj.resetTriggerState();
        }
        
        // Reset coins
        for (const coin of this.coinObjects) {
            coin.collected = false;
        }
        
        this.coinsCollected = 0;
        this.progress = 0;
        this.gameTime = 0;
        this.deathTimer = 0;
        this.state = 'playing';
        
        // Reset trigger system
        this.triggerSystem.reset();
        for (const obj of this.levelObjects) {
            if (obj.groupId) {
                const group = this.triggerSystem.getGroupObjects(obj.groupId);
                if (group.length === 0) {
                    this.triggerSystem.registerGroup(obj.groupId, [obj]);
                } else if (!group.includes(obj)) {
                    group.push(obj);
                }
            }
        }
        
        // Reset camera
        this.camera.reset();
        this.camera.setTarget(this.player.getCenterX(), this.player.getCenterY());
        
        // Restart music
        this._startMusic(this.currentLevel);
        
        // Reset particles
        this.renderer.particles = [];
        
        this.ui.updateAttempts(this.attempts);
    }
    
    async _startMusic(levelData) {
        this.audio.stopMusic();
        
        try {
            const bpm = levelData.bpm || GD.DEFAULT_BPM;
            const style = levelData.musicStyle || 'electronic';
            const duration = levelData.musicDuration || 60;
            
            this.musicBuffer = this.audio.generateMusic(bpm, style, duration);
            if (this.musicBuffer) {
                this.audio.playMusic(this.musicBuffer);
            }
        } catch (e) {
            console.warn('Failed to generate music:', e);
        }
    }
    
    pauseGame() {
        if (this.state !== 'playing') return;
        this.state = 'paused';
        this.audio.pauseMusic();
        this.ui.showPauseMenu();
    }
    
    resumeGame() {
        if (this.state !== 'paused') return;
        this.state = 'playing';
        this.audio.resumeMusic();
        this.ui.showPlayingUI();
    }
    
    exitToMenu() {
        this.state = 'menu';
        this.audio.stopMusic();
        this.currentLevel = null;
        this.ui.showMenu();
    }
    
    togglePracticeMode() {
        this.practiceMode = !this.practiceMode;
        if (this.practiceMode) {
            this.player.saveCheckpoint();
        }
    }
    
    placeCheckpoint() {
        if (this.practiceMode && this.state === 'playing') {
            this.player.saveCheckpoint();
            this.audio.playSFX('checkpoint');
        }
    }
    
    render(dt) {
        const ctx = this.renderer.ctx;
        
        // Clear
        this.renderer.clear();
        
        if (this.state === 'menu') {
            this.ui.renderMenu(ctx, this.gameTime || 0);
            return;
        }
        
        if (!this.currentLevel) return;
        
        // Apply camera transform
        ctx.save();
        this.camera.applyTransform(ctx);
        
        // Draw background
        this.renderer.drawBackground(this.camera, this.gameTime);
        
        // Draw ground
        this.renderer.drawGround(this.groundY, this.camera);
        
        // Draw ceiling if applicable
        if (this.ceilingY > 0) {
            this.renderer.drawCeiling(this.ceilingY, this.camera);
        }
        
        // Determine visible range
        const visibleLeft = this.camera.x - this.canvas.width;
        const visibleRight = this.camera.x + this.canvas.width * 2;
        
        // Draw decorations (behind)
        for (const obj of this.decorationObjects) {
            if (!obj.visible || !obj.active) continue;
            if (obj.x + obj.width < visibleLeft || obj.x > visibleRight) continue;
            if (obj.zOrder < 0) {
                this.renderer.drawDecoration(obj);
            }
        }
        
        // Draw level objects
        for (const obj of this.levelObjects) {
            if (!obj.visible || !obj.active) continue;
            if (obj.x + obj.width < visibleLeft || obj.x > visibleRight) continue;
            
            switch (obj.type) {
                case 'block':
                    this.renderer.drawBlock(obj);
                    break;
                case 'spike':
                    this.renderer.drawSpike(obj);
                    break;
                case 'orb':
                    this.renderer.drawOrb(obj, this.gameTime);
                    break;
                case 'pad':
                    this.renderer.drawPad(obj, this.gameTime);
                    break;
                case 'portal':
                    this.renderer.drawPortal(obj, this.gameTime);
                    break;
                case 'trigger':
                    this.renderer.drawTrigger(obj);
                    break;
                case 'coin':
                    this.renderer.drawCoin(obj, this.gameTime);
                    break;
                case 'decoration':
                    if (obj.zOrder >= 0) {
                        this.renderer.drawDecoration(obj);
                    }
                    break;
            }
        }
        
        // Draw player
        if (!this.player.isDead) {
            this.renderer.drawPlayer(this.player, this.gameTime);
        }
        
        // Draw dual player
        if (this.dualPlayer.isActive() && !this.dualPlayer.secondary.isDead) {
            this.renderer.drawPlayer(this.dualPlayer.secondary, this.gameTime);
        }
        
        // Draw death effect
        if (this.player.isDead) {
            this.player.deathEffectTimer += dt;
            this.renderer.drawDeathEffect(
                this.player.deathX, this.player.deathY,
                this.player.deathEffectTimer,
                this.player.primaryColor
            );
        }
        
        // Draw particles
        this.renderer.updateParticles(dt);
        this.renderer.drawParticles();
        
        // Decorations (front)
        for (const obj of this.decorationObjects) {
            if (!obj.visible || !obj.active) continue;
            if (obj.x + obj.width < visibleLeft || obj.x > visibleRight) continue;
            if (obj.zOrder > 0) {
                this.renderer.drawDecoration(obj);
            }
        }
        
        ctx.restore();
        
        // Draw UI overlay
        this._drawUI(ctx);
    }
    
    _drawUI(ctx) {
        // Progress bar
        if (this.state === 'playing' || this.state === 'dead') {
            const barWidth = this.canvas.width * 0.6;
            const barHeight = 8;
            const barX = (this.canvas.width - barWidth) / 2;
            const barY = 15;
            
            // Background
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Fill
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(barX, barY, barWidth * this.progress, barHeight);
            
            // Border
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
            
            // Percentage
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(
                `${Math.floor(this.progress * 100)}%`,
                this.canvas.width / 2,
                barY + barHeight + 18
            );
            
            // Attempts
            ctx.textAlign = 'left';
            ctx.fillText(`Attempt ${this.attempts}`, 10, 25);
            
            // Practice mode indicator
            if (this.practiceMode) {
                ctx.fillStyle = '#ffaa00';
                ctx.textAlign = 'right';
                ctx.fillText('PRACTICE', this.canvas.width - 10, 25);
            }
            
            // Coins
            if (this.totalCoins > 0) {
                ctx.fillStyle = '#ffdd00';
                ctx.textAlign = 'right';
                ctx.fillText(`★ ${this.coinsCollected}/${this.totalCoins}`, this.canvas.width - 10, 50);
            }
        }
        
        // Complete screen overlay
        if (this.state === 'complete') {
            const alpha = Math.min(this.completeTimer * 2, 0.8);
            ctx.fillStyle = `rgba(0,0,0,${alpha})`;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            if (this.completeTimer > 0.5) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 48px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('LEVEL COMPLETE!', this.canvas.width / 2, this.canvas.height / 2 - 40);
                
                ctx.font = '24px sans-serif';
                ctx.fillText(`Attempts: ${this.attempts}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
                
                if (this.totalCoins > 0) {
                    ctx.fillStyle = '#ffdd00';
                    ctx.fillText(
                        `Coins: ${this.coinsCollected}/${this.totalCoins}`,
                        this.canvas.width / 2,
                        this.canvas.height / 2 + 55
                    );
                }
                
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.font = '16px sans-serif';
                ctx.fillText('Click to continue', this.canvas.width / 2, this.canvas.height / 2 + 100);
                
                if (this.input.justPressed && this.completeTimer > 1.5) {
                    this.exitToMenu();
                }
            }
        }
        
        // Paused overlay
        if (this.state === 'paused') {
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2 - 60);
            
            // Buttons drawn by UIManager
        }
    }
}
```

---

## js/game/Camera.js

```javascript
class Camera {
    constructor(viewWidth, viewHeight) {
        this.x = 0;
        this.y = 0;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        
        this.zoom = 1;
        this.targetZoom = 1;
        this.zoomSpeed = 2;
        
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.followY = false;
        this.mirror = false;
        
        this.shakeIntensity = 0;
        this.shakeTimer = 0;
        this.shakeX = 0;
        this.shakeY = 0;
        
        // Smoothing
        this.smoothX = 0;
        this.smoothY = 0;
    }
    
    reset() {
        this.zoom = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.followY = false;
        this.mirror = false;
        this.shakeIntensity = 0;
        this.shakeTimer = 0;
    }
    
    setTarget(x, y) {
        this.smoothX = x;
        this.smoothY = y;
    }
    
    follow(player, dt) {
        // X: camera leads the player slightly
        const targetX = player.getCenterX() + this.viewWidth * 0.15;
        this.smoothX = MathUtils.lerp(this.smoothX, targetX, 0.1);
        
        // Y: follow player in ship/UFO modes or when followY is enabled
        if (this.followY || player.mode === GD.MODES.SHIP || 
            player.mode === GD.MODES.UFO || player.mode === GD.MODES.WAVE ||
            player.mode === GD.MODES.SWING) {
            const targetY = player.getCenterY();
            this.smoothY = MathUtils.lerp(this.smoothY, targetY, 0.05);
        } else {
            // Default: center on ground level
            const defaultY = GD.GROUND_Y - this.viewHeight * 0.3;
            this.smoothY = MathUtils.lerp(this.smoothY, defaultY, 0.03);
        }
        
        this.x = this.smoothX - this.viewWidth / (2 * this.zoom);
        this.y = this.smoothY - this.viewHeight / (2 * this.zoom);
        
        // Smooth zoom
        this.zoom = MathUtils.lerp(this.zoom, this.targetZoom, this.zoomSpeed * dt);
        
        // Smooth offsets
        this.offsetX = MathUtils.lerp(this.offsetX, this.targetOffsetX, 3 * dt);
        this.offsetY = MathUtils.lerp(this.offsetY, this.targetOffsetY, 3 * dt);
        
        // Screen shake
        if (this.shakeTimer > 0) {
            this.shakeTimer -= dt;
            this.shakeX = (Math.random() - 0.5) * this.shakeIntensity;
            this.shakeY = (Math.random() - 0.5) * this.shakeIntensity;
            this.shakeIntensity *= 0.9;
        } else {
            this.shakeX = 0;
            this.shakeY = 0;
        }
    }
    
    shake(intensity, duration) {
        this.shakeIntensity = intensity;
        this.shakeTimer = duration;
    }
    
    applyTransform(ctx) {
        ctx.save();
        
        // Center point
        const cx = this.viewWidth / 2;
        const cy = this.viewHeight / 2;
        
        // Apply shake
        ctx.translate(this.shakeX, this.shakeY);
        
        // Apply zoom
        ctx.translate(cx, cy);
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-cx, -cy);
        
        // Apply mirror
        if (this.mirror) {
            ctx.translate(this.viewWidth, 0);
            ctx.scale(-1, 1);
        }
        
        // Apply camera position
        ctx.translate(-this.x + this.offsetX, -this.y + this.offsetY);
    }
    
    screenToWorld(screenX, screenY) {
        const x = screenX / this.zoom + this.x - this.offsetX;
        const y = screenY / this.zoom + this.y - this.offsetY;
        return { x, y };
    }
    
    worldToScreen(worldX, worldY) {
        const x = (worldX - this.x + this.offsetX) * this.zoom;
        const y = (worldY - this.y + this.offsetY) * this.zoom;
        return { x, y };
    }
    
    isVisible(x, y, width, height) {
        return x + width > this.x - 100 &&
               x < this.x + this.viewWidth / this.zoom + 100 &&
               y + height > this.y - 100 &&
               y < this.y + this.viewHeight / this.zoom + 100;
    }
}
```

---

## js/ui/UIManager.js

```javascript
class UIManager {
    constructor(game) {
        this.game = game;
        this.buttons = [];
        this.currentScreen = 'menu';
        this.menuAnimation = 0;
        this.selectedLevel = null;
        
        this._setupClickHandler();
        this._setupKeyHandler();
    }
    
    _setupClickHandler() {
        this.game.canvas.addEventListener('click', (e) => {
            const rect = this.game.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.game.canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (this.game.canvas.height / rect.height);
            
            this._handleClick(x, y);
        });
    }
    
    _setupKeyHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                if (this.game.state === 'playing') {
                    this.game.pauseGame();
                } else if (this.game.state === 'paused') {
                    this.game.resumeGame();
                }
            }
            
            if (e.code === 'KeyR' && this.game.state === 'playing') {
                this.game.restartLevel();
            }
            
            if (e.code === 'KeyP' && this.game.state === 'playing') {
                this.game.togglePracticeMode();
            }
            
            if (e.code === 'KeyC' && this.game.practiceMode && this.game.state === 'playing') {
                this.game.placeCheckpoint();
            }
        });
    }
    
    _handleClick(x, y) {
        for (const btn of this.buttons) {
            if (x >= btn.x && x <= btn.x + btn.width &&
                y >= btn.y && y <= btn.y + btn.height) {
                if (btn.action) btn.action();
                return;
            }
        }
        
        // Click during complete screen
        if (this.game.state === 'complete' && this.game.completeTimer > 1.5) {
            this.game.exitToMenu();
        }
    }
    
    showMenu() {
        this.currentScreen = 'menu';
        this.buttons = [];
        
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        const btnW = 250;
        const btnH = 50;
        const startY = ch * 0.4;
        const spacing = 65;
        
        // Play button (level select)
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY,
            width: btnW, height: btnH,
            text: 'PLAY',
            color: '#44aa44',
            action: () => this.showLevelSelect()
        });
        
        // Editor button
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY + spacing,
            width: btnW, height: btnH,
            text: 'EDITOR',
            color: '#4444aa',
            action: () => this.showEditor()
        });
        
        // Settings button
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY + spacing * 2,
            width: btnW, height: btnH,
            text: 'SETTINGS',
            color: '#666666',
            action: () => this.showSettings()
        });
    }
    
    showLevelSelect() {
        this.currentScreen = 'levelSelect';
        this.buttons = [];
        
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        const btnW = 300;
        const btnH = 45;
        const startY = 100;
        const spacing = 55;
        
        const levels = this.game.levelManager.getAllLevels();
        
        levels.forEach((level, i) => {
            const isComplete = localStorage.getItem(`gd_complete_${level.name}`) === 'true';
            
            this.buttons.push({
                x: (cw - btnW) / 2, y: startY + i * spacing,
                width: btnW, height: btnH,
                text: `${isComplete ? '★ ' : ''}${level.name}`,
                color: isComplete ? '#44aa44' : '#4444aa',
                action: () => {
                    this.game.startLevel(level);
                }
            });
        });
        
        // Back button
        this.buttons.push({
            x: 20, y: ch - 60,
            width: 100, height: 40,
            text: 'BACK',
            color: '#aa4444',
            action: () => this.showMenu()
        });
    }
    
    showEditor() {
        this.currentScreen = 'editor';
        this.game.state = 'editor';
        
        // Initialize editor if not already
        if (!this.game.editor) {
            this.game.editor = new Editor(this.game);
        }
        this.game.editor.activate();
    }
    
    showSettings() {
        this.currentScreen = 'settings';
        this.buttons = [];
        
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        const btnW = 250;
        const btnH = 45;
        const startY = 120;
        const spacing = 55;
        
        // Volume toggle
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY,
            width: btnW, height: btnH,
            text: `MUSIC: ${this.game.audio.musicVolume > 0 ? 'ON' : 'OFF'}`,
            color: '#4444aa',
            action: () => {
                this.game.audio.musicVolume = this.game.audio.musicVolume > 0 ? 0 : 0.5;
                this.showSettings();
            }
        });
        
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY + spacing,
            width: btnW, height: btnH,
            text: `SFX: ${this.game.audio.sfxVolume > 0 ? 'ON' : 'OFF'}`,
            color: '#4444aa',
            action: () => {
                this.game.audio.sfxVolume = this.game.audio.sfxVolume > 0 ? 0 : 0.5;
                this.showSettings();
            }
        });
        
        // Back button
        this.buttons.push({
            x: 20, y: ch - 60,
            width: 100, height: 40,
            text: 'BACK',
            color: '#aa4444',
            action: () => this.showMenu()
        });
    }
    
    showPlayingUI() {
        this.currentScreen = 'playing';
        this.buttons = [];
        
        // Pause button (top right)
        this.buttons.push({
            x: this.game.canvas.width - 50, y: 5,
            width: 40, height: 30,
            text: '❚❚',
            color: 'rgba(255,255,255,0.3)',
            action: () => this.game.pauseGame()
        });
    }
    
    showPauseMenu() {
        this.currentScreen = 'paused';
        this.buttons = [];
        
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        const btnW = 200;
        const btnH = 45;
        const startY = ch / 2 - 20;
        const spacing = 55;
        
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY,
            width: btnW, height: btnH,
            text: 'RESUME',
            color: '#44aa44',
            action: () => this.game.resumeGame()
        });
        
        this.buttons.push({
            x: (cw - btnW) / 2

You
Continue
Assistant


## js/ui/UIManager.js (continued)

```javascript
            , y: startY + spacing,
            width: btnW, height: btnH,
            text: 'RESTART',
            color: '#aaaa44',
            action: () => {
                this.game.resumeGame();
                this.game.restartLevel();
            }
        });
        
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY + spacing * 2,
            width: btnW, height: btnH,
            text: this.game.practiceMode ? 'PRACTICE: ON' : 'PRACTICE: OFF',
            color: this.game.practiceMode ? '#ff8800' : '#666666',
            action: () => {
                this.game.togglePracticeMode();
                this.showPauseMenu(); // Refresh buttons
            }
        });
        
        this.buttons.push({
            x: (cw - btnW) / 2, y: startY + spacing * 3,
            width: btnW, height: btnH,
            text: 'EXIT',
            color: '#aa4444',
            action: () => this.game.exitToMenu()
        });
    }
    
    showCompleteScreen(attempts, coins, totalCoins) {
        this.currentScreen = 'complete';
        this.buttons = [];
        // Complete screen is rendered in Game._drawUI
    }
    
    updateAttempts(attempts) {
        // UI updates automatically from game state
    }
    
    renderMenu(ctx, time) {
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        
        // Animated background
        this.menuAnimation += 0.016;
        
        // Dark gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, ch);
        grad.addColorStop(0, '#0a0020');
        grad.addColorStop(1, '#1a0040');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
        
        // Animated stars
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        for (let i = 0; i < 50; i++) {
            const sx = (Math.sin(i * 1.3 + this.menuAnimation * 0.3) * 0.5 + 0.5) * cw;
            const sy = (Math.cos(i * 0.7 + this.menuAnimation * 0.2) * 0.5 + 0.5) * ch;
            const size = Math.sin(i + this.menuAnimation) * 1.5 + 2;
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(0.5, size), 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Animated ground line
        ctx.strokeStyle = '#4444aa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < cw; x += 5) {
            const y = ch * 0.75 + Math.sin(x * 0.02 + this.menuAnimation) * 5;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Ground fill
        ctx.fillStyle = '#1a1a3a';
        ctx.beginPath();
        ctx.moveTo(0, ch * 0.75);
        for (let x = 0; x <= cw; x += 5) {
            const y = ch * 0.75 + Math.sin(x * 0.02 + this.menuAnimation) * 5;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(cw, ch);
        ctx.lineTo(0, ch);
        ctx.closePath();
        ctx.fill();
        
        // Title
        const titleY = ch * 0.15 + Math.sin(this.menuAnimation * 1.5) * 5;
        
        // Title shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = 'bold 52px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GEOMETRY DASH', cw / 2 + 3, titleY + 3);
        
        // Title glow
        ctx.shadowColor = '#4488ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('GEOMETRY DASH', cw / 2, titleY);
        ctx.shadowBlur = 0;
        
        // Subtitle
        ctx.font = '16px monospace';
        ctx.fillStyle = '#8888cc';
        ctx.fillText('Web Recreation', cw / 2, titleY + 30);
        
        // Version
        ctx.font = '12px monospace';
        ctx.fillStyle = '#555588';
        ctx.textAlign = 'right';
        ctx.fillText(`v${GD.VERSION}`, cw - 10, ch - 10);
        ctx.textAlign = 'center';
        
        // Draw current screen
        switch (this.currentScreen) {
            case 'menu':
            case 'levelSelect':
            case 'settings':
                this._drawButtons(ctx);
                break;
        }
        
        // Level select header
        if (this.currentScreen === 'levelSelect') {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 28px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SELECT LEVEL', cw / 2, 70);
        }
        
        // Settings header
        if (this.currentScreen === 'settings') {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 28px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SETTINGS', cw / 2, 70);
            
            ctx.font = '14px monospace';
            ctx.fillStyle = '#888888';
            ctx.fillText('Controls: Click/Space/Up to jump', cw / 2, ch - 80);
            ctx.fillText('ESC = Pause | R = Restart | P = Practice', cw / 2, ch - 60);
        }
    }
    
    _drawButtons(ctx) {
        for (const btn of this.buttons) {
            // Button background
            ctx.fillStyle = btn.color;
            ctx.beginPath();
            this._roundRect(ctx, btn.x, btn.y, btn.width, btn.height, 8);
            ctx.fill();
            
            // Button border
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            this._roundRect(ctx, btn.x, btn.y, btn.width, btn.height, 8);
            ctx.stroke();
            
            // Button text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
        }
        ctx.textBaseline = 'alphabetic';
    }
    
    _roundRect(ctx, x, y, w, h, r) {
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
    }
}
```

---

## js/rendering/Renderer.js

```javascript
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Auto-resize
        this._resize();
        window.addEventListener('resize', () => this._resize());
        
        this.bgColor = GD.COLORS.BG_DEFAULT;
        this.groundColor = GD.COLORS.GROUND_DEFAULT;
        this.colorChannels = {};
        
        // Particles
        this.particles = [];
        
        // Background layers for parallax
        this.bgLayers = [];
    }
    
    _resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        this.ctx.scale(dpr, dpr);
        this.viewWidth = rect.width;
        this.viewHeight = rect.height;
    }
    
    setBGColor(color) {
        this.bgColor = color;
    }
    
    setGroundColor(color) {
        this.groundColor = color;
    }
    
    setColorChannel(id, color) {
        this.colorChannels[id] = color;
    }
    
    getColorChannel(id) {
        return this.colorChannels[id] || null;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBackground(camera, time) {
        const ctx = this.ctx;
        
        // Gradient background
        const grad = ctx.createLinearGradient(0, camera.y, 0, camera.y + this.viewHeight);
        grad.addColorStop(0, this.bgColor);
        
        const darkerBg = ColorUtils.darken(this.bgColor, 0.3);
        grad.addColorStop(1, ColorUtils.rgbToHex(darkerBg.r, darkerBg.g, darkerBg.b));
        
        ctx.fillStyle = grad;
        ctx.fillRect(camera.x - 50, camera.y - 50, this.viewWidth / camera.zoom + 100, this.viewHeight / camera.zoom + 100);
        
        // Background grid (subtle)
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        const gridSize = GD.BLOCK_SIZE;
        const startX = Math.floor(camera.x / gridSize) * gridSize;
        const startY = Math.floor(camera.y / gridSize) * gridSize;
        const endX = camera.x + this.viewWidth / camera.zoom + gridSize;
        const endY = camera.y + this.viewHeight / camera.zoom + gridSize;
        
        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();
    }
    
    drawGround(groundY, camera) {
        const ctx = this.ctx;
        
        // Ground fill
        ctx.fillStyle = this.groundColor;
        ctx.fillRect(
            camera.x - 50, groundY,
            this.viewWidth / camera.zoom + 100,
            this.viewHeight
        );
        
        // Ground line
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(camera.x - 50, groundY);
        ctx.lineTo(camera.x + this.viewWidth / camera.zoom + 50, groundY);
        ctx.stroke();
    }
    
    drawCeiling(ceilingY, camera) {
        const ctx = this.ctx;
        
        ctx.fillStyle = this.groundColor;
        ctx.fillRect(
            camera.x - 50, ceilingY - this.viewHeight,
            this.viewWidth / camera.zoom + 100,
            this.viewHeight
        );
        
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(camera.x - 50, ceilingY);
        ctx.lineTo(camera.x + this.viewWidth / camera.zoom + 50, ceilingY);
        ctx.stroke();
    }
    
    drawBlock(obj) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        if (obj.rotation || obj.triggerRotation) {
            const cx = rx + obj.width / 2;
            const cy = ry + obj.height / 2;
            ctx.translate(cx, cy);
            ctx.rotate(obj.rotation + obj.triggerRotation);
            ctx.translate(-cx, -cy);
        }
        
        // Block body
        ctx.fillStyle = obj.color || '#4a4a8a';
        ctx.fillRect(rx, ry, obj.width, obj.height);
        
        // Block border (lighter)
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(rx + 0.5, ry + 0.5, obj.width - 1, obj.height - 1);
        
        // Inner highlight
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(rx + 2, ry + 2, obj.width - 4, obj.height / 2 - 2);
        
        ctx.restore();
    }
    
    drawSpike(obj) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        ctx.fillStyle = obj.color || '#ffffff';
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        
        const dir = obj.direction || 'up';
        switch (dir) {
            case 'up':
                ctx.moveTo(rx, ry + obj.height);
                ctx.lineTo(rx + obj.width / 2, ry);
                ctx.lineTo(rx + obj.width, ry + obj.height);
                break;
            case 'down':
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx + obj.width / 2, ry + obj.height);
                ctx.lineTo(rx + obj.width, ry);
                break;
            case 'left':
                ctx.moveTo(rx + obj.width, ry);
                ctx.lineTo(rx, ry + obj.height / 2);
                ctx.lineTo(rx + obj.width, ry + obj.height);
                break;
            case 'right':
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx + obj.width, ry + obj.height / 2);
                ctx.lineTo(rx, ry + obj.height);
                break;
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
    
    drawOrb(obj, time) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        const cx = rx + obj.width / 2;
        const cy = ry + obj.height / 2;
        const radius = obj.width / 2;
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        // Outer glow
        const glowSize = radius * 1.4 + Math.sin(time * 4) * 3;
        const glow = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, glowSize);
        glow.addColorStop(0, obj.color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Orb body
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner highlight
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(cx - radius * 0.15, cy - radius * 0.15, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Ring
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }
    
    drawPad(obj, time) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        // Pad body
        ctx.fillStyle = obj.color;
        
        // Rounded pad shape
        const padH = obj.height;
        ctx.beginPath();
        ctx.moveTo(rx + 4, ry + padH);
        ctx.lineTo(rx + obj.width - 4, ry + padH);
        ctx.lineTo(rx + obj.width - 2, ry);
        ctx.lineTo(rx + 2, ry);
        ctx.closePath();
        ctx.fill();
        
        // Glow on top
        const pulse = Math.sin(time * 5) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255,255,255,${pulse * 0.3})`;
        ctx.fillRect(rx + 4, ry, obj.width - 8, padH * 0.4);
        
        ctx.restore();
    }
    
    drawPortal(obj, time) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        const cx = rx + obj.width / 2;
        const cy = ry + obj.height / 2;
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        // Portal outline
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 3;
        
        // Oval portal shape
        ctx.beginPath();
        ctx.ellipse(cx, cy, obj.width / 2, obj.height / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner glow
        const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, obj.height / 2);
        innerGrad.addColorStop(0, obj.color + '88');
        innerGrad.addColorStop(0.7, obj.color + '22');
        innerGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, obj.width / 2, obj.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Animated particles inside portal
        const particleCount = 5;
        for (let i = 0; i < particleCount; i++) {
            const angle = (time * 2 + i * Math.PI * 2 / particleCount) % (Math.PI * 2);
            const pr = obj.height * 0.3;
            const px = cx + Math.cos(angle) * obj.width * 0.2;
            const py = cy + Math.sin(angle) * pr;
            const size = 2 + Math.sin(time * 3 + i) * 1;
            
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    drawTrigger(obj) {
        // Triggers are invisible during gameplay
        // Only shown in editor
        if (!obj.showInEditor) return;
        
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#ff8800';
        ctx.fillRect(rx, ry, obj.width, obj.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(obj.triggerType.substring(0, 4), rx + obj.width / 2, ry + obj.height / 2 + 3);
        
        ctx.restore();
    }
    
    drawCoin(obj, time) {
        if (obj.collected) return;
        
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        const cx = rx + obj.width / 2;
        const cy = ry + obj.height / 2;
        const radius = obj.width / 2 * 0.8;
        
        ctx.save();
        
        // Coin body
        const pulse = Math.sin(time * 3) * 0.15 + 0.85;
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 2, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Star shape in center
        ctx.fillStyle = '#ffaa00';
        ctx.font = `${Math.floor(radius)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', cx, cy);
        
        ctx.restore();
    }
    
    drawDecoration(obj) {
        const ctx = this.ctx;
        const rx = obj.getRenderX();
        const ry = obj.getRenderY();
        
        ctx.save();
        
        if (obj.alpha < 1) ctx.globalAlpha = obj.alpha;
        
        if (obj.rotation || obj.triggerRotation) {
            const cx = rx + obj.width / 2;
            const cy = ry + obj.height / 2;
            ctx.translate(cx, cy);
            ctx.rotate(obj.rotation + obj.triggerRotation);
            ctx.translate(-cx, -cy);
        }
        
        ctx.fillStyle = obj.color || 'rgba(255,255,255,0.1)';
        ctx.fillRect(rx, ry, obj.width, obj.height);
        
        ctx.restore();
    }
    
    drawPlayer(player, time) {
        const ctx = this.ctx;
        
        ctx.save();
        
        // Draw trail
        if (player.trail && player.trail.length > 1) {
            ctx.strokeStyle = player.secondaryColor || player.primaryColor;
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(player.trail[0].x, player.trail[0].y);
            for (let i = 1; i < player.trail.length; i++) {
                const alpha = i / player.trail.length;
                ctx.globalAlpha = alpha * 0.6;
                ctx.lineTo(player.trail[i].x, player.trail[i].y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        
        const cx = player.getCenterX();
        const cy = player.getCenterY();
        
        ctx.translate(cx, cy);
        ctx.rotate(player.rotation);
        
        const halfW = player.width / 2;
        const halfH = player.height / 2;
        
        switch (player.mode) {
            case GD.MODES.CUBE:
                this._drawCubeIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.SHIP:
                this._drawShipIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.BALL:
                this._drawBallIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.UFO:
                this._drawUFOIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.WAVE:
                this._drawWaveIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.ROBOT:
                this._drawRobotIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.SPIDER:
                this._drawSpiderIcon(ctx, halfW, halfH, player);
                break;
            case GD.MODES.SWING:
                this._drawSwingIcon(ctx, halfW, halfH, player);
                break;
        }
        
        ctx.restore();
    }
    
    _drawCubeIcon(ctx, hw, hh, player) {
        // Main body
        ctx.fillStyle = player.primaryColor;
        ctx.fillRect(-hw, -hh, hw * 2, hh * 2);
        
        // Border
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-hw, -hh, hw * 2, hh * 2);
        
        // Face/icon
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        const eyeSize = hw * 0.25;
        ctx.fillRect(-hw * 0.4, -hh * 0.3, eyeSize, eyeSize);
        ctx.fillRect(hw * 0.15, -hh * 0.3, eyeSize, eyeSize);
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(-hw, -hh, hw * 2, hh);
    }
    
    _drawShipIcon(ctx, hw, hh, player) {
        ctx.fillStyle = player.primaryColor;
        ctx.beginPath();
        ctx.moveTo(hw, 0);
        ctx.lineTo(-hw, -hh);
        ctx.lineTo(-hw * 0.5, 0);
        ctx.lineTo(-hw, hh);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Cockpit
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, hw * 0.25, 0, Math.PI * 2);
        ctx.fill();
    }
    
    _drawBallIcon(ctx, hw, hh, player) {
        const radius = Math.min(hw, hh);
        
        ctx.fillStyle = player.primaryColor;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner design
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Line through
        ctx.strokeStyle = player.secondaryColor || '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-radius * 0.7, 0);
        ctx.lineTo(radius * 0.7, 0);
        ctx.stroke();
    }
    
    _drawUFOIcon(ctx, hw, hh, player) {
        // Dome
        ctx.fillStyle = player.primaryColor;
        ctx.beginPath();
        ctx.arc(0, -hh * 0.2, hw * 0.6, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, hw, hh * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Window
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -hh * 0.2, hw * 0.25, 0, Math.PI * 2);
        ctx.fill();
    }
    
    _drawWaveIcon(ctx, hw, hh, player) {
        ctx.fillStyle = player.primaryColor;
        ctx.beginPath();
        ctx.moveTo(hw, 0);
        ctx.lineTo(0, -hh);
        ctx.lineTo(-hw, 0);
        ctx.lineTo(0, hh);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, hw * 0.2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    _drawRobotIcon(ctx, hw, hh, player) {
        // Body
        ctx.fillStyle = player.primaryColor;
        ctx.fillRect(-hw * 0.7, -hh * 0.6, hw * 1.4, hh * 1.2);
        
        // Head
        ctx.fillRect(-hw * 0.5, -hh, hw, hh * 0.5);
        
        // Legs
        ctx.fillRect(-hw * 0.6, hh * 0.5, hw * 0.4, hh * 0.5);
        ctx.fillRect(hw * 0.2, hh * 0.5, hw * 0.4, hh * 0.5);
        
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        
        // Eyes
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.fillRect(-hw * 0.3, -hh * 0.85, hw * 0.2, hh * 0.2);
        ctx.fillRect(hw * 0.1, -hh * 0.85, hw * 0.2, hh * 0.2);
    }
    
    _drawSpiderIcon(ctx, hw, hh, player) {
        // Body
        ctx.fillStyle = player.primaryColor;
        ctx.beginPath();
        ctx.arc(0, 0, hw * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs
        ctx.strokeStyle = player.primaryColor;
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI - Math.PI / 2;
            const legX = Math.cos(angle) * hw * 0.5;
            const legY = Math.sin(angle) * hh * 0.5;
            ctx.beginPath();
            ctx.moveTo(legX, legY);
            ctx.lineTo(legX + Math.cos(angle) * hw * 0.6, legY + Math.abs(Math.sin(angle)) * hh * 0.5 + hh * 0.3);
            ctx.stroke();
        }
        // Mirror legs
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI - Math.PI / 2;
            const legX = -Math.cos(angle) * hw * 0.5;
            const legY = Math.sin(angle) * hh * 0.5;
            ctx.beginPath();
            ctx.moveTo(legX, legY);
            ctx.lineTo(legX - Math.cos(angle) * hw * 0.6, legY + Math.abs(Math.sin(angle)) * hh * 0.5 + hh * 0.3);
            ctx.stroke();
        }
        
        // Eyes
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(-hw * 0.15, -hh * 0.1, hw * 0.12, 0, Math.PI * 2);
        ctx.arc(hw * 0.15, -hh * 0.1, hw * 0.12, 0, Math.PI * 2);
        ctx.fill();
    }
    
    _drawSwingIcon(ctx, hw, hh, player) {
        // Swing copter body
        ctx.fillStyle = player.primaryColor;
        ctx.fillRect(-hw * 0.6, -hh * 0.4, hw * 1.2, hh * 0.8);
        
        // Rotor
        ctx.strokeStyle = player.secondaryColor || '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-hw * 0.8, -hh * 0.5);
        ctx.lineTo(hw * 0.8, -hh * 0.5);
        ctx.stroke();
        
        // Rotor hub
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -hh * 0.5, hw * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = player.secondaryColor || '#ffffff';
        ctx.beginPath();
        ctx.arc(hw * 0.15, -hh * 0.05, hw * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawDeathEffect(x, y, timer, color) {
        const ctx = this.ctx;
        const maxTime = 0.8;
        const t = Math.min(timer / maxTime, 1);
        
        ctx.save();
        
        // Expanding ring
        ctx.strokeStyle = color;
        ctx.lineWidth = 3 * (1 - t);
        ctx.globalAlpha = 1 - t;
        ctx.beginPath();
        ctx.arc(x, y, t * 80, 0, Math.PI * 2);
        ctx.stroke();
        
        // Fragments
        const fragCount = 8;
        for (let i = 0; i < fragCount; i++) {
            const angle = (i / fragCount) * Math.PI * 2;
            const dist = t * 60;
            const fx = x + Math.cos(angle) * dist;
            const fy = y + Math.sin(angle) * dist;
            const size = 4 * (1 - t);
            
            ctx.fillStyle = color;
            ctx.globalAlpha = (1 - t) * 0.8;
            ctx.save();
            ctx.translate(fx, fy);
            ctx.rotate(angle + t * 3);
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.restore();
        }
        
        ctx.restore();
    }
    
    // Particle system
    spawnParticles(x, y, color, count, speed) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const vel = (Math.random() * 0.5 + 0.5) * speed;
            
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * vel,
                vy: Math.sin(angle) * vel,
                color,
                size: Math.random() * 4 + 2,
                life: 1,
                decay: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    updateParticles(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 200 * dt; // Gravity
            p.life -= p.decay * dt;
            p.size *= 0.99;
            
            if (p.life <= 0 || p.size < 0.5) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        const ctx = this.ctx;
        
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            ctx.restore();
        }
    }
}
```

---

## js/audio/AudioManager.js

```javascript
class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        
        this.musicVolume = 0.5;
        this.sfxVolume = 0.5;
        
        this.currentMusicSource = null;
        this.currentMusic = null;
        this.musicPlaying = false;
        
        this.sfxBuffers = {};
    }
    
    async init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.musicVolume;
            this.musicGain.connect(this.masterGain);
            
            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.masterGain);
            
            this._generateSFX();
        } catch (e) {
            console.warn('Audio initialization failed:', e);
        }
    }
    
    _ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    
    _generateSFX() {
        if (!this.ctx) return;
        
        // Jump sound
        this.sfxBuffers.jump = this._createToneBuffer(600, 0.08, 'square', 800);
        
        // Death sound
        this.sfxBuffers.death = this._createNoiseBuffer(0.3, 200, 50);
        
        // Orb sound
        this.sfxBuffers.orb = this._createToneBuffer(800, 0.1, 'sine', 1200);
        
        // Pad sound
        this.sfxBuffers.pad = this._createToneBuffer(500, 0.12, 'sine', 900);
        
        // Portal sound
        this.sfxBuffers.portal = this._createSweepBuffer(300, 800, 0.2, 'sine');
        
        // Gravity flip
        this.sfxBuffers.gravityFlip = this._createSweepBuffer(400, 200, 0.15, 'triangle');
        
        // Speed change
        this.sfxBuffers.speedChange = this._createToneBuffer(700, 0.1, 'triangle', 500);
        
        // Coin
        this.sfxBuffers.coin = this._createToneBuffer(1200, 0.1, 'sine', 1500);
        
        // Checkpoint
        this.sfxBuffers.checkpoint = this._createToneBuffer(600, 0.15, 'sine', 800);
        
        // Complete
        this.sfxBuffers.complete = this._createSweepBuffer(400, 1200, 0.5, 'sine');
    }
    
    _createToneBuffer(startFreq, duration, type, endFreq) {
        const sampleRate = this.ctx.sampleRate;
        const numSamples = Math.floor(sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, numSamples, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const progress = i / numSamples;
            const freq = startFreq + (endFreq - startFreq) * progress;
            const phase = 2 * Math.PI * freq * t;
            
            let sample = 0;
            switch (type) {
                case 'sine':
                    sample = Math.sin(phase);
                    break;
                case 'square':
                    sample = Math.sin(phase) > 0 ? 1 : -1;
                    break;
                case 'triangle':
                    sample = 2

You
Continue
Assistant


## js/audio/AudioManager.js (continued)

```javascript
                    sample = 2 * Math.abs(2 * (t * freq - Math.floor(t * freq + 0.5))) - 1;
                    break;
                case 'sawtooth':
                    sample = 2 * (t * freq - Math.floor(t * freq + 0.5));
                    break;
            }
            
            // Envelope
            const attack = Math.min(progress * 20, 1);
            const release = Math.max(1 - (progress - 0.7) / 0.3, 0);
            const envelope = Math.min(attack, release);
            
            data[i] = sample * envelope * 0.3;
        }
        
        return buffer;
    }
    
    _createNoiseBuffer(duration, startFreq, endFreq) {
        const sampleRate = this.ctx.sampleRate;
        const numSamples = Math.floor(sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, numSamples, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < numSamples; i++) {
            const progress = i / numSamples;
            const envelope = 1 - progress;
            
            // Filtered noise
            const noise = (Math.random() * 2 - 1);
            const freq = startFreq + (endFreq - startFreq) * progress;
            const tone = Math.sin(2 * Math.PI * freq * i / sampleRate);
            
            data[i] = (noise * 0.5 + tone * 0.5) * envelope * 0.3;
        }
        
        return buffer;
    }
    
    _createSweepBuffer(startFreq, endFreq, duration, type) {
        return this._createToneBuffer(startFreq, duration, type, endFreq);
    }
    
    playSFX(name) {
        if (!this.ctx || !this.sfxBuffers[name]) return;
        if (this.sfxVolume <= 0) return;
        
        this._ensureContext();
        
        try {
            const source = this.ctx.createBufferSource();
            source.buffer = this.sfxBuffers[name];
            source.connect(this.sfxGain);
            source.start(0);
        } catch (e) {
            // Ignore playback errors
        }
    }
    
    generateMusic(bpm, style, durationSeconds) {
        if (!this.ctx) return null;
        
        const sampleRate = this.ctx.sampleRate;
        const numSamples = Math.floor(sampleRate * durationSeconds);
        const buffer = this.ctx.createBuffer(2, numSamples, sampleRate);
        const leftData = buffer.getChannelData(0);
        const rightData = buffer.getChannelData(1);
        
        const beatDuration = 60 / bpm;
        const barDuration = beatDuration * 4;
        
        // Scale notes (minor pentatonic for that GD feel)
        const baseNote = 55; // A1
        const scale = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24];
        
        // Generate patterns
        const bassPattern = this._generateBassPattern(scale, 8);
        const leadPattern = this._generateLeadPattern(scale, 16);
        const arpPattern = this._generateArpPattern(scale, 16);
        
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const beatPos = t / beatDuration;
            const barPos = t / barDuration;
            const currentBar = Math.floor(barPos);
            const beatInBar = beatPos % 4;
            const sixteenthInBar = (beatPos * 4) % 16;
            
            let sample = 0;
            
            // Kick drum on beats
            const kickPhase = beatPos % 1;
            if (kickPhase < 0.1) {
                const kickFreq = 150 * Math.exp(-kickPhase * 40);
                const kickEnv = Math.exp(-kickPhase * 30);
                sample += Math.sin(2 * Math.PI * kickFreq * t) * kickEnv * 0.35;
            }
            
            // Snare on 2 and 4
            const snarePhase = (beatPos + 2) % 2;
            if (snarePhase >= 0 && snarePhase < 0.08) {
                const snareEnv = Math.exp(-snarePhase * 40);
                sample += (Math.random() * 2 - 1) * snareEnv * 0.2;
                sample += Math.sin(2 * Math.PI * 200 * t) * snareEnv * 0.1;
            }
            
            // Hi-hat on eighth notes
            const hihatPhase = (beatPos * 2) % 1;
            if (hihatPhase < 0.02) {
                const hhEnv = Math.exp(-hihatPhase * 100);
                sample += (Math.random() * 2 - 1) * hhEnv * 0.08;
            }
            
            // Bass
            const bassIdx = Math.floor(beatPos * 2) % bassPattern.length;
            const bassNote = bassPattern[bassIdx];
            if (bassNote >= 0) {
                const bassFreq = baseNote * Math.pow(2, scale[bassNote % scale.length] / 12);
                const bassPhase = (beatPos * 2) % 1;
                const bassEnv = bassPhase < 0.05 ? bassPhase * 20 : Math.exp(-(bassPhase - 0.05) * 3);
                const bassSample = Math.sin(2 * Math.PI * bassFreq * t);
                // Add sub harmonics
                const bassSub = Math.sin(2 * Math.PI * bassFreq * 0.5 * t);
                sample += (bassSample * 0.6 + bassSub * 0.4) * bassEnv * 0.2;
            }
            
            // Lead synth (comes in after 4 bars)
            if (currentBar >= 4) {
                const leadIdx = Math.floor(sixteenthInBar) % leadPattern.length;
                const leadNote = leadPattern[leadIdx];
                if (leadNote >= 0) {
                    const leadFreq = baseNote * 4 * Math.pow(2, scale[leadNote % scale.length] / 12);
                    const leadPhase = (sixteenthInBar % 1);
                    const leadEnv = leadPhase < 0.05 ? leadPhase * 20 : Math.exp(-(leadPhase - 0.05) * 5);
                    
                    // Detuned saw for thickness
                    const saw1 = 2 * ((t * leadFreq) % 1) - 1;
                    const saw2 = 2 * ((t * leadFreq * 1.003) % 1) - 1;
                    const leadSample = (saw1 + saw2) * 0.5;
                    
                    sample += leadSample * leadEnv * 0.12;
                }
            }
            
            // Arp (comes in after 8 bars)
            if (currentBar >= 8) {
                const arpIdx = Math.floor(sixteenthInBar) % arpPattern.length;
                const arpNote = arpPattern[arpIdx];
                if (arpNote >= 0) {
                    const arpFreq = baseNote * 2 * Math.pow(2, scale[arpNote % scale.length] / 12);
                    const arpPhase = (sixteenthInBar % 1);
                    const arpEnv = arpPhase < 0.02 ? arpPhase * 50 : Math.exp(-(arpPhase - 0.02) * 8);
                    
                    const arpSample = Math.sin(2 * Math.PI * arpFreq * t) * 0.7 +
                                     Math.sin(2 * Math.PI * arpFreq * 2 * t) * 0.3;
                    
                    sample += arpSample * arpEnv * 0.08;
                }
            }
            
            // Pad (ambient, fades in)
            const padFade = Math.min(t / 5, 1) * 0.06;
            const padNote = scale[(currentBar % 4) * 2 % scale.length];
            const padFreq = baseNote * 2 * Math.pow(2, padNote / 12);
            const padSample = Math.sin(2 * Math.PI * padFreq * t) * 0.5 +
                             Math.sin(2 * Math.PI * padFreq * 1.5 * t) * 0.3 +
                             Math.sin(2 * Math.PI * padFreq * 2 * t) * 0.2;
            sample += padSample * padFade;
            
            // Build-up effect every 16 bars
            const buildPos = currentBar % 16;
            if (buildPos >= 14) {
                const buildProgress = (barPos % 16 - 14) / 2;
                const riserFreq = 200 + buildProgress * 2000;
                sample += Math.sin(2 * Math.PI * riserFreq * t) * buildProgress * 0.1;
                // Add noise riser
                sample += (Math.random() * 2 - 1) * buildProgress * 0.05;
            }
            
            // Drop impact at bar 0 of every 16-bar section (after first)
            if (buildPos === 0 && currentBar > 0) {
                const impactPhase = barPos % 16;
                if (impactPhase < 0.1) {
                    const impactEnv = Math.exp(-impactPhase * 20);
                    sample += Math.sin(2 * Math.PI * 40 * t) * impactEnv * 0.4;
                }
            }
            
            // Soft clip / limiter
            sample = Math.tanh(sample * 1.5) * 0.7;
            
            // Stereo width
            const stereoOffset = Math.sin(t * 0.5) * 0.1;
            leftData[i] = sample * (1 + stereoOffset);
            rightData[i] = sample * (1 - stereoOffset);
        }
        
        return buffer;
    }
    
    _generateBassPattern(scale, length) {
        const pattern = [];
        for (let i = 0; i < length; i++) {
            if (i % 4 === 0) {
                pattern.push(0); // Root
            } else if (i % 4 === 2) {
                pattern.push(Math.random() < 0.5 ? 2 : 3); // 5th or 7th
            } else if (Math.random() < 0.3) {
                pattern.push(Math.floor(Math.random() * 4));
            } else {
                pattern.push(-1); // Rest
            }
        }
        return pattern;
    }
    
    _generateLeadPattern(scale, length) {
        const pattern = [];
        let lastNote = 4;
        for (let i = 0; i < length; i++) {
            if (Math.random() < 0.6) {
                // Move by step or skip
                const step = Math.random() < 0.7 ? 
                    (Math.random() < 0.5 ? 1 : -1) :
                    (Math.random() < 0.5 ? 2 : -2);
                lastNote = MathUtils.clamp(lastNote + step, 2, 8);
                pattern.push(lastNote);
            } else {
                pattern.push(-1); // Rest
            }
        }
        return pattern;
    }
    
    _generateArpPattern(scale, length) {
        const pattern = [];
        const arpNotes = [0, 2, 4, 6]; // Chord tones
        for (let i = 0; i < length; i++) {
            if (i % 2 === 0 || Math.random() < 0.5) {
                pattern.push(arpNotes[i % arpNotes.length] + 4);
            } else {
                pattern.push(-1);
            }
        }
        return pattern;
    }
    
    playMusic(buffer) {
        if (!this.ctx || !buffer) return;
        
        this._ensureContext();
        this.stopMusic();
        
        try {
            this.currentMusicSource = this.ctx.createBufferSource();
            this.currentMusicSource.buffer = buffer;
            this.currentMusicSource.loop = true;
            this.currentMusicSource.connect(this.musicGain);
            this.currentMusicSource.start(0);
            this.musicPlaying = true;
            this.currentMusic = buffer;
        } catch (e) {
            console.warn('Failed to play music:', e);
        }
    }
    
    stopMusic() {
        if (this.currentMusicSource) {
            try {
                this.currentMusicSource.stop();
            } catch (e) {
                // Already stopped
            }
            this.currentMusicSource = null;
        }
        this.musicPlaying = false;
    }
    
    pauseMusic() {
        if (this.ctx && this.musicPlaying) {
            this.ctx.suspend();
        }
    }
    
    resumeMusic() {
        if (this.ctx) {
            this.ctx.resume();
        }
    }
    
    setMusicVolume(vol) {
        this.musicVolume = MathUtils.clamp(vol, 0, 1);
        if (this.musicGain) {
            this.musicGain.gain.value = this.musicVolume;
        }
    }
    
    setSFXVolume(vol) {
        this.sfxVolume = MathUtils.clamp(vol, 0, 1);
        if (this.sfxGain) {
            this.sfxGain.gain.value = this.sfxVolume;
        }
    }
}
```

---

## js/editor/Editor.js

```javascript
class Editor {
    constructor(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.renderer.ctx;
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        
        this.active = false;
        this.objects = [];
        this.selectedObjects = [];
        this.clipboard = [];
        
        this.currentTool = 'place'; // place, select, delete, move
        this.currentObjectType = 'block';
        this.currentObjectConfig = {
            type: 'block',
            color: '#4a4a8a',
            solid: true,
            hazard: false,
            width: GD.BLOCK_SIZE,
            height: GD.BLOCK_SIZE
        };
        
        this.gridSnap = true;
        this.gridSize = GD.BLOCK_SIZE;
        this.showGrid = true;
        this.showTriggers = true;
        
        // Camera control
        this.cameraX = 0;
        this.cameraY = 200;
        this.cameraZoom = 1;
        this.dragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragCameraStartX = 0;
        this.dragCameraStartY = 0;
        
        // Move tool
        this.movingObjects = false;
        this.moveStartX = 0;
        this.moveStartY = 0;
        
        // Selection box
        this.selecting = false;
        this.selectStartX = 0;
        this.selectStartY = 0;
        this.selectEndX = 0;
        this.selectEndY = 0;
        
        // Level properties
        this.levelName = 'My Level';
        this.levelBPM = 128;
        this.levelSpeed = 1;
        this.levelBGColor = '#1a0033';
        this.levelGroundColor = '#2a2a5a';
        this.levelGroundY = GD.GROUND_Y;
        
        // Object palette
        this.objectTypes = [
            { type: 'block', label: 'Block', color: '#4a4a8a', solid: true },
            { type: 'spike', label: 'Spike ↑', color: '#ffffff', direction: 'up', hazard: true },
            { type: 'spike', label: 'Spike ↓', color: '#ffffff', direction: 'down', hazard: true },
            { type: 'spike', label: 'Spike →', color: '#ffffff', direction: 'right', hazard: true },
            { type: 'spike', label: 'Spike ←', color: '#ffffff', direction: 'left', hazard: true },
            { type: 'orb', label: 'Yellow Orb', orbType: 'YELLOW', color: '#ffff00' },
            { type: 'orb', label: 'Blue Orb', orbType: 'BLUE', color: '#4488ff' },
            { type: 'orb', label: 'Green Orb', orbType: 'GREEN', color: '#44ff44' },
            { type: 'orb', label: 'Pink Orb', orbType: 'PINK', color: '#ff44ff' },
            { type: 'pad', label: 'Yellow Pad', padType: 'YELLOW', color: '#ffff00' },
            { type: 'pad', label: 'Blue Pad', padType: 'BLUE', color: '#4488ff' },
            { type: 'pad', label: 'Pink Pad', padType: 'PINK', color: '#ff44ff' },
            { type: 'portal', label: 'Ship Portal', portalType: GD.PORTAL_TYPES.SHIP, color: '#ff8800' },
            { type: 'portal', label: 'Cube Portal', portalType: GD.PORTAL_TYPES.CUBE, color: '#44ff44' },
            { type: 'portal', label: 'Ball Portal', portalType: GD.PORTAL_TYPES.BALL, color: '#ff4444' },
            { type: 'portal', label: 'UFO Portal', portalType: GD.PORTAL_TYPES.UFO, color: '#ffff44' },
            { type: 'portal', label: 'Wave Portal', portalType: GD.PORTAL_TYPES.WAVE, color: '#44ffff' },
            { type: 'portal', label: 'Robot Portal', portalType: GD.PORTAL_TYPES.ROBOT, color: '#ff44ff' },
            { type: 'portal', label: 'Spider Portal', portalType: GD.PORTAL_TYPES.SPIDER, color: '#8844ff' },
            { type: 'portal', label: 'Gravity ↓', portalType: GD.PORTAL_TYPES.GRAVITY_FLIP, color: '#4488ff' },
            { type: 'portal', label: 'Gravity ↑', portalType: GD.PORTAL_TYPES.GRAVITY_NORMAL, color: '#ffaa00' },
            { type: 'portal', label: 'Speed 1x', portalType: GD.PORTAL_TYPES.SPEED_NORMAL, color: '#ffaa44' },
            { type: 'portal', label: 'Speed 2x', portalType: GD.PORTAL_TYPES.SPEED_DOUBLE, color: '#ff8844' },
            { type: 'portal', label: 'Speed 3x', portalType: GD.PORTAL_TYPES.SPEED_TRIPLE, color: '#ff4444' },
            { type: 'portal', label: 'Speed 4x', portalType: GD.PORTAL_TYPES.SPEED_QUAD, color: '#ff2222' },
            { type: 'coin', label: 'Coin', color: '#ffdd00' },
            { type: 'decoration', label: 'Deco', color: 'rgba(255,255,255,0.1)' }
        ];
        
        this.selectedPaletteIndex = 0;
        this.paletteScrollY = 0;
        
        // Undo/Redo
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;
        
        // UI panels
        this.panelWidth = 200;
        this.topBarHeight = 40;
        
        this._bindEditorEvents();
    }
    
    _bindEditorEvents() {
        this.canvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this._onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this._onWheel(e));
        
        document.addEventListener('keydown', (e) => {
            if (!this.active) return;
            this._onKeyDown(e);
        });
    }
    
    _getCanvasPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }
    
    _screenToWorld(sx, sy) {
        const wx = sx / this.cameraZoom + this.cameraX;
        const wy = sy / this.cameraZoom + this.cameraY;
        return { x: wx, y: wy };
    }
    
    _snapToGrid(x, y) {
        if (!this.gridSnap) return { x, y };
        return {
            x: Math.round(x / this.gridSize) * this.gridSize,
            y: Math.round(y / this.gridSize) * this.gridSize
        };
    }
    
    _onMouseDown(e) {
        if (!this.active) return;
        
        const pos = this._getCanvasPos(e);
        
        // Check if click is in palette panel
        if (pos.x < this.panelWidth) {
            this._handlePaletteClick(pos);
            return;
        }
        
        // Check if click is in top bar
        if (pos.y < this.topBarHeight) {
            this._handleTopBarClick(pos);
            return;
        }
        
        const worldPos = this._screenToWorld(pos.x - this.panelWidth, pos.y - this.topBarHeight);
        const snapped = this._snapToGrid(worldPos.x, worldPos.y);
        
        if (e.button === 1 || (e.button === 0 && e.altKey)) {
            // Middle click or alt+click = pan camera
            this.dragging = true;
            this.dragStartX = pos.x;
            this.dragStartY = pos.y;
            this.dragCameraStartX = this.cameraX;
            this.dragCameraStartY = this.cameraY;
            return;
        }
        
        switch (this.currentTool) {
            case 'place':
                this._placeObject(snapped.x, snapped.y);
                break;
            case 'select':
                this._startSelection(worldPos.x, worldPos.y);
                break;
            case 'delete':
                this._deleteObjectAt(worldPos.x, worldPos.y);
                break;
            case 'move':
                if (this.selectedObjects.length > 0) {
                    this.movingObjects = true;
                    this.moveStartX = snapped.x;
                    this.moveStartY = snapped.y;
                }
                break;
        }
    }
    
    _onMouseMove(e) {
        if (!this.active) return;
        
        const pos = this._getCanvasPos(e);
        
        if (this.dragging) {
            const dx = (pos.x - this.dragStartX) / this.cameraZoom;
            const dy = (pos.y - this.dragStartY) / this.cameraZoom;
            this.cameraX = this.dragCameraStartX - dx;
            this.cameraY = this.dragCameraStartY - dy;
            return;
        }
        
        if (this.selecting) {
            const worldPos = this._screenToWorld(pos.x - this.panelWidth, pos.y - this.topBarHeight);
            this.selectEndX = worldPos.x;
            this.selectEndY = worldPos.y;
        }
        
        if (this.movingObjects) {
            const worldPos = this._screenToWorld(pos.x - this.panelWidth, pos.y - this.topBarHeight);
            const snapped = this._snapToGrid(worldPos.x, worldPos.y);
            const dx = snapped.x - this.moveStartX;
            const dy = snapped.y - this.moveStartY;
            
            if (dx !== 0 || dy !== 0) {
                for (const obj of this.selectedObjects) {
                    obj.x += dx;
                    obj.y += dy;
                }
                this.moveStartX = snapped.x;
                this.moveStartY = snapped.y;
            }
        }
    }
    
    _onMouseUp(e) {
        if (!this.active) return;
        
        this.dragging = false;
        
        if (this.selecting) {
            this._finishSelection();
            this.selecting = false;
        }
        
        if (this.movingObjects) {
            this._saveUndoState();
            this.movingObjects = false;
        }
    }
    
    _onWheel(e) {
        if (!this.active) return;
        e.preventDefault();
        
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        this.cameraZoom = MathUtils.clamp(this.cameraZoom * zoomFactor, 0.2, 3);
    }
    
    _onKeyDown(e) {
        switch (e.code) {
            case 'Digit1': this.currentTool = 'place'; break;
            case 'Digit2': this.currentTool = 'select'; break;
            case 'Digit3': this.currentTool = 'delete'; break;
            case 'Digit4': this.currentTool = 'move'; break;
            
            case 'KeyG': this.gridSnap = !this.gridSnap; break;
            case 'KeyH': this.showGrid = !this.showGrid; break;
            
            case 'Delete':
            case 'Backspace':
                this._deleteSelected();
                break;
            
            case 'KeyZ':
                if (e.ctrlKey || e.metaKey) {
                    if (e.shiftKey) this._redo();
                    else this._undo();
                    e.preventDefault();
                }
                break;
            
            case 'KeyC':
                if (e.ctrlKey || e.metaKey) {
                    this._copy();
                    e.preventDefault();
                }
                break;
            
            case 'KeyV':
                if (e.ctrlKey || e.metaKey) {
                    this._paste();
                    e.preventDefault();
                }
                break;
            
            case 'KeyA':
                if (e.ctrlKey || e.metaKey) {
                    this.selectedObjects = [...this.objects];
                    e.preventDefault();
                }
                break;
            
            case 'KeyS':
                if (e.ctrlKey || e.metaKey) {
                    this._saveLevel();
                    e.preventDefault();
                }
                break;
            
            case 'KeyT':
                this._testLevel();
                break;
            
            case 'Escape':
                this._exitEditor();
                break;
        }
    }
    
    _handlePaletteClick(pos) {
        const itemHeight = 30;
        const startY = 60 - this.paletteScrollY;
        const index = Math.floor((pos.y - startY) / itemHeight);
        
        if (index >= 0 && index < this.objectTypes.length) {
            this.selectedPaletteIndex = index;
            const template = this.objectTypes[index];
            this.currentObjectConfig = { ...template };
            this.currentObjectType = template.type;
        }
    }
    
    _handleTopBarClick(pos) {
        const btnWidth = 60;
        const tools = ['place', 'select', 'delete', 'move'];
        const toolStartX = this.panelWidth + 10;
        
        for (let i = 0; i < tools.length; i++) {
            const bx = toolStartX + i * (btnWidth + 5);
            if (pos.x >= bx && pos.x <= bx + btnWidth) {
                this.currentTool = tools[i];
                return;
            }
        }
        
        // Test button
        const testX = this.canvas.width - 160;
        if (pos.x >= testX && pos.x <= testX + 70) {
            this._testLevel();
            return;
        }
        
        // Save button
        const saveX = this.canvas.width - 80;
        if (pos.x >= saveX && pos.x <= saveX + 70) {
            this._saveLevel();
            return;
        }
    }
    
    _placeObject(x, y) {
        // Check if object already exists at this position
        const existing = this.objects.find(o => 
            o.x === x && o.y === y && o.type === this.currentObjectType
        );
        if (existing) return;
        
        this._saveUndoState();
        
        const config = {
            ...this.currentObjectConfig,
            x, y,
            width: this.currentObjectConfig.width || GD.BLOCK_SIZE,
            height: this.currentObjectConfig.height || GD.BLOCK_SIZE
        };
        
        // Adjust size for certain types
        if (config.type === 'portal') {
            config.width = GD.BLOCK_SIZE * 0.8;
            config.height = GD.BLOCK_SIZE * 3;
        } else if (config.type === 'pad') {
            config.height = GD.BLOCK_SIZE * 0.4;
        }
        
        let obj;
        switch (config.type) {
            case 'spike':
                obj = new Hazard(config);
                break;
            case 'orb':
                obj = new Orb(config);
                break;
            case 'pad':
                obj = new Pad(config);
                break;
            case 'portal':
                obj = new Portal(config);
                break;
            case 'trigger':
                obj = new Trigger(config);
                break;
            default:
                obj = new GameObject(config);
                break;
        }
        
        this.objects.push(obj);
    }
    
    _deleteObjectAt(x, y) {
        const idx = this.objects.findIndex(o => 
            x >= o.x && x <= o.x + o.width &&
            y >= o.y && y <= o.y + o.height
        );
        
        if (idx >= 0) {
            this._saveUndoState();
            this.objects.splice(idx, 1);
        }
    }
    
    _deleteSelected() {
        if (this.selectedObjects.length === 0) return;
        
        this._saveUndoState();
        
        for (const obj of this.selectedObjects) {
            const idx = this.objects.indexOf(obj);
            if (idx >= 0) this.objects.splice(idx, 1);
        }
        this.selectedObjects = [];
    }
    
    _startSelection(x, y) {
        this.selecting = true;
        this.selectStartX = x;
        this.selectStartY = y;
        this.selectEndX = x;
        this.selectEndY = y;
    }
    
    _finishSelection() {
        const minX = Math.min(this.selectStartX, this.selectEndX);
        const maxX = Math.max(this.selectStartX, this.selectEndX);
        const minY = Math.min(this.selectStartY, this.selectEndY);
        const maxY = Math.max(this.selectStartY, this.selectEndY);
        
        this.selectedObjects = this.objects.filter(o => 
            o.x + o.width > minX && o.x < maxX &&
            o.y + o.height > minY && o.y < maxY
        );
    }
    
    _copy() {
        this.clipboard = this.selectedObjects.map(o => ({
            ...o,
            x: o.x,
            y: o.y
        }));
    }
    
    _paste() {
        if (this.clipboard.length === 0) return;
        
        this._saveUndoState();
        
        // Find center of clipboard objects
        let cx = 0, cy = 0;
        for (const o of this.clipboard) {
            cx += o.x;
            cy += o.y;
        }
        cx /= this.clipboard.length;
        cy /= this.clipboard.length;
        
        // Paste at current camera center
        const targetX = this.cameraX + this.canvas.width / (2 * this.cameraZoom);
        const targetY = this.cameraY + this.canvas.height / (2 * this.cameraZoom);
        const snapped = this._snapToGrid(targetX, targetY);
        
        const newObjects = [];
        for (const o of this.clipboard) {
            const config = {
                ...o,
                x: snapped.x + (o.x - cx),
                y: snapped.y + (o.y - cy)
            };
            
            let obj;
            switch (config.type) {
                case 'spike': obj = new Hazard(config); break;
                case 'orb': obj = new Orb(config); break;
                case 'pad': obj = new Pad(config); break;
                case 'portal': obj = new Portal(config); break;
                case 'trigger': obj = new Trigger(config); break;
                default: obj = new GameObject(config); break;
            }
            
            this.objects.push(obj);
            newObjects.push(obj);
        }
        
        this.selectedObjects = newObjects;
    }
    
    _saveUndoState() {
        const state = JSON.stringify(this.objects.map(o => LevelSerializer._serializeObject(o)));
        this.undoStack.push(state);
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }
        this.redoStack = [];
    }
    
    _undo() {
        if (this.undoStack.length === 0) return;
        
        const currentState = JSON.stringify(this.objects.map(o => LevelSerializer._serializeObject(o)));
        this.redoStack.push(currentState);
        
        const prevState = this.undoStack.pop();
        const objDatas = JSON.parse(prevState);
        this.objects = objDatas.map(d => LevelSerializer._deserializeObject(d));
        this.selectedObjects = [];
    }
    
    _redo() {
        if (this.redoStack.length === 0) return;
        
        const currentState = JSON.stringify(this.objects.map(o => LevelSerializer._serializeObject(o)));
        this.undoStack.push(currentState);
        
        const nextState = this.redoStack.pop();
        const objDatas = JSON.parse(nextState);
        this.objects = objDatas.map(d => LevelSerializer._deserializeObject(d));
        this.selectedObjects = [];
    }
    
    _buildLevelData() {
        return {
            name: this.levelName,
            author: 'Player',
            description: '',
            bpm: this.levelBPM,
            speed: this.levelSpeed,
            startMode: GD.MODES.CUBE,
            bgColor: this.levelBGColor,
            groundColor: this.levelGroundColor,
            groundY: this.levelGroundY,
            ceilingY: 0,
            objects: this.objects,
            colorChannels: {},
            guidelines: [],
            musicStyle: 'electronic',
            musicDuration: 60
        };
    }
    
    _saveLevel() {
        const levelData = this._buildLevelData();
        this.game.levelManager.addUserLevel(levelData);
        console.log('Level saved:', this.levelName);
    }
    
    _testLevel() {
        const levelData = this._buildLevelData();
        this.active = false;
        this.game.startLevel(levelData);
    }
    
    _exitEditor() {
        this.active = false;
        this.game.state = 'menu';
        this.game.ui.showMenu();
    }
    
    activate() {
        this.active = true;
        this.game.state = 'editor';
    }
    
    render() {
        if (!this.active) return;
        
        const ctx = this.ctx;
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        
        // Clear
        ctx.fillStyle = '#111122';
        ctx.fillRect(0, 0, cw, ch);
        
        // Draw editor viewport
        ctx.save();
        ctx.translate(this.panelWidth, this.topBarHeight);
        ctx.beginPath();
        ctx.rect(0, 0, cw - this.panelWidth, ch - this.topBarHeight);
        ctx.clip();
        
        // Apply camera
        ctx.scale(this.cameraZoom, this.cameraZoom);
        ctx.translate(-this.cameraX, -this.cameraY);
        
        // Background
        ctx.fillStyle = this.levelBGColor;
        ctx.fillRect(this.cameraX - 50, this.cameraY - 50, 
            (cw - this.panelWidth) / this.cameraZoom + 100, 
            (ch - this.topBarHeight) / this.cameraZoom + 100);
        
        // Grid
        if (this.showGrid) {
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 0.5;
            const startX = Math.floor(this.cameraX / this.gridSize) * this.gridSize;
            const startY = Math.floor(this.cameraY / this.gridSize) * this.gridSize;
            const endX = this.cameraX + (cw - this.panelWidth) / this.cameraZoom + this.gridSize;
            const endY = this.cameraY + (ch - this.topBarHeight) / this.cameraZoom + this.gridSize;
            
            ctx.beginPath();
            for (let x = startX; x <= endX; x += this.gridSize) {
                ctx.moveTo(x, startY);
                ctx.lineTo(x, endY);
            }
            for (let y = startY; y <= endY; y += this.gridSize) {
                ctx.moveTo(startX, y);
                ctx.lineTo(endX, y);
            }
            ctx.stroke();
        }
        
        // Ground line
        ctx.strokeStyle = '#44ff44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.cameraX - 50, this.levelGroundY);
        ctx.lineTo(this.cameraX + (cw - this.panelWidth) / this.cameraZoom + 50, this.levelGroundY);
        ctx.stroke();
        
        // Ground fill
        ctx.fillStyle = this.levelGroundColor;
        ctx.fillRect(
            this.cameraX - 50, this.levelGroundY,
            (cw - this.panelWidth) / this.cameraZoom + 100,
            200
        );
        
        // Draw objects
        for (const obj of this.objects) {
            const isSelected = this.selectedObjects.includes(obj);
            
            switch (obj.type) {
                case 'block':
                    this.game.renderer.drawBlock(obj);
                    break;
                case 'spike':
                    this.game.renderer.drawSpike(obj);
                    break;
                case 'orb':
                    this.game.renderer

You
Continue
Assistant


## js/editor/Editor.js (continued)

```javascript
                    this.game.renderer.drawOrb(obj, performance.now() / 1000);
                    break;
                case 'pad':
                    this.game.renderer.drawPad(obj, performance.now() / 1000);
                    break;
                case 'portal':
                    this.game.renderer.drawPortal(obj, performance.now() / 1000);
                    break;
                case 'coin':
                    this.game.renderer.drawCoin(obj, performance.now() / 1000);
                    break;
                case 'trigger':
                    obj.showInEditor = true;
                    this.game.renderer.drawTrigger(obj);
                    break;
                default:
                    this.game.renderer.drawDecoration(obj);
                    break;
            }
            
            // Selection highlight
            if (isSelected) {
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(obj.x - 2, obj.y - 2, obj.width + 4, obj.height + 4);
                ctx.setLineDash([]);
            }
        }
        
        // Selection box
        if (this.selecting) {
            const sx = Math.min(this.selectStartX, this.selectEndX);
            const sy = Math.min(this.selectStartY, this.selectEndY);
            const sw = Math.abs(this.selectEndX - this.selectStartX);
            const sh = Math.abs(this.selectEndY - this.selectStartY);
            
            ctx.fillStyle = 'rgba(0,200,255,0.1)';
            ctx.fillRect(sx, sy, sw, sh);
            ctx.strokeStyle = 'rgba(0,200,255,0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx, sy, sw, sh);
        }
        
        // Player spawn indicator
        ctx.fillStyle = 'rgba(0,255,0,0.3)';
        ctx.fillRect(
            GD.BLOCK_SIZE * 2, this.levelGroundY - GD.PLAYER_SIZE,
            GD.PLAYER_SIZE, GD.PLAYER_SIZE
        );
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            GD.BLOCK_SIZE * 2, this.levelGroundY - GD.PLAYER_SIZE,
            GD.PLAYER_SIZE, GD.PLAYER_SIZE
        );
        ctx.fillStyle = '#00ff00';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SPAWN', GD.BLOCK_SIZE * 2 + GD.PLAYER_SIZE / 2, this.levelGroundY - GD.PLAYER_SIZE - 5);
        
        ctx.restore();
        
        // Draw UI panels
        this._drawPalettePanel(ctx, ch);
        this._drawTopBar(ctx, cw);
        this._drawStatusBar(ctx, cw, ch);
    }
    
    _drawPalettePanel(ctx, ch) {
        // Panel background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.panelWidth, ch);
        
        // Panel border
        ctx.strokeStyle = '#333355';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.panelWidth, 0);
        ctx.lineTo(this.panelWidth, ch);
        ctx.stroke();
        
        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OBJECTS', this.panelWidth / 2, 20);
        
        // Divider
        ctx.strokeStyle = '#333355';
        ctx.beginPath();
        ctx.moveTo(10, 30);
        ctx.lineTo(this.panelWidth - 10, 30);
        ctx.stroke();
        
        // Object list
        const itemHeight = 30;
        const startY = 40;
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, startY, this.panelWidth, ch - startY - 60);
        ctx.clip();
        
        for (let i = 0; i < this.objectTypes.length; i++) {
            const ot = this.objectTypes[i];
            const y = startY + i * itemHeight - this.paletteScrollY;
            
            if (y + itemHeight < startY || y > ch) continue;
            
            // Highlight selected
            if (i === this.selectedPaletteIndex) {
                ctx.fillStyle = 'rgba(0,150,255,0.3)';
                ctx.fillRect(5, y, this.panelWidth - 10, itemHeight - 2);
            }
            
            // Color swatch
            ctx.fillStyle = ot.color;
            ctx.fillRect(10, y + 5, 18, 18);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.strokeRect(10, y + 5, 18, 18);
            
            // Label
            ctx.fillStyle = '#cccccc';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(ot.label, 35, y + 18);
        }
        
        ctx.restore();
        
        // Tool info at bottom
        ctx.fillStyle = '#222244';
        ctx.fillRect(0, ch - 55, this.panelWidth, 55);
        ctx.fillStyle = '#aaaacc';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Tool: ${this.currentTool}`, 10, ch - 38);
        ctx.fillText(`Grid: ${this.gridSnap ? 'ON' : 'OFF'}`, 10, ch - 22);
        ctx.fillText(`Objects: ${this.objects.length}`, 10, ch - 6);
    }
    
    _drawTopBar(ctx, cw) {
        // Bar background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(this.panelWidth, 0, cw - this.panelWidth, this.topBarHeight);
        
        // Bar border
        ctx.strokeStyle = '#333355';
        ctx.beginPath();
        ctx.moveTo(this.panelWidth, this.topBarHeight);
        ctx.lineTo(cw, this.topBarHeight);
        ctx.stroke();
        
        // Tool buttons
        const tools = [
            { id: 'place', label: '✏ Place', key: '1' },
            { id: 'select', label: '☐ Select', key: '2' },
            { id: 'delete', label: '✕ Delete', key: '3' },
            { id: 'move', label: '↔ Move', key: '4' }
        ];
        
        const btnWidth = 70;
        const btnHeight = 28;
        const startX = this.panelWidth + 10;
        
        for (let i = 0; i < tools.length; i++) {
            const tool = tools[i];
            const bx = startX + i * (btnWidth + 5);
            const by = 6;
            
            const isActive = this.currentTool === tool.id;
            
            ctx.fillStyle = isActive ? '#4466aa' : '#2a2a4e';
            ctx.beginPath();
            this._roundRect(ctx, bx, by, btnWidth, btnHeight, 4);
            ctx.fill();
            
            ctx.fillStyle = isActive ? '#ffffff' : '#888899';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(tool.label, bx + btnWidth / 2, by + 17);
        }
        
        // Level name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.levelName, (this.panelWidth + cw) / 2, 25);
        
        // Test button
        const testX = cw - 160;
        ctx.fillStyle = '#44aa44';
        ctx.beginPath();
        this._roundRect(ctx, testX, 6, 70, btnHeight, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('▶ TEST', testX + 35, 24);
        
        // Save button
        const saveX = cw - 80;
        ctx.fillStyle = '#4466aa';
        ctx.beginPath();
        this._roundRect(ctx, saveX, 6, 70, btnHeight, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('💾 SAVE', saveX + 35, 24);
    }
    
    _drawStatusBar(ctx, cw, ch) {
        const barHeight = 20;
        const y = ch - barHeight;
        
        ctx.fillStyle = '#0a0a1e';
        ctx.fillRect(this.panelWidth, y, cw - this.panelWidth, barHeight);
        
        ctx.fillStyle = '#666688';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        
        const worldX = Math.floor(this.cameraX + (cw - this.panelWidth) / (2 * this.cameraZoom));
        const worldY = Math.floor(this.cameraY + (ch - this.topBarHeight) / (2 * this.cameraZoom));
        
        ctx.fillText(
            `Pos: (${worldX}, ${worldY})  Zoom: ${(this.cameraZoom * 100).toFixed(0)}%  ` +
            `Selected: ${this.selectedObjects.length}  ` +
            `[T]est [G]rid [H]ideGrid [ESC]Exit`,
            this.panelWidth + 10, y + 14
        );
    }
    
    _roundRect(ctx, x, y, w, h, r) {
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
    }
    
    update(dt) {
        if (!this.active) return;
        // Editor update logic (animations, etc.)
    }
}
```

---

## js/levels/LevelManager.js

```javascript
class LevelManager {
    constructor() {
        this.builtinLevels = [];
        this.userLevels = [];
        
        this._loadBuiltinLevels();
        this._loadUserLevels();
    }
    
    _loadBuiltinLevels() {
        this.builtinLevels = [
            LevelFactory.createStereoMadness(),
            LevelFactory.createBackOnTrack(),
            LevelFactory.createPolargeist()
        ];
    }
    
    _loadUserLevels() {
        try {
            const saved = localStorage.getItem('gd_user_levels');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.userLevels = parsed.map(data => LevelSerializer.deserialize(data));
            }
        } catch (e) {
            console.warn('Failed to load user levels:', e);
            this.userLevels = [];
        }
    }
    
    getAllLevels() {
        return [...this.builtinLevels, ...this.userLevels];
    }
    
    getBuiltinLevels() {
        return this.builtinLevels;
    }
    
    getUserLevels() {
        return this.userLevels;
    }
    
    getLevelByName(name) {
        return this.getAllLevels().find(l => l.name === name);
    }
    
    addUserLevel(levelData) {
        // Check if level with same name exists
        const existing = this.userLevels.findIndex(l => l.name === levelData.name);
        if (existing >= 0) {
            this.userLevels[existing] = levelData;
        } else {
            this.userLevels.push(levelData);
        }
        this._saveUserLevels();
    }
    
    deleteUserLevel(name) {
        this.userLevels = this.userLevels.filter(l => l.name !== name);
        this._saveUserLevels();
    }
    
    _saveUserLevels() {
        try {
            const serialized = this.userLevels.map(l => LevelSerializer.serialize(l));
            localStorage.setItem('gd_user_levels', JSON.stringify(serialized));
        } catch (e) {
            console.warn('Failed to save user levels:', e);
        }
    }
}
```

---

## js/levels/LevelSerializer.js

```javascript
class LevelSerializer {
    static serialize(levelData) {
        return {
            name: levelData.name,
            author: levelData.author || 'Unknown',
            description: levelData.description || '',
            bpm: levelData.bpm || GD.DEFAULT_BPM,
            speed: levelData.speed || 1,
            startMode: levelData.startMode || GD.MODES.CUBE,
            bgColor: levelData.bgColor,
            groundColor: levelData.groundColor,
            groundY: levelData.groundY,
            ceilingY: levelData.ceilingY || 0,
            colorChannels: levelData.colorChannels || {},
            musicStyle: levelData.musicStyle || 'electronic',
            musicDuration: levelData.musicDuration || 60,
            objects: levelData.objects.map(o => LevelSerializer._serializeObject(o))
        };
    }
    
    static deserialize(data) {
        const objects = data.objects.map(o => LevelSerializer._deserializeObject(o));
        
        return {
            name: data.name,
            author: data.author,
            description: data.description,
            bpm: data.bpm,
            speed: data.speed,
            startMode: data.startMode,
            bgColor: data.bgColor,
            groundColor: data.groundColor,
            groundY: data.groundY,
            ceilingY: data.ceilingY,
            colorChannels: data.colorChannels || {},
            musicStyle: data.musicStyle,
            musicDuration: data.musicDuration,
            objects
        };
    }
    
    static _serializeObject(obj) {
        const data = {
            type: obj.type,
            x: obj.x,
            y: obj.y,
            width: obj.width,
            height: obj.height,
            color: obj.color,
            solid: obj.solid,
            hazard: obj.hazard,
            rotation: obj.rotation || 0,
            zOrder: obj.zOrder || 0,
            groupId: obj.groupId || null,
            groups: obj.groups || []
        };
        
        // Type-specific properties
        if (obj.type === 'spike') {
            data.direction = obj.direction;
        }
        if (obj.type === 'orb') {
            data.orbType = obj.orbType;
        }
        if (obj.type === 'pad') {
            data.padType = obj.padType;
        }
        if (obj.type === 'portal') {
            data.portalType = obj.portalType;
            data.linkedPortalId = obj.linkedPortalId || null;
        }
        if (obj.type === 'trigger') {
            data.triggerType = obj.triggerType;
            data.triggerConfig = obj.triggerConfig || {};
        }
        
        return data;
    }
    
    static _deserializeObject(data) {
        switch (data.type) {
            case 'spike':
                return new Hazard(data);
            case 'orb':
                return new Orb(data);
            case 'pad':
                return new Pad(data);
            case 'portal':
                return new Portal(data);
            case 'trigger':
                return new Trigger(data);
            default:
                return new GameObject(data);
        }
    }
}
```

---

## js/levels/LevelFactory.js

```javascript
class LevelFactory {
    static _block(x, y, color) {
        return new GameObject({
            type: 'block', x: x * GD.BLOCK_SIZE, y: GD.GROUND_Y - y * GD.BLOCK_SIZE,
            width: GD.BLOCK_SIZE, height: GD.BLOCK_SIZE,
            color: color || '#4a4a8a', solid: true
        });
    }
    
    static _spike(x, y, dir) {
        return new Hazard({
            type: 'spike',
            x: x * GD.BLOCK_SIZE,
            y: GD.GROUND_Y - y * GD.BLOCK_SIZE,
            width: GD.BLOCK_SIZE, height: GD.BLOCK_SIZE,
            color: '#ffffff', direction: dir || 'up', hazard: true
        });
    }
    
    static _orb(x, y, orbType) {
        const colors = {
            YELLOW: '#ffff00', BLUE: '#4488ff', GREEN: '#44ff44',
            PINK: '#ff44ff', RED: '#ff4444', BLACK: '#333333'
        };
        return new Orb({
            type: 'orb',
            x: x * GD.BLOCK_SIZE + GD.BLOCK_SIZE * 0.15,
            y: GD.GROUND_Y - y * GD.BLOCK_SIZE + GD.BLOCK_SIZE * 0.15,
            width: GD.BLOCK_SIZE * 0.7, height: GD.BLOCK_SIZE * 0.7,
            color: colors[orbType] || '#ffff00', orbType
        });
    }
    
    static _pad(x, y, padType) {
        const colors = {
            YELLOW: '#ffff00', BLUE: '#4488ff', PINK: '#ff44ff', RED: '#ff4444'
        };
        return new Pad({
            type: 'pad',
            x: x * GD.BLOCK_SIZE,
            y: GD.GROUND_Y - y * GD.BLOCK_SIZE + GD.BLOCK_SIZE * 0.6,
            width: GD.BLOCK_SIZE, height: GD.BLOCK_SIZE * 0.4,
            color: colors[padType] || '#ffff00', padType
        });
    }
    
    static _portal(x, y, portalType) {
        const colors = {};
        colors[GD.PORTAL_TYPES.CUBE] = '#44ff44';
        colors[GD.PORTAL_TYPES.SHIP] = '#ff8800';
        colors[GD.PORTAL_TYPES.BALL] = '#ff4444';
        colors[GD.PORTAL_TYPES.UFO] = '#ffff44';
        colors[GD.PORTAL_TYPES.WAVE] = '#44ffff';
        colors[GD.PORTAL_TYPES.ROBOT] = '#ff44ff';
        colors[GD.PORTAL_TYPES.SPIDER] = '#8844ff';
        colors[GD.PORTAL_TYPES.GRAVITY_FLIP] = '#4488ff';
        colors[GD.PORTAL_TYPES.GRAVITY_NORMAL] = '#ffaa00';
        colors[GD.PORTAL_TYPES.SPEED_NORMAL] = '#ffaa44';
        colors[GD.PORTAL_TYPES.SPEED_DOUBLE] = '#ff8844';
        colors[GD.PORTAL_TYPES.SPEED_TRIPLE] = '#ff4444';
        colors[GD.PORTAL_TYPES.SPEED_QUAD] = '#ff2222';
        
        return new Portal({
            type: 'portal',
            x: x * GD.BLOCK_SIZE,
            y: GD.GROUND_Y - y * GD.BLOCK_SIZE - GD.BLOCK_SIZE * 1.5,
            width: GD.BLOCK_SIZE * 0.8, height: GD.BLOCK_SIZE * 3,
            color: colors[portalType] || '#ffffff',
            portalType
        });
    }
    
    static _coin(x, y) {
        return new GameObject({
            type: 'coin',
            x: x * GD.BLOCK_SIZE + GD.BLOCK_SIZE * 0.1,
            y: GD.GROUND_Y - y * GD.BLOCK_SIZE + GD.BLOCK_SIZE * 0.1,
            width: GD.BLOCK_SIZE * 0.8, height: GD.BLOCK_SIZE * 0.8,
            color: '#ffdd00'
        });
    }
    
    static _blockRow(startX, y, count, color) {
        const blocks = [];
        for (let i = 0; i < count; i++) {
            blocks.push(LevelFactory._block(startX + i, y, color));
        }
        return blocks;
    }
    
    static _blockColumn(x, startY, count, color) {
        const blocks = [];
        for (let i = 0; i < count; i++) {
            blocks.push(LevelFactory._block(x, startY + i, color));
        }
        return blocks;
    }
    
    static _platform(startX, y, width, height, color) {
        const blocks = [];
        for (let dx = 0; dx < width; dx++) {
            for (let dy = 0; dy < height; dy++) {
                blocks.push(LevelFactory._block(startX + dx, y + dy, color));
            }
        }
        return blocks;
    }
    
    // ==========================================
    // LEVEL 1: Stereo Madness (simplified)
    // ==========================================
    static createStereoMadness() {
        const objects = [];
        const B = '#4a4a8a';
        const B2 = '#5a5a9a';
        
        // Section 1: Simple jumps
        // Gap with spike
        objects.push(...LevelFactory._blockRow(10, 1, 3, B));
        objects.push(LevelFactory._spike(13, 1));
        
        objects.push(...LevelFactory._blockRow(15, 1, 2, B));
        objects.push(LevelFactory._spike(17, 1));
        
        objects.push(...LevelFactory._blockRow(19, 1, 4, B));
        objects.push(LevelFactory._spike(19, 2));
        
        // Section 2: Platforms
        objects.push(...LevelFactory._blockRow(25, 1, 2, B));
        objects.push(...LevelFactory._blockRow(25, 2, 2, B));
        objects.push(LevelFactory._spike(27, 1));
        
        objects.push(...LevelFactory._blockRow(29, 1, 1, B));
        objects.push(...LevelFactory._blockRow(29, 2, 1, B));
        objects.push(...LevelFactory._blockRow(29, 3, 1, B));
        objects.push(LevelFactory._spike(30, 1));
        
        objects.push(...LevelFactory._blockRow(32, 1, 3, B2));
        objects.push(LevelFactory._spike(35, 1));
        objects.push(LevelFactory._spike(36, 1));
        
        // Section 3: Triple spikes
        objects.push(...LevelFactory._blockRow(38, 1, 2, B));
        objects.push(LevelFactory._spike(40, 1));
        objects.push(LevelFactory._spike(41, 1));
        objects.push(LevelFactory._spike(42, 1));
        
        // Orb section
        objects.push(LevelFactory._orb(44, 3, 'YELLOW'));
        objects.push(...LevelFactory._blockRow(46, 1, 3, B));
        objects.push(LevelFactory._spike(46, 2));
        
        // Section 4: Higher platforms
        objects.push(...LevelFactory._platform(50, 1, 2, 3, B));
        objects.push(LevelFactory._spike(52, 1));
        objects.push(...LevelFactory._platform(54, 1, 2, 2, B));
        objects.push(LevelFactory._spike(56, 1));
        
        // Pad section
        objects.push(LevelFactory._pad(58, 1, 'YELLOW'));
        objects.push(...LevelFactory._blockRow(60, 4, 3, B2));
        objects.push(LevelFactory._spike(60, 5));
        
        // Section 5: Ship portal
        objects.push(LevelFactory._portal(65, 2, GD.PORTAL_TYPES.SHIP));
        
        // Ship section - ceiling and floor blocks
        objects.push(...LevelFactory._blockRow(68, 1, 15, B));
        objects.push(...LevelFactory._blockRow(68, 8, 15, B));
        
        // Obstacles in ship section
        objects.push(...LevelFactory._blockColumn(72, 2, 2, B2));
        objects.push(...LevelFactory._blockColumn(76, 6, 2, B2));
        objects.push(...LevelFactory._blockColumn(80, 2, 3, B2));
        
        // Back to cube
        objects.push(LevelFactory._portal(84, 2, GD.PORTAL_TYPES.CUBE));
        
        // Section 6: More complex cube
        objects.push(LevelFactory._spike(87, 1));
        objects.push(...LevelFactory._blockRow(88, 1, 2, B));
        objects.push(...LevelFactory._blockRow(88, 2, 2, B));
        objects.push(LevelFactory._spike(90, 1));
        objects.push(LevelFactory._spike(91, 1));
        
        objects.push(LevelFactory._orb(93, 3, 'YELLOW'));
        objects.push(...LevelFactory._blockRow(95, 1, 4, B));
        objects.push(LevelFactory._spike(95, 2));
        objects.push(LevelFactory._spike(96, 2));
        
        // Section 7: Speed change
        objects.push(LevelFactory._portal(100, 2, GD.PORTAL_TYPES.SPEED_DOUBLE));
        
        objects.push(LevelFactory._spike(103, 1));
        objects.push(...LevelFactory._blockRow(104, 1, 1, B));
        objects.push(LevelFactory._spike(105, 1));
        objects.push(...LevelFactory._blockRow(106, 1, 1, B));
        objects.push(LevelFactory._spike(107, 1));
        
        objects.push(LevelFactory._portal(110, 2, GD.PORTAL_TYPES.SPEED_NORMAL));
        
        // Section 8: Ending
        objects.push(...LevelFactory._blockRow(113, 1, 2, B));
        objects.push(LevelFactory._spike(115, 1));
        objects.push(...LevelFactory._blockRow(116, 1, 3, B));
        objects.push(LevelFactory._spike(116, 2));
        
        // Coins
        objects.push(LevelFactory._coin(20, 3));
        objects.push(LevelFactory._coin(55, 5));
        objects.push(LevelFactory._coin(100, 3));
        
        return {
            name: 'Stereo Madness',
            author: 'RobTop',
            description: 'The first level',
            bpm: 128,
            speed: 1,
            startMode: GD.MODES.CUBE,
            bgColor: '#1a0033',
            groundColor: '#2a2a5a',
            groundY: GD.GROUND_Y,
            ceilingY: 0,
            colorChannels: {},
            musicStyle: 'electronic',
            musicDuration: 60,
            objects
        };
    }
    
    // ==========================================
    // LEVEL 2: Back On Track (simplified)
    // ==========================================
    static createBackOnTrack() {
        const objects = [];
        const B = '#3a5a3a';
        const B2 = '#4a6a4a';
        
        // Section 1: Quick jumps
        objects.push(LevelFactory._spike(8, 1));
        objects.push(...LevelFactory._blockRow(9, 1, 2, B));
        objects.push(LevelFactory._spike(11, 1));
        objects.push(LevelFactory._spike(12, 1));
        
        objects.push(...LevelFactory._blockRow(14, 1, 3, B));
        objects.push(LevelFactory._spike(14, 2));
        objects.push(LevelFactory._spike(17, 1));
        
        // Orb jump
        objects.push(LevelFactory._orb(19, 3, 'YELLOW'));
        objects.push(...LevelFactory._platform(21, 1, 2, 2, B));
        objects.push(LevelFactory._spike(23, 1));
        objects.push(LevelFactory._spike(24, 1));
        
        // Section 2: Ship
        objects.push(LevelFactory._portal(27, 2, GD.PORTAL_TYPES.SHIP));
        
        objects.push(...LevelFactory._blockRow(30, 1, 20, B));
        objects.push(...LevelFactory._blockRow(30, 9, 20, B));
        
        objects.push(...LevelFactory._blockColumn(34, 2, 3, B2));
        objects.push(...LevelFactory._blockColumn(38, 6, 3, B2));
        objects.push(...LevelFactory._blockColumn(42, 3, 2, B2));
        objects.push(...LevelFactory._blockColumn(46, 5, 3, B2));
        
        objects.push(LevelFactory._portal(50, 2, GD.PORTAL_TYPES.CUBE));
        
        // Section 3: Ball
        objects.push(...LevelFactory._blockRow(53, 1, 5, B));
        objects.push(LevelFactory._spike(53, 2));
        objects.push(LevelFactory._spike(55, 2));
        
        objects.push(LevelFactory._portal(59, 2, GD.PORTAL_TYPES.BALL));
        
        objects.push(...LevelFactory._blockRow(62, 1, 12, B));
        objects.push(...LevelFactory._blockRow(62, 7, 12, B));
        
        objects.push(LevelFactory._spike(65, 2));
        objects.push(LevelFactory._spike(68, 6));
        objects.push(LevelFactory._spike(71, 2));
        
        objects.push(LevelFactory._portal(74, 2, GD.PORTAL_TYPES.CUBE));
        
        // Section 4: Speed + jumps
        objects.push(LevelFactory._portal(77, 2, GD.PORTAL_TYPES.SPEED_DOUBLE));
        
        objects.push(LevelFactory._spike(80, 1));
        objects.push(...LevelFactory._blockRow(81, 1, 1, B));
        objects.push(LevelFactory._spike(82, 1));
        objects.push(LevelFactory._orb(83, 3, 'BLUE'));
        objects.push(LevelFactory._spike(84, 1));
        objects.push(...LevelFactory._blockRow(85, 1, 2, B));
        objects.push(LevelFactory._spike(87, 1));
        objects.push(LevelFactory._spike(88, 1));
        
        objects.push(LevelFactory._portal(90, 2, GD.PORTAL_TYPES.SPEED_NORMAL));
        
        // Ending
        objects.push(...LevelFactory._blockRow(93, 1, 3, B));
        objects.push(LevelFactory._spike(93, 2));
        objects.push(LevelFactory._spike(96, 1));
        objects.push(...LevelFactory._blockRow(97, 1, 2, B));
        
        // Coins
        objects.push(LevelFactory._coin(15, 3));
        objects.push(LevelFactory._coin(44, 5));
        objects.push(LevelFactory._coin(83, 5));
        
        return {
            name: 'Back On Track',
            author: 'RobTop',
            description: 'The second level',
            bpm: 140,
            speed: 1,
            startMode: GD.MODES.CUBE,
            bgColor: '#001a00',
            groundColor: '#1a3a1a',
            groundY: GD.GROUND_Y,
            ceilingY: 0,
            colorChannels: {},
            musicStyle: 'electronic',
            musicDuration: 60,
            objects
        };
    }
    
    // ==========================================
    // LEVEL 3: Polargeist (simplified)
    // ==========================================
    static createPolargeist() {
        const objects = [];
        const B = '#3a3a6a';
        const B2 = '#5a3a6a';
        
        // Section 1: UFO intro
        objects.push(LevelFactory._portal(6, 2, GD.PORTAL_TYPES.UFO));
        
        objects.push(...LevelFactory._blockRow(9, 1, 25, B));
        objects.push(...LevelFactory._blockRow(9, 10, 25, B));
        
        objects.push(...LevelFactory._blockColumn(13, 2, 3, B2));
        objects.push(...LevelFactory._blockColumn(17, 7, 3, B2));
        objects.push(...LevelFactory._blockColumn(21, 2, 4, B2));
        objects.push(...LevelFactory._blockColumn(25, 6, 4, B2));
        objects.push(...LevelFactory._blockColumn(29, 3, 2, B2));
        
        objects.push(LevelFactory._portal(34, 2, GD.PORTAL_TYPES.CUBE));
        
        // Section 2: Cube with gravity portals
        objects.push(LevelFactory._spike(37, 1));
        objects.push(...LevelFactory._blockRow(38, 1, 3, B));
        objects.push(LevelFactory._spike(41, 1));
        
        objects.push(LevelFactory._portal(43, 2, GD.PORTAL_TYPES.GRAVITY_FLIP));
        
        // Ceiling section (upside down)
        objects.push(...LevelFactory._blockRow(46, 8, 8, B));
        objects.push(LevelFactory._spike(46, 7));
        objects.push(LevelFactory._spike(49, 7));
        objects.push(LevelFactory._spike(52, 7));
        
        objects.push(LevelFactory._portal(55, 5, GD.PORTAL_TYPES.GRAVITY_NORMAL));
        
        // Section 3: Wave
        objects.push(LevelFactory._portal(58, 2, GD.PORTAL_TYPES.WAVE));
        
        objects.push(...LevelFactory._blockRow(61, 1, 15, B));
        objects.push(...LevelFactory._blockRow(61, 8, 15, B));
        
        // Wave obstacles
        objects.push(...LevelFactory._blockColumn(64, 2, 2, B2));
        objects.push(...LevelFactory._blockColumn(64, 6, 2, B2));
        objects.push(...LevelFactory._blockColumn(68, 3, 3, B2));
        objects.push(...LevelFactory._blockColumn(72, 2, 2, B2));
        objects.push(...LevelFactory._blockColumn(72, 6, 2, B2));
        
        objects.push(LevelFactory._portal(76, 2, GD.PORTAL_TYPES.CUBE));
        
        // Section 4: Finale
        objects.push(LevelFactory._portal(79, 2, GD.PORTAL_TYPES.SPEED_TRIPLE));
        
        objects.push(LevelFactory._spike(82, 1));
        objects.push(LevelFactory._orb(83, 3, 'PINK'));
        objects.push(LevelFactory._spike(84, 1));
        objects.push(LevelFactory._spike(85, 1));
        objects.push(...LevelFactory._blockRow(86, 1, 2, B));
        objects.push(LevelFactory._spike(88, 1));
        objects.push(LevelFactory._orb(89, 3, 'YELLOW'));
        objects.push(LevelFactory._spike(90, 1));
        objects.push(...LevelFactory._blockRow(91, 1, 3, B));
        
        // Coins
        objects.push(LevelFactory._coin(20, 5));
        objects.push(LevelFactory._coin(50, 5));
        objects.push(LevelFactory._coin(70, 5));
        
        return {
            name: 'Polargeist',
            author: 'RobTop',
            description: 'The third level',
            bpm: 150,
            speed: 1,
            startMode: GD.MODES.CUBE,
            bgColor: '#0a001a',
            groundColor: '#2a1a4a',
            groundY: GD.GROUND_Y,
            ceilingY: 0,
            colorChannels: {},
            musicStyle: 'electronic',
            musicDuration: 60,
            objects
        };
    }
}
```

---

## js/input/InputManager.js

```javascript
class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        
        this._wasPressed = false;
        
        this._bindEvents();
    }
    
    _bindEvents() {
        // Mouse / Touch
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.pressed = true;
        });
        this.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.pressed = false;
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            this.pressed = true;
            e.preventDefault();
        }, { passive: false });
        this.canvas.addEventListener('touchend', (e) => {
            this.pressed = false;
            e.preventDefault();
        }, { passive: false });
        
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || 
                e.code === 'KeyW' || e.code === 'KeyX') {
                this.pressed = true;
                e.preventDefault();
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || 
                e.code === 'KeyW' || e.code === 'KeyX') {
                this.pressed = false;
            }
        });
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    update() {
        this.justPressed = this.pressed && !this._wasPressed;
        this.justReleased = !this.pressed && this._wasPressed;
        this._wasPressed = this.pressed;
    }
    
    isPressed() {
        return this.pressed;
    }
    
    wasJustPressed() {
        return this.justPressed;
    }
    
    wasJustReleased() {
        return this.justReleased;
    }
    
    reset() {
        this.pressed = false;
        this.justPressed = false;
        this.justReleased = false;
        this._wasPressed = false;
    }
}
```

---

## js/utils/MathUtils.js

```javascript
class MathUtils {
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    
    static lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    static inverseLerp(a, b, value) {
        if (a === b) return 0;
        return (value - a) / (b - a);
    }
    
    static remap(value, inMin, inMax, outMin, outMax) {
        const t = MathUtils.inverseLerp(inMin, inMax, value);
        return MathUtils.lerp(outMin, outMax, t);
    }
    
    static degToRad(deg) {
        return deg * Math.PI / 180;
    }
    
    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }
    
    static distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    static aabbOverlap(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
    
    static pointInRect(px, py, rx, ry, rw, rh) {
        return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
    }
    
    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static smoothStep(t) {
        return t * t * (3 - 2 * t);
    }
    
    static easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    static easeIn(t) {
        return t * t;
    }
    
    static easeOut(t) {
        return t * (2 - t);
    }
    
    static easeInBack(t) {
        const c1

You
Continue
Assistant


## js/utils/MathUtils.js (continued)

```javascript
    static easeInBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    }
    
    static easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
    
    static easeOutBounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }
    
    static easeOutElastic(t) {
        if (t === 0 || t === 1) return t;
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
    }
    
    static getEasing(name) {
        const easings = {
            'linear': (t) => t,
            'easeIn': MathUtils.easeIn,
            'easeOut': MathUtils.easeOut,
            'easeInOut': MathUtils.easeInOut,
            'easeInBack': MathUtils.easeInBack,
            'easeOutBack': MathUtils.easeOutBack,
            'easeOutBounce': MathUtils.easeOutBounce,
            'easeOutElastic': MathUtils.easeOutElastic,
            'smoothStep': MathUtils.smoothStep
        };
        return easings[name] || easings['linear'];
    }
}
```

---

## js/utils/ColorUtils.js

```javascript
class ColorUtils {
    static hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }
    
    static rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = Math.round(MathUtils.clamp(c, 0, 255)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    
    static rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    static hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        
        if (s === 0) {
            const v = Math.round(l * 255);
            return { r: v, g: v, b: v };
        }
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        return {
            r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
            g: Math.round(hue2rgb(p, q, h) * 255),
            b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
        };
    }
    
    static lerpColor(color1, color2, t) {
        const c1 = ColorUtils.hexToRgb(color1);
        const c2 = ColorUtils.hexToRgb(color2);
        
        return ColorUtils.rgbToHex(
            MathUtils.lerp(c1.r, c2.r, t),
            MathUtils.lerp(c1.g, c2.g, t),
            MathUtils.lerp(c1.b, c2.b, t)
        );
    }
    
    static darken(colorHex, amount) {
        const rgb = ColorUtils.hexToRgb(colorHex);
        return {
            r: rgb.r * (1 - amount),
            g: rgb.g * (1 - amount),
            b: rgb.b * (1 - amount)
        };
    }
    
    static lighten(colorHex, amount) {
        const rgb = ColorUtils.hexToRgb(colorHex);
        return {
            r: rgb.r + (255 - rgb.r) * amount,
            g: rgb.g + (255 - rgb.g) * amount,
            b: rgb.b + (255 - rgb.b) * amount
        };
    }
    
    static withAlpha(colorHex, alpha) {
        const rgb = ColorUtils.hexToRgb(colorHex);
        return `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},${alpha})`;
    }
    
    static pulseColor(colorHex, time, speed, amount) {
        const pulse = (Math.sin(time * speed) * 0.5 + 0.5) * amount;
        const lightened = ColorUtils.lighten(colorHex, pulse);
        return ColorUtils.rgbToHex(lightened.r, lightened.g, lightened.b);
    }
}
```

---

## js/camera/Camera.js

```javascript
class Camera {
    constructor(viewWidth, viewHeight) {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.targetZoom = 1;
        
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        
        this.shakeAmount = 0;
        this.shakeDecay = 5;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
        
        this.mirror = false;
        
        // Smooth follow parameters
        this.followOffsetX = -200; // Player is offset from center
        this.followOffsetY = 0;
        this.smoothX = 0.1;
        this.smoothY = 0.05;
    }
    
    follow(player, dt) {
        // X follows player directly (GD style - player stays at fixed X position on screen)
        const targetX = player.x + this.followOffsetX;
        this.x = targetX; // No smoothing on X - camera follows exactly
        
        // Y follows with some smoothing
        const targetY = player.y - this.viewHeight / (2 * this.zoom) + player.height / 2;
        
        // In cube mode, camera Y is mostly fixed to ground level
        if (player.mode === GD.MODES.CUBE || player.mode === GD.MODES.ROBOT) {
            const groundCameraY = player.gravityDirection > 0 ?
                GD.GROUND_Y - this.viewHeight / this.zoom + 80 :
                -80;
            this.y = MathUtils.lerp(this.y, groundCameraY, this.smoothY);
        } else {
            // For flying modes, follow player Y
            this.y = MathUtils.lerp(this.y, targetY, this.smoothY * 3);
        }
        
        // Zoom smoothing
        if (Math.abs(this.zoom - this.targetZoom) > 0.001) {
            this.zoom = MathUtils.lerp(this.zoom, this.targetZoom, 0.05);
        }
        
        // Screen shake
        if (this.shakeAmount > 0) {
            this.shakeOffsetX = (Math.random() * 2 - 1) * this.shakeAmount;
            this.shakeOffsetY = (Math.random() * 2 - 1) * this.shakeAmount;
            this.shakeAmount -= this.shakeDecay * dt;
            if (this.shakeAmount < 0) this.shakeAmount = 0;
        } else {
            this.shakeOffsetX = 0;
            this.shakeOffsetY = 0;
        }
    }
    
    shake(amount) {
        this.shakeAmount = Math.max(this.shakeAmount, amount);
    }
    
    setZoom(zoom) {
        this.targetZoom = MathUtils.clamp(zoom, 0.3, 2);
    }
    
    getTransformedX() {
        return this.x + this.shakeOffsetX;
    }
    
    getTransformedY() {
        return this.y + this.shakeOffsetY;
    }
    
    isVisible(x, y, width, height) {
        const camX = this.getTransformedX();
        const camY = this.getTransformedY();
        const viewW = this.viewWidth / this.zoom;
        const viewH = this.viewHeight / this.zoom;
        
        return x + width > camX - 50 &&
               x < camX + viewW + 50 &&
               y + height > camY - 50 &&
               y < camY + viewH + 50;
    }
    
    worldToScreen(wx, wy) {
        return {
            x: (wx - this.getTransformedX()) * this.zoom,
            y: (wy - this.getTransformedY()) * this.zoom
        };
    }
    
    screenToWorld(sx, sy) {
        return {
            x: sx / this.zoom + this.getTransformedX(),
            y: sy / this.zoom + this.getTransformedY()
        };
    }
    
    reset() {
        this.x = 0;
        this.y = GD.GROUND_Y - this.viewHeight + 80;
        this.zoom = 1;
        this.targetZoom = 1;
        this.shakeAmount = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
        this.mirror = false;
    }
    
    resize(viewWidth, viewHeight) {
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
    }
}
```

---

## js/physics/CollisionSystem.js

```javascript
class CollisionSystem {
    constructor() {
        // Spatial hash for broad phase
        this.cellSize = GD.BLOCK_SIZE * 4;
        this.grid = new Map();
    }
    
    clear() {
        this.grid.clear();
    }
    
    insert(obj) {
        const cells = this._getCells(obj.x, obj.y, obj.width, obj.height);
        for (const key of cells) {
            if (!this.grid.has(key)) {
                this.grid.set(key, []);
            }
            this.grid.get(key).push(obj);
        }
    }
    
    query(x, y, width, height) {
        const results = new Set();
        const cells = this._getCells(x, y, width, height);
        
        for (const key of cells) {
            const cell = this.grid.get(key);
            if (cell) {
                for (const obj of cell) {
                    results.add(obj);
                }
            }
        }
        
        return Array.from(results);
    }
    
    _getCells(x, y, w, h) {
        const cells = [];
        const startCX = Math.floor(x / this.cellSize);
        const startCY = Math.floor(y / this.cellSize);
        const endCX = Math.floor((x + w) / this.cellSize);
        const endCY = Math.floor((y + h) / this.cellSize);
        
        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                cells.push(`${cx},${cy}`);
            }
        }
        
        return cells;
    }
    
    pointInTriangle(px, py, triX, triY, triW, triH, direction) {
        let x1, y1, x2, y2, x3, y3;
        
        switch (direction || 'up') {
            case 'up':
                x1 = triX; y1 = triY + triH;
                x2 = triX + triW / 2; y2 = triY;
                x3 = triX + triW; y3 = triY + triH;
                break;
            case 'down':
                x1 = triX; y1 = triY;
                x2 = triX + triW / 2; y2 = triY + triH;
                x3 = triX + triW; y3 = triY;
                break;
            case 'left':
                x1 = triX + triW; y1 = triY;
                x2 = triX; y2 = triY + triH / 2;
                x3 = triX + triW; y3 = triY + triH;
                break;
            case 'right':
                x1 = triX; y1 = triY;
                x2 = triX + triW; y2 = triY + triH / 2;
                x3 = triX; y3 = triY + triH;
                break;
        }
        
        return this._pointInTri(px, py, x1, y1, x2, y2, x3, y3);
    }
    
    _pointInTri(px, py, x1, y1, x2, y2, x3, y3) {
        const d1 = this._sign(px, py, x1, y1, x2, y2);
        const d2 = this._sign(px, py, x2, y2, x3, y3);
        const d3 = this._sign(px, py, x3, y3, x1, y1);
        
        const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        
        return !(hasNeg && hasPos);
    }
    
    _sign(px, py, x1, y1, x2, y2) {
        return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
    }
}
```

---

## js/physics/PhysicsEngine.js

```javascript
class PhysicsEngine {
    constructor() {
        this.gravity = GD.GRAVITY;
    }
    
    applyGravity(player, dt) {
        player.velocityY += this.gravity * player.gravityDirection * dt;
        
        // Terminal velocity
        const maxVel = GD.MAX_FALL_SPEED;
        player.velocityY = MathUtils.clamp(player.velocityY, -maxVel, maxVel);
    }
    
    movePlayer(player, dt) {
        // Horizontal movement (constant in GD)
        player.x += player.getHorizontalSpeed() * dt;
        
        // Vertical movement
        player.y += player.velocityY * dt;
    }
    
    checkGroundCollision(player, groundY) {
        if (player.gravityDirection > 0) {
            // Normal gravity - check ground
            if (player.y + player.height >= groundY) {
                player.y = groundY - player.height;
                player.velocityY = 0;
                player.onGround = true;
            }
        } else {
            // Flipped gravity - ground is ceiling
            if (player.y + player.height >= groundY) {
                player.y = groundY - player.height;
                player.velocityY = 0;
            }
        }
    }
    
    checkCeilingCollision(player, ceilingY) {
        if (player.gravityDirection < 0) {
            // Flipped gravity - ceiling is "ground"
            if (player.y <= ceilingY) {
                player.y = ceilingY;
                player.velocityY = 0;
                player.onGround = true;
            }
        } else {
            // Normal gravity - hitting ceiling
            if (player.y <= ceilingY) {
                player.y = ceilingY;
                player.velocityY = 0;
            }
        }
    }
    
    cubeJump(player) {
        if (!player.onGround) return false;
        
        player.velocityY = GD.JUMP_FORCE * player.gravityDirection;
        player.onGround = false;
        return true;
    }
    
    shipFly(player, pressing, dt) {
        if (pressing) {
            player.velocityY += GD.SHIP_FLY_FORCE * -player.gravityDirection * dt;
        }
        // Ship has lower gravity
        player.velocityY += this.gravity * player.gravityDirection * 0.6 * dt;
        player.velocityY = MathUtils.clamp(player.velocityY, -GD.SHIP_MAX_SPEED, GD.SHIP_MAX_SPEED);
    }
    
    ballToggle(player) {
        if (!player.onGround) return false;
        
        player.gravityDirection *= -1;
        player.onGround = false;
        player.velocityY = GD.BALL_TOGGLE_FORCE * player.gravityDirection;
        return true;
    }
    
    ufoFlap(player) {
        player.velocityY = GD.UFO_FLAP_FORCE * player.gravityDirection;
        return true;
    }
    
    waveFly(player, pressing) {
        if (pressing) {
            player.velocityY = GD.WAVE_SPEED * -player.gravityDirection;
        } else {
            player.velocityY = GD.WAVE_SPEED * player.gravityDirection;
        }
    }
    
    robotJump(player, holdTime) {
        if (!player.onGround) return false;
        
        // Robot jump height depends on hold time
        const maxHold = 0.4;
        const holdFactor = Math.min(holdTime / maxHold, 1);
        const jumpForce = GD.ROBOT_JUMP_MIN + (GD.ROBOT_JUMP_MAX - GD.ROBOT_JUMP_MIN) * holdFactor;
        
        player.velocityY = jumpForce * player.gravityDirection;
        player.onGround = false;
        return true;
    }
    
    spiderTeleport(player, groundY, ceilingY) {
        if (!player.onGround) return false;
        
        // Spider teleports to opposite surface
        player.gravityDirection *= -1;
        
        if (player.gravityDirection > 0) {
            // Now falling down - teleport to nearest solid below
            // Simplified: go to ground
            player.y = groundY - player.height;
        } else {
            // Now falling up - teleport to nearest solid above
            // Simplified: go to ceiling
            player.y = ceilingY;
        }
        
        player.onGround = true;
        player.velocityY = 0;
        return true;
    }
    
    swingFly(player, pressing, dt) {
        // Swing copter: pressing reverses gravity direction temporarily
        if (pressing) {
            player.velocityY += GD.SWING_FORCE * -player.gravityDirection * dt;
        } else {
            player.velocityY += GD.SWING_FORCE * player.gravityDirection * dt;
        }
        
        player.velocityY = MathUtils.clamp(player.velocityY, -GD.SWING_MAX_SPEED, GD.SWING_MAX_SPEED);
    }
    
    orbActivate(player, orbType) {
        switch (orbType) {
            case 'YELLOW':
                player.velocityY = GD.JUMP_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
                
            case 'BLUE':
                player.gravityDirection *= -1;
                player.velocityY = GD.JUMP_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
                
            case 'GREEN':
                player.velocityY = GD.JUMP_FORCE * player.gravityDirection;
                player.onGround = false;
                // Green orb flips gravity
                player.gravityDirection *= -1;
                return { sound: 'orb' };
                
            case 'PINK':
                player.velocityY = GD.JUMP_FORCE * 0.7 * player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
                
            case 'RED':
                player.velocityY = GD.JUMP_FORCE * 1.3 * player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
                
            case 'BLACK':
                // Black orb: negative jump (pushes down)
                player.velocityY = GD.JUMP_FORCE * -player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
                
            case 'DASH_GREEN':
                // Dash orb: launch in specific direction
                player.velocityY = GD.JUMP_FORCE * player.gravityDirection * 1.2;
                player.onGround = false;
                return { sound: 'orb' };
                
            default:
                player.velocityY = GD.JUMP_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'orb' };
        }
    }
    
    padActivate(player, padType) {
        switch (padType) {
            case 'YELLOW':
                player.velocityY = GD.PAD_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'pad' };
                
            case 'BLUE':
                player.gravityDirection *= -1;
                player.velocityY = GD.PAD_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'pad' };
                
            case 'PINK':
                player.velocityY = GD.PAD_FORCE * 0.7 * player.gravityDirection;
                player.onGround = false;
                return { sound: 'pad' };
                
            case 'RED':
                player.velocityY = GD.PAD_FORCE * 1.3 * player.gravityDirection;
                player.onGround = false;
                return { sound: 'pad' };
                
            default:
                player.velocityY = GD.PAD_FORCE * player.gravityDirection;
                player.onGround = false;
                return { sound: 'pad' };
        }
    }
}
```

---

## js/triggers/TriggerSystem.js

```javascript
class TriggerSystem {
    constructor(game) {
        this.game = game;
        this.activeTriggers = [];
        this.groupObjects = {};
    }
    
    registerGroup(groupId, objects) {
        this.groupObjects[groupId] = objects;
    }
    
    getGroupObjects(groupId) {
        return this.groupObjects[groupId] || [];
    }
    
    executeTrigger(result) {
        if (!result) return;
        
        switch (result.type) {
            case 'move':
                this._startMoveTrigger(result);
                break;
            case 'color':
                this._startColorTrigger(result);
                break;
            case 'alpha':
                this._startAlphaTrigger(result);
                break;
            case 'toggle':
                this._executeToggleTrigger(result);
                break;
            case 'rotate':
                this._startRotateTrigger(result);
                break;
            case 'scale':
                this._startScaleTrigger(result);
                break;
            case 'shake':
                this._executeShakeTrigger(result);
                break;
            case 'bgColor':
                this._startBGColorTrigger(result);
                break;
            case 'groundColor':
                this._startGroundColorTrigger(result);
                break;
            case 'pulse':
                this._startPulseTrigger(result);
                break;
        }
    }
    
    update(dt) {
        for (let i = this.activeTriggers.length - 1; i >= 0; i--) {
            const trigger = this.activeTriggers[i];
            trigger.elapsed += dt;
            
            const progress = Math.min(trigger.elapsed / trigger.duration, 1);
            const eased = trigger.easing(progress);
            
            trigger.updateFn(eased);
            
            if (progress >= 1) {
                if (trigger.onComplete) trigger.onComplete();
                this.activeTriggers.splice(i, 1);
            }
        }
    }
    
    _startMoveTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const startPositions = objects.map(o => ({ x: o.x, y: o.y }));
        const moveX = result.moveX || 0;
        const moveY = result.moveY || 0;
        const duration = result.duration || 0.5;
        const easing = MathUtils.getEasing(result.easing || 'easeInOut');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                for (let i = 0; i < objects.length; i++) {
                    objects[i].triggerOffsetX = moveX * t;
                    objects[i].triggerOffsetY = moveY * t;
                }
            },
            onComplete: () => {
                for (let i = 0; i < objects.length; i++) {
                    objects[i].x = startPositions[i].x + moveX;
                    objects[i].y = startPositions[i].y + moveY;
                    objects[i].triggerOffsetX = 0;
                    objects[i].triggerOffsetY = 0;
                }
            }
        });
    }
    
    _startColorTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const startColors = objects.map(o => o.color);
        const targetColor = result.color;
        const duration = result.duration || 0.5;
        const easing = MathUtils.getEasing(result.easing || 'linear');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                for (let i = 0; i < objects.length; i++) {
                    objects[i].color = ColorUtils.lerpColor(startColors[i], targetColor, t);
                }
            }
        });
    }
    
    _startAlphaTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const startAlphas = objects.map(o => o.alpha);
        const targetAlpha = result.alpha;
        const duration = result.duration || 0.5;
        const easing = MathUtils.getEasing(result.easing || 'linear');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                for (let i = 0; i < objects.length; i++) {
                    objects[i].alpha = MathUtils.lerp(startAlphas[i], targetAlpha, t);
                }
            }
        });
    }
    
    _executeToggleTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        for (const obj of objects) {
            if (result.activate !== undefined) {
                obj.active = result.activate;
                obj.visible = result.activate;
            } else {
                obj.active = !obj.active;
                obj.visible = !obj.visible;
            }
        }
    }
    
    _startRotateTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const targetRotation = MathUtils.degToRad(result.degrees || 0);
        const duration = result.duration || 0.5;
        const easing = MathUtils.getEasing(result.easing || 'easeInOut');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                for (const obj of objects) {
                    obj.triggerRotation = targetRotation * t;
                }
            },
            onComplete: () => {
                for (const obj of objects) {
                    obj.rotation += targetRotation;
                    obj.triggerRotation = 0;
                }
            }
        });
    }
    
    _startScaleTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const startScales = objects.map(o => o.scale || 1);
        const targetScale = result.scale || 1;
        const duration = result.duration || 0.5;
        const easing = MathUtils.getEasing(result.easing || 'easeInOut');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                for (let i = 0; i < objects.length; i++) {
                    objects[i].scale = MathUtils.lerp(startScales[i], targetScale, t);
                }
            }
        });
    }
    
    _executeShakeTrigger(result) {
        this.game.camera.shake(result.strength || 5);
    }
    
    _startBGColorTrigger(result) {
        const startColor = this.game.renderer.bgColor;
        const targetColor = result.color;
        const duration = result.duration || 1;
        const easing = MathUtils.getEasing(result.easing || 'linear');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                this.game.renderer.setBGColor(ColorUtils.lerpColor(startColor, targetColor, t));
            }
        });
    }
    
    _startGroundColorTrigger(result) {
        const startColor = this.game.renderer.groundColor;
        const targetColor = result.color;
        const duration = result.duration || 1;
        const easing = MathUtils.getEasing(result.easing || 'linear');
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing,
            updateFn: (t) => {
                this.game.renderer.setGroundColor(ColorUtils.lerpColor(startColor, targetColor, t));
            }
        });
    }
    
    _startPulseTrigger(result) {
        const objects = this.getGroupObjects(result.groupId);
        if (objects.length === 0) return;
        
        const originalColors = objects.map(o => o.color);
        const pulseColor = result.color;
        const duration = result.duration || 0.5;
        
        this.activeTriggers.push({
            elapsed: 0,
            duration,
            easing: (t) => t,
            updateFn: (t) => {
                // Pulse goes to target color then back
                const pulseT = t < 0.5 ? t * 2 : (1 - t) * 2;
                for (let i = 0; i < objects.length; i++) {
                    objects[i].color = ColorUtils.lerpColor(originalColors[i], pulseColor, pulseT);
                }
            }
        });
    }
    
    reset() {
        this.activeTriggers = [];
        this.groupObjects = {};
    }
}
```

---

## js/game/Game.js

Now let's put together the main Game class that ties everything together:

```javascript
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            document.body.appendChild(this.canvas);
        }
        
        // Core systems
        this.renderer = new Renderer(this.canvas);
        this.audio = new AudioManager();
        this.input = new InputManager(this.canvas);
        this.collision = new CollisionSystem();
        this.physics = new PhysicsEngine();
        this.camera = new Camera(this.renderer.viewWidth, this.renderer.viewHeight);
        this.triggerSystem = new TriggerSystem(this);
        this.levelManager = new LevelManager();
        this.ui = new UIManager(this);
        this.editor = new Editor(this);
        
        // Game state
        this.state = 'menu'; // menu, playing, paused, dead, complete, editor
        this.currentLevel = null;
        this.player = new Player();
        this.dualPlayer = new Player(); // For dual mode
        this.dualPlayer.active = false;
        
        // Level data
        this.levelObjects = [];
        this.solidObjects = [];
        this.hazardObjects = [];
        this.orbObjects = [];
        this.padObjects = [];
        this.portalObjects = [];
        this.triggerObjects = [];
        this.coinObjects = [];
        this.decorationObjects = [];
        
        this.groundY = GD.GROUND_Y;
        this.ceilingY = 0;
        this.levelLength = 0;
        
        // Game mode handlers
        this.modes = {};
        this._registerModes();
        
        // Stats
        this.attempts = 0;
        this.coinsCollected = 0;
        this.totalCoins = 0;
        this.startTime = 0;
        this.playTime = 0;
        
        // Timers
        this.deathTimer = 0;
        this.completeTimer = 0;
        
        // Practice mode
        this.practiceMode = false;
        
        // Music
        this.currentMusicBuffer = null;
        
        // Frame timing
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDT = 1 / 240; // Physics at 240fps
        this.maxDT = 1 / 30;
        
        // Progress bar
        this.progressPercent = 0;
        
        // Init
        this._init();
    }
    
    async _init() {
        await this.audio.init();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.resize(this.renderer.viewWidth, this.renderer.viewHeight);
        });
        
        // Global key bindings
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                if (this.state === 'playing') this.pauseGame();
                else if (this.state === 'paused') this.resumeGame();
            }
            if (e.code === 'KeyR' && this.state !== 'menu' && this.state !== 'editor') {
                this.restartLevel();
            }
            if (e.code === 'KeyP' && (this.state === 'playing' || this.state === 'paused')) {
                this.togglePracticeMode();
            }
        });
        
        // Show menu
        this.ui.showMenu();
        
        // Start game loop
        requestAnimationFrame((t) => this._gameLoop(t));
    }
    
    _registerModes() {
        this.modes[GD.MODES.CUBE] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            onExit: (player) => {},
            update: (player, input, dt) => {
                // Cube rotation
                if (!player.onGround) {
                    player.rotation += player.gravityDirection * 7.2 * dt;
                } else {
                    // Snap rotation to nearest 90 degrees
                    const target = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2);
                    player.rotation = MathUtils.lerp(player.rotation, target, 0.3);
                }
                
                this.physics.applyGravity(player, dt);
                
                if (input.wasJustPressed()) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    } else if (this.physics.cubeJump(player)) {
                        this.audio.playSFX('jump');
                    }
                }
            }
        };
        
        this.modes[GD.MODES.SHIP] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE * 1.2;
                player.height = GD.PLAYER_SIZE * 0.8;
            },
            onExit: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            update: (player, input, dt) => {
                // Ship rotation based on velocity
                const targetRot = MathUtils.clamp(player.velocityY * 0.003, -0.5, 0.5);
                player.rotation = MathUtils.lerp(player.rotation, targetRot, 0.1);
                
                this.physics.shipFly(player, input.isPressed(), dt);
                
                if (input.wasJustPressed() && player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                    const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                    if (result) {
                        this.audio.playSFX(result.sound || 'orb');
                        player.currentOrb.onActivated();
                        player.orbActivated = true;
                    }
                }
            }
        };
        
        this.modes[GD.MODES.BALL] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            onExit: (player) => {},
            update: (player, input, dt) => {
                // Ball rotation
                player.rotation += player.gravityDirection * 6 * dt;
                
                this.physics.applyGravity(player, dt);
                
                if (input.wasJustPressed()) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    } else if (this.physics.ballToggle(player)) {
                        this.audio.playSFX('jump');
                    }
                }
            }
        };
        
        this.modes[GD.MODES.UFO] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE * 1.1;
                player.height = GD.PLAYER_SIZE;
            },
            onExit: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            update: (player, input, dt) => {
                player.rotation = 0;
                
                this.physics.applyGravity(player, dt);
                
                if (input.wasJustPressed()) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    } else {
                        this.physics.ufoFlap(player);
                        this.audio.playSFX('jump');
                    }
                }
            }
        };
        
        this.modes[GD.MODES.WAVE] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE * 0.8;
                player.height = GD.PLAYER_SIZE * 0.8;
            },
            onExit: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            update: (player, input, dt) => {
                // Wave rotation based on direction
                const targetRot = input.isPressed() ? -0.785 * player.gravityDirection : 0.785 * player.gravityDirection;
                player.rotation = MathUtils.lerp(player.rotation, targetRot, 0.2);
                
                this.physics.waveFly(player, input.isPressed());
                
                if (input.wasJustPressed() && player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                    const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                    if (result) {
                        this.audio.playSFX(result.sound || 'or

You
Continue
Assistant


## js/game/Game.js (continued)

```javascript
                        this.audio.playSFX(result.sound || 'orb');
                        player.currentOrb.onActivated();
                        player.orbActivated = true;
                    }
                }
            }
        };
        
        this.modes[GD.MODES.ROBOT] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE * 1.2;
                player.holdTime = 0;
            },
            onExit: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            update: (player, input, dt) => {
                // Robot rotation
                if (!player.onGround) {
                    player.rotation += player.gravityDirection * 5 * dt;
                } else {
                    const target = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2);
                    player.rotation = MathUtils.lerp(player.rotation, target, 0.3);
                }
                
                this.physics.applyGravity(player, dt);
                
                if (input.isPressed() && player.onGround) {
                    player.holdTime = (player.holdTime || 0) + dt;
                }
                
                if (input.wasJustReleased() && player.onGround) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    } else if (this.physics.robotJump(player, player.holdTime || 0)) {
                        this.audio.playSFX('jump');
                    }
                    player.holdTime = 0;
                }
                
                if (input.wasJustPressed() && !player.onGround) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    }
                }
            }
        };
        
        this.modes[GD.MODES.SPIDER] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            onExit: (player) => {},
            update: (player, input, dt) => {
                player.rotation = 0;
                
                this.physics.applyGravity(player, dt);
                
                if (input.wasJustPressed()) {
                    if (player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                        const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                        if (result) {
                            this.audio.playSFX(result.sound || 'orb');
                            player.currentOrb.onActivated();
                            player.orbActivated = true;
                        }
                    } else if (this.physics.spiderTeleport(player, this.groundY, this.ceilingY)) {
                        this.audio.playSFX('jump');
                    }
                }
            }
        };
        
        this.modes[GD.MODES.SWING] = {
            onEnter: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE * 0.9;
            },
            onExit: (player) => {
                player.width = GD.PLAYER_SIZE;
                player.height = GD.PLAYER_SIZE;
            },
            update: (player, input, dt) => {
                const targetRot = MathUtils.clamp(player.velocityY * 0.002, -0.4, 0.4);
                player.rotation = MathUtils.lerp(player.rotation, targetRot, 0.1);
                
                this.physics.swingFly(player, input.isPressed(), dt);
                
                if (input.wasJustPressed() && player.canActivateOrb && player.currentOrb && !player.orbActivated) {
                    const result = this.physics.orbActivate(player, player.currentOrb.orbType);
                    if (result) {
                        this.audio.playSFX(result.sound || 'orb');
                        player.currentOrb.onActivated();
                        player.orbActivated = true;
                    }
                }
            }
        };
    }
    
    startLevel(levelData) {
        this.currentLevel = levelData;
        this.state = 'playing';
        this.attempts++;
        
        // Reset
        this.player.reset();
        this.dualPlayer.reset();
        this.dualPlayer.active = false;
        this.camera.reset();
        this.triggerSystem.reset();
        this.collision.clear();
        
        // Set level properties
        this.groundY = levelData.groundY || GD.GROUND_Y;
        this.ceilingY = levelData.ceilingY || 0;
        this.renderer.setBGColor(levelData.bgColor || '#1a0033');
        this.renderer.setGroundColor(levelData.groundColor || '#2a2a5a');
        this.renderer.setGroundY(this.groundY);
        
        // Player start position
        this.player.x = GD.BLOCK_SIZE * 2;
        this.player.y = this.groundY - GD.PLAYER_SIZE;
        this.player.mode = levelData.startMode || GD.MODES.CUBE;
        this.player.speedMultiplier = levelData.speed || 1;
        
        // Enter initial mode
        const modeHandler = this.modes[this.player.mode];
        if (modeHandler && modeHandler.onEnter) {
            modeHandler.onEnter(this.player);
        }
        
        // Categorize objects
        this.levelObjects = levelData.objects || [];
        this.solidObjects = [];
        this.hazardObjects = [];
        this.orbObjects = [];
        this.padObjects = [];
        this.portalObjects = [];
        this.triggerObjects = [];
        this.coinObjects = [];
        this.decorationObjects = [];
        
        for (const obj of this.levelObjects) {
            // Reset object state
            obj.active = true;
            obj.visible = true;
            obj.triggered = false;
            
            if (obj instanceof Hazard || obj.hazard) {
                this.hazardObjects.push(obj);
            } else if (obj instanceof Orb) {
                this.orbObjects.push(obj);
            } else if (obj instanceof Pad) {
                this.padObjects.push(obj);
            } else if (obj instanceof Portal) {
                this.portalObjects.push(obj);
            } else if (obj instanceof Trigger) {
                this.triggerObjects.push(obj);
            } else if (obj.type === 'coin') {
                this.coinObjects.push(obj);
                obj.collected = false;
            } else if (obj.type === 'decoration') {
                this.decorationObjects.push(obj);
            } else if (obj.solid) {
                this.solidObjects.push(obj);
            }
            
            // Register groups
            if (obj.groupId) {
                this.triggerSystem.registerGroup(obj.groupId, 
                    this.levelObjects.filter(o => o.groups && o.groups.includes(obj.groupId))
                );
            }
        }
        
        // Calculate level length
        let maxX = 0;
        for (const obj of this.levelObjects) {
            maxX = Math.max(maxX, obj.x + obj.width);
        }
        this.levelLength = maxX + GD.BLOCK_SIZE * 10;
        
        // Coins
        this.coinsCollected = 0;
        this.totalCoins = this.coinObjects.length;
        
        // Timer
        this.startTime = performance.now();
        this.playTime = 0;
        this.deathTimer = 0;
        this.completeTimer = 0;
        
        // Build spatial hash
        this._buildSpatialHash();
        
        // Generate and play music
        if (this.audio.ctx) {
            this.currentMusicBuffer = this.audio.generateMusic(
                levelData.bpm || GD.DEFAULT_BPM,
                levelData.musicStyle || 'electronic',
                levelData.musicDuration || 60
            );
            this.audio.playMusic(this.currentMusicBuffer);
        }
        
        // Hide UI menu
        this.ui.hideMenu();
        
        this.input.reset();
    }
    
    _buildSpatialHash() {
        this.collision.clear();
        for (const obj of this.solidObjects) {
            this.collision.insert(obj);
        }
        for (const obj of this.hazardObjects) {
            this.collision.insert(obj);
        }
    }
    
    restartLevel() {
        if (this.currentLevel) {
            this.startLevel(this.currentLevel);
        }
    }
    
    pauseGame() {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.audio.pauseMusic();
            this.ui.showPauseMenu();
        }
    }
    
    resumeGame() {
        if (this.state === 'paused') {
            this.state = 'playing';
            this.audio.resumeMusic();
            this.ui.hidePauseMenu();
            this.input.reset();
        }
    }
    
    togglePracticeMode() {
        this.practiceMode = !this.practiceMode;
    }
    
    _gameLoop(timestamp) {
        const rawDT = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        const dt = Math.min(rawDT, this.maxDT);
        
        // Update input
        this.input.update();
        
        switch (this.state) {
            case 'playing':
                this._updatePlaying(dt);
                this._renderPlaying();
                break;
                
            case 'paused':
                this._renderPlaying();
                this.ui.renderPauseOverlay(this.renderer.ctx);
                break;
                
            case 'dead':
                this._updateDead(dt);
                this._renderPlaying();
                this.ui.renderDeathOverlay(this.renderer.ctx, this.deathTimer);
                break;
                
            case 'complete':
                this._updateComplete(dt);
                this._renderPlaying();
                this.ui.renderCompleteOverlay(this.renderer.ctx, this.completeTimer, {
                    attempts: this.attempts,
                    coins: this.coinsCollected,
                    totalCoins: this.totalCoins,
                    time: this.playTime
                });
                break;
                
            case 'editor':
                this.editor.update(dt);
                this.editor.render();
                break;
                
            case 'menu':
                this._renderMenu();
                break;
        }
        
        requestAnimationFrame((t) => this._gameLoop(t));
    }
    
    _updatePlaying(dt) {
        this.playTime = (performance.now() - this.startTime) / 1000;
        
        // Fixed timestep for physics
        this.accumulator += dt;
        while (this.accumulator >= this.fixedDT) {
            this._physicsStep(this.fixedDT);
            this.accumulator -= this.fixedDT;
        }
        
        // Camera follow
        this.camera.follow(this.player, dt);
        
        // Trigger system
        this.triggerSystem.update(dt);
        
        // Progress
        this.progressPercent = MathUtils.clamp(
            (this.player.x / this.levelLength) * 100, 0, 100
        );
        
        // Check level complete
        if (this.player.x >= this.levelLength) {
            this._onLevelComplete();
        }
    }
    
    _physicsStep(dt) {
        const player = this.player;
        
        // Reset per-frame state
        player.onGround = false;
        player.canActivateOrb = false;
        player.currentOrb = null;
        
        // Mode-specific update
        const modeHandler = this.modes[player.mode];
        if (modeHandler) {
            modeHandler.update(player, this.input, dt);
        }
        
        // Move player
        this.physics.movePlayer(player, dt);
        
        // Ground/ceiling collision
        this.physics.checkGroundCollision(player, this.groundY);
        this.physics.checkCeilingCollision(player, this.ceilingY);
        
        // Object collisions
        this._checkCollisions(player);
        
        // Dual player
        if (this.dualPlayer.active) {
            this.dualPlayer.onGround = false;
            const dualMode = this.modes[this.dualPlayer.mode];
            if (dualMode) {
                dualMode.update(this.dualPlayer, this.input, dt);
            }
            this.physics.movePlayer(this.dualPlayer, dt);
            this.physics.checkGroundCollision(this.dualPlayer, this.groundY);
            this.physics.checkCeilingCollision(this.dualPlayer, this.ceilingY);
            this._checkCollisions(this.dualPlayer);
        }
        
        // Trail
        player.updateTrail();
    }
    
    _checkCollisions(player) {
        const px = player.x;
        const py = player.y;
        const pw = player.width;
        const ph = player.height;
        
        // Query nearby objects
        const nearby = this.collision.query(px - GD.BLOCK_SIZE, py - GD.BLOCK_SIZE,
            pw + GD.BLOCK_SIZE * 2, ph + GD.BLOCK_SIZE * 2);
        
        // Solid block collisions
        for (const obj of nearby) {
            if (!obj.active || !obj.solid) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px, y: py, width: pw, height: ph },
                { x: obj.x, y: obj.y, width: obj.width, height: obj.height }
            )) {
                this._resolveSolidCollision(player, obj);
            }
        }
        
        // Hazard collisions (check with smaller hitbox for fairness)
        const hitboxShrink = 4;
        for (const obj of nearby) {
            if (!obj.active || !obj.hazard) continue;
            
            let collides = false;
            
            if (obj.type === 'spike') {
                // Triangle collision for spikes
                const centerX = px + pw / 2;
                const centerY = py + ph / 2;
                
                // Check multiple points on player
                const points = [
                    { x: px + hitboxShrink, y: py + hitboxShrink },
                    { x: px + pw - hitboxShrink, y: py + hitboxShrink },
                    { x: px + hitboxShrink, y: py + ph - hitboxShrink },
                    { x: px + pw - hitboxShrink, y: py + ph - hitboxShrink },
                    { x: centerX, y: centerY }
                ];
                
                for (const pt of points) {
                    if (this.collision.pointInTriangle(
                        pt.x, pt.y,
                        obj.x, obj.y, obj.width, obj.height,
                        obj.direction
                    )) {
                        collides = true;
                        break;
                    }
                }
            } else {
                // AABB for other hazards
                collides = MathUtils.aabbOverlap(
                    { x: px + hitboxShrink, y: py + hitboxShrink, 
                      width: pw - hitboxShrink * 2, height: ph - hitboxShrink * 2 },
                    { x: obj.x, y: obj.y, width: obj.width, height: obj.height }
                );
            }
            
            if (collides) {
                this._onPlayerDeath();
                return;
            }
        }
        
        // Orb collisions (larger detection area)
        const orbRange = GD.BLOCK_SIZE * 0.5;
        for (const orb of this.orbObjects) {
            if (!orb.active) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px - orbRange, y: py - orbRange, width: pw + orbRange * 2, height: ph + orbRange * 2 },
                { x: orb.x, y: orb.y, width: orb.width, height: orb.height }
            )) {
                player.canActivateOrb = true;
                player.currentOrb = orb;
                
                if (!this.input.isPressed()) {
                    player.orbActivated = false;
                }
            }
        }
        
        // Pad collisions
        for (const pad of this.padObjects) {
            if (!pad.active) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px, y: py, width: pw, height: ph },
                { x: pad.x, y: pad.y, width: pad.width, height: pad.height }
            )) {
                if (!pad.triggered) {
                    const result = this.physics.padActivate(player, pad.padType);
                    if (result) {
                        this.audio.playSFX(result.sound || 'pad');
                        pad.onActivated();
                    }
                }
            } else {
                pad.triggered = false;
            }
        }
        
        // Portal collisions
        for (const portal of this.portalObjects) {
            if (!portal.active) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px, y: py, width: pw, height: ph },
                { x: portal.x, y: portal.y, width: portal.width, height: portal.height }
            )) {
                if (!portal.triggered) {
                    this._activatePortal(player, portal);
                    portal.triggered = true;
                }
            } else {
                portal.triggered = false;
            }
        }
        
        // Trigger collisions
        for (const trigger of this.triggerObjects) {
            if (!trigger.active || trigger.triggered) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px, y: py, width: pw, height: ph },
                { x: trigger.x, y: trigger.y, width: trigger.width, height: trigger.height }
            )) {
                const result = trigger.activate();
                this.triggerSystem.executeTrigger(result);
            }
        }
        
        // Coin collisions
        for (const coin of this.coinObjects) {
            if (!coin.active || coin.collected) continue;
            
            if (MathUtils.aabbOverlap(
                { x: px, y: py, width: pw, height: ph },
                { x: coin.x, y: coin.y, width: coin.width, height: coin.height }
            )) {
                coin.collected = true;
                coin.visible = false;
                this.coinsCollected++;
                this.audio.playSFX('coin');
            }
        }
    }
    
    _resolveSolidCollision(player, block) {
        const px = player.x;
        const py = player.y;
        const pw = player.width;
        const ph = player.height;
        
        const bx = block.x;
        const by = block.y;
        const bw = block.width;
        const bh = block.height;
        
        // Calculate overlap on each axis
        const overlapLeft = (px + pw) - bx;
        const overlapRight = (bx + bw) - px;
        const overlapTop = (py + ph) - by;
        const overlapBottom = (by + bh) - py;
        
        // Find minimum overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
        if (minOverlap === overlapLeft && overlapLeft > 0) {
            // Hit right side of player against left side of block
            // In GD, hitting a wall = death (player moves right constantly)
            this._onPlayerDeath();
            return;
        }
        
        if (minOverlap === overlapRight && overlapRight > 0) {
            // Pushed right (shouldn't happen normally)
            player.x = bx + bw;
        }
        
        if (minOverlap === overlapTop && overlapTop > 0) {
            // Landing on top
            if (player.gravityDirection > 0) {
                player.y = by - ph;
                player.velocityY = 0;
                player.onGround = true;
            } else {
                // Moving up into block from below when gravity flipped
                player.y = by - ph;
                player.velocityY = 0;
            }
        }
        
        if (minOverlap === overlapBottom && overlapBottom > 0) {
            // Hitting from below
            if (player.gravityDirection < 0) {
                player.y = by + bh;
                player.velocityY = 0;
                player.onGround = true;
            } else {
                // Hitting ceiling normally
                player.y = by + bh;
                player.velocityY = 0;
            }
        }
    }
    
    _activatePortal(player, portal) {
        const type = portal.portalType;
        
        // Game mode portals
        const modePortals = {
            [GD.PORTAL_TYPES.CUBE]: GD.MODES.CUBE,
            [GD.PORTAL_TYPES.SHIP]: GD.MODES.SHIP,
            [GD.PORTAL_TYPES.BALL]: GD.MODES.BALL,
            [GD.PORTAL_TYPES.UFO]: GD.MODES.UFO,
            [GD.PORTAL_TYPES.WAVE]: GD.MODES.WAVE,
            [GD.PORTAL_TYPES.ROBOT]: GD.MODES.ROBOT,
            [GD.PORTAL_TYPES.SPIDER]: GD.MODES.SPIDER,
            [GD.PORTAL_TYPES.SWING]: GD.MODES.SWING
        };
        
        if (modePortals[type] !== undefined) {
            const oldMode = player.mode;
            const newMode = modePortals[type];
            
            if (oldMode !== newMode) {
                // Exit old mode
                const oldHandler = this.modes[oldMode];
                if (oldHandler && oldHandler.onExit) oldHandler.onExit(player);
                
                // Enter new mode
                player.mode = newMode;
                const newHandler = this.modes[newMode];
                if (newHandler && newHandler.onEnter) newHandler.onEnter(player);
                
                this.audio.playSFX('portal');
            }
            return;
        }
        
        // Gravity portals
        if (type === GD.PORTAL_TYPES.GRAVITY_FLIP) {
            if (player.gravityDirection > 0) {
                player.gravityDirection = -1;
                this.audio.playSFX('portal');
            }
            return;
        }
        if (type === GD.PORTAL_TYPES.GRAVITY_NORMAL) {
            if (player.gravityDirection < 0) {
                player.gravityDirection = 1;
                this.audio.playSFX('portal');
            }
            return;
        }
        
        // Speed portals
        const speedMap = {
            [GD.PORTAL_TYPES.SPEED_HALF]: 0.7,
            [GD.PORTAL_TYPES.SPEED_NORMAL]: 1.0,
            [GD.PORTAL_TYPES.SPEED_DOUBLE]: 1.5,
            [GD.PORTAL_TYPES.SPEED_TRIPLE]: 2.0,
            [GD.PORTAL_TYPES.SPEED_QUAD]: 2.5
        };
        
        if (speedMap[type] !== undefined) {
            player.speedMultiplier = speedMap[type];
            this.audio.playSFX('speedChange');
            return;
        }
        
        // Size portals
        if (type === GD.PORTAL_TYPES.MINI) {
            player.mini = true;
            player.width = GD.PLAYER_SIZE * GD.MINI_SCALE;
            player.height = GD.PLAYER_SIZE * GD.MINI_SCALE;
            return;
        }
        if (type === GD.PORTAL_TYPES.NORMAL_SIZE) {
            player.mini = false;
            const modeHandler = this.modes[player.mode];
            if (modeHandler && modeHandler.onEnter) modeHandler.onEnter(player);
            return;
        }
        
        // Dual portal
        if (type === GD.PORTAL_TYPES.DUAL) {
            this.dualPlayer.active = true;
            this.dualPlayer.x = player.x;
            this.dualPlayer.y = this.ceilingY + GD.PLAYER_SIZE;
            this.dualPlayer.mode = player.mode;
            this.dualPlayer.gravityDirection = -player.gravityDirection;
            return;
        }
        
        // Mirror portal
        if (type === GD.PORTAL_TYPES.MIRROR) {
            this.camera.mirror = !this.camera.mirror;
            return;
        }
    }
    
    _onPlayerDeath() {
        if (this.state !== 'playing') return;
        
        this.state = 'dead';
        this.deathTimer = 0;
        
        // Death effects
        this.camera.shake(8);
        this.audio.playSFX('death');
        this.audio.stopMusic();
        
        // Create death particles
        this.player.createDeathParticles();
    }
    
    _onLevelComplete() {
        if (this.state !== 'playing') return;
        
        this.state = 'complete';
        this.completeTimer = 0;
        this.playTime = (performance.now() - this.startTime) / 1000;
        
        this.audio.playSFX('complete');
    }
    
    _updateDead(dt) {
        this.deathTimer += dt;
        
        // Update death particles
        this.player.updateParticles(dt);
        
        // Auto restart after delay
        if (this.deathTimer > 1.5) {
            this.restartLevel();
        }
    }
    
    _updateComplete(dt) {
        this.completeTimer += dt;
        
        // Slow down player
        this.player.velocityY = 0;
        this.player.y = MathUtils.lerp(this.player.y, this.groundY - this.player.height, 0.05);
    }
    
    _renderPlaying() {
        const ctx = this.renderer.ctx;
        const cam = this.camera;
        const time = performance.now() / 1000;
        
        this.renderer.clear();
        
        // Apply camera transform
        ctx.save();
        ctx.scale(cam.zoom, cam.zoom);
        ctx.translate(-cam.getTransformedX(), -cam.getTransformedY());
        
        // Background
        this.renderer.drawBackground(cam.getTransformedX(), cam.getTransformedY(), time);
        
        // Ground
        this.renderer.drawGround(cam.getTransformedX(), this.groundY);
        
        // Render objects (back to front)
        // Decorations first
        for (const obj of this.decorationObjects) {
            if (!obj.visible) continue;
            if (!cam.isVisible(obj.x, obj.y, obj.width, obj.height)) continue;
            this.renderer.drawDecoration(obj);
        }
        
        // Blocks
        for (const obj of this.solidObjects) {
            if (!obj.visible) continue;
            if (!cam.isVisible(obj.x, obj.y, obj.width, obj.height)) continue;
            this.renderer.drawBlock(obj);
        }
        
        // Hazards
        for (const obj of this.hazardObjects) {
            if (!obj.visible) continue;
            if (!cam.isVisible(obj.x, obj.y, obj.width, obj.height)) continue;
            this.renderer.drawSpike(obj);
        }
        
        // Pads
        for (const pad of this.padObjects) {
            if (!pad.visible) continue;
            if (!cam.isVisible(pad.x, pad.y, pad.width, pad.height)) continue;
            this.renderer.drawPad(pad, time);
        }
        
        // Orbs
        for (const orb of this.orbObjects) {
            if (!orb.visible) continue;
            if (!cam.isVisible(orb.x, orb.y, orb.width, orb.height)) continue;
            this.renderer.drawOrb(orb, time);
        }
        
        // Portals
        for (const portal of this.portalObjects) {
            if (!portal.visible) continue;
            if (!cam.isVisible(portal.x, portal.y, portal.width, portal.height)) continue;
            this.renderer.drawPortal(portal, time);
        }
        
        // Coins
        for (const coin of this.coinObjects) {
            if (!coin.visible || coin.collected) continue;
            if (!cam.isVisible(coin.x, coin.y, coin.width, coin.height)) continue;
            this.renderer.drawCoin(coin, time);
        }
        
        // Player trail
        this.renderer.drawTrail(this.player);
        
        // Player
        if (this.state !== 'dead' || this.deathTimer < 0.1) {
            this.renderer.drawPlayer(this.player, time);
        }
        
        // Death particles
        if (this.state === 'dead') {
            this.renderer.drawParticles(this.player.particles);
        }
        
        // Dual player
        if (this.dualPlayer.active) {
            this.renderer.drawTrail(this.dualPlayer);
            this.renderer.drawPlayer(this.dualPlayer, time);
        }
        
        ctx.restore();
        
        // HUD (screen space)
        this._renderHUD(ctx);
    }
    
    _renderHUD(ctx) {
        const cw = this.renderer.viewWidth;
        const ch = this.renderer.viewHeight;
        
        // Progress bar
        const barWidth = cw * 0.35;
        const barHeight = 6;
        const barX = (cw - barWidth) / 2;
        const barY = 15;
        
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        ctx.fillStyle = '#44ff44';
        ctx.fillRect(barX, barY, barWidth * (this.progressPercent / 100), barHeight);
        
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Progress percentage
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(this.progressPercent)}%`, cw / 2, barY + barHeight + 14);
        
        // Attempts
        ctx.textAlign = 'left';
        ctx.fillText(`Attempt ${this.attempts}`, 10, 20);
        
        // Coins
        if (this.totalCoins > 0) {
            ctx.textAlign = 'right';
            ctx.fillText(`🪙 ${this.coinsCollected}/${this.totalCoins}`, cw - 10, 20);
        }
        
        // Practice mode indicator
        if (this.practiceMode) {
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText('PRACTICE MODE', cw / 2, ch - 20);
        }
        
        // Mode indicator
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '10px sans-serif';
        const modeNames = {};
        modeNames[GD.MODES.CUBE] = 'Cube';
        modeNames[GD.MODES.SHIP] = 'Ship';
        modeNames[GD.MODES.BALL] = 'Ball';
        modeNames[GD.MODES.UFO] = 'UFO';
        modeNames[GD.MODES.WAVE] = 'Wave';
        modeNames[GD.MODES.ROBOT] = 'Robot';
        modeNames[GD.MODES.SPIDER] = 'Spider';
        modeNames[GD.MODES.SWING] = 'Swing';
        ctx.fillText(modeNames[this.player.mode] || 'Unknown', cw - 10, ch - 10);
    }
    
    _renderMenu() {
        const ctx = this.renderer.ctx;
        this.renderer.clear();
        
        const time = performance.now() / 1000;
        
        // Animated background
        this.renderer.drawBackground(time * 20, 0, time);
        
        // Ground
        this.renderer.drawGround(time * 20, GD.GROUND_Y);
        
        // UI handled by UIManager
    }
}
```

---

## js/ui/UIManager.js

```javascript
class UIManager {
    constructor(game) {
        this.game = game;
        this.container = document.getElementById('ui-container') || this._createContainer();
        
        this.menuElement = null;
        this.pauseElement = null;
        this.levelSelectElement = null;
    }
    
    _createContainer() {
        const div = document.createElement('div');
        div.id = 'ui-container';
        div.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 10;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        document.body.appendChild(div);
        return div;
    }
    
    _createButton(text, onClick, style) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.cssText = `
            display: block; margin: 8px auto; padding: 12px 40px;
            background: linear-gradient(180deg, #5566aa, #3344aa);
            border: 2px solid #7788cc; border-radius: 8px;
            color: white; font-size: 16px; font-weight: bold;
            cursor: pointer; pointer-events: auto;
            transition: all 0.15s ease;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            min-width: 200px;
            ${style || ''}
        `;
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.background = 'linear-gradient(180deg, #6677bb, #4455bb)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.background = 'linear-gradient(180deg, #5566aa, #3344aa)';
        });
        btn.addEventListener('click', onClick);
        return btn;
    }
    
    showMenu() {
        this.hideAll();
        
        this.menuElement = document.createElement('div');
        this.menuElement.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            pointer-events: auto;
        `;
        
        // Title
        const title = document.createElement('div');
        title.innerHTML = '<span style="color:#44ff44">Geometry</span> <span style="color:#ffaa00">Dash</span>';
        title.style.cssText = `
            font-size: 48px; font-weight: bold; margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(68,255,68,0.5), 2px 2px 4px rgba(0,0,0,0.8);
        `;
        this.menuElement.appendChild(title);
        
        const subtitle = document.createElement('div');
        subtitle.textContent = 'Canvas Edition';
        subtitle.style.cssText = `
            color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 40px;
            letter-spacing: 3px;
        `;
        this.menuElement.appendChild(subtitle);
        
        // Buttons
        this.menuElement.appendChild(
            this._createButton('▶  PLAY', () => this.showLevelSelect())
        );
        
        this.menuElement.appendChild(
            this._createButton('🔧  EDITOR', () => {
                this.hideAll();
                this.game.editor.activate();
            })
        );
        
        this.menuElement.appendChild(
            this._createButton('⚙  SETTINGS', () => this.showSettings())
        );
        
        // Controls hint
        const hint = document.createElement('div');
        hint.innerHTML = 'Click / Space / ↑ to jump &nbsp;|&nbsp; R to restart &nbsp;|&nbsp; ESC to pause';
        hint.style.cssText = `
            color: rgba(255,255,255,0.3); font-size: 11px; margin-top: 40px;
            pointer-events: none;
        `;
        this.menuElement.appendChild(hint);
        
        this.container.appendChild(this.menuElement);
    }
    
    showLevelSelect() {
        this.hideAll();
        
        this.levelSelectElement = document.createElement('div');
        this.levelSelectElement.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; flex-direction: column; align-items: center;
            padding-top: 40px; pointer-events: auto; overflow-y: auto;
        `;
        
        // Title
        const title = document.createElement('div');
        title.textContent = 'SELECT LEVEL';
        title.style.cssText = `
            color: white; font-size: 28px; font-weight: bold; margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        `;
        this.levelSelectElement.appendChild(title);
        
        // Level cards
        const levels = this.game.levelManager.getAllLevels();
        
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: flex; flex-wrap: wrap; justify-content: center;
            gap: 15px; max-width: 800px; padding: 0 20px;
        `;
        
        for (const level of levels) {
            const card = this._createLevelCard(level);
            grid.appendChild(card);
        }
        
        this.levelSelectElement.appendChild(grid);
        
        // Back button
        const backBtn = this._createButton('← BACK', () => this.showMenu(),
            'margin-top: 30px; margin-bottom: 30px;');
        this.levelSelectElement.appendChild(backBtn);
        
        this.container.appendChild(this.levelSelectElement);
    }
    
    _createLevelCard(level) {
        const card = document.createElement('div');
        card.style.cssText = `
            width: 220px; padding: 15px; border-radius: 10px;
            background: rgba(30,30,60,0.9); border: 2px solid rgba(100,100,200,0.3);
            cursor: pointer; transition: all 0.2s ease;
            text-align: center;
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.borderColor = 'rgba(100,200,255,0.6)';
            card.style.boxShadow = '0 5px 20px rgba(0,100,255,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = 'rgba(100,100,200,0.3)';
            card.style.boxShadow = 'none';
        });
        
        const name = document.createElement('div');
        name.textContent = level.name;
        name.style.cssText = 'color: white; font-size: 16px; font-weight: bold; margin-bottom: 5px;';
        card.appendChild(name);
        
        const author = document.createElement('div');
