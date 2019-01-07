import axios from 'axios'

export const createRoom = () => (dispatch) => {
  dispatch({ type: 'CREATE_ROOM' })

  axios.post('/create')
    .then(res => {
      dispatch(success(res.data.roomId))
    })
    .catch(err => {
      if (err.response) {
        dispatch(failure(err.response.data.message))
      }
    })
}

export const success = (roomId) => {
  window.location = '/room' + roomId

  return {
    type: 'CREATE_ROOM_SUCCESS'
  }
}

export const failure = (error) => {
  return {
    type: 'CREATE_ROOM_FAILURE',
    error
  }
}
