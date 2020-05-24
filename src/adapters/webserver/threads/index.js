const express = require('express');
const listThreads = require('./list');

module.exports = (logger, controller) => {
  const threadsRoutes = express.Router();
  threadsRoutes.use(listThreads(logger, controller));

  const router = express.Router();
  router.use('/threads', threadsRoutes);
  return router;
};
