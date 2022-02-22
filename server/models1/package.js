const mongoose = require("mongoose");
const Joi = require("joi");
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    min: 100,
    max: 100000
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

function validatePackage(package) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
      .max(50),
    price: Joi.number()
      .min(100)
      .max(100000)
      .required(),
    isActive: Joi.boolean()
      .required()
      .default(true)
  };
  return Joi.validate(package, schema);
}

const Package = mongoose.model("Package", packageSchema);

exports.Package = Package;
exports.validate = validatePackage;
exports.packageSchema = packageSchema;
