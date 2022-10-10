class Panel {
  constructor() {
    this.scale = 0;
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, .7)';
    context.fillRect(oX - 150, oY - 150, 300, 300);

    context.fillStyle = '#fff';
    if (selectedBox) {
      context.fillText(selectedBox.index, oX, oY);
    }
  }
}
