/* eslint-disable no-async-promise-executor */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('../config/config');
const serviceLocator = require('../config/di');

const logger = serviceLocator.get('logger');

const databaseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useUnifiedTopology: true,
  retryWrites: false,
};

/**
 * The connect function is initiates a connection to the database.
 * If the connection is unsuccessful or throws an error, the app is exited.
 * @return void
 */

const getUrl = async () => new Promise(async (resolve, reject) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      // This will create an new instance of "MongoMemoryServer" and automatically start it
      const mongod = await MongoMemoryServer.create();
      const url = mongod.getUri();

      // The Server can be stopped again with
      return resolve(url);
      // use an in memory Db for test purpose
    }
    // use your mongodb for other enviroments
    return resolve(config.db.url);
  } catch (error) {
    reject(error);
  }
});
const connect = async () => {
  const mongoUrl = await getUrl();
  mongoose.connect(mongoUrl, databaseConnectionOptions, (err) => {
    if (err) {
      process.exit(1);
    }
    logger.info('db connected.');
  });
  // debug('Database connection successful');
};

mongoose.connection
  .on('disconnected', () => connect());
module.exports = {
  connect,
};

