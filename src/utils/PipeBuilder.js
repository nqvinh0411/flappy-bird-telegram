import Phaser from 'phaser';
import { SPRITE_CONFIG } from '../config/assetConfig.js';

/**
 * PipeBuilder - Tạo pipes từ Pipes-1.png
 * 
 * Sử dụng Graphics để vẽ pipes với màu sắc từ spritesheet
 * Đảm bảo physics hoạt động đúng
 */
export class PipeBuilder {
  static texturesCreated = {};
  static sessionColor = null; // Màu cố định cho cả phiên chơi
  
  static resetSession() {
    this.sessionColor = null;
    this.texturesCreated = {}; // Reset để tạo lại textures khi restart game
  }
  
  static loadPipeTextures(scene, theme = 'style1') {
    const pipeConfig = SPRITE_CONFIG.pipes[theme];
    if (!pipeConfig) return;
    scene.load.image(pipeConfig.key, pipeConfig.path);
  }
  
  static createPipeTextures(scene, theme = 'style1') {
    if (this.texturesCreated[theme]) return;
    
    const pipeConfig = SPRITE_CONFIG.pipes[theme];
    if (!pipeConfig) return;
    
    const sourceTexture = scene.textures.get(pipeConfig.key);
    if (!sourceTexture?.source?.[0]) {
      console.error('Pipe texture not loaded');
      return;
    }
    
    const source = sourceTexture.source[0].image;
    const { frameWidth, frameHeight, capHeight, cols, colors } = pipeConfig;
    const bodyHeight = frameHeight - capHeight * 2;
    
    for (let colorIndex = 0; colorIndex < colors; colorIndex++) {
      const col = colorIndex % cols;
      const row = Math.floor(colorIndex / cols);
      const startX = col * frameWidth;
      const startY = row * frameHeight;
      
      // CAP texture
      const capKey = `pipe-cap-${theme}-${colorIndex}`;
      if (!scene.textures.exists(capKey)) {
        const capCanvas = document.createElement('canvas');
        capCanvas.width = frameWidth;
        capCanvas.height = capHeight;
        const ctx = capCanvas.getContext('2d');
        ctx.drawImage(source, startX, startY, frameWidth, capHeight, 0, 0, frameWidth, capHeight);
        scene.textures.addCanvas(capKey, capCanvas);
      }
      
      // BODY texture
      const bodyKey = `pipe-body-${theme}-${colorIndex}`;
      if (!scene.textures.exists(bodyKey)) {
        const bodyCanvas = document.createElement('canvas');
        bodyCanvas.width = frameWidth;
        bodyCanvas.height = bodyHeight;
        const ctx = bodyCanvas.getContext('2d');
        ctx.drawImage(source, startX, startY + capHeight, frameWidth, bodyHeight, 0, 0, frameWidth, bodyHeight);
        scene.textures.addCanvas(bodyKey, bodyCanvas);
      }
    }
    
    this.texturesCreated[theme] = true;
    
    // Chọn màu cố định cho phiên chơi này
    if (this.sessionColor === null) {
      this.sessionColor = Phaser.Math.Between(0, colors - 1);
    }
  }
  
  static createPipePair(scene, x, gap, pipeGroup, speed, theme = 'style1', colorIndex = 'random') {
    this.createPipeTextures(scene, theme);
    
    const pipeConfig = SPRITE_CONFIG.pipes[theme];
    if (!pipeConfig) return null;
    
    const gameWidth = scene.game.config.width;
    const gameHeight = scene.game.config.height;
    const groundHeight = gameHeight * 0.12; // 12% chiều cao màn hình
    
    // Scale pipe width theo màn hình (khoảng 8% chiều rộng)
    const pipeWidth = Math.round(gameWidth * 0.13);
    const scale = pipeWidth / pipeConfig.frameWidth;
    const capDisplayHeight = pipeConfig.capHeight * scale;
    
    // Gap position - scale theo chiều cao màn hình
    const minGapY = gameHeight * 0.15;
    const maxGapY = gameHeight - groundHeight - gap - gameHeight * 0.15;
    const gapY = Phaser.Math.Between(minGapY, maxGapY);
    
    // Sử dụng màu cố định cho cả phiên chơi
    const finalColorIndex = (colorIndex === 'random') ? this.sessionColor : colorIndex;
    
    const capKey = `pipe-cap-${theme}-${finalColorIndex}`;
    const bodyKey = `pipe-body-${theme}-${finalColorIndex}`;
    
    if (!scene.textures.exists(capKey) || !scene.textures.exists(bodyKey)) {
      console.error('Pipe textures not found');
      return null;
    }
    
    const pipeId = Date.now() + Math.random();
    
    // ========== TOP PIPE ==========
    const topHeight = gapY;
    
    // Tạo body bằng image và scale chiều cao
    const topBody = scene.add.image(x, topHeight / 2, bodyKey);
    topBody.setDisplaySize(pipeWidth, topHeight - capDisplayHeight);
    topBody.setDepth(10);
    
    scene.physics.add.existing(topBody);
    topBody.body.allowGravity = false;
    topBody.body.immovable = true;
    topBody.body.setVelocityX(-speed);
    topBody.pipeId = pipeId;
    if (pipeGroup) pipeGroup.add(topBody);
    
    // Top cap
    const topCap = scene.add.image(x, topHeight - capDisplayHeight / 2, capKey);
    topCap.setScale(scale);
    topCap.setFlipY(true);
    topCap.setDepth(11);
    scene.physics.add.existing(topCap);
    topCap.body.allowGravity = false;
    topCap.body.setVelocityX(-speed);
    
    // ========== BOTTOM PIPE ==========
    const bottomStartY = gapY + gap;
    const bottomHeight = gameHeight - groundHeight - bottomStartY;
    
    // Bottom cap
    const bottomCap = scene.add.image(x, bottomStartY + capDisplayHeight / 2, capKey);
    bottomCap.setScale(scale);
    bottomCap.setDepth(11);
    scene.physics.add.existing(bottomCap);
    bottomCap.body.allowGravity = false;
    bottomCap.body.setVelocityX(-speed);
    
    // Bottom body
    const bottomBody = scene.add.image(x, bottomStartY + capDisplayHeight + (bottomHeight - capDisplayHeight) / 2, bodyKey);
    bottomBody.setDisplaySize(pipeWidth, bottomHeight - capDisplayHeight);
    bottomBody.setDepth(10);
    
    scene.physics.add.existing(bottomBody);
    bottomBody.body.allowGravity = false;
    bottomBody.body.immovable = true;
    bottomBody.body.setVelocityX(-speed);
    bottomBody.pipeId = pipeId;
    if (pipeGroup) pipeGroup.add(bottomBody);
    
    // Store references for cleanup
    topBody.cap = topCap;
    bottomBody.cap = bottomCap;
    
    return { pipeTop: topBody, pipeBottom: bottomBody, topCap, bottomCap };
  }
}

export default PipeBuilder;
