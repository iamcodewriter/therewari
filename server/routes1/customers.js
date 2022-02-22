const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const { Customer, validate } = require("../models/customer");
const { Package } = require("../models/package");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const package = await Package.findById(req.body.packageId);
  if (!package) return res.status(400).send("Invalid package");
  let customer = new Customer({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    package: {
      _id: package._id,
      name: package.name,
      price: package.price
    },
    mobile: req.body.mobile,
    contact: req.body.contact,
    email: req.body.email,
    isActive: req.body.isActive,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    localstate: req.body.localstate
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
  const package = await Package.findById(req.body.packageId);
  if (!package) return res.status(400).send("Invalid package");
  let customer = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    package: {
      _id: package._id,
      name: package.name,
      price: package.price
    },
    mobile: req.body.mobile,
    contact: req.body.contact,
    email: req.body.email,
    isActive: req.body.isActive,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    localstate: req.body.localstate
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
