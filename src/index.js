import React from 'react'
import { render } from 'react-dom'
import SocketContext from './components/SocketContext'
import Root from './components/Root'
import io from 'socket.io-client'

const socket = io()

// TODO: use redux

render(
  <SocketContext.Provider value={socket}>
    <Root />
  </SocketContext.Provider>,
  document.getElementById('root')
)
