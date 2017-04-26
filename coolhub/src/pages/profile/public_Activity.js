import React, { Component } from 'react'
import {getUserActivity} from './getData'
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack,cyan400,cyan500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Navigationleft from 'material-ui/svg-icons/navigation/apps';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../../components/loading'
import {passedDays} from '../../utils/tools'
const style = {
    position:'fixed',
    bottom:'56px',
    top:'64px',
    width:'100%',
    overflow:'auto',
    textAlign:'left',
    wordWrap: 'break-word',
    wordBreak: 'normal',
}
const title = {
  color:'white'
}
export default class publicActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            activityList:[],
            loading:false,
            userName:localStorage.getItem('userName')
        }
        console.log(this.props.match)
       this.props.match.params.user?getUserActivity(this,this.props.match.params.user):getUserActivity(this,this.state.userName)
    }
    

    type(type){
       switch(type){
           case "ForkEvent":
            return "fork"
            break
           case "CreateEvent":
            return "created repository"
            break
           case "WatchEvent":
            return "star"
            break
       }
    }
    render(){
        let self = this
        return (
            this.state.loading?
            <div>
                <MuiThemeProvider>
                    <div>
                    <AppBar  title={<span >{this.props.match.params.user?`${this.props.match.params.user} Activity`:'User Activity'}</span>}
                        iconElementLeft={<IconButton  ><Link to='/profile'><Navigationleft style={{color:'#fff'}}></Navigationleft></Link></IconButton>}
                        iconElementRight={<IconButton></IconButton>}
                    />
                    <List style={style} >
                        {this.state.activityList.map((lis,index) => {
                            return (
                                <Link to={`${this.props.match.url}/${lis.repo}`} key={index}      >
                                <ListItem
                                    leftAvatar={<Avatar src={lis.url} />}
                                    primaryText={passedDays(lis.time)}
                                     secondaryText={
                                        <p >
                                            <span>{lis.name} </span>
                                            <span style={{color:cyan400}}>{self.type(lis.type)} </span>
                                            <span>{lis.repo}</span>
                                        </p>
                                    }
                                    />
                                </Link>
                            )
                        })}          
                    </List>
                    </div>
                </MuiThemeProvider>
            </div>
            :<Loading loading={true}/>
        )
    }
}