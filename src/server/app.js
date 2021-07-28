var express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const fetch = require('node-fetch');

dotenv.config();

const routes = require('./routes');

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api', routes);
// Handle 404
app.use((req, res, next) => res.status(404).send('404: Page not Found'));
// Handle 500
app.use((error, req, res, next) => res.status(500).send('500: Internal Server Error'));


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

module.exports = app;
// // Get details for a particular city
// app.post('/place', async function(req,res) {
//   const result = await placeDetails(req.body.name);
//   res.send(result);
// });
