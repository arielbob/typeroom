import React from 'react'
import ErrorMessage from './ErrorMessage'
import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'
import Countdown from './Countdown'

// TODO: should maybe be a connected component

const RoomHeader = ({ isRoomOpened, isCounting, isRunning, error }) => {
  return (
    <section className='game__header'>
      {
        isRoomOpened ?
        <div className='game__timers'>
          { this.props.isCounting ? <CountdownTimer render={Countdown} /> : null }
          { this.props.isRunning ? <RaceTimer render={(time) => <p className='game__timer'>{time}</p>} /> : null }
        </div> :
        null
      }
      { !error && !isRoomOpened ? 'Loading...' : null}
      {error ? <ErrorMessage error={error} /> : null}
    </section>
  )
}

export default RoomHeader
