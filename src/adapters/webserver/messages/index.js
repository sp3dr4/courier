const express = require('express');
const createMessage = require('./create');

module.exports = (logger, controller) => {
  const messagesRoutes = express.Router();
  messagesRoutes.use(createMessage(logger, controller));

  const router = express.Router();
  router.use('/messages', messagesRoutes);
  return router;
};
