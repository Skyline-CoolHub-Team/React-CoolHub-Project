import React, { Component } from 'react'
import { Route ,Switch} from 'react-router-dom'
// components
import profile from '../pages/profile/profile'
import publicActivity from '../pages/profile/public_Activity'
import repositories from '../pages/profile/Repositories'
import followers from '../pages/profile/followers'
import following from '../pages/profile/following'
import Readme from '../pages/readme/readme'
import CHBottomNavigation from '../components/ch_bottom_navigation'

const ProfileRoute = (props) => (
  
    <div>
      <Switch>
        <Route exact path={`${props.match.url}`} component={ profile } />
        <Route exact path={`${props.match.url}/publicactivity`} component={publicActivity}/>
        <Route exact path={`${props.match.url}/publicactivity/:owner?/:repo`} component={Readme} />
        <Route exact path={`${props.match.url}/repositories`} component={repositories}/>
        <Route exact path={`${props.match.url}/repositories/:owner?/:repo`} component={Readme} />
        <Route exact path={`${props.match.url}/followers`} component={followers}/>
        <Route exact path={`${props.match.url}/following`} component={following}/>
        <Route exact path={`${props.match.url}/:user`} component={ profile }/>
        <Route exact path={`${props.match.url}/:user/repositories`} component={ repositories }/>
        <Route exact path={`${props.match.url}/:user/publicActivity`} component={ publicActivity }/>
        <Route exact path={`${props.match.url}/:user/followers`} component={ followers }/>
        <Route exact path={`${props.match.url}/:user/following`} component={ following }/>
      </Switch>
      <CHBottomNavigation index={3}/>
    </div>
)

export default ProfileRoute
