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

import { authenticate } from './actions/loginActions'

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

// check if a user key is set in the localStorage (we set that key when we log in)
// if it is, we authenticate using cookies to see if the user is actually authenticated
// we don't use the localStorage value in actual authentication; we only use it to see
// if we should check and update redux state
if (localStorage.getItem('user')) {
  store.dispatch(authenticate())
}

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
