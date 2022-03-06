import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//import { NavLink } from "react-router-dom";
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick = e => {
    //e.preventDefault();
  };
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar color="success" dark expand="md">
          <NavbarBrand href="/">
            The Rewari
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user && (
                <React.Fragment>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Customers
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                      onClick={this.handleClick}
                      href="/customers"
                    >
                    Customers
                      </DropdownItem>
                      
                  <DropdownItem
                      onClick={this.handleClick}
                      href="/addresses"
                    >
                        Addresses
                      </DropdownItem>
                    <DropdownItem
                      onClick={this.handleClick}
                      href="/payments"
                    >
                        Payments
                      </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

                 <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Products
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                      onClick={this.handleClick}
                      href="/products"
                    >
                    Products
                      </DropdownItem>
                      
                  <DropdownItem
                      onClick={this.handleClick}
                      href="/categories"
                    >
                        Categories
                      </DropdownItem>
                    <DropdownItem
                      onClick={this.handleClick}
                      href="/discounts"
                    >
                        Discounts
                      </DropdownItem>
                      <DropdownItem
                      onClick={this.handleClick}
                      href="/inventories"
                    >
                        Inventories
                      </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

                  
                </React.Fragment>
              )}
              {user && user.isAdmin && (
                <React.Fragment>
                  <NavItem>
                    <NavLink href="/register" active>
                      Register
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavItem>
                    <NavLink href="/profile" active>
                      {user.username}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/logout" active>
                      Logout
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
              {!user && (
                <React.Fragment>
                  <NavItem>
                    <NavLink href="/login" active>
                      Login
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
