class LevelValidator {
    static validate(levelData) {
        const errors = [];
        
        if (!levelData) {
            errors.push('Level

You
Continue
Assistant


## js/levels/LevelValidator.js (continued)

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
