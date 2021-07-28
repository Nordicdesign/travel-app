// import checkURL from './checkURL'
// import analyseSentiment from './analyseSentiment
import displayPlaces from './displayPlaces';

const getFormValue = (id) => document.getElementById(id).value;

export default async function formHandler(e) {
  e.preventDefault();
  const place = getFormValue('location');
  try {
    const response = await fetch(`http://localhost:8080/places/${place}`);
    const result = await response.json();
    console.log(result);
    displayPlaces(result.geonames);
  } catch (error) {
    console.error(error);
  }
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
