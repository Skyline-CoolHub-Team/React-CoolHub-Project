import React, { Component } from 'react'
import CoolHub from './pages/CoolHub/Coolhub'
/**
 * TODO: delete the css then select the CDN for material-icons
 */
import 'material-design-icons/iconfont/material-icons.css'
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <CoolHub />
      </div>
    )
  }
}

