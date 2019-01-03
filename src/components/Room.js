import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'
import TimerContainer from '../containers/TimerContainer'
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

  render() {
    return (
      <div>
        <ErrorMessage />
        {
          this.props.isCounting ? <p>counting down...</p> : null
        }
        {
          this.props.isRunning ? <p>running...</p> : null
        }

        {
        // TODO: we might want to have the timer freeze when the game ends
        // we shouldn't just have it say 0 by default since the race can end before the timer
        // reaches 0
          this.props.isRunning ? <TimerContainer /> : null
        }
        <GameTextContainer />
        <TypeInputContainer />
        <PlayerListContainer />
        {
          !this.props.isJoined ? <button onClick={() => this.joinRoom()}>Join Room</button> : null
        }
      </div>
    )
  }
}

export default Room
