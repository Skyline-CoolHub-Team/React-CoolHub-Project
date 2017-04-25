import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import FileFolder from 'material-ui/svg-icons/file/folder'
import Avatar from 'material-ui/Avatar'
// component
import Loading from '../../components/loading'
// uid
import {uid} from '../../utils/tools'
// firebase
import * as firebase from 'firebase'
// pubsub
import PubSub from 'pubsub-js'

let collectionArr = []

class CodeLists extends Component {

  state = {
    collectionLists: [],
    loading: true,
    uid: uid // update firstly when the pubsub invoke setState. 
  }

  componentWillMount() {
    collectionArr = []
  }
  componentWillUnmount() {
    collectionArr = []
     PubSub.unsubscribe(this.pusub_uid)
  }
  componentDidMount() {
    this.getCollectionList()
    this.pubsub_uid = PubSub.subscribe('uid', function (topic, value) {
      console.log(value)
      this.setState({
        uid: value
      })
      this.getCollectionList()
    }.bind(this))
  }

  getCollectionList() {
    let fbCollection = this.state.uid && firebase.database().ref(`${this.state.uid}/collection`)
    this.state.uid && fbCollection.on('value', (snapshot) => {
      let result = snapshot.val()
      this.setState({
        loading: false
      })
      for (var key in result) {
        collectionArr.push(result[key])
      }
      this.setState({
        collectionLists: collectionArr
      })
    })
  }

  render() {
    localStorage.setItem('collectionList', JSON.stringify(this.state.collectionLists))
    // console.log(JSON.parse(localStorage.getItem('collectionList')))
    const listitems = this.state.collectionLists.map((item, index) => (
      <Link to={`${this.props.match.url}/${item.owner}/${item.repo}`} key={index}>
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIcon={<ActionInfo />}
          primaryText={item.repo}
          secondaryText={item.branch}
          style={{textAlign: 'left'}}
        />
      </Link>
    ))
    return this.state.uid
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