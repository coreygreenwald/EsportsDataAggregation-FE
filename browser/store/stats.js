import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS';
const GET_MOST_WINS = 'GET_MOST_WINS';
const GET_MOST_KILLS = 'GET_MOST_KILLS';
const GET_MOST_PLAYS = 'GET_MOST_PLAYS';
const GET_STAT_DATA = 'GET_STAT_DATA';

/**
 * INITIAL STATE
 */
const statsObj = {
  stats: []
}

/**
 * ACTION CREATORS
 */
const getStats = stats => ({ type: GET_STATS, stats });

const getMostWins = winner => ({ type: GET_MOST_WINS, winner });

const getMostKills = kills => ({ type: GET_MOST_KILLS, kills });

const getMostPlays = plays => ({ type: GET_MOST_PLAYS, plays });

const getStatData = (statData, statName) => ({ type: GET_STAT_DATA, statData, statName });

export const getStatsThunk = () =>
  dispatch =>
  axios.get('/api/stats')
  .then(res => {
    return dispatch(getStats(res.data));
  })
  .catch(err => console.log(err))
// the godCard_URL property will be included in the query for most wins, kills and plays
// so we will only need to make one call to the backend in the future
export const getMostWinsThunk = () =>
  dispatch => {
    let wins = {};
    return axios.get('/api/stats/wins?sorted=true')
      .then(mostWins => {
        wins = mostWins.data[0];
        return axios.get(`/api/gods/${wins.name}`);
      })
      .then(winner => {
        wins.picture = winner.data.GodInfo.info.godCard_URL;
        return dispatch(getMostWins(wins));
      })
      .catch(err => console.log(err));
  }

export const getMostKillsThunk = () =>
  dispatch => {
    let kills = {};
    return axios.get('/api/stats/kills?sorted=true&perGame=true')
      .then(mostKills => {
        kills = mostKills.data[0];
        return axios.get(`/api/gods/${kills.name}`);
      })
      .then(killer => {
        kills.picture = killer.data.GodInfo.info.godCard_URL;
        return dispatch(getMostKills(kills));
      })
      .catch(err => console.log(err));
  }


export const getMostPlaysThunk = () =>
  dispatch => {
    let plays = {};
    return axios.get('/api/stats/games?sorted=true')
      .then(mostPlayed => {
        plays = mostPlayed.data[0];
        return axios.get(`/api/gods/${plays.name}`);
      })
      .then(player => {
        plays.picture = player.data.GodInfo.info.godCard_URL;
        return dispatch(getMostPlays(plays));
      })
      .catch(err => console.log(err));
  }

export const getStatsDataThunk = (queryObj) =>
  dispatch => {
    console.log('QUERY OBJ', queryObj.breakdown)
    let wins = {};
    let querySystem = queryObj.systemTarget && queryObj.systemTarget !== 'all' ? `system=${queryObj.systemTarget}` : '';
    let queryBreakdown = queryObj.breakdown && queryObj.breakdown === 'Per Game' ? `perGame=true` : '';
    let finalQuery = [querySystem, queryBreakdown].filter(query => query.length).join('&');
    return axios.get(`/api/stats/${queryObj.statName}?sorted=true&${finalQuery}`)
      .then(statData => {
        /* REMOVE LOGIC WHEN ROUTE FIXED */
        let data = statData.data.slice(2,12).map(obj => ({name: obj.name, value: obj[queryObj.statName]}));
        return dispatch(getStatData(data, queryObj.statName));
      })
      .catch(err => console.log(err));
  }

export default function(state = statsObj, action) {
  switch (action.type) {
    case GET_STATS:
      return Object.assign({}, state, { stats: action.stats })
    case GET_MOST_WINS:
      return Object.assign({}, state, { wins: action.winner })
    case GET_MOST_KILLS:
      return Object.assign({}, state, { kills: action.kills })
    case GET_MOST_PLAYS:
      return Object.assign({}, state, { plays: action.plays })
    case GET_STAT_DATA:
      return Object.assign({}, state, { statData: action.statData, statName: action.statName })
    default:
      return state
  }
}
