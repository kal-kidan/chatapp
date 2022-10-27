const mongoose = require('mongoose');
const http = require('http');
const app = require('./server');
const config = require('./config/config');
const logger = require('./config/logger');
const socketConnect = require('./socket');

const httpServer = http.createServer(app);

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(error.message);
  });

const server = httpServer.listen(config.port, () => {
  logger.info(`Server listening to port ${config.port}`);
});

const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

io.on('connection', socketConnect);

const unHandledError = (err) => {
  if (config.env === 'development') {
    logger.error('un handled error occured', err);
  }
  /* do this if you are using restarting the server or forking d/t process or using process manager
  like pm2 then exit the process and another process will take over */
  server.close(() => {
    logger.info('server closed');
    mongoose.connection.close();
    process.exit(1);
  });
};

process.on('uncaughtException', unHandledError);
process.on('unhandledRejection', unHandledError);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
