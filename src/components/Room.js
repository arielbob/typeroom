import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'

import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'
import Countdown from './Countdown'

import GameTextContainer from '../containers/GameTextContainer'
import TypeInputContainer from '../containers/TypeInputContainer'
import PlayerListContainer from '../containers/PlayerListContainer'

class Room extends React.Component {
  componentDidMount() {
    this.props.openRoom()
  }

  joinRoom() {
    this.props.joinRoom()
  }

  componentDidUpdate(prevProps) {
    if (this.props.roomId != prevProps.roomId) {
      this.props.openRoom()
    }
  }

  render() {
    return (
      <div className='game-container'>
        <ErrorMessage />
        <div className='game'>
          {
            // TODO: we might want to have the timer freeze when the game ends
            // we shouldn't just have it say 0 by default since the race can end before the timer
            // reaches 0
          }
          <div className='game__timers'>
            { this.props.isCounting ? <CountdownTimer render={Countdown} /> : null }
            { this.props.isRunning ? <RaceTimer render={(time) => <p className='game__timer'>{time}</p>} /> : null }
          </div>

          <PlayerListContainer />
          <GameTextContainer />
          <TypeInputContainer />
          {
            !this.props.isJoined ?
            <button className='btn btn--green' onClick={() => this.joinRoom()}>Join Room</button> :
            null
          }
        </div>
      </div>
    )
  }
}

export default Room
