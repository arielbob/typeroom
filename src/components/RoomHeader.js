import React from 'react'
import ErrorMessage from './ErrorMessage'
import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'
import Countdown from './Countdown'

const RoomHeader = ({ isRoomOpened, isJoined, isCounting, isRunning, error, joinRoom }) => {
  return (
    <section className='game-header'>
      {
        isRoomOpened && !isJoined ?
        <button className='game-header__join-btn btn btn--green' onClick={() => joinRoom()}>Join Room</button> :
        null
      }
      {
        isRoomOpened ?
        <div className='game-header__timers'>
          { isCounting ? <CountdownTimer render={Countdown} /> : null }
          { isRunning ? <RaceTimer render={(time) => <p className='game-header__timer'>{time}</p>} /> : null }
        </div> :
        null
      }
      { !error && !isRoomOpened ? <h2 className='game-header__loading'>Loading...</h2> : null}
      {error ? <ErrorMessage error={error} /> : null}
    </section>
  )
}

export default RoomHeader
