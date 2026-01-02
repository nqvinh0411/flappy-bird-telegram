import Phaser from 'phaser';
import GAME_CONFIG, { COLORS } from '../config/gameConfig.js';
import { THEMES, PIPE_COLORS } from '../config/assetConfig.js';
import SettingsManager from '../utils/SettingsManager.js';
import TelegramAPI from '../utils/TelegramAPI.js';
import TextureOptimizer from '../utils/TextureOptimizer.js';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsScene' });
  }

  init() {
    this.settingsManager = new SettingsManager();
    this.telegram = new TelegramAPI();
    this.currentSettings = this.settingsManager.getAllSettings();
  }

  create() {
    const centerX = GAME_CONFIG.width / 2;
    
    // Background
    this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x4ec0ca)
      .setOrigin(0, 0);
    
    // Title
    const title = TextureOptimizer.createCrispText(
      this,
      centerX,
      40,
      'SETTINGS',
      {
        fontSize: '48px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 6,
        align: 'center'
      }
    );
    title.setOrigin(0.5);
    
    let yPos = 100;
    
    // Theme Selection
    this.createThemeSection(centerX, yPos);
    yPos += 100;
    
    // Pipe Color Selection
    this.createPipeColorSection(centerX, yPos);
    yPos += 120;
    
    // Ground Style Selection
    this.createGroundSection(centerX, yPos);
    yPos += 80;
    
    // Background Selection
    this.createBackgroundSection(centerX, yPos);
    yPos += 80;
    
    // Sound/Music toggles
    this.createSoundSection(centerX, yPos);
    yPos += 80;
    
    // Buttons
    this.createButtons(centerX, GAME_CONFIG.height - 80);
    
    // Optimize textures
    TextureOptimizer.optimizeAllSprites(this, true);
  }

  createThemeSection(x, y) {
    const label = TextureOptimizer.createCrispText(
      this,
      x,
      y,
      'Theme:',
      {
        fontSize: '24px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 3
      }
    );
    label.setOrigin(0.5);
    
    // Theme buttons
    const themes = ['style1', 'style2', 'style3'];
    const buttonWidth = 90;
    const spacing = 10;
    const startX = x - (themes.length * buttonWidth + (themes.length - 1) * spacing) / 2;
    
    themes.forEach((theme, index) => {
      const themeInfo = THEMES[theme];
      if (!themeInfo) return;
      
      const btnX = startX + index * (buttonWidth + spacing) + buttonWidth / 2;
      const btnY = y + 40;
      
      const button = this.createThemeButton(
        btnX,
        btnY,
        buttonWidth,
        40,
        themeInfo.name,
        theme
      );
      
      // Highlight if selected
      if (this.currentSettings.theme === theme) {
        button.bg.setStrokeStyle(4, 0xffff00);
      }
    });
  }

  createThemeButton(x, y, width, height, text, theme) {
    const container = this.add.container(x, y);
    
    const bg = this.add.rectangle(0, 0, width, height, 0x5cb85c, 0.3);
    bg.setStrokeStyle(3, 0xffffff);
    bg.setInteractive({ useHandCursor: true });
    
    const label = TextureOptimizer.createCrispText(
      this,
      0,
      0,
      text,
      {
        fontSize: '18px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 2
      }
    );
    label.setOrigin(0.5);
    
    container.add([bg, label]);
    
    // Click handler
    bg.on('pointerdown', () => {
      this.currentSettings.theme = theme;
      this.telegram.hapticSelection();
      this.scene.restart(); // Refresh UI
    });
    
    bg.on('pointerover', () => {
      bg.setFillStyle(0x5cb85c, 0.5);
    });
    
    bg.on('pointerout', () => {
      bg.setFillStyle(0x5cb85c, 0.3);
    });
    
    return { container, bg, label };
  }

  createPipeColorSection(x, y) {
    const label = TextureOptimizer.createCrispText(
      this,
      x,
      y,
      'Pipe Color:',
      {
        fontSize: '24px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 3
      }
    );
    label.setOrigin(0.5);
    
    // Color buttons - 2 rows of 4
    const colors = [0, 1, 2, 3, 4, 5, 6, 7];
    const buttonSize = 40;
    const spacing = 10;
    const cols = 4;
    
    colors.forEach((colorIndex, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const btnX = x - (cols * buttonSize + (cols - 1) * spacing) / 2 + col * (buttonSize + spacing) + buttonSize / 2;
      const btnY = y + 40 + row * (buttonSize + spacing);
      
      this.createColorButton(btnX, btnY, buttonSize, colorIndex);
    });
    
    // Random button
    const randomBtn = this.createColorButton(x, y + 40 + 2 * (buttonSize + spacing), 100, 'random');
  }

  createColorButton(x, y, size, colorIndex) {
    const isRandom = colorIndex === 'random';
    const colorInfo = isRandom ? null : PIPE_COLORS[colorIndex];
    
    const bg = this.add.rectangle(x, y, size, size, 0x888888, 0.5);
    bg.setStrokeStyle(3, 0xffffff);
    bg.setInteractive({ useHandCursor: true });
    
    if (!isRandom && colorInfo) {
      // Show color name as emoji/text
      const colorEmojis = ['🟢', '🟠', '🔴', '🔵', '⚪', '🟣', '🟤', '🟠'];
      const emoji = this.add.text(x, y, colorEmojis[colorIndex], {
        fontSize: '24px'
      });
      emoji.setOrigin(0.5);
    } else if (isRandom) {
      const label = this.add.text(x, y, '?', {
        fontSize: '24px',
        fontFamily: 'Arial Black',
        color: '#ffffff'
      });
      label.setOrigin(0.5);
    }
    
    // Highlight if selected
    if (this.currentSettings.pipeColor === colorIndex) {
      bg.setStrokeStyle(4, 0xffff00);
    }
    
    // Click handler
    bg.on('pointerdown', () => {
      this.currentSettings.pipeColor = colorIndex;
      this.telegram.hapticSelection();
      this.scene.restart();
    });
    
    bg.on('pointerover', () => {
      bg.setFillStyle(0x888888, 0.7);
    });
    
    bg.on('pointerout', () => {
      bg.setFillStyle(0x888888, 0.5);
    });
    
    return bg;
  }

  createGroundSection(x, y) {
    const label = TextureOptimizer.createCrispText(
      this,
      x,
      y,
      'Ground:',
      {
        fontSize: '24px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 3
      }
    );
    label.setOrigin(0.5);
    
    // 2 ground styles
    [0, 1].forEach((styleIndex) => {
      const btnX = x - 60 + styleIndex * 120;
      const btnY = y + 40;
      
      const bg = this.add.rectangle(btnX, btnY, 100, 40, 0x8b4513, 0.5);
      bg.setStrokeStyle(3, 0xffffff);
      bg.setInteractive({ useHandCursor: true });
      
      const label = this.add.text(btnX, btnY, `Style ${styleIndex + 1}`, {
        fontSize: '16px',
        fontFamily: 'Arial',
        color: '#ffffff'
      });
      label.setOrigin(0.5);
      
      if (this.currentSettings.groundStyle === styleIndex) {
        bg.setStrokeStyle(4, 0xffff00);
      }
      
      bg.on('pointerdown', () => {
        this.currentSettings.groundStyle = styleIndex;
        this.telegram.hapticSelection();
        this.scene.restart();
      });
    });
  }

  createBackgroundSection(x, y) {
    const label = TextureOptimizer.createCrispText(
      this,
      x,
      y,
      'Background:',
      {
        fontSize: '24px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 3
      }
    );
    label.setOrigin(0.5);
    
    // Show current bg index
    const bgText = this.add.text(x, y + 40, `BG ${this.currentSettings.backgroundIndex + 1}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });
    bgText.setOrigin(0.5);
  }

  createSoundSection(x, y) {
    const soundLabel = this.add.text(x - 80, y, 'Sound:', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });
    soundLabel.setOrigin(0.5);
    
    const soundToggle = this.add.text(x - 20, y, this.currentSettings.soundEnabled ? 'ON' : 'OFF', {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: this.currentSettings.soundEnabled ? '#00ff00' : '#ff0000'
    });
    soundToggle.setOrigin(0.5);
    soundToggle.setInteractive({ useHandCursor: true });
    
    soundToggle.on('pointerdown', () => {
      this.currentSettings.soundEnabled = !this.currentSettings.soundEnabled;
      this.telegram.hapticSelection();
      this.scene.restart();
    });
    
    const musicLabel = this.add.text(x + 60, y, 'Music:', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });
    musicLabel.setOrigin(0.5);
    
    const musicToggle = this.add.text(x + 120, y, this.currentSettings.musicEnabled ? 'ON' : 'OFF', {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: this.currentSettings.musicEnabled ? '#00ff00' : '#ff0000'
    });
    musicToggle.setOrigin(0.5);
    musicToggle.setInteractive({ useHandCursor: true });
    
    musicToggle.on('pointerdown', () => {
      this.currentSettings.musicEnabled = !this.currentSettings.musicEnabled;
      this.telegram.hapticSelection();
      this.scene.restart();
    });
  }

  createButtons(x, y) {
    // Back button
    const backBtn = this.createButton(x - 80, y, 'BACK', () => {
      this.telegram.hapticImpact('medium');
      this.scene.start(GAME_CONFIG.scenes.start);
    });
    
    // Save button
    const saveBtn = this.createButton(x + 80, y, 'SAVE', () => {
      this.saveSettings();
      this.telegram.hapticNotification('success');
      this.scene.start(GAME_CONFIG.scenes.start);
    });
  }

  createButton(x, y, text, callback) {
    const container = this.add.container(x, y);
    
    const bg = this.add.rectangle(0, 0, 140, 50, 0xffffff, 0.2);
    bg.setStrokeStyle(3, 0xffffff);
    bg.setInteractive({ useHandCursor: true });
    
    const label = TextureOptimizer.createCrispText(
      this,
      0,
      0,
      text,
      {
        fontSize: '24px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 4
      }
    );
    label.setOrigin(0.5);
    
    container.add([bg, label]);
    
    bg.on('pointerdown', callback);
    
    bg.on('pointerover', () => {
      bg.setFillStyle(0xffffff, 0.4);
      this.tweens.add({
        targets: container,
        scale: 1.1,
        duration: 100
      });
    });
    
    bg.on('pointerout', () => {
      bg.setFillStyle(0xffffff, 0.2);
      this.tweens.add({
        targets: container,
        scale: 1,
        duration: 100
      });
    });
    
    return container;
  }

  saveSettings() {
    // Save all settings
    this.settingsManager.setTheme(this.currentSettings.theme);
    this.settingsManager.setPipeColor(this.currentSettings.pipeColor);
    this.settingsManager.setGroundStyle(this.currentSettings.groundStyle);
    this.settingsManager.setBackgroundIndex(this.currentSettings.backgroundIndex);
    this.settingsManager.setSoundEnabled(this.currentSettings.soundEnabled);
    this.settingsManager.setMusicEnabled(this.currentSettings.musicEnabled);
  }
}

export default SettingsScene;
