const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = require("./customer");
const userSchema = require("./user");
const complaintSchema = new mongoose.Schema({
  stamp: {
    type: Date,
    default: Date.now
  },
  complaint_no: {
    type: Number,
    required: true
  },
  complaint_type: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  by: {
    type: String,
    required: true
  },
  for: {
    type: String,
    required: true
  },
  current_no: {
    type: Number
  }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

function validateComplaint(complaint) {
  const schema = {
    stamp: Joi.string(),

    complaint_no: Joi.string(),
    complaint_type: Joi.string(),
    customerId: Joi.string().required(),
    from: Joi.string().required(),
    by: Joi.string().required(),
    for: Joi.string().required(),
    current_no: Joi.number().required()
  };

  return Joi.validate(complaint, schema);
}

exports.Complaint = Complaint;
exports.validate = validateComplaint;
