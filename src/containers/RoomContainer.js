import React from 'react'
import { connect } from 'react-redux'
import { openRoom, closeRoom, joinRoom } from '../actions/gameActions'
import Room from '../components/Room'

const mapDispatchToProps = (dispatch, ownProps) => ({
  openRoom: () => {
    // we always have to call closeRoom() before openRoom() or else we'll get updates
    // from past rooms even when we're in a new one
    dispatch(closeRoom())
    dispatch(openRoom(ownProps.match.params.id))
  },
  joinRoom: () => {
    dispatch(joinRoom())
  }
})

const mapStateToProps = ({game: { isJoined, isCounting, isRunning }}, ownProps) => ({
  roomId: ownProps.match.params.id,
  isJoined,
  isCounting,
  isRunning
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
