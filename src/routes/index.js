const config = require('../config/config');

const VERSION = config.version;
const setup = (server, serviceLocator) => {
  const mainController = serviceLocator.get('mainController');
  server.get(`/${VERSION}`, (req, res) => res.send({ message: 'Welcome to the Test API Service' }));
  server.post(`/${VERSION}/records`, (req, res) => mainController.getRecords(req, res));
};
module.exports = { setup };
