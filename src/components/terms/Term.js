import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TermDetail from "./TermDetail";
function ManageTermsPage(props) {
  const term = props.term;
  return (
    <>
      <TermDetail term={term} />
    </>
  );
}
export function getTermBySlug(terms, slug) {
  return slug;
}
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const term = slug;
  return {
    term,
    courses: state.courses,
    authors: state.authors
  };
}
ManageTermsPage.propTypes = {
  terms: PropTypes.array.isRequired,
  term: PropTypes.string.isRequired
};
export default connect(mapStateToProps)(ManageTermsPage);
