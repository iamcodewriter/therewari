import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Category Table
id name desc createdAt modifiedAt deletedAt
*/
class CategoryTable extends Component {
  columns = [
    {
      path: "categoryId",
      label: "Category ID",
      content: category => <Link to={`/categories/${category._id}`}>{category._id}</Link>
    },
    {
      path: "name",
      label: "Name",
      
       
    },
    {
      path: "desc",
      label: "Description" 
    }
      
    
  ];
  deleteColumn = {
    key: "delete",
    content: category => (
      <Button
        onClick={() => this.props.onDelete(category)}
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
    const { categories, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={categories}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CategoryTable;
