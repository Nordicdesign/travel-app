// const weatherKey = process.env.WEATHERBIT_KEY;


//
// async function places(place) {
//   const apiUrl = `http://api.geonames.org/searchJSON?name=${place}&maxRows=50&username=${geonamesKey}&cities=cities1000`;
//   try {
//     const response = await fetch(apiUrl);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// storage init
let projectData = {};
const saveTripData = (data) => Object.assign(projectData, data);

module.exports = {
  projectData,
  saveTripData
};
