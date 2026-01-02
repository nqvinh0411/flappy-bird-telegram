export class TelegramAPI {
  constructor() {
    this.tg = window.Telegram?.WebApp;
    this.isAvailable = !!this.tg;
    this.cloudStorageAvailable = false;
    
    if (this.isAvailable) {
      this.tg.ready();
      this.tg.expand();
      
      // Check if CloudStorage is actually available (not just present)
      this.cloudStorageAvailable = !!(
        this.tg.CloudStorage && 
        typeof this.tg.CloudStorage.getItem === 'function' &&
        this.tg.version && 
        parseFloat(this.tg.version) >= 6.1
      );
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
    const tg = window.Telegram?.WebApp;
    if (tg && tg.HapticFeedback && typeof tg.HapticFeedback.impactOccurred === 'function') {
      try {
        tg.HapticFeedback.impactOccurred(style);
      } catch (e) {
        // Haptic not supported in this version
      }
    }
  }

  hapticNotification(type = 'success') {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.HapticFeedback && typeof tg.HapticFeedback.notificationOccurred === 'function') {
      try {
        tg.HapticFeedback.notificationOccurred(type);
      } catch (e) {
        // Haptic not supported in this version
      }
    }
  }

  hapticSelection() {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.HapticFeedback && typeof tg.HapticFeedback.selectionChanged === 'function') {
      try {
        tg.HapticFeedback.selectionChanged();
      } catch (e) {
        // Haptic not supported in this version
      }
    }
  }

  saveToCloud(key, value, callback) {
    if (this.cloudStorageAvailable) {
      try {
        this.tg.CloudStorage.setItem(key, value.toString(), callback);
      } catch (e) {
        localStorage.setItem(key, value.toString());
        if (callback) callback(null);
      }
    } else {
      localStorage.setItem(key, value.toString());
      if (callback) callback(null);
    }
  }

  loadFromCloud(key, callback) {
    if (this.cloudStorageAvailable) {
      try {
        this.tg.CloudStorage.getItem(key, callback);
      } catch (e) {
        const value = localStorage.getItem(key);
        if (callback) callback(null, value);
      }
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
