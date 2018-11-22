import React from 'react'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(email) {
    this.setState({ email })
  }

  handlePasswordChange(password) {
    this.setState({ password })
  }

  sendCredentials() {
    postData('/login', {email: this.state.email, password: this.state.password})
      .then(response => response.json()) // parses response to JSON
      .then(data => console.log(JSON.stringify(data)))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="email"
          placeholder='E-mail'
          value={this.state.email}
          onChange={(e) => this.handleEmailChange(e.target.value)}
        ></input><br/>
        <input
          type="text"
          name="password"
          placeholder='Password'
          value={this.state.password}
          onChange={(e) => this.handlePasswordChange(e.target.value)}
        ></input><br/>
        <input type='submit' value='Submit' onClick={() => this.sendCredentials()}></input>
      </div>
    )
  }
}

// from mdn fetch page
function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
}

export default Login
