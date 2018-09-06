import React from 'react'
import SocketContext from './SocketContext'
import GameText from './GameText'
import TypeInput from './TypeInput'
import PlayerList from './PlayerList'

class Root extends React.Component {
  render() {
    return (
      <div>
        <SocketContext.Consumer>
          { socket => <GameText socket={socket} /> }
        </SocketContext.Consumer>
        <SocketContext.Consumer>
          { socket => <TypeInput socket={socket} /> }
        </SocketContext.Consumer>
        <SocketContext.Consumer>
          { socket => <PlayerList socket={socket} /> }
        </SocketContext.Consumer>
      </div>
    )
  }
}

export default Root
