const winston = require("winston");
const mongoose = require("mongoose");
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/therewari", { useNewUrlParser: true })
    .then(() => winston.info("Connected to the therewari database..."));
};
