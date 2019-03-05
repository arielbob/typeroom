import React from 'react'

const PlayerCell = ({ user, key }) => {
  return <li className='player-cell' key={key}>
    <div className='player-cell__header'>
      <h3 className='player-cell__title'>{ user.username }</h3>
      <span className='player-cell__wpm'>WPM: { user.stats.avgWpm }</span>
    </div>
    <span className='player-cell__wins'>Wins: {user.stats.wins}</span>
  </li>
}

export default PlayerCell
