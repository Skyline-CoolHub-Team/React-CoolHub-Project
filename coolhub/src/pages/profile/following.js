import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Navigationleft from 'material-ui/svg-icons/navigation/apps';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {getUserfollowing,getUsersfollowing} from './getData'
import Avatar from 'material-ui/Avatar';
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

class following extends Component {
    constructor(props){
        super(props)
        this.state = {
            followingList:[],
            loading:false
        }
        this.props.match.params.user?getUsersfollowing(this,this.props.match.params.user):getUserfollowing(this)
        
    }
    render(){
        return (
            this.state.loading?
            <div >
                <MuiThemeProvider>
                    <div>
                        <AppBar title={<span>{ this.props.match.params.user?`${ this.props.match.params.user} Following`:'Following'}</span>}
                        iconElementLeft={<IconButton><Link to='/profile'><Navigationleft style={{color:'#fff'}}></Navigationleft></Link></IconButton>}
                        iconElementRight={<IconButton></IconButton>}
                        />
                        <List style={style}>
                            {this.state.followingList.map(lis => {
                                return (
                                    <Link key={lis.name} to={`/profile/${lis.name}`}>
                                    <ListItem
                                        leftAvatar={<Avatar src={lis.url} />}
                                        primaryText={lis.name}
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
export default following