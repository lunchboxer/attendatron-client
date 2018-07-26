import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'typeface-roboto'
import 'typeface-roboto-slab'
import 'normalize.css/normalize.css'
import '../mystyles.css'
import client from '../feathers.js'
import './App.css'
import LoginForm from './LoginForm'
import HomeMenu from './HomeMenu'
import SingleClass from './SingleClass'
import ClassListContainer from './ClassListContainer'
import NotFound from './NotFound'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.authenticatedListener = this.authenticatedListener.bind(this)
    this.logoutListener = this.logoutListener.bind(this)
  }
  handleLogout(event) {
    event.preventDefault()
    client.logout()
  }
  logoutListener() {
    this.setState({
      login: null
    })
  }
  authenticatedListener(login) {
    this.setState({
      login
    })
  }
  componentDidMount() {
    client.authenticate().catch(err => {
      this.setState({ login: null })
    })
    client.on('authenticated', this.authenticatedListener)
    client.on('logout', this.logoutListener)
  }
  componentWillUnmount() {
    client.removeAllListeners('authenticated')
    client.removeAllListeners('logout')
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="column" />
            <div className="column">
              <main className="main-content">
                <Link to="/">
                  <h1>Attendatron</h1>
                </Link>
                {!this.state.login ? (
                  <LoginForm />
                ) : (
                  <div>
                    <button
                      className="button-outline"
                      onClick={this.handleLogout}
                    >
                      Log out
                    </button>
                    &nbsp;<button className="button">Have class</button>
                    <Switch>
                      <Route exact path="/" component={HomeMenu} />
                      <Route
                        exact
                        path="/classes"
                        component={ClassListContainer}
                      />
                      <Route path="/classes/:id" component={SingleClass} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                )}
              </main>

              <footer>
                <p className="footertype">Made by James Smith in 2018</p>
              </footer>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    )
  }
}
export default App
