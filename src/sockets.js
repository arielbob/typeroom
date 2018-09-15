import io from 'socket.io-client'
import {
  setClientId,
  addPlayer,
  removePlayer,
  setAllPlayers,
  setNextWordId,
  setGameText,
  setPlace
} from './actions'

let socket = null

// sending socket events via redux actions
export const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === 'OPEN_ROOM') {
    const { id } = action.payload

    console.log('connecting to socket')
    socket = io({
      query: { id }
    })
    initSockets(socket, store)
  }

  if (socket) {
    if (action.type === 'INPUT_WORD') {
      socket.emit('word input', action.payload.word)
    }
  }

  return next(action)
}

// receiving events
const eventHandlers = {
  connect: (dispatch) => {
    console.log('connected to socket')
    dispatch(setClientId(socket.id))
  },
  connection: (dispatch, state, player) => {
    console.log('user joined')

    // this check could either be here or in the action creator...
    if (!state.playersById[player.id]) {
      dispatch(addPlayer(player))
    }
  },
  players: (dispatch, state, playersById) => {
    dispatch(setAllPlayers(playersById))
  },
  // NOTE: could have placing here or in the server and have the server emit a setPlace event
  // or mayve just have the server send it so that it's for sure in sync
  progress: (dispatch, state, id, nextWordId) => {
    dispatch(setNextWordId(id, nextWordId))
  },
  place: (dispatch, state, id, place) => {
    dispatch(setPlace(id, place))
  },
  text: (dispatch, state, text) => {
    dispatch(setGameText(text))
  },
  disconnect: (dispatch, state, id) => {
    console.log('disconnected from socket')
    dispatch(removePlayer(id))
  },
  serverError: (dispatch, state, error) => {
    console.log(error)
    dispatch({ type: 'ERROR', error })
  }
}

const initSockets = (socket, store) => {
  for (let handler in eventHandlers) {
    socket.on(handler, eventHandlers[handler].bind(null, store.dispatch, store.getState()))
  }

  // socket.on('disconnect', (id) => {
  //   // console.log('someone disconnected')
  //   let newState = Object.assign({}, this.state.playersById)
  //   newState[id] = undefined
  //   console.log('user left', newState)
  //   this.setState({
  //     playersById: newState
  //   })
  // })
}
