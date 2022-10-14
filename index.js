const mongoose = require("mongoose");
const http = require("http");
const app = require("./server");
const config = require("./config/config");
const logger = require("./config/logger");
const socketConnect = require("./socket");

const httpServer = http.createServer(app);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
});

const server = httpServer.listen(config.port, () => {
  logger.info(`Server listening to port ${config.port}`);
});

const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

io.on("connection", socketConnect);

const unexpectedErrorHandler = (error) => {
  logger.error(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
