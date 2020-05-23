const reqlib = require('app-root-path').require;
const express = require('express');
const { validate } = reqlib('src/adapters/webserver/utils');

const schema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: {
      type: 'string',
      minLength: 1
    },
    responseTo: {
      type: 'string',
      minLength: 1
    },
    customerId: {
      type: 'string',
      minLength: 1
    },
    operatorId: {
      type: 'string',
      minLength: 1
    },
  },
  oneOf: [
    {required: ['customerId']},
    {required: ['operatorId']},
  ]
}

module.exports = (logger, controller) => {
  const router = express.Router();

  router.post('/', validate({body: schema}), async (req, res, next) => {
    logger.info('Calling createMessage controller');
    try {
      const result = await controller.createMessage(req.body, req.headers.os, req.headers.appversion);
      return res.status(201).json(result.toJSON());
    } catch (error) {
      next(error);
    }
  });

  return router;
}
