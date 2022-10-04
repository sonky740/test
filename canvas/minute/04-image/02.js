'use strict';
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control');
const saveBtn = document.querySelector('.save-btn');
const resultImage = document.querySelector('.result-image');
let drawingMode = false;
let brush = 'color'; // 'color', 'image'
let colorVal = '#000';

const imgElem = new Image();
imgElem.src = '../images/ilbuni2.png';

function moveHandler(e) {
  if (!drawingMode) return;
  context.beginPath();
  switch (brush) {
    case 'color':
      context.arc(e.offsetX, e.offsetY, 10, 0, Math.PI * 2);
      context.fill();
      break;
    case 'image':
      context.drawImage(imgElem, e.offsetX, e.offsetY, 50, 50);
      break;
  }
}

function downHandler() {
  return (drawingMode = true);
}

function upHandler() {
  return (drawingMode = false);
}

function setColor(e) {
  brush = e.target.dataset.type;
  colorVal = e.target.dataset.color;
  context.fillStyle = colorVal;
}

function createImage() {
  const url = canvas.toDataURL('image/png');
  const imgElem = new Image();
  imgElem.src = url;
  resultImage.innerHTML = '';
  resultImage.appendChild(imgElem);
}

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);

control.addEventListener('click', setColor);
saveBtn.addEventListener('click', createImage);
