const timeNums = document.querySelectorAll(".main-screen__time-num");
const timeForm = document.querySelector('.main-screen__form');
const timeInput = document.querySelector('input[type="datetime-local"]');
const resetForm = document.querySelector(".main-screen__reset-form");
const viewInterface = document.querySelector(".main-screen__time-view-interface");
const setInterface = document.querySelector(".main-screen__time-set-interface");
const subtitle = document.querySelector(".main-screen__subtitle");

const TIME_OVER_CN = "main-screen__time-container--red";
const HIDDEN_CN = "hidden";

const D_DAY_LS = "dDay";
let dDayString = "";
let intervalID = "";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function saveDDay() {
  localStorage.setItem(D_DAY_LS, dDayString);
}

function loadDDay() {
  dDayString = localStorage.getItem(D_DAY_LS);
}

function handleTimeSubmit(event) {
  if (event !== undefined) {
    event.preventDefault();
  }
  const dTime = getDTime();
  
  let timeArray = calculateTime(dTime);
  paintTime(timeArray);
  intervalID = setInterval(function() {
    timeArray = calculateTime(dTime);
    paintTime(timeArray);
  }, 500);

  paintSubtitle();
  hideSetInterface();
  paintViewInterface();
}

function getDTime() {
  if (dDayString === "" || dDayString === null) {
    dDayString =  timeInput.value
    timeInput.value = "";
    saveDDay();
  }

  const dDate = new Date(dDayString);
  return dDate.getTime();
}

function getCurrentTime() {
  const currentDate = new Date();
  return currentDate.getTime();
}

function calculateTime(dTime) {
  const currentTime = getCurrentTime();
  const timeInterval = dTime - currentTime;
  let timeIntervalInt = Math.ceil(timeInterval / 1000);
  
  const seconds = timeIntervalInt % 60;
  timeIntervalInt = (timeIntervalInt - seconds) / 60;
  
  const minutes = timeIntervalInt % 60;
  timeIntervalInt = (timeIntervalInt - minutes) / 60;
  
  const hours = timeIntervalInt % 24;
  timeIntervalInt = (timeIntervalInt - hours) / 24;
  
  const days = timeIntervalInt;

  const timeArray = [days, hours, minutes, seconds];
  
  return timeArray;
}

function paintTime(timeArray) {
  const isTimeOver = timeArray.filter(time => time > 0);
  
  if (isTimeOver.length === 0) {
    // time is over
    timeNums.forEach((timeNum, index) => {
      timeNum.innerText = '00';
      const timeContainer = timeNum.parentNode;
      timeContainer.classList.add(TIME_OVER_CN);
    })
  } else {
    // time is not over
    timeNums.forEach((timeNum, index) => {
      timeNum.innerText = timeArray[index] < 10 ? `0${timeArray[index]}` : timeArray[index];
    })
  }
}

function handleResetSubmit(event) {
  event.preventDefault();
  
  hideViewInterface();
  paintSetInterface();
  clearInterval(intervalID);
  resetTimeOver();

  dDayString = "";
  saveDDay();
}

function paintViewInterface() {
  viewInterface.classList.remove(HIDDEN_CN);
}

function hideViewInterface() {
  viewInterface.classList.add(HIDDEN_CN);
}

function paintSetInterface() {
  setInterface.classList.remove(HIDDEN_CN);
}

function hideSetInterface() {
  setInterface.classList.add(HIDDEN_CN);
}

function paintSubtitle() {
  const dDate = new Date(dDayString);

  const day = dDate.getDay();
  const dayName = dayNames[day - 1];

  const date = dDate.getDate();

  const month = dDate.getMonth();
  const monthName = monthNames[month];

  const year = dDate.getFullYear();

  const hours = dDate.getHours();
  let amPm = "";
  let hourText = "00";
  if (hours < 12) {
    amPm = "am";
    hourText = `${hours}`;
  } else {
    amPm = "pm";
    hourText = `${hours - 12}`;
  }

  const minutes = dDate.getMinutes();
  const minuteText = minutes < 10 ? `0${minutes}` : minutes;

  subtitle.innerText = `Freedom Comes On ${dayName}, ${date} ${monthName} ${year} ${hourText}:${minuteText}${amPm}`;
}

function resetTimeOver() {
  timeNums.forEach((timeNum, index) => {
    timeNum.innerText = '00';
    const timeContainer = timeNum.parentNode;
    timeContainer.classList.remove(TIME_OVER_CN);
  })
}

function init() {
  loadDDay();
  if (dDayString !== "" && dDayString !== null) {
    handleTimeSubmit();
  }
  timeForm.addEventListener('submit', handleTimeSubmit);
  resetForm.addEventListener('submit', handleResetSubmit);
}

init();