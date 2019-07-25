import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contact from "./Contact";
import "./TermDetail.css";

function TermDetail(props) {
  let requiredDetails = "default";
  if (props.termDetails) {
    requiredDetails = props.termDetails;
    return (
      <div style={{ display: "block" }}>
        <h2>{requiredDetails.name}</h2>
        <br />
        <p>{requiredDetails.details}</p>
        <Contact className="left-div" contacts={requiredDetails.contacts} />
        <table className="right-div">
          <thead>
            <th>Unique identifier</th>
          </thead>
          <tbody>
            <tr>
              <td>{requiredDetails.uniqueIdentifier}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return <h1>Default</h1>;
}
TermDetail.propTypes = {
  termDetails: PropTypes.object.isRequired
};
function mapStateToProps({ termstore, activeApiCalls }) {
  return { termDetails: termstore.currentTerm, loading: activeApiCalls > 0 };
}

export default connect(mapStateToProps)(TermDetail);
