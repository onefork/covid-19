import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Sigma } from "react-sigma";

import SigmaLoader from "./Sigma/Loader";
import NodeShapes from "./Sigma/NodeShapes";

import "./styles.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterNeighbours: "",
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
        "defaultLabelSize": 14,
        // Graph Properties
        "maxEdgeSize": 0.5,
        "minEdgeSize": 0.2,
        "minNodeSize": 1,
        "maxNodeSize": 7,
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

    let json = require('../src/data.json')

    this.graphData = {
      nodes: json.nodes,
      edges: []
    };

  }

  render() {
    return (
      <div className="App" style={{height: window.innerHeight, width: window.innerWidth}}>
        <Sigma
          renderer="canvas"
          settings={this.state.settings}
          style={this.state.style}
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
