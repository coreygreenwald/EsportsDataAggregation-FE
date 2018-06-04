import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_GODS = 'GET_GODS';

/**
 * INITIAL STATE
 */
const godsObj = {
  godNames: []
}


/**
 * ACTION CREATORS
 */
const getGods = godNames => ({ type: GET_GODS, godNames });

export const getGodsThunk = () =>
  dispatch =>
  axios.get('/api/gods')
  .then(res => {
    return dispatch(getGods(res.data));
  })
  .catch(err => console.log(err))

export default function(state = godsObj, action) {
  switch (action.type) {
    case GET_GODS:
      return Object.assign({}, state, { godNames: action.godNames })
    default:
      return state
  }
}
