import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadTermDetails } from "../../redux/actions/termActions";

function TermDetail({ term, ...props }) {
  useEffect(() => {
    if (props.terms.length === 0) {
      props
        .loadTermDetails()
        .catch(error => alert("Loading Terms Failed : " + error));
    }
  }, []);
  return <div>Term {term}</div>;
}
TermDetail.propTypes = {
  term: PropTypes.string.isRequired,
  terms: PropTypes.array.isRequired
};
function mapStateToProps({ terms, activeApiCalls }) {
  return { terms, loading: activeApiCalls > 0 };
}

const mapDispatchToProps = {
  loadTermDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermDetail);
