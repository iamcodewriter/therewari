const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Discount, validate } = require("../../models/product/discount");
const express = require("express");
const router = express.Router();
/*
Discount Table
id
name
desc
discountPercent
isActive
createdAt
modifiedAt
deletedAt
*/

router.get("/", async (req, res) => {
  const discounts = await Discount.find().sort("name");
  res.send(discounts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const timestamp = Date.now();
  let discount = new Discount({
    /*
Discount Table
id
name
desc
discountPercent
isActive
createdAt
modifiedAt
deletedAt
*/
name: req.body.name,
desc: req.body.desc,
discountPercent: req.body.discountPercent,
isActive: req.body.isActive,
cratedAt: timestamp,
modifiedAt: timestamp
  
  });

  discount = await discount.save();
  res.send(discount);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  const timestamp = Date.now();
  let discount = {
    name: req.body.name,
    desc: req.body.desc,
    discountPercent: req.body.discountPercent,
    isActive: req.body.isActive,
    modifiedAt: timestamp
  };
  discount = await Discount.findByIdAndUpdate(req.params.id, discount, {
    new: true
  });

  if (!discount)
    return res.status(404).send("The discount with given id was not found");
  res.send(discount);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const discount = await Discount.findByIdAndRemove(req.params.id);
  if (!discount)
    return res.status(404).send("The discount with given id was not found");
  res.send(discount);
});

router.get("/:id", async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  if (!discount)
    return res.status(404).send("The discount with given id was not found");
  res.send(discount);
});

module.exports = router;
