import React from 'react'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
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
        <RegisterLogin isLoggedIn={this.props.isLoggedIn} currentForm={this.state.currentForm} />
        <CreateRoomButton className='home__create-room'/>
      </section>
    )
  }
}

const RegisterLogin = ({isLoggedIn, currentForm}) => {
  if (!isLoggedIn) {
    if (currentForm == 'login') {
      return <LoginContainer toggleForm={() => this.toggleForm() }/>
    } else {
      return <RegisterContainer toggleForm={() => this.toggleForm() }/>
    }
  }

  return null
}

export default Home
