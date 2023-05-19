const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = 'white';
    c.fillRect(10,10, canvas.width, canvas.height);
})

canvas.width = 1024;
canvas.height = 576;
const scaledCanvs = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const collisionBlocks = [];

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

/*  //y is row index, x is the column index
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});  */

console.log(platformCollisions2D);

let gravity = 0.5;
let runningSpeed = 5;

////Movement///
const keys = {
  w: {
    isPressed: false,
  },
  a: {
    isPressed: false,
  },
  s: {
    isPressed: false,
  },
  d: {
    isPressed: false,
  },
};

//moveRight
function moveRight() {
  if (player.velocity.x < 1) {
    player.velocity.x = 1;
  } else if (player.velocity.x < runningSpeed) {
    player.velocity.x += 0.25;
  }
  console.log(player.velocity.x);
}

//moveLeft
function moveLeft() {
  if (player.velocity.x > -Math.abs(runningSpeed)) {
    if (player.velocity.x > -1) {
      player.velocity.x = -1;
    } else {
      player.velocity.x -= 0.25;
    }
  }
}

//moveUp
function moveUp() {
  if (!player.isJumping) {
    player.isJumping = true;
    player.velocity.y += -15;
  }
}

function stopMovement() {
  player.velocity.x = 0;
}

//Player
const player = new Player({
  position: {
    x: 0,
    y: 0,
  },
  collisionBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);

  //Background
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  //sprite loading
  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvs.height);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  //Player
  player.update();

  if (keys.d.isPressed) moveRight();
  else if (keys.a.isPressed) moveLeft();
  if (keys.w.isPressed) moveUp();
  c.restore();
}

animate();

//Controlls
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keys.w.isPressed = true;
      break;
    case "a":
      keys.a.isPressed = true;
      break;
    case "s":
      keys.s.isPressed = true;
      break;
    case "d":
      keys.d.isPressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.isPressed = false;
      player.isJumping = false;
      break;
    case "a":
      keys.a.isPressed = false;
      player.velocity.x = 0;
      break;
    case "s":
      keys.s.isPressed = false;
      break;
    case "d":
      keys.d.isPressed = false;
      player.velocity.x = 0;
      break;
  }
});
