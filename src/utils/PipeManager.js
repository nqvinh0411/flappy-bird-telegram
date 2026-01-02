export class PipeManager {
  static loadPipeImages(scene) {
    // Load individual pipe images instead of sprite sheet
    // Pipes Style 1 - Load as single images
    scene.load.image('pipe-green', 'assets/Style 1/Pipes-1.png');
    scene.load.image('pipe-style2', 'assets/Style 2/Pipes-2.png');
  }

  static createPipePair(scene, x, gap, pipeGroup) {
    const pipeWidth = 52;
    const pipeHeight = 320;
    
    // Random gap position
    const minY = 100;
    const maxY = scene.game.config.height - gap - 150;
    const gapY = Phaser.Math.Between(minY, maxY);
    
    // Create top pipe
    const pipeTop = scene.add.rectangle(
      x,
      gapY - pipeHeight / 2,
      pipeWidth,
      pipeHeight,
      0x5cb85c
    );
    scene.physics.add.existing(pipeTop);
    pipeTop.body.allowGravity = false;
    pipeTop.body.setImmovable(true);
    pipeGroup.add(pipeTop);
    
    // Create bottom pipe
    const pipeBottom = scene.add.rectangle(
      x,
      gapY + gap + pipeHeight / 2,
      pipeWidth,
      pipeHeight,
      0x5cb85c
    );
    scene.physics.add.existing(pipeBottom);
    pipeBottom.body.allowGravity = false;
    pipeBottom.body.setImmovable(true);
    pipeGroup.add(pipeBottom);
    
    // Add pipe ID for scoring
    const pipeId = Date.now() + Math.random();
    pipeTop.pipeId = pipeId;
    pipeBottom.pipeId = pipeId;
    
    return { pipeTop, pipeBottom };
  }

  static createStyledPipePair(scene, x, gap, pipeGroup, style = 'green') {
    const pipeWidth = 52;
    const topHeight = 320;
    const bottomHeight = 320;
    
    // Random gap position
    const minY = 100;
    const maxY = scene.game.config.height - gap - 150;
    const gapY = Phaser.Math.Between(minY, maxY);
    
    // Create top pipe (flipped)
    const pipeTop = scene.add.sprite(x, gapY, 'pipe-green');
    pipeTop.setOrigin(0.5, 1);
    pipeTop.setScale(0.4);
    pipeTop.setFlipY(true);
    pipeTop.setDisplaySize(pipeWidth, topHeight);
    
    scene.physics.add.existing(pipeTop);
    pipeTop.body.allowGravity = false;
    pipeTop.body.setImmovable(true);
    pipeTop.body.setSize(pipeWidth, topHeight);
    pipeGroup.add(pipeTop);
    
    // Create bottom pipe
    const pipeBottom = scene.add.sprite(x, gapY + gap, 'pipe-green');
    pipeBottom.setOrigin(0.5, 0);
    pipeBottom.setScale(0.4);
    pipeBottom.setDisplaySize(pipeWidth, bottomHeight);
    
    scene.physics.add.existing(pipeBottom);
    pipeBottom.body.allowGravity = false;
    pipeBottom.body.setImmovable(true);
    pipeBottom.body.setSize(pipeWidth, bottomHeight);
    pipeGroup.add(pipeBottom);
    
    // Add pipe ID for scoring
    const pipeId = Date.now() + Math.random();
    pipeTop.pipeId = pipeId;
    pipeBottom.pipeId = pipeId;
    
    return { pipeTop, pipeBottom };
  }

  static createSimplePipePair(scene, x, gap, pipeGroup, speed) {
    const pipeWidth = 60;
    const gameHeight = scene.game.config.height;
    const groundHeight = 64;
    
    // Random gap position - đảm bảo gap nằm trong màn hình
    const minGapY = 150;
    const maxGapY = gameHeight - groundHeight - gap - 100;
    const gapY = Phaser.Math.Between(minGapY, maxGapY);
    
    console.log('Creating pipes - gameHeight:', gameHeight, 'gapY:', gapY, 'gap:', gap);
    
    // Create top pipe - từ đỉnh màn hình xuống đến gap
    const topHeight = gapY;
    const pipeTop = pipeGroup.create(
      x,
      topHeight / 2,  // center Y
      'pipe-rect'
    );
    
    // Set size and appearance
    pipeTop.setDisplaySize(pipeWidth, topHeight);
    pipeTop.setOrigin(0.5, 0.5);
    
    // Physics settings
    pipeTop.body.allowGravity = false;
    pipeTop.body.setImmovable(true);
    pipeTop.body.setVelocityX(-speed);
    pipeTop.setDepth(10);
    pipeTop.setVisible(true);
    pipeTop.setActive(true);
    
    console.log('Top pipe created at:', pipeTop.x, pipeTop.y, 'visible:', pipeTop.visible, 'body:', !!pipeTop.body);
    
    // Create bottom pipe - từ sau gap xuống đến ground
    const bottomStartY = gapY + gap;
    const bottomHeight = gameHeight - groundHeight - bottomStartY;
    const pipeBottom = pipeGroup.create(
      x,
      bottomStartY + bottomHeight / 2,  // center Y
      'pipe-rect'
    );
    
    // Set size and appearance
    pipeBottom.setDisplaySize(pipeWidth, bottomHeight);
    pipeBottom.setOrigin(0.5, 0.5);
    
    // Physics settings
    pipeBottom.body.allowGravity = false;
    pipeBottom.body.setImmovable(true);
    pipeBottom.body.setVelocityX(-speed);
    pipeBottom.setDepth(10);
    pipeBottom.setVisible(true);
    pipeBottom.setActive(true);
    
    console.log('Bottom pipe created at:', pipeBottom.x, pipeBottom.y, 'visible:', pipeBottom.visible, 'body:', !!pipeBottom.body);
    
    // Add pipe ID for scoring
    const pipeId = Date.now() + Math.random();
    pipeTop.pipeId = pipeId;
    pipeBottom.pipeId = pipeId;
    
    return { pipeTop, pipeBottom };
  }
}

export default PipeManager;
