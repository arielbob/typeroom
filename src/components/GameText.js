import React from 'react'

const GameText = ({ isVisible, text, nextWordId, inputValue }) => {
  if (!isVisible) return null

  if (text) {
    if (nextWordId !== null) {
      return highlightedText(text, nextWordId, inputValue)
    }

    return <p>{text}</p>
  }

  return <p>Loading text...</p>
}

// return a component where the typed text is highlighted
const highlightedText = (text, nextWordId, inputValue) => {
  const wordArray = text.split(' ')
  const currentWord = wordArray[nextWordId]

  // if the player reached the end, currentWord will be null
  if (!currentWord) {
    return <p><span style={{backgroundColor: 'yellow'}}>{text}</span></p>
  }

  // get the typed text by slicing from 0 to the nextWordId
  let typed = wordArray.slice(0, nextWordId).join(' ') + ((nextWordId > 0) ? ' ' : '')
  // add onto the typed text the portion of the current word that has been typed
  typed += currentWord.slice(0, getNextCharId(currentWord, inputValue))

  // get the rest of the text, which is the text that is untyped
  const untyped = text.slice(typed.length)

  return <p>
    <span style={{backgroundColor: 'yellow'}}>{typed}</span>
    {untyped}
  </p>
}

// get the index of the first untyped character in the current word
const getNextCharId = (currentWord, inputValue) => {
  let i = 0;

  while (i < currentWord.length && i < inputValue.length) {
    if (currentWord.charAt(i) == inputValue.charAt(i)) {
      i++
    } else {
      break
    }
  }

  return i
}

export default GameText
