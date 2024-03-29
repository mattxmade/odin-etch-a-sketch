// Global Variables
let drawColour = 'black';
let lastColour = '';
let lastCellTotal = 0;

let zIndex = -1;
let cellShape = 0;
let layerNumber = 0;
let stateOfUI = 'active';

//=== 8x8 grid + grid config panel ===\\
addGridLayer(8);

//=== Grid UI creator ===\\
function addGridLayer(number = 8) {
  // make a new grid before GUI is added
  generateGrid(number);

  layerNumber +=1;

  const gridConfigContainer = document.querySelector('.grid-configure');
  
  // contains below elements
  const newLayer = document.createElement('div');
  newLayer.classList.add('layer-template');
  newLayer.style.zIndex = zIndex;

  // layer name
  const layerName = document.createElement('p');
  layerName.className = 'layer-name';
  layerName.textContent = `Layer ${layerNumber}`;

  // number of cells
  const numOfCells = document.createElement('p');
  numOfCells.className = 'cell-number';
  numOfCells.textContent = `${number}x${number}`;

  // outline group
  const outlineToggle = document.createElement('div');
  outlineToggle.classList.add('outline-toggle');

  // outline icon
  const outlineIcon = document.createElement('div');
  outlineIcon.classList.add('outline-icon');

  // turn cell outline on/off
  const outlineCheckbox = document.createElement('input');
  outlineCheckbox.className = 'outline-checkbox';
  outlineCheckbox.classList.add('js-checkbox-icon');
  outlineCheckbox.name = 'toggle-outline';
  outlineCheckbox.type = 'checkbox';
  outlineCheckbox.checked = 'checked';

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa');
  deleteIcon.classList.add('fa-trash-o');
  deleteIcon.classList.add('main-icon');
  deleteIcon.classList.add('js-delete-icon');
  deleteIcon.ariaHidden = true;

  newLayer.appendChild(layerName);
  newLayer.appendChild(numOfCells);

  outlineToggle.appendChild(outlineIcon)
  outlineToggle.appendChild(outlineCheckbox)

  newLayer.appendChild(outlineToggle);

  newLayer.appendChild(deleteIcon);

  gridConfigContainer.appendChild(newLayer);

  stateOfUI = 'active';

  // Setup event triggers for new UI grid layer panel
  panelListeners();
}

function panelListeners() {
  let gridLayers = document.querySelectorAll('.layer-template');
  const deleteIcons = document.querySelectorAll('.js-delete-icon');

  const selectGrid = document.querySelectorAll('.grid-container');

  deleteIcons.forEach((deleteIcon, index) => {
    deleteIcon.addEventListener('click', () => {
          
      gridLayers[index].remove();
      selectGrid[index].remove();
      
      stateOfUI = 'inactive';
      console.log('delete icon clicked');

      validateLayers();

    });
  });

  const checkboxes = document.querySelectorAll('.js-checkbox-icon');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', (e) => {

      // toggle cell grid outline for each layer
      gridOutlineConfig(index);
    });
  });

  gridLayers.forEach((layer, index) => {

    // enable cell outlines on inital grid
    gridOutlineConfig(index);

    // always 0 -- WIP
    let clickCount = 0;

    // Select a grid layer via GUI : bring grid to front using z-index
    layer.addEventListener('click', () => {
      let gridFocus = document.querySelectorAll('.grid-container');
      
      let checkLayers = document.querySelectorAll('.layer-template');
      let selected = document.querySelectorAll('.selected');

      if (gridFocus.length !== 0) {
        if (selected.length > 0) {
          for (let i = 0; i < checkLayers.length; i++) {
            checkLayers[i].classList.remove('selected');
            gridFocus[i].style.zIndex = i;
            clickCount = 0;
            zIndex = i-1;
          }
        }

        if (clickCount === 0) {
          layer.classList.add('selected');

          if(gridFocus[index]) {
            gridFocus[index].style.zIndex = 2000;
          }

          clickCount = 1;
        }
      }
    });
  });
}

function validateLayers() {
  const layersCheck = document.querySelectorAll('.layer-template');
  const layerNames = document.querySelectorAll('.layer-name');

  layerNumber = layersCheck.length;

  layerNames.forEach((nameTag, index) => {
    let newName = index + 1;
    nameTag.textContent = `Layer ${newName}`; 
    layersCheck[index].insertBefore(nameTag, layersCheck[index].childNodes[1]);
  });
}

function gridOutlineConfig(target) {
  const selectGrid = document.querySelectorAll('.grid-container');
  const checkboxIcons = document.querySelectorAll('.js-checkbox-icon');

  if (stateOfUI === 'active' && checkboxIcons[target].checked) {

    selectGrid.forEach((grid, index) => {

      if (index === target) {

        for (cells of grid.childNodes) {
          cells.style.outline = '1px solid rgba(255, 0, 0, 0.1)';
        } 

      }
    });

  }
  else {
    selectGrid.forEach((grid, index) => {

      if (index === target) {

        for (cells of grid.childNodes) {
          cells.style.outline = 'none';
        } 

      }
    });
  }
}

// All grids + cells deleted | create 8x8 grid
function removeAll() {
  const allGrids = document.querySelectorAll('.grid-container');
  const cells = document.querySelectorAll('.cell-block');

  cells.forEach(cell => {
    cell.remove();
  });

  allGrids.forEach(grid => {
    grid.remove();
  });

  const gridPanels = document.querySelectorAll('.layer-template');
  gridPanels.forEach(panel => {
    panel.remove();
  });

  zIndex = -1;
  layerNumber = 0;

  addGridLayer(8);
}

//=== Grid functions ===\\
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

  grid.style.width = `${100}%`;
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

  gridListeners(grid, cellArray);
  setCellCount();
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
      addGridLayer(value);
    }
  });
}

//=== Drawing functions ===\\
function gridListeners(grid, cellArray) {

  // Click drag to draw on grid
  grid.addEventListener('mousedown', () => {
    grid.id = 'draw-start';
    drawCaller(grid, cellArray);
  });
  grid.addEventListener('mouseup', () => {
    grid.id = 'draw-stop';
    drawCaller(grid, cellArray);
  });
}

// Fill shape toggle
function setCellFill() {
  cellShape === 0 ? cellShape = 100 : cellShape = 0;
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
  e.target.style.borderRadius = `${cellShape}%`;

  const newColour = getRandomColour();
  const saturate  = Math.round(getRandomNumber(100));
  
  e.target.style.background = drawColour;
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

//=== Menu Button ===\\
const menuHamburger = document.getElementById('menu-btn');
const optionsBar = document.querySelector('.options-menu');

const animateBarTop = document.querySelector('.bar-top');
const animateBarBot = document.querySelector('.bar-bot');

menuHamburger.addEventListener('click', () => {
  optionsBar.classList.toggle('launch-menu');
  animateBarTop.classList.toggle('animate-bar-top');
  animateBarBot.classList.toggle('animate-bar-bot');
});

//=== Menu Options Bar ===\\
const menuButtons = document.querySelectorAll('.icon-mask');
const gridConfig = document.querySelector('.grid-configure');
const fillShapeButton  = document.querySelector('.fa-shape-icon');
const colourDrawer = document.querySelector('.colour-picker');

menuButtons.forEach(button => {

  button.addEventListener('click', (e) => {
    const buttonID = e.target.id;

    switch(buttonID) {
      case 'grid-btn':
        console.log('grid icon clicked');
        gridConfig.classList.toggle('grid-drawer');
        break;

      case 'eraser-btn':
        console.log('eraser icon clicked');
        lastColour = drawColour;
        drawColour = 'transparent';
        break;

      case 'shape-btn':
        console.log('shaper icon clicked');
        fillShapeButton.classList.toggle('fa-cube');
        fillShapeButton.classList.toggle('fa-circle');
        setCellFill();
        break; 

      case 'reset-btn':
        removeAll();
        console.log('reset icon clicked');
        break;

      case 'colour-btn':
        console.log('colour icon clicked');
        colourDrawer.classList.toggle('colour-tray');
        break;      
    }

  });
});

//=== Colour Picker ===\\
colourGrid();

//=== JS generated Colour Panel Grid ===\\
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

  //=== 36 Colour choice ===\\
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
    'DarkOrange',
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

    // set cell id to colour name
    colourCell.id = thirtySix[index];

    colourCell.addEventListener('click', (e) => {
      console.log(`You selected: ${e.target.id}`);

      let newColour = e.target.id;
      drawColour = newColour;
    });

    //=== Mouseover colour shows name ===\\
    const colourTag = document.createElement('p');
    const colourChart = document.querySelector('.colour-cell');

    colourCell.addEventListener('mouseenter', () => {
      
      colourTag.textContent = colourCell.id;

      colourTag.style.color = 'black';
      colourTag.style.background = 'white';
      colourTag.style.width = 'fit-content';
      colourTag.style.height = 'fit-content';
      colourTag.style.zIndex = 2000;

      colourTag.style.textAlign = 'center';
      colourTag.style.outline = 'none';
      colourTag.style.border = 'none';

      colourTag.style.position = 'relative';

      colourTag.style.left = '4rem';
      colourTag.style.top = '-5rem';

      colourTag.style.userSelect = 'none';
      
      colourChart.appendChild(colourTag);
    });
    colourCell.addEventListener('mouseleave', () => {
      colourTag.remove();
    });

  });
}