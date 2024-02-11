const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Variables
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let velocityX = 0;
let velocityY = 0;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;
let score = 0;

// Game loop
function drawGame() {
    document.getElementById("restart").style.display = "none"; // This hides the restart button
  changeSnakePosition();
  let result = isGameOver();
  if(result) {
    return;
  }
  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  if (score > 5) {
    speed = 11;
  }
  if (score > 10) {
    speed = 15;
  }
  setTimeout(drawGame, 1000 / speed);
}

// Check if game over
function isGameOver() {
    let gameOver = false;
  
    if (velocityX === 0 && velocityY === 0) {
      return false;
    }
  
    // Walls
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }
  
    // Self
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
  
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        
        //Change button styling
        let btn = document.getElementById("restart");
        btn.style.display = "block";
        btn.style.position = 'absolute';
        btn.style.top = '80%';
        btn.style.left = '50%';
        btn.style.transform = 'translate(-50%, -50%)';
        btn.style.zIndex = '1';
      }
  
    return gameOver;
  }


// Game render
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); // add new head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the tail
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + velocityX;
  headY = headY + velocityY;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38) {
        if (velocityY == 1)
            return;
        velocityY = -1;
        velocityX = 0;
    }

    // down
    else if (event.keyCode == 40) {
        if (velocityY == -1)
            return;
        velocityY = 1;
        velocityX = 0;
    }

    // left
    else if (event.keyCode == 37) {
        if (velocityX == 1)
            return;
        velocityY = 0;
        velocityX = -1;
    }

    // right
    else if (event.keyCode == 39) {
        if (velocityX == -1)
            return;
        velocityY = 0;
        velocityX = 1;
    }
}

function SnakePart(x, y) {
this.x = x;
this.y = y;
}

drawGame();
