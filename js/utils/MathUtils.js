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
