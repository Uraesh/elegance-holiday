// services/audioService.ts
export class AmbientAudioService {
  private audio: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;

  private ensureAudio() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = 0.5;
    }
  }

  public setSourceUrl(url: string) {
    // Use a remote/hosted URL (must be a legal, permitted source)
    this.cleanupObjectUrl();
    this.ensureAudio();
    if (this.audio) {
      this.audio.src = url;
    }
  }

  public setSourceFile(file: File) {
    // Use a local file selected by the user (File from <input type="file">)
    this.cleanupObjectUrl();
    this.ensureAudio();
    const obj = URL.createObjectURL(file);
    this.objectUrl = obj;
    if (this.audio) {
      this.audio.src = obj;
    }
  }

  private cleanupObjectUrl() {
    if (this.objectUrl) {
      try {
        URL.revokeObjectURL(this.objectUrl);
      } catch (_) {}
      this.objectUrl = null;
    }
  }

  public async toggle(play: boolean) {
    if (!this.audio) return;
    if (play) {
      try {
        await this.audio.play();
      } catch (err) {
        console.error('Audio playback failed:', err);
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

  public dispose() {
    this.cleanupObjectUrl();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}

export const audioService = new AmbientAudioService();
