import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import APR from "./components/common/APR";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Navbar from "./components/navBar";
//Customers
import Customers from "./components/customers/customers";
import Addresses from "./components/addresses/addresses";
import Payments from "./components/payments/payments";

import CustomerForm from "./components/customers/customerForm";
import AddressForm from "./components/addresses/addressForm";
import PaymentForm from "./components/payments/paymentForm";

//Products
import Products from "./components/products/products"
import Categories from "./components/products/categories"
import Inventories from "./components/products/inventories"
import Discounts from "./components/products/discounts"

import ProductForm from "./components/products/productForm"
import CategoryForm from "./components/products/categoryForm"
import InventoryForm from "./components/products/inventoryForm"
import DiscountForm from "./components/products/discountForm"


import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";

import Forbidden from "./components/forbidden";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <APR path="/register" component={RegisterForm} />
            <ProtectedRoute path="/customers/:id" component={CustomerForm} />
            <ProtectedRoute
              path="/customers"
              render={props => <Customers {...props} user={this.state.user} />}
            />
            <ProtectedRoute path="/addresses/:id" component={AddressForm} />
            <ProtectedRoute
              path="/addresses"
              render={props => <Addresses {...props} user={this.state.user} />}
            />
            <ProtectedRoute path="/payments/:id" component={PaymentForm} />
            <ProtectedRoute
              path="/payments"
              render={props => <Payments {...props} user={this.state.user} />}
            />



            <ProtectedRoute path="/products/:id" component={ProductForm} />
            <ProtectedRoute
              path="/products"
              render={props => <Products {...props} user={this.state.user} />}
            />

            <ProtectedRoute path="/categories/:id" component={CategoryForm} />
            <ProtectedRoute
              path="/categories"
              render={props => <Categories {...props} user={this.state.user} />}
            />

            <ProtectedRoute path="/inventories/:id" component={InventoryForm} />
            <ProtectedRoute
              path="/inventories"
              render={props => <Inventories {...props} user={this.state.user} />}
            />

            <ProtectedRoute path="/discounts/:id" component={DiscountForm} />
            <ProtectedRoute
              path="/discounts"
              render={props => <Discounts {...props} user={this.state.user} />}
            />
            

            <Route path="/notFound" component={NotFound} />
            <ProtectedRoute path="/" component={Home} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
