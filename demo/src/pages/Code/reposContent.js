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
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import {getReposContent,getReposContentList} from './getRepos'
import {getReposList} from './getRepos'
import content from './content'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'

}
//这是仓库内容页面
class reposContent extends Component {
    constructor(props){
        super(props)
        this.state={
            reposRoot:[],
        }
        this.getContentList = this.getContentList.bind(this)
        this.fileType = this.fileType.bind(this)
        getReposContentList(this,this.props.match.params.rep,this.props.match.params['0']?this.props.match.params['0']:'')
        console.log('我是仓库内容列表页')
    }
    getContentList(rep,path){
        getReposContentList(this,rep,path)       
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

    render(){
        let self = this    
        
            return (
             <div style={style}>
            <MuiThemeProvider>
                <List>
                    {this.state.reposRoot.map((lis,index) => {
                        return <Link to={`${self.props.match.url}/${lis.name}`} key={index}>
                                <ListItem  
                                        primaryText={lis.name} 
                                        leftIcon={<FontIcon className="material-icons">{this.fileType(lis)}</FontIcon>} 
                                        rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} 
                                        />
                                </Link>           
                    })}
                </List>        
            </MuiThemeProvider>
        </div>
            ) 
        } 
        
    }

export default reposContent