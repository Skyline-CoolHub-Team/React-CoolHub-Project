import axios from 'axios'
import {b64_to_utf8} from '../../utils/tools'
import PubSub from 'pubsub-js'
let token = localStorage.getItem('token')
PubSub.subscribe('token',function(topic,value){
    token = value
})
//获取仓库内容里的文件夹或文件列表
export function getReposContentList(re,owenr,repo,path,branch){
    console.log(1231231231)
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
        params:{
          ref:branch
        }
      })
      instance.get(`/repos/${owenr}/${repo}/contents/${path}`)
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
            re.setState({reposRoot:contentList,loading:false})
      })
      .catch(function (error) {
        console.log(error)
      })
}  
//获取文件内容
export function getfileContent(re,owenr,repo,path,branch){
      re.setState({loading:true})
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
        params:{
          rel:branch
        }
      })
      instance.get(`/repos/${owenr}/${repo}/contents/${path}`)
      .then(function (response) {  
          if(response.data.type === 'file'){
            
              re.setState({fileContent:b64_to_utf8(response.data.content),aaa:true,loading:false,
                            fileName:path.split('/')[path.split('/').length-1]
            }) 
          }else if(response.data.type === undefined){
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
                  console.log(path.split('/')[path.split('/').length-1])
                  re.setState({reposRoot:contentList,aaa:false,loading:false,
                                fileName:path.split('/')[path.split('/').length-1]
                    })
                }      
      })
      .catch(function (error) {
        console.log(error)
      })
} 

//检测文件类型
export function getType(re,owenr,repo,path,branch){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
        params:{
          rel:branch
        }
      })
      instance.get(`/repos/${owenr}/${repo}/contents/${path}`)
      .then(function (response) {  
                 console.log(response.data.type?'文件':'文件夹')
                 re.setState({filetype:response.data.type?'file':'dir'})
      })
      .catch(function (error) {
        console.log(error)
      })
} 