import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {getReposContentList,getfileContent} from './getCodeData'
import Loading from '../../components/loading'
import AppBar from 'material-ui/AppBar';
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto',
  textAlign: 'left'
}
console.log(123)
//这是仓库内容页面
class reposContent extends Component {
    constructor(props){
        super(props)
        this.state={
            reposRoot:[],
            loading:true
        }
        this.fileType = this.fileType.bind(this)
        
        
        
    }
    fileType(obj){
        let reg = /\..+/
        if(obj.type==='dir'){
            return 'folder'
        }else if(obj.type==='file'){

            return 'code'
        }
        
    }
    componentDidMount(){
        let idx = this.props.match.params.idx
        let list = JSON.parse(localStorage.getItem('collectionList'))
        this.repoName = list[idx].obj.repo
        getReposContentList(this,list[idx].obj.owner,list[idx].obj.repo,'',list[idx].obj.branch)
    }
    render(){
        let self = this      
            return (
             <div >
            <MuiThemeProvider> 
                <div>  
                    <AppBar title={<span>{this.repoName}</span>}
                            iconElementLeft={<span></span>}

                    />
                    <Loading loading={this.state.loading}/>
                <List style={style}>
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
                </div>        
            </MuiThemeProvider>
        </div>
            ) 
        } 
        
    }

export default reposContent