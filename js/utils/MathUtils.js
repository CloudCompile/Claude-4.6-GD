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
