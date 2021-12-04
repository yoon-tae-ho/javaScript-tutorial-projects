// Canvas

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = "#2c2c2c";

// Default Canvas Background Color for Image Saving
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleMouseDown(event) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        startPainting();
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// Change Color

const colorArr = document.querySelectorAll(".controls__color");

function changeColor(event) {
    const newColor = event.target.style.backgroundColor;
    ctx.strokeStyle = newColor;
    ctx.fillStyle = newColor;
}

if (colorArr) {
    colorArr.forEach(color => color.addEventListener("click", changeColor));
}

// Brush Size

const range = document.querySelector("#jsRange");

function changeBrushSize() {
    const newBrushSize = range.value;
    ctx.lineWidth = newBrushSize;
}

if (range) {
    range.addEventListener("change", changeBrushSize);
}

// Fill Mode

const modeBtn = document.querySelector("#jsMode");

function changeMode() {
    if (filling) {
        filling = false;
        modeBtn.innerText = "FILL";
    } else {
        filling = true;
        modeBtn.innerText = "PAINT";
    }
}

if (modeBtn) {
    modeBtn.addEventListener("click", changeMode);
}

// Save as Image

const saveBtn = document.querySelector("#jsSave")

function handleContextMenu(event) {
    event.preventDefault();
}

function saveImage(event) {
    const imageUrl = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "myPainting.png";
    link.click();
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveImage);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

// Clear Canvas

const clearBtn = document.querySelector("#jsClear");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentFillStyle = ctx.fillStyle;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = currentFillStyle;
}

clearBtn.addEventListener("click", clearCanvas);