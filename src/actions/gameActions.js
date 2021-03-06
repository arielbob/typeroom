// socket emitting actions
export const openRoom = (id) => {
  return {
    type: 'OPEN_ROOM',
    payload: { id }
  }
}

export const closeRoom = () => {
  return {
    type: 'CLOSE_ROOM'
  }
}

export const joinRoom = () => ({
  type: 'JOIN_ROOM'
})

export const leaveRoom = () => ({
  type: 'LEAVE_ROOM'
})

export const setError = (error) => ({
  type: 'GAME_ERROR',
  error
})

export const openRoomSuccess = () => {
  return {
    type: 'OPEN_ROOM_SUCCESS'
  }
}

export const openRoomFailure = () => {
  return {
    type: 'OPEN_ROOM_FAILURE'
  }
}

export const setInputValue = (inputValue) => (dispatch, getState) => {
  const spaceEntered = inputValue.charAt(inputValue.length - 1) === ' '
  const trimmedVal = inputValue.trim()

  const { gameText, clientId, playersById } = getState().game
  const player = playersById[clientId]

  const nextWord = gameText.split(' ')[player.nextWordId]

  // TODO: these ifs might be able to be cleaned up
  if (spaceEntered) {
    if (trimmedVal.length > 0) {
      // check if the word is correct so that we don't have to wait for the server
      // to send back a nextWordId or not
      if (player) {
        if (trimmedVal == nextWord) {
          // empty the text box
          dispatch({
            type: 'SET_INPUT_VALUE',
            payload: { inputValue: '' }
          })

          dispatch(setNextWordId(clientId, player.nextWordId + 1))

          // send the input to the server
          dispatch({
            type: 'INPUT_WORD',
            payload: {
              word: trimmedVal
            }
          })
        } else {
          dispatch({
            type: 'SET_INPUT_VALUE',
            payload: { inputValue }
          })

          dispatch({
            type: 'SET_INPUT_MISTAKE',
            payload: { hasMistake: true }
          })
        }
      }
    }
  } else {
    const hasMistake = (inputValue.length > nextWord.length) || (inputValue != nextWord.slice(0, inputValue.length))

    if (getState().game.hasMistake != hasMistake) {
      dispatch({
        type: 'SET_INPUT_MISTAKE',
        payload: { hasMistake }
      })
    }

    dispatch({
      type: 'SET_INPUT_VALUE',
      payload: { inputValue }
    })

    if ((player.nextWordId == gameText.split(' ').length - 1) && (inputValue == nextWord)) {
      dispatch(setNextWordId(clientId, player.nextWordId + 1))

      dispatch({
        type: 'INPUT_WORD',
        payload: {
          word: inputValue
        }
      })

      dispatch({
        type: 'SET_INPUT_VALUE',
        payload: { inputValue: '' }
      })
    }
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

export const setAllPlayers = (updatedPlayersById) => (dispatch, getState) => {
  const { clientId, isJoined, playersById } = getState()
  // if (!isJoined && playersById.hasOwnProperty(clientId)) {
  //   dispatch({ type: 'JOIN_SUCCESS'})
  // }

  if (isJoined) {
    const player = playersById[clientId]
    const updatedPlayer = updatedPlayersById[clientId]

    // we check if the received nextWordId is greater since we're tracking the id on the client
    // as well. we don't want the text highlighting to jerk back if there's some delay in receiving
    // a message from the server
    if (updatedPlayer.nextWordId < player.nextWordId) {
      updatedPlayer.nextWordId = player.nextWordId
    }
  }

  dispatch({
    type: 'SET_ALL_PLAYERS',
    payload: {
      playersById: updatedPlayersById
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
  if (player.id == getState().game.clientId) {
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
  const { clientId, playersById } = getState().game
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
