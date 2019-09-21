import React from "react";

import { Link } from "office-ui-fabric-react";
import TreeNode from "./TreeNode";


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

    let treeState = {};
    treeState[this._getNodeKey(props.rootNode)] = {
      children: [],
      loading: false,
      isChildrenLoaded: false
    }
    treeState["selectedNodes"] = new Set([]);
    this.state = treeState;

    this.onToggle = this.onToggle.bind(this);
    this.loadNextChildren = this.loadNextChildren.bind(this);
    this._getNodeKey = this._getNodeKey.bind(this)
  }

  _getNodeKey(node){
      return JSON.stringify({id: node.id, type: node.type});
  }

  onToggle(node, parents) {
    let nodeKey = this._getNodeKey(node);
    if (!this.state[nodeKey].isExpanded) {
      this.loadChildren(nodeKey,node, parents);
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeKey] = {
        ...prevState[nodeKey], isExpanded: !prevState[nodeKey].isExpanded
      };
      return treeStateChanges
    });
  }

  async loadChildren(nodeKey, node, parents) {
    if (!this.state[nodeKey].isChildrenLoaded) {
      this.setState((prevState) => {
        let treeStateChanges = {};
        treeStateChanges[nodeKey] = {
          ...prevState[nodeKey], loading: true
        };
        return treeStateChanges;
      })
      try {
        const response = await this.props.loadChildren(node, parents);
        const nextLink = response.next === undefined ? "somelink" : undefined;
        const children = response
        // Above Lines are for Hardcoded response. Below lines are for actual call
        // const nextLink = response.next
        // const children = response.children
        this._appendChildrenToNode(nodeKey, children, nextLink);
      } catch (exception) {
        //TODO
      }
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeKey] = {
        ...prevState[nodeKey], loading: false
      };
      return treeStateChanges;
    })
  }

  async loadNextChildren(node, parents) {
    let nodeKey = this._getNodeKey(node)
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeKey] = {
        ...prevState[nodeKey], loading: true
      };
      return treeStateChanges;
    })
    try {
      const response = {
        children: [
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
      }
      const nextLink = response.next;
      const newChildren = response.children;
      // Above Lines are for Hardcoded response. Below lines are for actual call
      // const nextLink = response.next
      // const response = await this.props.loadNextChildren(nodeId, parents, this.state[nodeKey].nextLink)
      this._appendChildrenToNode(nodeKey, newChildren, nextLink);
    } catch (exception) {
      //TODO
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeKey] = {
        ...prevState[nodeKey], loading: false
      };
      return treeStateChanges;
    })
  }

  _appendChildrenToNode(nodeKey, newChildren, nextLink) {
    this.setState((prevState) => {
      let treeStateChanges = {};
      newChildren.forEach((child) => {
        treeStateChanges[this._getNodeKey(child)] = {
          children: [],
          loading: false,
          isChildrenLoaded: false,
        }
      })
      let children = [...prevState[nodeKey].children, ...newChildren]
      treeStateChanges[nodeKey] = {
        ...prevState[nodeKey], children: children, nextLink: nextLink, isChildrenLoaded: true
      };
      return treeStateChanges;
    })
  }

  render() {
    return <div><div style={{
      height: this.props.height + "px",
      maxWidth: this.props.width + "px",
      overflow: "auto"
    }}>
      {(this.props.searchPath["id"] === undefined) ?
        <TreeNode
          key = {this._getNodeKey(this.props.rootNode)}
          selectionMode = {this.props.selectionMode}
          node = {this.props.rootNode}
          onSelect={this.props.onSelect}
          onDeselect={this.props.onDeselect}
          selectedNodes={this.props.selectedNodes}
          nodeTypeData = {this.props.nodeTypeData}
          highlightedNodesMap={this.props.highlightedNodesMap}
          onToggle={this.onToggle}
          treeState={this.state}
          isVisible={true}
          onLoadNext={this.loadNextChildren}
          parents={[]}
          level={0}
          getNodeKey = {this._getNodeKey}
          nodeState={this.state[this._getNodeKey(this.props.rootNode)]}
        /> :
        (
          <Link href="#" onClick={this.props.hideSearchView}>X</Link>
        )}
    </div>
    </div>;
  }
}

export default TreeComponent;