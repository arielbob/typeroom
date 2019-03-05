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
  <ul className='player-list'>
    {
      Object.keys(playersById).filter(id => playersById[id]).map(id => {
        const player = playersById[id]

        return (
          <li className='player-item' key={id}>
            <p className='player-item__name'>
              {player.place ? '(' + placeWord(player.place) + ') ' : null}
              {id == clientId ? <b>You</b> : player.username}
              <span className='player-item__wpm'>{Math.round(player.wpm)} WPM</span>
            </p>
            <div className='progress'>
              <div className='progress__bar' style={{ width: (player.nextWordId / textLength) * 100 + '%' }}></div>
            </div>
          </li>
        )
      })
    }
  </ul>
)

export default PlayerList
