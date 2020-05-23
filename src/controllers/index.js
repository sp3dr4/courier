const CreateMessage = require('../usecases/createMessage');

const controller = (logger) => {

  const createMessage = async ({ customerId, operatorId, content, responseTo }, os, appVersion) => {
    const CreateMessageUseCase = CreateMessage(logger, null); // missing repo
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

  return {
    createMessage
  };

};

module.exports = controller;
