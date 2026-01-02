import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';
import GAME_CONFIG, { COLORS } from '../config/gameConfig.js';
import ParticleEffects from '../utils/ParticleEffects.js';
import TelegramAPI from '../utils/TelegramAPI.js';
import TextureOptimizer from '../utils/TextureOptimizer.js';
import PipeBuilder from '../utils/PipeBuilder.js';
import SettingsManager from '../utils/SettingsManager.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.scenes.game });
  }

  init() {
    this.score = 0;
    this.gameSpeed = GAME_CONFIG.pipes.speed;
    this.isGameOver = false;
    this.pipesPassed = new Set();
    this.telegram = new TelegramAPI();
    this.settingsManager = new SettingsManager();
    this.settings = this.settingsManager.getAllSettings();
    this.currentTheme = this.settings.theme || 'style1';
    this.currentPipeColor = this.settings.pipeColor || 'random';
    
    // Độ khó theo điểm
    this.currentDifficulty = this.getDifficultyLevel(0);
    this.currentGap = this.currentDifficulty.gap;
    this.gameSpeed = this.currentDifficulty.speed;
    
    // Reset pipe color cho phiên chơi mới
    PipeBuilder.resetSession();
  }

  preload() {
    SpriteLoader.loadBirds(this, 'style1');
    PipeBuilder.loadPipeTextures(this, this.currentTheme);
    SpriteLoader.loadBackgrounds(this, [0]);
    SpriteLoader.loadGround(this, this.currentTheme);
  }

  create() {
    SpriteLoader.createAllBirdAnimations(this, 'style1');
    PipeBuilder.createPipeTextures(this, this.currentTheme);
    
    this.createBackground();
    this.createGround();
    this.createBird();
    this.createPipes();
    this.createScore();
    this.setupInput();
    this.setupCollisions();
    this.startPipeSpawner();
    this.startDifficultyIncrease();
    
    TextureOptimizer.optimizeAllSprites(this, true);
  }

  createBackground() {
    this.bg = this.add.image(
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      SpriteLoader.getBackgroundKey(0)
    );
    this.bg.setDisplaySize(GAME_CONFIG.width, GAME_CONFIG.height);
  }

  createGround() {
    const groundY = GAME_CONFIG.height - GAME_CONFIG.ground.height / 2;
    const groundFrame = this.settings.groundStyle || 0;
    
    this.ground = this.add.tileSprite(
      GAME_CONFIG.width / 2,
      groundY,
      GAME_CONFIG.width,
      GAME_CONFIG.ground.height,
      SpriteLoader.getGroundKey(this.currentTheme),
      groundFrame
    );
    
    this.physics.add.existing(this.ground, true);
    this.ground.body.setSize(GAME_CONFIG.width, GAME_CONFIG.ground.height);
  }

  createBird() {
    this.bird = this.physics.add.sprite(
      GAME_CONFIG.bird.startX,
      GAME_CONFIG.bird.startY,
      'bird1-1'
    );
    
    this.bird.setScale(GAME_CONFIG.bird.scale);
    this.bird.play('bird1-1-fly');
    
    // Hitbox chính xác theo sprite (16x16 pixels)
    // Giảm 1-2px mỗi cạnh để tránh collision quá khắc nghiệt
    this.bird.body.setSize(15, 15);
    this.bird.body.setOffset(0.5, 0.5);
    
    this.bird.setCollideWorldBounds(false);
    this.bird.body.setMaxVelocity(0, GAME_CONFIG.physics.maxVelocity);
    
    // Thêm drag để chuyển động mượt hơn
    if (GAME_CONFIG.physics.drag) {
      this.bird.body.setDrag(0, GAME_CONFIG.physics.drag);
    }
  }

  createPipes() {
    // Lưu pipes trong array để quản lý
    this.pipes = [];
  }

  createScore() {
    this.scoreText = TextureOptimizer.createCrispText(
      this,
      GAME_CONFIG.width / 2,
      50,
      '0',
      {
        fontSize: GAME_CONFIG.score.fontSize,
        fontFamily: GAME_CONFIG.score.fontFamily,
        color: GAME_CONFIG.score.color,
        stroke: GAME_CONFIG.score.stroke,
        strokeThickness: GAME_CONFIG.score.strokeThickness,
      }
    );
    this.scoreText.setOrigin(0.5);
    this.scoreText.setDepth(100);
  }

  setupInput() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  setupCollisions() {
    // Collision với ground
    this.physics.add.overlap(
      this.bird,
      this.ground,
      this.hitGround,
      null,
      this
    );
  }
  
  addPipeCollision(pipe) {
    this.physics.add.overlap(
      this.bird,
      pipe,
      this.hitPipe,
      null,
      this
    );
  }

  startPipeSpawner() {
    this.updatePipeSpawner();
    
    this.time.delayedCall(500, () => {
      this.spawnPipe();
    });
  }
  
  updatePipeSpawner() {
    // Xóa timer cũ nếu có
    if (this.pipeTimer) {
      this.pipeTimer.remove();
    }
    
    // Tạo timer mới với interval hiện tại
    this.pipeTimer = this.time.addEvent({
      delay: this.currentDifficulty.spawnInterval,
      callback: this.spawnPipe,
      callbackScope: this,
      loop: true,
    });
  }

  startDifficultyIncrease() {
    this.difficultyTimer = this.time.addEvent({
      delay: GAME_CONFIG.difficulty.speedIncreaseInterval,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true,
    });
  }

  spawnPipe() {
    if (this.isGameOver) return;
    
    const pipeX = this.game.config.width + 50;
    
    const result = PipeBuilder.createPipePair(
      this,
      pipeX,
      this.currentGap, // Dùng gap động theo độ khó
      null,
      this.gameSpeed,
      this.currentTheme,
      this.currentPipeColor
    );
    
    if (result) {
      // Lưu pipes và caps
      this.pipes.push(result.pipeTop, result.pipeBottom);
      
      // Add collision cho bodies và caps
      this.addPipeCollision(result.pipeTop);
      this.addPipeCollision(result.pipeBottom);
      this.addPipeCollision(result.topCap);
      this.addPipeCollision(result.bottomCap);
    }
  }
  
  getDifficultyLevel(score) {
    if (!GAME_CONFIG.difficulty.scoreBasedDifficulty) {
      return {
        gap: GAME_CONFIG.pipes.gap,
        speed: GAME_CONFIG.pipes.speed,
        spawnInterval: GAME_CONFIG.pipes.spawnInterval
      };
    }
    
    const levels = GAME_CONFIG.difficulty.levels;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (score >= levels[i].minScore) {
        return levels[i];
      }
    }
    return levels[0];
  }

  flap() {
    if (this.isGameOver) return;
    
    this.bird.setVelocityY(GAME_CONFIG.physics.birdVelocity);
    this.telegram.hapticImpact('light');
  }

  hitPipe(bird, pipe) {
    if (!this.isGameOver) {
      ParticleEffects.createHitEffect(this, bird.x, bird.y);
      this.gameOver();
    }
  }

  hitGround(bird, ground) {
    if (!this.isGameOver) {
      ParticleEffects.createHitEffect(this, bird.x, bird.y);
      this.gameOver();
    }
  }

  gameOver() {
    this.isGameOver = true;
    
    this.physics.pause();
    this.bird.anims.stop();
    
    this.pipeTimer.destroy();
    this.difficultyTimer.destroy();
    
    this.telegram.hapticNotification('error');
    ParticleEffects.screenShake(this, 0.015, 300);
    
    this.time.delayedCall(500, () => {
      this.scene.start(GAME_CONFIG.scenes.gameOver, { score: this.score });
    });
  }

  increaseDifficulty() {
    if (this.gameSpeed < GAME_CONFIG.difficulty.maxSpeed) {
      this.gameSpeed += GAME_CONFIG.difficulty.speedIncreaseAmount;
      
      this.pipes.forEach(pipe => {
        if (pipe.body) {
          pipe.body.setVelocityX(-this.gameSpeed);
        }
        if (pipe.cap && pipe.cap.body) {
          pipe.cap.body.setVelocityX(-this.gameSpeed);
        }
      });
    }
  }

  updateScore() {
    this.pipes.forEach(pipe => {
      if (
        pipe.x + pipe.displayWidth / 2 < this.bird.x &&
        !this.pipesPassed.has(pipe.pipeId)
      ) {
        this.pipesPassed.add(pipe.pipeId);
        this.score += GAME_CONFIG.score.pointsPerPipe;
        this.scoreText.setText(this.score);
        
        // Cập nhật độ khó theo điểm
        this.updateDifficulty();
        
        this.telegram.hapticNotification('success');
        ParticleEffects.createScoreEffect(this, this.bird.x, this.bird.y);
        
        this.tweens.add({
          targets: this.scoreText,
          scale: 1.3,
          duration: 100,
          yoyo: true,
          ease: 'Back.easeOut',
        });
      }
    });
  }
  
  updateDifficulty() {
    if (!GAME_CONFIG.difficulty.scoreBasedDifficulty) return;
    
    const newDifficulty = this.getDifficultyLevel(this.score);
    
    // Nếu độ khó thay đổi
    if (newDifficulty.minScore !== this.currentDifficulty.minScore) {
      this.currentDifficulty = newDifficulty;
      this.currentGap = newDifficulty.gap;
      this.gameSpeed = newDifficulty.speed;
      
      // Cập nhật tốc độ pipes hiện có
      this.pipes.forEach(pipe => {
        if (pipe.body) {
          pipe.body.setVelocityX(-this.gameSpeed);
        }
        if (pipe.cap && pipe.cap.body) {
          pipe.cap.body.setVelocityX(-this.gameSpeed);
        }
      });
      
      // Cập nhật spawn interval
      this.updatePipeSpawner();
    }
  }

  cleanupPipes() {
    this.pipes = this.pipes.filter(pipe => {
      if (pipe.x < -100) {
        if (pipe.cap) {
          pipe.cap.destroy();
        }
        pipe.destroy();
        return false;
      }
      return true;
    });
  }

  updateBirdRotation() {
    if (this.isGameOver) return;
    
    const velocity = this.bird.body.velocity.y;
    const targetRotation = Phaser.Math.Clamp(
      velocity * 0.1,
      GAME_CONFIG.bird.minRotation,
      GAME_CONFIG.bird.maxRotation
    );
    
    this.bird.angle = Phaser.Math.Linear(
      this.bird.angle,
      targetRotation,
      0.1
    );
  }

  checkBirdBounds() {
    if (this.bird.y > GAME_CONFIG.height || this.bird.y < -50) {
      if (!this.isGameOver) {
        this.gameOver();
      }
    }
  }

  update() {
    if (this.isGameOver) return;
    
    this.ground.tilePositionX += this.gameSpeed * 0.016;
    
    this.updateBirdRotation();
    this.updateScore();
    this.cleanupPipes();
    this.checkBirdBounds();
  }
}

export default GameScene;
