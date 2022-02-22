const winston = require("winston");
module.exports = function(err, res, res, next) {
  //Log the exception
  winston.error(err.Message, err);
  //error
  //warm
  //info
  //verbose
  //debug
  //silly
  res.status(500).send("Something failed");
};
