import React from "react";
import TreeNodeHelper from "./TreeNodeHelper";
import {
  Spinner,
  IconButton,
  Icon,
  Checkbox,
  ChoiceGroup,
  Link
} from "office-ui-fabric-react";

function getPaddingLeft(level) {
  return level * 20;
}
export function TreeNode(props) {
  let nodeContent = getNodeContent();
  return props.nodeState.loading ? (
    <Spinner />
  ) : (
    <>
      <div
        className="treeNode"
        style={{
          paddingLeft: getPaddingLeft(props.level, props.node.type),
          display: props.isVisible ? "flex" : "none"
        }}
        level={props.level}
        type={props.node.type}
      >
        {props.nodeState.isExpanded && props.nodeState.children.length == 0 ? (
          <span style={{ marginLeft: 17, marginRight: 5 }}>&nbsp;</span>
        ) : (
          <span
            role="button"
            onClick={e => {
              props.onToggle(props.node, props.parents);
            }}
          >
            <Icon
              style={{ marginLeft: 5, marginRight: 5 }}
              iconName={getChevron()}
            />
          </span>
        )}
        {nodeContent}
        {props.nodeTypeData[props.node.type]["contextMenu"] !==
          undefined && (
          <span
            className="contextMenuIcon"
            style={{ marginLeft: "auto", marginRight: "0px" }}
          >
            <IconButton
              iconProps={{ iconName: "MoreVertical" }}
              onClick={() => alert("I'm Clicked!")}
            />
          </span>
        )}
      </div>
      {renderChildren(props.nodeState.children)}
      <div
        className="treeNode"
        style={{
          paddingLeft:
            getPaddingLeft(props.level + 1, props.node.type) + 50,
          display:
            props.nodeState.nextLink !== undefined &&
            props.isVisible &&
            props.nodeState.children.length > 0 &&
            props.nodeState.isExpanded
              ? "flex"
              : "none"
        }}
        level={props.level}
      >
        <Link
          href="#"
          style={{ marginLeft: 0 }}
          onClick={() => {
            props.onLoadNext(props.node, props.parents);
          }}
        >
          Load More
        </Link>
      </div>
    </>
  );

  function onDeselect() {
    props.onDeselect(props.node, props.parents);
  }

  function onSelect() {
    props.onSelect(props.node, props.parents);
  }

  function getParents() {
    return [...props.parents, props.node];
  }

  function getChevron() {
    return props.nodeState.isExpanded ? "ChevronDownMed" : "ChevronRightMed";
  }

  function getIcon() {
    let iconTypeKey = props.nodeState.isExpanded ? "iconExpanded" : "iconCollapsed";
    let icon = props.nodeTypeData[props.node.type][iconTypeKey];
    return icon !== undefined ? icon : "";
  }

  function renderChildren(nodeChildren) {
    return (
      <>
        {nodeChildren.map(childNode => (
          <TreeNodeHelper
            key = {props.getNodeKey(childNode)}
            isVisible={props.isVisible && props.nodeState.isExpanded}
            node={childNode}
            level={props.level + 1}
            selectionMode={props.selectionMode}
            nodeState={props.treeState[props.getNodeKey(childNode)]}
            onToggle={props.onToggle}
            treeState={props.treeState}
            onSelect={props.onSelect}
            onDeselect={props.onDeselect}
            selectedNodes={props.selectedNodes}
            onLoadNext={props.onLoadNext.bind(this)}
            parents={getParents()}
            nodeTypeData={props.nodeTypeData}
            highlightedNodesMap={props.highlightedNodesMap}
            getNodeKey = {props.getNodeKey}
          />
        ))}
      </>
    );
  }

  function getNodeContent() {
    let isHighLighted =
      props.highlightedNodesMap[JSON.stringify({id: props.node.id})] !== undefined;
    let nodeLabel = (
      <span style={{ whiteSpace: "nowrap", width: "100%" }}>
        <Icon style={{ marginRight: 10 }} iconName={getIcon()} />
        <span
          role="button"
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onClick={() => onSelect()}
        >
          {props.node.name}({props.node.id})
        </span>
      </span>
    );
    switch (props.selectionMode) {
      case 1: {
        const highlightStyle = {
          root: {
            fontWeight: "bold"
          }
        };
        let styleForOption = () => {
          return isHighLighted ? highlightStyle : {};
        };
        nodeLabel = (
          <ChoiceGroup
            className="defaultChoiceGroup"
            options={[
              {
                key: JSON.stringify({
                  label: props.node.name,
                  id: props.node.id
                }),
                text: props.node.name,
                styles: styleForOption()
              }
            ]}
            selectedKey={Object.keys(props.selectedNodes)[0]}
            onChange={() => onSelect()}
          />
        );
        break;
      }
      case 2: {
        const checkboxStyles = () => {
          return {
            root: {
              whiteSpace: "nowrap",
              width: "100%"
            },
            label: {
              whiteSpace: "nowrap",
              width: "100%",
              fontWeight: isHighLighted ? "bold" : "inherit"
            }
          };
        };
        nodeLabel = (
          <Checkbox
            checked={props.selectedNodes[
              JSON.stringify({
                label: props.node.name,
                id: props.node.id
              })]===true
            }
            label={props.node.name}
            onChange={(_ev, checked) => {
              if (checked) {
                onSelect();
              } else {
                onDeselect();
              }
            }}
            styles={checkboxStyles}
          />
        );
        break;
      }
    }
    return nodeLabel;
  }
}
export default TreeNode;
