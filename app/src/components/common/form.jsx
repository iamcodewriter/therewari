import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Alert } from "reactstrap";
import Joi from "joi-browser";
import Select from "./select";
class Form1 extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const options = { abortEarly: true };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <Button color="primary" disabled={this.validate()}>
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <FormGroup>
        <Label for="username">{label}</Label>
        <Input
          value={data[name]}
          onChange={this.handleChange}
          type={type}
          name={name}
          id={name}
          placeholder={name}
        />
        <div>
          {errors[name] && <Alert color="danger">{errors[name]}</Alert>}
        </div>
      </FormGroup>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form1;
