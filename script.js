const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const gridContainer = document.querySelector('#grid-container');
const resizeButton = document.querySelector('#resize-btn');

function randomRgb() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
  gridContainer.textContent = '';

  const squareSize = 100 / size;
  const totalSquares = size * size;

  for (let i = 0; i < totalSquares; i += 1) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.flex = `0 0 ${squareSize}%`;
    square.dataset.darkness = '0';

    square.addEventListener('mouseenter', () => {
      let darkness = Number(square.dataset.darkness);
      if (darkness < 1) {
        darkness = Math.min(1, darkness + 0.1);
      }

      square.dataset.darkness = darkness.toString();
      square.style.backgroundColor = randomRgb();
      square.style.opacity = darkness.toString();
    });

    gridContainer.appendChild(square);
  }
}

function promptForSize() {
  const input = prompt(`Enter the number of squares per side (1-${MAX_SIZE}):`, '16');

  if (input === null) {
    return;
  }

  const requestedSize = Number(input);
  if (!Number.isInteger(requestedSize) || requestedSize < 1 || requestedSize > MAX_SIZE) {
    alert(`Please enter a whole number between 1 and ${MAX_SIZE}.`);
    return;
  }

  createGrid(requestedSize);
}

resizeButton.addEventListener('click', promptForSize);
createGrid(DEFAULT_SIZE);
