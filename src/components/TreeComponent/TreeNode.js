import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon, Checkbox, ChoiceGroup, Link } from "office-ui-fabric-react";
import { tsConstructorType } from "@babel/types";

const getPaddingLeft = level => {
  let paddingLeft = level * 20;
  //if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

export class TreeNode extends React.Component{

  constructor(props){

    super(props)

  }


  onNodeDeselect() {

    //this.props.setCurrentTerm(this.props.currNode);
    this.props.onDeselect( this.props.currNode.name,this.props.currNode.id, this.props.parents);
  }

  onNodeSelect() {

    this.props.setCurrentTerm(this.props.currNode);
    this.props.onSelect( this.props.currNode.name,this.props.currNode.id, this.props.parents);
  }

  onNodeSingleSelect() {

    this.props.setCurrentTerm(this.props.currNode);
    this.props.onSingleSelect( this.props.currNode.name,this.props.currNode.id, this.props.parents);
  }



  getParents(){
    return [...this.props.parents, this.props.currNode.id];
  }

  getChevron() {
    return this.props.nodeState.isOpen
      ? "ChevronDownMed"
      : "ChevronRightMed";
  }

  getFolderIcon() {
    // return "FabricFolderFill"
    let iconTypeKey = this.props.nodeState.isOpen?"iconExpanded":"iconCollapsed"
    let icon = this.props.nodeTypeData[this.props.currNode.type][iconTypeKey]
    return icon!==undefined?icon:"";
  }
  render(){

    let isHighLighted = this.props.highlightedNodesMap[this.props.currNode.id]!==undefined;

    let nodeLabel = <span style={{ whiteSpace: "nowrap", width: "100%" }}><Icon style={{ marginRight: 10 }} iconName={this.getFolderIcon()} />
    <span
      role="button"
      style={{ whiteSpace: "nowrap", width: "100%" }}
      onClick={() => this.onNodeSingleSelect()}
    >
      {this.props.currNode.name}({this.props.currNode.id})
    </span></span>

    switch(this.props.selectionMode){

      case 1:{
        const highlightStyle =  {
          root: {
            fontWeight:"bold",
          }
        }
        let styleForOption = () => {
          return isHighLighted?highlightStyle:{}
        }
        nodeLabel =  <ChoiceGroup
        className="defaultChoiceGroup"
        options={[
          {
            key: JSON.stringify({label: this.props.currNode.name,id:  this.props.currNode.id}),
             text: this.props.currNode.name + "(" + this.props.currNode.id + ")",
             styles:styleForOption()
          }
        ]}
        selectedKey = {String(Array.from(this.props.selectedNodes)[0])}
        onChange = {() => this.onNodeSingleSelect()}
      />
        break;
      }

      case 2:{
        const checkboxStyles = () => {
          return {
            root: {
              whiteSpace: "nowrap",
              width: "100%"
            },
            label: {
              whiteSpace: "nowrap",
              width: "100%",
              fontWeight: isHighLighted?"bold":"inherit"
            }
          };
        };
        nodeLabel = <Checkbox checked={this.props.selectedNodes.has(JSON.stringify({label: this.props.currNode.name,id:  this.props.currNode.id}))} label={this.props.currNode.name} onChange={(_ev, checked) =>{if(checked){ this.onNodeSelect();}else{this.onNodeDeselect()}}} styles={checkboxStyles}/>
        break;
      }
    }


    return (this.props.nodeState.loading) ? (
      <Spinner />
      ) : (
      <>
        <div
          className="treeNode"
          style={{
            paddingLeft: getPaddingLeft(this.props.level, this.props.currNode.type),
            display: this.props.show ? "flex" : "none"
          }}
          level={this.props.level}
          type={this.props.currNode.type}
        >

          {this.props.nodeState.isOpen && this.props.nodeState.children.length ==0?(<span style={{marginLeft: 17, marginRight: 5}}>&nbsp;</span>):(<span role="button" onClick={(e) => {this.props.onToggle(this.props.currNode.id, this.props.parents)}}>
            <Icon
              style={{ marginLeft: 5, marginRight: 5 }}
              iconName={this.getChevron()}
            />
          </span>)}


          {nodeLabel}

          {(this.props.nodeTypeData[this.props.currNode.type]["contextMenu"] !== undefined) && (
            <span className= "contextMenuIcon" style={{"marginLeft":"auto", "marginRight":"0px"}}>
            <IconButton
              iconProps={{ iconName: "MoreVertical" }}
              onClick={() => alert("I'm Clicked!")}
            /></span>)
          }

        </div>


        {this.props.nodeState.children.map(childNode => (

          <TreeNodeHelper
            key={childNode.id}
            show={this.props.show && this.props.nodeState.isOpen}
            currNode={childNode}
            level={this.props.level + 1}
            onGetNode = {this.props.onGetNode.bind(this)}
            selectionMode = {this.props.selectionMode}
            nodeState = {this.props.treeState[childNode.id]}
            onToggle={this.props.onToggle}
            treeState = {this.props.treeState}
            onSelect = {this.props.onSelect}
            onDeselect={this.props.onDeselect}
            selectedNodes = {this.props.selectedNodes}
            onSingleSelect= {this.props.onSingleSelect}
            onLoadNext = {this.props.onLoadNext.bind(this)}
            parents = {this.getParents()}
            nodeTypeData = {this.props.nodeTypeData}
            highlightedNodesMap = {this.props.highlightedNodesMap}
          />
        ))}

        <div
          className="treeNode"
          style={{
            paddingLeft: getPaddingLeft(this.props.level+1, this.props.currNode.type) +50,
            display: this.props.nodeState.nextLink !==undefined && this.props.show && this.props.nodeState.children.length >0 && this.props.nodeState.isOpen? "flex" : "none"
          }}
          level={this.props.level}


        ><Link href="#" style={{marginLeft:0}} onClick={()=> {this.props.onLoadNext(this.props.currNode.id)}} >Load More</Link></div>

      </>
    );

}

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
