import React from 'react'
import ErrorMessage from '../containers/ErrorMessage'
import GameTextContainer from '../containers/GameTextContainer'
import TypeInputContainer from '../containers/TypeInputContainer'
import PlayerListContainer from '../containers/PlayerListContainer'

class Room extends React.Component {
  componentDidMount() {
    this.props.openRoom()
  }

  render() {
    return (
      <div>
        <ErrorMessage />
        <GameTextContainer />
        <TypeInputContainer />
        <PlayerListContainer />
      </div>
    )
  }
}

export default Room
