import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      error: null
    }
  }

  handleChange(target) {
    this.setState({
      [target.name]: target.value
    })
  }

  sendCredentials() {
    this.setState({
      error: null
    })

    axios.post('/register', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        passwordConf: this.state.passwordConf
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
        <h3 className='login-register__title'>Register</h3>
        {this.state.error ? <div className='login-register__error'>{this.state.error}</div> : null}
        <input
          className='login-register__input'
          type='text'
          name='email'
          placeholder='E-mail'
          value={this.state.email}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <input
          className='login-register__input'
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <input
          className='login-register__input'
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <input
          className='login-register__input'
          type='password'
          name='passwordConf'
          placeholder='Confirm Password'
          value={this.state.passwordConf}
          onChange={(e) => this.handleChange(e.target)}
        ></input>
        <button className='login-register__submit btn' type='submit' value='Register' onClick={() => this.sendCredentials()}>Register</button>
        or <span className='login-register__toggle' onClick={() => this.props.toggleForm()}>Login</span>
      </section>
    )
  }
}

export default Register
