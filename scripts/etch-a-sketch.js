let drawColour = 'black';
let lastColour = '';
let lastCellTotal = 0;

let zIndex = 9;

let cellShape = 0;

generateGrid(8);

function removeAll(cellNum) {
  const removeGrid = document.querySelector('.grid-container');
  const cells = document.querySelectorAll('.cell-block');

  cells.forEach(cell => {
    // cell.remove();
    // removeGrid.remove();
  });
  drawColour = getRandomColour();
  //isEven(zIndex) ? colour = 'white' : colour = 'black';
  generateGrid(cellNum);
}

// https://stackoverflow.com/a/6211660
function isEven(n) {
  return n % 2 == 0;
}

function isOdd(n) {
  return Math.abs(n % 2) == 1;
}

function generateGrid(cellNum = 16, grid = null, div = null) {

  lastCellTotal = cellNum;

  // How big in pixels should the grid be?
  const gridSizeW = 485; // fixed
  const gridSizeH = 325; // fixed

  // grid parent container is screen
  const parentContainer = document.querySelector('.eas-screen');

  grid = document.createElement('div');
  grid.classList.add('grid-container');
  grid.style.zIndex = zIndex+=1;

  parentContainer.appendChild(grid);

  grid.style.width = `${gridSizeW}px`;
  grid.style.height = `${gridSizeH}px`;

  // A div will act as a cell
  div = document.createElement('div');
  div.classList.add('cell-block');

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
    newCell.style.zIndex = zIndex;

    grid.appendChild(newCell);
    cellArray.push(newCell);
  }

  const menuButtons = document.querySelectorAll('.icon-mask');
  const fillShapeButton  = document.querySelector('.fa-shape-icon');
  const colourDrawer = document.querySelector('.colour-picker');

  menuButtons.forEach(button => {

    button.addEventListener('click', (e) => {
      const buttonID = e.target.id;

      switch(buttonID) {
        case 'grid-btn':
          console.log('grid button clicked');
          // transition
          break;
        case 'eraser-btn':
          lastColour = drawColour;
          drawColour = 'transparent'
          console.log('eraser button clicked');
          break;
        case 'shape-btn':
          console.log('shaper button clicked');
          fillShapeButton.classList.toggle('fa-cube');
          fillShapeButton.classList.toggle('fa-circle');
          setCellFill();
          break; 
        case 'reset-btn':
          resetGrid(cellArray);
          console.log('reset button clicked');
          break;
        case 'colour-btn':
          // drawColour = getRandomColour();
          colourDrawer.classList.toggle('colour-tray');
          console.log('colour button clicked');
          break;      
      }

    });
  });

  gridListeners(grid, cellArray);
  setCellCount();
}

function resetGrid(nodeList) {
  const cells = document.querySelectorAll('.cell-block');

  cells.forEach(cell => {
    console.log(cell);
    cell.style.background = 'transparent';
  });
} 

function setCellCount() {
  let value = lastCellTotal;

  const form = document.querySelector('.grid-form');
  const cellInput = document.getElementById('cell-input');

  cellInput.addEventListener('change', (e) => {
    value = Number(e.target.value);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (value > 0 && value <= 100 && value !== lastCellTotal) {
      console.log(value);
      console.log(e.type);
      
      removeAll(value);
    }
  });
}

function setCellFill() {
  cellShape === 0 ? cellShape = 100 : cellShape = 0;
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
  // e.target.style.borderRadius = '100%';
  e.target.style.borderRadius = `${cellShape}%`;

  const newColour = getRandomColour();
  const saturate  = Math.round(getRandomNumber(100));
  
  // e.target.style.backgroundColor = newColour;
  // e.target.style.background = `linear-gradient(45deg, ${newColour}, red, red, blue, ${newColour})`;
  e.target.style.background = drawColour;
  // e.target.style.filter = `saturate(${saturate}%)`;
}

function getRandomColour() {
  //const randomColours = ['red','green','blue'];
  const randomColours = CSS_COLOR_NAMES;
  
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

const CSS_COLOR_NAMES = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

colourGrid();

function colourGrid() {

  // How big in pixels should the grid be?
  const gridSizeW = 245; // fixed
  const gridSizeH = 525; // fixed

  // grid parent container is screen
  const parentContainer = document.querySelector('.colour-picker');

  const grid = document.createElement('div');
  grid.classList.add('colour-chart-grid');

  parentContainer.appendChild(grid);

  grid.style.width = `${gridSizeW}px`;
  grid.style.height = `${gridSizeH}px`;

  // A div will act as a cell
  const div = document.createElement('div');
  div.classList.add('colour-cell');

  const cellNum = 6;
  console.log(cellNum);

   let cellSizeW = 40
  let cellSizeH = 40;

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

  const thirtySix = [
    'Black',
    'White',
    'Red',
    'Yellow',
    'Green',
    'Blue',
    'Orange',
    'Violet',
    'Brown',
    'Aqua',
    'Pink',
    'Navy',
    'Purple',
    'Coral',
    'Grey',
    'DarkOrgange',
    'LightBlue',
    'LightGreen',
    'Magenta',
    'Navy',
    'OrangeRed',
    'PeachPuff',
    'RebeccaPurple',
    'RoyalBlue',
    'Silver',
    'SteelBlue',
    'Turquoise',
    'MediumPurple',
    'MidnightBlue',
    'LimeGreen',
    'Khaki',
    'Ivory',
    'GreenYellow',
    'DarkSlateGrey',
    'Crimson',
    'Beige'
  ];

  thirtySix.forEach((colour, index) => {
    cellArray[index].style.background = colour;
  });

  cellArray.forEach((colourCell, index) => {

    colourCell.id = thirtySix[index];

    colourCell.addEventListener('click', (e) => {
      console.log(e.target.id);
    })

    colourCell.addEventListener('hover', (e) => {
      const colourTag = document.createElement('p');
      colourTag.textContent = colourCell.id;

      colourTag.style.color = 'black';
      colourTag.style.background = 'white';
      colourTag.style.width = '100px';
      colourTag.style.height = '50px';
      colourTag.style.zIndex = 2000;

      const colourChart = document.querySelector('.colour-cell');
      colourChart.appendChild(colourTag)
    });


  });

}
