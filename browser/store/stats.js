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
    dispatch => {
        let wins = {}
        return axios.get('/api/stats/wins?sorted=true')
            .then(mostWins => {
                wins = mostWins.data[0]
                return axios.get(`/api/gods/${wins.name}`)
            })
            .then(winner => {
                wins.picture = winner.data.GodInfo.info.godCard_URL
                return dispatch(getMostWins(wins))
            })
            .catch(err => console.log(err));
    }

export const getMostKillsThunk = () =>
    dispatch => {
        let kills = {}
        return axios.get('/api/stats/kills?sorted=true&perGame=true')
            .then(mostKills => {
                kills = mostKills.data[0]
                return axios.get(`/api/gods/${kills.name}`)
            })
            .then(killer => {
                kills.picture = killer.data.GodInfo.info.godCard_URL
                return dispatch(getMostKills(kills))
            })
            .catch(err => console.log(err));
    }


export const getMostPlaysThunk = () =>
    dispatch => {
        let plays = {};
        return axios.get('/api/stats/games?sorted=true')
            .then(mostPlayed => {
                plays = mostPlayed.data[0]
                return axios.get(`/api/gods/${plays.name}`)
            })
            .then(player => {
                plays.picture = player.data.GodInfo.info.godCard_URL
                return dispatch(getMostPlays(plays))
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
        default:
            return state
    }
}