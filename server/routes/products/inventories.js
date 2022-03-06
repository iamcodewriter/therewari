const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Inventory, validate } = require("../../models/product/inventory");
const express = require("express");
const router = express.Router();
/*
Inventory Table
id
quantity
createdAt
modifiedAt
deletedAt
*/

router.get("/", async (req, res) => {
  const inventories = await Inventory.find().sort("quantity");
  res.send(inventories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const timestamp = Date.now();
  let inventory = new Inventory({
    /*
Inventory Table
id
quantity
createdAt
modifiedAt
deletedAt
*/
quantity: req.body.quantity,
cratedAt: timestamp,
modifiedAt: timestamp
  
  });

  inventory = await inventory.save();
  res.send(inventory);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  const timestamp = Date.now();
  let inventory = {
    quantity: req.body.quantity,
    modifiedAt: timestamp
  };
  inventory = await Inventory.findByIdAndUpdate(req.params.id, inventory, {
    new: true
  });

  if (!inventory)
    return res.status(404).send("The inventory with given id was not found");
  res.send(inventory);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const inventory = await Inventory.findByIdAndRemove(req.params.id);
  if (!inventory)
    return res.status(404).send("The inventory with given id was not found");
  res.send(inventory);
});

router.get("/:id", async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);
  if (!inventory)
    return res.status(404).send("The inventory with given id was not found");
  res.send(inventory);
});

module.exports = router;
