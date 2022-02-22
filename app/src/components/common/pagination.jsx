import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination1 = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  const p1 = _.chunk(pages, 15);
  let i = 0;
  let p2 = p1[i];
  function first() {
    return (i = 0);
  }
  function next() {
    return (i = i + 1);
  }
  function prew() {
    return (i = i - 1);
  }
  function last() {
    return (i = p1.length);
  }

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first onClick={() => first()} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {
            prew();
          }}
        />
      </PaginationItem>

      {p2.map(page => (
        <PaginationItem
          key={page}
          className={page === currentPage ? "active" : ""}
        >
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {
            next();
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => {
            last();
            console.log(last());
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};

Pagination.PropTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination1;
