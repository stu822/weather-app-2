import {key} from "./apiKey"
const locationInput = document.querySelector("#location");
const locationSubmit = document.querySelector("#location-submit");
const locationForm = document.querySelector("form");

function submitLocation(e){
    e.preventDefault()
    const location = locationInput.value;
    console.log(location)
}

locationForm.addEventListener("submit", submitLocation)


