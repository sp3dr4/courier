const { Validator } = require('express-json-validator-middleware');

const validator = new Validator({ allErrors: true });
const { validate } = validator;

module.exports = {
  validate
};
