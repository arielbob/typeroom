import React from 'react'

const TypeInput = ({ value, handleChange }) => (
  <input type='text' value={value} onChange={(e) => handleChange(e.target.value)}></input>
)

export default TypeInput
