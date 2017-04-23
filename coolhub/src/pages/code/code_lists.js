import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {getReposContentList} from './getData'

const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'

}
console.log(123)
//这是仓库内容页面
class reposContent extends Component {
    constructor(props){
        super(props)
        this.state={
            reposRoot:[],
        }
        this.fileType = this.fileType.bind(this)
        let idx = this.props.match.params.idx
        let a = JSON.parse(localStorage.getItem('collectionList'))
        console.log(a[0])
        getReposContentList(this,a[idx].owner,a[idx].repo,'',a[idx].branch)
    }
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

    render(){
        let self = this      
            return (
             <div style={style}>
            <MuiThemeProvider>
                <List style={{textAlign: 'left'}}>
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