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
    // Độ khó tăng theo điểm
    scoreBasedDifficulty: true,
    
    // Cấp độ khó theo điểm (score: {gap, speed})
    levels: [
      { minScore: 0, gap: 180, speed: 180, spawnInterval: 1800 },
      { minScore: 5, gap: 170, speed: 200, spawnInterval: 1700 },
      { minScore: 10, gap: 160, speed: 220, spawnInterval: 1600 },
      { minScore: 15, gap: 150, speed: 240, spawnInterval: 1500 },
      { minScore: 20, gap: 145, speed: 260, spawnInterval: 1450 },
      { minScore: 30, gap: 140, speed: 280, spawnInterval: 1400 },
      { minScore: 40, gap: 135, speed: 300, spawnInterval: 1350 },
      { minScore: 50, gap: 130, speed: 320, spawnInterval: 1300 },
    ],
    
    // Legacy settings (nếu không dùng score-based)
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
