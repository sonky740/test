let myGamePiece;
const gameWrap = document.getElementById('gameWrap');

const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width =
      document.body.clientWidth > 480 ? 480 : document.body.clientWidth - 20;
    this.canvas.height = 270;
    this.ctx = this.canvas.getContext('2d');
    gameWrap.insertAdjacentElement('afterbegin', this.canvas);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.ctx = myGameArea.ctx;
  }

  update() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.update();
}

function startGame() {
  myGameArea.start();
  myGamePiece = new Component(30, 30, '#ff0000', 10, 120);
}
startGame();
