import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getDiscount, saveDiscount } from "../../services/products/discountService";
/*
Discount Table
id,name,desc,discountPercent,isActive,createdAt,modifiedAt,
deletedAt
*/
class DiscountForm extends Form1 {
  state = {
    data: {
        name: "",
        desc: "",
        discountPercent: "",
        isActive: ""
    },
    errors: {}
  };
  schema = {
/*
Discount Table
id,name,desc,discountPercent,isActive,createdAt,modifiedAt,
deletedAt
*/
    _id: Joi.string(),
    name: Joi.string().label("Name"),
    desc: Joi.string().label("Description"),
    discountPercent: Joi.string().label("Percents"),
    isActive: Joi.boolean().label("Status")
  };
  async populateDiscount() {
    try {
      const discountId = this.props.match.params.id;
      if (discountId === "new") return;
      const { data: discount } = await getDiscount(discountId);
      this.setState({ data: this.mapToViewModel(discount) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateDiscount();
  }
  mapToViewModel(discount) {
/*
Discount Table
id,name,desc,discountPercent,isActive,createdAt,modifiedAt,deletedAt
*/
    return {
      _id: discount._id,
      name: discount.name,
      desc: discount.desc,
      discountPercent: discount.discountPercent,
      isActive: discount.isActive
    };
  }
  doSubmit = async () => {
    await saveDiscount(this.state.data);
    this.props.history.push("/discounts");
  };
  render() {
/*
Discount Table
id name desc discountPercent isActive createdAt modifiedAt deletedAt
*/
    return (
      <div>
        <h1>Discount Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("desc", "Description")}
          {this.renderInput("discountPercent", "Percent")}
          {this.renderInput("isActive", "Status")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default DiscountForm;
