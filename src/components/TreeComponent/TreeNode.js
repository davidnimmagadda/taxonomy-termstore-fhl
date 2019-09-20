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
  let nodeLabel = getNodeLabel();
  return props.nodeState.loading ? (
    <Spinner />
  ) : (
    <>
      <div
        className="treeNode"
        style={{
          paddingLeft: getPaddingLeft(props.level, props.currNode.type),
          display: props.isVisible ? "flex" : "none"
        }}
        level={props.level}
        type={props.currNode.type}
      >
        {props.nodeState.isOpen && props.nodeState.children.length == 0 ? (
          <span style={{ marginLeft: 17, marginRight: 5 }}>&nbsp;</span>
        ) : (
          <span
            role="button"
            onClick={e => {
              props.onToggle(props.currNode.id, props.parents);
            }}
          >
            <Icon
              style={{ marginLeft: 5, marginRight: 5 }}
              iconName={getChevron()}
            />
          </span>
        )}
        {nodeLabel}
        {props.nodeTypeData[props.currNode.type]["contextMenu"] !==
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
            getPaddingLeft(props.level + 1, props.currNode.type) + 50,
          display:
            props.nodeState.nextLink !== undefined &&
            props.isVisible &&
            props.nodeState.children.length > 0 &&
            props.nodeState.isOpen
              ? "flex"
              : "none"
        }}
        level={props.level}
      >
        <Link
          href="#"
          style={{ marginLeft: 0 }}
          onClick={() => {
            props.onLoadNext(props.currNode.id);
          }}
        >
          Load More
        </Link>
      </div>
    </>
  );

  function onDeselect() {
    props.onDeselect(props.currNode.name, props.currNode.id, props.parents);
  }

  function onSelect() {
    props.onSelect(props.currNode.name, props.currNode.id, props.parents);
  }

  function getParents() {
    return [...props.parents, props.currNode.id];
  }

  function getChevron() {
    return props.nodeState.isOpen ? "ChevronDownMed" : "ChevronRightMed";
  }

  function getIcon() {
    let iconTypeKey = props.nodeState.isOpen ? "iconExpanded" : "iconCollapsed";
    let icon = props.nodeTypeData[props.currNode.type][iconTypeKey];
    return icon !== undefined ? icon : "";
  }

  function renderChildren(nodeChildren) {
    return (
      <>
        {nodeChildren.map(childNode => (
          <TreeNodeHelper
            key={childNode.id}
            isVisible={props.isVisible && props.nodeState.isOpen}
            currNode={childNode}
            level={props.level + 1}
            onGetNode={props.onGetNode.bind(this)}
            selectionMode={props.selectionMode}
            nodeState={props.treeState[childNode.id]}
            onToggle={props.onToggle}
            treeState={props.treeState}
            onSelect={props.onSelect}
            onDeselect={props.onDeselect}
            selectedNodes={props.selectedNodes}
            onSingleSelect={props.onSingleSelect}
            onLoadNext={props.onLoadNext.bind(this)}
            parents={getParents()}
            nodeTypeData={props.nodeTypeData}
            highlightedNodesMap={props.highlightedNodesMap}
          />
        ))}
      </>
    );
  }

  function getNodeLabel() {
    let isHighLighted =
      props.highlightedNodesMap[props.currNode.id] !== undefined;
    let nodeLabel = (
      <span style={{ whiteSpace: "nowrap", width: "100%" }}>
        <Icon style={{ marginRight: 10 }} iconName={getIcon()} />
        <span
          role="button"
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onClick={() => onSelect()}
        >
          {props.currNode.name}({props.currNode.id})
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
                  label: props.currNode.name,
                  id: props.currNode.id
                }),
                text: props.currNode.name,
                styles: styleForOption()
              }
            ]}
            selectedKey={String(Array.from(props.selectedNodes)[0])}
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
            checked={props.selectedNodes.has(
              JSON.stringify({
                label: props.currNode.name,
                id: props.currNode.id
              })
            )}
            label={props.currNode.name}
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
