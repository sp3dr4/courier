const reqlib = require('app-root-path').require;

const MessageRepository = reqlib('src/adapters/database/messageRepository');
const CreateMessage = reqlib('src/usecases/createMessage');
const ListThreads = reqlib('src/usecases/listThreads');

const controller = (logger, config) => {

  const repo = MessageRepository(logger, config.adapters.database);

  const createMessage = async ({ customerId, operatorId, content, responseTo }, os, appVersion) => {
    const CreateMessageUseCase = CreateMessage(logger, repo);
    const req = {
      customerId,
      operatorId,
      content,
      responseTo,
      os,
      appVersion,
    };
    logger.debug(`running createMessage usecase with req: ${JSON.stringify(req)}`);
    const result = await CreateMessageUseCase.Execute(req);
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
    listThreads
  };

};

module.exports = controller;
