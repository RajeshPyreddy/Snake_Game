// script.js

const board = document.getElementById('game-board');
const gridSize = 20; // 20x20 grid
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 }; // No movement initially
let newSegments = 0;

// Start the game
function main() {
  setInterval(gameLoop, 200); // Update every 200ms
  document.addEventListener('keydown', changeDirection);
  placeFood();
}

// Game loop
function gameLoop() {
  if (checkGameOver()) {
    alert('Game Over!');
    resetGame();
    return;
  }

  updateSnake();
  render();
}

// Update snake position
function updateSnake() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  // Add new head
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    newSegments++;
    placeFood();
  }

  // Remove tail if no new segments to add
  if (newSegments > 0) {
    newSegments--;
  } else {
    snake.pop();
  }
}

// Render the board
function render() {
  board.innerHTML = '';

  // Render the snake
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });

  // Render the food
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

// Change direction based on key press
function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

// Check if the game is over
function checkGameOver() {
  const head = snake[0];

  // Check wall collision
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    return true;
  }

  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Place food randomly
function placeFood() {
  food.x = Math.floor(Math.random() * gridSize) + 1;
  food.y = Math.floor(Math.random() * gridSize) + 1;
}

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  newSegments = 0;
  placeFood();
}

// Start the game
main();
