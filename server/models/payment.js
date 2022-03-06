const mongoose = require("mongoose");
const Joi = require("joi");


const paymentSchema = new mongoose.Schema({
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
  customerId: {
    type: String
  },
  paymentType: {
    type: String
  },
  provider: {
      type: String
  },
  accountNo: {
    type: Number
    },
  expiry: {
    type: Date
        },
  

});

const Payment = mongoose.model("Payment", paymentSchema);

function validatePayment(payment) {
    const schema = {
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
      customerId: Joi.string()
      .min(10)
      .required()
      .max(50),
      paymentType: Joi.string()
      .min(3)
      .required()
      .max(100),
      provider: Joi.string()
      .min(3)
      .max(100),
      accountNo: Joi.number()
      .required(),
      expiry: Joi.date()

    
  };

  return Joi.validate(payment, schema);
}

exports.Payment = Payment;
exports.validate = validatePayment;
