import React from "react";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";

function Tree({ nodes, onToggle, onSelect }) {
  const getRootNodes = () => {
    return nodes.filter(node => node.isRoot);
  };

  const getChildNodes = node => {
    if (!node.children) return [];
    return node.children.map(path => nodes.find(_ => _.id === path));
  };

  const onNodeSelect = node => {
    onSelect(node);
  };

  const rootNodes = getRootNodes();
  return (
    <div>
      {rootNodes.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          nodes={nodes}
          getChildNodes={getChildNodes}
          onToggle={onToggle}
          onNodeSelect={onNodeSelect}
        />
      ))}
    </div>
  );
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired
};

export default Tree;
