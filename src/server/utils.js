const weatherKey = process.env.WEATHERBIT_KEY;
const geonamesKey = process.env.GEONAMES_KEY;
const fetch = require('node-fetch');

async function placeDetails(place) {
  const apiUrl = `http://api.geonames.org/searchJSON?name=${place}&maxRows=50&username=${geonamesKey}&cities=cities1000`;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}


async function places(place) {
  const apiUrl = `http://api.geonames.org/searchJSON?name=${place}&maxRows=50&username=${geonamesKey}&cities=cities1000`;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  placeDetails,
  places
};
