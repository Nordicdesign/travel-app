var express = require('express');
var router = express.Router();
const utils = require('./utils');

// const router = new Router();

router.get('/places/:place', async function(req,res) {
  const result = await utils.places(req.params.place);
  res.json(result);
});

module.exports = router;
