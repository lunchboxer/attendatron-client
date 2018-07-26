import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import client from '../feathers'
import StudentList from './StudentList'
import ClassDelete from './ClassDelete'

class SingleClass extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.loadGroup = this.loadGroup.bind(this)
  }
  loadGroup(groupId) {
    client
      .service('classes')
      .get(groupId)
      .then(group => {
        this.setState({ group })
      })
  }

  componentDidMount() {
    const groupId = this.props.match.params.id
    this.loadGroup(groupId)
  }
  render() {
    const { group } = this.state
    return (
      <div>
        <Link to="/classes">&larr; back to classes list</Link>
        <h2>Edit/View Class</h2>
        {!group ? (
          <p>Loading Class...</p>
        ) : (
          <div>
            <h4>
              20{group.year} {group.major} #{group.number}
            </h4>

            <StudentList groupId={group.id} />
            <br />
            <ClassDelete groupId={group.id} />
          </div>
        )}
      </div>
    )
  }
}

export default SingleClass
