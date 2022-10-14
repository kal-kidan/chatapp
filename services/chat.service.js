const mongoose = require('mongoose');
const { Chat, User } = require('../models');
const { Room } = require('../models');
const { decrypt } = require('../utils/crypto');
// const ApiError = require("../utils/ApiError");

const createMessage = async (messageBody) => {
  const { senderId } = messageBody;
  const { recieverId } = messageBody;
  let room = await Room.findOne({
    $or: [
      { $and: [{ userId1: senderId }, { userId2: recieverId }] },
      { $and: [{ userId2: senderId }, { userId1: recieverId }] },
    ],
  });
  if (!room) {
    room = await Room.create({
      userId1: senderId,
      userId2: recieverId,
    });
  }
  const message = await Chat.create({ ...messageBody, roomId: room.id });
  return message;
};

const getRecievers = async (body) => {
  const userId = mongoose.Types.ObjectId(body.userId);
  const chats = await Chat.aggregate()
    .match({
      $or: [{ senderId: userId }, { recieverId: userId }],
    })
    .group({
      _id: '$roomId',
      user: {
        $first: {
          $cond: [{ $eq: ['$senderId', userId] }, '$recieverId', '$senderId'],
        },
      },
      createdAt: { $first: '$createdAt' },
      message: { $first: '$message' },
    })
    .sort({ createdAt: -1 });
  const users = await User.populate(
    chats.map((item) => ({ ...item, message: decrypt(item.message) })),
    { path: 'user' }
  );
  return users;
};

const getMessages = async (roomId, userId, page, limit) => {
  const messages = Chat.paginate(
    {
      $and: [
        { roomId },
        { $or: [{ senderId: userId }, { recieverId: userId }] },
      ],
    },
    { page, limit }
  );
  return messages;
};

module.exports = {
  createMessage,
  getRecievers,
  getMessages,
};
