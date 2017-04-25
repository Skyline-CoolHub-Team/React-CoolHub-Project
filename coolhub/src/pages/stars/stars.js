import React, {Component} from 'react'
// ui component
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// component
import StarsLists from './stars_lists'
import Loading from '../../components/loading'
// api
import axios from 'axios'

class Stars extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: true,
      token: localStorage.getItem('token')
    }
    this._github = axios.create({
      baseURL: 'https://api.github.com/',
      headers: {'Authorization': 'token ' + this.state.token}
    })
  }

  getStars() {
    let self = this, userName = localStorage.getItem('user')
    this._github.get('/user/starred')
    .then((response) => {
      self.setState({
        loading: false,
        stars: response.data
      })
      console.log('stars res', response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  componentDidMount() {
    this.state.token ? this.getStars() : alert('Please sign in first.')
  }

  render() {
    return (
      <div>
        <Loading loading={this.state.loading} />
        <MuiThemeProvider>
          <div>
            <AppBar title="Stars" iconElementLeft={<span></span>} />
            <StarsLists 
              items={this.state.stars}
              url={this.props.match.url}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Stars
