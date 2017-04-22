import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import Code from '../pages/code/code'
import File from '../pages/readme/readme'

const CodeRoute = (props) => (
    <div>
      <Route exact path='/' component={ Code } />
      {/*<Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />*/}
    </div>
)
export default CodeRoute
