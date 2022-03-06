import React, { Component } from "react";
import _ from "lodash";
import { getInventories, deleteInventory } from "../../services/products/invetoryService";

import { Link } from "react-router-dom";
import InventoriesTable from "./inventoriesTable";
/*
Inventory Table
id quantity createdAt modifiedAt deletedAt
*/
class Inventories extends Component {
  state = {
    inventories: [],
    sortColumn: { path: "inventory.quantity", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getInventories();
    //const inventories = [{ _id: "", quantity: "All Inventories" }, ...data];

    this.setState({ inventories: data });
  }
  handleDelete = async inventory => {
    const originalInventories = this.state.inventories;
    const inventories = originalInventories.filter(p => p._id !== inventory._id);
    this.setState({ inventories });
    try {
      await deleteInventory(inventory._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This inventory has already been deleted");
      this.setState({ inventories: originalInventories });
    }
  };
  
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { inventories, sortColumn } = this.state;
    let filtered = inventories;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.inventories;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no inventory in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/inventories/new"
              classQuantity="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Inventory{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: inventories } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} inventories in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/inventories/new"
            classQuantity="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Inventory{" "}
          </Link>
        )}
        <InventoriesTable
          inventories={inventories}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Inventories;
