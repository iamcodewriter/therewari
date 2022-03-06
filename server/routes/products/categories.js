const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Category, validate } = require("../../models/product/category");
const express = require("express");
const router = express.Router();
/*
Category Table
id
name
desc
createdAt
modifiedAt
deletedAt
*/

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const timestamp = Date.now();
  let category = new Category({
    /*
Category Table
id
name
desc
createdAt
modifiedAt
deletedAt
*/
name: req.body.name,
desc: req.body.desc,
cratedAt: timestamp,
modifiedAt: timestamp
  
  });

  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  const timestamp = Date.now();
  let category = {
    name: req.body.name,
    desc: req.body.desc,
    modifiedAt: timestamp
  };
  category = await Category.findByIdAndUpdate(req.params.id, category, {
    new: true
  });

  if (!category)
    return res.status(404).send("The category with given id was not found");
  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("The category with given id was not found");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("The category with given id was not found");
  res.send(category);
});

module.exports = router;
