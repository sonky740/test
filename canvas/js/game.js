const gameWrap = document.getElementById('gameWrap');

const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.ctx = this.canvas.getContext('2d');
    gameWrap.insertAdjacentElement('afterbegin', this.canvas);
  },
};

function startGame() {
  myGameArea.start();
}
startGame();
