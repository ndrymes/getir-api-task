const app = require('./app');
const config = require('./config/config');
const serviceLocator = require('./config/di');

const logger = serviceLocator.get('logger');

const { PORT } = config;
app.listen(PORT, () => {
  logger.info(`app is running on port ${PORT}`);
});
module.exports = app;
