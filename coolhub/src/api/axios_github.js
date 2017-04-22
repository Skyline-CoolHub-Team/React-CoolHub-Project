import axios from 'axios'
import { token } from '../utils/tools'

const _github = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {'Authorization': 'token ' + token}
})

export default _github
