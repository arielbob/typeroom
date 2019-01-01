import io from 'socket.io-client'
import {
  setClientId,
  addPlayer,
  removePlayer,
  setAllPlayers,
  setNextWordId,
  setGameText,
  setPlace,
  startRaceTimer,
  leaveRoom
} from './actions'

let socket = null

// sending socket events via redux actions
export const socketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'OPEN_ROOM':
      const { id } = action.payload

      console.log('connecting to socket')
      socket = io({
        query: { id }
      })
      initSockets(socket, store)
      break;
  }

  if (socket) {
    switch (action.type) {
      case 'INPUT_WORD':
        socket.emit('word input', action.payload.word)
        break;
      case 'JOIN_ROOM':
        socket.emit('join room')
        break;
    }
  }

  return next(action)
}

// receiving events
const eventHandlers = {
  connect: (dispatch) => {
    console.log('connected to socket')
    // dispatch(setClientId(socket.id))
  },
  clientInfo: (dispatch, state, id) => {
    console.log(id)
    dispatch(setClientId(id))
  },
  join: (dispatch, state, player) => {
    console.log('user joined')

    // this check could either be here or in the action creator...
    if (!state.playersById[player.id]) {
      dispatch(addPlayer(player))
    }
  },
  players: (dispatch, state, playersById) => {
    // this should also probably take the playerIds array
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
  timerStart: (dispatch, state, time) => {
    dispatch(startRaceTimer(time))
  },
  removePlayer: (dispatch) => {
    console.log('removing players')
    dispatch(leaveRoom())
  },
  disconnect: (dispatch, state, id) => {
    console.log('disconnected from socket')
    // dispatch(removePlayer(id))
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
