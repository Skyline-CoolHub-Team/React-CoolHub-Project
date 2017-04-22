import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import CodeAppBar from '../pages/code/code_app_bar'
import Code from '../pages/code/code'
import File from '../pages/readme/readme'

const CodeRoute = (props) => (
    <div>
      <CodeAppBar />
      <Route exact path='/' component={ Code } />
      {/*<Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />*/}
    </div>
)
export default CodeRoute
