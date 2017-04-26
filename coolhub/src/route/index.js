import React, {Component} from 'react'
import {Route} from 'react-router-dom'

// child route
import TimelineRoute from './route_timeline'
import CodeRoute from './route_code'
import StarsRoute from './route_stars'
import ProfileRoute from './route_profile'

class IndexRoute extends Component {
  render() {
    return (
      <div>
        <Route path="/code" component={ CodeRoute } />
        <Route path="/timeline" component={TimelineRoute} />
        <Route path="/stars" component={StarsRoute} />
        <Route path="/profile" component={ProfileRoute} />
      </div>
    )
  }
}

export default IndexRoute
