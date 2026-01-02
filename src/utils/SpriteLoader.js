import { SPRITE_CONFIG, ANIMATION_CONFIG } from '../config/assetConfig.js';

export class SpriteLoader {
  static loadBirds(scene, style = 'style1') {
    const birds = SPRITE_CONFIG.birds[style];
    birds.forEach(bird => {
      scene.load.spritesheet(bird.key, bird.path, bird.frameConfig);
    });
  }

  static loadPipes(scene, style = 'style1') {
    const pipes = SPRITE_CONFIG.pipes[style];
    scene.load.spritesheet(pipes.key, pipes.path, pipes.frameConfig);
  }

  static loadGround(scene, style = 'style1') {
    const ground = SPRITE_CONFIG.ground[style];
    scene.load.spritesheet(ground.key, ground.path, ground.frameConfig);
  }

  static loadTileset(scene, style = 'style1') {
    const tileset = SPRITE_CONFIG.tilesets[style];
    scene.load.image(tileset.key, tileset.path);
  }

  static loadBackgrounds(scene, indices = null) {
    const backgrounds = indices 
      ? SPRITE_CONFIG.backgrounds.filter((_, i) => indices.includes(i))
      : SPRITE_CONFIG.backgrounds;
    
    backgrounds.forEach(bg => {
      scene.load.image(bg.key, bg.path);
    });
  }

  static loadAll(scene) {
    this.loadBirds(scene, 'style1');
    this.loadBirds(scene, 'style2');
    this.loadPipes(scene, 'style1');
    this.loadPipes(scene, 'style2');
    this.loadGround(scene, 'style1');
    this.loadGround(scene, 'style2');
    this.loadTileset(scene, 'style1');
    this.loadTileset(scene, 'style2');
    this.loadBackgrounds(scene);
  }

  static createBirdAnimation(scene, birdKey, animKey) {
    const bird = this.findBirdConfig(birdKey);
    if (!bird) {
      console.warn(`Bird config not found for key: ${birdKey}`);
      return;
    }

    scene.anims.create({
      key: animKey || bird.animKey,
      frames: scene.anims.generateFrameNumbers(bird.key, { 
        start: 0, 
        end: bird.frameCount - 1 
      }),
      frameRate: ANIMATION_CONFIG.bird.frameRate,
      repeat: ANIMATION_CONFIG.bird.repeat
    });
  }

  static createAllBirdAnimations(scene, style = null) {
    const styles = style ? [style] : ['style1', 'style2'];
    
    styles.forEach(s => {
      SPRITE_CONFIG.birds[s].forEach(bird => {
        this.createBirdAnimation(scene, bird.key, bird.animKey);
      });
    });
  }

  static findBirdConfig(birdKey) {
    for (const style of ['style1', 'style2']) {
      const bird = SPRITE_CONFIG.birds[style].find(b => b.key === birdKey);
      if (bird) return bird;
    }
    return null;
  }

  static getBirdKeys(style = null) {
    if (style) {
      return SPRITE_CONFIG.birds[style].map(b => b.key);
    }
    return [
      ...SPRITE_CONFIG.birds.style1.map(b => b.key),
      ...SPRITE_CONFIG.birds.style2.map(b => b.key)
    ];
  }

  static getRandomBirdKey(style = null) {
    const keys = this.getBirdKeys(style);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  static getBackgroundKey(index) {
    if (index < 0 || index >= SPRITE_CONFIG.backgrounds.length) {
      console.warn(`Background index ${index} out of range`);
      return SPRITE_CONFIG.backgrounds[0].key;
    }
    return SPRITE_CONFIG.backgrounds[index].key;
  }

  static getRandomBackgroundKey() {
    const bg = SPRITE_CONFIG.backgrounds[
      Math.floor(Math.random() * SPRITE_CONFIG.backgrounds.length)
    ];
    return bg.key;
  }

  static getPipeKey(style = 'style1') {
    return SPRITE_CONFIG.pipes[style].key;
  }

  static getGroundKey(style = 'style1') {
    return SPRITE_CONFIG.ground[style].key;
  }

  static getPipeFrameCount(style = 'style1') {
    return SPRITE_CONFIG.pipes[style].frameCount;
  }

  static getRandomPipeFrame(style = 'style1') {
    const count = this.getPipeFrameCount(style);
    return Math.floor(Math.random() * count);
  }
}

export default SpriteLoader;
