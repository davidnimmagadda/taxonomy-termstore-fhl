import React from "react";
import { connect } from "react-redux";
import TermDetail from "../terms/TermDetail";
import "./TreeControl.css";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
import { getNode } from "../../api/termApi";


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
        <TreeNode
          onGetNode = {getNode.bind(this)}
          selectionMode = {2}

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
