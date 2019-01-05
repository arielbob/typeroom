import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import RoomContainer from '../containers/RoomContainer'
import LoginContainer from '../containers/LoginContainer'

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
          <Route exact path='/' render={() => <div>
            <h2>Welcome to TypeRoom.</h2>
            <h3>Login</h3>
            <LoginContainer />
          </div>}></Route>
          <Route path='/room/:id' component={RoomContainer} />
          {/* <button onClick={() => this.createRoom()}>Create Room</button> */}
        </div>
      </Router>
    )
  }
}

export default Root
