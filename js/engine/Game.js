class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.renderer = new Renderer(this.canvas);
        this.input = new Input();
        this.audio = new AudioManager();
        this.physics = new Physics();
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.collisionSystem = new CollisionSystem();
        this.triggerSystem = new TriggerSystem(this);
        this.levelLoader = new LevelLoader();
        this.progressionManager = new ProgressionManager();
        
        this.player = new Player();
        this.dualPlayer = null;
        
        this.ui = null; // Set after DOM ready
        
        this.state = 'menu'; // menu, playing, paused, dead, complete
        this.practiceMode = false;
        this.showFPS = false;
        
        // Current level data
        this.level = null;
        this.levelObjects = [];
        this.hazards = [];
        this.orbs = [];
        this.pads = [];
        this.portals = [];
        this.triggers = [];
        this.coins = [];
        this.decorations = [];
        
        // Game state
        this.attempts = 1;
        this.time = 0;
        this.deathTimer = 0;
        this.coinsCollected = [false, false, false];
        
        // Modes
        this.gameModes = {};
        this.currentMode = null;
        
        // FPS
        this.fps = 0;
        this.fpsFrames = 0;
        this.fpsTime = 0;
        
        // Music
        this.musicBuffer = null;
        
        // Timing
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDT = 1 / 60;
    }
    
    async init() {
        // Initialize audio
        await this.audio.init();
        
        // Initialize game modes
        this.gameModes = {
            [GD.MODES.CUBE]: new CubeMode(),
            [GD.MODES.SHIP]: new ShipMode(),
            [GD.MODES.BALL]: new BallMode(),
            [GD.MODES.UFO]: new UFOMode(),
            [GD.MODES.WAVE]: new WaveMode(),
            [GD.MODES.ROBOT]: new RobotMode(),
            [GD.MODES.SPIDER]: new SpiderMode(),
            [GD.MODES.SWING]: new SwingMode()
        };
        
        // Initialize level loader
        this.levelLoader.init();
        
        // Initialize UI
        this.ui = new UIManager(this);
        this.ui.populateLevels();
        
        // Update stats display
        const stats = this.progressionManager.getStats();
        this.ui.updateStats(stats.stars, stats.coins, stats.mana);
        
        // Set up pause
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.state === 'playing') {
                    this.pause();
                } else if (this.state === 'paused') {
                    this.resume();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.resize(this.canvas.width, this.canvas.height);
        });
        
        // Start game loop
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    loadLevel(index) {
        this.level = this.levelLoader.loadLevel(index);
        if (!this.level) {
            console.error('Failed to load level', index);
            return;
        }
        
        // Set up colors
        this.renderer.setBGColor(this.level.metadata.bgColor);
        this.renderer.setGroundColor(this.level.metadata.groundColor);
        
        // Store parsed data
        this.levelObjects = this.level.objects;
        this.hazards = this.level.hazards;
        this.orbs = this.level.orbs;
        this.pads = this.level.pads;
        this.portals = this.level.portals;
        this.triggers = this.level.triggers;
        this.coins = this.level.coins;
        this.decorations = this.level.decorations;
        
        // Register groups with trigger system
        this.triggerSystem.reset();
        for (const [groupId, objects] of this.level.groups) {
            this.triggerSystem.registerGroup(groupId, objects);
        }
        
        // Adjust object positions relative to ground
        this._positionObjects();
        
        // Generate music
        const duration = (this.level.levelLength / GD.SPEED_VALUES[this.level.metadata.speed || 1]) + 5;
        this.musicBuffer = this.audio.generateMusic(
            this.level.metadata.bpm,
            Math.max(duration, 30)
        );
        
        // Reset player
        this.resetLevel();
        
        // Start playing
        this.state = 'playing';
        this.ui.showHUD();
        
        // Play music
        if (this.musicBuffer) {
            this.audio.playMusic(this.musicBuffer);
        }
    }
    
    _positionObjects() {
        const groundY = GD.GROUND_Y;
        
        // All objects have y positions relative to ground (y=0 means at ground level)
        // Negative y means above ground
        // Use a Set to avoid double-transforming objects that appear in multiple arrays
        const allObjects = new Set([
            ...this.levelObjects,
            ...this.hazards,
            ...this.orbs,
            ...this.pads,
            ...this.portals,
            ...this.triggers,
            ...this.coins,
            ...this.decorations
        ]);
        
        for (const obj of allObjects) {
            // Store the original level-data Y for resets
            if (obj._originalY === undefined) {
                obj._originalY = obj.y;
            }
            const worldY = groundY + obj._originalY;
            obj.baseY = worldY;
            obj.y = worldY;
        }
    }
    
    resetLevel() {
        this.player.reset(GD.BLOCK_SIZE * 2, GD.GROUND_Y - GD.PLAYER_SIZE);
        this.player.setSpeed(this.level.metadata.speed || 1);
        
        this.dualPlayer = null;
        this.currentMode = this.gameModes[GD.MODES.CUBE];
        this.camera.reset();
        this.triggerSystem.reset();
        this.time = 0;
        this.deathTimer = 0;
        this.coinsCollected = [false, false, false];
        
        // Re-register groups
        for (const [groupId, objects] of this.level.groups) {
            this.triggerSystem.registerGroup(groupId, objects);
        }
        
        // Reset all object states
        for (const obj of this.orbs) obj.resetState();
        for (const obj of this.pads) obj.resetState();
        for (const obj of this.portals) obj.resetState();
        for (const obj of this.triggers) obj.resetState();
        for (const obj of this.coins) obj.collected = false;
        
        // Reset trigger offsets without re-positioning
        const allObjects = [
            ...this.levelObjects, ...this.hazards,
            ...this.orbs, ...this.pads, ...this.portals,
            ...this.triggers, ...this.coins, ...this.decorations
        ];
        for (const obj of allObjects) {
            obj.triggerOffsetX = 0;
            obj.triggerOffsetY = 0;
            obj.triggerRotation = 0;
            obj.triggerAlpha = 0;
            obj.x = obj.baseX;
            obj.y = obj.baseY;
            obj.rotation = obj.baseRotation;
            obj.alpha = obj.baseAlpha;
        }
    }
    
    restart() {
        this.attempts++;
        this.progressionManager.recordAttempt();
        this.resetLevel();
        this.state = 'playing';
        this.ui.showHUD();
        
        if (this.musicBuffer) {
            this.audio.playMusic(this.musicBuffer);
        }
    }
    
    pause() {
        if (this.state !== 'playing') return;
        this.state = 'paused';
        this.audio.pauseMusic();
        this.ui.showScreen('pause-menu');
    }
    
    resume() {
        if (this.state !== 'paused') return;
        this.state = 'playing';
        this.audio.resumeMusic();
        this.ui.showHUD();
    }
    
    quit() {
        this.state = 'menu';
        this.audio.stopMusic();
        this.ui.showScreen('title-screen');
        this.ui.populateLevels();
        
        const stats = this.progressionManager.getStats();
        this.ui.updateStats(stats.stars, stats.coins, stats.mana);
    }
    
    die() {
        if (this.player.isDead) return;
        
        this.player.die();
        this.audio.playSFX('death');
        this.renderer.spawnParticles(
            this.player.getCenterX(),
            this.player.getCenterY(),
            this.player.primaryColor,
            15, 300
        );
        this.camera.shake(8);
        
        this.state = 'dead';
        this.deathTimer = 0;
        this.audio.pauseMusic();
        
        // Update progress
        const progress = this.getProgress() * 100;
        if (this.level) {
            this.progressionManager.updateLevelProgress(
                this.levelLoader.currentLevelIndex, progress
            );
            this.progressionManager.save();
        }
        
        // Check practice mode
        if (this.practiceMode && this.ui.practiceMode.getLastCheckpoint()) {
            setTimeout(() => {
                this._respawnAtCheckpoint();
            }, 500);
        } else {
            setTimeout(() => {
                this.ui.showDeath(this.attempts);
            }, 800);
        }
    }
    
    _respawnAtCheckpoint() {
        const cp = this.ui.practiceMode.getLastCheckpoint();
        if (!cp) {
            this.restart();
            return;
        }
        
        this.player.isDead = false;
        this.player.x = cp.x;
        this.player.y = cp.y;
        this.player.velocityY = 0;
        this.player.gravityDirection = cp.gravityDirection;
        this.player.setMode(cp.mode);
        this.player.setMini(cp.mini);
        this.player.setSpeed(cp.speedIndex);
        this.player.rotation = 0;
        this.player.trail = [];
        this.player.dashing = false;
        this.player.onGround = false;
        
        this.currentMode = this.gameModes[cp.mode];
        this.state = 'playing';
        this.ui.showHUD();
        this.audio.resumeMusic();
    }
    
    completeLevel() {
        this.state = 'complete';
        this.audio.playSFX('complete');
        this.audio.stopMusic();
        
        const levelIndex = this.levelLoader.currentLevelIndex;
        const difficulty = this.level.metadata.difficulty || 'NORMAL';
        
        this.progressionManager.completeLevel(levelIndex, this.coinsCollected, difficulty);
        
        const diff = GD.DIFFICULTIES[difficulty] || GD.DIFFICULTIES.NORMAL;
        this.ui.showComplete({
            attempts: this.attempts,
            coins: this.coinsCollected.filter(c => c).length,
            stars: diff.stars
        });
        
        const stats = this.progressionManager.getStats();
        this.ui.updateStats(stats.stars, stats.coins, stats.mana);
    }
    
    getProgress() {
        if (!this.level || this.level.levelLength <= 0) return 0;
        return MathUtils.clamp(this.player.x / this.level.levelLength, 0, 1);
    }
    
    gameLoop(timestamp) {
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
        this.lastTime = timestamp;
        
        // FPS counter
        this.fpsFrames++;
        this.fpsTime += dt;
        if (this.fpsTime >= 1) {
            this.fps = this.fpsFrames;
            this.fpsFrames = 0;
            this.fpsTime = 0;
            if (this.showFPS) {
                const fpsEl = document.getElementById('fps-counter');
                if (fpsEl) fpsEl.textContent = this.fps + ' FPS';
            }
        }
        
        if (this.state === 'playing') {
            this.update(dt);
        } else if (this.state === 'dead') {
            this.deathTimer += dt;
            this.renderer.updateParticles(dt);
        }
        
        this.render();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    update(dt) {
        this.time += dt;
        
        // Update input state first
        this.input.update(dt);
        
        const inputState = {
            justPressed: this.input.justPressed,
            isHeld: this.input.pressed,
            justReleased: this.input.justReleased
        };
        
        // Update player mode
        this.currentMode = this.gameModes[this.player.mode];
        
        // Handle mode-specific input
        if (this.currentMode) {
            const result = this.currentMode.handleInput(
                this.player, inputState, this.physics, dt
            );
            if (result === 'jump') {
                this.audio.playSFX('jump');
            } else if (result === 'teleport') {
                // Spider mode teleport
                this.currentMode.performTeleport(
                    this.player, this.physics, GD.GROUND_Y, GD.CEILING_Y
                );
                this.audio.playSFX('gravityFlip');
            }
        }
        
        // Update mode physics
        if (this.currentMode) {
            this.currentMode.update(
                this.player, this.physics, dt,
                GD.GROUND_Y, GD.CEILING_Y
            );
        }
        
        // Dash handling
        if (this.player.dashing) {
            this.player.dashTimer -= dt;
            if (this.player.dashTimer <= 0) {
                this.player.dashing = false;
            }
        }
        
        // Update trail and rotation
        this.player.updateTrail(dt);
        this.player.updateRotation(dt);
        
        // Practice mode checkpoints
        if (this.practiceMode && inputState.justPressed) {
            this.ui.practiceMode.addCheckpoint(this.player);
            this.audio.playSFX('checkpoint');
        }
        
        // Check collisions with level objects
        this._checkObjectCollisions();
        
        // Check orb interactions
        this._checkOrbs(inputState);
        
        // Check pad activations
        this._checkPads();
        
        // Check portal activations
        this._checkPortals();
        
        // Check trigger activations
        this._checkTriggers();
        
        // Check coin collection
        this._checkCoins();
        
        // Update trigger system
        this.triggerSystem.update(dt);
        
        // Update objects
        for (const obj of this.levelObjects) obj.update(dt);
        for (const obj of this.pads) obj.update(dt);
        
        // Update particles
        this.renderer.updateParticles(dt);
        
        // Bounds check
        if (!this.physics.checkBounds(this.player, GD.CEILING_Y - 50, GD.GROUND_Y + 50)) {
            this.die();
        }
        
        // Check level completion
        if (this.level && this.player.x >= this.level.levelLength) {
            this.completeLevel();
        }
        
        // Update camera
        this.camera.update(this.player.x, this.player.y, dt);
        
        // Update HUD
        this.ui.updateProgress(this.getProgress());
        this.ui.updateAttempts(this.attempts);
        
        // Dual player
        if (this.dualPlayer) {
            this._updateDualPlayer(dt, inputState);
        }
    }
    
    _checkObjectCollisions() {
        const playerRect = this.player.getHitbox();
        
        for (const obj of this.levelObjects) {
            if (!obj.active || !obj.visible) continue;
            
            const objRect = obj.getRect();
            
            // Only check nearby objects
            if (Math.abs(obj.x - this.player.x) > GD.BLOCK_SIZE * 5) continue;
            
            if (!MathUtils.aabbOverlap(playerRect, objRect)) continue;
            
            if (obj.hazard || obj.type === 'spike') {
                // Check with forgiving hitbox
                const hazardHitbox = obj.getHitbox();
                if (MathUtils.aabbOverlap(playerRect, hazardHitbox)) {
                    this.die();
                    return;
                }
            } else if (obj.solid) {
                // Resolve solid collision
                this._resolveSolidCollision(playerRect, objRect, obj);
            }
        }
        
        // Also check hazards array
        for (const hazard of this.hazards) {
            if (!hazard.active || !hazard.visible) continue;
            if (Math.abs(hazard.x - this.player.x) > GD.BLOCK_SIZE * 5) continue;
            
            const hazardHitbox = hazard.getHitbox();
            if (MathUtils.aabbOverlap(playerRect, hazardHitbox)) {
                this.die();
                return;
            }
        }
    }
    
    _resolveSolidCollision(playerRect, objRect, obj) {
        const overlapX = Math.min(
            playerRect.x + playerRect.width - objRect.x,
            objRect.x + objRect.width - playerRect.x
        );
        const overlapY = Math.min(
            playerRect.y + playerRect.height - objRect.y,
            objRect.y + objRect.height - playerRect.y
        );
        
        if (overlapX < overlapY) {
            // Horizontal collision - die (hit wall)
            if (this.player.x < obj.x) {
                this.die();
            }
        } else {
            // Vertical collision
            if (this.player.gravityDirection > 0) {
                if (this.player.velocityY > 0 && this.player.getCenterY() < obj.y) {
                    // Landing on top
                    this.player.y = objRect.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.onGround = true;
                } else if (this.player.velocityY < 0 && this.player.getCenterY() > obj.y + obj.height) {
                    // Hit bottom
                    this.player.y = objRect.y + objRect.height;
                    this.player.velocityY = 0;
                }
            } else {
                if (this.player.velocityY < 0 && this.player.getCenterY() > obj.y + obj.height) {
                    // Landing on bottom (flipped gravity)
                    this.player.y = objRect.y + objRect.height;
                    this.player.velocityY = 0;
                    this.player.onGround = true;
                } else if (this.player.velocityY > 0 && this.player.getCenterY() < obj.y) {
                    // Hit top (flipped gravity)
                    this.player.y = objRect.y - this.player.height;
                    this.player.velocityY = 0;
                }
            }
        }
    }
    
    _checkOrbs(inputState) {
        this.player.canActivateOrb = false;
        this.player.currentOrb = null;
        
        for (const orb of this.orbs) {
            if (!orb.active) continue;
            if (Math.abs(orb.x - this.player.x) > GD.BLOCK_SIZE * 3) continue;
            
            if (orb.canActivate(this.player)) {
                this.player.canActivateOrb = true;
                this.player.currentOrb = orb;
                
                if (inputState.justPressed) {
                    const result = orb.activate(this.player, this.physics);
                    if (result) {
                        this.audio.playSFX(result.sound || 'orb');
                        this.renderer.spawnParticles(
                            orb.x + orb.width / 2,
                            orb.y + orb.height / 2,
                            orb.color, 8, 150
                        );
                        
                        // Handle trigger orb
                        if (result.triggerGroupId) {
                            const objects = this.triggerSystem.getGroupObjects(result.triggerGroupId);
                            for (const obj of objects) {
                                if (obj instanceof Trigger && !obj.activated) {
                                    const trigResult = obj.activate();
                                    this.triggerSystem.executeTrigger(trigResult);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    _checkPads() {
        for (const pad of this.pads) {
            if (!pad.active) continue;
            if (Math.abs(pad.x - this.player.x) > GD.BLOCK_SIZE * 3) continue;
            
            if (pad.checkAutoActivate(this.player)) {
                const result = pad.activate(this.player, this.physics);
                if (result) {
                    this.audio.playSFX(result.sound || 'pad');
                    this.renderer.spawnParticles(
                        pad.x + pad.width / 2,
                        pad.y + pad.height / 2,
                        pad.color, 6, 100
                    );
                }
            }
        }
    }
    
    _checkPortals() {
        for (const portal of this.portals) {
            if (Math.abs(portal.x - this.player.x) > GD.BLOCK_SIZE * 3) continue;
            
            if (portal.checkActivation(this.player)) {
                const result = portal.activate(this.player, this);
                if (!result) continue;
                
                this.audio.playSFX(result.sound || 'portal');
                
                // Mode change
                if (result.newMode) {
                    this.player.setMode(result.newMode);
                    this.currentMode = this.gameModes[result.newMode];
                    if (this.currentMode.onEnter) {
                        this.currentMode.onEnter(this.player);
                    }
                }
                
                // Gravity
                if (result.gravityFlip) {
                    this.player.gravityDirection = -1;
                    this.audio.playSFX('gravityFlip');
                }
                if (result.gravityNormal) {
                    this.player.gravityDirection = 1;
                }
                
                // Speed
                if (result.newSpeed !== undefined) {
                    this.player.setSpeed(result.newSpeed);
                }
                
                // Size
                if (result.mini !== undefined) {
                    this.player.setMini(result.mini);
                }
                
                // Mirror
                if (result.mirror) {
                    this.camera.mirrored = !this.camera.mirrored;
                }
                
                // Dual
                if (result.dual === true) {
                    this.dualPlayer = new DualPlayer(this.player);
                } else if (result.dual === false) {
                    this.dualPlayer = null;
                }
                
                // Teleport
                if (result.teleportTo) {
                    this.player.x = result.teleportTo.x;
                    this.player.y = result.teleportTo.y;
                }
            }
        }
    }
    
    _checkTriggers() {
        for (const trigger of this.triggers) {
            if (!trigger.active) continue;
            if (trigger.checkActivation(this.player.x)) {
                const result = trigger.activate();
                if (result) {
                    this.triggerSystem.executeTrigger(result);
                }
            }
        }
    }
    
    _checkCoins() {
        for (let i = 0; i < this.coins.length; i++) {
            const coin = this.coins[i];
            if (coin.collected) continue;
            if (Math.abs(coin.x - this.player.x) > GD.BLOCK_SIZE * 3) continue;
            
            const playerRect = this.player.getHitbox();
            const coinRect = coin.getRect();
            if (MathUtils.aabbOverlap(playerRect, coinRect)) {
                coin.collected = true;
                if (i < 3) this.coinsCollected[i] = true;
                this.audio.playSFX('coin');
                this.renderer.spawnParticles(
                    coin.x + coin.width / 2,
                    coin.y + coin.height / 2,
                    '#ffdd00', 10, 200
                );
            }
        }
    }
    
    _updateDualPlayer(dt, inputState) {
        if (!this.dualPlayer) return;
        this.dualPlayer.update(dt);
    }
    
    render() {
        if (this.state === 'menu') return;
        
        this.renderer.beginFrame(this.camera);
        
        // Background
        this.renderer.drawBackground(this.camera, this.time);
        
        // Ground and ceiling
        this.renderer.drawGround(this.camera, GD.GROUND_Y);
        this.renderer.drawCeiling(this.camera, GD.CEILING_Y);
        
        // Draw level objects (only visible ones)
        for (const obj of this.levelObjects) {
            if (!obj.visible || !obj.active) continue;
            if (!this.camera.isVisible(obj.x, obj.y, obj.width, obj.height)) continue;
            
            if (obj.type === 'spike') {
                this.renderer.drawSpike(obj);
            } else {
                this.renderer.drawBlock(obj);
            }
        }
        
        // Draw hazards
        for (const hazard of this.hazards) {
            if (!hazard.visible || !hazard.active) continue;
            if (!this.camera.isVisible(hazard.x, hazard.y, hazard.width, hazard.height)) continue;
            this.renderer.drawSpike(hazard);
        }
        
        // Draw decorations
        for (const deco of this.decorations) {
            if (!deco.visible) continue;
            if (!this.camera.isVisible(deco.x, deco.y, deco.width, deco.height)) continue;
            this.renderer.drawDecoration(deco);
        }
        
        // Draw pads
        for (const pad of this.pads) {
            if (!pad.visible || !pad.active) continue;
            if (!this.camera.isVisible(pad.x, pad.y, pad.width, pad.height)) continue;
            this.renderer.drawPad(pad, this.time);
        }
        
        // Draw orbs
        for (const orb of this.orbs) {
            if (!orb.visible || !orb.active) continue;
            if (!this.camera.isVisible(orb.x, orb.y, orb.width, orb.height)) continue;
            this.renderer.drawOrb(orb, this.time);
        }
        
        // Draw portals
        for (const portal of this.portals) {
            if (!this.camera.isVisible(portal.x, portal.y, portal.width, portal.height)) continue;
            this.renderer.drawPortal(portal, this.time);
        }
        
        // Draw coins
        for (const coin of this.coins) {
            if (coin.collected) continue;
            if (!this.camera.isVisible(coin.x, coin.y, coin.width, coin.height)) continue;
            this.renderer.drawCoin(coin, this.time);
        }
        
        // Draw triggers (only in editor/debug)
        for (const trigger of this.triggers) {
            if (trigger.showInEditor) {
                this.renderer.drawTrigger(trigger);
            }
        }
        
        // Draw player
        if (!this.player.isDead) {
            this.renderer.drawPlayer(this.player, this.player.mode, this.time);
        }
        
        // Draw dual player
        if (this.dualPlayer && !this.player.isDead) {
            this.renderer.drawPlayer(this.dualPlayer, this.player.mode, this.time);
        }
        
        // Death effect
        if (this.player.isDead) {
            this.renderer.drawDeathEffect(
                this.player.deathX,
                this.player.deathY,
                this.deathTimer,
                this.player.primaryColor
            );
        }
        
        // Particles
        this.renderer.drawParticles();
        
        this.renderer.endFrame();
    }
}
