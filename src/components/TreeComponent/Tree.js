import React, { Component } from "react";
import values from "lodash/values";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";

const data = {
  "/Taxonomy": {
    path: "/Taxonomy",
    type: "folder",
    isRoot: true,
    children: ["/Taxonomy/People", "/Taxonomy/System"],
    id: "Taxonomy"
  },
  "/Taxonomy/People": {
    path: "/Taxonomy/People",
    type: "folder",
    children: [
      "/Taxonomy/People/Department",
      "/Taxonomy/People/JobTitle",
      "/Taxonomy/People/Location"
    ],
    id: "People"
  },
  "/Taxonomy/People/Department": {
    path: "/Taxonomy/People/Department",
    type: "folder",
    children: [],
    id: "Department"
  },
  "/Taxonomy/People/JobTitle": {
    path: "/Taxonomy/People/JobTitle",
    type: "folder",
    children: [],
    id: "JobTitle"
  },
  "/Taxonomy/People/Location": {
    path: "/Taxonomy/People/Location",
    type: "folder",
    children: [
      "/Taxonomy/People/Location/India",
      "/Taxonomy/People/Location/US"
    ],
    id: "Location"
  },

  "/Taxonomy/People/Location/India": {
    path: "/Taxonomy/People/Location/India",
    type: "folder",
    children: [
      "/Taxonomy/People/Location/India/Hyderabad",
      "/Taxonomy/People/Location/India/Bangalore"
    ],
    id: "India"
  },
  "/Taxonomy/People/Location/US": {
    path: "/Taxonomy/People/Location/US",
    type: "folder",
    children: ["/Taxonomy/People/Location/US/Redmond"],
    id: "US"
  },
  "/Taxonomy/People/Location/US/Redmond": {
    path: "/Taxonomy/People/Location/US/Redmond",
    type: "folder",
    children: [],
    id: "Redmond"
  },
  "/Taxonomy/People/Location/India/Hyderabad": {
    path: "/Taxonomy/People/Location/India/Hyderabad",
    type: "folder",
    children: [],
    id: "Hyderabad"
  },

  "/Taxonomy/People/Location/India/Bangalore": {
    path: "/Taxonomy/People/Location/India/Bangalore",
    type: "folder",
    children: [],
    id: "Bangalore"
  },

  "/Taxonomy/System": {
    path: "/Taxonomy/System",
    type: "folder",
    children: [
      "/Taxonomy/System/Hastags",
      "/Taxonomy/System/Keywords",
      "/Taxonomy/System/OrphanedTerms"
    ],
    id: "System"
  },
  "/Taxonomy/System/Hastags": {
    path: "/Taxonomy/System/Hastags",
    type: "folder",
    children: [],
    id: "Hashtags"
  },
  "/Taxonomy/System/Keywords": {
    path: "/Taxonomy/System/Keywords",
    type: "folder",
    children: [],
    id: "Keywords"
  },

  "/Taxonomy/System/OrphanedTerms": {
    path: "/Taxonomy/System/OrphanedTerms",
    type: "folder",
    children: [],
    id: "OrphanedTerms"
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
