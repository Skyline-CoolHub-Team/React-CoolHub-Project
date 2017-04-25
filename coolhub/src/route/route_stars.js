import React, { Component } from 'react'
import {Route} from 'react-router-dom'
// components
import Stars from '../pages/stars/stars'
import Readme from '../pages/readme/readme'
import CHBottomNavigation from '../components/ch_bottom_navigation'

const StarsRoute = (props) => (
    <div>
      <Route exact path={`${props.match.url}`} component={Stars} />
      <Route path={`${props.match.url}/:owner?/:repo`} component={Readme} />
      <CHBottomNavigation index={2}/>
    </div>
)
export default StarsRoute
