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
