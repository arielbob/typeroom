import React from 'react'
import { connect } from 'react-redux'
import { openRoom, joinRoom } from '../actions.js'
import Room from '../components/Room'

const mapDispatchToProps = (dispatch, ownProps) => ({
  openRoom: () => {
    dispatch(openRoom(ownProps.match.params.id))
  },
  joinRoom: () => {
    dispatch(joinRoom())
  }
})

const mapStateToProps = ({game: { isJoined, isCounting, isRunning }}) => ({
  isJoined,
  isCounting,
  isRunning
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
