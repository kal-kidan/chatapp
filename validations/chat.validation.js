const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    message: Joi.required(),
    senderId: Joi.required().custom(objectId),
    recieverId: Joi.required().custom(objectId),
  }),
};

const getRecievers = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
  }),
};

module.exports = {
  createMessage,
  getRecievers,
  getMessages,
};
