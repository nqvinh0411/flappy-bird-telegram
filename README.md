# 🐦 Flappy Bird - Telegram Mini App

Một game Flappy Bird hoàn chỉnh được xây dựng như Telegram Mini App sử dụng Vite, React và Phaser.js.

## ✨ Tính năng

### Game Logic
- 🎮 Điều khiển chim bay bằng cách tap màn hình
- 🟢 Ống cống xuất hiện ngẫu nhiên với khoảng cách khác nhau
- 🏆 Hệ thống tính điểm khi vượt qua ống cống
- ⚡ Tốc độ game tăng dần theo thời gian (mỗi 10 giây)
- 💥 Phát hiện va chạm với ống cống và mặt đất

### Tích hợp Telegram
- 👤 Lấy thông tin người dùng (tên, ảnh đại diện) từ Telegram
- 📱 Tự động mở rộng toàn màn hình với `WebApp.expand()`
- 📳 Haptic Feedback (rung nhẹ):
  - Rung nhẹ khi chim đập cánh
  - Rung thông báo thành công khi ghi điểm
  - Rung thông báo lỗi khi va chạm
- 💾 Lưu high score vào CloudStorage của Telegram
- 📤 Chia sẻ điểm số với bạn bè qua Telegram

### Giao diện
- 🎨 Màn hình Start với tên người chơi
- 🎮 Màn hình Game với điểm số hiển thị
- 🏁 Màn hình Game Over với:
  - Điểm hiện tại
  - High score
  - Thông báo kỷ lục mới (nếu có)
  - Nút "Play Again"
  - Nút "Share to Friends"
  - Nút "Main Menu"

## 🚀 Cài đặt

### 1. Clone hoặc tải project

```bash
cd "d:/Flappy Bird Telegram"
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:5173`

### 4. Build cho production

```bash
npm run build
```

## 🤖 Cấu hình Telegram Bot

### Bước 1: Tạo Bot
1. Mở Telegram và tìm [@BotFather](https://t.me/BotFather)
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot (ví dụ: "Flappy Bird Game")
4. Đặt username cho bot (ví dụ: "FlappyBirdGameBot")
5. Lưu lại Bot Token

### Bước 2: Tạo Mini App
1. Gửi lệnh `/newapp` cho BotFather
2. Chọn bot vừa tạo
3. Đặt tên app (ví dụ: "flappybird")
4. Đặt mô tả ngắn
5. Upload ảnh (640x360 px)
6. Upload GIF demo (nếu có)
7. Nhập URL của app (sau khi deploy)

### Bước 3: Deploy App
Bạn có thể deploy lên:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Build và push thư mục `dist`
- **Telegram Mini App Hosting**: Sử dụng tính năng hosting của Telegram

### Bước 4: Cập nhật URL trong GameOverScene
Mở file `src/scenes/GameOverScene.js` và cập nhật:
```javascript
const botUsername = 'your_bot_username' // Thay bằng username bot của bạn
const appName = 'flappybird' // Thay bằng tên app của bạn
```

## 📱 Test trên Telegram

### Test trên Desktop/Web
1. Mở Telegram Web hoặc Desktop
2. Tìm bot của bạn
3. Gửi lệnh `/start`
4. Click vào nút "Play Game" hoặc menu

### Test trên Mobile
1. Mở Telegram trên điện thoại
2. Tìm bot của bạn
3. Click vào icon menu (3 chấm) → "Open App"

### Test Local (Development)
Để test local với Telegram:
1. Sử dụng ngrok hoặc localtunnel để expose localhost:
   ```bash
   npx localtunnel --port 5173
   ```
2. Lấy URL public và cập nhật vào BotFather
3. Mở app qua Telegram

## 🎮 Cách chơi

1. **Start**: Tap "TAP TO START" để bắt đầu
2. **Gameplay**: Tap màn hình để chim bay lên
3. **Mục tiêu**: Vượt qua các ống cống mà không va chạm
4. **Điểm số**: Mỗi ống cống vượt qua = 1 điểm
5. **Game Over**: Va chạm với ống cống hoặc mặt đất
6. **Share**: Chia sẻ điểm số với bạn bè

## 🛠️ Công nghệ sử dụng

- **Vite** - Build tool và dev server
- **React 18** - UI framework
- **Phaser 3** - Game engine
- **@telegram-apps/sdk** - Telegram Mini App SDK
- **Phaser.Physics.Arcade** - Physics engine cho va chạm

## 📚 Tài liệu tham khảo

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://phaser.io/examples)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Telegram CloudStorage API](https://core.telegram.org/bots/webapps#cloudstorage)
- [Telegram Games](https://core.telegram.org/bots/games)

## 🎯 Tính năng nâng cao có thể thêm

- [ ] Leaderboard toàn cầu
- [ ] Nhiều skin cho chim
- [ ] Power-ups (shield, slow motion, etc.)
- [ ] Âm thanh và nhạc nền
- [ ] Nhiều chế độ chơi (endless, time attack, etc.)
- [ ] Achievements system
- [ ] Daily challenges
- [ ] Multiplayer mode

## 📄 Cấu trúc thư mục

```
flappy-bird-telegram/
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main App component
│   ├── App.css            # App styles
│   ├── components/
│   │   └── Game.jsx       # Phaser game wrapper
│   └── scenes/
│       ├── StartScene.js  # Start screen
│       ├── GameScene.js   # Main game logic
│       └── GameOverScene.js # Game over screen
└── README.md              # This file
```

## 🐛 Troubleshooting

### Game không load
- Kiểm tra console để xem lỗi
- Đảm bảo đã chạy `npm install`
- Xóa `node_modules` và cài lại

### Telegram features không hoạt động
- Đảm bảo app đang chạy trong Telegram
- Kiểm tra `window.Telegram.WebApp` có tồn tại không
- Test trên Telegram thật, không phải browser thường

### High score không lưu
- CloudStorage chỉ hoạt động khi chạy trong Telegram
- Kiểm tra bot đã được cấu hình đúng chưa

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Console log trong browser
2. Telegram Web App documentation
3. Phaser 3 examples

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

**Chúc bạn chơi game vui vẻ! 🎮🐦**
