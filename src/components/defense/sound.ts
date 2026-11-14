/**
 * Procedural Web Audio sound effects synthesizer (zero external assets required).
 */
export class SoundFX {
  private ctx: AudioContext | null = null
  public enabled = true

  unlock(): void {
    if (typeof window === "undefined") return
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!this.ctx && AudioCtx) {
      this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
  }

  playTone(
    freq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType = "triangle",
    gainVal = 0.08,
  ): void {
    if (!this.enabled || !this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, now)
    if (endFreq !== freq) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(30, endFreq),
        now + duration,
      )
    }
    gain.gain.setValueAtTime(gainVal, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + duration)
  }

  bow(): void {
    this.playTone(540, 220, 0.08, "triangle", 0.06)
  }

  coin(): void {
    this.playTone(980, 1420, 0.09, "sine", 0.06)
  }

  cannon(): void {
    this.playTone(150, 48, 0.22, "sawtooth", 0.09)
  }

  frost(): void {
    this.playTone(760, 520, 0.14, "sine", 0.05)
  }

  tesla(): void {
    this.playTone(820, 300, 0.12, "square", 0.045)
  }

  sunburst(): void {
    this.playTone(440, 680, 0.12, "sawtooth", 0.04)
  }

  build(): void {
    this.playTone(330, 520, 0.14, "triangle", 0.08)
  }

  upgrade(): void {
    this.playTone(440, 880, 0.18, "triangle", 0.085)
  }

  stageClear(): void {
    this.playTone(523, 784, 0.28, "sine", 0.09)
  }

  damageCore(): void {
    this.playTone(180, 70, 0.25, "sawtooth", 0.1)
  }
}
