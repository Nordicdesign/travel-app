import displayPlaces from './displayPlaces';

const getFormValue = (id) => document.getElementById(id).value;

const placeDetails = async (place) => {
  const geonamesKey = process.env.GEONAMES_KEY;
  const apiUrl = `http://api.geonames.org/searchJSON?name=${place}&maxRows=50&username=${geonamesKey}&cities=cities1000`;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function formHandler(e) {
  e.preventDefault();
  const place = getFormValue('location');
  try {
    const result = await placeDetails(place);
    console.log(result.geonames);
    displayPlaces(result.geonames);
  } catch (error) {
    console.log(error);
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
