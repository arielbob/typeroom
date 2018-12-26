import io from 'socket.io-client'

// TODO: add socket integration
// TODO: add text highlighting for correct/incorrect typing
// TODO: add WPM
// this will not have access to the socket; they will only be able to emit actions
// that go through the socket middleware
// we can use this socket middleware with thunk for conditional dispatches

// socket emitting actions
export const openRoom = (id) => {
  return {
    type: 'OPEN_ROOM',
    payload: { id }
  }
}

export const joinRoom = () => {
  return {
    type: 'JOIN_ROOM'
  }
}

export const setInputValue = (inputValue) => (dispatch) => {
  const spaceEntered = inputValue.charAt(inputValue.length - 1) === ' '

  if (spaceEntered) {
    if (inputValue.trim().length > 0) {
      // this.props.socket.emit('word input', inputValue)
      dispatch({
        type: 'SET_INPUT_VALUE',
        payload: { inputValue: '' }
      })

      dispatch({
        type: 'INPUT_WORD',
        payload: {
          word: inputValue.trim()
        }
      })
    }
  } else {
    dispatch({
      type: 'SET_INPUT_VALUE',
      payload: { inputValue }
    })
  }
}

// socket receiving actions and non-socket actions
export const setClientId = (clientId) => ({
  type: 'SET_CLIENT_ID',
  payload: {
    clientId
  }
})

export const setGameText = (text) => ({
  type: 'SET_GAME_TEXT',
  payload: {
    text
  }
})

export const setAllPlayers = (playersById) => ({
  type: 'SET_ALL_PLAYERS',
  payload: {
    playersById
  }
})

// we get the id from the server and send it in the object here
// players should be persistent
// if a player leaves then joins, then they should keep their data
// i don't think we'll ever get a player object with progress or place
// we should make it so when somebody leaves, we don't delete them from the players
// because they could come back
// then we check in the connection event if they already exist; if they don't, then we
// dispatch addPlayer()
export const addPlayer = (player) => ({
  type: 'ADD_PLAYER',
  payload: {
    username: '',
    nextWordId: 0,
    place: null,
    ...player
  }
})

// NOTE: i think this will be unnecessary in the future when we have constant IDs instead of IDs given to us
// by the socket
export const removePlayer = (id) => ({
  type: 'REMOVE_PLAYER',
  payload: {
    id
  }
})

export const setNextWordId = (id, nextWordId) => ({
  type: 'SET_NEXT_WORD_ID',
  payload: {
    id,
    nextWordId
  }
})

export const setPlace = (id, place) => ({
  type: 'SET_PLACE',
  payload: {
    id,
    place
  }
})
