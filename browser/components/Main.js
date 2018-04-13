import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { getStatsThunk } from '../store/index'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children} = props
  return (
    <div className="main">
      <div className="header">
        <h1> SmiteMaster </h1>
        <h2> The Smite Collection and Aggregation Platform </h2>
      </div>
      <nav className="nav">
        <div className="nav-item"><Link to="/">Home</Link></div>
        <div className="nav-item"><Link to="/stats">Gods by Stats</Link></div>
        <div className="nav-item"><Link to="/gods">Stats by Gods</Link></div>
      </nav>
      <div className="child">
        {children}
      </div>
      <div className="child-mobile">
        <h1> We don't support mobile yet! </h1>
        <h2> We are an analytic platform for smite users / professionals to compare millions of possible comparisons between them major stats and gods that are key to smite. Get on a desktop and check us out 😎 </h2>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    stats: state.stats
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(getStatsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object
}
