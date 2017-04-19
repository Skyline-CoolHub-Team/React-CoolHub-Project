/**
 * The CoolHub entry page.
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom'

import Code from '../Code/Code'
import Timeline from '../Timeline/Timeline'
import Star from '../Star/Star'
import Profile from '../Profile/Profile'
import AppBar from '../../components/CoolHubAppBar/CoolHubAppBar'
import BottomNavigation from '../../components/CoolHubBottomNavigation/CoolHubBottomNavigation'

import injectTapEventPlugin from 'react-tap-event-plugin'

import * as firebase from 'firebase'
import reposContent from '../Code/reposContent'
import content from '../Code/content'
/**
 * Needed for onTouchTap
 * http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin()

export default class CoolHub extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      codePageLoading: false
    })
  }

  toggeleChangeCodePageLoading = () => {
    this.setState({
      codePageLoading: !this.state.codePageLoading
    })
  }

  render() {
    return (
      <div>
        <AppBar toggleLoading={this.toggeleChangeCodePageLoading} />
        <Router>
          <div>
            <Switch>
              <Route  path="/Code" component={() => (<Code loading={this.state.codePageLoading} />)}/>
              <Redirect exact path="/" to="/Code"/>
              <Route exact path="/timeline" component={Timeline} />
              <Route exact path="/star" component={Star} />
              <Route exact path="/profile" component={Profile} />         
            </Switch>              
            <BottomNavigation />
          </div>
        </Router>
      </div>
    )
  }
}
