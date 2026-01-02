import TelegramAPI from './TelegramAPI.js';

export class SettingsManager {
  constructor() {
    this.telegram = new TelegramAPI();
    this.storageKey = 'flappy_bird_settings';
    this.settings = {
      theme: 'style1',           // style1, style2, style3
      pipeColor: 'random',       // 'random' hoặc 0-7
      groundStyle: 0,            // 0 hoặc 1
      backgroundIndex: 0,        // 0-6
      selectedBird: 'bird1-1',
      selectedBackground: 0,
      soundEnabled: true,
      musicEnabled: true,
    };
  }

  async loadSettings() {
    return new Promise((resolve) => {
      this.telegram.loadFromCloud(this.storageKey, (error, value) => {
        if (!error && value) {
          try {
            this.settings = JSON.parse(value);
          } catch (e) {
            console.error('Failed to parse settings:', e);
          }
        }
        resolve(this.settings);
      });
    });
  }

  async saveSettings() {
    return new Promise((resolve) => {
      const settingsJson = JSON.stringify(this.settings);
      this.telegram.saveToCloud(this.storageKey, settingsJson, (error) => {
        if (error) {
          console.error('Failed to save settings:', error);
          resolve(false);
        } else {
          console.log('Settings saved:', this.settings);
          resolve(true);
        }
      });
    });
  }

  setSelectedBird(birdKey) {
    this.settings.selectedBird = birdKey;
    this.saveSettings();
  }

  getSelectedBird() {
    return this.settings.selectedBird;
  }

  setSelectedBackground(index) {
    this.settings.selectedBackground = index;
    this.saveSettings();
  }

  getSelectedBackground() {
    return this.settings.selectedBackground;
  }

  setSoundEnabled(enabled) {
    this.settings.soundEnabled = enabled;
    this.saveSettings();
  }

  isSoundEnabled() {
    return this.settings.soundEnabled;
  }

  setMusicEnabled(enabled) {
    this.settings.musicEnabled = enabled;
    this.saveSettings();
  }

  isMusicEnabled() {
    return this.settings.musicEnabled;
  }

  getTheme() {
    return this.settings.theme;
  }

  setTheme(theme) {
    this.settings.theme = theme;
    this.saveSettings();
  }

  getPipeColor() {
    return this.settings.pipeColor;
  }

  setPipeColor(color) {
    this.settings.pipeColor = color;
    this.saveSettings();
  }

  getGroundStyle() {
    return this.settings.groundStyle;
  }

  setGroundStyle(style) {
    this.settings.groundStyle = style;
    this.saveSettings();
  }

  getBackgroundIndex() {
    return this.settings.backgroundIndex;
  }

  setBackgroundIndex(index) {
    this.settings.backgroundIndex = index;
    this.saveSettings();
  }

  getAllSettings() {
    return { ...this.settings };
  }
}

export default SettingsManager;
