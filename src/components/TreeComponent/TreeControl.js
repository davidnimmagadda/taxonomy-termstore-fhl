import React from "react";
import { connect } from "react-redux";
import TermDetail from "../terms/TermDetail";
import "./TreeControl.css";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
import TreeComponent from "./TreeComponent";
import {  ChoiceGroup, DefaultButton } from "office-ui-fabric-react";


import { getNode } from "../../api/termApi";
import { thisExpression } from "@babel/types";

let onLoadMore = function() {
   return getNode("termGroups/ai/termSets")

}

let getURI = function(nodeId, parents) {
  const baseURI = "termGroups"
  switch (parents.length) {
    case 0:
      return baseURI;
    case 1:
      return baseURI + "/" + nodeId + "/termSets";
    case 2:
      return baseURI + "/" + parents[1].id + "/termSets/" + nodeId + "/terms";
    default:
      return "terms/" + nodeId + "/terms";
  }
}

let onLoadNode = function(node, parents) {
  let uri = getURI(node.id, parents);
  console.log("uri = " + uri)
  return getNode(uri)
}
let sampleSearchPath = {
  name: "term store",
  type: "folder",
  id: "1",
  children: [{
    name: "People",
    type: "folder",
    id: "ai",
    children:[
      {
        name: "Location",
        type: "folder",
        id: "ad",
        children:[
          {
            name: "Bangalore",
            type: "term",
            id: "w",

          }
        ]
      }
    ]
  }
]
}


export class TreeControl extends React.Component {
constructor(props){
  super(props);
  this.state = {
    selectionMode: 1,
    selectedNodes: {},
    searchPath: {},
    highlightedNodesMap : {},
    orphanHighlightedNodes :new Set([])
  }
  this.onSelect = this.onSelect.bind(this);
  this.onDeselect = this.onDeselect.bind(this);
}

onSelect(node, parents=[]){
  if(this.state.selectionMode <=1){
    this.onSingleSelect(node)
  }else{
    this.onMultiSelect(node);
  }
  if(parents.length === 0){
    this.setState((prevState)=>{
      let orphanHighlightedNodes = prevState.orphanHighlightedNodes;
      orphanHighlightedNodes.add(node.id)
      return {orphanHighlightedNodes: orphanHighlightedNodes}
    })
  }
  this.updateHighlightedNodes([...parents, node], "Highlight");

}

updateHighlightedNodes(nodes, operation){
  let highLightAddition = operation === "Highlight"?1:-1;
  this.setState((prevState) => {

    let highlightedNodesMap =prevState.selectionMode===2? prevState.highlightedNodesMap:{};
    nodes.forEach(function(node){
      let nodeHash = JSON.stringify({id: node.id})
      let oldCount = highlightedNodesMap[nodeHash] !== undefined?highlightedNodesMap[nodeHash]:0;
      highlightedNodesMap[nodeHash] = oldCount + highLightAddition
      if(highlightedNodesMap[nodeHash] <= 0){
        delete highlightedNodesMap[nodeHash]
      }
    })
    return {highlightedNodesMap: highlightedNodesMap}
  })
}




onMultiSelect(node){
  let selectedNodes = {};
  this.setState((prevState) =>{

    selectedNodes = prevState.selectedNodes;
    selectedNodes[JSON.stringify({label: node.name, id: node.id})] = true;
    return {selectedNodes : selectedNodes};
  }
  )
}

onSingleSelect(node){
  this.setState(() =>{

    let selectedNodes = {};
    selectedNodes[JSON.stringify({label: node.name, id: node.id})] = true;
    return {selectedNodes : selectedNodes};
  }
  )
}



onDeselect(node, parents = []){
  let selectedNodes = {};
  this.setState((prevState) =>{

    selectedNodes = prevState.selectedNodes;
    delete selectedNodes[JSON.stringify({label: node.name, id: node.id})];
    return {selectedNodes : selectedNodes};
  }
  )
  let parentsToUnHighLight = parents;
  if(this.state.orphanHighlightedNodes.has(node.id)){
    parentsToUnHighLight = []
  }
  this.updateHighlightedNodes([...parentsToUnHighLight, node], "unHighlight");
}

selectNodesInTree(node){
  this.onSelect(node)
}

onSelectionModeChange(ev, checkedValue){
  // console.log(checkedValue)
  this.setState((prevState) => {
    return {selectionMode: checkedValue.key};
  })
}

hideSearchView(){
  this.setState((prevState) => {
    return {searchPath : {}}
  })
}

showSearchView(searchPath){
  this.setState({searchPath: searchPath})
}

render(){
  //console.log(this.state.highlightedNodesMap)
    let termString = ""
    Object.keys(this.state.selectedNodes).forEach((term) => {
      let parsedTerm = JSON.parse(term)
      termString += parsedTerm.label + "(" + parsedTerm.id + "), ";
    });


  return (
    <div
      style={{
        width: "1000px",
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex"
      }}
    >
      <div
        style={{
          width: "250px",
          borderWidth: "1px",
          borderColor: "#e0dfda",
          borderStyle: "solid"
        }}
      >

        <div>
        Selection Mode
        <ChoiceGroup
        className="defaultChoiceGroup"
        options={[
          {
            key: 0,
             text: "None"
          },
          {
            key: 1,
             text: "Single Select"
          },
          {
            key: 2,
             text: "Multi Select"
          }
        ]}
        selectedKey = {this.state.selectionMode}
        onChange = {(ev, checkedValue) => this.onSelectionModeChange(ev,checkedValue)}
      />
        </div>
        <div className="selectedNodes" id="selectedTermsInTree">
          {termString}
        </div>
        <div><DefaultButton  text="push term bangalore in selection" onClick={() => {this.selectNodesInTree({label: "Bangalore", id: "w"})}}/></div>

        <div><DefaultButton text="show search view" onClick={() => {this.showSearchView(sampleSearchPath)}}/></div>

        <TreeComponent
          loadChildren = {onLoadNode.bind(this)}
          selectionMode = {this.state.selectionMode}
          rootNode = {{
            name: "term store",
            type: "folder",
            id: "1"
          }}

          searchPath = {this.state.searchPath}
          hideSearchView = {this.hideSearchView.bind(this)}
          onSelect = {this.onSelect.bind(this)}
          onDeselect = {this.onDeselect.bind(this)}
          height={300}
          width={400}
          loadNextChildren = {onLoadMore.bind(this)}
          selectedNodes = {this.state.selectedNodes}

          nodeTypeData = {
            {
              "folder" : {
                "iconCollapsed": "FabricFolderFill",
                "iconExpanded": "FabricOpenFolderHorizontal"
              },
              "file" : {
                "iconCollapsed": "Script",
                "iconExpanded": "Script"
              }
            }
          }
          highlightedNodesMap={this.state.highlightedNodesMap}

        />




      </div>
      <div className="details-edit">
        <TermDetail termDetails={this.props.currentItem} />
      </div>
    </div>
  );
}
}

TreeControl.propTypes = {
  currentItem: PropTypes.object.isRequired
};

function mapStateToProps({ currentItem }) {
  return { currentItem };
}

export default connect(mapStateToProps)(TreeControl);
