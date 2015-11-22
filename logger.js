/**
 * logger instance:
 * https://github.com/winstonjs/winston
 * http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
 *
 * Usage: with express

 var logger = require("../utils/logger");

 var express = require("express");
 var app = express();

 logger.debug("Overriding 'Express' logger");
 app.use(require('morgan')({ "stream": logger.stream }));

 */

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: __dirname+'/log/logger.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
