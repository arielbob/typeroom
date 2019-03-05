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

const Player = ({ player, clientId, playerId, textLength }) => {
    const isYou = clientId == playerId
    return (
      <li className={'player-item' + (isYou ? ' player-item--you' : '')} key={playerId}>
        <div className={'player-item__bar'}>
          <p className='player-item__name'>
            {player.place ? '(' + placeWord(player.place) + ') ' : null}
            {isYou ? <b>You</b> : player.username}
          </p>
          <div className='progress'>
            <div className='progress__bar' style={{ width: (player.nextWordId / textLength) * 100 + '%' }}></div>
          </div>
          <p className='player-item__wpm'>{Math.round(player.wpm)} WPM</p>
        </div>
      </li>
    )
}

export default Player
