const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const mainContents = document.querySelectorAll(".main-content");
const sliderCounter = document.querySelector(".slider-counter");

function renewCounter(index) {
  sliderCounter.innerText = index + 1;
}

function translateContent(index) {
  mainContents.forEach((content) => {
    content.style.transform = `translateX(-${index * 100}%)`;
  });
}

function handleNextBtnClick() {
  const currentIndex = parseInt(sliderCounter.innerText - 1);

  const nextIndex = currentIndex === mainContents.length - 1 ? 0 : currentIndex + 1;

  renewCounter(nextIndex);
  translateContent(nextIndex);
}

function handlePrevBtnClick() {
  const currentIndex = parseInt(sliderCounter.innerText - 1);

  const prevIndex = currentIndex === 0 ? mainContents.length - 1 : currentIndex - 1;

  renewCounter(prevIndex);
  translateContent(prevIndex);
}

function initializeSlides() {
  mainContents.forEach((content, index) => {
    content.style.left = `${index * 100}%`;
  })
}

function init() {
  initializeSlides();
  nextBtn.addEventListener("click", handleNextBtnClick);
  prevBtn.addEventListener("click", handlePrevBtnClick);
}

init();