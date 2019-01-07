// TODO: i should change this if we're going to have multiple places where an error can show up
export const errorMessage = (state = '', action) => {
  const { type, error } = action

  switch (type) {
    case 'SET_CLIENT_ID':
      return ''
  }

  if (error) return error

  return state
}

export const clientId = (state = null, action) => {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return action.payload.clientId
    default:
      return state
  }
}

export const currentRoomId = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_ROOM':
      return state ? action.payload.id : null
    default:
      return state
  }
}

export const gameText = (state = '', action) => {
  switch (action.type) {
    case 'SET_GAME_TEXT':
      return action.payload.text
    default:
      return state
  }
}

export const inputValue = (state = '', action) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return action.payload.inputValue
    default:
      return state
  }
}

export const player = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
    case 'SET_NEXT_WORD_ID':
    case 'SET_PLACE':
      return {
        ...state,
        ...action.payload
      }
    case 'REMOVE_PLAYER':
      return null
    default:
      return state
  }
}

export const playersById = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_PLAYERS':
      return action.payload.playersById
    case 'ADD_PLAYER':
    case 'REMOVE_PLAYER':
    case 'SET_NEXT_WORD_ID':
    case 'SET_PLACE':
      return {
        ...state,
        [action.payload.id]: player(state[action.payload.id], action)
      }
    default:
      return state
  }
}

export const isJoined = (state = false, action) => {
  switch (action.type) {
    case 'JOIN_SUCCESS':
      return true
    case 'LEAVE_ROOM':
      return false
    default:
      return state
  }
}

export const countdownTimer = (state = 0, action) => {
  switch (action.type) {
    case 'START_COUNTDOWN':
      return action.payload.time
    default:
      return state
  }
}

export const raceTimer = (state = 0, action) => {
  switch (action.type) {
    case 'START_RACE':
      return action.payload.time
    default:
      return state
  }
}

export const isCounting = (state = false, action) => {
  switch (action.type) {
    case 'START_COUNTDOWN':
      return true
    case 'START_RACE':
    case 'END_RACE':
      return false
    default:
      return state
  }
}

export const isRunning = (state = false, action) => {
  switch (action.type) {
    case 'START_RACE':
      return true
    case 'START_COUNTDOWN':
    case 'END_RACE':
      return false
    default:
      return state
  }
}
