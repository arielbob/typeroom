import React from 'react'

const placeWord = (place) => {
  const places = {
    1: '1st',
    2: '2nd',
    3: '3rd'
  }

  if (places[place]) return places[place]
  return place + 'th'
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
