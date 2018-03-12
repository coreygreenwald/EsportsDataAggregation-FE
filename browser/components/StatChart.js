import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatsDataThunk } from '../store/index';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';


class StatChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      statName: 'timesBanned',
      systemTarget: 'all',
      breakdown: 'Total'
    }
    this.grabStat = this.grabStat.bind(this);
    this.setStat = this.setStat.bind(this);
    this.setSystem = this.setSystem.bind(this);
    this.setBreakdown = this.setBreakdown.bind(this);
  }

  componentDidMount(){
    this.grabStat(this.state);
  }

  grabStat(queryObj){
    this.props.getStatsDataThunk(queryObj);
  }

  setStat(statName){
    this.setState({statName: statName});
    let queryObj = Object.assign({}, this.state, {statName});
    this.grabStat(queryObj)
  }

  setSystem(systemTarget){
    this.setState({systemTarget: systemTarget.toLowerCase()});
    let queryObj = Object.assign({}, this.state, {systemTarget: systemTarget.toLowerCase()});
    this.grabStat(queryObj)
  }

  setBreakdown(breakdown){
    this.setState({breakdown: breakdown});
    let queryObj = Object.assign({}, this.state, {breakdown});
    this.grabStat(queryObj)
  }

  render(){
    // const statNameReadable = this.props.stats.statName
    function labelMaker(label = ''){
      return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
    }
    return (
      <div className="container-row">
        <BarChart width={950} height={300} data={this.props.stats.statData} margin={{ top: 15, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" >
            <Label value="God Name" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis dataKey="value" label={{ value: labelMaker(`${this.props.stats.statName} for ${this.state.systemTarget} ${this.state.breakdown}`), angle: -90, position: 'insideBottomLeft'}}/>
          <Tooltip />
          <Bar dataKey="value" label="hi" fill="#8884d8" />
        </BarChart>
        <div className="stat-controller">
          <div className="stat-controller-selector">
            <label htmlFor="stat-selector">Select a Stat</label>
            <select name="stat-selector" onChange={(event) => this.setStat(event.target.value)}>
                {
                  this.props.stats.stats.map(stat => (<option value={stat} key={stat}>{labelMaker(stat)}</option>))
                }
            </select>
          </div>
          <div className="stat-controller-system-selector">
            <label htmlFor="stat-selector">Select a System</label>
            <select name="stat-selector" onChange={(event) => this.setSystem(event.target.value)}>
              <option selected>All</option>
              <option>PC</option>
              <option>Xbox</option>
              <option>PS4</option>
            </select>
          </div>
          <div className="stat-controller-system-selector">
            <label htmlFor="stat-selector">Select Breakdown</label>
            <select name="stat-selector" onChange={(event) => this.setBreakdown(event.target.value)}>
              <option selected>Total</option>
              <option>Per Game</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    stats: state.stats
  }
}

const mapDispatch = (dispatch) => {
  return {
    getStatsDataThunk(stat) {
      dispatch(getStatsDataThunk(stat))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(StatChart))
