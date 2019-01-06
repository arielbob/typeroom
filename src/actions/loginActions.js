// TODO: eventually move all the requests here
import axios from 'axios'

export const success = (user) => {
  localStorage.setItem('user', user.username)

  return {
    type: 'LOGIN_SUCCESS',
    payload: { user }
  }
}
