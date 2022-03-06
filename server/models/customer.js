const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
/*
Customer Table
id
username
password
firstName
lastName
mobile
email
isActive
createAt
modifiedAt
*/
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100
    },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date
  },
  modifiedAt: {
      type: Date
  }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = {

    username: Joi.string()
      .min(5)
      .required()
      .max(50),
    password: Joi.string()
      .min(5)
      .required()
      .max(50),
    firstName: Joi.string()
      .min(5)
      .required()
      .max(50),
    lastName: Joi.string()
      .min(5)
      .required()
      .max(50),
    mobile: Joi.number().required(),
    email: Joi.string()
      .min(5)
      .required()
      .max(100),
    isActive: Joi.boolean(),
    createAt:  Joi.string(),
    modifiedAt:  Joi.string()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
