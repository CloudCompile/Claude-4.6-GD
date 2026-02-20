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
