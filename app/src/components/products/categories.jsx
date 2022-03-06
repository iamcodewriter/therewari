import React, { Component } from "react";
import _ from "lodash";
import { getCategories, deleteCategory } from "../../services/products/categoryService";

import { Link } from "react-router-dom";
import CategoriesTable from "./categoriesTable";
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
class Categories extends Component {
  state = {
    categories: [],
    sortColumn: { path: "category.name", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getCategories();
    //const categories = [{ _id: "", name: "All Categories" }, ...data];

    this.setState({ categories: data });
  }
  handleDelete = async category => {
    const originalCategories = this.state.categories;
    const categories = originalCategories.filter(p => p._id !== category._id);
    this.setState({ categories });
    try {
      await deleteCategory(category._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This category has already been deleted");
      this.setState({ categories: originalCategories });
    }
  };
  
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { categories, sortColumn } = this.state;
    let filtered = categories;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.categories;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no category in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/categories/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Category{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: categories } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} categories in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/categories/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Category{" "}
          </Link>
        )}
        <CategoriesTable
          categories={categories}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Categories;
