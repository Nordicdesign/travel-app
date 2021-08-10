require('dotenv').config();
var express = require('express');
const app = express();

const cors = require('cors');
const fetch = require('node-fetch');

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

module.exports = app;
