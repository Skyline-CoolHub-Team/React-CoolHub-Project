/**
 * The CoolHub BottomNavigation component.
 */

/* === Import BottomNavigation === */
import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
/* === IMPORT react-router-dom === */
import {Link} from 'react-router-dom'

/* === Const FontIcon For BottomNavigationItem === */
const codeIcon = <FontIcon className="material-icons">code</FontIcon>
const timelineIcon = <FontIcon className="material-icons">timeline</FontIcon>
const starIcon = <FontIcon
className="material-icons">star_border</FontIcon>
const profileIcon = <FontIcon
className="material-icons">account_circle</FontIcon>

/* inline-style */
const style = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  textAlign:'center'
}

export default class CoolHubBottomNavigation extends Component {
  state = {
    selectedIndex: 0
  }

  select = (index) => this.setState({selectedIndex: index})

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={4} style={style}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Code"
              icon={codeIcon}
              containerElement={<Link to="/Code" />}
              onTouchTap={() => this.select(0)}
              />
            <BottomNavigationItem
              label="Timeline"
              icon={timelineIcon}
              containerElement={<Link to="/timeline" />}
              onTouchTap={() => this.select(1)}
              />
            <BottomNavigationItem
              label="Star"
              icon={starIcon}
              containerElement={<Link to="/star" />}
              onTouchTap={() => this.select(2)}
              />
            <BottomNavigationItem
              label="Profile"
              icon={profileIcon}
              containerElement={<Link to="/profile" />}
              onTouchTap={() => this.select(3)}
              />
          </BottomNavigation>
        </Paper>
      </MuiThemeProvider>
    )
  }
}