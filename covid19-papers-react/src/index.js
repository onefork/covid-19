import React from "react";
import ReactDOM from 'react-dom'

import { Sigma } from "react-sigma";

import SigmaLoader from "./Sigma/Loader";
import FilterMenu from "./Components/FilterMenu"

class App extends React.Component {

  constructor(props) {
    super(props);

    window.addEventListener('resize', this.updateDimensions);

    let json = Object.freeze(require('../src/data.json'))

    let cleanedEdges = json.edges.filter((edge) => {
      return edge.target !== edge.source
    })


    this.state = {
      // jsonNodesUnfiltered: jsonCopy.nodes,
      // jsonEdgesUnfiltered: jsonCopy.edges,
      jsonNodes: json.nodes,
      jsonEdges: cleanedEdges,
      height: window.innerHeight,
      width: window.innerWidth,
      settings: {
        // Drawing Properties
        "labelThreshold": 14,
        "defaultEdgeType": "curve",
        "defaultHoverLabelBGColor": "#002147",
        "defaultLabelBGColor": "#ddd",
        "activeFontStyle": "bold",
        "defaultLabelColor": "#000",
        "defaultLabelHoverColor": "#fff",
        "fontStyle": "bold",
        "hoverFontStyle": "bold",
        "defaultLabelSize": 10,
        // Graph Properties
        "maxEdgeSize": 0.5,
        "minEdgeSize": 0.2,
        "minNodeSize": 1,
        "maxNodeSize": 3,
        // Mouse Properties
        "maxRatio": 20,
        "minRatio": 0.75
      },
      style: {
        width: "100%",
        height: "100%",
        margin: '0px'
      }
      
    };
  }

  loadData = () => JSON.parse(JSON.stringify(require('../src/data_original.json')));


  updateDimensions = (e) => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  resetData = () => {
    let reloadedJson = this.loadData()
    let cleanedEdges = reloadedJson.edges.filter((edge) => {
      return edge.target !== edge.source
    })
    this.setState({jsonNodes: reloadedJson.nodes, jsonEdges: cleanedEdges})
  }

  handleClickNode = (e) => {
    let reloadedJson = this.loadData()
    let cleanedEdges = reloadedJson.edges.filter((edge) => {
      return edge.target !== edge.source
    })
    if (this.state.clickedNodeId !== e.data.node.id) {
      let target = e.data.node.id
      this.setState({clickedNodeId: target})
      let filterKeys = {}
      let filteredEdges = cleanedEdges.map((edge) => {
        if (target === edge.source || target === edge.target) {
          filterKeys[edge.source] = true
          filterKeys[edge.target] = true

        } else {
          edge.color = "rgba(192, 192, 192, 0.25)"
        }
        return edge
      })

      let filteredNodes = reloadedJson.nodes.map((node) => {
        if (filterKeys[node.id]) {
          node.size = 5
        } else {
          node.color = "rgba(192, 192, 192, 0.4)"
        }
        return node
      })
      this.setState({jsonEdges: filteredEdges, jsonNodes: filteredNodes})
    } else {
      // this.graphData = {nodes: this.state.jsonNodesUnfiltered, edges: this.state.jsonEdgesUnfiltered}
      this.setState({clickedNodeId: null, jsonNodes: reloadedJson.nodes, jsonEdges: cleanedEdges})

    }
  }

  filterNodes = (str, clusterIds) => {
    if (clusterIds.length === 0) {
    let filterObj = {}
    let loadedJSON = this.loadData()
    let filteredNodes = loadedJSON.nodes.map((node) => {
      if (node.label.includes(str)) {
        filterObj[node.id] = true
      } else {
        node.color = "rgba(192, 192, 192, 0.2)"
      }
      return node
    })

    let filteredEdges = loadedJSON.edges.map((edge) => {
      edge.color = "rgba(192, 192, 192, 0.2)"
      return edge
    })
    this.setState({jsonNodes: filteredNodes, jsonEdges: filteredEdges})
    } else {
      let filterObj = {}
      let ClusterIdObj = {}
      let loadedJSON = this.loadData()

      clusterIds.forEach((id) => {
        ClusterIdObj[id] = true
      })
      let filteredNodes = loadedJSON.nodes.map((node) => {
        if (node.label.includes(str) && ClusterIdObj[node.attributes["Cluter-ID"]]) {
          filterObj[node.id] = true
        } else {
          node.color = "rgba(192, 192, 192, 0.2)"
        }
        return node
      })

      let filteredEdges = loadedJSON.edges.map((edge) => {
        edge.color = "rgba(192, 192, 192, 0.2)"
        return edge
      })
      this.setState({jsonNodes: filteredNodes, jsonEdges: filteredEdges})
    }
  }

  render() {
    return (
      <div className="App" style={{height: this.state.height, minHeight: '700px', width: this.state.width, minWidth: '700px'}}>
        <FilterMenu filterNodes={this.filterNodes} resetData={this.resetData}></FilterMenu>
        <Sigma
          onClick={this.handleClick}
          renderer="canvas"
          settings={this.state.settings}
          style={this.state.style}
          onClickNode={this.handleClickNode}
        >
          <SigmaLoader graph={{nodes: this.state.jsonNodes, edges: this.state.jsonEdges}}>
          </SigmaLoader>
        </Sigma>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
