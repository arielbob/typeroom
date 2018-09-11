import React from 'react'
import SocketContext from './SocketContext'
import GameText from './GameText'
import TypeInput from './TypeInput'
import PlayerList from './PlayerList'

class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      playersById: {},
      text: '',
      inputValue: '',
      id: null
    }
  }

  handleChange(inputValue) {
    const spaceEntered = inputValue.charAt(inputValue.length - 1) === ' '

    if (!spaceEntered) {
      this.setState({ inputValue })
    } else if (inputValue.trim().length > 0) {
      this.props.socket.emit('word input', inputValue)
      this.setState({ inputValue: '' })
    }
  }

  componentDidMount() {
    const { socket } = this.props

    // client connect
    socket.on('connect', () => {
      this.setState({ id: socket.id })
    })

    // other player connects
    socket.on('connection', (id) => {
      console.log('user joined', newState)
      // add new player to state
      let newState = Object.assign({}, this.state.playersById)
      newState[id] = {
        nextWordId: 0,
        id
      }
      this.setState({
        playersById: newState
      })
    })

    socket.on('players', (playersById) => {
      console.log(playersById)
      this.setState({
        playersById
      })
    })

    socket.on('progress', (id, nextWordId) => {
      let newState = Object.assign({}, this.state.playersById)
      newState[id].nextWordId = nextWordId
      this.setState({
        playersById: newState
      })
    })

    socket.on('disconnect', (id) => {
      // console.log('someone disconnected')
      let newState = Object.assign({}, this.state.playersById)
      newState[id] = undefined
      console.log('user left', newState)
      this.setState({
        playersById: newState
      })
    })

    socket.on('text', (text) => {
      this.setState({ text })
    })
  }

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
        {/* <GameText text={this.state.text} />
        <TypeInput value={this.state.inputValue} handleChange={(value) => this.handleChange(value)} />
        <PlayerList clientId={this.state.id} playersById={this.state.playersById} textLength={this.state.text.split(' ').length} /> */}
        <button onClick={() => this.createRoom()}>Create Room</button>
      </div>
    )
  }
}

export default Root
