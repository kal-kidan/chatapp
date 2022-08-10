const { Chat } = require("../models");
// const ApiError = require("../utils/ApiError");

const createMessage = async (messageBody) => {
  const message = await Chat.create(messageBody);
  return message;
};

const getRecievers = async (userId) => {
  const users = Chat.find({
    $or: [{ sendeId: userId }, { receiverId: userId }],
  }).aggregate([
    {
      $group: {
        _id: "$roomId",
        sendeId: "$sendeId",
        receiverId: "$recieverId",
      },
    },
  ]);
  return users;
};

const getMessages = async (userId) => {
  const messages = Chat.find({
    $or: [{ sendeId: userId }, { receiverId: userId }],
  }).aggregate([
    {
      $group: {
        _id: "$roomId",
        sendeId: "$sendeId",
        receiverId: "$recieverId",
      },
    },
  ]);
  return messages;
};

module.exports = {
  createMessage,
  getRecievers,
  getMessages,
};
