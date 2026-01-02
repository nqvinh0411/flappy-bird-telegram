import TelegramAPI from './TelegramAPI.js';

export class ScoreManager {
  constructor() {
    this.telegram = new TelegramAPI();
    this.currentScore = 0;
    this.highScore = 0;
    this.storageKey = 'flappy_bird_high_score';
  }

  setScore(score) {
    this.currentScore = score;
  }

  getScore() {
    return this.currentScore;
  }

  resetScore() {
    this.currentScore = 0;
  }

  async loadHighScore() {
    return new Promise((resolve) => {
      this.telegram.loadFromCloud(this.storageKey, (error, value) => {
        if (!error && value) {
          this.highScore = parseInt(value, 10) || 0;
        } else {
          this.highScore = 0;
        }
        resolve(this.highScore);
      });
    });
  }

  async saveHighScore(score) {
    if (score > this.highScore) {
      this.highScore = score;
      
      return new Promise((resolve) => {
        this.telegram.saveToCloud(this.storageKey, score, (error) => {
          if (error) {
            console.error('Failed to save high score:', error);
            resolve(false);
          } else {
            console.log('High score saved:', score);
            resolve(true);
          }
        });
      });
    }
    return false;
  }

  getHighScore() {
    return this.highScore;
  }

  isNewRecord(score) {
    return score > this.highScore;
  }

  getMedal(score) {
    if (score >= 40) return 'platinum';
    if (score >= 30) return 'gold';
    if (score >= 20) return 'silver';
    if (score >= 10) return 'bronze';
    return null;
  }

  getScoreRating(score) {
    if (score >= 50) return 'LEGENDARY!';
    if (score >= 40) return 'AMAZING!';
    if (score >= 30) return 'EXCELLENT!';
    if (score >= 20) return 'GREAT!';
    if (score >= 10) return 'GOOD!';
    if (score >= 5) return 'NOT BAD!';
    return 'KEEP TRYING!';
  }
}

export default ScoreManager;
