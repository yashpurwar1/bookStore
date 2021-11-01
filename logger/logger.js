const winston = require('winston');

/**
 * @module:         logger
 * @file:           logger.js
 * @description:    Logs all the activities in the info and error file
 * @author:         Yash
*/

module.exports.logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'info.log',
      json: true,
      format: winston.format.combine(winston.format.timestamp(),
        winston.format.json())
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
      json: true,
      format: winston.format.combine(winston.format.timestamp(),
        winston.format.json())
    })
  ]
});