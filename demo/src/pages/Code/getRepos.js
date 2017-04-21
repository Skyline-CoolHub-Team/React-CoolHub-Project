import axios from 'axios'
import {Base64} from 'js-base64'
import ttt from './test.json'
let accToken = localStorage.getItem('gitHubAcc')

//获取收藏仓库
export function heh(re){
  let reposList = []
  for(let v in ttt.user.uid.raszxcv){
    reposList.push(ttt.user.uid.raszxcv[v].repo)
  }
  console.log(reposList)
  re.setState({reposList:reposList})
}
//获取用户仓库列表
export function getReposList(re){
   let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + accToken}
      })
      instance.get('/users/raszxcv/repos')
      .then(function (response) {
        let reposList =[]
        response.data.map(lis => {
            reposList.push(lis.name)
        })
        console.log(reposList)
        re.setState({reposList:reposList})
      })
      .catch(function (error) {
        console.log(error)
      })
}
//获取仓库内容里的文件夹或文件列表
export function getReposContentList(re,repo,path,branch){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + accToken},
        params:{
          ref:branch
        }
      })
      instance.get(`/repos/raszxcv/${repo}/contents/${path}`)
      .then(function (response) {
        console.log(response)
        let contentList =[]    
        response.data.map(lis => {
            contentList.push({type:lis.type,name:lis.name})
        })
            contentList.sort((a,b) => {
                if(a.type < b.type){
                    return -1
                }else {
                    return 1
                }

            })
            re.setState({reposRoot:contentList})
        
     
      })
      .catch(function (error) {
        console.log(error)
      })
}  

//获取文件内容
export function getfileContent(re,repo,path,branch){

       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + accToken},
        params:{
          rel:branch
        }
      })
      instance.get(`/repos/raszxcv/${repo}/contents/${path}`)
      .then(function (response) {  
            re.setState({fileContent:Base64.decode(response.data.content)})          
      })
      .catch(function (error) {
        console.log(error)
      })
} 
    //测试用
export function testt(){

       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + accToken},
        params:{
          ref:'v2.2.0'
        }
      })
      instance.get(`/repos/vuejs/vue/contents/`)
      .then(function (response) {  
            console.log(response)         
      })
      .catch(function (error) {
        console.log(error)
      })
} 

