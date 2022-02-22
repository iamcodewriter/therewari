import React, { Component } from "react";
import { Button} from "reactstrap";
class Status extends Component {
  render() {
    let color = "success";
    let name = "Active";
    if (!this.props.liked) color = "danger";
    if (!this.props.liked) name = "Deactive";
    return (
      <Button
        color={color}
        size="sm"
        onClick={this.props.onClick}
       
      >{ name }</Button>
    );
  }
}

export default Status;
