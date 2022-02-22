import ComplaintsTable from "./complaintsTable";
import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import { getComplaints, deleteComplaint } from "../services/complaintService";
import { getCustomers } from "../services/customerService";
import { getUsers } from "../services/userService";
import { paginate } from "../utils/paginate";
//import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
class Complaints extends Component {
  state = {
    complaints: [],
    customers: [],
    users: [],
    pageSize: 300,
    searchQuery: "",
    selectedStatus: null,
    currentPage: 1,
    sortColumn: { path: "custmer.username", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getCustomers();
    const customers = [{ _id: "", name: "All Customers" }, ...data];
    const { data: complaints } = await getComplaints();
    this.setState({ complaints, customers });
  }
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedPackage: null,
      currentPage: 1
    });
  };
  handleDelete = async complaint => {
    const origialComplaints = this.state.complaints;
    const complaints = origialComplaints.filter(c => c._id !== complaint._id);
    this.setState({ complaints });
    try {
      await deleteComplaint(complaint._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This complaint has already been deleted");
      this.setState({ complaints: origialComplaints });
    }
  };
  handleLike = complaint => {
    const complaints = [...this.state.complaints];
    const index = complaints.indexOf(complaint);
    complaints[index] = { ...complaints[index] };
    complaints[index].isActive = !complaints[index].isActive;
    this.setState({ complaints });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handlePackageSelect = plan => {
    this.setState({ selectedPackage: plan, searchQuery: "", currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedPackage,
      searchQuery,
      complaints: allComplaints
    } = this.state;
    let filtered = allComplaints;
    if (searchQuery)
      filtered = allComplaints.filter(c =>
        c.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedPackage && selectedPackage._id)
      filtered = allComplaints.filter(
        c => c.package._id === selectedPackage._id
      );
    //   const filtered =
    //   selectedPackage && selectedPackage._id
    //   ? allComplaints.filter(c => c.package._id === selectedPackage._id)
    // : allComplaints;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const complaints = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: complaints };
  };
  render() {
    const { user } = this.props;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    let { length: count } = this.state.complaints;
    if (count === 0)
      return (
        <div>
          <p>Loading complaints from database.....</p>;
          {user && (
            <Link
              to="/complaints/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Complaint{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: complaints } = this.getPagedData();
    return (
      <div className="row">
        {/* <div className="col-2">
          <ListGroup
            items={this.state.customers}
            selectedItem={this.state.selectedPackage}
            onItemSelect={this.handlePackageSelect}
          />
        </div>*/}
        <div className="col">
          {user && (
            <Link
              to="/complaints/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Complaint{" "}
            </Link>
          )}
          <p>Showing {totalCount} complaints in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ComplaintsTable
            complaints={complaints}
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

export default Complaints;
