/* eslint-disable no-shadow */
const winston = require('winston');
const serviceLocator = require('../lib/service_locator');

// validators
const recordValidator = require('../validators/records');

// aggregates
const recordsAgg = require('../repositories/records');

// models
const recordsModel = require('../models/record');
// services
const RecordServices = require('../services/record');

// controllers
const RecordController = require('../controllers/record');
const MainController = require('../controllers/index');
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

serviceLocator.register('recordsAgg', () => recordsAgg);
serviceLocator.register('recordsModel', () => recordsModel);
serviceLocator.register('recordValidator', () => recordValidator);

serviceLocator.register('recordServices', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const recordsAgg = servicelocator.get('recordsAgg');
  const recordsModel = servicelocator.get('recordsModel');
  return new RecordServices(logger, recordsAgg, recordsModel);
});
serviceLocator.register('recordControllers', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const recordServices = servicelocator.get('recordServices');
  return new RecordController(logger, recordServices);
});

serviceLocator.register('mainController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const recordControllers = servicelocator.get('recordControllers');
  const recordValidator = servicelocator.get('recordValidator');
  return new MainController(logger, recordControllers, recordValidator);
});
module.exports = serviceLocator;
