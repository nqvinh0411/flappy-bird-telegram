# 🚀 Deployment Guide - Flappy Bird Telegram

## 📋 Pre-Deployment Checklist

- [x] Game fully functional locally
- [x] All sprites loaded correctly
- [x] Telegram integration working
- [x] High score saving/loading works
- [ ] Bot created on BotFather
- [ ] Production build tested
- [ ] Hosting platform selected

---

## 🤖 Step 1: Create Telegram Bot

### 1.1 Open BotFather
1. Open Telegram
2. Search for `@BotFather`
3. Start a conversation

### 1.2 Create New Bot
```
/newbot
```
- **Bot Name**: `Flappy Bird Game` (or your choice)
- **Bot Username**: `FlappyBirdGameBot` (must end with 'bot')
- **Save the Bot Token**: You'll receive something like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### 1.3 Create Mini App
```
/newapp
```
- Select your bot
- **App Name**: `flappybird` (short name, lowercase)
- **Description**: `🐦 Classic Flappy Bird game! Tap to fly and avoid pipes. Challenge your friends!`
- **Photo**: Upload a 640x360px screenshot
- **GIF**: Upload a demo GIF (optional)
- **Web App URL**: Leave empty for now (will update after deployment)

---

## 🏗️ Step 2: Build for Production

### 2.1 Update Configuration

Edit `src/utils/TelegramAPI.js` if needed:
```javascript
// Update bot username and app name
shareScore(score, botUsername = 'YOUR_BOT_USERNAME', appName = 'flappybird')
```

Edit `src/scenes/GameOverScene.js`:
```javascript
// No changes needed if using TelegramAPI utility
```

### 2.2 Build the Project
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### 2.3 Test Build Locally
```bash
npm run preview
```

Visit `http://localhost:4173` and test thoroughly.

---

## 🌐 Step 3: Deploy to Hosting

### Option A: Vercel (Recommended)

#### 3.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 3.2 Deploy
```bash
vercel
```

Follow prompts:
- **Project name**: `flappy-bird-telegram`
- **Framework**: Vite
- **Build command**: `npm run build`
- **Output directory**: `dist`

#### 3.3 Production Deploy
```bash
vercel --prod
```

You'll get a URL like: `https://flappy-bird-telegram.vercel.app`

---

### Option B: Netlify

#### 3.1 Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 3.2 Login
```bash
netlify login
```

#### 3.3 Deploy
```bash
netlify deploy --prod
```

Settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

You'll get a URL like: `https://flappy-bird-telegram.netlify.app`

---

### Option C: GitHub Pages

#### 3.1 Update `vite.config.js`
```javascript
export default {
  base: '/flappy-bird-telegram/',
  plugins: [react()]
}
```

#### 3.2 Add Deploy Script to `package.json`
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 3.3 Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### 3.4 Deploy
```bash
npm run deploy
```

URL: `https://YOUR_USERNAME.github.io/flappy-bird-telegram/`

---

## 🔗 Step 4: Update BotFather with URL

### 4.1 Set Web App URL
```
/myapps
```
- Select your app
- **Edit Web App URL**
- Enter your deployment URL (from Step 3)

### 4.2 Set Menu Button (Optional)
```
/setmenubutton
```
- Select your bot
- **Button text**: `🎮 Play Game`
- **Web App URL**: Your deployment URL

---

## ✅ Step 5: Testing on Telegram

### 5.1 Test on Desktop/Web
1. Open Telegram Web or Desktop
2. Search for your bot
3. Click "Menu" button or type `/start`
4. Game should open in fullscreen

### 5.2 Test on Mobile
1. Open Telegram on phone
2. Search for your bot
3. Tap the menu button (bottom right)
4. Game should open fullscreen

### 5.3 Test Features
- [ ] Game loads correctly
- [ ] Sprites display properly
- [ ] Touch controls work
- [ ] Score saves to CloudStorage
- [ ] Share button works
- [ ] Haptic feedback works (mobile)
- [ ] High score persists

---

## 🐛 Troubleshooting

### Issue: Game doesn't load
**Solution:**
- Check browser console for errors
- Verify all assets are in `public/assets/`
- Check network tab for 404 errors

### Issue: Telegram features don't work
**Solution:**
- Must test in actual Telegram app, not regular browser
- Check `window.Telegram.WebApp` is available
- Verify bot URL is correct in BotFather

### Issue: Sprites not loading
**Solution:**
- Verify asset paths are correct (use relative paths)
- Check `public/assets/` folder structure
- Rebuild and redeploy

### Issue: High score not saving
**Solution:**
- CloudStorage only works in Telegram
- Fallback to localStorage for testing
- Check console for errors

### Issue: Share button doesn't work
**Solution:**
- Update bot username in code
- Test on actual device (not emulator)
- Check Telegram app is up to date

---

## 📊 Performance Optimization

### Already Implemented
- ✅ Object pooling for pipes
- ✅ Sprite sheet optimization
- ✅ Efficient collision detection
- ✅ Proper cleanup on scene transitions

### Additional Optimizations (Optional)
```javascript
// In gameConfig.js, reduce physics iterations for mobile
physics: {
  arcade: {
    gravity: { y: 1200 },
    debug: false,
    fps: 60, // Add this
  }
}
```

---

## 🔒 Security Best Practices

### 1. Validate Telegram Data
```javascript
// Already handled by @telegram-apps/sdk
const user = window.Telegram.WebApp.initDataUnsafe.user;
```

### 2. Don't Store Sensitive Data
- High scores are public
- No personal data stored
- CloudStorage is user-specific

### 3. HTTPS Required
- All hosting platforms provide HTTPS
- Telegram requires HTTPS for Mini Apps

---

## 📱 Mobile Optimization

### Already Implemented
- ✅ Touch controls
- ✅ Viewport meta tags
- ✅ Fullscreen mode
- ✅ Haptic feedback
- ✅ Responsive scaling

### Test on Multiple Devices
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet
- [ ] Different screen sizes

---

## 🎨 Customization Before Deploy

### 1. Update Bot Info
```javascript
// src/utils/TelegramAPI.js
shareScore(score, botUsername = 'YOUR_BOT_USERNAME', appName = 'YOUR_APP_NAME')
```

### 2. Customize Colors
```javascript
// src/config/gameConfig.js
export const COLORS = {
  primary: '#ffffff',
  secondary: '#ffcc00',
  // ... customize as needed
}
```

### 3. Adjust Difficulty
```javascript
// src/config/gameConfig.js
export const GAME_CONFIG = {
  pipes: {
    gap: 180, // Increase for easier
    speed: 200, // Decrease for easier
  }
}
```

---

## 📈 Post-Launch

### Monitor Usage
- Check bot analytics in BotFather
- Monitor error logs
- Collect user feedback

### Updates
```bash
# Make changes
npm run build
vercel --prod  # or your hosting command
```

### Promote Your Game
- Share in Telegram groups
- Create demo video
- Add to bot directories

---

## 🎉 Launch Checklist

- [ ] Bot created and configured
- [ ] Game tested locally
- [ ] Production build created
- [ ] Deployed to hosting
- [ ] URL updated in BotFather
- [ ] Tested on Telegram Desktop
- [ ] Tested on Telegram Mobile
- [ ] All features working
- [ ] Performance is good
- [ ] Ready to share!

---

## 📞 Support

### Resources
- **Phaser Docs**: https://photonstorm.github.io/phaser3-docs/
- **Telegram Mini Apps**: https://core.telegram.org/bots/webapps
- **Vite Docs**: https://vitejs.dev/

### Common Commands
```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (Vercel)
vercel --prod

# Deploy (Netlify)
netlify deploy --prod
```

---

**🎮 Your Flappy Bird Telegram game is ready to launch! Good luck! 🚀**
