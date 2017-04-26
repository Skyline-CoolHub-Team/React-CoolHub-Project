import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// ui components
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// tools
import { passedDays } from '../../utils/tools'

const style = {
  height: 'calc(100vh - 48px - 56px)',
  overflowY: 'auto',
  wordWrap: 'break-word',
  wordBreak: 'normal',
}

const InitData = ({ item, url }) => (
  <Link to={ `${url}/${item.repo.name}` } key={item.id}>
  <ListItem
    primaryText={passedDays(item.created_at)}
    secondaryText={
      <p>
        <span>{item.actor.login}</span>
        <span style={{ color: '#00AFCC' }}>
          { 
            ' ' + (item.type == 'WatchEvent'
            ? 'star' 
            : item.type.replace(/Event/, '').toLowerCase()) + ' ' 
          }
        </span>
        <span>{ item.repo.name }</span>
      </p>
    }
    leftAvatar={<Avatar src={ item.actor.avatar_url } />}
  />
  </Link>
)

const TimelineLists = ({ items, url }) => {
  const lists = items.map((item) => (
    <InitData item={ item } url={ url } key={ item.id }/>
  ))
  return (
    <List style={style}>{lists}</List>
  )
}

export default TimelineLists
