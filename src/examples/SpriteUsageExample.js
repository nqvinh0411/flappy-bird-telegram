import Phaser from 'phaser';
import SpriteLoader from '../utils/SpriteLoader.js';

export class SpriteUsageExample extends Phaser.Scene {
  constructor() {
    super({ key: 'SpriteUsageExample' });
  }

  preload() {
    console.log('Loading sprites...');
    
    SpriteLoader.loadBirds(this, 'style1');
    SpriteLoader.loadPipes(this, 'style1');
    SpriteLoader.loadGround(this, 'style1');
    SpriteLoader.loadBackgrounds(this, [0, 1, 2]);
  }

  create() {
    console.log('Creating animations and sprites...');
    
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
    
    this.ground = this.add.tileSprite(
      400, 
      570, 
      800, 
      64, 
      SpriteLoader.getGroundKey('style1'), 
      0
    );
    
    this.add.text(10, 10, 'Sprite Usage Example', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    
    this.add.text(10, 50, [
      'Bird: 16x16px scaled 3x',
      'Pipes: 128x213px scaled 1.5x',
      'Ground: TileSprite 512x64px',
      'Background: Full image'
    ], {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
    });
  }

  update() {
    this.ground.tilePositionX += 2;
  }
}

export class RandomBirdExample extends Phaser.Scene {
  constructor() {
    super({ key: 'RandomBirdExample' });
  }

  preload() {
    SpriteLoader.loadAll(this);
  }

  create() {
    SpriteLoader.createAllBirdAnimations(this);
    
    const bgKey = SpriteLoader.getRandomBackgroundKey();
    const bg = this.add.image(400, 300, bgKey);
    bg.setDisplaySize(800, 600);
    
    const birdKeys = SpriteLoader.getBirdKeys();
    const spacing = 800 / (birdKeys.length + 1);
    
    birdKeys.forEach((key, index) => {
      const bird = this.add.sprite(spacing * (index + 1), 300, key);
      const birdConfig = SpriteLoader.findBirdConfig(key);
      bird.play(birdConfig.animKey);
      bird.setScale(2);
    });
    
    this.add.text(400, 50, 'All Birds Demo', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
  }
}

export class PipeVariationsExample extends Phaser.Scene {
  constructor() {
    super({ key: 'PipeVariationsExample' });
  }

  preload() {
    SpriteLoader.loadPipes(this, 'style1');
    SpriteLoader.loadBackgrounds(this, [0]);
  }

  create() {
    const bg = this.add.image(400, 300, SpriteLoader.getBackgroundKey(0));
    bg.setDisplaySize(800, 600);
    
    const pipeCount = SpriteLoader.getPipeFrameCount('style1');
    const cols = 4;
    const rows = Math.ceil(pipeCount / cols);
    const spacingX = 800 / (cols + 1);
    const spacingY = 600 / (rows + 1);
    
    for (let i = 0; i < pipeCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = spacingX * (col + 1);
      const y = spacingY * (row + 1);
      
      const pipe = this.add.sprite(x, y, SpriteLoader.getPipeKey('style1'), i);
      pipe.setScale(0.5);
      
      this.add.text(x, y + 120, `Frame ${i}`, {
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 5, y: 2 }
      }).setOrigin(0.5);
    }
    
    this.add.text(400, 20, 'All Pipe Variations (12 frames)', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
  }
}
