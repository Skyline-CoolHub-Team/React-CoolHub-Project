import React, {Component} from 'react'
import axios from 'axios'
import './github-markdown.css'
import * as firebase from 'firebase'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const b64_to_utf8 = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
}

const token = localStorage.getItem('token')
const instance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {'Authorization': 'token ' + token}
})

const fbCollection = (owner, repo, branch) => {
  let uid = localStorage.getItem('uid')
  firebase.database().ref(`${uid}/collection`).push({
    owner: owner,
    repo: repo,
    branch: branch
  })
}


class BranchesItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: props.owner,
      repo: props.repo
    }
  }
  
  render() {
    const ItemLists = this.props.branches.map((item) => (
      <MenuItem primaryText={item} onTouchTap={fbCollection.bind(this,this.state.owner,this.state.repo, item)}/>
    ))
     return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {ItemLists}
      </IconMenu>
    )
  }
 
} 

BranchesItems.muiName = 'IconMenu' /* 白色的右侧按钮 */

class ReadmeAppBar extends Component {
  handleClose() {
    history.go(-1)
  }

  render() {
    var self = this
    return (
      <AppBar
        title="README.md"
        iconElementLeft={<IconButton onTouchTap={this.handleClose.bind(this)}><NavigationClose /></IconButton>}
        iconElementRight={<BranchesItems branches={self.props.branches} repo={self.props.repo} owner={self.props.owner}/>}
      />
    )
  }
}

class Readme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: '',
      branches: [],
      owner: props.match.params.owner,
      repo: props.match.params.repo
    }
  }
  
  getMdhtml(md) {
    instance.post('/markdown', {
      "text": md,
      "mode": "gfm",
      "context": "github/gollum"
    }).then((response) => {
      this.setState({
        content: response.data,
        loading: false
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  componentDidMount() {
    var self = this
    instance.get(`/repos/${this.props.match.params.owner}/${this.props.match.params.repo}/readme`)
    .then((response) => {
      const md = b64_to_utf8(response.data.content)
      this.getMdhtml(md)
    })
    .catch(function (error) {
      console.log(error)
      self.setState({
        content: 'No README file found',
        loading: false
      })
    })

    instance.get(`/repos/${this.props.match.params.owner}/${this.props.match.params.repo}/branches`)
    .then((response) => {
      let branches = response.data.map((item) => item.name)
      console.log(branches)
      self.setState({
        branches: branches
      })
    })
    .catch(error => {
      console.log(error)
      self.setState({branches: ['COOLHUB_ERROR']})
    })
  }

  render() {
    console.log(this.state.owner)
    const self = this
    function createMarkup () {
      return {__html: self.state.content};
    }
    const CircularProgressExampleSimple = () => {
      if (self.state.loading) {
        return (
          <div style={{marginTop: '24vh'}}>
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
          </div>
        )
      } else {
        return null
      }
    }
    return (
      <div>
        <MuiThemeProvider>
          <ReadmeAppBar branches={this.state.branches} owner={this.state.owner} repo={this.state.repo}/>
        </MuiThemeProvider>
        <div style={{textAlign: 'left',padding: 30, paddingBottom: 56,}} dangerouslySetInnerHTML={createMarkup()} className="markdown-body"></div>
      <CircularProgressExampleSimple />
      </div>
    )
  }
}
export default Readme
