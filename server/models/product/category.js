const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
/*
Category Table
id
name
desc
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

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
    const schema = {
/*
Category Table
id
name
desc
createdAt
modifiedAt
deletedAt
*/
name: Joi.string().required(),
desc: Joi.string().required(),
createdAt:  Joi.date(),
modifiedAt: Joi.date(),
deletedAt: Joi.date()
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;
