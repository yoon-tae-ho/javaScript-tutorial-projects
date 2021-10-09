const homeBtn = document.querySelector('.home-btn');
const aboutBtn = document.querySelector('.about-btn');
const servicesBtn = document.querySelector('.services-btn');
const toursBtn = document.querySelector('.tours-btn');

// const navBar = document.querySelector('.nav-bar'); !!already declared in display.js
const home = document.querySelector('.home');
const about = document.querySelector('.about');
const services = document.querySelector('.services');
const tours = document.querySelector('.tours');

const navBarHeight = navBar.offsetHeight;
const homeOffset = home.offsetTop;
const aboutOffset = about.offsetTop - navBarHeight;
const servicesOffset = services.offsetTop - navBarHeight;
const toursOffset = tours.offsetTop - navBarHeight;


function moveToHome() {
  scroll({
    left: 0,
    top: homeOffset,
    behavior: "smooth"
  })
}

function moveToAbout() {
  scroll({
    left: 0,
    top: aboutOffset,
    behavior: "smooth"
  })
}

function moveToServices() {
  scroll({
    left: 0,
    top: servicesOffset,
    behavior: "smooth"
  })
}

function moveToTours() {
  scroll({
    left: 0,
    top: toursOffset,
    behavior: "smooth"
  })
}

function init() {
  homeBtn.addEventListener('click', moveToHome);
  aboutBtn.addEventListener('click', moveToAbout);
  servicesBtn.addEventListener('click', moveToServices);
  toursBtn.addEventListener('click', moveToTours);
  asideHomeBtn.addEventListener('click', moveToHome); // asideHomeBtn is already declared in display.js
}

init();