let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let lives = 3;
let score = 0;

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

//Randomise enemies
function createEnemies() {
  let row = Math.floor(Math.random() * maze.length);
  let cols = Math.floor(Math.random() * maze[row].length);
  maze[row][cols] = 3;
}

let numEnemies = 0;
let maxEnemies = 0;

// Randomize the inner layers
for (let i = 2; i < 8; i++) {
  for (let j = 1; j < 9; j++) {
    if (i === 2 && j === 1) {
      // Ensure the starting point is always empty
      maze[i][j] = 0;
    } else {
      let random = Math.floor(Math.random() * 10);
      if (random < 7) {
        // 70% chance of being a point or empty space
        maze[i][j] = 0;
      } else if (random < 9 && numEnemies < maxEnemies) {
        // 20% chance of being an enemy, but only if we haven't reached the max number of enemies
        maze[i][j] = 3;
        numEnemies++;
      } else {
        // 10% chance of being a wall
        maze[i][j] = 1;
      }
    }
  }
}

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

function moveEnemies() {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 3) {
        // Move the enemy in a random direction (up, down, left, or right)
        let direction = Math.floor(Math.random() * 4);
        let newRow = i;
        let newCol = j;
        switch (direction) {
          case 0: // Up
            newRow = i - 1;
            break;
          case 1: // Down
            newRow = i + 1;
            break;
          case 2: // Left
            newCol = j - 1;
            break;
          case 3: // Right
            newCol = j + 1;
            break;
        }

        // Check for collision with the player
        if (
          newRow >= 0 &&
          newRow < maze.length &&
          newCol >= 0 &&
          newCol < maze[newRow].length
        ) {
          if (maze[newRow][newCol] === 2) {
            // Handle collision with the player
            console.log("Enemy collided with the player!");
          }
        }

        // Update the enemy's position in the maze
        maze[i][j] = 0;
        maze[newRow][newCol] = 3;
      }
    }
  }
}

// // global variable score
// let score = 0;
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
      increaseTheScore();
      if (points.length === 0) {
        nextLevel();
      }
    }
  }
}

// Score Increment
function increaseTheScore() {
  const countScore = document.querySelector(`.score p`);
  countScore.textContent = score;
  // if (score > level * pointCheck()) {
  //   nextLevel();
  // }
  // console.log(`q`);
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
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  } else if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  }
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
  moveEnemies();
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
    upPressed = true;
  });
  document.querySelector("#dbttn").addEventListener("mousedown", function () {
    downPressed = true;
  });
  document.querySelector("#dbttn").addEventListener("mouseup", function () {
    downPressed = true;
  });
  document.querySelector("#lbttn").addEventListener("mousedown", function () {
    leftPressed = true;
  });
  document.querySelector("#lbttn").addEventListener("mouseup", function () {
    leftPressed = true;
  });
  document.querySelector("#rbttn").addEventListener("mousedown", function () {
    rightPressed = true;
  });
  document.querySelector("#rbttn").addEventListener("mouseup", function () {
    rightPressed = true;
  });
  createLives();
  createLives();
  createLives();
}
pressToStart.addEventListener("click", startTheGame);

//Leader Board
let username;
function getUsername() {
  username = window.prompt(`Create a username:`);

  return username;
}

function addUserToTheBoard(username) {
  const userList = document.createElement(`li`);
  const orderedList = document.querySelector(`ol`);
  orderedList.appendChild(userList);

  const userNode = document.createTextNode(username);
  userList.appendChild(userNode);
}

function saveToLocalStorage() {
  localStorage.setItem(localStorage.length + 1, username);
}

function getFromLocalStorate() {
  let values = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    values.push(value);
  }

  for (let value of values) {
    addUserToTheBoard(value);
  }
}

const addToLeaderboard = document.querySelector(`leaderboard`);
function leaders() {
  const createUsername = getUsername();
  addUserToTheBoard(createUsername);
  saveToLocalStorage(createUsername);
}

leaders();
if (playerHasCompletedLevel) {
  nextLevel();
}
