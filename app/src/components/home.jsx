import React from "react";
import auth from "../services/authService";
const user = auth.getCurrentUser();
const home = () => {
  if (user)
    return (
      <React.Fragment>
        <h1>Hello {user.username} </h1>
        <h2> Welcome to The Rewari</h2>
      </React.Fragment>
    );
  return <h1>Please Login...</h1>;
};
export default home;
