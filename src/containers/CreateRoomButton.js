import React from 'react'
import { connect } from 'react-redux'
import { createRoom } from '../actions/createRoomActions'

const CreateRoomButton = ({ isLoggedIn, error, className, createRoom }) => (
  <React.Fragment>
    {error ? <div className='error'>{error}</div> : null}
    <button
      className={'btn btn--orange ' + (className || '')}
      onClick={() => createRoom()}
      >
      { 'Create Room' + (isLoggedIn ? '' : ' as Guest')}
    </button>
  </React.Fragment>
)

const mapStateToProps = ({ authentication, roomCreation }, { className }) => ({
  isLoggedIn: authentication.isLoggedIn,
  error: roomCreation.error,
  className
})

const mapDispatchToProps = (dispatch) => ({
  createRoom: () => dispatch(createRoom())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomButton)
