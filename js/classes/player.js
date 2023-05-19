//Playerclass
class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }) {
    super({ imageSrc, frameRate, scale })
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionBlocks = collisionBlocks;

    this.isJumping = false;
    this.isFalling = false;
    this.frameBuffer = 20;

  }


  update() {

    this.updateFrames()
    this.updateHitbox()

    //draws out the Image
    c.fillStyle = 'rgba(0,255,0,0.2'
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //draw out hit
    c.fillStyle = 'rgba(255,0,0,0.2'
    c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);


    this.draw();
    //x postiton and running speed
    this.position.x += this.velocity.x;
    this.checkForHorizontalCollisions();
    // y postion and gravity
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}
