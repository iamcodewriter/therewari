import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getPayment, savePayment } from "../../services/paymentService";
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
class PaymentForm extends Form1 {
  state = {
    data: {
      customerId: "",
      paymentType: "",
      provider: "",
      accountNo: "",
      expiry: ""
    },
    errors: {}
  };
  schema = {
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
    _id: Joi.string(),
    customerId: Joi.string().label("Customer Id"),
    paymentType: Joi.string().label("Payment Type"),
    provider: Joi.string().label("Provider"),
    accountNo: Joi.number().label("Account No"),
    expiry: Joi.date().label("Expiry")
  };
  async populatePayment() {
    try {
      const paymentId = this.props.match.params.id;
      if (paymentId === "new") return;
      const { data: payment } = await getPayment(paymentId);
      this.setState({ data: this.mapToViewModel(payment) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populatePayment();
  }
  mapToViewModel(payment) {
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
    return {
      _id: payment._id,
      customerId: payment.customerId,
      paymentType: payment.paymentType,
      provider: payment.provider,
      accountNo: payment.accountNo,
      expiry: payment.expiry
    };
  }
  doSubmit = async () => {
    await savePayment(this.state.data);
    this.props.history.push("/payments");
  };
  render() {
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
    return (
      <div>
        <h1>Payment Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("customerId", "Customer Id")}
          {this.renderInput("paymentType", "Payment Type")}
          {this.renderInput("provider", "Provider")}
          {this.renderInput("accountNo", "Account No")}
          {this.renderInput("expiry", "Expiry")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default PaymentForm;
