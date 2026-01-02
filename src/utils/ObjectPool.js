export class ObjectPool {
  constructor(scene, classType, maxSize = 20) {
    this.scene = scene;
    this.classType = classType;
    this.maxSize = maxSize;
    this.pool = [];
    this.active = [];
  }

  get(x, y, texture, frame) {
    let object;

    if (this.pool.length > 0) {
      object = this.pool.pop();
      object.setActive(true);
      object.setVisible(true);
      object.setPosition(x, y);
      
      if (texture) {
        object.setTexture(texture, frame);
      }
    } else {
      object = this.scene.physics.add.sprite(x, y, texture, frame);
    }

    this.active.push(object);
    return object;
  }

  release(object) {
    const index = this.active.indexOf(object);
    
    if (index !== -1) {
      this.active.splice(index, 1);
      
      object.setActive(false);
      object.setVisible(false);
      object.body.setVelocity(0, 0);
      
      if (this.pool.length < this.maxSize) {
        this.pool.push(object);
      } else {
        object.destroy();
      }
    }
  }

  releaseAll() {
    while (this.active.length > 0) {
      this.release(this.active[0]);
    }
  }

  getActiveCount() {
    return this.active.length;
  }

  getPoolCount() {
    return this.pool.length;
  }

  destroy() {
    this.active.forEach(obj => obj.destroy());
    this.pool.forEach(obj => obj.destroy());
    this.active = [];
    this.pool = [];
  }
}

export default ObjectPool;
