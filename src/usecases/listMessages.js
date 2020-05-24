const create = (logger, messageRepository) => {

  async function Execute() {
    logger.debug('Retrieving messages');
    const messages = await messageRepository.listMessages();
    logger.info(`Fetched ${messages.length} messages`);
    return messages;
  }

  return {
    Execute
  };
};

module.exports = create;
