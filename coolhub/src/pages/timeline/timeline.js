import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Tabs, Tab } from 'material-ui/Tabs'
// api
import _github from '../../api/axios_github'
// access_token
import { token } from '../../utils/tools'
// timelinelists
import TimelineLists from './timeline_lists'
// components
import Loading from '../../components/loading'

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    let self = this, 
    userName = ''
    _github.get('/user')
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
    _github.get('/users/' + userName + '/received_events')
    .then((response) => {
      self.setState({
        loading: false,
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
    _github.get('/events')
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
    console.log(token)
    token ? this.loadData() : alert('please enter the code page and sign in firstly.')
    // this.pubsub_token = PubSub.subscribe('token', function (topic, value) {
    //   console.log(value)
    //   this.setState({
    //     token: value
    //   });
    // }.bind(this))
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="Personal" value="a">
                <TimelineLists 
                  items={this.state.personalTimeline} 
                  url={ this.props.match.url }
                />
              </Tab>
              <Tab label="Worldwide" value="b">
                <TimelineLists 
                  items={this.state.worldwideTimeline}
                  url={ this.props.match.url} 
                />
              </Tab>
            </Tabs>
            <Loading loading={this.state.loading} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Timeline
