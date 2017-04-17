/**
 * The Code page of CoolHub App.
 */
import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FontIcon from 'material-ui/FontIcon';

import {getReposList} from './getRepos'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import reposContent from './reposContent'
import content from './content'
import {getReposContent,getReposContentList} from './getRepos'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'

}
const list = {
  display:'flex',

}

export default class Code extends Component {
  constructor(props){
    super(props)
    this.state={
      reposList:[],
    }
    getReposList(this)
    console.log(this.props.match)
  }
      fileType(obj){
        if(obj.name==='README.md'){
            return 'description'
        }else if(obj.type==='dir'){
            return 'folder'
        }else if(obj.type==='file'){
            return 'code'
        }
    }
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
    const reposList = ({match}) => {     
      return (   
        <div style={style}>
        <MuiThemeProvider>
          <List>
          {this.state.reposList.map((lis,index) => {
            return <Link to={`Code/${lis}`} key={index}>
                    <ListItem  
                             primaryText={lis} 
                             leftIcon={<FontIcon className="material-icons">folder</FontIcon>} 
                             rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>}
                             />
                   </Link>           
          })}
        </List>        
        </MuiThemeProvider>
      </div>
      )
    }
    return (
      <Router>
        
      <div>
        <Switch>
                <Route exact path="/Code" component={reposList}/>
                <Route exact path="/Code/:rep" component={reposContent}/>
                <Route  path="/Code/:rep/*" component={content}/>
        </Switch>
      </div>
      </Router>


    )
  }
} 
