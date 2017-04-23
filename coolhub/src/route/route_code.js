import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import CodeAppBar from '../pages/code/code_app_bar'
import Code from '../pages/code/code'
import File from '../pages/readme/readme'

const Test = (props) => <div style={{marginTop: 80}}><h1>skyline</h1><p>{props.match.params.bpple}</p></div>

const CodeRoute = (props) => (
    <div>
    <CodeAppBar />
      <Route exact path={`${props.match.url}`} component={ Code } />
      {/*<Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />*/}
      <Route path={`${props.match.url}`} component={ Test } />
    </div>
)
export default CodeRoute
