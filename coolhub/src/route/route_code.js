import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import CodeAppBar from '../pages/code/code_app_bar'
import Code from '../pages/code/code'
import CHBottomNavigation from '../components/ch_bottom_navigation'

const Test = (props) => <div style={{marginTop: 80}}><h1>skyline</h1><p>{props.match.params.bpple}</p></div>

const CodeRoute = (props) => (
    <div>
      <CodeAppBar />
      <Route exact path={`${props.match.url}`} component={ Code } />
      {/*<Route path={`${props.match.url}/:owner?/:repo`} component={ Readme } />*/}
      <Route path={`${props.match.url}`} component={ Test } />
      <CHBottomNavigation index={0}/>
    </div>
)
export default CodeRoute
