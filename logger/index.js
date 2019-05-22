const fs = require("fs");
const winston = require("winston");
const config = require("../config.json")
const logDir = config.logdir;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new(require('winston-daily-rotate-file'))({
      level: 'info',
      filename: `${logDir}/Suabot-%DATE%.log`,
      timestamp: tsFormat,
      datePattern: 'YYYY-MM-DD-HH-mm',
      prepend: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});
logger.info('Winston Logger Started.')

module.exports = logger