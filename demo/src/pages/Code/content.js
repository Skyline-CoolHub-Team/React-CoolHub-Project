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

import {getReposContentList} from './getRepos'
import reposContent from './reposContent'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'

}
//这是仓库内容文件页面
class content extends Component {
    constructor(props){
        super(props)
        console.log(this.props.match)
        this.state={
            reposRoot:[],
        }
        console.log('我是仓库内容文件列')
        getReposContentList(this,this.props.match.params.rep,this.props.match.params['0'])
        this.mounted =false
        //监听浏览器后退事件,重新获取数据
        window.addEventListener('popstate',()=>{
            //防止组件卸载后由异步使用setState造成的错误
            if(this.mounted===false){
                getReposContentList(this,this.props.match.params.rep,this.props.match.params['0'])
            } 
            return
        })
    }

    getContentList(rep,path){
            getReposContentList(this,rep,path)               
    }
    //判断文件类型,目前只区分了md,文件,文件夹
    fileType(obj){
        if(obj.name==='README.md'){
            return 'description'
        }else if(obj.type==='dir'){
            return 'folder'
        }else if(obj.type==='file'){
            return 'code'
        }
    }
    componentWillUnmount(){
        this.mounted = true    
    }
    render(){
        let self = this
            return (
                <div style={style}>
                <MuiThemeProvider>
                    <List>
                        {console.log(self.props.match)}          
                        {this.state.reposRoot.map((lis,index) => {
                            return <Link to={`${self.props.match.url}/${lis.name}`} key={index}>
                                    <ListItem  
                                            primaryText={lis.name} 
                                            leftIcon={<FontIcon className="material-icons">{this.fileType(lis)}</FontIcon>} 
                                            rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>}
                                            onClick={this.getContentList.bind(this,self.props.match.params.rep,self.props.match.params['0']+'/'+lis.name)}
                                            />
                                </Link>           
                        })}
                    </List>        
                </MuiThemeProvider>
            </div>
            )
        }
        
    }

export default content