const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const main = document.querySelector("main");
const icon = document.getElementById("icon");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  let hours = date.getHours();
  if (hours > 18) {
    if (main.classList.length === 0) {
      main.classList.add("night");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  if (hours > 12) {
    hours -= 12;
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
      minutes < 10 ? `0${minutes}` : minutes
    } PM`;
  } else {
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
      minutes < 10 ? `0${minutes}` : minutes
    } AM`;
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
