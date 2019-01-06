import React from 'react'
import LoginContainer from '../containers/LoginContainer'
import Register from './Register'

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
        <button className='home__create-room btn btn--orange'>Create Room as Guest</button>
      </section>
    )
  }
}

export default Home
