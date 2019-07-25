import React, { Component } from "react";
import styled from "styled-components";
import Tree from "./Tree";
import TermDetail from "../terms/TermDetail";
import Route from "react-router-dom";

const StyledTreeComponent = styled.div`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

export default class TreeControl extends Component {
  state = {
    selectedFile: null
  };

  onSelect = file => this.setState({ selectedFile: file });

  render() {
    let { selectedFile } = "";
    selectedFile = this.state;

    if (this.state.selectedFile == null) {
      return (
        <StyledTreeComponent>
          <TreeWrapper>
            <Tree onSelect={this.onSelect} />
          </TreeWrapper>
        </StyledTreeComponent>
      );
    }
    return (
      <>
        <StyledTreeComponent>
          <TreeWrapper>
            <Tree onSelect={this.onSelect} />
          </TreeWrapper>
          <TermDetail term={selectedFile.selectedFile.id} />
        </StyledTreeComponent>
      </>
    );
  }
}
