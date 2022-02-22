const mongoose = require("mongoose");
const Joi = require("joi");
const packageSchema = require("./package");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  package: {
    type: packageSchema,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  contact: {
    type: Number,
    minlength: 1,
    maxlength: 10
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },

  streetAddress: { type: String },
  city: { type: String, default: "Rewari", required: true },
  localstate: { type: String, default: "Haryana", required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
      .max(50),
    username: Joi.string()
      .min(5)
      .required()
      .max(50),
    password: Joi.string()
      .min(5)
      .required()
      .max(50),
    packageId: Joi.string().required(),
    mobile: Joi.number().required(),
    contact: Joi.number().required(),
    email: Joi.string()
      .min(5)
      .required()
      .max(100),
    isActive: Joi.boolean(),
    streetAddress: Joi.string(),
    city: Joi.string().required(),
    localstate: Joi.string().required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
