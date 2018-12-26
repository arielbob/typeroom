import { combineReducers } from 'redux'

// NOTE: we might want to have a roomsById property to prevent race conditions,
// but then that would mean creating a new game whenever a game is finished...
// idk... maybe we can just reset the game?

// state = {
//   currentRoomId: 0,
//   gameText: '',
//   playersById: {
//     0: {
//       username: 'player1',
//       nextWordId: 0,
//       id: 0,
//       place: null
//     },
//     1: {
//       username: 'player2',
//       nextWordId: 2,
//       id: 1,
//       place: null
//     }
//   }
// }

const errorMessage = (state = '', action) => {
  const { type, error } = action

  switch (type) {
    case 'SET_CLIENT_ID':
      return ''
  }

  if (error) return error

  return state
}

const clientId = (state = null, action) => {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return action.payload.clientId
    default:
      return state
  }
}

const currentRoomId = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_ROOM':
      return state ? action.payload.id : null
    default:
      return state
  }
}

const gameText = (state = '', action) => {
  switch (action.type) {
    case 'SET_GAME_TEXT':
      return action.payload.text
    default:
      return state
  }
}

const inputValue = (state = '', action) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return action.payload.inputValue
    default:
      return state
  }
}

const player = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
    case 'SET_NEXT_WORD_ID':
    case 'SET_PLACE':
      return {
        ...state,
        ...action.payload
      }
      break;
    case 'REMOVE_PLAYER':
      return null
    default:
      return state
  }
}

const playersById = (state = {}, action) => {
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

const isJoined = (state = false, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return true
    default:
      return state
  }
}

const rootReducer = combineReducers({
  errorMessage,
  clientId,
  currentRoomId,
  gameText,
  inputValue,
  playersById,
  isJoined
})

export default rootReducer
