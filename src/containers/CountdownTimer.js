import React from 'react'
import { connect } from 'react-redux'
import Timer from '../components/Timer'

const mapStateToProps = ({game: { countdownTimer }}, { render }) => ({
  time: countdownTimer,
  render
})

export default connect(mapStateToProps)(Timer)
