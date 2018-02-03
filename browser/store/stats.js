import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS';
const GET_MOST_WINS = 'GET_MOST_WINS';
const GET_MOST_KILLS = 'GET_MOST_KILLS';
const GET_MOST_PLAYS = 'GET_MOST_PLAYS';

/**
 * INITIAL STATE
 */
const statsObj = {}

/**
 * ACTION CREATORS
 */
const getStats = stats => ({ type: GET_STATS, stats });

const getMostWins = winner => ({ type: GET_MOST_WINS, winner });

const getMostKills = kills => ({ type: GET_MOST_KILLS, kills });

const getMostPlays = plays => ({ type: GET_MOST_PLAYS, plays });


export const getStatsThunk = () =>
    dispatch =>
    axios.get('/api/stats')
    .then(res => {
        console.log('this was called', res.data);
        return dispatch(getStats(res.data))
    })
    .catch(err => console.log(err))

export const getMostWinsThunk = () =>
    dispatch =>
    axios.get('/api/stats/wins?sorted=true')
    .then(res => {
        return dispatch(getMostWins({ wins: res.data[0] }))
    })
    .catch(err => console.log(err));

export const getMostKillsThunk = () =>
    dispatch =>
    axios.get('/api/stats/kills?sorted=true&perGame=true')
    .then(res => {
        return dispatch(getMostKills({ kills: res.data[0] }))
    })
    .catch(err => console.log(err));

export const getMostPlaysThunk = () =>
    dispatch =>
    axios.get('/api/stats/games?sorted=true')
    .then(res => {
        return dispatch(getMostPlays({ plays: res.data[0] }))
    })
    .catch(err => console.log(err));


export default function(state = {}, action) {
    switch (action.type) {
        case GET_STATS:
            return Object.assign(state, { stats: action.stats })
        case GET_MOST_WINS:
            return Object.assign(state, { winner: action.winner })
        case GET_MOST_KILLS:
            return Object.assign(state, { kills: action.kills })
        case GET_MOST_PLAYS:
            return Object.assign(state, { plays: action.plays })
        default:
            return state
    }
}