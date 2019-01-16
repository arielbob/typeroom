import React from 'react'

class TypeInput extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled && !this.props.disabled) this.input.current.focus()
  }

  render() {
    return (
      <input
        ref={this.input}
        type='text'
        value={this.props.value}
        onChange={(e) => this.props.handleChange(e.target.value)}
        disabled={this.props.disabled}
        className='game__input'>
      </input>
    )
  }
}

export default TypeInput
