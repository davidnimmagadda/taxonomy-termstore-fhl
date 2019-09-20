import React from "react";

import { Link } from "office-ui-fabric-react";
import TreeNode from "./TreeNode";


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    let rootNodeID = props.currNode.id;

    let treeState = {};
    treeState[rootNodeID] = {
      children: [],
      loading: false
    }
    treeState["selectedNodes"] = new Set([]);

    this.state = treeState;

    this.onToggle = this.onToggle.bind(this);

    this.loadNextChildren = this.loadNextChildren.bind(this);

  }

  onToggle(nodeId, parents) {

    let prevState = this.state;

    let isOpen = false;

    if (!prevState[nodeId].isOpen) {


      const res = this.loadChildren(nodeId, parents);


      isOpen = true;
    } else {
      isOpen = false;
    }
    this.setState((prevState) => {
      let treeStateChanges = {
      };

      treeStateChanges[nodeId] = {
        ...prevState[nodeId], isOpen: isOpen
      };


      return treeStateChanges
    });



  }




















































  async loadNextChildren(nodeId) {

    this.setState((prevState) => {
      let treeStateChanges = {
      };
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], loading: true
      };

      return treeStateChanges;
    })


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


    this.setState((prevState) => {
      let treeStateChanges = {
      };
      treeStateChanges[nodeId] = {
        ...prevState[nodeId], loading: false
      };
      return treeStateChanges;
    })
    this.setState((prevState) => {
      let treeStateChanges = {
      };
      let newChildren = response
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
      const nextLink = response.next === undefined ? "somelink" : undefined;


      this.setState((prevState) => {
        let treeStateChanges = {
        };
        treeStateChanges[nodeId] = {
          ...prevState[nodeId], loading: false
        };
        return treeStateChanges;
      })
      this.setState((prevState) => {
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




    }
  }

  render() {


    return <div><div style={{
      height: this.props.height + "px",
      maxWidth: this.props.width + "px",
      overflow: "auto"
    }}>

      {(this.props.searchPath["id"] === undefined) ?
        <TreeNode {...this.props} nodeState={this.state[this.props.currNode.id]} onToggle={this.onToggle}
          treeState={this.state} onSelect={this.props.onSelect} onDeselect={this.props.onDeselect} selectedNodes={this.props.selectedNodes}

          onSingleSelect={this.props.onSelect} isVisible={true} onLoadNext={this.loadNextChildren} parents={[]}
          highlightedNodesMap={this.props.highlightedNodesMap} level={0}
        /> : (
          <Link href="#" onClick={this.props.hideSearchView}>X</Link>


        )}
    </div>
    </div>;
  }
}

export default TreeComponent;