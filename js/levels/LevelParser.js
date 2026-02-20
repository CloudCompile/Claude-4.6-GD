class LevelParser {
    static parse(levelData) {
        const parsed = {
            metadata: {
                name: levelData.name || 'Untitled',
                difficulty: levelData.difficulty || 'NORMAL',
                bpm: levelData.bpm || GD.DEFAULT_BPM,
                bgColor: levelData.bgColor || GD.COLORS.BG_DEFAULT,
                groundColor: levelData.groundColor || GD.COLORS.GROUND_DEFAULT,
                speed: levelData.speed !== undefined ? levelData.speed : 1
            },
            objects: [],
            hazards: [],
            orbs: [],
            pads: [],
            portals: [],
            triggers: [],
            coins: [],
            decorations: [],
            groups: new Map(),
            levelLength: 0
        };
        
        if (!levelData.objects || !Array.isArray(levelData.objects)) {
            return parsed;
        }
        
        for (const objData of levelData.objects) {
            const obj = LevelParser._createObject(objData);
            if (!obj) continue;
            
            LevelParser._categorize(parsed, obj);
            
            // Track groups
            if (obj.groupId) {
                if (!parsed.groups.has(obj.groupId)) {
                    parsed.groups.set(obj.groupId, []);
                }
                parsed.groups.get(obj.groupId).push(obj);
            }
            if (obj.groups) {
                for (const gid of obj.groups) {
                    if (!parsed.groups.has(gid)) {
                        parsed.groups.set(gid, []);
                    }
                    parsed.groups.get(gid).push(obj);
                }
            }
            
            // Track level length
            const objEnd = obj.x + obj.width;
            if (objEnd > parsed.levelLength) {
                parsed.levelLength = objEnd;
            }
        }
        
        // Link teleport portals
        LevelParser._linkTeleportPortals(parsed.portals);
        
        return parsed;
    }
    
    static _createObject(data) {
        switch (data.type) {
            case 'block':
            case 'slope':
            case 'decoration':
                return new GameObject(data);
            case 'spike':
            case 'hazard':
                return new Hazard(data);
            case 'orb':
                return new Orb(data);
            case 'pad':
                return new Pad(data);
            case 'portal':
                return new Portal(data);
            case 'trigger':
                return new Trigger(data);
            case 'coin':
                const coin = new GameObject(data);
                coin.type = 'coin';
                coin.solid = false;
                coin.hazard = false;
                coin.collected = false;
                return coin;
            default:
                return new GameObject(data);
        }
    }
    
    static _categorize(parsed, obj) {
        switch (obj.type) {
            case 'spike':
            case 'hazard':
                parsed.hazards.push(obj);
                break;
            case 'orb':
                parsed.orbs.push(obj);
                break;
            case 'pad':
                parsed.pads.push(obj);
                break;
            case 'portal':
                parsed.portals.push(obj);
                break;
            case 'trigger':
                parsed.triggers.push(obj);
                break;
            case 'coin':
                parsed.coins.push(obj);
                break;
            case 'decoration':
                parsed.decorations.push(obj);
                break;
            default:
                parsed.objects.push(obj);
                break;
        }
    }
    
    static _linkTeleportPortals(portals) {
        const teleports = portals.filter(p => p.portalType === GD.PORTAL_TYPES.TELEPORT);
        for (const tp of teleports) {
            if (tp.linkedPortalId) {
                tp.linkedPortal = teleports.find(p => p.id === tp.linkedPortalId) || null;
            }
        }
    }
}
