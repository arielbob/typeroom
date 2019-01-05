import { combineReducers } from 'redux'
import * as gameReducers from './gameReducers'
import * as authenticationReducers from './authenticationReducers'

const rootReducer = combineReducers({
  game: combineReducers(gameReducers),
  authentication: combineReducers(authenticationReducers)
})

export default rootReducer
