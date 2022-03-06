const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Payment, validate } = require("../models/payment");
const express = require("express");
const router = express.Router();
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/

router.get("/", async (req, res) => {
  const payments = await Payment.find().sort("city");
  res.send(payments);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(req.body)
  if (error) {
    res.status(400).send(error.message);
    return;
  }
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
  let payment = new Payment({
      customerId: req.body.customerId,
      paymentType: req.body.paymentType,
      provider: req.body.provider,
      accountNo: req.body.accountNo,
      expiry: req.body.expiry

  });

  payment = await payment.save();
  res.send(payment);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
    }
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/  
  let payment = {
        customerId: req.body.customerId,
        paymentType: req.body.paymentType,
        provider: req.body.provider,
        accountNo: req.body.accountNo,
        expiry: req.body.expiry
  };
  payment = await Payment.findByIdAndUpdate(req.params.id, payment, {
    new: true
  });

  if (!payment)
    return res.status(404).send("The payment with given id was not found");
  res.send(payment);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const payment = await Payment.findByIdAndRemove(req.params.id);
  if (!payment)
    return res.status(404).send("The payment with given id was not found");
  res.send(payment);
});

router.get("/:id", async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment)
    return res.status(404).send("The payment with given id was not found");
  res.send(payment);
});

module.exports = router;
