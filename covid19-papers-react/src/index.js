import React from "react";
import ReactDOM from 'react-dom'

import { Sigma } from "react-sigma";

import SigmaLoader from "./Sigma/Loader";
import NodeShapes from "./Sigma/NodeShapes";

import "./styles.css";

class App extends React.Component {

  constructor(props) {
    super(props);

    window.addEventListener('resize', this.updateDimensions);

    let json = require('../src/data.json')

    let cleanedEdges = json.edges.filter((edge) => {
      return edge.target !== edge.source
    })


    this.state = {
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


    this.graphData = {
      nodes: this.state.jsonNodes,
      edges: this.state.jsonEdges
    };

  }

  updateDimensions = (e) => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleClickNode = (e) => {
    let target = e.data.node.id
    console.log(target)
    let filterKeys = {}
    let filteredEdges = this.state.jsonEdges.map((edge) => {
      if (target === edge.source || target == edge.target) {
        filterKeys[edge.source] = true
        filterKeys[edge.target] = true

      } else {
        edge.color = "rgba(192, 192, 192, 0.25)"
      }
      return edge
    })

    let filteredNodes = this.state.jsonNodes.map((node) => {
      if (filterKeys[node.id]) {
        node.size = 20
      } else {
        node.color = "rgba(192, 192, 192, 0.8)"
      }
      return node
    })
    this.setState({jsonEdges: filteredEdges, jsonNodes: filteredNodes})

  }

  render() {
    return (
      <div className="App" style={{height: this.state.height, minHeight: '700px', width: this.state.width, minWidth: '700px'}}>
        <Sigma
          onClick={this.handleClick}
          renderer="canvas"
          settings={this.state.settings}
          style={this.state.style}
          onClickNode={this.handleClickNode}
        >
          <SigmaLoader graph={this.graphData}>
            <NodeShapes />
          </SigmaLoader>
        </Sigma>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
