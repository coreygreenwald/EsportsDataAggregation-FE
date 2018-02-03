import React , { Component } from 'react';
import {connect} from 'react-redux'
import { getMostWinsThunk, getMostKillsThunk, getMostPlaysThunk } from '../store/index'

class FeaturedStats extends Component {

  componentDidMount(){
    this.props.wins()
    this.props.kills()
    this.props.plays()
  }

  render(){
    return (
      <div />
    )
  }
}

const mapState = (state) => {
  return {
    stats: state.stats
  }
}

const mapDispatch = dispatch => {
  return {
      wins() {
        dispatch(getMostWinsThunk());
      },
      kills() {
        dispatch(getMostKillsThunk());
      },
      plays() {
        dispatch(getMostPlaysThunk());
      }
  }
}

export default connect(mapState, mapDispatch)(FeaturedStats)
