import React, { Component } from "react";
import _ from "lodash";
import { getDiscounts,saveDiscount, deleteDiscount } from "../../services/products/discountService";

import { Link } from "react-router-dom";
import DiscountsTable from "./discountsTable";
/*
Discount Table
id,name,desc,discountPercent,isActive,createdAt,modifiedAt,
deletedAt
*/
class Discounts extends Component {
  state = {
    discounts: [],
    sortColumn: { path: "discount.name", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getDiscounts();
    //const discounts = [{ _id: "", name: "All Discounts" }, ...data];

    this.setState({ discounts: data });
  }
  handleDelete = async discount => {
    const origialDiscounts = this.state.discounts;
    const discounts = origialDiscounts.filter(p => p._id !== discount._id);
    this.setState({ discounts });
    try {
      await deleteDiscount(discount._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This discount has already been deleted");
      this.setState({ discounts: origialDiscounts });
    }
  };

  handleLike = async discount => {
    const discounts = [...this.state.discounts];
    const index = discounts.indexOf(discount);
    discounts[index] = { ...discounts[index] };
    discounts[index].isActive = !discounts[index].isActive;
    this.setState({ discounts });
    try {
      await saveDiscount(discounts[index]);
    } catch (ex) { 
      alert("Error while changing status")
    }
    
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { discounts, sortColumn } = this.state;
    let filtered = discounts;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.discounts;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no discount in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/discounts/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Discount{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: discounts } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} discounts in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/discounts/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Discount{" "}
          </Link>
        )}
        <DiscountsTable
          discounts={discounts}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Discounts;
