const { Package, validate } = require("../models/package");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const packages = await Package.find().sort("price");
  res.send(packages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  let package = new Package({
    name: req.body.name,
    price: req.body.price,
    isActive: req.body.isActive
  });

  package = await package.save();
  res.send(package);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  let package = {
    name: req.body.name,
    price: req.body.price,
    isActive: req.body.isActive
  };
  package = await Package.findByIdAndUpdate(req.params.id, package, {
    new: true
  });

  if (!package)
    return res.status(404).send("The package with given id was not found");
  res.send(package);
});

router.delete("/:id", async (req, res) => {
  const package = await Package.findByIdAndRemove(req.params.id);
  if (!package)
    return res.status(404).send("The package with given id was not found");
  res.send(package);
});

router.get("/:id", async (req, res) => {
  const package = await Package.findById(req.params.id);
  if (!package)
    return res.status(404).send("The package with given id was not found");
  res.send(package);
});

module.exports = router;
