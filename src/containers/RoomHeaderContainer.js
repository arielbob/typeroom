import React from 'react'
import { connect } from 'react-redux'
import { joinRoom } from '../actions/gameActions'
import RoomHeader from '../components/RoomHeader'

const mapDispatchToProps = (dispatch) => ({
  joinRoom: () => {
    dispatch(joinRoom())
  }
})

const mapStateToProps = ({game: { isRoomOpened, isJoined, isCounting, isRunning, error }}) => ({
  isRoomOpened,
  isJoined,
  isCounting,
  isRunning,
  error
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeader)
