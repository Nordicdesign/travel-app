var express = require('express');
var router = express.Router();
const utils = require('./utils');
const { saveTripData, projectData } = require('./utils');

router.get('/all', async function(req, res) {
  res.send(projectData);
});


router.post('/journal', async function(req, res) {
  console.log("data start", projectData);
  try {
    saveProjectData(req.body);
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


// router.get('/places/:place', async function(req,res) {
//   const result = await utils.places(req.params.place);
//   res.json(result);
// });

module.exports = router;
