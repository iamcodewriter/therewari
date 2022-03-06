import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getProduct, saveProduct } from "../../services/products/productService";
/*
Product Table
id name desc SKU categoryId inventoryId price discountId createdAt modifiedAt deletedAt
*/

class ProductForm extends Form1 {
  state = {
    data: {
      name: "",
      desc: "",
      SKU: "",
      categoryId: "",
      inventoryId: "",
      price: "",
      discountId: ""

        
    },
    errors: {}
  };
  schema = {
/*
Product Table
id
name
desc
SKU
categoryId
inventoryId
price
productId
createdAt
modifiedAt
deletedAt
*/

    _id: Joi.string(),
    name: Joi.string().label("Name"),
    desc: Joi.string().label("Description"),
    SKU: Joi.string().label("SKU"),
    categoryId: Joi.string().label("Category Id"),
    inventoryId: Joi.string().label("Description"),
    price: Joi.number().label("Price"),
    discountId: Joi.string().label("Discount Id")
  };
  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;
      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateProduct();
  }
  mapToViewModel(product) {
/*
Product Table
id
name
desc
SKU
categoryId
inventoryId
price
discountId
createdAt
modifiedAt
deletedAt
*/
    return {
      _id: product._id,
      name: product.name,
      SKU: product.SKU,
      categoryId: product.categoryId,
      inventoryId: product.inventoryId,
      price: product.price,
      discountId: product.discountId
    };
  }
  doSubmit = async () => {
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };
  render() {
/*
Product Table
id name desc SKU categoryId inventoryId price discountId createdAt modifiedAt deletedAt */
    return (
      <div>
        <h1>Product Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("desc", "Description")}
          {this.renderInput("SKU", "SKU")}
          {this.renderInput("categoryId", "Category Id")}
          {this.renderInput("inventoryId", "Inventory Id")}
          {this.renderInput("price", "Price")}
          {this.renderInput("discountId", "Discount Id")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default ProductForm;
