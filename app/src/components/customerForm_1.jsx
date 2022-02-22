import React from "react";
const CustomerForm = ({ match, history }) => {
  return (
    <div>
      <h1>Customer Form {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/customers")}
      >
        Save
      </button>
    </div>
  );
};
export default CustomerForm;
