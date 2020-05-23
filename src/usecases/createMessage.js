const DeviceInfo = require('../entities/deviceInfo');
const Message = require('../entities/message');

// just as test to await something
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const create = (logger, MessageRepository) => {

  async function Execute({ customerId, operatorId, content, responseTo, os, appVersion }) {

    if (customerId && operatorId) {
      throw new Error('customerId or operatorId must be null');
    }
    const isOperator = !!operatorId;

    logger.info('Checking previous message validity');
    await snooze(1000);
    // check that message with uid responseTo exists
    // check that message with uid responseTo has no response

    const msg = new Message({
      accountType: isOperator ? 'operator' : 'customer',
      accountId: isOperator ? operatorId : customerId,
      content,
      deviceInfo: new DeviceInfo({ os, appVersion }),
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
