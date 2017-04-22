import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import Timeline from '../pages/timeline/timeline'
import Readme from '../pages/readme/readme'

const TimelineRoute = (props) => (
    <div>
      <Route exact path={`${props.match.url}`} component={ Timeline } />
      <Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />
    </div>
)
export default TimelineRoute
