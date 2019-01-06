import React from 'react'
import LoginContainer from '../containers/LoginContainer'
import Register from './Register'
import CreateRoomButton from '../containers/CreateRoomButton'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'login'
    }
  }

  toggleForm() {
    this.setState({
      currentForm: (this.state.currentForm == 'login') ? 'register' : 'login'
    })
  }

  render() {
    return (
      <section className='home'>
        <h2 className='welcome'>Welcome to TypeRoom.</h2>
        {
          this.state.currentForm == 'login' ?
          <LoginContainer toggleForm={() => this.toggleForm() }/> :
          <Register toggleForm={() => this.toggleForm() }/>
        }
        <CreateRoomButton className='home__create-room'/>
      </section>
    )
  }
}

export default Home
