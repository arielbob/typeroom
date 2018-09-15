import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage) return <p>{errorMessage}</p>
  return null
}

const mapStateToProps = ({ errorMessage }) => ({
  errorMessage
})

export default connect(mapStateToProps)(ErrorMessage)
