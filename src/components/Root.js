import React from 'react'
import SocketContext from './SocketContext'
import TypeInput from './TypeInput'
import PlayerList from './PlayerList'

class Root extends React.Component {
  render() {
    return (
      <div>
        <p>Hello, world!</p>
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
