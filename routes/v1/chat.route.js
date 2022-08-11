const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const chatValidation = require("../../validations/chat.validation");
const chatController = require("../../controllers/chat.controller");

const router = express.Router();

router
  .route("/message")
  .post(
    auth(),
    validate(chatValidation.createMessage),
    chatController.createMessage
  );

router.post(
  "/recievers",
  auth(),
  validate(chatValidation.getRecievers),
  chatController.getRecievers
);

module.exports = router;
