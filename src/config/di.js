/* eslint-disable no-shadow */
const winston = require('winston');
const serviceLocator = require('../lib/service_locator');

/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),

    defaultMeta: { service: 'getir-test' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),

    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),

    }));
  }
  return logger;
});

module.exports = serviceLocator;
