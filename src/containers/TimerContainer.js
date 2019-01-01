import React from 'react'
import { connect } from 'react-redux'

class Timer extends React.Component {
  constructor(props) {
    super(props)

    let intervalId = null
    if (this.props.time > 0) {
      intervalId = setInterval(() => {
        this.tick()
      }, 1000)
    }

    this.state = {
      time: this.props.time,
      intervalId
    }
  }

  componentDidUpdate() {
    if (this.state.time < 0) {
      this.setState({ time: 0 })
      clearInterval(this.state.intervalId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  tick() {
    this.setState({
      time: this.state.time - 1
    })
  }

  render() {
    return (
      <h3>{this.state.time}</h3>
    )
  }
}

const mapStateToProps = ({ raceTimer }) => ({
  time: raceTimer
})

export default connect(mapStateToProps)(Timer)
