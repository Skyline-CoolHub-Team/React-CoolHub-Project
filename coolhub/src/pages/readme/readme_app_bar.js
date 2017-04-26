import React, { Component } from 'react'
// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Dialog from 'material-ui/Dialog'
// firebase
import * as firebase from 'firebase'
const fbCollection = (owner, repo, branch) => {
  let uid = localStorage.getItem('uid')
  firebase.database().ref(`${uid}/collection`).push({
    owner: owner,
    repo: repo,
    branch: branch
  })
}

class ReadmeAppBar extends Component {
  
  state = {
    open: false,
    owner: '',
    repo: '',
    item: ''
  }

  handleOpen = (owner, repo, item) => {
    console.log(owner, item, repo)
    this.setState({open: true, owner: owner, item: item, repo: repo})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleConfirm = () => {
    fbCollection(this.state.owner, this.state.repo, this.state.item)
    this.setState({open: false})
  }

  handleClosePage() {
    history.go(-1)
  }

  render() {
    // let uid = localStorage.getItem('uid')
    // let test =  firebase.database().ref(`${uid}/collection`)
    // test.on('value', function(snapshot) {
    //   let result = snapshot.val()
    //   for (var key in result) {
    //     console.log(result[key].owner)
    //   }
    // });
    var self = this
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleConfirm}
      />,
    ]
    const Logged = (props) => {
      console.log(props)
      const owner = props.owner, repo = props.repo
      const ItemLists = props.branches.map((item) => (
        <MenuItem primaryText={item} onTouchTap={self.handleOpen.bind(Logged, owner, repo, item)} key={item}/>
      ))
      return (
        <IconMenu
          {...props} /* 白色的右侧按钮 */
          iconButtonElement={
            <IconButton style={{color: 'red'}}><MoreVertIcon style={{color: 'red'}}/></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          {ItemLists}
        </IconMenu>
      )
    } 

      Logged.muiName = 'IconMenu' /* 白色的右侧按钮 */

    return (
      <div>
        <AppBar
          style={{position: 'fixed', top: 0, left: 0}}
          title="README.md"
          iconElementLeft={<IconButton onTouchTap={this.handleClosePage}><NavigationClose /></IconButton>}
          iconElementRight={<Logged branches={self.props.branches} repo={self.props.repo} owner={self.props.owner}/>}
        />
        <Dialog
          title="Collect The Code"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Do you confirm that collect the branch {this.state.item} in your account?
        </Dialog>
      </div>
    )
  }
}
export default ReadmeAppBar
