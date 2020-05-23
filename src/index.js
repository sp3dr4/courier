const log4js = require('log4js');

const server = require('./adapters/webserver/server');

const logger = log4js.getLogger('courier');
logger.level = 'debug';

server(logger, 8080);
