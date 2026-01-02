import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';

export class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DemoScene' });
  }

  preload() {
    console.log('🔄 Loading sprites with correct dimensions...');
    
    SpriteLoader.loadBirds(this, 'style1');
    SpriteLoader.loadPipes(this, 'style1');
    SpriteLoader.loadGround(this, 'style1');
    SpriteLoader.loadBackgrounds(this, [0]);
    
    console.log('✅ All sprites loaded!');
  }

  create() {
    console.log('🎮 Creating game objects...');
    
    SpriteLoader.createAllBirdAnimations(this, 'style1');
    
    const bg = this.add.image(400, 300, SpriteLoader.getBackgroundKey(0));
    bg.setDisplaySize(800, 600);
    
    const bird = this.add.sprite(100, 300, 'bird1-1');
    bird.play('bird1-1-fly');
    bird.setScale(3);
    
    const pipeFrame = SpriteLoader.getRandomPipeFrame('style1');
    const pipeTop = this.add.sprite(400, 150, SpriteLoader.getPipeKey('style1'), pipeFrame);
    pipeTop.setScale(1.5);
    pipeTop.setFlipY(true);
    
    const pipeBottom = this.add.sprite(400, 450, SpriteLoader.getPipeKey('style1'), pipeFrame);
    pipeBottom.setScale(1.5);
    
    this.ground = this.add.tileSprite(400, 570, 800, 64, SpriteLoader.getGroundKey('style1'), 0);
    
    this.add.text(400, 30, 'Sprite Configuration Demo', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5);
    
    this.add.text(10, 70, [
      '✅ Bird: 16x16px (scaled 3x)',
      '✅ Pipes: 128x213px (scaled 1.5x)',
      '✅ Ground: 512x64px (tileSprite)',
      '✅ Background: Full image',
      '',
      'All dimensions measured accurately!'
    ], {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 },
      lineSpacing: 5
    });
    
    console.log('✅ Demo scene created successfully!');
  }

  update() {
    this.ground.tilePositionX += 2;
  }
}

export default DemoScene;
