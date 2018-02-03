import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import { getStatsThunk } from '../store/index'
import StatsContentCard from './StatsContentCard.js';

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
        console.log(this.props)
        return (
            <div className="home">
                <div className="home-content">
                    <h1> Welcome to SmiteMaster </h1>
                    <h1> This landing details the api documentation </h1>
                    <h2> General Routes: </h2>
                    <div className="home-content-table">
                        <table>
                            <tr>
                                <th>Route</th>
                                <th>Use Case</th>
                            </tr>
                            <tr>
                                <td>/api/stats</td>
                                <td>Average of all of the stats for all of the Gods</td>
                            </tr>
                            <tr>
                                <td>/api/stats/STATNAME?</td>
                                <td>Average of the specified stat for all of the Gods</td>
                            </tr>
                            <tr>
                                <td>/api/gods</td>
                                <td>All of the god infomation regarding all of the gods</td>
                            </tr>
                            <tr>
                                <td>/api/gods/GODNAME?</td>
                                <td>All of the god information regarding one god</td>
                            </tr>
                            <tr>
                                <td>/api/gods/GODNAME?/stats</td>
                                <td>All of the stats pertaining to one particular god</td>
                            </tr>
                            <tr>
                                <td>/api/gods/GODNAME?/stats/STATNAME?</td>
                                <td>One stat pertaining to one particular god</td>
                            </tr>
                        </table>
                    </div>

                    <h2> Special Routes: </h2>

                    <div className="home-content-table">
                        <table>
                            <tr>
                                <th>Route</th>
                                <th>Use Case</th>
                            </tr>
                            <tr>
                                <td>/api/stats/KDA</td>
                                <td>Get the (kill + assists) / deaths ratio for all of the gods</td>
                            </tr>
                            <tr>
                                <td>/api/stats/games</td>
                                <td>Get the total GamesPlayed for all of the gods. </td>
                            </tr>
                        </table>
                    </div>

                    <h2> Additional Query Strings: </h2>

                    <div className="home-content-table">
                        <table>
                            <tr>
                                <th>Query Param</th>
                                <th>Data Type</th>
                                <th>Use Case</th>
                            </tr>
                            <tr>
                                <td>sorted</td>
                                <td>boolean</td>
                                <td>Order returned information on primary query</td>
                            </tr>
                            <tr>
                                <td>perGame</td>
                                <td>boolean</td>
                                <td>Divide a stat by the amount of games played by that god.</td>
                            </tr>
                            <tr>
                                <td>system</td>
                                <td>pc/xbox/ps4</td>
                                <td>Limit your search to only one console's information.</td>
                            </tr>
                            <tr>
                                <td>date</td>
                                <td>YYYYMMDD</td>
                                <td>Limit your search to only one days worth of information.</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="home-content">
                    {
                        this.props.stats.length && this.props.stats.map(stat => <p key={stat.name}>{stat.wins}</p>)
                    }
                </div> */}

                {/*
                    below is just for testing purposes

                */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StatsContentCard imageUrl="../images/sun_wu_kong.jpeg" godName="Sun Wukong" label="Most Kill" stat="20000" />
                    <StatsContentCard imageUrl="../images/sun_wu_kong.jpeg" godName="Sun Wukong" label="Most Kill" stat="20000" />
                    <StatsContentCard imageUrl="../images/sun_wu_kong.jpeg" godName="Sun Wukong" label="Most Kill" stat="20000" />
                </div>
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
