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

export const joinRoom = () => ({
  type: 'JOIN_ROOM'
})

export const leaveRoom = () => ({
  type: 'LEAVE_ROOM'
})

export const setInputValue = (inputValue) => (dispatch, getState) => {
  const spaceEntered = inputValue.charAt(inputValue.length - 1) === ' '

  if (spaceEntered) {
    const trimmedVal = inputValue.trim()
    if (trimmedVal.length > 0) {
      // empty the text box when they hit space
      dispatch({
        type: 'SET_INPUT_VALUE',
        payload: { inputValue: '' }
      })

      // check if the word is correct so that we don't have to wait for the server
      // to send back a nextWordId or not
      const { gameText, clientId, playersById } = getState()
      const player = playersById[clientId]

      if (player) {
        const { nextWordId } = player
        if (trimmedVal == gameText.split(' ')[nextWordId]) {
          dispatch(setNextWordId(clientId, nextWordId + 1))
        }
      }

      // send the input to the server
      dispatch({
        type: 'INPUT_WORD',
        payload: {
          word: trimmedVal
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

export const setAllPlayers = (playersById) => (dispatch, getState) => {
  if (playersById.hasOwnProperty(getState().clientId)) {
    dispatch({ type: 'JOIN_SUCCESS'})
  }

  dispatch({
    type: 'SET_ALL_PLAYERS',
    payload: {
      playersById
    }
  })
}

// we get the id from the server and send it in the object here
// players should be persistent
// if a player leaves then joins, then they should keep their data
// i don't think we'll ever get a player object with progress or place
// we should make it so when somebody leaves, we don't delete them from the players
// because they could come back
// then we check in the connection event if they already exist; if they don't, then we
// dispatch addPlayer()
export const addPlayer = (player) => (dispatch, getState) => {
  if (player.id == getState().clientId) {
    dispatch({ type: 'JOIN_SUCCESS' })
  }

  return dispatch({
    type: 'ADD_PLAYER',
    payload: {
      username: '',
      nextWordId: 0,
      place: null,
      ...player
    }
  })
}

export const setNextWordId = (id, nextWordId) => (dispatch, getState) => {
  const { clientId, playersById } = getState()
  const player = playersById[clientId]

  // we check if the received nextWordId is greater since we're tracking the id on the client
  // as well. we don't want the text highlighting to jerk back if there's some delay in receiving
  // a message from the server
  if ((id != clientId) || (player && nextWordId > player.nextWordId)) {
    dispatch({
      type: 'SET_NEXT_WORD_ID',
      payload: {
        id,
        nextWordId
      }
    })
  }
}

export const setPlace = (id, place) => ({
  type: 'SET_PLACE',
  payload: {
    id,
    place
  }
})

export const startCountdown = (time) => ({
  type: 'START_COUNTDOWN',
  payload: {
    time
  }
})

export const startRace = (time) => ({
  type: 'START_RACE',
  payload: {
    time
  }
})

export const endRace = () => ({
  type: 'END_RACE'
})
