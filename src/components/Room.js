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

  componentWillUnmount() {
    this.props.closeRoom()
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
          <section className='game__text-container'>
            <GameTextContainer />
            <TypeInputContainer />
            {
              !this.props.isJoined ?
              <button className='game__join-btn btn btn--green' onClick={() => this.props.joinRoom()}>Join Room</button> :
              null
            }
          </section>
        </div>
        <div className='share'>
          <p className='share__text'>Share this link with your friends!</p>
          <input className='share__url' value={window.location.href} readOnly />
        </div>
      </div>
    )
  }
}

export default Room
