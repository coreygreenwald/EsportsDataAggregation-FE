import React , { Component } from 'react';
import {connect} from 'react-redux'
import { getMostWinsThunk, getMostKillsThunk, getMostPlaysThunk } from '../store/index';
import StatsContentCard from './StatsContentCard.js';
import './FeaturedStats.scss'

class FeaturedStats extends Component {

  componentDidMount(){
    this.props.wins()
    this.props.kills()
    this.props.plays()
  }

  render(){
    const { wins, plays, kills} = this.props.stats;
    console.log(wins, plays, kills)
    return (
      <div className="featured-stat">
        {
          wins && <StatsContentCard imageUrl={wins.picture} godName={wins.name} label="Most Wins" stat={wins.wins} />
        }
        {
          kills && <StatsContentCard imageUrl={kills.picture} godName={kills.name} label="Most Kills" stat={kills.kills} />
        }
        {
          plays && <StatsContentCard imageUrl={plays.picture} godName={plays.name} label= "Most Game Played" stat={plays.gamesPlayed} />
        }

      </div>
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
