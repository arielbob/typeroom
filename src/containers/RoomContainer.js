import React from 'react'
import { connect } from 'react-redux'
import { openRoom, closeRoom } from '../actions/gameActions'
import Room from '../components/Room'

const mapDispatchToProps = (dispatch, ownProps) => ({
  openRoom: () => {
    // we always have to call closeRoom() before openRoom() or else we'll get updates
    // from past rooms even when we're in a new one
    dispatch(closeRoom())
    dispatch(openRoom(ownProps.match.params.id))
  },
  closeRoom: () => {
    dispatch(closeRoom())
  }
})

const mapStateToProps = ({game: { isRoomOpened, error }}, ownProps) => ({
  roomId: ownProps.match.params.id,
  isRoomOpened,
  error
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
