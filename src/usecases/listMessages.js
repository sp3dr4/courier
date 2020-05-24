const create = (logger, messageRepository) => {

  async function Execute({ os, appVersion, language }) {
    logger.debug('Retrieving messages');
    const messages = await messageRepository.listMessages({ os, appVersion, language });
    logger.info(`Fetched ${messages.length} messages`);
    return messages;
  }

  return {
    Execute
  };
};

module.exports = create;
