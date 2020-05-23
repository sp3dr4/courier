const reqlib = require('app-root-path').require;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pjson = reqlib('./package.json');
const MessagesRouter = require('./messages');

const start = (logger, port) => {
  const app = express();

  // bodyparser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // request logger
  app.use(morgan('tiny'));
  
  // Healthcheck
  app.get('/healthcheck', (req, res) => {
    return res.status(200).json({
      health: 'OK',
      version: pjson.version
    });
  });

  app.use(MessagesRouter(logger));
  
  // Generic error handler
  app.use((err, req, res, next) => {
    if (err) {
      logger.error(err.message);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return res.status(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.message
      });
    }
  
    next();
  });
  
  // 404 error handler
  app.use((req, res) => {
    res.status(404).json({
      statusCode: 404,
      message: 'Not found'
    });
  });
  
  app.listen(port, () => {
    logger.info(`Listening on PORT: ${port}`);
  });

};

module.exports = start;
