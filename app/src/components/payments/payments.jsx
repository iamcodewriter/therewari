import React, { Component } from "react";
import _ from "lodash";
import { getPayments, deletePayment } from "../../services/paymentService";

import { Link } from "react-router-dom";
import PaymentsTable from "./paymentsTable";
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
class Payments extends Component {
  state = {
    payments: [],
    sortColumn: { path: "payment.paymentType", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getPayments();
    //const payments = [{ _id: "", name: "All Payments" }, ...data];

    this.setState({ payments: data });
  }
  handleDelete = async payment => {
    const origialAddresses = this.state.payments;
    const payments = origialAddresses.filter(p => p._id !== payment._id);
    this.setState({ payments });
    try {
      await deletePayment(payment._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This payment has already been deleted");
      this.setState({ payments: origialAddresses });
    }
  };
  handleLike = payment => {
    const payments = [...this.state.payments];
    const index = payments.indexOf(payment);
    payments[index] = { ...payments[index] };
    payments[index].isActive = !payments[index].isActive;
    this.setState({ payments });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { payments, sortColumn } = this.state;
    let filtered = payments;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.payments;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no payment in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/payments/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Payment{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: payments } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} payments in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/payments/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Payment{" "}
          </Link>
        )}
        <PaymentsTable
          payments={payments}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Payments;
