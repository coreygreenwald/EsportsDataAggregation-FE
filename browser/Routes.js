import React, {Component} from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import {Main, Home, FeaturedStats} from './components';
import history from './history'
import StatChartHolder from './components/StatChartHolder';
import GodChartHolder from './components/GraphComponents/GodChartHolder';

export default class Routes extends Component {

  render () {
    return (
      <Router history={history}>
        <Main>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/stats" component={StatChartHolder} />
              <Route exact path="/gods" component={GodChartHolder} />
            </Switch>
          </div>
        </Main>
      </Router>
    )
  }
}
