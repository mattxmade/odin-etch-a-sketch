generateGrid(8);

let colour = 'black';

function removeAll(grid) {
  const cells = document.querySelectorAll('.cell-block');

  // grid.remove();

  cells.forEach(cell => {
    cell.remove();
    grid.remove();
  });
  generateGrid(64);
}

let = false;

function generateGrid(cellNum = 16, grid = null, div = null) {

  // How big in pixels should the grid be?
  const gridSizeW = 485; // fixed
  const gridSizeH = 325; // fixed

  const parentContainer = document.querySelector('.eas-screen');

  grid = document.createElement('div');
  grid.classList.add('grid-container');
  parentContainer.appendChild(grid);

  // const grid = document.querySelector('.grid-container');

  grid.style.width = `${gridSizeW}px`;
  grid.style.height = `${gridSizeH}px`;

  // A div will act as a cell
  div = document.createElement('div');
  div.classList.add('cell-block');

  // How many cells should the grid contain? | User definded
  // let cellNum  = 8;

  // Calculate the size each cell will be
  let cellSizeW = gridSizeW / cellNum;
  let cellSizeH = gridSizeH / cellNum;

  // cellSize is set as newCell cell W x H
  div.style.width = `${cellSizeW}px`;
  div.style.height = `${cellSizeH}px`;

  // Number of cells needed to fill grid
  let newGrid  = cellNum * cellNum;

  // Array to store created cells
  const cellArray = [];

  // cellArray stores each new cell on each iteration
  for (let i = 0; i < newGrid; i++) {
    let newCell = div.cloneNode(true);
    grid.appendChild(newCell);
    cellArray.push(newCell);
  }

  const menuButtons = document.querySelectorAll('.icon-mask');

  menuButtons.forEach(button => {

    button.addEventListener('click', (e) => {
      const buttonID = e.target.id;

      switch(buttonID) {
        case 'grid-btn':
          console.log('grid button clicked');
          removeAll(grid);
          break;
        case 'eraser-btn':
          colour = 'transparent'
          console.log('eraser button clicked');
          break;
        case 'shape-btn':
          console.log('shaper button clicked');
          //toggle class shape
          quickToggle(cellArray);
          break;  
        case 'colour-btn':
          colour = getRandomColour();
          console.log('colour button clicked');
          break;      
      }

    });
  });

  gridListeners(grid, cellArray);
}

function quickToggle(array) {
  array.forEach(item => {
    item.classList.toggle('.toggleRoundness');
  })
}

function gridListeners(grid, cellArray) {

  // Listeners
  grid.addEventListener('mousedown', () => {
    grid.id = 'draw-start';
    drawCaller(grid, cellArray);
  });
  grid.addEventListener('mouseup', () => {
    grid.id = 'draw-stop';
    drawCaller(grid, cellArray);
  });

  // grid.addEventListener('mouseleave', () => {
  //   window.addEventListener('mouseup', () => {
  //     grid.id = 'draw-stop';
  //     drawCaller(grid, cellArray);
  //   });
  //   window.addEventListener('mousedown', () => {
  //     grid.addEventListener('mouseover', () => {
  //       grid.id = 'draw-start';
  //       drawCaller(grid, cellArray);
  //     });
  //   });
  // });

  // window.addEventListener('mousedown', () => {
  //   grid.addEventListener('mouseover', () => {
  //     grid.id = 'draw-start';
  //     drawCaller(grid, cellArray);
  //   });
  // });
  // window.addEventListener('mouseup', () => {
  //   grid.addEventListener('mouseover', () => {
  //     grid.id = 'draw-stop';
  //     drawCaller(grid, cellArray);
  //   });
  // });

}

function drawCaller(grid, cellArray) {

  // Target each cell of grid array
  cellArray.forEach((cell, index) => {
    grid.id === 'draw-start' 
    ? cell.addEventListener('mousemove', updateCell)
    : cell.removeEventListener('mousemove', updateCell);
  });

}

function updateCell(e) {
  // e.target.style.borderRadius = '50%';

  const newColour = getRandomColour();
  const saturate  = Math.round(getRandomNumber(100));
  
  // e.target.style.backgroundColor = newColour;
  // e.target.style.background = `linear-gradient(45deg, ${newColour}, red, red, blue, ${newColour})`;
  e.target.style.background = colour;
  // e.target.style.filter = `saturate(${saturate}%)`;
}

function getRandomColour() {
  const randomColours = ['red','green','blue'];
  
  let randomColour = randomColours[Math.floor
    (Math.random() * randomColours.length)];

  return randomColour;
}

function getRandomNumber(num) {
  let min = num - 200;
  let max = num * 2;
  return Math.random() * (max - min) + min;
}

const menuHamburger = document.getElementById('menu-btn');
const optionsBar = document.querySelector('.options-menu');

const animateBarTop = document.querySelector('.bar-top');
const animateBarBot = document.querySelector('.bar-bot');

menuHamburger.addEventListener('click', () => {
  optionsBar.classList.toggle('launch-menu');
  animateBarTop.classList.toggle('animate-bar-top');
  animateBarBot.classList.toggle('animate-bar-bot');
});

// menuHamburger.addEventListener('mouseenter', () => {
//   animateBarTop.classList.add('animate-bar-top');
//   animateBarBot.classList.add('animate-bar-bot');
// });

// menuHamburger.addEventListener('mouseleave', () => {
//   animateBarTop.classList.remove('animate-bar-top');
//   animateBarBot.classList.remove('animate-bar-bot');
// });