import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = ({ error }) => {
  if (error) return <p>{error}</p>
  return null
}

const mapStateToProps = ({game: { error }}) => ({
  error
})

export default connect(mapStateToProps)(ErrorMessage)
