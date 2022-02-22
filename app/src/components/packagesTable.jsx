import { Button } from "reactstrap";
import Like from "./common/like";
import Table from "./common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
class PackagesTable extends Component {
  columns = [
    {
      path: "name",
      label: "Plan Name",
      content: plan => <Link to={`/packages/${plan._id}`}>{plan.name}</Link>
    },
    { path: "price", label: "Price" },

    {
      path: "isActive",
      label: "Status",
      content: plan => (
        <Like liked={plan.isActive} onClick={() => this.props.onLike(plan)} />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: plan => (
      <Button
        onClick={() => this.props.onDelete(plan)}
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
    const { packages, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={packages}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PackagesTable;
