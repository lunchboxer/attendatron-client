import React, { Component } from 'react'
import client from '../feathers.js'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value })
  }

  login(event) {
    event.preventDefault()
    const { username, password } = this.state
    return client
      .authenticate({
        strategy: 'local',
        username,
        password
      })
      .catch(error => this.setState({ error }))
  }

  signup(event) {
    event.preventDefault()
    const { username, password } = this.state
    return client
      .service('users')
      .create({ username, password })
      .then(() => this.login())
  }

  render() {
    return (
      <div>
        <h4>Log in</h4>
        <form>
          <fieldset>
            <label htmlFor="usernameField">Username</label>
            <input
              type="text"
              id="usernameField"
              onChange={ev => this.updateField('username', ev)}
            />
            <label htmlFor="passwordField">Password</label>
            <input
              type="password"
              id="passwordField"
              onChange={ev => this.updateField('password', ev)}
            />
            <button onClick={this.login} className="button">
              Login
            </button>
            &nbsp;
            <button onClick={this.signup} className="button">
              Sign up
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default LoginForm
