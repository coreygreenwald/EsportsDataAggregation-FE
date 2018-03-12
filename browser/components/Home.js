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
      kda: {}
    }
  }

  componentDidMount(){
    this.props.getStats();
  }

  render(){
    // console.log('STATS', this.props.stats.statData);
    return (
      <div className="container">
        {/* <FeaturedStats /> */}
        <StatChart />
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
    },
    getStatsDataThunk(stat) {
      dispatch(getStatsDataThunk(stat))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home))
