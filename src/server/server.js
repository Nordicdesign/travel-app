var express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const fetch = require('node-fetch');

dotenv.config();
const weatherKey = process.env.WEATHERBIT_KEY;
const geonamesKey = process.env.GEONAMES_KEY;

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());


// async function analyseData(url) {
//   const apiUrl = 'https://api.meaningcloud.com/sentiment-2.1';
//   const requestOptions = {
//     method: 'POST',
//     redirect: 'follow'
//   };
//
//   try {
//     const response = await fetch(`${apiUrl}?key=${key}&lang=en&url=${url}`, requestOptions);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

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

// Query a list of places that match the name
app.get('/places/:place', async function(req,res) {
  const result = await places(req.params.place);
  res.send(result);
});

// Get details for a particular city
app.post('/place', async function(req,res) {
  const result = await placeDetails(req.body.name);
  res.send(result);
});


// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
