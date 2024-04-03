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

function pointCheck() {
  const position = player.getBoundingClientRect();
  const point1 = document.querySelectorAll(".point")[0];
  const point2 = document.querySelectorAll(".point")[1];
  const point3 = document.querySelectorAll(".point")[2];
  const point4 = document.querySelectorAll(".point")[3];
  const point5 = document.querySelectorAll(".point")[4];

  const p1Position = point1.getBoundingClientRect();
  const p2Position = point2.getBoundingClientRect();
  const p3Position = point3.getBoundingClientRect();
  const p4Position = point4.getBoundingClientRect();
  const p5Position = point5.getBoundingClientRect();
  if (
    position.right > p1Position.left &&
    position.left < p1Position.right &&
    position.bottom > p1Position.top &&
    position.top < p1Position.bottom
  ) {
    point1.style.display = "none";
  }
  if (
    position.right > p2Position.left &&
    position.left < p2Position.right &&
    position.bottom > p2Position.top &&
    position.top < p2Position.bottom
  ) {
    point2.style.display = "none";
  }
  if (
    position.right > p3Position.left &&
    position.left < p3Position.right &&
    position.bottom > p3Position.top &&
    position.top < p3Position.bottom
  ) {
    point3.style.display = "none";
  }
  if (
    position.right > p4Position.left &&
    position.left < p4Position.right &&
    position.bottom > p4Position.top &&
    position.top < p4Position.bottom
  ) {
    point4.style.display = "none";
  }
  if (
    position.right > p5Position.left &&
    position.left < p5Position.right &&
    position.bottom > p5Position.top &&
    position.top < p5Position.bottom
  ) {
    point5.style.display = "none";
  }
}

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