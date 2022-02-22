const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 5000;
app.listen(port, () =>
  winston.info("Server is listening on port " + port + " ...")
);
