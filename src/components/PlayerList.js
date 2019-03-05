import React from 'react'
import Player from './Player'

const PlayerList = ({ clientId, playersById, textLength }) => (
  <ul className='player-list'>
    {
      Object.keys(playersById).filter(id => playersById[id]).map(id => {
        const player = playersById[id]

        return <Player player={player} clientId={clientId} playerId={id} textLength={textLength} />
      })
    }
  </ul>
)

export default PlayerList
