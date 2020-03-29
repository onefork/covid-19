import React from 'react'


class SearchContainer extends React.Component {

    state = {
        searchvalue: ""
    }

    handleChange = (e) => {
        this.setState({searchvalue: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.filterNodes(this.state.searchvalue)
    }

    render() {
        return(
            <div id="SearchBarContainer">
                <div style={{marginBottom: '10px'}}>Search:</div>
                    <input value={this.state.searchvalue} onChange={this.handleChange}></input>
                    <input type='submit' onClick={this.handleSubmit}></input>
            </div>
        )
    }
}

export default SearchContainer