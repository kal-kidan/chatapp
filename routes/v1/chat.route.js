const express = require('express');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router.post(
  '/message',
  validate(chatValidation.createMessage),
  chatController.createMessage
);

router.post(
  '/recievers',
  validate(chatValidation.getRecievers),
  chatController.getRecievers
);

router.get(
  '/messages',
  validate(chatValidation.getMessages),
  chatController.getMessages
);

module.exports = router;
