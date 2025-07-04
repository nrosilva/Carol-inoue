// Gerador de Mantra usando Web Audio API
class MantraGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.volume = 0.3;
        this.frequencies = [432, 528, 639, 741, 852]; // Frequências de cura
        this.oscillators = [];
        this.gainNodes = [];
    }

    // Inicializar contexto de áudio
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return true;
        } catch (error) {
            console.error('Erro ao inicializar AudioContext:', error);
            return false;
        }
    }

    // Criar oscilador para uma frequência específica
    createOscillator(frequency, type = 'sine') {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        // Configurar envelope de volume
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        return { oscillator, gainNode };
    }

    // Iniciar mantra
    start() {
        if (!this.audioContext) {
            if (!this.init()) {
                return false;
            }
        }

        if (this.isPlaying) {
            this.stop();
        }

        // Criar múltiplos osciladores para criar harmonia
        this.frequencies.forEach((freq, index) => {
            const { oscillator, gainNode } = this.createOscillator(freq);
            
            // Adicionar variação de fase
            oscillator.start(this.audioContext.currentTime + index * 0.1);
            
            this.oscillators.push(oscillator);
            this.gainNodes.push(gainNode);
        });

        this.isPlaying = true;
        return true;
    }

    // Parar mantra
    stop() {
        if (!this.isPlaying) return;

        this.oscillators.forEach((oscillator, index) => {
            const gainNode = this.gainNodes[index];
            
            // Fade out suave
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
            
            setTimeout(() => {
                oscillator.stop();
            }, 500);
        });

        this.oscillators = [];
        this.gainNodes = [];
        this.isPlaying = false;
    }

    // Ajustar volume
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        this.gainNodes.forEach(gainNode => {
            gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
        });
    }

    // Limpar recursos
    dispose() {
        this.stop();
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
}

// Exportar para uso global
window.MantraGenerator = MantraGenerator; 