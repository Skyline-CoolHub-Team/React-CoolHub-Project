import React, {Component} from 'react'
import { Route } from 'react-router-dom'

// child route
import TimelineRoute from './route_timeline'
import CodeRoute from './route_code'
const IndexRoute = () => (
  <div>
    <Route path="/code" component={ CodeRoute } />
    <Route path="/timeline" component={ TimelineRoute } />
    {/*<Route path="/star" component={ StarRoute } />
    <Route path="/profile" component={ ProfileRoute } />*/}
  </div>
)
export default IndexRoute
