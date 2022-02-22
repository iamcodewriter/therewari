import React from "react";
import Joi from "joi-browser";
import Form1 from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";
//import { getPackages } from "../services/packageService";
import { Form } from "reactstrap";
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
class CustomerForm extends Form1 {
  state = {
    data: {
      username: "",
      password: "",
      firstName: "", 
      lastName: "",
      mobile: "",
      email: "",
      isActive: "",

    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    mobile: Joi.number()
      .required()
      .label("Mobile No"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    isActive: Joi.boolean()
    
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateCustomer();
  }
  mapToViewModel(customer) {
    return {
      _id: customer._id,
      username: customer.username,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName,
      mobile: customer.mobile,
      email: customer.email,
      isActive: customer.isActive,
     
    };
  }
  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };
  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "last Name")}          
          {this.renderInput("mobile", "Mobile No")}
          {this.renderInput("email", "Email Id")}
          {this.renderInput("isActive", "Status")}

          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default CustomerForm;
