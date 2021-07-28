const http = require('http');
const app = require('./app');

// designates what port the app will listen to for incoming requests
const port = 8080;
const server = http.createServer(app);
server.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
