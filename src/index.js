import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { socketMiddleware } from './sockets'
import rootReducer from './reducers/'

import normalize from 'normalize.css'
import styles from './styles/style.scss'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    socketMiddleware,
    loggerMiddleware
  )
)

// store.dispatch(openRoom(0))
// store.dispatch(setGameText('Type this text!'))
// store.dispatch(setAllPlayers({
//   0: {
//     username: 'player1',
//     progress: 0,
//     place: null,
//     id: 0
//   }
// }))
// store.dispatch(addPlayer({
//   username: 'player2',
//   progress: 0.5,
//   id: 1
// }))
// store.dispatch(setProgress(0, 0.2))
// store.dispatch(setProgress(1, 1))
// store.dispatch(setPlace(1, 1))

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
