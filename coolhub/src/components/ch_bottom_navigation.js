import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

// const FontIcon For BottomNavigationItem
const codeIcon = <FontIcon className="material-icons">code</FontIcon>
const timelineIcon = <FontIcon className="material-icons">timeline</FontIcon>
const starIcon = <FontIcon className="material-icons">star_border</FontIcon>
const profileIcon = <FontIcon className="material-icons">account_circle</FontIcon>

const style = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  zIndex: 1000
}

class CHBottomNavigation extends Component {
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
              containerElement={<Link to="/" />}
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

export default CHBottomNavigation