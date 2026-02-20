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
