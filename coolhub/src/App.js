import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// css-reset
import './asset/css/reset.css'
// custom route
import IndexRoute from './route/index'
// components

// ui components
import injectTapEventPlugin from 'react-tap-event-plugin'
/**
 * TODO: delete the css then select the CDN for material-icons
 */
import 'material-design-icons/iconfont/material-icons.css'
/**
 * Needed for onTouchTap
 * http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin()

const App = () => (
  <Router>
    <div style={{ textAlign: 'center'}}>
      <IndexRoute />
    </div>
  </Router>
)

export default App
