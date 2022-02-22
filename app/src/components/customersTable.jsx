import auth from "../services/authService";
import { Button } from "reactstrap";
import Like from "./common/status";
import Table from "./common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class CustomersTable extends Component {
  columns = [
    {
      path: "username",
      label: "Username",
      content: customer => (
        <Link to={`/customers/${customer._id}`}>{customer.username}</Link>
      )
    },
    { path: "name", label: "Name" },
    { path: "package.name", label: "Package" },
    {
      path: "isActive",
      label: "Status",
      content: customer => (
        <Like
          liked={customer.isActive}
          onClick={() => this.props.onLike(customer)}
        />
      )
    },
    { path: "streetAddress", label: "Address" },
    { path: "mobile", label: "Mobile" }
  ];

  deleteColumn = {
    key: "delete",
    content: customer => (
      <Button
        onClick={() => this.props.onDelete(customer)}
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
    const { customers, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
