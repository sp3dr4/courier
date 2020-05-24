const DeviceInfo = require('../entities/deviceInfo');
const Message = require('../entities/message');

const create = (logger, messageRepository) => {

  async function Execute({ customerId, operatorId, content, responseTo, os, appVersion, language }) {

    if (customerId && operatorId) {
      throw new Error('customerId or operatorId must be null');
    }
    const isOperator = !!operatorId;

    const msg = new Message({
      accountType: isOperator ? 'operator' : 'customer',
      accountId: isOperator ? operatorId : customerId,
      content,
      deviceInfo: new DeviceInfo({ os, appVersion, language }),
      previous: responseTo
    });
    logger.debug(`Saving message: ${JSON.stringify(msg)}`);

    const savedMsg = await messageRepository.save(msg);
    logger.info(`Message saved: ${JSON.stringify(savedMsg)}`);
    return savedMsg;
  }

  return {
    Execute
  };
};

module.exports = create;
