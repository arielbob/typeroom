// TODO: eventually move all the requests here
import axios from 'axios'

export const success = (user) => {
  localStorage.setItem('user', user.username)

  return {
    type: 'LOGIN_SUCCESS',
    payload: { user }
  }
}

export const failure = () => {
  localStorage.removeItem('user')

  return {
    type: 'LOGIN_FAILURE'
  }
}

export const authenticate = () => (dispatch) => {
  axios.get('/auth')
    .then((res) => {
      dispatch(success(res.data))
    })
    .catch(() => {
      dispatch(failure())
    })
}
