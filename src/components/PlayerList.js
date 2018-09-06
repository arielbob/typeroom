import React from 'react'

class PlayerList extends React.Component {
  constructor() {
    super()
    this.state = {
      playersById: {}
    }
  }

  componentDidMount() {
    const { socket } = this.props

    socket.on('connection', (id) => {
      let newState = Object.assign({}, this.state.playersById)
      newState[id] = {
        words: '',
        id
      }
      console.log('user joined', newState)
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

    socket.on('word input', (id, word) => {
      const { words } = this.state.playersById[id]
      let newState = Object.assign({}, this.state.playersById)
      newState[id] = Object.assign({}, newState[id], {
        words: words ? words + word : word
      })
      console.log('someone typed', newState)
      this.setState({ playersById: newState })
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
  }

  render() {
    return (
      <ul>
        {
          Object.keys(this.state.playersById).filter(id => this.state.playersById[id]).map((id) => (
            <li key={id}>
              <p><strong>{id}</strong>: {this.state.playersById[id].words}</p>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default PlayerList
