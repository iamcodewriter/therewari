const mongoose = require("mongoose");
const Joi = require("joi");

const inventorySchema = new mongoose.Schema({
/*
Inventory Table
id
quantity
createdAt
modifiedAt
deletedAt
*/
quantity: {
    type: Number,
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

const Inventory = mongoose.model("Inventory", inventorySchema);

function validateInventory(inventory) {
    const schema = {
/*
Inventory Table
id
quantity
createdAt
modifiedAt
deletedAt
*/
quantity: Joi.number().required(),
createdAt:  Joi.date(),
modifiedAt: Joi.date(),
deletedAt: Joi.date()
  };

  return Joi.validate(inventory, schema);
}

exports.Inventory = Inventory;
exports.validate = validateInventory;
