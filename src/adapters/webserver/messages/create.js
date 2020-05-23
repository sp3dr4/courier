const express = require('express');

module.exports = (logger, controller) => {
  const router = express.Router();
  router.post('/', async (req, res) => {
    logger.info('Calling createMessage controller');
    const result = await controller.createMessage();
    return res.status(201).json(result.toJSON());
  });

  return router;
}
