import React from "react";
const ComplaintForm = ({ match, history }) => {
  return (
    <div>
      <h1>Complaint Form {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/complaints")}
      >
        Save
      </button>
    </div>
  );
};
export default ComplaintForm;
