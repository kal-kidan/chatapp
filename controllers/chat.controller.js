const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { chatService } = require("../services");

const createMessage = catchAsync(async (req, res) => {
  const message = await chatService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(message);
});

module.exports = {
  createMessage,
};
