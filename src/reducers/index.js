import { combineReducers } from 'redux'
import * as gameReducers from './gameReducers'

const rootReducer = combineReducers({
  game: combineReducers(gameReducers)
})

export default rootReducer
