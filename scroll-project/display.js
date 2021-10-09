const navBar = document.querySelector('.nav-bar');
const asideHomeBtn = document.querySelector('aside .home-btn');

const FIXED_CN = 'fixed';
const HIDDEN_CN = 'hidden';

let currentNavBarState = 0; // 0: non-fixed, 1: fixed.
let currentHomeBtnState = 1; // 0: non-hidden, 1: hidden.

function paintNavBar(yOffset) {
  const height = navBar.offsetHeight;
  
  if (yOffset < height && currentNavBarState === 1) {
    navBar.classList.remove(FIXED_CN);
    currentNavBarState = 0;
  } else if (yOffset >= height && currentNavBarState === 0) {
    navBar.classList.add(FIXED_CN);
    currentNavBarState = 1;
  }
}

function paintAsideHomeBtn(yOffset) {
  const navBarHeight = navBar.offsetHeight;
  const offset = about.offsetTop - navBarHeight;  // about is already declared in offsetMove.js

  if (yOffset <= offset && currentHomeBtnState === 0) {
    asideHomeBtn.classList.add(HIDDEN_CN);
    currentHomeBtnState = 1;
  } else if (yOffset > offset && currentHomeBtnState === 1) {
    asideHomeBtn.classList.remove(HIDDEN_CN);
    currentHomeBtnState = 0;
  }
}

function handleScroll() {
  const yOffset = window.scrollY;

  paintNavBar(yOffset);
  paintAsideHomeBtn(yOffset);
}

function init() {
  window.addEventListener('scroll', handleScroll)
}

init();