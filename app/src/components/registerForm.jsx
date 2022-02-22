import React from "react";
import Joi from "joi-browser";
import Form1 from "./common/form";
import { Form } from "reactstrap";
import { register } from "../services/userService";
import auth from "../services/authService";
export default class LoginForm extends Form1 {
  state = {
    data: {
      name: "",
      username: "",
      password: "",
      email: "",
      isAdmin: ""
    },
    errors: {}
  };
  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    email: Joi.string()
      .required()
      .email(),
    isAdmin: Joi.boolean().label("Admin")
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Registration Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text")}
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("isAdmin", "Admin", "text")}
          {this.renderButton("Register")}
        </Form>
      </div>
    );
  }
}
