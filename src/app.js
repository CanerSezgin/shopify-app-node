const os = require('os');
const express = require("express");
const routes = require('./routes');
const expressLib = require('./lib/express');
const app = express();

expressLib(app);
routes(app);

const PORT = process.env.PORT || 3000;
const TIMEOUT = 25000; // 25 sec

const server = app.listen(PORT, () => {
  const host = os.hostname();
  console.log(
    "Listening at http://%s:%s in %s environment.",
    host,
    server.address().port,
    process.env.NODE_ENV
  );
})
server.timeout = TIMEOUT; 

module.exports = app;