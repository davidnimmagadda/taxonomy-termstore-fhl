import React from "react";

import { Link } from "office-ui-fabric-react";
import TreeNode from "./TreeNode";


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

    let rootNodeID = props.rootNode.id;
    let treeState = {};
    treeState[rootNodeID] = {
      children: [],
      loading: false,
      isChildrenLoaded: false
    }
    treeState["selectedNodes"] = new Set([]);
    this.state = treeState;

    this.onToggle = this.onToggle.bind(this);
    this.loadNextChildren = this.loadNextChildren.bind(this);
  }

  onToggle(nodeId, parents) {
    if (!this.state[nodeId].isExpanded) {
      this.loadChildren(nodeId, parents);
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], isExpanded: !prevState[nodeId].isExpanded
      };
      return treeStateChanges
    });
  }

  async loadChildren(nodeId, parents) {
    if (!this.state[nodeId].isChildrenLoaded) {
      this.setState((prevState) => {
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: true
        };
        return treeStateChanges;
      })
      try {
        const response = await this.props.loadChildren(nodeId, parents);
        const nextLink = response.next === undefined ? "somelink" : undefined;
        const children = response
        // Above Lines are for Hardcoded response. Below lines are for actual call
        // const nextLink = response.next
        // const children = response.children
        this._appendChildrenToNode(nodeId, children, nextLink);
      } catch (exception) {
        //TODO
      }
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], loading: false
      };
      return treeStateChanges;
    })
  }

  async loadNextChildren(nodeId) {
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], loading: true
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
      // const response = await this.props.loadMoreChildren(nodeId, parents, this.state[nodeId].nextLink)
      this._appendChildrenToNode(nodeId, newChildren, nextLink);
    } catch (exception) {
      //TODO
    }
    this.setState((prevState) => {
      let treeStateChanges = {};
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], loading: false
      };
      return treeStateChanges;
    })
  }

  _appendChildrenToNode(nodeId, newChildren, nextLink) {
    this.setState((prevState) => {
      let treeStateChanges = {};
      newChildren.forEach((child) => {
        treeStateChanges[child.id] = {
          children: [],
          loading: false,
          isChildrenLoaded: false,
        }
      })
      let children = [...prevState[nodeId].children, ...newChildren]
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], children: children, nextLink: nextLink, isChildrenLoaded: true
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
          {...this.props}
          node = {this.props.rootNode}
          nodeState={this.state[this.props.rootNode.id]}
          onToggle={this.onToggle}
          treeState={this.state}
          onSelect={this.props.onSelect}
          onDeselect={this.props.onDeselect}
          selectedNodes={this.props.selectedNodes}
          isVisible={true}
          onLoadNext={this.loadNextChildren}
          parents={[]}
          highlightedNodesMap={this.props.highlightedNodesMap}
          level={0}
        /> :
        (
          <Link href="#" onClick={this.props.hideSearchView}>X</Link>
        )}
    </div>
    </div>;
  }
}

export default TreeComponent;