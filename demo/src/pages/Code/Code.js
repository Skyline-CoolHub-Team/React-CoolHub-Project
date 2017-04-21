/**
 * The Code page of CoolHub App.
 */
import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {List, ListItem} from 'material-ui/List';
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
import {getReposContentList,testt} from './getRepos'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'
}
import ttt from './test.json'

export default class Code extends Component {
  constructor(props){
    super(props)
    this.state={
      reposList:[],
    }
    // getReposList(this)



  }
  componentWillMount(){
    localStorage.setItem("ceshi",JSON.stringify(ttt))
    testt()
  let reposList = []
  for(let v in ttt.user.uid){
    console.log(ttt.user.uid[v])
    for(let r in ttt.user.uid[v]){
      console.log(ttt.user.uid[v][r].repo)
      reposList.push({repo:ttt.user.uid[v][r].repo,branch:ttt.user.uid[v][r].branch})
    }
  }
  console.log(reposList)
  // this.setState({reposList:reposList})
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
    const reposList = () => {     
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
