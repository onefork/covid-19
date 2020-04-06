import React from 'react'

class ClusterIdObject extends React.Component {

    state = {
        checked: false
    }

    handleChange = (e) => {
        this.props.editClusterIds(this.props.id)
        this.setState({ checked: !this.state.checked })
    }

    render() {
        return (
            <div style={{ marginLeft: '10px' }}><input onChange={this.handleChange} type="checkbox" checked={this.state.checked}></input><span style={{ marginLeft: '10px' }}>Cluster {this.props.id}</span></div>
        )
    }
}

export default ClusterIdObject