const appName = 'getir test';
require('dotenv').config();

const config = {
  appName,
  version: 'v1',
  db: {
    url: process.env.MONGOOSE_URL,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true',
  },
  PORT: process.env.PORT,
};
module.exports = config;
