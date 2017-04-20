/**
 * The Timeline page of CoolHub App.
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Timeline from './timeline.js'
import Readme from './readme.js'

const TimelineRoute = (props) => (
    <div>
      <Route exact path='/timeline' component={Timeline} />
      <Route path={`/timeline/:owner?/:repo`} component={Readme} />
    </div>
)

class TimelineRouter extends Component {
  render() {
    let self = this
    return (
      <div>
        <Route exact path={`timeline/${this.state.tab}`} component={Timeline} />
        <Route path={`/timeline/:owner?/:repo`} component={Readme} />
      </div>
    )
  }
}

export default TimelineRoute