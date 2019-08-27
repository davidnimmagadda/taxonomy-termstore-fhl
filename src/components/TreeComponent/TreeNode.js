import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTerm } from "../../redux/actions/termActions";
import TreeNodeHelper from "./TreeNodeHelper";
import { Spinner, IconButton, Icon } from "office-ui-fabric-react";
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
    let { level, currNode, uri, setCurrentTerm, show } = props;

    super(props)
    this.state = {
      node: props.currNode,
      children: [],
      loading: false,
      highlighted: false
    }
  }

  onToggle() {
    if (!this.state.node.isOpen) {
      // call load children
      this.loadChildren();
      // set node isOpen true
      this.setState({node: { ...this.state.node, isOpen: true }});
    } else {
      this.setState({node: { ...this.state.node, isOpen: false }});
    }
  }

  async loadChildren() {
    if (this.state.children.length === 0 && this.state.node.type === "folder") {
      this.setState({loading: true});
      const response = await this.props.getNodeCallback(this.props.uri);
      this.setState({loading:false});
      this.setState({children:response});
    }
  }

  onNodeSelect() {
    this.props.setCurrentTerm(this.state.node);
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
    return this.state.node.type === "folder" && this.state.node.isOpen
      ? "ChevronDownMed"
      : "ChevronRightMed";
  }

  getFolderIcon() {
    return this.state.node.type === "file"
      ? "Script"
      : this.state.node.type === "folder" && this.state.node.isOpen
      ? "FabricOpenFolderHorizontal"
      : this.state.node.type === "folder" && !this.state.node.isOpen
      ? "FabricFolderFill"
      : "";
  }
  render(){
    return this.state.loading ? (
      <Spinner />
    ) : (
      <>
        <div
          className="treeNode"
          style={{
            paddingLeft: getPaddingLeft(this.props.level, this.state.node.type),
            display: this.props.show ? "flex" : "none"
          }}
          level={this.props.level}
          type={this.state.node.type}
          onMouseEnter={() => this.setState({highlighted:true})}
          onMouseLeave={() => this.setState({highlighted:false})}
        >
          <span role="button" onClick={() => this.onToggle()}>
            <Icon
              style={{ marginLeft: 5, marginRight: 5 }}
              iconName={this.getChevron()}
            />
          </span>
          <Icon style={{ marginRight: 10 }} iconName={this.getFolderIcon()} />
          <span
            role="button"
            style={{ whiteSpace: "nowrap", width: "100%" }}
            onClick={() => this.onNodeSelect()}
          >
            {this.state.node.name}
          </span>
          {this.state.highlighted && (
            <IconButton
              iconProps={{ iconName: "MoreVertical" }}
              onClick={() => alert("I'm Clicked!")}
            />
          )}
        </div>

        {this.state.children.map(childNode => (
          <TreeNodeHelper
            key={childNode.id}
            show={this.props.show && this.state.node.isOpen}
            currNode={childNode}
            level={this.props.level + 1}
            uri={this.getUri(childNode)}
            getNodeCallback = {this.props.getNodeCallback.bind(this)}
          />
        ))}
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
