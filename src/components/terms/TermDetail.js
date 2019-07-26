import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contact from "./Contact";
import "./TermDetail.css";

function TermDetail({ termDetails }) {
  return (
    <div style={{ display: "block", marginLeft: 10, width: 1000 }}>
      <div style={{ display: "flex" }}>
        <h3>{termDetails.name}</h3>
        <a href="#">Edit</a>
      </div>{" "}
      <br />
      <p>{termDetails.details}</p>
      <Contact className="left-div" contacts={termDetails.contacts} />
      <table className="right-div">
        <thead>
          <tr>
            <th>Unique identifier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{termDetails.uniqueIdentifier}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
TermDetail.propTypes = {
  termDetails: PropTypes.object.isRequired
};
function mapStateToProps({ termstore, activeApiCalls }) {
  return { termDetails: termstore.currentTerm, loading: activeApiCalls > 0 };
}

export default connect(mapStateToProps)(TermDetail);
