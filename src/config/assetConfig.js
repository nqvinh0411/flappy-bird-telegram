// Theme configuration
export const THEMES = {
  style1: {
    name: 'Classic',
    path: 'Style 1'
  },
  style2: {
    name: 'Dark',
    path: 'Style 2'
  },
  style3: {
    name: 'Retro',
    path: 'Style 3'
  }
};

// Pipe colors mapping (8 colors per theme)
export const PIPE_COLORS = {
  0: { name: 'Green', col: 0, row: 0 },
  1: { name: 'Orange', col: 1, row: 0 },
  2: { name: 'Red', col: 2, row: 0 },
  3: { name: 'Blue', col: 3, row: 0 },
  4: { name: 'Gray', col: 0, row: 1 },
  5: { name: 'Purple', col: 1, row: 1 },
  6: { name: 'Brown', col: 2, row: 1 },
  7: { name: 'Dark Orange', col: 3, row: 1 }
};

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
      imageWidth: 512,
      imageHeight: 640,
      cols: 4,
      rows: 2,
      frameWidth: 128,
      frameHeight: 320,
      capHeight: 48,
      bodyHeight: 224,
      colors: 8,
      description: '4 cols x 2 rows = 8 complete pipe styles (128x320 each)'
    },
    style2: {
      key: 'pipes-2',
      path: 'assets/Style 2/Pipes-2.png',
      imageWidth: 512,
      imageHeight: 384,
      cols: 4,
      rows: 2,
      frameWidth: 128,
      frameHeight: 192,
      capHeight: 32,
      bodyHeight: 128,
      colors: 8,
      description: '4 cols x 2 rows = 8 complete pipe styles'
    },
    style3: {
      key: 'pipes-3',
      path: 'assets/Style 3/Pipes-4.png',
      imageWidth: 512,
      imageHeight: 384,
      cols: 4,
      rows: 2,
      frameWidth: 128,
      frameHeight: 192,
      capHeight: 32,
      bodyHeight: 128,
      colors: 8,
      description: '4 cols x 2 rows = 8 complete pipe styles'
    }
  },
  
  ground: {
    style1: {
      key: 'ground-1',
      path: 'assets/Style 1/Tiles-1.png',
      frameConfig: { frameWidth: 512, frameHeight: 64 },
      frameCount: 2,
      styles: [
        { name: 'Green', frame: 0 },
        { name: 'Gray', frame: 1 }
      ],
      description: '2 styles: xanh lá và xám'
    },
    style2: {
      key: 'ground-2',
      path: 'assets/Style 2/Tiles-2.png',
      frameConfig: { frameWidth: 512, frameHeight: 64 },
      frameCount: 2,
      styles: [
        { name: 'Style 1', frame: 0 },
        { name: 'Style 2', frame: 1 }
      ],
      description: '2 styles ground'
    },
    style3: {
      key: 'ground-3',
      path: 'assets/Style 3/Tiles-3.png',
      frameConfig: { frameWidth: 512, frameHeight: 64 },
      frameCount: 2,
      styles: [
        { name: 'Style 1', frame: 0 },
        { name: 'Style 2', frame: 1 }
      ],
      description: '2 styles ground'
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
