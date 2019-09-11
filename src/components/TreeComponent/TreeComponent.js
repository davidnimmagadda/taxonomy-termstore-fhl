import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon, Checkbox } from "office-ui-fabric-react";
import { tsConstructorType } from "@babel/types";
import TreeNode from "./TreeNode";


class TreeComponent extends React.Component{
  constructor(props){
    super(props);
    let rootNodeID = props.currNode.id;
    console.log('rootNodeID is' + rootNodeID);
    let treeState = {};
    treeState[rootNodeID] = {
      node: props.currNode,
      children: [],
      loading: false,
      highlighted: false
    }
    treeState["selectedTerms"] = [];
    console.log("tree component constructrer")
    this.state = treeState;

    this.onToggle = this.onToggle.bind(this);
    this.addNodeInState = this.addNodeInState.bind(this);
  }

  onToggle(nodeId, uri) {

          let prevState = this.state;

          let isOpen = false;

          if (!prevState[nodeId].node.isOpen) {
            // call load children
            console.log(" node is not open")
            const res = this.loadChildren(nodeId, uri);
            // set node isOpen true

            isOpen = true;
          } else {
            isOpen = false;
          }
          this.setState((prevState) => {
            let treeStateChanges = {
            };

            treeStateChanges[nodeId] = {
              ...prevState[nodeId], node: { ...prevState[nodeId].node, isOpen: isOpen }
            };


            return treeStateChanges
          });



  }

  addNodeInState(currNode){
    let nodeState = {};
    nodeState[currNode.id] = {
      node: currNode,
      children: [],
      loading: false,
      highlighted: false
    }

    this.setState((prevState) => { return nodeState})
  }

  async loadChildren(nodeId, uri) {
    if (this.state[nodeId].children.length === 0 && this.state[nodeId].node.type === "folder") {

      this.setState((prevState) => {
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: true
        };

        return treeStateChanges;
      })

      const response = await this.props.onGetNode(uri);
      console.log("got response = ")
      console.log(JSON.stringify(response))
      this.setState((prevState) =>{
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: false
        };
        return treeStateChanges;
      })
      this.setState((prevState) =>{
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], children: response
        };
        response.forEach((currNode) => {

          treeStateChanges[currNode.id] = {
            node: currNode,
            children: [],
            loading: false,
            highlighted: false
          }
        })

        return treeStateChanges;
      })
      console.log("state is " + JSON.stringify(this.state))



    }
  }

  render(){


    return <TreeNode {...this.props} nodeState = {this.state[this.props.currNode.id]} onToggle={this.onToggle}
    treeState = {this.state} addNodeInState={this.addNodeInState}
     />;
  }
}

export default TreeComponent;