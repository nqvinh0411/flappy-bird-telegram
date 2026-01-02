export const GAME_CONFIG = {
  width: 800,
  height: 600,
  
  physics: {
    gravity: 1200,
    birdVelocity: -400,
    maxVelocity: 600,
  },
  
  bird: {
    startX: 100,
    startY: 300,
    scale: 3,
    rotationSpeed: 2.5,
    maxRotation: 20,
    minRotation: -90,
    animationFrameRate: 10,
  },
  
  pipes: {
    width: 128,
    height: 213,
    scale: 1.5,
    gap: 150,
    minGapY: 100,
    maxGapY: 400,
    spawnDistance: 300,
    speed: 200,
    spawnInterval: 1500,
  },
  
  ground: {
    height: 64,
    speed: 200,
  },
  
  difficulty: {
    speedIncreaseInterval: 10000,
    speedIncreaseAmount: 20,
    maxSpeed: 400,
  },
  
  score: {
    pointsPerPipe: 1,
    fontSize: '48px',
    fontFamily: 'Arial Black',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 6,
  },
  
  ui: {
    titleFontSize: '72px',
    subtitleFontSize: '32px',
    buttonFontSize: '28px',
    textFontSize: '24px',
    fontFamily: 'Arial Black',
  },
  
  scenes: {
    start: 'StartScene',
    game: 'GameScene',
    gameOver: 'GameOverScene',
    settings: 'SettingsScene',
  },
};

export const COLORS = {
  primary: '#ffffff',
  secondary: '#ffcc00',
  success: '#00ff00',
  danger: '#ff0000',
  dark: '#000000',
  background: '#4ec0ca',
};

export const TELEGRAM_CONFIG = {
  haptic: {
    enabled: true,
    impactStyle: 'light',
    notificationStyle: 'success',
  },
  storage: {
    highScoreKey: 'flappy_bird_high_score',
    settingsKey: 'flappy_bird_settings',
  },
};

export default GAME_CONFIG;
