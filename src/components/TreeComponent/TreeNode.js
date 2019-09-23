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


export function TreeNode(props) {
  let showSpinner = props.nodeState.loading;
  if(showSpinner){
    return <Spinner />;
  }
  let getDisplayStyle = function(){
    if(props.isVisible){
      return "flex";
    }
    return "none";
  }
  let getDisplayStyleForLoadMoreLink = function(){
    if( props.nodeState.nextLink !== undefined &&
      props.isVisible &&
      props.nodeState.children.length > 0 &&
      props.nodeState.isExpanded){
        return "flex";
      }
      return "none";
  }
  let getToggleButton = function(){
    if(props.nodeState.isExpanded && props.nodeState.children.length === 0) {
      return <span style={{ marginLeft: 17, marginRight: 5 }}>&nbsp;</span>
     }
     return <span
        onClick={() => {
          props.onToggle(props.node, props.parents);
        }}
      >
        <Icon
          style={{ marginLeft: 5, marginRight: 5 }}
          iconName={getChevron()}
        />
      </span>
  }



  function getPaddingLeft() {
    let paddingLeft = props.level * 20;

    return paddingLeft;
  }
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
     if(props.nodeState.isExpanded){
        return  "ChevronDownMed"
     }
     return "ChevronRightMed";
  }

  function getIcon() {
    let iconTypeKey = "iconCollapsed";
    if(props.nodeState.isExpanded){
      return "iconExpanded"
    }
    let icon = props.nodeTypeData[props.node.type][iconTypeKey];
    if(icon === undefined ){
      return ""
    }
    return icon;
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
            isNodeSelectable = {true}
          />
        ))}
      </>
    );
  }
  const highlightStyle = {
    fontWeight: "bold"
  };
  function getStyleForHeading(isHighlighted){
    if(isHighlighted){
      return highlightStyle;
    }
    return undefined
  }

  function getNodeContent() {

    const nodeDisplayText = props.nodeState.label;
    let isHighLighted =
      props.highlightedNodesMap[JSON.stringify({id: props.node.id})] !== undefined;
    if(!props.isNodeSelectable){
      return <span className="unSelectableNode" style={getStyleForHeading(isHighLighted)}>{nodeDisplayText}</span>
    }
    let nodeLabel = (
      <span style={{ whiteSpace: "nowrap", width: "100%" }}>
        <Icon style={{ marginRight: 10 }} iconName={getIcon()} />
        <span
          role="button"
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onClick={() => onSelect()}
        >
          {nodeDisplayText}
        </span>
      </span>
    );
    switch (props.selectionMode) {
      case 1: {
        const choiceBoxHighlightedStyle = {
          root: highlightStyle
        };
        let getStyleForChoiceGroup = function(){
          if(isHighLighted){
            return choiceBoxHighlightedStyle;
          }
          return undefined;
        }

        nodeLabel = (
          <ChoiceGroup
            className="defaultChoiceGroup"
            options={[
              {
                key: JSON.stringify({
                  label: props.nodeState.label,
                  id: props.node.id
                }),
                text: props.nodeState.label,
                styles: getStyleForChoiceGroup(),
                disabled:props.node.isDisabled
              }
            ]}
            selectedKey={Object.keys(props.selectedNodes)[0]}
            onChange={() => onSelect()}
          />
        );
        break;
      }
      case 2: {
        let getStyleForCheckBox = function(){
          if(isHighLighted){
            return "bold";
          }
          return "inherit";
        }
        const checkboxStyles = () => {
          return {
            root: {
              whiteSpace: "nowrap",
              width: "100%"
            },
            label: {
              whiteSpace: "nowrap",
              width: "100%",
              fontWeight: getStyleForCheckBox()
            }
          };
        };
        nodeLabel = (
          <Checkbox
            checked={props.selectedNodes[
              JSON.stringify({
                label: props.nodeState.label,
                id: props.node.id
              })]===true
            }
            disabled={props.node.isDisabled}
            label={props.nodeState.label}
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
  return <>
      <div
        className="treeNode"
        style={{
          paddingLeft: getPaddingLeft(),
          display: getDisplayStyle()
        }}
      >
        {getToggleButton()}
        {getNodeContent()}
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
            getPaddingLeft() + 70,
          display: getDisplayStyleForLoadMoreLink()
        }}
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
}
export default TreeNode;
