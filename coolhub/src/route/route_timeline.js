import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import Timeline from '../pages/timeline/timeline'
import Readme from '../pages/readme/readme'
import CHBottomNavigation from '../components/ch_bottom_navigation'

const TimelineRoute = (props) => (
    <div>
      <Route exact path={`${props.match.url}`} component={ Timeline } />
      <Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />
      <CHBottomNavigation index={1}/>
    </div>
)
export default TimelineRoute
