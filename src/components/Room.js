import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'

import RaceTimer from '../containers/RaceTimer'
import CountdownTimer from '../containers/CountdownTimer'

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
      <div className='room-container'>
        <ErrorMessage />
        <div className='room'>
          {
            // TODO: we might want to have the timer freeze when the game ends
            // we shouldn't just have it say 0 by default since the race can end before the timer
            // reaches 0
          }
          {
            this.props.isCounting ?
            <div>
              <p>counting down...</p>
              <CountdownTimer render={(time) => <h3>{time}</h3>} />
            </div>
            : null
          }
          {
            this.props.isRunning ?
            <div>
              <p>running</p>
              <RaceTimer render={(time) => <h3 style={{color: 'red'}}>{time}</h3>} />
            </div>
            : null
          }

          <GameTextContainer />
          <TypeInputContainer />
          <PlayerListContainer />
          {
            !this.props.isJoined ? <button onClick={() => this.joinRoom()}>Join Room</button> : null
          }
        </div>
      </div>
    )
  }
}

export default Room
