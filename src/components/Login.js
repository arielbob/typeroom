import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleEmailChange(email) {
    this.setState({ email })
  }

  handlePasswordChange(password) {
    this.setState({ password })
  }

  sendCredentials() {
    axios.post('/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        this.props.success(res.data)
      })
      .catch((err) => {
        if (err.response) {
          this.setState({
            error: err.response.data.message
          })
        }
      })
  }

  render() {
    return (
      <section>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <input
          type="text"
          name="email"
          placeholder='E-mail'
          value={this.state.email}
          onChange={(e) => this.handleEmailChange(e.target.value)}
        ></input><br/>
        <input
          type="password"
          name="password"
          placeholder='Password'
          value={this.state.password}
          onChange={(e) => this.handlePasswordChange(e.target.value)}
        ></input><br/>
        <input type='submit' value='Submit' onClick={() => this.sendCredentials()}></input>
      </section>
    )
  }
}

export default Login
