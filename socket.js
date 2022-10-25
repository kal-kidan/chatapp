// const chatService = require('./services/chat.service');
const chatController = require('./controllers/chat.controller');

const users = {};
module.exports = (socket) => {
  console.log('A user connected');
  socket.on('join', (userId) => {
    users[userId] = socket.id;
  });

  socket.on('send', async (data) => {
    const socketId = users[data.recieverId];
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
