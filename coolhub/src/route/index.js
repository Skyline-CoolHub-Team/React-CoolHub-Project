import React, {Component} from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Wrong from '../pages/404'
// child route
import TimelineRoute from './route_timeline'
import CodeRoute from './route_code'
import StarsRoute from './route_stars'
import ProfileRoute from './route_profile'

class IndexRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect exact path='/' to='/code'/>
          <Route path="/code" component={ CodeRoute } />
          <Route path="/timeline" component={TimelineRoute} />
          <Route path="/stars" component={StarsRoute} />
          <Route path="/profile" component={ProfileRoute} />
          <Route component={Wrong} />
        </Switch>
      </div>
    )
  }
}

export default IndexRoute
