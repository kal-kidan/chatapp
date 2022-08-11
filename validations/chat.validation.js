const Joi = require("joi");
const { objectId } = require("./custom.validation");

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
  body: Joi.object().keys({
    senderId: Joi.string().custom(objectId),
    recieverId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMessage,
  getRecievers,
  getMessages,
};
