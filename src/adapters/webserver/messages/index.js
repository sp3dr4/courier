const express = require('express');
const createMessage = require('./create');
const listMessages = require('./list');

module.exports = (logger, controller) => {
  const messagesRoutes = express.Router();
  messagesRoutes.use(createMessage(logger, controller));
  messagesRoutes.use(listMessages(logger, controller));

  const router = express.Router();
  router.use('/messages', messagesRoutes);
  return router;
};
