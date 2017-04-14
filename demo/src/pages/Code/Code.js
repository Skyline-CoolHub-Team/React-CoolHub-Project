/**
 * The Code page of CoolHub App.
 */
import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



export default class Code extends Component {
  render() {
    const CircularProgressExampleSimple = () => {
      if (this.props.loading) {
        return (
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
        )
      } else {
        return null
      }
    }
    return (
      <div>
        <h1>This is a Code page.</h1>
        <p>Code by skyline.</p>
        <CircularProgressExampleSimple />
      </div>
    )
  }
} 
