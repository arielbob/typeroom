import React from 'react'
import { connect } from 'react-redux'

const CreateRoomButton = ({ loggedIn, error, className }) => (
  <React.Fragment>
    {error ? <div className='error'>{error}</div> : null}
    <button className={'btn btn--orange ' + (className || '')}>{ 'Create Room' + (loggedIn ? '' : ' as Guest')}</button>
  </React.Fragment>
)

const mapStateToProps = ({ authentication, roomCreation }, { className }) => ({
  loggedIn: authentication.loggedIn,
  error: roomCreation.error,
  className
})

export default connect(mapStateToProps)(CreateRoomButton)
