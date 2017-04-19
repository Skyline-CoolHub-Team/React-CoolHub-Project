import React, {Component} from 'react'
import axios from 'axios'
import './github-markdown.css'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const b64_to_utf8 = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
}

const token = localStorage.getItem('token')
const instance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {'Authorization': 'token ' + token}
})

class Readme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: ''
    }
  }
  
  getMdhtml(md) {
    instance.post('/markdown', {
      "text": md,
      "mode": "gfm",
      "context": "github/gollum"
    }).then((response) => {
      console.log(response.data)
      this.setState({
        content: response.data,
        loading: false
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  componentDidMount() {
    var self = this
    instance.get(`/repos/${this.props.match.params.owner}/${this.props.match.params.repo}/readme`)
    .then((response) => {
      console.log(response.data)
      const md = b64_to_utf8(response.data.content)
      this.getMdhtml(md)
    })
    .catch(function (error) {
      console.log(error)
      self.setState({
        content: 'No README file found',
        loading: false
      })
    })
  }

  render() {
    const self = this
    function createMarkup () {
      return {__html: self.state.content};
    }
    const CircularProgressExampleSimple = () => {
      if (self.state.loading) {
        return (
          <div style={{marginTop: '40vh'}}>
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
          </div>
        )
      } else {
        return null
      }
    }
    return (
      <div>
      <div style={{textAlign: 'left',padding: 30, paddingBottom: 56}} dangerouslySetInnerHTML={createMarkup()} className="markdown-body">
        
      </div>
      <CircularProgressExampleSimple />
      </div>
    )
  }
}
export default Readme
