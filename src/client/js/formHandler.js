import 'regenerator-runtime/runtime.js'; // to bring async to babel
import displayPlaces from './displayPlaces';

// timer for the destination field, waitTime shows how many miliseconds before doing a request
let timer;
const waitTime = 300;

const placeDetails = async (place) => {
  const apiUrl = `http://localhost:8080/api/places/${place}`;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result.geonames);
    displayPlaces(result.geonames);
  } catch (error) {
    console.error(error);
  }
};

export default async function formHandler(e) {
  const place = e.currentTarget.value;
  clearTimeout(timer);
  timer = setTimeout(() => {
    placeDetails(place);
  }, waitTime);
}

// export function formFeedback(error) {
//   const p = document.querySelector('.formError')
//   // using a switch in preparation for future cases that needs to be handled
//   switch (error) {
//   case "badURL":
//     p.innerHTML = "That URL looks dodgy. Make sure it includes http/https"
//     p.classList.add("visible")
//     break
//   default:
//     return
//   }
// }
