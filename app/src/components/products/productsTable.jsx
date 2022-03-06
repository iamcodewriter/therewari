import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Product Table
id name desc SKU categoryId inventoryId price discountId createdAt modifiedAt deletedAt
*/

class ProductTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: product => <Link to={`/products/${product._id}`}>{product.name}</Link>
    },
    {
      path: "desc",
      label: "Description"
     
    },
    {
      path: "SKU",
      label: "SKU" 
    },

    {
      path: "categoryId",
      label: "Category Id",
      
    },
    {
      path: "inventoryId",
      label: "Inventory Id",
      
    },
    {
      path: "price",
      label: "Price",
      
    },
    {
      path: "discountId",
      label: "Discount Id",
      
    }
      
    
  ];
  deleteColumn = {
    key: "delete",
    content: product => (
      <Button
        onClick={() => this.props.onDelete(product)}
        color="danger"
        size="sm"
      >
        Delete
      </Button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { products, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductTable;
