const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Product, validate } = require("../../models/product/product");
const express = require("express");
const router = express.Router();
/*
Product Table
id
name
desc
SKU
categoryId
inventoryId
price
discountId
createdAt
modifiedAt
deletedAt
*/

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const timestamp = Date.now();
  let product = new Product({
    /*
Product Table
id
name
desc
SKU
categoryId
inventoryId
price
discountId
createdAt
modifiedAt
deletedAt
*/
name: req.body.name,
desc: req.body.desc,
SKU: req.body.SKU,
categoryId: req.body.categoryId,
inventoryId: req.body.inventoryId,
price: req.body.price,
discountId: req.body.discountId,
cratedAt: timestamp,
modifiedAt: timestamp
  
  });

  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
  const timestamp = Date.now();
  let product = {
    name: req.body.name,
    desc: req.body.desc,
    SKU: req.body.SKU,
    categoryId: req.body.categoryId,
    inventoryId: req.body.inventoryId,
    price: req.body.price,
    discountId: req.body.discountId,
    modifiedAt: timestamp
  };
  product = await Product.findByIdAndUpdate(req.params.id, product, {
    new: true
  });

  if (!product)
    return res.status(404).send("The product with given id was not found");
  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send("The product with given id was not found");
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with given id was not found");
  res.send(product);
});

module.exports = router;
