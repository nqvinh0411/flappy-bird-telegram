import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';
import GAME_CONFIG, { COLORS } from '../config/gameConfig.js';
import ParticleEffects from '../utils/ParticleEffects.js';
import TelegramAPI from '../utils/TelegramAPI.js';
import TextureOptimizer from '../utils/TextureOptimizer.js';

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
  }

  preload() {
    SpriteLoader.loadBirds(this, 'style1');
    SpriteLoader.loadPipes(this, 'style1');
    SpriteLoader.loadBackgrounds(this, [0]);
    SpriteLoader.loadGround(this, 'style1');
  }

  create() {
    SpriteLoader.createAllBirdAnimations(this, 'style1');
    
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
    
    this.ground = this.add.tileSprite(
      GAME_CONFIG.width / 2,
      groundY,
      GAME_CONFIG.width,
      GAME_CONFIG.ground.height,
      SpriteLoader.getGroundKey('style1'),
      0
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
    
    this.bird.body.setSize(14, 14);
    this.bird.body.setOffset(1, 1);
    
    this.bird.setCollideWorldBounds(false);
    this.bird.body.setMaxVelocity(0, GAME_CONFIG.physics.maxVelocity);
  }

  createPipes() {
    this.pipesGroup = this.physics.add.group();
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
    this.physics.add.overlap(
      this.bird,
      this.pipesGroup,
      this.hitPipe,
      null,
      this
    );
    
    this.physics.add.overlap(
      this.bird,
      this.ground,
      this.hitGround,
      null,
      this
    );
  }

  startPipeSpawner() {
    this.pipeTimer = this.time.addEvent({
      delay: GAME_CONFIG.pipes.spawnInterval,
      callback: this.spawnPipe,
      callbackScope: this,
      loop: true,
    });
    
    this.time.delayedCall(500, () => {
      this.spawnPipe();
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
    
    const gapY = Phaser.Math.Between(
      GAME_CONFIG.pipes.minGapY,
      GAME_CONFIG.pipes.maxGapY
    );
    
    const pipeFrame = SpriteLoader.getRandomPipeFrame('style1');
    
    const pipeTop = this.pipesGroup.create(
      GAME_CONFIG.width + 50,
      gapY - GAME_CONFIG.pipes.gap / 2,
      SpriteLoader.getPipeKey('style1'),
      pipeFrame
    );
    pipeTop.setScale(GAME_CONFIG.pipes.scale);
    pipeTop.setOrigin(0.5, 1);
    pipeTop.body.setSize(
      GAME_CONFIG.pipes.width * 0.8,
      GAME_CONFIG.pipes.height
    );
    pipeTop.body.allowGravity = false;
    pipeTop.setVelocityX(-this.gameSpeed);
    pipeTop.setImmovable(true);
    pipeTop.pipeId = Date.now();
    
    const pipeBottom = this.pipesGroup.create(
      GAME_CONFIG.width + 50,
      gapY + GAME_CONFIG.pipes.gap / 2,
      SpriteLoader.getPipeKey('style1'),
      pipeFrame
    );
    pipeBottom.setScale(GAME_CONFIG.pipes.scale);
    pipeBottom.setOrigin(0.5, 0);
    pipeBottom.setFlipY(true);
    pipeBottom.body.setSize(
      GAME_CONFIG.pipes.width * 0.8,
      GAME_CONFIG.pipes.height
    );
    pipeBottom.body.allowGravity = false;
    pipeBottom.setVelocityX(-this.gameSpeed);
    pipeBottom.setImmovable(true);
    pipeBottom.pipeId = pipeTop.pipeId;
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
      
      this.pipesGroup.children.entries.forEach(pipe => {
        pipe.setVelocityX(-this.gameSpeed);
      });
    }
  }

  updateScore() {
    this.pipesGroup.children.entries.forEach(pipe => {
      if (
        pipe.x + pipe.displayWidth / 2 < this.bird.x &&
        !this.pipesPassed.has(pipe.pipeId)
      ) {
        this.pipesPassed.add(pipe.pipeId);
        this.score += GAME_CONFIG.score.pointsPerPipe;
        this.scoreText.setText(this.score);
        
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

  cleanupPipes() {
    this.pipesGroup.children.entries.forEach(pipe => {
      if (pipe.x < -100) {
        pipe.destroy();
      }
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
