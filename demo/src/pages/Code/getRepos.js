import axios from 'axios'
//获取用户仓库列表
export function getReposList(re){
   let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + '98e5b99d0b6d411c5055760b0a9183368a6ba83c'}
      })
      instance.get('/users/raszxcv/repos')
      .then(function (response) {
        let reposList =[]
        response.data.map(lis => {
            reposList.push(lis.name)
        })
        re.setState({reposList:reposList})
      })
      .catch(function (error) {
        console.log(error)
      })
}
//获取仓库内容里的文件夹或文件列表
export function getReposContentList(re,repo,path){
       let instance = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {'Authorization': 'token ' + '98e5b99d0b6d411c5055760b0a9183368a6ba83c'}
      })
      instance.get(`/repos/raszxcv/${repo}/contents/${path}`)
      .then(function (response) {
        let contentList =[]     
        response.data.map(lis => {
            contentList.push({type:lis.type,name:lis.name})
        })

            re.setState({reposRoot:contentList})
        
     
      })
      .catch(function (error) {
        console.log(error)
      })
}  
    
