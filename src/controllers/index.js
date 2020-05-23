const CreateMessage = require('../usecases/createMessage');

const controller = (logger) => {

  const createMessage = async () => {
    const CreateMessageUseCase = CreateMessage(logger, null); // missing repo
    const req = {
      customerId: null,
      OperatorId: null,
      message: null,
      os: null,
      appVersion: null,
      responseTo: null
    };
    logger.debug(`running createMessage usecase with req: ${req}`);
    const result = await CreateMessageUseCase.Execute(req);
    return result;
  };

  return {
    createMessage
  };

};

module.exports = controller;
