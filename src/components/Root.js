import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'
import GameTextContainer from '../containers/GameTextContainer'
import TypeInputContainer from '../containers/TypeInputContainer'
import PlayerListContainer from '../containers/PlayerListContainer'

class Root extends React.Component {
  // componentDidMount() {
  //   const { socket } = this.props
  //
  //   // client connect
  //   socket.on('connect', () => {
  //     this.setState({ id: socket.id })
  //   })
  //
  //   // other player connects
  //   socket.on('connection', (id) => {
  //     console.log('user joined', newState)
  //     // add new player to state
  //     let newState = Object.assign({}, this.state.playersById)
  //     newState[id] = {
  //       nextWordId: 0,
  //       id
  //     }
  //     this.setState({
  //       playersById: newState
  //     })
  //   })
  //
  //   socket.on('players', (playersById) => {
  //     console.log(playersById)
  //     this.setState({
  //       playersById
  //     })
  //   })
  //
  //   socket.on('progress', (id, nextWordId) => {
  //     let newState = Object.assign({}, this.state.playersById)
  //     newState[id].nextWordId = nextWordId
  //     this.setState({
  //       playersById: newState
  //     })
  //   })
  //
  //   socket.on('disconnect', (id) => {
  //     // console.log('someone disconnected')
  //     let newState = Object.assign({}, this.state.playersById)
  //     newState[id] = undefined
  //     console.log('user left', newState)
  //     this.setState({
  //       playersById: newState
  //     })
  //   })
  //
  //   socket.on('text', (text) => {
  //     this.setState({ text })
  //   })
  // }

  createRoom() {
    fetch('/create', {
      method: 'post'
    }).then(res => {
      if (res.redirected) window.location.href = res.url
    })
  }

  render() {
    return (
      <div>
        <ErrorMessage />
        <GameTextContainer />
        <TypeInputContainer />
        <PlayerListContainer />
        {/* <button onClick={() => this.createRoom()}>Create Room</button> */}
      </div>
    )
  }
}

export default Root
