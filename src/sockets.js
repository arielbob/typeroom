import io from 'socket.io-client'
import { setClientId, addPlayer } from './actions'

let socket = null

export const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === 'OPEN_ROOM') {
    const { id } = action.payload
    console.log('connecting to socket')
    socket = io('/' + (id ? id : ''))
    initSockets(socket, store)
  }

  // if (socket) {
  // }

  return next(action)
}

const eventHandlers = {
  connect: (dispatch) => {
    console.log('connected to socket')
    dispatch(setClientId(socket.id))
  },
  // TODO: test this and also rewrite the server emit to send a player object
  connection: (dispatch, state, player) => {
    console.log('user joined')

    // this check could either be here or in the action creator...
    if (!state.playersById[player.id]) {
      dispatch(addPlayer(player))
    }
  }
}

const initSockets = (socket, store) => {
  for (let handler in eventHandlers) {
    socket.on(handler, eventHandlers[handler].bind(null, store.dispatch, store.getState()))
  }

  // // client connect
  // socket.on('connect', () => {
  //   this.setState({ id: socket.id })
  // })
  //
  // // other player connects
  // socket.on('connection', (id) => {
  //   console.log('user joined', newState)
  //   // add new player to state
  //   let newState = Object.assign({}, this.state.playersById)
  //   newState[id] = {
  //     nextWordId: 0,
  //     id
  //   }
  //   this.setState({
  //     playersById: newState
  //   })
  // })
  //
  // socket.on('players', (playersById) => {
  //   console.log(playersById)
  //   this.setState({
  //     playersById
  //   })
  // })
  //
  // socket.on('progress', (id, nextWordId) => {
  //   let newState = Object.assign({}, this.state.playersById)
  //   newState[id].nextWordId = nextWordId
  //   this.setState({
  //     playersById: newState
  //   })
  // })
  //
  // socket.on('disconnect', (id) => {
  //   // console.log('someone disconnected')
  //   let newState = Object.assign({}, this.state.playersById)
  //   newState[id] = undefined
  //   console.log('user left', newState)
  //   this.setState({
  //     playersById: newState
  //   })
  // })
  //
  // socket.on('text', (text) => {
  //   this.setState({ text })
  // })
}
