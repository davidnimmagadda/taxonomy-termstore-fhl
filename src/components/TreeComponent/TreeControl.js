import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TermDetail from "../terms/TermDetail";
import "./TreeControl.css";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";

const StyledTreeComponent = styled.div`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

function TreeControl({ currentItem }) {
  return (
    <StyledTreeComponent>
      <TreeWrapper>
        <TreeNode />
      </TreeWrapper>
      <div className="details-edit">
        <TermDetail termDetails={currentItem} />
      </div>
    </StyledTreeComponent>
  );
}

TreeControl.propTypes = {
  currentItem: PropTypes.object.isRequired
};

function mapStateToProps({ currentItem }) {
  return { currentItem };
}

export default connect(mapStateToProps)(TreeControl);
