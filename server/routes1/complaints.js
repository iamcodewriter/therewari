const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const { Complaint, validate } = require("../models/complaint");
const { Customer } = require("../models/customer");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort("name");
  res.send(complaints);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const by_user = await User.findById(req.body.byId);
  if (!by_user) return res.status(400).send("Invalid byId");

  const for_user = await User.findById(req.body.forId);
  if (!for_user) return res.status(400).send("Invalid forId");
  let complaint = new Complaint({
    stamp: req.body.stamp,
    complaint_no: req.body.complaint_no,
    complaint_type: req.body.complaint_type,
    customer: {
      _id: customer._id,
      name: customer.name,
      username: customer.username
    },
    from: req.body.from,
    by: {
      _id: by_user._id,
      username: by_user.username
    },
    by: {
      _id: for_user._id,
      username: for_user.username
    },
    current_no: req.body.current_no
  });

  complaint = await complaint.save();
  res.send(complaint);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const by_user = await User.findById(req.body.byId);
  if (!by_user) return res.status(400).send("Invalid byId");

  const for_user = await User.findById(req.body.forId);
  if (!for_user) return res.status(400).send("Invalid forId");
  let complaint = new Complaint({
    stamp: req.body.stamp,
    complaint_no: req.body.complaint_no,
    complaint_type: req.body.complaint_type,
    customer: {
      _id: customer._id,
      name: customer.name,
      username: customer.username
    },
    from: req.body.from,
    by: {
      _id: by_user._id,
      username: by_user.username
    },
    by: {
      _id: for_user._id,
      username: for_user.username
    },
    current_no: req.body.current_no
  });
  complaint = await Complaint.findByIdAndUpdate(req.params.id, complaint, {
    new: true
  });

  if (!complaint)
    return res.status(404).send("The complaint with given id was not found");
  res.send(complaint);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const complaint = await Complaint.findByIdAndRemove(req.params.id);
  if (!complaint)
    return res.status(404).send("The complaint with given id was not found");
  res.send(complaint);
});

router.get("/:id", async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint)
    return res.status(404).send("The complaint with given id was not found");
  res.send(complaint);
});

module.exports = router;
