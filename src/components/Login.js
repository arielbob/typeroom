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

  handleChange(target) {
    this.setState({
      [target.name]: target.value
    })
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
      <section className='login-register'>
        <h3 className='login-register__title'>Login</h3>
        {this.state.error ? <div className='login-register__error'>{this.state.error}</div> : null}
        <input
          className='login-register__input'
          type="text"
          name="email"
          placeholder='E-mail'
          value={this.state.email}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <input
          className='login-register__input'
          type="password"
          name="password"
          placeholder='Password'
          value={this.state.password}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <input className='login-register__submit' type='submit' value='Login' onClick={() => this.sendCredentials()}></input>
        or <span className='login-register__toggle' onClick={() => this.props.toggleForm()}>Register</span>
      </section>
    )
  }
}

export default Login
