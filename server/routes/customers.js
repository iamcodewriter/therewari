const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
/*
Customer Table
id
username
password
firstName
lastName
mobile
email
createAt
modifiedAt
*/

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("firstName");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const timestamp = Date.now();
  let customer = new Customer({
    
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    mobile: req.body.mobile,
    email: req.body.email,
    isActive: req.body.isActive,
    cratedAt: timestamp,
    modifiedAt: timestamp
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  const timestamp = Date.now();
  let customer = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    isActive: req.body.isActive,    
    modifiedAt: timestamp
  };
  customer = await Customer.findByIdAndUpdate(req.params.id, customer, {
    new: true
  });

  if (!customer)
    return res.status(404).send("The customer with given id was not found");
  res.send(customer);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with given id was not found");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with given id was not found");
  res.send(customer);
});

module.exports = router;
