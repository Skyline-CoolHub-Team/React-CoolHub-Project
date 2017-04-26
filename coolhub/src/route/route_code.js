import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// components
import CodeAppBar from '../pages/code/code_app_bar'
import Code from '../pages/code/code'
import reposContent from '../pages/code/code_lists'
import content from '../pages/code/file_lists'
import File from '../pages/readme/readme'
import CHBottomNavigation from '../components/ch_bottom_navigation'

const CodeRoute = (props) => (
  
    <div>
      <Route exact path={`${props.match.url}`} component={ Code } />
      <Route exact path={`${props.match.url}/:idx`} component={reposContent}/> 
      <Route  path="/Code/:idx/*" component={content}/>
      <CHBottomNavigation index={0}/>
    </div>
)
export default CodeRoute
