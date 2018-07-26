import React, { Component } from 'react'
import ClassList from './ClassList'
import client from '../feathers.js'

class ClassListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.loadClasses()
    client.service('classes').on('create', group => this.addGroup(group))
  }
  componentWillUnmount() {
    client.service('classes').removeListener('created', this.addGroup)
  }
  addGroup(group) {
    this.setState(prevState => ({
      groups: [...prevState.groups, group]
    }))
  }
  loadClasses() {
    client
      .service('classes')
      .find()
      .then(groups => this.setState({ groups: groups.data }))
  }
  render() {
    return (
      <div>
        {this.state.groups ? (
          <ClassList groups={this.state.groups} />
        ) : (
          <p>Loading classes...</p>
        )}
      </div>
    )
  }
}

export default ClassListContainer
