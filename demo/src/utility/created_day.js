const createdDay = (date) => {
  let timestamp = new Date(date)
  let leftDay = parseInt((Date.now() - timestamp) / 3600 / 24 / 1000)
  return leftDay === 0 ? 'today' : leftDay + ' day ago'
}

export default createdDay