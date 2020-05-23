const DeviceInfo = require('../entities/deviceInfo');
const Message = require('../entities/message');

// just as test to await something
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const create = (logger, MessageRepository) => {

  async function Execute({ customerId, OperatorId, message, os, appVersion, responseTo }) {

    if (customerId && OperatorId) {
      throw new Error('customerId or OperatorId must be null');
    }
    const isOperator = !!OperatorId;

    logger.info('Checking previous message validity');
    await snooze(1000);
    // check that message with uid responseTo exists
    // check that message with uid responseTo has no response

    const msg = new Message({
      from: isOperator ? 'operator' : 'customer',
      accountId: isOperator ? OperatorId : customerId,
      message,
      deviceInfo: new DeviceInfo({ OS: os, appVersion }),
      previous: responseTo
    });
    logger.info(`Message saved: ${JSON.stringify(msg)}`);
    return msg;
  }

  return {
    Execute
  };
};

module.exports = create;
