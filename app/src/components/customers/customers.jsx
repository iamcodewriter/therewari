import CustomersTable from "./customersTable";
import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import { getCustomers, deleteCustomer,saveCustomer } from "../../services/customerService";
import { paginate } from "../../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 300,
    searchQuery: "",
    currentPage: 1,
    sortColumn: { path: "custmer.username", order: "asc" }
  };
  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers: customers });
  }
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };
  handleDelete = async customer => {
    const origialCustomers = this.state.customers;
    const customers = origialCustomers.filter(c => c._id !== customer._id);
    this.setState({ customers });
    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This customer has already been deleted");
      this.setState({ customers: origialCustomers });
    }
  };
  handleLike = async customer => {
    const customers = [...this.state.customers];
    const index = customers.indexOf(customer);
    customers[index] = { ...customers[index] };
    customers[index].isActive = !customers[index].isActive;
    this.setState({ customers });
    try {
      await saveCustomer(customers[index]);
    } catch (ex) { 
      alert("Error while changing status")
    }
    
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers
    } = this.state;
    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(c =>
        c.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //   const filtered =
    //   selectedPackage && selectedPackage._id
    //   ? allCustomers.filter(c => c.package._id === selectedPackage._id)
    // : allCustomers;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };
  render() {
    const { user } = this.props;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    let { length: count } = this.state.customers;
    if (count === 0)
      return (
        <div>
          <p>Loading customers from database.....</p>;
          {user && (
            <Link
              to="/customers/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Customer{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: customers } = this.getPagedData();
    return (
      <div className="row">
        {/* <div className="col-2">

        </div>*/}
        <div className="col">
          {user && (
            <Link
              to="/customers/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Customer{" "}
            </Link>
          )}
          <p>Showing {totalCount} customers in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Customers;
