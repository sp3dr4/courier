const create = (logger, messageRepository) => {

  async function Execute() {
    logger.debug('Retrieving message threads');
    const threads = await messageRepository.listThreads();
    logger.info(`Fetched ${threads.length} message threads`);
    return threads;
  }

  return {
    Execute
  };
};

module.exports = create;
