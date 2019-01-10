import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = ({ error }) => {
  if (error) return <div className='error'>{error}</div>
  return null
}

const mapStateToProps = ({game: { error }}) => ({
  error
})

export default connect(mapStateToProps)(ErrorMessage)
