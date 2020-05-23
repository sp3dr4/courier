const reqlib = require('app-root-path').require;
const express = require('express');
const Controller = reqlib('src/controllers');
const createMessage = require('./create');

module.exports = (logger) => {
  const controller = Controller(logger);

  const messagesRoutes = express.Router();
  messagesRoutes.use(createMessage(logger, controller));

  const router = express.Router();
  router.use('/messages', messagesRoutes);
  return router;
};
