import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TermList = ({ terms }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {terms.map(term => (
        <tr key={term.id}>
          <td>
            <a
              className="btn btn-light"
              href={"http://pluralsight.com/courses/" + term.slug}
            >
              Watch
            </a>
          </td>
          <td>
            <Link to={"/term/" + term.slug}>{term.title}</Link>
          </td>
          <td>{term.authorId}</td>
          <td>{term.category}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TermList.propTypes = {
  terms: PropTypes.array.isRequired
};

export default TermList;
