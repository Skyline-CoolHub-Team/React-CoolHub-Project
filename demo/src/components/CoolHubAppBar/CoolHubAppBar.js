/**
 * The CoolHub AppBar component.
 */
import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import * as firebase from 'firebase'
import axios from 'axios'

/**
 * firebase config
 */
const config = {
  apiKey: "AIzaSyAzNIcauGMf_V_N7_BY4Hl7jrhYZv5XzWQ",
  authDomain: "react-coolhub.firebaseapp.com",
  databaseURL: "https://react-coolhub.firebaseio.com",
  projectId: "react-coolhub",
  storageBucket: "react-coolhub.appspot.com",
  messagingSenderId: "205032541101"
}
firebase.initializeApp(config)

export default class CoolHubAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignIn: false,
      isEdit: false,
      open: false
    }
  }

  oAuth = () => {
    var provider = new firebase.auth.GithubAuthProvider()
    provider.addScope('repo,user,repo:status')
    firebase.auth().signInWithRedirect(provider)
    // Change the codePageLoading state
  }

  handleEdit = () => {
    if (this.state.isEdit) {
      this.setState({
        isEdit: false
      })
    } else {
      this.setState({
        isEdit: true
      })
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleWelcome(event) {
    event.preventDefault()
    alert('You have signed in now, enjoy it!')
    return false
  }

  componentDidMount() {
    var self = this
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        self.props.toggleLoading()
        var token = result.credential.accessToken
        var user = result.user
        localStorage.setItem('token', token)
        localStorage.setItem('uid', user.uid)
        console.log(token, user, result)
        dealWithToken(token)
      }
      }).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        var email = error.email
        var credential = error.credential
        console.log(errorCode, errorMessage, email, credential)
      })

    function dealWithToken (token) {
      self.setState({
        isSignIn: true
      })
      const instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token}
      })
      instance.get('/user')
      .then(function (response) {
        self.props.toggleLoading()
        console.log(response, response.data)
        localStorage.setItem('user', response.data.login)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Sign in"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.oAuth}
      />,
    ]

    return (
      <MuiThemeProvider>
        <div>
        <AppBar
          title={<span>Code</span>}
          iconElementRight={<FlatButton label={this.state.isEdit ? 'Done' : 'Edit'} onClick={this.handleEdit} />}
          iconElementLeft={
            <IconButton onTouchTap={this.state.isSignIn ? this.handleWelcome : this.handleOpen}>
              <FontIcon className="material-icons">{this.state.isSignIn ? 'face' : 'perm_identity'}
              </FontIcon>
            </IconButton>
          }
        />
        <Dialog
          title="Welcome :)"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Pleace sign in this app via your Github account.
        </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
