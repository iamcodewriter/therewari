import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getInventory, saveInventory } from "../../services/products/invetoryService";
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
class InventoryForm extends Form1 {
  state = {
    data: {
      quantity: ""
    },
    errors: {}
  };
  schema = {
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
    _id: Joi.string(),
    quantity: Joi.string().label("Quantity")
  };
  async populateInventory() {
    try {
      const inventoryId = this.props.match.params.id;
      if (inventoryId === "new") return;
      const { data: inventory } = await getInventory(inventoryId);
      this.setState({ data: this.mapToViewModel(inventory) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateInventory();
  }
  mapToViewModel(inventory) {
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
    return {
      _id: inventory._id,
      quantity: inventory.quantity
    };
  }
  doSubmit = async () => {
    await saveInventory(this.state.data);
    this.props.history.push("/inventories");
  };
  render() {
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
    return (
      <div>
        <h1>Inventory Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("quantity", "Quantity")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default InventoryForm;
