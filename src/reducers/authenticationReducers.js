export const loggedIn = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return true
    case 'LOGIN_FAILURE':
    case 'LOGOUT_SUCCESS':
      return false
    default:
      return state
  }
}

export const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload.user
    case 'LOGIN_FAILURE':
    case 'LOGOUT_SUCCCESS':
      return null
    default:
      return state
  }
}
