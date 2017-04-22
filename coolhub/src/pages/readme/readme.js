import React, { Component } from 'react'
// components
import ReadmeAppBar from './readme_app_bar'
import Loading from '../../components/loading'
// ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// firebase
import * as firebase from 'firebase'
// github_markdown stylesheet
import '../../asset/css/github_markdown.css'
// tools
import { b64_to_utf8 } from '../../utils/tools'
// api
import _github from '../../api/axios_github'

class Readme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: '',
      branches: [],
      owner: props.match.params.owner,
      repo: props.match.params.repo
    }
  }
  
  getMdhtml(md) {
    _github.post('/markdown', {
      "text": md,
      "mode": "gfm",
      "context": "github/gollum"
    }).then((response) => {
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
    _github.get(`/repos/${this.props.match.params.owner}/${this.props.match.params.repo}/readme`)
    .then((response) => {
      let md = b64_to_utf8(response.data.content)
      this.setState({loading: false})
      this.getMdhtml(md)
    })
    .catch(function (error) {
      console.log(error)
      self.setState({
        content: '<h1>README NOT FOUND</h1><p>However, you can also collect the repo via the right button on appbar. --CoolHub</p>',
        loading: false
      })
    })

    _github.get(`/repos/${this.props.match.params.owner}/${this.props.match.params.repo}/branches`)
    .then((response) => {
      let branches = response.data.map((item) => item.name)
      console.log(branches)
      self.setState({
        branches: branches
      })
    })
    .catch(error => {
      console.log(error)
      self.setState({branches: ['COOLHUB_ERROR']})
    })
  }

  render() {
    console.log(this.state.owner)
    const self = this
    // dangerouslySetInnerHTML
    // function createMarkup () {
    //   return {__html: self.state.content};
    // }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Loading loading={this.state.loading} />
            <ReadmeAppBar branches={this.state.branches} owner={this.state.owner} repo={this.state.repo}/>
          </div>
        </MuiThemeProvider>
        <div style={{textAlign: 'left', padding: 30, paddingBottom: 76, paddingTop: 76}} dangerouslySetInnerHTML={{__html: self.state.content}} className="markdown-body"></div>
      </div>
    )
  }
}
export default Readme
