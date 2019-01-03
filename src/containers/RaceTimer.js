import React from 'react'
import { connect } from 'react-redux'
import Timer from '../components/Timer'

const mapStateToProps = ({ raceTimer }, { render }) => ({
  time: raceTimer,
  render
})

export default connect(mapStateToProps)(Timer)
