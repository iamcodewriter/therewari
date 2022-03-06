const mongoose = require("mongoose");
const Joi = require("joi");


const addressSchema = new mongoose.Schema({
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
  customerId: {
    type: String
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
      type: String
  },
  city: {
    type: String,
    default: 'Rewari',
    },
  pinCode: {
    type: String,
    minlength: 6,
    maxlength: 6
        },
  state: {
    type: String,
    default: "Haryana"
      },
  country: {
    type: String,
    default: "India"

      },
  mobile: {
    type: Number,
    minlength: 10,
    maxlength: 10
    },
  geoLocation: {
    type: String
    },

});

const Address = mongoose.model("Address", addressSchema);

function validateAddress(address) {
    const schema = {
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
customerId: Joi.string()
      .min(10)
      .required()
      .max(50),
addressLine1: Joi.string()
      .min(3)
      .required()
      .max(100),
addressLine2: Joi.string()
      .min(3)
      .max(100),
city: Joi.string()
      .min(3)
      .required()
      .max(100),
pinCode: Joi.string()
      .required(),
state: Joi.string()
        .min(3)
        .required()
        .max(100),
country: Joi.string()
        .min(3)
        .required()
        .max(10),
mobile: Joi.number()
        .required(),
geoLocation: Joi.string()
    
  };

  return Joi.validate(address, schema);
}

exports.Address = Address;
exports.validate = validateAddress;
