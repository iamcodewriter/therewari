import React from "react";
import Joi from "joi-browser";
import Form1 from "./common/form";
import { Form } from "reactstrap";
import { getPackage, savePackage } from "../services/packageService";

class PackageForm extends Form1 {
  state = {
    data: {
      name: "",
      price: "",
      isActive: ""
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().label("Plan Name"),
    price: Joi.number().label("Price"),
    isActive: Joi.boolean().label("Status")
  };
  async populatePlan() {
    try {
      const packageId = this.props.match.params.id;
      if (packageId === "new") return;
      const { data: plan } = await getPackage(packageId);
      this.setState({ data: this.mapToViewModel(plan) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populatePlan();
  }
  mapToViewModel(plan) {
    return {
      _id: plan._id,
      isActive: plan.isActive,
      name: plan.name,
      price: plan.price
    };
  }
  doSubmit = async () => {
    await savePackage(this.state.data);
    this.props.history.push("/packages");
  };
  render() {
    return (
      <div>
        <h1>Plan Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Plan Name")}
          {this.renderInput("price", "Price")}
          {this.renderInput("isActive", "Status")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default PackageForm;
