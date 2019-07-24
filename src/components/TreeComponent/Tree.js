import React, { Component } from "react";
import values from "lodash/values";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";

const data = {
  "/termstore": {
    path: "/termstore",
    type: "folder",
    isRoot: true,
    children: ["/termstore/Group1", "/termstore/Group2"],
    content: "This is a sample termstore"
  },
  "/termstore/Group1": {
    path: "/termstore/Group1",
    type: "folder",
    children: ["/termstore/Group1/TestTerm"]
  },
  "/termstore/Group1/TestTerm": {
    path: "/termstore/Group1/TestTerm",
    type: "folder",
    children: ["/termstore/Group1/TestTerm/SubTerm"]
  },

  "/termstore/Group1/TestTerm/SubTerm": {
    path: "/termstore/Group1/TestTerm/SubTerm",
    type: "folder",
    children: []
  },
  "/termstore/Group2": {
    path: "/termstore/Group2",
    type: "folder",
    children: ["/termstore/Group2/TermSet1", "/termstore/Group2/TermSet2"]
  },
  "/termstore/Group2/TermSet1": {
    path: "/termstore/Group2/TermSet1",
    type: "folder",
    children: [
      "/termstore/Group2/TermSet1/Term1",
      "/termstore/Group2/TermSet1/Term2"
    ]
  },
  "/termstore/Group2/TermSet1/Term1": {
    path: "/termstore/Group2/TermSet1/Term1",
    type: "folder",
    children: []
  },

  "/termstore/Group2/TermSet1/Term2": {
    path: "/termstore/Group2/TermSet1/Term2",
    type: "folder",
    children: []
  },
  "/termstore/Group2/TermSet2": {
    path: "/termstore/Group2/TermSet2",
    type: "folder",
    children: []
  }
};

export default class Tree extends Component {
  state = {
    nodes: data
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  };

  getChildNodes = node => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  onToggle = node => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        {rootNodes.map((node, i) => (
          <TreeNode
            key={i}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
