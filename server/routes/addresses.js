const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//const asyncMiddleware = require("../middleware/async");
const { Address, validate } = require("../models/address");
//const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/

router.get("/", async (req, res) => {
  const addresses = await Address.find().sort("city");
  res.send(addresses);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(req.body)
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  let address = new Address({
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
customerId: req.body.customerId,
addressLine1: req.body.addressLine1,
addressLine2: req.body.addressLine2,
city: req.body.city,
pinCode: req.body.pinCode,
state: req.body.state,
country: req.body.country,
mobile: req.body.mobile,
geoLocation: req.body.geoLocation

  });

  address = await address.save();
  res.send(address);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  
  let address = {
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
customerId: req.body.customerId,
addressLine1: req.body.addressLine1,
addressLine2: req.body.addressLine2,
city: req.body.city,
pinCode: req.body.pinCode,
state: req.body.state,
country: req.body.country,
mobile: req.body.mobile,
geoLocation: req.body.geoLocation
  };
  address = await Address.findByIdAndUpdate(req.params.id, address, {
    new: true
  });

  if (!address)
    return res.status(404).send("The address with given id was not found");
  res.send(address);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const address = await Address.findByIdAndRemove(req.params.id);
  if (!address)
    return res.status(404).send("The address with given id was not found");
  res.send(address);
});

router.get("/:id", async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (!address)
    return res.status(404).send("The address with given id was not found");
  res.send(address);
});

module.exports = router;
