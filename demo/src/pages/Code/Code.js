/**
 * The Code page of CoolHub App.
 */
import React, {Component} from 'react'
import AppBar from '../../components/CoolHubAppBar/CoolHubAppBar'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const token = localStorage.getItem('token')


export default class Code extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      loading: false
    })
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  render() {
    const CircularProgressExampleSimple = () => {
      if (this.state.loading) {
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
        <AppBar toggleLoading={this.toggleLoading} loading={this.state.loading} />
        <h1>This is a Code page.</h1>
        <p>Code by skyline.</p>
        <CircularProgressExampleSimple />
      </div>
    )
  }
} 
