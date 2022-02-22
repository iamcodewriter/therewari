import auth from "../services/authService";
import { Button } from "reactstrap";
import Like from "./common/like";
import Table from "./common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class ComplaintsTable extends Component {
  columns = [
    {
      path: "complaint_no",
      label: "Complaint No",
      content: complaint => (
        <Link to={`/complaints/${complaint._id}`}>
          {complaint.complaint_no}
        </Link>
      )
    },
    { path: "complaint_type", label: "Type" },
    { path: "customer.username", label: "Customer" },
    { path: "from", label: "From" },
    { path: "by.username", label: "By" },
    { path: "for.username", label: "For" },
    { path: "current_no", label: "Current Mobile" },
    { path: "customer.mobile", label: "Mobile" }
  ];

  deleteColumn = {
    key: "delete",
    content: complaint => (
      <Button
        onClick={() => this.props.onDelete(complaint)}
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
    const { complaints, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={complaints}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ComplaintsTable;
