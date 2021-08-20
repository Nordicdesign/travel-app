var express = require('express');
var router = express.Router();
const {
  deleteTripEntry,
  getWeatherData,
  places,
  saveTripData,
  projectData
} = require('./utils');

router.get('/trip', async function(req, res) {
  // console.log("sending data::::", projectData);
  res.send(projectData);
});


router.post('/trip', async function(req, res) {
  try {
    saveTripData(req.body);
    let response = {
      'code': 201,
      'msg': req.body
    };
    res.send(response);
  } catch (error) {
    let response = {
      'code': 400,
      'msg': error
    };
    res.send(response);
  }
});


router.delete('/trip/:id', async function(req,res) {
  // console.log("the data is::: ", projectData);
  try {
    let response = {
      'code': 204,
      'msg': req.params.id
    };
    deleteTripEntry(req.params.id)
      .then(() => {
        console.log("the data about to be sent ::: ", projectData);
        res.send(response);
      });
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
  // console.log(result);
  res.send(result);
});


router.get('/places/:place', async function(req,res) {
  const result = await places(req.params.place);
  res.json(result);
});

module.exports = router;
