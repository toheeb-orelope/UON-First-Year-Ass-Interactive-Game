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
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  } else if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  }
}

const player = document.querySelector("#player");
const playerMouth = player.querySelector(".mouth");
let playerTop = 0;
let playerLeft = 0;

setInterval(function () {
  if (downPressed) {
    let position = player.getBoundingClientRect();
    let bottomCollision = position.bottom + 1;

    let bLeftCollionDec = document.elementFromPoint(
      position.left,
      bottomCollision
    );
    let bRightCollionDec = document.elementFromPoint(
      position.right,
      bottomCollision
    );
    if (
      bLeftCollionDec.classList.contains(`wall`) == false &&
      bRightCollionDec.classList.contains(`wall`) == false
    ) {
      playerTop++;
      player.style.top = playerTop + "px";
    }
    // playerTop++;
    // player.style.top = playerTop + "px";
    playerMouth.classList = "down";
  } else if (upPressed) {
    let position = player.getBoundingClientRect();
    let topCollision = position.top - 1;

    let topLeftCollionDec = document.elementFromPoint(
      position.left,
      topCollision
    );
    let topRightCollionDec = document.elementFromPoint(
      position.right,
      topCollision
    );
    if (
      topLeftCollionDec.classList.contains(`wall`) == false &&
      topRightCollionDec.classList.contains(`wall`) == false
    ) {
      playerTop--;
      player.style.top = playerTop + "px";
    }
    // playerTop--;
    // player.style.top = playerTop + "px";
    playerMouth.classList = "up";
  } else if (leftPressed) {
    let position = player.getBoundingClientRect();
    let leftCollision = position.left - 1;

    let lLeftCollionDec = document.elementFromPoint(
      position.left,
      leftCollision
    );
    let lRightCollionDec = document.elementFromPoint(
      position.right,
      leftCollision
    );
    if (
      lLeftCollionDec.classList.contains(`wall`) == false &&
      lRightCollionDec.classList.contains(`wall`) == false
    ) {
      playerLeft--;
      player.style.left = playerLeft + "px";
    }
    // playerLeft--;
    // player.style.left = playerLeft + "px";
    playerMouth.classList = "left";
  } else if (rightPressed) {
    let position = player.getBoundingClientRect();
    let rightCollision = position.right + 1;

    let rLeftCollionDec = document.elementFromPoint(
      position.left,
      rightCollision
    );
    let rRightCollionDec = document.elementFromPoint(
      position.right,
      rightCollision
    );
    if (
      rLeftCollionDec.classList.contains(`wall`) == false &&
      rRightCollionDec.classList.contains(`wall`) == false
    ) {
      playerLeft++;
      player.style.left = playerLeft + "px";
    }
    // playerLeft++;
    // player.style.left = playerLeft + "px";
    playerMouth.classList = "right";
  }
}, 10);

// document.addEventListener('keydown', keyDown);
// document.addEventListener('keyup', keyUp);

// Start the game
const pressToStart = document.querySelector(".start");
function startTheGame() {
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  pressToStart.style.display = "none";
}

pressToStart.addEventListener("click", startTheGame);

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
