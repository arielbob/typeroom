import React from 'react'

class TypeInput extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    const spaceEntered = value.charAt(value.length - 1) === ' '

    if (!spaceEntered) {
      this.setState({ value })
    } else if (value.trim().length > 0) {
      this.props.socket.emit('word input', value)
      this.setState({ value: '' })
    }
  }

  render() {
    return (
      <input type='text' value={this.state.value} onChange={(e) => this.handleChange(e.target.value)}></input>
    )
  }
}

export default TypeInput
