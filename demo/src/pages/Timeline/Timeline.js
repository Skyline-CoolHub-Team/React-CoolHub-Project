import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import axios from 'axios'
import './timeline.css'
const token = localStorage.getItem('token')
const styles = {
  body: {
    height: 'calc(100vh - 48px - 56px)',
    overflowY: 'auto',
    wordWrap: 'break-word',
    wordBreak: 'normal',
  }
}
const instance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {'Authorization': 'token ' + token}
})
const createdAt = (date) => {
  let timestamp = new Date(date)
  let leftDay = parseInt((Date.now() - timestamp) / 3600 / 24 / 1000)
  return leftDay === 0 ? 'today' : leftDay + ' day ago'
}
const InitData = ({item, url}) => (
  <Link to={`timeline/${item.repo.name}`} key={item.id}>
  <ListItem
      /*primaryText={item.actor.login + ' ' + (item.payload.forkee ? 'fork' : item.payload.action) + ' ' + item.repo.name }*/
    primaryText={createdAt(item.created_at)}
    secondaryText={
      <p>
        <span>{item.actor.login}</span>
        <span style={{color: '#00AFCC'}}>{' ' + (item.type == 'WatchEvent' ? 'star' : item.type.replace(/Event/, '').toLowerCase()) + ' '}</span>
        <span>{item.repo.name}</span>
      </p>
    }
    leftAvatar={<Avatar src={item.actor.avatar_url} />}
  />
  </Link>
)
const TimelineLists = ({items}) => {
  const lists = items.map((item) => (
    <InitData item={item} url={`timeline`} key={item.id}/>
  ))
  return (
    <List style={styles.body}>{lists}</List>
  )
}


class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalTimeline: [],
      worldwideTimeline: [],
      value: localStorage.getItem('timelinetab') || 'a', /* 获取后退后的tab状态 */
    }
  }

  handleChange = (value) => {
    localStorage.setItem('timelinetab', value)
    this.setState({
      value: value,
    })
  }

  loadData () {
    var self = this
    let userName = ''
    instance.get('/user')
    .then((response) => {
      userName = response.data.login
      self.getPersonalTimeline(userName)
      self.getWorldwideTimeline()
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  getPersonalTimeline(userName) {
    let self = this
    instance.get('/users/' + userName + '/received_events')
    .then((response) => {
      self.setState({
        personalTimeline: response.data
      })
      console.log(this.state.personalTimeline)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  getWorldwideTimeline() {
    let self = this
    instance.get('/events')
    .then((response) => {
      self.setState({
        worldwideTimeline: response.data
      })
      console.log(this.state.personalTimeline)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  componentDidMount() {
    const id = localStorage.getItem('uid')
    this.loadData()
    if (!token) alert('please enter the code paeg and sign in.')
  }
  render() {
    console.log(localStorage.getItem('timelinetab'))
    return (
      <div>
        <MuiThemeProvider>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Personal" value="a">
              <TimelineLists items={this.state.personalTimeline} />
            </Tab>
            <Tab label="Worldwide" value="b">
              <TimelineLists items={this.state.worldwideTimeline} />
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Timeline