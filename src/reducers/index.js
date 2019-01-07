import { combineReducers } from 'redux'
import * as gameReducers from './gameReducers'
import * as authenticationReducers from './authenticationReducers'
import * as roomCreationReducers from './roomCreationReducers'

const rootReducer = combineReducers({
  game: combineReducers(gameReducers),
  authentication: combineReducers(authenticationReducers),
  roomCreation: combineReducers(roomCreationReducers)
})

export default rootReducer
