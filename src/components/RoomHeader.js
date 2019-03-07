import React from 'react'
import ErrorMessage from './ErrorMessage'
import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'
import Countdown from './Countdown'

const leftPadTime = (num) => {
  if (num < 10) {
    return '0' + num
  }

  return num
}

const formatTime = (secs) => {
  return leftPadTime(Math.floor(secs / 60)) + ':' + leftPadTime(secs % 60)
}

const RoomHeader = ({ isRoomOpened, isJoined, isCounting, isRunning, error, joinRoom }) => {
  return (
    <section className='game-header'>
      <div className={'game-header__container' + ((isJoined && isRunning) ? ' game-header__container--right' : '')}>
        {
          isRoomOpened ?
          <div className='game-header__timers'>
            { isCounting ? <CountdownTimer render={Countdown} /> : null }
            { isRunning ? <RaceTimer render={(time) => <p className='game-header__timer'>Time remaining: <b>{formatTime(time)}</b></p>} /> : null }
          </div> :
          null
        }
        {
          isRoomOpened && !error && !isJoined ?
          <button className='game-header__join-btn btn btn--green' onClick={() => joinRoom()}>Join Room</button> :
          null
        }
      </div>
      { !error && !isRoomOpened ? <h2 className='game-header__loading'>Loading...</h2> : null}
      {error ? <ErrorMessage error={error} /> : null}
    </section>
  )
}

export default RoomHeader
