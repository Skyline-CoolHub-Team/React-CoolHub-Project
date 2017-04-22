// get the access_token of github oAuth
export const token = localStorage.getItem('token')
// get the uid of the firebase
export const uid = localStorage.getItem('uid')
// get the collectionLists
export const collectionLists = JSON.parse(localStorage.getItem('collectionLists'))
// transform base64 to utf9
export const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)))
// compute how many days have passed
export const passedDays = (date) => {
  let timestamp = new Date(date)
  let pastDays = parseInt((Date.now() - timestamp) / 3600 / 24 / 1000)
  return pastDays === 0 ? 'Today' : pastDays + ' day ago'
}