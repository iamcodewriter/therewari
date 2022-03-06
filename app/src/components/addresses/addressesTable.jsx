import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
class AddressesTable extends Component {
  columns = [
    {
      path: "addressId",
      label: "Address ID",
      content: address => <Link to={`/addresses/${address._id}`}>{address._id}</Link>
    },
    {
      path: "customerId",
      label: "Customer ID",
      
        content: address => <Link to={`/addresses/${address._id}`}>{ (address.customerId)}</Link>
     
    },
    {
      path: "addressLine1",
      label: "Line 1" 
    },

    {
      path: "addressLine2",
      label: "Line 2",
    },
    {
      path: "mobile",
      label: "Mobile",
      }
    
  ];
  deleteColumn = {
    key: "delete",
    content: address => (
      <Button
        onClick={() => this.props.onDelete(address)}
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
    const { addresses, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={addresses}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default AddressesTable;
