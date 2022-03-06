import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getAddress, saveAddress } from "../../services/addressService";
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
class AddressForm extends Form1 {
  state = {
    data: {
      customerId: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      pinCode: "",
      state: "",
      country: "",
      mobile: "",
      geoLocation: "",
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    customerId: Joi.string().label("Customer Id"),
    addressLine1: Joi.string().label("Address Line 1"),
    addressLine2: Joi.string().label("Address Line 2"),
    city: Joi.string().label("City"),
    pinCode: Joi.string().label("Pin Code"),
    state: Joi.string().label("State"),
    country: Joi.string().label("Country"),
    mobile: Joi.number().label("Mobile"),
    geoLocation: Joi.string().label("Geolocation")
  };
  async populateAddress() {
    try {
      const addressId = this.props.match.params.id;
      if (addressId === "new") return;
      const { data: address } = await getAddress(addressId);
      this.setState({ data: this.mapToViewModel(address) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateAddress();
  }
  mapToViewModel(address) {
    return {
      _id: address._id,
      customerId: address.customerId,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      pinCode: address.pinCode,
      state: address.state,
      country: address.country,
      mobile: address.mobile,
      geoLocation: address.geoLocation
    };
  }
  doSubmit = async () => {
    await saveAddress(this.state.data);
    this.props.history.push("/addresses");
  };
  render() {
    return (
      <div>
        <h1>Address Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("customerId", "Customer Id")}
          {this.renderInput("addressLine1", "Address Line 1")}
          {this.renderInput("addressLine2", "Address Line 2")}
          {this.renderInput("city", "City")}
          {this.renderInput("pinCode", "Pin Code")}
          {this.renderInput("state", "State")}
          {this.renderInput("country", "Country")}
          {this.renderInput("mobile", "Mobile")}
          {this.renderInput("geoLocation", "Geo Location")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default AddressForm;
