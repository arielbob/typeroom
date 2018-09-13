import io from 'socket.io-client'

let socket = null

// TODO: add socket integration
// TODO: add text highlighting for correct/incorrect typing
// TODO: add WPM

export const setClientId = (clientId) => ({
  type: 'SET_CLIENT_ID',
  payload: {
    clientId
  }
})

export const openRoom = (id) => {
  socket = io('/' + id)

  return {
    type: 'OPEN_ROOM',
    payload: { id }
  }
}

export const setGameText = (text) => ({
  type: 'SET_GAME_TEXT',
  payload: {
    text
  }
})

export const setInputValue = (inputValue) => (dispatch) => {
  const spaceEntered = inputValue.charAt(inputValue.length - 1) === ' '

  if (spaceEntered) {
    if (inputValue.trim().length > 0) {
      // this.props.socket.emit('word input', inputValue)
      dispatch({
        type: 'SET_INPUT_VALUE',
        payload: { inputValue: '' }
      })
    }
  } else {
    dispatch({
      type: 'SET_INPUT_VALUE',
      payload: { inputValue }
    })
  }
}

export const setAllPlayers = (playersById) => ({
  type: 'SET_ALL_PLAYERS',
  payload: {
    playersById
  }
})

// we get the id from the server and send it in the object here
export const addPlayer = (player) => ({
  type: 'ADD_PLAYER',
  payload: {
    username: '',
    progress: 0,
    place: null,
    ...player
  }
})

export const setProgress = (id, progress) => ({
  type: 'SET_PROGRESS',
  payload: {
    id,
    progress
  }
})

export const setPlace = (id, place) => ({
  type: 'SET_PLACE',
  payload: {
    id,
    place
  }
})
