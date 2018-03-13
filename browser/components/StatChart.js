import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatsDataThunk } from '../store/index';
import axios from 'axios';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import { statNames, patchDates } from '../utils/stats';

function randomColor(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class StatChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      statName: 'kills',
      systemTarget: 'all',
      breakdown: 'Per Game',
      chartColor: randomColor(),
      patch: 'all',
      order: 'DESC',
      data: []
    }
    this.grabStat = this.grabStat.bind(this);
    this.setStat = this.setStat.bind(this);
    this.setSystem = this.setSystem.bind(this);
    this.setBreakdown = this.setBreakdown.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  componentDidMount(){
    this.grabStat(this.state);
  }

  grabStat(queryObj){
    let wins = {};
    let querySystem = queryObj.systemTarget && queryObj.systemTarget !== 'all' ? `system=${queryObj.systemTarget}` : '';
    let queryBreakdown = queryObj.breakdown && queryObj.breakdown === 'Per Game' ? `perGame=true` : '';
    let queryPatch = queryObj.patch !== 'all' ? `startDate=${patchDates[queryObj.patch].start}&endDate=${patchDates[queryObj.patch].stop}` : '';
    let finalQuery = [querySystem, queryBreakdown, queryPatch].filter(query => query.length).join('&');
    axios.get(`/api/stats/${queryObj.statName}?sorted=true&${finalQuery}`)
      .then(res => res.data)
      .then(data => {
        data = queryObj.order === 'DESC' ? data.slice(0,10) : data.slice(-10).reverse();
        data = data.map(obj => ({name: obj.name, value: obj[queryObj.statName]}));
        if(!data.length){
          data = [{name: 'T', value: 1},{name: 'R', value: 1},{name: 'Y', value: 1},{name: ' ', value: 1},{name: 'A', value: 1}, {name: 'G', value: 1}, {name: 'A', value: 1}, {name: 'I', value: 1}, {name: 'N', value: 1}];
        }
        queryObj.data = data;
        this.setState(queryObj);
      })
    // let { data } = await axios.get(`/api/stats/${queryObj.statName}?sorted=true&${finalQuery}`);
    // data = data.slice(0,10).map(obj => ({name: obj.name, value: obj[queryObj.statName]}));
    // this.setState(data);
  }

  setStat(statName){
    let queryObj = Object.assign({}, this.state, {statName});
    this.grabStat(queryObj)
  }

  setSystem(systemTarget){
    let queryObj = Object.assign({}, this.state, {systemTarget: systemTarget.toLowerCase()});
    this.grabStat(queryObj)
  }

  setBreakdown(breakdown){
    let queryObj = Object.assign({}, this.state, {breakdown});
    this.grabStat(queryObj)
  }

  setOrder(order){
    let queryObj = Object.assign({}, this.state, {order});
    this.grabStat(queryObj)
  }

  setPatch(patch){
    let queryObj = Object.assign({}, this.state, {patch});
    this.grabStat(queryObj)
  }

  render(){
    function labelMaker(label = ''){
      return label.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase();
    }
    return (
      this.state.data.length ? (

        <div className="container-row">
        <BarChart width={950} height={300} data={this.state.data} margin={{ top: 15, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" >
            <Label value="God Name" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis dataKey="value" label={{ value: labelMaker(`${this.state.statName} for ${this.state.systemTarget} ${this.state.breakdown}`), angle: -90, position: 'insideBottomLeft'}}/>
          <Tooltip />
          <Bar dataKey="value" label="hi" fill={this.state.chartColor} />
        </BarChart>
        <div className="stat-controller">
          <div className="stat-controller-selector">
            <label htmlFor="stat-selector">Select a Stat</label>
            <select value={this.state.statName} name="stat-selector" onChange={(event) => this.setStat(event.target.value)}>
                {
                  statNames.map(stat => (<option value={stat} key={stat}>{labelMaker(stat)}</option>))
                }
            </select>
          </div>
          <div className="stat-controller-system-selector">
            <label htmlFor="stat-selector">Select a System</label>
            <select name="stat-selector" onChange={(event) => this.setSystem(event.target.value)}>
              <option value="all" selected>All Systems</option>
              <option value="pc">PC</option>
              <option value="xbox">Xbox</option>
              <option value="ps4">PS4</option>
            </select>
          </div>
          <div className="stat-controller-system-selector">
            <label htmlFor="system-selector">Select Breakdown</label>
            <select name="system-selector" onChange={(event) => this.setBreakdown(event.target.value)}>
              <option>Total</option>
              <option selected>Per Game</option>
            </select>
          </div>
          <div className="stat-controller-order-selector">
            <label htmlFor="order-selector">Sort Direction</label>
            <select name="order-selector" onChange={(event) => this.setOrder(event.target.value)}>
              <option value="DESC" selected>Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
          {/* <div className="stat-controller-start-date-selector">
          <label htmlFor="date-selector">St</label>
            <input id="date" type="date" onChange={(event) => this.setStartDate(event.target.value)}/>
          </div>
          <div className="stat-controller-stop-date-selector">
            <input id="date" type="date"onChange={(event) => this.setEndDate(event.target.value)}/>
          </div> */}
          <div className="stat-controller-patch-selector">
           <label htmlFor="patch-selector">Select Patch Number</label>
            <select name="patch-selector" onChange={(event) => this.setPatch(event.target.value)}>
              <option value="all" selected>All</option>
              <option value="5.1">5.1</option>
              <option value="5.2">5.2</option>
              <option value="5.3">5.3</option>
            </select>
          </div>
        </div>
      </div>



      ) :
      (<h1>Loading...</h1>)
    )
  }
}

export default withRouter(StatChart)
