import audios from './data/data.js';
import { path, secondsToMinutes } from './utils.js';
import elements from './playerElements.js';

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  loadPlayer() {
    elements.get.call(this);
    this.update();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerText = 'pause';
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerText = 'play_arrow';
  },
  togglePlayPause() {
    this.isPlaying ? this.pause() : this.play();
  },
  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.mute.innerText = this.audio.muted ? 'volume_off' : 'volume_up';
  },
  setVolume(value) {
    this.audio.volume = value / 100;
  },
  setSeek(value) {
    this.audio.currentTime = value;
  },
  timeUpdate() {
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
    this.seekbar.value = this.audio.currentTime;
  },
  next() {
    this.currentPlaying++;
    if (this.currentPlaying === this.audioData.length) this.restart();
    this.update();
    this.play()
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${path(
      this.currentAudio.cover,
    )}') no-repeat center center / cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerText = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));
    this.audio.onloadedmetadata = () => {
      elements.actions.call(this);
    };
  },
  restart() {
    this.currentPlaying = 0;
    this.update();
  },
};
