import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
class InventoryTable extends Component {
  columns = [
    {
      path: "inventoryId",
      label: "Inventory ID",
      content: inventory => <Link to={`/inventories/${inventory._id}`}>{inventory._id}</Link>
    },
    {
      path: "quantity",
      label: "Quantity",
      
       
    }
      
    
  ];
  deleteColumn = {
    key: "delete",
    content: inventory => (
      <Button
        onClick={() => this.props.onDelete(inventory)}
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
    const { inventories, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={inventories}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default InventoryTable;
