import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatsThunk } from '../store/index';
import FeaturedStats from './FeaturedStats.js';

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
    return (
      <div>
        <FeaturedStats />
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
