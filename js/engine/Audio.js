class AudioManager {
    constructor() {
        this.context = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.currentMusic = null;
        this.musicSource = null;
        this.musicVolume = 0.8;
        this.sfxVolume = 0.8;
        this.beats = [];
        this.bpm = GD.DEFAULT_BPM;
        this.musicStartTime = 0;
        this.musicOffset = 0;
        this.isPlaying = false;
        this._sfxBuffers = {};
        this._initialized = false;
    }
    
    async init() {
        if (this._initialized) return;
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.musicGain = this.context.createGain();
            this.musicGain.gain.value = this.musicVolume;
            this.musicGain.connect(this.context.destination);
            
            this.sfxGain = this.context.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.context.destination);
            
            this._generateSFX();
            this._initialized = true;
        } catch (e) {
            console.warn('Audio initialization failed:', e);
        }
    }
    
    _generateSFX() {
        // Generate all sound effects procedurally
        this._sfxBuffers.jump = this._createToneBuffer(440, 0.08, 'square', 0.3, 600);
        this._sfxBuffers.death = this._createNoiseBuffer(0.3, 0.5);
        this._sfxBuffers.orb = this._createToneBuffer(660, 0.06, 'sine', 0.3, 880);
        this._sfxBuffers.pad = this._createToneBuffer(550, 0.07, 'sine', 0.25, 770);
        this._sfxBuffers.portal = this._createToneBuffer(330, 0.15, 'triangle', 0.2, 660);
        this._sfxBuffers.coin = this._createToneBuffer(880, 0.12, 'sine', 0.3, 1320);
        this._sfxBuffers.complete = this._createToneBuffer(440, 0.5, 'sine', 0.3, 880);
        this._sfxBuffers.click = this._createToneBuffer(1000, 0.03, 'square', 0.15);
        this._sfxBuffers.gravityFlip = this._createToneBuffer(300, 0.1, 'triangle', 0.2, 500);
        this._sfxBuffers.checkpoint = this._createToneBuffer(600, 0.1, 'sine', 0.2, 800);
    }
    
    _createToneBuffer(freq, duration, type, volume, freqEnd) {
        const sampleRate = this.context.sampleRate;
        const length = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const progress = i / length;
            const currentFreq = freqEnd ? freq + (freqEnd - freq) * progress : freq;
            const envelope = (1 - progress) * volume;
            
            let sample;
            const phase = 2 * Math.PI * currentFreq * t;
            switch (type) {
                case 'square':
                    sample = Math.sin(phase) > 0 ? 1 : -1;
                    break;
                case 'triangle':
                    sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
                    break;
                case 'sawtooth':
                    sample = 2 * (t * currentFreq - Math.floor(0.5 + t * currentFreq));
                    break;
                default: // sine
                    sample = Math.sin(phase);
            }
            data[i] = sample * envelope;
        }
        return buffer;
    }
    
    _createNoiseBuffer(duration, volume) {
        const sampleRate = this.context.sampleRate;
        const length = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const progress = i / length;
            const envelope = (1 - progress) * volume;
            data[i] = (Math.random() * 2 - 1) * envelope;
        }
        return buffer;
    }
    
    playSFX(name) {
        if (!this._initialized || !this._sfxBuffers[name]) return;
        if (this.context.state === 'suspended') this.context.resume();
        
        const source = this.context.createBufferSource();
        source.buffer = this._sfxBuffers[name];
        source.connect(this.sfxGain);
        source.start(0);
    }
    
    generateMusic(bpm, duration, style = 'electronic') {
        if (!this._initialized) return null;
        
        this.bpm = bpm;
        const sampleRate = this.context.sampleRate;
        const totalSamples = Math.floor(sampleRate * duration);
        const buffer = this.context.createBuffer(2, totalSamples, sampleRate);
        const leftData = buffer.getChannelData(0);
        const rightData = buffer.getChannelData(1);
        
        const beatInterval = 60 / bpm;
        this.beats = [];
        
        for (let t = 0; t < duration; t += beatInterval) {
            this.beats.push(t);
        }
        
        // Generate procedural music based on style
        const baseFreq = style === 'electronic' ? 130.81 : 110; // C3 or A2
        
        // Chord progression (I-V-vi-IV in C)
        const chords = [
            [130.81, 164.81, 196.00], // C
            [196.00, 246.94, 293.66], // G
            [220.00, 261.63, 329.63], // Am
            [174.61, 220.00, 261.63]  // F
        ];
        
        for (let i = 0; i < totalSamples; i++) {
            const t = i / sampleRate;
            const beatPos = (t / beatInterval) % 4;
            const chordIndex = Math.floor((t / (beatInterval * 4)) % 4);
            const chord = chords[chordIndex];
            
            let sample = 0;
            
            // Bass line (sawtooth)
            const bassFreq = chord[0] / 2;
            const bassEnv = 1 - ((t % beatInterval) / beatInterval) * 0.7;
            sample += Math.sin(2 * Math.PI * bassFreq * t) * 0.15 * bassEnv;
            sample += (2 * (t * bassFreq - Math.floor(0.5 + t * bassFreq))) * 0.05 * bassEnv;
            
            // Kick drum on beats
            const kickPhase = (t % beatInterval);
            if (kickPhase < 0.1) {
                const kickFreq = 150 * Math.exp(-kickPhase * 40);
                const kickEnv = Math.exp(-kickPhase * 30);
                sample += Math.sin(2 * Math.PI * kickFreq * kickPhase) * 0.3 * kickEnv;
            }
            
            // Hi-hat on off-beats
            const halfBeat = beatInterval / 2;
            const hihatPhase = (t % halfBeat);
            if (hihatPhase < 0.02) {
                sample += (Math.random() * 2 - 1) * 0.08 * (1 - hihatPhase / 0.02);
            }
            
            // Snare on beats 2 and 4
            const measurePos = t % (beatInterval * 4);
            const snareBeats = [beatInterval, beatInterval * 3];
            for (const sb of snareBeats) {
                const snarePhase = measurePos - sb;
                if (snarePhase >= 0 && snarePhase < 0.08) {
                    const snareEnv = Math.exp(-snarePhase * 40);
                    sample += (Math.random() * 2 - 1) * 0.12 * snareEnv;
                    sample += Math.sin(2 * Math.PI * 200 * snarePhase) * 0.08 * snareEnv;
                }
            }
            
            // Chords (pad sound)
            for (const freq of chord) {
                sample += Math.sin(2 * Math.PI * freq * t) * 0.04;
                sample += Math.sin(2 * Math.PI * freq * 2 * t) * 0.02;
            }
            
            // Melody (simple arpeggio)
            const arpIndex = Math.floor((t / (beatInterval / 4)) % 3);
            const melodyFreq = chord[arpIndex] * 2;
            const arpPhase = (t % (beatInterval / 4)) / (beatInterval / 4);
            const arpEnv = Math.exp(-arpPhase * 5);
            sample += Math.sin(2 * Math.PI * melodyFreq * t) * 0.06 * arpEnv;
            
            // Soft clip
            sample = Math.tanh(sample * 1.5) * 0.8;
            
            leftData[i] = sample;
            rightData[i] = sample;
        }
        
        return buffer;
    }
    
    playMusic(buffer, offset = 0) {
        this.stopMusic();
        if (!this._initialized || !buffer) return;
        if (this.context.state === 'suspended') this.context.resume();
        
        this.musicSource = this.context.createBufferSource();
        this.musicSource.buffer = buffer;
        this.musicSource.loop = true;
        this.musicSource.connect(this.musicGain);
        this.musicSource.start(0, offset);
        this.musicStartTime = this.context.currentTime - offset;
        this.musicOffset = offset;
        this.currentMusic = buffer;
        this.isPlaying = true;
    }
    
    stopMusic() {
        if (this.musicSource) {
            try { this.musicSource.stop(); } catch (e) {}
            this.musicSource = null;
        }
        this.isPlaying = false;
    }
    
    pauseMusic() {
        if (this.isPlaying && this.context) {
            this.musicOffset = this.getMusicTime();
            this.stopMusic();
        }
    }
    
    resumeMusic() {
        if (!this.isPlaying && this.currentMusic) {
            this.playMusic(this.currentMusic, this.musicOffset);
        }
    }
    
    getMusicTime() {
        if (!this.isPlaying || !this.context) return 0;
        return this.context.currentTime - this.musicStartTime;
    }
    
    getCurrentBeat() {
        const time = this.getMusicTime();
        const beatInterval = 60 / this.bpm;
        return time / beatInterval;
    }
    
    getNearestBeatTime(time) {
        if (this.beats.length === 0) return 0;
        let nearest = this.beats[0];
        let minDist = Math.abs(time - nearest);
        for (const beat of this.beats) {
            const dist = Math.abs(time - beat);
            if (dist < minDist) {
                minDist = dist;
                nearest = beat;
            }
        }
        return nearest;
    }
    
    snapToNearestBeat(time) {
        const beatInterval = 60 / this.bpm;
        return Math.round(time / beatInterval) * beatInterval;
    }
    
    setMusicVolume(vol) {
        this.musicVolume = MathUtils.clamp(vol, 0, 1);
        if (this.musicGain) this.musicGain.gain.value = this.musicVolume;
    }
    
    setSFXVolume(vol) {
        this.sfxVolume = MathUtils.clamp(vol, 0, 1);
        if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume;
    }
    
    // Simple BPM detection from buffer
    detectBPM(buffer) {
        if (!buffer) return GD.DEFAULT_BPM;
        const data = buffer.getChannelData(0);
        const sampleRate = buffer.sampleRate;
        
        // Analyze energy peaks
        const windowSize = Math.floor(sampleRate * 0.01); // 10ms windows
        const energies = [];
        
        for (let i = 0; i < data.length - windowSize; i += windowSize) {
            let energy = 0;
            for (let j = 0; j < windowSize; j++) {
                energy += data[i + j] * data[i + j];
            }
            energies.push(energy / windowSize);
        }
        
        // Find peaks
        const threshold = energies.reduce((a, b) => a + b, 0) / energies.length * 1.5;
        const peaks = [];
        for (let i = 1; i < energies.length - 1; i++) {
            if (energies[i] > threshold && energies[i] > energies[i-1] && energies[i] > energies[i+1]) {
                peaks.push(i * 0.01);
            }
        }
        
        if (peaks.length < 2) return GD.DEFAULT_BPM;
        
        // Calculate average interval
        const intervals = [];
        for (let i = 1; i < peaks.length; i++) {
            intervals.push(peaks[i] - peaks[i-1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        
        let bpm = 60 / avgInterval;
        // Normalize to reasonable range
        while (bpm < 80) bpm *= 2;
        while (bpm > 200) bpm /= 2;
        
        return Math.round(bpm);
    }
}
