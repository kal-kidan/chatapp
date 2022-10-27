const chatController = require('./controllers/chat.controller');
const redis = require('redis');

const redisClient = redis.createClient();

module.exports = async (socket) => {
  socket.on('join', async (userId) => {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    await redisClient.set(userId, socket.id);
  });

  socket.on('send', async (data) => {
    const socketId = await redisClient.get(data.recieverId);
    const message = {
      senderId: data.senderId,
      message: data.message,
      recieverId: data.recieverId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    if (socketId) {
      socket.to(socketId).emit('message', message);
    }
    await chatController.createMessage(message);
  });

  socket.on('disconnect', () => {});
};
