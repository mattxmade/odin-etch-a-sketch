let drawColour = 'black';
let lastColour = '';
let lastCellTotal = 0;

let zIndex = -1;

let cellShape = 0;

let layerNumber = 0;

let stateOfUI = 'active';

addGridLayer(8);

function removeAll(cellNum) {
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

  panelListeners();
}
let globalZIndex = 0;

let canTweak = false;

function panelListeners() {
  let gridLayers = document.querySelectorAll('.layer-template');
  const deleteIcons = document.querySelectorAll('.js-delete-icon');

  const selectGrid = document.querySelectorAll('.grid-container');

  deleteIcons.forEach((deleteIcon, index) => {
    deleteIcon.addEventListener('click', () => {
          
      gridLayers[index].remove();
      selectGrid[index].remove();
      
      stateOfUI = 'inactive';
      console.log('delete pressed');

      validateLayers();

    });
  });

  const checkboxes = document.querySelectorAll('.js-checkbox-icon');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', (e) => {
      gridOutlineConfig(index);
    })
  });

  gridLayers.forEach((layer, index) => {
    gridOutlineConfig(index);
    let clickCount = 0;

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

        // else {
        //   layer.classList.remove('selected');
        //   console.log('jfsjgsijgsogj');
        //   gridFocus[index].style.zIndex = index;
        //   clickCount = 0;
        // }
      }
    });
  });

}

function validateLayers() {
  const layersCheck = document.querySelectorAll('.layer-template');

  const selectGrid = document.querySelectorAll('.grid-container');
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

function setGridOutline() {
  const outlineCheckboxes = document.querySelectorAll('.js-checkbox-icon');
  const currentGrid = document.querySelectorAll('.grid-container');

  if (outlineCheckboxes[globalZIndex].checked) {
    currentGrid[globalZIndex].style.outline = 'outline: 1px solid rgba(255, 0, 0, 0.1)';
  }
  else {
    currentGrid[globalZIndex].style.outline = 'none';
  }
    

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

  // grid.style.width = `${gridSizeW}px`;
  // grid.style.height = `${gridSizeH}px`;

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

const menuButtons = document.querySelectorAll('.icon-mask');
const gridConfig = document.querySelector('.grid-configure');
const fillShapeButton  = document.querySelector('.fa-shape-icon');
const colourDrawer = document.querySelector('.colour-picker');

menuButtons.forEach(button => {

  button.addEventListener('click', (e) => {
    const buttonID = e.target.id;

    switch(buttonID) {
      case 'grid-btn':
        gridConfig.classList.toggle('grid-drawer');
        console.log('grid button clicked');
        // transition
        break;
      case 'eraser-btn':
        lastColour = drawColour;
        drawColour = 'transparent';
        console.log('eraser button clicked');
        break;
      case 'shape-btn':
        console.log('shaper button clicked');
        fillShapeButton.classList.toggle('fa-cube');
        fillShapeButton.classList.toggle('fa-circle');
        setCellFill();
        break; 
      case 'reset-btn':
        removeAll(8);
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
      // console.log(value);
      // console.log(e.type);
      
      addGridLayer(value);
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
  const randomColours = ['red','green','blue'];
  // const randomColours = CSS_COLOR_NAMES;
  
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
  // console.log(cellNum);

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
      console.log(e.target.id);

      let newColour = e.target.id;
      drawColour = newColour;
    });

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
