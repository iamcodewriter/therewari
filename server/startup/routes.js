const express = require("express");
const morgan = require("morgan");
const logger = require("../middleware/logger");
//const auth = require('../middleware/authenticate');
//const users = require("../routes/users");
const home = require("../routes/home");
//Customers routes
const customers = require("../routes/customers");
const addresses = require("../routes/addresses");
const payments = require("../routes/payments");
//Products routes
const products = require("../routes/products/products");
const categories = require("../routes/products/categories");
const inventories = require("../routes/products/inventories");
const discounts = require("../routes/products/discounts");

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
  //Home Routes
  app.use("/", home);
  //Customer Routes
  app.use("/api/customers", customers);
  app.use("/api/addresses", addresses);
  app.use("/api/payments", payments);
  //Products Routes
  app.use("/api/products", products);
  app.use("/api/categories", categories);
  app.use("/api/inventories", inventories);
  app.use("/api/discounts", discounts);
  

//  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
