"use strict";

const defaultColor = "#000000";
const defaultMode = "color";
const defaultGridSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let gridSize = defaultGridSize;

const colorChoice = document.querySelector(".color-input");
const colorBtn = document.querySelector(".color-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const clearBtn = document.querySelector(".clear-btn");
const sizeSlider = document.querySelector(".slider-btn");
const sizeValue = document.querySelector(".size-value");
const grid = document.querySelector(".grid-container");

const setColor = (newColor) => {
  currentColor = newColor;
};

const setMode = (newMode) => {
  activateButton(newMode);
  currentMode = newMode;
};

const setGridSize = (newSize) => {
  gridSize = newSize;
};

colorChoice.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode("color");
rainbowBtn.onclick = () => setMode("rainbow");
eraserBtn.onclick = () => setMode("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => setGridSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Create the grid
const createGrid = (size) => {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridCell.addEventListener("mouseover", changeColor);
    gridCell.addEventListener("mousedown", changeColor);
    grid.appendChild(gridCell);
  }
};

const updateSizeValue = (value) => {
  sizeValue.innerHTML = `${value} x ${value}`;
};

//Clear Grid
const clearGrid = () => {
  grid.innerHTML = "";
};

const reloadGrid = () => {
  clearGrid();
  createGrid(gridSize);
};

const changeColor = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#e0e0e0";
  }
};

const activateButton = (newMode) => {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.add("activeBtn");
    colorBtn.classList.remove("activeBtn");
    eraserBtn.classList.remove("activeBtn");
  } else if (currentMode === "color") {
    colorBtn.classList.add("activeBtn");
    rainbowBtn.classList.remove("activeBtn");
    eraserBtn.classList.remove("activeBtn");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.add("activeBtn");
    colorBtn.classList.remove("activeBtn");
    rainbowBtn.classList.remove("activeBtn");
  }
};

window.onload = () => {
  createGrid(defaultGridSize);
  activateButton(defaultMode);
};
