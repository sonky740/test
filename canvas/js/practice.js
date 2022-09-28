const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 그라디언트
const grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, 'blue');
grd.addColorStop(1, '#fff');

// 사각형
ctx.beginPath();
ctx.fillStyle = grd;
ctx.fillRect(0, 0, 200, 200);

// 라인
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.strokeStyle = '#111';
ctx.stroke();

// 그라디언트
const grdCircle = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
grdCircle.addColorStop(0, '#ff0000');
grdCircle.addColorStop(1, '#fff');

// 원
ctx.beginPath();
ctx.arc(100, 100, 100, 0, 360);
ctx.fillStyle = grdCircle;
ctx.fill();

// 텍스트
ctx.beginPath();
ctx.font = '20px Comic Sans MS';
ctx.fillStyle = '#ffff00';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.fillText('Hello', canvas.width / 2, canvas.height / 2);
