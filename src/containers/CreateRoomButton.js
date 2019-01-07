import React from 'react'
import { connect } from 'react-redux'
import { createRoom } from '../actions/createRoomActions'

const CreateRoomButton = ({ loggedIn, error, className, createRoom }) => (
  <React.Fragment>
    {error ? <div className='error'>{error}</div> : null}
    <button
      className={'btn btn--orange ' + (className || '')}
      onClick={() => createRoom()}
      >
      { 'Create Room' + (loggedIn ? '' : ' as Guest')}
    </button>
  </React.Fragment>
)

const mapStateToProps = ({ authentication, roomCreation }, { className }) => ({
  loggedIn: authentication.loggedIn,
  error: roomCreation.error,
  className
})

const mapDispatchToProps = (dispatch) => ({
  createRoom: () => dispatch(createRoom())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomButton)
