import io from 'socket.io-client'
import {
  setClientId,
  addPlayer,
  removePlayer,
  setAllPlayers,
  setNextWordId,
  setGameText,
  setPlace,
  startCountdown,
  startRace,
  endRace,
  leaveRoom,
  setError,
  openRoomSuccess,
  openRoomFailure
} from './actions/gameActions'

let socket = null

// sending socket events via redux actions
export const socketMiddleware = (store) => (next) => (action) => {
  // NOTE: this stuff might be better in actions...
  switch (action.type) {
    case 'CLOSE_ROOM':
      if (socket) socket.close()
      break;
    case 'OPEN_ROOM':
      const { id } = action.payload

      console.log('connecting to socket')
      socket = io({
        query: { id }
      })
      initSockets(socket, store)
      break;
    case 'INPUT_WORD':
      if (socket) socket.emit('word input', action.payload.word)
      break;
    case 'JOIN_ROOM':
      if (socket) socket.emit('join room')
      break;
  }

  return next(action)
}

// receiving events
const eventHandlers = {
  connect: (dispatch) => {
    console.log('connected to socket')
  },
  connect_error: (dispatch) => {
    dispatch(setError('Could not connect to the room'))
  },
  reconnect_error: (dispatch) => {
    dispatch(setError('Could not reconnect to the room'))
  },
  roomOpened: (dispatch) => {
    dispatch(openRoomSuccess())
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
  startCountdown: (dispatch, state, time) => {
    dispatch(startCountdown(time))
  },
  startRace: (dispatch, state, time) => {
    dispatch(startRace(time))
  },
  endRace: (dispatch, state) => {
    dispatch(endRace())
  },
  removePlayer: (dispatch) => {
    console.log('removing players')
    dispatch(leaveRoom())
  },
  disconnect: (dispatch, state, id) => {
    console.log('disconnected from socket')
    // dispatch(removePlayer(id))
  },
  gameError: (dispatch, state, error) => {
    let message = 'An error occurred...'
    if (error == 'roomNotFound') {
      message = 'The requested room could not be found'
      dispatch(openRoomFailure())
    }
    dispatch(setError(message))
  }
}

// NOTE: the event handlers are only being passed the game state, not the entire redux state
const initSockets = (socket, store) => {
  for (let handler in eventHandlers) {
    socket.on(handler, eventHandlers[handler].bind(null, store.dispatch, store.getState().game))
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
