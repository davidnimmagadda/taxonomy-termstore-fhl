import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon, Checkbox, Link } from "office-ui-fabric-react";
import { tsConstructorType, numericLiteral } from "@babel/types";
import TreeNode from "./TreeNode";


class TreeComponent extends React.Component{
  constructor(props){
    super(props);
    let rootNodeID = props.currNode.id;
    // console.log('rootNodeID is' + rootNodeID);
    let treeState = {};
    treeState[rootNodeID] = {
      children: [],
      loading: false
    }
    treeState["selectedNodes"] = new Set([]);
    // console.log("tree component constructrer")
    this.state = treeState;

    this.onToggle = this.onToggle.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    // this.onDeselect = this.onDeselect.bind(this);
    // this.onSingleSelect = this.onSingleSelect.bind(this);
    this.loadNextChildren = this.loadNextChildren.bind(this);
    // this.addNodeInState = this.addNodeInState.bind(this);
  }

  onToggle(nodeId, parents) {

          let prevState = this.state;

          let isOpen = false;

          if (!prevState[nodeId].isOpen) {
            // call load children
            // console.log(" node is not open")
            const res = this.loadChildren(nodeId, parents);
            // set node isOpen true

            isOpen = true;
          } else {
            isOpen = false;
          }
          this.setState((prevState) => {
            let treeStateChanges = {
            };

            treeStateChanges[nodeId] = {
              ...prevState[nodeId],  isOpen: isOpen
            };


            return treeStateChanges
          });



  }

  // onSelect(nodeLabel, nodeId){
  //   let selectedNodes = new Set([]);
  //   this.setState((prevState) =>{

  //     selectedNodes = prevState.selectedNodes;
  //     selectedNodes.add(JSON.stringify({label: nodeLabel, id: nodeId}));
  //     this.props.onSelect(selectedNodes);
  //     return {selectedNodes : selectedNodes};
  //   }
  //   )
  //   //this.props.onSelect(selectedNodes);
  // }

  // onSingleSelect(nodeLabel, nodeId){
  //   this.setState((prevState) =>{

  //     let selectedNodes = new Set([]);
  //     selectedNodes.add(JSON.stringify({label: nodeLabel, id: nodeId}));
  //     this.props.onSelect(selectedNodes);
  //     return {selectedNodes : selectedNodes};
  //   }
  //   )
  // }



  // onDeselect(nodeLabel, nodeId){
  //   let selectedNodes = new Set([]);
  //   this.setState((prevState) =>{

  //     selectedNodes = prevState.selectedNodes;
  //     selectedNodes.delete(JSON.stringify({label: nodeLabel, id: nodeId}));
  //     this.props.onSelect(selectedNodes);
  //     return {selectedNodes : selectedNodes};
  //   }
  //   )
  //   //this.props.onSelect(selectedNodes);
  // }
  // addNodeInState(currNode){
  //   let nodeState = {};
  //   nodeState[currNode.id] = {
  //     node: currNode,
  //     children: [],
  //     loading: false,
  //     highlighted: false
  //   }

  //   this.setState((prevState) => { return nodeState})
  // }


  async loadNextChildren(nodeId){

      this.setState((prevState) => {
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: true
        };

        return treeStateChanges;
      })

      // const response = await this.props.onLoadMore();
      const response = [
        {
          "id": "l1",
          "type": "folder",
          "name": "MoreChild1",

        },
        {
          "id": "l2",
          "type": "folder",
          "name": "MoreChild2",

        },
        {
          "id": "l3",
          "type": "folder",
          "name": "MoreChild3",


        }
      ]
      const nextLink = response.next;
      console.log("load more output")
      console.log(response)
      // console.log("got response = ")
      // console.log(JSON.stringify(response))
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
        let newChildren  = response
        newChildren.forEach((currNode) => {

          treeStateChanges[currNode.id] = {
            children: [],
            loading: false,
          }
        })

        let children = [...prevState[nodeId].children, ...newChildren]
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], children: children, nextLink: nextLink
        };

        return treeStateChanges;
      })




  }

  async loadChildren(nodeId, parents) {
    if (this.state[nodeId].children.length === 0) {

      this.setState((prevState) => {
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: true
        };

        return treeStateChanges;
      })

      const response = await this.props.onGetNode(nodeId, parents);
      const nextLink = response.next ===undefined?"somelink":undefined;
      // console.log("got response = ")
      // console.log(JSON.stringify(response))
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
          ...prevState[nodeId], children: response, nextLink: nextLink
        };
        response.forEach((currNode) => {

          treeStateChanges[currNode.id] = {
            children: [],
            loading: false,
          }
        })

        return treeStateChanges;
      })
      // console.log("state is " + JSON.stringify(this.state))



    }
  }

  render(){


    return <div><div style={{
      height: this.props.height + "px",
      maxWidth: this.props.width + "px",
      overflow: "auto"
    }}>

      {(this.props.searchPath["id"] === undefined)?
    <TreeNode {...this.props} nodeState = {this.state[this.props.currNode.id]} onToggle={this.onToggle}
    treeState = {this.state} onSelect={this.props.onSelect} onDeselect={this.props.onDeselect} selectedNodes = {this.props.selectedNodes}

    onSingleSelect= {this.props.onSelect} isVisible={true} onLoadNext = {this.loadNextChildren} parents = {[]}
    highlightedNodesMap = {this.props.highlightedNodesMap} level={0}
     />:(
       <Link href="#" onClick={this.props.hideSearchView}>X</Link>


     )}
     </div>
     </div>;
  }
}

export default TreeComponent;