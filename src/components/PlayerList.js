import React from 'react'

const PlayerList = ({ clientId, playersById }) => (
  <ul>
    {
      Object.keys(playersById).filter(id => playersById[id]).map(id => (
        <li key={id}>
          <p><strong>{id == clientId ? 'You' : playersById[id].username}</strong>: {playersById[id].progress}</p>
        </li>
      ))
    }
  </ul>
)

export default PlayerList
