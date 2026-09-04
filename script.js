const board = document.querySelector('.board');
const blockheight = 50;
const blockwidth = 50;

// for blocks to fit into the board, we need to calculate how many blocks can fit in the width and height of the board  so clientWidth and clientHeight of the board is used to calculate the number of blocks that can fit in the width and height of the board. The Math.floor() function is used to round down the number of blocks to the nearest integer. This is important because we want to make sure that the blocks fit perfectly into the board without any overflow or gaps.

// and clientwidth and clientheight give the actual iwdth adn height of the board according to the screen size and the css applied to the board. so we can use these values to calculate how many blocks can fit in the width and height of the board.


const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);




// for(let i=0 ; i<rows*cols; i++){
//    const block = document.createElement('div');
//    block.classList.add("block");
//    board.appendChild(block);
// }


const blocks = [];
const snake = [{ x: 1, y: 3 },
];

let direction = 'right';

let intervalId = null;

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };


for (let row = 0; row < rows; row++) {
   for (let col = 0; col < cols; col++) {
      const block = document.createElement('div');
      block.classList.add("block");
      board.appendChild(block);
      block.innerText = `${row},${col}`;

      blocks[`${row},${col}`] = block;




   }
}


// this is function to project the snake on board

function renderSnake() {

   let head = null;
   blocks[`${food.x},${food.y}`].classList.add("food");
   if (direction === 'left') {
      head = { x: snake[0].x, y: snake[0].y - 1 };
   }

   else if (direction === 'right') {
      head = { x: snake[0].x, y: snake[0].y + 1 };
   }

   else if (direction === 'down') {
      head = { x: snake[0].x + 1, y: snake[0].y };
   }

   else if (direction === 'up') {
      head = { x: snake[0].x - 1, y: snake[0].y };
   }

   if (head.x < 0 || head.y < 0 || head.y >= cols || head.x >= rows) {
      alert("gameover");
      clearInterval(intervalId);

   }


   if (head.x === food.x && head.y === food.y) {
      blocks[`${food.x},${food.y}`].classList.remove('food');
      food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
      blocks[`${food.x},${food.y}`].classList.add('food');
     snake.unshift(head);


   }


   snake.forEach(segment => {
      blocks[`${segment.x},${segment.y}`].classList.remove('fill');
   });

   snake.unshift(head);
   snake.pop();

   snake.forEach(segment => {
      blocks[`${segment.x},${segment.y}`].classList.add('fill');


   })
}

intervalId = setInterval(() => {

   renderSnake();
}, 400);




// ArrowRight
// script.js:88 ArrowLeft
// script.js:88 ArrowDown
// script.js:88 ArrowUp

addEventListener("keydown", (event) => {
   if (event.key === "ArrowUp")
      direction = 'up';
   else if (event.key === "ArrowRight")
      direction = 'right';
   else if (event.key === "ArrowDown")
      direction = 'down';
   else if (event.key === "ArrowLeft")
      direction = 'left';
});