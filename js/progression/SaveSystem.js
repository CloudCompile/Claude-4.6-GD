class SaveSystem {
    constructor() {
        this.storageKey = 'gd_clone_save';
    }
    
    save(data) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(this.storageKey, json);
            return true;
        } catch (e) {
            console.warn('Save failed:', e);
            return false;
        }
    }
    
    load() {
        try {
            const json = localStorage.getItem(this.storageKey);
            if (!json) return null;
            return JSON.parse(json);
        } catch (e) {
            console.warn('Load failed:', e);
            return null;
        }
    }
    
    clear() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (e) {
            console.warn('Clear failed:', e);
        }
    }
    
    exists() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}
