// High quality Web Audio API sound effects and romantic melody generator
// Permanently enabled - sounds and music play continuously without turning off

class SoundFX {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private melodyTimeout: any = null;

  constructor() {
    // Music is only started inside the gift scenes, never on the countdown page
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Slingshot stretch tension hum
  public playStretch() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.3);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  // Slingshot release whoosh
  public playRelease() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Sparkle / Heart collision chime
  public playHit() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (sparkling major chord)
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + i * 0.04;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.55);
      });
    } catch {}
  }

  // Typewriter soft harp chime
  public playLetter() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(randomFreq, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  // Heart tree bloom chime
  public playBloom() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.5];
      const f = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 1.25, now + 0.22);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {}
  }

  // Romantic music box loop - plays forever
  public startMusic() {
    if (this.isPlayingMusic) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isPlayingMusic = true;

    // Gentle romantic melody notes (Happy Birthday / Canon inspired lullaby)
    const notes: [number, number][] = [
      [523.25, 0.4], [523.25, 0.4], [587.33, 0.8], [523.25, 0.8], [698.46, 0.8], [659.25, 1.2],
      [523.25, 0.4], [523.25, 0.4], [587.33, 0.8], [523.25, 0.8], [783.99, 0.8], [698.46, 1.2],
      [523.25, 0.4], [523.25, 0.4], [1046.5, 0.8], [880.0, 0.8], [698.46, 0.8], [659.25, 0.8], [587.33, 0.8],
      [932.33, 0.4], [932.33, 0.4], [880.0, 0.8], [698.46, 0.8], [783.99, 0.8], [698.46, 1.6]
    ];

    let noteIdx = 0;

    const playNext = () => {
      if (!this.ctx) return;
      const [freq, dur] = notes[noteIdx];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + dur);

      noteIdx = (noteIdx + 1) % notes.length;
      this.melodyTimeout = setTimeout(playNext, dur * 700);
    };

    playNext();
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }
}

export const soundFX = new SoundFX();
