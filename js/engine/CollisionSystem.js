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
