const canvas = document.querySelector('canvas');
let canvasWidth =
  window.innerWidth / 2 > 480 ? window.innerWidth / 2 : window.innerWidth - 20;
let canvasHeight =
  window.innerHeight / 2 > 480
    ? window.innerHeight / 2
    : window.innerHeight - 20;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext('2d');

let circlesCount = 20;
const circleArray = [];

const colorArray = ['#ff0000', '#ffff00', '#0000ff'];

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
};

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    if (this.radius > this.minRadius) this.radius -= 1;

    this.draw();
  }
}

const createCircle = () => {
  const radius = Math.floor(Math.random() * (16 - 10) + 10); // 10 ~ 15
  const x = Math.random() * (canvasWidth - radius * 2) + radius;
  const y = Math.random() * (canvasHeight - radius * 2) + radius;
  const dx = Math.random() - (3 - 2) + 2;
  const dy = Math.random() - (3 - 2) + 2;

  circleArray.push(new Circle(x, y, dx, dy, radius));
};

const init = () => {
  circleArray.length = 0;
  for (let i = 0; i < circlesCount; i++) {
    createCircle();
  }

  setInterval(() => {
    if (circleArray.length > 40) {
      circleArray.splice(0, 1);
    }

    createCircle();
  }, 1000);
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  circleArray.forEach((circle) => circle.update());
};

window.addEventListener(
  'resize',
  debounce(() => {
    canvasWidth =
      window.innerWidth / 2 > 480
        ? window.innerWidth / 2
        : window.innerWidth - 20;
    canvasHeight =
      window.innerHeight / 2 > 480
        ? window.innerHeight / 2
        : window.innerHeight - 20;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    init();
  })
);

init();
animate();
