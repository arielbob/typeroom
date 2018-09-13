import React from 'react'
import { render } from 'react-dom'
import SocketContext from './components/SocketContext'
import Root from './components/Root'
import { Provider } from 'react-redux'
// import io from 'socket.io-client'
// const socket = io()

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import {
  openRoom,
  setGameText,
  setAllPlayers,
  addPlayer,
  setProgress,
  setPlace
} from './actions'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
)

store.dispatch(openRoom(0))
store.dispatch(setGameText('Type this text!'))
store.dispatch(setAllPlayers({
  0: {
    username: 'player1',
    progress: 0,
    place: null,
    id: 0
  }
}))
store.dispatch(addPlayer({
  username: 'player2',
  progress: 0.5,
  id: 1
}))
store.dispatch(setProgress(0, 0.2))
store.dispatch(setProgress(1, 1))
store.dispatch(setPlace(1, 1))

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
