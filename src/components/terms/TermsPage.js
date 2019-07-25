import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import TreeControl from "../TreeComponent/TreeControl";

function TermsPage() {
  const [redirectToAddTermPage, setRedirectToAddTermPage] = useState(false);

  return (
    <>
      {redirectToAddTermPage && <Redirect to="/term" />}
      <h2>Terms</h2>
      <button
        className="btn btn-primary m-2 add-course"
        onClick={() => setRedirectToAddTermPage(true)}
      >
        Add Course
      </button>
      <TreeControl />
    </>
  );
}

export default TermsPage;
