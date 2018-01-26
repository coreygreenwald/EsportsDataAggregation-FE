import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS'

/**
 * INITIAL STATE
 */
const statsObj = {}

/**
 * ACTION CREATORS
 */
const getStats = stats => ({type: GET_STATS, stats})


export const getStatsThunk = () =>
  dispatch =>
    axios.get('/api/stats')
      .then(res => {
        console.log('this was called', res.data);
        return dispatch(getStats(res.data))
      })
      .catch(err => console.log(err))


export default function (state = [], action) {
  switch (action.type) {
    case GET_STATS:
      return action.stats
    default:
      return state
  }
}
