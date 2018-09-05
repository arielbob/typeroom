import React from 'react'

class PlayerList extends React.Component {
  constructor() {
    super()
    this.state = {
      wordsById: {},
      playerIds: []
    }
  }

  componentDidMount() {
    const { socket } = this.props

    socket.on('connection', (id) => {
      let newState = Object.assign({}, this.state.wordsById)
      newState[id] = ''
      this.setState({
        wordsById: newState,
        playerIds: this.state.playerIds.concat(id)
      })
    })

    socket.on('player list', (players) => {
      this.setState({
        playerIds: players
      })
    })

    socket.on('word input', (id, word) => {
      const words = this.state.wordsById[id]
      let newState = Object.assign({}, this.state.wordsById)
      newState[id] = words ? words + word : word
      this.setState({ wordsById: newState })
    })

    socket.on('disconnect', (id) => {
      // console.log('someone disconnected')
      let newState = Object.assign({}, this.state.wordsById)
      newState[id] = undefined
      let playerIds = this.state.playerIds.filter(playerId => playerId != id)
      this.setState({
        wordsById: newState,
        playerIds: playerIds
      })
    })
  }

  render() {
    return (
      <ul>
        {
          this.state.playerIds.map((id) => (
            <li key={id}>
              <p><strong>{id}</strong>: {this.state.wordsById[id]}</p>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default PlayerList
