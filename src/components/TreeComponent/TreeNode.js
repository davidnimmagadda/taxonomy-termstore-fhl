import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon, Checkbox, ChoiceGroup } from "office-ui-fabric-react";
import { tsConstructorType } from "@babel/types";

const getPaddingLeft = level => {
  let paddingLeft = level * 20;
  //if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

export class TreeNode extends React.Component{

  // const [node, setNode] = useState(currNode);
  // const [children, setChildren] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [highlighted, setHighLighted] = useState(false);

  constructor(props){
    // let { level, currNode, uri, setCurrentTerm, show, nodeState } = props;

    super(props)
    // this.state = {
    //   node: props.currNode,
    //   children: [],
    //   loading: false,
    //   highlighted: false
    // }

    console.log("tree node constructrer")
    // this.props.onToggle = this.props.onToggle.bind(this);
    // this.props.addNodeInState = this.props.addNodeInState.bind(this);


  }

  // onToggle() {
  //   if (!this.state.node.isOpen) {
  //     // call load children
  //     this.loadChildren();
  //     // set node isOpen true
  //     this.setState({node: { ...this.state.node, isOpen: true }});
  //   } else {
  //     this.setState({node: { ...this.state.node, isOpen: false }});
  //   }
  // }

  // async loadChildren() {
  //   if (this.state.children.length === 0 && this.state.node.type === "folder") {
  //     this.setState({loading: true});
  //     const response = await this.props.onGetNode(this.props.uri);
  //     this.setState({loading:false});
  //     this.setState({children:response});
  //   }
  // }

  onNodeDeselect() {

    //this.props.setCurrentTerm(this.props.currNode);
    this.props.onDeselect( this.props.currNode.name,this.props.currNode.id);
  }

  onNodeSelect() {

    this.props.setCurrentTerm(this.props.currNode);
    this.props.onSelect( this.props.currNode.name,this.props.currNode.id);
  }

  onNodeSingleSelect() {

    this.props.setCurrentTerm(this.props.currNode);
    this.props.onSingleSelect( this.props.currNode.name,this.props.currNode.id);
  }

  getUri(childNode) {
    switch (this.props.level) {
      case 0:
        return this.props.uri + "/" + childNode.id + "/termSets";
      case 1:
        return this.props.uri + "/" + childNode.id + "/terms";
      default:
        return "terms/" + childNode.id + "/terms";
    }
  }

  getChevron() {
    return this.props.currNode.type === "folder" && this.props.nodeState.node.isOpen
      ? "ChevronDownMed"
      : "ChevronRightMed";
  }

  getFolderIcon() {
    return "FabricFolderFill"
    // return this.props.currNode.type === "file"
    //   ? "Script"
    //   : this.props.currNode.type === "folder" && this.state[this.props.currNode.id].node.isOpen
    //   ? "FabricOpenFolderHorizontal"
    //   : this.props.currNode.type === "folder" && !this.state[this.props.currNode.id].node.isOpen
    //   ? "FabricFolderFill"
    //   : "";
  }
  render(){


    let nodeLabel = <span style={{ whiteSpace: "nowrap", width: "100%" }}><Icon style={{ marginRight: 10 }} iconName={this.getFolderIcon()} />
    <span
      role="button"
      style={{ whiteSpace: "nowrap", width: "100%" }}
      onClick={() => this.onNodeSelect()}
    >
      {this.props.currNode.name}({this.props.currNode.id})
    </span></span>

    switch(this.props.selectionMode){

      case 1:{
        nodeLabel =  <ChoiceGroup
        className="defaultChoiceGroup"
        options={[
          {
            key: JSON.stringify({label: this.props.currNode.name,id:  this.props.currNode.id}),
             text: this.props.currNode.name
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
              width: "100%"
            }
          };
        };
        nodeLabel = <Checkbox checked={this.props.selectedNodes.has(JSON.stringify({label: this.props.currNode.name,id:  this.props.currNode.id}))}label={this.props.currNode.name} onChange={(_ev, checked) =>{if(checked){ this.onNodeSelect();}else{this.onNodeDeselect()}}} styles={checkboxStyles}/>
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
          onMouseEnter={() => {
            this.props.setHighlighted(this.props.currNode.id, true)
          }}
          onMouseLeave={() => {
            this.props.setHighlighted(this.props.currNode.id, false)
          }}

        >

          <span role="button" onClick={(e) => {this.props.onToggle(this.props.currNode.id, this.props.uri)}}>
            <Icon
              style={{ marginLeft: 5, marginRight: 5 }}
              iconName={this.getChevron()}
            />
          </span>
          {nodeLabel}

          {this.props.nodeState.highlighted && (
            <span style={{"marginLeft":"auto", "marginRight":"0px"}}>
            <IconButton
              iconProps={{ iconName: "MoreVertical" }}
              onClick={() => alert("I'm Clicked!")}
            /></span>
          )}
        </div>


        {this.props.nodeState.children.map(childNode => (

          <TreeNodeHelper
            key={childNode.id}
            show={this.props.show && this.props.nodeState.node.isOpen}
            currNode={childNode}
            level={this.props.level + 1}
            uri={this.getUri(childNode)}
            onGetNode = {this.props.onGetNode.bind(this)}
            selectionMode = {this.props.selectionMode}
            nodeState = {this.props.treeState[childNode.id]}
            onToggle={this.props.onToggle}
            treeState = {this.props.treeState}
            onSelect = {this.props.onSelect}
            onDeselect={this.props.onDeselect}
            selectedNodes = {this.props.selectedNodes}
            onSingleSelect= {this.props.onSingleSelect}
            setHighlighted = {this.props.setHighlighted}
          />
        ))}
      </>
    );
    // return <div>hi</div>;
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
