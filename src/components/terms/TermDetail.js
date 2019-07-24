import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contact from "./Contact";
import { loadTermDetails } from "../../redux/actions/termActions";

function TermDetail(props) {
  useEffect(() => {
    props
      .loadTermDetails()
      .catch(error => alert("Loading Terms Failed : " + error));
  }, []);
  let requiredDetails = "default";
  if (props.termDetails.length > 0) {
    requiredDetails = props.termDetails.find(a => a.id === props.term);
  }
  return (
    <>
      <h2>{requiredDetails.name}</h2>
      <br />
      <p>{requiredDetails.details}</p>
      <hr />
      <Contact className="left-div" contacts={requiredDetails.contacts} />
      <div className="right-div">{requiredDetails.uniqueIdentifier}</div>
    </>
  );
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
