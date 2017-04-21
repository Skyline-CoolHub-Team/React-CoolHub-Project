import React, { Component } from 'react'
const style ={
  position:'fixed',
  bottom:'56px',
  top:'64px',
  width:'100%',
  overflow:'auto'
}
class fileContent extends Comment {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <h1 style={style}>我是文件浏览界面</h1>
        )
    }
}