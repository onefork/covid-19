import React from 'react';
// import ReactDOM from 'react-dom'
import cloneDeep from 'lodash/cloneDeep';
import { Sigma } from 'react-sigma';

import SigmaLoader from './Sigma/Loader';
import FilterMenu from './Components/FilterMenu'

import mockup_data from './data';

// TODO
// handle component resize
// https://medium.com/hootsuite-engineering/resizing-react-components-6f911ba39b59

const settings = {
  // Drawing Properties
  labelThreshold: 14,
  defaultEdgeType: 'curve',
  defaultHoverLabelBGColor: '#002147',
  defaultLabelBGColor: '#ddd',
  activeFontStyle: 'bold',
  defaultLabelColor: '#000',
  defaultLabelHoverColor: '#fff',
  fontStyle: 'bold',
  hoverFontStyle: 'bold',
  defaultLabelSize: 14,
  // labelSize: 'proportional',
  // Graph Properties
  maxEdgeSize: 0.5,
  minEdgeSize: 0.2,
  minNodeSize: 1,
  maxNodeSize: 3,
  // Mouse Properties
  maxRatio: 20,
  minRatio: 0.75,
};

class Graph extends React.Component {

  constructor(props) {
    super(props);

    this.graph_data = props.data || mockup_data;

    const data = this.loadData(this.graph_data);

    this.state = {
      // jsonNodesUnfiltered: jsonCopy.nodes,
      // jsonEdgesUnfiltered: jsonCopy.edges,
      jsonNodes: data.nodes,
      jsonEdges: data.edges,
      // ...this.calcDim(),
    };
  }

  // calcDim = () => ({
  //   width: '100%',
  //   height: '100%',
  //   // width: window.innerWidth,
  //   // height: window.innerHeight,
  // });
  // updateDimensions = () => {
  //   this.setState(this.calcDim());
  // };
  // componentDidMount() {
  //   window.addEventListener('resize', this.updateDimensions);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  // }

  // loadData = () => JSON.parse(JSON.stringify(require('./data_original.json')));
  loadData = (data) => ({
    nodes: cloneDeep(data.nodes),
    edges: cloneDeep(data.edges.filter(edge => edge.target !== edge.source))
  });

  // resetData = () => {
  //   const data = this.loadData(this.graph_data);
  //   this.setState({ jsonNodes: data.nodes, jsonEdges: data.edges })
  // }

  resetData = () => this.loadData(this.graph_data);

  handleClickNode = (e) => {
    const target = e.data.node.id
    const data = this.loadData(this.graph_data);

    if (target !== this.state.clickedNodeId) {

      const filterKeys = {}
      const filteredEdges = data.edges.map(edge => {
        if (target === edge.source || target === edge.target) {
          filterKeys[edge.source] = true
          filterKeys[edge.target] = true
        } else {
          edge.color = 'rgba(192, 192, 192, 0.25)'
        }
        return edge
      })
      const filteredNodes = data.nodes.map(node => {
        if (filterKeys[node.id]) {
          node.size = 5
        } else {
          node.color = 'rgba(192, 192, 192, 0.4)'
        }
        return node
      })

      this.setState({ clickedNodeId: target, jsonEdges: filteredEdges, jsonNodes: filteredNodes })
    } else {
      // this.graphData = {nodes: this.state.jsonNodesUnfiltered, edges: this.state.jsonEdgesUnfiltered}
      this.setState({ clickedNodeId: null, jsonNodes: data.nodes, jsonEdges: data.edges })
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
          node.color = 'rgba(192, 192, 192, 0.2)'
        }
        return node
      })

      let filteredEdges = loadedJSON.edges.map((edge) => {
        edge.color = 'rgba(192, 192, 192, 0.2)'
        return edge
      })
      this.setState({ jsonNodes: filteredNodes, jsonEdges: filteredEdges })
    } else {
      let filterObj = {}
      let ClusterIdObj = {}
      let loadedJSON = this.loadData()

      clusterIds.forEach((id) => {
        ClusterIdObj[id] = true
      })
      let filteredNodes = loadedJSON.nodes.map((node) => {
        if (node.label.includes(str) && ClusterIdObj[node.attributes['Cluter-ID']]) {
          filterObj[node.id] = true
        } else {
          node.color = 'rgba(192, 192, 192, 0.2)'
        }
        return node
      })

      let filteredEdges = loadedJSON.edges.map((edge) => {
        edge.color = 'rgba(192, 192, 192, 0.2)'
        return edge
      })
      this.setState({ jsonNodes: filteredNodes, jsonEdges: filteredEdges })
    }
  }

  render() {
    return (
      <div
        className="Graph"
        style={{
          height: '100%',
          minHeight: 500,
          width: '100%',
          minWidth: 500,
          // background: 'red',
        }}
      >
        <FilterMenu filterNodes={this.filterNodes} resetData={this.resetData}></FilterMenu>
        <Sigma
          onClick={this.handleClick}
          renderer="canvas"
          settings={settings}
          style={{
            width: '100%',
            height: '100%',
            margin: 0,
          }}
          onClickNode={this.handleClickNode}
        >
          <SigmaLoader graph={{ nodes: this.state.jsonNodes, edges: this.state.jsonEdges }}>
          </SigmaLoader>
        </Sigma>
      </div>
    );
  }
}

// const rootElement = document.getElementById('root');
// ReactDOM.render(<Graph />, rootElement);

export default Graph;
