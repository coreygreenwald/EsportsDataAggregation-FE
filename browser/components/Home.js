import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatsThunk } from '../store/index';

import FeaturedStats from './FeaturedStats.js';
import StatChart from './StatChart';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      statBoxes: [<StatChart/>]
    }
    this.addStatChart = this.addStatChart.bind(this);
  }

  componentDidMount(){
    this.props.getStats();
  }

  addStatChart(){
    const newStatBoxes = this.state.statBoxes.slice();
    newStatBoxes.push(<StatChart />);
    this.setState({statBoxes: newStatBoxes});
  }

  render(){
    return (
      <div className="container">
        {/* <FeaturedStats /> */}
        {/* <StatChart /> */}
        {this.state.statBoxes}
        <br/>
        <button className="btn" onClick={this.addStatChart}> ADD ANOTHER CHART </button>
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

export default withRouter(connect(mapState, mapDispatch)(Home))
