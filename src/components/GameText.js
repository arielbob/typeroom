import React from 'react'

const GameText = ({ text, isVisible }) => (
  isVisible ?
  <p>{text ? text : 'Loading text...'}</p> :
  null
)

export default GameText
