var express = require('express');
var router = express.Router();
const { getWeatherData, places, saveTripData, projectData } = require('./utils');

router.get('/trip', async function(req, res) {
  res.send(projectData);
});


router.post('/trip', async function(req, res) {
  console.log("data start", projectData);
  try {
    saveTripData(req.body);
    let response = {
      'code': 200,
      'msg': req.body
    };
    console.log("data end", projectData);
    res.send(response);
  } catch (error) {
    let response = {
      'code': 400,
      'msg': error
    };
    res.send(response);
  }
});

router.post('/weather', async function(req, res) {
  // console.log(req.body);
  const { type, lat, lon, weatherDay } = req.body;
  const result = await getWeatherData(lat,lon, type, weatherDay);
  console.log(result);
  res.send(result);
});


router.get('/places/:place', async function(req,res) {
  const result = await places(req.params.place);
  res.json(result);
});

module.exports = router;
