import React, {Component} from 'react'
// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import FileFolder from 'material-ui/svg-icons/file/folder'
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar'
// component
import Loading from '../../components/loading'
// uid
import {uid} from '../../utils/tools'
// firebase
import * as firebase from 'firebase'
// Link
import {Link} from 'react-router-dom'

import PubSub from 'pubsub-js'

class CodeLists extends Component {

  state = {
    collectionLists: [],
    loading: true,
    edit:false,
    // uid:uid
  }
  componentWillMount(){
    // collectionArr = []
  }
  componentDidMount() {
    this.getcollectionLists()
    this.pubsub_edit = PubSub.subscribe('changedit', function (topic, value) {
      console.log(value)
      this.setState({
        edit: value
      });
    }.bind(this))

    // this.pubsub_uid = PubSub.subscribe('uid', function (topic, value) {
    //   console.log(value)
    //   this.setState({
    //     uid: value
    //   });
    //   this.getcollectionLists()
    // }.bind(this))
  }

  componentWillUnmount() {
    // collectionArr = []
    PubSub.unsubscribe(this.pusub_edit)
    PubSub.unsubscribe(this.pusub_uid)
  }
  componentDidUpdate(){

  }
  getcollectionLists(){
    console.log(uid)
     let fbCollection = uid && firebase.database().ref(`${uid}/collection`)
    uid && fbCollection.on('value', (snapshot) => {
      let collectionArr = []
      let result = snapshot.val()
      console.log(result)
      this.setState({loading: false})
      for (var key in result) {
        console.log(key)
         collectionArr.push({key:key,obj:result[key]})
      }
      console.log(collectionArr)
      this.setState({
        collectionLists: collectionArr
      })
    })
  }
  removeFile(key){
    firebase.database().ref(`${uid}/collection/${key}`).remove();
    this.getcollectionLists()
  }
  render() {
    localStorage.setItem('collectionList', JSON.stringify(this.state.collectionLists))
    console.log(JSON.parse(localStorage.getItem('collectionList')))
    const listitems = this.state.collectionLists.map((item, index) => (
      //判断是不是在编辑状态,在编辑状态下不跳转
      <Link key={index} to={this.state.edit?`/code`:`/code/${index}`}>   
      <ListItem    
        leftAvatar={<Avatar icon={<FileFolder />} />}
        //切换编辑状态
        rightIcon={this.state.edit?<FontIcon onClick={this.removeFile.bind(this,item.key)} className="material-icons">remove_circle</FontIcon>
                                  :<FontIcon className="material-icons">chevron_right</FontIcon>
                  }
        primaryText={item.obj.repo}
        secondaryText={item.obj.branch}
        style={{textAlign: 'left'}}
      />
      </Link>
    ))
    return uid
    ? (
      <MuiThemeProvider>
        <div>
        <Loading loading={this.state.loading} />
        <List>
          {listitems}
        </List>
        </div>
      </MuiThemeProvider>
    )
    : (
      <h1 style={{fontSize: '24px', padding: 10, marginTop: 70}}>Please sign in to checkout your collection code lists here.</h1>
    )
  }
}

export default CodeLists
