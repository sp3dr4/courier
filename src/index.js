const log4js = require('log4js');

const server = require('./adapters/webserver/server');

const logger = log4js.getLogger('courier');
logger.level = 'debug';

const config = {
  adapters: {
    webserver: {
      port: process.env.WEBSERVER_PORT || 8080
    },
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5432,
      user: process.env.DATABASE_USER || 'courier_db',
      password: process.env.DATABASE_PASSWORD || 'Password1!',
      database: process.env.DATABASE_NAME || 'courier_db'
    }
  }
};
logger.debug(`Loaded configuration: ${JSON.stringify(config, null, 2)}`);

server(logger, config);
