// import {API_KEY} from "./config.js"
const locationInput = document.querySelector("#location");
const locationSubmit = document.querySelector("#location-submit");
const locationForm = document.querySelector("#location-submission-form");
const dailyContainer = document.querySelector(".daily-display");
const locationDisplay = document.querySelector(".location-name");
const hourlyContainer = document.querySelector(".hourly-display");
// For Testing
const testingUrl = "https://api.weather.gov/gridpoints/MPX/109,72/forecast";
const API_KEY = "";
const dailyTime = document.querySelector(".daily-forecast .header");
const dailyTemp = document.querySelector(".daily-forecast .daily-temp");
const dailyforecast = document.querySelector(".daily-forecast .short-forecast");
const dailyIcon = document.querySelector(".daily-forecast .daily-icon");
let dataCoordinates;
// Delete Above

locationForm.addEventListener("submit", submitLocation);

function submitLocation(e) {
  e.preventDefault();
  const location = locationInput.value;
  clearForecasts();
  getGeoCode(location);
  // debugNetlify(location);
  locationInput.value = "";
}
// API Call Fuctions
function getGeoCode(input) {
  let forecastData;
  fetch(`/.netlify/functions/getGeocode/getGeocode?location=${input}`)
    .then((resObj) => resObj.json())
    .then((data) => {
      const dataObj = data.message;
      const latitude = dataObj.features[0].properties.coordinates.latitude;
      const longitude = dataObj.features[0].properties.coordinates.longitude;
      const locationName = dataObj.features[0].properties.name;
      locationDisplay.textContent = locationName;
      return fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
    })
    .then((resObj) => resObj.json())
    .then((res) => (forecastData = res.properties))
    .then(() => {
      getForecast(forecastData);
    })
    .then(() => {
      getHourlyForecast(forecastData);
    })
    .catch((e) => console.log(e));
}

function getDailyForecast(forecastData) {
  fetch(forecastData.forecast)
    .then((res) => res.json())
    .then((res) => console.log(res));
}

function getForecast(url) {
  fetch(url.forecast)
    .then((resObj) => resObj.json())

    .then((data) => {
      const forecastPerdiods = data.properties.periods;
      createDisplayForecast(forecastPerdiods);
    });
}
function getHourlyForecast(url) {
  fetch(url.forecastHourly)
    .then((resObj) => resObj.json())

    .then((data) => {
      const forecastPerdiods = data.properties.periods;
      createDisplayForecast(forecastPerdiods, true);
      //   console.log(data);
    });
}

// Display Functions
function createDisplayForecast(forecastPerdiods, isHourly) {
  // console.log(forecastPerdiods)
  if (isHourly) {
    for (let i = 0; i <= 4; i++) {
      const periodTimeData = new Date(forecastPerdiods[i].startTime);
      const periodTime = periodTimeData.toLocaleTimeString("en-US");
      const isDayTime = forecastPerdiods[i].isDaytime;
      const temperature = forecastPerdiods[i].temperature;
      const shortForecast = forecastPerdiods[i].shortForecast;
      const icon = forecastPerdiods[i].icon;

      createHourlyForecast(periodTime, temperature, shortForecast, icon);
    }
  } else {
    for (let i = 0; i <= 2; i++) {
      const periodTime = forecastPerdiods[i].name;
      const isDayTime = forecastPerdiods[i].isDaytime;
      const temperature = forecastPerdiods[i].temperature;
      const shortForecast = forecastPerdiods[i].shortForecast;
      const icon = forecastPerdiods[i].icon;

      createForecast(periodTime, temperature, shortForecast, icon);
    }
  }
}
function createForecast(time, temp, forecast, icon) {
  const forecastContainer = document.createElement("div");
  const timeDisplay = document.createElement("h3");
  const tempDisplay = document.createElement("p");
  const tempInput = document.createElement("span");
  const degreeDisplay = document.createElement("sup");
  const forecastDisplay = document.createElement("p");
  const iconDisplay = document.createElement("img");

  forecastContainer.classList.add("daily-forecast");
  timeDisplay.classList.add("header");
  tempDisplay.classList.add("temp");
  tempInput.classList.add("daily-temp");
  forecastDisplay.classList.add("short-forecast");

  timeDisplay.textContent = time;
  tempInput.textContent = temp;
  forecastDisplay.textContent = forecast;
  degreeDisplay.textContent = "o";
  iconDisplay.setAttribute("src", icon);

  tempDisplay.appendChild(tempInput);
  tempDisplay.appendChild(degreeDisplay);

  forecastContainer.appendChild(timeDisplay);
  forecastContainer.appendChild(tempDisplay);
  forecastContainer.appendChild(forecastDisplay);
  forecastContainer.appendChild(iconDisplay);

  dailyContainer.appendChild(forecastContainer);
}

function createHourlyForecast(time, temp, forecast, icon) {
  const forecastContainer = document.createElement("div");
  const timeDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const tempInput = document.createElement("span");
  const degreeDisplay = document.createElement("sup");
  const forecastDisplay = document.createElement("p");
  const iconDisplay = document.createElement("img");

  forecastContainer.classList.add("hourly-forecast");
  timeDisplay.classList.add("time");
  tempDisplay.classList.add("hourly-temp");
  // tempInput.classList.add("daily-temp")
  forecastDisplay.classList.add("hourly-description");

  timeDisplay.textContent = time;
  tempInput.textContent = temp;
  forecastDisplay.textContent = forecast;
  degreeDisplay.textContent = "o";
  iconDisplay.setAttribute("src", icon);

  tempDisplay.appendChild(tempInput);
  tempDisplay.appendChild(degreeDisplay);

  forecastContainer.appendChild(timeDisplay);
  forecastContainer.appendChild(tempDisplay);
  forecastContainer.appendChild(forecastDisplay);
  forecastContainer.appendChild(iconDisplay);

  hourlyContainer.appendChild(forecastContainer);
}

function clearForecasts() {
  dailyContainer.innerHTML = "<h2>Daily Forecast</h2>";
  hourlyContainer.innerHTML = "<h2>Hourly Forecast</h2>";
}

function debugNetlify(input) {
  fetch(`/.netlify/functions/getGeocode/getGeocode?location=${input}`)
    .then((res) => res.json())
    .then((res) => console.log(res));
}
