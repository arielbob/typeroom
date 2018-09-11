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
//       progress: 0,
//       id: 0,
//       place: null
//     },
//     1: {
//       username: 'player2',
//       progress: 0.5,
//       id: 1,
//       place: null
//     }
//   }
// }

const currentRoomId = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_ROOM':
      return action.payload.id
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

const player = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
    case 'SET_PROGRESS':
    case 'SET_PLACE':
      return {
        ...state,
        ...action.payload
      }
      break;
    default:
      return state
  }
}

const playersById = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_PLAYERS':
      return action.payload.playersById
    case 'ADD_PLAYER':
    case 'SET_PROGRESS':
    case 'SET_PLACE':
      return {
        ...state,
        [action.payload.id]: player(state[action.payload.id], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentRoomId,
  gameText,
  playersById
})

export default rootReducer