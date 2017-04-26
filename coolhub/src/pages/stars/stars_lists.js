import React from 'react'
import {Link} from 'react-router-dom'
// ui components
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import FontIcon from 'material-ui/FontIcon'

const style = {
  height: 'calc(100vh - 72px - 56px)',
  overflowY: 'auto',
  wordWrap: 'break-word',
  wordBreak: 'normal',
}

const RightIcon = <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>

const InitData = ({ item, url }) => (
  <Link to={ `${url}/${item.full_name}` } key={item.id}>
  <ListItem
    primaryText={item.name}
    secondaryText={<span>{item.owner.login}</span>}
    style={{textAlign: 'left'}}
    rightIcon={RightIcon}
  />
  </Link>
)

const StarsLists = ({ items, url }) => {
  const lists = items.map((item) => (
    <InitData item={ item } url={ url } key={ item.id }/>
  ))
  return (
    <List style={style}>{lists}</List>
  )
}

export default StarsLists
