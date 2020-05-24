const express = require('express');

module.exports = (logger, controller) => {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const result = await controller.listThreads();
      return res.status(200).json({ items: result });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
