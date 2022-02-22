import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import APR from "./components/common/APR";
import Home from "./components/home";
import Customers from "./components/customers";
import Packages from "./components/packages";
import NotFound from "./components/notFound";
import Navbar from "./components/navBar";
import CustomerForm from "./components/customerForm";
import ComplaintForm from "./components/complaintForm";
import PackageForm from "./components/packageForm";
//import CustomerFormNew from "./components/customerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import Complaints from "./components/complaints";
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
            <ProtectedRoute path="/complaints/:id" component={ComplaintForm} />
            <ProtectedRoute
              path="/complaints"
              render={props => <Complaints {...props} user={this.state.user} />}
            />
            <Route path="/complaints" component={Complaints} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <APR path="/register" component={RegisterForm} />
            <ProtectedRoute path="/customers/:id" component={CustomerForm} />
            <ProtectedRoute
              path="/customers"
              render={props => <Customers {...props} user={this.state.user} />}
            />
            <ProtectedRoute path="/packages/:id" component={PackageForm} />
            <ProtectedRoute
              path="/packages"
              render={props => <Packages {...props} user={this.state.user} />}
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
