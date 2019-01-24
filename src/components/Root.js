import React from 'react'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import history from '../history'
import Navbar from './Navbar'
import HomeContainer from '../containers/HomeContainer'
import RoomContainer from '../containers/RoomContainer'

class Root extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Route exact path='/' component={HomeContainer} />
          <Route path='/room/:id' component={RoomContainer} />
          {/* <button onClick={() => this.createRoom()}>Create Room</button> */}
        </div>
      </Router>
    )
  }
}

export default Root
