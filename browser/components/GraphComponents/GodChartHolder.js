import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatsThunk } from '../../store/index';

import FeaturedStats from '../FeaturedStats.js';
import GodChart from './GodChart';

class GodChartHolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      statBoxes: [<GodChart/>]
    }
    this.addGodChart = this.addGodChart.bind(this);
  }

  componentDidMount(){
    this.props.getStats();
  }

  addGodChart(){
    const newStatBoxes = this.state.statBoxes.slice();
    newStatBoxes.push(<GodChart/>);
    this.setState({statBoxes: newStatBoxes});
  }

  render(){
    return (
      <div className="container">
        {this.state.statBoxes}
        <br/>
        <button className="btn" onClick={this.addGodChart}> ADD ANOTHER RADIAL GOD CHART </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    stats: state.stats
  }
}

const mapDispatch = (dispatch) => {
  return {
    getStats() {
      dispatch(getStatsThunk())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(GodChartHolder))
