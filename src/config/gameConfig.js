export const GAME_CONFIG = {
  width: 800,
  height: 600,
  
  physics: {
    gravity: 1000, // Giảm gravity để bay mượt hơn
    birdVelocity: -350, // Giảm lực nhảy để kiểm soát tốt hơn
    maxVelocity: 500, // Giảm tốc độ rơi tối đa
    drag: 0.98, // Thêm drag để chuyển động mượt hơn
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
    gap: 140, // Giảm gap mặc định
    minGapY: 100,
    maxGapY: 400,
    spawnDistance: 300,
    speed: 220, // Tăng tốc độ mặc định
    spawnInterval: 1400, // Giảm thời gian spawn
  },
  
  ground: {
    height: 64,
    speed: 200,
  },
  
  difficulty: {
    // Độ khó tăng theo điểm - KHÓ HƠN & RANDOM HƠN
    scoreBasedDifficulty: true,
    
    // Cấp độ khó theo điểm - Gap nhỏ hơn, tốc độ nhanh hơn
    levels: [
      { minScore: 0, gap: 140, speed: 220, spawnInterval: 1400, gapVariation: 15 },
      { minScore: 3, gap: 135, speed: 240, spawnInterval: 1350, gapVariation: 15 },
      { minScore: 6, gap: 130, speed: 260, spawnInterval: 1300, gapVariation: 20 },
      { minScore: 10, gap: 125, speed: 280, spawnInterval: 1250, gapVariation: 20 },
      { minScore: 15, gap: 120, speed: 300, spawnInterval: 1200, gapVariation: 25 },
      { minScore: 20, gap: 118, speed: 320, spawnInterval: 1150, gapVariation: 25 },
      { minScore: 30, gap: 115, speed: 340, spawnInterval: 1100, gapVariation: 30 },
      { minScore: 40, gap: 112, speed: 360, spawnInterval: 1050, gapVariation: 30 },
      { minScore: 50, gap: 110, speed: 380, spawnInterval: 1000, gapVariation: 35 },
    ],
    
    // Biến động ngẫu nhiên cho vị trí pipes
    verticalVariation: 0.4, // 40% chiều cao có thể thay đổi
    
    // Legacy settings
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
