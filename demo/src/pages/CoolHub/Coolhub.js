/**
 * CoolHub入口页面
 */
import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Code from '../Code/Code'
import Timeline from '../Timeline/Timeline'
import Star from '../Star/Star'
import Profile from '../Profile/Profile'

import BottomNavigation from '../../components/CoolHubBottomNavigation/CoolHubBottomNavigation'

import {BrowserRouter as Router, Route} from 'react-router-dom'

/**
 * Needed for onTouchTap
 * http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin()

export default class CoolHub extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Code} />
            <Route exact path="/timeline" component={Timeline} />
            <Route exact path="/star" component={Star} />
            <Route exact path="/profile" component={Profile} />
            <BottomNavigation />
          </div>
        </Router>
      </div>
    )
  }
}
