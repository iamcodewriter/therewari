import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import Like from "../common/status";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Discount Table
id,name,desc,discountPercent,isActive,createdAt,modifiedAt,
deletedAt
*/
class DiscountTable extends Component {
  columns = [
    {
      path: "id",
      label: "ID",
      content: discount => <Link to={`/discounts/${discount._id}`}>{discount._id}</Link>
    },
    {
      path: "name",
      label: "Name",
      content: discount => <Link to={`/discounts/${discount._id}`}>{discount.name}</Link>
    },
    {
      path: "desc",
      label: "Description"
     
    },
    {
      path: "discountPercent",
      label: "Percent" 
    },

    {
      path: "isActive",
      label: "Status",
      content: customer => (
        <Like
          liked={customer.isActive}
          onClick={() => this.props.onLike(customer)}
        />
      )
    }
      
    
  ];
  deleteColumn = {
    key: "delete",
    content: discount => (
      <Button
        onClick={() => this.props.onDelete(discount)}
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
    const { discounts, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={discounts}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DiscountTable;
