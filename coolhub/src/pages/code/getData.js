import axios from 'axios'
import {token,b64_to_utf8} from '../../utils/tools'
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
            re.setState({reposRoot:contentList})
      })
      .catch(function (error) {
        console.log(error)
      })
}  
//获取文件内容
export function getfileContent(re,owenr,repo,path,branch){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + token},
        params:{
          rel:branch
        }
      })
      instance.get(`/repos/${owenr}/${repo}/contents/${path}`)
      .then(function (response) {  
          console.log(response)
                 re.setState({fileContent:b64_to_utf8(response.data.content)}) 
      })
      .catch(function (error) {
        console.log(error)
      })
} 