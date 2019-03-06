import React from 'react'
import ErrorMessage from './ErrorMessage'
import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'
import Countdown from './Countdown'

const RoomHeader = ({ isRoomOpened, isJoined, isCounting, isRunning, error, joinRoom }) => {
  return (
    <section className='game__header'>
      {
        isRoomOpened && !isJoined ?
        <button className='game__join-btn btn btn--green' onClick={() => joinRoom()}>Join Room</button> :
        null
      }
      {
        isRoomOpened ?
        <div className='game__timers'>
          { isCounting ? <CountdownTimer render={Countdown} /> : null }
          { isRunning ? <RaceTimer render={(time) => <p className='game__timer'>{time}</p>} /> : null }
        </div> :
        null
      }
      { !error && !isRoomOpened ? <h2 className='game__loading'>Loading...</h2> : null}
      {error ? <ErrorMessage error={error} /> : null}
    </section>
  )
}

export default RoomHeader
