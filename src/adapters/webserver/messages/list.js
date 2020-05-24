const reqlib = require('app-root-path').require;
const express = require('express');

const { validate } = reqlib('src/adapters/webserver/utils');

const querySchema = {
  type: 'object',
  properties: {
    os: {
      type: 'string',
      minLength: 1
    },
    appVersion: {
      type: 'string',
      minLength: 1
    },
    language: {
      type: 'string',
      minLength: 1
    },
  }
};

module.exports = (logger, controller) => {
  const router = express.Router();

  router.get('/', validate({ body: querySchema }), async (req, res, next) => {
    try {
      const params = {
        os: req.query.os,
        appVersion: req.query.appVersion,
        language: req.query.language
      };
      const result = await controller.listMessages(params);
      return res.status(200).json({ items: result });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
