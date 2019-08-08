import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNode } from "../../api/termApi";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon } from "office-ui-fabric-react";

const getPaddingLeft = level => {
  let paddingLeft = level * 20;
  //if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

function TreeNode({ level, currNode, uri, setCurrentTerm, show }) {
  const [node, setNode] = useState(currNode);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighLighted] = useState(false);

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
      setLoading(true);
      const response = await getNode(uri);
      setLoading(false);
      setChildren(response);
    }
  }

  function onNodeSelect() {
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

  function getChevron() {
    return node.type === "folder" && node.isOpen
      ? "ChevronDownMed"
      : "ChevronRightMed";
  }

  function getFolderIcon() {
    return node.type === "file"
      ? "Script"
      : node.type === "folder" && node.isOpen
      ? "FabricOpenFolderHorizontal"
      : node.type === "folder" && !node.isOpen
      ? "FabricFolderFill"
      : "";
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div
        className="treeNode"
        style={{
          paddingLeft: getPaddingLeft(level, node.type),
          display: show ? "flex" : "none"
        }}
        level={level}
        type={node.type}
        onMouseEnter={() => setHighLighted(true)}
        onMouseLeave={() => setHighLighted(false)}
      >
        <span role="button" onClick={() => onToggle(node)}>
          <Icon
            style={{ marginLeft: 5, marginRight: 5 }}
            iconName={getChevron()}
          />
        </span>
        <Icon style={{ marginRight: 10 }} iconName={getFolderIcon()} />
        <span
          role="button"
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onClick={onNodeSelect}
        >
          {node.name}
        </span>
        {highlighted && (
          <IconButton
            iconProps={{ iconName: "MoreVertical" }}
            onClick={() => alert("I'm Clicked!")}
          />
        )}
      </div>

      {children.map(childNode => (
        <TreeNodeHelper
          key={childNode.id}
          show={show && node.isOpen}
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
  show: true,
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
