import React from 'react'
import ClusterIdObject from '../Components/ClusterIdObject'

class SearchContainer extends React.Component {

    state = {
        searchvalue: "",
        ActiveClusterIds: []
    }

    componentDidMount() {
        let json = this.props.resetData()
        // debugger
        this.clusterObj = {}
        this.clusterIds = []
        json.nodes.forEach((node) => {
            if (this.clusterObj[node.attributes['Cluter-ID']]) {
                this.clusterObj[node.attributes['Cluter-ID']].push(node)
            } else {
                this.clusterObj[node.attributes["Cluter-ID"]] = [node]
                this.clusterIds.push(node.attributes["Cluter-ID"])
            }
        })

        this.setState({ clusterObj: this.clusterObj, clusterIds: this.clusterIds })
    }

    // loadData = () => JSON.parse(JSON.stringify(require('../data_original.json')));

    editClusterIds = (id) => {
        if (this.state.ActiveClusterIds.includes(id)) {
            let foundId = this.state.clusterIds.indexOf(id)
            this.setState({ ActiveClusterIds: this.state.clusterIds.splice(foundId, 0) })
        } else {
            this.setState({ ActiveClusterIds: [...this.state.ActiveClusterIds, id] })
        }
    }

    handleChange = (e) => {
        this.setState({ searchvalue: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.filterNodes(this.state.searchvalue, this.state.ActiveClusterIds)
    }

    handleReset = (e) => {
        this.props.resetData()
    }

    displayIds = () => {
        if (this.state.clusterIds) {
            return this.state.clusterIds.map((id) => {
                return <ClusterIdObject id={id} editClusterIds={this.editClusterIds}></ClusterIdObject>
            })
        }
    }

    render() {
        return (
            <div id="SearchBarContainer">
                <div style={{ marginBottom: '10px' }}>Search By Keyword:</div>
                <input value={this.state.searchvalue} onChange={this.handleChange}></input>
                <div style={{ marginTop: '10px' }}>Search By Cluster Id:</div>
                <div style={{ width: '95%', height: '200px', marginTop: '10px', overflowY: "auto", borderStyle: "solid", borderWidth: "0px 0.5px 0px 0.5px", borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                    {this.displayIds()}
                </div>
                <input type='submit' style={{ marginTop: '10px' }} onClick={this.handleSubmit}></input><button style={{ marginTop: '10px' }} onClick={this.handleReset}>Reset Graph</button>
            </div>
        )
    }
}

export default SearchContainer