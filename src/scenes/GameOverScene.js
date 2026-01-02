import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';
import GAME_CONFIG, { COLORS } from '../config/gameConfig.js';
import TelegramAPI from '../utils/TelegramAPI.js';
import ScoreManager from '../utils/ScoreManager.js';
import TextureOptimizer from '../utils/TextureOptimizer.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.scenes.gameOver });
  }

  init(data) {
    this.telegram = new TelegramAPI();
    this.scoreManager = new ScoreManager();
    
    this.finalScore = data.score || 0;
    this.highScore = this.game.registry.get('highScore') || 0;
    this.isNewRecord = this.finalScore > this.highScore;
    
    if (this.isNewRecord) {
      this.highScore = this.finalScore;
      this.saveHighScore();
    }
  }

  preload() {
    SpriteLoader.loadBackgrounds(this, [0]);
    SpriteLoader.loadGround(this, 'style1');
  }

  create() {
    this.createBackground();
    this.createGround();
    this.createUI();
    this.setupInput();
    
    if (this.isNewRecord) {
      this.showNewRecordAnimation();
    }
    
    TextureOptimizer.optimizeAllSprites(this, true);
  }

  createBackground() {
    this.bg = this.add.image(
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      SpriteLoader.getBackgroundKey(0)
    );
    this.bg.setDisplaySize(GAME_CONFIG.width, GAME_CONFIG.height);
    this.bg.setAlpha(0.7);
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

  createUI() {
    const centerX = GAME_CONFIG.width / 2;
    
    this.gameOverText = TextureOptimizer.createCrispText(this, centerX, 100, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.danger,
      stroke: COLORS.dark,
      strokeThickness: 8,
      align: 'center'
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setAlpha(0);
    
    this.tweens.add({
      targets: this.gameOverText,
      alpha: 1,
      scale: { from: 0.5, to: 1 },
      duration: 500,
      ease: 'Back.easeOut'
    });
    
    const panelY = 250;
    const panelWidth = 400;
    const panelHeight = 200;
    
    const panel = this.add.rectangle(
      centerX,
      panelY,
      panelWidth,
      panelHeight,
      0x000000,
      0.7
    );
    panel.setStrokeStyle(4, 0xffffff);
    panel.setAlpha(0);
    
    this.tweens.add({
      targets: panel,
      alpha: 1,
      delay: 300,
      duration: 300
    });
    
    this.scoreLabel = TextureOptimizer.createCrispText(this, centerX, panelY - 60, 'SCORE', {
      fontSize: '24px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.primary,
      align: 'center'
    });
    this.scoreLabel.setOrigin(0.5);
    this.scoreLabel.setAlpha(0);
    
    this.scoreValue = TextureOptimizer.createCrispText(this, centerX, panelY - 20, this.finalScore.toString(), {
      fontSize: '48px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.secondary,
      stroke: COLORS.dark,
      strokeThickness: 6,
      align: 'center'
    });
    this.scoreValue.setOrigin(0.5);
    this.scoreValue.setAlpha(0);
    
    this.bestLabel = TextureOptimizer.createCrispText(this, centerX, panelY + 40, 'BEST', {
      fontSize: '20px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.primary,
      align: 'center'
    });
    this.bestLabel.setOrigin(0.5);
    this.bestLabel.setAlpha(0);
    
    this.bestValue = TextureOptimizer.createCrispText(this, centerX, panelY + 70, this.highScore.toString(), {
      fontSize: '32px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: this.isNewRecord ? COLORS.success : COLORS.primary,
      stroke: COLORS.dark,
      strokeThickness: 4,
      align: 'center'
    });
    this.bestValue.setOrigin(0.5);
    this.bestValue.setAlpha(0);
    
    this.tweens.add({
      targets: [this.scoreLabel, this.scoreValue, this.bestLabel, this.bestValue],
      alpha: 1,
      delay: 500,
      duration: 300,
      ease: 'Power2'
    });
    
    this.createButtons();
  }

  createButtons() {
    const centerX = GAME_CONFIG.width / 2;
    const buttonY = 480;
    const buttonSpacing = 120;
    
    this.playAgainButton = this.createButton(
      centerX - buttonSpacing,
      buttonY,
      'PLAY AGAIN',
      () => this.playAgain()
    );
    
    this.shareButton = this.createButton(
      centerX + buttonSpacing,
      buttonY,
      'SHARE',
      () => this.shareScore()
    );
    
    this.menuButton = this.createButton(
      centerX,
      buttonY + 70,
      'MENU',
      () => this.goToMenu()
    );
  }

  createButton(x, y, text, callback) {
    const button = this.add.container(x, y);
    button.setAlpha(0);
    
    const bg = this.add.rectangle(0, 0, 200, 50, 0xffffff, 0.2);
    bg.setStrokeStyle(3, 0xffffff);
    
    const label = TextureOptimizer.createCrispText(this, 0, 0, text, {
      fontSize: '20px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.primary,
      stroke: COLORS.dark,
      strokeThickness: 3,
      align: 'center'
    });
    label.setOrigin(0.5);
    
    button.add([bg, label]);
    button.setSize(200, 50);
    button.setInteractive({ useHandCursor: true });
    
    button.on('pointerdown', () => {
      this.telegram.hapticImpact('light');
      
      this.tweens.add({
        targets: button,
        scale: 0.9,
        duration: 100,
        yoyo: true,
        onComplete: callback
      });
    });
    
    button.on('pointerover', () => {
      bg.setFillStyle(0xffffff, 0.4);
      this.tweens.add({
        targets: button,
        scale: 1.1,
        duration: 100
      });
    });
    
    button.on('pointerout', () => {
      bg.setFillStyle(0xffffff, 0.2);
      this.tweens.add({
        targets: button,
        scale: 1,
        duration: 100
      });
    });
    
    this.tweens.add({
      targets: button,
      alpha: 1,
      delay: 800,
      duration: 300
    });
    
    return button;
  }

  showNewRecordAnimation() {
    const centerX = GAME_CONFIG.width / 2;
    
    const newRecordText = TextureOptimizer.createCrispText(this, centerX, 180, 'NEW RECORD!', {
      fontSize: '36px',
      fontFamily: GAME_CONFIG.ui.fontFamily,
      color: COLORS.success,
      stroke: COLORS.dark,
      strokeThickness: 6,
      align: 'center'
    });
    newRecordText.setOrigin(0.5);
    newRecordText.setAlpha(0);
    
    this.tweens.add({
      targets: newRecordText,
      alpha: 1,
      scale: { from: 0.5, to: 1.2 },
      delay: 600,
      duration: 400,
      ease: 'Back.easeOut'
    });
    
    this.tweens.add({
      targets: newRecordText,
      scale: 1.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.telegram.hapticNotification('success');
  }

  async saveHighScore() {
    await this.scoreManager.saveHighScore(this.highScore);
    this.game.registry.set('highScore', this.highScore);
  }

  shareScore() {
    this.telegram.shareScore(this.finalScore);
  }

  setupInput() {
    this.input.keyboard.on('keydown-SPACE', () => this.playAgain(), this);
  }

  playAgain() {
    this.scene.start(GAME_CONFIG.scenes.game);
  }

  goToMenu() {
    this.scene.start(GAME_CONFIG.scenes.start);
  }

  update() {
    this.ground.tilePositionX += 2;
  }
}

export default GameOverScene;
