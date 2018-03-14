import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import { getStatsDataThunk } from '../store/index';
import axios from 'axios';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { getGodsThunk } from '../../store';
// import { statNames, patchDates } from '../utils/stats';

function percentage(n1, n2){
  return Number(((n1 / n2) * 100).toFixed(2));
}

function labelMaker(label = ''){
  return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
}

class GodChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      godName: 'Freya',
      stats: [],
      averageStats: {}
    }
    this.grabGodData = this.grabGodData.bind(this);
    this.changeGod = this.changeGod.bind(this);
    this.convertAndSetData = this.convertAndSetData.bind(this);
  }

  componentDidMount(){
    this.props.getGods()
    this.updateGraph()
  }

  changeGod(godName){
    let newState = Object.assign({}, this.state, {godName});
    this.setState(newState);
    this.updateGraph(godName);
  }

  updateGraph(godName){
    Promise.all([axios.get('/api/stats/all?perGame=true').then(res => res.data), this.grabGodData(godName || this.state.godName).then(res => res.data)])
    .then(data => {
      delete data[1].stats[0].name;
      delete data[1].stats[0].totalTime;
      this.convertAndSetData(data[1].stats[0], data[0]);
    })
  }

  grabGodData(godName){
    return axios.get(`/api/gods/${godName}/stats?perGame=true`)
  }

  convertAndSetData(godData, averagedStats){
    let convertedData = [];
    for(let stat in godData){
      convertedData.push({statName: labelMaker(stat), a: percentage(godData[stat], averagedStats[stat])});
    }
    this.setState({stats: convertedData});
  }

  render(){
    function labelMaker(label = ''){
      return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
    }
    console.log(this.props.gods)
    return (
      this.state.stats.length && this.props.gods.godNames ? (

        <div className="container-row">
          <RadarChart outerRadius={200} width={800} height={520} data={this.state.stats}>
            <PolarGrid />
            <PolarAngleAxis dataKey="statName" />
            <PolarRadiusAxis angle={30} domain={[0, 100]}/>
            <Radar name="Agni" dataKey="a" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            {/* <Legend /> */}
          </RadarChart>
          <div className="stat-controller">
            <h4> All stats are shown as a percentage of the highest God in each category.</h4>
            <div className="stat-controller-god-selector">
              <label htmlFor="god-selector">Select a God</label>
              <select value={this.state.godName} name="god-selector" onChange={(event) => this.changeGod(event.target.value)}>
                {
                  this.props.gods.godNames.map(god => (<option value={god} key={god}>{labelMaker(god)}</option>))
                }
              </select>
            </div>
            <div className="stat-controller-god-text">
                <h4>{this.state.godName} excels in the following categories:</h4>
                {
                   this.state.stats
                    .filter(stat => stat.a > 85)
                    .map(stat => <p>{stat.statName} at the {stat.a} percentile</p>)
                }
            </div>
          </div>
      </div>



      ) :
      (<h1>Loading...</h1>)
    )
  }
}

const mapState = (state) => {
  return {
    gods: state.gods
  }
}

const mapDispatch = (dispatch) => {
  return {
    getGods() {
      dispatch(getGodsThunk())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(GodChart))
