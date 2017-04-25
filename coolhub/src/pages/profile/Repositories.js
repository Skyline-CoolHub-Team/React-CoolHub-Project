import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Navigationleft from 'material-ui/svg-icons/navigation/apps';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {getUserRepos} from './getData'
import {Link} from 'react-router-dom'
import Loading from '../../components/loading'
const style ={
    textAlign:'left',
    position:'fixed',
    bottom:'56px',
    top:'64px',
    width:'100%',
    overflow:'auto'
}
const main = {
    
}
class repositories extends Component {
    constructor(props){
        super(props)
        this.state = {
            reposList:[],
            userName:localStorage.getItem('userName'),
            loading:false
        }
        console.log(this.props.match)
        this.props.match.params.user?getUserRepos(this,this.props.match.params.user):getUserRepos(this,this.state.userName)
    }
    render(){
        return (
            this.state.loading?
            <div >
                <MuiThemeProvider>
                    <div>
                        <AppBar title={<span>{this.props.match.params.user?`${this.props.match.params.user} Repos`:'Repositories'}</span>}
                        iconElementLeft={<IconButton><Link to='/profile'><Navigationleft style={{color:'#fff'}}></Navigationleft></Link></IconButton>}
                        iconElementRight={<IconButton></IconButton>}
                        />
                        <List style={style}>
                            {this.state.reposList.map(lis => {
                                return (
                                    <ListItem
                                        primaryText={lis.name}
                                        secondaryText={
                                        <p >
                                            {lis.desc?lis.desc:'Not description'}
                                        </p>
                                    }
                                    />
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
export default repositories