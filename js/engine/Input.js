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
