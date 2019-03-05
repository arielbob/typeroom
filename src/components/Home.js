import React from 'react'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
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
        <div className='home__container'>
          <section className='home__header'>
            <Welcome />
            <RegisterLogin isLoggedIn={this.props.isLoggedIn} currentForm={this.state.currentForm} toggleForm={() => this.toggleForm()} />
          </section>
          <Top10 />
        </div>
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
