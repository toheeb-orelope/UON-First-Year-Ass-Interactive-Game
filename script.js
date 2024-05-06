// let upPressed = false;
// let downPressed = false;
// let leftPressed = false;
// let rightPressed = false;

// const main = document.querySelector("main");

// //Player = 2, Wall = 1, Enemy = 3, Point = 0
// let maze = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//   [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

// //Populates the maze in the HTML
// for (let y of maze) {
//   for (let x of y) {
//     let block = document.createElement("div");
//     block.classList.add("block");

//     switch (x) {
//       case 1:
//         block.classList.add("wall");
//         break;
//       case 2:
//         block.id = "player";
//         let mouth = document.createElement("div");
//         mouth.classList.add("mouth");
//         block.appendChild(mouth);
//         break;
//       case 3:
//         block.classList.add("enemy");
//         break;
//       default:
//         block.classList.add("point");
//         block.style.height = "1vh";
//         block.style.width = "1vh";
//     }

//     main.appendChild(block);
//   }
// }

// //Player movement
// function keyUp(event) {
//   if (event.key === "ArrowUp") {
//     upPressed = false;
//   } else if (event.key === "ArrowDown") {
//     downPressed = false;
//   } else if (event.key === "ArrowLeft") {
//     leftPressed = false;
//   } else if (event.key === "ArrowRight") {
//     rightPressed = false;
//   }
// }

// function keyDown(event) {
//   if (event.key === "ArrowUp" || event.target.id == "ubttn") {
//     upPressed = true;
//   } else if (event.key === "ArrowDown") {
//     downPressed = true;
//   } else if (event.key === "ArrowLeft") {
//     leftPressed = true;
//   } else if (event.key === "ArrowRight") {
//     rightPressed = true;
//   }
// }

// // global variable score
// let score = 0;
// // Point clearing function
// function pointCheck() {
//   const position = player.getBoundingClientRect();
//   const points = document.querySelectorAll(".point");
//   pointsDeduction = 0;

//   for (let i = 0; i < points.length; i++) {
//     let pointPosition = points[i].getBoundingClientRect();
//     if (
//       position.right > pointPosition.left &&
//       position.left < pointPosition.right &&
//       position.bottom > pointPosition.top &&
//       position.top < pointPosition.bottom
//     ) {
//       points[i].classList.remove("point");
//       score++;
//     }
//   }
// }

// // Score Increment
// function increaseTheScore() {
//   const countScore = document.querySelector(`.score p`);
//   countScore.textContent = score;
// }

// // interval for point and score
// setInterval(function () {
//   pointCheck();
//   increaseTheScore();
// }, 100);

// const player = document.querySelector("#player");
// const playerMouth = player.querySelector(".mouth");
// let playerTop = 0;
// let playerLeft = 0;
// setInterval(function () {
//   let position = player.getBoundingClientRect();
//   if (downPressed) {
//     let bottomCollision = position.bottom + 1;
//     let bLeftCollisionDec = document.elementFromPoint(
//       position.left,
//       bottomCollision
//     );
//     let bRightCollisionDec = document.elementFromPoint(
//       position.right,
//       bottomCollision
//     );

//     if (
//       !bLeftCollisionDec.classList.contains("wall") &&
//       !bRightCollisionDec.classList.contains("wall")
//     ) {
//       playerTop++;
//       player.style.top = playerTop + "px";
//     }
//     playerMouth.className = "down";
//   } else if (upPressed) {
//     let topCollision = position.top - 1;
//     let topLeftCollisionDec = document.elementFromPoint(
//       position.left,
//       topCollision
//     );
//     let topRightCollisionDec = document.elementFromPoint(
//       position.right,
//       topCollision
//     );

//     if (
//       !topLeftCollisionDec.classList.contains("wall") &&
//       !topRightCollisionDec.classList.contains("wall")
//     ) {
//       playerTop--;
//       player.style.top = playerTop + "px";
//     }
//     playerMouth.className = "up";
//   } else if (leftPressed) {
//     let leftCollision = position.left - 1;
//     let lTopCollisionDec = document.elementFromPoint(
//       leftCollision,
//       position.top
//     );
//     let lBottomCollisionDec = document.elementFromPoint(
//       leftCollision,
//       position.bottom
//     );
//     if (
//       !lTopCollisionDec.classList.contains("wall") &&
//       !lBottomCollisionDec.classList.contains("wall")
//     ) {
//       playerLeft--;
//       player.style.left = playerLeft + "px";
//     }
//     playerMouth.className = "left";
//   } else if (rightPressed) {
//     let rightCollision = position.right + 1;
//     let rTopCollisionDec = document.elementFromPoint(
//       rightCollision,
//       position.top
//     );
//     let rBottomCollisionDec = document.elementFromPoint(
//       rightCollision,
//       position.bottom
//     );

//     if (
//       !rTopCollisionDec.classList.contains("wall") &&
//       !rBottomCollisionDec.classList.contains("wall")
//     ) {
//       playerLeft++;
//       player.style.left = playerLeft + "px";
//     }
//     playerMouth.className = "right";
//   }
// }, 10);

// // Start the game
// const pressToStart = document.querySelector(".start");
// function startTheGame() {
//   document.addEventListener("keydown", keyDown);
//   document.addEventListener("keyup", keyUp);

//   pressToStart.style.display = "none";

//   // Screen Button Control
//   document.querySelector("#ubttn").addEventListener("mousedown", function () {
//     upPressed = true;
//   });
//   document.querySelector("#ubttn").addEventListener("mouseup", function () {
//     upPressed = false;
//   });
//   document.querySelector("#dbttn").addEventListener("mousedown", function () {
//     downPressed = true;
//   });
//   document.querySelector("#dbttn").addEventListener("mouseup", function () {
//     downPressed = false;
//   });
//   document.querySelector("#lbttn").addEventListener("mousedown", function () {
//     leftPressed = true;
//   });
//   document.querySelector("#lbttn").addEventListener("mouseup", function () {
//     leftPressed = false;
//   });
//   document.querySelector("#rbttn").addEventListener("mousedown", function () {
//     rightPressed = true;
//   });
//   document.querySelector("#rbttn").addEventListener("mouseup", function () {
//     rightPressed = false;
//   });
// }

// pressToStart.addEventListener("click", startTheGame);

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
  [1, 2, 5, 1, 0, 0, 0, 5, 0, 1],
  [1, 0, 0, 0, 5, 0, 0, 0, 1, 1],
  [1, 5, 0, 0, 0, 0, 0, 5, 5, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 5, 5, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 5, 0, 5, 1],
  [1, 5, 5, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//Randomise enemies
function createEnemies() {
  let row = Math.floor(Math.random() * maze.length);
  let cols = Math.floor(Math.random() * maze[row].length);
  if (maze[row][cols] == 0) {
    maze[row][cols] = 3;
  } else {
    createEnemies();
  }
}
createEnemies();
createEnemies();
createEnemies();

//Randomising maze to regenerate
function ranTheMaze() {
  const row = Math.floor(Math.random() * maze.length);
  const column = Math.floor(Math.random() * maze[row].length);

  if (maze[row][column] == 0) {
    maze[row][column] = 1;
  } else {
    ranTheMaze();
  }
}
ranTheMaze();
ranTheMaze();
ranTheMaze();

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

// // global variable score
// let score = 0;
// Point clearing function
// function pointCheck() {
//   const position = player.getBoundingClientRect();
//   const points = document.querySelectorAll(".point");
//   pointsDeduction = 0;

//   for (let i = 0; i < points.length; i++) {
//     let pointPosition = points[i].getBoundingClientRect();
//     if (
//       position.right > pointPosition.left &&
//       position.left < pointPosition.right &&
//       position.bottom > pointPosition.top &&
//       position.top < pointPosition.bottom
//     ) {
//       points[i].classList.remove("point");
//       score++;
//       increaseTheScore();

//       if (points.length === 0) {
//         checkLevelComplete();
//       }
//     }
//   }
// }

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
    }
  }

  if (points.length === 0) {
    checkLevelComplete();
  }
}

// Score Increment
function increaseTheScore() {
  const countScore = document.querySelector(`.score p`);
  countScore.textContent = score;
  nextLevel();
}

//Player movement
function keyUp(event) {
  upPressed = false;
  downPressed = false;
  leftPressed = false;
  rightPressed = false;

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

let pauseTheGame = false;

// // Function to pause the game for 5 seconds
// function gamePaused(duration, callback) {
//   pauseTheGame = true;
//   setTimeout(() => {
//     pauseTheGame = false;
//     if (callback) callback();
//   }, duration);
// }

let gameOver = false;
//Track player movement and collision with player
function isEnemyCollision() {
  const playerPosition = player.getBoundingClientRect();
  const enemies = document.querySelectorAll(".enemy");

  enemies.forEach((enemy) => {
    const enemyPosition = enemy.getBoundingClientRect();

    const collision =
      playerPosition.left < enemyPosition.right &&
      playerPosition.right > enemyPosition.left &&
      playerPosition.top < enemyPosition.bottom &&
      playerPosition.bottom > enemyPosition.top;

    if (collision) {
      if (lives > 1) {
        lives--;
        killLives();
        // gamePaused(10);
        return;
      } else {
        gameOver = true;
        player.classList.add("dead");
        gameOverMes();
      }
    }
  });
}

let currentLevel = 1;

function nextLevel() {
  // Increase the level number
  currentLevel++;

  // Increase the number of enemies by 1
  createEnemies(); // Adds one more enemy to the maze

  // Call the randomization function to regenerate the maze
  ranTheMaze();

  // Reset any necessary game states
  gameOver = false; // Reset game-over flag
  player.classList.remove("dead"); // Remove dead class if needed
}

function checkLevelComplete() {
  if (allPointsCollected()) {
    nextLevel(); // Move to the next level
  }
}

function allPointsCollected() {
  return document.querySelectorAll(".point").length === 0;
}

// Function to check for game pause
function isGamePause() {
  return pauseTheGame;
}

// Function to remove live if player collid with enemies
function killLives() {
  const life = document.querySelector(".lives ul li");
  if (life) {
    life.remove();
  }
}

//Game over
function gameOverMes() {
  const username = getUsername();
  if (username) {
    saveToLocalStorage(username, score);
  }

  alert("Game Over!");
  location.reload();

  document.removeEventListener("keydown", keyDown);
  document.removeEventListener("keyup", keyUp);
}

//Interval for enemy, point
setInterval(function () {
  if (pauseTheGame || gameOver) return;
  pointCheck();
  isEnemyCollision();
  // moveEnemies();
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
function getUsername() {
  username = window.prompt(`Create a username:`);

  return username;
}

function addUserToTheBoard(username, score) {
  const userList = document.createElement("li");
  const orderedList = document.querySelector("ol");
  if (orderedList) {
    orderedList.appendChild(userList);
    const userNode = document.createTextNode(`${username} : ${score}`);
    userList.appendChild(userNode);
  } else {
    console.error("Ordered list not found");
  }
}

function saveToLocalStorage(username, score) {
  let users = localStorage.getItem("scores");
  users = users ? users.split(",") : [];
  users.push(`${username}:${score}`);
  localStorage.setItem("scores", users.join(","));
}

function getFromLocalStorage() {
  const users = localStorage.getItem("scores");
  if (users) {
    const leadersScores = users.split(",").map((entry) => {
      const [username, score] = entry.split(`:`);
      return { username, score: parseInt(score, 10) };
    });

    leadersScores.sort((a, b) => b.score - a.score);

    const highestScorer = leadersScores.slice(0, 5);
    highestScorer.forEach((users) => {
      addUserToTheBoard(users.username, users.score);
    });
  }
}

window.addEventListener("load", getFromLocalStorage);
// localStorage.clear();
