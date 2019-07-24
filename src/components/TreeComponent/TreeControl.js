import React, { Component } from "react";
import styled from "styled-components";
import Tree from "./Tree";

const StyledTreeComponent = styled.div`
  width: 800px;
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
    const { selectedFile } = this.state;

    return (
      <StyledTreeComponent>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} />
        </TreeWrapper>
        <div>{selectedFile && selectedFile.content}</div>
      </StyledTreeComponent>
    );
  }
}
