import React from "react";
import PropTypes from "prop-types";
import Contact from "./Contact";
import "./TermDetail.css";

function TermDetail({ termDetails }) {
  return Object.keys(termDetails).length !== 0 ? (
    <div style={{ display: "block", marginLeft: 10 }}>
      <h2>{termDetails.name}</h2>
      <br />
      <p>{termDetails.details}</p>
      <div style={{ display: "flex" }}>
        <Contact className="left-div" contacts={termDetails.contacts} />
        <table className="right-div">
          <thead>
            <tr>
              <th>Unique identifier</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{termDetails.uniqueIdentifier}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <></>
  );
}
TermDetail.propTypes = {
  termDetails: PropTypes.object.isRequired
};

export default TermDetail;
