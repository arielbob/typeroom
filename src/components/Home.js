import React from 'react'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
import CreateRoomButton from '../containers/CreateRoomButton'
import Top10 from '../containers/Top10'
import Welcome from './Welcome'

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
        <Welcome />
        <RegisterLogin isLoggedIn={this.props.isLoggedIn} currentForm={this.state.currentForm} toggleForm={() => this.toggleForm()} />
        <CreateRoomButton className='home__create-room'/>
        <Top10 />
      </section>
    )
  }
}

const RegisterLogin = ({isLoggedIn, currentForm, toggleForm}) => {
  if (!isLoggedIn) {
    if (currentForm == 'login') {
      return <LoginContainer toggleForm={() => toggleForm()}/>
    } else {
      return <RegisterContainer toggleForm={() => toggleForm()}/>
    }
  }

  return null
}

export default Home
