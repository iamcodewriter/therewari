import { Button } from "reactstrap";
import Table from "../common/table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
/*
Payment Table
id,customerId,paymentType,provider,accountNo,expiry
*/
class PaymentTable extends Component {
  columns = [
    {
      path: "paymentId",
      label: "Payment ID",
      content: payment => <Link to={`/payments/${payment._id}`}>{payment._id}</Link>
    },
    {
      path: "customerId",
      label: "Customer ID",
      
        content: payment => <Link to={`/payments/${payment._id}`}>{ (payment.customerId)}</Link>
     
    },
    {
      path: "paymentType",
      label: "Payment Type" 
    },

    {
      path: "provider",
      label: "Provider",
    },
    {
      path: "accountNo",
      label: "Account No",
      },
      {
        path: "expiry",
        label: "Expiry",
        }
      
    
  ];
  deleteColumn = {
    key: "delete",
    content: payment => (
      <Button
        onClick={() => this.props.onDelete(payment)}
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
    const { payments, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={payments}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PaymentTable;
