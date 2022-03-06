import React from "react";
import Joi from "joi-browser";
import Form1 from "../common/form";
import { Form } from "reactstrap";
import { getCategory, saveCategory } from "../../services/products/categoryService";
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
class CategoryForm extends Form1 {
  state = {
    data: {
        name: "",
        desc: ""
    },
    errors: {}
  };
  schema = {
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
    _id: Joi.string(),
    name: Joi.string().label("Name"),
    desc: Joi.string().label("Description")
  };
  async populateCategory() {
    try {
      const categoryId = this.props.match.params.id;
      if (categoryId === "new") return;
      const { data: category } = await getCategory(categoryId);
      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateCategory();
  }
  mapToViewModel(category) {
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
    return {
      _id: category._id,
      name: category.name,
      desc: category.desc
    };
  }
  doSubmit = async () => {
    await saveCategory(this.state.data);
    this.props.history.push("/categories");
  };
  render() {
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
    return (
      <div>
        <h1>Category Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("desc", "Description")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
