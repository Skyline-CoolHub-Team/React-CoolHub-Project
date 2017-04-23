
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {getReposContentList,getfileContent} from './getData'
import hijs from 'highlight.js'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'

}
let a = JSON.parse(localStorage.getItem('collectionList'))

//这是仓库内容文件页面
class content extends Component {
    constructor(props){
        super(props)
        this.state={
            reposRoot:[],
            fileContent:'',
            idx:this.props.match.params.idx
        }   
        
        
    }
    componentWillMount(){
        console.log(this.props.match)
        let reg = /\..+/
        
        if(reg.test(this.props.match.params['0'])){ 
            getfileContent(this,a[this.state.idx].owner,a[this.state.idx].repo,this.props.match.params['0'],a[this.state.idx].branch) 
        }else{
            getReposContentList(this,a[this.state.idx].owner,a[this.state.idx].repo,this.props.match.params['0'],a[this.state.idx].branch)
        }
        this.mounted =false
        
        // 监听浏览器后退事件,重新获取数据
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
        console.log(a)
        if(reg.test(path)){   
            console.log(path)     
            getfileContent(this,a[this.state.idx].owner,a[this.state.idx].repo,path,a[this.state.idx].branch)  
            return
        }else{
             getReposContentList(this,this.props.match.params.rep,this.props.match.params['0'])
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
    componentWillUpdate(){
        
    }
    componentDidMount(){
        hijs.initHighlightingOnLoad()       
    }
    componentDidUpdate(){
        
    }
    render(){
        let reg = /\..+/
        let self = this  
     if(reg.test(this.props.match.params['0'])){   
         return (  
             <div style={style}>
                 <pre className="hljs">
                    <code dangerouslySetInnerHTML={{__html:hijs.highlightAuto(this.state.fileContent).value}}>
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