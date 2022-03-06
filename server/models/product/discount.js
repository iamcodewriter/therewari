const mongoose = require("mongoose");
const Joi = require("joi");

const discountSchema = new mongoose.Schema({
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
    name: {
    type: String,
    required: true
    },
    desc: {
    type: String,
    required: true
      },
    discountPercent: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
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

const Discount = mongoose.model("Discount", discountSchema);

function validateDiscount(discount) {
    const schema = {
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
name: Joi.string().required(),
desc: Joi.string().required(),
discountPercent: Joi.number().required(),
isActive: Joi.boolean().required(),
createdAt:  Joi.date(),
modifiedAt: Joi.date(),
deletedAt: Joi.date()
  };

  return Joi.validate(discount, schema);
}

exports.Discount = Discount;
exports.validate = validateDiscount;
