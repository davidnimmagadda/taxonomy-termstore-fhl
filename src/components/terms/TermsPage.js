import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadTerms } from "../../redux/actions/termActions";
import TermList from "./TermList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

function TermsPage(props) {
  const [redirectToAddTermPage, setRedirectToAddTermPage] = useState(false);

  useEffect(() => {
    if (props.terms.length === 0) {
      props
        .loadTerms()
        .catch(error => alert("Loading Terms Failed : " + error));
    }
  }, []);

  return (
    <>
      {redirectToAddTermPage && <Redirect to="/term" />}
      <h2>Terms</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary m-2 add-course"
            onClick={() => setRedirectToAddTermPage(true)}
          >
            Add Course
          </button>
          <TermList {...props} />
        </>
      )}
    </>
  );
}

TermsPage.propTypes = {
  terms: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTerms: PropTypes.func.isRequired
};

function mapStateToProps({ terms, activeApiCalls }) {
  return { terms, loading: activeApiCalls > 0 };
}

const mapDispatchToProps = {
  loadTerms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsPage);
