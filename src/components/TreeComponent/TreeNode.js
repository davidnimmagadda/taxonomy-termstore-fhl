import React, { useState } from "react";
import { connect } from "react-redux";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getNode } from "../../api/termApi";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";

const getPaddingLeft = level => {
  let paddingLeft = level * 20;
  //if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => (props.marginRight ? props.marginRight : 5)}px;
`;

function TreeNode({ level, currNode, uri, setCurrentTerm }) {
  const [node, setNode] = useState(currNode);
  const [children, setChildren] = useState([]);

  function onToggle() {
    if (!node.isOpen) {
      // call load children
      loadChildren();
      // set node isOpen true
      setNode({ ...node, isOpen: true });
    } else {
      setNode({ ...node, isOpen: false });
    }
  }

  async function loadChildren() {
    if (children.length === 0 && node.type === "folder") {
      const response = await getNode(uri);
      setChildren(response);
    }
  }

  function onNodeSelect() {
    loadChildren();
    setCurrentTerm(node);
  }

  function getUri(childNode) {
    switch (level) {
      case 0:
        return uri + "/" + childNode.id + "/termSets";
      case 1:
        return uri + "/" + childNode.id + "/terms";
      default:
        return "terms/" + childNode.id + "/terms";
    }
  }

  return (
    <>
      <StyledTreeNode level={level} type={node.type}>
        <NodeIcon onClick={() => onToggle(node)}>
          {node.type === "folder" &&
            (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === "file" && <FaFile />}
          {node.type === "folder" && node.isOpen === true && <FaFolderOpen />}
          {node.type === "folder" && !node.isOpen && <FaFolder />}
        </NodeIcon>

        <span role="button" onClick={onNodeSelect}>
          {node.name}
        </span>
      </StyledTreeNode>

      {node.isOpen &&
        children.map(childNode => (
          <TreeNodeHelper
            key={childNode.id}
            currNode={childNode}
            level={level + 1}
            uri={getUri(childNode)}
          />
        ))}
    </>
  );
}

TreeNode.propTypes = {
  level: PropTypes.number.isRequired,
  currNode: PropTypes.object.isRequired,
  uri: PropTypes.string.isRequired,
  setCurrentTerm: PropTypes.func.isRequired
};

TreeNode.defaultProps = {
  level: 0,
  currNode: {
    name: "term store",
    type: "folder"
  },
  uri: "termGroups"
};

export default connect(
  () => {
    return {};
  },
  {
    setCurrentTerm
  }
)(TreeNode);
