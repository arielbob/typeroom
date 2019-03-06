import React from 'react'

const ErrorMessage = ({ error }) => {
  if (error) return <div className='error'>{error}</div>
  return null
}

export default ErrorMessage
