import React from 'react'

const TypeInput = ({ value, handleChange, disabled }) => (
  <input type='text' value={value} onChange={(e) => handleChange(e.target.value)} disabled={disabled}></input>
)

export default TypeInput
