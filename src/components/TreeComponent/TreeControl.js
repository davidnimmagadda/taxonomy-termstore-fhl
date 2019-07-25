import React, { Component } from "react";
import styled from "styled-components";
import Tree from "./Tree";
import TermDetail from "../terms/TermDetail";
import { getAll } from "../../api/termStoreApi";

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
    selectedFile: null,
    nodes: []
  };

  componentDidMount() {
    getAll().then(resp => this.setState({ ...this.state, nodes: resp }));
  }

  onSelect = file => this.setState({ selectedFile: file });

  onToggle = node => {
    const { nodes } = this.state;
    nodes.find(_ => _.id === node.id).isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  render() {
    let { selectedFile } = "";
    selectedFile = this.state;
    if (this.state.nodes.length === 0) return <></>;
    if (this.state.selectedFile == null) {
      return (
        <StyledTreeComponent>
          <TreeWrapper>
            <Tree
              onSelect={this.onSelect}
              nodes={this.state.nodes}
              onToggle={this.onToggle}
            />
          </TreeWrapper>
        </StyledTreeComponent>
      );
    }
    return (
      <>
        <StyledTreeComponent>
          <TreeWrapper>
            <Tree
              onSelect={this.onSelect}
              nodes={this.state.nodes}
              onToggle={this.onToggle}
            />
          </TreeWrapper>
          <TermDetail termDetails={selectedFile} />
        </StyledTreeComponent>
      </>
    );
  }
}
