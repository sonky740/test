let myGamePiece = {};
let myObstacles = [];
let myScore = {};
const gameWrap = document.getElementById('gameWrap');

const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width =
      document.body.clientWidth > 480 ? 480 : document.body.clientWidth - 20;
    this.canvas.height = 270;
    this.canvas.style.cursor = 'none';
    this.ctx = this.canvas.getContext('2d');
    gameWrap.insertAdjacentElement('afterbegin', this.canvas);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    this.keys = [];

    // key event
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  },
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop() {
    clearInterval(this.interval);
  },
};

class Component {
  constructor(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.type = type;
    this.text = 'SCORE: ';
    this.ctx = myGameArea.ctx;
  }

  update() {
    if (this.type === 'text') {
      this.ctx.font = `${this.width} ${this.height}`;
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(this.text, this.x, this.y);
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  crashWith(otherObj) {
    const myLeft = this.x;
    const myRight = this.x + this.width;
    const myTop = this.y;
    const myBottom = this.y + this.height;
    const otherLeft = otherObj.x;
    const otherRight = otherObj.x + otherObj.width;
    const otherTop = otherObj.y;
    const otherBottom = otherObj.y + otherObj.height;
    let crash = true;
    if (
      myBottom < otherTop ||
      myTop > otherBottom ||
      myRight < otherLeft ||
      myLeft > otherRight
    ) {
      crash = false;
    }
    return crash;
  }

  moveup() {
    this.speedY -= 1;
  }

  movedown() {
    this.speedY += 1;
  }

  moveleft() {
    this.speedX -= 1;
  }

  moveright() {
    this.speedX += 1;
  }

  stopMove() {
    this.speedX = 0;
    this.speedY = 0;
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function updateGameArea() {
  let x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (let i = 0; i < myObstacles.length; i++) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo === 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, 'green', x, 0));
    myObstacles.push(
      new Component(10, x - height - gap, 'green', x, height + gap)
    );
  }
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myObstacles.x += -1;
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys['ArrowLeft']) {
    myGamePiece.speedX = -1;
  }
  if (myGameArea.keys && myGameArea.keys['ArrowRight']) {
    myGamePiece.speedX = 1;
  }
  if (myGameArea.keys && myGameArea.keys['ArrowUp']) {
    myGamePiece.speedY = -1;
  }
  if (myGameArea.keys && myGameArea.keys['ArrowDown']) {
    myGamePiece.speedY = 1;
  }
  myGamePiece.newPos();
  myGamePiece.update();

  myScore.text = `SCORE: ${myGameArea.frameNo}`;
  myScore.update();
}

function startGame() {
  myGameArea.start();
  myGamePiece = new Component(30, 30, '#ff0000', 10, 120);
  myScore = new Component('20px', 'Concolas', '#222', 0, 20, 'text');
}
startGame();
