const auth = require("../middleware/auth");

const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");
  user = new User(
    _.pick(req.body, ["name", "username", "email", "password", "isAdmin"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "username", "email", "isAdmin"]));
});
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});
module.exports = router;
