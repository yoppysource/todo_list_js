const KEY_Coord = "coords";
const API_KEY = "86196f71b418e9e1ec94df3a1f5c226f";
const weather = document.querySelector(".weather-text");
const weatherImg = document.querySelector(".weather-icon");

function getImageUrl(code) {
  const url = `http://openweathermap.org/img/wn/${code}@2x.png`;
  weatherImg.src = url;
}
function saveCoords(coordsObj) {
  localStorage.setItem(KEY_Coord, JSON.stringify(coordsObj));
}
async function getWeather(lat, lng) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`,
  );
  const data = await response.json();
  getImageUrl(data.weather[0].icon);
  const temperature = data.main.temp;
  const place = data.name;
  weather.innerHTML = `${temperature}°C<br> ${place}`;
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("eroor");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(KEY_Coord);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
