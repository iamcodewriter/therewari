import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Table } from "reactstrap";
const Table1 = ({ columns, sortColumn, onSort, data }) => {
  return (
    <Table>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </Table>
  );
};

export default Table1;
