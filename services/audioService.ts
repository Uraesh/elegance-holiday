
export class AmbientAudioService {
  private audio: HTMLAudioElement | null = null;
  private isInitialized = false;

  private init() {
    if (this.isInitialized) return;
    // Utilisation d'une version instrumentale douce ou de la version demandée
    // Note : L'utilisateur peut remplacer cette URL par son propre fichier
    this.audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); 
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.isInitialized = true;
  }

  public async toggle(play: boolean) {
    if (!this.isInitialized) this.init();
    if (!this.audio) return;

    if (play) {
      try {
        await this.audio.play();
      } catch (err) {
        console.error("Audio playback failed:", err);
      }
    } else {
      this.audio.pause();
    }
  }

  public setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

export const audioService = new AmbientAudioService();
