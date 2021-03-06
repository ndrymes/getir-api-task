const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const authRoute = require('./routes/index');
const serviceLocator = require('./config/di');
const database = require('./db/mongoose');

const logger = serviceLocator.get('logger');
// initialize databse connection
database.connect().then(() => {
  console.log('db connected.');
}).catch((error) => {
  logger.error(error);
});
const app = express();
app.use(bodyParser.json()); // support application/json type post data
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// Enables CORS Request
app.use(cors());
// Secure your  app by setting various HTTP headers
app.use(helmet());
// Compress response bodies for all requesst that passes through it
app.use(compression());

// setup Routing and Error Event Handling
authRoute.setup(app, serviceLocator);
module.exports = app;
