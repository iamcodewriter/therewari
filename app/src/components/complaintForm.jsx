import React from "react";
import Joi from "joi-browser";
import Form1 from "./common/form1";
import { getComplaint, saveComplaint } from "../services/complaintService";
import { getCustomers } from "../services/customerService";
import { getUsers } from "../services/userService";
import { Form } from "reactstrap";
class ComplaintForm extends Form1 {
  state = {
    data: {
      status: "Initialize",
      complaint_no: "",
      customerId: "",
      complaint_type: "",
      from: "",
      by: "",
      for: "",
      current_no: ""
    },
    users: [],
    customers: [],
    errors: {}
  };
  schema = {
    status: Joi.string()
      .required()
      .label("Status"),
    complaint_no: Joi.number()
      .required()
      .label("Complaint No"),
    customerId: Joi.string()
      .required()
      .label("Customer"),
    complaint_type: Joi.string()
      .required()
      .label("Type"),
    from: Joi.string()
      .required()
      .label("From"),
    by: Joi.string()
      .required()
      .label("By"),
    for: Joi.string()
      .required()
      .label("For"),
    current_no: Joi.number()
      .required()
      .label("Current Mobile No"),

    _id: Joi.string()
    /*{name: Joi.string()
      .required()
      .label("Complaint Name"),
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),

    mobile: Joi.number()
      .required()
      .label("Mobile No"),
    contact: Joi.number().label("Alternate No"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    streetAddress: Joi.string().required(),
    city: Joi.string().required(),
    localstate: Joi.string().required(),
    isActive: Joi.boolean()}*/
  };
  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateCustomers() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  async populateComplaint() {
    try {
      const complaintId = this.props.match.params.id;
      if (complaintId === "new") return;
      const { data: complaint } = await getComplaint(complaintId);
      this.setState({ data: this.mapToViewModel(complaint) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateCustomers();
    await this.populateUsers();
    await this.populateComplaint();
  }
  mapToViewModel(complaint) {
    return {
      _id: complaint._id,
      status: complaint.status,

      complaint_no: complaint.complaint_no,
      customerId: complaint.customer._id,
      complaint_type: complaint.complaint_type,
      from: complaint.from,
      by: complaint.by,
      for: complaint.for,
      current_no: complaint.current_no

      /* name: complaint.name,
      username: complaint.username,
      password: complaint.password,
      customerId: complaint.customer._id,
      mobile: complaint.mobile,
      contact: complaint.contact,
      email: complaint.email,
      streetAddress: complaint.streetAddress,
      city: complaint.city,
      localstate: complaint.localstate*/
    };
  }
  doSubmit = async () => {
    await saveComplaint(this.state.data);
    this.props.history.push("/complaints");
  };
  render() {
    return (
      <div>
        <h1>Complaint Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("status", "Status")}
          {this.renderInput("complaint_no", "Complaint No")}
          {this.renderSelect("customerId", "Customer", this.state.customers)}
          {this.renderInput("complaint_type", "Complaint Type")}
          {this.renderSelect("from", "Complaint From", this.state.users)}
          {this.renderSelect("by", "Complaint By", this.state.users)}
          {this.renderSelect("for", "Complaint For", this.state.users)}
          {this.renderInput("current_no", "Current No")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default ComplaintForm;
