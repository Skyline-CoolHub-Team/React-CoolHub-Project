/**
 * The CoolHub entry page.
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'


import Code from '../Code/Code'
import TimelineRoute from '../Timeline/TimelineRoute'
import Star from '../Star/Star'
import Profile from '../Profile/Profile'

import BottomNavigation from '../../components/CoolHubBottomNavigation/CoolHubBottomNavigation'

import injectTapEventPlugin from 'react-tap-event-plugin'

import * as firebase from 'firebase'

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
            <Route exact path="/" component={Code}  />
            <Route path="/timeline" component={TimelineRoute} />
            <Route path="/star" component={Star} />
            <Route path="/profile" component={Profile} />
            <BottomNavigation />
          </div>
        </Router>
      </div>
    )
  }
}
