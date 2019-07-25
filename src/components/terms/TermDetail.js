import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contact from "./Contact";
import { loadTermDetails } from "../../redux/actions/termActions";
import "./TermDetail.css";

function TermDetail(props) {
  useEffect(() => {
    props
      .loadTermDetails()
      .catch(error => alert("Loading Terms Failed : " + error));
  }, []);
  let requiredDetails = "default";
  if (props.termDetails.length > 0) {
    requiredDetails = props.termDetails.find(a => a.id === props.term);
    return (
      <>
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
      </>
    );
  }
  return <h1>Default</h1>;
}
TermDetail.propTypes = {
  term: PropTypes.string.isRequired,
  loadTermDetails: PropTypes.func.isRequired,
  termDetails: PropTypes.array.isRequired
};
function mapStateToProps({ termDetails, activeApiCalls }) {
  return { termDetails, loading: activeApiCalls > 0 };
}

const mapDispatchToProps = {
  loadTermDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermDetail);
