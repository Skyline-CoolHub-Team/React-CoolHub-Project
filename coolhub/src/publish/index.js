// pubsub
import PubSub from 'pubsub-js'

export const TOKEN = (value) => {
  PubSub.publish('token', value)
}

export const UID = (value) => {
  PubSub.publish('uid', value)
}
