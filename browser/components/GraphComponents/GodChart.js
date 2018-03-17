import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import { getStatsDataThunk } from '../store/index';
import axios from 'axios';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { getGodsThunk } from '../../store';
import { statNames, patchDates } from '../../utils/stats';
import './GodChart.scss';

function percentage(n1, n2){
  return Number(((n1 / n2) * 100).toFixed(2));
}

function labelMaker(label = ''){
  return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
}

function initActiveStats(statBase, statsToRemove, statsToStart){
  let initialStats = statNames.reduce((obj, next) => {
    if(!statsToRemove.includes(next)){
      obj[next] = false;
    }
    return obj;
  }, {});
  statsToStart.forEach(stat => {
    initialStats[stat] = true;
  })
  return initialStats;
}

function randomColor(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class GodChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      godName: 'Freya',
      godsData: {},
      averageStats: {},
      showStats: false,
      activeStats: initActiveStats(statNames, ['kda'], ['kills', 'assists', 'deaths', 'wins', 'goldEarned', 'damage', 'wardsPlaced']),
      radars: [],
      convertedData: []
    }
    this.grabGodData = this.grabGodData.bind(this);
    this.changeGod = this.changeGod.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);

    this.addGod = this.addGod.bind(this);
    this.deleteGod = this.deleteGod.bind(this);
    this.convertData = this.convertData.bind(this);
    this.addRadar = this.addRadar.bind(this);
  }

  componentDidMount(){
    this.props.getGods()
    axios.get('/api/stats/all?perGame=true')
      .then(res => res.data)
      .then(averageStats => {
        console.log('is this hit?');
        this.setState({averageStats});
        this.addGod('Freya', averageStats);
      })
  }

  changeGod(godName){
    let newState = Object.assign({}, this.state, {godName});
    this.setState(newState);
    // this.updateGraph(godName);
  }

  addGod(godName, averageStats){
    if(!this.state.godsData[godName]){
      let newGodsData = Object.assign({}, this.state.godsData);
      this.grabGodData(godName)
        .then(data => {
          delete data.stats[0].name;
          delete data.stats[0].totalTime;
          newGodsData[godName] = data.stats[0];
          newGodsData[godName].color = randomColor();
          this.convertData(newGodsData, averageStats);
          this.addRadar(godName, newGodsData);
          this.setState({godsData: newGodsData});
        })
    }
  }

  deleteGod(godName){
    let newGodsData = Object.assign({}, this.state.godsData);
    delete newGodsData[godName];
    this.setState({godsData: newGodsData});
  }

  grabGodData(godName){
    return axios.get(`/api/gods/${godName}/stats?perGame=true`).then(res => res.data)
  }

  toggleCheckbox(event){
    let newActiveStats = Object.assign({}, this.state.activeStats);
    newActiveStats[event.target.value] = !newActiveStats[event.target.value];
    this.setState({activeStats: newActiveStats});
    this.convertData(this.state.godsData, this.state.averageStats, newActiveStats);
  }

  convertData(godsData, averageStats = this.state.averageStats, activeStats = this.state.activeStats){
    let convertedData = [];
    // const godsData = this.state.godsData;
    for(let stat in averageStats){
      if(activeStats[stat]){
        let statObj = {statName: labelMaker(stat)}
        for(let god in godsData){
          let godData = godsData[god];
          statObj[god.toLowerCase()] = percentage(godData[stat], averageStats[stat]) || 0;
        }
        convertedData.push(statObj);
      }
    }
    this.setState({convertedData: convertedData});
  }

  addRadar(godName, godsData){
    let letterIndex = 0;
    // let arrOfRadars = [];
    let arrOfRadars = this.state.radars
    // for(let godName in godsData){
    arrOfRadars.push(
      <Radar name={godName} dataKey={godName.toLowerCase()} stroke={godsData[godName].color} fill={godsData[godName].color} fillOpacity={0.6} />
    )
    this.setState({radars: arrOfRadars});
  }

  render(){
    function labelMaker(label = ''){
      return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
    }
    return (
      this.props.gods.godNames
      && this.state.radars.length
      && this.state.convertedData.length
      && Object.keys(this.state.godsData).length
      && Object.keys(this.state.averageStats).length ? (

        <div className="container-row">
          <RadarChart outerRadius={200} width={800} height={520} data={this.state.convertedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="statName" />
            <PolarRadiusAxis angle={30} domain={[0, 100]}/>
            {
              this.state.radars
            }
            {/* <Radar name="Freya" dataKey="freya" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} /> */}
            {/* <Legend /> */}
          </RadarChart>
          <div className="stat-controller">
            <h4> All stats are shown as a percentage of the highest God in each category.</h4>
            {/* <div className="stat-controller-god-selector">
              <label htmlFor="god-selector">Select a God</label>
              <select value={this.state.godName} name="god-selector" onChange={(event) => this.changeGod(event.target.value)}>
                {
                  this.props.gods.godNames.map(god => (<option value={god} key={god}>{labelMaker(god)}</option>))
                }
              </select>
            </div> */}
            <div className="stat-controller-god-selector">
              {/* <label htmlFor="god-selector">Add a God</label> */}
              <select value={this.state.godName} name="god-selector" onChange={(event) => this.setState({godName: event.target.value})}>
                {
                  this.props.gods.godNames.map(god => (<option value={god} key={god}>{labelMaker(god)}</option>))
                }
              </select>
              <button className="btn btn-chart" onClick={() => {this.addGod(this.state.godName)}}>Add a God</button>
            </div>
            <div className="stat-controller-god-list">
              {
                 Object.keys(this.state.godsData).map(godName => {
                   return (
                    <div className="god-selector-current">
                      <h4>{godName}</h4>
                      <div className="legend" style={{backgroundColor: this.state.godsData[godName].color}}></div>
                      <button className="btn btn-chart btn-remove" onClick={() => this.deleteGod(godName)}>x</button>
                    </div>
                   )
                })
              }
            </div>
            <button className="btn btn-chart" onClick={() => this.setState({showStats: !this.state.showStats})}>{this.state.showStats ? 'Collapse' : 'Expand'} Stats</button>
            {
              this.state.showStats &&
              (
                <div className="stat-controller-stats-checkboxes">
                  {
                    statNames.map((statName, idx) => {
                      return (
                        <div className={"stat-checkboxes-" + statName} key={statName}>
                          <label for={statName}>{labelMaker(statName)}</label>
                          <input type="checkbox" name={statName} value={statName} onClick={this.toggleCheckbox} checked={this.state.activeStats[statName]}/>
                        </div>
                      )
                    })
                  }
            </div>
              )
            }
            {/* <div className="stat-controller-god-text">
                <h4>{this.state.godName} excels in the following categories:</h4>
                {
                   this.state.stats
                    .filter(stat => stat.a > 85)
                    .map(stat => <p>{stat.statName} at the {stat.a} percentile</p>)
                }
            </div> */}
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
