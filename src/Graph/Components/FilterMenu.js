import React from 'react'
import SearchContainer from '../Containers/SearchContainer'
import '../styles.css'
import arrow from '../icons/arrow.png'
import line from '../icons/curvedline.png'
import ColorWheel from '../icons/ColorWheel.png'


class FilterMenu extends React.Component {

    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <div id="FilterMenuContainer" style={this.state.clicked ? { left: '-291px' } : { left: '10px' }}>
                <div id="FilterAbsolute">
                    <div id="FilterMenu">
                        <div id="MenuTitleContainer">
                            <div id="MenuTitleText">
                                Network Graph for Journal Article Abstract Similarity
                            </div>
                            <hr className="FilterMenuBreaks"></hr>
                            <div id="GraphSummaryText">
                                This graph is a visualization of the natural language processing connections between Coronavirus centered scientific journal articles based on abstract similarity.
                            </div>
                            <div id="LegendContainer">
                                <strong>Legend</strong>
                                <div id="LegendLabels">
                                    <div style={{ textAlign: "left" }}>
                                        <span id="NodeLabel">.</span><span className="LegendLabelText" id="NodeLabelText">Paper</span>
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <img src={line} alt="Line" style={{ height: '12px', width: '12px', marginLeft: '10px' }}></img><span className="LegendLabelText" id="NodeLabelText">Distance Between Abstract Text</span>
                                    </div>
                                    <div style={{ textAlign: "left", marginTop: '20px' }}>
                                        <img src={ColorWheel} alt="ColorWheel" style={{ height: '13px', width: '13px', marginLeft: '10px' }}></img><span className="LegendLabelText" id="NodeLabelText">Article Cluster</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '90%', marginTop: '20px' }}></hr>
                        <SearchContainer resetData={this.props.resetData} filterNodes={this.props.filterNodes}></SearchContainer>
                    </div>
                    <div onClick={this.handleClick} id="ArrowContainer"><img id="ArrowImage" src={`${arrow}`} style={this.state.clicked ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }} alt="arrow"></img></div>
                </div>
            </div>
        )
    }
}


export default FilterMenu