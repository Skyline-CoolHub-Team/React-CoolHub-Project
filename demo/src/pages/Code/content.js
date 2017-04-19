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

import {getReposContentList,getfileContent} from './getRepos'
import reposContent from './reposContent'
import Prism from 'prismjs'
import '../../prism.css'
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
        this.state={
            reposRoot:[],
            fileContent:''
        }
        // console.log('我是仓库内容文件列')
        let reg = /\..+/
        console.log(this.props.match.params['0'])
        console.log(Prism)
        if(reg.test(this.props.match.params['0'])){ 
            getfileContent(this,this.props.match.params.rep,this.props.match.params['0']) 
        }else{
            console.log(4565498)
            getReposContentList(this,this.props.match.params.rep,this.props.match.params['0'])
        }
        
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
        let reg = /\..+/
        console.log(reg.test(path))
        if(reg.test(path)){        
            getfileContent(this,rep,path) 
            return
        }else{
            getReposContentList(this,rep,path) 
        }
                  
    }
    //判断文件类型,
    fileType(obj){
        let reg = /\..+/
        if(obj.type==='dir'){
            return 'folder'
        }else if(obj.type==='file'){
            switch(reg.exec(obj.name)[0]){
                case '.svg':
                case '.png':
                case '.jpg':
                    return 'insert_photo'
                    break
                case '.md':
                    return 'description'
                    break
                case '.css':
                case '.min.css':
                    return 'palette'
                    break
                default:
                    return 'code'
            }
        }
        
    }
    componentWillUnmount(){
        this.mounted = true    
    }
    render(){
        let reg = /\..+/
        let self = this
        console.log(this.props.match.params['0'])
     if(reg.test(this.props.match.params['0'])){
         return (
             <div style={style}>
                    <pre className="language-markup">
                        <code  dangerouslySetInnerHTML={{__html:Prism.highlight(this.state.fileContent,Prism.languages.js)}}>
                            
                        </code>
                    </pre>          
             </div>
         )
     }else{
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
        
    }

export default content