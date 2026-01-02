import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';
import GAME_CONFIG, { COLORS } from '../config/gameConfig.js';
import TelegramAPI from '../utils/TelegramAPI.js';
import ScoreManager from '../utils/ScoreManager.js';
import TextureOptimizer from '../utils/TextureOptimizer.js';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.scenes.start });
  }

  preload() {
    console.log('StartScene: Loading assets...');
    
    SpriteLoader.loadBirds(this, 'style1');
    SpriteLoader.loadBackgrounds(this, [0]);
    SpriteLoader.loadGround(this, 'style1');
  }

  create() {
    console.log('StartScene: Creating scene...');
    
    this.telegram = new TelegramAPI();
    this.scoreManager = new ScoreManager();
    
    SpriteLoader.createAllBirdAnimations(this, 'style1');
    
    this.createBackground();
    this.createGround();
    this.createBird();
    this.createUI();
    this.setupInput();
    this.loadHighScore();
    
    TextureOptimizer.optimizeAllSprites(this, true);
  }

  createBackground() {
    const bg = this.add.image(
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      SpriteLoader.getBackgroundKey(0)
    );
    bg.setDisplaySize(GAME_CONFIG.width, GAME_CONFIG.height);
  }

  createGround() {
    const groundY = GAME_CONFIG.height - GAME_CONFIG.ground.height / 2;
    
    this.ground = this.add.tileSprite(
      GAME_CONFIG.width / 2,
      groundY,
      GAME_CONFIG.width,
      GAME_CONFIG.ground.height,
      SpriteLoader.getGroundKey('style1'),
      0
    );
  }

  createBird() {
    const birdX = GAME_CONFIG.width / 2;
    const birdY = GAME_CONFIG.height / 2 - 50;
    
    this.bird = this.add.sprite(birdX, birdY, 'bird1-1');
    this.bird.setScale(GAME_CONFIG.bird.scale);
    this.bird.play('bird1-1-fly');
    
    this.tweens.add({
      targets: this.bird,
      y: birdY + 20,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createUI() {
    const centerX = GAME_CONFIG.width / 2;
    
    this.titleText = TextureOptimizer.createCrispText(this, centerX, 100, 'FLAPPY BIRD', {
      fontSize: GAME_CONFIG.ui.titleFontSize,
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.primary,
      stroke: COLORS.dark,
      strokeThickness: 8,
      align: 'center'
    });
    this.titleText.setOrigin(0.5);
    
    this.tweens.add({
      targets: this.titleText,
      scale: 1.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.startText = TextureOptimizer.createCrispText(this, centerX, GAME_CONFIG.height - 150, 'TAP TO START', {
      fontSize: GAME_CONFIG.ui.buttonFontSize,
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.secondary,
      stroke: COLORS.dark,
      strokeThickness: 6,
      align: 'center'
    });
    this.startText.setOrigin(0.5);
    
    this.tweens.add({
      targets: this.startText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.highScoreText = TextureOptimizer.createCrispText(this, centerX, 200, '', {
      fontSize: GAME_CONFIG.ui.textFontSize,
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.primary,
      stroke: COLORS.dark,
      strokeThickness: 4,
      align: 'center'
    });
    this.highScoreText.setOrigin(0.5);
    
    const userName = this.telegram.getUserName();
    if (userName !== 'Player') {
      this.welcomeText = TextureOptimizer.createCrispText(this, centerX, 250, `Welcome, ${userName}!`, {
        fontSize: '20px',
        fontFamily: GAME_CONFIG.ui.fontFamily,
        color: COLORS.primary,
        stroke: COLORS.dark,
        strokeThickness: 3,
        align: 'center'
      });
      this.welcomeText.setOrigin(0.5);
    }
  }

  setupInput() {
    this.input.on('pointerdown', this.startGame, this);
    
    this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    
    // Settings button
    this.createSettingsButton();
  }
  
  createSettingsButton() {
    const btnX = GAME_CONFIG.width - 50;
    const btnY = 50;
    
    const settingsBtn = this.add.text(btnX, btnY, '', {
      fontSize: '32px'
    });
    settingsBtn.setOrigin(0.5);
    settingsBtn.setInteractive({ useHandCursor: true });
    settingsBtn.setDepth(100);
    
    settingsBtn.on('pointerdown', (pointer) => {
      pointer.event.stopPropagation();
      this.telegram.hapticImpact('medium');
      this.scene.start(GAME_CONFIG.scenes.settings);
    });
    
    settingsBtn.on('pointerover', () => {
      this.tweens.add({
        targets: settingsBtn,
        scale: 1.2,
        duration: 100
      });
    });
    
    settingsBtn.on('pointerout', () => {
      this.tweens.add({
        targets: settingsBtn,
        scale: 1,
        duration: 100
      });
    });
  }

  async loadHighScore() {
    const highScore = await this.scoreManager.loadHighScore();
    this.highScoreText.setText(`High Score: ${highScore}`);
    this.game.registry.set('highScore', highScore);
  }

  startGame() {
    this.telegram.hapticImpact('light');
    this.scene.start(GAME_CONFIG.scenes.game);
  }

  update() {
    this.ground.tilePositionX += 2;
  }
}

export default StartScene;
