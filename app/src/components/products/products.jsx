import React, { Component } from "react";
import _ from "lodash";
import { getProducts,saveProduct, deleteProduct } from "../../services/products/productService";

import { Link } from "react-router-dom";
import ProductsTable from "./productsTable";
/*
Product Table
id name desc SKU categoryId inventoryId price discountId createdAt modifiedAt deletedAt
*/

class Products extends Component {
  state = {
    products: [],
    sortColumn: { path: "product.name", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getProducts();
    //const products = [{ _id: "", name: "All Products" }, ...data];

    this.setState({ products: data });
  }
  handleDelete = async product => {
    const origialProducts = this.state.products;
    const products = origialProducts.filter(p => p._id !== product._id);
    this.setState({ products });
    try {
      await deleteProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This product has already been deleted");
      this.setState({ products: origialProducts });
    }
  };

 
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { products, sortColumn } = this.state;
    let filtered = products;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.products;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no product in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/products/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Product{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: products } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} products in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/products/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Product{" "}
          </Link>
        )}
        <ProductsTable
          products={products}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Products;
