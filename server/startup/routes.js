const express = require("express");
const morgan = require("morgan");
const logger = require("../middleware/logger");
//const auth = require('../middleware/authenticate');
//const complaints = require("../routes/complaints");
const customers = require("../routes/customers");
const home = require("../routes/home");
//const packages = require("../routes/packages");
//const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("morgan is enabled in tiny mode");
  }
  app.use(logger);
  app.use(auth);
  app.use("/", home);
//  app.use("/api/complaints", complaints);
//  app.use("/api/packages", packages);
  app.use("/api/customers", customers);
//  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
