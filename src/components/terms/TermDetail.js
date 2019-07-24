import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
function TermDetail({ term }) {
  return <div>Term {term}</div>;
}
TermDetail.propTypes = {
  term: PropTypes.string.isRequired
};
export default TermDetail;
