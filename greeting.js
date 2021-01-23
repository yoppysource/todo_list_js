const form = document.querySelector(".js-form");
const input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser", SHOW_CN = "assigned";
const nameContainer = document.querySelector(".name");

init();

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function askForName() {
  form.addEventListener("submit", handleSubmit);
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function paintGreeting(text) {
  greeting.innerText = `Hello ${text}`;
  nameContainer.classList.add(SHOW_CN);
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    nameContainer.classList.add(SHOW_CN);
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
