import React from 'react'

class GameText extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    const { socket } = this.props

    socket.on('text', (text) => {
      this.setState({ text })
    })
  }

  render() {
    return (
      <p>{this.state.text ? this.state.text : 'Loading text...'}</p>
    )
  }
}

export default GameText
