import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
const ListGroup1 = props => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect
  } = props;
  return (
    <ListGroup className="clickable">
      {items.map(item => (
        <ListGroupItem
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={item === selectedItem ? "active" : ""}
        >
          {item[textProperty]}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

ListGroup1.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup1;
