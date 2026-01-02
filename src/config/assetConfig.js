export const SPRITE_CONFIG = {
  birds: {
    style1: [
      {
        key: 'bird1-1',
        path: 'assets/Player/StyleBird1/Bird1-1.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-1-fly'
      },
      {
        key: 'bird1-2',
        path: 'assets/Player/StyleBird1/Bird1-2.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-2-fly'
      },
      {
        key: 'bird1-3',
        path: 'assets/Player/StyleBird1/Bird1-3.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-3-fly'
      },
      {
        key: 'bird1-4',
        path: 'assets/Player/StyleBird1/Bird1-4.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-4-fly'
      },
      {
        key: 'bird1-5',
        path: 'assets/Player/StyleBird1/Bird1-5.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-5-fly'
      },
      {
        key: 'bird1-6',
        path: 'assets/Player/StyleBird1/Bird1-6.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-6-fly'
      },
      {
        key: 'bird1-7',
        path: 'assets/Player/StyleBird1/Bird1-7.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird1-7-fly'
      }
    ],
    style2: [
      {
        key: 'bird2-1',
        path: 'assets/Player/StyleBird2/Bird2-1.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-1-fly'
      },
      {
        key: 'bird2-2',
        path: 'assets/Player/StyleBird2/Bird2-2.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-2-fly'
      },
      {
        key: 'bird2-3',
        path: 'assets/Player/StyleBird2/Bird2-3.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-3-fly'
      },
      {
        key: 'bird2-4',
        path: 'assets/Player/StyleBird2/Bird2-4.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-4-fly'
      },
      {
        key: 'bird2-5',
        path: 'assets/Player/StyleBird2/Bird2-5.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-5-fly'
      },
      {
        key: 'bird2-6',
        path: 'assets/Player/StyleBird2/Bird2-6.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-6-fly'
      },
      {
        key: 'bird2-7',
        path: 'assets/Player/StyleBird2/Bird2-7.png',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
        frameCount: 4,
        animKey: 'bird2-7-fly'
      }
    ]
  },
  
  pipes: {
    style1: {
      key: 'pipes-1',
      path: 'assets/Style 1/Pipes-1.png',
      frameConfig: { frameWidth: 128, frameHeight: 213 },
      cols: 4,
      rows: 3,
      frameCount: 12,
      description: 'Grid 4x3, mỗi pipe có 2 phần (đầu + thân)'
    },
    style2: {
      key: 'pipes-2',
      path: 'assets/Style 2/Pipes-2.png',
      frameConfig: { frameWidth: 128, frameHeight: 128 },
      cols: 4,
      rows: 3,
      frameCount: 12,
      description: 'Grid 4x3, mỗi pipe có 2 phần (đầu + thân)'
    }
  },
  
  ground: {
    style1: {
      key: 'ground-1',
      path: 'assets/Style 1/Tiles-1.png',
      frameConfig: { frameWidth: 512, frameHeight: 64 },
      frameCount: 2,
      description: '2 styles: xanh lá và nâu'
    },
    style2: {
      key: 'ground-2',
      path: 'assets/Style 2/Tile-2.png',
      frameConfig: { frameWidth: 256, frameHeight: 64 },
      frameCount: 2,
      description: '2 styles ground tiles'
    }
  },
  
  tilesets: {
    style1: {
      key: 'tileset-1',
      path: 'assets/Style 1/Tileset-1.png',
      totalWidth: 1408,
      totalHeight: 320,
      description: 'Complex tileset với nhiều patterns khác nhau'
    },
    style2: {
      key: 'tileset-2',
      path: 'assets/Style 2/Tileset-2.png',
      totalWidth: 1408,
      totalHeight: 320,
      description: 'Complex tileset với nhiều patterns khác nhau'
    }
  },
  
  backgrounds: [
    { key: 'bg-1', path: 'assets/Background/background-1.png' },
    { key: 'bg-2', path: 'assets/Background/background-2.png' },
    { key: 'bg-3', path: 'assets/Background/background-3.png' },
    { key: 'bg-4', path: 'assets/Background/background-4.png' },
    { key: 'bg-5', path: 'assets/Background/background-5.png' },
    { key: 'bg-6', path: 'assets/Background/background-6.png' },
    { key: 'bg-7', path: 'assets/Background/background-7.png' }
  ]
};

export const ANIMATION_CONFIG = {
  bird: {
    frameRate: 10,
    repeat: -1
  }
};

export function loadAllSprites(scene) {
  SPRITE_CONFIG.birds.style1.forEach(bird => {
    scene.load.spritesheet(bird.key, bird.path, bird.frameConfig);
  });
  
  SPRITE_CONFIG.birds.style2.forEach(bird => {
    scene.load.spritesheet(bird.key, bird.path, bird.frameConfig);
  });
  
  scene.load.spritesheet(
    SPRITE_CONFIG.pipes.style1.key,
    SPRITE_CONFIG.pipes.style1.path,
    SPRITE_CONFIG.pipes.style1.frameConfig
  );
  
  scene.load.spritesheet(
    SPRITE_CONFIG.pipes.style2.key,
    SPRITE_CONFIG.pipes.style2.path,
    SPRITE_CONFIG.pipes.style2.frameConfig
  );
  
  scene.load.spritesheet(
    SPRITE_CONFIG.ground.style1.key,
    SPRITE_CONFIG.ground.style1.path,
    SPRITE_CONFIG.ground.style1.frameConfig
  );
  
  scene.load.spritesheet(
    SPRITE_CONFIG.ground.style2.key,
    SPRITE_CONFIG.ground.style2.path,
    SPRITE_CONFIG.ground.style2.frameConfig
  );
  
  scene.load.image(
    SPRITE_CONFIG.tilesets.style1.key,
    SPRITE_CONFIG.tilesets.style1.path
  );
  
  scene.load.image(
    SPRITE_CONFIG.tilesets.style2.key,
    SPRITE_CONFIG.tilesets.style2.path
  );
  
  SPRITE_CONFIG.backgrounds.forEach(bg => {
    scene.load.image(bg.key, bg.path);
  });
}

export function createBirdAnimations(scene) {
  SPRITE_CONFIG.birds.style1.forEach(bird => {
    scene.anims.create({
      key: bird.animKey,
      frames: scene.anims.generateFrameNumbers(bird.key, { start: 0, end: bird.frameCount - 1 }),
      frameRate: ANIMATION_CONFIG.bird.frameRate,
      repeat: ANIMATION_CONFIG.bird.repeat
    });
  });
  
  SPRITE_CONFIG.birds.style2.forEach(bird => {
    scene.anims.create({
      key: bird.animKey,
      frames: scene.anims.generateFrameNumbers(bird.key, { start: 0, end: bird.frameCount - 1 }),
      frameRate: ANIMATION_CONFIG.bird.frameRate,
      repeat: ANIMATION_CONFIG.bird.repeat
    });
  });
}
