import React from 'react'

const placeWord = (place) => {
  const places = {
    1: 'st',
    2: 'nd',
    3: 'rd'
  }

  if (place >= 11 && place <= 13) return place + 'th'

  return place + (places[place % 10] || 'th')
}

const PlayerList = ({ clientId, playersById, textLength }) => (
  <ul>
    {
      Object.keys(playersById).filter(id => playersById[id]).map(id => (
        <li key={id}>
          <p>
            <strong>
              {playersById[id].place ? '(' + placeWord(playersById[id].place) + ') ' : null}
              {id == clientId ? 'You' : playersById[id].username}
            </strong>: {playersById[id].nextWordId / textLength}
          </p>
        </li>
      ))
    }
  </ul>
)

export default PlayerList
