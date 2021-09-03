const config = require('./config')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const winstonFormat = printf( ({level, message, timestamp, stack})=> {
    return `${timestamp} ${level}: ${stack || message}`;
})
const logger = createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: combine(
        timestamp(),
        winstonFormat
    ),
    transports: [
        new transports.Console()
    ]
})

module.exports = logger