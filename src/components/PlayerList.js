import React from 'react'

const PlayerList = ({ playersById, textLength }) => (
  <ul>
    {
      Object.keys(playersById).filter(id => playersById[id]).map(id => (
        <li key={id}>
          <p><strong>{id}</strong>: {playersById[id].nextWordId / textLength}</p>
        </li>
      ))
    }
  </ul>
)

export default PlayerList
