import {API_KEY} from "./config.js"
const locationInput = document.querySelector("#location");
const locationSubmit = document.querySelector("#location-submit");
const locationForm = document.querySelector("form");

function submitLocation(e){
    e.preventDefault()
    const location = locationInput.value;
    console.log(location)
}

console.log(API_KEY)
locationForm.addEventListener("submit", submitLocation)


