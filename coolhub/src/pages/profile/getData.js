import axios from 'axios'
import PubSub from 'pubsub-js'
let token = localStorage.getItem('token')
PubSub.subscribe('token',function(topic,value){
    token = value
})

//获取登录后的用户信息
export function getUserData(self){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/user`)
      .then(function (response) {  
          localStorage.setItem('userName',response.data.login)
            self.setState({avatarUrl:response.data.avatar_url,
                           userName:response.data.login})       
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取指定的用户信息
export function getUsersData(self,owner){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/users/${owner}`)
      .then(function (response) {  
          console.log(response)
            self.setState({avatarUrl:response.data.avatar_url,
                           userName:response.data.login})       
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取用户的公开活动列表
export function getUserActivity(self,owner){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/users/${owner}/received_events`)
      .then(function (res) {  
          let activity = []
            console.log(res)
             res.data.map(lis => {
                 activity.push({
                     url:lis.actor.avatar_url,
                     name:lis.actor.login,
                     time:lis.created_at,
                     type:lis.type,
                     repo:lis.repo.name
                 })
             })
             self.setState({activityList:activity,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取用户的仓库列表
export function getUserRepos(self,owner){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/users/${owner}/repos`)
      .then(function (res) {  
          let reposList = []
            console.log(res)
             res.data.map(lis => {
                 reposList.push({name:lis.name,desc:lis.description,full_name: lis['full_name']})
             })
             self.setState({reposList:reposList,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 


//获取认证用户的followers
export function getUserfollowers(self){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/user/followers`)
      .then(function (res) {  
          let followersList = []
            console.log(res)
             res.data.map(lis => {
                 followersList.push({name:lis.login,url:lis.avatar_url})
             })
             self.setState({followersList:followersList,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取指定用户的followers
export function getUsersfollowers(self,owner){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/users/${owner}/followers`)
      .then(function (res) {  
          let followersList = []
            console.log(res)
             res.data.map(lis => {
                 followersList.push({name:lis.login,url:lis.avatar_url})
             })
             self.setState({followersList:followersList,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取认证用户的following
export function getUserfollowing(self){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/user/following`)
      .then(function (res) {  
          let followingList = []
            console.log(res)
             res.data.map(lis => {
                 followingList.push({name:lis.login,url:lis.avatar_url})
             })
             self.setState({followingList:followingList,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//获取指定用户的following
export function getUsersfollowing(self,owner){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
      })
      instance.get(`/users/${owner}/following`)
      .then(function (res) {  
          let followingList = []
            console.log(res)
             res.data.map(lis => {
                 followingList.push({name:lis.login,url:lis.avatar_url})
             })
             self.setState({followingList:followingList,loading:true})
      })
      .catch(function (error) {
        console.log(error)
      })
} 