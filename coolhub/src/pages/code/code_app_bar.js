import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
// ui components
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
// github api
import {_github} from '../../utils/tools.js'
// firebase
import * as firebase from 'firebase'
// publish
import { TOKEN, UID , EDIT} from '../../publish/index'

/**
 * firebase config once
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

class CodeAppBar extends Component {
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
      EDIT(!this.state.isEdit)
      this.setState({
        isEdit: false
      })
    } else {
      EDIT(!this.state.isEdit)
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
    alert('You\'ve signed in now, have fun!')
    return false
  }

  componentDidMount() {
    var self = this
    localStorage.getItem('token') ? this.setState({isSignIn: true}) : void(0)
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // self.props.toggleLoading()
        let token = result.credential.accessToken
        let user = result.user
        // pubsub publish
        TOKEN(token)
        UID(user.uid)
        // save token uid => localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('uid', user.uid)
        console.log(token, user, result)
        dealWithToken(token)
      }
      }).catch(function (error) {
        let errorCode = error.code
        let errorMessage = error.message
        let email = error.email
        let credential = error.credential
        console.log(errorCode, errorMessage, email, credential)
      })

    function dealWithToken (token) {
      self.setState({
        isSignIn: true
      })
      _github.get('/user')
      .then(function (response) {
        // self.props.toggleLoading()
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
          style={{position: 'fixed', top: 0, left: 0}}
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

export default CodeAppBar