// const chatService = require('./services/chat.service');
// const chatController = require('./controllers/chat.controller');

module.exports = (socket) => {
  // const users = [];
  console.log("A user connected");
  socket.on("send", async (data) => {
    console.log(data);
    socket.emit("message", {
      user: data.sender,
      message: data.message,
    });
    // await chatController.createMessage(data);
  });
  socket.on("disconnect", () => {});
};
