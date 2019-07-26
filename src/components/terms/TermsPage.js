import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import TreeControl from "../TreeComponent/TreeControl";

function TermsPage() {
  const [redirectToAddTermPage, setRedirectToAddTermPage] = useState(false);

  return (
    <>
      {redirectToAddTermPage && <Redirect to="/term" />}
      <h2>Terms</h2>
      <TreeControl />
    </>
  );
}

export default TermsPage;
