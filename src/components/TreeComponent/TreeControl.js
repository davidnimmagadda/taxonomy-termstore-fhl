import React from "react";
import { connect } from "react-redux";
import TermDetail from "../terms/TermDetail";
import "./TreeControl.css";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
import TreeComponent from "./TreeComponent";

import { getNode } from "../../api/termApi";

let handleOnSelect = (terms) => {
  let termString = ""
  Array.from(terms).forEach((term) => {
    let parsedTerm = JSON.parse(term)
    termString += parsedTerm.label + "(" + parsedTerm.id + ")";
  });
  document.getElementById("selectedTermsInTree").innerText = termString;

}

let onLoadMore = function() {
  return getNode("termGroups/ai/termSets")

}

function TreeControl({ currentItem }) {


  return (
    <div
      style={{
        width: "1000px",
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex"
      }}
    >
      <div
        style={{
          width: "250px",
          borderWidth: "1px",
          borderColor: "#e0dfda",
          borderStyle: "solid"
        }}
      >
        <div id="selectedTermsInTree">
        </div>
        <TreeComponent
          onGetNode = {getNode.bind(this)}
          selectionMode = {1}
          currNode = {{
            name: "term store",
            type: "folder",
            id: "1"
          }}

          uri = {"termGroups"}

          onSelect = {handleOnSelect.bind(this)}
          height={300}
          width={400}
          onLoadMore = {onLoadMore.bind(this)}

        />




      </div>
      <div className="details-edit">
        <TermDetail termDetails={currentItem} />
      </div>
    </div>
  );
}

TreeControl.propTypes = {
  currentItem: PropTypes.object.isRequired
};

function mapStateToProps({ currentItem }) {
  return { currentItem };
}

export default connect(mapStateToProps)(TreeControl);
