const draggableBox = document.querySelector(".main__draggable-box");
const dropzones = document.querySelectorAll(".main__dropzone");

// Class Names
const HOLD_CN = "hold";
const HOVERED_CN = "hovered";
const INVISIBLE_CN = "invisible";

// drag functions
function handleDragStart(event) {
  // event.preventDefault();
  this.classList.add(HOLD_CN);
  setTimeout(() => {
    this.classList.add(INVISIBLE_CN);
  }, 0);

  // ***below code dont be applied.***
  // setTimeout(function() {
  //   this.classList.add(INVISIBLE_CN);
  // }, 0);
}

function handleDragEnd(event) {
  event.preventDefault();
  this.classList.remove(HOLD_CN);
  this.classList.remove(INVISIBLE_CN);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  event.preventDefault();
  this.classList.add(HOVERED_CN);
}

function handleDragLeave(event) {
  event.preventDefault();
  this.classList.remove(HOVERED_CN);
}

function handleDragDrop(event) {
  event.preventDefault();
  this.classList.remove(HOVERED_CN);
  this.appendChild(draggableBox);
}

function init() {
  // Draggable box Listeners
  draggableBox.addEventListener("dragstart", handleDragStart);
  draggableBox.addEventListener("dragend", handleDragEnd);

  // Loop through dropzones and call drag events
  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDragDrop);
  });
}

init()