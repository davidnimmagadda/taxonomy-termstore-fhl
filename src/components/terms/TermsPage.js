import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import TreeControl from "../TreeComponent/TreeControl";

function TermsPage(props) {
  const [redirectToAddTermPage, setRedirectToAddTermPage] = useState(false);

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
          <TreeControl />
        </>
      )}
    </>
  );
}

TermsPage.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default TermsPage;
