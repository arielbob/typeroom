import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import RoomContainer from '../containers/RoomContainer'

class Root extends React.Component {
  createRoom() {
    fetch('/create', {
      method: 'post'
    }).then(res => {
      if (res.redirected) window.location.href = res.url
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/room/:id' component={RoomContainer} />
          {/* <button onClick={() => this.createRoom()}>Create Room</button> */}
        </div>
      </Router>
    )
  }
}

export default Root
