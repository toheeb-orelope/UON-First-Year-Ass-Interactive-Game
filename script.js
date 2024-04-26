let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector("main");

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Randomise the Maze
// let newMaze = [];
// for (let i = 0; i < maze.length; i++) {
//   for (let j = 0; j < maze[i].length; j++) {
//     newMaze.push(maze[i][j]);
//   }
// }

// Enemy Generator
/*
function createEnemies() {
  let row = Math.floor(Math.random() * maze.length);
  let column = Math.floor(Math.random() * maze[row].length);

  if (maze[row][column] == 0) {
    maze[row][column] = 3;
  } else {
    createEnemies();
  }

  const player = document.querySelector("#player");
  let top = player.getBoundingClientRect().top;
  let left = player.getBoundingClientRect().left;
  let playerDirection = Math.ceil(Math.random() * 4);

  setInterval(function () {
    playerDirection = Math.ceil(Math.random() * 4);
  }, 100);
  setInterval(function () {
    function leftMovement() {
      left = left - 1;
    }
    function rightMovement() {
      left = left + 1;
    }
    function upMovement() {
      top = top - 1;
    }
    function downMovement() {
      top = top + 1;
    }

    if (playerDirection == 1) {
      upMovement();
    }
    if (playerDirection == 2) {
      downMovement();
    }
    if (playerDirection == 3) {
      rightMovement();
    }
    if (playerDirection == 4) {
      leftMovement();
    }

    player.style.left = left + "px";
    player.style.top = top + "px";
  }, 10);
}
*/

//Populates the maze in the HTML
for (let y of maze) {
  for (let x of y) {
    let block = document.createElement("div");
    block.classList.add("block");

    switch (x) {
      case 1:
        block.classList.add("wall");
        break;
      case 2:
        block.id = "player";
        let mouth = document.createElement("div");
        mouth.classList.add("mouth");
        block.appendChild(mouth);
        break;
      case 3:
        block.classList.add("enemy");
        break;
      default:
        block.classList.add("point");
        block.style.height = "1vh";
        block.style.width = "1vh";
    }

    main.appendChild(block);
  }
}

//Player movement
function keyUp(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
}

function keyDown(event) {
  if (event.key === "ArrowUp" || event.target.id == "ubttn") {
    upPressed = true;
  } else if (event.key === "ArrowDown" || event.target.id == "dbttn") {
    downPressed = true;
  } else if (event.key === "ArrowLeft" || event.target.id == "lbttn") {
    leftPressed = true;
  } else if (event.key === "ArrowRight" || event.target.id == "rbttn") {
    rightPressed = true;
  }
}

// global variable score
let score = 0;
// Point clearing function
function pointCheck() {
  const position = player.getBoundingClientRect();
  const points = document.querySelectorAll(".point");
  pointsDeduction = 0;

  for (let i = 0; i < points.length; i++) {
    let pointPosition = points[i].getBoundingClientRect();
    if (
      position.right > pointPosition.left &&
      position.left < pointPosition.right &&
      position.bottom > pointPosition.top &&
      position.top < pointPosition.bottom
    ) {
      points[i].classList.remove("point");
      score++;
    }
  }
}

// Score Increment
function increaseTheScore() {
  const countScore = document.querySelector(`.score p`);
  countScore.textContent = score;
}

//Live
function createLives() {
  let livesList = document.createElement(`li`);
  let unorderedList = document.querySelector(`.lives ul`);
  unorderedList.appendChild(livesList);
}

function killLives() {
  let liveList = document.querySelector(`.lives ul li`);
  liveList.parentNode.removeChild(li);
}

// interval for point and score
setInterval(function () {
  pointCheck();
  increaseTheScore();
}, 100);

const player = document.querySelector("#player");
const playerMouth = player.querySelector(".mouth");
let playerTop = 0;
let playerLeft = 0;
setInterval(function () {
  let position = player.getBoundingClientRect();
  if (downPressed) {
    let bottomCollision = position.bottom + 1;
    let bLeftCollisionDec = document.elementFromPoint(
      position.left,
      bottomCollision
    );
    let bRightCollisionDec = document.elementFromPoint(
      position.right,
      bottomCollision
    );

    if (
      !bLeftCollisionDec.classList.contains("wall") &&
      !bRightCollisionDec.classList.contains("wall")
    ) {
      playerTop++;
      player.style.top = playerTop + "px";
    }
    playerMouth.className = "down";
  } else if (upPressed) {
    let topCollision = position.top - 1;
    let topLeftCollisionDec = document.elementFromPoint(
      position.left,
      topCollision
    );
    let topRightCollisionDec = document.elementFromPoint(
      position.right,
      topCollision
    );

    if (
      !topLeftCollisionDec.classList.contains("wall") &&
      !topRightCollisionDec.classList.contains("wall")
    ) {
      playerTop--;
      player.style.top = playerTop + "px";
    }
    playerMouth.className = "up";
  } else if (leftPressed) {
    let leftCollision = position.left - 1;
    let lTopCollisionDec = document.elementFromPoint(
      leftCollision,
      position.top
    );
    let lBottomCollisionDec = document.elementFromPoint(
      leftCollision,
      position.bottom
    );
    if (
      !lTopCollisionDec.classList.contains("wall") &&
      !lBottomCollisionDec.classList.contains("wall")
    ) {
      playerLeft--;
      player.style.left = playerLeft + "px";
    }
    playerMouth.className = "left";
  } else if (rightPressed) {
    let rightCollision = position.right + 1;
    let rTopCollisionDec = document.elementFromPoint(
      rightCollision,
      position.top
    );
    let rBottomCollisionDec = document.elementFromPoint(
      rightCollision,
      position.bottom
    );

    if (
      !rTopCollisionDec.classList.contains("wall") &&
      !rBottomCollisionDec.classList.contains("wall")
    ) {
      playerLeft++;
      player.style.left = playerLeft + "px";
    }
    playerMouth.className = "right";
  }
}, 10);

// Start the game
const pressToStart = document.querySelector(".start");
function startTheGame() {
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  pressToStart.style.display = "none";

  // Screen Button Control
  document.querySelector("#ubttn").addEventListener("mousedown", function () {
    upPressed = true;
  });
  document.querySelector("#ubttn").addEventListener("mouseup", function () {
    upPressed = false;
  });
  document.querySelector("#dbttn").addEventListener("mousedown", function () {
    downPressed = true;
  });
  document.querySelector("#dbttn").addEventListener("mouseup", function () {
    downPressed = false;
  });
  document.querySelector("#lbttn").addEventListener("mousedown", function () {
    leftPressed = true;
  });
  document.querySelector("#lbttn").addEventListener("mouseup", function () {
    leftPressed = false;
  });
  document.querySelector("#rbttn").addEventListener("mousedown", function () {
    rightPressed = true;
  });
  document.querySelector("#rbttn").addEventListener("mouseup", function () {
    rightPressed = false;
  });
  createLives();
}
pressToStart.addEventListener("click", startTheGame);
