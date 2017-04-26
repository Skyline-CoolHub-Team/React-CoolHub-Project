import axios from 'axios'
import token from '../utility/get_token.js'
const ghBaseURL = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {'Authorization': 'token ' + token}
})
export default ghBaseURL
