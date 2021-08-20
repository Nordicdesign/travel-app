const fetch = require('node-fetch');

async function places(place) {
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


async function getWeatherData(lat,lon, type, weatherDay) {
  const weatherKey = process.env.WEATHERBIT_KEY;
  const when = Math.round(weatherDay);
  const url = `http://api.weatherbit.io/v2.0/${type}?lat=${lat}&lon=${lon}&key=${weatherKey}`;

  try {
    let response = await fetch(url);
    if (response.status === 404) {
      return {
        code: 404,
        msg: "City not found"
      };
    }
    let weatherData = await response.json();
    // console.log(weatherData);
    return weatherData.data[when];
  } catch(error) {
    console.log(error);
    if (!error.response) {
      // network error
      return {
        code: 400,
        msg: "No network"
      };
    } else {
      return {
        code: 400,
        msg: 'something broke'
      };
    }
  }
};


// storage init - keeping the old one as Udacity may require it
let projectData = {};
const saveTripData = data => Object.assign(projectData, data);
const deleteTripEntry = id => delete projectData[id];
// let projectData = [];
// const saveTripData = (data) => projectData.push(data);

// const deleteTripEntry = async (id) => {
//   console.log("id to delete ",id);
//   // const entry = projectData.find(e => e.id === id);
//   console.log("data before::: ", projectData);
//   newData = projectData.filter(e => e.id !== id);
//   projectData = newData;
//   console.log("data after deletion::: ", projectData);
//   return true;
// };

module.exports = {
  getWeatherData,
  places,
  projectData,
  saveTripData,
  deleteTripEntry
};
