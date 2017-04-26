/**
 * The Profile page of CoolHub App.
 */
import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import {getUserData,getUserActivity,getUsersData} from './getData'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import publicActivity from './public_Activity'
import Loading from '../../components/loading'
const style = {marginLeft:5};
const stylee ={
  paddingTop:'30px',
  display:'flex',
  alignItems:'center'
}
const option = {
  marginTop:'5px',
  textAlign:'left'
}
const title = {
  height:'30px',
  background:'#ccc',
  textAlign:'center',
  lineHeight:'30px'
}
const userImg = {
  borderRadius:'50%',
  width:'60px',
  height:'60px',
  marginLeft:'15px'
}
const userName = {
  marginLeft:'10px',
  marginTop:'15px',
  display:'inline-block'
}
// let accToken = localStorage.getItem('gitHubAcc')
// console.log(accToken)

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      avatarUrl:'',
      userName:'',
      loading:false
    }
    console.log(this.props.match)
    this.props.match.params.user?getUsersData(this,this.props.match.params.user):getUserData(this)
  }

  componentDidMount() {
    if (!this.state.userName) alert('Please sign in first.')
  }

  render() {

return (
    this.state.userName?
        <div >  
        <MuiThemeProvider>   
            <div>     
                <AppBar title={<span >{this.props.match.params.user?`${this.state.userName} Profile`:'My Profile'}</span>}
                        iconElementLeft={<span></span>}
                />
          <List>
            <div style={stylee}>
            <img style={userImg} src={this.state.avatarUrl} alt=""/>
            <span style={userName}>{this.state.userName}</span>
            </div>
            <div style={option}>
                <Link to={this.props.match.params.user?`/profile/${this.state.userName}/repositories`:'/profile/repositories'}>
              <ListItem 
              primaryText="Repositories" 
              rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} />
              </Link>
              <Link to={this.props.match.params.user?`/profile/${this.state.userName}/publicactivity`:'/profile/publicactivity'}>
              <ListItem     
              primaryText="Public Activity" 
              rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} />
              </Link>
              <Link to={this.props.match.params.user?`/profile/${this.state.userName}/followers`:'/profile/followers'}>
              <ListItem 
              primaryText="Followers" 
              rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} />
              </Link>
              <Link to={this.props.match.params.user?`/profile/${this.state.userName}/following`:'/profile/following'}>
              <ListItem 
              primaryText="Following" 
              rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} />
              </Link>
            </div>

          </List>
          </div> 
        </MuiThemeProvider>
      </div>
      :<Loading loading={true}/>
      )
  }
} 
