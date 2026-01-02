export class TextureOptimizer {
  static optimizeSprite(sprite, smooth = true) {
    if (!sprite || !sprite.texture) return;
    
    if (smooth) {
      sprite.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    } else {
      sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
    
    sprite.setOrigin(0.5);
  }

  static optimizeAllSprites(scene, smooth = true) {
    scene.children.list.forEach(child => {
      if (child.type === 'Sprite' || child.type === 'Image') {
        this.optimizeSprite(child, smooth);
      }
    });
  }

  static setTextureSmooth(scene, key, smooth = true) {
    const texture = scene.textures.get(key);
    if (texture) {
      if (smooth) {
        texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
      } else {
        texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
      }
    }
  }

  static optimizeText(textObject) {
    if (!textObject) return;
    
    textObject.setResolution(2);
    
    textObject.setStyle({
      ...textObject.style,
      resolution: 2,
    });
  }

  static createCrispText(scene, x, y, text, style = {}) {
    const defaultStyle = {
      fontSize: '32px',
      fontFamily: 'Arial Black',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      ...style,
    };

    const textObject = scene.add.text(x, y, text, defaultStyle);
    
    if (textObject.setResolution) {
      textObject.setResolution(2);
    }
    
    return textObject;
  }
}

export default TextureOptimizer;
