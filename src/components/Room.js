import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'
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
