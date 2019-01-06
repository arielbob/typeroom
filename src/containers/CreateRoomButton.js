import React from 'react'
import { connect } from 'react-redux'

const CreateRoomButton = ({ loggedIn, className }) => (
  <button className={'btn btn--orange ' + (className || '')}>{ 'Create Room' + (loggedIn ? '' : ' as Guest')}</button>
)

const mapStateToProps = ({ authentication: state }, { className }) => ({
  loggedIn: state.loggedIn,
  className
})

export default connect(mapStateToProps)(CreateRoomButton)
