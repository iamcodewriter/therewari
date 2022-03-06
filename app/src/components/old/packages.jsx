import React, { Component } from "react";
import _ from "lodash";
import { getPackages, deletePackage } from "../services/packageService";

import { Link } from "react-router-dom";
import PackagesTable from "./packagesTable";
class Packages extends Component {
  state = {
    packages: [],
    sortColumn: { path: "package.name", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getPackages();
    //const packages = [{ _id: "", name: "All Packages" }, ...data];

    this.setState({ packages: data });
  }
  handleDelete = async plan => {
    const origialPackages = this.state.packages;
    const packages = origialPackages.filter(p => p._id !== plan._id);
    this.setState({ packages });
    try {
      await deletePackage(plan._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This package has already been deleted");
      this.setState({ packages: origialPackages });
    }
  };
  handleLike = plan => {
    const packages = [...this.state.packages];
    const index = packages.indexOf(plan);
    packages[index] = { ...packages[index] };
    packages[index].isActive = !packages[index].isActive;
    this.setState({ packages });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { packages, sortColumn } = this.state;
    let filtered = packages;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: sorted.length, data: sorted };
  };
  render() {
    const { sortColumn } = this.state;
    const { length: count } = this.state.packages;
    const { user } = this.props;
    if (count === 0)
      return (
        <div>
          <p>There is no package in the database.</p>{" "}
          {user && user.isAdmin && (
            <Link
              to="/packages/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Plan{" "}
            </Link>
          )}
        </div>
      );
    const { totalCount, data: packages } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} packages in the database.</p>
        {user && user.isAdmin && (
          <Link
            to="/packages/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Plan{" "}
          </Link>
        )}
        <PackagesTable
          packages={packages}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Packages;
