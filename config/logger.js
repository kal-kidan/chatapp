const { createLogger, format, transports } = require("winston");
const config = require("./config");

const { combine, timestamp, label, printf } = format;
const winstonFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);
const logger = createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: combine(timestamp(), winstonFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
