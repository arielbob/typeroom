import React from 'react'

import RoomHeaderContainer from '../containers/RoomHeaderContainer'
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
        {/* <ErrorMessage /> */}
        <div className='game'>
          {
            // TODO: we might want to have the timer freeze when the game ends
            // we shouldn't just have it say 0 by default since the race can end before the timer
            // reaches 0
          }
          <RoomHeaderContainer />
          <PlayerListContainer />
          {
            this.props.isRoomOpened ?
            <section className='game__text-container'>
              <GameTextContainer />
              <TypeInputContainer />
            </section> :
            null
          }
        </div>
        {
          this.props.isRoomOpened ?
          <div className='share'>
            <p className='share__text'>Share this link with your friends!</p>
            <input className='share__url' value={window.location.href} readOnly />
          </div> :
          null
        }
      </div>
    )
  }
}

export default Room
