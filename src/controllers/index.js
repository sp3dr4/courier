const reqlib = require('app-root-path').require;

const MessageRepository = reqlib('src/adapters/database/messageRepository');
const CreateMessage = reqlib('src/usecases/createMessage');
const ListMessages = reqlib('src/usecases/listMessages');
const ListThreads = reqlib('src/usecases/listThreads');

const controller = (logger, config) => {

  const repo = MessageRepository(logger, config.adapters.database);

  const createMessage = async ({ customerId, operatorId, content, responseTo }, os, appVersion, language) => {
    const CreateMessageUseCase = CreateMessage(logger, repo);
    const req = {
      customerId,
      operatorId,
      content,
      responseTo,
      os,
      appVersion,
      language
    };
    logger.debug(`running createMessage usecase with req: ${JSON.stringify(req)}`);
    const result = await CreateMessageUseCase.Execute(req);
    return result;
  };

  const listMessages = async (params) => {
    const ListMessagesUseCase = ListMessages(logger, repo);
    const req = { ...params };
    logger.debug(`running ListMessages usecase with req: ${JSON.stringify(req)}`);
    const result = await ListMessagesUseCase.Execute(req);
    return result;
  };

  const listThreads = async () => {
    const ListThreadsUseCase = ListThreads(logger, repo);
    const req = {};
    logger.debug(`running ListThreads usecase with req: ${JSON.stringify(req)}`);
    const result = await ListThreadsUseCase.Execute(req);
    return result;
  };

  return {
    createMessage,
    listMessages,
    listThreads
  };

};

module.exports = controller;
