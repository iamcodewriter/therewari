const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
    },
  desc: {
    type: String,
    required: true
      },
    SKU: {
        type: String,
        required:true
    },
    categoryId: {
        type: String,
        required:true
    },
    inventoryId: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    discountId: {
        type: String,
        required:true
      },
  createdAt: {
    type: Date
  },
  modifiedAt: {
      type: Date
    },
  deletedAt: {
        type: Date
    }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
    const schema = {
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

name: Joi.string().required(),
desc: Joi.string().required(),
SKU: Joi.string().required(),
categoryId: Joi.string().required(),
inventoryId: Joi.string().required(),
price: Joi.number().required(),
discountId: Joi.string().required(),
createdAt:  Joi.date(),
modifiedAt: Joi.date(),
deletedAt: Joi.date()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
