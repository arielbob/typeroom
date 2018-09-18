import React from 'react'
import { connect } from 'react-redux'
import { openRoom } from '../actions.js'
import Room from '../components/Room'

const mapDispatchToProps = (dispatch, ownProps) => ({
  openRoom: () => {
    dispatch(openRoom(ownProps.match.params.id))
  }
})

export default connect(null, mapDispatchToProps)(Room)
