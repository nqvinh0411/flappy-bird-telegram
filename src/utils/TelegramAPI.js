export class TelegramAPI {
  constructor() {
    this.tg = window.Telegram?.WebApp;
    this.isAvailable = !!this.tg;
    
    if (this.isAvailable) {
      this.tg.ready();
      this.tg.expand();
    }
  }

  getUser() {
    if (!this.isAvailable) return null;
    return this.tg.initDataUnsafe?.user || null;
  }

  getUserName() {
    const user = this.getUser();
    if (!user) return 'Player';
    return user.first_name || user.username || 'Player';
  }

  getUserPhoto() {
    const user = this.getUser();
    return user?.photo_url || null;
  }

  hapticImpact(style = 'light') {
    if (this.isAvailable && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.impactOccurred(style);
    }
  }

  hapticNotification(type = 'success') {
    if (this.isAvailable && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.notificationOccurred(type);
    }
  }

  hapticSelection() {
    if (this.isAvailable && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.selectionChanged();
    }
  }

  saveToCloud(key, value, callback) {
    if (this.isAvailable && this.tg.CloudStorage) {
      this.tg.CloudStorage.setItem(key, value.toString(), callback);
    } else {
      localStorage.setItem(key, value.toString());
      if (callback) callback(null);
    }
  }

  loadFromCloud(key, callback) {
    if (this.isAvailable && this.tg.CloudStorage) {
      this.tg.CloudStorage.getItem(key, callback);
    } else {
      const value = localStorage.getItem(key);
      if (callback) callback(null, value);
    }
  }

  shareScore(score, botUsername = 'your_bot_username', appName = 'flappybird') {
    if (!this.isAvailable) {
      if (navigator.share) {
        navigator.share({
          title: 'Flappy Bird Score',
          text: `🐦 I scored ${score} points in Flappy Bird!`,
        }).catch(err => console.log('Share failed:', err));
      }
      return;
    }

    const shareText = `🐦 I scored ${score} points in Flappy Bird! Can you beat my score? 🏆`;
    const shareUrl = `https://t.me/${botUsername}/${appName}`;
    
    if (this.tg.openTelegramLink) {
      this.tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
      );
    }
  }

  close() {
    if (this.isAvailable) {
      this.tg.close();
    }
  }

  showMainButton(text, callback) {
    if (this.isAvailable && this.tg.MainButton) {
      this.tg.MainButton.setText(text);
      this.tg.MainButton.show();
      this.tg.MainButton.onClick(callback);
    }
  }

  hideMainButton() {
    if (this.isAvailable && this.tg.MainButton) {
      this.tg.MainButton.hide();
    }
  }

  enableBackButton(callback) {
    if (this.isAvailable && this.tg.BackButton) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(callback);
    }
  }

  disableBackButton() {
    if (this.isAvailable && this.tg.BackButton) {
      this.tg.BackButton.hide();
    }
  }
}

export default TelegramAPI;
