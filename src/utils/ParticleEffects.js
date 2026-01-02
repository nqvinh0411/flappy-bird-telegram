export class ParticleEffects {
  static createHitEffect(scene, x, y) {
    const particles = scene.add.particles(x, y, 'bird1-1', {
      speed: { min: 100, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: 300,
      quantity: 15,
      blendMode: 'ADD',
    });

    scene.time.delayedCall(700, () => {
      particles.destroy();
    });

    return particles;
  }

  static createScoreEffect(scene, x, y) {
    const particles = scene.add.particles(x, y, 'bird1-1', {
      speed: { min: 50, max: 100 },
      angle: { min: -90, max: -90 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 400,
      gravityY: -200,
      quantity: 5,
      blendMode: 'ADD',
      tint: 0xffff00,
    });

    scene.time.delayedCall(500, () => {
      particles.destroy();
    });

    return particles;
  }

  static createTrailEffect(scene, sprite) {
    const trail = scene.add.particles(0, 0, sprite.texture.key, {
      follow: sprite,
      quantity: 1,
      scale: { start: sprite.scale * 0.8, end: 0 },
      alpha: { start: 0.5, end: 0 },
      lifespan: 300,
      blendMode: 'ADD',
      frequency: 50,
    });

    return trail;
  }

  static screenShake(scene, intensity = 0.01, duration = 200) {
    scene.cameras.main.shake(duration, intensity);
  }

  static flashScreen(scene, color = 0xffffff, duration = 100) {
    scene.cameras.main.flash(duration, color >> 16, (color >> 8) & 0xff, color & 0xff);
  }
}

export default ParticleEffects;
