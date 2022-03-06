import React, { Component } from "react";
import _ from "lodash";
import { getAddresses, deleteAddress } from "../../services/addressService";

import { Link } from "react-router-dom";
import AddressesTable from "./addressesTable";
/*
Address Table
id,customerId,addressLine1,addressLine2,city,pinCode,state,country
mobile,geoLocation
*/
class Addresses extends Component {
  state = {
    addresses: [],
    sortColumn: { path: "address.name", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getAddresses();
    //const addresses = [{ _id: "", name: "All Addresses" }, ...data];

    this.setState({ addresses: data });
  }
  handleDelete = async address => {
    const origialAddresses = this.state.addresses;
    const addresses = origialAddresses.filter(p => p._id !== address._id);
    this.setState({ addresses });
    try {
      await deleteAddress(address._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This address has already been deleted");
      this.setState({ addresses: origialAddresses });
    }
  };
  handleLike = address => {
    const addresses = [...this.state.addresses];
    const index = addresses.indexOf(address);
    addresses[index] = { ...addresses[index] };
    addresses[index].isActive = !addresses[index].isActive;
    this.setState({ addresses });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { addresses, sortColumn } = this.state;
    let filtered = addresses;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.addresses;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no address in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/addresses/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Address{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: addresses } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} addresses in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/addresses/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Address{" "}
          </Link>
        )}
        <AddressesTable
          addresses={addresses}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Addresses;
